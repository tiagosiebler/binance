import { AxiosRequestConfig } from 'axios';
import {
  BasicAssetPaginatedParams,
  BasicAssetParam,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  ExchangeSymbol,
  GetAllOrdersParams,
  GetOrderParams,
  HistoricalTradesParams,
  KlinesParams,
  Kline,
  NewOCOParams,
  OrderBookParams,
  OrderIdProperty,
  RecentTradesParams,
  SymbolFromPaginatedRequestFromId,
  SymbolPrice,
  RowsWithTotal,
  CoinStartEndLimit,
  SymbolArrayParam,
  NewOrderListParams,
  OrderResponseType,
  OrderType,
} from './types/shared';

import {
  AccountInformation,
  AddBSwapLiquidityParams,
  AddIpRestriction,
  AggregateTrade,
  AllCoinsInformationResponse,
  ApiKeyBrokerSubAccount,
  APIPermissions,
  APITradingStatus,
  AssetDetail,
  BasicFromPaginatedParams,
  BasicFuturesSubAccountParams,
  BasicMarginAssetParams,
  BasicSubAccount,
  BasicTimeRangeParam,
  BrokerSubAccount,
  BrokerSubAccountHistory,
  BSwapLiquidity,
  BSwapOperations,
  BSwapOperationsParams,
  CancelSpotOrderResult,
  ChangePermissionApiKeyBrokerSubAccountParams,
  ChangePermissionApiKeyBrokerSubAccountResponse,
  ConvertDustParams,
  CreateApiKeyBrokerSubAccountParams,
  CreateApiKeyBrokerSubAccountResponse,
  CreateBrokerSubAccountParams,
  CreateSubAccountParams,
  CurrentAvgPrice,
  DailyAccountSnapshot,
  DailyAccountSnapshotParams,
  DailyChangeStatistic,
  DeleteApiKeyBrokerSubAccountParams,
  DepositAddressParams,
  DepositAddressResponse,
  DepositHistory,
  DepositHistoryParams,
  DustConversion,
  DustInfo,
  DustLog,
  EnableFuturesBrokerSubAccountParams,
  EnableFuturesBrokerSubAccountResponse,
  EnableMarginApiKeyBrokerSubAccountParams,
  EnableMarginBrokerSubAccountParams,
  EnableMarginBrokerSubAccountResponse,
  EnableOrDisableIPRestrictionForSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountResponse,
  ExchangeInfo,
  ExchangeInfoParams,
  FixedAndActivityProjectParams,
  FixedAndActivityProjectPositionParams,
  FuturesPositionRisk,
  GetApiKeyBrokerSubAccountParams,
  GetBrokerInfoResponse,
  GetBrokerSubAccountParams,
  GetBrokerSubAccountHistoryParams,
  GetBrokerSubAccountDepositHistoryParams,
  GetOCOParams,
  GetUniversalTransferBrokerParams,
  IsolatedMarginAccountInfo,
  IsolatedMarginAccountTransferParams,
  LeftDailyPurchaseQuotaFlexibleProductResponse,
  MarginAccountLoanParams,
  MarginTransactionResponse,
  NewSpotOrderParams,
  OrderBookResponse,
  TransferBrokerSubAccountParams,
  TransferBrokerSubAccount,
  PurchaseFlexibleProductResponse,
  PurchaseRecordParams,
  QueryCrossMarginAccountDetailsParams,
  QueryCrossMarginPairResponse,
  QueryMarginAssetResponse,
  QueryMarginPriceIndexResponse,
  QueryMarginRecordParams,
  QueryMaxBorrowResponse,
  QueryMaxTransferOutAmountResponse,
  RawAccountTrade,
  RawTrade,
  RemoveBSwapLiquidityParams,
  SpotOrder,
  StakingBasicParams,
  StakingHistory,
  StakingHistoryParams,
  StakingPersonalLeftQuota,
  StakingProduct,
  StakingProductPosition,
  StakingProductType,
  SubAccountAddOrDeleteIPList,
  SubAccountAssetDetails,
  SubAccountAssets,
  SubAccountAssetsParams,
  SubAccountCOINMDetail,
  SubAccountCOINMPositionRisk,
  SubAccountCOINMSummary,
  SubAccountDepositAddress,
  SubAccountDepositAddressParams,
  SubAccountDepositHistoryParams,
  SubAccountEnableFutures,
  SubAccountEnableLeverageToken,
  SubAccountEnableMargin,
  SubAccountFuturesAccountDetail,
  SubAccountFuturesAccountSummary,
  SubAccountFuturesAssetTransfer,
  SubAccountFuturesAssetTransferHistory,
  SubAccountFuturesAssetTransferHistoryParams,
  SubAccountFuturesAssetTransferParams,
  SubAccountListParams,
  SubAccountListResponse,
  SubAccountMarginAccountDetail,
  SubAccountEnableOrDisableIPRestriction,
  SubAccountsMarginAccountSummary,
  SubAccountSpotAssetsSummary,
  SubAccountSpotAssetsSummaryParams,
  SubAccountSpotAssetTransferHistory,
  SubAccountSpotAssetTransferHistoryParams,
  SubAccountStatus,
  SubAccountSummaryOnFuturesAccountV2Params,
  SubAccountTransfer,
  SubAccountTransferHistory,
  SubAccountTransferHistoryParams,
  SubAccountTransferParams,
  SubAccountTransferToMasterParams,
  SubAccountTransferToSameMasterParams,
  SubAccountUniversalTransfer,
  SubAccountUniversalTransferHistoryParams,
  SubAccountUniversalTransferHistoryResponse,
  SubAccountUniversalTransferParams,
  SubAccountUSDMDetail,
  SubAccountUSDMPositionRisk,
  SubAccountUSDMSummary,
  SymbolOrderBookTicker,
  SymbolTradeFee,
  SystemStatusResponse,
  UniversalTransferBrokerParams,
  UniversalTransferHistoryParams,
  UniversalTransferParams,
  VirtualSubAccount,
  WithdrawAssetsFromManagedSubAccountParams,
  WithdrawHistory,
  WithdrawHistoryParams,
  WithdrawParams,
  NewFutureAccountTransferParams,
  GetFutureAccountTransferHistoryParams,
  FutureAccountTransfer,
  GetLoanCoinPaginatedHistoryParams,
  SubAccountDepositHistoryList,
  ConvertQuoteRequestParams,
  GetConvertTradeHistoryParams,
  GetOrderStatusParams,
  EnableConvertSubAccountParams,
  AcceptQuoteRequestParams,
  ReplaceSpotOrderParams,
  ReplaceSpotOrderResultSuccess,
  NewSpotSOROrderParams,
  SOROrderResponseFull,
  SORTestOrderResponse,
  OrderListResponse,
  OrderResponseTypeFor,
  OrderList,
  CancelOrderListResult,
  GetMarginAccountBorrowRepayRecordsParams,
  MarginAccountRecord,
  FundingAsset,
  UserAsset,
  ConvertTransferResponse,
  CloudMiningHistoryParams,
  ConvertibleCoinsResponse,
  ConvertibleCoinsParams,
  GetConvertBUSDHistoryParams,
  SubmitDepositCreditParams,
  SubmitDepositCreditResponse,
  DepositAddressListParams,
  DepositAddress,
  WalletBalance,
  DelegationHistoryParams,
  DelistScheduleResponse,
  WithdrawAddress,
  AccountInfo,
  ManagedSubAccountSnapshotParams,
  ManagedSubAccountSnapshot,
  ManagedSubAccountTransferLogParams,
  ManagedSubAccountFuturesAssetsResponse,
  ManagedSubAccountMarginAssetsResponse,
  ManagedSubAccountListParams,
  SubAccountTransactionStatistics,
  ManagedSubAccountDepositAddressParams,
  ManagedSubAccountDepositAddress,
  EnableOptionsForSubAccountResponse,
  ManagedSubAccountTransferTTLogParams,
  TradingDayTickerParams,
  RollingWindowTickerParams,
  NewOrderListOTOParams,
  NewOrderListOTOResponse,
  NewOrderListOTOCOParams,
  NewOrderListOTOCOResponse,
  PreventedMatchesParams,
  PreventedMatch,
  AllocationsParams,
  CommissionRates,
  GetCrossMarginTransferHistoryParams,
  GetMarginInterestHistoryParams,
  GetForceLiquidationRecordParams,
  QueryMarginAccountAllOCOParams,
  QueryMarginAccountTradeListParams,
  IsolatedMarginSymbol,
  ToggleBNBBurnParams,
  BNBBurnResponse,
  QueryMarginInterestRateHistoryParams,
  MarginInterestRateHistory,
  QueryCrossMarginFeeDataParams,
  CrossMarginFeeData,
  IsolatedMarginFeeData,
  QueryIsolatedMarginTierDataParams,
  IsolatedMarginTierData,
  GetMarginOrderCountUsageParams,
  MarginOrderCountUsageResponse,
  SmallLiabilityExchangeCoin,
  GetSmallLiabilityExchangeHistoryParams,
  GetNextHourlyInterestRateParams,
  NextHourlyInterestRate,
  GetMarginCapitalFlowParams,
  MarginCapitalFlow,
  MarginDelistSchedule,
  MarginAvailableInventoryResponse,
  ManualLiquidationResponse,
  ManualLiquidationParams,
  LiabilityCoinLeverageBracket,
  GetFlexibleSubscriptionRecordParams,
  GetLockedSubscriptionRecordParams,
  GetFlexibleRedemptionRecordParams,
  GetLockedRedemptionRecordParams,
  GetFlexibleRewardsHistoryParams,
  GetLockedRewardsHistoryParams,
  GetFlexibleSubscriptionPreviewParams,
  GetLockedSubscriptionPreviewParams,
  GetRateHistoryParams,
  GetCollateralRecordParams,
  GetDualInvestmentProductListParams,
  SubscribeDualInvestmentProductParams,
  SubscribeDualInvestmentProductResponse,
  GetDualInvestmentPositionsParams,
  CheckDualInvestmentAccountsResponse,
  ChangeAutoCompoundStatusParams,
  ChangeAutoCompoundStatusResponse,
  GetTargetAssetListParams,
  GetTargetAssetListResponse,
  TargetAssetROI,
  GetTargetAssetROIParams,
  GetSourceAssetListParams,
  GetSourceAssetListResponse,
  CreateInvestmentPlanParams,
  CreateInvestmentPlanResponse,
  EditInvestmentPlanParams,
  EditInvestmentPlanResponse,
  ChangePlanStatusParams,
  ChangePlanStatusResponse,
  GetPlanDetailsParams,
  GetSubscriptionTransactionHistoryParams,
  GetIndexDetailsResponse,
  GetIndexLinkedPlanPositionDetailsResponse,
  SubmitOneTimeTransactionParams,
  SubmitOneTimeTransactionResponse,
  GetOneTimeTransactionStatusParams,
  GetOneTimeTransactionStatusResponse,
  SubmitIndexLinkedPlanRedemptionParams,
  GetIndexLinkedPlanRedemptionHistoryParams,
  IndexLinkedPlanRedemptionRecord,
  GetIndexLinkedPlanRebalanceHistoryParams,
  SubscribeEthStakingV2Response,
  RedeemEthParams,
  RedeemEthResponse,
  GetEthStakingHistoryParams,
  GetEthRedemptionHistoryParams,
  GetBethRewardsHistoryParams,
  GetEthStakingQuotaResponse,
  GetETHRateHistoryParams,
  GetEthStakingAccountResponse,
  GetEthStakingAccountV2Response,
  WrapBethResponse,
  GetWrapHistoryParams,
  GetWbethRewardsHistoryResponse,
  GetMiningAlgoListResponse,
  GetMiningCoinListResponse,
  GetMinerDetailsParams,
  GetMinerDetailsResponse,
  GetMinerListParams,
  GetMinerListResponse,
  GetEarningsListParams,
  GetEarningsListResponse,
  GetExtraBonusListParams,
  GetExtraBonusListResponse,
  GetHashrateResaleListParams,
  GetHashrateResaleListResponse,
  GetHashrateResaleDetailParams,
  GetHashrateResaleDetailResponse,
  SubmitHashrateResaleParams,
  CancelHashrateResaleConfigParams,
  GetStatisticListParams,
  GetStatisticListResponse,
  getMiningAccountsListParams,
  getMiningAccountsListResponse,
  GetMiningAccountEarningParams,
  GetMiningAccountEarningResponse,
  GetFutureTickLevelOrderbookDataLinkParams,
  SubmitVpNewOrderParams,
  SubmitVpNewOrderResponse,
  SubmitTwapNewOrderParams,
  SubmitTwapNewOrderResponse,
  CancelAlgoOrderResponse,
  GetAlgoHistoricalOrdersParams,
  GetAlgoSubOrdersParams,
  GetAlgoSubOrdersResponse,
  SubmitSpotTwapNewOrderParams,
  SubmitSpotTwapNewOrderResponse,
  CancelSpotAlgoOrderResponse,
  GetSpotAlgoHistoricalOrdersParams,
  GetSpotAlgoSubOrdersParams,
  GetSpotAlgoSubOrdersResponse,
  GetPortfolioMarginAssetIndexPriceResponse,
  GetPortfolioMarginProAccountInfoResponse,
  GetPortfolioMarginProBankruptcyLoanAmountResponse,
  GetPortfolioMarginProCollateralRateResponse,
  GetPortfolioMarginProInterestHistoryParams,
  GetPortfolioMarginProInterestHistoryResponse,
  BnbTransferParams,
  GetPortfolioMarginAssetLeverageResponse,
  SubscribeBlvtParams,
  SubscribeBlvtResponse,
  GetBlvtSubscriptionRecordParams,
  BlvtSubscriptionRecord,
  RedeemBlvtParams,
  RedeemBlvtResponse,
  GetBlvtRedemptionRecordParams,
  BlvtRedemptionRecord,
  BlvtUserLimitInfo,
  GetFiatOrderHistoryParams,
  GetFiatOrderHistoryResponse,
  GetFiatPaymentsHistoryResponse,
  GetC2CTradeHistoryParams,
  GetC2CTradeHistoryResponse,
  GetVipLoanOngoingOrdersParams,
  VipLoanRepayParams,
  VipLoanRepayResponse,
  GetVipLoanRepaymentHistoryParams,
  VipLoanRenewParams,
  VipLoanRenewResponse,
  CheckVipCollateralAccountParams,
  VipLoanBorrowParams,
  VipLoanBorrowResponse,
  GetLoanableAssetsDataParams,
  GetCollateralAssetDataParams,
  GetApplicationStatusParams,
  BorrowInterestRate,
  GetCryptoLoansIncomeHistoryParams,
  GetCryptoLoansIncomeHistoryResponse,
  BorrowCryptoLoanParams,
  BorrowCryptoLoanResponse,
  GetLoanBorrowHistoryParams,
  GetLoanOngoingOrdersParams,
  RepayCryptoLoanResponse,
  RepayCryptoLoanParams,
  GetLoanRepaymentHistoryParams,
  AdjustCryptoLoanLTVParams,
  AdjustCryptoLoanLTVResponse,
  GetLoanLTVAdjustmentHistoryParams,
  CheckCollateralRepayRateParams,
  CheckCollateralRepayRateResponse,
  CustomizeMarginCallParams,
  BorrowFlexibleLoanParams,
  BorrowFlexibleLoanResponse,
  GetFlexibleLoanOngoingOrdersParams,
  GetFlexibleCryptoLoanBorrowHistoryParams,
  RepayCryptoFlexibleLoanParams,
  RepayCryptoFlexibleLoanResponse,
  AdjustFlexibleCryptoLoanLTVResponse,
  AdjustFlexibleCryptoLoanLTVParams,
  GetFlexibleLoanLTVAdjustmentHistoryParams,
  GetFuturesLeadTraderStatusResponse,
  GetFuturesLeadTradingSymbolWhitelistResponse,
  GetPayTradeHistoryParams,
  GetAllConvertPairsParams,
  SubmitConvertLimitOrderParams,
  GetSpotRebateHistoryRecordsParams,
  GetSpotRebateHistoryRecordsResponse,
  GetNftDepositHistoryParams,
  GetNftWithdrawHistoryParams,
  GetNftAssetParams,
  CreateGiftCardParams,
  CreateDualTokenGiftCardParams,
  RedeemGiftCardParams,
  ConvertLimitOpenOrder,
  HistoricalDataLink,
  SetAutoSubscribeParams,
  GetAssetParams,
  SimpleEarnAccountResponse,
  SimpleEarnFlexibleProductPositionParams,
  SimpleEarnLockedProductPositionParams,
  SimpleEarnProductListParams,
  SimpleEarnRedeemResponse,
  SimpleEarnSubscribeFlexibleProductResponse,
  SimpleEarnSubscribeLockedProductResponse,
  SimpleEarnSubscribeProductParams,
  ConvertTransfer,
  BUSDConversionRecord,
  CloudMining,
  DelegationHistory,
  CrossMarginTransferHistory,
  MarginInterestHistory,
  ForceLiquidationRecord,
  SmallLiabilityExchangeHistory,
  GetFlexibleSubscriptionRecordResponse,
  SimpleEarnLockedProduct,
  SimpleEarnLockedProductPosition,
  SimpleEarnFlexibleProduct,
  FlexibleLoanCollateralAssetData,
  FlexibleLoanAssetData,
  FlexibleLoanLTVAdjustmentHistory,
  FlexibleLoanOngoingOrder,
  FlexibleCryptoLoanBorrowHistory,
  CustomizeMarginCall,
  LoanableAssetData,
  CollateralAssetData,
  LoanLTVAdjustmentHistory,
  LoanRepaymentHistory,
  LoanOngoingOrder,
  ApplicationStatus,
  VipCollateralAccount,
  VipLoanRepaymentHistory,
  VipOngoingOrder,
  WrapHistory,
  ETHRateHistory,
  BethRewardsHistory,
  EthRedemptionHistory,
  EthStakingHistory,
  GetRateHistory,
  GetLockedRewardsHistory,
  FlexibleRewardsHistory,
  LockedSubscriptionRecord,
  FlexibleRedemptionRecord,
  LockedRedemptionRecord,
  LoanBorrowHistory,
  OrderRateLimitUsage,
  SubaccountBalances,
  ManagerSubTransferHistoryVos,
  ManagerSubUserInfoVo,
  TradingDayTickerMini,
  TradingDayTickerFull,
  Collateral,
  FlexibleSubscriptionPreview,
  LockedSubscriptionPreview,
  DualInvestmentPosition,
  NftWithdraw,
  NftAsset,
  NftTransaction,
  NftDeposit,
  HistoricalSpotAlgoOrder,
  SpotAlgoOrder,
  HistoricalAlgoOrder,
  AlgoOrder,
  GetNftTransactionHistoryParams,
  CollateralRecord,
  DualInvestmentProduct,
} from './types/spot';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
  serialiseParams,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';

