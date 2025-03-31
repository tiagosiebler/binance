import { AxiosRequestConfig } from 'axios';

import {
  BasicAssetPaginatedParams,
  BasicAssetParam,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  CoinStartEndLimit,
  ExchangeSymbol,
  GetAllOrdersParams,
  GetOrderParams,
  HistoricalTradesParams,
  Kline,
  KlinesParams,
  NewOCOParams,
  NewOrderListParams,
  OrderBookParams,
  OrderIdProperty,
  OrderResponseType,
  OrderType,
  RecentTradesParams,
  RowsWithTotal,
  SymbolFromPaginatedRequestFromId,
  SymbolPrice,
} from './types/shared';
import {
  AcceptQuoteRequestParams,
  AccountInfo,
  AccountInformation,
  AddBSwapLiquidityParams,
  AddIpRestriction,
  AdjustCryptoLoanLTVParams,
  AdjustCryptoLoanLTVResponse,
  AdjustFlexibleCryptoLoanLTVParams,
  AdjustFlexibleCryptoLoanLTVResponse,
  AggregateTrade,
  AlgoOrder,
  AllCoinsInformationResponse,
  Allocation,
  AllocationsParams,
  ApiKeyBrokerSubAccount,
  APIPermissions,
  APITradingStatus,
  ApplicationStatus,
  AssetDetail,
  BasicFromPaginatedParams,
  BasicFuturesSubAccountParams,
  BasicMarginAssetParams,
  BasicSubAccount,
  BasicTimeRangeParam,
  BethRewardsHistory,
  BlvtRedemptionRecord,
  BlvtSubscriptionRecord,
  BlvtUserLimitInfo,
  BNBBurnResponse,
  BnbTransferParams,
  BnsolRateHistoryRecord,
  BnsolRewardHistoryRecord,
  BorrowCryptoLoanParams,
  BorrowCryptoLoanResponse,
  BorrowFlexibleLoanParams,
  BorrowFlexibleLoanResponse,
  BorrowInterestRate,
  BrokerCommissionRebate,
  BrokerSubAccount,
  BrokerSubAccountCoinFuturesCommission,
  BrokerSubAccountFuturesCommission,
  BrokerSubAccountHistory,
  BrokerUniversalTransfer,
  BSwapLiquidity,
  BSwapOperations,
  BSwapOperationsParams,
  BUSDConversionRecord,
  CancelAlgoOrderResponse,
  CancelHashrateResaleConfigParams,
  CancelOrderListResult,
  CancelSpotAlgoOrderResponse,
  CancelSpotOrderResult,
  ChangeAutoCompoundStatusParams,
  ChangeAutoCompoundStatusResponse,
  ChangePermissionApiKeyBrokerSubAccountParams,
  ChangePermissionApiKeyBrokerSubAccountResponse,
  ChangePlanStatusParams,
  ChangePlanStatusResponse,
  ChangeSubAccountCoinFuturesCommissionParams,
  ChangeSubAccountCommissionParams,
  ChangeSubAccountCommissionResponse,
  ChangeSubAccountFuturesCommissionParams,
  ChangeSubAccountFuturesCommissionResponse,
  CheckCollateralRepayRateParams,
  CheckCollateralRepayRateResponse,
  CheckDualInvestmentAccountsResponse,
  CheckVipCollateralAccountParams,
  CloudMining,
  CloudMiningHistoryParams,
  CoinMarginedFuturesResponse,
  Collateral,
  CollateralAssetData,
  CollateralRecord,
  CommissionRates,
  ConvertDustParams,
  ConvertibleCoinsParams,
  ConvertibleCoinsResponse,
  ConvertLimitOpenOrder,
  ConvertQuoteRequestParams,
  ConvertTransfer,
  ConvertTransferResponse,
  CreateApiKeyBrokerSubAccountParams,
  CreateApiKeyBrokerSubAccountResponse,
  CreateBrokerSubAccountParams,
  CreateDualTokenGiftCardParams,
  CreateGiftCardParams,
  CreateInvestmentPlanParams,
  CreateInvestmentPlanResponse,
  CreateSpecialLowLatencyKeyParams,
  CreateSubAccountParams,
  CrossMarginFeeData,
  CrossMarginTransferHistory,
  CurrentAvgPrice,
  CustomizeMarginCall,
  CustomizeMarginCallParams,
  DailyAccountSnapshot,
  DailyAccountSnapshotParams,
  DelegationHistory,
  DelegationHistoryParams,
  DeleteApiKeyBrokerSubAccountParams,
  DelistScheduleResponse,
  DepositAddress,
  DepositAddressListParams,
  DepositAddressParams,
  DepositAddressResponse,
  DepositHistory,
  DepositHistoryParams,
  DualInvestmentPosition,
  DualInvestmentProduct,
  DustConversion,
  DustInfo,
  DustLog,
  EditInvestmentPlanParams,
  EditInvestmentPlanResponse,
  EnableConvertSubAccountParams,
  EnableFuturesBrokerSubAccountParams,
  EnableFuturesBrokerSubAccountResponse,
  EnableMarginApiKeyBrokerSubAccountParams,
  EnableMarginBrokerSubAccountParams,
  EnableMarginBrokerSubAccountResponse,
  EnableOptionsForSubAccountResponse,
  EnableOrDisableIPRestrictionForSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountResponse,
  ETHRateHistory,
  EthRedemptionHistory,
  EthStakingHistory,
  ExchangeInfo,
  ExchangeInfoParams,
  FixedAndActivityProjectParams,
  FixedAndActivityProjectPositionParams,
  FlexibleCryptoLoanBorrowHistory,
  FlexibleLoanAssetData,
  FlexibleLoanCollateralAssetData,
  FlexibleLoanLiquidationHistoryRecord,
  FlexibleLoanLTVAdjustmentHistory,
  FlexibleLoanOngoingOrder,
  FlexibleRedemptionRecord,
  FlexibleRewardsHistory,
  FlexibleSubscriptionPreview,
  ForceLiquidationRecord,
  FundingAsset,
  FutureAccountTransfer,
  FuturesPositionRisk,
  GetAlgoHistoricalOrdersParams,
  GetAlgoSubOrdersParams,
  GetAlgoSubOrdersResponse,
  GetAllConvertPairsParams,
  GetApiKeyBrokerSubAccountParams,
  GetApplicationStatusParams,
  GetAssetParams,
  GetBethRewardsHistoryParams,
  GetBlvtRedemptionRecordParams,
  GetBlvtSubscriptionRecordParams,
  GetBnsolRateHistoryReq,
  GetBnsolRewardsHistoryReq,
  GetBrokerInfoResponse,
  GetBrokerSubAccountDepositHistoryParams,
  GetBrokerSubAccountHistoryParams,
  GetBrokerSubAccountParams,
  GetC2CTradeHistoryParams,
  GetC2CTradeHistoryResponse,
  GetCollateralAssetDataParams,
  GetCollateralRecordParams,
  GetConvertBUSDHistoryParams,
  GetConvertTradeHistoryParams,
  GetCrossMarginTransferHistoryParams,
  GetCryptoLoansIncomeHistoryParams,
  GetCryptoLoansIncomeHistoryResponse,
  GetDualInvestmentPositionsParams,
  GetDualInvestmentProductListParams,
  GetEarningsListParams,
  GetEarningsListResponse,
  GetETHRateHistoryParams,
  GetEthRedemptionHistoryParams,
  GetEthStakingAccountResponse,
  GetEthStakingAccountV2Response,
  GetEthStakingHistoryParams,
  GetEthStakingQuotaResponse,
  GetExtraBonusListParams,
  GetExtraBonusListResponse,
  GetFiatOrderHistoryParams,
  GetFiatOrderHistoryResponse,
  GetFiatPaymentsHistoryResponse,
  GetFlexibleCryptoLoanBorrowHistoryParams,
  GetFlexibleLoanLiquidationHistoryParams,
  GetFlexibleLoanLTVAdjustmentHistoryParams,
  GetFlexibleLoanOngoingOrdersParams,
  GetFlexibleRedemptionRecordParams,
  GetFlexibleRewardsHistoryParams,
  GetFlexibleSubscriptionPreviewParams,
  GetFlexibleSubscriptionRecordParams,
  GetFlexibleSubscriptionRecordResponse,
  GetForceLiquidationRecordParams,
  GetFutureAccountTransferHistoryParams,
  GetFuturesLeadTraderStatusResponse,
  GetFuturesLeadTradingSymbolWhitelistResponse,
  GetFutureTickLevelOrderbookDataLinkParams,
  GetHashrateResaleDetailParams,
  GetHashrateResaleDetailResponse,
  GetHashrateResaleListParams,
  GetHashrateResaleListResponse,
  GetIndexDetailsResponse,
  GetIndexLinkedPlanPositionDetailsResponse,
  GetIndexLinkedPlanRebalanceHistoryParams,
  GetIndexLinkedPlanRedemptionHistoryParams,
  GetLoanableAssetsDataParams,
  GetLoanBorrowHistoryParams,
  GetLoanCoinPaginatedHistoryParams,
  GetLoanLTVAdjustmentHistoryParams,
  GetLoanOngoingOrdersParams,
  GetLoanRepaymentHistoryParams,
  GetLockedRedemptionRecordParams,
  GetLockedRewardsHistory,
  GetLockedRewardsHistoryParams,
  GetLockedSubscriptionPreviewParams,
  GetLockedSubscriptionRecordParams,
  GetMarginAccountBorrowRepayRecordsParams,
  GetMarginCapitalFlowParams,
  GetMarginInterestHistoryParams,
  GetMarginOrderCountUsageParams,
  GetMinerDetailsParams,
  GetMinerDetailsResponse,
  GetMinerListParams,
  GetMinerListResponse,
  GetMiningAccountEarningParams,
  GetMiningAccountEarningResponse,
  getMiningAccountsListParams,
  getMiningAccountsListResponse,
  GetMiningAlgoListResponse,
  GetMiningCoinListResponse,
  GetNextHourlyInterestRateParams,
  GetNftAssetParams,
  GetNftDepositHistoryParams,
  GetNftTransactionHistoryParams,
  GetNftWithdrawHistoryParams,
  GetOCOParams,
  GetOneTimeTransactionStatusParams,
  GetOneTimeTransactionStatusResponse,
  GetOrderStatusParams,
  GetPayTradeHistoryParams,
  GetPlanDetailsParams,
  GetPortfolioMarginAssetIndexPriceResponse,
  GetPortfolioMarginAssetLeverageResponse,
  GetPortfolioMarginProAccountInfoResponse,
  GetPortfolioMarginProBankruptcyLoanAmountResponse,
  GetPortfolioMarginProCollateralRateResponse,
  GetPortfolioMarginProInterestHistoryParams,
  GetPortfolioMarginProInterestHistoryResponse,
  GetRateHistory,
  GetRateHistoryParams,
  GetSmallLiabilityExchangeHistoryParams,
  GetSolStakingHistoryReq,
  GetSourceAssetListParams,
  GetSourceAssetListResponse,
  GetSpotAlgoHistoricalOrdersParams,
  GetSpotAlgoSubOrdersParams,
  GetSpotAlgoSubOrdersResponse,
  GetSpotRebateHistoryRecordsParams,
  GetSpotRebateHistoryRecordsResponse,
  GetStatisticListParams,
  GetStatisticListResponse,
  GetSubAccountDepositHistoryParams,
  GetSubscriptionTransactionHistoryParams,
  GetTargetAssetListParams,
  GetTargetAssetListResponse,
  GetTargetAssetROIParams,
  GetTravelRuleDepositHistoryParams,
  GetTravelRuleWithdrawHistoryParams,
  GetTravelRuleWithdrawHistoryV2Params,
  GetUniversalTransferBrokerParams,
  GetVipLoanOngoingOrdersParams,
  GetVipLoanRepaymentHistoryParams,
  GetWbethRewardsHistoryResponse,
  GetWrapHistoryParams,
  HistoricalAlgoOrder,
  HistoricalDataLink,
  HistoricalSpotAlgoOrder,
  IndexLinkedPlanRedemptionRecord,
  IsolatedMarginAccountInfo,
  IsolatedMarginAccountTransferParams,
  IsolatedMarginFeeData,
  IsolatedMarginSymbol,
  IsolatedMarginTierData,
  LeftDailyPurchaseQuotaFlexibleProductResponse,
  LiabilityCoinLeverageBracket,
  LoanableAssetData,
  LoanBorrowHistory,
  LoanLTVAdjustmentHistory,
  LoanOngoingOrder,
  LoanRepaymentHistory,
  LockedRedemptionRecord,
  LockedSubscriptionPreview,
  LockedSubscriptionRecord,
  ManagedSubAccountDepositAddress,
  ManagedSubAccountDepositAddressParams,
  ManagedSubAccountFuturesAssetsResponse,
  ManagedSubAccountListParams,
  ManagedSubAccountMarginAssetsResponse,
  ManagedSubAccountSnapshot,
  ManagedSubAccountSnapshotParams,
  ManagedSubAccountTransferLogParams,
  ManagedSubAccountTransferTTLogParams,
  ManagerSubTransferHistoryVos,
  ManagerSubUserInfoVo,
  ManualLiquidationParams,
  ManualLiquidationResponse,
  MarginAccountLoanParams,
  MarginAccountRecord,
  MarginAvailableInventoryResponse,
  MarginCapitalFlow,
  MarginDelistSchedule,
  MarginInterestHistory,
  MarginInterestRateHistory,
  MarginOrderCountUsageResponse,
  MarginOTOCOOrder,
  MarginOTOOrder,
  MarginTransactionResponse,
  NewFutureAccountTransferParams,
  NewOrderListOTOCOParams,
  NewOrderListOTOCOResponse,
  NewOrderListOTOParams,
  NewOrderListOTOResponse,
  NewSpotOrderParams,
  NewSpotSOROrderParams,
  NextHourlyInterestRate,
  NftAsset,
  NftDeposit,
  NftTransaction,
  NftWithdraw,
  OrderBookResponse,
  OrderList,
  OrderListResponse,
  OrderRateLimitUsage,
  OrderResponseTypeFor,
  PMProMintBFUSDParams,
  PMProMintBFUSDResponse,
  PMProRedeemBFUSDResponse,
  PortfolioMarginProAccountBalance,
  PortfolioMarginProSpanAccountInfo,
  PreventedMatch,
  PreventedMatchesParams,
  PurchaseFlexibleProductResponse,
  PurchaseRecordParams,
  QueryBrokerFuturesCommissionRebateParams,
  QueryBrokerSpotCommissionRebateParams,
  QueryCrossMarginAccountDetailsParams,
  QueryCrossMarginFeeDataParams,
  QueryCrossMarginPairResponse,
  QueryIsolatedMarginTierDataParams,
  QueryMarginAccountAllOCOParams,
  QueryMarginAccountTradeListParams,
  QueryMarginAssetResponse,
  QueryMarginInterestRateHistoryParams,
  QueryMarginPriceIndexResponse,
  QueryMarginRecordParams,
  QueryMaxBorrowResponse,
  QueryMaxTransferOutAmountResponse,
  QuerySubAccountCoinFuturesCommissionParams,
  QuerySubAccountFuturesAssetInfoParams,
  QuerySubAccountFuturesCommissionParams,
  QuerySubAccountSpotMarginAssetInfoParams,
  RawAccountTrade,
  RawTrade,
  RedeemBlvtParams,
  RedeemBlvtResponse,
  RedeemEthParams,
  RedeemEthResponse,
  RedeemGiftCardParams,
  RedeemSolResponse,
  RemoveBSwapLiquidityParams,
  RepayCryptoFlexibleLoanParams,
  RepayCryptoFlexibleLoanResponse,
  RepayCryptoLoanFlexibleWithCollateralParams,
  RepayCryptoLoanFlexibleWithCollateralResponse,
  RepayCryptoLoanParams,
  RepayCryptoLoanResponse,
  ReplaceSpotOrderParams,
  ReplaceSpotOrderResultSuccess,
  RollingWindowTickerParams,
  SetAutoSubscribeParams,
  SimpleEarnAccountResponse,
  SimpleEarnFlexibleProduct,
  SimpleEarnFlexibleProductPositionParams,
  SimpleEarnLockedProduct,
  SimpleEarnLockedProductPosition,
  SimpleEarnLockedProductPositionParams,
  SimpleEarnProductListParams,
  SimpleEarnRedeemFlexibleProductParams,
  SimpleEarnRedeemResponse,
  SimpleEarnSubscribeFlexibleProductResponse,
  SimpleEarnSubscribeLockedProductResponse,
  SimpleEarnSubscribeProductParams,
  SmallLiabilityExchangeCoin,
  SmallLiabilityExchangeHistory,
  SolBoostRewardsHistoryRecord,
  SolBoostRewardsHistoryReq,
  SolRedemptionHistoryRecord,
  SolStakingAccount,
  SolStakingHistoryRecord,
  SolStakingQuota,
  SOROrderResponseFull,
  SORTestOrderResponse,
  SpecialLowLatencyKeyInfo,
  SpecialLowLatencyKeyResponse,
  SpotAlgoOrder,
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
  SubaccountBalances,
  SubAccountBrokerMarginAsset,
  SubaccountBrokerSpotAsset,
  SubAccountCOINMDetail,
  SubAccountCOINMPositionRisk,
  SubAccountCOINMSummary,
  SubAccountDeposit,
  SubAccountDepositAddress,
  SubAccountDepositAddressParams,
  SubAccountDepositHistoryList,
  SubAccountDepositHistoryParams,
  SubAccountEnableFutures,
  SubAccountEnableLeverageToken,
  SubAccountEnableMargin,
  SubAccountEnableOrDisableIPRestriction,
  SubAccountFuturesAccountDetail,
  SubAccountFuturesAccountSummary,
  SubAccountFuturesAssetTransfer,
  SubAccountFuturesAssetTransferHistory,
  SubAccountFuturesAssetTransferHistoryParams,
  SubAccountFuturesAssetTransferParams,
  SubAccountListParams,
  SubAccountListResponse,
  SubAccountMarginAccountDetail,
  SubAccountMovePosition,
  SubAccountMovePositionHistory,
  SubAccountMovePositionHistoryParams,
  SubAccountMovePositionParams,
  SubAccountsMarginAccountSummary,
  SubAccountSpotAssetsSummary,
  SubAccountSpotAssetsSummaryParams,
  SubAccountSpotAssetTransferHistory,
  SubAccountSpotAssetTransferHistoryParams,
  SubAccountStatus,
  SubAccountSummaryOnFuturesAccountV2Params,
  SubAccountTransactionStatistics,
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
  SubmitConvertLimitOrderParams,
  SubmitDepositCreditParams,
  SubmitDepositCreditResponse,
  SubmitHashrateResaleParams,
  SubmitIndexLinkedPlanRedemptionParams,
  SubmitMarginOTOCOOrderParams,
  SubmitMarginOTOOrderParams,
  SubmitOneTimeTransactionParams,
  SubmitOneTimeTransactionResponse,
  SubmitSpotTwapNewOrderParams,
  SubmitSpotTwapNewOrderResponse,
  SubmitTravelRuleDepositQuestionnaireParams,
  SubmitTravelRuleDepositQuestionnaireResponse,
  SubmitTwapNewOrderParams,
  SubmitTwapNewOrderResponse,
  SubmitVpNewOrderParams,
  SubmitVpNewOrderResponse,
  SubscribeBlvtParams,
  SubscribeBlvtResponse,
  SubscribeDualInvestmentProductParams,
  SubscribeDualInvestmentProductResponse,
  SubscribeEthStakingV2Response,
  SubscribeSolStakingResponse,
  SymbolOrderBookTicker,
  SymbolTradeFee,
  SystemStatusResponse,
  TargetAssetROI,
  Ticker24hrResponse,
  ToggleBNBBurnParams,
  TradingDayTickerArray,
  TradingDayTickerFull,
  TradingDayTickerMini,
  TradingDayTickerParams,
  TradingDayTickerSingle,
  TransferBrokerSubAccount,
  TransferBrokerSubAccountParams,
  TravelRuleDepositHistoryRecord,
  TravelRuleWithdrawHistoryRecord,
  UniversalTransferBrokerParams,
  UniversalTransferHistoryParams,
  UniversalTransferParams,
  UpdateIpRestrictionForSubApiKey,
  UsdtMarginedFuturesResponse,
  UserAsset,
  VASPInfo,
  VipCollateralAccount,
  VipLoanAccruedInterestParams,
  VipLoanAccruedInterestRecord,
  VipLoanBorrowParams,
  VipLoanBorrowResponse,
  VipLoanInterestRateHistoryParams,
  VipLoanInterestRateRecord,
  VipLoanRenewParams,
  VipLoanRenewResponse,
  VipLoanRepaymentHistory,
  VipLoanRepayParams,
  VipLoanRepayResponse,
  VipOngoingOrder,
  VirtualSubAccount,
  WalletBalance,
  WithdrawAddress,
  WithdrawAssetsFromManagedSubAccountParams,
  WithdrawHistory,
  WithdrawHistoryParams,
  WithdrawParams,
  WithdrawTravelRuleParams,
  WrapBethResponse,
  WrapHistory,
} from './types/spot';
import BaseRestClient from './util/BaseRestClient';
import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
  serialiseParams,
} from './util/requestUtils';

