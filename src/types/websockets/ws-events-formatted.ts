import {
  FuturesContractType,
  FuturesOrderType,
  MarginType,
  PositionSide,
  WorkingType,
} from '../futures';
import {
  KlineInterval,
  numberInString,
  OCOOrderStatus,
  OCOStatus,
  OrderBookRowFormatted,
  OrderExecutionType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  SelfTradePreventionMode,
} from '../shared';
import { AccountUpdateEventType } from './ws-events-raw';
import { WsSharedBase } from './ws-general';

export interface WsMessageKlineFormatted extends WsSharedBase {
  eventType: 'kline' | 'indexPrice_kline';
  eventTime: number;
  symbol: string;
  kline: {
    startTime: number;
    endTime: number;
    symbol: string;
    interval: KlineInterval;
    firstTradeId: number;
    lastTradeId: number;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    trades: number;
    final: false;
    quoteVolume: number;
    volumeActive: number;
    quoteVolumeActive: number;
    ignored: number;
  };
}

export interface WsMessageContinuousKlineFormatted extends WsSharedBase {
  eventType: 'continuous_kline';
  eventTime: number;
  symbol: string;
  contractType: FuturesContractType;
  kline: {
    startTime: number;
    endTime: number;
    symbol: string;
    interval: KlineInterval;
    firstTradeId: number;
    lastTradeId: number;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    trades: number;
    final: false;
    quoteVolume: number;
    volumeActive: number;
    quoteVolumeActive: number;
    ignored: number;
  };
}

export interface WsMessageAggTradeFormatted extends WsSharedBase {
  eventType: 'aggTrade';
  eventTime: number;
  symbol: string;
  tradeId: number;
  price: number;
  quantity: number;
  firstTradeId: number;
  lastTradeId: number;
  time: number;
  maker: boolean;
  ignored: boolean;
}

export interface WsMessageTradeFormatted extends WsSharedBase {
  eventType: 'trade';
  eventTime: number;
  symbol: string;
  tradeId: number;
  price: number;
  quantity: number;
  buyerOrderId: number;
  sellerOrderId: number;
  time: number;
  maker: boolean;
  ignored: boolean;
}

export interface WsMessage24hrMiniTickerFormatted extends WsSharedBase {
  eventType: '24hrMiniTicker';
  eventTime: number;
  symbol: string;
  contractSymbol?: string; //coinm only
  close: number;
  open: number;
  high: number;
  low: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;
}

export interface WsMessage24hrTickerFormatted extends WsSharedBase {
  eventType: '24hrTicker';
  eventTime: number;
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  weightedAveragePrice: number;
  previousClose: number;
  currentClose: number;
  closeQuantity: number;
  bestBid: number;
  bestBidQuantity: number;
  bestAskPrice: number;
  bestAskQuantity: number;
  open: number;
  high: number;
  low: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;
  openTime: number;
  closeTime: number;
  firstTradeId: number;
  lastTradeId: number;
  trades: number;
}

export interface WsMessageRollingWindowTickerFormatted extends WsSharedBase {
  eventType: '1hTicker' | '4hTicker' | '1dTicker';
  eventTime: number;
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  weightedAveragePrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  totalTradedBaseAssetVolume: number;
  totalTradedQuoteAssetVolume: number;
  statisticsOpenTime: number;
  statisticsCloseTime: number;
  firstTradeId: number;
  lastTradeId: number;
  totalTrades: number;
}

export interface WsMessageBookTickerEventFormatted extends WsSharedBase {
  eventType: 'bookTicker';
  updateId: number;
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}

export interface WsMessagePartialBookDepthEventFormatted extends WsSharedBase {
  eventType: 'partialBookDepth';
  lastUpdateId: number;
  bids: OrderBookRowFormatted[];
  asks: OrderBookRowFormatted[];
}

/**
 * USER DATA WS EVENTS
 **/

interface SpotBalanceFormatted {
  asset: string;
  availableBalance: number;
  onOrderBalance: number;
}

export interface WsMessageSpotOutboundAccountPositionFormatted
  extends WsSharedBase {
  eventType: 'outboundAccountPosition';
  eventTime: number;
  lastAccountUpdateTime: number;
  balances: SpotBalanceFormatted[];
}

export interface WsMessageSpotBalanceUpdateFormatted extends WsSharedBase {
  eventType: 'balanceUpdate';
  eventTime: number;
  asset: string;
  balanceDelta: number;
  clearTime: number;
}

