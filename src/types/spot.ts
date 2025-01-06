import {
  ExchangeFilter,
  ExchangeSymbol,
  GenericCodeMsgError,
  numberInString,
  OCOOrderStatus,
  OCOStatus,
  OrderBookRow,
  OrderResponseType,
  OrderSide,
  OrderStatus,
  OrderTimeInForce,
  OrderType,
  RateLimiter,
  SelfTradePreventionMode,
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
  specialTips?: string;
  specialWithdrawTips?: string;
  unlockConfirm: number;
  withdrawDesc: string;
  withdrawEnable: boolean;
  withdrawFee: numberInString;
  withdrawMin: numberInString;
  withdrawMax: numberInString;
  withdrawInternalMin: numberInString;
  withdrawIntegerMultiple: numberInString;
  depositDust?: numberInString;
  sameAddress: boolean;
  estimatedArrivalTime: number;
  busy: boolean;
  contractAddressUrl?: string;
  contractAddress?: string;
}

export interface AllCoinsInformationResponse {
  coin: string;
  depositAllEnable: boolean;
  free: numberInString;
  freeze: numberInString;
  ipoable: numberInString;
  ipoing: numberInString;
  isLegalMoney: boolean;
  locked: numberInString;
  name: string;
  networkList: CoinNetwork[];
  storage: numberInString;
  trading: boolean;
  withdrawAllEnable: boolean;
  withdrawing: numberInString;
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
  WrongDeposit = 7,
  WaitingUserConfirm = 8,
  Success = 1,
  Rejected = 2,
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
  permissions?: string | string[];
  showPermissionSets?: boolean;
  symbolStatus?: string;
}

export interface NewSpotOrderParams<
  T extends OrderType = OrderType,
  RT extends OrderResponseType | undefined = OrderResponseType,
> {
  symbol: string;
  side: OrderSide;
  type: T;
  timeInForce?: OrderTimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string;
  strategyId?: number;
  strategyType?: number;
  stopPrice?: number;
  trailingDelta?: number;
  icebergQty?: number;
  newOrderRespType?: RT;
  isIsolated?: StringBoolean;
  sideEffectType?: SideEffects;
}

export type CancelRestrictions = 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
export type CancelReplaceMode = 'STOP_ON_FAILURE' | 'ALLOW_FAILURE';

export interface ReplaceSpotOrderParams<
  T extends OrderType = OrderType,
  RT extends OrderResponseType | undefined = OrderResponseType,
> extends NewSpotOrderParams<T, RT> {
  cancelReplaceMode: CancelReplaceMode;
  cancelNewClientOrderId?: string;
  cancelOrigClientOrderId?: string;
  cancelOrderId?: number;
  cancelRestrictions?: CancelRestrictions;
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
  selfTradePreventionMode?: SelfTradePreventionMode;
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
  enableFixApiTrade: boolean; //  Authorizes this key to use FIX API trading
  enableFixReadOnly: boolean; //  Authorizes this key to use FIX API reading
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
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
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
  defaultSelfTradePreventionMode: SelfTradePreventionMode;
  allowedSelfTradePreventionModes: SelfTradePreventionMode[];
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
  workingTime: number;
  selfTradePreventionMode: SelfTradePreventionMode;
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
  workingTime: number;
  selfTradePreventionMode: SelfTradePreventionMode;
  fills: OrderFill[];
}

export type OrderResponse =
  | OrderResponseACK
  | OrderResponseResult
  | OrderResponseFull;

export type OrderResponseTypeFor<
  RT extends OrderResponseType | undefined = undefined,
  T extends OrderType | undefined = undefined,
> = RT extends 'ACK'
  ? OrderResponseACK
  : RT extends 'RESULT'
    ? OrderResponseResult
    : RT extends 'FULL'
      ? OrderResponseFull
      : T extends 'MARKET' | 'LIMIT'
        ? OrderResponseFull
        : OrderResponseACK;

export interface OrderListOrder {
  symbol: string;
  orderId: number;
  clientOrderId: string;
}

export interface OrderListResponse<RT extends OrderResponseType = 'ACK'> {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: OCOStatus;
  listOrderStatus: OCOOrderStatus;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: [OrderListOrder, OrderListOrder];
  orderReports: [OrderResponseTypeFor<RT>, OrderResponseTypeFor<RT>];
}

