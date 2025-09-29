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
  streamName: string;
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

export interface WSClientConfigurableOptions {
  /** Your API key */
  api_key?: string;

  /** Your API secret */
  api_secret?: string;

  beautify?: boolean;

  /**
   * If true, log a warning if the beautifier is missing anything for an event
   */
  beautifyWarnIfMissing?: boolean;

  /**
   * Set to `true` to connect to Binance's testnet environment.
   *
   * Notes:
   * - Not all WebSocket categories support testnet.
   * - If testing a strategy, this is not recommended. Testnet market data is very different from real market conditions. More guidance here: https://github.com/tiagosiebler/awesome-crypto-examples/wiki/CEX-Testnets
   */
  testnet?: boolean;

  /**
   * Default: false. If true, use market maker endpoints when available.
   * Eligible for high-frequency trading users who have enrolled and qualified
   * in at least one of the Futures Liquidity Provider Programs.
   * More info: https://www.binance.com/en/support/faq/detail/7df7f3838c3b49e692d175374c3a3283
   */
  useMMSubdomain?: boolean;

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
   * Optional custom JSON parser used for incoming WS messages.
   * Defaults to JSON.parse.
   */
  customParseJSONFn?: (raw: string) => object;

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
