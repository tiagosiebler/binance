// Generic numeric value stored as a string. Can be parsed via parseInt or parseFloat.
// Beautifier may convert these to number, if enabled.
export type numberInString = string | number;

export type ExchangeSymbol = string;

export type BooleanString = 'true' | 'false';
export type BooleanStringCapitalised = 'TRUE' | 'FALSE';

export type BinanceBaseUrlKey = 'spot' | 'spot1' | 'spot2' | 'spot3' | 'spot4' | 'usdmtest' | 'usdm' | 'coinm' | 'voptions' | 'voptionstest';

export type OrderTimeInForce = 'GTC' | 'IOC' | 'FOK';

export type StringBoolean = 'TRUE' | 'FALSE';

/**
 * ACK = confirmation of order acceptance (no placement/fill information)
 * RESULT = fill state
 * FULL = fill state + detail on fills and other detail
 */
export type OrderResponseType = 'ACK' | 'RESULT' | 'FULL';

export type OrderIdProperty = 'newClientOrderId' | 'listClientOrderId' | 'limitClientOrderId' | 'stopClientOrderId';

export type OrderSide = 'BUY' | 'SELL';

export type OrderStatus = 'NEW'
  | 'PARTIALLY_FILLED'
  | 'FILLED'
  | 'CANCELED'
  | 'PENDING_CANCEL'
  | 'REJECTED'
  | 'EXPIRED';

export type OrderExecutionType = 'NEW'
  | 'CANCELED'
  | 'REJECTED'
  | 'TRADE'
  | 'EXPIRED';

// listStatusType
export type OCOStatus =
  'RESPONSE'
  | 'EXEC_STARTED'
  | 'ALL_DONE';

// listOrderStatus
export type OCOOrderStatus =
  'EXECUTING'
  | 'ALL_DONE'
  | 'REJECT';

export type OrderType =
  'LIMIT'
  | 'LIMIT_MAKER'
  | 'MARKET'
  | 'STOP_LOSS'
  | 'STOP_LOSS_LIMIT'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_LIMIT';

export interface BasicAssetParam {
  asset: string;
}

export interface BasicSymbolParam {
  symbol: string;
  isIsolated?: StringBoolean;
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

// used by spot and usdm
export interface OrderBookParams {
  symbol: string;
  limit?: 5 | 10 | 20 | 50 | 100 | 500 | 1000 | 5000;
}

export type KlineInterval =
  '1m'
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
  isIsolated?: StringBoolean;
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
  limit?: number;
}
export interface RecentTradesParams {
  symbol: string;
  limit?: number;
}

export interface CancelOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  isIsolated?: StringBoolean;
}

export interface CancelOCOParams {
  symbol: string;
  isIsolated?: string;
  orderListId?: number;
  listClientOrderId?: number;
  newClientOrderId?: string;
}
export interface NewOCOParams {
  symbol: string;
  listClientOrderId?: string;
  side: OrderSide;
  quantity: number;
  limitClientOrderId?: string;
  price: number;
  limitIcebergQty?: number;
  stopClientOrderId?: string;
  stopPrice: number;
  stopLimitPrice?: number;
  stopIcebergQty?: number;
  stopLimitTimeInForce: OrderTimeInForce;
  newOrderRespType: OrderResponseType;
  isIsolated?: StringBoolean;
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
  isIsolated?: StringBoolean;
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
  filterType: 'MIN_NOTIONAL';
  minNotional: numberInString;
  applyToMarket: boolean;
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

export type SymbolFilter = SymbolPriceFilter
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

export type ExchangeFilter = ExchangeMaxNumOrdersFilter | ExchangeMaxAlgoOrdersFilter;

export type OrderBookPrice = numberInString;
export type OrderBookAmount = numberInString;

export type OrderBookRow = [OrderBookPrice, OrderBookAmount];

export type OrderBookPriceFormatted = number;
export type OrderBookAmountFormatted = number;
export type OrderBookRowFormatted = [OrderBookPriceFormatted, OrderBookAmountFormatted];

export interface GenericCodeMsgError {
  code: number;
  msg: string;
}
