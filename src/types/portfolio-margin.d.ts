export type PMStrategyType = 'STOP' | 'STOP_MARKET' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET' | 'TRAILING_STOP_MARKET';
export type PMWorkingType = 'MARK_PRICE' | 'CONTRACT_PRICE';
export type PMPriceMatch = 'NONE' | 'OPPONENT' | 'OPPONENT_5' | 'OPPONENT_10' | 'OPPONENT_20' | 'QUEUE' | 'QUEUE_5' | 'QUEUE_10' | 'QUEUE_20';
export type PMSelfTradePreventionMode = 'NONE' | 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH';
export type PMMarginOrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT';
export type PMMarginSideEffectType = 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY' | 'AUTO_BORROW_REPAY';
export type PMAutoCloseType = 'LIQUIDATION' | 'ADL';
export interface NewPortfolioUMOrderReq {
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
    priceMatch?: PMPriceMatch;
    selfTradePreventionMode?: PMSelfTradePreventionMode;
    goodTillDate?: number;
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
export type PortfolioMarginCancelAllOrdersResponse = PortfolioMarginCancelAllOrdersOrderReport | PortfolioMarginCancelAllOrdersOCOReport;
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
export interface PortfolioCMConditionalHistoryOrder extends PortfolioCMConditionalOrder {
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
    current?: number;
    size?: number;
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
    fromId?: number;
    limit?: number;
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
    fromId?: number;
    limit?: number;
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
    BOTH?: number;
    HEDGE?: number;
}
export interface QueryPortfolioMarginOrderReq {
    symbol: string;
    orderId?: number;
    origClientOrderId?: string;
    recvWindow?: number;
    timestamp: number;
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
    limit?: number;
    recvWindow?: number;
    timestamp: number;
}
export interface QueryPortfolioMarginOCOReq {
    orderListId?: number;
    origClientOrderId?: string;
    recvWindow?: number;
    timestamp: number;
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
    fromId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface QueryPortfolioMarginTradesReq {
    symbol: string;
    orderId?: number;
    startTime?: number;
    endTime?: number;
    fromId?: number;
    limit?: number;
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
    specifyRepayAssets?: string;
}
export interface PortfolioMarginRepayDebtResponse {
    amount: string;
    asset: string;
    specifyRepayAssets: string[];
    updateTime: number;
    success: boolean;
}
export type PMAccountStatus = 'NORMAL' | 'MARGIN_CALL' | 'SUPPLY_MARGIN' | 'REDUCE_ONLY' | 'ACTIVE_LIQUIDATION' | 'FORCE_LIQUIDATION' | 'BANKRUPTED';
export type PMIndicatorType = 'UFR' | 'IFER' | 'GCR' | 'DR' | 'TMV';
export type PMMarginLoanStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';
export interface PortfolioTotalBalance {
    asset: string;
    totalWalletBalance: string;
    crossMarginAsset: string;
    crossMarginBorrowed: string;
    crossMarginFree: string;
    crossMarginInterest: string;
    crossMarginLocked: string;
    umWalletBalance: string;
    umUnrealizedPNL: string;
    cmWalletBalance: string;
    cmUnrealizedPNL: string;
    updateTime: number;
    negativeBalance: string;
}
export interface PortfolioSingleBalance {
    asset: string;
    totalWalletBalance: string;
    crossMarginBorrowed: string;
    crossMarginFree: string;
    crossMarginInterest: string;
    crossMarginLocked: string;
    umWalletBalance: string;
    umUnrealizedPNL: string;
    cmWalletBalance: string;
    cmUnrealizedPNL: string;
    updateTime: number;
    negativeBalance: string;
}
export type PortfolioBalance = PortfolioBalance[] | PortfolioSingleBalance;
export interface PortfolioAccountInformation {
    uniMMR: string;
    accountEquity: string;
    actualEquity: string;
    accountInitialMargin: string;
    accountMaintMargin: string;
    accountStatus: PMAccountStatus;
    virtualMaxWithdrawAmount: string;
    totalAvailableBalance: string;
    totalMarginOpenLoss: string;
    updateTime: number;
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
    bracket: number;
    initialLeverage: number;
    notionalCap: number;
    notionalFloor: number;
    maintMarginRatio: number;
    cum: number;
}
export interface PortfolioCMLeverageBracket {
    bracket: number;
    initialLeverage: number;
    qtyCap: number;
    qtyFloor: number;
    maintMarginRatio: number;
    cum: number;
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
        [key: string]: PortfolioTradingIndicator[];
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
    current?: number;
    size?: number;
    archived?: boolean;
}
export interface GetMarginRepayRecordsReq {
    asset: string;
    txId?: number;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    archived?: boolean;
}
export interface PortfolioMarginRepayRecord {
    amount: string;
    asset: string;
    interest: string;
    principal: string;
    status: PMMarginLoanStatus;
    txId: number;
}
export interface GetMarginInterestHistoryReq {
    asset?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    archived?: boolean;
}
export type PMInterestType = 'PERIODIC' | 'ON_BORROW' | 'PERIODIC_CONVERTED' | 'ON_BORROW_CONVERTED' | 'PORTFOLIO';
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
    size?: number;
    recvWindow?: number;
}
export interface PortfolioNegativeBalanceInterestRecord {
    asset: string;
    interest: string;
    interestAccuredTime: number;
    interestRate: string;
    principal: string;
}
export type UMIncomeType = 'TRANSFER' | 'WELCOME_BONUS' | 'REALIZED_PNL' | 'FUNDING_FEE' | 'COMMISSION' | 'INSURANCE_CLEAR' | 'REFERRAL_KICKBACK' | 'COMMISSION_REBATE' | 'API_REBATE' | 'CONTEST_REWARD' | 'CROSS_COLLATERAL_TRANSFER' | 'OPTIONS_PREMIUM_FEE' | 'OPTIONS_SETTLE_PROFIT' | 'INTERNAL_TRANSFER' | 'AUTO_EXCHANGE' | 'DELIVERED_SETTELMENT' | 'COIN_SWAP_DEPOSIT' | 'COIN_SWAP_WITHDRAW' | 'POSITION_LIMIT_INCREASE_FEE';
export interface QueryPortfolioUMIncomeReq {
    symbol?: string;
    incomeType?: UMIncomeType;
    startTime?: number;
    endTime?: number;
    page?: number;
    limit?: number;
    recvWindow?: number;
}
export interface PortfolioUMIncome {
    symbol: string;
    incomeType: UMIncomeType;
    income: string;
    asset: string;
    info: string;
    time: number;
    tranId: string;
    tradeId: string;
}
export type CMIncomeType = 'TRANSFER' | 'WELCOME_BONUS' | 'FUNDING_FEE' | 'REALIZED_PNL' | 'COMMISSION' | 'INSURANCE_CLEAR' | 'DELIVERED_SETTELMENT';
export interface QueryPortfolioCMIncomeReq {
    symbol?: string;
    incomeType?: CMIncomeType;
    startTime?: number;
    endTime?: number;
    page?: number;
    limit?: number;
    recvWindow?: number;
}
export interface PortfolioCMIncome {
    symbol: string;
    incomeType: CMIncomeType;
    income: string;
    asset: string;
    info: string;
    time: number;
    tranId: string;
    tradeId: string;
}
export interface PortfolioUMAccountAsset {
    asset: string;
    crossWalletBalance: string;
    crossUnPnl: string;
    maintMargin: string;
    initialMargin: string;
    positionInitialMargin: string;
    openOrderInitialMargin: string;
    updateTime: number;
}
export interface PortfolioUMAccountPosition {
    symbol: string;
    initialMargin: string;
    maintMargin: string;
    unrealizedProfit: string;
    positionInitialMargin: string;
    openOrderInitialMargin: string;
    leverage: string;
    entryPrice: string;
    maxNotional: string;
    bidNotional: string;
    askNotional: string;
    positionSide: 'BOTH' | 'LONG' | 'SHORT';
    positionAmt: string;
    updateTime: number;
}
export interface PortfolioCMAccountAsset {
    asset: string;
    crossWalletBalance: string;
    crossUnPnl: string;
    maintMargin: string;
    initialMargin: string;
    positionInitialMargin: string;
    openOrderInitialMargin: string;
    updateTime: number;
}
export interface PortfolioCMAccountPosition {
    symbol: string;
    positionAmt: string;
    initialMargin: string;
    maintMargin: string;
    unrealizedProfit: string;
    positionInitialMargin: string;
    openOrderInitialMargin: string;
    leverage: string;
    positionSide: 'BOTH' | 'LONG' | 'SHORT';
    entryPrice: string;
    maxQty: string;
    updateTime: number;
}
export interface PortfolioUMAccountConfig {
    feeTier: number;
    canTrade: boolean;
    canDeposit: boolean;
    canWithdraw: boolean;
    dualSidePosition: boolean;
    updateTime: number;
    multiAssetsMargin: boolean;
    tradeGroupId: number;
}
export interface PortfolioUMSymbolConfig {
    symbol: string;
    marginType: 'CROSSED' | 'ISOLATED';
    isAutoAddMargin: string;
    leverage: number;
    maxNotionalValue: string;
}
export interface PortfolioUMAccountAssetV2 {
    asset: string;
    crossWalletBalance: string;
    crossUnPnl: string;
    maintMargin: string;
    initialMargin: string;
    positionInitialMargin: string;
    openOrderInitialMargin: string;
    updateTime: number;
}
export interface PortfolioUMAccountPositionV2 {
    symbol: string;
    initialMargin: string;
    maintMargin: string;
    unrealizedProfit: string;
    positionSide: 'BOTH' | 'LONG' | 'SHORT';
    positionAmt: string;
    updateTime: number;
    notional: string;
}
export interface DownloadLinkResponse {
    downloadId: string;
    status: 'completed' | 'processing';
    url: string;
    s3Link: string | null;
    notified: boolean;
    expirationTimestamp: number;
    isExpired: boolean | null;
}
