import { WS_KEY_MAP, WsKey } from '../../util/websockets/websocket-util';
import { FuturesExchangeInfo, NewFuturesOrderParams } from '../futures';
import { ExchangeInfo, NewSpotOrderParams, OrderResponse } from '../spot';
import {
  AccountCommissionWSAPIRequest,
  AccountStatusWSAPIRequest,
  AllOrderListsWSAPIRequest,
  AllOrdersWSAPIRequest,
  AvgPriceWSAPIRequest,
  DepthWSAPIRequest,
  ExchangeInfoWSAPIRequest,
  FuturesDepthWSAPIRequest,
  FuturesOrderCancelWSAPIRequest,
  FuturesOrderModifyWSAPIRequest,
  FuturesOrderStatusWSAPIRequest,
  FuturesTickerBookWSAPIRequest,
  FuturesTickerPriceWSAPIRequest,
  KlinesWSAPIRequest,
  MyAllocationsWSAPIRequest,
  MyPreventedMatchesWSAPIRequest,
  MyTradesWSAPIRequest,
  OpenOrdersCancelAllWSAPIRequest,
  OpenOrdersStatusWSAPIRequest,
  OrderCancelReplaceWSAPIRequest,
  OrderCancelWSAPIRequest,
  OrderListCancelWSAPIRequest,
  OrderListPlaceOCOWSAPIRequest,
  OrderListPlaceOTOCOWSAPIRequest,
  OrderListPlaceOTOWSAPIRequest,
  OrderListPlaceWSAPIRequest,
  OrderListStatusWSAPIRequest,
  OrderStatusWSAPIRequest,
  OrderTestWSAPIRequest,
  SessionLogonWSAPIRequest,
  SOROrderPlaceWSAPIRequest,
  SOROrderTestWSAPIRequest,
  Ticker24hrWSAPIRequest,
  TickerBookWSAPIRequest,
  TickerPriceWSAPIRequest,
  TickerTradingDayWSAPIRequest,
  TickerWSAPIRequest,
  TradesAggregateWSAPIRequest,
  TradesHistoricalWSAPIRequest,
  TradesRecentWSAPIRequest,
  WSAPIRecvWindowTimestamp,
} from './ws-api-requests';
import {
  AccountCommissionWSAPIResponse,
  AccountStatusWSAPIResponse,
  AggregateTradeWSAPIResponse,
  AllocationWSAPIResponse,
  AvgPriceWSAPIResponse,
  DepthWSAPIResponse,
  FuturesAccountBalanceItemWSAPIResponse,
  FuturesAccountStatusWSAPIResponse,
  FuturesDepthWSAPIResponse,
  FuturesOrderWSAPIResponse,
  FuturesPositionV2WSAPIResponse,
  FuturesPositionWSAPIResponse,
  FuturesTickerBookWSAPIResponse,
  FuturesTickerPriceWSAPIResponse,
  KlineWSAPIResponse,
  OrderCancelReplaceWSAPIResponse,
  OrderCancelWSAPIResponse,
  OrderListCancelWSAPIResponse,
  OrderListPlaceWSAPIResponse,
  OrderListStatusWSAPIResponse,
  OrderTestWithCommissionWSAPIResponse,
  OrderTestWSAPIResponse,
  OrderWSAPIResponse,
  PreventedMatchWSAPIResponse,
  RateLimitWSAPIResponse,
  SOROrderPlaceWSAPIResponse,
  SOROrderTestWithCommissionWSAPIResponse,
  SOROrderTestWSAPIResponse,
  TickerBookWSAPIResponse,
  TickerFullWSAPIResponse,
  TickerMiniWSAPIResponse,
  TickerPriceWSAPIResponse,
  TimeWSAPIResponse,
  TradeWSAPIResponse,
  WsAPISessionStatus,
} from './ws-api-responses';

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
  //// Market data commands
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
  // Spot
  'account.status',
  'account.commission',
  'account.rateLimits.orders',
  'allOrders',
  'allOrderLists',
  'myTrades',
  'myPreventedMatches',
  'myAllocations',
  // Futures
  'v2/account.balance',
  'account.balance',
  'v2/account.status',
  'account.position',
  'v2/account.position',
  //// Trading commands
  'order.place',
  'order.test',
  'order.status',
  'order.cancel',
  'order.cancelReplace',
  'order.modify',
  'openOrders.status',
  'openOrders.cancelAll',
  // Order list commands
  'orderList.place',
  'orderList.place.oco',
  'orderList.place.oto',
  'orderList.place.otoco',
  'orderList.status',
  'orderList.cancel',
  'openOrderLists.status',
  // SOR commands
  'sor.order.place',
  'sor.order.test',
  // user data stream
  'userDataStream.start',
  'userDataStream.ping',
  'userDataStream.stop',
  'userDataStream.subscribe',
  'userDataStream.unsubscribe',
] as const;