export class MainClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super('spot1', restClientOptions, requestOptions);
    return this;
  }

  /**
   * This method is used to get the latency and time sync between the client and the server.
   * This is not official API endpoint and is only used for internal testing purposes.
   * Use this method to check the latency and time sync between the client and the server.
   * Final values might vary slightly, but it should be within few ms difference.
   * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
   */
  async fetchLatencySummary(): Promise<any> {
    const clientTimeReqStart = Date.now();
    const serverTime = await this.getServerTime();
    const clientTimeReqEnd = Date.now();
    console.log('serverTime', serverTime);

    const serverTimeMs = serverTime;
    const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
    const estimatedOneWayLatency = Math.floor(roundTripTime / 2);

    // Adjust server time by adding estimated one-way latency
    const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;

    // Calculate time difference between adjusted server time and local time
    const timeDifference = adjustedServerTime - clientTimeReqEnd;

    const result = {
      localTime: clientTimeReqEnd,
      serverTime: serverTimeMs,
      roundTripTime,
      estimatedOneWayLatency,
      adjustedServerTime,
      timeDifference,
    };

    console.log('Time synchronization results:');
    console.log(result);

    console.log(
      `Your approximate latency to exchange server:
    One way: ${estimatedOneWayLatency}ms.
    Round trip: ${roundTripTime}ms.
    `,
    );

    if (timeDifference > 500) {
      console.warn(
        `WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
      Consider adjusting your system clock to avoid unwanted clock sync errors!
      Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`,
      );
    } else {
      console.log(
        `Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`,
      );
    }

    return result;
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

  testConnectivity(): Promise<object> {
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

  getAvgPrice(params: { symbol: string }): Promise<CurrentAvgPrice> {
    return this.get('api/v3/avgPrice', params);
  }

  /**
   * @deprecated due to invalid naming
   * Use get24hrChangeStatistics instead
   */
  get24hrChangeStatististics(params?: {
    symbols?: string[]; // use for multiple symbols
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse[]>;

  /**
   * @deprecated due to invalid naming
   * Use get24hrChangeStatistics instead
   */
  get24hrChangeStatististics(params: {
    symbol: string; // use for single symbol
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse>;

  /**
   * @deprecated due to invalid naming
   * Use get24hrChangeStatistics instead
   */
  get24hrChangeStatististics(params?: {
    symbol?: string; // use for single symbol
    symbols?: string[]; // use for multiple symbols
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse | Ticker24hrResponse[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker/24hr?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }
    return this.get('api/v3/ticker/24hr', params);
  }

  get24hrChangeStatistics(params?: {
    symbols?: string[]; // use for multiple symbols
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse[]>;

  get24hrChangeStatistics(params: {
    symbol: string; // use for single symbol
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse>;

  get24hrChangeStatistics(params?: {
    symbol?: string; // use for single symbol
    symbols?: string[]; // use for multiple symbols
    type?: 'FULL' | 'MINI'; // default is FULL
  }): Promise<Ticker24hrResponse | Ticker24hrResponse[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker/24hr?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }
    return this.get('api/v3/ticker/24hr', params);
  }

  getTradingDayTicker(
    params: TradingDayTickerParams,
  ): Promise<TradingDayTickerSingle | TradingDayTickerArray[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker/tradingDay?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }
    return this.get('api/v3/ticker/tradingDay', params);
  }

  getSymbolPriceTicker(params?: {
    symbol?: string; // use for single symbol
    symbols?: string[]; // use for multiple symbols
  }): Promise<SymbolPrice | SymbolPrice[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker/price?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }
    return this.get('api/v3/ticker/price', params);
  }

  getSymbolOrderBookTicker(params?: {
    symbol?: string; // use for single symbol
    symbols?: string[]; // use for multiple symbols
  }): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker/bookTicker?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }
    return this.get('api/v3/ticker/bookTicker', params);
  }

  getRollingWindowTicker(
    params: RollingWindowTickerParams,
  ): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]> {
    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const { symbols, ...otherParams } = params;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get(
        'api/v3/ticker?symbols=' + symbolsQueryParam,
        otherParams,
      );
    }

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
  >(params: NewSpotOrderParams<T, RT>): Promise<object> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order/test', params);
  }

  getOrder(params: GetOrderParams): Promise<SpotOrder> {
    return this.getPrivate('api/v3/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('api/v3/order', params);
  }

  cancelAllSymbolOrders(params: {
    symbol: string;
  }): Promise<CancelSpotOrderResult[]> {
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

  getOpenOrders(params?: { symbol?: string }): Promise<SpotOrder[]> {
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

  submitNewOrderListOTO(
    params: NewOrderListOTOParams,
  ): Promise<NewOrderListOTOResponse> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'workingClientOrderId');
    this.validateOrderId(params, 'pendingClientOrderId');
    return this.postPrivate('api/v3/orderList/oto', params);
  }

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
  ): Promise<object | SORTestOrderResponse> {
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
  getAccountInformation(params?: {
    omitZeroBalances?: boolean;
  }): Promise<AccountInformation> {
    return this.getPrivate('api/v3/account', params);
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

  getAllocations(params: AllocationsParams): Promise<Allocation[]> {
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
   * Post a new OTO order for margin account
   */
  submitMarginOTOOrder(
    params: SubmitMarginOTOOrderParams,
  ): Promise<MarginOTOOrder> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'workingClientOrderId');
    this.validateOrderId(params, 'pendingClientOrderId');
    return this.postPrivate('sapi/v1/margin/order/oto', params);
  }

  /**
   * Submit a new OTOCO order for margin account
   */
  submitMarginOTOCOOrder(
    params: SubmitMarginOTOCOOrderParams,
  ): Promise<MarginOTOCOOrder> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'workingClientOrderId');
    this.validateOrderId(params, 'pendingAboveClientOrderId');
    this.validateOrderId(params, 'pendingBelowClientOrderId');
    return this.postPrivate('sapi/v1/margin/order/otoco', params);
  }

  /**
   * Create a special key for low-latency trading (VIP 4+ only)
   */
  createMarginSpecialLowLatencyKey(
    params: CreateSpecialLowLatencyKeyParams,
  ): Promise<SpecialLowLatencyKeyResponse> {
    return this.postPrivate('sapi/v1/margin/apiKey', params);
  }

  deleteMarginSpecialLowLatencyKey(params?: {
    apiKey?: string;
    apiName?: string;
    symbol?: string;
  }): Promise<any> {
    return this.deletePrivate('sapi/v1/margin/apiKey', params);
  }

  updateMarginIPForSpecialLowLatencyKey(params: {
    apiKey: string;
    symbol?: string;
    ip: string;
  }): Promise<object> {
    return this.putPrivate('sapi/v1/margin/apiKey/ip', params);
  }

  /**
   * Query the list of special keys for low-latency trading
   */
  getMarginSpecialLowLatencyKeys(params: {
    symbol?: string;
  }): Promise<SpecialLowLatencyKeyInfo[]> {
    return this.getPrivate('sapi/v1/margin/api-key-list', params);
  }

  /**
   * Query information for a specific special key used in low-latency trading
   */
  getMarginSpecialLowLatencyKey(params: {
    apiKey: string;
    symbol?: string;
  }): Promise<SpecialLowLatencyKeyInfo> {
    return this.getPrivate('sapi/v1/margin/apiKey', params);
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
    return this.getPrivate('sapi/v1/margin/isolated/account', params);
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
   * Possibly @deprecated
   * Only existing in old documentation, not in new documentation
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
   * WALLET Endpoints - Capital endpoints
   *
   **/

  getBalances(): Promise<AllCoinsInformationResponse[]> {
    return this.getPrivate('sapi/v1/capital/config/getall');
  }

  withdraw(params: WithdrawParams): Promise<{ id: string }> {
    return this.postPrivate('sapi/v1/capital/withdraw/apply', params);
  }

  getWithdrawHistory(
    params?: WithdrawHistoryParams,
  ): Promise<WithdrawHistory[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/history', params);
  }

  getWithdrawAddresses(): Promise<WithdrawAddress[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/address/list');
  }

  getDepositHistory(params?: DepositHistoryParams): Promise<DepositHistory[]> {
    return this.getPrivate('sapi/v1/capital/deposit/hisrec', params);
  }

  getDepositAddress(
    params: DepositAddressParams,
  ): Promise<DepositAddressResponse> {
    return this.getPrivate('sapi/v1/capital/deposit/address', params);
  }

  getDepositAddresses(
    params: DepositAddressListParams,
  ): Promise<DepositAddress[]> {
    return this.getPrivate('sapi/v1/capital/deposit/address/list', params);
  }

  submitDepositCredit(
    params: SubmitDepositCreditParams,
  ): Promise<SubmitDepositCreditResponse> {
    return this.postPrivate('sapi/v1/capital/deposit/credit-apply', params);
  }

  /**
   * @deprecated - deleted as of 2024-11-21
   */
  getAutoConvertStablecoins(): Promise<ConvertibleCoinsResponse> {
    return this.getPrivate('sapi/v1/capital/contract/convertible-coins');
  }

  /**
   * @deprecated - deleted as of 2024-11-21
   */
  setConvertibleCoins(params: ConvertibleCoinsParams): Promise<void> {
    return this.postPrivate(
      'sapi/v1/capital/contract/convertible-coins',
      params,
    );
  }

  /**
   *
   * WALLET Endpoints - Asset endpoints
   *
   **/

  getAssetDetail(
    params?: Partial<BasicAssetParam>,
  ): Promise<Record<ExchangeSymbol, AssetDetail>> {
    return this.getPrivate('sapi/v1/asset/assetDetail', params);
  }

  getWalletBalances(params?: {
    quoteAsset?: string;
  }): Promise<WalletBalance[]> {
    return this.getPrivate('sapi/v1/asset/wallet/balance', params);
  }

  getUserAsset(params: GetAssetParams): Promise<UserAsset[]> {
    return this.postPrivate('sapi/v3/asset/getUserAsset', params);
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

  getDust(params: { accountType?: 'SPOT' | 'MARGIN' }): Promise<DustInfo> {
    return this.postPrivate('sapi/v1/asset/dust-btc', params);
  }

  convertDustToBnb(params: ConvertDustParams): Promise<DustConversion> {
    return this.postPrivate('sapi/v1/asset/dust', params);
  }

  getDustLog(params?: BasicTimeRangeParam): Promise<DustLog> {
    return this.getPrivate('sapi/v1/asset/dribblet', params);
  }

  getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any> {
    return this.getPrivate('sapi/v1/asset/assetDividend', params);
  }

  getTradeFee(params?: { symbol?: string }): Promise<SymbolTradeFee[]> {
    return this.getPrivate('sapi/v1/asset/tradeFee', params);
  }

  getFundingAsset(params: GetAssetParams): Promise<FundingAsset[]> {
    return this.postPrivate('sapi/v1/asset/get-funding-asset', params);
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

  getDelegationHistory(
    params: DelegationHistoryParams,
  ): Promise<RowsWithTotal<DelegationHistory>> {
    return this.getPrivate('sapi/v1/asset/custody/transfer-history', params);
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

  /**
   * Possibly @deprecated, found only in old docs only
   * Use sapi/v1/asset/transfer instead
   */
  submitNewFutureAccountTransfer(
    params: NewFutureAccountTransferParams,
  ): Promise<{ tranId: number }> {
    return this.postPrivate('sapi/v1/futures/transfer', params);
  }

  /**
   * Possibly @deprecated, found only in old docs only
   * Use sapi/v1/asset/transfer instead
   */
  getFutureAccountTransferHistory(
    params: GetFutureAccountTransferHistoryParams,
  ): Promise<RowsWithTotal<FutureAccountTransfer>> {
    return this.getPrivate('sapi/v1/futures/transfer', params);
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralBorrowHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate('sapi/v1/futures/loan/borrow/history', params);
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralRepaymentHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate('sapi/v1/futures/loan/repay/history', params);
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralWalletV2(): Promise<any> {
    return this.getPrivate('sapi/v2/futures/loan/wallet');
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getAdjustCrossCollateralLTVHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(
      'sapi/v1/futures/loan/adjustCollateral/history',
      params,
    );
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralLiquidationHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/futures/loan/liquidationHistory', params);
  }

  /**
   * @deprecated as of 2023-09-25
   */
  getCrossCollateralInterestHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/futures/loan/interestHistory', params);
  }

  /**
   *
   * WALLET Endpoints - Account endpoints
   *
   **/

  getAccountInfo(): Promise<AccountInfo> {
    return this.getPrivate('sapi/v1/account/info');
  }

  getDailyAccountSnapshot(
    params: DailyAccountSnapshotParams,
  ): Promise<DailyAccountSnapshot> {
    return this.getPrivate('sapi/v1/accountSnapshot', params);
  }

  disableFastWithdrawSwitch(): Promise<object> {
    return this.postPrivate('sapi/v1/account/disableFastWithdrawSwitch');
  }

  enableFastWithdrawSwitch(): Promise<object> {
    return this.postPrivate('sapi/v1/account/enableFastWithdrawSwitch');
  }

  getAccountStatus(): Promise<{ data: string }> {
    return this.getPrivate('sapi/v1/account/status');
  }

  getApiTradingStatus(): Promise<APITradingStatus> {
    return this.getPrivate('sapi/v1/account/apiTradingStatus');
  }

  getApiKeyPermissions(): Promise<APIPermissions> {
    return this.getPrivate('sapi/v1/account/apiRestrictions');
  }

  /**
   *
   * WALLET Endpoints - Travel Rule endpoints
   *
   **/

  /**
   * Submit a withdrawal request for local entities that require travel rule
   *
   * For questionaire format, please refer to the docs:
   * https://developers.binance.com/docs/wallet/travel-rule/withdraw-questionnaire
   */
  withdrawTravelRule(params: WithdrawTravelRuleParams): Promise<{
    trId: number;
    accpted: boolean;
    info: string;
  }> {
    return this.postPrivate('sapi/v1/localentity/withdraw/apply', params);
  }

  /**
   * Fetch withdraw history for local entities that require travel rule
   */
  getTravelRuleWithdrawHistory(
    params?: GetTravelRuleWithdrawHistoryParams,
  ): Promise<TravelRuleWithdrawHistoryRecord[]> {
    return this.getPrivate('sapi/v1/localentity/withdraw/history', params);
  }

  /**
   * Fetch withdraw history for local entities that require travel rule
   */
  getTravelRuleWithdrawHistoryV2(
    params?: GetTravelRuleWithdrawHistoryV2Params,
  ): Promise<TravelRuleWithdrawHistoryRecord[]> {
    return this.getPrivate('sapi/v2/localentity/withdraw/history', params);
  }

  /**
   * Submit questionnaire for local entities that require travel rule
   *
   * for questionaire format, please refer to the docs:
   * https://developers.binance.com/docs/wallet/travel-rule/deposit-questionnaire
   */
  submitTravelRuleDepositQuestionnaire(
    params: SubmitTravelRuleDepositQuestionnaireParams,
  ): Promise<SubmitTravelRuleDepositQuestionnaireResponse> {
    return this.putPrivate('sapi/v1/localentity/deposit/provide-info', params);
  }

  /**
   * Fetch deposit history for local entities that require travel rule
   */
  getTravelRuleDepositHistory(
    params?: GetTravelRuleDepositHistoryParams,
  ): Promise<TravelRuleDepositHistoryRecord[]> {
    return this.getPrivate('sapi/v1/localentity/deposit/history', params);
  }

  /**
   * Fetch the onboarded VASP list for local entities that require travel rule
   */
  getOnboardedVASPList(): Promise<VASPInfo[]> {
    return this.getPrivate('sapi/v1/localentity/vasp');
  }

  /**
   *
   * WALLET Endpoints - Other endpoints
   *
   **/

  getSystemStatus(): Promise<SystemStatusResponse> {
    return this.get('sapi/v1/system/status');
  }

  getDelistSchedule(): Promise<DelistScheduleResponse[]> {
    return this.getPrivate('sapi/v1/spot/delist-schedule');
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
    params: SubAccountAddOrDeleteIPList,
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
   * @deprecated
   * Use subAccountAddIPRestriction instead
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
   * @deprecated
   * Use subAccountAddIPRestriction instead, or subAccountDeleteIPList
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

  subAccountMovePosition(
    params: SubAccountMovePositionParams,
  ): Promise<{ movePositionOrders: SubAccountMovePosition[] }> {
    return this.postPrivate(
      'sapi/v1/sub-account/futures/move-position',
      params,
    );
  }

  getSubAccountFuturesPositionMoveHistory(
    params: SubAccountMovePositionHistoryParams,
  ): Promise<{
    total: number;
    futureMovePositionOrderVoList: SubAccountMovePositionHistory[];
  }> {
    return this.getPrivate('sapi/v1/sub-account/futures/move-position', params);
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
    accountType?: string;
  }): Promise<ManagedSubAccountMarginAssetsResponse> {
    return this.getPrivate('sapi/v1/managed-subaccount/marginAsset', params);
  }

  getManagedSubAccountFuturesAssets(params: {
    email: string;
    accountType?: string;
  }): Promise<ManagedSubAccountFuturesAssetsResponse> {
    return this.getPrivate(
      'sapi/v1/managed-subaccount/fetch-future-asset',
      params,
    );
  }

  /**
   *
   * AUTO INVEST Endpoints - Market data
   *
   **/

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

  getAutoInvestIndex(params: {
    indexId: number;
  }): Promise<GetIndexDetailsResponse> {
    return this.getPrivate('sapi/v1/lending/auto-invest/index/info', params);
  }

  getAutoInvestPlans(params: {
    planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
  }): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/plan/list', params);
  }

  /**
   *
   * AUTO INVEST Endpoints - Trade
   *
   **/

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

  updateAutoInvestPlanStatus(
    params: ChangePlanStatusParams,
  ): Promise<ChangePlanStatusResponse> {
    return this.postPrivate(
      'sapi/v1/lending/auto-invest/plan/edit-status',
      params,
    );
  }

  /**
   *
   * @deprecated , use updateAutoInvestmentPlan instead
   *
   **/
  updateAutoInvestmentPlanOld(
    params: EditInvestmentPlanParams,
  ): Promise<EditInvestmentPlanResponse> {
    return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', params);
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

  submitAutoInvestRedemption(
    params: SubmitIndexLinkedPlanRedemptionParams,
  ): Promise<{
    redemptionId: number;
  }> {
    return this.postPrivate('sapi/v1/lending/auto-invest/redeem', params);
  }

  getAutoInvestSubscriptionTransactions(
    params: GetSubscriptionTransactionHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/history/list', params);
  }

  getOneTimeTransactionStatus(
    params: GetOneTimeTransactionStatusParams,
  ): Promise<GetOneTimeTransactionStatusResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/one-off/status',
      params,
    );
  }

  /**
   * @deprecated , use submitAutoInvestmentPlan instead
   *
   **/
  submitAutoInvestmentPlanOld(
    params: CreateInvestmentPlanParams,
  ): Promise<CreateInvestmentPlanResponse> {
    return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', params);
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

  getAutoInvestRedemptionHistory(
    params: GetIndexLinkedPlanRedemptionHistoryParams,
  ): Promise<IndexLinkedPlanRedemptionRecord[]> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/redeem/history',
      params,
    );
  }

  getAutoInvestPlan(params: GetPlanDetailsParams): Promise<any> {
    return this.getPrivate('sapi/v1/lending/auto-invest/plan/id', params);
  }

  getAutoInvestUserIndex(params: {
    indexId: number;
  }): Promise<GetIndexLinkedPlanPositionDetailsResponse> {
    return this.getPrivate(
      'sapi/v1/lending/auto-invest/index/user-summary',
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
   * STAKING Endpoints - ETH Staking - Account
   *
   **/

  /**
   * @deprecated use getEthStakingAccountV2 instead
   **/
  getEthStakingAccount(): Promise<GetEthStakingAccountResponse> {
    return this.getPrivate('sapi/v1/eth-staking/account');
  }

  getEthStakingAccountV2(): Promise<GetEthStakingAccountV2Response> {
    return this.getPrivate('sapi/v2/eth-staking/account');
  }

  getEthStakingQuota(): Promise<GetEthStakingQuotaResponse> {
    return this.getPrivate('sapi/v1/eth-staking/eth/quota');
  }

  /**
   *
   * STAKING Endpoints - ETH Staking- Staking
   *
   **/

  /**
   * @deprecated use subscribeEthStakingV2 instead
   **/
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

  wrapBeth(params: { amount: number }): Promise<WrapBethResponse> {
    return this.postPrivate('sapi/v1/eth-staking/wbeth/wrap', params);
  }

  /**
   *
   * STAKING Endpoints - ETH Staking - History
   *
   **/

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

  getWbethRewardsHistory(
    params: GetWrapHistoryParams,
  ): Promise<GetWbethRewardsHistoryResponse> {
    return this.getPrivate(
      'sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
      params,
    );
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

  /**
   * @deprecated as of 2024-01-19
   */
  getStakingProducts(
    params: StakingBasicParams & {
      asset?: string;
    },
  ): Promise<StakingProduct[]> {
    return this.getPrivate('sapi/v1/staking/productList', params);
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

  /**
   *
   * STAKING Endpoints - SOL Staking- Account
   *
   **/

  getSolStakingAccount(): Promise<SolStakingAccount> {
    return this.getPrivate('sapi/v1/sol-staking/account');
  }

  getSolStakingQuota(): Promise<SolStakingQuota> {
    return this.getPrivate('sapi/v1/sol-staking/sol/quota');
  }

  /**
   *
   * STAKING Endpoints - SOL Staking - Staking
   *
   **/

  subscribeSolStaking(params: {
    amount: number;
  }): Promise<SubscribeSolStakingResponse> {
    return this.postPrivate('sapi/v1/sol-staking/sol/stake', params);
  }

  redeemSol(params: { amount: number }): Promise<RedeemSolResponse> {
    return this.postPrivate('sapi/v1/sol-staking/sol/redeem', params);
  }

  claimSolBoostRewards(): Promise<{
    success: boolean;
  }> {
    return this.postPrivate('sapi/v1/sol-staking/sol/claim');
  }

  /**
   *
   * STAKING Endpoints - SOL Staking- History
   *
   **/

  getSolStakingHistory(params?: GetSolStakingHistoryReq): Promise<{
    rows: SolStakingHistoryRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/sol-staking/sol/history/stakingHistory',
      params,
    );
  }

  getSolRedemptionHistory(params?: {
    rows: SolRedemptionHistoryRecord[];
    total: number;
  }): Promise<SolRedemptionHistoryRecord> {
    return this.getPrivate(
      'sapi/v1/sol-staking/sol/history/redemptionHistory',
      params,
    );
  }

  getBnsolRewardsHistory(params?: GetBnsolRewardsHistoryReq): Promise<{
    estRewardsInSOL: string;
    rows: BnsolRewardHistoryRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/sol-staking/sol/history/bnsolRewardsHistory',
      params,
    );
  }

  getBnsolRateHistory(params?: GetBnsolRateHistoryReq): Promise<{
    rows: BnsolRateHistoryRecord[];
    total: string;
  }> {
    return this.getPrivate(
      'sapi/v1/sol-staking/sol/history/rateHistory',
      params,
    );
  }

  getSolBoostRewardsHistory(params?: SolBoostRewardsHistoryReq): Promise<{
    rows: SolBoostRewardsHistoryRecord[];
    total: number;
  }> {
    return this.getPrivate(
      'sapi/v1/sol-staking/sol/history/boostRewardsHistory',
      params,
    );
  }

  getSolUnclaimedRewards(): Promise<
    {
      amount: string;
      rewardsAsset: string;
    }[]
  > {
    return this.getPrivate('sapi/v1/sol-staking/sol/history/unclaimedRewards');
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
   * MINING Endpoints - rest api
   *
   **/

  getMiningAlgos(): Promise<GetMiningAlgoListResponse[]> {
    return this.get('sapi/v1/mining/pub/algoList');
  }

  getMiningCoins(): Promise<GetMiningCoinListResponse[]> {
    return this.get('sapi/v1/mining/pub/coinList');
  }

  getHashrateResales(
    params: GetHashrateResaleListParams,
  ): Promise<GetHashrateResaleListResponse> {
    return this.getPrivate(
      'sapi/v1/mining/hash-transfer/config/details/list',
      params,
    );
  }

  getMiners(params: GetMinerListParams): Promise<GetMinerListResponse> {
    return this.getPrivate('sapi/v1/mining/worker/list', params);
  }

  getMinerDetails(
    params: GetMinerDetailsParams,
  ): Promise<GetMinerDetailsResponse[]> {
    return this.getPrivate('sapi/v1/mining/worker/detail', params);
  }

  getExtraBonuses(
    params: GetExtraBonusListParams,
  ): Promise<GetExtraBonusListResponse> {
    return this.getPrivate('sapi/v1/mining/payment/other', params);
  }

  getMiningEarnings(
    params: GetEarningsListParams,
  ): Promise<GetEarningsListResponse> {
    return this.getPrivate('sapi/v1/mining/payment/list', params);
  }

  cancelHashrateResaleConfig(
    params: CancelHashrateResaleConfigParams,
  ): Promise<boolean> {
    return this.postPrivate(
      'sapi/v1/mining/hash-transfer/config/cancel',
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

  getMiningAccountEarnings(
    params: GetMiningAccountEarningParams,
  ): Promise<GetMiningAccountEarningResponse> {
    return this.getPrivate('sapi/v1/mining/payment/uid', params);
  }

  getMiningStatistics(
    params: GetStatisticListParams,
  ): Promise<GetStatisticListResponse> {
    return this.getPrivate('sapi/v1/mining/statistics/user/status', params);
  }

  submitHashrateResale(params: SubmitHashrateResaleParams): Promise<number> {
    return this.postPrivate('sapi/v1/mining/hash-transfer/config', params);
  }

  getMiningAccounts(
    params: getMiningAccountsListParams,
  ): Promise<getMiningAccountsListResponse> {
    return this.getPrivate('sapi/v1/mining/statistics/user/list', params);
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
   * CRYPTO LOAN Endpoints - Flexible rate - Market data
   *
   **/

  getCryptoLoanFlexibleCollateralAssets(params: {
    collateralCoin?: string;
  }): Promise<{
    rows: FlexibleLoanCollateralAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/collateral/data', params);
  }

  getCryptoLoanFlexibleAssets(params: { loanCoin?: string }): Promise<{
    rows: FlexibleLoanAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/loanable/data', params);
  }

  /**
   *
   * CRYPTO LOAN Endpoints - Flexible rate - Trade
   *
   **/

  borrowCryptoLoanFlexible(
    params: BorrowFlexibleLoanParams,
  ): Promise<BorrowFlexibleLoanResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/borrow', params);
  }

  repayCryptoLoanFlexible(
    params: RepayCryptoFlexibleLoanParams,
  ): Promise<RepayCryptoFlexibleLoanResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/repay', params);
  }

  repayCryptoLoanFlexibleWithCollateral(
    params: RepayCryptoLoanFlexibleWithCollateralParams,
  ): Promise<RepayCryptoLoanFlexibleWithCollateralResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/repay/collateral', params);
  }

  adjustCryptoLoanFlexibleLTV(
    params: AdjustFlexibleCryptoLoanLTVParams,
  ): Promise<AdjustFlexibleCryptoLoanLTVResponse> {
    return this.postPrivate('sapi/v2/loan/flexible/adjust/ltv', params);
  }

  /**
   *
   * CRYPTO LOAN Endpoints - Flexible rate - User info
   *
   **/

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

  getFlexibleLoanCollateralRepayRate(params: {
    loanCoin: string;
    collateralCoin: string;
  }): Promise<{
    loanCoin: string;
    collateralCoin: string;
    rate: string;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/repay/rate', params);
  }

  getLoanFlexibleBorrowHistory(
    params: GetFlexibleCryptoLoanBorrowHistoryParams,
  ): Promise<{
    rows: FlexibleCryptoLoanBorrowHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/borrow/history', params);
  }

  getCryptoLoanFlexibleOngoingOrders(
    params: GetFlexibleLoanOngoingOrdersParams,
  ): Promise<{
    rows: FlexibleLoanOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/ongoing/orders', params);
  }

  getFlexibleLoanLiquidationHistory(
    params?: GetFlexibleLoanLiquidationHistoryParams,
  ): Promise<{
    rows: FlexibleLoanLiquidationHistoryRecord[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/liquidation/history', params);
  }

  getLoanFlexibleRepaymentHistory(
    params: GetLoanRepaymentHistoryParams,
  ): Promise<{
    rows: LoanRepaymentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v2/loan/flexible/repay/history', params);
  }

  /**
   *
   * CRYPTO LOAN Endpoints - Stable rate - Market data
   *
   **/

  /**
   * @deprecated
   */
  getCryptoLoanLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
    rows: LoanableAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/loanable/data', params);
  }

  getCryptoLoanCollateralRepayRate(
    params: CheckCollateralRepayRateParams,
  ): Promise<CheckCollateralRepayRateResponse> {
    return this.getPrivate('sapi/v1/loan/repay/collateral/rate', params);
  }

  /**
   * @deprecated
   */
  getCryptoLoanCollateralAssetsData(
    params: GetCollateralAssetDataParams,
  ): Promise<{
    rows: CollateralAssetData[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/collateral/data', params);
  }

  getCryptoLoansIncomeHistory(
    params: GetCryptoLoansIncomeHistoryParams,
  ): Promise<GetCryptoLoansIncomeHistoryResponse[]> {
    return this.getPrivate('sapi/v1/loan/income', params);
  }

  /**
   *
   * CRYPTO LOAN Endpoints - Stable rate - Trade
   *
   **/

  /**
   * @deprecated
   */
  borrowCryptoLoan(
    params: BorrowCryptoLoanParams,
  ): Promise<BorrowCryptoLoanResponse> {
    return this.postPrivate('sapi/v1/loan/borrow', params);
  }

  /**
   * @deprecated
   */
  repayCryptoLoan(
    params: RepayCryptoLoanParams,
  ): Promise<RepayCryptoLoanResponse> {
    return this.postPrivate('sapi/v1/loan/repay', params);
  }

  /**
   * @deprecated
   */
  adjustCryptoLoanLTV(
    params: AdjustCryptoLoanLTVParams,
  ): Promise<AdjustCryptoLoanLTVResponse> {
    return this.postPrivate('sapi/v1/loan/adjust/ltv', params);
  }

  /**
   * @deprecated
   */
  customizeCryptoLoanMarginCall(params: CustomizeMarginCallParams): Promise<{
    rows: CustomizeMarginCall[];
    total: number;
  }> {
    return this.postPrivate('sapi/v1/loan/customize/margin_call', params);
  }

  /**
   *
   * CRYPTO LOAN Endpoints - Stable rate - User info
   *
   **/

  /**
   * @deprecated
   */
  getCryptoLoanOngoingOrders(params: GetLoanOngoingOrdersParams): Promise<{
    rows: LoanOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/ongoing/orders', params);
  }

  getCryptoLoanBorrowHistory(params: GetLoanBorrowHistoryParams): Promise<{
    rows: LoanBorrowHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/borrow/history', params);
  }

  getCryptoLoanLTVAdjustmentHistory(
    params: GetLoanLTVAdjustmentHistoryParams,
  ): Promise<{
    rows: LoanLTVAdjustmentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/ltv/adjustment/history', params);
  }

  getCryptoLoanRepaymentHistory(
    params: GetLoanRepaymentHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/loan/repay/history', params);
  }

  /**
   *
   * SIMPLE EARN Endpoints - Account
   *
   **/

  getSimpleEarnAccount(): Promise<SimpleEarnAccountResponse> {
    return this.getPrivate('sapi/v1/simple-earn/account');
  }

  getFlexibleSavingProducts(params?: SimpleEarnProductListParams): Promise<{
    rows: SimpleEarnFlexibleProduct[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/simple-earn/flexible/list', params);
  }

  getSimpleEarnLockedProductList(
    params?: SimpleEarnProductListParams,
  ): Promise<{
    rows: SimpleEarnLockedProduct[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/simple-earn/locked/list', params);
  }

  getFlexibleProductPosition(
    params?: SimpleEarnFlexibleProductPositionParams,
  ): Promise<{
    rows: any[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/simple-earn/flexible/position', params);
  }

  getLockedProductPosition(
    params?: SimpleEarnLockedProductPositionParams,
  ): Promise<{
    rows: SimpleEarnLockedProductPosition[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/simple-earn/locked/position', params);
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
    return this.postPrivate('sapi/v1/simple-earn/flexible/subscribe', params);
  }

  subscribeSimpleEarnLockedProduct(
    params: SimpleEarnSubscribeProductParams,
  ): Promise<SimpleEarnSubscribeLockedProductResponse> {
    return this.postPrivate('sapi/v1/simple-earn/locked/subscribe', params);
  }

  redeemFlexibleProduct(
    params: SimpleEarnRedeemFlexibleProductParams,
  ): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate('sapi/v1/simple-earn/flexible/redeem', params);
  }

  redeemLockedProduct(params: {
    positionId: string;
  }): Promise<SimpleEarnRedeemResponse> {
    return this.postPrivate('sapi/v1/simple-earn/locked/redeem', params);
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
   *
   * VIP LOAN Endpoints - Market Data
   *
   **/

  getVipBorrowInterestRate(params: {
    loanCoin: string;
  }): Promise<BorrowInterestRate[]> {
    return this.getPrivate('sapi/v1/loan/vip/request/interestRate', params);
  }

  getVipLoanInterestRateHistory(
    params: VipLoanInterestRateHistoryParams,
  ): Promise<{
    rows: VipLoanInterestRateRecord[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/interestRateHistory', params);
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

  /**
   *
   * VIP LOAN Endpoints - User Info
   *
   **/

  getVipLoanOpenOrders(params: GetVipLoanOngoingOrdersParams): Promise<{
    rows: VipOngoingOrder[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/ongoing/orders', params);
  }

  getVipLoanRepaymentHistory(
    params: GetVipLoanRepaymentHistoryParams,
  ): Promise<{
    rows: VipLoanRepaymentHistory[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/repay/history', params);
  }

  checkVipCollateralAccount(params: CheckVipCollateralAccountParams): Promise<{
    rows: VipCollateralAccount[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/collateral/account', params);
  }

  getVipApplicationStatus(params: GetApplicationStatusParams): Promise<{
    rows: ApplicationStatus[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/request/data', params);
  }

  /**
   *
   * VIP LOAN Endpoints - Trade
   *
   **/

  renewVipLoan(params: VipLoanRenewParams): Promise<VipLoanRenewResponse> {
    return this.postPrivate('sapi/v1/loan/vip/renew', params);
  }

  repayVipLoan(params: VipLoanRepayParams): Promise<VipLoanRepayResponse> {
    return this.postPrivate('sapi/v1/loan/vip/repay', params);
  }

  borrowVipLoan(params: VipLoanBorrowParams): Promise<VipLoanBorrowResponse> {
    return this.postPrivate('sapi/v1/loan/vip/borrow', params);
  }

  /**
   *
   * DUAL INVESTMENT Endpoints - Market Data
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

  /**
   *
   * DUAL INVESTMENT Endpoints - Trade
   *
   **/

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

  getVipLoanAccruedInterest(params?: VipLoanAccruedInterestParams): Promise<{
    rows: VipLoanAccruedInterestRecord[];
    total: number;
  }> {
    return this.getPrivate('sapi/v1/loan/vip/accruedInterest', params);
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
   * GIFT CARD Endpoints - Market Data
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

  getTokenLimit(params: { baseToken: string }): Promise<any> {
    return this.getPrivate('sapi/v1/giftcard/buyCode/token-limit', params);
  }

  getRsaPublicKey(): Promise<any> {
    return this.getPrivate('sapi/v1/giftcard/cryptography/rsa-public-key');
  }

  /**
   *
   *  NFT Endpoints - REST api
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
   *  FIAT Endpoints - REST api
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
   * DERIVATIVES - Portfolio Margin Pro - Market Data
   * This is in mainclient because it shares the same base url
   *
   **/

  getPortfolioMarginIndexPrice(params?: {
    asset?: string;
  }): Promise<GetPortfolioMarginAssetIndexPriceResponse[]> {
    return this.get('sapi/v1/portfolio/asset-index-price', params);
  }

  getPortfolioMarginAssetLeverage(): Promise<
    GetPortfolioMarginAssetLeverageResponse[]
  > {
    return this.getPrivate('sapi/v1/portfolio/margin-asset-leverage');
  }

  getPortfolioMarginProCollateralRate(): Promise<
    GetPortfolioMarginProCollateralRateResponse[]
  > {
    return this.get('sapi/v1/portfolio/collateralRate');
  }

  getPortfolioMarginProTieredCollateralRate(): Promise<any[]> {
    return this.get('sapi/v2/portfolio/collateralRate');
  }

  /**
   *
   * DERIVATIVES - Portfolio Margin Pro - Account
   * This is in mainclient because it shares the same base url
   *
   **/

  getPortfolioMarginProAccountInfo(): Promise<GetPortfolioMarginProAccountInfoResponse> {
    return this.getPrivate('sapi/v1/portfolio/account');
  }

  bnbTransfer(params: BnbTransferParams): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('sapi/v1/portfolio/bnb-transfer', params);
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

  repayPortfolioMarginProBankruptcyLoan(params: {
    from?: 'SPOT' | 'MARGIN';
  }): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('sapi/v1/portfolio/repay', params);
  }

  getPortfolioMarginProBankruptcyLoanAmount(): Promise<GetPortfolioMarginProBankruptcyLoanAmountResponse> {
    return this.getPrivate('sapi/v1/portfolio/pmLoan');
  }

  repayFuturesNegativeBalance(): Promise<{
    msg: string;
  }> {
    return this.postPrivate('sapi/v1/portfolio/repay-futures-negative-balance');
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

  getPortfolioMarginProInterestHistory(
    params: GetPortfolioMarginProInterestHistoryParams,
  ): Promise<GetPortfolioMarginProInterestHistoryResponse[]> {
    return this.getPrivate('sapi/v1/portfolio/interest-history', params);
  }

  getPortfolioMarginProSpanAccountInfo(): Promise<PortfolioMarginProSpanAccountInfo> {
    return this.getPrivate('sapi/v2/portfolio/account');
  }

  getPortfolioMarginProAccountBalance(params?: {
    asset?: string;
  }): Promise<PortfolioMarginProAccountBalance[]> {
    return this.getPrivate('sapi/v1/portfolio/balance', params);
  }

  mintPortfolioMarginBFUSD(
    params: PMProMintBFUSDParams,
  ): Promise<PMProMintBFUSDResponse> {
    return this.postPrivate('sapi/v1/portfolio/mint', params);
  }

  redeemPortfolioMarginBFUSD(params: {
    fromAsset: string; // BFUSD only
    targetAsset: string; // USDT only
    amount: number;
  }): Promise<PMProRedeemBFUSDResponse> {
    return this.postPrivate('sapi/v1/portfolio/redeem', params);
  }

  /**
   *
   * DERIVATIVES - Futures Data - Market
   * This is in mainclient because it shares the same base url
   *
   **/

  getFuturesTickLevelOrderbookDataLink(
    params: GetFutureTickLevelOrderbookDataLinkParams,
  ): Promise<{
    data: HistoricalDataLink[];
  }> {
    return this.getPrivate('sapi/v1/futures/histDataLink', params);
  }

  /**
   *
   * BLVT Endpoints
   * BLVT category is possibly @deprecated, found only in old docs
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
   * Pay endpoints
   * Found only in old docs, possibly @deprecated
   **/
  getPayTransactions(params: GetPayTradeHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/pay/transactions', params);
  }

  /**
   *
   * EXCHANGE LINK - Account Endpoints
   * https://developers.binance.com/docs/binance_link
   */

  createBrokerSubAccount(
    params: CreateBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  getBrokerSubAccount(
    params: GetBrokerSubAccountParams,
  ): Promise<BrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccount', params);
  }

  enableMarginBrokerSubAccount(
    params: EnableMarginBrokerSubAccountParams,
  ): Promise<EnableMarginBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount/futures', params);
  }

  createApiKeyBrokerSubAccount(
    params: CreateApiKeyBrokerSubAccountParams,
  ): Promise<CreateApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi', params);
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

  updateIpRestrictionForSubAccountApiKey(
    params: UpdateIpRestrictionForSubApiKey,
  ): Promise<{
    status: string;
    ipList?: string[];
    updateTime: number;
    apiKey: string;
  }> {
    return this.postPrivate(
      'sapi/v2/broker/subAccountApi/ipRestriction',
      params,
    );
  }

  deleteIPRestrictionForSubAccountApiKey(params: {
    subAccountId: string;
    subAccountApiKey: string;
    ipAddress?: string;
  }): Promise<{
    subaccountId: string;
    apikey: string;
    ipList: string[];
    updateTime: number;
  }> {
    return this.deletePrivate(
      'sapi/v1/broker/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  deleteApiKeyBrokerSubAccount(
    params: DeleteApiKeyBrokerSubAccountParams,
  ): Promise<object> {
    return this.deletePrivate('sapi/v1/broker/subAccountApi', params);
  }

  getSubAccountBrokerIpRestriction(params: {
    subAccountId: string;
    subAccountApiKey: string;
  }): Promise<{
    subaccountId: string;
    ipRestrict: boolean;
    apikey: string;
    ipList: string[];
    updateTime: number;
  }> {
    return this.getPrivate(
      'sapi/v1/broker/subAccountApi/ipRestriction',
      params,
    );
  }

  getApiKeyBrokerSubAccount(
    params: GetApiKeyBrokerSubAccountParams,
  ): Promise<ApiKeyBrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccountApi', params);
  }

  getBrokerInfo(): Promise<GetBrokerInfoResponse> {
    return this.getPrivate('sapi/v1/broker/info');
  }

  updateSubAccountBNBBurn(params: {
    subAccountId: string;
    spotBNBBurn: 'true' | 'false';
  }): Promise<{
    subAccountId: string;
    spotBNBBurn: boolean;
  }> {
    return this.postPrivate('sapi/v1/broker/subAccount/bnbBurn/spot', params);
  }

  updateSubAccountMarginInterestBNBBurn(params: {
    subAccountId: string;
    interestBNBBurn: 'true' | 'false';
  }): Promise<{
    subAccountId: string;
    interestBNBBurn: boolean;
  }> {
    return this.postPrivate(
      'sapi/v1/broker/subAccount/bnbBurn/marginInterest',
      params,
    );
  }

  getSubAccountBNBBurnStatus(params: { subAccountId: string }): Promise<{
    subAccountId: string;
    spotBNBBurn: boolean;
    interestBNBBurn: boolean;
  }> {
    return this.getPrivate('sapi/v1/broker/subAccount/bnbBurn/status', params);
  }

  /**
   *
   * EXCHANGE LINK - Account Endpoints
   * https://developers.binance.com/docs/binance_link
   */

  transferBrokerSubAccount(
    params: TransferBrokerSubAccountParams,
  ): Promise<TransferBrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/transfer', params);
  }

  getBrokerSubAccountHistory(
    params: GetBrokerSubAccountHistoryParams,
  ): Promise<BrokerSubAccountHistory[]> {
    return this.getPrivate('sapi/v1/broker/transfer', params);
  }

  submitBrokerSubFuturesTransfer(params: {
    fromId?: string;
    toId?: string;
    futuresType: number; // 1: USDT Futures, 2: COIN Futures
    asset: string;
    amount: number;
    clientTranId?: string; // The max length is 32 characters
  }): Promise<{
    success: boolean;
    txnId: string;
    clientTranId?: string;
  }> {
    return this.postPrivate('sapi/v1/broker/transfer/futures', params);
  }

  getSubAccountFuturesTransferHistory(params: {
    subAccountId: string;
    futuresType: number; // 1: USDT Futures, 2: COIN Futures
    clientTranId?: string;
    startTime?: number;
    endTime?: number;
    page?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPrivate('sapi/v1/broker/transfer/futures', params);
  }

  getBrokerSubDepositHistory(
    params: GetSubAccountDepositHistoryParams,
  ): Promise<SubAccountDeposit[]> {
    return this.getPrivate('sapi/v1/broker/subAccount/depositHist', params);
  }

  getBrokerSubAccountSpotAssets(
    params: QuerySubAccountSpotMarginAssetInfoParams,
  ): Promise<{
    data: SubaccountBrokerSpotAsset[];
    timestamp: number;
  }> {
    return this.getPrivate('sapi/v1/broker/subAccount/spotSummary', params);
  }

  getSubAccountMarginAssetInfo(
    params: QuerySubAccountSpotMarginAssetInfoParams,
  ): Promise<{
    data: SubAccountBrokerMarginAsset[];
    timestamp: number;
  }> {
    return this.getPrivate('sapi/v1/broker/subAccount/marginSummary', params);
  }

  querySubAccountFuturesAssetInfo(
    params: QuerySubAccountFuturesAssetInfoParams,
  ): Promise<{
    data: (UsdtMarginedFuturesResponse | CoinMarginedFuturesResponse)[];
    timestamp: number;
  }> {
    return this.getPrivate('sapi/v3/broker/subAccount/futuresSummary', params);
  }

  universalTransferBroker(params: UniversalTransferBrokerParams): Promise<{
    txnId: number;
    clientTranId: string;
  }> {
    return this.postPrivate('sapi/v1/broker/universalTransfer', params);
  }

  getUniversalTransferBroker(
    params: GetUniversalTransferBrokerParams,
  ): Promise<BrokerUniversalTransfer[]> {
    return this.getPrivate('sapi/v1/broker/universalTransfer', params);
  }

  /**
   *
   * EXCHANGE LINK - Fee Endpoints
   * https://developers.binance.com/docs/binance_link
   */

  updateBrokerSubAccountCommission(
    params: ChangeSubAccountCommissionParams,
  ): Promise<ChangeSubAccountCommissionResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi/commission', params);
  }

  updateBrokerSubAccountFuturesCommission(
    params: ChangeSubAccountFuturesCommissionParams,
  ): Promise<ChangeSubAccountFuturesCommissionResponse> {
    return this.postPrivate(
      'sapi/v1/broker/subAccountApi/commission/futures',
      params,
    );
  }

  getBrokerSubAccountFuturesCommission(
    params: QuerySubAccountFuturesCommissionParams,
  ): Promise<BrokerSubAccountFuturesCommission[]> {
    return this.getPrivate(
      'sapi/v1/broker/subAccountApi/commission/futures',
      params,
    );
  }

  updateBrokerSubAccountCoinFuturesCommission(
    params: ChangeSubAccountCoinFuturesCommissionParams,
  ): Promise<ChangeSubAccountFuturesCommissionResponse> {
    return this.postPrivate(
      'sapi/v1/broker/subAccountApi/commission/coinFutures',
      params,
    );
  }

  getBrokerSubAccountCoinFuturesCommission(
    params: QuerySubAccountCoinFuturesCommissionParams,
  ): Promise<BrokerSubAccountCoinFuturesCommission[]> {
    return this.getPrivate(
      'sapi/v1/broker/subAccountApi/commission/coinFutures',
      params,
    );
  }

  getBrokerSpotCommissionRebate(
    params: QueryBrokerSpotCommissionRebateParams,
  ): Promise<BrokerCommissionRebate[]> {
    return this.getPrivate('sapi/v1/broker/rebate/recentRecord', params);
  }

  getBrokerFuturesCommissionRebate(
    params: QueryBrokerFuturesCommissionRebateParams,
  ): Promise<BrokerCommissionRebate[]> {
    return this.getPrivate(
      'sapi/v1/broker/rebate/futures/recentRecord',
      params,
    );
  }

  /**
   *
   * @deprecated
   */
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
   * Broker Endpoints - only on old docs
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead - https://developers.binance.com/docs/binance_link
   */

  /**
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead
   **/
  getBrokerIfNewSpotUser(): Promise<{
    rebateWorking: boolean;
    ifNewUser: boolean;
  }> {
    return this.getPrivate('sapi/v1/apiReferral/ifNewUser');
  }

  /**
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead
   **/
  getBrokerSubAccountDepositHistory(
    params?: GetBrokerSubAccountDepositHistoryParams,
  ): Promise<SubAccountDepositHistoryList[]> {
    return this.getPrivate('sapi/v1/bv1/apiReferral/ifNewUser', params);
  }

  /**
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead
   **/
  getBrokerUserCustomisedId(market: 'spot' | 'futures') {
    const prefix = market === 'spot' ? 'sapi' : 'fapi';
    return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
  }

  /**
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead
   **/
  enableFuturesBrokerSubAccount(
    params: EnableFuturesBrokerSubAccountParams,
  ): Promise<EnableFuturesBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  /**
   * @deprecated, found only in old docs
   * Use EXCHANGE LINK endpoints instead
   **/
  enableMarginApiKeyBrokerSubAccount(
    params: EnableMarginApiKeyBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount/margin', params);
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

  /**
   *
   * User Data Stream Endpoints
   *
   **/

  // spot
  getSpotUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('api/v3/userDataStream');
  }

  keepAliveSpotUserDataListenKey(listenKey: string): Promise<object> {
    return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  closeSpotUserDataListenKey(listenKey: string): Promise<object> {
    return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  // margin
  getMarginUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('sapi/v1/userDataStream');
  }

  keepAliveMarginUserDataListenKey(listenKey: string): Promise<object> {
    return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  closeMarginUserDataListenKey(listenKey: string): Promise<object> {
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
  }): Promise<object> {
    return this.put(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  closeIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<object> {
    return this.delete(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  /**
   *
   * DEPRECATED ENDPOINTS
   *
   **/
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
    return this.getPrivate('sapi/v1/lending/daily/userLeftQuota', params);
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
    return this.getPrivate('sapi/v1/lending/daily/userRedemptionQuota', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  purchaseFixedAndActivityProject(params: {
    projectId: string;
    lot: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate('sapi/v1/lending/customizedFixed/purchase', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getFixedAndActivityProjects(
    params: FixedAndActivityProjectParams,
  ): Promise<any[]> {
    return this.getPrivate('sapi/v1/lending/project/list', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getFixedAndActivityProductPosition(
    params: FixedAndActivityProjectPositionParams,
  ): Promise<any[]> {
    return this.getPrivate('sapi/v1/lending/project/position/list', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getLendingAccount(): Promise<StakingProduct[]> {
    return this.getPrivate('sapi/v1/lending/union/account');
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getPurchaseRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate('sapi/v1/lending/union/purchaseRecord', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getRedemptionRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate('sapi/v1/lending/union/redemptionRecord', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  getInterestHistory(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate('sapi/v1/lending/union/interestHistory', params);
  }

  /**
   * @deprecated as of 2023-06-22, now Simple Earn
   */
  changeFixedAndActivityPositionToDailyPosition(params: {
    projectId: string;
    lot: number;
    positionId?: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate('sapi/v1/lending/positionChanged', params);
  }

  /**
   *
   * Wallet Endpoints
   * @deprecated
   **/

  /**
   * @deprecated
   */
  enableConvertSubAccount(params: EnableConvertSubAccountParams): Promise<any> {
    return this.postPrivate('sapi/v1/broker/subAccount/convert', params);
  }

  /**
   * @deprecated - deleted as of 2024-11-21
   *
   */
  convertBUSD(params: ConvertTransfer): Promise<ConvertTransferResponse> {
    return this.postPrivate('sapi/v1/asset/convert-transfer', params);
  }

  /**
   * @deprecated
   */
  getConvertBUSDHistory(params: GetConvertBUSDHistoryParams): Promise<{
    total: number;
    rows: BUSDConversionRecord[];
  }> {
    return this.getPrivate(
      'sapi/v1/asset/convert-transfer/queryByPage',
      params,
    );
  }
}

/**
 * @deprecated use MainClient instead of SpotClient (it is the same)
 */
export const SpotClient = MainClient;
