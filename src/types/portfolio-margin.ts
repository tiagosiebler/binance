// Enums
export type PMStrategyType =
  | 'STOP'
  | 'STOP_MARKET'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_MARKET'
  | 'TRAILING_STOP_MARKET';

export type PMWorkingType = 'MARK_PRICE' | 'CONTRACT_PRICE';

export type PMPriceMatch =
  | 'NONE'
  | 'OPPONENT'
  | 'OPPONENT_5'
  | 'OPPONENT_10'
  | 'OPPONENT_20'
  | 'QUEUE'
  | 'QUEUE_5'
  | 'QUEUE_10'
  | 'QUEUE_20';

export type PMSelfTradePreventionMode =
  | 'NONE'
  | 'EXPIRE_TAKER'
  | 'EXPIRE_MAKER'
  | 'EXPIRE_BOTH';

export type PMMarginOrderType =
  | 'LIMIT'
  | 'MARKET'
  | 'STOP_LOSS'
  | 'STOP_LOSS_LIMIT'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_LIMIT';

export type PMMarginSideEffectType =
  | 'NO_SIDE_EFFECT'
  | 'MARGIN_BUY'
  | 'AUTO_REPAY'
  | 'AUTO_BORROW_REPAY';

export type PMAutoCloseType = 'LIQUIDATION' | 'ADL';

export interface NewPortfolioUMOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT'; // Default BOTH for One-way Mode
  type: 'LIMIT' | 'MARKET';
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean; // Cannot be sent in Hedge Mode
  price?: string;
  newClientOrderId?: string; // Must match: ^[\.A-Z\:/a-z0-9_-]{1,32}$
  newOrderRespType?: 'ACK' | 'RESULT'; // Default: ACK
  priceMatch?: PMPriceMatch; // Only for LIMIT/STOP/TAKE_PROFIT orders
  selfTradePreventionMode?: PMSelfTradePreventionMode;
  goodTillDate?: number; // Mandatory when timeInForce is GTD
}

export interface NewPortfolioUMOrderResponse {
  clientOrderId: string;
  cumQty: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  avgPrice: string;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  status: string;
  symbol: string;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate?: number;
  updateTime: number;
  priceMatch: PMPriceMatch;
}

export interface NewPortfolioUMConditionalOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  strategyType: PMStrategyType;
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean;
  price?: string;
  workingType?: PMWorkingType;
  priceProtect?: boolean;
  newClientStrategyId?: string;
  stopPrice?: string;
  activationPrice?: string;
  callbackRate?: string;
  priceMatch?: PMPriceMatch;
  selfTradePreventionMode?: PMSelfTradePreventionMode;
  goodTillDate?: number;
}

export interface NewPortfolioConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
  bookTime: number;
  updateTime: number;
  workingType: PMWorkingType;
  priceProtect: boolean;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate?: number;
  priceMatch: PMPriceMatch;
}

export interface NewPortfolioCMOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  type: 'LIMIT' | 'MARKET';
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean;
  price?: string;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT';
}

export interface NewPortfolioCMOrderResponse {
  clientOrderId: string;
  cumQty: string;
  cumBase: string;
  executedQty: string;
  orderId: number;
  avgPrice: string;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  status: string;
  symbol: string;
  pair: string;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  updateTime: number;
}

export interface NewPortfolioCMConditionalOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  strategyType: PMStrategyType;
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean;
  price?: string;
  workingType?: PMWorkingType;
  priceProtect?: boolean;
  newClientStrategyId?: string;
  stopPrice?: string;
  activationPrice?: string;
  callbackRate?: string;
}

export interface NewPortfolioCMConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  pair: string;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
  bookTime: number;
  updateTime: number;
  workingType: PMWorkingType;
  priceProtect: boolean;
}

export interface MarginOrderFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
}

export interface NewPortfolioMarginOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: PMMarginOrderType;
  quantity?: string;
  quoteOrderQty?: string;
  price?: string;
  stopPrice?: string;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  icebergQty?: string;
  sideEffectType?: PMMarginSideEffectType;
  timeInForce?: string;
  selfTradePreventionMode?: PMSelfTradePreventionMode;
  autoRepayAtCancel?: boolean;
}

