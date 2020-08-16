// TODO: Make a separate repo so this doesn't fall out of sync with the repoistory?
// That way it can be versioned independently, given the repo is not written in typescript

type Callback = (err: Error, data: unknown) => void;

export interface KLineRes {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  trades: number;
  takerBaseAssetVolume: string;
  takerQuoteAssetVolume: string;
  ignore: string;
}

export interface GetOpenOrdersRes {
  symbol: string;
  orderId: number;
  orderListId: -1; // what can this be?
  clientOrderId: string;
  price: string; // (float)
  origQty: string; // (float)
  executedQty: string; // (float)
  cummulativeQuoteQty: string; // (float),
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: string; // (float)
  icebergQty: string; // (float)
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string; // (float)
}

export interface PlaceOrderArgs {
  side: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  timeInForce: string;
  newClientOrderId?: string;
  recvWindow: number,
  timestamp: number;
}

export interface OcoOrderArgs {
  symbol: string;
  // listClientOrderId	STRING	NO	A unique Id for the entire orderList
  side: string;
  // limitClientOrderId	STRING	NO	A unique Id for the limit order
  type: string;
  quantity: number;
  price: number;
  // limitIcebergQty	DECIMAL	NO	Used to make the LIMIT_MAKER leg an iceberg order.
  // stopClientOrderId	STRING	NO	A unique Id for the stop loss/stop loss limit leg
  // stopPrice	DECIMAL	YES
  // stopLimitPrice	DECIMAL	NO	If provided, stopLimitTimeInForce is required.
  // stopIcebergQty	DECIMAL	NO	Used with STOP_LOSS_LIMIT leg to make an iceberg order.
  // stopLimitTimeInForce	ENUM	NO	Valid values are GTC/FOK/IOC
  // newOrderRespType	ENUM	NO	Set the response JSON.
  recvWindow: number,
  timestamp: number;
}

export interface KLineArgs {
  symbol: string; // symbol pair
  limit: number; // period of time
  startTime?: string;
  endTime?: string;
  interval: '1d' // enum of intervals
}

export interface TickerPrice {
  symbol: string;
  price: string;
}

type RateLimitType = 'REQUEST_WEIGHT' | 'ORDERS';
type RateLimitInterval = 'MINUTE' | 'SECOND';

export interface RateLimit {
  rateLimitType: RateLimitType;
  interval: RateLimitInterval;
  intervalNum: number;
  limit: number;
}

declare enum ExchangeInfoSymbolOrderTypes {
  LIMIT,
  LIMIT_MAKER,
  MARKET,
  STOP_LOSS,
  STOP_LOSS_LIMIT,
  TAKE_PROFIT,
  TAKE_PROFIT_LIMIT
}

export interface ExchangeInfoSymbol {
  symbol: string, // 'BTCUSDT
  status: string, // TODO: Make enum
  baseAsset: string,
  baseAssetPrecision: number,
  quoteAsset: string,
  quotePrecision: number,
  baseCommissionPrecision: number,
  quoteCommissionPrecision: number,
  orderTypes: ExchangeInfoSymbolOrderTypes[],
  icebergAllowed: boolean,
  ocoAllowed: boolean,
  quoteOrderQtyMarketAllowed: boolean,
  isSpotTradingAllowed: boolean,
  isMarginTradingAllowed: boolean,
  filters: unknown[
    // TODO:
    //These are defined in the Filters section.
    //All filters are optional
  ],
  permissions: unknown[]; // TODO:
}

export interface QueryOrderRes  {
  "symbol": string;
  "orderId": number;
  "orderListId": number;
  "clientOrderId": string;
  "price": string;
  "origQty": string;
  "executedQty": string;
  "cummulativeQuoteQty": string;
  "status": string;
  "timeInForce": string,
  "type": string;
  "side": string;
  "stopPrice": string;
  "icebergQty": string;
  "time": number,
  "updateTime": number,
  "isWorking": boolean,
  "origQuoteOrderQty": string;
}

