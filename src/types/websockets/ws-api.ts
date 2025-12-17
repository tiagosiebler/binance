import { WS_KEY_MAP, WsKey } from '../../util/websockets/websocket-util';
import { FuturesExchangeInfo } from '../futures';
import { ExchangeInfo } from '../spot';
import {
  WSAPIAccountCommissionWSAPIRequest,
  WSAPIAccountInformationRequest,
  WSAPIAllOrderListsRequest,
  WSAPIAllOrdersRequest,
  WSAPIAvgPriceRequest,
  WSAPIExchangeInfoRequest,
  WSAPIFuturesAlgoOrderCancelRequest,
  WSAPIFuturesOrderBookRequest,
  WSAPIFuturesOrderCancelRequest,
  WSAPIFuturesOrderModifyRequest,
  WSAPIFuturesOrderStatusRequest,
  WSAPIFuturesTickerBookRequest,
  WSAPIFuturesTickerPriceRequest,
  WSAPIKlinesRequest,
  WSAPIMyAllocationsRequest,
  WSAPIMyPreventedMatchesRequest,
  WSAPIMyTradesRequest,
  WSAPINewFuturesAlgoOrderRequest,
  WSAPINewFuturesOrderRequest,
  WSAPINewSpotOrderRequest,
  WSAPIOpenOrdersCancelAllRequest,
  WSAPIOpenOrdersStatusRequest,
  WSAPIOrderAmendKeepPriorityRequest,
  WSAPIOrderBookRequest,
  WSAPIOrderCancelReplaceRequest,
  WSAPIOrderCancelRequest,
  WSAPIOrderListCancelRequest,
  WSAPIOrderListPlaceOCORequest,
  WSAPIOrderListPlaceOTOCORequest,
  WSAPIOrderListPlaceOTORequest,
  WSAPIOrderListPlaceRequest,
  WSAPIOrderListStatusRequest,
  WSAPIOrderStatusRequest,
  WSAPIOrderTestRequest,
  WSAPIRecvWindowTimestamp,
  WSAPISessionLogonRequest,
  WSAPISOROrderPlaceRequest,
  WSAPISOROrderTestRequest,
  WSAPITicker24hrRequest,
  WSAPITickerBookRequest,
  WSAPITickerPriceRequest,
  WSAPITickerRequest,
  WSAPITickerTradingDayRequest,
  WSAPITradesAggregateRequest,
  WSAPITradesHistoricalRequest,
  WSAPITradesRecentRequest,
} from './ws-api-requests';
import {
  WSAPIAccountCommission,
  WSAPIAccountInformation,
  WSAPIAggregateTrade,
  WSAPIAllocation,
  WSAPIAvgPrice,
  WSAPIBookTicker,
  WSAPIFullTicker,
  WSAPIFuturesAccountBalanceItem,
  WSAPIFuturesAccountStatus,
  WSAPIFuturesAlgoOrder,
  WSAPIFuturesAlgoOrderCancelResponse,
  WSAPIFuturesBookTicker,
  WSAPIFuturesOrder,
  WSAPIFuturesOrderBook,
  WSAPIFuturesPosition,
  WSAPIFuturesPositionV2,
  WSAPIFuturesPriceTicker,
  WSAPIKline,
  WSAPIMiniTicker,
  WSAPIOrder,
  WSAPIOrderBook,
  WSAPIOrderCancel,
  WSAPIOrderCancelReplaceResponse,
  WSAPIOrderListCancelResponse,
  WSAPIOrderListPlaceResponse,
  WSAPIOrderListStatusResponse,
  WSAPIOrderTestResponse,
  WSAPIOrderTestWithCommission,
  WSAPIPreventedMatch,
  WSAPIPriceTicker,
  WSAPIRateLimit,
  WSAPIServerTime,
  WSAPISessionStatus,
  WSAPISOROrderPlaceResponse,
  WSAPISOROrderTestResponse,
  WSAPISOROrderTestResponseWithCommission,
  WSAPISpotOrderResponse,
  WSAPITrade,
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
  'order.amend.keepPriority',
  'order.modify',
  'openOrders.status',
  'openOrders.cancelAll',
  'algoOrder.place',
  'algoOrder.cancel',
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

  request?: any;
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
  'session.logon': WSAPISessionLogonRequest;
  'session.status': void;
  'session.logout': void;

  /**
   * General requests & parameters:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-requests
   */
  ping: void;
  time: void;

  exchangeInfo: void | WSAPIExchangeInfoRequest;

  /**
   * Market data requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/websocket-api
   */
  depth: TWSKey extends WsAPIFuturesWsKey
    ? WSAPIFuturesOrderBookRequest
    : WSAPIOrderBookRequest;
  'trades.recent': WSAPITradesRecentRequest;
  'trades.historical': WSAPITradesHistoricalRequest;
  'trades.aggregate': WSAPITradesAggregateRequest;
  klines: WSAPIKlinesRequest;
  uiKlines: WSAPIKlinesRequest;
  avgPrice: WSAPIAvgPriceRequest;
  'ticker.24hr': void | WSAPITicker24hrRequest;
  'ticker.tradingDay': WSAPITickerTradingDayRequest;
  ticker: WSAPITickerRequest;
  'ticker.price': void | TWSKey extends WsAPIFuturesWsKey
    ? WSAPIFuturesTickerPriceRequest | undefined
    : WSAPITickerPriceRequest | undefined;
  'ticker.book': void | TWSKey extends WsAPIFuturesWsKey
    ? WSAPIFuturesTickerBookRequest | undefined
    : WSAPITickerBookRequest | undefined;

  /**
   * Account requests & parameters:
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */

  'account.status':
    | void
    | (TWSKey extends WsAPIFuturesWsKey
        ? WSAPIRecvWindowTimestamp
        : WSAPIAccountInformationRequest);

  'account.rateLimits.orders': void | WSAPIRecvWindowTimestamp;

  allOrders: WSAPIAllOrdersRequest;

  allOrderLists: void | WSAPIAllOrderListsRequest;

  myTrades: WSAPIMyTradesRequest;

  myPreventedMatches: WSAPIMyPreventedMatchesRequest;

  myAllocations: WSAPIMyAllocationsRequest;

  'account.commission': WSAPIAccountCommissionWSAPIRequest;

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
    ? WSAPINewFuturesOrderRequest
    : WSAPINewSpotOrderRequest) & {
    timestamp?: number;
  };
  'order.test': WSAPIOrderTestRequest;
  'order.status': TWSKey extends WsAPIFuturesWsKey
    ? WSAPIFuturesOrderStatusRequest
    : WSAPIOrderStatusRequest;
  'order.cancel': TWSKey extends WsAPIFuturesWsKey
    ? WSAPIFuturesOrderCancelRequest
    : WSAPIOrderCancelRequest;
  'order.modify': WSAPIFuturesOrderModifyRequest; // order.modify only futures
  'order.cancelReplace': WSAPIOrderCancelReplaceRequest;
  'order.amend.keepPriority': WSAPIOrderAmendKeepPriorityRequest;
  'openOrders.status': WSAPIOpenOrdersStatusRequest;
  'openOrders.cancelAll': WSAPIOpenOrdersCancelAllRequest;

  'algoOrder.place': WSAPINewFuturesAlgoOrderRequest;
  'algoOrder.cancel': WSAPIFuturesAlgoOrderCancelRequest;

  /**
   * Order list requests & parameters:
   */
  'orderList.place': WSAPIOrderListPlaceRequest;
  'orderList.place.oco': WSAPIOrderListPlaceOCORequest;
  'orderList.place.oto': WSAPIOrderListPlaceOTORequest;
  'orderList.place.otoco': WSAPIOrderListPlaceOTOCORequest;
  'orderList.status': WSAPIOrderListStatusRequest;
  'orderList.cancel': WSAPIOrderListCancelRequest;

  'openOrderLists.status': WSAPIRecvWindowTimestamp;

  /**
   * SOR requests & parameters:
   */
  'sor.order.place': WSAPISOROrderPlaceRequest;
  'sor.order.test': WSAPISOROrderTestRequest;

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
  'session.login': WSAPIResponse<WSAPISessionStatus>;
  'session.status': WSAPIResponse<WSAPISessionStatus>;
  'session.logout': WSAPIResponse<WSAPISessionStatus>;

  /**
   * General responses:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-requests
   */

  ping: unknown;
  time: WSAPIResponse<WSAPIServerTime>;
  exchangeInfo: WSAPIResponse<FuturesExchangeInfo | ExchangeInfo>;

  /**
   * Market data responses
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/market-data-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/websocket-api
   */
  depth: WSAPIResponse<WSAPIOrderBook | WSAPIFuturesOrderBook>;
  'trades.recent': WSAPIResponse<WSAPITrade[]>;
  'trades.historical': WSAPIResponse<WSAPITrade[]>;
  'trades.aggregate': WSAPIResponse<WSAPIAggregateTrade[]>;
  klines: WSAPIResponse<WSAPIKline[]>;
  uiKlines: WSAPIResponse<WSAPIKline[]>;
  avgPrice: WSAPIResponse<WSAPIAvgPrice>;
  'ticker.24hr': WSAPIResponse<
    WSAPIFullTicker | WSAPIMiniTicker | WSAPIFullTicker[] | WSAPIMiniTicker[]
  >;
  'ticker.tradingDay': WSAPIResponse<
    WSAPIFullTicker | WSAPIMiniTicker | WSAPIFullTicker[] | WSAPIMiniTicker[]
  >;
  ticker: WSAPIResponse<
    WSAPIFullTicker | WSAPIMiniTicker | WSAPIFullTicker[] | WSAPIMiniTicker[]
  >;
  'ticker.price': WSAPIResponse<
    | WSAPIPriceTicker
    | WSAPIPriceTicker[]
    | WSAPIFuturesPriceTicker
    | WSAPIFuturesPriceTicker[]
  >;
  'ticker.book': WSAPIResponse<
    | WSAPIBookTicker
    | WSAPIBookTicker[]
    | WSAPIFuturesBookTicker
    | WSAPIFuturesBookTicker[]
  >;

  /**
   * Account responses:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/account-requests
   */

  'account.status': WSAPIResponse<
    WSAPIAccountInformation | WSAPIFuturesAccountStatus
  >;
  'account.commission': WSAPIResponse<WSAPIAccountCommission>;
  'account.rateLimits.orders': WSAPIResponse<WSAPIRateLimit[]>;
  allOrders: WSAPIResponse<WSAPIOrder[]>;
  allOrderLists: WSAPIResponse<WSAPIOrderListStatusResponse[]>;
  myTrades: WSAPIResponse<WSAPITrade[]>;
  myPreventedMatches: WSAPIResponse<WSAPIPreventedMatch[]>;
  myAllocations: WSAPIResponse<WSAPIAllocation[]>;

  /**
   * Futures account responses:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api
   */
  'account.position': WSAPIResponse<WSAPIFuturesPosition[]>;
  'v2/account.position': WSAPIResponse<WSAPIFuturesPositionV2[]>;
  'account.balance': WSAPIResponse<WSAPIFuturesAccountBalanceItem[]>;
  'v2/account.balance': WSAPIResponse<WSAPIFuturesAccountBalanceItem[]>;
  'v2/account.status': WSAPIResponse<WSAPIFuturesAccountStatus>;

  /**
   * Trading responses
   * - Spot:
   * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests
   * - Futures:
   * https://developers.binance.com/docs/derivatives/usds-margined-futures/trading/websocket-api
   */
  'order.place': WSAPIResponse<WSAPISpotOrderResponse | WSAPIFuturesOrder>;
  'order.test': WSAPIResponse<
    WSAPIOrderTestResponse | WSAPIOrderTestWithCommission
  >;
  'order.status': WSAPIResponse<WSAPIOrder | WSAPIFuturesOrder>;
  'order.cancel': WSAPIResponse<WSAPIOrderCancel | WSAPIFuturesOrder>;
  'order.modify': WSAPIResponse<WSAPIFuturesOrder>;
  'order.cancelReplace': WSAPIResponse<WSAPIOrderCancelReplaceResponse>;
  'openOrders.status': WSAPIResponse<WSAPIOrder[] | WSAPIFuturesOrder[]>;
  'openOrders.cancelAll': WSAPIResponse<
    (WSAPIOrderCancel | WSAPIOrderListCancelResponse)[]
  >;
  'algoOrder.place': WSAPIResponse<WSAPIFuturesAlgoOrder>;
  'algoOrder.cancel': WSAPIResponse<WSAPIFuturesAlgoOrderCancelResponse>;
  /**
   * Order list responses
   */
  'orderList.place': WSAPIResponse<WSAPIOrderListPlaceResponse>;
  'orderList.place.oco': WSAPIResponse<WSAPIOrderListPlaceResponse>;
  'orderList.place.oto': WSAPIResponse<WSAPIOrderListPlaceResponse>;
  'orderList.place.otoco': WSAPIResponse<WSAPIOrderListPlaceResponse>;
  'orderList.status': WSAPIResponse<WSAPIOrderListStatusResponse>;
  'orderList.cancel': WSAPIResponse<WSAPIOrderListCancelResponse>;
  'openOrderLists.status': WSAPIResponse<WSAPIOrderListStatusResponse[]>;

  /**
   * SOR responses
   */
  'sor.order.place': WSAPIResponse<WSAPISOROrderPlaceResponse>;
  'sor.order.test': WSAPIResponse<
    WSAPISOROrderTestResponse | WSAPISOROrderTestResponseWithCommission
  >;

  'userDataStream.start': WSAPIResponse<{ listenKey: string }>;
  'userDataStream.ping': WSAPIResponse<object>;
  'userDataStream.stop': WSAPIResponse<object>;
  'userDataStream.subscribe': WSAPIResponse<object>;
  'userDataStream.unsubscribe': WSAPIResponse<object>;
}
