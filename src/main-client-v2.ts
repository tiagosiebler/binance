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

  createVirtualSubAccount(
    params: CreateSubAccountParams,
  ): Promise<VirtualSubAccount> {
    return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
  }

  getSubAccountList(
    params?: SubAccountListParams,
  ): Promise<SubAccountListResponse> {
    return this.getPrivate('sapi/v1/sub-account/list', params);
  }

  subAccountEnableFutures(email: string): Promise<SubAccountEnableFutures> {
    return this.postPrivate('sapi/v1/sub-account/futures/enable', { email });
  }

  subAccountEnableMargin(email: string): Promise<SubAccountEnableMargin> {
    return this.postPrivate('sapi/v1/sub-account/margin/enable', { email });
  }

  enableOptionsForSubAccount(params: {
    email: string;
  }): Promise<EnableOptionsForSubAccountResponse> {
    return this.postPrivate('sapi/v1/sub-account/eoptions/enable', params);
  }

  subAccountEnableLeverageToken(
    params: SubAccountEnableLeverageToken,
  ): Promise<SubAccountEnableLeverageToken> {
    return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
  }

  getSubAccountStatusOnMarginOrFutures(params?: {
    email?: string;
  }): Promise<SubAccountStatus[]> {
    return this.getPrivate('sapi/v1/sub-account/status', params);
  }

  getSubAccountFuturesPositionRisk(
    email: string,
  ): Promise<FuturesPositionRisk[]> {
    return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
      email,
    });
  }

  getSubAccountFuturesPositionRiskV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk> {
    return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
  }

  getSubAccountTransactionStatistics(params: {
    email: string;
  }): Promise<SubAccountTransactionStatistics> {
    return this.getPrivate(
      'sapi/v1/sub-account/transaction-statistics',
      params,
    );
  }

  /**
   *
   * SUB ACCOUNT Endpoints - API management
   *
   **/

  getSubAccountIPRestriction(
    params: BasicSubAccount,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.getPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  subAccountDeleteIPList(
    params: EnableOrDisableIPRestrictionForSubAccountParams,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.deletePrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  subAccountAddIPRestriction(
    params: AddIpRestriction,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.postPrivate(
      'sapi/v2/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  /**
   * Only in old documentation!!
   * Use new endpoints instead!!
   **/
  subAccountAddIPList(
    params: SubAccountEnableOrDisableIPRestriction,
  ): Promise<SubAccountAddOrDeleteIPList> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  /**
   * Only in old documentation!!
   * Use new endpoints instead!!
   **/
  subAccountEnableOrDisableIPRestriction(
    params: EnableOrDisableIPRestrictionForSubAccountParams,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  /**
   *
   * SUB ACCOUNT Endpoints - Asset management
   *
   **/

  subAccountFuturesTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
  }

  getSubAccountFuturesAccountDetail(
    email: string,
  ): Promise<SubAccountFuturesAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
  }

  getSubAccountDetailOnFuturesAccountV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail> {
    return this.getPrivate('sapi/v2/sub-account/futures/account', params);
  }

  getSubAccountDetailOnMarginAccount(
    email: string,
  ): Promise<SubAccountMarginAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/margin/account', { email });
  }

  getSubAccountDepositAddress(
    params: SubAccountDepositAddressParams,
  ): Promise<SubAccountDepositAddress> {
    return this.getPrivate('sapi/v1/capital/deposit/subAddress', params);
  }

  getSubAccountDepositHistory(
    params: SubAccountDepositHistoryParams,
  ): Promise<DepositHistory[]> {
    return this.getPrivate('sapi/v1/capital/deposit/subHisrec', params);
  }

  getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
  }

  getSubAccountSummaryOnFuturesAccountV2(
    params: SubAccountSummaryOnFuturesAccountV2Params,
  ): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary> {
    return this.getPrivate(
      'sapi/v2/sub-account/futures/accountSummary',
      params,
    );
  }

  getSubAccountsSummaryOfMarginAccount(): Promise<SubAccountsMarginAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/margin/accountSummary');
  }

  subAccountMarginTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
  }

  getSubAccountAssets(
    params: SubAccountAssetsParams,
  ): Promise<SubAccountAssets> {
    return this.getPrivate('sapi/v3/sub-account/assets', params);
  }

  getSubAccountAssetsMaster(params: { email: string }): Promise<{
    balances: SubaccountBalances[];
  }> {
    return this.getPrivate('sapi/v4/sub-account/assets', params);
  }

  getSubAccountFuturesAssetTransferHistory(
    params: SubAccountFuturesAssetTransferHistoryParams,
  ): Promise<SubAccountFuturesAssetTransferHistory> {
    return this.getPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  getSubAccountSpotAssetTransferHistory(
    params?: SubAccountSpotAssetTransferHistoryParams,
  ): Promise<SubAccountSpotAssetTransferHistory> {
    return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
  }

  getSubAccountSpotAssetsSummary(
    params?: SubAccountSpotAssetsSummaryParams,
  ): Promise<SubAccountSpotAssetsSummary> {
    return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
  }

  getSubAccountUniversalTransferHistory(
    params?: SubAccountUniversalTransferHistoryParams,
  ): Promise<SubAccountUniversalTransferHistoryResponse> {
    return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  subAccountFuturesAssetTransfer(
    params: SubAccountFuturesAssetTransferParams,
  ): Promise<SubAccountFuturesAssetTransfer> {
    return this.postPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  subAccountTransferHistory(
    params?: SubAccountTransferHistoryParams,
  ): Promise<SubAccountTransferHistory[]> {
    return this.getPrivate(
      'sapi/v1/sub-account/transfer/subUserHistory',
      params,
    );
  }

  subAccountTransferToMaster(
    params: SubAccountTransferToMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
  }

  subAccountTransferToSameMaster(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
  }

  subAccountUniversalTransfer(
    params: SubAccountUniversalTransferParams,
  ): Promise<SubAccountUniversalTransfer> {
    return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  /**
   *
   * SUB ACCOUNT Endpoints - Managed Sub Account
   *
   **/

  depositAssetsIntoManagedSubAccount(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
  }

  getManagedSubAccountDepositAddress(
    params: ManagedSubAccountDepositAddressParams,
  ): Promise<ManagedSubAccountDepositAddress> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/deposit/address',
      params,
    );
  }

  withdrawAssetsFromManagedSubAccount(
    params: WithdrawAssetsFromManagedSubAccountParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/withdraw', params);
  }

  getManagedSubAccountTransfersParent(
    params: ManagedSubAccountTransferLogParams,
  ): Promise<{
    managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
    count: number;
  }> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/queryTransLogForTradeParent',
      params,
    );
  }

  getManagedSubAccountTransferLog(
    params: ManagedSubAccountTransferTTLogParams,
  ): Promise<{
    managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
    count: number;
  }> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/query-trans-log',
      params,
    );
  }

  getManagedSubAccountTransfersInvestor(
    params: ManagedSubAccountTransferLogParams,
  ): Promise<{
    managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
    count: number;
  }> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/queryTransLogForInvestor',
      params,
    );
  }

  getManagedSubAccounts(params: ManagedSubAccountListParams): Promise<{
    total: number;
    managerSubUserInfoVoList: ManagerSubUserInfoVo[];
  }> {
    return this.getPrivate('sapi/v1/managed-subaccount/info', params);
  }

  getManagedSubAccountSnapshot(
    params: ManagedSubAccountSnapshotParams,
  ): Promise<ManagedSubAccountSnapshot> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/accountSnapshot',
      params,
    );
  }

  getManagedSubAccountAssetDetails(
    email: string,
  ): Promise<SubAccountAssetDetails[]> {
    return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
  }

  getManagedSubAccountMarginAssets(params: {
    email: string;
  }): Promise<ManagedSubAccountMarginAssetsResponse> {
    return this.getPrivate('sapi/v1/managed-subaccount/marginAsset', params);
  }

  getManagedSubAccountFuturesAssets(params: {
    email: string;
  }): Promise<ManagedSubAccountFuturesAssetsResponse> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/fetch-future-asset',
      params,
    );
  }

  /**
   *
   * CONVERT Endpoints - Market Data
   *
   **/

  getConvertPairs(params: GetAllConvertPairsParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/exchangeInfo', params);
  }

  getConvertAssetInfo(): Promise<any> {
    return this.getPrivate('sapi/v1/convert/assetInfo');
  }

  /**
   *
   * CONVERT Endpoints - Trade
   *
   **/

  convertQuoteRequest(params: ConvertQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/getQuote', params);
  }

  acceptQuoteRequest(params: AcceptQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/acceptQuote', params);
  }

  getConvertTradeHistory(params: GetConvertTradeHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/tradeFlow', params);
  }

  getOrderStatus(params: GetOrderStatusParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/orderStatus', params);
  }

  submitConvertLimitOrder(params: SubmitConvertLimitOrderParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/limit/placeOrder', params);
  }

  cancelConvertLimitOrder(params: { orderId: number }): Promise<any> {
    return this.postPrivate('sapi/v1/convert/limit/cancelOrder', params);
  }

  getConvertLimitOpenOrders(): Promise<{
    list: ConvertLimitOpenOrder[];
  }> {
    return this.getPrivate('sapi/v1/convert/limit/queryOpenOrders');
  }

  /**
   *
   * COPY TRADING Endpoints - Future copy trading
   *
   **/

  getFuturesLeadTraderStatus(): Promise<GetFuturesLeadTraderStatusResponse> {
    return this.getPrivate('sapi/v1/copyTrading/futures/userStatus');
  }

  getFuturesLeadTradingSymbolWhitelist(): Promise<
    GetFuturesLeadTradingSymbolWhitelistResponse[]
  > {
    return this.getPrivate('sapi/v1/copyTrading/futures/leadSymbol');
  }

  /**
   *
   * ALGO TRADING Endpoints - Future algo
   *
   **/

  submitVpNewOrder(
    params: SubmitVpNewOrderParams,
  ): Promise<SubmitVpNewOrderResponse> {
    this.validateOrderId(params, 'clientAlgoId');
    return this.postPrivate('sapi/v1/algo/futures/newOrderVp', params);
  }

  submitTwapNewOrder(
    params: SubmitTwapNewOrderParams,
  ): Promise<SubmitTwapNewOrderResponse> {
    this.validateOrderId(params, 'clientAlgoId');
    return this.postPrivate('sapi/v1/algo/futures/newOrderTwap', params);
  }

  cancelAlgoOrder(params: {
    algoId: number;
  }): Promise<CancelAlgoOrderResponse> {
    return this.deletePrivate('sapi/v1/algo/futures/order', params);
  }

  getAlgoSubOrders(
    params: GetAlgoSubOrdersParams,
  ): Promise<GetAlgoSubOrdersResponse> {
    return this.getPrivate('sapi/v1/algo/futures/subOrders', params);
  }

  getAlgoOpenOrders(): Promise<{
    total: number;
    orders: AlgoOrder[];
  }> {
    return this.getPrivate('sapi/v1/algo/futures/openOrders');
  }

  getAlgoHistoricalOrders(params: GetAlgoHistoricalOrdersParams): Promise<{
    total: number;
    orders: HistoricalAlgoOrder[];
  }> {
    return this.getPrivate('sapi/v1/algo/futures/historicalOrders', params);
  }

  /**
   *
   * ALGO TRADING Endpoints - Spot algo
   *
   **/

  submitSpotAlgoTwapOrder(
    params: SubmitSpotTwapNewOrderParams,
  ): Promise<SubmitSpotTwapNewOrderResponse> {
    this.validateOrderId(params, 'clientAlgoId');
    return this.postPrivate('sapi/v1/algo/spot/newOrderTwap', params);
  }

  cancelSpotAlgoOrder(params: {
    algoId: number;
  }): Promise<CancelSpotAlgoOrderResponse> {
    return this.deletePrivate('sapi/v1/algo/spot/order', params);
  }

  getSpotAlgoSubOrders(
    params: GetSpotAlgoSubOrdersParams,
  ): Promise<GetSpotAlgoSubOrdersResponse> {
    return this.getPrivate('sapi/v1/algo/spot/subOrders', params);
  }

  getSpotAlgoOpenOrders(): Promise<{
    total: number;
    orders: SpotAlgoOrder[];
  }> {
    return this.getPrivate('sapi/v1/algo/spot/openOrders');
  }

  getSpotAlgoHistoricalOrders(
    params: GetSpotAlgoHistoricalOrdersParams,
  ): Promise<{
    total: number;
    orders: HistoricalSpotAlgoOrder[];
  }> {
    return this.getPrivate('sapi/v1/algo/spot/historicalOrders', params);
  }

  /**
   *
   * SIMPLE EARN Endpoints - Account
   *
   **/

  getSimpleEarnAccount(): Promise<SimpleEarnAccountResponse> {
    return this.getPrivate(`/sapi/v1/simple-earn/account`);
  }

  getFlexibleSavingProducts(params?: SimpleEarnProductListParams): Promise<{
    rows: SimpleEarnFlexibleProduct[];
    total: number;
  }> {
    return this.getPrivate(`/sapi/v1/simple-earn/flexible/list`, params);
  }

  getSimpleEarnLockedProductList(
    params?: SimpleEarnProductListParams,
  ): Promise<{
    rows: SimpleEarnLockedProduct[];
    total: number;
  }> {
    return this.getPrivate(`/sapi/v1/simple-earn/locked/list`, params);
  }

  getFlexibleProductPosition(
    params?: SimpleEarnFlexibleProductPositionParams,
  ): Promise<{
    rows: any[];
    total: number;
  }> {
    return this.getPrivate(`/sapi/v1/simple-earn/flexible/position`, params);
  }

  getLockedProductPosition(
    params?: SimpleEarnLockedProductPositionParams,
  ): Promise<{
    rows: SimpleEarnLockedProductPosition[];
    total: number;
  }> {
    return this.getPrivate(`/sapi/v1/simple-earn/locked/position`, params);
  }

  getFlexiblePersonalLeftQuota(params: { productId: string }): Promise<{
    leftPersonalQuota: string;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/personalLeftQuota',
      params,
    );
  }

  getLockedPersonalLeftQuota(params: { projectId: string }): Promise<{
    leftPersonalQuota: string;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/locked/personalLeftQuota',
      params,
    );
  }

  /**
   *
   * SIMPLE EARN Endpoints - Earn
   *
   **/

  purchaseFlexibleProduct(
    params: SimpleEarnSubscribeProductParams,
  ): Promise<SimpleEarnSubscribeFlexibleProductResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/flexible/subscribe`, params);
  }

  subscribeSimpleEarnLockedProduct(
    params: SimpleEarnSubscribeProductParams,
  ): Promise<SimpleEarnSubscribeLockedProductResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/locked/subscribe`, params);
  }

  redeemFlexibleProduct(params: {
    positionId: string;
  }): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/flexible/redeem`, params);
  }

  redeemLockedProduct(params: {
    positionId: string;
  }): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/locked/redeem`, params);
  }

  setFlexibleAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
    success: boolean;
  }> {
    return this.postPrivate(
      'sapi/v1/simple-earn/flexible/setAutoSubscribe',
      params,
    );
  }

  setLockedAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
    success: boolean;
  }> {
    return this.postPrivate(
      'sapi/v1/simple-earn/locked/setAutoSubscribe',
      params,
    );
  }

  getFlexibleSubscriptionPreview(
    params: GetFlexibleSubscriptionPreviewParams,
  ): Promise<FlexibleSubscriptionPreview> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/subscriptionPreview',
      params,
    );
  }

  getLockedSubscriptionPreview(
    params: GetLockedSubscriptionPreviewParams,
  ): Promise<LockedSubscriptionPreview[]> {
    return this.getPrivate(
      'sapi/v1/simple-earn/locked/subscriptionPreview',
      params,
    );
  }

  setLockedProductRedeemOption(params: {
    positionId: string;
    redeemTo: 'SPOT' | 'FLEXIBLE';
  }): Promise<{
    success: boolean;
  }> {
    return this.postPrivate(
      'sapi/v1/simple-earn/locked/setRedeemOption',
      params,
    );
  }

  /**
   *
   * SIMPLE EARN Endpoints - History
   *
   **/

  getFlexibleSubscriptionRecord(
    params: GetFlexibleSubscriptionRecordParams,
  ): Promise<{
    rows: GetFlexibleSubscriptionRecordResponse[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/subscriptionRecord',
      params,
    );
  }

  getLockedSubscriptionRecord(
    params: GetLockedSubscriptionRecordParams,
  ): Promise<{
    rows: LockedSubscriptionRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/locked/history/subscriptionRecord',
      params,
    );
  }

  getFlexibleRedemptionRecord(
    params: GetFlexibleRedemptionRecordParams,
  ): Promise<{
    rows: FlexibleRedemptionRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/redemptionRecord',
      params,
    );
  }

  getLockedRedemptionRecord(params: GetLockedRedemptionRecordParams): Promise<{
    rows: LockedRedemptionRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/locked/history/redemptionRecord',
      params,
    );
  }

  getFlexibleRewardsHistory(params: GetFlexibleRewardsHistoryParams): Promise<{
    rows: FlexibleRewardsHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/rewardsRecord',
      params,
    );
  }

  getLockedRewardsHistory(params: GetLockedRewardsHistoryParams): Promise<{
    rows: GetLockedRewardsHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/locked/history/rewardsRecord',
      params,
    );
  }

  getCollateralRecord(params: GetCollateralRecordParams): Promise<{
    rows: CollateralRecord[];
    total: string;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/collateralRecord',
      params,
    );
  }

  getRateHistory(params: GetRateHistoryParams): Promise<{
    rows: GetRateHistory[];
    total: string;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/rateHistory',
      params,
    );
  }

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
