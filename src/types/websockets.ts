import { WsKey } from '../websocket-client';
import { FuturesOrderType, MarginType, PositionSide, WorkingType } from './futures';
import { KlineInterval, numberInString, OCOOrderStatus, OCOStatus, OrderBookRow, OrderBookRowFormatted, OrderExecutionType, OrderSide, OrderStatus, OrderTimeInForce, OrderType } from './shared';

export type WsMarket = 'spot' | 'margin' | 'isolatedMargin' | 'usdm' | 'usdmTestnet' | 'coinm' | 'coinmTestnet' | 'options' | 'optionsTestnet';

export type WsRawSpotUserDataEventRaw = WsMessageSpotUserDataExecutionReportEventRaw
  | WsMessageSpotOutboundAccountPositionRaw
  | WsMessageSpotBalanceUpdateRaw
  | WsMessageSpotUserDataListStatusEventRaw;

export type WsMessageSpotUserDataEventFormatted = WsMessageSpotUserDataExecutionReportEventFormatted
  | WsMessageSpotOutboundAccountPositionFormatted
  | WsMessageSpotBalanceUpdateFormatted
  | WsMessageSpotUserDataListStatusEventFormatted;

export type WsMessageFuturesUserDataEventRaw = WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw;

// TODO: consistent across USDM vs COINM?
export type WsMessageFuturesUserDataEventFormatted = WsMessageFuturesUserDataAccountUpdateFormatted
  | WsMessageFuturesUserDataListenKeyExpiredFormatted
  | WsMessageFuturesUserDataMarginCallFormatted
  | WsMessageFuturesUserDataTradeUpdateEventFormatted
  | WsMessageFuturesUserDataAccountConfigUpdateEventFormatted;

export type WsRawMessage = WsMessageKlineRaw
  | WsMessageAggTradeRaw
  | WsMessageTradeRaw
  | WsMessage24hrMiniTickerRaw
  | WsMessage24hrMiniTickerRaw[]
  | WsMessage24hrTickerRaw
  | WsMessage24hrTickerRaw[]
  | WsMessageBookTickerEventRaw
  | WsMessagePartialBookDepthEventRaw
  | WsRawSpotUserDataEventRaw;

export type WsFormattedMessage = WsMessageKlineFormatted
  | WsMessageAggTradeFormatted
  | WsMessageTradeFormatted
  | WsMessage24hrMiniTickerFormatted
  | WsMessage24hrMiniTickerFormatted[]
  | WsMessage24hrTickerFormatted
  | WsMessage24hrTickerFormatted[]
  | WsMessageBookTickerEventFormatted
  | WsMessagePartialBookDepthEventFormatted
  | WsMessageSpotUserDataEventFormatted
  | WsMessageFuturesUserDataEventFormatted;

export interface WsResponse {
  type: 'message';
  data: {
    result: boolean | string[];
    id: number;
  };
  wsKey: WsKey;
}

