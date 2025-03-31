/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import WebSocket from 'isomorphic-ws';

import { KlineInterval, OrderIdProperty } from './types/shared';
import {
  Exact,
  WsAPIOperation,
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
import {
  appendEventIfMissing,
  generateNewOrderId,
  getOrderIdPrefix,
  getRequestSignature,
  logInvalidOrderId,
  requiresWSAPINewClientOID,
  RestClientOptions,
  serialiseParams,
  validateWSAPINewClientOID,
} from './util/requestUtils';
import {
  isTopicSubscriptionConfirmation,
  isTopicSubscriptionSuccess,
  neverGuard,
} from './util/typeGuards';
import { SignAlgorithm, signMessage } from './util/webCryptoAPI';
import { ListenKeyStateCache } from './util/websockets/listen-key-state-cache';
import { RestClientCache } from './util/websockets/rest-client-cache';
import { UserDataStreamManager } from './util/websockets/user-data-stream-manager';
import {
  getLegacyWsKeyContext,
  getLegacyWsStoreKeyWithContext,
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getPromiseRefForWSAPIRequest,
  getRealWsKeyFromDerivedWsKey,
  getWsUrl,
  getWsURLSuffix,
  isPrivateWsTopic,
  MiscUserDataConnectionState,
  parseEventTypeFromMessage,
  parseRawWsMessage,
  resolveUserDataMarketForWsKey,
  resolveWsKeyForLegacyMarket,
  safeTerminateWs,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WSAPIWsKey,
  WsKey,
  WsTopicRequest,
} from './util/websockets/websocket-util';
import {
  WSConnectedResult,
  WsConnectionStateEnum,
} from './util/websockets/WsStore.types';

const WS_LOGGER_CATEGORY = { category: 'binance-ws' };

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
    warnKeyMissingInMap: true,
  });

  private userDataStreamManager: UserDataStreamManager;

  private respawnTimeoutCache: Record<string, ReturnType<typeof setTimeout>> =
    {};

  constructor(options?: WSClientConfigurableOptions, logger?: DefaultLogger) {
    super(options, logger);

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
      ) => this.respawnUserDataStream(wsKey, market, context),
      getWsUrlFn: (
        wsKey: WsKey,
        connectionType: 'market' | 'userData' | 'wsAPI',
      ) => this.getWsUrl(wsKey, connectionType),
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
      api_key: this.options.api_key,
      api_secret: this.options.api_secret,
    };
  }

  /**
   * Request connection of all dependent (public & WS API) websockets in prod, instead of waiting
   * for automatic connection by SDK. TODO: also do the user data streams?
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
    return this.connectPublic();
  }

  /**
   * Ensures the WS API connection is active and ready.
   *
   * You do not need to call this, but if you call this before making any WS API requests,
   * it can accelerate the first request (by preparing the connection in advance).
   */
  public connectWSAPI(wsKey: WSAPIWsKey): Promise<unknown> {
    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(wsKey);
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

  public async connectPrivate(): Promise<WebSocket | undefined> {
    // switch (this.options.market) {
    //   case 'v5':
    //   default: {
    //     return this.connect(WS_KEY_MAP.v5Private);
    //   }
    // }
    // TODO:
    return;
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
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
   *
   *
   *
   */

  /**
   * Send a Websocket API command/request on a connection. Returns a promise that resolves on reply.
   *
   * WS API Documentation for list of operations and parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
   *
   * Returned promise is rejected if:
   * - an exception is detected in the reply, OR
   * - the connection disconnects for any reason (even if automatic reconnect will happen).
   *
   * Authentication is automatic. If you didn't request authentication yourself, there might
   * be a small delay after your first request, while the SDK automatically authenticates.
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
    ...params: TWSParams extends undefined | void | never ? [] : [TWSParams]
  ): Promise<TWSAPIResponse>;

  // These overloads give stricter types than mapped generics, since generic constraints
  // do not trigger excess property checks
  // Without these overloads, TypeScript won't complain if you include an
  // unexpected property with your request (if it doesn't clash with an existing property)
  // sendWSAPIRequest<TWSOpreation extends WSAPIOperation = 'order.create'>(
  //   wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
  //   operation: TWSOpreation,
  //   params: WsAPITopicRequestParamMap[TWSOpreation],
  // ): Promise<WsAPIOperationResponseMap[TWSOpreation]>;

  // sendWSAPIRequest<TWSOpreation extends WSAPIOperation = 'order.amend'>(
  //   wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
  //   operation: TWSOpreation,
  //   params: WsAPITopicRequestParamMap[TWSOpreation],
  // ): Promise<WsAPIOperationResponseMap[TWSOpreation]>;

  // sendWSAPIRequest<TWSOpreation extends WSAPIOperation = 'order.cancel'>(
  //   wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
  //   operation: TWSOpreation,
  //   params: WsAPITopicRequestParamMap[TWSOpreation],
  // ): Promise<WsAPIOperationResponseMap[TWSOpreation]>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends Exact<WsAPITopicRequestParamMap<TWSKey>[TWSOperation]>,
    TWSAPIResponse extends
      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: WsKey,
    operation: TWSOperation,
    params: TWSParams,
  ): Promise<TWSAPIResponse> {
    //WsAPIOperationResponseMap[TWSOperation]> {

    /**
     * Spot: https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
     * USDM Futures: https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
     * COINM Futures: https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-api-general-info
     */

    // this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`);
    await this.assertIsConnected(wsKey);
    // this.logger.trace('sendWSAPIRequest()->assertIsConnected() ok');

    await this.assertIsAuthenticated(wsKey);
    // this.logger.trace('sendWSAPIRequest()->assertIsAuthenticated() ok');

    const request: WsRequestOperationBinance<string> = {
      id: this.getNewRequestId(),
      method: operation,
      params: {
        timestamp: Date.now(),
        recvWindow: this.options.recvWindow,
        ...params,
      },
    };

    if (requiresWSAPINewClientOID(request, wsKey)) {
      validateWSAPINewClientOID(request, wsKey);
    }

    // Sign, if needed
    const signedEvent = await this.signWSAPIRequest(request);

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(wsKey, signedEvent);

    const deferredPromise =
      this.getWsStore().createDeferredPromise<TWSAPIResponse>(
        wsKey,
        promiseRef,
        false,
      );

    // this.logger.trace(
    //   `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent)} with promiseRef(${promiseRef})`,
    // );

    // Send event
    this.tryWsSend(wsKey, JSON.stringify(signedEvent));

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
    connectionType: 'market' | 'userData' | 'wsAPI' = 'market',
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
  }

  private async signWSAPIRequest<TRequestParams extends string = string>(
    requestEvent: WsRequestOperationBinance<TRequestParams>,
  ): Promise<WsRequestOperationBinance<TRequestParams>> {
    // Not needed for Binance. Auth happens only on connection open, automatically.
    // Faster than performing auth for every request
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

      const recvWindow = this.options.recvWindow || 0;
      const timestamp = Date.now() + (this.getTimeOffsetMs() || 0) + recvWindow;

      const strictParamValidation = true;
      const encodeValues = true;
      const filterUndefinedParams = true;

      const authParams = {
        apiKey: this.options.api_key,
        timestamp,
      };
      const serialisedParams = serialiseParams(
        authParams,
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

      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/request-security#signed-request-example-ed25519
      const request: WsRequestOperationBinance<string> = {
        id: this.getNewRequestId(),
        method: 'session.logon',
        params: {
          ...authParams,
          signature,
        },
      };

      return request;
    } catch (e) {
      this.logger.error(e, { ...WS_LOGGER_CATEGORY, wsKey });
      throw e;
    }
  }

  // private async getWsAuthSignature(
  //   wsKey: WsKey,
  // ): Promise<{ expiresAt: number; signature: string }> {
  //   const { api_key, api_secret } = this.options;

  //   if (!api_key || !api_secret) {
  //     this.logger.error(
  //       'Cannot authenticate websocket, either api or private keys missing.',
  //       { ...WS_LOGGER_CATEGORY, wsKey },
  //     );
  //     throw new Error('Cannot auth - missing api or secret in config');
  //   }

  //   this.logger.trace("Getting auth'd request params", {
  //     ...WS_LOGGER_CATEGORY,
  //     wsKey,
  //   });

  //   const recvWindow = this.options.recvWindow || 5000;

  //   const signatureExpiresAt = Date.now() + this.getTimeOffsetMs() + recvWindow;

  //   // const signature = await this.signMessage(
  //   //   'GET/realtime' + signatureExpiresAt,
  //   //   api_secret,
  //   //   'hex',
  //   //   'SHA-256',
  //   // );

  //   return {
  //     expiresAt: signatureExpiresAt,
  //     signature: '',
  //   };
  // }

  protected sendPingEvent(wsKey: WsKey) {
    try {
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
    // ws.pong();
    try {
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
      // default: {
      // throw neverGuard(wsKey, `Unhandled wsKey "${wsKey}"`);
      // }
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
    const results: EmittableEvent[] = [];

    try {
      // const parsed = JSON.parse(event.data);
      const parsed = parseRawWsMessage(event);
      const eventType = parseEventTypeFromMessage(wsKey, parsed);

      // Some events don't include the topic (event name)
      // This tries to extract and append it, using available context
      appendEventIfMissing(parsed, wsKey);
      const legacyContext = getLegacyWsKeyContext(wsKey);
      if (legacyContext) {
        parsed.wsMarket = legacyContext.market;
      }

      // const eventType = eventType; //parsed?.stream;
      // const eventOperation = parsed?.op;

      const traceEmittable = false;
      if (traceEmittable) {
        this.logger.trace('resolveEmittableEvents', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          eventType,
          parsed: JSON.stringify(parsed),
          // parsed: JSON.stringify(parsed, null, 2),
        });
      }
      const reqId = parsed.id;
      const isWSAPIResponse = typeof parsed.id === 'number';

      const EVENTS_AUTHENTICATED = ['auth'];
      const EVENTS_RESPONSES = [
        'subscribe',
        'unsubscribe',
        'COMMAND_RESP',
        'ping',
        'pong',
      ];

      // WS API response
      // TODO: after
      if (isWSAPIResponse) {
        const retCode = parsed.status;

        /**
         * Responses to "subscribe" are quite basic, with no indication of errors (e.g. bad topic):
         *
         *   {
         *     result: null,
         *     id: 1,
         *   };
         *
         * Will need some way to tell this apart from an actual WS API response with error. Maybe to send it via a diff check than isWSAPIResponse=true
         *
         * Example wsapi error:
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
          typeof parsed.error?.code === 'number' && parsed.error?.code !== 0;

        // This is the counterpart to getPromiseRefForWSAPIRequest
        const promiseRef = [wsKey, reqId].join('_');

        if (!reqId) {
          this.logger.error(
            'WS API response is missing reqId - promisified workflow could get stuck. If this happens, please get in touch with steps to reproduce. Trace:',
            {
              wsKey,
              promiseRef,
              parsedEvent: parsed,
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
                ...parsed,
              },
              true,
            );
          } catch (e) {
            this.logger.error('Exception trying to reject WSAPI promise', {
              wsKey,
              promiseRef,
              parsedEvent: parsed,
            });
          }

          results.push({
            eventType: 'exception',
            event: parsed,
            isWSAPIResponse: isWSAPIResponse,
          });
          return results;
        }

        // authenticated
        if (parsed.result?.apiKey) {
          // Note: Without this check, this will also trigger "onWsAuthenticaated()" for session.status requests
          if (this.getWsStore().getAuthenticationInProgressPromise(wsKey)) {
            results.push({
              eventType: 'authenticated',
              event: parsed,
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
              ...parsed,
            },
            true,
          );
        } catch (e) {
          this.logger.error('Exception trying to resolve WSAPI promise', {
            wsKey,
            promiseRef,
            parsedEvent: parsed,
          });
        }

        results.push({
          eventType: 'response',
          event: parsed,
          isWSAPIResponse: isWSAPIResponse,
        });

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
          parsed,
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
          parsed,
          eventType,
          false,
          // Suffix all events for the beautifier, if market is options
          // Options has some conflicting keys with different intentions
          wsKey === 'eoptions' ? 'Options' : '',
        );

        results.push({
          eventType: 'formattedMessage',
          event: beautifiedMessage,
          isWSAPIResponse,
        });

        // emit an additional event for user data messages
        if (!Array.isArray(beautifiedMessage) && eventType) {
          if (
            [
              'balanceUpdate',
              'executionReport',
              'listStatus',
              'listenKeyExpired',
              'outboundAccountPosition',
              'ACCOUNT_CONFIG_UPDATE',
              'ACCOUNT_UPDATE',
              'MARGIN_CALL',
              'ORDER_TRADE_UPDATE',
              'TRADE_LITE',
              'CONDITIONAL_ORDER_TRIGGER_REJECT',
            ].includes(eventType)
          ) {
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
          event: parsed?.data ? parsed.data : parsed,
        });

        return results;
      }

      // Messages that are a "reply" to a request/command (e.g. subscribe to these topics) typically include the "op" property
      if (typeof eventType === 'string') {
        // Failed request
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // These are r  equest/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (EVENTS_RESPONSES.includes(eventType)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (EVENTS_AUTHENTICATED.includes(eventType)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }
        this.logger.error(
          `!! Unhandled string operation type "${eventType}". Defaulting to "update" channel...`,
          parsed,
        );
      } else {
        this.logger.error(
          `!!!! Unhandled non-string event type "${eventType}". Defaulting to "update" channel...`,
          parsed,
        );
      }

      // In case of catastrophic failure, fallback to noisy emit update
      results.push({
        eventType: 'message',
        event: parsed,
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
   * Subscribe to spot user data stream - listen key is automaticallyr generated. Calling multiple times only opens one connection.
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

  /**
   * Subscribe to margin user data stream - listen key is automatically generated.
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

  /**
   * Subscribe to isolated margin user data stream - listen key is automatically generated.
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
        miscState,
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
        ...miscState,
        error: e?.stack || e,
      });
    }
  }

  /**
   * Subscribe to margin risk user data stream - listen key is automatically generated.
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

  protected isCustomReconnectionNeeded(wsKey: string): boolean {
    return wsKey.includes('userData');
  }

  protected async triggerCustomReconnectionWorkflow(
    legacyWsKey: string,
  ): Promise<void> {
    console.log(`triggerCustomReconnectionWorkflow(${legacyWsKey})`);
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
            'usdmTestnet',
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
            'coinmTestnet',
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
   * --------------------------
   * End of SPOT market websocket streams
   * --------------------------
   **/

  /**
   * Subscribe to USD-M Futures user data stream - listen key is automatically generated.
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
        isTestnet,
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

  /**
   * Subscribe to COIN-M Futures user data stream - listen key is automatically generated.
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
          isTestnet,
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

  /**
   * Subscribe to Portfolio Margin user data stream - listen key is automatically generated.
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
    const streamName = market === 'spot' ? 'depth' : 'diffBookDepth';

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
