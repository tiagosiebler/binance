// Generic numeric value stored as a string. Can be parsed via parseInt or parseFloat.
// Beautifier may convert these to number, if enabled.
export type numberInString = string | number;

export type ExchangeSymbol = string;

export type BooleanString = 'true' | 'false';
export type BooleanStringCapitalised = 'TRUE' | 'FALSE';

export type BinanceBaseUrlKey =
  | 'spot'
  | 'spot1'
  | 'spot2'
  | 'spot3'
  | 'spot4'
  | 'usdmtest'
  | 'usdm'
  | 'coinm'
  | 'coinmtest'
  | 'voptions'
  | 'voptionstest'
  | 'papi';

/**
 * Time in force. Note: `GTE_GTC` is not officially documented, use at your own risk.
 */
export type OrderTimeInForce =
  | 'GTC'
  | 'IOC'
  | 'FOK'
  | 'GTX'
  | 'GTE_GTC'
  | 'GTD';

export type StringBoolean = 'TRUE' | 'FALSE';

export type SideEffects =
  | 'MARGIN_BUY'
  | 'AUTO_REPAY'
  | 'NO_SIDE_EFFECT'
  | 'AUTO_BORROW_REPAY'
  | 'NO_SIDE_EFFECT';

/**
 * ACK = confirmation of order acceptance (no placement/fill information)
 * RESULT = fill state
 * FULL = fill state + detail on fills and other detail
 */
export type OrderResponseType = 'ACK' | 'RESULT' | 'FULL';

export type OrderIdProperty =
  | 'newClientOrderId'
  | 'newClientStrategyId'
  | 'listClientOrderId'
  | 'limitClientOrderId'
  | 'stopClientOrderId'
  | 'aboveClientOrderId'
  | 'belowClientOrderId'
  | 'workingClientOrderId'
  | 'pendingAboveClientOrderId'
  | 'pendingBelowClientOrderId'
  | 'pendingClientOrderId'
  | 'clientAlgoId';

export type OrderSide = 'BUY' | 'SELL';

export type OrderStatus =
  | 'NEW'
  | 'PARTIALLY_FILLED'
  | 'FILLED'
  | 'CANCELED'
  | 'PENDING_CANCEL'
  | 'REJECTED'
  | 'EXPIRED';

export type OrderExecutionType =
  | 'NEW'
  | 'CANCELED'
  | 'REJECTED'
  | 'TRADE'
  | 'EXPIRED';

// listStatusType
export type OCOStatus = 'RESPONSE' | 'EXEC_STARTED' | 'ALL_DONE';

// listOrderStatus
export type OCOOrderStatus = 'EXECUTING' | 'ALL_DONE' | 'REJECT';

export type OrderType =
  | 'LIMIT'
  | 'LIMIT_MAKER'
  | 'MARKET'
  | 'STOP_LOSS'
  | 'STOP_LOSS_LIMIT'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_LIMIT';

export type OrderListOrderType =
  | 'STOP_LOSS_LIMIT'
  | 'STOP_LOSS'
  | 'LIMIT_MAKER'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_LIMIT';

export type SelfTradePreventionMode =
  | 'EXPIRE_TAKER'
  | 'EXPIRE_MAKER'
  | 'EXPIRE_BOTH'
  | 'NONE';

export interface BasicAssetParam {
  asset: string;
}

export interface BasicSymbolParam {
  symbol: string;
  isIsolated?: StringBoolean;
}

export interface SymbolArrayParam {
  symbols: string[];
}

export interface BasicAssetPaginatedParams {
  asset?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}
