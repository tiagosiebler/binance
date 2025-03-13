import { WS_KEY_MAP, WsKey } from '../../util/websockets/websocket-util';
import {
  FuturesAccountBalance,
  FuturesAccountInformation,
  FuturesExchangeInfo,
  NewFuturesOrderParams,
} from '../futures';
import { numberInString } from '../shared';
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
  'trades.recent',
  'trades.historical',
  'trades.aggregate',
  'klines',
  'uiKlines',
  'avgPrice',
  'ticker.24hr',
  'ticker.tradingDay',
  'ticker',
  'ticker.price',
  'ticker.book',
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

export type WsAPIFuturesWsKey =
  | typeof WS_KEY_MAP.usdmWSAPI
  | typeof WS_KEY_MAP.usdmWSAPITestnet;

/**
 * Request parameters expected per operation.
 *
 * - Each "key" here is the name of the command/operation.
 * - Each "value" here has the parameters required for the command.
 *
 * Make sure to add new topics to WS_API_Operations and the response param map too.
 */
export interface WsAPITopicRequestParamMap<TWSKey = WsKey> {
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
  'trades.recent': { symbol: string; limit?: number };
  'trades.historical': { symbol: string; fromId?: number; limit?: number };
  'trades.aggregate': {
    symbol: string;
    fromId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
  };
  klines: {
    symbol: string;
    interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
    startTime?: number;
    endTime?: number;
    timeZone?: string;
    limit?: number;
  };
  uiKlines: {
    symbol: string;
    interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
    startTime?: number;
    endTime?: number;
    timeZone?: string;
    limit?: number;
  };
  avgPrice: { symbol: string };
  'ticker.24hr': void | {
    symbol?: string;
    symbols?: string[];
    type?: 'FULL' | 'MINI';
  };
  'ticker.tradingDay': {
    symbol?: string;
    symbols?: string[];
    timeZone?: string;
    type?: 'FULL' | 'MINI';
  };
  ticker: {
    symbol?: string;
    symbols?: string[];
    windowSize?: string; // '1m', '2m' ... '59m', '1h', '2h' ... '23h', '1d', '2d' ... '7d'
    type?: 'FULL' | 'MINI';
  };
  'ticker.price': {
    symbol?: string;
    symbols?: string[];
  };
  'ticker.book': {
    symbol?: string;
    symbols?: string[];
  };
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