export interface WSAPIUserDataListenKeyRequest {
  apiKey: string;
  listenKey: string;
}

export type WsAPIOperation = (typeof WS_API_Operations)[number];

export interface WsRequestOperationBinance<
  TWSTopic extends string,
  TWSParams extends object = any,
> {
  method: WsOperation | WsAPIOperation;
  params?: (TWSTopic | string | number)[] | TWSParams;
  id: number;
}

export interface WSAPIResponse<TResponseData extends object = object> {
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

  [WS_KEY_MAP.coinmWSAPI]: WsAPIOperation;
  [WS_KEY_MAP.coinmWSAPITestnet]: WsAPIOperation;
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
  'session.logon': SessionLogonWSAPIRequest;
  'session.status': void;
  'session.logout': void;

  /**
   * General requests & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-requests
   */
  ping: void;
  time: void;

  exchangeInfo: void | ExchangeInfoWSAPIRequest;

  /**
   * Market data requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/websocket-api
   */
  depth: TWSKey extends WsAPIFuturesWsKey
    ? FuturesDepthWSAPIRequest
    : DepthWSAPIRequest;
  'trades.recent': TradesRecentWSAPIRequest;
  'trades.historical': TradesHistoricalWSAPIRequest;
  'trades.aggregate': TradesAggregateWSAPIRequest;
  klines: KlinesWSAPIRequest;
  uiKlines: KlinesWSAPIRequest;
  avgPrice: AvgPriceWSAPIRequest;
  'ticker.24hr': void | Ticker24hrWSAPIRequest;
  'ticker.tradingDay': TickerTradingDayWSAPIRequest;
  ticker: TickerWSAPIRequest;
  'ticker.price': void | TWSKey extends WsAPIFuturesWsKey
    ? FuturesTickerPriceWSAPIRequest | undefined
    : TickerPriceWSAPIRequest | undefined;
  'ticker.book': void | TWSKey extends WsAPIFuturesWsKey
    ? FuturesTickerBookWSAPIRequest | undefined
    : TickerBookWSAPIRequest | undefined;

  /**
   * Account requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */

  'account.status': void | TWSKey extends WsAPIFuturesWsKey
    ? WSAPIRecvWindowTimestamp
    : AccountStatusWSAPIRequest;

  'account.rateLimits.orders': void | WSAPIRecvWindowTimestamp;

  allOrders: AllOrdersWSAPIRequest;

  allOrderLists: void | AllOrderListsWSAPIRequest;

  myTrades: MyTradesWSAPIRequest;

  myPreventedMatches: MyPreventedMatchesWSAPIRequest;

  myAllocations: MyAllocationsWSAPIRequest;

  'account.commission': AccountCommissionWSAPIRequest;

  /**
   * Futures account requests & parameters:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */
  'account.position': WSAPIRecvWindowTimestamp;

  'v2/account.position': WSAPIRecvWindowTimestamp;

  'account.balance': WSAPIRecvWindowTimestamp;

  'v2/account.balance': WSAPIRecvWindowTimestamp;

