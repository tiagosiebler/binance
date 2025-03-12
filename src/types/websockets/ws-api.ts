import { WS_KEY_MAP, WsKey } from '../../util/websockets/websocket-util';
import {
  FuturesAccountBalance,
  FuturesAccountInformation,
  FuturesExchangeInfo,
  NewFuturesOrderParams,
} from '../futures';
import {
  numberInString,
  OrderResponseType,
  OrderSide,
  OrderType,
} from '../shared';
import { ExchangeInfo, NewSpotOrderParams, OrderResponse } from '../spot';
import { WSAPIRecvWindowTimestamp } from './ws-api-requests';
import { WsAPISessionStatus } from './ws-api-responses';

/**
 * Standard WS commands (for consumers)
 */
export type WsOperation =
  | 'SUBSCRIBE'
  | 'UNSUBSCRIBE'
  | 'LIST_SUBSCRIPTIONS'
  | 'SET_PROPERTY'
  | 'GET_PROPERTY';

/**
 * WS API commands (for sending requests via WS)
 */
export const WS_API_Operations = [
  'session.logon',
  'session.status',
  'session.logout',
  //// General commands
  'ping',
  'time',
  'exchangeInfo',
  //// Market data commands //TODO:
  'depth',
  //// Account commands
  // Futures
  'v2/account.balance',
  'account.balance',
  'v2/account.status',
  'account.status',
  //// Trading commands // TODO:
  'order.place',
  'orderList.place',
  'sor.order.place',
] as const;

export type WsAPIOperation = (typeof WS_API_Operations)[number];

export interface WsRequestOperationBinance<
  TWSTopic extends string,
  TWSParams extends object = any,
> {
  method: WsOperation | WsAPIOperation;
  params?: (TWSTopic | string | number)[] | TWSParams;
  id: number;
}

export interface WSAPIResponse<
  TResponseData extends object = object,
  TOperation extends WsAPIOperation = WsAPIOperation,
> {
  /** Auto-generated */
  id: string;

  status: number;
  result: TResponseData;
  rateLimits: {
    rateLimitType: 'REQUEST_WEIGHT';
    interval: 'MINUTE';
    intervalNum: number;
    limit: number;
    count: number;
  }[];

  wsKey: WsKey;
  isWSAPIResponse: boolean;
}

export type Exact<T> = {
  // This part says: if there's any key that's not in T, it's an error
  // This conflicts sometimes for some reason...
  // [K: string]: never;
} & {
  [K in keyof T]: T[K];
};

/**
 * List of operations supported for this WsKey (connection)
 */
export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.main]: WsOperation;
  [WS_KEY_MAP.main2]: WsOperation;
  [WS_KEY_MAP.main3]: WsOperation;

  [WS_KEY_MAP.mainTestnetPublic]: WsOperation;
  [WS_KEY_MAP.mainTestnetUserData]: WsOperation;

  [WS_KEY_MAP.marginRiskUserData]: WsOperation;
  [WS_KEY_MAP.usdm]: WsOperation;
  [WS_KEY_MAP.usdmTestnet]: WsOperation;

  [WS_KEY_MAP.coinm]: WsOperation;
  [WS_KEY_MAP.coinm2]: WsOperation;
  [WS_KEY_MAP.coinmTestnet]: WsOperation;
  [WS_KEY_MAP.eoptions]: WsOperation;
  [WS_KEY_MAP.portfolioMarginUserData]: WsOperation;
  [WS_KEY_MAP.portfolioMarginProUserData]: WsOperation;

  [WS_KEY_MAP.mainWSAPI]: WsAPIOperation;
  [WS_KEY_MAP.mainWSAPI2]: WsAPIOperation;
  [WS_KEY_MAP.mainWSAPITestnet]: WsAPIOperation;

  [WS_KEY_MAP.usdmWSAPI]: WsAPIOperation;
  [WS_KEY_MAP.usdmWSAPITestnet]: WsAPIOperation;
}

/**
 * Request parameters expected per operation.
 *
 * - Each "key" here is the name of the command/operation.
 * - Each "value" here has the parameters required for the command.
 *
 * Make sure to add new topics to WS_API_Operations and the response param map too.
 */
export interface WsAPITopicRequestParamMap {
  SUBSCRIBE: never;
  UNSUBSCRIBE: never;
  LIST_SUBSCRIPTIONS: never;
  SET_PROPERTY: never;
  GET_PROPERTY: never;

  /**
   * Authentication commands & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/authentication-requests
   */
  'session.logon': { apiKey: string; signature: string; timestamp: number };
  'session.status': void;
  'session.logout': void;

  /**
   * General requests & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-requests
   */
  ping: void;
  time: void;

  exchangeInfo: void | {
    symbol?: string;
    symbols?: string[];
    permissions?: string[];
    showPermissionSets?: boolean;
    symbolStatus?: string;
  };

  /**
   * Market data requests & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   */
  depth: { symbol: string; limit: number };

  // TODO:

  /**
   * Account requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   *
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */

  /**
   * Spot:
   */

  // TODO: spot commands

  /**
   * Futures:
   */

  // TODO: futures commands
  'v2/account.balance': WSAPIRecvWindowTimestamp;
  'account.balance': WSAPIRecvWindowTimestamp;
  'v2/account.status': WSAPIRecvWindowTimestamp;
  'account.status': WSAPIRecvWindowTimestamp;

  /**
   * Trading requests & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests
   */

  'order.place': (NewSpotOrderParams | NewFuturesOrderParams) & {
    timestamp?: number;
  };
  'orderList.place': any;
  'sor.order.place': any;
  // TODO:

  /**
   * User data stream:
   *
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/user-data-stream-requests
   *
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   *
   * Note: for the user data stream, use the subscribe*UserDataStream() methods from the WS Client.
   */
}

/**
 * Response structure expected for each operation
 *
 * - Each "key" here is a command/request supported by the WS API
 * - Each "value" here is the response schema for that command.
 */
export interface WsAPIOperationResponseMap {
  [key: string]: unknown;

  SUBSCRIBE: never;
  UNSUBSCRIBE: never;
  LIST_SUBSCRIPTIONS: never;
  SET_PROPERTY: never;
  GET_PROPERTY: never;

  /**
   * Session authentication responses:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/session-authentication
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/authentication-requests
   */
  'session.login': WSAPIResponse<WsAPISessionStatus>;
  'session.status': WSAPIResponse<WsAPISessionStatus>;
  'session.logout': WSAPIResponse<WsAPISessionStatus>;

  /**
   * General responses:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-requests
   */

  ping: {};
  time: WSAPIResponse<{ serverTime: number }>;
  exchangeInfo: WSAPIResponse<FuturesExchangeInfo | ExchangeInfo>;

  /**
   * Market data responses
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   */
  depth: WSAPIResponse<{
    lastUpdateId: number;
    // [price, quantity]
    bids: [numberInString, numberInString][];
    asks: [numberInString, numberInString][];
  }>;

  // TODO:

  /**
   * Account requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   *
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */

  /**
   * Spot:
   */
  // TODO: spot commands

  /**
   * Futures:
   */
  'v2/account.balance': WSAPIResponse<FuturesAccountBalance>;
  'account.balance': WSAPIResponse<FuturesAccountBalance>;
  'v2/account.status': WSAPIResponse<FuturesAccountInformation>;
  'account.status': WSAPIResponse<FuturesAccountInformation>;

  /**
   * Trading responses
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests
   */

  'order.place': WSAPIResponse<OrderResponse>;
  'orderList.place': WSAPIResponse<any>;
  'sor.order.place': WSAPIResponse<any>;

  // TODO:
}