export interface NewPortfolioMarginOrderResponse {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: PMMarginOrderType;
  side: 'BUY' | 'SELL';
  marginBuyBorrowAmount?: string;
  marginBuyBorrowAsset?: string;
  fills: MarginOrderFill[];
}

export interface PortfolioMarginOCOOrder {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface PortfolioMarginOCOOrderReport {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: 'BUY' | 'SELL';
  stopPrice?: string;
}

export interface NewPortfolioMarginOCOReq {
  symbol: string;
  listClientOrderId?: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  limitClientOrderId?: string;
  price: string;
  limitIcebergQty?: string;
  stopClientOrderId?: string;
  stopPrice: string;
  stopLimitPrice?: string;
  stopIcebergQty?: string;
  stopLimitTimeInForce?: 'GTC' | 'FOK' | 'IOC';
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  sideEffectType?: PMMarginSideEffectType;
}

export interface NewPortfolioMarginOCOResponse {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  marginBuyBorrowAmount?: string;
  marginBuyBorrowAsset?: string;
  orders: PortfolioMarginOCOOrder[];
  orderReports: PortfolioMarginOCOOrderReport[];
}

// Add new interfaces for canceling UM orders
export interface CancelPortfolioUMOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioUMCancelOrderResponse {
  avgPrice: string;
  clientOrderId: string;
  cumQty: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  status: string;
  symbol: string;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  updateTime: number;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PMPriceMatch;
}

export interface CancelPortfolioUMConditionalOrderReq {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface PortfolioUMCancelConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
  bookTime: number;
  updateTime: number;
  workingType: PMWorkingType;
  priceProtect: boolean;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PMPriceMatch;
}

export interface CancelPortfolioCMOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioCMCancelOrderResponse {
  avgPrice: string;
  clientOrderId: string;
  cumQty: string;
  cumBase: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  status: string;
  symbol: string;
  pair: string;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  updateTime: number;
}

export interface CancelPortfolioCMConditionalOrderReq {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface PortfolioCMCancelConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
  bookTime: number;
  updateTime: number;
  workingType: PMWorkingType;
  priceProtect: boolean;
}

export interface CancelPortfolioMarginOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
}

export interface PortfolioMarginCancelOrderResponse {
  symbol: string;
  orderId: number;
  origClientOrderId: string;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: PMMarginOrderType;
  side: 'BUY' | 'SELL';
}

export interface CancelPortfolioMarginOCOReq {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
}

export interface PortfolioMarginOCOCancelOrder {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface PortfolioMarginOCOCancelOrderReport {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: 'STOP_LOSS_LIMIT' | 'LIMIT_MAKER';
  side: 'BUY' | 'SELL';
  stopPrice?: string;
}

export interface PortfolioMarginOCOCancelResponse {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: PortfolioMarginOCOCancelOrder[];
  orderReports: PortfolioMarginOCOCancelOrderReport[];
}

export interface PortfolioMarginCancelAllOrdersOrderReport {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: PMMarginOrderType;
  side: 'BUY' | 'SELL';
  stopPrice?: string;
  icebergQty?: string;
}

export interface PortfolioMarginCancelAllOrdersOCOReport {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: PortfolioMarginOCOCancelOrder[];
  orderReports: PortfolioMarginCancelAllOrdersOrderReport[];
}

export type PortfolioMarginCancelAllOrdersResponse =
  | PortfolioMarginCancelAllOrdersOrderReport
  | PortfolioMarginCancelAllOrdersOCOReport;

export interface ModifyPortfolioUMOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  orderId?: number;
  origClientOrderId?: string;
  priceMatch?: PMPriceMatch;
}

export interface PortfolioUMModifyOrderResponse {
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQty: string;
  cumQuote: string;
  timeInForce: string;
  type: 'LIMIT';
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'LONG' | 'SHORT' | 'BOTH';
  origType: 'LIMIT';
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate: number;
  updateTime: number;
  priceMatch: PMPriceMatch;
}