export class MainClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super('spot1', restClientOptions, requestOptions);
    return this;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(baseUrlKeyOverride?: BinanceBaseUrlKey): Promise<number> {
    const baseUrlKey = baseUrlKeyOverride || this.getBaseUrlKey();
    const endpoint = getServerTimeEndpoint(baseUrlKey);
    const response = await this.getForBaseUrl(endpoint, baseUrlKey);
    return response.serverTime;
  }

  /**
   *
   * SPOT TRADING Endpoints - General endpoints
   *
   **/

  testConnectivity(): Promise<{}> {
    return this.get('api/v3/ping');
  }

  getExchangeInfo(params?: ExchangeInfoParams): Promise<ExchangeInfo> {
    const symbols = params?.symbols && JSON.stringify(params.symbols);
    const symbol = params?.symbol;

    let urlSuffix = '';
    if (symbol) {
      urlSuffix += '?symbol=' + symbol;
    } else if (symbols) {
      urlSuffix += '?symbols=' + symbols;
    }

    return this.get('api/v3/exchangeInfo' + urlSuffix);
  }

  /**
   *
   * SPOT TRADING Endpoints - Market endpoints
   *
   **/

  getOrderBook(params: OrderBookParams): Promise<OrderBookResponse> {
    return this.get('api/v3/depth', params);
  }

  getRecentTrades(params: RecentTradesParams): Promise<RawTrade[]> {
    return this.get('api/v3/trades', params);
  }

  getHistoricalTrades(params: HistoricalTradesParams): Promise<RawTrade[]> {
    return this.get('api/v3/historicalTrades', params);
  }

  getAggregateTrades(
    params: SymbolFromPaginatedRequestFromId,
  ): Promise<AggregateTrade[]> {
    return this.get('api/v3/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('api/v3/klines', params);
  }

  getUIKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('api/v3/uiKlines', params);
  }

  getAvgPrice(params: BasicSymbolParam): Promise<CurrentAvgPrice> {
    return this.get('api/v3/avgPrice', params);
  }

  get24hrChangeStatististics(
    params: BasicSymbolParam,
  ): Promise<DailyChangeStatistic>;

  get24hrChangeStatististics(
    params?: SymbolArrayParam,
  ): Promise<DailyChangeStatistic[]>;

  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam> | Partial<SymbolArrayParam>,
  ): Promise<DailyChangeStatistic | DailyChangeStatistic[]> {
    if (params && typeof params['symbol'] === 'string') {
      return this.get('api/v3/ticker/24hr', params);
    }

    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const symbols = (params as SymbolArrayParam).symbols;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get('api/v3/ticker/24hr?symbols=' + symbolsQueryParam);
    }

    return this.get('api/v3/ticker/24hr');
  }

  getTradingDayTicker(
    params: TradingDayTickerParams,
  ): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]> {
    return this.get('api/v3/ticker/tradingDay', params);
  }

  getSymbolPriceTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('api/v3/ticker/price', params);
  }

  getSymbolOrderBookTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]> {
    return this.get('api/v3/ticker/bookTicker', params);
  }

  getRollingWindowTicker(
    params: RollingWindowTickerParams,
  ): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]> {
    return this.get('api/v3/ticker', params);
  }

  /**
   *
   * SPOT TRADING Endpoints - Trading endpoints
   *
   **/

  submitNewOrder<
    T extends OrderType,
    RT extends OrderResponseType | undefined = undefined,
  >(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order', params);
  }

  testNewOrder<
    T extends OrderType,
    RT extends OrderResponseType | undefined = undefined,
  >(params: NewSpotOrderParams<T, RT>): Promise<{}> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order/test', params);
  }

  getOrder(params: GetOrderParams): Promise<SpotOrder> {
    return this.getPrivate('api/v3/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('api/v3/order', params);
  }

  cancelAllSymbolOrders(
    params: BasicSymbolParam,
  ): Promise<CancelSpotOrderResult[]> {
    return this.deletePrivate('api/v3/openOrders', params);
  }

  replaceOrder<
    T extends OrderType,
    RT extends OrderResponseType | undefined = undefined,
  >(
    params: ReplaceSpotOrderParams<T, RT>,
  ): Promise<ReplaceSpotOrderResultSuccess<T, RT>> {
    return this.postPrivate('api/v3/order/cancelReplace', params);
  }

  getOpenOrders(params?: Partial<BasicSymbolParam>): Promise<SpotOrder[]> {
    return this.getPrivate('api/v3/openOrders', params);
  }

  getAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]> {
    return this.getPrivate('api/v3/allOrders', params);
  }

  /**
   * @deprecated
   */
  submitNewOCO(params: NewOCOParams): Promise<any> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    return this.postPrivate('api/v3/order/oco', params);
  }

  submitNewOrderList<T extends OrderResponseType>(
    params: NewOrderListParams<T>,
  ): Promise<OrderListResponse<T>> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'aboveClientOrderId');
    this.validateOrderId(params, 'belowClientOrderId');
    return this.postPrivate('api/v3/orderList/oco', params);
  }

  // TO CHECK!!
  submitNewOrderListOTO(
    params: NewOrderListOTOParams,
  ): Promise<NewOrderListOTOResponse> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'workingClientOrderId');
    this.validateOrderId(params, 'pendingClientOrderId');
    return this.postPrivate('api/v3/orderList/oto', params);
  }

  // TO CHECK!!
  submitNewOrderListOTOCO(
    params: NewOrderListOTOCOParams,
  ): Promise<NewOrderListOTOCOResponse> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'workingClientOrderId');
    this.validateOrderId(params, 'pendingAboveClientOrderId');
    this.validateOrderId(params, 'pendingBelowClientOrderId');
    return this.postPrivate('api/v3/orderList/otoco', params);
  }

  cancelOCO(params: CancelOCOParams): Promise<CancelOrderListResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.deletePrivate('api/v3/orderList', params);
  }

  getOCO(params?: GetOCOParams): Promise<OrderList> {
    return this.getPrivate('api/v3/orderList', params);
  }

  getAllOCO(params?: BasicFromPaginatedParams): Promise<OrderList[]> {
    return this.getPrivate('api/v3/allOrderList', params);
  }

  /**
   * Query open OCO
   */
  getAllOpenOCO(): Promise<OrderList[]> {
    return this.getPrivate('api/v3/openOrderList');
  }

  /**
   * Places an order using smart order routing (SOR).
   */
  submitNewSOROrder(
    params: NewSpotSOROrderParams,
  ): Promise<SOROrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/sor/order', params);
  }

  /**
   * Test new order creation and signature/recvWindow using smart order routing (SOR).
   * Creates and validates a new order but does not send it into the matching engine.
   */
  testNewSOROrder(
    params: NewSpotSOROrderParams & { computeCommissionRates?: boolean },
  ): Promise<{} | SORTestOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/sor/order/test', params);
  }

  /**
   *
   * SPOT TRADING Endpoints - Account endpoints
   *
   **/

  /**
   * Get current account information
   */
  getAccountInformation(): Promise<AccountInformation> {
    return this.getPrivate('api/v3/account');
  }

  getAccountTradeList(
    params: SymbolFromPaginatedRequestFromId & { orderId?: number },
  ): Promise<RawAccountTrade[]> {
    return this.getPrivate('api/v3/myTrades', params);
  }

  getOrderRateLimit(): Promise<OrderRateLimitUsage[]> {
    return this.getPrivate('api/v3/rateLimit/order');
  }

  getPreventedMatches(
    params: PreventedMatchesParams,
  ): Promise<PreventedMatch[]> {
    return this.getPrivate('api/v3/myPreventedMatches', params);
  }

  getAllocations(params: AllocationsParams): Promise<any> {
    return this.getPrivate('api/v3/myAllocations', params);
  }

  getCommissionRates(params: { symbol: string }): Promise<CommissionRates> {
    return this.getPrivate('api/v3/account/commission', params);
  }

  /**
   *
   * MARGIN TRADING Endpoints - Market Data endpoints
   *
   **/

  getCrossMarginCollateralRatio(): Promise<
    {
      collaterals: Collateral[];
      assetNames: string[];
    }[]
  > {
    return this.getPrivate('sapi/v1/margin/crossMarginCollateralRatio');
  }

  getAllCrossMarginPairs(): Promise<QueryCrossMarginPairResponse[]> {
    return this.get('sapi/v1/margin/allPairs');
  }

  getIsolatedMarginAllSymbols(params?: {
    symbol?: string;
  }): Promise<IsolatedMarginSymbol[]> {
    return this.getPrivate('sapi/v1/margin/isolated/allPairs', params);
  }

  getAllMarginAssets(): Promise<QueryMarginAssetResponse[]> {
    return this.get('sapi/v1/margin/allAssets');
  }

  getMarginDelistSchedule(): Promise<MarginDelistSchedule[]> {
    return this.getPrivate('sapi/v1/margin/delist-schedule');
  }

  getIsolatedMarginTierData(
    params: QueryIsolatedMarginTierDataParams,
  ): Promise<IsolatedMarginTierData[]> {
    return this.getPrivate('sapi/v1/margin/isolatedMarginTier', params);
  }

  queryMarginPriceIndex(
    params: BasicSymbolParam,
  ): Promise<QueryMarginPriceIndexResponse> {
    return this.get('sapi/v1/margin/priceIndex', params);
  }

  getMarginAvailableInventory(params: {
    type: string;
  }): Promise<MarginAvailableInventoryResponse> {
    return this.getPrivate('sapi/v1/margin/available-inventory', params);
  }

  getLeverageBracket(): Promise<LiabilityCoinLeverageBracket[]> {
    return this.getPrivate('sapi/v1/margin/leverageBracket');
  }

  /**
   *
   * MARGIN TRADING Endpoints - Borrow and Repay endpoints
   *
   **/

  getNextHourlyInterestRate(
    params: GetNextHourlyInterestRateParams,
  ): Promise<NextHourlyInterestRate[]> {
    return this.getPrivate('sapi/v1/margin/next-hourly-interest-rate', params);
  }

  getMarginInterestHistory(params: GetMarginInterestHistoryParams): Promise<{
    rows: MarginInterestHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/margin/interestHistory', params);
  }

  submitMarginAccountBorrowRepay(
    params: MarginAccountLoanParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/borrow-repay', params);
  }

  getMarginAccountBorrowRepayRecords(
    params: GetMarginAccountBorrowRepayRecordsParams,
  ): Promise<{ rows: MarginAccountRecord[]; total: number }> {
    return this.getPrivate('sapi/v1/margin/borrow-repay', params);
  }

  getMarginInterestRateHistory(
    params: QueryMarginInterestRateHistoryParams,
  ): Promise<MarginInterestRateHistory[]> {
    return this.getPrivate('sapi/v1/margin/interestRateHistory', params);
  }

  queryMaxBorrow(
    params: BasicMarginAssetParams,
  ): Promise<QueryMaxBorrowResponse> {
    return this.getPrivate('sapi/v1/margin/maxBorrowable', params);
  }

  /**
   *
   * MARGIN TRADING Endpoints - Trade endpoints
   *
   **/

  getMarginForceLiquidationRecord(
    params: GetForceLiquidationRecordParams,
  ): Promise<{
    rows: ForceLiquidationRecord[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/margin/forceLiquidationRec', params);
  }

  getSmallLiabilityExchangeCoins(): Promise<SmallLiabilityExchangeCoin[]> {
    return this.getPrivate('sapi/v1/margin/exchange-small-liability');
  }

  getSmallLiabilityExchangeHistory(
    params: GetSmallLiabilityExchangeHistoryParams,
  ): Promise<{
    total: number;
    rows: SmallLiabilityExchangeHistory[];
  }> {
    return this.getPrivate(
      'sapi/v1/margin/exchange-small-liability-history',
      params,
    );
  }

  marginAccountCancelOpenOrders(
    params: BasicSymbolParam,
  ): Promise<CancelSpotOrderResult[]> {
    return this.deletePrivate('sapi/v1/margin/openOrders', params);
  }

  marginAccountCancelOCO(params: CancelOCOParams): Promise<any> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.deletePrivate('sapi/v1/margin/orderList', params);
  }

  marginAccountCancelOrder(
    params: CancelOrderParams,
  ): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('sapi/v1/margin/order', params);
  }

  marginAccountNewOCO(params: NewOCOParams): Promise<any> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    return this.postPrivate('sapi/v1/margin/order/oco', params);
  }

  marginAccountNewOrder<
    T extends OrderType,
    RT extends OrderResponseType | undefined = undefined,
  >(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('sapi/v1/margin/order', params);
  }

  getMarginOrderCountUsage(
    params: GetMarginOrderCountUsageParams,
  ): Promise<MarginOrderCountUsageResponse[]> {
    return this.getPrivate('sapi/v1/margin/rateLimit/order', params);
  }

  queryMarginAccountAllOCO(
    params: QueryMarginAccountAllOCOParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/margin/allOrderList', params);
  }

  queryMarginAccountAllOrders(
    params: GetAllOrdersParams,
  ): Promise<SpotOrder[]> {
    return this.getPrivate('sapi/v1/margin/allOrders', params);
  }

  queryMarginAccountOCO(params: GetOCOParams): Promise<any> {
    return this.getPrivate('sapi/v1/margin/orderList', params);
  }

  queryMarginAccountOpenOCO(params: {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
  }): Promise<any> {
    return this.getPrivate('sapi/v1/margin/openOrderList', params);
  }

  queryMarginAccountOpenOrders(params: BasicSymbolParam): Promise<SpotOrder[]> {
    return this.getPrivate('sapi/v1/margin/openOrders', params);
  }

  queryMarginAccountOrder(params: GetOrderParams): Promise<SpotOrder> {
    return this.getPrivate('sapi/v1/margin/order', params);
  }

  queryMarginAccountTradeList(
    params: QueryMarginAccountTradeListParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/margin/myTrades', params);
  }

  submitSmallLiabilityExchange(params: { assetNames: string[] }): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.postPrivate('sapi/v1/margin/exchange-small-liability', params);
  }

  submitManualLiquidation(
    params: ManualLiquidationParams,
  ): Promise<ManualLiquidationResponse[]> {
    return this.postPrivate('sapi/v1/margin/manual-liquidation', params);
  }

  /**
   *
   * MARGIN TRADING Endpoints - Transfer endpoints
   *
   **/

  getCrossMarginTransferHistory(
    params: GetCrossMarginTransferHistoryParams,
  ): Promise<RowsWithTotal<CrossMarginTransferHistory>> {
    return this.getPrivate('sapi/v1/margin/transfer', params);
  }

  queryMaxTransferOutAmount(
    params: BasicMarginAssetParams,
  ): Promise<QueryMaxTransferOutAmountResponse> {
    return this.getPrivate('sapi/v1/margin/maxTransferable', params);
  }

  /**
   *
   * MARGIN TRADING Endpoints - Account endpoints
   *
   **/

  updateCrossMarginMaxLeverage(params: { maxLeverage: number }): Promise<{
    success: boolean;
  }> {
    return this.postPrivate('sapi/v1/margin/max-leverage', params);
  }

  disableIsolatedMarginAccount(params: { symbol: string }): Promise<{
    success: boolean;
    symbol: string;
  }> {
    return this.deletePrivate('sapi/v1/margin/isolated/account', params);
  }

  enableIsolatedMarginAccount(params: { symbols: string }): Promise<{
    success: boolean;
    symbol: string;
  }> {
    return this.postPrivate('sapi/v1/margin/isolated/account', params);
  }

  getBNBBurn(): Promise<BNBBurnResponse> {
    return this.getPrivate('sapi/v1/bnbBurn');
  }

  getMarginSummary(): Promise<any> {
    return this.getPrivate('sapi/v1/margin/tradeCoeff');
  }

  queryCrossMarginAccountDetails(): Promise<QueryCrossMarginAccountDetailsParams> {
    return this.getPrivate('sapi/v1/margin/account');
  }

  getCrossMarginFeeData(
    params: QueryCrossMarginFeeDataParams,
  ): Promise<CrossMarginFeeData[]> {
    return this.getPrivate('sapi/v1/margin/crossMarginData', params);
  }

  getIsolatedMarginAccountLimit(): Promise<{
    enabledAccount: number;
    maxAccount: number;
  }> {
    return this.getPrivate('sapi/v1/margin/isolated/accountLimit');
  }

  getIsolatedMarginAccountInfo(params?: {
    symbols?: string;
  }): Promise<IsolatedMarginAccountInfo> {
    return this.getPrivate('sapi/v1/margin/isolated/account', { params });
  }

  getIsolatedMarginFeeData(
    params: QueryCrossMarginFeeDataParams,
  ): Promise<IsolatedMarginFeeData[]> {
    return this.getPrivate('sapi/v1/margin/isolatedMarginData', params);
  }

  toggleBNBBurn(params: ToggleBNBBurnParams): Promise<BNBBurnResponse> {
    return this.postPrivate('sapi/v1/bnbBurn', params);
  }

  /**
   * Only existing in old documentation, not in new documentation
   * Endpoint works, but I didnt find any information about it in new docs
   */
  getMarginCapitalFlow(
    params: GetMarginCapitalFlowParams,
  ): Promise<MarginCapitalFlow[]> {
    return this.getPrivate('sapi/v1/margin/capital-flow', params);
  }

  /**
   * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
   */
  queryLoanRecord(
    params: QueryMarginRecordParams,
  ): Promise<{ rows: MarginAccountRecord[]; total: number }> {
    return this.getPrivate('sapi/v1/margin/loan', params);
  }

  /**
   * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
   */
  queryRepayRecord(
    params: QueryMarginRecordParams,
  ): Promise<{ rows: MarginAccountRecord[]; total: number }> {
    return this.getPrivate('sapi/v1/margin/repay', params);
  }

  /**
   * @deprecated on 2024-01-09, use submitUniversalTransfer() instead
   */
  isolatedMarginAccountTransfer(
    params: IsolatedMarginAccountTransferParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/isolated/transfer', params);
  }


  /**
   *
   * SUB ACCOUNT Endpoints - Account management
   *
   **/

  
  /**
   *
   * SUB ACCOUNT Endpoints - API management
   *
   **/

  
  /**
   *
   * SUB ACCOUNT Endpoints - Asset management
   *
   **/

  
  /**
   *
   * SUB ACCOUNT Endpoints - Managed Sub Account 
   *
   **/

  




  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(
    params:
      | NewSpotOrderParams<any, any>
      | CancelOrderParams
      | NewOCOParams
      | CancelOCOParams
      | NewOrderListParams<any>,
    orderIdProperty: OrderIdProperty,
  ): void {
    const apiCategory = 'spot';
    if (!params[orderIdProperty]) {
      params[orderIdProperty] = generateNewOrderId(apiCategory);
      return;
    }

    const expectedOrderIdPrefix = `x-${getOrderIdPrefix(apiCategory)}`;
    if (!params[orderIdProperty].startsWith(expectedOrderIdPrefix)) {
      logInvalidOrderId(orderIdProperty, expectedOrderIdPrefix, params);
    }
  }
}

/**
 * @deprecated use MainClient instead of SpotClient (it is the same)
 */
export const SpotClient = MainClient;
