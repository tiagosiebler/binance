import {
  ExchangeFilter,
  ExchangeSymbol,
  GenericCodeMsgError,
  numberInString,
  OrderBookRow,
  OrderResponseType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  RateLimiter,
  SideEffects,
  StringBoolean,
  SymbolFilter,
} from './shared';

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
  | 'PRE_TRADING'
  | 'TRADING'
  | 'POST_TRADING'
  | 'END_OF_DAY'
  | 'HALT'
  | 'AUCTION_MATCH'
  | 'BREAK';

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
  | DailySpotAccountSnapshot
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
  walletType?: number;
}

export interface TransferBrokerSubAccountParams {
  fromId?: string;
  toId?: string;
  clientTranId?: string;
  asset: string;
  amount: number;
}

export interface ConvertQuoteRequestParams {
  fromAsset: string;
  toAsset: string;
  fromAmount?: number;
  toAmount?: number;
  walletType?: string;
  validTime?: string;
}

export interface EnableConvertSubAccountParams {
  subAccountId: string;
  convert: boolean;
}

export interface AcceptQuoteRequestParams {
  quoteId: string;
}

export interface GetOrderStatusParams {
  orderId?: string;
  quoteId?: string;
}

export interface GetConvertTradeHistoryParams {
  startTime: number;
  endTime?: number;
  limit?: string;
}

export interface TransferBrokerSubAccount {
  txnId: numberInString;
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

export interface DustInfoDetail {
  asset: string;
  assetFullName: string;
  amountFree: numberInString;
  toBTC: numberInString;
  toBNB: numberInString;
  toBNBOffExchange: numberInString;
  exchange: numberInString;
}

export interface DustInfo {
  details: DustInfoDetail[];
  totalTransferBtc: numberInString;
  totalTransferBNB: numberInString;
  dribbletPercentage: numberInString;
}

export interface DustConversionResult {
  amount: numberInString;
  fromAsset: string;
  operateTime: number;
  serviceChargeAmount: numberInString;
  tranId: number;
  transferedAmount: numberInString;
}

export interface DustConversion {
  totalServiceCharge: numberInString;
  totalTransfered: numberInString;
  transferResult: DustConversionResult[];
}

export interface UserAssetDribbletDetail {
  transId: number;
  serviceChargeAmount: numberInString;
  amount: numberInString;
  operateTime: number;
  transferedAmount: numberInString;
  fromAsset: string;
}

export interface UserAssetDribblet {
  operateTime: number;
  totalTransferedAmount: numberInString;
  totalServiceChargeAmount: numberInString;
  transId: number;
  userAssetDribbletDetails: UserAssetDribbletDetail[];
}

export interface DustLog {
  total: number;
  userAssetDribblets: UserAssetDribblet[];
}

export enum EnumUniversalTransferType {
  SpotToUSDM = 'MAIN_UMFUTURE',
  SpotToCOINM = 'MAIN_CMFUTURE',
  SpotToMargin = 'MAIN_MARGIN',
  SpotToFunding = 'MAIN_FUNDING',
  SpotToOptions = 'MAIN_OPTION',
  FundingToSpot = 'FUNDING_MAIN',
  FundingToUSDM = 'FUNDING_UMFUTURE',
  FundingToCOINM = 'FUNDING_CMFUTURE',
  FundingToMargin = 'FUNDING_MARGIN',
  FundingToOptions = 'FUNDING_OPTION',
  USDMToSpot = 'UMFUTURE_MAIN',
  USDMToFunding = 'UMFUTURE_FUNDING',
  USDMToMargin = 'UMFUTURE_MARGIN',
  USDMToOptions = 'UMFUTURE_OPTION',
  COINMToSpot = 'CMFUTURE_MAIN',
  COINMToFunding = 'CMFUTURE_FUNDING',
  COINMToMargin = 'CMFUTURE_MARGIN',
  MarginToSpot = 'MARGIN_MAIN',
  MarginToUSDM = 'MARGIN_UMFUTURE',
  MarginToCOINM = 'MARGIN_CMFUTURE',
  MarginToIsolatedMargin = 'MARGIN_ISOLATEDMARGIN ',
  MarginToFunding = 'MARGIN_FUNDING',
  MarginToOptions = 'MARGIN_OPTION',
  IsolatedMarginToMargin = 'ISOLATEDMARGIN_MARGIN',
  IsolatedMarginToIsolatedMargin = 'ISOLATEDMARGIN_ISOLATEDMARGIN',
  OptionsToSpot = 'OPTION_MAIN',
  OptionsToUSDM = 'OPTION_UMFUTURE',
  OptionsToFunding = 'OPTION_FUNDING',
  OptionsToMargin = 'OPTION_MARGIN',
}

export type UniversalTransferType = `${EnumUniversalTransferType}`;

export interface UniversalTransferParams {
  type: UniversalTransferType;
  asset: string;
  amount: number;
  fromSymbol: string;
  toSymbol: string;
}

export interface UniversalTransferHistoryParams {
  type: UniversalTransferType;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
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
  trailingDelta?: number;
  icebergQty?: number;
  newOrderRespType?: OrderResponseType;
  isIsolated?: StringBoolean;
  sideEffectType?: SideEffects;
}

export interface ReplaceSpotOrderParams extends NewSpotOrderParams {
  cancelReplaceMode: 'STOP_ON_FAILURE' | 'ALLOW_FAILURE';
  cancelNewClientOrderId?: string;
  cancelOrigClientOrderId?: string;
  cancelOrderId?: number;
  cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
}

export interface GetOCOParams {
  symbol?: string;
  isIsolated?: StringBoolean;
  orderListId?: number;
  origClientOrderId?: string;
}

export interface NewSpotSOROrderParams {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: OrderTimeInForce;
  quantity: number;
  price?: number;
  newClientOrderId?: string;
  strategyId?: number;
  strategyType?: number;
  icebergQty?: number;
  newOrderRespType?: OrderResponseType;
  selfTradePreventionMode?:
    | 'EXPIRE_TAKER'
    | 'EXPIRE_MAKER'
    | 'EXPIRE_BOTH'
    | 'NONE';
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
  };
}

