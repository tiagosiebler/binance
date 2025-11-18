import WebSocket from 'isomorphic-ws';

import { KlineInterval } from './types/shared';
import {
  Exact,
  WsAPIOperationResponseMap,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
  WsOperation,
  WsRequestOperationBinance,
} from './types/websockets/ws-api';
import {
  MessageEventLike,
  WSClientConfigurableOptions,
  WsMarket,
  WsTopic,
} from './types/websockets/ws-general';
import {
  BaseWebsocketClient,
  EmittableEvent,
  MidflightWsRequestEvent,
} from './util/BaseWSClient';
import Beautifier from './util/beautifier';
import { DefaultLogger } from './util/logger';
import { signMessage } from './util/node-support';
import {
  appendEventIfMissing,
  requiresWSAPINewClientOID,
  RestClientOptions,
  serialiseParams,
  validateWSAPINewClientOID,
} from './util/requestUtils';
import { neverGuard } from './util/typeGuards';
import { SignAlgorithm } from './util/webCryptoAPI';
import { RestClientCache } from './util/websockets/rest-client-cache';
import { UserDataStreamManager } from './util/websockets/user-data-stream-manager';
import {
  EVENT_TYPES_USER_DATA,
  getLegacyWsKeyContext,
  getLegacyWsStoreKeyWithContext,
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getPromiseRefForWSAPIRequest,
  getRealWsKeyFromDerivedWsKey,
  getTestnetWsKey,
  getWsUrl,
  getWsURLSuffix,
  isPrivateWsTopic,
  isWSPingFrameAvailable,
  isWSPongFrameAvailable,
  MiscUserDataConnectionState,
  parseEventTypeFromMessage,
  parseRawWsMessage,
  resolveUserDataMarketForWsKey,
  resolveWsKeyForLegacyMarket,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WSAPIWsKey,
  WsKey,
  WsTopicRequest,
} from './util/websockets/websocket-util';
import { WSConnectedResult } from './util/websockets/WsStore.types';

const WS_LOGGER_CATEGORY = { category: 'binance-ws' };

export interface WSAPIRequestFlags {
  /** If true, will skip auth requirement for WS API connection */
  authIsOptional?: boolean | undefined;
}

/**
 * Multiplex Node.js, JavaScript & TypeScript Websocket Client for all of Binance's available WebSockets.
 *
 * When possible, it will subscribe to all requested topics on a single websocket connection. A list of
 * all available streams can be seen in the WS_KEY_URL_MAP found in util/websockets/websocket-util.ts.
 *
 * Connectivity is automatically maintained. If disconnected, the WebsocketClient will automatically
 * clean out the old dead connection, respawn a fresh one and resubscribe to all the requested topics.
 *
 * If any connection is reconnected, the WS client will:
 * - Emit the "reconnecting" event when the process begins.
 * - Emit the "reconnected" event, when the process has completed. When this event arrives, it is often a
 * good time to execute any synchorisation workflow (e.g. via the REST API) if any information was missed
 * while disconnected.
 *
 * User data streams will use a dedicated connection per stream for increased resilience.
 */

