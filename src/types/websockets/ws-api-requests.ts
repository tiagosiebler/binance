/**
 * Simple request params with timestamp & recv window optional
 */
export type WSAPIRecvWindowTimestamp = {
  recvWindow?: number;
  timestamp?: number;
} | void;

/**
 * Authentication request types
 */
export interface SessionLogonWSAPIRequest {
  apiKey: string;
  signature: string;
  timestamp: number;
}

/**
 * General request types
 */
export interface ExchangeInfoWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  permissions?: string[];
  showPermissionSets?: boolean;
  symbolStatus?: string;
}

/**
 * Market data request types
 */
export interface DepthWSAPIRequest {
  symbol: string;
  limit: number;
}

export interface TradesRecentWSAPIRequest {
  symbol: string;
  limit?: number;
}

export interface TradesHistoricalWSAPIRequest {
  symbol: string;
  fromId?: number;
  limit?: number;
}

export interface TradesAggregateWSAPIRequest {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface KlinesWSAPIRequest {
  symbol: string;
  interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface UIKlinesWSAPIRequest {
  symbol: string;
  interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface AvgPriceWSAPIRequest {
  symbol: string;
}

export interface Ticker24hrWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  type?: 'FULL' | 'MINI';
}

export interface TickerTradingDayWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  timeZone?: string;
  type?: 'FULL' | 'MINI';
}

export interface TickerWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  windowSize?: string; // '1m', '2m' ... '59m', '1h', '2h' ... '23h', '1d', '2d' ... '7d'
  type?: 'FULL' | 'MINI';
}

export interface TickerPriceWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

export interface TickerBookWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

/**
 * Account request types - Spot
 */
export interface AccountStatusWSAPIRequest {
  omitZeroBalances?: boolean;
}

export interface AccountCommissionWSAPIRequest {
  symbol: string;
}

export interface AllOrdersWSAPIRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface AllOrderListsWSAPIRequest {
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface MyTradesWSAPIRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface MyPreventedMatchesWSAPIRequest {
  symbol: string;
  preventedMatchId?: number;
  orderId?: number;
  fromPreventedMatchId?: number;
  limit?: number;
}

export interface MyAllocationsWSAPIRequest {
  symbol: string;
  startTime?: number;
  endTime?: number;
  fromAllocationId?: number;
  limit?: number;
  orderId?: number;
}

/**
 * Trading request types
 */
export interface OrderTestWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: string;
  timeInForce?: string;
  price?: string;
  quantity?: string;
  quoteOrderQty?: string;
  newClientOrderId?: string;
  stopPrice?: string;
  trailingDelta?: number;
  icebergQty?: string;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  computeCommissionRates?: boolean;
  timestamp: number;
  signature: string;
  apiKey: string;
  recvWindow?: number;
}