export interface ModifyPortfolioCMOrderReq {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioCMModifyOrderResponse {
  orderId: number;
  symbol: string;
  pair: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQty: string;
  cumBase: string;
  timeInForce: string;
  type: 'LIMIT';
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'LONG' | 'SHORT' | 'BOTH';
  origType: 'LIMIT';
  updateTime: number;
}

export interface QueryPortfolioUMOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioUMOrder {
  avgPrice: string;
  clientOrderId: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: 'LIMIT' | 'MARKET';
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'LONG' | 'SHORT' | 'BOTH';
  status: string;
  symbol: string;
  time: number;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  updateTime: number;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PMPriceMatch;
}

export interface QueryPortfolioAllUMOrdersReq {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface QueryPortfolioUMOpenOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface QueryPortfolioAllUMConditionalOrdersReq {
  symbol?: string;
  strategyId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioUMConditionalOrder {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'LONG' | 'SHORT' | 'BOTH';
  stopPrice?: string;
  symbol: string;
  orderId?: number;
  status?: string;
  bookTime: number;
  updateTime: number;
  triggerTime?: number;
  timeInForce: string;
  type?: 'MARKET' | 'LIMIT';
  activatePrice?: string;
  priceRate?: string;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PMPriceMatch;
}

export interface QueryPortfolioUMOpenConditionalOrderReq {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface QueryPortfolioUMConditionalOrderHistoryReq {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface QueryPortfolioCMOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioCMOrder {
  avgPrice: string;
  clientOrderId: string;
  cumBase: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: 'LIMIT' | 'MARKET';
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  status: string;
  symbol: string;
  pair: string;
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  time: number;
  timeInForce: string;
  type: 'LIMIT' | 'MARKET';
  updateTime: number;
}

export interface QueryPortfolioAllCMOrdersReq {
  symbol: string;
  pair?: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface QueryPortfolioCMOpenOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface QueryPortfolioAllCMConditionalOrdersReq {
  symbol?: string;
  strategyId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioCMConditionalOrder {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PMStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  orderId?: number;
  status?: string;
  bookTime: number;
  updateTime: number;
  triggerTime?: number;
  timeInForce: string;
  type?: 'MARKET' | 'LIMIT';
  activatePrice?: string;
  priceRate?: string;
  workingType: PMWorkingType;
  priceProtect: boolean;
}

export interface QueryPortfolioCMConditionalOrderHistoryReq {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface PortfolioCMConditionalHistoryOrder
  extends PortfolioCMConditionalOrder {
  priceMatch: PMPriceMatch;
}

export interface QueryPortfolioUMForceOrdersReq {
  symbol?: string;
  autoCloseType?: PMAutoCloseType;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioUMForceOrder {
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQuote: string;
  timeInForce: string;
  type: 'LIMIT';
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  origType: 'LIMIT';
  time: number;
  updateTime: number;
}

export interface QueryPortfolioCMForceOrdersReq {
  symbol?: string;
  autoCloseType?: PMAutoCloseType;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioCMForceOrder {
  orderId: number;
  symbol: string;
  pair: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumBase: string;
  timeInForce: string;
  type: 'LIMIT';
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  origType: 'LIMIT';
  time: number;
  updateTime: number;
}

export interface QueryPortfolioUMOrderAmendmentReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioUMOrderAmendment {
  price: {
    before: string;
    after: string;
  };
  origQty: {
    before: string;
    after: string;
  };
  count: number;
}

export interface PortfolioUMOrderModificationHistory {
  amendmentId: number;
  symbol: string;
  pair: string;
  orderId: number;
  clientOrderId: string;
  time: number;
  amendment: PortfolioUMOrderAmendment;
  priceMatch: PMPriceMatch;
}

export interface QueryPortfolioCMOrderAmendmentReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface PortfolioCMOrderAmendment {
  price: {
    before: string;
    after: string;
  };
  origQty: {
    before: string;
    after: string;
  };
  count: number;
}

export interface PortfolioCMOrderModificationHistory {
  amendmentId: number;
  symbol: string;
  pair: string;
  orderId: number;
  clientOrderId: string;
  time: number;
  amendment: PortfolioCMOrderAmendment;
}

export interface QueryPortfolioMarginForceOrdersReq {
  startTime?: number;
  endTime?: number;
  current?: number; // Currently querying page. Start from 1. Default: 1
  size?: number; // Default: 10, Max: 100
}

export interface PortfolioMarginForceOrder {
  avgPrice: string;
  executedQty: string;
  orderId: number;
  price: string;
  qty: string;
  side: 'BUY' | 'SELL';
  symbol: string;
  timeInForce: string;
  updatedTime: number;
}

export interface QueryPortfolioUMTradesReq {
  symbol: string;
  startTime?: number;
  endTime?: number;
  fromId?: number; // Trade id to fetch from. Default gets most recent trades
  limit?: number; // Default 500; max 1000
}

export interface PortfolioUMTrade {
  symbol: string;
  id: number;
  orderId: number;
  side: 'BUY' | 'SELL';
  price: string;
  qty: string;
  realizedPnl: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  buyer: boolean;
  maker: boolean;
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
}

export interface QueryPortfolioCMTradesReq {
  symbol?: string;
  pair?: string;
  startTime?: number;
  endTime?: number;
  fromId?: number; // Trade id to fetch from. Default gets most recent trades
  limit?: number; // Default 50; max 1000
}

export interface PortfolioCMTrade {
  symbol: string;
  id: number;
  orderId: number;
  pair: string;
  side: 'BUY' | 'SELL';
  price: string;
  qty: string;
  realizedPnl: string;
  marginAsset: string;
  baseQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  buyer: boolean;
  maker: boolean;
}

export interface PortfolioADLQuantile {
  LONG: number;
  SHORT: number;
  BOTH?: number; // For one-way mode or isolated margin in hedge mode
  HEDGE?: number; // For cross margin in hedge mode (ignore value, just a sign)
}

export interface QueryPortfolioMarginOrderReq {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface PortfolioMarginOrder {
  clientOrderId: string;
  cummulativeQuoteQty: string;
  executedQty: string;
  icebergQty: string;
  isWorking: boolean;
  orderId: number;
  origQty: string;
  price: string;
  side: 'BUY' | 'SELL';
  status: string;
  stopPrice: string;
  symbol: string;
  time: number;
  timeInForce: string;
  type: PMMarginOrderType;
  updateTime: number;
  accountId: number;
  selfTradePreventionMode: PMSelfTradePreventionMode;
  preventedMatchId: number | null;
  preventedQuantity: string | null;
}

export interface QueryPortfolioMarginAllOrdersReq {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 500
}

export interface QueryPortfolioMarginOCOReq {
  orderListId?: number; // Either orderListId or origClientOrderId must be provided
  origClientOrderId?: string; // Either orderListId or origClientOrderId must be provided
}

export interface PortfolioMarginOCOQueryOrder {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface PortfolioMarginOCO {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: PortfolioMarginOCOQueryOrder[];
}

export interface QueryPortfolioMarginAllOCOReq {
  fromId?: number; // If supplied, neither startTime or endTime can be provided
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 500
}

export interface QueryPortfolioMarginTradesReq {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number; // TradeId to fetch from. Default gets most recent trades
  limit?: number; // Default 500; max 1000
}

export interface PortfolioMarginTrade {
  commission: string;
  commissionAsset: string;
  id: number;
  isBestMatch: boolean;
  isBuyer: boolean;
  isMaker: boolean;
  orderId: number;
  price: string;
  qty: string;
  symbol: string;
  time: number;
}

export interface PortfolioMarginRepayDebtReq {
  asset: string;
  amount?: string;
  specifyRepayAssets?: string; // Specific asset list to repay debt; Can be added in batch, separated by commas
}

export interface PortfolioMarginRepayDebtResponse {
  amount: string;
  asset: string;
  specifyRepayAssets: string[];
  updateTime: number;
  success: boolean;
}

/**
 *
 * DERIVATIVES - ACCOUNT endpoints
 *
 **/

export type PMAccountStatus =
  | 'NORMAL'
  | 'MARGIN_CALL'
  | 'SUPPLY_MARGIN'
  | 'REDUCE_ONLY'
  | 'ACTIVE_LIQUIDATION'
  | 'FORCE_LIQUIDATION'
  | 'BANKRUPTED';

export type PMIndicatorType = 'UFR' | 'IFER' | 'GCR' | 'DR' | 'TMV';
export type PMMarginLoanStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export interface PortfolioTotalBalance {
  asset: string;
  totalWalletBalance: string; // wallet balance = cross margin free + cross margin locked + UM wallet balance + CM wallet balance
  crossMarginAsset: string; // crossMarginAsset = crossMarginFree + crossMarginLocked
  crossMarginBorrowed: string; // principal of cross margin
  crossMarginFree: string; // free asset of cross margin
  crossMarginInterest: string; // interest of cross margin
  crossMarginLocked: string; // lock asset of cross margin
  umWalletBalance: string; // wallet balance of um
  umUnrealizedPNL: string; // unrealized profit of um
  cmWalletBalance: string; // wallet balance of cm
  cmUnrealizedPNL: string; // unrealized profit of cm
  updateTime: number;
  negativeBalance: string;
}

export interface PortfolioSingleBalance {
  asset: string;
  totalWalletBalance: string; // wallet balance = cross margin free + cross margin locked + UM wallet balance + CM wallet balance
  crossMarginBorrowed: string; // principal of cross margin
  crossMarginFree: string; // free asset of cross margin
  crossMarginInterest: string; // interest of cross margin
  crossMarginLocked: string; // lock asset of cross margin
  umWalletBalance: string; // wallet balance of um
  umUnrealizedPNL: string; // unrealized profit of um
  cmWalletBalance: string; // wallet balance of cm
  cmUnrealizedPNL: string; // unrealized profit of cm
  updateTime: number;
  negativeBalance: string;
}

export type PortfolioBalance = PortfolioBalance[] | PortfolioSingleBalance;

export interface PortfolioAccountInformation {
  uniMMR: string; // Portfolio margin account maintenance margin rate
  accountEquity: string; // Account equity, in USD value
  actualEquity: string; // Account equity without collateral rate, in USD value
  accountInitialMargin: string;
  accountMaintMargin: string; // Portfolio margin account maintenance margin, unit: USD
  accountStatus: PMAccountStatus;
  virtualMaxWithdrawAmount: string; // Portfolio margin maximum amount for transfer out in USD
  totalAvailableBalance: string;
  totalMarginOpenLoss: string; // in USD margin open order
  updateTime: number; // last update time
}

export interface PortfolioUMPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: string;
  maxNotionalValue: string;
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  notional: string;
  updateTime: number;
}

export interface PortfolioCMPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: string;
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  updateTime: number;
  maxQty: string;
  notionalValue: string;
}

export interface PortfolioUMLeverageBracket {
  bracket: number; // Notional bracket
  initialLeverage: number; // Max initial leverage for this bracket
  notionalCap: number; // Cap notional of this bracket
  notionalFloor: number; // Notional threshold of this bracket
  maintMarginRatio: number; // Maintenance ratio for this bracket
  cum: number; // Auxiliary number for quick calculation
}

export interface PortfolioCMLeverageBracket {
  bracket: number; // bracket level
  initialLeverage: number; // the maximum leverage
  qtyCap: number; // upper edge of base asset quantity
  qtyFloor: number; // lower edge of base asset quantity
  maintMarginRatio: number; // maintenance margin rate
  cum: number; // Auxiliary number for quick calculation
}

export interface PortfolioTradingIndicator {
  isLocked: boolean;
  plannedRecoverTime: number;
  indicator: PMIndicatorType;
  value: number;
  triggerValue: number;
}

export interface PortfolioTradingStatus {
  indicators: {
    [key: string]: PortfolioTradingIndicator[]; // key can be symbol or "ACCOUNT"
  };
  updateTime: number;
}

export interface PortfolioMarginLoanRecord {
  txId: number;
  asset: string;
  principal: string;
  timestamp: number;
  status: PMMarginLoanStatus;
}

export interface GetMarginLoanRecordsReq {
  asset: string;
  txId?: number;
  startTime?: number;
  endTime?: number;
  current?: number; // Currently querying page. Start from 1. Default: 1
  size?: number; // Default: 10, Max: 100
  archived?: boolean; // Default: false. Set to true for archived data from 6 months ago
}

export interface GetMarginRepayRecordsReq {
  asset: string;
  txId?: number;
  startTime?: number;
  endTime?: number;
  current?: number; // Currently querying page. Start from 1. Default: 1
  size?: number; // Default: 10, Max: 100
  archived?: boolean; // Default: false. Set to true for archived data from 6 months ago
}

export interface PortfolioMarginRepayRecord {
  amount: string; // Total amount repaid
  asset: string;
  interest: string; // Interest repaid
  principal: string; // Principal repaid
  status: PMMarginLoanStatus;
  txId: number;
}

export interface GetMarginInterestHistoryReq {
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number; // Currently querying page. Start from 1. Default: 1
  size?: number; // Default: 10, Max: 100
  archived?: boolean; // Default: false. Set to true for archived data from 6 months ago
}

export type PMInterestType =
  | 'PERIODIC' // interest charged per hour
  | 'ON_BORROW' // first interest charged on borrow
  | 'PERIODIC_CONVERTED' // interest charged per hour converted into BNB
  | 'ON_BORROW_CONVERTED' // first interest charged on borrow converted into BNB
  | 'PORTFOLIO'; // Portfolio Margin negative balance daily interest

export interface PortfolioMarginInterestRecord {
  txId: number;
  interestAccuredTime: number;
  asset: string;
  rawAsset: string;
  principal: string;
  interest: string;
  interestRate: string;
  type: PMInterestType;
}

export interface GetPortfolioInterestHistoryReq {
  asset?: string;
  startTime?: number;
  endTime?: number;
  size?: number; // Default: 10, Max: 100
}

export interface PortfolioNegativeBalanceInterestRecord {
  asset: string;
  interest: string; // interest amount
  interestAccuredTime: number;
  interestRate: string; // daily interest rate
  principal: string;
}

export type UMIncomeType =
  | 'TRANSFER'
  | 'WELCOME_BONUS'
  | 'REALIZED_PNL'
  | 'FUNDING_FEE'
  | 'COMMISSION'
  | 'INSURANCE_CLEAR'
  | 'REFERRAL_KICKBACK'
  | 'COMMISSION_REBATE'
  | 'API_REBATE'
  | 'CONTEST_REWARD'
  | 'CROSS_COLLATERAL_TRANSFER'
  | 'OPTIONS_PREMIUM_FEE'
  | 'OPTIONS_SETTLE_PROFIT'
  | 'INTERNAL_TRANSFER'
  | 'AUTO_EXCHANGE'
  | 'DELIVERED_SETTELMENT'
  | 'COIN_SWAP_DEPOSIT'
  | 'COIN_SWAP_WITHDRAW'
  | 'POSITION_LIMIT_INCREASE_FEE';

export interface QueryPortfolioUMIncomeReq {
  symbol?: string;
  incomeType?: UMIncomeType;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number; // Default 100; max 1000
}

export interface PortfolioUMIncome {
  symbol: string; // trade symbol, if existing
  incomeType: UMIncomeType;
  income: string; // income amount
  asset: string; // income asset
  info: string; // extra information
  time: number;
  tranId: string; // transaction id
  tradeId: string; // trade id, if existing
}

export type CMIncomeType =
  | 'TRANSFER'
  | 'WELCOME_BONUS'
  | 'FUNDING_FEE'
  | 'REALIZED_PNL'
  | 'COMMISSION'
  | 'INSURANCE_CLEAR'
  | 'DELIVERED_SETTELMENT';

export interface QueryPortfolioCMIncomeReq {
  symbol?: string;
  incomeType?: CMIncomeType;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number; // Default 100; max 1000
}

export interface PortfolioCMIncome {
  symbol: string; // trade symbol, if existing
  incomeType: CMIncomeType;
  income: string; // income amount
  asset: string; // income asset
  info: string; // extra information
  time: number;
  tranId: string; // transaction id
  tradeId: string; // trade id, if existing
}

export interface PortfolioUMAccountAsset {
  asset: string; // asset name
  crossWalletBalance: string; // wallet balance
  crossUnPnl: string; // unrealized profit
  maintMargin: string; // maintenance margin required
  initialMargin: string; // total initial margin required with current mark price
  positionInitialMargin: string; // initial margin required for positions with current mark price
  openOrderInitialMargin: string; // initial margin required for open orders with current mark price
  updateTime: number; // last update time
}

export interface PortfolioUMAccountPosition {
  symbol: string; // symbol name
  initialMargin: string; // initial margin required with current mark price
  maintMargin: string; // maintenance margin required
  unrealizedProfit: string; // unrealized profit
  positionInitialMargin: string; // initial margin required for positions with current mark price
  openOrderInitialMargin: string; // initial margin required for open orders with current mark price
  leverage: string; // current initial leverage
  entryPrice: string; // average entry price
  maxNotional: string; // maximum available notional with current leverage
  bidNotional: string; // bids notional
  askNotional: string; // ask notional
  positionSide: 'BOTH' | 'LONG' | 'SHORT'; // position side
  positionAmt: string; // position amount
  updateTime: number; // last update time
}

export interface PortfolioCMAccountAsset {
  asset: string; // asset name
  crossWalletBalance: string; // total wallet balance
  crossUnPnl: string; // unrealized profit or loss
  maintMargin: string; // maintenance margin
  initialMargin: string; // total initial margin required with the latest mark price
  positionInitialMargin: string; // positions' margin required with the latest mark price
  openOrderInitialMargin: string; // open orders' initial margin required with the latest mark price
  updateTime: number; // last update time
}

export interface PortfolioCMAccountPosition {
  symbol: string; // symbol name
  positionAmt: string; // position amount
  initialMargin: string;
  maintMargin: string;
  unrealizedProfit: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  leverage: string;
  positionSide: 'BOTH' | 'LONG' | 'SHORT'; // BOTH means that it is the position of One-way Mode
  entryPrice: string;
  maxQty: string; // maximum quantity of base asset
  updateTime: number;
}

export interface PortfolioUMAccountConfig {
  feeTier: number; // account commission tier
  canTrade: boolean; // if can trade
  canDeposit: boolean; // if can transfer in asset
  canWithdraw: boolean; // if can transfer out asset
  dualSidePosition: boolean;
  updateTime: number; // reserved property
  multiAssetsMargin: boolean;
  tradeGroupId: number;
}

export interface PortfolioUMSymbolConfig {
  symbol: string;
  marginType: 'CROSSED' | 'ISOLATED';
  isAutoAddMargin: string; // "true" or "false" as string
  leverage: number;
  maxNotionalValue: string;
}

export interface PortfolioUMAccountAssetV2 {
  asset: string; // asset name
  crossWalletBalance: string; // wallet balance
  crossUnPnl: string; // unrealized profit
  maintMargin: string; // maintenance margin required
  initialMargin: string; // total initial margin required with current mark price
  positionInitialMargin: string; // initial margin required for positions with current mark price
  openOrderInitialMargin: string; // initial margin required for open orders with current mark price
  updateTime: number; // last update time
}

export interface PortfolioUMAccountPositionV2 {
  symbol: string; // symbol name
  initialMargin: string; // initial margin required with current mark price
  maintMargin: string; // maintenance margin required
  unrealizedProfit: string; // unrealized profit
  positionSide: 'BOTH' | 'LONG' | 'SHORT'; // position side
  positionAmt: string; // position amount
  updateTime: number; // last update time
  notional: string; // position notional value
}

export interface DownloadLinkResponse {
  downloadId: string;
  status: 'completed' | 'processing'; // Enum: completed, processing
  url: string; // The link is mapped to download id
  s3Link: string | null;
  notified: boolean; // ignore
  expirationTimestamp: number; // The link would expire after this timestamp
  isExpired: boolean | null;
}