export interface BasicSymbolPaginatedParams {
  symbol?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface SymbolPrice {
  symbol: string;
  price: numberInString;
  time?: number;
}

// used by spot and usdm
export interface OrderBookParams {
  symbol: string;
  limit?: 5 | 10 | 20 | 50 | 100 | 500 | 1000 | 5000;
}

export type KlineInterval =
  | '1s'
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M';

export interface GetOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface GetOrderModifyHistoryParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface HistoricalTradesParams {
  symbol: string;
  limit?: number;
  fromId?: number;
}

export interface KlinesParams {
  symbol: string;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export type Kline = [
  number, // open time
  numberInString, // open
  numberInString, // high
  numberInString, // low
  numberInString, // close
  numberInString, // volume
  number, // close time
  numberInString, // quote asset volume
  number, // number of trades
  numberInString, // taker buy base asset vol
  numberInString, // taker buy quote asset vol
  numberInString, // ignore?
];

/** @deprecated `FuturesKline` will be removed soon. Use `Kline` instead. **/
export type FuturesKline = Kline;
export interface RecentTradesParams {
  symbol: string;
  limit?: number;
}

export interface CancelOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface AmendKeepPriorityParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  newQty: numberInString;
}

export interface CancelOCOParams {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
}

export interface NewOCOParams {
  symbol: string;
  listClientOrderId?: string;
  side: OrderSide;
  quantity: number;
  limitClientOrderId?: string;
  limitStrategyId?: number;
  limitStrategyType?: number;
  price: number;
  limitIcebergQty?: number;
  trailingDelta?: number;
  stopClientOrderId?: string;
  stopPrice: number;
  stopStrategyId?: number;
  stopStrategyType?: number;
  stopLimitPrice?: number;
  stopIcebergQty?: number;
  stopLimitTimeInForce?: OrderTimeInForce;
  newOrderRespType?: OrderResponseType;
  /** For isolated margin trading only */
  isIsolated?: StringBoolean;
  /** Define a side effect, only for margin trading */
  sideEffectType?: SideEffects;
}

export interface NewOrderListParams<
  T extends OrderResponseType = OrderResponseType,
> {
  symbol: string;
  listClientOrderId?: string;
  side: OrderSide;
  quantity: number;
  aboveType: OrderListOrderType;
  aboveClientOrderId?: string;
  aboveIcebergQty?: number;
  abovePrice?: number;
  aboveStopPrice?: number;
  aboveTrailingDelta?: number;
  aboveTimeInForce?: OrderTimeInForce;
  aboveStrategyId?: number;
  aboveStrategyType?: number;
  belowType: OrderListOrderType;
  belowClientOrderId?: string;
  belowIcebergQty?: number;
  belowPrice?: number;
  belowStopPrice?: number;
  belowTrailingDelta?: number;
  belowTimeInForce?: OrderTimeInForce;
  belowStrategyId?: number;
  belowStrategyType?: number;
  newOrderRespType?: T;
  selfTradePreventionMode?: SelfTradePreventionMode;
}

export interface SymbolFromPaginatedRequestFromId {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetAllOrdersParams {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface RateLimiter {
  rateLimitType: 'REQUEST_WEIGHT' | 'ORDERS' | 'RAW_REQUESTS';
  interval: 'SECOND' | 'MINUTE' | 'DAY';
  intervalNum: number;
  limit: number;
}

export interface SymbolPriceFilter {
  filterType: 'PRICE_FILTER';
  minPrice: numberInString;
  maxPrice: numberInString;
  tickSize: numberInString;
}

export interface SymbolPercentPriceFilter {
  filterType: 'PERCENT_PRICE';
  multiplierUp: numberInString;
  multiplierDown: numberInString;
  avgPriceMins: number;
}

export interface SymbolLotSizeFilter {
  filterType: 'LOT_SIZE';
  minQty: numberInString;
  maxQty: numberInString;
  stepSize: numberInString;
}

export interface SymbolMinNotionalFilter {
  filterType: 'NOTIONAL';
  minNotional: numberInString;
  applyMinToMarket: boolean;
  maxNotional: numberInString;
  applyMaxToMarket: boolean;
  avgPriceMins: number;
}

export interface SymbolIcebergPartsFilter {
  filterType: 'ICEBERG_PARTS';
  limit: number;
}

export interface SymbolMarketLotSizeFilter {
  filterType: 'MARKET_LOT_SIZE';
  minQty: numberInString;
  maxQty: numberInString;
  stepSize: numberInString;
}

export interface SymbolMaxOrdersFilter {
  filterType: 'MAX_NUM_ORDERS';
  maxNumOrders: number;
}

export interface SymbolMaxAlgoOrdersFilter {
  filterType: 'MAX_NUM_ALGO_ORDERS';
  maxNumAlgoOrders: number;
}

export interface SymbolMaxIcebergOrdersFilter {
  filterType: 'MAX_NUM_ICEBERG_ORDERS';
  maxNumIcebergOrders: number;
}

export interface SymbolMaxPositionFilter {
  filterType: 'MAX_POSITION';
  maxPosition: numberInString;
}

export type SymbolFilter =
  | SymbolPriceFilter
  | SymbolPercentPriceFilter
  | SymbolLotSizeFilter
  | SymbolMinNotionalFilter
  | SymbolIcebergPartsFilter
  | SymbolMarketLotSizeFilter
  | SymbolMaxOrdersFilter
  | SymbolMaxAlgoOrdersFilter
  | SymbolMaxIcebergOrdersFilter
  | SymbolMaxPositionFilter;

export interface ExchangeMaxNumOrdersFilter {
  filterType: 'EXCHANGE_MAX_NUM_ORDERS';
  maxNumOrders: number;
}

export interface ExchangeMaxAlgoOrdersFilter {
  filterType: 'EXCHANGE_MAX_ALGO_ORDERS';
  maxNumAlgoOrders: number;
}

export type ExchangeFilter =
  | ExchangeMaxNumOrdersFilter
  | ExchangeMaxAlgoOrdersFilter;

export type OrderBookPrice = numberInString;
export type OrderBookAmount = numberInString;

export type OrderBookRow = [OrderBookPrice, OrderBookAmount];

export type OrderBookPriceFormatted = number;
export type OrderBookAmountFormatted = number;
export type OrderBookRowFormatted = [
  OrderBookPriceFormatted,
  OrderBookAmountFormatted,
];

export interface GenericCodeMsgError {
  code: number;
  msg: string;
}

export interface RowsWithTotal<T> {
  rows: T[];
  total: number;
}

export interface CoinStartEndLimit {
  coin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}