export interface QueryOcoOrderRes {
  "orderListId": number;
  "contingencyType": string;
  "listStatusType": string;
  "listOrderStatus": string,
  "listClientOrderId": string;
  "transactionTime": number,
  "symbol": string,
  "orders": {
    symbol: string,
    orderId: number,
    clientOrderId: string;
  }[]
}

export interface QueryOcoOrderArgs  {
  orderListId?: number;
  origClientOrderId?:	string;
  recvWindow: number;
  timestamp: number;
}

export interface ExchangeInfo {
  timezone: string; // UTC etc
  serverTime: number;
  rateLimits: RateLimit[];
  exchangeFilters: unknown[], // TODO:
  symbols: ExchangeInfoSymbol[];
}

declare class BinanceRest {
  constructor({
    key,
    secret,
    recvWindow,
    timeout,
    disableBeautification,
    handleDrift,
    baseUrl,
    requestOptions
  }: {
    key: string;
    secret: string;
    recvWindow?: number;
    timeout?: number;
    disableBeautification?: boolean;
    handleDrift?: boolean;
    baseUrl?: string;
    requestOptions?: unknown; // 'request' options - should be added from request library
  });

  account: (query: unknown, callback?: Callback) => unknown

  aggTrades: (query: unknown, callback?: Callback) => unknown

  allBookTickers: (callback?: Callback) => unknown

  allOrders: (query: unknown, callback?: Callback) => unknown

  allPrices: (callback?: Callback) => unknown

  bookTicker: (query: unknown, callback?: Callback) => unknown

  exchangeInfo: (callback?: Callback) => Promise<ExchangeInfo>;

  historicalTrades: (query: unknown, callback?: Callback) => unknown

  depth: (query: unknown, callback?: Callback) => unknown

  klines: (query: KLineArgs, callback?: Callback, useFixie?: boolean) => Promise<KLineRes[]>;

  newOrder: (query: PlaceOrderArgs, callback?: Callback, useFixie?: boolean) => unknown;

  orderOco: (query: OcoOrderArgs, callback?: Callback, useFixie?: boolean) => unknown;

  openOrders: (query: unknown, callback?: Callback, useFixie?: boolean) => Promise<GetOpenOrdersRes[]>

  ping: (callback?: Callback) => unknown

  queryOrder: (query: unknown, callback?: Callback, useFixie?: boolean) => Promise<QueryOrderRes>

  queryOco: (query: QueryOcoOrderArgs, callback?: Callback, useFixie?: boolean) => Promise<QueryOcoOrderRes>;

  testOrder: (query: PlaceOrderArgs, callback?: Callback, useFixie?: boolean) => unknown

  ticker24hr: (query: unknown, callback?: Callback) => unknown

  tickerPrice: (query?: { symbol: string }, callback?: Callback) => Promise<TickerPrice | TickerPrice[]>

  time: (callback?: Callback) => unknown

  trades: (query: unknown, callback?: Callback) => unknown
}

declare class Beautifier {
  new(): Beautifier

  beautify(obj: object, type: object | string): object
}

// Example openOrderRes {
//   symbol: string;
//   orderId: 2823452479,
//   orderListId: -1,
//   clientOrderId: 'web_c543442e8f83426a936f963cb50a90d3',
//   price: '11154.44000000',
//   origQty: '0.02538700',
//   executedQty: '0.00000000',
//   cummulativeQuoteQty: '0.00000000',
//   status: 'NEW',
//   timeInForce: 'GTC',
//   type: 'LIMIT',
//   side: 'SELL',
//   stopPrice: '0.00000000',
//   icebergQty: '0.00000000',
//   time: 1596376204203,
//   updateTime: 1596376204203,
//   isWorking: true,
//   origQuoteOrderQty: '0.00000000'
// }
