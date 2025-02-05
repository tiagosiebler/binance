/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';

import { CoinMClient } from './coinm-client';
import { DefaultLogger } from './logger';
import { MainClient } from './main-client';
import { KlineInterval } from './types/shared';
import {
  WsFormattedMessage,
  WsMarket,
  WsRawMessage,
  WsResponse,
  WsUserDataEvents,
} from './types/websockets';
import { USDMClient } from './usdm-client';
import Beautifier from './util/beautifier';
import {
  appendEventIfMissing,
  appendEventMarket,
  getContextFromWsKey,
  getWsKeyWithContext,
  RestClientOptions,
} from './util/requestUtils';
import { safeTerminateWs } from './util/ws-utils';
import WsStore, { WsConnectionStateEnum } from './util/WsStore';

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
};

const loggerCategory = { category: 'binance-ws' };

export interface WSClientConfigurableOptions {
  api_key?: string;
  api_secret?: string;
  beautify?: boolean;
  // Disable ping/pong ws heartbeat mechanism (not recommended)
  disableHeartbeat?: boolean;
  pongTimeout?: number;
  pingInterval?: number;
  reconnectTimeout?: number;
  restOptions?: RestClientOptions;
  requestOptions?: AxiosRequestConfig;
  wsOptions?: {
    protocols?: string[];
    agent?: any;
  };
  wsUrl?: string;
}

export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
}

// export const wsKeySpot = 'spot';
// export const wsKeyLinearPrivate = 'linearPrivate';
// export const wsKeyLinearPublic = 'linearPublic';

// This is used to differentiate between each of the available websocket streams (as binance has multiple websockets)
export type WsKey =
  | string
  | 'spot'
  | 'margin'
  | 'usdmfutures'
  | 'coinmfutures'
  | 'options';

type WsEventInternalSrc = 'event' | 'function';

interface RestClientStore {
  spot: MainClient;
  margin: MainClient;
  usdmFutures: USDMClient;
  usdmFuturesTestnet: USDMClient;
  coinmFutures: CoinMClient;
  coinmFuturesTestnet: CoinMClient;
  // options: MainClient;
}

export declare interface WebsocketClient {
  on(event: 'reply', listener: (event: WsResponse) => void): this;

  on(event: 'message', listener: (event: WsRawMessage) => void): this;

  on(
    event: 'formattedMessage',
    listener: (event: WsFormattedMessage) => void,
  ): this;

  on(
    event: 'formattedUserDataMessage',
    listener: (event: WsUserDataEvents) => void,
  ): this;

  on(
    event: 'error',
    listener: (event: { wsKey: WsKey; error: any; rawEvent?: string }) => void,
  ): this;

  on(
    event: 'open' | 'reconnected' | 'reconnecting' | 'close',
    listener: (event: { wsKey: WsKey; ws: WebSocket; event?: any }) => void,
  ): this;
}

interface ListenKeyPersistenceState {
  keepAliveTimer: ReturnType<typeof setInterval> | undefined;
  keepAliveRetryTimer: ReturnType<typeof setTimeout> | undefined;
  lastKeepAlive: number;
  market: WsMarket;
  keepAliveFailures: number;
}

function throwUnhandledSwitch(x: never, msg: string): never {
  throw new Error(msg);
}

function parseEventTypeFromMessage(parsedMsg?): string | undefined {
  if (parsedMsg?.e) {
    return parsedMsg.e;
  }
  if (Array.isArray(parsedMsg) && parsedMsg.length) {
    return parsedMsg[0]?.e;
  }

  return;
}

/**
 * Try to resolve event.data. Example circumstance: {"stream":"!forceOrder@arr","data":{"e":"forceOrder","E":1634653599186,"o":{"s":"IOTXUSDT","S":"SELL","o":"LIMIT","f":"IOC","q":"3661","p":"0.06606","ap":"0.06669","X":"FILLED","l":"962","z":"3661","T":1634653599180}}}
 */
export function parseRawWsMessage(event: any) {
  if (typeof event === 'string') {
    const parsedEvent = JSON.parse(event);

    if (parsedEvent.data) {
      if (typeof parsedEvent.data === 'string') {
        return parseRawWsMessage(parsedEvent.data);
      }
      return parsedEvent.data;
    }
  }
  if (event?.data) {
    return JSON.parse(event.data);
  }
  return event;
}

export class WebsocketClient extends EventEmitter {
  private logger: typeof DefaultLogger;

  private options: WebsocketClientOptions;

  private wsStore: WsStore;

  private beautifier: Beautifier;

  private restClients: Partial<RestClientStore>;

  private listenKeyStateStore: Record<string, ListenKeyPersistenceState>;

  private wsUrlKeyMap: Record<string, WsKey>;

  constructor(
    options: WSClientConfigurableOptions,
    logger?: typeof DefaultLogger,
  ) {
    super();

    this.logger = logger || DefaultLogger;
    this.wsStore = new WsStore(this.logger);
    this.beautifier = new Beautifier();

    this.restClients = {};

    this.options = {
      pongTimeout: 7500,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options,
    };

    this.listenKeyStateStore = {};
    this.wsUrlKeyMap = {};

    // add default error handling so this doesn't crash node (if the user didn't set a handler)
    this.on('error', () => {});
  }

  private getRestClientOptions(): RestClientOptions {
    return {
      ...this.options,
      ...this.options.restOptions,
      api_key: this.options.api_key,
      api_secret: this.options.api_secret,
    };
  }