  'v2/account.status': WSAPIRecvWindowTimestamp;

  /**
   * Trading requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/trading/websocket-api
   */
  'order.place': (TWSKey extends WsAPIFuturesWsKey
    ? NewFuturesOrderParams
    : NewSpotOrderParams) & {
    timestamp?: number;
  };
  'order.test': OrderTestWSAPIRequest;
  'order.status': TWSKey extends WsAPIFuturesWsKey
    ? FuturesOrderStatusWSAPIRequest
    : OrderStatusWSAPIRequest;
  'order.cancel': TWSKey extends WsAPIFuturesWsKey
    ? FuturesOrderCancelWSAPIRequest
    : OrderCancelWSAPIRequest;
  'order.modify': FuturesOrderModifyWSAPIRequest; // order.modify only futures
  'order.cancelReplace': OrderCancelReplaceWSAPIRequest;

  'openOrders.status': OpenOrdersStatusWSAPIRequest;
  'openOrders.cancelAll': OpenOrdersCancelAllWSAPIRequest;

  /**
   * Order list requests & parameters:
   */
  'orderList.place': OrderListPlaceWSAPIRequest;
  'orderList.place.oco': OrderListPlaceOCOWSAPIRequest;
  'orderList.place.oto': OrderListPlaceOTOWSAPIRequest;
  'orderList.place.otoco': OrderListPlaceOTOCOWSAPIRequest;
  'orderList.status': OrderListStatusWSAPIRequest;
  'orderList.cancel': OrderListCancelWSAPIRequest;

  'openOrderLists.status': WSAPIRecvWindowTimestamp;

  /**
   * SOR requests & parameters:
   */
  'sor.order.place': SOROrderPlaceWSAPIRequest;
  'sor.order.test': SOROrderTestWSAPIRequest;

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
  'userDataStream.start': { apiKey: string };
  'userDataStream.ping': WSAPIUserDataListenKeyRequest;
  'userDataStream.stop': WSAPIUserDataListenKeyRequest;
  'userDataStream.subscribe': void;
  'userDataStream.unsubscribe': void;
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

  ping: unknown;
  time: WSAPIResponse<TimeWSAPIResponse>;
  exchangeInfo: WSAPIResponse<FuturesExchangeInfo | ExchangeInfo>;

  /**
   * Market data responses
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/websocket-api
   */
  depth: WSAPIResponse<DepthWSAPIResponse | FuturesDepthWSAPIResponse>;
  'trades.recent': WSAPIResponse<TradeWSAPIResponse[]>;
  'trades.historical': WSAPIResponse<TradeWSAPIResponse[]>;
  'trades.aggregate': WSAPIResponse<AggregateTradeWSAPIResponse[]>;
  klines: WSAPIResponse<KlineWSAPIResponse[]>;
  uiKlines: WSAPIResponse<KlineWSAPIResponse[]>;
  avgPrice: WSAPIResponse<AvgPriceWSAPIResponse>;
  'ticker.24hr': WSAPIResponse<
    | TickerFullWSAPIResponse
    | TickerMiniWSAPIResponse
    | TickerFullWSAPIResponse[]
    | TickerMiniWSAPIResponse[]
  >;
  'ticker.tradingDay': WSAPIResponse<
    | TickerFullWSAPIResponse
    | TickerMiniWSAPIResponse
    | TickerFullWSAPIResponse[]
    | TickerMiniWSAPIResponse[]
  >;
  ticker: WSAPIResponse<
    | TickerFullWSAPIResponse
    | TickerMiniWSAPIResponse
    | TickerFullWSAPIResponse[]
    | TickerMiniWSAPIResponse[]
  >;
  'ticker.price': WSAPIResponse<
    | TickerPriceWSAPIResponse
    | TickerPriceWSAPIResponse[]
    | FuturesTickerPriceWSAPIResponse
    | FuturesTickerPriceWSAPIResponse[]
  >;
  'ticker.book': WSAPIResponse<
    | TickerBookWSAPIResponse
    | TickerBookWSAPIResponse[]
    | FuturesTickerBookWSAPIResponse
    | FuturesTickerBookWSAPIResponse[]
  >;