export interface OrderStatusWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderCancelWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderCancelReplaceWSAPIRequest {
  symbol: string;
  cancelReplaceMode: 'STOP_ON_FAILURE' | 'ALLOW_FAILURE';
  cancelOrderId?: number;
  cancelOrigClientOrderId?: string;
  cancelNewClientOrderId?: string;
  side: 'BUY' | 'SELL';
  type: string;
  timeInForce?: string;
  price?: string;
  quantity?: string;
  quoteOrderQty?: string;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  stopPrice?: string;
  trailingDelta?: number;
  icebergQty?: string;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
  apiKey: string;
  orderRateLimitExceededMode?: 'DO_NOTHING' | 'CANCEL_ONLY';
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OpenOrdersStatusWSAPIRequest {
  symbol?: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OpenOrdersCancelAllWSAPIRequest {
  symbol: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

/**
 * Order list request types
 */
export interface OrderListPlaceWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  price: string;
  quantity: string;
  listClientOrderId?: string;
  limitClientOrderId?: string;
  limitIcebergQty?: string;
  limitStrategyId?: number;
  limitStrategyType?: number;
  stopPrice?: string;
  trailingDelta?: number;
  stopClientOrderId?: string;
  stopLimitPrice?: string;
  stopLimitTimeInForce?: string;
  stopIcebergQty?: string;
  stopStrategyId?: number;
  stopStrategyType?: number;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderListPlaceOCOWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number | string;
  listClientOrderId?: string;
  aboveType:
    | 'STOP_LOSS_LIMIT'
    | 'STOP_LOSS'
    | 'LIMIT_MAKER'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT';
  aboveClientOrderId?: string;
  aboveIcebergQty?: number | string;
  abovePrice?: number | string;
  aboveStopPrice?: number | string;
  aboveTrailingDelta?: number;
  aboveTimeInForce?: string;
  aboveStrategyId?: number;
  aboveStrategyType?: number;
  belowType:
    | 'STOP_LOSS'
    | 'STOP_LOSS_LIMIT'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT'
    | 'LIMIT_MAKER';
  belowClientOrderId?: string;
  belowIcebergQty?: number | string;
  belowPrice?: number | string;
  belowStopPrice?: number | string;
  belowTrailingDelta?: number;
  belowTimeInForce?: string;
  belowStrategyId?: number;
  belowStrategyType?: number;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderListPlaceOTOWSAPIRequest {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: number | string;
  workingQuantity: number | string;
  workingIcebergQty?: number | string;
  workingTimeInForce?: string;
  workingStrategyId?: number;
  workingStrategyType?: number;
  pendingType: string;
  pendingSide: 'BUY' | 'SELL';
  pendingClientOrderId?: string;
  pendingPrice?: number | string;
  pendingStopPrice?: number | string;
  pendingTrailingDelta?: number | string;
  pendingQuantity: number | string;
  pendingIcebergQty?: number | string;
  pendingTimeInForce?: string;
  pendingStrategyId?: number;
  pendingStrategyType?: number;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderListPlaceOTOCOWSAPIRequest {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: number | string;
  workingQuantity: number | string;
  workingIcebergQty?: number | string;
  workingTimeInForce?: string;
  workingStrategyId?: number;
  workingStrategyType?: number;
  pendingSide: 'BUY' | 'SELL';
  pendingQuantity: number | string;
  pendingAboveType:
    | 'STOP_LOSS_LIMIT'
    | 'STOP_LOSS'
    | 'LIMIT_MAKER'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT';
  pendingAboveClientOrderId?: string;
  pendingAbovePrice?: number | string;
  pendingAboveStopPrice?: number | string;
  pendingAboveTrailingDelta?: number | string;
  pendingAboveIcebergQty?: number | string;
  pendingAboveTimeInForce?: string;
  pendingAboveStrategyId?: number;
  pendingAboveStrategyType?: number;
  pendingBelowType:
    | 'STOP_LOSS'
    | 'STOP_LOSS_LIMIT'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT'
    | 'LIMIT_MAKER';
  pendingBelowClientOrderId?: string;
  pendingBelowPrice?: number | string;
  pendingBelowStopPrice?: number | string;
  pendingBelowTrailingDelta?: number | string;
  pendingBelowIcebergQty?: number | string;
  pendingBelowTimeInForce?: string;
  pendingBelowStrategyId?: number;
  pendingBelowStrategyType?: number;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderListStatusWSAPIRequest {
  origClientOrderId?: string;
  orderListId?: number;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OrderListCancelWSAPIRequest {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

export interface OpenOrderListsStatusWSAPIRequest {
  apiKey: string;
  recvWindow?: number;
  timestamp: number;
  signature: string;
}

/**
 * SOR request types
 */
export interface SOROrderPlaceWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  timeInForce?: string;
  price?: number | string;
  quantity: number | string;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  icebergQty?: number | string;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  apiKey: string;
  timestamp: number;
  recvWindow?: number;
  signature: string;
}

export interface SOROrderTestWSAPIRequest extends SOROrderPlaceWSAPIRequest {
  computeCommissionRates?: boolean;
}