export interface WsMessageSpotUserDataExecutionReportEventFormatted
  extends WsSharedBase {
  eventType: 'executionReport';
  eventTime: number;
  symbol: string;
  newClientOrderId: string;
  side: OrderSide;
  orderType: OrderType;
  cancelType: OrderTimeInForce;
  quantity: number;
  price: number;
  stopPrice: number;
  icebergQuantity: number;
  orderListId: number;
  originalClientOrderId: string;
  executionType: OrderExecutionType;
  orderStatus: OrderStatus;
  rejectReason: string;
  orderId: number;
  lastTradeQuantity: number;
  accumulatedQuantity: number;
  lastTradePrice: number;
  commission: number;
  commissionAsset: string | null;
  tradeTime: number;
  tradeId: number;
  ignoreThis1: number;
  isOrderOnBook: false;
  isMaker: false;
  ignoreThis2: true;
  orderCreationTime: number;
  cummulativeQuoteAssetTransactedQty: number;
  lastQuoteAssetTransactedQty: number;
  orderQuoteQty: number;
  workingTime: number;
  selfTradePreventionMode: SelfTradePreventionMode;
}

export interface OrderObjectFormatted {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface WsMessageSpotUserDataListStatusEventFormatted
  extends WsSharedBase {
  eventType: 'listStatus';
  eventTime: number;
  symbol: string;
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: OCOStatus;
  listOrderStatus: OCOOrderStatus;
  listRejectReason: string;
  listClientOrderId: string;
  transactionTime: number;
  orders: OrderObjectFormatted[];
}

export interface WsAccountUpdatedBalance {
  asset: string;
  balanceChange: number; // this is except for pnl and commission
  crossWalletBalance: number;
  walletBalance: number;
}

export interface WsUpdatedPosition {
  symbol: string;
  marginAsset: string;
  positionAmount: number;
  entryPrice: number;
  accumulatedRealisedPreFee: number;
  unrealisedPnl: number;
  marginType: 'cross' | 'isolated';
  isolatedWalletAmount: number;
  positionSide: PositionSide;
}

export interface WsMessageFuturesUserDataListenKeyExpiredFormatted
  extends WsSharedBase {
  eventType: 'listenKeyExpired';
  eventTime: number;
}

export interface WsMessageFuturesMarginCalledPositionFormatted {
  symbol: string;
  positionSide: PositionSide;
  positionAmount: number;
  marginType: Uppercase<MarginType>;
  isolatedWalletAmount: number;
  markPrice: number;
  unrealisedPnl: number;
  maintenanceMarginRequired: number;
}

export interface WsMessageFuturesUserDataMarginCallFormatted
  extends WsSharedBase {
  eventType: 'MARGIN_CALL';
  eventTime: number;
  crossWalletBalance: number;
  positions: WsMessageFuturesMarginCalledPositionFormatted[];
}

export interface WsMessageFuturesUserDataAccountUpdateFormatted
  extends WsSharedBase {
  eventType: 'ACCOUNT_UPDATE';
  eventTime: number;
  transactionTime: number;
  updateData: {
    updateEventType: AccountUpdateEventType;
    updatedBalances: WsAccountUpdatedBalance[];
    updatedPositions: WsUpdatedPosition[];
  };
}

export interface WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted
  extends WsSharedBase {
  eventType: 'CONDITIONAL_ORDER_TRIGGER_REJECT';
  eventTime: number;
  transactionTime: number;
  order: {
    symbol: string;
    orderId: number;
    reason: string;
  };
}

export interface WsMessageFuturesUserDataTradeLiteEventFormatted
  extends WsSharedBase {
  eventType: 'TRADE_LITE';
  eventTime: number;
  transactionTime: number;
  symbol: string;
  originalQuantity: number;
  originalPrice: number;
  isMakerSide: boolean;
  clientOrderId: string;
  side: 'BUY' | 'SELL';
  lastFilledPrice: number;
  lastFilledQuantity: number;
  tradeId: number;
  orderId: number;
}

export interface WsMessageFuturesUserDataTradeUpdateEventFormatted
  extends WsSharedBase {
  eventType: 'ORDER_TRADE_UPDATE';
  eventTime: number;
  transactionTime: number;
  order: {
    symbol: string;
    clientOrderId: string;
    orderSide: OrderSide;
    orderType: FuturesOrderType;
    timeInForce: OrderTimeInForce;
    originalQuantity: number;
    originalPrice: number;
    averagePrice: number;
    stopPrice: number;
    executionType: OrderExecutionType;
    orderStatus: OrderStatus;
    orderId: number;
    lastFilledQuantity: number;
    orderFilledAccumulatedQuantity: number;
    lastFilledPrice: number;
    commissionAsset: string;
    commissionAmount: number;
    orderTradeTime: number;
    tradeId: number;
    bidsNotional: number;
    asksNotional: number;
    isMakerTrade: boolean;
    isReduceOnly: boolean;
    stopPriceWorkingType: WorkingType;
    originalOrderType: FuturesOrderType;
    positionSide: PositionSide;
    isCloseAll: boolean;
    realisedProfit: number;
    trailingStopActivationPrice?: number;
    trailingStopCallbackRate?: number;
    pP?: boolean; // ignore
    si?: number; // ignore
    ss?: number; // ignore
  };
}

export interface WsMessageFuturesUserDataAccountConfigUpdateEventFormatted
  extends WsSharedBase {
  eventType: 'ACCOUNT_CONFIG_UPDATE';
  eventTime: number;
  transactionTime: number;
  assetConfiguration?: {
    symbol: string;
    leverage: number;
  };
  accountConfiguration?: {
    isMultiAssetsMode: boolean;
  };
}

export interface WsMessageIndexPriceUpdateEventFormatted extends WsSharedBase {
  eventType: 'indexPriceUpdate';
  eventTime: number;
  symbol: string;
  indexPrice: number;
}

export interface WsMessageMarkPriceUpdateEventFormatted extends WsSharedBase {
  eventType: 'markPriceUpdate';
  eventTime: number;
  symbol: string;
  markPrice: number;
  settlePriceEstimate: number;
  indexPrice?: number; // undefined for coinm
  /** Note this is in decimal format (e.g. 0.0004 === 0.04%). Multiply by 100 to get funding rate percent value */
  fundingRate: number | '';
  nextFundingTime: number;
}

export interface WsLiquidationOrderFormatted {
  symbol: string;
  side: OrderSide;
  orderType: FuturesOrderType;
  timeInForce: OrderTimeInForce;
  quantity: number;
  price: number;
  averagePrice: number;
  orderStatus: OrderStatus;
  lastFilledQuantity: number;
  orderFilledAccumulatedQuantity: number;
  orderTradeTime: number;
}

export interface WsMessageForceOrderFormatted extends WsSharedBase {
  eventType: 'forceOrder';
  eventTime: number;
  liquidationOrder: WsLiquidationOrderFormatted;
}

export interface WsMessageFuturesUserDataStrategyUpdateFormatted
  extends WsSharedBase {
  eventType: 'STRATEGY_UPDATE';
  transactionTime: number;
  eventTime: number;
  strategy: {
    strategyId: number;
    strategyType: string;
    strategyStatus: string;
    symbol: string;
    updateTime: number;
    opCode: number;
  };
}

export interface WsMessageFuturesUserDataGridUpdateFormatted
  extends WsSharedBase {
  eventType: 'GRID_UPDATE';
  transactionTime: number;
  eventTime: number;
  grid: {
    strategyId: number;
    strategyType: string;
    strategyStatus: string;
    symbol: string;
    realizedPnl: numberInString;
    unmatchedAveragePrice: numberInString;
    unmatchedQuantity: numberInString;
    unmatchedFee: numberInString;
    matchedPnl: numberInString;
    updateTime: number;
  };
}

export interface WsMessageFuturesUserDataContractInfoFormatted
  extends WsSharedBase {
  eventType: 'contractInfo';
  eventTime: number;
  symbol: string;
  pair: string;
  contractType: string;
  deliveryDateTime: number;
  onboardDateTime: number;
  contractStatus: string;
  notionalBrackets: {
    notionalBracket: number;
    floorNotional: number;
    capNotional: number;
    maintenanceRatio: number;
    auxiliaryNumber: number;
    minLeverage: number;
    maxLeverage: number;
  }[];
}

export type WsMessageSpotUserDataEventFormatted =
  | WsMessageSpotUserDataExecutionReportEventFormatted
  | WsMessageSpotOutboundAccountPositionFormatted
  | WsMessageSpotBalanceUpdateFormatted
  | WsMessageSpotUserDataListStatusEventFormatted;

// TODO: consistent across USDM vs COINM?
export type WsMessageFuturesUserDataEventFormatted =
  | WsMessageFuturesUserDataAccountUpdateFormatted
  | WsMessageFuturesUserDataListenKeyExpiredFormatted
  | WsMessageFuturesUserDataMarginCallFormatted
  | WsMessageFuturesUserDataTradeUpdateEventFormatted
  | WsMessageFuturesUserDataAccountConfigUpdateEventFormatted
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted
  | WsMessageFuturesUserDataTradeLiteEventFormatted
  | WsMessageFuturesUserDataStrategyUpdateFormatted
  | WsMessageFuturesUserDataGridUpdateFormatted
  | WsMessageFuturesUserDataContractInfoFormatted;

export type WsUserDataEvents =
  | WsMessageSpotUserDataEventFormatted
  | WsMessageFuturesUserDataEventFormatted;

export type WsFormattedMessage =
  | WsUserDataEvents
  | WsMessageKlineFormatted
  | WsMessageAggTradeFormatted
  | WsMessageTradeFormatted
  | WsMessage24hrMiniTickerFormatted
  | WsMessage24hrTickerFormatted
  | WsMessageBookTickerEventFormatted
  | WsMessagePartialBookDepthEventFormatted
  | WsMessageIndexPriceUpdateEventFormatted
  | WsMessageMarkPriceUpdateEventFormatted
  | WsMessageForceOrderFormatted
  | WsMessage24hrMiniTickerFormatted[]
  | WsMessage24hrTickerFormatted[]
  | WsMessageRollingWindowTickerFormatted[]
  | WsMessageMarkPriceUpdateEventFormatted[];
