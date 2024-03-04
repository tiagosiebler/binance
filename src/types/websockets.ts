import { WsKey } from '../websocket-client';
import {
  FuturesContractType,
  FuturesOrderType,
  MarginType,
  PositionSide,
  WorkingType,
} from './futures';
import {
  KlineInterval,
  numberInString,
  OCOOrderStatus,
  OCOStatus,
  OrderBookRow,
  OrderBookRowFormatted,
  OrderExecutionType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
} from './shared';

export type WsMarket =
  | 'spot'
  | 'margin'
  | 'isolatedMargin'
  | 'usdm'
  | 'usdmTestnet'
  | 'coinm'
  | 'coinmTestnet'
  | 'options'
  | 'optionsTestnet';

export type WsRawSpotUserDataEventRaw =
  | WsMessageSpotUserDataExecutionReportEventRaw
  | WsMessageSpotOutboundAccountPositionRaw
  | WsMessageSpotBalanceUpdateRaw
  | WsMessageSpotUserDataListStatusEventRaw;

export type WsMessageSpotUserDataEventFormatted =
  | WsMessageSpotUserDataExecutionReportEventFormatted
  | WsMessageSpotOutboundAccountPositionFormatted
  | WsMessageSpotBalanceUpdateFormatted
  | WsMessageSpotUserDataListStatusEventFormatted;

export type WsMessageFuturesUserDataEventRaw =
  | WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw;

// TODO: consistent across USDM vs COINM?
export type WsMessageFuturesUserDataEventFormatted =
  | WsMessageFuturesUserDataAccountUpdateFormatted
  | WsMessageFuturesUserDataListenKeyExpiredFormatted
  | WsMessageFuturesUserDataMarginCallFormatted
  | WsMessageFuturesUserDataTradeUpdateEventFormatted
  | WsMessageFuturesUserDataAccountConfigUpdateEventFormatted
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted;

export type WsRawMessage =
  | WsMessageKlineRaw
  | WsMessageAggTradeRaw
  | WsMessageTradeRaw
  | WsMessage24hrMiniTickerRaw
  | WsMessage24hrMiniTickerRaw[]
  | WsMessage24hrTickerRaw
  | WsMessage24hrTickerRaw[]
  | WsMessageRollingWindowTickerRaw[]
  | WsMessageBookTickerEventRaw
  | WsMessagePartialBookDepthEventRaw
  | WsMessageForceOrderRaw
  | WsRawSpotUserDataEventRaw
  | WsMessageIndexPriceUpdateEventRaw
  | WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw;

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

export type WsUserDataEvents =
  | WsMessageSpotUserDataEventFormatted
  | WsMessageFuturesUserDataEventFormatted;

interface WsSharedBase {
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsResponse {
  type: 'message';
  data: {
    result: boolean | string[];
    id: number;
  };
  wsKey: WsKey;
}

export interface WsMessageKlineRaw extends WsSharedBase {
  e: 'kline';
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: KlineInterval;
    f: number;
    L: number;
    o: numberInString;
    c: numberInString;
    h: numberInString;
    l: numberInString;
    v: numberInString;
    n: number;
    x: boolean;
    q: numberInString;
    V: numberInString;
    Q: numberInString;
    B: numberInString;
  };
}

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

