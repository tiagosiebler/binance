import {
  BooleanString,
  BooleanStringCapitalised,
  ExchangeFilter,
  KlineInterval,
  numberInString,
  OrderBookRow,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  RateLimiter,
  SelfTradePreventionMode,
  SymbolIcebergPartsFilter,
  SymbolLotSizeFilter,
  SymbolMarketLotSizeFilter,
  SymbolMaxIcebergOrdersFilter,
  SymbolMaxPositionFilter,
  SymbolPriceFilter,
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

export interface FuturesCoinMTakerBuySellVolumeParams {
  pair: string;
  contractType: 'ALL' | 'CURRENT_QUARTER' | 'NEXT_QUARTER' | 'PERPETUAL';
  period: '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '12h' | '1d';
  limit?: number;
  startTime?: number;
  endTime?: number;
}

export interface FuturesCoinMBasisParams {
  pair: string;
  contractType: 'CURRENT_QUARTER' | 'NEXT_QUARTER' | 'PERPETUAL';
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

export type PriceMatchMode =
  | 'NONE'
  | 'OPPONENT'
  | 'OPPONENT_5'
  | 'OPPONENT_10'
  | 'OPPONENT_20'
  | 'QUEUE'
  | 'QUEUE_5'
  | 'QUEUE_10'
  | 'QUEUE_20';

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
  newOrderRespType?: 'ACK' | 'RESULT';
  selfTradePreventionMode?: SelfTradePreventionMode;
  priceMatch?: PriceMatchMode;
  goodTillDate?: number; // Mandatory when timeInForce is GTD
}

export interface ModifyFuturesOrderParams<numberType = number> {
  orderId?: number;
  origClientOrderId?: string;
  symbol: string;
  side: OrderSide;
  quantity?: numberType;
  price?: numberType;
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
  page?: number;
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

export interface FuturesSymbolPercentPriceFilter {
  filterType: 'PERCENT_PRICE';
  multiplierUp: numberInString;
  multiplierDown: numberInString;
  multiplierDecimal: numberInString;
}

export interface FuturesSymbolMaxOrdersFilter {
  filterType: 'MAX_NUM_ORDERS';
  limit: number;
}

export interface FuturesSymbolMaxAlgoOrdersFilter {
  filterType: 'MAX_NUM_ALGO_ORDERS';
  limit: number;
}

export interface FuturesSymbolMinNotionalFilter {
  filterType: 'MIN_NOTIONAL';
  notional: numberInString;
}

export type FuturesSymbolFilter =
  | SymbolPriceFilter
  | FuturesSymbolPercentPriceFilter
  | SymbolLotSizeFilter
  | FuturesSymbolMinNotionalFilter
  | SymbolIcebergPartsFilter
  | SymbolMarketLotSizeFilter
  | FuturesSymbolMaxOrdersFilter
  | FuturesSymbolMaxAlgoOrdersFilter
  | SymbolMaxIcebergOrdersFilter
  | SymbolMaxPositionFilter;

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
  filters: FuturesSymbolFilter[];
  OrderType: OrderType[];
  timeInForce: OrderTimeInForce[];
  liquidationFee: numberInString;
  marketTakeBound: numberInString;
  contractSize?: number;
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

export interface MarkPrice {
  symbol: string;
  markPrice: numberInString;
  indexPrice: numberInString;
  estimatedSettlePrice: numberInString;
  lastFundingRate: numberInString;
  interestRate: numberInString;
  nextFundingTime: number;
  time: number;
}

export interface FundingRateHistory {
  symbol: string;
  fundingRate: numberInString;
  fundingTime: number;
  markPrice: numberInString;
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

export interface HistoricOpenInterest {
  symbol: string;
  sumOpenInterest: string;
  sumOpenInterestValue: string;
  timestamp: number;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  priceMatch: PriceMatchMode;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  priceMatch: PriceMatchMode;
}

export interface ModifyFuturesOrderResult {
  orderId: number;
  symbol: string;
  pair: string;
  status: OrderStatus;
  clientOrderId: string;
  price: numberInString;
  avgPrice: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumQty: numberInString;
  cumBase: numberInString;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  reduceOnly: boolean;
  closePosition: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  stopPrice: numberInString;
  workingType: WorkingType;
  priceProtect: boolean;
  origType: FuturesOrderType;
  updateTime: number;
  selfTradePreventionMode: SelfTradePreventionMode;
  priceMatch: PriceMatchMode;
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
  selfTradePreventionMode: SelfTradePreventionMode;
  priceMatch: PriceMatchMode;
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

export interface FuturesCoinMAccountBalance {
  accountAlias: string;
  asset: string;
  balance: numberInString;
  withdrawAvailable: numberInString;
  crossWalletBalance: numberInString;
  crossUnPnl: numberInString;
  availableBalance: numberInString;
  updateTime: number;
}

export interface FuturesAccountAsset {
  asset: string;
  walletBalance: numberInString;
  unrealizedProfit: numberInString;
  marginBalance: numberInString;
  maintMargin: numberInString;
  initialMargin: numberInString;
  positionInitialMargin: numberInString;
  openOrderInitialMargin: numberInString;
  maxWithdrawAmount: numberInString;
  crossWalletBalance: numberInString;
  crossUnPnl: numberInString;
  availableBalance: numberInString;
  marginAvailable: boolean;
  updateTime: number;
}

export interface FuturesAccountPosition {
  symbol: string;
  initialMargin: numberInString;
  maintMargin: numberInString;
  unrealizedProfit: numberInString;
  positionInitialMargin: numberInString;
  openOrderInitialMargin: numberInString;
  leverage: numberInString;
  isolated: boolean;
  entryPrice: numberInString;
  maxNotional: numberInString;
  positionSide: PositionSide;
  positionAmt: numberInString;
  notional: numberInString;
  isolatedWallet: numberInString;
  updateTime: number;
  bidNotional: numberInString;
  askNotional: numberInString;
}

export interface FuturesCoinMAccountPosition {
  symbol: string;
  positionAmt: numberInString;
  initialMargin: numberInString;
  maintMargin: numberInString;
  unrealizedProfit: numberInString;
  positionInitialMargin: numberInString;
  openOrderInitialMargin: numberInString;
  leverage: numberInString;
  isolated: boolean;
  positionSide: PositionSide;
  entryPrice: numberInString;
  maxQty: numberInString;
  updateTime: number;
}

export interface FuturesAccountInformation {
  feeTier: numberInString;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: numberInString;
  multiAssetsMargin: boolean;
  totalInitialMargin: numberInString;
  totalMaintMargin: numberInString;
  totalWalletBalance: numberInString;
  totalUnrealizedProfit: numberInString;
  totalMarginBalance: numberInString;
  totalPositionInitialMargin: numberInString;
  totalOpenOrderInitialMargin: numberInString;
  totalCrossWalletBalance: numberInString;
  totalCrossUnPnl: numberInString;
  availableBalance: numberInString;
  maxWithdrawAmount: numberInString;
  assets: FuturesAccountAsset[];
  positions: FuturesAccountPosition[];
}

export interface FuturesCoinMAccountInformation {
  assets: Omit<FuturesAccountAsset, 'marginAvailable'>[];
  positions: FuturesCoinMAccountPosition[];
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  feeTier: number;
  updateTime: number;
}

export interface FuturesPosition {
  entryPrice: numberInString;
  marginType: 'isolated' | 'cross';
  isAutoAddMargin: 'false' | 'true';
  isolatedMargin: numberInString;
  leverage: numberInString;
  liquidationPrice: numberInString;
  markPrice: numberInString;
  maxNotionalValue: numberInString;
  positionAmt: numberInString;
  notional: numberInString;
  isolatedWallet: numberInString;
  symbol: string;
  unRealizedProfit: numberInString;
  positionSide: PositionSide;
  updateTime: number;
}

export interface FuturesPositionV3 {
  symbol: string;
  positionSide: PositionSide;
  positionAmt: numberInString;
  entryPrice: numberInString;
  breakEvenPrice: numberInString;
  markPrice: numberInString;
  unRealizedProfit: numberInString;
  liquidationPrice: numberInString;
  isolatedMargin: numberInString;
  notional: numberInString;
  marginAsset: string;
  isolatedWallet: numberInString;
  initialMargin: numberInString;
  maintMargin: numberInString;
  positionInitialMargin: numberInString;
  openOrderInitialMargin: numberInString;
  adl: number;
  bidNotional: numberInString;
  askNotional: numberInString;
  updateTime: number;
}

export interface FuturesPositionTrade {
  buyer: boolean;
  commission: numberInString;
  commissionAsset: string;
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

export interface UserCommissionRate {
  symbol: string;
  makerCommissionRate: numberInString;
  takerCommissionRate: numberInString;
}

export interface FuturesAccountConfig {
  feeTier: number;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  dualSidePosition: boolean;
  updateTime: number;
  multiAssetsMargin: boolean;
  tradeGroupId: number;
}

export interface SymbolConfig {
  symbol: string;
  marginType: string;
  isAutoAddMargin: string;
  leverage: number;
  maxNotionalValue: string;
}

export interface UserForceOrder {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
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

export interface OrderAmendmentDetailPrice {
  before: numberInString;
  after: numberInString;
}

export interface OrderAmendmentDetailQty {
  before: numberInString;
  after: numberInString;
}

export interface OrderAmendmentDetail {
  price: OrderAmendmentDetailPrice;
  origQty: OrderAmendmentDetailQty;
  count: number;
}

export interface OrderAmendment {
  amendmentId: number;
  symbol: string;
  pair: string;
  orderId: number;
  clientOrderId: string;
  time: number;
  amendment: OrderAmendmentDetail;
}

export interface QuarterlyContractSettlementPrice {
  deliveryTime: number;
  deliveryPrice: string;
}

export interface BasisParams {
  pair: string;
  contractType: 'CURRENT_QUARTER' | 'NEXT_QUARTER' | 'PERPETUAL';
  period: '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '12h' | '1d';
  limit: number;
  startTime?: number;
  endTime?: number;
}

export interface Basis {
  indexPrice: string;
  contractType: string;
  basisRate: string;
  futuresPrice: string;
  annualizedBasisRate: string;
  basis: string;
  pair: string;
  timestamp: number;
}

export interface IndexPriceConstituent {
  exchange: string;
  symbol: string;
}

export interface IndexPriceConstituents {
  symbol: string;
  time: number;
  constituents: IndexPriceConstituent[];
}

export interface ModifyOrderParams {
  orderId?: number;
  origClientOrderId?: string;
  symbol: string;
  side: 'SELL' | 'BUY';
  quantity: string;
  price: string;
  priceMatch?:
    | 'OPPONENT'
    | 'OPPONENT_5'
    | 'OPPONENT_10'
    | 'OPPONENT_20'
    | 'QUEUE'
    | 'QUEUE_5'
    | 'QUEUE_10'
    | 'QUEUE_20';
  recvWindow?: number;
  timestamp: number;
}

export interface GetFuturesOrderModifyHistoryParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
  timestamp: number;
}

export interface FuturesTradeHistoryDownloadId {
  avgCostTimestampOfLast30d: number;
  downloadId: string;
}

export interface FuturesTransactionDownloadLink {
  downloadId: string;
  status: 'completed' | 'processing';
  url: string;
  expirationTimestamp: number;
  isExpired: boolean | null;
}

export interface PortfolioMarginProAccountInfo {
  maxWithdrawAmountUSD: string;
  asset: string;
  maxWithdrawAmount: string; // This field will be ignored in the response
}

export interface FuturesConvertPair {
  fromAsset: string;
  toAsset: string;
  fromAssetMinAmount: string;
  fromAssetMaxAmount: string;
  toAssetMinAmount: string;
  toAssetMaxAmount: string;
}

export interface FuturesConvertQuoteRequest {
  fromAsset: string;
  toAsset: string;
  fromAmount?: number;
  toAmount?: number;
  validTime?: '10s' | '30s' | '1m' | '2m';
}

export interface FuturesConvertQuote {
  quoteId: string;
  ratio: string;
  inverseRatio: string;
  validTimestamp: number;
  toAmount: string;
  fromAmount: string;
}

export interface FuturesConvertOrderStatus {
  orderId: string;
  orderStatus: 'PROCESS' | 'ACCEPT_SUCCESS' | 'SUCCESS' | 'FAIL';
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
  toAmount: string;
  ratio: string;
  inverseRatio: string;
  createTime: number;
}