  public connectToWsUrl(
    url: string,
    wsKey?: WsKey,
    forceNewConnection?: boolean,
  ): WebSocket {
    const wsRefKey = wsKey || url;

    const oldWs = this.wsStore.getWs(wsRefKey);
    if (oldWs && this.wsStore.isWsOpen(wsRefKey) && !forceNewConnection) {
      this.logger.silly(
        'connectToWsUrl(): Returning existing open WS connection',
        { ...loggerCategory, wsRefKey },
      );
      return oldWs;
    }

    this.logger.silly(
      `connectToWsUrl(): Opening WS connection to URL: ${url}`,
      { ...loggerCategory, wsRefKey },
    );

    const { protocols = [], ...wsOptions } = this.options.wsOptions || {};

    const ws = new WebSocket(url, protocols, wsOptions);
    this.wsUrlKeyMap[url] = wsRefKey;

    if (typeof ws.on === 'function') {
      ws.on('ping', (event) => this.onWsPing(event, wsRefKey, ws, 'event'));
      ws.on('pong', (event) => this.onWsPong(event, wsRefKey, 'event'));
    }

    ws.onopen = (event) => this.onWsOpen(event, wsRefKey, url);
    ws.onerror = (event) =>
      this.parseWsError('WS Error Event', event, wsRefKey, url);
    ws.onclose = (event) => this.onWsClose(event, wsRefKey, ws, url);
    ws.onmessage = (event) => this.onWsMessage(event, wsRefKey, 'function');

    // Not sure these work in the browser, the traditional event listeners are required for ping/pong frames in node
    ws.onping = (event) => this.onWsPing(event, wsRefKey, ws, 'function');
    ws.onpong = (event) => this.onWsPong(event, wsRefKey, 'function');

    // Add ws connection with key to store
    this.wsStore.setWs(wsRefKey, ws);

    ws.wsKey = wsRefKey;

    return ws;
  }

  public tryWsSend(wsKey: WsKey, wsMessage: string) {
    try {
      this.logger.silly('Sending upstream ws message: ', {
        ...loggerCategory,
        wsMessage,
        wsKey,
      });
      if (!wsKey) {
        throw new Error('No wsKey provided');
      }

      const ws = this.getWs(wsKey);
      if (!ws) {
        throw new Error(
          `No active websocket connection exists for wsKey: ${wsKey}`,
        );
      }
      ws.send(wsMessage);
    } catch (e) {
      this.logger.error('Failed to send WS message', {
        ...loggerCategory,
        wsMessage,
        wsKey,
        exception: e,
      });
    }
  }

