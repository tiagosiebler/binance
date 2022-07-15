import {
  BooleanString,
  BooleanStringCapitalised,
  ExchangeFilter,
  KlineInterval,
  numberInString,
  OrderBookRow,
  OrderResponseType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  RateLimiter,
  SymbolFilter,
} from './shared';

export type FuturesContractType =
  | 'PERPETUAL'
  | 'CURRENT_MONTH'
  | 'NEXT_MONTH'
  | 'CURRENT_QUARTER'
  | 'NEXT_QUARTER';

export interface ContinuousContractKlinesParams {
  pair: string;
  contractType: FuturesContractType;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface IndexPriceKlinesParams {
  pair: string;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface SymbolKlinePaginatedParams {
  symbol: string;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface FuturesDataPaginatedParams {
  symbol: string;
  period: '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '12h' | '1d';
  limit?: number;
  startTime?: number;
  endTime?: number;
}

export enum EnumDualSideMode {
  HedgeMode = 'true',
  OneWayMode = 'false',
}

export type DualSideMode = `${EnumDualSideMode}`;

export enum EnumMultiAssetMode {
  MultiAssetsMode = 'true',
  SingleAssetsMode = 'false',
}

export type MultiAssetsMode = `${EnumMultiAssetMode}`;

export type PositionSide = 'BOTH' | 'LONG' | 'SHORT';

export type MarginType = 'ISOLATED' | 'CROSSED';

export type WorkingType = 'MARK_PRICE' | 'CONTRACT_PRICE';

export type FuturesOrderType =
  | 'LIMIT'
  | 'MARKET'
  | 'STOP'
  | 'STOP_MARKET'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_MARKET'
  | 'TRAILING_STOP_MARKET';

// When using the submitMultipleOrders() endpoint, it seems to expect strings instead of numbers. All other endpoints use numbers.
export interface NewFuturesOrderParams<numberType = number> {
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
  newOrderRespType?: OrderResponseType;
}

export enum EnumPositionMarginChangeType {
  AddPositionMargin = 1,
  ReducePositionMargin = 0,
}

export type PositionMarginChangeType = `${EnumPositionMarginChangeType}`;

export type IncomeType =
  | 'TRANSFER'
  | 'WELCOME_BONUS'
  | 'REALIZED_PNL'
  | 'FUNDING_FEE'
  | 'COMMISSION'
  | 'INSURANCE_CLEAR';

export interface CancelMultipleOrdersParams {
  symbol: string;
  orderIdList?: number[];
  origClientOrderIdList?: string[];
}

export interface CancelOrdersTimeoutParams {
  symbol: string;
  countdownTime?: 0 | number;
}

export interface SetLeverageParams {
  symbol: string;
  leverage: number;
}

export interface SetLeverageResult {
  leverage: number;
  maxNotionalValue: numberInString;
  symbol: string;
}

export interface SetMarginTypeParams {
  symbol: string;
  marginType: MarginType;
}

export interface SetIsolatedMarginParams {
  symbol: string;
  positionSide?: PositionSide;
  amount: number;
  type: PositionMarginChangeType;
}

export interface SetIsolatedMarginResult {
  amount: numberInString;
  code: 200 | number;
  msg: string;
  type: 1 | 2;
}

export interface GetPositionMarginChangeHistoryParams {
  symbol: string;
  type?: PositionMarginChangeType;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetIncomeHistoryParams {
  symbol?: string;
  incomeType?: IncomeType;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface IncomeHistory {
  symbol?: string;
  incomeType: IncomeType;
  income: string;
  asset: string;
  time: number;
  info: string;
  tranId: number;
  tradeId: string;
}

export type ForceOrderCloseType = 'LIQUIDATION' | 'ADL';

export interface GetForceOrdersParams {
  symbol?: string;
  autoCloseType?: ForceOrderCloseType;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export type ContactType =
  | 'PERPETUAL'
  | 'CURRENT_MONTH'
  | 'NEXT_MONTH'
  | 'CURRENT_QUARTER'
  | 'NEXT_QUARTER';

export type ContractStatus =
  | 'PENDING_TRADING'
  | 'TRADING'
  | 'PRE_DELIVERING'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PRE_SETTLE'
  | 'SETTLING'
  | 'CLOSE';

export interface FuturesSymbolExchangeInfo {
  symbol: string;
  pair: string;
  contractType: ContactType;
  deliveryDate: number;
  onboardDate: number;
  status: ContractStatus;
  maintMarginPercent: numberInString;
  requiredMarginPercent: numberInString;
  baseAsset: string;
  quoteAsset: string;
  marginAsset: string;
  pricePrecision: number;
  quantityPrecision: number;
  baseAssetPrecision: number;
  quotePrecision: number;
  underlyingType: 'COIN' | 'INDEX'; // No other known values
  underlyingSubType: string[]; // DEFI / NFT / BSC / HOT / etc
  settlePlan: number;
  triggerProtect: numberInString;
  filters: SymbolFilter[];
  OrderType: OrderType[];
  timeInForce: OrderTimeInForce[];
  liquidationFee: numberInString;
  marketTakeBound: numberInString;
}

export interface FuturesExchangeInfo {
  exchangeFilters: ExchangeFilter[];
  rateLimits: RateLimiter[];
  serverTime: number;
  assets: any[];
  symbols: FuturesSymbolExchangeInfo[];
  timezone: string;
}

export interface FuturesOrderBook {
  lastUpdateId: number;
  E: number;
  T: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
}

export interface RawFuturesTrade {
  id: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  time: number;
  isBuyerMaker: boolean;
}

export interface AggregateFuturesTrade {
  a: number;
  p: numberInString;
  q: numberInString;
  f: number;
  l: number;
  T: number;
  M: boolean;
}

export type FuturesKline = [
  number, // open time
  numberInString, // open
  numberInString, // high
  numberInString, // low
  numberInString, // close
  numberInString, // volume
  number, // close time
  numberInString, // quote asset volume
  number, // number of trades
  numberInString, // taker buy base asset vol
  numberInString, // taker buy quote asest vol
  numberInString // ignore?
];

export interface FundingRateHistory {
  symbol: string;
  fundingRate: numberInString;
  fundingTime: number;
}

export interface FuturesSymbolOrderBookTicker {
  symbol: string;
  bidPrice: numberInString;
  bidQty: numberInString;
  askPrice: numberInString;
  askQty: numberInString;
  time: number;
}

export interface OpenInterest {
  openInterest: numberInString;
  symbol: string;
  time: number;
}

export interface PositionModeParams {
  dualSidePosition: DualSideMode;
}

export interface ModeChangeResult {
  code: 200 | number;
  msg: 'success' | string;
}

export interface PositionModeResponse {
  dualSidePosition: boolean;
}

export interface MultiAssetModeResponse {
  multiAssetsMargin: boolean;
}

export interface NewOrderResult {
  clientOrderId: string;
  cumQty: numberInString;
  cumQuote: numberInString;
  executedQty: numberInString;
  orderId: number;
  avgPrice: numberInString;
  origQty: numberInString;
  price: numberInString;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: numberInString;
  closePosition: boolean;
  symbol: string;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  origType: FuturesOrderType;
  activatePrice: numberInString;
  priceRate: numberInString;
  updateTime: number;
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface NewOrderError {
  code: number;
  msg: string;
}

export interface OrderResult {
  avgPrice: numberInString;
  clientOrderId: string;
  cumQuote: numberInString;
  executedQty: numberInString;
  orderId: number;
  origQty: numberInString;
  origType: FuturesOrderType;
  price: numberInString;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: numberInString;
  closePosition: boolean;
  symbol: string;
  time: number;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  activatePrice: numberInString;
  priceRate: numberInString;
  updateTime: number;
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface CancelFuturesOrderResult {
  clientOrderId: string;
  cumQty: numberInString;
  cumQuote: numberInString;
  executedQty: numberInString;
  orderId: number;
  origQty: numberInString;
  origType: FuturesOrderType;
  price: numberInString;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: numberInString;
  closePosition: boolean;
  symbol: string;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  activatePrice: numberInString;
  priceRate: numberInString;
  updateTime: number;
  workingType: WorkingType;
  priceProtect: boolean;
}

export interface CancelAllOpenOrdersResult {
  code: 200 | numberInString;
  msg: string;
}

export interface FuturesAccountBalance {
  accountAlias: string;
  asset: string;
  balance: numberInString;
  crossWalletBalance: numberInString;
  crossUnPnl: numberInString;
  availableBalance: numberInString;
  maxWithdrawAmount: numberInString;
  marginAvailable: boolean;
  updateTime: numberInString;
}

export interface FuturesAccountInformation {
  feeTier: numberInString;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: numberInString;
  totalInitialMargin: numberInString;
  totalMaintMargin: numberInString;
  // TODO:
}

export interface FuturesPosition {
  entryPrice: numberInString;
  marginType: Lowercase<MarginType>;
  isAutoAddMargin: 'false' | 'true';
  isolatedMargin: numberInString;
  leverage: numberInString;
  liquidationPrice: numberInString;
  markPrice: numberInString;
  maxNotionalValue: numberInString;
  positionAmt: numberInString;
  symbol: string;
  unRealizedProfit: numberInString;
  positionSide: PositionSide;
  updateTime: number;
}

export interface FuturesPositionTrade {
  buyer: boolean;
  commision: numberInString;
  commisionAsset: string;
  id: number;
  maker: boolean;
  orderId: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  realizedPnl: numberInString;
  side: OrderSide;
  positionSide: PositionSide;
  symbol: string;
  time: number;
}

export interface ForceOrderResult {
  orderId: number;
  symbol: string;
  status: OrderStatus;
  clientOrderId: string;
  price: numberInString;
  avgPrice: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumQuote: numberInString;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  reduceOnly: boolean;
  closePosition: boolean;
  side: OrderSide;
  stopPrice: numberInString;
  workingType: WorkingType;
  origType: FuturesOrderType;
  time: number;
  updateTime: number;
}

export interface SymbolLeverageBracket {
  bracket: number;
  initialLeverage: number;
  notionalCap: number;
  notionalFloor: number;
  maintMarginRatio: number;
  cum: number;
}

export interface SymbolLeverageBracketsResult {
  symbol: string;
  brackets: SymbolLeverageBracket[];
}

export interface RebateDataOverview {
  brokerId: string;
  newTraderRebateCommission: numberInString;
  oldTraderRebateCommission: numberInString;
  totalTradeUser: number;
  unit: string;
  totalTradeVol: numberInString;
  totalRebateVol: numberInString;
  time: number;
}

export interface SetCancelTimeoutResult {
  symbol: string;
  countdownTime: numberInString;
}

export interface ChangeStats24hr {
  symbol: string;
  priceChange: numberInString;
  priceChangePercent: numberInString;
  weightedAvgPrice: numberInString;
  lastPrice: numberInString;
  lastQty: numberInString;
  openPrice: numberInString;
  highPrice: numberInString;
  lowPrice: numberInString;
  volume: numberInString;
  quoteVolume: numberInString;
  openTime: number;
  closeTime: number;
  firstId: number; // First tradeId
  lastId: number; // Last tradeId
  count: number;
}
