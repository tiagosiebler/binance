/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import WebSocket from 'isomorphic-ws';

import { parseRawWsMessage } from '.';
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
import { WsTopic } from './types/websockets/ws-general';
import {
  BaseWebsocketClient,
  EmittableEvent,
  MidflightWsRequestEvent,
} from './util/BaseWSClient';
import Beautifier from './util/beautifier';
import { appendEventIfMissing, isWsPong } from './util/requestUtils';
import {
  isTopicSubscriptionConfirmation,
  isTopicSubscriptionSuccess,
} from './util/typeGuards';
import { SignAlgorithm, signMessage } from './util/webCryptoAPI';
import {
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getWsUrl,
  isPrivateWsTopic,
  parseEventTypeFromMessage,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WsKey,
  WsTopicRequest,
} from './util/websockets/websocket-util';
import { WSConnectedResult } from './util/websockets/WsStore.types';

const WS_LOGGER_CATEGORY = { category: 'binance-ws' };

/**
 *
 * Different steps:
 * - Public WS subscription on multiplex connection.
 * - Listenkey subscription on multiplex connection.
 * - Listenkey subscription on DEDICATED connection.
 * - WS API commands
 * - Testnet
 * - Is everything consistent and intuitive across different products?
 *
 * Any place for WS Market? Redundant?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export class WebsocketClientNew extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBinance<WsTopic>
> {
  private beautifier: Beautifier = new Beautifier();

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting
   * for automatic connection by SDK.
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
    // switch (this.options.market) {
    //   case 'v5': {
    //     return [...this.connectPublic(), this.connectPrivate()];
    //   }
    //   default: {
    //     throw neverGuard(this.options.market, 'connectAll(): Unhandled market');
    //   }
    // }
    return [];
  }

  /**
   * Ensures the WS API connection is active and ready.
   *
   * You do not need to call this, but if you call this before making any WS API requests,
   * it can accelerate the first request (by preparing the connection in advance).
   */
  public connectWSAPI(): Promise<unknown> {
    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(WS_KEY_MAP.mainWSAPI);
  }

  public connectPublic(): Promise<WSConnectedResult | undefined>[] {
    // switch (this.options.market) {
    //   case 'v5':
    //   default: {
    //     return [
    //       this.connect(WS_KEY_MAP.v5SpotPublic),
    //       this.connect(WS_KEY_MAP.v5LinearPublic),
    //       this.connect(WS_KEY_MAP.v5InversePublic),
    //       this.connect(WS_KEY_MAP.v5OptionPublic),
    //     ];
    //   }
    // }
    return [];
  }

  public async connectPrivate(): Promise<WebSocket | undefined> {
    // switch (this.options.market) {
    //   case 'v5':
    //   default: {
    //     return this.connect(WS_KEY_MAP.v5Private);
    //   }
    // }
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
  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    const wsBaseURL = getWsUrl(wsKey, this.options, this.logger);

    // If auth is needed for this wsKey URL, this returns a suffix
    const authParams = await this.getWsAuthURLSuffix(wsKey);
    if (!authParams) {
      return wsBaseURL;
    }

    return wsBaseURL + '?' + authParams;
  }

  /**
   * Return params required to make authorized request
   */
  private async getWsAuthURLSuffix(wsKey: WsKey): Promise<string> {
    return '';
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
      appendEventIfMissing(parsed, wsKey);

      const eventType = parseEventTypeFromMessage(parsed);
      // const eventType = eventType; //parsed?.stream;
      const eventOperation = parsed?.op;

      // this.logger.trace('resolveEmittableEvents', {
      //   ...WS_LOGGER_CATEGORY,
      //   wsKey,
      //   eventType,
      //   eventOperation,
      //   parsed: JSON.stringify(parsed),
      //   // parsed: JSON.stringify(parsed, null, 2),
      // });

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

        this.logger.trace(
          'resolveEmittableEvents(): parse response: ',
          JSON.stringify(parsed, null, 2),
        );

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

      if (this.options.beautify) {
        const beautifiedMessage = this.beautifier.beautifyWsMessage(
          parsed,
          eventType,
          false,
        );

        results.push({
          eventType: 'formattedMessage',
          event: beautifiedMessage,
          isWSAPIResponse,
        });

        // emit a separate event for user data messages
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
      if (typeof eventOperation === 'string') {
        // Failed request
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // These are r  equest/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (EVENTS_RESPONSES.includes(eventOperation)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (EVENTS_AUTHENTICATED.includes(eventOperation)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        this.logger.error(
          `!! Unhandled string operation type "${eventOperation}". Defaulting to "update" channel...`,
          parsed,
        );
      } else {
        this.logger.error(
          `!!!! Unhandled non-string event type "${eventOperation}". Defaulting to "update" channel...`,
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
}