  'order.place': (TWSKey extends WsAPIFuturesWsKey
    ? NewFuturesOrderParams
    : NewSpotOrderParams) & {
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
  'trades.recent': WSAPIResponse<
    {
      id: number;
      price: numberInString;
      qty: numberInString;
      quoteQty: numberInString;
      time: number;
      isBuyerMaker: boolean;
      isBestMatch: boolean;
    }[]
  >;
  'trades.historical': WSAPIResponse<
    {
      id: number;
      price: numberInString;
      qty: numberInString;
      quoteQty: numberInString;
      time: number;
      isBuyerMaker: boolean;
      isBestMatch: boolean;
    }[]
  >;
  'trades.aggregate': WSAPIResponse<
    {
      a: number; // Aggregate trade ID
      p: numberInString; // Price
      q: numberInString; // Quantity
      f: number; // First trade ID
      l: number; // Last trade ID
      T: number; // Timestamp
      m: boolean; // Was the buyer the maker?
      M: boolean; // Was the trade the best price match?
    }[]
  >;
  klines: WSAPIResponse<
    [
      number, // Kline open time
      numberInString, // Open price
      numberInString, // High price
      numberInString, // Low price
      numberInString, // Close price
      numberInString, // Volume
      number, // Kline close time
      numberInString, // Quote asset volume
      number, // Number of trades
      numberInString, // Taker buy base asset volume
      numberInString, // Taker buy quote asset volume
      numberInString, // Unused field
    ][]
  >;
  uiKlines: WSAPIResponse<
    [
      number, // Kline open time
      numberInString, // Open price
      numberInString, // High price
      numberInString, // Low price
      numberInString, // Close price
      numberInString, // Volume
      number, // Kline close time
      numberInString, // Quote asset volume
      number, // Number of trades
      numberInString, // Taker buy base asset volume
      numberInString, // Taker buy quote asset volume
      numberInString, // Unused field
    ][]
  >;
  avgPrice: WSAPIResponse<{
    mins: number; // Average price interval (in minutes)
    price: numberInString; // Average price
    closeTime: number; // Last trade time
  }>;
  'ticker.24hr': WSAPIResponse<
    | {
        symbol: string;
        priceChange: numberInString;
        priceChangePercent: numberInString;
        weightedAvgPrice: numberInString;
        prevClosePrice: numberInString;
        lastPrice: numberInString;
        lastQty: numberInString;
        bidPrice: numberInString;
        bidQty: numberInString;
        askPrice: numberInString;
        askQty: numberInString;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number; // First trade ID
        lastId: number; // Last trade ID
        count: number; // Number of trades
      }
    | {
        symbol: string;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number; // First trade ID
        lastId: number; // Last trade ID
        count: number; // Number of trades
      }
    | {
        symbol: string;
        priceChange: numberInString;
        priceChangePercent: numberInString;
        weightedAvgPrice: numberInString;
        prevClosePrice: numberInString;
        lastPrice: numberInString;
        lastQty: numberInString;
        bidPrice: numberInString;
        bidQty: numberInString;
        askPrice: numberInString;
        askQty: numberInString;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number;
        lastId: number;
        count: number;
      }[]
  >;
  'ticker.tradingDay': WSAPIResponse<
    | {
        symbol: string;
        priceChange: numberInString; // Absolute price change
        priceChangePercent: numberInString; // Relative price change in percent
        weightedAvgPrice: numberInString; // quoteVolume / volume
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString; // Volume in base asset
        quoteVolume: numberInString; // Volume in quote asset
        openTime: number;
        closeTime: number;
        firstId: number; // Trade ID of the first trade in the interval
        lastId: number; // Trade ID of the last trade in the interval
        count: number; // Number of trades in the interval
      }
    | {
        symbol: string;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString; // Volume in base asset
        quoteVolume: numberInString; // Volume in quote asset
        openTime: number;
        closeTime: number;
        firstId: number; // Trade ID of the first trade in the interval
        lastId: number; // Trade ID of the last trade in the interval
        count: number; // Number of trades in the interval
      }
    | {
        symbol: string;
        priceChange: numberInString;
        priceChangePercent: numberInString;
        weightedAvgPrice: numberInString;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number;
        lastId: number;
        count: number;
      }[]
    | {
        symbol: string;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number;
        lastId: number;
        count: number;
      }[]
  >;
  ticker: WSAPIResponse<
    | {
        symbol: string;
        priceChange: numberInString;
        priceChangePercent: numberInString;
        weightedAvgPrice: numberInString;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number; // First trade ID
        lastId: number; // Last trade ID
        count: number; // Number of trades
      }
    | {
        symbol: string;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number; // First trade ID
        lastId: number; // Last trade ID
        count: number; // Number of trades
      }
    | {
        symbol: string;
        priceChange: numberInString;
        priceChangePercent: numberInString;
        weightedAvgPrice: numberInString;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number;
        lastId: number;
        count: number;
      }[]
    | {
        symbol: string;
        openPrice: numberInString;
        highPrice: numberInString;
        lowPrice: numberInString;
        lastPrice: numberInString;
        volume: numberInString;
        quoteVolume: numberInString;
        openTime: number;
        closeTime: number;
        firstId: number;
        lastId: number;
        count: number;
      }[]
  >;
  'ticker.price': WSAPIResponse<
    | {
        symbol: string;
        price: numberInString;
      }
    | {
        symbol: string;
        price: numberInString;
      }[]
  >;
  'ticker.book': WSAPIResponse<
    | {
        symbol: string;
        bidPrice: numberInString;
        bidQty: numberInString;
        askPrice: numberInString;
        askQty: numberInString;
      }
    | {
        symbol: string;
        bidPrice: numberInString;
        bidQty: numberInString;
        askPrice: numberInString;
        askQty: numberInString;
      }[]
  >;

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