export interface WsMessageKlineRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageKlineFormatted {
  eventType: 'kline',
  eventTime: number,
  symbol: string,
  kline: {
    startTime: number,
    endTime: number,
    symbol: string,
    interval: KlineInterval,
    firstTradeId: number,
    lastTradeId: number,
    open: number,
    close: number,
    high: number,
    low: number,
    volume: number,
    trades: number,
    final: false,
    quoteVolume: number,
    volumeActive: number,
    quoteVolumeActive: number,
    ignored: number
  };
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageAggTradeRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageAggTradeFormatted {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageTradeRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageTradeFormatted {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessage24hrMiniTickerRaw {
  e: '24hrMiniTicker';
  E: number;
  s: string;
  c: numberInString;
  o: numberInString;
  h: numberInString;
  l: numberInString;
  v: numberInString;
  q: numberInString;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessage24hrMiniTickerFormatted {
  eventType: '24hrMiniTicker';
  eventTime: number;
  symbol: string;
  close: number;
  open: number;
  high: number;
  low: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessage24hrTickerRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessage24hrTickerFormatted {
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
  bestAsk: number;
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageBookTickerEventRaw {
  e: 'bookTicker';
  u: number;
  s: string;
  b: numberInString;
  B: numberInString;
  a: numberInString;
  A: numberInString;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageBookTickerEventFormatted {
  eventType: 'bookTicker';
  updateId: number;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessagePartialBookDepthEventRaw {
  e: 'partialBookDepth';
  lastUpdateId: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessagePartialBookDepthEventFormatted {
  eventType: 'partialBookDepth';
  lastUpdateId: number;
  bids: OrderBookRowFormatted[];
  asks: OrderBookRowFormatted[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

/**
 * USER DATA WS EVENTS
**/

interface SpotBalanceRaw {
  a: string;
  f: numberInString;
  l: numberInString;
}

export interface WsMessageSpotOutboundAccountPositionRaw {
  e: 'outboundAccountPosition';
  E: number;
  u: number;
  B: SpotBalanceRaw[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

interface SpotBalanceFormatted {
  a: string;
  f: number;
  l: number;
}

export interface WsMessageSpotOutboundAccountPositionFormatted {
  eventType: 'outboundAccountPosition';
  eventTime: number;
  lastAccountUpdateTime: number;
  balances: SpotBalanceFormatted[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageSpotBalanceUpdateRaw {
  e: 'balanceUpdate';
  E: number;
  a: string;
  d: numberInString;
  T: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageSpotBalanceUpdateFormatted {
  eventType: 'balanceUpdate';
  eventTime: number;
  asset: string;
  balanceDelta: number;
  clearTime: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageSpotUserDataExecutionReportEventRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageSpotUserDataExecutionReportEventFormatted {
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
  cumulativeQuoteAssetTransactedQty: number;
  lastQuoteAssetTransactedQty: number;
  orderQuoteQty: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface OrderObjectRaw {
  s: string;
  i: number;
  c: string;
}

export interface WsMessageSpotUserDataListStatusEventRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface OrderObjectFormatted {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface WsMessageSpotUserDataListStatusEventFormatted {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export type AccountUpdateEventType = 'DEPOSIT'
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
  balanceChange: number;// this is except for pnl and commission
  crossWalletBalance: number;
  walletBalance: number;
}

export interface WsUpdatedPosition {
  asset: string;
  positionAmount: number;
  entryPrice: number;
  accumulatedRealisedPreFee: number;
  unrealisedPnl: number;
  marginType: Lowercase<MarginType>;
  isolatedWalletAmount: number;
  positionSide: PositionSide;
}

export interface WsMessageFuturesUserDataListenKeyExpiredRaw {
  e: 'listenKeyExpired';
  E: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataListenKeyExpiredFormatted {
  eventType: 'listenKeyExpired';
  eventTime: number;
  wsMarket: WsMarket;
  wsKey: WsKey;
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


export interface WsMessageFuturesUserDataMarginCallRaw {
  e: 'MARGIN_CALL';
  E: number;
  cw: numberInString;
  p: WsMessageFuturesMarginCalledPositionRaw[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataMarginCallFormatted {
  eventType: 'MARGIN_CALL';
  eventTime: number;
  crossWalletBalance: number;
  positions: WsMessageFuturesMarginCalledPositionFormatted[];
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesAccountUpdatePositionRaw {
  s: string;
  pa: numberInString;
  ep: numberInString;
  cr: numberInString;
  up: numberInString;
  mt: Lowercase<MarginType>
  iw: numberInString;
  ps: PositionSide;
}

export interface WsMessageFuturesAccountUpdateBalanceRaw {
  a: string;
  wb: numberInString;
  cw: numberInString;
  bc: numberInString;
}

export interface WsMessageFuturesUserDataAccountUpdateRaw {
  e: 'ACCOUNT_UPDATE';
  E: number;
  T: number;
  a: {
    m: AccountUpdateEventType;
    B: WsMessageFuturesAccountUpdateBalanceRaw[];
    P: WsMessageFuturesAccountUpdatePositionRaw[];
  };
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataAccountUpdateFormatted {
  eventType: 'ACCOUNT_UPDATE';
  eventTime: number;
  transactionId: number;
  updateData: {
    updateEventType: AccountUpdateEventType;
    updatedBalances: WsAccountUpdatedBalance[];
    updatedPositions: WsUpdatedPosition[]
  };
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataOrderTradeUpdateEventRaw {
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
  };
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataTradeUpdateEventFormatted {
  eventType: 'ORDER_TRADE_UPDATE';
  eventTime: number;
  transactionTime: number;
  order: {
    symbol: string;
    clientOrderId: string;
    orderSide: OrderSide;
    orderType: FuturesOrderType;
    orderTimeInForce: OrderTimeInForce;
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
    trailingStopActivationPrice: number;
    trailingStopCallbackRate: number;
    realisedProfit: number;
  };
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataAccountConfigUpdateEventRaw {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}

export interface WsMessageFuturesUserDataAccountConfigUpdateEventFormatted {
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
  wsMarket: WsMarket;
  wsKey: WsKey;
}