export interface APIPermissions {
  ipRestrict: boolean;
  createTime: number;
  enableWithdrawals: boolean; // This option allows you to withdraw via API. You must apply the IP Access Restriction filter in order to enable withdrawals
  enableInternalTransfer: boolean; // This option authorizes this key to transfer funds between your master account and your sub account instantly
  permitsUniversalTransfer: boolean; // Authorizes this key to be used for a dedicated universal transfer API to transfer multiple supported currencies. Each business's own transfer API rights are not affected by this authorization
  enableVanillaOptions: boolean; //  Authorizes this key to Vanilla options trading
  enableReading: boolean;
  enableFutures: boolean; //  API Key created before your futures account opened does not support futures API service
  enableMargin: boolean; //  This option can be adjusted after the Cross Margin account transfer is completed
  enableSpotAndMarginTrading: boolean; // Spot and margin trading
  tradingAuthorityExpirationTime: number; // Expiration time for spot and margin trading permission
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
  quotePrecision: number;
  quoteAssetPrecision: number;
  orderTypes: OrderType[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: SymbolFilter[];
  permissions: ('SPOT' | 'MARGIN')[];
  defaultSelfTradePreventionMode:
    | 'NONE'
    | 'EXPIRE_TAKER'
    | 'EXPIRE_BOTH'
    | 'EXPIRE_MAKER';
  allowedSelfTradePreventionModes: (
    | 'NONE'
    | 'EXPIRE_TAKER'
    | 'EXPIRE_BOTH'
    | 'EXPIRE_MAKER'
  )[];
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
  cummulativeQuoteQty: numberInString;
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
  orderListId?: number;
  clientOrderId: string;
  transactTime: number;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cummulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  marginBuyBorrowAmount?: number;
  marginBuyBorrowAsset?: string;
  isIsolated?: boolean;
  fills: OrderFill[];
}

export interface SOROrderFill {
  matchType: string;
  price: numberInString;
  qty: numberInString;
  commission: numberInString;
  commissionAsset: string;
  tradeId: number;
  allocId: number;
}

export type SOROrderResponseFull = OrderResponseFull & {
  workingTime: number;
  fills: SOROrderFill[];
  workingFloor: string;
  selfTradePreventionMode: string;
  usedSor: true;
};

export interface SORTestOrderResponse {
  standardCommissionForOrder: {
    //Standard commission rates on trades from the order.
    maker: numberInString;
    taker: numberInString;
  };
  taxCommissionForOrder: {
    //Tax commission rates for trades from the order.
    maker: numberInString;
    taker: numberInString;
  };
  discount: {
    //Discount on standard commissions when paying in BNB.
    enabledForAccount: boolean;
    enabledForSymbol: boolean;
    discountAsset: string;
    discount: numberInString; //Standard commission is reduced by this rate when paying commission in BNB.
  };
}

export interface GenericReplaceSpotOrderResult<C, N> {
  cancelResult: 'SUCCESS' | 'FAILURE';
  newOrderResult: 'SUCCESS' | 'FAILURE' | 'NOT_ATTEMPTED';
  cancelResponse: C;
  newOrderResponse: N;
}

export interface ReplaceSpotOrderCancelStopFailure
  extends GenericReplaceSpotOrderResult<GenericCodeMsgError, null> {
  cancelResult: 'FAILURE';
  newOrderResult: 'NOT_ATTEMPTED';
}

export interface ReplaceSpotOrderNewFailure
  extends GenericReplaceSpotOrderResult<
    CancelSpotOrderResult,
    GenericCodeMsgError
  > {
  cancelResult: 'SUCCESS';
  newOrderResult: 'FAILURE';
}

export interface ReplaceSpotOrderCancelAllowFailure
  extends GenericReplaceSpotOrderResult<
    GenericCodeMsgError,
    OrderResponseACK | OrderResponseResult | OrderResponseFull
  > {
  cancelResult: 'FAILURE';
  newOrderResult: 'SUCCESS';
}

export interface ReplaceSpotOrderCancelAllFailure
  extends GenericReplaceSpotOrderResult<
    GenericCodeMsgError,
    GenericCodeMsgError
  > {
  cancelResult: 'FAILURE';
  newOrderResult: 'FAILURE';
}

export interface ReplaceSpotOrderResultError {
  data:
    | ReplaceSpotOrderCancelStopFailure
    | ReplaceSpotOrderNewFailure
    | ReplaceSpotOrderCancelAllowFailure
    | ReplaceSpotOrderCancelAllFailure;
}

export interface ReplaceSpotOrderResultSuccess
  extends GenericReplaceSpotOrderResult<
    CancelSpotOrderResult,
    OrderResponseACK | OrderResponseResult | OrderResponseFull
  > {
  cancelResult: 'SUCCESS';
  newOrderResult: 'SUCCESS';
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
  cummulativeQuoteQty: numberInString;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  isIsolated?: boolean;
}

export interface SpotOrder {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: numberInString;
  origQty: numberInString;
  executedQty: numberInString;
  cummulativeQuoteQty: numberInString;
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
  isIsolated?: boolean;
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

export interface CrossMarginAccountTransferParams {
  asset: string;
  amount: number;
  type: 1 | 2;
}

export interface MarginTransactionResponse {
  tranId: number;
}

export interface MarginAccountLoanParams {
  asset: string;
  isIsolated?: StringBoolean;
  symbol?: string;
  amount: number;
}

export interface QueryMarginAssetParams {
  asset: string;
}

export interface QueryMarginAssetResponse {
  assetFullName: string;
  assetName: string;
  isBorrowable: boolean;
  isMortgageable: boolean;
  userMinBorrow: numberInString;
  userMinRepay: numberInString;
}

export interface QueryCrossMarginPairParams {
  symbol: string;
}

export interface QueryCrossMarginPairResponse {
  id: number;
  symbol: string;
  base: string;
  quote: string;
  isMarginTrade: boolean;
  isBuyAllowed: boolean;
  isSellAllowed: boolean;
}

export interface QueryMarginPriceIndexResponse {
  calcTime: number;
  price: numberInString;
  symbol: string;
}

export interface QueryMarginRecordParams {
  asset: string;
  isolatedSymbol?: string;
  txId?: number;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
  archived?: boolean;
}

export type LoanStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export interface MarginRecordParams {
  isolatedSymbol?: string;
  txId: number;
  asset: string;
  principal: numberInString;
  timestamp: number;
  status: LoanStatus;
}

export interface MarginRecordResponse {
  rows: Array<MarginRecordParams>;
  total: number;
}

export interface QueryCrossMarginAccountDetailsParams {
  borrowEnabled: boolean;
  marginLevel: numberInString;
  totalAssetOfBtc: numberInString;
  totalLiabilityOfBtc: numberInString;
  totalNetAssetOfBtc: numberInString;
  tradeEnabled: boolean;
  transferEnabled: boolean;
  userAssets: Array<MarginBalance>;
}

export interface BasicMarginAssetParams {
  asset: string;
  isolatedSymbol?: string;
}

export interface QueryMaxBorrowResponse {
  amount: numberInString;
  borrowLimit: numberInString;
}

export interface QueryMaxTransferOutAmountResponse {
  amount: numberInString;
}

export type IsolatedMarginTransfer = 'SPOT' | 'ISOLATED_MARGIN';

export interface IsolatedMarginAccountTransferParams {
  asset: string;
  symbol: string;
  transFrom: IsolatedMarginTransfer;
  transTo: IsolatedMarginTransfer;
  amount: number;
}

export interface IsolatedMarginAccountAsset {
  asset: string;
  borrowEnabled: boolean;
  borrowed: numberInString;
  free: numberInString;
  interest: numberInString;
  locked: numberInString;
  netAsset: numberInString;
  netAssetOfBtc: numberInString;
  repayEnabled: boolean;
  totalAsset: numberInString;
}

export type IsolatedMarginLevelStatus =
  | 'EXCESSIVE'
  | 'NORMAL'
  | 'MARGIN_CALL'
  | 'PRE_LIQUIDATION'
  | 'FORCE_LIQUIDATION';

export interface IsolatedMarginAccountAssets {
  baseAsset: IsolatedMarginAccountAsset;
  quoteAsset: IsolatedMarginAccountAsset;
  symbol: string;
  isolatedCreated: boolean;
  enabled: boolean;
  marginLevel: numberInString;
  marginLevelStatus: IsolatedMarginLevelStatus;
  marginRatio: numberInString;
  indexPrice: numberInString;
  liquidatePrice: numberInString;
  liquidateRate: numberInString;
  tradeEnabled: boolean;
}

export interface IsolatedMarginAccountInfo {
  assets: IsolatedMarginAccountAssets[];
  totalAssetOfBtc?: numberInString;
  totalLiabilityOfBtc?: numberInString;
  totalNetAssetOfBtc?: numberInString;
}

export interface SpotSubUserAssetBtcList {
  email: string;
  totalAsset: numberInString;
}

export interface SubAccountList {
  email: string;
  isFreeze: boolean;
  createTime: number;
  isManagedSubAccount: boolean;
  isAssetManagementSubAccount: boolean;
}

export interface SubAccountDepositHistoryList {
  depositId: number;
  subAccountId: string;
  amount: string;
  coin: string;
  network: string;
  status: number;
  address: string;
  addressTag: string;
  txId: string;
  insertTime: number;
  sourceAddress: string;
  confirmTimes: string;
}

export interface SubAccountTransferHistoryList {
  fromId?: string;
  toId?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
}

export interface SubAccountBasicTransfer {
  from: string;
  to: string;
  asset: string;
  qty: numberInString;
  tranId: number;
  time: number;
}

export interface MarginTradeCoeffVo {
  forceLiquidationBar: numberInString;
  marginCallBar: numberInString;
  normalBar: numberInString;
}

export interface SubAccountStatus {
  email: string;
  isSubUserEnabled: boolean;
  isUserActive: boolean;
  insertTime: number;
  isMarginEnabled: boolean;
  isFutureEnabled: boolean;
  mobile: number;
}

export interface BasicBtcTotals {
  totalAssetOfBtc: numberInString;
  totalLiabilityOfBtc: numberInString;
  totalNetAssetOfBtc: numberInString;
}

export interface FuturesSubAccountAssets {
  asset: string;
  initialMargin: numberInString;
  maintenanceMargin: numberInString;
  marginBalance: numberInString;
  maxWithdrawAmount: numberInString;
  openOrderInitialMargin: numberInString;
  positionInitialMargin: numberInString;
  unrealizedProfit: numberInString;
  walletBalance: numberInString;
}

export interface FuturesSubAccountList {
  totalInitialMargin: numberInString;
  totalMaintenanceMargin: numberInString;
  totalMarginBalance: numberInString;
  totalOpenOrderInitialMargin: numberInString;
  totalPositionInitialMargin: numberInString;
  totalUnrealizedProfit: numberInString;
  totalWalletBalance: numberInString;
  asset: string;
  email: string;
}

export type AccountType = 'SPOT' | 'USDT_FUTURE' | 'COIN_FUTURE';

export interface SubAccountTransferHistory {
  counterParty: string;
  email: string;
  type: number;
  asset: string;
  qty: numberInString;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  status: string;
  tranId: number;
  time: number;
}

export interface SubAccountUniversalTransferHistory {
  tranId: number;
  fromEmail: string;
  toEmail: string;
  asset: string;
  amount: numberInString;
  createTimeStamp: number;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  status: string;
  clientTranId?: string;
}

export interface BasicSubAccount {
  email: string;
  subAccountApiKey: string;
}

export interface CreateSubAccountParams {
  subAccountString: string;
}

export interface GetBrokerSubAccountHistoryParams {
  fromId?: string;
  toId?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
  showAllStatus?: boolean;
}

export interface CreateBrokerSubAccountParams {
  tag?: string;
}

export interface GetBrokerSubAccountParams {
  subAccountId?: string;
  page?: number;
  size?: number;
}

export interface GetApiKeyBrokerSubAccountParams {
  subAccountId: string;
  subAccountApiKey?: string;
  page?: number;
  size?: number;
}

export interface CreateApiKeyBrokerSubAccountParams {
  subAccountId: string;
  canTrade: boolean;
  marginTrade?: boolean;
  futuresTrade?: boolean;
}
export interface ApiKeyBrokerSubAccount {
  subAccountId: string;
  apiKey: string;
  canTrade: boolean;
  marginTrade: boolean;
  futuresTrade: boolean;
}

export interface EnableUniversalTransferApiKeyBrokerSubAccountParams {
  subAccountId: string;
  subAccountApiKey: string;
  canUniversalTransfer: boolean;
}

export interface EnableMarginBrokerSubAccountParams {
  subAccountId: string;
  margin: boolean;
}

export interface EnableMarginBrokerSubAccountResponse {
  subAccountId: string;
  enableMargin: boolean;
  updateTime: number;
}

export interface EnableFuturesBrokerSubAccountParams {
  subAccountId: string;
  futures: boolean;
}

export interface EnableFuturesBrokerSubAccountResponse {
  subAccountId: string;
  enableFutures: boolean;
  updateTime: number;
}

export interface EnableMarginApiKeyBrokerSubAccountParams {
  subAccountId: string;
  margin: boolean;
}
export interface UniversalTransferBrokerParams {
  fromId?: string;
  toId?: string;
  fromAccountType: string;
  toAccountType: string;
  asset: string;
  amount: number;
}

export interface GetUniversalTransferBrokerParams {
  fromId?: string;
  toId?: string;
  clientTranId?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
  showAllStatus?: boolean;
}

export interface GetBrokerSubAccountDepositHistoryParams {
  subAccountId?: string;
  coin?: string;
  status?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  offset?: number;
}

export interface DeleteApiKeyBrokerSubAccountParams {
  subAccountId: string;
  subAccountApiKey: string;
}

export interface ChangePermissionApiKeyBrokerSubAccountParams {
  subAccountId: string;
  subAccountApiKey: string;
  canTrade: boolean;
  marginTrade: boolean;
  futuresTrade: boolean;
}

export interface ChangePermissionApiKeyBrokerSubAccountResponse {
  subAccountId: string;
  apikey: string;
  canTrade: boolean;
  marginTrade: boolean;
  futuresTrade: boolean;
}

export interface VirtualSubAccount {
  email: string;
}

export interface BrokerSubAccountHistory {
  subAccountsHistory: SubAccountTransferHistoryList[];
}

export interface BrokerSubAccount {
  subaccountId: string;
  email: string;
  makerCommission?: string;
  takerCommission?: string;
  marginMakerCommission?: string;
  marginTakerCommission?: string;
  createTime?: number;
  tag: string;
}

export interface CreateApiKeyBrokerSubAccountResponse {
  subaccountId: string;
  apiKey: string;
  secretKey: string;
  canTrade: boolean;
  marginTrade: boolean;
  futuresTrade: boolean;
}

export interface EnableUniversalTransferApiKeyBrokerSubAccountResponse {
  subAccountId: string;
  apikey: string;
  canUniversalTransfer: boolean;
}

export interface GetBrokerInfoResponse {
  maxMakerCommission: string;
  minMakerCommission: string;
  maxTakerCommission: string;
  minTakerCommission: string;
  subAccountQty: number;
  maxSubAccountQty: number;
}
export interface SubAccountListParams {
  email?: string;
  isFreeze?: StringBoolean;
  page?: number;
  limit?: number;
}

export interface SubAccountListResponse {
  subAccounts: SubAccountList[];
}

export interface SubAccountSpotAssetTransferHistoryParams {
  fromEmail?: string;
  toEmail?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
}

export interface SubAccountSpotAssetTransferHistory
  extends SubAccountBasicTransfer {
  status: string;
}

export interface SubAccountFuturesAssetTransferHistoryParams {
  email: string;
  futuresType: number;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
}

export interface SubAccountFuturesAssetTransferHistory {
  success: boolean;
  futuresType: number;
  transfers: SubAccountBasicTransfer[];
}

export interface SubAccountFuturesAssetTransferParams {
  fromEmail: string;
  toEmail: string;
  futuresType: number;
  asset: string;
  amount: number;
}

export interface SubAccountFuturesAssetTransfer {
  success: boolean;
  txnId: numberInString;
}

export interface SubAccountAssetsParams {
  email: string;
}

export interface SubAccountAssets {
  balances: SpotBalance[];
}

export interface SubAccountSpotAssetsSummaryParams {
  email?: string;
  page?: number;
  size?: number;
}

export interface SubAccountSpotAssetsSummary {
  totalCount: number;
  masterAccountTotalAsset: numberInString;
  spotSubUserAssetBtcVoList: SpotSubUserAssetBtcList[];
}

export interface SubAccountDepositAddressParams {
  email: string;
  coin: string;
  network?: string;
}

export interface SubAccountDepositAddress {
  address: string;
  coin: string;
  tag: string;
  url: string;
}

export interface SubAccountDepositHistoryParams extends DepositHistoryParams {
  email: string;
}

export interface SubAccountEnableMargin {
  email: string;
  isMarginEnabled: boolean;
}

export interface SubAccountMarginAccountDetail extends BasicBtcTotals {
  email: string;
  marginLevel: numberInString;
  marginTradeCoeffVo: MarginTradeCoeffVo;
  marginUserAssetVoList: MarginBalance[];
}

export interface SubAccountListBtc extends BasicBtcTotals {
  email: string;
}

export interface SubAccountsMarginAccountSummary extends BasicBtcTotals {
  subAccountList: SubAccountListBtc;
}

export interface SubAccountEnableFutures {
  email: string;
  isFuturesEnabled: boolean;
}

export interface SubAccountFuturesAccountDetail {
  email: string;
  asset: string;
  assets: FuturesSubAccountAssets[];
  canDeposit: boolean;
  canWithdraw: boolean;
  feeTier: number;
  maxWithdrawAmount: numberInString;
  totalInitialMargin: numberInString;
  totalMaintenanceMargin: numberInString;
  totalMarginBalance: numberInString;
  totalOpenOrderInitialMargin: numberInString;
  totalPositionInitialMargin: numberInString;
  totalUnrealizedProfit: numberInString;
  totalWalletBalance: numberInString;
  updateTime: number;
}

export interface SubAccountFuturesAccountSummary extends FuturesSubAccountList {
  subAccountList: FuturesSubAccountList[];
}

export interface FuturesPositionRisk {
  entryPrice: numberInString;
  leverage: numberInString;
  maxNotional: numberInString;
  liquidationPrice: numberInString;
  markPrice: numberInString;
  positionAmount: numberInString;
  symbol: string;
  unrealizedProfit: numberInString;
}

export interface SubAccountTransferParams {
  email: string;
  asset: string;
  amount: number;
  type: number;
}

export interface SubAccountTransfer {
  txnId: numberInString;
}

export interface SubAccountTransferToSameMasterParams {
  toEmail: string;
  asset: string;
  amount: number;
}

export interface SubAccountTransferToMasterParams {
  asset: string;
  amount: number;
}

export interface SubAccountTransferHistoryParams {
  asset?: string;
  type?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface SubAccountUniversalTransferParams {
  fromEmail?: string;
  toEmail?: string;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  clientTranId?: string;
  asset: string;
  amount: number;
}

export interface SubAccountUniversalTransfer extends SubAccountTransfer {
  clientTranId?: string;
}

export interface SubAccountUniversalTransferHistoryParams {
  fromEmail?: string;
  toEmail?: string;
  clientTranId?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  limit?: number;
}

export interface SubAccountUniversalTransferHistoryResponse {
  result: SubAccountUniversalTransferHistory[];
  totalCount: number;
}

export interface SubAccountEnableLeverageToken {
  email: string;
  enableBlvt: boolean;
}

export interface EnableOrDisableIPRestrictionForSubAccountParams
  extends BasicSubAccount {
  ipRestrict: boolean;
}

export interface SubAccountnableOrDisableIPRestriction {
  ipRestrict: boolean;
  ipList: string[];
  updateTime: number;
  apiKey: string;
}

export interface SubAccountAddOrDeleteIPList extends BasicSubAccount {
  ipAddress: string;
}

export interface AddIPListForSubAccountResponseParams {
  ip: string;
  updateTime: number;
  apiKey: string;
}

export interface SubAccountAssetDetails {
  coin: string;
  name: string;
  totalBalance: numberInString;
  availableBalance: numberInString;
  inOrder: numberInString;
  btcValue: numberInString;
}

export interface WithdrawAssetsFromManagedSubAccountParams {
  fromEmail: string;
  asset: string;
  amount: number;
  transferDate?: number;
}

export interface BasicFuturesSubAccountParams {
  email: string;
  futuresType: 1 | 2;
}

export interface SubAccountSummaryOnFuturesAccountV2Params {
  futuresType: 1 | 2;
  page?: number;
  limit?: number;
}

export interface SubAccountUSDMDetail {
  futureAccountResp: {
    email: string;
    assets: FuturesSubAccountAssets[];
    canDeposit: boolean;
    canWithdraw: boolean;
    feeTier: number;
    maxWithdrawAmount: numberInString;
    totalInitialMargin: numberInString;
    totalMaintenanceMargin: numberInString;
    totalMarginBalance: numberInString;
    totalOpenOrderInitialMargin: numberInString;
    totalPositionInitialMargin: numberInString;
    totalUnrealizedProfit: numberInString;
    totalWalletBalance: numberInString;
    updateTime: number;
  };
}

export interface COINMSubAccount {
  email: string;
  totalMarginBalance: numberInString;
  totalUnrealizedProfit: numberInString;
  totalWalletBalanceOfBTC: numberInString;
  asset: string;
}

export interface SubAccountCOINMDetail {
  deliveryAccountResp: {
    email: string;
    assets: FuturesSubAccountAssets[];
    canDeposit: boolean;
    canWithdraw: boolean;
    feeTier: number;
    updateTime: number;
  };
}

export interface SubAccountUSDMSummary {
  futureAccountSummaryResp: {
    totalInitialMargin: numberInString;
    totalMaintenanceMargin: numberInString;
    totalMarginBalance: numberInString;
    totalOpenOrderInitialMargin: numberInString;
    totalPositionInitialMargin: numberInString;
    totalUnrealizedProfit: numberInString;
    totalWalletBalance: numberInString;
    asset: string;
    subAccountList: FuturesSubAccountList[];
  };
}

export interface SubAccountCOINMSummary {
  deliveryAccountSummaryResp: {
    totalMarginBalanceOfBTC: numberInString;
    totalUnrealizedProfitOfBTC: numberInString;
    totalWalletBalanceOfBTC: numberInString;
    asset: string;
    subAccountList: COINMSubAccount[];
  };
}

export interface COINMPositionRisk {
  entryPrice: numberInString;
  markPrice: numberInString;
  leverage: numberInString;
  isolated: numberInString;
  isolatedWallet: numberInString;
  isolatedMargin: numberInString;
  isAutoAddMargin: numberInString;
  positionSide: string;
  positionAmount: numberInString;
  symbol: string;
  unrealizedProfit: numberInString;
}

export interface SubAccountUSDMPositionRisk {
  futurePositionRiskVos: FuturesPositionRisk[];
}

export interface SubAccountCOINMPositionRisk {
  deliveryPositionRiskVos: COINMPositionRisk[];
}

export interface StakingProductDetail {
  asset: string;
  rewardAsset: string;
  duration: number;
  renewable: boolean;
  apy: numberInString;
}

export interface StakingProductQuota {
  totalPersonalQuota: numberInString;
  minimum: numberInString;
}

export interface StakingProduct {
  projectId: string;
  detail: StakingProductDetail;
  quota: StakingProductQuota;
}

export interface StakingProductPosition {
  positionId: numberInString;
  projectId: string;
  asset: string;
  amount: numberInString;
  purchaseTime: numberInString;
  duration: numberInString;
  accrualDays: numberInString;
  rewardAsset: string;
  APY: numberInString;
  rewardAmt: numberInString;
  extraRewardAsset: string;
  extraRewardAPY: numberInString;
  estExtraRewardAmt: numberInString;
  nextInterestPay: numberInString;
  nextInterestPayDate: numberInString;
  payInterestPeriod: numberInString;
  redeemAmountEarly: numberInString;
  interestEndDate: numberInString;
  deliverDate: numberInString;
  redeemPeriod: numberInString;
  redeemingAmt: numberInString;
  partialAmtDeliverDate: numberInString;
  canRedeemEarly: boolean;
  renewable: boolean;
  type: string;
  status: StakingStatus;
}
export interface StakingBasicParams {
  product: StakingProductType;
  current?: number;
  size?: number;
}

export interface FlexibleSavingBasicParams {
  status?: string;
  featured?: number;
  current?: number;
  size?: number;
  asset?: string;
}

export interface FlexibleProductPositionParams {
  status?: string;
  featured?: number;
  current?: number;
  size?: number;
}

export interface PurchaseFlexibleProductParams {
  productId: string;
  amount: number;
}

export interface PurchaseFlexibleProductResponse {
  purchaseId: number;
}

export interface RedeemFlexibleProductParams {
  productId: string;
  amount: number;
  type: 'FAST' | 'NORMAL';
}

export interface LeftDailyPurchaseQuotaFlexibleProductResponse {
  asset: string;
  leftQuota: string;
}

export type ProjectStatus = 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
export type ProjectType = 'ACTIVITY' | 'CUSTOMIZED_FIXED';
export type ProjectSortBy =
  | 'START_TIME'
  | 'LOT_SIZE'
  | 'INTEREST_RATE'
  | 'DURATION';

export interface FixedAndActivityProjectParams {
  asset?: string;
  type: ProjectType;
  status?: ProjectStatus;
  isSortAsc?: boolean;
  sortBy?: ProjectSortBy;
  current?: number;
  size?: number;
}
export interface FixedAndActivityProjectPositionParams {
  asset?: string;
  projectId?: string;
  status?: StakingStatus;
}

export type LendingType = 'DAILY' | 'ACTIVITY' | 'CUSTOMIZED_FIXED';

export interface PurchaseRecordParams {
  lendingType: LendingType;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface NewFutureAccountTransferParams {
  asset: string;
  amount: number;
  type: 1 | 2 | 3 | 4;
}

export interface GetFutureAccountTransferHistoryParams {
  asset: string;
  startTime: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface FutureAccountTransfer {
  asset: string;
  tranId: number;
  amount: string;
  type: string;
  timestamp: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
}

export interface GetLoanCoinPaginatedHistoryParams {
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

/**
 *
 * STAKING
 *
 */

export interface StakingHistory {
  positionId: numberInString;
  time: number;
  asset: string;
  project?: string;
  amount: numberInString;
  lockPeriod?: numberInString;
  deliverDate?: numberInString;
  type?: string;
  status: string;
}

export interface StakingPersonalLeftQuota {
  leftPersonalQuota: numberInString;
}

export interface StakingHistoryParams extends StakingBasicParams {
  txnType: StakingTxnType;
  asset?: string;
  startTime?: number;
  endTime?: number;
}

export type StakingTxnType = 'SUBSCRIPTION' | 'REDEMPTION' | 'INTEREST';
export type StakingStatus = 'HOLDING' | 'REDEEMED';
export type StakingProductType = 'STAKING' | 'F_DEFI' | 'L_DEFI';
export type BSwapType = 'SINGLE' | 'COMBINATION';
export type BSwapOperationType = 'ADD' | 'REMOVE';

export interface BSwapOperationsParams {
  operationId?: number;
  poolId?: number;
  operation: BSwapOperationType;
  startTime?: number;
  endTime?: number;
  limit: number;
}

export interface BSwapOperations {
  operationId: number;
  poolId: number;
  poolName: string;
  operation: BSwapOperationType;
  status: number;
  updateTime: number;
  shareAmount: numberInString;
}
export interface RemoveBSwapLiquidityParams {
  poolId: number;
  type: BSwapType;
  asset?: string;
  shareAmount: number;
}

export interface AddBSwapLiquidityParams {
  poolId: number;
  type?: BSwapType;
  asset: string;
  quantity: number;
}

export interface BasicBSwapResp {
  operationId: number;
}

export interface BSwapShare {
  shareAmount: number;
  sharePercentage: number;
  asset: { [k: string]: number };
}

export interface BSwapLiquidity {
  poolId: number;
  poolNmae: string;
  updateTime: number;
  liquidity: { [k: string]: number };
  share: BSwapShare;
}
