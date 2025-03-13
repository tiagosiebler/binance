import { numberInString } from '../shared';
import { OrderResponse } from '../spot';

/**
 * Error response type
 */
export interface ErrorResponse {
  code: number;
  msg: string;
}

export interface WsAPISessionStatus {
  apiKey: string;
  authorizedSince: number;
  connectedSince: number;
  returnRateLimits: boolean;
  serverTime: number;
  userDataStream: boolean;
}

/**
 * General response types
 */
export interface TimeWSAPIResponse {
  serverTime: number;
}

/**
 * Market data response types
 */
export interface DepthWSAPIResponse {
  lastUpdateId: number;
  // [price, quantity]
  bids: [numberInString, numberInString][];
  asks: [numberInString, numberInString][];
}

export interface TradeWSAPIResponse {
  id: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface AggregateTradeWSAPIResponse {
  a: number; // Aggregate trade ID
  p: numberInString; // Price
  q: numberInString; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Timestamp
  m: boolean; // Was the buyer the maker?
  M: boolean; // Was the trade the best price match?
}

export type KlineWSAPIResponse = [
  number, // Kline open time
  numberInString, // Open price
  numberInString, // High price
  numberInString, // Low price
  numberInString, // Close price
  numberInString, // Volume
  number, // Kline close time
  numberInString, // Quote asset volume
  number, // Number of trades
  numberInString, // Taker buy base asset volume
  numberInString, // Taker buy quote asset volume
  numberInString, // Unused field
];

export interface AvgPriceWSAPIResponse {
  mins: number; // Average price interval (in minutes)
  price: numberInString; // Average price
  closeTime: number; // Last trade time
}

export interface TickerFullWSAPIResponse {
  symbol: string;
  priceChange: numberInString;
  priceChangePercent: numberInString;
  weightedAvgPrice: numberInString;
  prevClosePrice: numberInString;
  lastPrice: numberInString;
  lastQty: numberInString;
  bidPrice: numberInString;
  bidQty: numberInString;
  askPrice: numberInString;
  askQty: numberInString;
  openPrice: numberInString;
  highPrice: numberInString;
  lowPrice: numberInString;
  volume: numberInString;
  quoteVolume: numberInString;
  openTime: number;
  closeTime: number;
  firstId: number; // First trade ID
  lastId: number; // Last trade ID
  count: number; // Number of trades
}

export interface TickerMiniWSAPIResponse {
  symbol: string;
  openPrice: numberInString;
  highPrice: numberInString;
  lowPrice: numberInString;
  lastPrice: numberInString;
  volume: numberInString;
  quoteVolume: numberInString;
  openTime: number;
  closeTime: number;
  firstId: number; // First trade ID
  lastId: number; // Last trade ID
  count: number; // Number of trades
}

export interface TickerPriceWSAPIResponse {
  symbol: string;
  price: numberInString;
}

export interface TickerBookWSAPIResponse {
  symbol: string;
  bidPrice: numberInString;
  bidQty: numberInString;
  askPrice: numberInString;
  askQty: numberInString;
}

/**
 * Account response types
 */
export interface AccountStatusWSAPIResponse {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  commissionRates: {
    maker: numberInString;
    taker: numberInString;
    buyer: numberInString;
    seller: numberInString;
  };
  brokered: boolean;
  requireSelfTradePrevention: boolean;
  preventSor: boolean;
  updateTime: number;
  accountType: string;
  balances: {
    asset: string;
    free: numberInString;
    locked: numberInString;
  }[];
  permissions: string[];
  uid: number;
}

export interface AccountCommissionWSAPIResponse {
  symbol: string;
  standardCommission: {
    maker: numberInString;
    taker: numberInString;
    buyer: numberInString;
    seller: numberInString;
  };
  taxCommission: {
    maker: numberInString;
    taker: numberInString;
    buyer: numberInString;
    seller: numberInString;
  };
  discount: {
    enabledForAccount: boolean;
    enabledForSymbol: boolean;
    discountAsset: string;
    discount: numberInString;
  };
}

export interface RateLimitWSAPIResponse {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
  count: number;
}

export interface OrderWSAPIResponse {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cummulativeQuoteQty: numberInString;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: numberInString;
  icebergQty: numberInString;
  time: number;
  updateTime: number;
  isWorking: boolean;
  workingTime: number;
  origQuoteOrderQty: numberInString;
  selfTradePreventionMode: string;
  preventedMatchId?: number;
  preventedQuantity?: numberInString;
}

export interface OrderListWSAPIResponse {
  orderListId: number;
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
}

export interface TradeWSAPIResponse {
  symbol: string;
  id: number;
  orderId: number;
  orderListId: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  commission: numberInString;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}

export interface PreventedMatchWSAPIResponse {
  symbol: string;
  preventedMatchId: number;
  takerOrderId: number;
  makerSymbol: string;
  makerOrderId: number;
  tradeGroupId: number;
  selfTradePreventionMode: string;
  price: numberInString;
  makerPreventedQuantity: numberInString;
  transactTime: number;
}

export interface AllocationWSAPIResponse {
  symbol: string;
  allocationId: number;
  allocationType: string;
  orderId: number;
  orderListId: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  commission: numberInString;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isAllocator: boolean;
}

/**
 * Trading response types
 */
export interface OrderTestWSAPIResponse {
  // Empty response object
  [key: string]: never;
}

export interface OrderTestWithCommissionWSAPIResponse {
  standardCommissionForOrder: {
    maker: numberInString;
    taker: numberInString;
  };
  taxCommissionForOrder: {
    maker: numberInString;
    taker: numberInString;
  };
  discount: {
    enabledForAccount: boolean;
    enabledForSymbol: boolean;
    discountAsset: string;
    discount: numberInString;
  };
}

export interface OrderCancelWSAPIResponse {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  origQuoteOrderQty: numberInString;
  cummulativeQuoteQty: numberInString;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice?: numberInString;
  trailingDelta?: number;
  trailingTime?: number;
  icebergQty?: numberInString;
  strategyId?: number;
  strategyType?: number;
  selfTradePreventionMode: string;
}

export interface OrderCancelReplaceWSAPIResponse {
  cancelResult: 'SUCCESS' | 'FAILURE' | 'NOT_ATTEMPTED';
  newOrderResult: 'SUCCESS' | 'FAILURE' | 'NOT_ATTEMPTED';
  cancelResponse: OrderCancelWSAPIResponse | ErrorResponse;
  newOrderResponse: OrderResponse | ErrorResponse | null;
}

export interface OrderListCancelWSAPIResponse {
  orderListId: number;
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
  orderReports: OrderCancelWSAPIResponse[];
}

/**
 * Order list response types
 */
export interface OrderListPlaceWSAPIResponse {
  orderListId: number;
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
  orderReports: OrderResponse[];
}

export interface OrderListStatusWSAPIResponse {
  orderListId: number;
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
}

/**
 * SOR response types
 */
export interface SOROrderPlaceWSAPIResponse {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  origQuoteOrderQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  workingTime: number;
  fills: {
    matchType: string;
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
    tradeId: number;
    allocId: number;
  }[];
  workingFloor: string;
  selfTradePreventionMode: string;
  usedSor: boolean;
}

export interface SOROrderTestWSAPIResponse {
  // Empty response object
  [key: string]: never;
}

export interface SOROrderTestWithCommissionWSAPIResponse {
  standardCommissionForOrder: {
    maker: numberInString;
    taker: numberInString;
  };
  taxCommissionForOrder: {
    maker: numberInString;
    taker: numberInString;
  };
  discount: {
    enabledForAccount: boolean;
    enabledForSymbol: boolean;
    discountAsset: string;
    discount: numberInString;
  };
}
