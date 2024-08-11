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
   * Wallet Endpoints
   *
   **/

  getSystemStatus(): Promise<SystemStatusResponse> {
    return this.get('sapi/v1/system/status');
  }

  getBalances(): Promise<AllCoinsInformationResponse[]> {
    return this.getPrivate('sapi/v1/capital/config/getall');
  }

  getDailyAccountSnapshot(
    params: DailyAccountSnapshotParams,
  ): Promise<DailyAccountSnapshot> {
    return this.getPrivate('sapi/v1/accountSnapshot', params);
  }

  disableFastWithdrawSwitch(): Promise<{}> {
    return this.postPrivate('sapi/v1/account/disableFastWithdrawSwitch');
  }

  enableFastWithdrawSwitch(): Promise<{}> {
    return this.postPrivate('sapi/v1/account/enableFastWithdrawSwitch');
  }

  withdraw(params: WithdrawParams): Promise<{ id: string }> {
    return this.postPrivate('sapi/v1/capital/withdraw/apply', params);
  }

  getDepositHistory(params?: DepositHistoryParams): Promise<DepositHistory[]> {
    return this.getPrivate('sapi/v1/capital/deposit/hisrec', params);
  }

  getWithdrawHistory(
    params?: WithdrawHistoryParams,
  ): Promise<WithdrawHistory[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/history', params);
  }

  getDepositAddress(
    params: DepositAddressParams,
  ): Promise<DepositAddressResponse> {
    return this.getPrivate('sapi/v1/capital/deposit/address', params);
  }

  getAccountStatus(): Promise<{ data: string }> {
    return this.getPrivate('sapi/v1/account/status');
  }

  getDustLog(params?: BasicTimeRangeParam): Promise<DustLog> {
    return this.getPrivate('sapi/v1/asset/dribblet', params);
  }

  convertDustToBnb(params: ConvertDustParams): Promise<DustConversion> {
    return this.postPrivate('sapi/v1/asset/dust', params);
  }

  getDust(): Promise<DustInfo> {
    return this.postPrivate('sapi/v1/asset/dust-btc');
  }

  getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any> {
    return this.getPrivate('sapi/v1/asset/assetDividend', params);
  }

  getAssetDetail(
    params?: Partial<BasicAssetParam>,
  ): Promise<Record<ExchangeSymbol, AssetDetail>> {
    return this.getPrivate('sapi/v1/asset/assetDetail', params);
  }

  getTradeFee(params?: Partial<BasicSymbolParam>): Promise<SymbolTradeFee[]> {
    return this.getPrivate('sapi/v1/asset/tradeFee', params);
  }

  submitUniversalTransfer(
    params: UniversalTransferParams,
  ): Promise<{ tranId: number }> {
    return this.postPrivate('sapi/v1/asset/transfer', params);
  }

  getUniversalTransferHistory(
    params: UniversalTransferHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/asset/transfer', params);
  }

  getApiTradingStatus(): Promise<APITradingStatus> {
    return this.getPrivate('sapi/v1/account/apiTradingStatus');
  }

  getApiKeyPermissions(): Promise<APIPermissions> {
    return this.getPrivate('sapi/v1/account/apiRestrictions');
  }

  enableConvertSubAccount(params: EnableConvertSubAccountParams): Promise<any> {
    return this.postPrivate('sapi/v1/broker/subAccount/convert', params);
  }

  getFundingAsset(params: GetAssetParams): Promise<FundingAsset[]> {
    return this.postPrivate('sapi/v1/asset/get-funding-asset', params);
  }

  getUserAsset(params: GetAssetParams): Promise<UserAsset[]> {
    return this.postPrivate('sapi/v3/asset/getUserAsset', params);
  }

  convertBUSD(params: ConvertTransfer): Promise<ConvertTransferResponse> {
    return this.postPrivate('sapi/v1/asset/convert-transfer', params);
  }

  getConvertBUSDHistory(params: GetConvertBUSDHistoryParams): Promise<{
    total: number;
    rows: BUSDConversionRecord[];
  }> {
    return this.getPrivate(
      'sapi/v1/asset/convert-transfer/queryByPage',
      params,
    );
  }

  getCloudMiningHistory(params: CloudMiningHistoryParams): Promise<{
    total: number;
    rows: CloudMining[];
  }> {
    return this.getPrivate(
      'sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage',
      params,
    );
  }

  getAutoConvertStablecoins(): Promise<ConvertibleCoinsResponse> {
    return this.getPrivate('sapi/v1/capital/contract/convertible-coins');
  }

  setConvertibleCoins(params: ConvertibleCoinsParams): Promise<void> {
    return this.postPrivate(
      'sapi/v1/capital/contract/convertible-coins',
      params,
    );
  }

  submitDepositCredit(
    params: SubmitDepositCreditParams,
  ): Promise<SubmitDepositCreditResponse> {
    return this.postPrivate('sapi/v1/capital/deposit/credit-apply', params);
  }

  getDepositAddresses(
    params: DepositAddressListParams,
  ): Promise<DepositAddress[]> {
    return this.getPrivate('sapi/v1/capital/deposit/address/list', params);
  }

  getWalletBalances(): Promise<WalletBalance[]> {
    return this.getPrivate('sapi/v1/asset/wallet/balance');
  }

  getDelegationHistory(
    params: DelegationHistoryParams,
  ): Promise<RowsWithTotal<DelegationHistory>> {
    return this.getPrivate('sapi/v1/asset/custody/transfer-history', params);
  }

  getDelistSchedule(): Promise<DelistScheduleResponse[]> {
    return this.getPrivate('sapi/v1/spot/delist-schedule');
  }

  getWithdrawAddresses(): Promise<WithdrawAddress[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/address/list');
  }

  getAccountInfo(): Promise<AccountInfo> {
    return this.getPrivate('sapi/v1/account/info');
  }

  /**
   *
   *
   * Sub-Account Endpoints
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

  getSubAccountSpotAssetTransferHistory(
    params?: SubAccountSpotAssetTransferHistoryParams,
  ): Promise<SubAccountSpotAssetTransferHistory> {
    return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
  }

  getSubAccountFuturesAssetTransferHistory(
    params: SubAccountFuturesAssetTransferHistoryParams,
  ): Promise<SubAccountFuturesAssetTransferHistory> {
    return this.getPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  subAccountFuturesAssetTransfer(
    params: SubAccountFuturesAssetTransferParams,
  ): Promise<SubAccountFuturesAssetTransfer> {
    return this.postPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  getSubAccountAssets(
    params: SubAccountAssetsParams,
  ): Promise<SubAccountAssets> {
    return this.getPrivate('sapi/v3/sub-account/assets', params);
  }

  getSubAccountSpotAssetsSummary(
    params?: SubAccountSpotAssetsSummaryParams,
  ): Promise<SubAccountSpotAssetsSummary> {
    return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
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

  getSubAccountStatusOnMarginOrFutures(params?: {
    email?: string;
  }): Promise<SubAccountStatus[]> {
    return this.getPrivate('sapi/v1/sub-account/status', params);
  }

  subAccountEnableMargin(email: string): Promise<SubAccountEnableMargin> {
    return this.postPrivate('sapi/v1/sub-account/margin/enable', { email });
  }

  getSubAccountDetailOnMarginAccount(
    email: string,
  ): Promise<SubAccountMarginAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/margin/account', { email });
  }

  getSubAccountsSummaryOfMarginAccount(): Promise<SubAccountsMarginAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/margin/accountSummary');
  }

  subAccountEnableFutures(email: string): Promise<SubAccountEnableFutures> {
    return this.postPrivate('sapi/v1/sub-account/futures/enable', { email });
  }

  getSubAccountFuturesAccountDetail(
    email: string,
  ): Promise<SubAccountFuturesAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
  }

  getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
  }

  getSubAccountFuturesPositionRisk(
    email: string,
  ): Promise<FuturesPositionRisk[]> {
    return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
      email,
    });
  }

  subAccountFuturesTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
  }

  subAccountMarginTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
  }

  subAccountTransferToSameMaster(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
  }

  subAccountTransferToMaster(
    params: SubAccountTransferToMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
  }

  subAccountTransferHistory(
    params?: SubAccountTransferHistoryParams,
  ): Promise<SubAccountTransferHistory[]> {
    return this.getPrivate(
      'sapi/v1/sub-account/transfer/subUserHistory',
      params,
    );
  }

  subAccountUniversalTransfer(
    params: SubAccountUniversalTransferParams,
  ): Promise<SubAccountUniversalTransfer> {
    return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountUniversalTransferHistory(
    params?: SubAccountUniversalTransferHistoryParams,
  ): Promise<SubAccountUniversalTransferHistoryResponse> {
    return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountDetailOnFuturesAccountV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail> {
    return this.getPrivate('sapi/v2/sub-account/futures/account', params);
  }

  getSubAccountSummaryOnFuturesAccountV2(
    params: SubAccountSummaryOnFuturesAccountV2Params,
  ): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary> {
    return this.getPrivate(
      'sapi/v2/sub-account/futures/accountSummary',
      params,
    );
  }

  getSubAccountFuturesPositionRiskV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk> {
    return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
  }

  subAccountEnableLeverageToken(
    params: SubAccountEnableLeverageToken,
  ): Promise<SubAccountEnableLeverageToken> {
    return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
  }

  subAccountEnableOrDisableIPRestriction(
    params: EnableOrDisableIPRestrictionForSubAccountParams,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  subAccountAddIPList(
    params: SubAccountEnableOrDisableIPRestriction,
  ): Promise<SubAccountAddOrDeleteIPList> {
    return this.postPrivate(
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

  getSubAccountIPRestriction(
    params: BasicSubAccount,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.getPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  subAccountDeleteIPList(
    params: SubAccountEnableOrDisableIPRestriction,
  ): Promise<SubAccountEnableOrDisableIPRestriction> {
    return this.deletePrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  depositAssetsIntoManagedSubAccount(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
  }

  getManagedSubAccountAssetDetails(
    email: string,
  ): Promise<SubAccountAssetDetails[]> {
    return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
  }

  withdrawAssetsFromManagedSubAccount(
    params: WithdrawAssetsFromManagedSubAccountParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/withdraw', params);
  }

  getManagedSubAccountSnapshot(
    params: ManagedSubAccountSnapshotParams,
  ): Promise<ManagedSubAccountSnapshot> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/accountSnapshot',
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

  getManagedSubAccountFuturesAssets(params: {
    email: string;
  }): Promise<ManagedSubAccountFuturesAssetsResponse> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/fetch-future-asset',
      params,
    );
  }

  getManagedSubAccountMarginAssets(params: {
    email: string;
  }): Promise<ManagedSubAccountMarginAssetsResponse> {
    return this.getPrivate('sapi/v1/managed-subaccount/marginAsset', params);
  }

  getSubAccountAssetsMaster(params: { email: string }): Promise<{
    balances: SubaccountBalances[];
  }> {
    return this.getPrivate('sapi/v4/sub-account/assets', params);
  }

  getManagedSubAccounts(params: ManagedSubAccountListParams): Promise<{
    total: number;
    managerSubUserInfoVoList: ManagerSubUserInfoVo[];
  }> {
    return this.getPrivate('sapi/v1/managed-subaccount/info', params);
  }

  getSubAccountTransactionStatistics(params: {
    email: string;
  }): Promise<SubAccountTransactionStatistics> {
    return this.getPrivate(
      'sapi/v1/sub-account/transaction-statistics',
      params,
    );
  }

  getManagedSubAccountDepositAddress(
    params: ManagedSubAccountDepositAddressParams,
  ): Promise<ManagedSubAccountDepositAddress> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/deposit/address',
      params,
    );
  }

  enableOptionsForSubAccount(params: {
    email: string;
  }): Promise<EnableOptionsForSubAccountResponse> {
    return this.postPrivate('sapi/v1/sub-account/eoptions/enable', params);
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

  /**
   * Broker Endpoints
   */

  getBrokerIfNewSpotUser(): Promise<{
    rebateWorking: boolean;
    ifNewUser: boolean;
  }> {
    return this.getPrivate('sapi/v1/apiReferral/ifNewUser');
  }

  getBrokerSubAccountDepositHistory(
    params?: GetBrokerSubAccountDepositHistoryParams,
  ): Promise<SubAccountDepositHistoryList[]> {
    return this.getPrivate('sapi/v1/broker/subAccount/depositHist', params);
  }

  getBrokerUserCustomisedId(market: 'spot' | 'futures') {
    const prefix = market === 'spot' ? 'sapi' : 'fapi';
    return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
  }

  createBrokerSubAccount(
    params: CreateBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  getBrokerSubAccountHistory(
    params: GetBrokerSubAccountHistoryParams,
  ): Promise<BrokerSubAccountHistory[]> {
    return this.getPrivate('sapi/v1/broker/transfer', params);
  }

  getBrokerSubAccount(
    params: GetBrokerSubAccountParams,
  ): Promise<BrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccount', params);
  }

  getApiKeyBrokerSubAccount(
    params: GetApiKeyBrokerSubAccountParams,
  ): Promise<ApiKeyBrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccountApi', params);
  }

  createApiKeyBrokerSubAccount(
    params: CreateApiKeyBrokerSubAccountParams,
  ): Promise<CreateApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi', params);
  }

  deleteApiKeyBrokerSubAccount(
    params: DeleteApiKeyBrokerSubAccountParams,
  ): Promise<{}> {
    return this.deletePrivate('sapi/v1/broker/subAccountApi', params);
  }

  changePermissionApiKeyBrokerSubAccount(
    params: ChangePermissionApiKeyBrokerSubAccountParams,
  ): Promise<ChangePermissionApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
  }

  changeComissionBrokerSubAccount(
    params: ChangePermissionApiKeyBrokerSubAccountParams,
  ): Promise<ChangePermissionApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
  }

  enableUniversalTransferApiKeyBrokerSubAccount(
    params: EnableUniversalTransferApiKeyBrokerSubAccountParams,
  ): Promise<EnableUniversalTransferApiKeyBrokerSubAccountResponse> {
    return this.postPrivate(
      'sapi/v1/broker/subAccountApi/permission/universalTransfer',
      params,
    );
  }

  enableMarginBrokerSubAccount(
    params: EnableMarginBrokerSubAccountParams,
  ): Promise<EnableMarginBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount/futures', params);
  }

  enableFuturesBrokerSubAccount(
    params: EnableFuturesBrokerSubAccountParams,
  ): Promise<EnableFuturesBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  enableMarginApiKeyBrokerSubAccount(
    params: EnableMarginApiKeyBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount/margin', params);
  }

  transferBrokerSubAccount(
    params: TransferBrokerSubAccountParams,
  ): Promise<TransferBrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/transfer', params);
  }

  universalTransferBroker(
    params: UniversalTransferBrokerParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/universalTransfer', params);
  }

  getUniversalTransferBroker(
    params: GetUniversalTransferBrokerParams,
  ): Promise<BrokerSubAccount> {
    return this.getPrivate('sapi/v1/broker/universalTransfer', params);
  }

  getBrokerInfo(): Promise<GetBrokerInfoResponse> {
    return this.getPrivate('sapi/v1/broker/info');
  }

  // USD & Coin-M can be found under API getIncome() (find "API rebate" in results)
  getBrokerSpotRebateHistory(days: 7 | 30, customerId?: string) {
    if (days === 7) {
      return this.getPrivate('sapi/v1/apiReferral/rebate/recentRecord', {
        customerId,
      });
    }
    if (days === 30) {
      return this.getPrivate('sapi/v1/apiReferral/rebate/historicalRecord', {
        customerId,
      });
    }
  }

  
  

  

  /**
   *
   * User Data Stream Endpoints
   *
   **/

  // spot
  getSpotUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('api/v3/userDataStream');
  }

  keepAliveSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  closeSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  // margin
  getMarginUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('sapi/v1/userDataStream');
  }

  keepAliveMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  closeMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  // isolated margin
  getIsolatedMarginUserDataListenKey(params: {
    symbol: string;
  }): Promise<{ listenKey: string }> {
    return this.post(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  keepAliveIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.put(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  closeIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.delete(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  /**
   *
   * Simple earn Endpoints
   *
   **/

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

  redeemLockedProduct(params: {
    positionId: string;
  }): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/locked/redeem`, params);
  }

  redeemFlexibleProduct(params: {
    positionId: string;
  }): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate(`/sapi/v1/simple-earn/flexible/redeem`, params);
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

  getSimpleEarnAccount(): Promise<SimpleEarnAccountResponse> {
    return this.getPrivate(`/sapi/v1/simple-earn/account`);
  }

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

  getRateHistory(params: GetRateHistoryParams): Promise<{
    rows: GetRateHistory[];
    total: string;
  }> {
    return this.getPrivate(
      'sapi/v1/simple-earn/flexible/history/rateHistory',
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

  /**
   *
   * Dual Investment Endpoints
   *
   **/

  getDualInvestmentProducts(
    params: GetDualInvestmentProductListParams,
  ): Promise<{
    total: number;
    list: DualInvestmentProduct[];
  }> {
    return this.getPrivate('sapi/v1/dci/product/list', params);
  }

  subscribeDualInvestmentProduct(
    params: SubscribeDualInvestmentProductParams,
  ): Promise<SubscribeDualInvestmentProductResponse> {
    return this.postPrivate('sapi/v1/dci/product/subscribe', params);
  }

  getDualInvestmentPositions(
    params: GetDualInvestmentPositionsParams,
  ): Promise<{
    total: number;
    list: DualInvestmentPosition[];
  }> {
    return this.getPrivate('sapi/v1/dci/product/positions', params);
  }

  getDualInvestmentAccounts(): Promise<CheckDualInvestmentAccountsResponse> {
    return this.getPrivate('sapi/v1/dci/product/accounts');
  }

  updateAutoCompoundStatus(
    params: ChangeAutoCompoundStatusParams,
  ): Promise<ChangeAutoCompoundStatusResponse> {
    return this.postPrivate(
      'sapi/v1/dci/product/auto_compound/edit-status',
      params,
    );
  }

  /**
   *
   * Auto Invest Enpoints
   *
   **/

  getAutoInvestTargetAssets(
    params: GetTargetAssetListParams,
  ): Promise<GetTargetAssetListResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/target-asset/list',
      params,
    );
  }

  getAutoInvestTargetAssetsROI(
    params: GetTargetAssetROIParams,
  ): Promise<TargetAssetROI[]> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/target-asset/roi/list',
      params,
    );
  }

  getAutoInvestAssets(): Promise<{
    targetAssets: string[];
    sourceAssets: string[];
  }> {
    return this.getPrivate('sapi/v1/lending/auto-invest/all/asset');
  }

  getAutoInvestSourceAssets(
    params: GetSourceAssetListParams,
  ): Promise<GetSourceAssetListResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/source-asset/list',
      params,
    );
  }

  submitAutoInvestmentPlan(
    params: CreateInvestmentPlanParams,
  ): Promise<CreateInvestmentPlanResponse> {
    const { details, ...allParams } = params;
    const requestParameters = { ...allParams };
    for (let i = 0; i < details.length; i++) {
      requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
      requestParameters[`details[${i}].percentage`] = details[i].percentage;
    }
    return this.postPrivate(
      'sapi/v1/lending/auto-invest/plan/add',
      requestParameters,
    );
  }

  submitAutoInvestmentPlanOld(
    params: CreateInvestmentPlanParams,
  ): Promise<CreateInvestmentPlanResponse> {
    return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', params);
  }

  updateAutoInvestmentPlan(
    params: EditInvestmentPlanParams,
  ): Promise<EditInvestmentPlanResponse> {
    const { details, ...allParams } = params;

    const requestParameters = { ...allParams };
    for (let i = 0; i < details.length; i++) {
      requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
      requestParameters[`details[${i}].percentage`] = details[i].percentage;
    }

    return this.postPrivate(
      'sapi/v1/lending/auto-invest/plan/edit',
      requestParameters,
    );
  }

  updateAutoInvestmentPlanOld(
    params: EditInvestmentPlanParams,
  ): Promise<EditInvestmentPlanResponse> {
    return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', params);
  }

  updateAutoInvestPlanStatus(
    params: ChangePlanStatusParams,
  ): Promise<ChangePlanStatusResponse> {
    return this.postPrivate(
      'sapi/v1/lending/auto-invest/plan/edit-status',
      params,
    );
  }

  getAutoInvestPlans(params: {
    planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
  }): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/plan/list', params);
  }

  getAutoInvestPlan(params: GetPlanDetailsParams): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/plan/id', params);
  }

  getAutoInvestSubscriptionTransactions(
    params: GetSubscriptionTransactionHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/history/list', params);
  }

  getAutoInvestIndex(params: {
    indexId: number;
  }): Promise<GetIndexDetailsResponse> {
    return this.getPrivate('sapi/v1/lending/auto-invest/index/info', params);
  }

  getAutoInvestUserIndex(params: {
    indexId: number;
  }): Promise<GetIndexLinkedPlanPositionDetailsResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/index/user-summary',
      params,
    );
  }

  /**
   * https://developers.binance.com/docs/auto_invest/trade/One-Time-Transaction
   *
   * @param params
   * @returns
   */
  submitAutoInvestOneTimeTransaction(
    params: SubmitOneTimeTransactionParams,
  ): Promise<SubmitOneTimeTransactionResponse> {
    const { details, ...allParams } = params;
    const requestParameters = { ...allParams };
    for (let i = 0; i < details.length; i++) {
      requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
      requestParameters[`details[${i}].percentage`] = details[i].percentage;
    }

    return this.postPrivate(
      'sapi/v1/lending/auto-invest/one-off',
      requestParameters,
    );
  }

  getOneTimeTransactionStatus(
    params: GetOneTimeTransactionStatusParams,
  ): Promise<GetOneTimeTransactionStatusResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/one-off/status',
      params,
    );
  }

  submitAutoInvestRedemption(
    params: SubmitIndexLinkedPlanRedemptionParams,
  ): Promise<{
    redemptionId: number;
  }> {
    return this.postPrivate('sapi/v1/lending/auto-invest/redeem', params);
  }

  getAutoInvestRedemptionHistory(
    params: GetIndexLinkedPlanRedemptionHistoryParams,
  ): Promise<IndexLinkedPlanRedemptionRecord[]> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/redeem/history',
      params,
    );
  }

  getAutoInvestRebalanceHistory(
    params: GetIndexLinkedPlanRebalanceHistoryParams,
  ): Promise<GetIndexLinkedPlanRebalanceHistoryParams[]> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/rebalance/history',
      params,
    );
  }

  /**
   *
   * Staking Endpoints
   *
   **/

  /**
   * @deprecated as of 2024-01-19
   */
  getStakingProducts(
    params: StakingBasicParams & {
      asset?: string;
    },
  ): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/staking/productList`, params);
  }

  /**
   * @deprecated as of 2024-01-19
   */
  getStakingProductPosition(
    params: StakingBasicParams & {
      productId?: string;
      asset?: string;
    },
  ): Promise<StakingProductPosition[]> {
    return this.getPrivate('sapi/v1/staking/position', params);
  }

  /**
   * @deprecated as of 2024-01-19
   */
  getStakingHistory(params: StakingHistoryParams): Promise<StakingHistory[]> {
    return this.getPrivate('sapi/v1/staking/stakingRecord', params);
  }

  /**
   * @deprecated as of 2024-01-19
   */
  getPersonalLeftQuotaOfStakingProduct(params: {
    product: StakingProductType;
    productId: string;
  }): Promise<StakingPersonalLeftQuota> {
    return this.getPrivate('sapi/v1/staking/personalLeftQuota', params);
  }

  subscribeEthStakingV1(params: { amount: number }): Promise<{
    success: boolean;
  }> {
    return this.postPrivate('sapi/v1/eth-staking/eth/stake', params);
  }

  subscribeEthStakingV2(params: {
    amount: number;
  }): Promise<SubscribeEthStakingV2Response> {
    return this.postPrivate('sapi/v2/eth-staking/eth/stake', params);
  }

  redeemEth(params: RedeemEthParams): Promise<RedeemEthResponse> {
    return this.postPrivate('sapi/v1/eth-staking/eth/redeem', params);
  }

  getEthStakingHistory(params: GetEthStakingHistoryParams): Promise<{
    rows: EthStakingHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/stakingHistory',
      params,
    );
  }

  getEthRedemptionHistory(params: GetEthRedemptionHistoryParams): Promise<{
    rows: EthRedemptionHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/redemptionHistory',
      params,
    );
  }

  getBethRewardsHistory(params: GetBethRewardsHistoryParams): Promise<{
    rows: BethRewardsHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/rewardsHistory',
      params,
    );
  }

  getEthStakingQuota(): Promise<GetEthStakingQuotaResponse> {
    return this.getPrivate('sapi/v1/eth-staking/eth/quota');
  }

  getEthRateHistory(params: GetETHRateHistoryParams): Promise<{
    rows: ETHRateHistory[];
    total: string;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/rateHistory',
      params,
    );
  }

  getEthStakingAccount(): Promise<GetEthStakingAccountResponse> {
    return this.getPrivate('sapi/v1/eth-staking/account');
  }

  getEthStakingAccountV2(): Promise<GetEthStakingAccountV2Response> {
    return this.getPrivate('sapi/v2/eth-staking/account');
  }

  wrapBeth(params: { amount: number }): Promise<WrapBethResponse> {
    return this.postPrivate('sapi/v1/eth-staking/wbeth/wrap', params);
  }

  getBethWrapHistory(params: GetWrapHistoryParams): Promise<{
    rows: WrapHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/wbeth/history/wrapHistory',
      params,
    );
  }

  getBethUnwrapHistory(params: GetWrapHistoryParams): Promise<{
    rows: WrapHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/eth-staking/wbeth/history/unwrapHistory',
      params,
    );
  }

  getWbethRewardsHistory(
    params: GetWrapHistoryParams,
  ): Promise<GetWbethRewardsHistoryResponse> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
      params,
    );
  }

  /**
   *
   * Savings Endpoints
   * @deprecated as of 2023-06-22, now Simple Earn
   **/

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getLeftDailyPurchaseQuotaFlexibleProduct(params: {
    productId: string;
  }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse> {
    return this.getPrivate(`sapi/v1/lending/daily/userLeftQuota`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getLeftDailyRedemptionQuotaFlexibleProduct(params: {
    productId: string;
  }): Promise<
    LeftDailyPurchaseQuotaFlexibleProductResponse & {
      dailyQuota: string;
      minRedemptionAmount: string;
    }
  > {
    return this.getPrivate(`sapi/v1/lending/daily/userRedemptionQuota`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  purchaseFixedAndActivityProject(params: {
    projectId: string;
    lot: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate(`sapi/v1/lending/customizedFixed/purchase`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getFixedAndActivityProjects(
    params: FixedAndActivityProjectParams,
  ): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/project/list`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getFixedAndActivityProductPosition(
    params: FixedAndActivityProjectPositionParams,
  ): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/project/position/list`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getLendingAccount(): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/lending/union/account`);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getPurchaseRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/purchaseRecord`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getRedemptionRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/redemptionRecord`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getInterestHistory(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/interestHistory`, params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  changeFixedAndActivityPositionToDailyPosition(params: {
    projectId: string;
    lot: number;
    positionId?: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate(`sapi/v1/lending/positionChanged`, params);
  }

  /**
   *
   * Mining Endpoints
   *
   **/

  getMiningAlgos(): Promise<GetMiningAlgoListResponse[]> {
    return this.get('sapi/v1/mining/pub/algoList');
  }

  getMiningCoins(): Promise<GetMiningCoinListResponse[]> {
    return this.get('sapi/v1/mining/pub/coinList');
  }

  getMinerDetails(
    params: GetMinerDetailsParams,
  ): Promise<GetMinerDetailsResponse[]> {
    return this.getPrivate('sapi/v1/mining/worker/detail', params);
  }

  getMiners(params: GetMinerListParams): Promise<GetMinerListResponse> {
    return this.getPrivate('sapi/v1/mining/worker/list', params);
  }

  getMiningEarnings(
    params: GetEarningsListParams,
  ): Promise<GetEarningsListResponse> {
    return this.getPrivate('sapi/v1/mining/payment/list', params);
  }

  getExtraBonuses(
    params: GetExtraBonusListParams,
  ): Promise<GetExtraBonusListResponse> {
    return this.getPrivate('sapi/v1/mining/payment/other', params);
  }

  getHashrateResales(
    params: GetHashrateResaleListParams,
  ): Promise<GetHashrateResaleListResponse> {
    return this.getPrivate(
      'sapi/v1/mining/hash-transfer/config/details/list',
      params,
    );
  }

  getHashrateResale(
    params: GetHashrateResaleDetailParams,
  ): Promise<GetHashrateResaleDetailResponse> {
    return this.getPrivate(
      'sapi/v1/mining/hash-transfer/profit/details',
      params,
    );
  }

  submitHashrateResale(params: SubmitHashrateResaleParams): Promise<number> {
    return this.postPrivate('sapi/v1/mining/hash-transfer/config', params);
  }

  cancelHashrateResaleConfig(
    params: CancelHashrateResaleConfigParams,
  ): Promise<boolean> {
    return this.postPrivate(
      'sapi/v1/mining/hash-transfer/config/cancel',
      params,
    );
  }

  getMiningStatistics(
    params: GetStatisticListParams,
  ): Promise<GetStatisticListResponse> {
    return this.getPrivate('sapi/v1/mining/statistics/user/status', params);
  }

  getMiningAccounts(
    params: getMiningAccountsListParams,
  ): Promise<getMiningAccountsListResponse> {
    return this.getPrivate('sapi/v1/mining/statistics/user/list', params);
  }

  getMiningAccountEarnings(
    params: GetMiningAccountEarningParams,
  ): Promise<GetMiningAccountEarningResponse> {
    return this.getPrivate('sapi/v1/mining/payment/uid', params);
  }

  /**
   *
   * Futures Management Endpoints:
   * https://binance-docs.github.io/apidocs/spot/en/#futures
   *
   * Note: to trade futures use the usdm-client or coinm-client.
   * MainClient only has the futures endpoints listed in the "spot" docs category, primarily used for transfers.
   *
   **/

  /**
   * Execute transfer between spot account and futures account.
   *
   * Type:
   * - 1: transfer from spot account to USDT-Ⓜ futures account.
   * - 2: transfer from USDT-Ⓜ futures account to spot account.
   * - 3: transfer from spot account to COIN-Ⓜ futures account.
   * - 4: transfer from COIN-Ⓜ futures account to spot account.
   */
  submitNewFutureAccountTransfer(
    params: NewFutureAccountTransferParams,
  ): Promise<{ tranId: number }> {
    return this.postPrivate(`sapi/v1/futures/transfer`, params);
  }

  getFutureAccountTransferHistory(
    params: GetFutureAccountTransferHistoryParams,
  ): Promise<RowsWithTotal<FutureAccountTransfer>> {
    return this.getPrivate(`sapi/v1/futures/transfer`, params);
  }

  getFuturesTickLevelOrderbookDataLink(
    params: GetFutureTickLevelOrderbookDataLinkParams,
  ): Promise<{
    data: HistoricalDataLink[];
  }> {
    return this.getPrivate('sapi/v1/futures/histDataLink', params);
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralBorrowHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/borrow/history`, params);
  }
  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralRepaymentHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/repay/history`, params);
  }
  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralWalletV2(): Promise<any> {
    return this.getPrivate(`sapi/v2/futures/loan/wallet`);
  }
  /**
   * @deprecated as of 2023-09-25
   */
  getAdjustCrossCollateralLTVHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(
      `sapi/v1/futures/loan/adjustCollateral/history`,
      params,
    );
  }
  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralLiquidationHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/liquidationHistory`, params);
  }
  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralInterestHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/interestHistory`, params);
  }

  /**
   *
   * Futures Algo Endpoints
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

  getAlgoSubOrders(
    params: GetAlgoSubOrdersParams,
  ): Promise<GetAlgoSubOrdersResponse> {
    return this.getPrivate('sapi/v1/algo/futures/subOrders', params);
  }

  /**
   *
   * Spot Algo Endpoints
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

  getSpotAlgoSubOrders(
    params: GetSpotAlgoSubOrdersParams,
  ): Promise<GetSpotAlgoSubOrdersResponse> {
    return this.getPrivate('sapi/v1/algo/spot/subOrders', params);
  }

  /**
   *
   * Portfolio Margin Pro
   *
   **/

  getPortfolioMarginProAccountInfo(): Promise<GetPortfolioMarginProAccountInfoResponse> {
    return this.getPrivate('sapi/v1/portfolio/account');
  }

  getPortfolioMarginProCollateralRate(): Promise<
    GetPortfolioMarginProCollateralRateResponse[]
  > {
    return this.get('sapi/v1/portfolio/collateralRate');
  }

  getPortfolioMarginProBankruptcyLoanAmount(): Promise<GetPortfolioMarginProBankruptcyLoanAmountResponse> {
    return this.getPrivate('sapi/v1/portfolio/pmLoan');
  }

  repayPortfolioMarginProBankruptcyLoan(params: {
    from?: 'SPOT' | 'MARGIN';
  }): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('sapi/v1/portfolio/repay', params);
  }

  getPortfolioMarginProInterestHistory(
    params: GetPortfolioMarginProInterestHistoryParams,
  ): Promise<GetPortfolioMarginProInterestHistoryResponse[]> {
    return this.getPrivate('sapi/v1/portfolio/interest-history', params);
  }

  getPortfolioMarginIndexPrice(params?: {
    asset?: string;
  }): Promise<GetPortfolioMarginAssetIndexPriceResponse[]> {
    return this.get('sapi/v1/portfolio/asset-index-price', params);
  }

  submitPortfolioMarginProFullTransfer(): Promise<{
    msg: string;
  }> {
    return this.postPrivate('sapi/v1/portfolio/auto-collection');
  }

  submitPortfolioMarginProSpecificTransfer(params: { asset: string }): Promise<{
    msg: string;
  }> {
    return this.postPrivate('sapi/v1/portfolio/asset-collection', params);
  }

  bnbTransfer(params: BnbTransferParams): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('sapi/v1/portfolio/bnb-transfer', params);
  }

  updateAutoRepayFuturesStatus(params: { autoRepay: string }): Promise<{
    msg: string;
  }> {
    return this.postPrivate('sapi/v1/portfolio/repay-futures-switch', params);
  }

  getAutoRepayFuturesStatus(): Promise<{
    autoRepay: boolean;
  }> {
    return this.getPrivate('sapi/v1/portfolio/repay-futures-switch');
  }

  repayFuturesNegativeBalance(): Promise<{
    msg: string;
  }> {
    return this.postPrivate('sapi/v1/portfolio/repay-futures-negative-balance');
  }

  getPortfolioMarginAssetLeverage(): Promise<
    GetPortfolioMarginAssetLeverageResponse[]
  > {
    return this.getPrivate('sapi/v1/portfolio/margin-asset-leverage');
  }

  /**
   *
   * BLVT Endpoints
   *
   **/

  getBlvtInfo(params?: { tokenName?: string }): Promise<any[]> {
    return this.get('sapi/v1/blvt/tokenInfo', params);
  }

  subscribeBlvt(params: SubscribeBlvtParams): Promise<SubscribeBlvtResponse> {
    return this.postPrivate('sapi/v1/blvt/subscribe', params);
  }

  getBlvtSubscriptionRecord(
    params: GetBlvtSubscriptionRecordParams,
  ): Promise<BlvtSubscriptionRecord[]> {
    return this.getPrivate('sapi/v1/blvt/subscribe/record', params);
  }

  redeemBlvt(params: RedeemBlvtParams): Promise<RedeemBlvtResponse> {
    return this.postPrivate('sapi/v1/blvt/redeem', params);
  }

  getBlvtRedemptionRecord(
    params: GetBlvtRedemptionRecordParams,
  ): Promise<BlvtRedemptionRecord[]> {
    return this.getPrivate('sapi/v1/blvt/redeem/record', params);
  }

  getBlvtUserLimitInfo(params: {
    tokenName?: string;
  }): Promise<BlvtUserLimitInfo[]> {
    return this.getPrivate('sapi/v1/blvt/userLimit', params);
  }

  /**
   *
   * Fiat Endpoints
   *
   **/

  getFiatOrderHistory(
    params: GetFiatOrderHistoryParams,
  ): Promise<GetFiatOrderHistoryResponse> {
    return this.getPrivate('sapi/v1/fiat/orders', params);
  }

  getFiatPaymentsHistory(
    params: GetFiatOrderHistoryParams,
  ): Promise<GetFiatPaymentsHistoryResponse> {
    return this.getPrivate('sapi/v1/fiat/payments', params);
  }

  /**
   *
   * C2C Endpoints
   *
   **/

  getC2CTradeHistory(
    params: GetC2CTradeHistoryParams,
  ): Promise<GetC2CTradeHistoryResponse> {
    return this.getPrivate(
      'sapi/v1/c2c/orderMatch/listUserOrderHistory',
      params,
    );
  }

  /**
   *
   * VIP Loans Endpoints
   *
   **/

  getVipLoanOpenOrders(params: GetVipLoanOngoingOrdersParams): Promise<{
    rows: VipOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/ongoing/orders', params);
  }

  repayVipLoan(params: VipLoanRepayParams): Promise<VipLoanRepayResponse> {
    return this.postPrivate('sapi/v1/loan/vip/repay', params);
  }

  getVipLoanRepaymentHistory(
    params: GetVipLoanRepaymentHistoryParams,
  ): Promise<{
    rows: VipLoanRepaymentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/repay/history', params);
  }

  renewVipLoan(params: VipLoanRenewParams): Promise<VipLoanRenewResponse> {
    return this.postPrivate('sapi/v1/loan/vip/renew', params);
  }

  checkVipCollateralAccount(params: CheckVipCollateralAccountParams): Promise<{
    rows: VipCollateralAccount[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/collateral/account', params);
  }

  borrowVipLoan(params: VipLoanBorrowParams): Promise<VipLoanBorrowResponse> {
    return this.postPrivate('sapi/v1/loan/vip/borrow', params);
  }

  getVipLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
    rows: LoanableAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/loanable/data', params);
  }

  getVipCollateralAssets(params: { collateralCoin?: string }): Promise<{
    rows: CollateralAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/collateral/data', params);
  }

  getVipApplicationStatus(params: GetApplicationStatusParams): Promise<{
    rows: ApplicationStatus[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/request/data', params);
  }

  getVipBorrowInterestRate(params: {
    loanCoin: string;
  }): Promise<BorrowInterestRate[]> {
    return this.getPrivate('sapi/v1/loan/vip/request/interestRate', params);
  }

  /**
   *
   * Crypto Loans Endpoints
   *
   **/

  getCryptoLoansIncomeHistory(
    params: GetCryptoLoansIncomeHistoryParams,
  ): Promise<GetCryptoLoansIncomeHistoryResponse[]> {
    return this.getPrivate('sapi/v1/loan/income', params);
  }

  borrowCryptoLoan(
    params: BorrowCryptoLoanParams,
  ): Promise<BorrowCryptoLoanResponse> {
    return this.postPrivate('sapi/v1/loan/borrow', params);
  }

  getCryptoLoanBorrowHistory(params: GetLoanBorrowHistoryParams): Promise<{
    rows: LoanBorrowHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/borrow/history', params);
  }

  getCryptoLoanOngoingOrders(params: GetLoanOngoingOrdersParams): Promise<{
    rows: LoanOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/ongoing/orders', params);
  }

  repayCryptoLoan(
    params: RepayCryptoLoanParams,
  ): Promise<RepayCryptoLoanResponse> {
    return this.postPrivate('sapi/v1/loan/repay', params);
  }

  getCryptoLoanRepaymentHistory(
    params: GetLoanRepaymentHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/loan/repay/history', params);
  }

  adjustCryptoLoanLTV(
    params: AdjustCryptoLoanLTVParams,
  ): Promise<AdjustCryptoLoanLTVResponse> {
    return this.postPrivate('sapi/v1/loan/adjust/ltv', params);
  }

  getCryptoLoanLTVAdjustmentHistory(
    params: GetLoanLTVAdjustmentHistoryParams,
  ): Promise<{
    rows: LoanLTVAdjustmentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/ltv/adjustment/history', params);
  }

  getCryptoLoanLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
    rows: LoanableAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/loanable/data', params);
  }

  getCryptoLoanCollateralAssetsData(
    params: GetCollateralAssetDataParams,
  ): Promise<{
    rows: CollateralAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/collateral/data', params);
  }

  getCryptoLoanCollateralRepayRate(
    params: CheckCollateralRepayRateParams,
  ): Promise<CheckCollateralRepayRateResponse> {
    return this.getPrivate('sapi/v1/loan/repay/collateral/rate', params);
  }

  customizeCryptoLoanMarginCall(params: CustomizeMarginCallParams): Promise<{
    rows: CustomizeMarginCall[];
    total: number;
  }> {
    return this.postPrivate('sapi/v1/loan/customize/margin_call', params);
  }

  borrowCryptoLoanFlexible(
    params: BorrowFlexibleLoanParams,
  ): Promise<BorrowFlexibleLoanResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/borrow', params);
  }

  getCryptoLoanFlexibleOngoingOrders(
    params: GetFlexibleLoanOngoingOrdersParams,
  ): Promise<{
    rows: FlexibleLoanOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/ongoing/orders', params);
  }

  getLoanFlexibleBorrowHistory(
    params: GetFlexibleCryptoLoanBorrowHistoryParams,
  ): Promise<{
    rows: FlexibleCryptoLoanBorrowHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/borrow/history', params);
  }

  repayCryptoLoanFlexible(
    params: RepayCryptoFlexibleLoanParams,
  ): Promise<RepayCryptoFlexibleLoanResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/repay', params);
  }

  getLoanFlexibleRepaymentHistory(
    params: GetLoanRepaymentHistoryParams,
  ): Promise<{
    rows: LoanRepaymentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/repay/history', params);
  }

  adjustCryptoLoanFlexibleLTV(
    params: AdjustFlexibleCryptoLoanLTVParams,
  ): Promise<AdjustFlexibleCryptoLoanLTVResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/adjust/ltv', params);
  }

  getCryptoLoanFlexibleLTVAdjustmentHistory(
    params: GetFlexibleLoanLTVAdjustmentHistoryParams,
  ): Promise<{
    rows: FlexibleLoanLTVAdjustmentHistory[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v2/loan/flexible/ltv/adjustment/history',
      params,
    );
  }

  getCryptoLoanFlexibleAssets(params: { loanCoin?: string }): Promise<{
    rows: FlexibleLoanAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/loanable/data', params);
  }

  getCryptoLoanFlexibleCollateralAssets(params: {
    collateralCoin?: string;
  }): Promise<{
    rows: FlexibleLoanCollateralAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/collateral/data', params);
  }

  /**
   *
   * Copy trading endpoints
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
   * Pay endpoints
   *
   **/

  getPayTransactions(params: GetPayTradeHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/pay/transactions', params);
  }

  /**
   *
   * Convert endpoints
   *
   **/

  getConvertPairs(params: GetAllConvertPairsParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/exchangeInfo', params);
  }

  getConvertAssetInfo(): Promise<any> {
    return this.getPrivate('sapi/v1/convert/assetInfo');
  }

  convertQuoteRequest(params: ConvertQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/getQuote', params);
  }

  acceptQuoteRequest(params: AcceptQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/acceptQuote', params);
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

  getConvertTradeHistory(params: GetConvertTradeHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/tradeFlow', params);
  }

  /**
   *
   * Rebate Endpoints
   *
   **/

  getSpotRebateHistoryRecords(
    params: GetSpotRebateHistoryRecordsParams,
  ): Promise<GetSpotRebateHistoryRecordsResponse> {
    return this.getPrivate('sapi/v1/rebate/taxQuery', params);
  }

  /**
   *
   * NFT Endpoints
   *
   **/

  getNftTransactionHistory(params: GetNftTransactionHistoryParams): Promise<{
    total: number;
    list: NftTransaction[];
  }> {
    return this.getPrivate('sapi/v1/nft/history/transactions', params);
  }

  getNftDepositHistory(params: GetNftDepositHistoryParams): Promise<{
    total: number;
    list: NftDeposit[];
  }> {
    return this.getPrivate('sapi/v1/nft/history/deposit', params);
  }

  getNftWithdrawHistory(params: GetNftWithdrawHistoryParams): Promise<{
    total: number;
    list: NftWithdraw[];
  }> {
    return this.getPrivate('sapi/v1/nft/history/withdraw', params);
  }

  getNftAsset(params: GetNftAssetParams): Promise<{
    total: number;
    list: NftAsset[];
  }> {
    return this.getPrivate('sapi/v1/nft/user/getAsset', params);
  }

  /**
   *
   * Binance GiftCard Endpoints
   *
   **/

  createGiftCard(params: CreateGiftCardParams): Promise<any> {
    return this.postPrivate('sapi/v1/giftcard/createCode', params);
  }

  createDualTokenGiftCard(params: CreateDualTokenGiftCardParams): Promise<any> {
    return this.postPrivate('sapi/v1/giftcard/buyCode', params);
  }

  redeemGiftCard(params: RedeemGiftCardParams): Promise<any> {
    return this.postPrivate('sapi/v1/giftcard/redeemCode', params);
  }

  verifyGiftCard(params: { referenceNo: string }): Promise<any> {
    return this.getPrivate('sapi/v1/giftcard/verify', params);
  }

  getRsaPublicKey(): Promise<any> {
    return this.getPrivate('sapi/v1/giftcard/cryptography/rsa-public-key');
  }

  getTokenLimit(params: { baseToken: string }): Promise<any> {
    return this.getPrivate('sapi/v1/giftcard/buyCode/token-limit', params);
  }

  /**
   *
   * BSwap Endpoints
   * @deprecated as of 2024-01-19
   **/

  /**
   * @deprecated as of 2024-01-19
   **/
  getBSwapLiquidity(params?: { poolId: number }): Promise<BSwapLiquidity[]> {
    return this.getPrivate('sapi/v1/bswap/liquidity', params);
  }

  /**
   * @deprecated as of 2024-01-19
   **/
  addBSwapLiquidity(params: AddBSwapLiquidityParams): Promise<{
    operationId: number;
  }> {
    return this.postPrivate('sapi/v1/bswap/liquidityAdd', params);
  }

  /**
   * @deprecated as of 2024-01-19
   **/
  removeBSwapLiquidity(params: RemoveBSwapLiquidityParams): Promise<{
    operationId: number;
  }> {
    return this.postPrivate('sapi/v1/bswap/liquidityRemove', params);
  }

  /**
   * @deprecated as of 2024-01-19
   **/
  getBSwapOperations(
    params?: BSwapOperationsParams,
  ): Promise<BSwapOperations[]> {
    return this.getPrivate('sapi/v1/bswap/liquidityOps', params);
  }
}
