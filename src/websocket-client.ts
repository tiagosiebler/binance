/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import WebSocket from 'isomorphic-ws';

import { KlineInterval } from './types/shared';
import { WsMarket } from './types/websockets';
import {
  Exact,
  WSAPIOperation,
  WsAPIOperationResponseMap,
  WSAPIRequest,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
  WsOperation,
  WsRequestOperationBinance,
} from './types/websockets/ws-api';
import { MessageEventLike } from './types/websockets/ws-events';
import {
  WSClientConfigurableOptions,
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
  getLegacyWsKeyContext,
  getLegacyWsStoreKeyWithContext,
  RestClientOptions,
} from './util/requestUtils';
import {
  isTopicSubscriptionConfirmation,
  isTopicSubscriptionSuccess,
  neverGuard,
} from './util/typeGuards';
import { SignAlgorithm, signMessage } from './util/webCryptoAPI';
import { ListenKeyStateCache } from './util/websockets/listen-key-state-cache';
import { RestClientCache } from './util/websockets/rest-client-cache';
import {
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getWsUrl,
  getWsURLSuffix,
  isPrivateWsTopic,
  parseEventTypeFromMessage,
  parseRawWsMessage,
  resolveUserDataMarketForWsKey,
  resolveWsKeyForLegacyMarket,
  safeTerminateWs,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
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

  private listenKeyStateCache: ListenKeyStateCache;

  private respawnTimeoutCache: Record<string, ReturnType<typeof setTimeout>> =
    {};

  private beautifier: Beautifier = new Beautifier({
    warnKeyMissingInMap: true,
  });

  constructor(options?: WSClientConfigurableOptions, logger?: DefaultLogger) {
    super(options, logger);

    this.listenKeyStateCache = new ListenKeyStateCache(this.logger);
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
  public connectWSAPI(): Promise<unknown> {
    // TODO: this will need a switch for diff WS API endpoints

    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(WS_KEY_MAP.mainWSAPI);
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
    TWSParams extends Exact<WsAPITopicRequestParamMap[TWSOperation]>,
  >(
    wsKey: TWSKey,
    operation: TWSOperation,
    ...params: TWSParams extends undefined ? [] : [TWSParams]
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

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
    TWSParams extends any, //Exact<WsAPITopicRequestParamMap[TWSOperation]>,
    TWSAPIResponse extends any, //      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: WsKey,
    operation: TWSOperation,
    params: TWSParams,
  ): Promise<TWSAPIResponse> {
    //WsAPIOperationResponseMap[TWSOperation]> {

    return { wsKey, operation, params } as any;
    // this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`);
    // await this.assertIsConnected(wsKey);
    // this.logger.trace('sendWSAPIRequest()->assertIsConnected() ok');

    // await this.assertIsAuthenticated(wsKey);
    // this.logger.trace('sendWSAPIRequest()->assertIsAuthenticated() ok');

    // const requestEvent: WSAPIRequest<TWSParams> = {
    //   reqId: this.getNewRequestId(),
    //   header: {
    //     'X-BAPI-RECV-WINDOW': `${this.options.recvWindow}`,
    //     'X-BAPI-TIMESTAMP': `${Date.now()}`,
    //     Referer: APIID,
    //   },
    //   op: operation,
    //   args: [params],
    // };

    // // Sign, if needed
    // const signedEvent = await this.signWSAPIRequest(requestEvent);

    // // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    // const promiseRef = getPromiseRefForWSAPIRequest(requestEvent);

    // const deferredPromise =
    //   this.getWsStore().createDeferredPromise<TWSAPIResponse>(
    //     wsKey,
    //     promiseRef,
    //     false,
    //   );

    // this.logger.trace(
    //   `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent, null, 2)}`,
    // );

    // // Send event
    // this.tryWsSend(wsKey, JSON.stringify(signedEvent));

    // this.logger.trace(`sendWSAPIRequest(): sent ${operation} event`);

    // // Return deferred promise, so caller can await this call
    // return deferredPromise.promise!;
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
  protected async getWsUrl(
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

  protected async getWsAuthRequestEvent(
    wsKey: WsKey,
  ): Promise<WsRequestOperationBinance<string>> {
    try {
      const { signature, expiresAt } = await this.getWsAuthSignature(wsKey);

      const request: WsRequestOperationBinance<string> = {
        method: 'SUBSCRIBE',
        params: ['litsenKeyHere'], // TODO::
        id: this.getNewRequestId(),
      };

      return request;
    } catch (e) {
      this.logger.error(e, { ...WS_LOGGER_CATEGORY, wsKey });
      throw e;
    }
  }

  private async getWsAuthSignature(
    wsKey: WsKey,
  ): Promise<{ expiresAt: number; signature: string }> {
    const { api_key, api_secret } = this.options;

    if (!api_key || !api_secret) {
      this.logger.error(
        'Cannot authenticate websocket, either api or private keys missing.',
        { ...WS_LOGGER_CATEGORY, wsKey },
      );
      throw new Error('Cannot auth - missing api or secret in config');
    }

    this.logger.trace("Getting auth'd request params", {
      ...WS_LOGGER_CATEGORY,
      wsKey,
    });

    const recvWindow = this.options.recvWindow || 5000;

    const signatureExpiresAt = Date.now() + this.getTimeOffsetMs() + recvWindow;

    const signature = await this.signMessage(
      'GET/realtime' + signatureExpiresAt,
      api_secret,
      'hex',
      'SHA-256',
    );

    return {
      expiresAt: signatureExpiresAt,
      signature,
    };
  }

  private async signWSAPIRequest<TRequestParams = object>(
    requestEvent: WSAPIRequest<TRequestParams>,
  ): Promise<WSAPIRequest<TRequestParams>> {
    // Not needed for Binance. Auth happens only on connection open, automatically.
    // TODO:? needed for binance?
    return requestEvent;
  }

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
        const retCode = parsed.retCode;

        /**
         * Responses to "subscribe" are quite basic, with no indication of errors (e.g. bad topic):
         *
         *   {
         *     result: null,
         *     id: 1,
         *   };
         *
         * Will need some way to tell this apart from an actual WS API response with error. Maybe to send it via a diff check than isWSAPIResponse=true
         */

        const isError = false; // retCode !== 0;

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
        this.teardownUserDataListenKey(
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
        // TODO: this still works?
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

  private teardownUserDataListenKey(listenKey?: string, ws?: WebSocket) {
    if (listenKey) {
      this.listenKeyStateCache.clearAllListenKeyState(listenKey);
      safeTerminateWs(ws);
    }
  }

  protected isCustomReconnectionNeeded(wsKey: string): boolean {
    return wsKey.includes('userData');
  }

  protected async triggerCustomReconnectionWorkflow(
    legacyWsKey: string,
  ): Promise<void> {
    if (legacyWsKey.includes('userData')) {
      const legacyWsKeyContext = getLegacyWsKeyContext(legacyWsKey);
      if (!legacyWsKeyContext) {
        throw new Error(
          `triggerCustomReconnectionWorkflow(): no context found in supplied wsKey: "${legacyWsKey}"`,
        );
      }

      const { market, symbol, isTestnet, listenKey, wsKey } =
        legacyWsKeyContext;

      this.logger.info('Preparing to reconnect userData stream...', {
        ...WS_LOGGER_CATEGORY,
        legacyWsKey,
        market,
        symbol,
        isTestnet,
        listenKey,
        wsKey,
      });

      if (listenKey) {
        this.logger.trace('Checking if old listenKey has active timers...', {
          listenKey,
        });
        this.listenKeyStateCache.clearAllListenKeyState(listenKey);
      } else {
        throw new Error('No listenKey stashed in legacyWsKey context???');
      }

      this.logger.info('Reconnecting to user data stream...', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
        market,
        symbol,
        legacyWsKeyContext,
      });

      // We'll set a new one once the new stream respawns, it might have a diff listenKey in the wsKey
      this.getWsStore().delete(legacyWsKey as any);

      if (!wsKey) {
        this.logger.error(
          'triggerCustomReconnectionWorkflow(): missing real "wsKey" from legacy context: ',
          {
            legacyWsKeyContext,
            legacyWsKey,
          },
        );
        throw new Error(
          'triggerCustomReconnectionWorkflow(): missing real "wsKey" from legacy context',
        );
      }
      this.respawnUserDataStream(wsKey, market, symbol, isTestnet);

      return;
    }
  }

  private setKeepAliveListenKeyTimer(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    // This MUST happen before fetching listenKey state,
    // since the getListenKeyState() creates new state,
    // while clearAllListenKeyState DELETES it
    this.listenKeyStateCache.clearAllListenKeyState(listenKey);

    const listenKeyState = this.listenKeyStateCache.getListenKeyState(
      listenKey,
      market,
    );

    this.logger.trace(
      `setKeepAliveListenKeyTimer() -> CREATED NEW keepAliveListenKey INTERVAL timer for ${listenKey}`,
    );

    // Set timer to keep WS alive every 50 minutes
    const minutes50 = 1000 * 60 * 50;
    listenKeyState.keepAliveTimer = setInterval(
      () =>
        this.checkKeepAliveListenKey(
          listenKey,
          market,
          ws,
          wsKey,
          symbol,
          isTestnet,
        ),
      minutes50,
      // 1000 * 60
    );
  }

  private sendKeepAliveForMarket(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    switch (market) {
      case 'spot':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
          )
          .keepAliveSpotUserDataListenKey(listenKey);
      case 'spotTestnet':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
            true,
          )
          .keepAliveSpotUserDataListenKey(listenKey);
      case 'margin':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
          )
          .keepAliveMarginUserDataListenKey(listenKey);
      case 'isolatedMargin':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
          )
          .keepAliveIsolatedMarginUserDataListenKey({
            listenKey,
            symbol: symbol!,
          });
      case 'coinm':
      case 'options':
      case 'optionsTestnet':
      case 'usdm':
        return this.restClientCache
          .getUSDMRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'usdmTestnet':
        return this.restClientCache
          .getUSDMRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
            isTestnet,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'coinmTestnet':
        return this.restClientCache
          .getCOINMRestClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
            isTestnet,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'portfoliom':
        return this.restClientCache
          .getPortfolioClient(
            this.getRestClientOptions(),
            this.options.requestOptions,
          )
          .keepAlivePMUserDataListenKey();
      default:
        throw neverGuard(
          market,
          `Failed to send keep alive for user data stream in unhandled market ${market}`,
        );
    }
  }

  private async checkKeepAliveListenKey(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    const listenKeyState = this.listenKeyStateCache.getListenKeyState(
      listenKey,
      market,
    );

    try {
      if (listenKeyState.keepAliveRetryTimer) {
        clearTimeout(listenKeyState.keepAliveRetryTimer);
        listenKeyState.keepAliveRetryTimer = undefined;

        this.logger.trace(
          `checkKeepAliveListenKey() -> CLEARED old one-off keepAliveRetryTimer timer for ${listenKey}`,
        );
      }

      // Simple way to test keep alive failure handling:
      // throw new Error(`Fake keep alive failure`);

      await this.sendKeepAliveForMarket(
        listenKey,
        market,
        ws,
        wsKey,
        symbol,
        isTestnet,
      );

      listenKeyState.lastKeepAlive = Date.now();
      listenKeyState.keepAliveFailures = 0;
      this.logger.info(
        `Completed keep alive cycle for listenKey(${listenKey}) in market(${market})`,
        { ...WS_LOGGER_CATEGORY, listenKey },
      );
    } catch (e) {
      listenKeyState.keepAliveFailures++;

      // Reconnect follows a less automatic workflow since this is tied to a listen key (which may need a new one).
      // - Kill connection first, with instruction NOT to reconnect automatically
      // - Then respawn a connection with a potentially new listen key (since the old one may be invalid now)

      const shouldReconnectAfterClose = false;

      // code: -1125,
      // message: 'This listenKey does not exist.',
      const errorCode = e?.code;
      if (errorCode === -1125) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key - listen key expired/invalid. Respawning with fresh listen key...',
          {
            ...WS_LOGGER_CATEGORY,
            listenKey,
            error: e,
            errorCode,
            errorMsg: e?.message,
          },
        );

        this.close(wsKey, shouldReconnectAfterClose);
        this.respawnUserDataStream(wsKey, market, symbol, isTestnet);

        return;
      }

      // If max failurees reached, tear down and respawn if allowed
      if (listenKeyState.keepAliveFailures >= 3) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key after 3 attempts',
          { ...WS_LOGGER_CATEGORY, listenKey, error: e },
        );

        this.close(wsKey, shouldReconnectAfterClose);
        this.respawnUserDataStream(wsKey, market, symbol, isTestnet);

        return;
      }

      const reconnectDelaySeconds = 1000 * 15;
      this.logger.info(
        `Userdata keep alive request failed due to error, trying again with short delay (${reconnectDelaySeconds} seconds)`,
        {
          ...WS_LOGGER_CATEGORY,
          listenKey,
          error: e,
          keepAliveAttempts: listenKeyState.keepAliveFailures,
        },
      );

      this.logger.trace(
        `checkKeepAliveListenKey() -> CREATED NEW one-off keepAliveRetryTimer  timer for ${listenKey}`,
      );
      listenKeyState.keepAliveRetryTimer = setTimeout(
        () =>
          this.checkKeepAliveListenKey(listenKey, market, ws, wsKey, symbol),
        reconnectDelaySeconds,
      );
    }
  }

  private async respawnUserDataStream(
    wsKey: WsKey,
    market: WsMarket,
    symbol?: string,
    isTestnet?: boolean,
    respawnAttempt?: number,
  ): Promise<void> {
    // If another connection attempt is in progress for this listen key, don't initiate a retry or the risk is multiple connections on the same listen key
    const forceNewConnection = false;
    const isReconnecting = true;
    let ws: WebSocket | undefined;

    try {
      switch (market) {
        case 'spot':
          ws = await this.subscribeSpotUserDataStream(
            wsKey,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'margin':
          // ws = await this.subscribeMarginUserDataStream(
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'isolatedMargin':
          // ws = await this.subscribeIsolatedMarginUserDataStream(
          //   symbol!,
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'usdm':
          // ws = await this.subscribeUsdFuturesUserDataStream(
          //   isTestnet,
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'usdmTestnet':
          // ws = await this.subscribeUsdFuturesUserDataStream(
          //   true,
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'coinm':
          // ws = await this.subscribeCoinFuturesUserDataStream(
          //   isTestnet,
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'coinmTestnet':
          // ws = await this.subscribeCoinFuturesUserDataStream(
          //   true,
          //   forceNewConnection,
          //   isReconnecting,
          // );
          throw new Error('todo');
          break;
        case 'portfoliom':
        case 'spotTestnet':
        case 'options':
        case 'optionsTestnet':
          throw new Error(
            'TODO: respawn other user data streams once subscribe methods have been added',
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
        symbol,
        isTestnet,
        error: e,
      });
      this.emit('exception', { wsKey: market + '_' + 'userData', error: e });
    }

    if (!ws) {
      const delayInSeconds = 2;
      this.logger.error(
        'User key respawn failed, trying again with short delay',
        {
          ...WS_LOGGER_CATEGORY,
          market,
          symbol,
          isTestnet,
          respawnAttempt,
          delayInSeconds,
        },
      );

      const respawnTimeoutKey = [market, symbol, isTestnet].join('_');

      // Prevent simultaneous timers in same scope
      if (this.respawnTimeoutCache[respawnTimeoutKey]) {
        clearTimeout(this.respawnTimeoutCache[respawnTimeoutKey]);
        delete this.respawnTimeoutCache[respawnTimeoutKey];

        this.logger.error(
          'Respawn timer already active while trying to queue respawn...delaying existing timer further...',
          {
            ...WS_LOGGER_CATEGORY,
            market,
            symbol,
            isTestnet,
            respawnAttempt,
            delayInSeconds,
          },
        );
      }

      // Execute reconnection workflow after short delay
      this.respawnTimeoutCache[respawnTimeoutKey] = setTimeout(() => {
        delete this.respawnTimeoutCache[respawnTimeoutKey];
        this.respawnUserDataStream(
          wsKey,
          market,
          symbol,
          isTestnet,
          respawnAttempt ? respawnAttempt + 1 : 1,
        );
      }, 1000 * delayInSeconds);
    }
  }

  /**
   * Subscribe to a spot user data stream. Use REST client to generate and persist listen key.
   * Supports spot, margin & isolated margin listen keys.
   */
  public async subscribeSpotUserDataStreamWithListenKey(
    wsKey: WsKey,
    listenKey: string,
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): WebSocket | undefined {
    const market = resolveUserDataMarketForWsKey(wsKey);
    const streamName = 'userData';
    const symbol = undefined;

    const derivedWsKey = getLegacyWsStoreKeyWithContext(
      market,
      streamName,
      symbol,
      listenKey,
      wsKey,
    );

    this.logger.trace('subscribeSpotUserDataStreamWithListenKey()->begin', {
      wsKey,
      derivedWsKey,
      listenKey,
      forceNewConnection,
      isReconnecting,
      market,
    });

    if (
      !forceNewConnection &&
      this.getWsStore().isConnectionAttemptInProgress(derivedWsKey)
    ) {
      this.logger.trace(
        'Existing spot user data connection in progress for listen key. Avoiding duplicate',
      );
      return this.getWsStore().getWs(derivedWsKey);
    }

    // Prepare the WS state for awareness whether this is a reconnect or fresh connect
    if (isReconnecting) {
      this.getWsStore().setConnectionState(
        derivedWsKey,
        WsConnectionStateEnum.RECONNECTING,
      );
    }

    // Begin the connection process with the active listen key
    try {
      const wsBaseUrl = await this.getWsUrl(wsKey, 'userData');
      const wsURL = wsBaseUrl + `/${listenKey}`;

      const throwOnConnectionError = true;
      const ws = await this.connect(
        derivedWsKey,
        wsURL,
        throwOnConnectionError,
      );

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(listenKey, market, ws, derivedWsKey);
      return ws;
    } catch (e) {
      this.logger.error(
        'Exception in subscribeSpotUserDataStreamWithListenKey()',
        { ...WS_LOGGER_CATEGORY, e: e?.stack || e },
      );

      // In case any timers already exist, pre-wipe
      this.listenKeyStateCache.clearAllListenKeyState(listenKey);

      // So the next attempt doesn't think an attempt is already in progress
      this.getWsStore().setConnectionState(
        wsKey,
        WsConnectionStateEnum.INITIAL,
      );

      throw e;
    }
  }

  /**
   * Subscribe to spot user data stream - listen key is automaticallyr generated. Calling multiple times only opens one connection.
   */
  public async subscribeSpotUserDataStream(
    wsKey: WsKey = 'main',
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket | undefined> {
    try {
      const { listenKey } = await this.restClientCache
        .getSpotRestClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
        )
        .getSpotUserDataListenKey();

      return this.subscribeSpotUserDataStreamWithListenKey(
        wsKey,
        listenKey,
        forceNewConnection,
        isReconnecting,
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
        isReconnecting,
        error: e?.stack || e,
      });
    }
  }

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
      margin: 'wss://stream.binance.com:9443',
      isolatedMargin: 'wss://stream.binance.com:9443',
      usdm: 'wss://fstream.binance.com',
      usdmTestnet: 'wss://stream.binancefuture.com',
      coinm: 'wss://dstream.binance.com',
      coinmTestnet: 'wss://dstream.binancefuture.com',
      options: 'wss://vstream.binance.com',
      optionsTestnet: 'wss://testnetws.binanceops.com',
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