  public tryWsPing(wsKey: WsKey) {
    try {
      // this.logger.silly(`Sending upstream ping: `, { ...loggerCategory, wsKey });
      if (!wsKey) {
        throw new Error('No wsKey provided');
      }

      const ws = this.getWs(wsKey);
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
        this.logger.silly(
          'WS ready state not open - refusing to send WS ping',
          { ...loggerCategory, wsKey, readyState: ws?.readyState },
        );
      }
    } catch (e) {
      this.logger.error('Failed to send WS ping', {
        ...loggerCategory,
        wsKey,
        exception: e,
      });
    }
  }

  private onWsOpen(ws: WebSocket, wsKey: WsKey, wsUrl: string) {
    this.logger.silly(`onWsOpen(): ${wsUrl} : ${wsKey}`);
    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.RECONNECTING)
    ) {
      this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
      this.emit('reconnected', { wsKey, ws });
    } else {
      this.logger.info('Websocket connected', { ...loggerCategory, wsKey });
      this.emit('open', { wsKey, ws });
    }

    this.setWsState(wsKey, WsConnectionStateEnum.CONNECTED);

    const topics = [...this.wsStore.getTopics(wsKey)];
    if (topics.length) {
      this.requestSubscribeTopics(wsKey, topics);
    }

    if (!this.options.disableHeartbeat) {
      const wsState = this.wsStore.get(wsKey, true)!;
      if (wsState.activePingTimer) {
        clearInterval(wsState.activePingTimer);
      }

      wsState.activePingTimer = setInterval(
        () => this.sendPing(wsKey, wsUrl),
        this.options.pingInterval,
      );
    }
  }

  private onWsClose(event: any, wsKey: WsKey, ws: WebSocket, wsUrl: string) {
    const wsConnectionState = this.wsStore.getConnectionState(wsKey);
    const { market, listenKey, isUserData } = getContextFromWsKey(wsKey);

    this.logger.info('Websocket connection closed', {
      ...loggerCategory,
      wsKey,
      eventCloseCode: event?.target?._closeCode,
      wsConnectionState,
      isUserData,
      listenKey,
      market,
    });

    // Clear any timers before we initiate revival
    this.clearTimers(wsKey);

    // User data sockets include the listen key. To prevent accummulation in memory we should clean up old disconnected states
    if (isUserData) {
      this.wsStore.delete(wsKey);

      if (listenKey) {
        this.clearUserDataKeepAliveTimer(listenKey);
      }
    }

    if (wsConnectionState !== WsConnectionStateEnum.CLOSING) {
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!, wsUrl);
      this.emit('reconnecting', { wsKey, event, ws });
    } else {
      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);
      this.emit('close', { wsKey, event, ws });
    }
  }

  private onWsMessage(
    event: MessageEvent,
    wsKey: WsKey,
    source: WsEventInternalSrc,
  ) {
    try {
      this.clearPongTimer(wsKey);

      const msg = parseRawWsMessage(event);

      // Edge case where raw event does not include event type, detect using wsKey and mutate msg.e
      appendEventIfMissing(msg, wsKey);
      appendEventMarket(msg, wsKey);

      const eventType = parseEventTypeFromMessage(msg);
      if (eventType) {
        this.emit('message', msg);

        if (eventType === 'listenKeyExpired') {
          const { market } = getContextFromWsKey(wsKey);
          this.logger.info(
            `${market} listenKey expired - attempting to respawn user data stream: ${wsKey}`,
          );

          // Just closing the connection (with the last parameter as true) will handle cleanup and respawn
          const shouldTriggerReconnect = true;
          this.close(wsKey, shouldTriggerReconnect);
        }

        if (this.options.beautify) {
          const beautifiedMessage = this.beautifier.beautifyWsMessage(
            msg,
            eventType,
            false,
          );

          this.emit('formattedMessage', beautifiedMessage);

          // emit a separate event for user data messages
          if (!Array.isArray(beautifiedMessage)) {
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
              this.emit('formattedUserDataMessage', beautifiedMessage);
            }
          }
        }
        return;
      }

      if (msg.result !== undefined) {
        this.emit('reply', {
          type: event.type,
          data: msg,
          wsKey,
        });
        return;
      }

      this.logger.warning(
        'Bug? Unhandled ws message event type. Check if appendEventIfMissing needs to parse wsKey.',
        {
          ...loggerCategory,
          parsedMessage: JSON.stringify(msg),
          rawEvent: event,
          wsKey,
          source,
        },
      );
    } catch (e) {
      this.logger.error('Exception parsing ws message: ', {
        ...loggerCategory,
        rawEvent: event,
        wsKey,
        error: e,
        source,
      });
      this.emit('error', { wsKey, error: e, rawEvent: event, source });
    }
  }

  private sendPing(wsKey: WsKey, wsUrl: string) {
    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
    this.tryWsPing(wsKey);

    this.wsStore.get(wsKey, true).activePongTimer = setTimeout(
      () => this.executeReconnectableClose(wsKey, 'Pong timeout', wsUrl),
      this.options.pongTimeout,
    );
  }

  private onWsPing(
    event: any,
    wsKey: WsKey,
    ws: WebSocket,
    source: WsEventInternalSrc,
  ) {
    this.logger.silly('Received ping, sending pong frame', {
      ...loggerCategory,
      wsKey,
      source,
    });
    ws.pong();
  }

  private onWsPong(event: any, wsKey: WsKey, source: WsEventInternalSrc) {
    this.logger.silly('Received pong, clearing pong timer', {
      ...loggerCategory,
      wsKey,
      source,
    });
    this.clearPongTimer(wsKey);
  }

  /**
   * Closes a connection, if it's even open. If open, this will trigger a reconnect asynchronously.
   * If closed, trigger a reconnect immediately
   */
  private executeReconnectableClose(
    wsKey: WsKey,
    reason: string,
    wsUrl: string,
  ) {
    this.logger.info(`${reason} - closing socket to reconnect`, {
      ...loggerCategory,
      wsKey,
      reason,
    });

    const wasOpen = this.wsStore.isWsOpen(wsKey);

    safeTerminateWs(this.getWs(wsKey));

    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);

    if (!wasOpen) {
      this.logger.info(
        `${reason} - socket already closed - trigger immediate reconnect`,
        {
          ...loggerCategory,
          wsKey,
          reason,
        },
      );
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout, wsUrl);
    }
  }

  public close(wsKey: WsKey, shouldReconnectAfterClose?: boolean) {
    this.logger.info('Closing connection', {
      ...loggerCategory,
      wsKey,
      willReconnect: shouldReconnectAfterClose,
    });
    this.setWsState(
      wsKey,
      shouldReconnectAfterClose
        ? WsConnectionStateEnum.RECONNECTING
        : WsConnectionStateEnum.CLOSING,
    );

    this.clearTimers(wsKey);
    this.getWs(wsKey)?.close();

    const { listenKey } = getContextFromWsKey(wsKey);
    if (listenKey) {
      this.teardownUserDataListenKey(listenKey, this.getWs(wsKey));
    } else {
      safeTerminateWs(this.getWs(wsKey));
    }
  }

  public closeAll(shouldReconnectAfterClose?: boolean) {
    const keys = this.wsStore.getKeys();
    this.logger.info(`Closing all ws connections: ${keys}`);
    keys.forEach((key) => {
      this.close(key, shouldReconnectAfterClose);
    });
  }

  public closeWs(ws: WebSocket, shouldReconnectAfterClose?: boolean) {
    const wsKey = this.wsUrlKeyMap[ws.url] || ws?.wsKey;
    if (!wsKey) {
      throw new Error(
        'Cannot close websocket as it has no known wsKey attached.',
      );
    }
    return this.close(wsKey, shouldReconnectAfterClose);
  }

  private parseWsError(
    context: string,
    error: any,
    wsKey: WsKey,
    wsUrl: string,
  ) {
    this.logger.error(context, { ...loggerCategory, wsKey, error });

    if (!error.message) {
      this.logger.error(`${context} due to unexpected error: `, error);
      this.emit('error', { error, wsKey, wsUrl });
      return;
    }

    switch (error.message) {
      case 'Unexpected server response: 401':
        this.logger.error(`${context} due to 401 authorization failure.`, {
          ...loggerCategory,
          wsKey,
        });
        break;

      default:
        if (
          this.wsStore.getConnectionState(wsKey) !==
          WsConnectionStateEnum.CLOSING
        ) {
          this.logger.error(
            `${context} due to unexpected response error: "${
              error?.msg || error?.message || error
            }"`,
            { ...loggerCategory, wsKey, error },
          );
          this.executeReconnectableClose(wsKey, 'unhandled onWsError', wsUrl);
        } else {
          this.logger.info(
            `${wsKey} socket forcefully closed. Will not reconnect.`,
          );
        }
        break;
    }
    this.emit('error', { error, wsKey, wsUrl });
  }

  private reconnectWithDelay(
    wsKey: WsKey,
    connectionDelayMs: number,
    wsUrl: string,
  ) {
    this.clearTimers(wsKey);

    if (
      this.wsStore.getConnectionState(wsKey) !==
      WsConnectionStateEnum.CONNECTING
    ) {
      this.setWsState(wsKey, WsConnectionStateEnum.RECONNECTING);
    }

    this.logger.info('Reconnecting to websocket with delay...', {
      ...loggerCategory,
      wsKey,
      connectionDelayMs,
    });

    if (this.wsStore.get(wsKey)?.activeReconnectTimer) {
      this.clearReconnectTimer(wsKey);
    }

    this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
      this.clearReconnectTimer(wsKey);

      if (wsKey.includes('userData')) {
        const { market, symbol, isTestnet } = getContextFromWsKey(wsKey);
        this.logger.info('Reconnecting to user data stream', {
          ...loggerCategory,
          wsKey,
          market,
          symbol,
        });

        // We'll set a new one once the new stream respawns, with a diff listenKey in the key
        this.wsStore.delete(wsKey);

        this.respawnUserDataStream(market, symbol, isTestnet);

        return;
      }

      this.logger.info('Reconnecting to public websocket', {
        ...loggerCategory,
        wsKey,
        wsUrl,
      });
      this.connectToWsUrl(wsUrl, wsKey);
    }, connectionDelayMs);
  }

  private clearTimers(wsKey: WsKey) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
    this.clearReconnectTimer(wsKey);
  }

  // Send a ping at intervals
  private clearPingTimer(wsKey: WsKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePingTimer) {
      clearInterval(wsState.activePingTimer);
      wsState.activePingTimer = undefined;
    }
  }

  // Expect a pong within a time limit
  private clearPongTimer(wsKey: WsKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePongTimer) {
      clearTimeout(wsState.activePongTimer);
      wsState.activePongTimer = undefined;
    }
  }

  // Timer tracking that a reconnect is about to happen / in progress
  private clearReconnectTimer(wsKey: WsKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activeReconnectTimer) {
      clearTimeout(wsState.activeReconnectTimer);
      wsState.activeReconnectTimer = undefined;
    }
  }

  private clearUserDataKeepAliveTimer(listenKey: string): void {
    const state = this.listenKeyStateStore[listenKey];
    if (!state) {
      return;
    }

    if (state.keepAliveTimer) {
      this.logger.silly(
        `Clearing old listen key interval timer for ${listenKey}`,
      );
      clearInterval(state.keepAliveTimer);
    }

    if (state.keepAliveRetryTimer) {
      this.logger.silly(
        `Clearing old listen key keepAliveRetry timer for ${listenKey}`,
      );
      clearTimeout(state.keepAliveRetryTimer);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private getWsBaseUrl(market: WsMarket, wsKey?: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    return wsBaseEndpoints[market];
  }

  public getWs(wsKey: WsKey): WebSocket | undefined {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: WsKey, state: WsConnectionStateEnum) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  private getSpotRestClient(): MainClient {
    if (!this.restClients.spot) {
      this.restClients.spot = new MainClient(
        this.getRestClientOptions(),
        this.options.requestOptions,
      );
    }
    return this.restClients.spot;
  }

  private getUSDMRestClient(isTestnet?: boolean): USDMClient {
    if (isTestnet) {
      if (!this.restClients.usdmFuturesTestnet) {
        this.restClients.usdmFuturesTestnet = new USDMClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
          isTestnet,
        );
      }
      return this.restClients.usdmFuturesTestnet;
    }
    if (!this.restClients.usdmFutures) {
      this.restClients.usdmFutures = new USDMClient(
        this.getRestClientOptions(),
        this.options.requestOptions,
      );
    }
    return this.restClients.usdmFutures;
  }

  private getCOINMRestClient(isTestnet?: boolean): CoinMClient {
    if (isTestnet) {
      if (!this.restClients.coinmFuturesTestnet) {
        this.restClients.coinmFuturesTestnet = new CoinMClient(
          this.getRestClientOptions(),
          this.options.requestOptions,
          isTestnet,
        );
      }
      return this.restClients.coinmFuturesTestnet;
    }
    if (!this.restClients.coinmFutures) {
      this.restClients.coinmFutures = new CoinMClient(
        this.getRestClientOptions(),
        this.options.requestOptions,
      );
    }
    return this.restClients.coinmFutures;
  }

  /**
   * Send WS message to subscribe to topics. Use subscribe() to call this.
   */
  private requestSubscribeTopics(wsKey: WsKey, topics: string[]) {
    const wsMessage = JSON.stringify({
      method: 'SUBSCRIBE',
      params: topics,
      id: new Date().getTime(),
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to unsubscribe from topics. Use unsubscribe() to call this.
   */
  private requestUnsubscribeTopics(wsKey: WsKey, topics: string[]) {
    const wsMessage = JSON.stringify({
      op: 'UNSUBSCRIBE',
      params: topics,
      id: new Date().getTime(),
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to unsubscribe from topics.
   */
  public requestListSubscriptions(wsKey: WsKey, requestId: number) {
    const wsMessage = JSON.stringify({
      method: 'LIST_SUBSCRIPTIONS',
      id: requestId,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to set property state
   */
  public requestSetProperty(
    wsKey: WsKey,
    property: 'combined' | string,
    value: any,
    requestId: number,
  ) {
    const wsMessage = JSON.stringify({
      method: 'SET_PROPERTY',
      params: [property, value],
      id: requestId,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to get property state
   */
  public requestGetProperty(
    wsKey: WsKey,
    property: 'combined' | string,
    requestId: number,
  ) {
    const wsMessage = JSON.stringify({
      method: 'GET_PROPERTY',
      params: [property],
      id: requestId,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * --------------------------
   * User data listen key tracking & persistence
   * --------------------------
   **/

  private getListenKeyState(
    listenKey: string,
    market: WsMarket,
  ): ListenKeyPersistenceState {
    const state = this.listenKeyStateStore[listenKey];
    if (state) {
      return state;
    }
    this.listenKeyStateStore[listenKey] = {
      market,
      lastKeepAlive: 0,
      keepAliveTimer: undefined,
      keepAliveRetryTimer: undefined,
      keepAliveFailures: 0,
    };
    return this.listenKeyStateStore[listenKey];
  }

  private setKeepAliveListenKeyTimer(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    const listenKeyState = this.getListenKeyState(listenKey, market);

    this.clearUserDataKeepAliveTimer(listenKey);

    this.logger.silly(`Created new listen key interval timer for ${listenKey}`);

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
        return this.getSpotRestClient().keepAliveSpotUserDataListenKey(
          listenKey,
        );
      case 'margin':
        return this.getSpotRestClient().keepAliveMarginUserDataListenKey(
          listenKey,
        );
      case 'isolatedMargin':
        return this.getSpotRestClient().keepAliveIsolatedMarginUserDataListenKey(
          { listenKey, symbol: symbol! },
        );
      case 'coinm':
      case 'options':
      case 'optionsTestnet':
      case 'usdm':
        return this.getUSDMRestClient().keepAliveFuturesUserDataListenKey();
      case 'usdmTestnet':
        return this.getUSDMRestClient(
          isTestnet,
        ).keepAliveFuturesUserDataListenKey();
      case 'coinmTestnet':
        return this.getUSDMRestClient(
          isTestnet,
        ).keepAliveFuturesUserDataListenKey();
      default:
        throwUnhandledSwitch(
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
    const listenKeyState = this.getListenKeyState(listenKey, market);

    try {
      if (listenKeyState.keepAliveRetryTimer) {
        clearTimeout(listenKeyState.keepAliveRetryTimer);
        listenKeyState.keepAliveRetryTimer = undefined;
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
        { ...loggerCategory, listenKey },
      );
    } catch (e) {
      listenKeyState.keepAliveFailures++;

      // code: -1125,
      // message: 'This listenKey does not exist.',
      const errorCode = e?.code;
      if (errorCode === -1125) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key - listen key expired/invalid. Respawning with fresh listen key...',
          {
            ...loggerCategory,
            listenKey,
            error: e,
            errorCode,
            errorMsg: e?.message,
          },
        );

        const shouldReconnectAfterClose = false;
        this.close(wsKey, shouldReconnectAfterClose);
        this.respawnUserDataStream(market, symbol);

        return;
      }

      // If max failurees reached, tear down and respawn if allowed
      if (listenKeyState.keepAliveFailures >= 3) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key after 3 attempts',
          { ...loggerCategory, listenKey, error: e },
        );

        // reconnect follows a less automatic workflow since this is tied to a listen key (which may need a new one).
        // Kill connection first, with instruction NOT to reconnect automatically
        const shouldReconnectAfterClose = false;
        this.close(wsKey, shouldReconnectAfterClose);

        // Then respawn a connection with a potentially new listen key (since the old one may be invalid now)
        this.respawnUserDataStream(market, symbol);

        return;
      }

      const reconnectDelaySeconds = 1000 * 15;
      this.logger.warning(
        `Userdata keep alive request failed due to error, trying again with short delay (${reconnectDelaySeconds} seconds)`,
        {
          ...loggerCategory,
          listenKey,
          error: e,
          keepAliveAttempts: listenKeyState.keepAliveFailures,
        },
      );

      listenKeyState.keepAliveRetryTimer = setTimeout(
        () =>
          this.checkKeepAliveListenKey(listenKey, market, ws, wsKey, symbol),
        reconnectDelaySeconds,
      );
    }
  }

  private teardownUserDataListenKey(listenKey: string, ws: WebSocket) {
    if (listenKey) {
      this.clearUserDataKeepAliveTimer(listenKey);
      delete this.listenKeyStateStore[listenKey];
      safeTerminateWs(ws);
    }
  }

  private async respawnUserDataStream(
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
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'margin':
          ws = await this.subscribeMarginUserDataStream(
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'isolatedMargin':
          ws = await this.subscribeIsolatedMarginUserDataStream(
            symbol!,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'usdm':
          ws = await this.subscribeUsdFuturesUserDataStream(
            isTestnet,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'usdmTestnet':
          ws = await this.subscribeUsdFuturesUserDataStream(
            true,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'coinm':
          ws = await this.subscribeCoinFuturesUserDataStream(
            isTestnet,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'coinmTestnet':
          ws = await this.subscribeCoinFuturesUserDataStream(
            true,
            forceNewConnection,
            isReconnecting,
          );
          break;
        case 'options':
        case 'optionsTestnet':
          throw new Error(
            'TODO: respawn other user data streams once subscribe methods have been added',
          );
        default:
          throwUnhandledSwitch(
            market,
            `Failed to respawn user data stream - unhandled market: ${market}`,
          );
      }
    } catch (e) {
      this.logger.error('Exception trying to spawn user data stream', {
        ...loggerCategory,
        market,
        symbol,
        isTestnet,
        error: e,
      });
      this.emit('error', { wsKey: market + '_' + 'userData', error: e });
    }

    if (!ws) {
      const delayInSeconds = 2;
      this.logger.error(
        'User key respawn failed, trying again with short delay',
        {
          ...loggerCategory,
          market,
          symbol,
          isTestnet,
          respawnAttempt,
          delayInSeconds,
        },
      );
      setTimeout(
        () =>
          this.respawnUserDataStream(
            market,
            symbol,
            isTestnet,
            respawnAttempt ? respawnAttempt + 1 : 1,
          ),
        1000 * delayInSeconds,
      );
    }
  }

  /**
   * --------------------------
   * Universal market websocket streams (may apply to one or more API markets)
   * --------------------------
   **/

  /**
   * Subscribe to a universal market websocket stream
   */

  public subscribeEndpoint(
    endpoint: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const wsKey = getWsKeyWithContext(market, endpoint);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${endpoint}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to aggregate trades for a symbol in a market category
   */
  public subscribeAggregateTrades(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'aggTrade';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to trades for a symbol in a market category
   * IMPORTANT: This topic for usdm and coinm is not listed in the api docs and might stop working without warning
   */
  public subscribeTrades(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'trade';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to coin index for a symbol in COINM Futures markets
   */
  public subscribeCoinIndexPrice(
    symbol: string,
    updateSpeedMs: 1000 | 3000 = 3000,
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'indexPrice';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
    const market: WsMarket = 'coinm';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}${speedSuffix}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to mark price for a symbol in a market category
   */
  public subscribeMarkPrice(
    symbol: string,
    market: 'usdm' | 'coinm',
    updateSpeedMs: 1000 | 3000 = 3000,
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'markPrice';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}${speedSuffix}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to mark price for all symbols in a market category
   */
  public subscribeAllMarketMarkPrice(
    market: 'usdm' | 'coinm',
    updateSpeedMs: 1000 | 3000 = 3000,
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = '!markPrice@arr';
    const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${streamName}${speedSuffix}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to klines(candles) for a symbol in a market category
   */
  public subscribeKlines(
    symbol: string,
    interval: KlineInterval,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'kline';
    const wsKey = getWsKeyWithContext(
      market,
      streamName,
      lowerCaseSymbol,
      interval,
    );
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
      forceNewConnection,
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
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'continuousKline';
    const wsKey = getWsKeyWithContext(
      market,
      streamName,
      lowerCaseSymbol,
      interval,
    );
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}_${contractType}@${streamName}_${interval}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to index klines(candles) for a symbol in a coinm futures
   */
  public subscribeIndexKlines(
    symbol: string,
    interval: KlineInterval,
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'indexPriceKline';
    const market: WsMarket = 'coinm';
    const wsKey = getWsKeyWithContext(
      market,
      streamName,
      lowerCaseSymbol,
      interval,
    );
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to index klines(candles) for a symbol in a coinm futures
   */
  public subscribeMarkPriceKlines(
    symbol: string,
    interval: KlineInterval,
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'markPrice_kline';
    const market: WsMarket = 'coinm';
    const wsKey = getWsKeyWithContext(
      market,
      streamName,
      lowerCaseSymbol,
      interval,
    );
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}_${interval}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to mini 24hr ticker for a symbol in market category.
   */
  public subscribeSymbolMini24hrTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'miniTicker';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to mini 24hr mini ticker in market category.
   */
  public subscribeAllMini24hrTickers(
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = 'miniTicker';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}@arr`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to 24hr ticker for a symbol in any market.
   */
  public subscribeSymbol24hrTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'ticker';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to 24hr ticker in any market.
   */
  public subscribeAll24hrTickers(
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = 'ticker';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}@arr`,
      wsKey,
      forceNewConnection,
    );
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
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = 'ticker';
    const wsKey = getWsKeyWithContext(market, streamName, windowSize);

    const wsUrl =
      this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}_${windowSize}@arr`;
    return this.connectToWsUrl(wsUrl, wsKey, forceNewConnection);
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSymbolBookTicker(
    symbol: string,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'bookTicker';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeAllBookTickers(
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = 'bookTicker';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSymbolLiquidationOrders(
    symbol: string,
    market: 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'forceOrder';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeAllLiquidationOrders(
    market: 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = 'forceOrder@arr';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to partial book depths (snapshots).
   *
   * Note:
   * - spot only supports 1000ms or 100ms for updateMs
   * - futures only support 100, 250 or 500ms for updateMs
   *
   * Use getContextFromWsKey(data.wsKey) to extract symbol from events
   */
  public subscribePartialBookDepths(
    symbol: string,
    levels: 5 | 10 | 20,
    updateMs: 100 | 250 | 500 | 1000,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'depth';
    const wsKey = getWsKeyWithContext(market, streamName, lowerCaseSymbol);

    const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';

    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}${levels}${updateMsSuffx}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to orderbook depth updates to locally manage an order book.
   *
   * Note that the updatems parameter depends on which market you're trading
   *
   * - Spot: https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream
   * - USDM Futures: https://binance-docs.github.io/apidocs/futures/en/#diff-book-depth-streams
   *
   * Use getContextFromWsKey(data.wsKey) to extract symbol from events
   */
  public subscribeDiffBookDepth(
    symbol: string,
    updateMs: 100 | 250 | 500 | 1000 = 100,
    market: 'spot' | 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const lowerCaseSymbol = symbol.toLowerCase();
    const streamName = 'depth';
    const wsKey = getWsKeyWithContext(
      market,
      'diffBookDepth',
      lowerCaseSymbol,
      String(updateMs),
    );

    const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';

    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) +
        `/ws/${lowerCaseSymbol}@${streamName}${updateMsSuffx}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeContractInfoStream(
    market: 'usdm' | 'coinm',
    forceNewConnection?: boolean,
  ): WebSocket {
    const streamName = '!contractInfo';
    const wsKey = getWsKeyWithContext(market, streamName);
    return this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${streamName}`,
      wsKey,
      forceNewConnection,
    );
  }

  /**
   * --------------------------
   * SPOT market websocket streams
   * --------------------------
   **/

  /**
   * Subscribe to aggregate trades for a symbol in spot markets.
   */
  public subscribeSpotAggregateTrades(
    symbol: string,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeAggregateTrades(symbol, 'spot', forceNewConnection);
  }

  /**
   * Subscribe to trades for a symbol in spot markets.
   */
  public subscribeSpotTrades(
    symbol: string,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeTrades(symbol, 'spot', forceNewConnection);
  }

  /**
   * Subscribe to candles for a symbol in spot markets.
   */
  public subscribeSpotKline(
    symbol: string,
    interval: KlineInterval,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeKlines(symbol, interval, 'spot', forceNewConnection);
  }

  /**
   * Subscribe to mini 24hr ticker for a symbol in spot markets.
   */
  public subscribeSpotSymbolMini24hrTicker(
    symbol: string,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeSymbolMini24hrTicker(
      symbol,
      'spot',
      forceNewConnection,
    );
  }

  /**
   * Subscribe to mini 24hr mini ticker in spot markets.
   */
  public subscribeSpotAllMini24hrTickers(
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeAllMini24hrTickers('spot', forceNewConnection);
  }

  /**
   * Subscribe to 24hr ticker for a symbol in spot markets.
   */
  public subscribeSpotSymbol24hrTicker(
    symbol: string,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeSymbol24hrTicker(symbol, 'spot', forceNewConnection);
  }

  /**
   * Subscribe to 24hr ticker in spot markets.
   */
  public subscribeSpotAll24hrTickers(forceNewConnection?: boolean): WebSocket {
    return this.subscribeAll24hrTickers('spot', forceNewConnection);
  }

  /**
   * Subscribe to best bid/ask for symbol in spot markets.
   */
  public subscribeSpotSymbolBookTicker(
    symbol: string,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeSymbolBookTicker(symbol, 'spot', forceNewConnection);
  }

  /**
   * Subscribe to best bid/ask for all symbols in spot markets.
   */
  public subscribeSpotAllBookTickers(forceNewConnection?: boolean): WebSocket {
    return this.subscribeAllBookTickers('spot', forceNewConnection);
  }

  /**
   * Subscribe to top bid/ask levels for symbol in spot markets.
   */
  public subscribeSpotPartialBookDepth(
    symbol: string,
    levels: 5 | 10 | 20,
    updateMs: 1000 | 100 = 1000,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribePartialBookDepths(
      symbol,
      levels,
      updateMs,
      'spot',
      forceNewConnection,
    );
  }

  /**
   * Subscribe to spot orderbook depth updates to locally manage an order book.
   */
  public subscribeSpotDiffBookDepth(
    symbol: string,
    updateMs: 1000 | 100 = 1000,
    forceNewConnection?: boolean,
  ): WebSocket {
    return this.subscribeDiffBookDepth(
      symbol,
      updateMs,
      'spot',
      forceNewConnection,
    );
  }

  /**
   * Subscribe to a spot user data stream. Use REST client to generate and persist listen key.
   * Supports spot, margin & isolated margin listen keys.
   */
  public subscribeSpotUserDataStreamWithListenKey(
    listenKey: string,
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): WebSocket | undefined {
    const market: WsMarket = 'spot';
    const wsKey = getWsKeyWithContext(market, 'userData', undefined, listenKey);

    if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
      this.logger.silly(
        'Existing spot user data connection in progress for listen key. Avoiding duplicate',
      );
      return this.getWs(wsKey);
    }

    this.setWsState(
      wsKey,
      isReconnecting
        ? WsConnectionStateEnum.RECONNECTING
        : WsConnectionStateEnum.CONNECTING,
    );
    const ws = this.connectToWsUrl(
      this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`,
      wsKey,
      forceNewConnection,
    );

    // Start & store timer to keep alive listen key (and handle expiration)
    this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey);

    return ws;
  }

  /**
   * Subscribe to spot user data stream - listen key is automatically generated. Calling multiple times only opens one connection.
   */
  public async subscribeSpotUserDataStream(
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket | undefined> {
    try {
      const { listenKey } =
        await this.getSpotRestClient().getSpotUserDataListenKey();
      return this.subscribeSpotUserDataStreamWithListenKey(
        listenKey,
        forceNewConnection,
        isReconnecting,
      );
    } catch (e) {
      this.logger.error('Failed to connect to spot user data', {
        ...loggerCategory,
        error: e,
      });
      this.emit('error', { wsKey: 'spot' + '_' + 'userData', error: e });
    }
  }

  /**
   * Subscribe to margin user data stream - listen key is automatically generated.
   */
  public async subscribeMarginUserDataStream(
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket> {
    try {
      const { listenKey } =
        await this.getSpotRestClient().getMarginUserDataListenKey();

      const market: WsMarket = 'margin';
      const wsKey = getWsKeyWithContext(
        market,
        'userData',
        undefined,
        listenKey,
      );

      if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
        this.logger.silly(
          'Existing margin user data connection in progress for listen key. Avoiding duplicate',
        );
        return this.getWs(wsKey);
      }

      this.setWsState(
        wsKey,
        isReconnecting
          ? WsConnectionStateEnum.RECONNECTING
          : WsConnectionStateEnum.CONNECTING,
      );

      const ws = this.connectToWsUrl(
        this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`,
        wsKey,
        forceNewConnection,
      );

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey);

      return ws;
    } catch (e) {
      this.logger.error('Failed to connect to margin user data', {
        ...loggerCategory,
        error: e,
      });
      this.emit('error', { wsKey: 'margin' + '_' + 'userData', error: e });
    }
  }

  /**
   * Subscribe to isolated margin user data stream - listen key is automatically generated.
   */
  public async subscribeIsolatedMarginUserDataStream(
    symbol: string,
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket> {
    try {
      const lowerCaseSymbol = symbol.toLowerCase();
      const { listenKey } =
        await this.getSpotRestClient().getIsolatedMarginUserDataListenKey({
          symbol: lowerCaseSymbol,
        });
      const market: WsMarket = 'isolatedMargin';
      const wsKey = getWsKeyWithContext(
        market,
        'userData',
        lowerCaseSymbol,
        listenKey,
      );

      if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
        this.logger.silly(
          'Existing isolated margin user data connection in progress for listen key. Avoiding duplicate',
        );
        return this.getWs(wsKey);
      }

      this.setWsState(
        wsKey,
        isReconnecting
          ? WsConnectionStateEnum.RECONNECTING
          : WsConnectionStateEnum.CONNECTING,
      );
      const ws = this.connectToWsUrl(
        this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`,
        wsKey,
        forceNewConnection,
      );

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey, symbol);

      return ws;
    } catch (e) {
      this.logger.error('Failed to connect to isolated margin user data', {
        ...loggerCategory,
        error: e,
        symbol,
      });
      this.emit('error', {
        wsKey: 'isolatedMargin' + '_' + 'userData',
        error: e,
      });
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
    isTestnet?: boolean,
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket> {
    try {
      const restClient = this.getUSDMRestClient(isTestnet);
      const { listenKey } = await restClient.getFuturesUserDataListenKey();

      const market: WsMarket = isTestnet ? 'usdmTestnet' : 'usdm';
      const wsKey = getWsKeyWithContext(
        market,
        'userData',
        undefined,
        listenKey,
      );

      if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
        this.logger.silly(
          'Existing usd futures user data connection in progress for listen key. Avoiding duplicate',
        );
        return this.getWs(wsKey);
      }

      // Necessary so client knows this is a reconnect
      this.setWsState(
        wsKey,
        isReconnecting
          ? WsConnectionStateEnum.RECONNECTING
          : WsConnectionStateEnum.CONNECTING,
      );
      const ws = this.connectToWsUrl(
        this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`,
        wsKey,
        forceNewConnection,
      );

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(
        listenKey,
        market,
        ws,
        wsKey,
        undefined,
        isTestnet,
      );

      return ws;
    } catch (e) {
      this.logger.error('Failed to connect to USD Futures user data', {
        ...loggerCategory,
        error: e,
      });
      this.emit('error', { wsKey: 'usdm' + '_' + 'userData', error: e });
    }
  }

  /**
   * Subscribe to COIN-M Futures user data stream - listen key is automatically generated.
   */
  public async subscribeCoinFuturesUserDataStream(
    isTestnet?: boolean,
    forceNewConnection?: boolean,
    isReconnecting?: boolean,
  ): Promise<WebSocket> {
    try {
      const { listenKey } =
        await this.getCOINMRestClient(isTestnet).getFuturesUserDataListenKey();

      const market: WsMarket = isTestnet ? 'coinmTestnet' : 'coinm';
      const wsKey = getWsKeyWithContext(
        market,
        'userData',
        undefined,
        listenKey,
      );

      if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
        this.logger.silly(
          'Existing usd futures user data connection in progress for listen key. Avoiding duplicate',
        );
        return this.getWs(wsKey);
      }

      // Necessary so client knows this is a reconnect
      this.setWsState(
        wsKey,
        isReconnecting
          ? WsConnectionStateEnum.RECONNECTING
          : WsConnectionStateEnum.CONNECTING,
      );
      const ws = this.connectToWsUrl(
        this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`,
        wsKey,
        forceNewConnection,
      );

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(
        listenKey,
        market,
        ws,
        wsKey,
        undefined,
        isTestnet,
      );

      return ws;
    } catch (e) {
      this.logger.error('Failed to connect to COIN Futures user data', {
        ...loggerCategory,
        error: e,
      });
      this.emit('error', { wsKey: 'coinm' + '_' + 'userData', error: e });
    }
  }
}