export class WebsocketClient extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBinance<WsTopic>
> {
  private restClientCache: RestClientCache = new RestClientCache();

  private beautifier: Beautifier = new Beautifier({
    warnKeyMissingInMap: false,
  });

  private userDataStreamManager: UserDataStreamManager;

  private respawnTimeoutCache: Record<string, ReturnType<typeof setTimeout>> =
    {};

  constructor(options?: WSClientConfigurableOptions, logger?: DefaultLogger) {
    super(options, logger);

    if (options?.beautifyWarnIfMissing) {
      this.beautifier.setWarnIfMissing(options.beautifyWarnIfMissing);
    }

    /**
     * Binance uses native WebSocket ping/pong frames, which cannot be directly used in
     * some environents (e.g. most browsers do not support sending raw ping/pong frames).
     *
     * This disables heartbeats in those environments, if ping/pong frames are unavailable.
     *
     * Some browsers may still handle these automatically. Some discussion around this can
     * be found here: https://stackoverflow.com/questions/10585355/sending-websocket-ping-pong-frame-from-browser
     */
    if (!isWSPingFrameAvailable()) {
      this.logger.info(
        'Disabled WS heartbeats. WS.ping() is not available in your environment.',
      );
      this.options.disableHeartbeat = true;
    }

    this.userDataStreamManager = new UserDataStreamManager({
      logger: this.logger,
      wsStore: this.getWsStore(),
      restClientCache: this.restClientCache,
      // fn pointers:
      respawnUserDataFn: (
        wsKey: WsKey,
        market: WsMarket,
        context: {
          symbol?: string;
          isTestnet?: boolean;
          respawnAttempt?: number;
        } = {},
      ) => {
        return this.respawnUserDataStream(wsKey, market, context);
      },
      getWsUrlFn: (wsKey: WsKey, connectionType: 'market' | 'userData') => {
        return this.getWsUrl(wsKey, connectionType);
      },
      getRestClientOptionsFn: () => this.getRestClientOptions(),
      getWsClientOptionsfn: () => this.options,
      closeWsFn: (wsKey: WsKey, force?: boolean) => this.close(wsKey, force),
      connectFn: (
        wsKey: WsKey,
        customUrl?: string | undefined,
        throwOnError?: boolean,
      ) => this.connect(wsKey, customUrl, throwOnError),
    });
  }

  private getUserDataStreamManager(): UserDataStreamManager {
    return this.userDataStreamManager;
  }

  private getRestClientOptions(): RestClientOptions {
    return {
      ...this.options,
      ...this.options.restOptions,
      testnet: this.options.testnet,
      api_key: this.options.api_key,
      api_secret: this.options.api_secret,
    };
  }

  /**
   * Request connection of all dependent (public & WS API) websockets in prod, instead of waiting
   * for automatic connection by SDK.
   *
   * For the Binance SDK, this will only open public connections (without auth), but is almost definitely overkill if you're only working with one product group.
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
    return this.connectPublic();
  }

  /**
   * Request connection to all public websockets in prod (spot, margin, futures, options). Overkill if
   * you're only working with one product group.
   */
  public connectPublic(): Promise<WSConnectedResult | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.main),
      this.connect(WS_KEY_MAP.usdm),
      this.connect(WS_KEY_MAP.coinm),
      this.connect(WS_KEY_MAP.eoptions),
    ];
  }

  /**
   * This function serves no purpose in the Binance SDK
   */
  public async connectPrivate(): Promise<WebSocket | undefined> {
    return;
  }

  /**
   * Ensures the WS API connection is active and ready.
   *
   * You do not need to call this, but if you call this before making any WS API requests,
   * it can accelerate the first request (by preparing the connection in advance).
   */
  public connectWSAPI(wsKey: WSAPIWsKey, skipAuth?: boolean): Promise<unknown> {
    if (skipAuth) {
      return this.assertIsConnected(wsKey);
    }

    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(wsKey);
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings,
   * or array of objects (if the topic has parameters).
   *
   * Objects should be formatted as {topic: string, params: object, category: CategoryV5}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ): Promise<unknown> {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    return this.subscribeTopicsForWsKey(normalisedTopicRequests, wsKey);
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    return this.unsubscribeTopicsForWsKey(normalisedTopicRequests, wsKey);
  }

  /**
   *
   *
   *
   * WS API Methods - similar to the REST API, but via WebSockets
   * https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-api-information
   *
   * https://github.com/tiagosiebler/awesome-crypto-examples/wiki/REST-API-vs-WebSockets-vs-WebSocket-API
   *
   *
   *
   */

  /**
   * Send a Websocket API command/request on a connection. Returns a promise that resolves on reply.
   *
   * WS API Documentation for list of operations and parameters:
   *
   * - Spot: https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-api-information
   * - USDM Futures: https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
   * - COINM Futures: https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-api-general-info
   *
   *
   * Returned promise is rejected if:
   * - an exception is detected in the reply, OR
   * - the connection disconnects for any reason (even if automatic reconnect will happen).
   *
   * Authentication is automatic. If you didn't request authentication yourself, there might
   * be a small delay after your first request, while the SDK automatically authenticates.
   *
   * Misc options:
   * - signRequest: boolean - if included, this request will automatically be signed with the available credentials.
   *
   * @param wsKey - The connection this event is for. Currently only "v5PrivateTrade" is supported
   * for Bybit, since that is the dedicated WS API connection.
   * @param operation - The command being sent, e.g. "order.create" to submit a new order.
   * @param params - Any request parameters for the command. E.g. `OrderParamsV5` to submit a new
   * order. Only send parameters for the request body. Everything else is automatically handled.
   * @returns Promise - tries to resolve with async WS API response. Rejects if disconnected or exception is seen in async WS API response
   */

  // This overload allows the caller to omit the 3rd param, if it isn't required
  sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    // if this throws a type error, probably forgot to add a new operation to WsAPITopicRequestParamMap
    TWSParams extends Exact<WsAPITopicRequestParamMap<TWSKey>[TWSOperation]>,
    TWSAPIResponse extends
      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: TWSKey,
    operation: TWSOperation,
    params?: TWSParams extends void | never ? undefined : TWSParams,
    requestFlags?: WSAPIRequestFlags,
  ): Promise<TWSAPIResponse>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends Exact<WsAPITopicRequestParamMap<TWSKey>[TWSOperation]>,
    TWSAPIResponse extends
      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: WsKey,
    operation: TWSOperation,
    params: TWSParams & { signRequest?: boolean },
    requestFlags?: WSAPIRequestFlags,
  ): Promise<TWSAPIResponse> {
    /**
     * Spot:
     * -> https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-api-information
     * -> https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-api.md#public-api-requests
     * USDM Futures: https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
     * COINM Futures: https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-api-general-info
     */

    // If testnet, enforce testnet wskey for WS API calls
    const resolvedWsKey = this.options.testnet ? getTestnetWsKey(wsKey) : wsKey;

    // this.logger.trace(`sendWSAPIRequest(): assertIsConnected("${wsKey}")...`);
    const timestampBeforeAuth = Date.now();
    await this.assertIsConnected(resolvedWsKey);
    // this.logger.trace('sendWSAPIRequest(): assertIsConnected(${wsKey}) ok');

    // Some commands don't require authentication.
    if (requestFlags?.authIsOptional !== true) {
      // this.logger.trace('sendWSAPIRequest(): assertIsAuthenticated(${wsKey})...');
      await this.assertIsAuthenticated(resolvedWsKey);
      // this.logger.trace('sendWSAPIRequest(): assertIsAuthenticated(${wsKey}) ok');
    }
    const timestampAfterAuth = Date.now();

    const request: WsRequestOperationBinance<string> = {
      id: this.getNewRequestId(),
      method: operation,
      params: {
        ...params,
      },
    };

    /**
     * Some WS API requests require a timestamp to be included. assertIsConnected and assertIsAuthenticated
     * can introduce a small delay before the actual request is sent, if not connected before that request is
     * made. This can lead to a curious race condition, where the request timestamp is before
     * the "authorizedSince" timestamp - as such, binance does not recognise the session as already authenticated.
     *
     * The below mechanism measures any delay introduced from the assert calls, and if the request includes a timestamp,
     * it offsets that timestamp by the delay.
     */
    const delayFromAuthAssert = timestampAfterAuth - timestampBeforeAuth;
    if (delayFromAuthAssert && request.params?.timestamp) {
      request.params.timestamp += delayFromAuthAssert;
      this.logger.trace(
        `sendWSAPIRequest(): adjust timestamp - delay seen by connect/auth assert and delayed request includes timestamp, adjusting timestamp by ${delayFromAuthAssert}ms`,
      );
    }

    if (requiresWSAPINewClientOID(request, resolvedWsKey)) {
      validateWSAPINewClientOID(request, resolvedWsKey);
    }

    // Sign, if needed
    const signedEvent = await this.signWSAPIRequest(request);

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(resolvedWsKey, signedEvent);

    const deferredPromise = this.getWsStore().createDeferredPromise<
      TWSAPIResponse & { request: any }
    >(resolvedWsKey, promiseRef, false);

    // Enrich returned promise with request context for easier debugging
    deferredPromise.promise
      ?.then((res) => {
        if (!Array.isArray(res)) {
          res.request = {
            wsKey: resolvedWsKey,
            ...signedEvent,
          };
        }

        return res;
      })
      .catch((e) => {
        if (typeof e === 'string') {
          this.logger.error('unexpcted string', { e });
          return e;
        }
        e.request = {
          wsKey: resolvedWsKey,
          operation,
          params: signedEvent.params,
        };
        // throw e;
        return e;
      });

    // this.logger.trace(
    //   `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent)} with promiseRef(${promiseRef})`,
    // );

    // Send event.
    const throwExceptions = true;
    this.tryWsSend(resolvedWsKey, JSON.stringify(signedEvent), throwExceptions);

    this.logger.trace(
      `sendWSAPIRequest(): sent "${operation}" event with promiseRef(${promiseRef})`,
    );

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }

  /**
   *
   *
   * Internal methods - not intended for public use
   *
   *
   */

  /**
   * @returns The WS URL to connect to for this WS key
   */
  async getWsUrl(
    wsKey: WsKey,
    connectionType: 'market' | 'userData' = 'market',
  ): Promise<string> {
    const wsBaseURL =
      getWsUrl(wsKey, this.options, this.logger) +
      getWsURLSuffix(wsKey, connectionType);

    return wsBaseURL;
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: 'hex' | 'base64',
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
    // return await signMessageWebCryptoAPI(paramsStr, secret, method, algorithm);
  }

  private async signWSAPIRequest<TRequestParams extends string = string>(
    requestEvent: WsRequestOperationBinance<TRequestParams>,
  ): Promise<WsRequestOperationBinance<TRequestParams>> {
    if (!requestEvent.params) {
      return requestEvent;
    }

    /**
     * Not really needed for most commands on Binance. Their WS API supports
     * sending signed WS API commands, but that adds latency to every request.
     *
     * Instead, this SDK will authenticate once after connecting. All requests
     * after authentication can then be sent without sign for maximum speed.
     */
    const { signRequest, ...otherParams } = requestEvent.params;
    if (signRequest) {
      const strictParamValidation = true;
      const encodeValues = true;
      const filterUndefinedParams = true;

      const semiFinalRequestParams = {
        apiKey: this.options.api_key,
        ...otherParams,
      };

      const serialisedParams = serialiseParams(
        semiFinalRequestParams,
        strictParamValidation,
        encodeValues,
        filterUndefinedParams,
      );

      const signature = await this.signMessage(
        serialisedParams,
        this.options.api_secret!,
        'base64',
        'SHA-256',
      );

      return {
        ...requestEvent,
        params: {
          ...semiFinalRequestParams,
          signature,
        },
      };
    }

    return requestEvent;
  }

  protected async getWsAuthRequestEvent(
    wsKey: WsKey,
  ): Promise<
    WsRequestOperationBinance<
      string,
      { apiKey: string; signature: string; timestamp: number }
    >
  > {
    try {
      // Note: Only Ed25519 keys are supported for this feature.

      // If you do not want to specify apiKey and signature in each individual request, you can authenticate your API key for the active WebSocket session.

      // Once authenticated, you no longer have to specify apiKey and signature for those requests that need them. Requests will be performed on behalf of the account owning the authenticated API key.

      // Note: You still have to specify the timestamp parameter for SIGNED requests.
      const timestamp = Date.now() + (this.getTimeOffsetMs() || 0);
      const strictParamValidation = true;
      const encodeValues = true;
      const filterUndefinedParams = true;

      if (!this.options.api_key || !this.options.api_secret) {
        throw new Error(
          'API key and/or secret missing, unable to prepare WS auth event without valid API keys.',
        );
      }

      const params = {
        apiKey: this.options.api_key,
        timestamp,
      };
      const serialisedParams = serialiseParams(
        params,
        strictParamValidation,
        encodeValues,
        filterUndefinedParams,
      );

      const signature = await this.signMessage(
        serialisedParams,
        this.options.api_secret,
        'base64',
        'SHA-256',
      );

      const request: WsRequestOperationBinance<string> = {
        id: this.getNewRequestId(),
        method: 'session.logon',
        params: {
          ...params,
          signature,
        },
      };

      return request;
    } catch (e) {
      this.logger.error(e, { ...WS_LOGGER_CATEGORY, wsKey });
      throw e;
    }
  }

  protected sendPingEvent(wsKey: WsKey) {
    try {
      if (!isWSPingFrameAvailable()) {
        this.logger.trace(
          'Unable to send WS ping frame. Not available in this environment.',
          { ...WS_LOGGER_CATEGORY, wsKey },
        );
        return;
      }

      // this.logger.trace(`Sending upstream ping: `, { ...loggerCategory, wsKey });
      if (!wsKey) {
        throw new Error('No wsKey provided');
      }

      const ws = this.getWsStore().getWs(wsKey);
      if (!ws) {
        throw new Error(
          `No active websocket connection exists for wsKey: ${wsKey}`,
        );
      }

      // Binance allows unsolicited pongs, so we send both (though we expect a pong in response to our ping if the connection is still alive)
      if (ws.readyState === 1) {
        ws.ping();
        ws.pong();
      } else {
        this.logger.trace(
          'WS ready state not open - refusing to send WS ping',
          { ...WS_LOGGER_CATEGORY, wsKey, readyState: ws?.readyState },
        );
      }
    } catch (e) {
      this.logger.error('Failed to send WS ping', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
        exception: e,
      });
    }
  }

  protected sendPongEvent(wsKey: WsKey) {
    try {
      if (!isWSPongFrameAvailable()) {
        this.logger.trace(
          'Unable to send WS pong frame. Not available in this environment.',
          { ...WS_LOGGER_CATEGORY, wsKey },
        );
        return;
      }

      // this.logger.trace(`Sending upstream ping: `, { ...loggerCategory, wsKey });
      if (!wsKey) {
        throw new Error('No wsKey provided');
      }

      const ws = this.getWsStore().getWs(wsKey);
      if (!ws) {
        throw new Error(
          `No active websocket connection exists for wsKey: ${wsKey}`,
        );
      }

      // Binance allows unsolicited pongs, so we send both (though we expect a pong in response to our ping if the connection is still alive)
      if (ws.readyState === 1) {
        ws.pong();
      } else {
        this.logger.trace(
          'WS ready state not open - refusing to send WS pong',
          { ...WS_LOGGER_CATEGORY, wsKey, readyState: ws?.readyState },
        );
      }
    } catch (e) {
      this.logger.error('Failed to send WS pong', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
        exception: e,
      });
    }
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    return getMaxTopicsPerSubscribeEvent(wsKey);
  }

  /**
   * @returns one or more correctly structured request events for performing a operations over WS. This can vary per exchange spec.
   */
  protected async getWsRequestEvents(
    wsKey: WsKey,
    operation: WsOperation,
    requests: WsTopicRequest<string>[],
  ): Promise<MidflightWsRequestEvent<WsRequestOperationBinance<WsTopic>>[]> {
    const wsRequestEvents: MidflightWsRequestEvent<
      WsRequestOperationBinance<WsTopic>
    >[] = [];
    const wsRequestBuildingErrors: unknown[] = [];

    switch (wsKey) {
      default: {
        const topics = requests.map((r) => r.topic);

        // Previously used to track topics in a request. Keeping this for subscribe/unsubscribe requests, no need for incremental values
        const req_id = this.getNewRequestId();

        const wsEvent: WsRequestOperationBinance<WsTopic> = {
          method: operation,
          params: topics,
          id: req_id,
        };

        // Cache midflight subs on the req ID
        // Enrich response with subs for that req ID

        const midflightWsEvent: MidflightWsRequestEvent<
          WsRequestOperationBinance<WsTopic>
        > = {
          requestKey: wsEvent.id,
          requestEvent: wsEvent,
        };

        wsRequestEvents.push({
          ...midflightWsEvent,
        });
        break;
      }
    }

    if (wsRequestBuildingErrors.length) {
      const label =
        wsRequestBuildingErrors.length === requests.length ? 'all' : 'some';

      this.logger.error(
        `Failed to build/send ${wsRequestBuildingErrors.length} event(s) for ${label} WS requests due to exceptions`,
        {
          ...WS_LOGGER_CATEGORY,
          wsRequestBuildingErrors,
          wsRequestBuildingErrorsStringified: JSON.stringify(
            wsRequestBuildingErrors,
            null,
            2,
          ),
        },
      );
    }

    return wsRequestEvents;
  }

  protected getPrivateWSKeys(): WsKey[] {
    return WS_AUTH_ON_CONNECT_KEYS;
  }

  protected isAuthOnConnectWsKey(wsKey: WsKey): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey);
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(request: WsTopicRequest<string>): boolean {
    const topicName = request?.topic?.toLowerCase();
    if (!topicName) {
      return false;
    }

    return isPrivateWsTopic(topicName);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected isWsPing(msg: any): boolean {
    if (!msg) {
      return false;
    }

    // For binance, all ping/pong events are frame events
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected isWsPong(msg: any): boolean {
    if (!msg) {
      return false;
    }
    // For binance, all ping/pong events are frame events
    return false;
  }

  /**
   * Abstraction called to sort ws events into emittable event types (response to a request, data update, etc)
   */
  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    // this.logger.trace(`resolveEmittableEvents(${wsKey}): `, event?.data);
    const results: EmittableEvent[] = [];

    try {
      /**
       *
       * Extract event from JSON
       *
       */
      const parsedEvent = parseRawWsMessage(event, this.options);

      /**
       *
       * Minor data normalisation & preparation
       *
       */

      // ws consumers: { data: ... }
      // ws api consumers (user data): { event: ... }
      // other responses: { ... }
      const eventData = parsedEvent?.data || parsedEvent?.event || parsedEvent;
      const parsedEventId = parsedEvent?.id;
      const parsedEventErrorCode = parsedEvent?.error?.code;
      const streamName = parsedEvent?.stream;

      const eventType =
        // First try, the child node
        parseEventTypeFromMessage(wsKey, eventData) ||
        // Second try, the parent
        parseEventTypeFromMessage(wsKey, parsedEvent);

      // Some events don't include the topic (event name)
      // This tries to extract and append it, using available context
      appendEventIfMissing(eventData, wsKey, eventType);

      const legacyContext = getLegacyWsKeyContext(wsKey);
      const wsMarket = legacyContext
        ? legacyContext.market
        : resolveUserDataMarketForWsKey(wsKey);

      // This attaches `wsMarket` and `streamName` to incoming events
      // If the event is an array, it's attached to each element in the array
      if (Array.isArray(eventData)) {
        for (const row of eventData) {
          row.wsMarket = wsMarket;
          if (streamName && !row.streamName) {
            row.streamName = streamName;
          }
        }
      } else {
        eventData.wsMarket = wsMarket;
        if (streamName && !eventData.streamName) {
          eventData.streamName = streamName;
        }
      }

      /**
       *
       *
       * Main parsing logic below:
       *
       *
       */
      const traceEmittable = false;
      if (traceEmittable) {
        this.logger.trace('resolveEmittableEvents', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          parsedEvent: JSON.stringify(parsedEvent),
          parsedEventData: JSON.stringify(eventData),
          eventType,
          properties: {
            parsedEventId,
            parsedEventErrorCode,
          },
          // parsed: JSON.stringify(parsed, null, 2),
        });
      }
      const isWSAPIResponse = typeof parsedEventId === 'number';

      const EVENTS_AUTHENTICATED = ['auth'];
      const EVENTS_RESPONSES = [
        'subscribe',
        'unsubscribe',
        'COMMAND_RESP',
        'ping',
        'pong',
      ];

      // WS API response
      if (isWSAPIResponse) {
        /**
         * Responses to "subscribe" are quite basic, with no indication of errors (e.g. bad topic):
         *
         *   {
         *     result: null,
         *     id: 1,
         *   };
         *
         * Currently there's no simple way to tell this apart from an actual WS API response with
         * error. So subscribe/unsubscribe requests will simply look like a WS API response internally,
         * but that will not affect usage.
         *
         * Unrelated, example wsapi error for reference:
         *
            {
              id: 1,
              status: 400,
              error: {
                code: -1021,
                msg: "Timestamp for this request was 1000ms ahead of the server's time."
              },
              rateLimits: [
                {
                  rateLimitType: 'REQUEST_WEIGHT',
                  interval: 'MINUTE',
                  intervalNum: 1,
                  limit: 6000,
                  count: 4
                }
              ],
              wsKey: 'mainWSAPI',
              isWSAPIResponse: true
            }
         */

        const isError =
          typeof parsedEventErrorCode === 'number' &&
          parsedEventErrorCode !== 0;

        // This is the counterpart to getPromiseRefForWSAPIRequest
        const promiseRef = [wsKey, parsedEventId].join('_');

        if (!parsedEventId) {
          this.logger.error(
            'WS API response is missing reqId - promisified workflow could get stuck. If this happens, please get in touch with steps to reproduce. Trace:',
            {
              wsKey,
              promiseRef,
              parsedEvent: eventData,
            },
          );
        }

        // WS API Exception
        if (isError) {
          try {
            this.getWsStore().rejectDeferredPromise(
              wsKey,
              promiseRef,
              {
                wsKey,
                ...eventData,
              },
              true,
            );
          } catch (e) {
            this.logger.error('Exception trying to reject WSAPI promise', {
              wsKey,
              promiseRef,
              parsedEvent: eventData,
              e,
            });
          }

          results.push({
            eventType: 'exception',
            event: eventData,
            isWSAPIResponse: isWSAPIResponse,
          });
          return results;
        }

        // authenticated
        if (eventData.result?.apiKey) {
          // Note: Without this check, this will also trigger "onWsAuthenticated()" for session.status requests
          if (this.getWsStore().getAuthenticationInProgressPromise(wsKey)) {
            results.push({
              eventType: 'authenticated',
              event: eventData,
              isWSAPIResponse: isWSAPIResponse,
            });
          }
        }

        // WS API Success
        try {
          this.getWsStore().resolveDeferredPromise(
            wsKey,
            promiseRef,
            {
              wsKey,
              ...eventData,
            },
            true,
          );
        } catch (e) {
          this.logger.error('Exception trying to resolve WSAPI promise', {
            wsKey,
            promiseRef,
            parsedEvent: eventData,
            e,
          });
        }

        results.push({
          eventType: 'response',
          event: {
            ...eventData,
            request: this.getCachedMidFlightRequest(wsKey, `${parsedEventId}`),
          },
          isWSAPIResponse: isWSAPIResponse,
        });
        this.removeCachedMidFlightRequest(wsKey, `${parsedEventId}`);

        return results;
      }

      // Handle incoming event that listen key expired
      if (eventType === 'listenKeyExpired') {
        const legacyContext = getLegacyWsKeyContext(wsKey);
        if (!legacyContext) {
          // handle this how?
          throw new Error(
            'No context found within wsKey - fatal error with expired listen key',
          );
        }

        this.logger.info(
          `${legacyContext.market} listenKey EXPIRED - attempting to respawn user data stream: ${wsKey}`,
          eventData,
        );

        // Just closing the connection (with the last parameter as true) will handle cleanup and respawn
        // Automatically leads to triggerCustomReconnectionWorkflow() to handle fresh user data respawn
        this.getUserDataStreamManager().teardownUserDataListenKey(
          legacyContext.listenKey,
          this.getWsStore().getWs(wsKey),
        );
        this.executeReconnectableClose(wsKey, 'listenKeyExpired');
      }

      if (this.options.beautify) {
        const beautifiedMessage = this.beautifier.beautifyWsMessage(
          eventData,
          eventType,
          false,
          // Suffix all events for the beautifier, if market is options
          // Options has some conflicting keys with different intentions, so will be suffixed
          wsKey === 'eoptions' ? 'Options' : '',
        );

        results.push({
          eventType: 'formattedMessage',
          event: beautifiedMessage,
          isWSAPIResponse,
        });

        // emit an additional event for user data messages
        if (!Array.isArray(beautifiedMessage) && eventType) {
          if (EVENT_TYPES_USER_DATA.includes(eventType)) {
            results.push({
              eventType: 'formattedUserDataMessage',
              event: beautifiedMessage,
              isWSAPIResponse,
            });
          }
        }
      }

      // Messages for a subscribed topic all include the "topic" property
      if (typeof eventType === 'string') {
        results.push({
          eventType: 'message',
          event: eventData?.data ? eventData.data : eventData,
        });

        return results;
      }

      // Messages that are a "reply" to a request/command (e.g. subscribe to these topics) typically include the "op" property
      if (typeof eventType === 'string') {
        // Failed request
        if (eventData.success === false) {
          results.push({
            eventType: 'exception',
            event: eventData,
          });
          return results;
        }

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (EVENTS_RESPONSES.includes(eventType)) {
          results.push({
            eventType: 'response',
            event: eventData,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (EVENTS_AUTHENTICATED.includes(eventType)) {
          results.push({
            eventType: 'authenticated',
            event: eventData,
          });
          return results;
        }

        this.logger.error(
          `!! Unhandled string operation type "${eventType}". Defaulting to "update" channel... raw event:`,
          JSON.stringify(parsedEvent),
        );
      } else {
        this.logger.error(
          `!!!! Unhandled non-string event type "${eventType}". Defaulting to "update" channel... raw event:`,
          JSON.stringify(parsedEvent),
        );
      }

      // In case of catastrophic failure, fallback to noisy emit update
      results.push({
        eventType: 'message',
        event: eventData,
      });
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error(
        'Error caught within resolveEmittableEvents - failed to parse event data? Caught exception: ',
        {
          exception: e,
          eventData: event.data,
        },
      );
    }

    return results;
  }

  /**
   *
   *
   *
   *
   *
   *  User Data Streams
   *
   *
   *
   *
   *
   */

  /**
   * --------------------------
   * User data listen key tracking & persistence
   * --------------------------
   **/

  /**
   * Subscribe to a spot user data stream. Use REST client to generate and persist listen key.
   * Supports spot, margin & isolated margin listen keys.
   */
  public async subscribeSpotUserDataStreamWithListenKey(
    wsKey: WsKey,
    listenKey: string,
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
      wsKey,
      'spot',
      listenKey,
      forceNewConnection,
      miscState,
    );
  }

  /**
   * Subscribe to spot user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group (e.g. port 9443 (main) vs 443 (main2))
   */
  public async subscribeSpotUserDataStream(
    wsKey: WsKey = 'main',
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | void> {
    this.logger.trace('subscribeSpotUserDataStream()', {
      wsKey,
      forceNewConnection,
      miscState,
    });
    try {
      const { listenKey } = await this.restClientCache
        .getSpotRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getSpotUserDataListenKey();

      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        'spot',
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to spot user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribeSpotUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeSpotUserDataStream(wsKey: WsKey = 'main'): Promise<void> {
    return this.closeUserDataStream(wsKey, 'spot');
  }

  /**
   * Subscribe to margin user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group (e.g. port 9443 (main) vs 443 (main2))
   */
  public async subscribeCrossMarginUserDataStream(
    wsKey: WsKey = 'main',
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const { listenKey } = await this.restClientCache
        .getSpotRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getMarginUserDataListenKey();

      const market: WsMarket = 'crossMargin';
      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to margin user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribeMarginUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeCrossMarginUserDataStream(
    wsKey: WsKey = 'main',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'crossMargin');
  }

  /**
   * Subscribe to isolated margin user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group (e.g. port 9443 (main) vs 443 (main2))
   */
  public async subscribeIsolatedMarginUserDataStream(
    symbol: string,
    wsKey: WsKey = 'main',
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const lowerCaseSymbol = symbol.toLowerCase();
      const { listenKey } = await this.restClientCache
        .getSpotRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getIsolatedMarginUserDataListenKey({
          symbol: lowerCaseSymbol,
        });

      const market: WsMarket = 'isolatedMargin';
      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        { ...miscState, symbol },
      );
    } catch (e) {
      this.logger.error('Failed to connect to isolated margin user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
        symbol,
      });
      this.emit('exception', {
        functionRef: 'subscribeIsolatedMarginUserDataStream()',
        wsKey,
        forceNewConnection,
        miscState: { ...miscState, symbol },
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeIsolatedMarginUserDataStream(
    symbol: string,
    wsKey: WsKey = 'main',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'isolatedMargin', symbol);
  }

  /**
   * Subscribe to margin risk user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group (e.g. port 9443 (main) vs 443 (main2))
   */
  public async subscribeMarginRiskUserDataStream(
    wsKey: WsKey = 'main',
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const { listenKey } = await this.restClientCache
        .getSpotRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getMarginRiskUserDataListenKey();

      const market: WsMarket = 'riskDataMargin';
      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to margin risk user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribeMarginRiskUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeMarginRiskUserDataStream(
    wsKey: WsKey = 'main',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'riskDataMargin');
  }

  /**
   * --------------------------
   * End of SPOT market websocket streams
   * --------------------------
   **/

  /**
   * Subscribe to USD-M Futures user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group.
   */
  public async subscribeUsdFuturesUserDataStream(
    wsKey: WsKey = 'usdm', // usdm | usdmTestnet
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const isTestnet = wsKey === WS_KEY_MAP.usdmTestnet;
      const restClient = this.restClientCache.getUSDMRestClient(
        this.getRestClientOptions(),
        this.options.requestOptions,
      );

      const { listenKey } = await restClient.getFuturesUserDataListenKey();

      const market: WsMarket = isTestnet ? 'usdmTestnet' : 'usdm';

      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to USD Futures user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribeUsdFuturesUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeUsdFuturesUserDataStream(
    wsKey: WsKey = 'usdm',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'usdm');
  }

  /**
   * Subscribe to COIN-M Futures user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group.
   */
  public async subscribeCoinFuturesUserDataStream(
    wsKey: WsKey = 'coinm', // coinm | coinmTestnet
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const isTestnet = wsKey === WS_KEY_MAP.coinmTestnet;
      const { listenKey } = await this.restClientCache
        .getCOINMRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getFuturesUserDataListenKey();

      const market: WsMarket = isTestnet ? 'coinmTestnet' : 'coinm';

      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to COIN Futures user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribeCoinFuturesUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribeCoinFuturesUserDataStream(
    wsKey: WsKey = 'coinm',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'coinm');
  }

  /**
   * Subscribe to Portfolio Margin user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   *
   * Note: the wsKey parameter is optional, but can be used to connect to other environments for this product group.
   */
  public async subscribePortfolioMarginUserDataStream(
    wsKey: WsKey = 'portfolioMarginUserData',
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    try {
      const { listenKey } = await this.restClientCache
        .getPortfolioClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getPMUserDataListenKey();

      const market: WsMarket = 'portfoliom';

      return this.getUserDataStreamManager().subscribeGeneralUserDataStreamWithListenKey(
        wsKey,
        market,
        listenKey,
        forceNewConnection,
        miscState,
      );
    } catch (e) {
      this.logger.error('Failed to connect to Portfolio Margin user data', {
        ...WS_LOGGER_CATEGORY,
        error: e,
      });
      this.emit('exception', {
        functionRef: 'subscribePortfolioMarginUserDataStream()',
        wsKey,
        forceNewConnection,
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  public unsubscribePortfolioMarginUserDataStream(
    wsKey: WsKey = 'portfolioMarginUserData',
  ): Promise<void> {
    return this.closeUserDataStream(wsKey, 'portfoliom');
  }

  /**
   * Close an active, dedicated, user data stream connection.
   *
   * @param wsKey - the connection key used to open the connection (excluding any automatic parameters such as the listen key). E.g. 'main' for spot/margin, 'usdm' for futures.
   * @param wsMarket - the product group, recommended if you're subscribed to both spot and margin (since they're on the same wsKey (main)).
   */
  public async closeUserDataStream(
    wsKey: WsKey,
    wsMarket: WsMarket,
    symbol?: string,
  ): Promise<void> {
    const wsKeys = this.getWsStore().getKeys();
    const userDataWsKey = wsKeys.find((key) => {
      if (key === wsKey) {
        return true;
      }

      // built around the assumption in how per-connection listen key wskeys are created
      // isolatedMargin_userData_BTCUSDC_6RszN123x213x1233x213x1233x213xx123x1uzkTV_main
      // coinm_userData__WRAVTxGaQa1Nhd1243312kjn13kj12n3m5wRFv6JoFQgwUR5AEFofZtlk_coinm
      const symbolSuffix = symbol ? '_' + symbol : '';
      const prefixMatch = wsMarket + '_userData' + symbolSuffix;

      return key.startsWith(prefixMatch) && key.endsWith(wsKey);
    });

    if (!userDataWsKey) {
      throw new Error(
        `No matching connection found with wsKey "${wsKey}". Active connections: ${JSON.stringify(wsKeys)}`,
      );
    }

    // todo: close?
    this.close(userDataWsKey);
  }

  protected isCustomReconnectionNeeded(wsKey: string): boolean {
    return wsKey.includes('userData');
  }

  protected async triggerCustomReconnectionWorkflow(
    legacyWsKey: string,
  ): Promise<void> {
    if (legacyWsKey.includes('userData')) {
      return this.getUserDataStreamManager().triggerUserDataReconnectionWorkflow(
        legacyWsKey,
      );
    }
  }

  private async respawnUserDataStream(
    wsKey: WsKey,
    market: WsMarket,
    context: {
      symbol?: string;
      isTestnet?: boolean;
      respawnAttempt?: number;
    } = {},
  ): Promise<void> {
    // Handle corner case where wsKey is still the derived key for some reason...
    const realWsKey = getRealWsKeyFromDerivedWsKey(wsKey);
    if (realWsKey !== wsKey) {
      console.error('Derived key fed into respawn method!! ', {
        wsKey,
        market,
        ...context,
        realWsKey,
      });
      console.trace();
      process.exit(-1);
    }

    // If another connection attempt is in progress for this listen key, don't initiate a retry or the risk is multiple connections on the same listen key
    const forceNewConnection = false;

    const miscConnectionState: MiscUserDataConnectionState = {
      isReconnecting: true,
      respawnAttempt: context?.respawnAttempt,
    };

    let ws: WSConnectedResult | undefined | void = undefined;

    try {
      switch (market) {
        case 'spot':
        case 'spotTestnet':
          ws = await this.subscribeSpotUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'crossMargin':
          ws = await this.subscribeCrossMarginUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'isolatedMargin':
          ws = await this.subscribeIsolatedMarginUserDataStream(
            context.symbol!,
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'riskDataMargin':
          ws = await this.subscribeMarginRiskUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'usdm':
          ws = await this.subscribeUsdFuturesUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'usdmTestnet':
          ws = await this.subscribeUsdFuturesUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'coinm':
          ws = await this.subscribeCoinFuturesUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'coinmTestnet':
          ws = await this.subscribeCoinFuturesUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'portfoliom':
          ws = await this.subscribePortfolioMarginUserDataStream(
            realWsKey,
            forceNewConnection,
            miscConnectionState,
          );
          break;
        case 'options':
        case 'optionsTestnet':
          throw new Error(
            'European options are not supported yet. Please get in touch if you need this.',
          );
        default:
          throw neverGuard(
            market,
            `Failed to respawn user data stream - unhandled market: ${market}`,
          );
      }
    } catch (e) {
      this.logger.error('Exception trying to spawn user data stream', {
        ...WS_LOGGER_CATEGORY,
        market,
        ...context,
        error: e,
      });

      this.emit('exception', { wsKey: market + '_' + 'userData', error: e });
    }

    if (!ws) {
      const delayInSeconds = 2;
      this.logger.error(
        'Userdata respawn failed, trying again with short delay',
        {
          ...WS_LOGGER_CATEGORY,
          market,
          ...context,
          delayInSeconds,
        },
      );

      const respawnTimeoutKey = [
        market,
        context?.symbol,
        context?.isTestnet,
      ].join('_');

      // Prevent simultaneous timers in same scope
      if (this.respawnTimeoutCache[respawnTimeoutKey]) {
        clearTimeout(this.respawnTimeoutCache[respawnTimeoutKey]);
        delete this.respawnTimeoutCache[respawnTimeoutKey];

        this.logger.error(
          'Respawn timer already active while trying to queue respawn...delaying existing timer further...',
          {
            ...WS_LOGGER_CATEGORY,
            market,
            ...context,
            delayInSeconds,
          },
        );
      }

      // Execute reconnection workflow after short delay
      this.respawnTimeoutCache[respawnTimeoutKey] = setTimeout(() => {
        delete this.respawnTimeoutCache[respawnTimeoutKey];
        this.respawnUserDataStream(realWsKey, market, {
          ...context,
          respawnAttempt: context?.respawnAttempt
            ? context.respawnAttempt + 1
            : 1,
        });
      }, 1000 * delayInSeconds);
    }
  }

  /**
   * Subscribe to the European Options user data stream - listen key is automatically generated.
   *
   * Not supported at this time. Please get in touch if you need this.
   */
  // public async subscribeEuropeanOptionsUserData(
  //   wsKey: WsKey = 'eoptions',
  //   forceNewConnection?: boolean,
  //   isReconnecting?: boolean,
  // ): Promise<WSConnectedResult | undefined> {
  //   try {
  //     const { listenKey } = await this.restClientCache
  //       .getEuropeanOptionsClient(
  //         this.getRestClientOptions(),
  //         this.options.requestOptions,
  //       )
  //       .getUserDataListenKey();

  //     const market: WsMarket = 'options';

  //     return this.subscribeGeneralUserDataStreamWithListenKey(
  //       wsKey,
  //       market,
  //       listenKey,
  //       forceNewConnection,
  //       isReconnecting,
  //     );
  //   } catch (e) {
  //     this.logger.error('Failed to connect to Options user data', {
  //       ...WS_LOGGER_CATEGORY,
  //       error: e,
  //     });
  //     this.emit('exception', {
  //       functionRef: 'subscribePortfolioMarginUserDataStream()',
  //       wsKey,
  //       forceNewConnection,
  //       isReconnecting,
  //       error: e?.stack || e,
  //     });
  //   }
  // }

  /**
   *
   *
   *
   *
   * Convenient subscribe methods, similar to the legacy WebsocketClient for Binance.
   *
   *
   *
   *
   */

  /**
   * --------------------------
   * Universal market websocket streams (may apply to one or more API markets)
   * --------------------------
   **/

  /**
   * Advanced: Subscribe to a universal market websocket stream
   *
   * This is NOT recommended unless you're very confident with what you're doing.
   */
  public subscribeEndpoint(
    endpoint: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const wsBaseEndpoints: Record<WsMarket, string> = {
      spot: 'wss://stream.binance.com:9443',
      crossMargin: 'wss://stream.binance.com:9443',
      isolatedMargin: 'wss://stream.binance.com:9443',
      usdm: 'wss://fstream.binance.com',
      usdmTestnet: 'wss://stream.binancefuture.com',
      coinm: 'wss://dstream.binance.com',
      coinmTestnet: 'wss://dstream.binancefuture.com',
      options: 'wss://vstream.binance.com',
      optionsTestnet: 'wss://testnetws.binanceops.com',
      riskDataMargin: '',
      spotTestnet: '',
      portfoliom: '',
    };

    const wsKey = getLegacyWsStoreKeyWithContext(market, endpoint);
    return this.connect(wsKey, wsBaseEndpoints[market] + `/ws/${endpoint}`);
  }

  /**
   * Subscribe to aggregate trades for a symbol in a market category
   */
  public subscribeAggregateTrades(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'aggTrade';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to trades for a symbol in a market category
   * IMPORTANT: This topic for usdm and coinm is not listed in the api docs and might stop working without warning
   */
  public subscribeTrades(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'trade';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to coin index for a symbol in COINM Futures markets
   */
  public subscribeCoinIndexPrice(
    symbol: string,
    updateSpeedMs: 1000 | 3000 = 3000,
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'indexPrice';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
    const market: WsMarket = 'coinm';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}${speedSuffix}`,
      wsKey,
    );
  }

  /**
   * Subscribe to mark price for a symbol in a market category
   */
  public subscribeMarkPrice(
    symbol: string,
    market: 'usdm' | 'coinm',
    updateSpeedMs: 1000 | 3000 = 3000,
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'markPrice';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}${speedSuffix}`,
      wsKey,
    );
  }

  /**
   * Subscribe to mark price for all symbols in a market category
   */
  public subscribeAllMarketMarkPrice(
    market: 'usdm' | 'coinm',
    updateSpeedMs: 1000 | 3000 = 3000,
  ): Promise<unknown> {
    const streamName = '!markPrice@arr';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${streamName}${speedSuffix}`, wsKey);
  }

  /**
   * Subscribe to klines(candles) for a symbol in a market category
   */
  public subscribeKlines(
    symbol: string,
    interval: KlineInterval,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'kline';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
    );
  }

  /**
   * Subscribe to continuous contract klines(candles) for a symbol futures
   */
  public subscribeContinuousContractKlines(
    symbol: string,
    contractType: 'perpetual' | 'current_quarter' | 'next_quarter',
    interval: KlineInterval,
    market: 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'continuousKline';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}_${contractType}@${streamName}_${interval}`,
      wsKey,
    );
  }

  /**
   * Subscribe to index klines(candles) for a symbol in a coinm futures
   */
  public subscribeIndexKlines(
    symbol: string,
    interval: KlineInterval,
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'indexPriceKline';
    const market: WsMarket = 'coinm';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
    );
  }

  /**
   * Subscribe to index klines(candles) for a symbol in a coinm futures
   */
  public subscribeMarkPriceKlines(
    symbol: string,
    interval: KlineInterval,
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'markPriceKline';
    const market: WsMarket = 'coinm';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
    );
  }

  /**
   * Subscribe to mini 24hr ticker for a symbol in market category.
   */
  public subscribeSymbolMini24hrTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'miniTicker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to mini 24hr mini ticker in market category.
   */
  public subscribeAllMini24hrTickers(
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const streamName = 'miniTicker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`!${streamName}@arr`, wsKey);
  }

  /**
   * Subscribe to 24hr ticker for a symbol in any market.
   */
  public subscribeSymbol24hrTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'ticker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to 24hr ticker in any market.
   */
  public subscribeAll24hrTickers(
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const streamName = 'ticker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`!${streamName}@arr`, wsKey);
  }

  /**
   * Subscribe to rolling window ticker statistics for all market symbols,
   * computed over multiple windows. Note that only tickers that have
   * changed will be present in the array.
   *
   * Notes:
   * - Supported window sizes: 1h,4h,1d.
   * - Supported markets: spot
   */
  public subscribeAllRollingWindowTickers(
    market: 'spot',
    windowSize: '1h' | '4h' | '1d',
  ): Promise<unknown> {
    const streamName = 'ticker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`!${streamName}_${windowSize}@arr`, wsKey);
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSymbolBookTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'bookTicker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeAllBookTickers(market: 'usdm' | 'coinm'): Promise<unknown> {
    const streamName = 'bookTicker';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`!${streamName}`, wsKey);
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSymbolLiquidationOrders(
    symbol: string,
    market: 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'forceOrder';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${lowerCaseSymbol}@${streamName}`, wsKey);
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeAllLiquidationOrders(
    market: 'usdm' | 'coinm',
  ): Promise<unknown> {
    const streamName = 'forceOrder@arr';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`!${streamName}`, wsKey);
  }

  /**
   * Subscribe to partial book depths (snapshots).
   *
   * Note:
   * - spot only supports 1000ms or 100ms for updateMs
   * - futures only support 100, 250 or 500ms for updateMs
   */
  public subscribePartialBookDepths(
    symbol: string,
    levels: 5 | 10 | 20,
    updateMs: 100 | 250 | 500 | 1000,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'depth';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}${levels}${updateMsSuffx}`,
      wsKey,
    );
  }

  /**
   * Subscribe to orderbook depth updates to locally manage an order book.
   *
   * Note that the updatems parameter depends on which market you're trading
   *
   * - Spot: https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream
   * - USDM Futures: https://binance-docs.github.io/apidocs/futures/en/#diff-book-depth-streams
   */
  public subscribeDiffBookDepth(
    symbol: string,
    updateMs: 100 | 250 | 500 | 1000 = 100,
    market: 'spot' | 'usdm' | 'coinm',
  ): Promise<unknown> {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'depth';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';
    return this.subscribe(
      `${lowerCaseSymbol}@${streamName}${updateMsSuffx}`,
      wsKey,
    );
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeContractInfoStream(
    market: 'usdm' | 'coinm',
  ): Promise<unknown> {
    const streamName = '!contractInfo';

    const wsKey = resolveWsKeyForLegacyMarket(market);
    return this.subscribe(`${streamName}`, wsKey);
  }

  /**
   * --------------------------
   * SPOT market websocket streams
   * --------------------------
   **/

  /**
   * Subscribe to aggregate trades for a symbol in spot markets.
   */
  public subscribeSpotAggregateTrades(symbol: string): Promise<unknown> {
    return this.subscribeAggregateTrades(symbol, 'spot');
  }

  /**
   * Subscribe to trades for a symbol in spot markets.
   */
  public subscribeSpotTrades(symbol: string): Promise<unknown> {
    return this.subscribeTrades(symbol, 'spot');
  }

  /**
   * Subscribe to candles for a symbol in spot markets.
   */
  public subscribeSpotKline(
    symbol: string,
    interval: KlineInterval,
  ): Promise<unknown> {
    return this.subscribeKlines(symbol, interval, 'spot');
  }

  /**
   * Subscribe to mini 24hr ticker for a symbol in spot markets.
   */
  public subscribeSpotSymbolMini24hrTicker(symbol: string): Promise<unknown> {
    return this.subscribeSymbolMini24hrTicker(symbol, 'spot');
  }

  /**
   * Subscribe to mini 24hr mini ticker in spot markets.
   */
  public subscribeSpotAllMini24hrTickers(): Promise<unknown> {
    return this.subscribeAllMini24hrTickers('spot');
  }

  /**
   * Subscribe to 24hr ticker for a symbol in spot markets.
   */
  public subscribeSpotSymbol24hrTicker(symbol: string): Promise<unknown> {
    return this.subscribeSymbol24hrTicker(symbol, 'spot');
  }

  /**
   * Subscribe to 24hr ticker in spot markets.
   */
  public subscribeSpotAll24hrTickers(): Promise<unknown> {
    return this.subscribeAll24hrTickers('spot');
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSpotSymbolBookTicker(symbol: string): Promise<unknown> {
    return this.subscribeSymbolBookTicker(symbol, 'spot');
  }

  /**
   * Subscribe to top bid/ask levels for symbol in spot markets.
   */
  public subscribeSpotPartialBookDepth(
    symbol: string,
    levels: 5 | 10 | 20,
    updateMs: 1000 | 100 = 1000,
  ): Promise<unknown> {
    return this.subscribePartialBookDepths(symbol, levels, updateMs, 'spot');
  }

  /**
   * Subscribe to spot orderbook depth updates to locally manage an order book.
   */
  public subscribeSpotDiffBookDepth(
    symbol: string,
    updateMs: 1000 | 100 = 1000,
  ): Promise<unknown> {
    return this.subscribeDiffBookDepth(symbol, updateMs, 'spot');
  }
}
