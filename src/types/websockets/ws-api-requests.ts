import { KlineInterval, numberInString } from '../shared';

/**
 * Simple request params with timestamp? & recv window optional
 */
export type WSAPIRecvWindowtimestamp = {
  recvWindow?: number;
  timestamp: number;
};

/**
 *
 * Authentication request types
 *
 */
export interface SessionLogonWSAPIRequest {
  timestamp: number;
}

/**
 *
 * General request types
 *
 */
export interface ExchangeInfoWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  permissions?: string[];
  showPermissionSets?: boolean;
  symbolStatus?: string;
}

/**
 *
 * Market data request types
 *
 */

export interface DepthWSAPIRequest {
  symbol: string;
  limit?: number;
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
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface AvgPriceWSAPIRequest {
  symbol: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface Ticker24hrWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  type?: 'FULL' | 'MINI';
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface TickerTradingDayWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  timeZone?: string;
  type?: 'FULL' | 'MINI';
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface TickerWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  windowSize?: string; // '1m', '2m' ... '59m', '1h', '2h' ... '23h', '1d', '2d' ... '7d'
  type?: 'FULL' | 'MINI';
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface TickerPriceWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface TickerBookWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

/**
 *
 * Account request types - Spot
 *
 */

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
  price?: numberInString;
  quantity?: numberInString;
  quoteOrderQty?: numberInString;
  newClientOrderId?: string;
  stopPrice?: numberInString;
  trailingDelta?: number;
  icebergQty?: numberInString;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  computeCommissionRates?: boolean;
  timestamp?: number;
  recvWindow?: number;
}

export interface OrderStatusWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderCancelWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
  recvWindow?: number;
  timestamp?: number;
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
  price?: numberInString;
  quantity?: numberInString;
  quoteOrderQty?: numberInString;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  stopPrice?: numberInString;
  trailingDelta?: number;
  icebergQty?: numberInString;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
  orderRateLimitExceededMode?: 'DO_NOTHING' | 'CANCEL_ONLY';
  recvWindow?: number;
  timestamp?: number;
}

export interface OpenOrdersStatusWSAPIRequest {
  symbol?: string;
  recvWindow?: number;
  timestamp?: number;
}

export interface OpenOrdersCancelAllWSAPIRequest {
  symbol: string;
  recvWindow?: number;
  timestamp?: number;
}

/**
 * Order list request types
 */
export interface OrderListPlaceWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  price: numberInString;
  quantity: numberInString;
  listClientOrderId?: string;
  limitClientOrderId?: string;
  limitIcebergQty?: numberInString;
  limitStrategyId?: number;
  limitStrategyType?: number;
  stopPrice?: numberInString;
  trailingDelta?: number;
  stopClientOrderId?: string;
  stopLimitPrice?: numberInString;
  stopLimitTimeInForce?: string;
  stopIcebergQty?: numberInString;
  stopStrategyId?: number;
  stopStrategyType?: number;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderListPlaceOCOWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: numberInString;
  listClientOrderId?: string;
  aboveType:
    | 'STOP_LOSS_LIMIT'
    | 'STOP_LOSS'
    | 'LIMIT_MAKER'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT';
  aboveClientOrderId?: string;
  aboveIcebergQty?: numberInString;
  abovePrice?: numberInString;
  aboveStopPrice?: numberInString;
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
  belowIcebergQty?: numberInString;
  belowPrice?: numberInString;
  belowStopPrice?: numberInString;
  belowTrailingDelta?: number;
  belowTimeInForce?: string;
  belowStrategyId?: number;
  belowStrategyType?: number;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderListPlaceOTOWSAPIRequest {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: numberInString;
  workingQuantity: numberInString;
  workingIcebergQty?: numberInString;
  workingTimeInForce?: string;
  workingStrategyId?: number;
  workingStrategyType?: number;
  pendingType: string;
  pendingSide: 'BUY' | 'SELL';
  pendingClientOrderId?: string;
  pendingPrice?: numberInString;
  pendingStopPrice?: numberInString;
  pendingTrailingDelta?: numberInString;
  pendingQuantity: numberInString;
  pendingIcebergQty?: numberInString;
  pendingTimeInForce?: string;
  pendingStrategyId?: number;
  pendingStrategyType?: number;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderListPlaceOTOCOWSAPIRequest {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: numberInString;
  workingQuantity: numberInString;
  workingIcebergQty?: numberInString;
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
  pendingAbovePrice?: numberInString;
  pendingAboveStopPrice?: numberInString;
  pendingAboveTrailingDelta?: numberInString;
  pendingAboveIcebergQty?: numberInString;
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
  pendingBelowPrice?: numberInString;
  pendingBelowStopPrice?: numberInString;
  pendingBelowTrailingDelta?: numberInString;
  pendingBelowIcebergQty?: numberInString;
  pendingBelowTimeInForce?: string;
  pendingBelowStrategyId?: number;
  pendingBelowStrategyType?: number;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderListStatusWSAPIRequest {
  origClientOrderId?: string;
  orderListId?: number;
  recvWindow?: number;
  timestamp?: number;
}

export interface OrderListCancelWSAPIRequest {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
  recvWindow?: number;
  timestamp?: number;
}

/**
 * SOR request types
 */
export interface SOROrderPlaceWSAPIRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  timeInForce?: string;
  price?: numberInString;
  quantity: numberInString;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  icebergQty?: numberInString;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode?: string;
  timestamp?: number;
  recvWindow?: number;
}

export interface SOROrderTestWSAPIRequest extends SOROrderPlaceWSAPIRequest {
  computeCommissionRates?: boolean;
}

/**
 * Futures market data request types
 */

export interface FuturesDepthWSAPIRequest {
  symbol: string;
  limit?: number;
}

export interface FuturesTickerPriceWSAPIRequest {
  symbol?: string;
}

export interface FuturesTickerBookWSAPIRequest {
  symbol?: string;
}

/**
 * Futures trading request types
 */
export interface FuturesOrderModifyWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  side: 'BUY' | 'SELL';
  quantity: numberInString;
  price: numberInString;
  priceMatch?:
    | 'NONE'
    | 'OPPONENT'
    | 'OPPONENT_5'
    | 'OPPONENT_10'
    | 'OPPONENT_20'
    | 'QUEUE'
    | 'QUEUE_5'
    | 'QUEUE_10'
    | 'QUEUE_20';
  origType?: string;
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  recvWindow?: number;
  timestamp?: number;
}

export interface FuturesOrderCancelWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp?: number;
}

export interface FuturesOrderStatusWSAPIRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface FuturesPositionWSAPIRequest {
  symbol?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface FuturesPositionV2WSAPIRequest {
  symbol?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface AccountStatusWSAPIRequest {
  omitZeroBalances?: boolean;
  recvWindow?: number;
  timestamp: number;
}

export interface AccountCommissionWSAPIRequest {
  symbol: string;
}
