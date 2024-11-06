// Enums
export enum PortfolioStrategyType {
  STOP = 'STOP',
  STOP_MARKET = 'STOP_MARKET',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_MARKET = 'TAKE_PROFIT_MARKET',
  TRAILING_STOP_MARKET = 'TRAILING_STOP_MARKET',
}

export enum WorkingType {
  MARK_PRICE = 'MARK_PRICE',
  CONTRACT_PRICE = 'CONTRACT_PRICE',
}

export enum PriceMatch {
  NONE = 'NONE',
  OPPONENT = 'OPPONENT',
  OPPONENT_5 = 'OPPONENT_5',
  OPPONENT_10 = 'OPPONENT_10',
  OPPONENT_20 = 'OPPONENT_20',
  QUEUE = 'QUEUE',
  QUEUE_5 = 'QUEUE_5',
  QUEUE_10 = 'QUEUE_10',
  QUEUE_20 = 'QUEUE_20',
}

export enum SelfTradePreventionMode {
  NONE = 'NONE',
  EXPIRE_TAKER = 'EXPIRE_TAKER',
  EXPIRE_MAKER = 'EXPIRE_MAKER',
  EXPIRE_BOTH = 'EXPIRE_BOTH',
}

export enum MarginOrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
}

export enum MarginSideEffectType {
  NO_SIDE_EFFECT = 'NO_SIDE_EFFECT',
  MARGIN_BUY = 'MARGIN_BUY',
  AUTO_REPAY = 'AUTO_REPAY',
  AUTO_BORROW_REPAY = 'AUTO_BORROW_REPAY',
}

export enum AutoCloseType {
  LIQUIDATION = 'LIQUIDATION',
  ADL = 'ADL',
}

export interface NewPortfolioConditionalOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  strategyType: PortfolioStrategyType;
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean;
  price?: string;
  workingType?: WorkingType;
  priceProtect?: boolean;
  newClientStrategyId?: string;
  stopPrice?: string;
  activationPrice?: string;
  callbackRate?: string;
  priceMatch?: PriceMatch;
  selfTradePreventionMode?: SelfTradePreventionMode;
  goodTillDate?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate?: number;
  priceMatch: PriceMatch;
}

export interface NewPortfolioCMOrderParams {
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
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMOrderResponse {
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

export interface NewPortfolioCMConditionalOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  strategyType: PortfolioStrategyType;
  timeInForce?: string;
  quantity?: string;
  reduceOnly?: boolean;
  price?: string;
  workingType?: WorkingType;
  priceProtect?: boolean;
  newClientStrategyId?: string;
  stopPrice?: string;
  activationPrice?: string;
  callbackRate?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface MarginOrderFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
}

export interface NewPortfolioMarginOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: MarginOrderType;
  quantity?: string;
  quoteOrderQty?: string;
  price?: string;
  stopPrice?: string;
  newClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  icebergQty?: string;
  sideEffectType?: MarginSideEffectType;
  timeInForce?: string;
  selfTradePreventionMode?: SelfTradePreventionMode;
  autoRepayAtCancel?: boolean;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioMarginOrderResponse {
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
  type: MarginOrderType;
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

export interface NewPortfolioMarginOCOParams {
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
  sideEffectType?: MarginSideEffectType;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioMarginOCOResponse {
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
export interface CancelPortfolioUMOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PriceMatch;
}

export interface CancelPortfolioUMConditionalOrderParams {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
}

export interface PortfolioUMCancelConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PriceMatch;
}

export interface CancelPortfolioCMOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
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

export interface CancelPortfolioCMConditionalOrderParams {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMCancelConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface CancelPortfolioMarginOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
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
  type: MarginOrderType;
  side: 'BUY' | 'SELL';
}

export interface CancelPortfolioMarginOCOParams {
  symbol: string;
  orderListId?: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
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
  type: MarginOrderType;
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

export interface ModifyPortfolioUMOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  orderId?: number;
  origClientOrderId?: string;
  priceMatch?: PriceMatch;
  recvWindow?: number;
  timestamp: number;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  updateTime: number;
  priceMatch: PriceMatch;
}

export interface ModifyPortfolioCMOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioUMOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioUMOrderQueryResponse {
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
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PriceMatch;
}

export interface QueryPortfolioAllUMOrdersParams {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
}

// We can reuse the PortfolioUMOrderQueryResponse interface since the response format is the same
export type QueryPortfolioAllUMOrdersResponse = PortfolioUMOrderQueryResponse[];

export interface QueryPortfolioUMOpenOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

// We can reuse PortfolioUMOrderQueryResponse since the response format is identical
export type QueryPortfolioUMAllOpenOrdersResponse =
  PortfolioUMOrderQueryResponse[];

export interface QueryPortfolioAllUMConditionalOrdersParams {
  symbol?: string;
  strategyId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioUMConditionalOrderQueryResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PriceMatch;
}

export interface PortfolioUMOpenConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'LONG' | 'SHORT' | 'BOTH';
  stopPrice?: string;
  symbol: string;
  bookTime: number;
  updateTime: number;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
  priceMatch: PriceMatch;
}

export interface QueryPortfolioUMOpenConditionalOrderParams {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface QueryPortfolioUMConditionalOrderHistoryParams {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioUMConditionalOrderHistoryResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
  selfTradePreventionMode: SelfTradePreventionMode;
  goodTillDate: number;
}

export interface QueryPortfolioCMOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMOrderQueryResponse {
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

export interface QueryPortfolioAllCMOrdersParams {
  symbol: string;
  pair?: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface QueryPortfolioCMOpenOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMOpenConditionalOrderResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  stopPrice?: string;
  symbol: string;
  bookTime: number;
  updateTime: number;
  timeInForce: string;
  activatePrice?: string;
  priceRate?: string;
}

export interface QueryPortfolioAllCMConditionalOrdersParams {
  symbol?: string;
  strategyId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMConditionalOrderQueryResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface QueryPortfolioCMConditionalOrderHistoryParams {
  symbol: string;
  strategyId?: number;
  newClientStrategyId?: string;
  recvWindow?: number;
  timestamp: number;
}

export interface PortfolioCMConditionalOrderHistoryResponse {
  newClientStrategyId: string;
  strategyId: number;
  strategyStatus: string;
  strategyType: PortfolioStrategyType;
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
  workingType: WorkingType;
  priceProtect: boolean;
  priceMatch: PriceMatch;
}

export interface QueryPortfolioUMForceOrdersParams {
  symbol?: string;
  autoCloseType?: AutoCloseType;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioCMForceOrdersParams {
  symbol?: string;
  autoCloseType?: AutoCloseType;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioUMOrderAmendmentParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
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
  priceMatch: PriceMatch;
}

export interface QueryPortfolioCMOrderAmendmentParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioMarginForceOrdersParams {
  startTime?: number;
  endTime?: number;
  current?: number; // Currently querying page. Start from 1. Default: 1
  size?: number; // Default: 10, Max: 100
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioUMTradesParams {
  symbol: string;
  startTime?: number;
  endTime?: number;
  fromId?: number; // Trade id to fetch from. Default gets most recent trades
  limit?: number; // Default 500; max 1000
  recvWindow?: number;
  timestamp: number;
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

export interface QueryPortfolioCMTradesParams {
  symbol?: string;
  pair?: string;
  startTime?: number;
  endTime?: number;
  fromId?: number; // Trade id to fetch from. Default gets most recent trades
  limit?: number; // Default 50; max 1000
  recvWindow?: number;
  timestamp: number;
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
