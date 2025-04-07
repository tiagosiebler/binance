import {
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
  OrderBookRow,
  OrderExecutionType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  SelfTradePreventionMode,
} from '../shared';
import { WsSharedBase } from './ws-general';

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

export interface WsMessageBookTickerEventRaw extends WsSharedBase {
  e: 'bookTicker';
  u: number;
  s: string;
  b: numberInString;
  B: numberInString;
  a: numberInString;
  A: numberInString;
}

export interface WsMessagePartialBookDepthEventRaw extends WsSharedBase {
  e: 'partialBookDepth';
  lastUpdateId: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
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

export interface WsMessageSpotBalanceUpdateRaw extends WsSharedBase {
  e: 'balanceUpdate';
  E: number;
  a: string;
  d: numberInString;
  T: number;
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
  W: number;
  V: SelfTradePreventionMode;
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

export interface WsMessageFuturesUserDataListenKeyExpiredRaw
  extends WsSharedBase {
  e: 'listenKeyExpired';
  E: number;
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

export interface WsMessageFuturesUserDataMarginCallRaw extends WsSharedBase {
  e: 'MARGIN_CALL';
  E: number;
  cw: numberInString;
  p: WsMessageFuturesMarginCalledPositionRaw[];
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
    V: string;
    pm: string;
    gtd: number;
  };
}
export interface WsMessageFuturesUserDataTradeLiteEventRaw
  extends WsSharedBase {
  e: 'TRADE_LITE'; // Event Type
  E: number; // Event Time
  T: number; // Transaction Time
  s: string; // Symbol
  q: string; // Original Quantity
  p: string; // Original Price
  m: boolean; // Is this trade the maker side?
  c: string; // Client Order Id
  S: 'BUY' | 'SELL'; // Side
  L: string; // Last Filled Price
  l: string; // Order Last Filled Quantity
  t: number; // Trade Id
  i: number; // Order Id
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

export interface WsMessageIndexPriceUpdateEventRaw extends WsSharedBase {
  e: 'indexPriceUpdate';
  E: number;
  i: string;
  p: numberInString;
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

export interface WsMessageFuturesUserDataStrategyUpdateRaw
  extends WsSharedBase {
  e: 'STRATEGY_UPDATE'; // Event Type
  T: number; // Transaction Time
  E: number; // Event Time
  su: {
    si: number; // Strategy ID
    st: string; // Strategy Type
    ss: string; // Strategy Status
    s: string; // Symbol
    ut: number; // Update Time
    c: number; // opCode
  };
}

export interface WsMessageFuturesUserDataGridUpdateRaw extends WsSharedBase {
  e: 'GRID_UPDATE'; // Event Type
  T: number; // Transaction Time
  E: number; // Event Time
  gu: {
    si: number; // Strategy ID
    st: string; // Strategy Type
    ss: string; // Strategy Status
    s: string; // Symbol
    r: numberInString; // Realized PNL
    up: numberInString; // Unmatched Average Price
    uq: numberInString; // Unmatched Qty
    uf: numberInString; // Unmatched Fee
    mp: numberInString; // Matched PNL
    ut: number; // Update Time
  };
}

export interface WsMessageFuturesUserDataContractInfoRaw extends WsSharedBase {
  e: 'contractInfo'; // Event Type
  E: number; // Event Time
  s: string; // Symbol
  ps: string; // Pair
  ct: string; // Contract type
  dt: number; // Delivery date time
  ot: number; // onboard date time
  cs: string; // Contract status
  bks: {
    bs: number; // Notional bracket
    bnf: number; // Floor notional of this bracket
    bnc: number; // Cap notional of this bracket
    mmr: number; // Maintenance ratio for this bracket
    cf: number; // Auxiliary number for quick calculation
    mi: number; // Min leverage for this bracket
    ma: number; // Max leverage for this bracket
  }[];
}

export type WsRawSpotUserDataEventRaw =
  | WsMessageSpotUserDataExecutionReportEventRaw
  | WsMessageSpotOutboundAccountPositionRaw
  | WsMessageSpotBalanceUpdateRaw
  | WsMessageSpotUserDataListStatusEventRaw;

export type WsMessageFuturesUserDataEventRaw =
  | WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw
  | WsMessageFuturesUserDataTradeLiteEventRaw
  | WsMessageFuturesUserDataStrategyUpdateRaw
  | WsMessageFuturesUserDataGridUpdateRaw
  | WsMessageFuturesUserDataContractInfoRaw;

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
