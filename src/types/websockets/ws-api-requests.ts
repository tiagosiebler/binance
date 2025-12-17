import {
  FuturesAlgoConditionalOrderTypes,
  FuturesAlgoOrderType,
  FuturesOrderType,
  PositionSide,
  PriceMatchMode,
  WorkingType,
} from '../futures';
import {
  BooleanString,
  BooleanStringCapitalised,
  KlineInterval,
  numberInString,
  OrderResponseType,
  OrderSide,
  OrderTimeInForce,
  OrderType,
  SelfTradePreventionMode,
} from '../shared';

/**
 * Simple request params with timestamp (required) & recv window (optional)
 */
export type WSAPIRecvWindowTimestamp = {
  recvWindow?: number;
  timestamp: number;
};

/**
 *
 * Authentication request types
 *
 */
export interface WSAPISessionLogonRequest {
  timestamp: number;
}

/**
 *
 * General request types
 *
 */
export interface WSAPIExchangeInfoRequest {
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

export interface WSAPIOrderBookRequest {
  symbol: string;
  limit?: number;
  symbolStatus?: string;
}

export interface WSAPITradesRecentRequest {
  symbol: string;
  limit?: number;
}

export interface WSAPITradesHistoricalRequest {
  symbol: string;
  fromId?: number;
  limit?: number;
}

export interface WSAPITradesAggregateRequest {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface WSAPIKlinesRequest {
  symbol: string;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface WSAPIAvgPriceRequest {
  symbol: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface WSAPITicker24hrRequest {
  symbol?: string;
  symbols?: string[];
  type?: 'FULL' | 'MINI';
  symbolStatus?: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface WSAPITickerTradingDayRequest {
  symbol?: string;
  symbols?: string[];
  timeZone?: string;
  type?: 'FULL' | 'MINI';
  symbolStatus?: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface WSAPITickerRequest {
  symbol?: string;
  symbols?: string[];
  windowSize?: string; // '1m', '2m' ... '59m', '1h', '2h' ... '23h', '1d', '2d' ... '7d'
  type?: 'FULL' | 'MINI';
  symbolStatus?: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface WSAPITickerPriceRequest {
  symbol?: string;
  symbols?: string[];
  symbolStatus?: string;
}

/**
 * Symbol for single symbol, or symbols for multiple symbols
 */
export interface WSAPITickerBookRequest {
  symbol?: string;
  symbols?: string[];
  symbolStatus?: string;
}

/**
 *
 * Account request types - Spot
 *
 */

export interface WSAPIAllOrdersRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface WSAPIAllOrderListsRequest {
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface WSAPIMyTradesRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface WSAPIMyPreventedMatchesRequest {
  symbol: string;
  preventedMatchId?: number;
  orderId?: number;
  fromPreventedMatchId?: number;
  limit?: number;
}

export interface WSAPIMyAllocationsRequest {
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

export interface WSAPINewSpotOrderRequest {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: OrderTimeInForce;
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
}

export interface WSAPIOrderTestRequest {
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
  timestamp: number;
  recvWindow?: number;
}

export interface WSAPIOrderStatusRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIOrderCancelRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIOrderCancelReplaceRequest {
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
  timestamp: number;
}

export interface WSAPIOrderAmendKeepPriorityRequest {
  symbol: string;
  orderId?: number | string;
  origClientOrderId?: string;
  newClientOrderId?: string;
  newQty?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIOpenOrdersStatusRequest {
  symbol?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIOpenOrdersCancelAllRequest {
  symbol: string;
  recvWindow?: number;
  timestamp: number;
}

/**
 * Order list request types
 */
export interface WSAPIOrderListPlaceRequest {
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
  timestamp: number;
}

export interface WSAPIOrderListPlaceOCORequest {
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
  timestamp: number;
}

export interface WSAPIOrderListPlaceOTORequest {
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
  timestamp: number;
}

export interface WSAPIOrderListPlaceOTOCORequest {
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
  timestamp: number;
}

export interface WSAPIOrderListStatusRequest {
  origClientOrderId?: string;
  orderListId?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIOrderListCancelRequest {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

/**
 * SOR request types
 */
export interface WSAPISOROrderPlaceRequest {
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
  timestamp: number;
  recvWindow?: number;
}

export type WSAPISOROrderTestRequest = WSAPISOROrderPlaceRequest & {
  computeCommissionRates?: boolean;
};

/**
 * Futures market data request types
 */

export interface WSAPIFuturesOrderBookRequest {
  symbol: string;
  limit?: number;
}

export interface WSAPIFuturesTickerPriceRequest {
  symbol?: string;
}

export interface WSAPIFuturesTickerBookRequest {
  symbol?: string;
}

/**
 * Futures trading request types
 */

export interface WSAPINewFuturesOrderRequest<numberType = numberInString> {
  symbol: string;
  side: OrderSide;
  positionSide?: PositionSide;
  type: FuturesOrderType;
  timeInForce?: OrderTimeInForce;
  quantity?: numberType;
  reduceOnly?: BooleanString;
  price?: numberType;
  newClientOrderId?: string;
  stopPrice?: numberType;
  closePosition?: BooleanString;
  activationPrice?: numberType;
  callbackRate?: numberType;
  workingType?: WorkingType;
  priceProtect?: BooleanStringCapitalised;
  newOrderRespType?: 'ACK' | 'RESULT';
  selfTradePreventionMode?: SelfTradePreventionMode;
  priceMatch?: PriceMatchMode;
  goodTillDate?: number; // Mandatory when timeInForce is GTD
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIFuturesOrderModifyRequest {
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
  timestamp: number;
}

export interface WSAPIFuturesOrderCancelRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIFuturesOrderStatusRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIFuturesPositionRequest {
  symbol?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIFuturesPositionV2Request {
  symbol?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIAccountInformationRequest {
  omitZeroBalances?: boolean;
  recvWindow?: number;
  timestamp: number;
}

export interface WSAPIAccountCommissionWSAPIRequest {
  symbol: string;
}

/**
 * Ref: https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api
 */
export interface WSAPINewFuturesAlgoOrderRequest<numberType = numberInString> {
  algoType: FuturesAlgoOrderType;
  symbol: string;
  side: OrderSide;
  positionSide?: PositionSide;
  type: FuturesAlgoConditionalOrderTypes;
  timeInForce?: OrderTimeInForce;
  quantity?: numberType;
  reduceOnly?: BooleanString;
  price?: numberInString;
  newClientOrderId?: string;
  stopPrice?: numberInString;
  closePosition?: BooleanString;
  activationPrice?: numberInString;
  callbackRate?: numberInString;
  workingType?: WorkingType;
  priceProtect?: BooleanStringCapitalised;
  newOrderRespType?: OrderResponseType;
  priceMatch?: PriceMatchMode;
  selfTradePreventionMode?: SelfTradePreventionMode;
  goodTillDate?: number; // Mandatory when timeInForce is GTD
  recvWindow?: number;
  timestamp: number;
}

/**
 * Ref: https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Cancel-Algo-Order
 */
export interface WSAPIFuturesAlgoOrderCancelRequest {
  algoid?: number;
  clientalgoid?: string;
  recvWindow?: number;
  timestamp: number;
}
