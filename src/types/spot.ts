import { ExchangeFilter, ExchangeSymbol, KlineInterval, numberInString, OrderBookRow, OrderResponseType, OrderSide, OrderStatus, OrderTimeInForce, OrderType, RateLimiter, SymbolFilter } from "./shared";

export interface BasicTimeRangeParam {
  startTime?: number;
  endTime?: number;
}

export interface BasicFromPaginatedParams {
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export type SymbolStatus =
  'PRE_TRADING'
  | 'TRADING'
  | 'POST_TRADING'
  | 'END_OF_DAY'
  | 'HALT'
  | 'AUCTION_MATCH'
  | 'BREAK'

export interface SystemStatusResponse {
  status: 0 | 1;
  msg: 'normal' | 'system maintenance';
}

export interface DailyAccountSnapshotParams {
  type: 'SPOT' | 'MARGIN' | 'FUTURES';
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface DailySpotAccountSnapshot {
  data: {
    balances: SpotBalance[];
    totalAssetOfBtc: numberInString;
  };
  type: 'spot';
  updateTime: number;
}

export interface DailyMarginAccountSnapshot {
  data: {
    marginLevel: numberInString;
    totalAssetOfBtc: numberInString;
    totalLiabilityOfBtc: numberInString;
    totalNetAssetOfBtc: numberInString;
    userAssets: MarginBalance[];
  };
  type: 'margin';
  updateTime: number;
}

export interface DailyFuturesAccountSnapshot {
  data: {
    assets: DailyFuturesBalance[];
    position: DailyFuturesPositionState[];
  };
  type: 'futures';
  updateTime: number;
}

export type DailyAccountSnapshotElement =
  DailySpotAccountSnapshot
  | DailyMarginAccountSnapshot
  | DailyFuturesAccountSnapshot;

export interface DailyAccountSnapshot {
  code: number;
  msg: string;
  snapshotVos: DailyAccountSnapshotElement[];
}

export interface AllCoinsInformationResponse {
  coin: string;
  depositAllEnable: boolean;
  free: numberInString;
  freeze: numberInString;
  ipoable: numberInString;
  isLegalMoney: boolean;
  locked: numberInString;
  name: string;
  networkList: CoinNetwork[];
  storage: numberInString;
  trading: boolean;
  withdrawAllEnable: boolean;
  withdrawing: numberInString;
}

export interface CoinNetwork {
  addressRegex: string;
  coin: string;
  depositDesc: string;
  depositEnable: boolean;
  isDefault: boolean;
  memoRegex: string;
  minConfirm: number;
  name: string;
  network: string;
  resetAddressStatus: boolean;
  specialTips: string;
  unlockConfirm: number;
  withdrawDesc: string;
  withdrawEnable: boolean;
  withdrawFee: numberInString;
  withdrawMin: numberInString;
}

export interface SpotBalance {
  asset: string;
  free: numberInString;
  locked: numberInString;
}

export interface MarginBalance {
  asset: string;
  borrowed: numberInString;
  free: numberInString;
  interest: numberInString;
  locked: numberInString;
  netAsset: numberInString;
}

export interface DailyFuturesBalance {
  asset: string;
  marginBalance: numberInString;
  walletBalance: numberInString;
}

export interface DailyFuturesPositionState {
  entryPrice: numberInString;
  markPrice: numberInString;
  positionAmt: numberInString;
  symbol: string;
  unRealizedProfit: numberInString;
}

export interface WithdrawParams {
  coin: string;
  withdrawOrderId?: string;
  network?: string;
  address: string;
  addressTag?: string;
  amount: number;
  transactionFeeFlag?: boolean;
  name?: string;
}

export enum EnumDepositStatus {
  Pending = 0,
  CreditedButCannotWithdraw = 6,
  Success = 1,
}

export type DepositStatusCode = `${EnumDepositStatus}`;

export interface DepositHistoryParams {
  coin?: string;
  status?: DepositStatusCode;
  startTime?: number;
  endTime?: number;
  offset?: number;
  limit?: number;
}

export interface DepositHistory {
  amount: numberInString;
  coin: string;
  network: string;
  status: number;
  address: string;
  addressTag: string;
  txId: string;
  insertTime: number;
  transferType: number;
  confirmTimes: string;
}

export enum EnumWithdrawStatus {
  EmailSent = 0,
  Cancelled = 1,
  AwaitingApproval = 2,
  Rejected = 3,
  Processing = 4,
  Failure = 5,
  Completed = 6,
}

export type WithdrawStatusCode = `${EnumWithdrawStatus}`;

export interface WithdrawHistoryParams {
  coin?: string;
  withdrawOrderId?: string;
  status?: WithdrawStatusCode;
  offset?: number;
  limit?: number;
  startTime?: number;
  endTime?: number;
}

export enum EnumWithdrawTransferType {
  External = 0,
  Interal = 1,
}

export type WithdrawTransferType = `${EnumWithdrawTransferType}`;

export interface WithdrawHistory {
  address: string;
  amount: numberInString;
  applyTime: string;
  coin: string;
  id: string;
  withdrawOrderId: string;
  network: string;
  transferType: WithdrawTransferType;
  status: number;
  transactionFee: numberInString;
  txId: string;
}

export interface DepositAddressParams {
  coin: string;
  network?: string;
}

export interface DepositAddressResponse {
  address: string;
  coin: string;
  tag: string;
  url: string;
}

export interface ConvertDustParams {
  asset: string[];
}
export enum EnumUniversalTransferType {
  SpotToC2C = 'MAIN_C2C',
  SpotToUSDM = 'MAIN_UMFUTURE',
  SpotToCOINM = 'MAIN_CMFUTURE',
  SpotToMargin = 'MAIN_MARGIN',
  SpotToMining = 'MAIN_MINING',
  C2CToSpot = 'C2C_MAIN',
  C2CToUSDM = 'C2C_UMFUTURE',
  C2CToMining = 'C2C_MINING',
  C2CToMargin = 'C2C_MARGIN',
  USDMToSpot = 'UMFUTURE_MAIN',
  USDMToC2C = 'UMFUTURE_C2C',
  USDMToMargin = 'UMFUTURE_MARGIN',
  COINMToSpot = 'CMFUTURE_MAIN',
  COINMToMargin = 'CMFUTURE_MARGIN',
  MarginToSpot = 'MARGIN_MAIN',
  MarginToUSDM = 'MARGIN_UMFUTURE',
  MarginToCOINM = 'MARGIN_CMFUTURE',
  MarginToMining = 'MARGIN_MINING',
  MarginToC2C = 'MARGIN_C2C',
  MiningToSpot = 'MINING_MAIN',
  MiningToUSDM = 'MINING_UMFUTURE',
  MiningToC2C = 'MINING_C2C',
  MiningToMargin = 'MINING_MARGIN',
  SpotToPay = 'MAIN_PAY',
  PayToSpot = 'PAY_MAIN',
}

export type UniversalTransferType = `${EnumUniversalTransferType}`

export interface UniversalTransferParams {
  type: UniversalTransferType;
  asset: string;
  amount: string;
}

export interface UniversalTransferHistoryParams {
  type: UniversalTransferType;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface VirtualSubaccountParams {
  subAccountString: string;
}

export interface SubAccountListParams {
  email?: string;
  isFreeze?: string;
  page?: number;
  limit?: number;
}

export interface ExchangeInfoParams {
  symbol?: string;
  symbols?: string[];
}

export interface NewSpotOrderParams {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: OrderTimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  icebergQty?: number;
  newOrderRespType?: OrderResponseType;
}

export interface GetOCOParams {
  orderListId?: number;
  origClientOrderId?: string;
}

export type APILockTriggerCondition = 'GCR' | 'IFER' | 'UFR';

export interface APITriggerConditionSymbolStatus {
  i: APILockTriggerCondition;
  c: number;
  v: number;
  t: number;
}

export interface APITradingStatus {
  data: {
    isLocked: boolean;
    plannedRecoverTime: number;
    triggerCondition: Record<APILockTriggerCondition, number>;
    indicators: Record<ExchangeSymbol, APITriggerConditionSymbolStatus[]>;
    updateTime: number;
  }
}

export interface APIPermissions {
  ipRestrict: boolean;
  createTime: number;
  enableWithdrawals: boolean;   // This option allows you to withdraw via API. You must apply the IP Access Restriction filter in order to enable withdrawals
  enableInternalTransfer: boolean;  // This option authorizes this key to transfer funds between your master account and your sub account instantly
  permitsUniversalTransfer: boolean;  // Authorizes this key to be used for a dedicated universal transfer API to transfer multiple supported currencies. Each business's own transfer API rights are not affected by this authorization
  enableVanillaOptions: boolean;  //  Authorizes this key to Vanilla options trading
  enableReading: boolean;
  enableFutures: boolean;  //  API Key created before your futures account opened does not support futures API service
  enableMargin: boolean;   //  This option can be adjusted after the Cross Margin account transfer is completed
  enableSpotAndMarginTrading: boolean; // Spot and margin trading
  tradingAuthorityExpirationTime: number;  // Expiration time for spot and margin trading permission
}

export interface AssetDetail {
  minWithdrawAmount: numberInString;
  depositStatus: boolean;
  withdrawFee: number;
  withdrawStatus: boolean;
  depositTip?: string;
}

export interface SymbolTradeFee {
  symbol: string;
  makerCommission: numberInString;
  takerCommission: numberInString;
}

export interface SymbolExchangeInfo {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quoteAssetPrecision: number;
  orderTypes: OrderType[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: SymbolFilter[];
  permissions: ('SPOT' | 'MARGIN')[];
}

export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimiter[];
  exchangeFilters: ExchangeFilter[];
  symbols: SymbolExchangeInfo[];
}

export interface OrderBookResponse {
  lastUpdateId: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
}

export interface RawTrade {
  id: number;
  price: numberInString;
  qty: numberInString;
  quoteQty: numberInString;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface RawAccountTrade {
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

export interface AggregateTrade {
  a: number;
  p: numberInString;
  q: numberInString;
  f: number;
  l: number;
  T: number;
  m: boolean;
  M: boolean;
}

export interface CurrentAvgPrice {
  mins: number;
  price: numberInString;
}

export interface DailyChangeStatistic {
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
  firstId: number;
  lastId: number;
  count: number;
}

export interface SymbolPrice {
  symbol: string;
  price: numberInString;
}

export interface SymbolOrderBookTicker {
  symbol: string;
  bidPrice: numberInString;
  bidQty: numberInString;
  askPrice: numberInString;
  askQty: numberInString;
}

export interface OrderResponseACK {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
}

export interface OrderResponseResult {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
}

export interface OrderFill {
  price: numberInString;
  qty: numberInString;
  commission: numberInString;
  commissionAsset: string;
}

export interface OrderResponseFull {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  fills: OrderFill[];
}

export interface CancelSpotOrderResult {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
}

export interface SpotOrder {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cumulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  stopPrice: numberInString;
  icebergQty: numberInString;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: numberInString;
}

export interface SpotAssetBalance {
  asset: string;
  free: numberInString;
  locked: numberInString;
}

export interface AccountInformation {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accoountType: string;
  balances: SpotAssetBalance[];
  permissions: any[];
}