export interface WsMessageAggTradeRaw extends WsSharedBase {
  e: 'aggTrade';
  E: number;
  s: string;
  a: number;
  p: numberInString;
  q: numberInString;
  f: number;
  l: number;
  T: number;
  m: boolean;
  M: boolean;
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

export interface WsMessageTradeRaw extends WsSharedBase {
  e: 'trade';
  E: number;
  s: string;
  t: number;
  p: numberInString;
  q: numberInString;
  b: number;
  a: number;
  T: number;
  m: boolean;
  M: boolean;
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

export interface WsMessage24hrMiniTickerRaw extends WsSharedBase {
  e: '24hrMiniTicker';
  E: number;
  s: string;
  c: numberInString;
  o: numberInString;
  h: numberInString;
  l: numberInString;
  v: numberInString;
  q: numberInString;
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

export interface WsMessage24hrTickerRaw extends WsSharedBase {
  e: '24hrTicker';
  E: number;
  s: string;
  p: numberInString;
  P: numberInString;
  w: numberInString;
  x: numberInString;
  c: numberInString;
  Q: numberInString;
  b: numberInString;
  B: numberInString;
  a: numberInString;
  A: numberInString;
  o: numberInString;
  h: numberInString;
  l: numberInString;
  v: numberInString;
  q: numberInString;
  O: numberInString;
  C: numberInString;
  F: number;
  L: number;
  n: number;
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

export interface WsMessageRollingWindowTickerRaw extends WsSharedBase {
  e: '1hTicker' | '4hTicker' | '1dTicker';
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  o: string;
  h: string;
  l: string;
  c: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
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

export interface WsMessageBookTickerEventRaw extends WsSharedBase {
  e: 'bookTicker';
  u: number;
  s: string;
  b: numberInString;
  B: numberInString;
  a: numberInString;
  A: numberInString;
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

export interface WsMessagePartialBookDepthEventRaw extends WsSharedBase {
  e: 'partialBookDepth';
  lastUpdateId: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
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

interface SpotBalanceRaw {
  a: string;
  f: numberInString;
  l: numberInString;
}

export interface WsMessageSpotOutboundAccountPositionRaw extends WsSharedBase {
  e: 'outboundAccountPosition';
  E: number;
  u: number;
  B: SpotBalanceRaw[];
}

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

export interface WsMessageSpotBalanceUpdateRaw extends WsSharedBase {
  e: 'balanceUpdate';
  E: number;
  a: string;
  d: numberInString;
  T: number;
}

export interface WsMessageSpotBalanceUpdateFormatted extends WsSharedBase {
  eventType: 'balanceUpdate';
  eventTime: number;
  asset: string;
  balanceDelta: number;
  clearTime: number;
}

export interface WsMessageSpotUserDataExecutionReportEventRaw
  extends WsSharedBase {
  e: 'executionReport';
  E: number;
  s: string;
  c: string;
  S: OrderSide;
  o: OrderType;
  f: OrderTimeInForce;
  q: numberInString;
  p: numberInString;
  P: numberInString;
  F: numberInString;
  g: number;
  C: string;
  x: OrderExecutionType;
  X: OrderStatus;
  r: string;
  i: number;
  l: numberInString;
  z: numberInString;
  L: numberInString;
  n: numberInString;
  N: string | null;
  T: number;
  t: number;
  I: number;
  w: boolean;
  m: boolean;
  M: boolean;
  O: number;
  Z: numberInString;
  Y: numberInString;
  Q: numberInString;
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
}

export interface OrderObjectRaw {
  s: string;
  i: number;
  c: string;
}

export interface WsMessageSpotUserDataListStatusEventRaw extends WsSharedBase {
  e: 'listStatus';
  E: number;
  s: string;
  g: number;
  c: 'OCO';
  l: OCOStatus;
  L: OCOOrderStatus;
  r: string;
  C: string;
  T: number;
  O: OrderObjectRaw[];
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

export type AccountUpdateEventType =
  | 'DEPOSIT'
  | 'WITHDRAW'
  | 'ORDER'
  | 'FUNDING_FEE'
  | 'WITHDRAW_REJECT'
  | 'ADJUSTMENT'
  | 'INSURANCE_CLEAR'
  | 'ADMIN_DEPOSIT'
  | 'ADMIN_WITHDRAW'
  | 'MARGIN_TRANSFER'
  | 'MARGIN_TYPE_CHANGE'
  | 'ASSET_TRANSFER'
  | 'OPTIONS_PREMIUM_FEE'
  | 'OPTIONS_SETTLE_PROFIT'
  | 'AUTO_EXCHANGE';

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

export interface WsMessageFuturesUserDataListenKeyExpiredRaw
  extends WsSharedBase {
  e: 'listenKeyExpired';
  E: number;
}

export interface WsMessageFuturesUserDataListenKeyExpiredFormatted
  extends WsSharedBase {
  eventType: 'listenKeyExpired';
  eventTime: number;
}

export interface WsMessageFuturesMarginCalledPositionRaw {
  s: string;
  ps: PositionSide;
  pa: numberInString;
  mt: Uppercase<MarginType>;
  iw: numberInString;
  mp: numberInString;
  up: numberInString;
  mm: numberInString;
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

export interface WsMessageFuturesUserDataMarginCallRaw extends WsSharedBase {
  e: 'MARGIN_CALL';
  E: number;
  cw: numberInString;
  p: WsMessageFuturesMarginCalledPositionRaw[];
}

export interface WsMessageFuturesUserDataMarginCallFormatted
  extends WsSharedBase {
  eventType: 'MARGIN_CALL';
  eventTime: number;
  crossWalletBalance: number;
  positions: WsMessageFuturesMarginCalledPositionFormatted[];
}

export interface WsMessageFuturesAccountUpdatePositionRaw {
  s: string;
  pa: numberInString;
  ep: numberInString;
  cr: numberInString;
  up: numberInString;
  mt: 'cross' | 'isolated';
  iw: numberInString;
  ps: PositionSide;
}

export interface WsMessageFuturesAccountUpdateBalanceRaw {
  a: string;
  wb: numberInString;
  cw: numberInString;
  bc: numberInString;
}

export interface WsMessageFuturesUserDataAccountUpdateRaw extends WsSharedBase {
  e: 'ACCOUNT_UPDATE';
  E: number;
  T: number;
  a: {
    m: AccountUpdateEventType;
    B: WsMessageFuturesAccountUpdateBalanceRaw[];
    P: WsMessageFuturesAccountUpdatePositionRaw[];
  };
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

export interface WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw
  extends WsSharedBase {
  e: 'CONDITIONAL_ORDER_TRIGGER_REJECT';
  E: number;
  T: number;
  or: {
    s: string;
    i: number;
    r: string;
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

export interface WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  extends WsSharedBase {
  e: 'ORDER_TRADE_UPDATE';
  E: number;
  T: number;
  o: {
    s: string;
    c: string;
    S: OrderSide;
    o: FuturesOrderType;
    f: OrderTimeInForce;
    q: numberInString;
    p: numberInString;
    ap: numberInString;
    sp: numberInString;
    x: OrderExecutionType;
    X: OrderStatus;
    i: number;
    l: numberInString;
    z: numberInString;
    L: numberInString;
    N: string;
    n: numberInString;
    T: numberInString;
    t: number;
    b: numberInString;
    a: numberInString;
    m: boolean;
    R: boolean;
    wt: WorkingType;
    ot: FuturesOrderType;
    ps: PositionSide;
    cp: boolean;
    AP: numberInString;
    cr: numberInString;
    rp: numberInString;
    pP: boolean; // ignore
    si: numberInString; // ignore
    ss: numberInString; // ignore
  };
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

export interface WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  extends WsSharedBase {
  e: 'ACCOUNT_CONFIG_UPDATE';
  E: number;
  T: number;
  ac?: {
    s: string;
    l: number;
  };
  ai?: {
    j: boolean;
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

export interface WsMessageIndexPriceUpdateEventRaw extends WsSharedBase {
  e: 'indexPriceUpdate';
  E: number;
  i: string;
  p: numberInString;
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

export interface WsMessageForceOrderRaw extends WsSharedBase {
  e: 'forceOrder';
  E: number;
  o: {
    s: string;
    S: string;
    o: string;
    f: string;
    q: string;
    p: string;
    ap: string;
    X: string;
    l: string;
    z: string;
    T: number;
  };
}
