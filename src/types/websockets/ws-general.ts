import { AxiosRequestConfig } from 'axios';
import WebSocket from 'isomorphic-ws';

import { RestClientOptions } from '../../util/requestUtils';
import { WsKey } from '../../util/websockets/websocket-util';

export interface MessageEventLike {
  target: WebSocket;
  type: 'message';
  data: string;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}

export type WsMarket =
  | 'spot'
  | 'spotTestnet'
  | 'crossMargin'
  | 'isolatedMargin'
  | 'riskDataMargin'
  | 'usdm'
  | 'usdmTestnet'
  | 'coinm'
  | 'coinmTestnet'
  | 'options'
  | 'optionsTestnet'
  | 'portfoliom';

export interface WsSharedBase {
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsResponse {
  type: 'message';
  data: {
    result: boolean | string[] | null;
    id: number;
    isWSAPIResponse: boolean;
    wsKey: WsKey;
  };
}

// Same as inverse futures
export type WsPublicInverseTopic =
  | 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'klineV2';

export type WsPublicUSDTPerpTopic =
  | 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'kline';

export type WsPublicSpotV1Topic =
  | 'trade'
  | 'realtimes'
  | 'kline'
  | 'depth'
  | 'mergedDepth'
  | 'diffDepth';

export type WsPublicSpotV2Topic =
  | 'depth'
  | 'kline'
  | 'trade'
  | 'bookTicker'
  | 'realtimes';

export type WsPublicTopics =
  | WsPublicInverseTopic
  | WsPublicUSDTPerpTopic
  | WsPublicSpotV1Topic
  | WsPublicSpotV2Topic
  | string;

// Same as inverse futures
export type WsPrivateInverseTopic =
  | 'position'
  | 'execution'
  | 'order'
  | 'stop_order';

export type WsPrivateUSDTPerpTopic =
  | 'position'
  | 'execution'
  | 'order'
  | 'stop_order'
  | 'wallet';

export type WsPrivateSpotTopic =
  | 'outboundAccountInfo'
  | 'executionReport'
  | 'ticketInfo';

export type WsPrivateTopic =
  | WsPrivateInverseTopic
  | WsPrivateUSDTPerpTopic
  | WsPrivateSpotTopic
  | string;

export type WsTopic = WsPublicTopics | WsPrivateTopic;

/** This is used to differentiate product groups on a connection */
// export type WsMarket =
//   | 'spot'
//   | 'margin'
//   | 'isolatedMargin'
//   | 'usdm'
//   | 'usdmTestnet'
//   | 'coinm'
//   | 'coinmTestnet'
//   | 'options'
//   | 'optionsTestnet';

export interface WSClientConfigurableOptions {
  /** Your API key */
  api_key?: string;

  /** Your API secret */
  api_secret?: string;

  beautify?: boolean;

  /**
   * Set to `true` to connect to Bybit's testnet environment.
   *
   * Notes:
   *
   * - If demo trading, `testnet` should be set to false!
   * - If testing a strategy, use demo trading instead. Testnet market data is very different from real market conditions.
   */
  testnet?: boolean;

  /**
   * Set to `true` to connect to Bybit's V5 demo trading: https://bybit-exchange.github.io/docs/v5/demo
   *
   * Only the "V5" "market" is supported here.
   */
  demoTrading?: boolean;

  /** Define a recv window when preparing a private websocket signature. This is in milliseconds, so 5000 == 5 seconds */
  recvWindow?: number;

  // Disable ping/pong ws heartbeat mechanism (not recommended)
  disableHeartbeat?: boolean;

  /** How often to check if the connection is alive */
  pingInterval?: number;

  /** How long to wait for a pong (heartbeat reply) before assuming the connection is dead */
  pongTimeout?: number;

  /** Delay in milliseconds before respawning the connection */
  reconnectTimeout?: number;

  restOptions?: RestClientOptions;

  requestOptions?: AxiosRequestConfig;

  wsOptions?: {
    protocols?: string[];
    agent?: any;
  };

  wsUrl?: string;

  /**
   * Default: true.
   *
   * When enabled, any calls to the subscribe method will return a promise.
   * // TODO:
   */
  promiseSubscribe?: boolean;

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look in the examples folder for a demonstration on using node's createHmac instead.
   */
  customSignMessageFn?: (message: string, secret: string) => Promise<string>;
}

/**
 * WS configuration that's always defined, regardless of user configuration
 * (usually comes from defaults if there's no user-provided values)
 */
export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
  recvWindow: number;
  authPrivateConnectionsOnConnect: boolean;
  authPrivateRequests: boolean;
}