  /**
   * Account responses:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   */

  'account.status': WSAPIResponse<
    AccountStatusWSAPIResponse | FuturesAccountStatusWSAPIResponse
  >;
  'account.commission': WSAPIResponse<AccountCommissionWSAPIResponse>;
  'account.rateLimits.orders': WSAPIResponse<RateLimitWSAPIResponse[]>;
  allOrders: WSAPIResponse<OrderWSAPIResponse[]>;
  allOrderLists: WSAPIResponse<OrderListStatusWSAPIResponse[]>;
  myTrades: WSAPIResponse<TradeWSAPIResponse[]>;
  myPreventedMatches: WSAPIResponse<PreventedMatchWSAPIResponse[]>;
  myAllocations: WSAPIResponse<AllocationWSAPIResponse[]>;

  /**
   * Futures account responses:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */
  'account.position': WSAPIResponse<FuturesPositionWSAPIResponse[]>;
  'v2/account.position': WSAPIResponse<FuturesPositionV2WSAPIResponse[]>;
  'account.balance': WSAPIResponse<FuturesAccountBalanceItemWSAPIResponse[]>;
  'v2/account.balance': WSAPIResponse<FuturesAccountBalanceItemWSAPIResponse[]>;
  'v2/account.status': WSAPIResponse<FuturesAccountStatusWSAPIResponse>;

  /**
   * Trading responses
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/trading/websocket-api
   */
  'order.place': WSAPIResponse<OrderResponse | FuturesOrderWSAPIResponse>;
  'order.test': WSAPIResponse<
    OrderTestWSAPIResponse | OrderTestWithCommissionWSAPIResponse
  >;
  'order.status': WSAPIResponse<OrderWSAPIResponse | FuturesOrderWSAPIResponse>;
  'order.cancel': WSAPIResponse<
    OrderCancelWSAPIResponse | FuturesOrderWSAPIResponse
  >;
  'order.modify': WSAPIResponse<FuturesOrderWSAPIResponse>;
  'order.cancelReplace': WSAPIResponse<OrderCancelReplaceWSAPIResponse>;
  'openOrders.status': WSAPIResponse<
    OrderWSAPIResponse[] | FuturesOrderWSAPIResponse[]
  >;
  'openOrders.cancelAll': WSAPIResponse<
    (OrderCancelWSAPIResponse | OrderListCancelWSAPIResponse)[]
  >;

  /**
   * Order list responses
   */
  'orderList.place': WSAPIResponse<OrderListPlaceWSAPIResponse>;
  'orderList.place.oco': WSAPIResponse<OrderListPlaceWSAPIResponse>;
  'orderList.place.oto': WSAPIResponse<OrderListPlaceWSAPIResponse>;
  'orderList.place.otoco': WSAPIResponse<OrderListPlaceWSAPIResponse>;
  'orderList.status': WSAPIResponse<OrderListStatusWSAPIResponse>;
  'orderList.cancel': WSAPIResponse<OrderListCancelWSAPIResponse>;
  'openOrderLists.status': WSAPIResponse<OrderListStatusWSAPIResponse[]>;

  /**
   * SOR responses
   */
  'sor.order.place': WSAPIResponse<SOROrderPlaceWSAPIResponse>;
  'sor.order.test': WSAPIResponse<
    SOROrderTestWSAPIResponse | SOROrderTestWithCommissionWSAPIResponse
  >;

  'userDataStream.start': WSAPIResponse<{ listenKey: string }>;
  'userDataStream.ping': WSAPIResponse<object>;
  'userDataStream.stop': WSAPIResponse<object>;
  'userDataStream.subscribe': WSAPIResponse<object>;
  'userDataStream.unsubscribe': WSAPIResponse<object>;
}
