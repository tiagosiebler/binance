import { RestClientOptions } from '../../util/requestUtils';
import { WS_KEY_MAP } from '../../util/websockets/websocket-util';

/** For spot markets, spotV3 is recommended */
export type APIMarket = 'v5';

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

/** This is used to differentiate between each of the available websocket streams (as bybit has multiple websockets) */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];
export type WsMarket = 'all';

export interface WSClientConfigurableOptions {
  /** Your API key */
  key?: string;

  /** Your API secret */
  secret?: string;

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

  /**
   * The API group this client should connect to. The V5 market is currently used by default.
   *
   * Only the "V5" "market" is supported here.
   */
  market?: APIMarket;

  /** Define a recv window when preparing a private websocket signature. This is in milliseconds, so 5000 == 5 seconds */
  recvWindow?: number;

  /** How often to check if the connection is alive */
  pingInterval?: number;

  /** How long to wait for a pong (heartbeat reply) before assuming the connection is dead */
  pongTimeout?: number;

  /** Delay in milliseconds before respawning the connection */
  reconnectTimeout?: number;

  restOptions?: RestClientOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestOptions?: any;

  wsUrl?: string;

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
  market: APIMarket;
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
  recvWindow: number;
  authPrivateConnectionsOnConnect: boolean;
  authPrivateRequests: boolean;
}