export interface OrderList {
  orderListId: number;
  contingencyType: 'OCO';
  listStatusType: OCOStatus;
  listOrderStatus: OCOOrderStatus;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  orders: [OrderListOrder, OrderListOrder];
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

export interface CancelSpotOrderResult {
  symbol: string;
  origClientOrderId: string;
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
  isIsolated?: boolean;
  selfTradePreventionMode: SelfTradePreventionMode;
}

export interface CancelOrderListResult extends OrderList {
  orderReports: [CancelSpotOrderResult, CancelSpotOrderResult];
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
  extends GenericReplaceSpotOrderResult<GenericCodeMsgError, OrderResponse> {
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

export interface ReplaceSpotOrderResultSuccess<
  T extends OrderType = OrderType,
  RT extends OrderResponseType | undefined = OrderResponseType,
> extends GenericReplaceSpotOrderResult<
    CancelSpotOrderResult,
    OrderResponseTypeFor<RT, T>
  > {
  cancelResult: 'SUCCESS';
  newOrderResult: 'SUCCESS';
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
  isIsolated: StringBoolean;
  symbol: string;
  amount: number;
  type: 'BORROW' | 'REPAY';
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

export interface GetMarginAccountBorrowRepayRecordsParams {
  asset?: string;
  isolatedSymbol?: string;
  txId?: number;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
  type: 'BORROW' | 'REPAY';
}

export type LoanStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export interface MarginAccountRecord {
  isolatedSymbol?: string;
  asset: string;
  principal: numberInString;
  status: LoanStatus;
  timestamp: number;
  txId: number;
}

export interface QueryCrossMarginAccountDetailsParams {
  borrowEnabled: boolean;
  marginLevel: numberInString;
  totalAssetOfBtc: numberInString;
  totalLiabilityOfBtc: numberInString;
  totalNetAssetOfBtc: numberInString;
  tradeEnabled: boolean;
  transferEnabled: boolean;
  userAssets: MarginBalance[];
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

export interface EnableOrDisableIPRestrictionForSubAccountParams
  extends BasicSubAccount {
  ipAddress?: string;
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

export interface UpdateIpRestrictionForSubApiKey {
  subAccountId: string;
  ipAddress?: string;
  subAccountApiKey: string;
  status: string;
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

export interface AddIpRestriction extends BasicSubAccount {
  status: string;
  ipAddress: string;
}

export interface SubAccountEnableOrDisableIPRestriction {
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

export type StakingTxnType = 'SUBSCRIPTION' | 'REDEMPTION' | 'INTEREST';
export type StakingStatus = 'HOLDING' | 'REDEEMED';
export type StakingProductType = 'STAKING' | 'F_DEFI' | 'L_DEFI';
export type BSwapType = 'SINGLE' | 'COMBINATION';
export type BSwapOperationType = 'ADD' | 'REMOVE';

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
  autoSubscribe: boolean;
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

export interface FundingAsset {
  asset: string;
  free: string;
  locked: string;
  freeze: string;
  withdrawing: string;
  btcValuation: string;
}

export interface GetAssetParams {
  asset?: string;
  needBtcValuation?: boolean;
}

export interface UserAsset {
  asset: string;
  free: string;
  locked: string;
  freeze: string;
  withdrawing: string;
  ipoable: string;
  btcValuation: string;
}

export interface ConvertTransfer {
  clientTranId: string;
  asset: string;
  amount: number;
  targetAsset: string;
  accountType?: string;
}

export interface ConvertTransferResponse {
  tranId: number;
  status: string;
}

export interface GetConvertBUSDHistoryParams {
  tranId?: number;
  clientTranId?: string;
  asset?: string;
  startTime: number;
  endTime: number;
  accountType?: string;
  current?: number;
  size?: number;
}

export interface BUSDConversionRecord {
  tranId: number;
  type: number;
  time: number;
  deductedAsset: string;
  deductedAmount: string;
  targetAsset: string;
  targetAmount: string;
  status: string;
  accountType: string;
}

export interface CloudMiningHistoryParams {
  tranId?: number;
  clientTranId?: string;
  asset?: string;
  startTime: number;
  endTime: number;
  current?: number;
  size?: number;
}

export interface CloudMining {
  createTime: number;
  tranId: number;
  type: number;
  asset: string;
  amount: string;
  status: string;
}

export interface ConvertibleCoinsResponse {
  convertEnabled: boolean;
  coins: string[];
  exchangeRates: any;
}

export interface ConvertibleCoinsParams {
  coin: string;
  enable: boolean;
}

export interface SubmitDepositCreditParams {
  depositId?: number;
  txId?: string;
  subAccountId?: number;
  subUserId?: number;
}

export interface SubmitDepositCreditResponse {
  code: string;
  message: string;
  data: boolean;
  success: boolean;
}

export interface DepositAddressListParams {
  coin: string;
  network?: string;
  timestamp: number;
}

export interface DepositAddress {
  coin: string;
  address: string;
  tag: string;
  isDefault: number;
}

export interface WalletBalance {
  activate: boolean;
  balance: string;
  walletName: string;
}

export interface DelegationHistoryParams {
  email: string;
  startTime: number;
  endTime: number;
  type?: 'Delegate' | 'Undelegate';
  asset?: string;
  current?: number;
  size?: number;
}

export interface DelegationHistory {
  clientTranId: string;
  transferType: 'Delegate' | 'Undelegate';
  asset: string;
  amount: string;
  time: number;
}

export interface DelistScheduleResponse {
  delistTime: number;
  symbols: string[];
}

export interface WithdrawAddress {
  address: string;
  addressTag: string;
  coin: string;
  name: string;
  network: string;
  origin: string;
  originType: string;
  whiteStatus: boolean;
}

export interface AccountInfo {
  vipLevel: number;
  isMarginEnabled: boolean;
  isFutureEnabled: boolean;
  isOptionsEnabled: boolean;
  isPortfolioMarginRetailEnabled: boolean;
}

export interface ManagedSubAccountSnapshotParams {
  email: string;
  type: 'SPOT' | 'MARGIN' | 'FUTURES';
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface SubaccountBalances {
  asset: string;
  free: string;
  locked: string;
}

export interface SubaccountUserAssets {
  asset: string;
  borrowed: string;
  free: string;
  interest: string;
  locked: string;
  netAsset: string;
}

export interface SubaccountAssets {
  asset: string;
  marginBalance: string;
  walletBalance: string;
}

export interface SubaccountPosition {
  entryPrice: string;
  markPrice: string;
  positionAmt: string;
  symbol: string;
  unRealizedProfit: string;
}

export interface ManagedSubAccountSnapshot {
  code: number;
  msg: string;
  snapshotVos: {
    data: {
      balances?: SubaccountBalances[];
      totalAssetOfBtc?: string;
      marginLevel?: string;
      totalLiabilityOfBtc?: string;
      totalNetAssetOfBtc?: string;
      userAssets?: SubaccountUserAssets[];
      assets?: SubaccountAssets[];
      position?: SubaccountPosition[];
    };
    type: string;
    updateTime: number;
  }[];
}

export interface ManagedSubAccountTransferLogParams {
  email: string;
  startTime: number;
  endTime: number;
  page: number;
  limit: number;
  transfers?: 'from' | 'to';
  transferFunctionAccountType?:
    | 'SPOT'
    | 'MARGIN'
    | 'ISOLATED_MARGIN'
    | 'USDT_FUTURE'
    | 'COIN_FUTURE';
}

export interface ManagerSubTransferHistoryVos {
  fromEmail: string;
  fromAccountType: string;
  toEmail: string;
  toAccountType: string;
  asset: string;
  amount: string;
  scheduledData: number;
  createTime: number;
  status: string;
  tranId: number;
}

export interface ManagedSubAccountFuturesAssetsResponse {
  code: string;
  message: string;
  snapshotVos: {
    type: string;
    updateTime: number;
    data: {
      assets: SubaccountAssets[];
      position: SubaccountPosition[];
    };
  }[];
}

export interface ManagedSubAccountMarginAssetsResponse {
  marginLevel: string;
  totalAssetOfBtc: string;
  totalLiabilityOfBtc: string;
  totalNetAssetOfBtc: string;
  userAssets: SubaccountUserAssets[];
}

export interface ManagedSubAccountListParams {
  email?: string;
  page?: number;
  limit?: number;
}

export interface ManagerSubUserInfoVo {
  rootUserId: number;
  managersubUserId: number;
  bindParentUserId: number;
  email: string;
  insertTimeStamp: number;
  bindParentEmail: string;
  isSubUserEnabled: boolean;
  isUserActive: boolean;
  isMarginEnabled: boolean;
  isFutureEnabled: boolean;
  isSignedLVTRiskAgreement: boolean;
}

export interface SubaccountTradeInfoVos {
  userId: number;
  btc: number;
  btcFutures: number;
  btcMargin: number;
  busd: number;
  busdFutures: number;
  busdMargin: number;
  date: number;
}
export interface SubAccountTransactionStatistics {
  recent30BtcTotal: string;
  recent30BtcFuturesTotal: string;
  recent30BtcMarginTotal: string;
  recent30BusdTotal: string;
  recent30BusdFuturesTotal: string;
  recent30BusdMarginTotal: string;
  tradeInfoVos: SubaccountTradeInfoVos[];
}

export interface ManagedSubAccountDepositAddressParams {
  email: string;
  coin: string;
  network?: string;
}

export interface ManagedSubAccountDepositAddress {
  coin: string;
  address: string;
  tag: string;
  url: string;
}

export interface EnableOptionsForSubAccountResponse {
  email: string;
  isEOptionsEnabled: boolean;
}

export interface ManagedSubAccountTransferTTLogParams {
  startTime: number;
  endTime: number;
  page: number;
  limit: number;
  transfers?: string;
  transferFunctionAccountType?: string;
}

export interface UIKlinesParams {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface TradingDayTickerParams {
  symbol?: string;
  symbols?: string[];
  timeZone?: string;
  type?: 'FULL' | 'MINI';
}

export type TradingDayTickerFull = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

export interface TradingDayTickerMini {
  symbol: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface RollingWindowTickerParams {
  symbol?: string;
  symbols?: string[];
  windowSize?: string;
  type?: 'FULL' | 'MINI';
}

export interface NewOrderListOTOParams {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'FULL' | 'RESULT';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: string;
  workingQuantity: string;
  workingIcebergQty?: string;
  workingTimeInForce?: 'FOK' | 'IOC' | 'GTC';
  workingStrategyId?: number;
  workingStrategyType?: number;
  pendingType: string;
  pendingSide: 'BUY' | 'SELL';
  pendingClientOrderId?: string;
  pendingPrice?: string;
  pendingStopPrice?: string;
  pendingTrailingDelta?: string;
  pendingQuantity: string;
  pendingIcebergQty?: string;
  pendingTimeInForce?: 'GTC' | 'FOK' | 'IOC';
  pendingStrategyId?: number;
  pendingStrategyType?: number;
}

export interface NewOrderListOTOResponse {
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
  orderReports: {
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
    side: string;
    workingTime: number;
    selfTradePreventionMode: string;
  }[];
}

export interface NewOrderListOTOCOParams {
  symbol: string;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'FULL' | 'RESPONSE';
  selfTradePreventionMode?: string;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: string;
  workingQuantity: string;
  workingIcebergQty?: string;
  workingTimeInForce?: 'GTC' | 'IOC' | 'FOK';
  workingStrategyId?: number;
  workingStrategyType?: number;
  pendingSide: 'BUY' | 'SELL';
  pendingQuantity: string;
  pendingAboveType: 'LIMIT_MAKER' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT';
  pendingAboveClientOrderId?: string;
  pendingAbovePrice?: string;
  pendingAboveStopPrice?: string;
  pendingAboveTrailingDelta?: string;
  pendingAboveIcebergQty?: string;
  pendingAboveTimeInForce?: 'GTC' | 'FOK' | 'IOC';
  pendingAboveStrategyId?: number;
  pendingAboveStrategyType?: number;
  pendingBelowType: 'LIMIT_MAKER' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT';
  pendingBelowClientOrderId?: string;
  pendingBelowPrice?: string;
  pendingBelowStopPrice?: string;
  pendingBelowTrailingDelta?: string;
  pendingBelowIcebergQty?: string;
  pendingBelowTimeInForce?: 'GTC' | 'FOK' | 'IOC';
  pendingBelowStrategyId?: number;
  pendingBelowStrategyType?: number;
}

export interface NewOrderListOTOCOResponse {
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
  orderReports: {
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
    side: string;
    stopPrice?: string;
    workingTime: number;
    selfTradePreventionMode: string;
  }[];
}

export interface OrderRateLimitUsage {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
  count: number;
}

export interface PreventedMatchesParams {
  symbol: string;
  preventedMatchId?: number;
  orderId?: number;
  fromPreventedMatchId?: number;
  limit?: number;
}

export interface PreventedMatch {
  symbol: string;
  preventedMatchId: number;
  takerOrderId: number;
  makerOrderId: number;
  tradeGroupId: number;
  selfTradePreventionMode: string;
  price: string;
  makerPreventedQuantity: string;
  transactTime: number;
}

export interface AllocationsParams {
  symbol: string;
  startTime?: number;
  endTime?: number;
  fromAllocationId?: number;
  limit?: number;
  orderId?: number;
}

export interface CommissionRates {
  symbol: string;
  standardCommission: {
    maker: string;
    taker: string;
    buyer: string;
    seller: string;
  };
  taxCommission: {
    maker: string;
    taker: string;
    buyer: string;
    seller: string;
  };
  discount: {
    enabledForAccount: boolean;
    enabledForSymbol: boolean;
    discountAsset: string;
    discount: string;
  };
}

export interface GetCrossMarginTransferHistoryParams {
  asset?: string;
  type?: 'ROLL_IN' | 'ROLL_OUT';
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
  isolatedSymbol?: string;
}

export interface CrossMarginTransferHistory {
  amount: string;
  asset: string;
  status: string;
  timestamp: number;
  txId: number;
  type: 'ROLL_IN' | 'ROLL_OUT';
  transFrom?: string;
  transTo?: string;
  fromSymbol?: string;
  toSymbol?: string;
}

export interface GetMarginInterestHistoryParams {
  asset?: string;
  isolatedSymbol?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface MarginInterestHistory {
  txId: number;
  interestAccuredTime: number;
  asset: string;
  rawAsset?: string;
  principal: string;
  interest: string;
  interestRate: string;
  type:
    | 'PERIODIC'
    | 'ON_BORROW'
    | 'PERIODIC_CONVERTED'
    | 'ON_BORROW_CONVERTED'
    | 'PORTFOLIO';
  isolatedSymbol?: string;
}

export interface GetForceLiquidationRecordParams {
  startTime?: number;
  endTime?: number;
  isolatedSymbol?: string;
  current?: number;
  size?: number;
}

export interface ForceLiquidationRecord {
  avgPrice: string;
  executedQty: string;
  orderId: number;
  price: string;
  qty: string;
  side: 'BUY' | 'SELL';
  symbol: string;
  timeInForce: string;
  isIsolated: boolean;
  updatedTime: number;
}

export interface QueryMarginAccountAllOCOParams {
  isIsolated?: 'TRUE' | 'FALSE';
  symbol?: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface QueryMarginAccountTradeListParams {
  symbol: string;
  isIsolated?: 'TRUE' | 'FALSE';
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface IsolatedMarginSymbol {
  base: string;
  isBuyAllowed: boolean;
  isMarginTrade: boolean;
  isSellAllowed: boolean;
  quote: string;
  symbol: string;
  delistTime?: number;
}

export interface ToggleBNBBurnParams {
  spotBNBBurn?: 'true' | 'false';
  interestBNBBurn?: 'true' | 'false';
}

export interface BNBBurnResponse {
  spotBNBBurn: boolean;
  interestBNBBurn: boolean;
}

export interface QueryMarginInterestRateHistoryParams {
  asset: string;
  vipLevel?: number;
  startTime?: number;
  endTime?: number;
}

export interface MarginInterestRateHistory {
  asset: string;
  dailyInterestRate: string;
  timestamp: number;
  vipLevel: number;
}

export interface QueryCrossMarginFeeDataParams {
  vipLevel?: number;
  coin?: string;
}

export interface CrossMarginFeeData {
  vipLevel: number;
  coin: string;
  transferIn: boolean;
  borrowable: boolean;
  dailyInterest: string;
  yearlyInterest: string;
  borrowLimit: string;
  marginablePairs: string[];
}

export interface IsolatedMarginFeeData {
  vipLevel: number;
  symbol: string;
  leverage: string;
  data: {
    coin: string;
    dailyInterest: string;
    borrowLimit: string;
  }[];
}

export interface QueryIsolatedMarginTierDataParams {
  symbol: string;
  tier?: number;
}

export interface IsolatedMarginTierData {
  symbol: string;
  tier: number;
  effectiveMultiple: string;
  initialRiskRatio: string;
  liquidationRiskRatio: string;
  baseAssetMaxBorrowable: string;
  quoteAssetMaxBorrowable: string;
}

export interface GetMarginOrderCountUsageParams {
  isIsolated?: string;
  symbol?: string;
}

export interface MarginOrderCountUsageResponse {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
  count: number;
}

export interface Collateral {
  minUsdValue: string;
  maxUsdValue?: string;
  discountRate: string;
}

export interface SmallLiabilityExchangeCoin {
  asset: string;
  interest: string;
  principal: string;
  liabilityAsset: string;
  liabilityQty: number;
}
export interface GetSmallLiabilityExchangeHistoryParams {
  current: number;
  size: number;
  startTime?: number;
  endTime?: number;
}

export interface SmallLiabilityExchangeHistory {
  asset: string;
  amount: string;
  targetAsset: string;
  targetAmount: string;
  bizType: string;
  timestamp: number;
}

export interface GetNextHourlyInterestRateParams {
  assets: string;
  isIsolated: boolean;
}

export interface NextHourlyInterestRate {
  asset: string;
  nextHourlyInterestRate: string;
}

export interface GetMarginCapitalFlowParams {
  asset?: string;
  symbol?: string;
  type?: string;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface MarginCapitalFlow {
  id: number;
  tranId: number;
  timestamp: number;
  asset: string;
  symbol: string;
  type: string;
  amount: string;
}

export interface MarginDelistSchedule {
  delistTime: number;
  crossMarginAssets: string[];
  isolatedMarginSymbols: string[];
  updateTime: number;
}

export interface MarginAvailableInventoryResponse {
  assets: any;
  updateTime: number;
}

export interface ManualLiquidationParams {
  type: string;
  symbol?: string;
}

export interface ManualLiquidationResponse {
  asset: string;
  interest: string;
  principal: string;
  liabilityAsset: string;
  liabilityQty: number;
}

export interface LeverageBracket {
  leverage: number;
  maxDebt: number;
  maintenanceMarginRate: number;
  initialMarginRate: number;
  fastNum: number;
}

export interface LiabilityCoinLeverageBracket {
  assetNames: string[];
  rank: number;
  brackets: LeverageBracket[];
}
export interface GetFlexibleSubscriptionRecordParams {
  productId?: string;
  purchaseId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface GetFlexibleSubscriptionRecordResponse {
  amount: string;
  asset: string;
  time: number;
  purchaseId: number;
  type: string;
  sourceAccount: string;
  amtFromSpot?: string;
  amtFromFunding?: string;
  status: string;
}

export interface GetLockedSubscriptionRecordParams {
  purchaseId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface LockedSubscriptionRecord {
  positionId: string;
  purchaseId: number;
  time: number;
  asset: string;
  amount: string;
  lockPeriod: string;
  type: string;
  sourceAccount: string;
  amtFromSpot?: string;
  amtFromFunding?: string;
  status: string;
}

export interface GetFlexibleRedemptionRecordParams {
  productId?: string;
  redeemId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface FlexibleRedemptionRecord {
  amount: string;
  asset: string;
  time: number;
  productId: string;
  redeemId: number;
  destAccount: string;
  status: string;
}

export interface GetLockedRedemptionRecordParams {
  positionId?: string;
  redeemId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface LockedRedemptionRecord {
  positionId: string;
  redeemId: number;
  time: number;
  asset: string;
  lockPeriod: string;
  amount: string;
  type: string;
  deliverDate: string;
  status: string;
}

export interface GetFlexibleRewardsHistoryParams {
  productId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  type: 'BONUS' | 'REALTIME' | 'REWARDS' | 'ALL';
  current?: number;
  size?: number;
}

export interface FlexibleRewardsHistory {
  asset: string;
  rewards: string;
  projectId: string;
  type: string;
  time: number;
}

export interface GetLockedRewardsHistoryParams {
  positionId?: string;
  asset?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface GetLockedRewardsHistory {
  positionId: string;
  time: number;
  asset: string;
  lockPeriod: string;
  amount: string;
}

export interface SetAutoSubscribeParams {
  productId: string;
  autoSubscribe: boolean;
}

export interface GetFlexibleSubscriptionPreviewParams {
  productId: string;
  amount: number;
}

export interface FlexibleSubscriptionPreview {
  totalAmount: string;
  rewardAsset: string;
  airDropAsset: string;
  estDailyBonusRewards: string;
  estDailyRealTimeRewards: string;
  estDailyAirdropRewards: string;
}

export interface GetLockedSubscriptionPreviewParams {
  projectId: string;
  amount: number;
  autoSubscribe?: boolean;
}

export interface LockedSubscriptionPreview {
  rewardAsset: string;
  totalRewardAmt: string;
  extraRewardAsset: string;
  estTotalExtraRewardAmt: string;
  nextPay: string;
  nextPayDate: string;
  valueDate: string;
  rewardsEndDate: string;
  deliverDate: string;
  nextSubscriptionDate: string;
}

export interface GetRateHistoryParams {
  productId: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface GetRateHistory {
  productId: string;
  asset: string;
  annualPercentageRate: string;
  time: number;
}

export interface GetCollateralRecordParams {
  productId?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface CollateralRecord {
  amount: string;
  productId: string;
  asset: string;
  createTime: number;
  type: string;
  productName: string;
  orderId: number;
}

export interface GetDualInvestmentProductListParams {
  optionType: string;
  exercisedCoin: string;
  investCoin: string;
  pageSize?: number;
  pageIndex?: number;
}

export interface DualInvestmentProduct {
  id: string;
  investCoin: string;
  exercisedCoin: string;
  strikePrice: string;
  duration: number;
  settleDate: number;
  purchaseDecimal: number;
  purchaseEndTime: number;
  canPurchase: boolean;
  apr: string;
  orderId: number;
  minAmount: string;
  maxAmount: string;
  createTimestamp: number;
  optionType: string;
  isAutoCompoundEnable: boolean;
  autoCompoundPlanList: string[];
}

export interface SubscribeDualInvestmentProductParams {
  id: string;
  orderId: string;
  depositAmount: number;
  autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCED';
}

export interface SubscribeDualInvestmentProductResponse {
  positionId: number;
  investCoin: string;
  exercisedCoin: string;
  subscriptionAmount: string;
  duration: number;
  autoCompoundPlan?: 'STANDARD' | 'ADVANCED';
  strikePrice: string;
  settleDate: number;
  purchaseStatus: string;
  apr: string;
  orderId: number;
  purchaseTime: number;
  optionType: string;
}

export interface GetDualInvestmentPositionsParams {
  status?:
    | 'PENDING'
    | 'PURCHASE_SUCCESS'
    | 'SETTLED'
    | 'PURCHASE_FAIL'
    | 'REFUNDING'
    | 'REFUND_SUCCESS'
    | 'SETTLING';
  pageSize?: number;
  pageIndex?: number;
}

export interface DualInvestmentPosition {
  id: string;
  investCoin: string;
  exercisedCoin: string;
  subscriptionAmount: string;
  strikePrice: string;
  duration: number;
  settleDate: number;
  purchaseStatus: string;
  apr: string;
  orderId: number;
  purchaseEndTime: number;
  optionType: string;
  autoCompoundPlan: 'STANDARD' | 'ADVANCED' | 'NONE';
  settlePrice?: string;
  isExercised?: boolean;
  settleAsset?: string;
  settleAmount?: string;
}

export interface CheckDualInvestmentAccountsResponse {
  totalAmountInBTC: string;
  totalAmountInUSDT: string;
}

export interface ChangeAutoCompoundStatusParams {
  positionId: string;
  autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCED';
}

export interface ChangeAutoCompoundStatusResponse {
  positionId: string;
  autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCED';
}

export interface GetTargetAssetListParams {
  targetAsset?: string;
  size?: number;
  current?: number;
}

export interface RoiAndDimensionType {
  simulateRoi: string;
  dimensionValue: string;
  dimensionUnit: string;
}

export interface AutoInvestAsset {
  targetAsset: string;
  roiAndDimensionTypeList: RoiAndDimensionType[];
}

export interface GetTargetAssetListResponse {
  targetAssets: string[];
  autoInvestAssetList: AutoInvestAsset[];
}

export interface GetTargetAssetROIParams {
  targetAsset: string;
  hisRoiType:
    | 'FIVE_YEAR'
    | 'THREE_YEAR'
    | 'ONE_YEAR'
    | 'SIX_MONTH'
    | 'THREE_MONTH'
    | 'SEVEN_DAY';
}

export interface TargetAssetROI {
  date: string;
  simulateRoi: string;
}

export interface GetSourceAssetListParams {
  targetAsset?: string[];
  indexId?: number;
  usageType: 'RECURRING' | 'ONE_TIME';
  flexibleAllowedToUse?: boolean;
  sourceType?: 'MAIN_SITE' | 'TR';
}

export interface SourceAsset {
  sourceAsset: string;
  assetMinAmount: string;
  assetMaxAmount: string;
  scale: string;
  flexibleAmount: string;
}

export interface GetSourceAssetListResponse {
  feeRate: string;
  taxRate: string;
  sourceAssets: SourceAsset[];
}

export interface AutoInvestPortfolioDetail {
  targetAsset: string;
  percentage: number;
}

export interface CreateInvestmentPlanParams {
  UID: string;
  sourceType: 'MAIN_SITE' | 'TR';
  requestId?: string;
  planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
  indexId?: number;
  subscriptionAmount: number;
  subscriptionCycle:
    | 'H1'
    | 'H4'
    | 'H8'
    | 'H12'
    | 'WEEKLY'
    | 'DAILY'
    | 'MONTHLY'
    | 'BI_WEEKLY';
  subscriptionStartDay?: number;
  subscriptionStartWeekday?:
    | 'MON'
    | 'TUE'
    | 'WED'
    | 'THU'
    | 'FRI'
    | 'SAT'
    | 'SUN';
  subscriptionStartTime: number;
  sourceAsset: string;
  flexibleAllowedToUse: boolean;
  details: AutoInvestPortfolioDetail[];
}

export interface CreateInvestmentPlanResponse {
  planId: number;
  nextExecutionDateTime: number;
}

export interface EditInvestmentPlanParams {
  planId: number;
  subscriptionAmount: number;
  subscriptionCycle:
    | 'H1'
    | 'H4'
    | 'H8'
    | 'H12'
    | 'WEEKLY'
    | 'DAILY'
    | 'MONTHLY'
    | 'BI_WEEKLY';
  subscriptionStartDay?: number;
  subscriptionStartWeekday?:
    | 'MON'
    | 'TUE'
    | 'WED'
    | 'THU'
    | 'FRI'
    | 'SAT'
    | 'SUN';
  subscriptionStartTime: number;
  sourceAsset: string;
  flexibleAllowedToUse?: boolean;
  details: AutoInvestPortfolioDetail[];
}

export interface EditInvestmentPlanResponse {
  planId: number;
  nextExecutionDateTime: number;
}

export interface ChangePlanStatusParams {
  planId: number;
  status: 'ONGOING' | 'PAUSED' | 'REMOVED';
}

export interface ChangePlanStatusResponse {
  planId: number;
  nextExecutionDateTime: number;
  status: 'ONGOING' | 'PAUSED' | 'REMOVED';
}

export interface GetPlanDetailsParams {
  planId?: number;
  requestId?: string;
}

export interface GetSubscriptionTransactionHistoryParams {
  planId?: number;
  startTime?: number;
  endTime?: number;
  targetAsset?: string;
  planType?: 'SINGLE' | 'PORTFOLIO' | 'INDEX' | 'ALL';
  size?: number;
  current?: number;
}

export interface AssetAllocation {
  targetAsset: string;
  allocation: string;
}

export interface GetIndexDetailsResponse {
  indexId: number;
  indexName: string;
  status: 'RUNNING' | 'REBALANCING' | 'PAUSED';
  assetAllocation: AssetAllocation[];
}

export interface IndexLinkedPlanDetail {
  targetAsset: string;
  averagePriceInUSD: string;
  totalInvestedInUSD: string;
  currentInvestedInUSD: string;
  purchasedAmount: string;
  pnlInUSD: string;
  roi: string;
  percentage: string;
  availableAmount: string;
  redeemedAmount: string;
  assetValueInUSD: string;
}

export interface GetIndexLinkedPlanPositionDetailsResponse {
  indexId: number;
  totalInvestedInUSD: string;
  currentInvestedInUSD: string;
  pnlInUSD: string;
  roi: string;
  assetAllocation: { targetAsset: string; allocation: string }[];
  details: IndexLinkedPlanDetail[];
}

export interface SubmitOneTimeTransactionParams {
  sourceType: 'MAIN_SITE' | 'TR';
  requestId?: string;
  subscriptionAmount: number;
  sourceAsset: string;
  flexibleAllowedToUse?: boolean;
  planId?: number;
  indexId?: number;
  details: AutoInvestPortfolioDetail[];
}

export interface SubmitOneTimeTransactionResponse {
  transactionId: number;
  waitSecond: number;
}

export interface GetOneTimeTransactionStatusParams {
  transactionId: number;
  requestId?: string;
}

export interface GetOneTimeTransactionStatusResponse {
  transactionId: number;
  status: 'SUCCESS' | 'CONVERTING';
}

export interface SubmitIndexLinkedPlanRedemptionParams {
  indexId: number;
  requestId?: string;
  redemptionPercentage: number;
}

export interface GetIndexLinkedPlanRedemptionHistoryParams {
  requestId: number;
  startTime?: number;
  endTime?: number;
  current?: number;
  asset?: string;
  size?: number;
}

export interface IndexLinkedPlanRedemptionRecord {
  indexId: number;
  indexName: string;
  redemptionId: number;
  status: 'SUCCESS' | 'FAILED';
  asset: string;
  amount: string;
  redemptionDateTime: number;
  transactionFee: string;
  transactionFeeUnit: string;
}

export interface GetIndexLinkedPlanRebalanceHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface RebalanceTransactionDetail {
  asset: string;
  transactionDateTime: number;
  rebalanceDirection: 'BUY' | 'SELL';
  rebalanceAmount: string;
}

export interface IndexLinkedPlanRebalanceRecord {
  indexId: number;
  indexName: string;
  rebalanceId: number;
  status: 'SUCCESS' | 'INIT';
  rebalanceFee: string;
  rebalanceFeeUnit: string;
  transactionDetails: RebalanceTransactionDetail[];
}

export interface SubscribeEthStakingV2Response {
  success: boolean;
  wbethAmount: string;
  conversionRatio: string;
}

export interface RedeemEthParams {
  asset?: string;
  amount: number;
}

export interface RedeemEthResponse {
  success: boolean;
  arrivalTime: number;
  ethAmount: string;
  conversionRatio: string;
}

export interface GetEthStakingHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface EthStakingHistory {
  time: number;
  asset: string;
  amount: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  distributeAmount: string;
  conversionRatio: string;
}

export interface GetEthRedemptionHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface EthRedemptionHistory {
  time: number;
  arrivalTime: number;
  asset: string;
  amount: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  distributeAsset: string;
  distributeAmount: string;
  conversionRatio: string;
}

export interface GetBethRewardsHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface BethRewardsHistory {
  time: number;
  asset: string;
  holding: string;
  amount: string;
  annualPercentageRate: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export interface GetEthStakingQuotaResponse {
  leftStakingPersonalQuota: string;
  leftRedemptionPersonalQuota: string;
}

export interface GetETHRateHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface ETHRateHistory {
  annualPercentageRate: string;
  exchangeRate: string;
  time: number;
}

export interface GetEthStakingAccountResponse {
  cumulativeProfitInBETH: string;
  lastDayProfitInBETH: string;
}

export interface GetEthStakingAccountV2Response {
  holdingInETH: string;
  holdings: {
    wbethAmount: string;
    bethAmount: string;
  };
  thirtyDaysProfitInETH: string;
  profit: {
    amountFromWBETH: string;
    amountFromBETH: string;
  };
}

export interface WrapBethResponse {
  success: boolean;
  wbethAmount: string;
  exchangeRate: string;
}

export interface GetWrapHistoryParams {
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface WrapHistory {
  time: number;
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
  toAmount: string;
  exchangeRate: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export interface WbethRewardsHistory {
  time: number;
  amountInETH: string;
  holding: string;
  holdingInETH: string;
  annualPercentageRate: string;
}

export interface GetWbethRewardsHistoryResponse {
  estRewardsInETH: string;
  rows: WbethRewardsHistory[];
  total: number;
}

export interface GetMiningAlgoListResponse {
  algoName: string; // Algorithm name
  algoId: number; // Algorithm ID
  poolIndex: number; // Sequence
  unit: string; // Unit
}

export interface GetMiningCoinListResponse {
  coinName: string; // Coin name
  coinId: number; // Coin ID
  poolIndex: number; // Sequence
  unit: string; // Unit
}

export interface GetMinerDetailsParams {
  algo: string;
  userName: string;
  workerName: string;
}

export interface HashrateData {
  time: number;
  hashrate: string;
  reject: number;
}

export interface MinerDetail {
  workerName: string;
  type: string;
  hashrateDatas: HashrateData[];
}

export interface GetMinerDetailsResponse {
  code: number;
  msg: string;
  data: MinerDetail[];
}

export interface GetMinerListParams {
  algo: string;
  userName: string;
  pageIndex?: number;
  sort?: number;
  sortColumn?: number;
  workerStatus?: number;
}

export interface WorkerData {
  workerId: string;
  workerName: string;
  status: number;
  hashRate: number;
  dayHashRate: number;
  rejectRate: number;
  lastShareTime: number;
}

export interface GetMinerListResponse {
  code: number;
  msg: string;
  data: {
    workerDatas: WorkerData[];
    totalNum: number;
    pageSize: number;
  };
}

export interface GetEarningsListParams {
  algo: string;
  userName: string;
  coin?: string;
  startDate?: number;
  endDate?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface AccountEarningsProfit {
  time: number;
  type: number;
  hashTransfer: number | null;
  transferAmount: number | null;
  dayHashRate: number;
  profitAmount: number;
  coinName: string;
  status: number;
}

export interface GetEarningsListResponse {
  code: number;
  msg: string;
  data: {
    accountProfits: AccountEarningsProfit[];
    totalNum: number;
    pageSize: number;
  };
}

export interface GetExtraBonusListParams {
  algo: string;
  userName: string;
  coin?: string;
  startDate?: number;
  endDate?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface OtherProfit {
  time: number;
  coinName: string;
  type: number;
  profitAmount: number;
  status: number;
}

export interface GetExtraBonusListResponse {
  code: number;
  msg: string;
  data: {
    otherProfits: OtherProfit[];
    totalNum: number;
    pageSize: number;
  };
}

export interface GetHashrateResaleListParams {
  pageIndex?: number;
  pageSize?: number;
}

export interface ConfigDetail {
  configId: number;
  poolUsername: string;
  toPoolUsername: string;
  algoName: string;
  hashRate: number;
  startDay: number;
  endDay: number;
  status: number;
}

export interface GetHashrateResaleListResponse {
  code: number;
  msg: string;
  data: {
    configDetails: ConfigDetail[];
    totalNum: number;
    pageSize: number;
  };
}

export interface GetHashrateResaleDetailParams {
  configId: number;
  userName: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface ProfitTransferDetail {
  poolUsername: string;
  toPoolUsername: string;
  algoName: string;
  hashRate: number;
  day: number;
  amount: number;
  coinName: string;
}

export interface GetHashrateResaleDetailResponse {
  code: number;
  msg: string;
  data: {
    profitTransferDetails: ProfitTransferDetail[];
    totalNum: number;
    pageSize: number;
  };
}
export interface SubmitHashrateResaleParams {
  userName: string;
  algo: string;
  endDate: number;
  startDate: number;
  toPoolUser: string;
  hashRate: number;
}

export interface CancelHashrateResaleConfigParams {
  configId: number;
  userName: string;
}

export interface GetStatisticListParams {
  algo: string;
  userName: string;
}

export interface Profit {
  BTC: string;
  BSV: string;
  BCH: string;
}

export interface GetStatisticListResponse {
  code: number;
  msg: string;
  data: {
    fifteenMinHashRate: string;
    dayHashRate: string;
    validNum: number;
    invalidNum: number;
    profitToday: Profit;
    profitYesterday: Profit;
    userName: string;
    unit: string;
    algo: string;
  };
}

export interface getMiningAccountsListParams {
  algo: string;
  userName: string;
}

export interface MiningHashrateData {
  time: number;
  hashrate: string;
  reject: string;
}

export interface MiningAccountData {
  type: string;
  userName: string;
  list: MiningHashrateData[];
}

export interface getMiningAccountsListResponse {
  code: number;
  msg: string;
  data: MiningAccountData[];
}

export interface GetMiningAccountEarningParams {
  algo: string;
  startDate?: number;
  endDate?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface AccountMiningProfit {
  time: number;
  coinName: string;
  type: number;
  puid: number;
  subName: string;
  amount: number;
}

export interface GetMiningAccountEarningResponse {
  code: number;
  msg: string;
  data: {
    accountProfits: AccountMiningProfit[];
    totalNum: number;
    pageSize: number;
  };
}

export interface GetFutureTickLevelOrderbookDataLinkParams {
  symbol: string;
  dataType: 'T_DEPTH' | 'S_DEPTH';
  startTime: number;
  endTime: number;
}

export interface HistoricalDataLink {
  day: string;
  url: string;
}

export interface SubmitVpNewOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  quantity: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  clientAlgoId?: string;
  reduceOnly?: boolean;
  limitPrice?: number;
}

export interface SubmitVpNewOrderResponse {
  clientAlgoId: string;
  success: boolean;
  code: number;
  msg: string;
}

export interface SubmitTwapNewOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: 'BOTH' | 'LONG' | 'SHORT';
  quantity: number;
  duration: number;
  clientAlgoId?: string;
  reduceOnly?: boolean;
  limitPrice?: number;
}

export interface SubmitTwapNewOrderResponse {
  clientAlgoId: string;
  success: boolean;
  code: number;
  msg: string;
}

export interface CancelAlgoOrderResponse {
  algoId: number;
  success: boolean;
  code: number;
  msg: string;
}

export interface AlgoOrder {
  algoId: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  totalQty: string;
  executedQty: string;
  executedAmt: string;
  avgPrice: string;
  clientAlgoId: string;
  bookTime: number;
  endTime: number;
  algoStatus: string;
  algoType: string;
  urgency: string;
}

export interface GetAlgoHistoricalOrdersParams {
  symbol?: string;
  side?: 'BUY' | 'SELL';
  startTime?: number;
  endTime?: number;
  page?: number;
  pageSize?: number;
}

export interface HistoricalAlgoOrder {
  algoId: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide: 'BOTH' | 'LONG' | 'SHORT';
  totalQty: string;
  executedQty: string;
  executedAmt: string;
  avgPrice: string;
  clientAlgoId: string;
  bookTime: number;
  endTime: number;
  algoStatus: string;
  algoType: string;
  urgency: string;
}

export interface GetAlgoSubOrdersParams {
  algoId: number;
  page?: number;
  pageSize?: number;
}

export interface SubOrder {
  algoId: number;
  orderId: number;
  orderStatus: string;
  executedQty: string;
  executedAmt: string;
  feeAmt: string;
  feeAsset: string;
  bookTime: number;
  avgPrice: string;
  side: 'BUY' | 'SELL';
  symbol: string;
  subId: number;
  timeInForce: string;
  origQty: string;
}

export interface GetAlgoSubOrdersResponse {
  total: number;
  executedQty: string;
  executedAmt: string;
  subOrders: SubOrder[];
}

export interface SubmitSpotTwapNewOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  duration: number;
  clientAlgoId?: string;
  limitPrice?: number;
  stpMode?: 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
}

export interface SubmitSpotTwapNewOrderResponse {
  clientAlgoId: string;
  success: boolean;
  code: number;
  msg: string;
}

export interface CancelSpotAlgoOrderResponse {
  algoId: number;
  success: boolean;
  code: number;
  msg: string;
}

export interface SpotAlgoOrder {
  algoId: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  totalQty: string;
  executedQty: string;
  executedAmt: string;
  avgPrice: string;
  clientAlgoId: string;
  bookTime: number;
  endTime: number;
  algoStatus: string;
  algoType: string;
  urgency: string;
}

export interface GetSpotAlgoHistoricalOrdersParams {
  symbol?: string;
  side?: 'BUY' | 'SELL';
  startTime?: number;
  endTime?: number;
  page?: number;
  pageSize?: number;
}

export interface HistoricalSpotAlgoOrder {
  algoId: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  totalQty: string;
  executedQty: string;
  executedAmt: string;
  avgPrice: string;
  clientAlgoId: string;
  bookTime: number;
  endTime: number;
  algoStatus: string;
  algoType: string;
  urgency: string;
}

export interface GetSpotAlgoSubOrdersParams {
  algoId: number;
  page?: number;
  pageSize?: number;
}

export interface SpotSubOrder {
  algoId: number;
  orderId: number;
  orderStatus: string;
  executedQty: string;
  executedAmt: string;
  feeAmt: string;
  feeAsset: string;
  bookTime: number;
  avgPrice: string;
  side: 'BUY' | 'SELL';
  symbol: string;
  subId: number;
  timeInForce: string;
  origQty: string;
}

export interface GetSpotAlgoSubOrdersResponse {
  total: number;
  executedQty: string;
  executedAmt: string;
  subOrders: SpotSubOrder[];
}

export interface GetPortfolioMarginProAccountInfoResponse {
  uniMMR: string;
  accountEquity: string;
  actualEquity: string;
  accountMaintMargin: string;
  accountStatus: string;
  accountType: string;
}

export interface GetPortfolioMarginProCollateralRateResponse {
  asset: string;
  collateralRate: string;
}

export interface GetPortfolioMarginProBankruptcyLoanAmountResponse {
  asset: string;
  amount: string;
}

export interface GetPortfolioMarginProInterestHistoryParams {
  asset?: string;
  startTime?: number;
  endTime?: number;
  size?: number;
}

export interface GetPortfolioMarginProInterestHistoryResponse {
  asset: string;
  interest: string;
  interestAccruedTime: number;
  interestRate: string;
  principal: string;
}

export interface GetPortfolioMarginAssetIndexPriceResponse {
  asset: string;
  assetIndexPrice: string;
  time: number;
}

export interface BnbTransferParams {
  amount: number;
  transferSide: 'TO_UM' | 'FROM_UM';
}

export interface GetPortfolioMarginAssetLeverageResponse {
  asset: string;
  leverage: number;
}

export interface SubscribeBlvtParams {
  tokenName: string;
  cost: number;
}

export interface SubscribeBlvtResponse {
  id: number;
  status: 'S' | 'P' | 'F';
  tokenName: string;
  amount: string;
  cost: string;
  timestamp: number;
}

export interface GetBlvtSubscriptionRecordParams {
  tokenName?: string;
  id?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface BlvtSubscriptionRecord {
  id: number;
  tokenName: string;
  amount: string;
  nav: string;
  fee: string;
  totalCharge: string;
  timestamp: number;
}

export interface RedeemBlvtParams {
  tokenName: string;
  amount: number;
}

export interface RedeemBlvtResponse {
  id: number;
  status: 'S' | 'P' | 'F';
  tokenName: string;
  redeemAmount: string;
  amount: string;
  timestamp: number;
}

export interface GetBlvtRedemptionRecordParams {
  tokenName?: string;
  id?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface BlvtRedemptionRecord {
  id: number;
  tokenName: string;
  amount: string;
  nav: string;
  fee: string;
  netProceed: string;
  timestamp: number;
}

export interface BlvtUserLimitInfo {
  tokenName: string;
  userDailyTotalPurchaseLimit: string;
  userDailyTotalRedeemLimit: string;
}

export interface GetFiatOrderHistoryParams {
  transactionType: string;
  beginTime?: number;
  endTime?: number;
  page?: number;
  rows?: number;
}

export interface GetFiatOrderHistoryResponse {
  code: string;
  message: string;
  data: {
    orderNo: string;
    fiatCurrency: string;
    indicatedAmount: string;
    amount: string;
    totalFee: string;
    method: string;
    status: string;
    createTime: number;
    updateTime: number;
  }[];
  total: number;
  success: boolean;
}

export interface GetFiatPaymentsHistoryResponse {
  code: string;
  message: string;
  data: {
    orderNo: string;
    sourceAmount: string;
    fiatCurrency: string;
    obtainAmount: string;
    cryptoCurrency: string;
    totalFee: string;
    price: string;
    status: string;
    paymentMethod?: string;
    createTime: number;
    updateTime: number;
  }[];
  total: number;
  success: boolean;
}

export interface GetC2CTradeHistoryParams {
  tradeType: string;
  startTimestamp?: number;
  endTimestamp?: number;
  page?: number;
  rows?: number;
}

export interface c2cTradeData {
  orderNumber: string;
  advNo: string;
  tradeType: string;
  asset: string;
  fiat: string;
  fiatSymbol: string;
  amount: string;
  totalPrice: string;
  unitPrice: string;
  orderStatus: string;
  createTime: number;
  commission: string;
  counterPartNickName: string;
  advertisementRole: string;
}
export interface GetC2CTradeHistoryResponse {
  code: string;
  message: string;
  data: c2cTradeData[];
  total: number;
  success: boolean;
}

export interface GetVipLoanOngoingOrdersParams {
  orderId?: number;
  collateralAccountId?: number;
  loanCoin?: string;
  collateralCoin?: string;
  current?: number;
  limit?: number;
}

export interface VipOngoingOrder {
  orderId: number;
  loanCoin: string;
  totalDebt: string;
  loanRate: string;
  residualInterest: string;
  collateralAccountId: string;
  collateralCoin: string;
  totalCollateralValueAfterHaircut: string;
  lockedCollateralValue: string;
  currentLTV: string;
  expirationTime: number;
  loanDate: string;
  loanTerm: string;
  initialLtv: string;
  marginCallLtv: string;
  liquidationLtv: string;
}

export interface VipLoanRepayParams {
  orderId: number;
  amount: number;
}

export interface VipLoanRepayResponse {
  loanCoin: string;
  repayAmount: string;
  remainingPrincipal: string;
  remainingInterest: string;
  collateralCoin: string;
  currentLTV: string;
  repayStatus: string;
}

export interface GetVipLoanRepaymentHistoryParams {
  orderId?: number;
  loanCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface VipLoanRepaymentHistory {
  loanCoin: string;
  repayAmount: string;
  collateralCoin: string;
  repayStatus: string;
  loanDate: string;
  repayTime: string;
  orderId: string;
}

export interface VipLoanRenewParams {
  orderId: number;
  loanTerm?: number;
}

export interface VipLoanRenewResponse {
  loanAccountId: string;
  loanCoin: string;
  loanAmount: string;
  collateralAccountId: string;
  collateralCoin: string;
  loanTerm: string;
}

export interface CheckVipCollateralAccountParams {
  orderId?: number;
  collateralAccountId?: number;
}

export interface VipCollateralAccount {
  collateralAccountId: string;
  collateralCoin: string;
}

export interface VipLoanBorrowParams {
  loanAccountId: number;
  loanCoin: string;
  loanAmount: number;
  collateralAccountId: string;
  collateralCoin: string;
  isFlexibleRate: boolean;
  loanTerm?: number;
}

export interface VipLoanBorrowResponse {
  loanAccountId: string;
  requestId: string;
  loanCoin: string;
  isFlexibleRate: string;
  loanAmount: string;
  collateralAccountId: string;
  collateralCoin: string;
  loanTerm?: string;
}

export interface GetLoanableAssetsDataParams {
  loanCoin?: string;
  vipLevel?: number;
}

export interface GetApplicationStatusParams {
  current?: number;
  limit?: number;
}

export interface ApplicationStatus {
  loanAccountId: string;
  orderId: string;
  requestId: string;
  loanCoin: string;
  loanAmount: string;
  collateralAccountId: string;
  collateralCoin: string;
  loanTerm: string;
  status: string;
  loanDate: string;
}

export interface BorrowInterestRate {
  asset: string;
  flexibleDailyInterestRate: string;
  flexibleYearlyInterestRate: string;
  time: number;
}

export interface GetCryptoLoansIncomeHistoryParams {
  asset?: string;
  type?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetCryptoLoansIncomeHistoryResponse {
  asset: string;
  type: string;
  amount: string;
  timestamp: number;
  tranId: string;
}

export interface BorrowCryptoLoanParams {
  loanCoin: string;
  loanAmount?: number;
  collateralCoin: string;
  collateralAmount?: number;
  loanTerm: number;
}

export interface BorrowCryptoLoanResponse {
  loanCoin: string;
  loanAmount: string;
  collateralCoin: string;
  collateralAmount: string;
  hourlyInterestRate: string;
  orderId: string;
}

export interface GetLoanBorrowHistoryParams {
  orderId?: number;
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface LoanBorrowHistory {
  orderId: number;
  loanCoin: string;
  initialLoanAmount: string;
  hourlyInterestRate: string;
  loanTerm: string;
  collateralCoin: string;
  initialCollateralAmount: string;
  borrowTime: number;
  status: string;
}

export interface GetLoanOngoingOrdersParams {
  orderId?: number;
  loanCoin?: string;
  collateralCoin?: string;
  current?: number;
  limit?: number;
}

export interface LoanOngoingOrder {
  orderId: number;
  loanCoin: string;
  totalDebt: string;
  residualInterest: string;
  collateralCoin: string;
  collateralAmount: string;
  currentLTV: string;
  expirationTime: number;
}

export interface RepayCryptoLoanParams {
  orderId: number;
  amount: number;
  type?: number;
  collateralReturn?: boolean;
}

export interface RepayCryptoLoanResponse {
  loanCoin: string;
  remainingPrincipal?: string;
  remainingInterest?: string;
  collateralCoin: string;
  remainingCollateral?: string;
  currentLTV?: string;
  repayStatus: string;
}

export interface GetLoanRepaymentHistoryParams {
  orderId?: number;
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface LoanRepaymentHistory {
  loanCoin: string;
  repayAmount: string;
  collateralCoin: string;
  collateralUsed: string;
  collateralReturn: string;
  repayType: string;
  repayStatus: string;
  repayTime: number;
  orderId: number;
}

export interface AdjustCryptoLoanLTVParams {
  orderId: number;
  amount: number;
  direction: 'ADDITIONAL' | 'REDUCED';
}

export interface AdjustCryptoLoanLTVResponse {
  loanCoin: string;
  collateralCoin: string;
  direction: 'ADDITIONAL' | 'REDUCED';
  amount: string;
  currentLTV: string;
}

export interface GetLoanLTVAdjustmentHistoryParams {
  orderId?: number;
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface LoanLTVAdjustmentHistory {
  loanCoin: string;
  collateralCoin: string;
  direction: 'ADDITIONAL' | 'REDUCED';
  amount: string;
  preLTV: string;
  afterLTV: string;
  adjustTime: number;
  orderId: number;
}

export interface LoanableAssetData {
  loanCoin: string;
  _7dHourlyInterestRate: string;
  _7dDailyInterestRate: string;
  _14dHourlyInterestRate: string;
  _14dDailyInterestRate: string;
  _30dHourlyInterestRate: string;
  _30dDailyInterestRate: string;
  _90dHourlyInterestRate: string;
  _90dDailyInterestRate: string;
  _180dHourlyInterestRate: string;
  _180dDailyInterestRate: string;
  minLimit: string;
  maxLimit: string;
  vipLevel: number;
}

export interface GetCollateralAssetDataParams {
  collateralCoin?: string;
  vipLevel?: number;
}

export interface CollateralAssetData {
  collateralCoin: string;
  initialLTV: string;
  marginCallLTV: string;
  liquidationLTV: string;
  maxLimit: string;
  vipLevel: number;
}

export interface CheckCollateralRepayRateParams {
  loanCoin: string;
  collateralCoin: string;
  repayAmount: number;
}

export interface CheckCollateralRepayRateResponse {
  loanCoin: string;
  collateralCoin: string;
  repayAmount: string;
  rate: string;
}

export interface CustomizeMarginCallParams {
  orderId?: number;
  collateralCoin?: string;
  marginCall: number;
}

export interface CustomizeMarginCall {
  orderId: string;
  collateralCoin: string;
  preMarginCall: string;
  afterMarginCall: string;
  customizeTime: number;
}

export interface BorrowFlexibleLoanParams {
  loanCoin: string;
  loanAmount?: number;
  collateralCoin: string;
  collateralAmount?: number;
}

export interface BorrowFlexibleLoanResponse {
  loanCoin: string;
  loanAmount: string;
  collateralCoin: string;
  collateralAmount: string;
  status: 'Succeeds' | 'Failed' | 'Processing';
}

export interface GetFlexibleLoanOngoingOrdersParams {
  loanCoin?: string;
  collateralCoin?: string;
  current?: number;
  limit?: number;
}

export interface FlexibleLoanOngoingOrder {
  loanCoin: string;
  totalDebt: string;
  collateralCoin: string;
  collateralAmount: string;
  currentLTV: string;
}

export interface GetFlexibleLoanLiquidationHistoryParams {
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number; // Default: 1, max: 1000
  limit?: number; // Default: 10, max: 100
  recvWindow?: number;
}

export interface FlexibleLoanLiquidationHistoryRecord {
  loanCoin: string;
  liquidationDebt: string;
  collateralCoin: string;
  liquidationCollateralAmount: string;
  returnCollateralAmount: string;
  liquidationFee: string;
  liquidationStartingPrice: string;
  liquidationStartingTime: number;
  status: 'Liquidated' | 'Liquidating';
}

export interface GetFlexibleCryptoLoanBorrowHistoryParams {
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface FlexibleCryptoLoanBorrowHistory {
  loanCoin: string;
  initialLoanAmount: string;
  collateralCoin: string;
  initialCollateralAmount: string;
  borrowTime: number;
  status: 'Succeeds' | 'Failed' | 'Processing';
}

export interface RepayCryptoFlexibleLoanParams {
  loanCoin: string;
  collateralCoin: string;
  repayAmount: number;
  collateralReturn?: boolean;
  fullRepayment?: boolean;
}

export interface RepayCryptoFlexibleLoanResponse {
  loanCoin: string;
  collateralCoin: string;
  remainingDebt: string;
  remainingCollateral: string;
  fullRepayment: boolean;
  currentLTV: string;
  repayStatus: 'Repaid' | 'Repaying' | 'Failed';
}

export interface RepayCryptoLoanFlexibleWithCollateralParams {
  loanCoin: string;
  collateralCoin: string;
  repayAmount: number; // Amount of loan to repay
  fullRepayment?: boolean; // Default: FALSE
}

export interface RepayCryptoLoanFlexibleWithCollateralResponse {
  loanCoin: string;
  collateralCoin: string;
  remainingDebt: string;
  remainingCollateral: string;
  fullRepayment: boolean;
  currentLTV: string;
  repayStatus: 'Repaid' | 'Repaying' | 'Failed';
}
export interface GetFlexibleCryptoLoanRepaymentHistoryParams {
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface FlexibleCryptoLoanRepaymentHistory {
  loanCoin: string;
  repayAmount: string;
  collateralCoin: string;
  collateralReturn: string;
  repayStatus: 'Repaid' | 'Repaying' | 'Failed';
  repayTime: number;
}

export interface AdjustFlexibleCryptoLoanLTVParams {
  loanCoin: string;
  collateralCoin: string;
  adjustmentAmount: number;
  direction: 'ADDITIONAL' | 'REDUCED';
}

export interface AdjustFlexibleCryptoLoanLTVResponse {
  loanCoin: string;
  collateralCoin: string;
  direction: 'ADDITIONAL' | 'REDUCED';
  adjustmentAmount: string;
  currentLTV: string;
}

export interface GetFlexibleLoanLTVAdjustmentHistoryParams {
  loanCoin?: string;
  collateralCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface FlexibleLoanLTVAdjustmentHistory {
  loanCoin: string;
  collateralCoin: string;
  direction: 'ADDITIONAL' | 'REDUCED';
  collateralAmount: string;
  preLTV: string;
  afterLTV: string;
  adjustTime: number;
}

export interface FlexibleLoanAssetData {
  loanCoin: string;
  flexibleInterestRate: string;
  flexibleMinLimit: string;
  flexibleMaxLimit: string;
}

export interface FlexibleLoanCollateralAssetData {
  collateralCoin: string;
  initialLTV: string;
  marginCallLTV: string;
  liquidationLTV: string;
  maxLimit: string;
}

export interface GetFuturesLeadTraderStatusResponse {
  code: string;
  message: string;
  data: {
    isLeadTrader: boolean;
    time: number;
  };
  success: boolean;
}

export interface GetFuturesLeadTradingSymbolWhitelistResponse {
  code: string;
  message: string;
  data: {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
  }[];
}

export interface GetPayTradeHistoryParams {
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetAllConvertPairsParams {
  fromAsset?: string;
  toAsset?: string;
}

export interface SubmitConvertLimitOrderParams {
  baseAsset: string;
  quoteAsset: string;
  limitPrice: number;
  baseAmount?: number;
  quoteAmount?: number;
  side: 'BUY' | 'SELL';
  walletType?: 'SPOT' | 'FUNDING' | 'SPOT_FUNDING';
  expiredType: '1_D' | '3_D' | '7_D' | '30_D';
}

export interface ConvertLimitOpenOrder {
  quoteId: string;
  orderId: number;
  orderStatus: string;
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
  toAmount: string;
  ratio: string;
  inverseRatio: string;
  createTime: number;
  expiredTimestamp: number;
}

export interface GetSpotRebateHistoryRecordsParams {
  startTime?: number;
  endTime?: number;
  page?: number;
}

export interface SpotRebateHistoryRecord {
  asset: string;
  type: number;
  amount: string;
  updateTime: number;
}

export interface GetSpotRebateHistoryRecordsResponse {
  status: string;
  type: string;
  code: string;
  data: {
    page: number;
    totalRecords: number;
    totalPageNum: number;
    data: SpotRebateHistoryRecord[];
  };
}

export interface GetNftTransactionHistoryParams {
  orderType: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  page?: number;
}

export interface NftToken {
  network: string;
  tokenId: string;
  contractAddress: string;
}

export interface NftTransaction {
  orderNo: string;
  tokens: NftToken[];
  tradeTime: number;
  tradeAmount: string;
  tradeCurrency: string;
}

export interface GetNftDepositHistoryParams {
  startTime?: number;
  endTime?: number;
  limit?: number;
  page?: number;
}

export interface NftDeposit {
  network: string;
  txID: string | null;
  contractAdrress: string;
  tokenId: string;
  timestamp: number;
}

export interface GetNftWithdrawHistoryParams {
  startTime?: number;
  endTime?: number;
  limit?: number;
  page?: number;
}

export interface NftWithdraw {
  network: string;
  txID: string;
  contractAdrress: string;
  tokenId: string;
  timestamp: number;
  fee: number;
  feeAsset: string;
}

export interface GetNftAssetParams {
  limit?: number;
  page?: number;
}

export interface NftAsset {
  network: string;
  contractAddress: string;
  tokenId: string;
}

export interface CreateGiftCardParams {
  token: string;
  amount: number;
}

export interface CreateDualTokenGiftCardParams {
  baseToken: string;
  faceToken: string;
  baseTokenAmount: number;
  discount?: number;
}

export interface RedeemGiftCardParams {
  code: string;
  externalUid?: string;
}

export interface SimpleEarnProductListParams {
  asset?: string;
  current?: number;
  size?: number;
}

export interface SimpleEarnFlexibleProduct {
  asset: string;
  latestAnnualInterestRate: string;
  tierAnnualPercentageRate: Record<string, number>;
  airDropPercentageRate: string;
  canPurchase: boolean;
  canRedeem: boolean;
  isSoldOut: boolean;
  hot: boolean;
  minPurchaseAmount: string;
  productId: string;
  subscriptionStartTime: number;
  status: string;
}

export interface SimpleEarnLockedProduct {
  projectId: string;
  detail: {
    asset: string;
    rewardAsset: string;
    duration: number;
    renewable: boolean;
    isSoldOut: boolean;
    apr: string;
    status: string;
    subscriptionStartTime: number;
    extraRewardAsset: string;
    extraRewardAPR: string;
  };
  quota: {
    totalPersonalQuota: string;
    minimum: string;
  };
}

export interface SimpleEarnSubscribeProductParams {
  productId: string;
  amount: number;
  autoSubscribe?: boolean;
  sourceAccount?: 'SPOT' | 'FUND' | 'ALL';
}

export interface SimpleEarnSubscribeFlexibleProductResponse {
  purchaseId: string;
  success: boolean;
}

export interface SimpleEarnSubscribeLockedProductResponse {
  purchaseId: string;
  positionId: string;
  success: boolean;
}

export interface SimpleEarnRedeemFlexibleProductParams {
  productId: string;
  redeemAll?: boolean;
  amount?: number;
  destAccount?: 'SPOT' | 'FUND';
}

export interface SimpleEarnRedeemResponse {
  success: boolean;
  redeemId: string;
}

export interface SimpleEarnFlexibleProductPositionParams {
  asset?: string;
  productId?: string;
  current?: number;
  size?: number;
}

export interface SimpleEarnLockedProductPositionParams {
  asset?: string;
  productId?: string;
  current?: number;
  size?: number;
  positionId?: string;
}

export interface SimpleEarnLockedProductPosition {
  positionId: string;
  projectId: string;
  asset: string;
  amount: string;
  purchaseTime: string;
  duration: string;
  accrualDays: string;
  rewardAsset: string;
  APY: string;
  isRenewable: boolean;
  isAutoRenew: boolean;
  redeemDate: string;
}

export interface SimpleEarnAccountResponse {
  totalAmountInBTC: string;
  totalAmountInUSDT: string;
  totalFlexibleAmountInBTC: string;
  totalFlexibleAmountInUSDT: string;
  totalLockedinBTC: string;
  totalLockedinUSDT: string;
}

export interface GetSubAccountDepositHistoryParams {
  subAccountId?: string;
  coin?: string;
  status?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  offset?: number;
}

export interface SubAccountDeposit {
  depositId: number;
  subAccountId: string;
  address: string;
  addressTag: string;
  amount: string;
  coin: string;
  insertTime: number;
  transferType: number;
  network: string;
  status: number;
  txId: string;
  sourceAddress: string;
  confirmTimes: string;
  selfReturnStatus: number;
}

// Request interface for querying sub account spot asset info
export interface QuerySubAccountSpotMarginAssetInfoParams {
  subAccountId?: string;
  page?: number;
  size?: number;
}

export interface SubaccountBrokerSpotAsset {
  subAccountId: string;
  totalBalanceOfBtc: string;
}

export interface SubAccountBrokerMarginAsset {
  marginEnable: boolean;
  subAccountId: string;
  totalAssetOfBtc?: string;
  totalLiabilityOfBtc?: string;
  totalNetAssetOfBtc?: string;
  marginLevel?: string;
}

// Request interface for querying sub account futures asset info
export interface QuerySubAccountFuturesAssetInfoParams {
  subAccountId?: string;
  futuresType: number; // 1: USD Margined Futures, 2: COIN Margined Futures
  page?: number;
  size?: number;
}

// Response interface for querying sub account futures asset info (USD Margined Futures)
export interface UsdtMarginedFuturesResponse {
  subAccountId: string;
  totalInitialMargin: string;
  totalMaintenanceMargin: string;
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  totalPositionInitialMargin: string;
  totalOpenOrderInitialMargin: string;
  futuresEnable: boolean;
  asset: string;
}

// Response interface for querying sub account futures asset info (COIN Margined Futures)
export interface CoinMarginedFuturesResponse {
  subAccountId: string;
  totalWalletBalanceOfUsdt: string;
  totalUnrealizedProfitOfUsdt: string;
  totalMarginBalanceOfUsdt: string;
  futuresEnable: boolean;
}

// Combined response interface for querying sub account futures asset info
export interface BrokerFuturesSubAccountAssets {
  data: (UsdtMarginedFuturesResponse | CoinMarginedFuturesResponse)[];
  timestamp: number;
}

export interface BrokerUniversalTransfer {
  toId: string;
  asset: string;
  qty: string;
  time: number;
  status: string;
  txnId: string;
  clientTranId: string;
  fromAccountType: string;
  toAccountType: string;
}

// Request interface for changing sub account commission
export interface ChangeSubAccountCommissionParams {
  subAccountId: string;
  makerCommission: number;
  takerCommission: number;
  marginMakerCommission?: number;
  marginTakerCommission?: number;
}

// Response interface for changing sub account commission
export interface ChangeSubAccountCommissionResponse {
  subAccountId: string;
  makerCommission: number;
  takerCommission: number;
  marginMakerCommission: number;
  marginTakerCommission: number;
}

// Request interface for changing sub account USDT-Ⓜ futures commission adjustment
export interface ChangeSubAccountFuturesCommissionParams {
  subAccountId: string;
  symbol: string;
  makerAdjustment: number;
  takerAdjustment: number;
}

// Response interface for changing sub account USDT-Ⓜ futures commission adjustment
export interface ChangeSubAccountFuturesCommissionResponse {
  subAccountId: string;
  symbol: string;
  makerAdjustment: number;
  takerAdjustment: number;
  makerCommission: number;
  takerCommission: number;
}

// Request interface for querying sub account USDT-Ⓜ futures commission adjustment
export interface QuerySubAccountFuturesCommissionParams {
  subAccountId: string;
  symbol?: string;
}

// Response interface for querying sub account USDT-Ⓜ futures commission adjustment
export interface BrokerSubAccountFuturesCommission {
  subAccountId: string;
  symbol: string;
  makerCommission: number;
  takerCommission: number;
}

export interface ChangeSubAccountCoinFuturesCommissionParams {
  subAccountId: string;
  pair: string;
  makerAdjustment: number;
  takerAdjustment: number;
  recvWindow?: number;
  timestamp: number;
}

export interface QuerySubAccountCoinFuturesCommissionParams {
  subAccountId: string;
  pair?: string;
  recvWindow?: number;
  timestamp: number;
}

// Response interface for querying sub account COIN-Ⓜ futures commission adjustment
export interface BrokerSubAccountCoinFuturesCommission {
  subAccountId: string;
  pair: string;
  makerCommission: number;
  takerCommission: number;
}

export interface QueryBrokerSpotCommissionRebateParams {
  subAccountId?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  size?: number;
  recvWindow?: number;
  timestamp: number;
}

// Response interface for querying spot commission rebate recent record
export interface BrokerCommissionRebate {
  subaccountId: string;
  income: string;
  asset: string;
  symbol: string;
  tradeId: number;
  time: number;
  status: number;
}

export interface QueryBrokerFuturesCommissionRebateParams {
  futuresType: number; // 1: USDT Futures, 2: Coin Futures
  startTime: number;
  endTime: number;
  page?: number;
  size?: number;
  filterResult?: boolean;
  recvWindow?: number;
  timestamp: number;
}

export interface SubmitMarginOTOOrderParams {
  symbol: string;
  isIsolated?: 'TRUE' | 'FALSE';
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  sideEffectType?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY';
  selfTradePreventionMode?:
    | 'EXPIRE_TAKER'
    | 'EXPIRE_MAKER'
    | 'EXPIRE_BOTH'
    | 'NONE';
  autoRepayAtCancel?: boolean;
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: number;
  workingQuantity: number;
  workingIcebergQty?: number;
  workingTimeInForce?: 'GTC' | 'IOC' | 'FOK';
  pendingType: OrderType;
  pendingSide: 'BUY' | 'SELL';
  pendingClientOrderId?: string;
  pendingPrice?: number;
  pendingStopPrice?: number;
  pendingTrailingDelta?: number;
  pendingQuantity: number;
  pendingIcebergQty?: number;
  pendingTimeInForce?: 'GTC' | 'IOC' | 'FOK';
}

export interface MarginOTOOrder {
  orderListId: number;
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  isIsolated: boolean;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
  orderReports: {
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
    side: string;
    selfTradePreventionMode: string;
  }[];
}

export interface SubmitMarginOTOCOOrderParams {
  symbol: string;
  isIsolated?: 'TRUE' | 'FALSE';
  sideEffectType?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY';
  autoRepayAtCancel?: boolean;
  listClientOrderId?: string;
  newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
  selfTradePreventionMode?:
    | 'EXPIRE_TAKER'
    | 'EXPIRE_MAKER'
    | 'EXPIRE_BOTH'
    | 'NONE';
  workingType: 'LIMIT' | 'LIMIT_MAKER';
  workingSide: 'BUY' | 'SELL';
  workingClientOrderId?: string;
  workingPrice: string;
  workingQuantity: string;
  workingIcebergQty?: string;
  workingTimeInForce?: 'GTC' | 'IOC' | 'FOK';
  pendingSide: 'BUY' | 'SELL';
  pendingQuantity: string;
  pendingAboveType: 'LIMIT_MAKER' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT';
  pendingAboveClientOrderId?: string;
  pendingAbovePrice?: string;
  pendingAboveStopPrice?: string;
  pendingAboveTrailingDelta?: string;
  pendingAboveIcebergQty?: string;
  pendingAboveTimeInForce?: 'GTC' | 'IOC' | 'FOK';
  pendingBelowType: 'LIMIT_MAKER' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT';
  pendingBelowClientOrderId?: string;
  pendingBelowPrice?: string;
  pendingBelowStopPrice?: string;
  pendingBelowTrailingDelta?: string;
  pendingBelowIcebergQty?: string;
  pendingBelowTimeInForce?: 'GTC' | 'IOC' | 'FOK';
}

export interface MarginOTOCOOrder {
  orderListId: number;
  contingencyType: 'OTO';
  listStatusType: 'EXEC_STARTED';
  listOrderStatus: 'EXECUTING';
  listClientOrderId: string;
  transactionTime: number;
  symbol: string;
  isIsolated: boolean;
  orders: {
    symbol: string;
    orderId: number;
    clientOrderId: string;
  }[];
  orderReports: {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: number;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status:
      | 'NEW'
      | 'PARTIALLY_FILLED'
      | 'FILLED'
      | 'CANCELED'
      | 'PENDING_CANCEL'
      | 'REJECTED'
      | 'EXPIRED'
      | 'PENDING_NEW';
    timeInForce: 'GTC' | 'IOC' | 'FOK';
    type:
      | 'LIMIT'
      | 'MARKET'
      | 'STOP_LOSS'
      | 'STOP_LOSS_LIMIT'
      | 'TAKE_PROFIT'
      | 'TAKE_PROFIT_LIMIT'
      | 'LIMIT_MAKER';
    side: 'BUY' | 'SELL';
    stopPrice?: string;
    selfTradePreventionMode:
      | 'EXPIRE_TAKER'
      | 'EXPIRE_MAKER'
      | 'EXPIRE_BOTH'
      | 'NONE';
  }[];
}

export interface CreateSpecialLowLatencyKeyParams {
  apiName: string;
  symbol?: string;
  ip?: string;
  publicKey?: string;
}

export interface SpecialLowLatencyKeyResponse {
  apiKey: string;
  secretKey: string | null;
  type: 'HMAC_SHA256' | 'RSA' | 'Ed25519';
}

export interface SpecialLowLatencyKeyInfo {
  apiName: string;
  apiKey: string;
  ip: string;
  type: 'HMAC_SHA256' | 'RSA' | 'Ed25519';
}

export interface SolStakingAccount {
  bnsolAmount: string; // Amount in bNSOL
  holdingInSOL: string; // Holding in SOL
  thirtyDaysProfitInSOL: string; // 30 days profit in SOL
}

export interface SolStakingQuota {
  leftStakingPersonalQuota: string; // Remaining personal staking quota
  leftRedemptionPersonalQuota: string; // Remaining personal redemption quota
  minStakeAmount: string; // Minimum stake amount
  minRedeemAmount: string; // Minimum redeem amount
  redeemPeriod: number; // Redemption period in days
  stakeable: boolean; // Whether staking is possible
  redeemable: boolean; // Whether redemption is possible
  soldOut: boolean; // Whether the staking is sold out
  commissionFee: string; // Commission fee
  nextEpochTime: number; // Time for the next epoch
  calculating: boolean; // Whether calculations are ongoing
}

export interface SubscribeSolStakingResponse {
  success: boolean; // Indicates if the subscription was successful
  bnsolAmount: string; // Amount in bNSOL received
  exchangeRate: string; // SOL amount per 1 BNSOL
}

export interface RedeemSolResponse {
  success: boolean; // Indicates if the redemption was successful
  solAmount: string; // Amount in SOL received
  exchangeRate: string; // SOL amount per 1 BNSOL
  arrivalTime: number; // Time of arrival for the redeemed SOL
}

export interface GetSolStakingHistoryReq {
  startTime?: number; // Optional, start time in milliseconds
  endTime?: number; // Optional, end time in milliseconds
  current?: number; // Optional, current page, default is 1
  size?: number; // Optional, number of records per page, default is 10, max is 100
  recvWindow?: number; // Optional, cannot be greater than 60000
  timestamp: number; // Mandatory
}

export interface SolStakingHistoryRecord {
  time: number; // Time of the staking event
  asset: string; // Asset involved, e.g., SOL
  amount: string; // Amount staked
  distributeAsset: string; // Asset distributed, e.g., BNSOL
  distributeAmount: string; // Amount distributed
  exchangeRate: string; // Exchange rate at the time
  status: 'PENDING' | 'SUCCESS' | 'FAILED'; // Status of the staking event
}

export interface GetSolRedemptionHistoryReq {
  startTime?: number; // Optional, start time in milliseconds
  endTime?: number; // Optional, end time in milliseconds
  current?: number; // Optional, current page, default is 1
  size?: number; // Optional, number of records per page, default is 10, max is 100
  recvWindow?: number; // Optional, cannot be greater than 60000
  timestamp: number; // Mandatory
}

export interface SolRedemptionHistoryRecord {
  time: number; // Time of the redemption event
  arrivalTime: number; // Time of arrival for the redeemed SOL
  asset: string; // Asset redeemed, e.g., BNSOL
  amount: string; // Amount redeemed
  distributeAsset: string; // Asset distributed, e.g., SOL
  distributeAmount: string; // Amount distributed
  exchangeRate: string; // Exchange rate at the time
  status: 'PENDING' | 'SUCCESS' | 'FAILED'; // Status of the redemption event
}

export interface GetBnsolRewardsHistoryReq {
  startTime?: number; // Optional, start time in milliseconds
  endTime?: number; // Optional, end time in milliseconds
  current?: number; // Optional, current page, default is 1
  size?: number; // Optional, number of records per page, default is 10, max is 100
  recvWindow?: number; // Optional, cannot be greater than 60000
  timestamp: number; // Mandatory
}

export interface BnsolRewardHistoryRecord {
  time: number; // Time of the reward event
  amountInSOL: string; // Reward amount in SOL
  holding: string; // BNSOL holding balance
  holdingInSOL: string; // BNSOL holding balance in SOL
  annualPercentageRate: string; // Annual Percentage Rate (e.g., "0.5" means 50%)
}

export interface GetBnsolRateHistoryReq {
  startTime?: number; // Optional, start time in milliseconds
  endTime?: number; // Optional, end time in milliseconds
  current?: number; // Optional, current page, default is 1
  size?: number; // Optional, number of records per page, default is 10, max is 100
  recvWindow?: number; // Optional, cannot be greater than 60000
  timestamp: number; // Mandatory
}

export interface SolBoostRewardsHistoryReq {
  type: 'CLAIM' | 'DISTRIBUTE';
  startTime?: number;
  endTime?: number;
  current?: number;
  size?: number;
}

export interface SolBoostRewardsHistoryRecord {
  time: number;
  token: string;
  amount: string;
  bnsolHolding?: string; // Only present if type is "DISTRIBUTE"
  status?: string; // Only present if type is "CLAIM"
}

export interface BnsolRateHistoryRecord {
  annualPercentageRate: string; // BNSOL APR
  exchangeRate: string; // SOL amount per 1 BNSOL
  time: number; // Time of the rate record
}

export interface RiskUnitMM {
  asset: string;
  uniMaintainUsd: string;
}

export interface PortfolioMarginProSpanAccountInfo {
  uniMMR: string;
  accountEquity: string;
  actualEquity: string;
  accountMaintMargin: string;
  riskUnitMMList: RiskUnitMM[];
  marginMM: string;
  otherMM: string;
  accountStatus:
    | 'NORMAL'
    | 'MARGIN_CALL'
    | 'SUPPLY_MARGIN'
    | 'REDUCE_ONLY'
    | 'ACTIVE_LIQUIDATION'
    | 'FORCE_LIQUIDATION'
    | 'BANKRUPTED';
  accountType: 'PM_1' | 'PM_2' | 'PM_3'; // PM_1 for classic PM, PM_2 for PM, PM_3 for PM Pro(SPAN)
}

export interface PortfolioMarginProAccountBalance {
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
  optionWalletBalance: string; // only for PM PRO SPAN
  optionEquity: string; // only for PM PRO SPAN
}

export interface PMProMintBFUSDParams {
  fromAsset: string; // USDT only
  targetAsset: string; // BFUSD only
  amount: number;
}

export interface PMProMintBFUSDResponse {
  fromAsset: string;
  targetAsset: string;
  fromAssetQty: number;
  targetAssetQty: number;
  rate: number;
}

export interface PMProRedeemBFUSDResponse {
  fromAsset: string;
  targetAsset: string;
  fromAssetQty: number;
  targetAssetQty: number;
  rate: number;
}

export interface VipLoanInterestRateHistoryParams {
  coin: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface VipLoanInterestRateRecord {
  coin: string;
  annualizedInterestRate: string;
  time: number;
}

export interface VipLoanAccruedInterestParams {
  orderId?: number;
  loanCoin?: string;
  startTime?: number;
  endTime?: number;
  current?: number;
  limit?: number;
}

export interface VipLoanAccruedInterestRecord {
  loanCoin: string;
  principalAmount: string;
  interestAmount: string;
  annualInterestRate: string;
  accrualTime: number;
  orderId: number;
}
