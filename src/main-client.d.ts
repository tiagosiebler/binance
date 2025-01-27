import { AxiosRequestConfig } from 'axios';
import { BasicAssetPaginatedParams, BasicAssetParam, BasicSymbolParam, BinanceBaseUrlKey, CancelOCOParams, CancelOrderParams, CoinStartEndLimit, ExchangeSymbol, GetAllOrdersParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, NewOCOParams, NewOrderListParams, OrderBookParams, OrderResponseType, OrderType, RecentTradesParams, RowsWithTotal, SymbolArrayParam, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import { AcceptQuoteRequestParams, AccountInfo, AccountInformation, AddBSwapLiquidityParams, AddIpRestriction, AdjustCryptoLoanLTVParams, AdjustCryptoLoanLTVResponse, AdjustFlexibleCryptoLoanLTVParams, AdjustFlexibleCryptoLoanLTVResponse, AggregateTrade, AlgoOrder, AllCoinsInformationResponse, AllocationsParams, ApiKeyBrokerSubAccount, APIPermissions, APITradingStatus, ApplicationStatus, AssetDetail, BasicFromPaginatedParams, BasicFuturesSubAccountParams, BasicMarginAssetParams, BasicSubAccount, BasicTimeRangeParam, BethRewardsHistory, BlvtRedemptionRecord, BlvtSubscriptionRecord, BlvtUserLimitInfo, BNBBurnResponse, BnbTransferParams, BnsolRateHistoryRecord, BnsolRewardHistoryRecord, BorrowCryptoLoanParams, BorrowCryptoLoanResponse, BorrowFlexibleLoanParams, BorrowFlexibleLoanResponse, BorrowInterestRate, BrokerCommissionRebate, BrokerSubAccount, BrokerSubAccountCoinFuturesCommission, BrokerSubAccountFuturesCommission, BrokerSubAccountHistory, BrokerUniversalTransfer, BSwapLiquidity, BSwapOperations, BSwapOperationsParams, BUSDConversionRecord, CancelAlgoOrderResponse, CancelHashrateResaleConfigParams, CancelOrderListResult, CancelSpotAlgoOrderResponse, CancelSpotOrderResult, ChangeAutoCompoundStatusParams, ChangeAutoCompoundStatusResponse, ChangePermissionApiKeyBrokerSubAccountParams, ChangePermissionApiKeyBrokerSubAccountResponse, ChangePlanStatusParams, ChangePlanStatusResponse, ChangeSubAccountCoinFuturesCommissionParams, ChangeSubAccountCommissionParams, ChangeSubAccountCommissionResponse, ChangeSubAccountFuturesCommissionParams, ChangeSubAccountFuturesCommissionResponse, CheckCollateralRepayRateParams, CheckCollateralRepayRateResponse, CheckDualInvestmentAccountsResponse, CheckVipCollateralAccountParams, CloudMining, CloudMiningHistoryParams, CoinMarginedFuturesResponse, Collateral, CollateralAssetData, CollateralRecord, CommissionRates, ConvertDustParams, ConvertibleCoinsParams, ConvertibleCoinsResponse, ConvertLimitOpenOrder, ConvertQuoteRequestParams, ConvertTransfer, ConvertTransferResponse, CreateApiKeyBrokerSubAccountParams, CreateApiKeyBrokerSubAccountResponse, CreateBrokerSubAccountParams, CreateDualTokenGiftCardParams, CreateGiftCardParams, CreateInvestmentPlanParams, CreateInvestmentPlanResponse, CreateSpecialLowLatencyKeyParams, CreateSubAccountParams, CrossMarginFeeData, CrossMarginTransferHistory, CurrentAvgPrice, CustomizeMarginCall, CustomizeMarginCallParams, DailyAccountSnapshot, DailyAccountSnapshotParams, DailyChangeStatistic, DelegationHistory, DelegationHistoryParams, DeleteApiKeyBrokerSubAccountParams, DelistScheduleResponse, DepositAddress, DepositAddressListParams, DepositAddressParams, DepositAddressResponse, DepositHistory, DepositHistoryParams, DualInvestmentPosition, DualInvestmentProduct, DustConversion, DustInfo, DustLog, EditInvestmentPlanParams, EditInvestmentPlanResponse, EnableConvertSubAccountParams, EnableFuturesBrokerSubAccountParams, EnableFuturesBrokerSubAccountResponse, EnableMarginApiKeyBrokerSubAccountParams, EnableMarginBrokerSubAccountParams, EnableMarginBrokerSubAccountResponse, EnableOptionsForSubAccountResponse, EnableOrDisableIPRestrictionForSubAccountParams, EnableUniversalTransferApiKeyBrokerSubAccountParams, EnableUniversalTransferApiKeyBrokerSubAccountResponse, ETHRateHistory, EthRedemptionHistory, EthStakingHistory, ExchangeInfo, ExchangeInfoParams, FixedAndActivityProjectParams, FixedAndActivityProjectPositionParams, FlexibleCryptoLoanBorrowHistory, FlexibleLoanAssetData, FlexibleLoanCollateralAssetData, FlexibleLoanLTVAdjustmentHistory, FlexibleLoanOngoingOrder, FlexibleRedemptionRecord, FlexibleRewardsHistory, FlexibleSubscriptionPreview, ForceLiquidationRecord, FundingAsset, FutureAccountTransfer, FuturesPositionRisk, GetAlgoHistoricalOrdersParams, GetAlgoSubOrdersParams, GetAlgoSubOrdersResponse, GetAllConvertPairsParams, GetApiKeyBrokerSubAccountParams, GetApplicationStatusParams, GetAssetParams, GetBethRewardsHistoryParams, GetBlvtRedemptionRecordParams, GetBlvtSubscriptionRecordParams, GetBnsolRateHistoryReq, GetBnsolRewardsHistoryReq, GetBrokerInfoResponse, GetBrokerSubAccountDepositHistoryParams, GetBrokerSubAccountHistoryParams, GetBrokerSubAccountParams, GetC2CTradeHistoryParams, GetC2CTradeHistoryResponse, GetCollateralAssetDataParams, GetCollateralRecordParams, GetConvertBUSDHistoryParams, GetConvertTradeHistoryParams, GetCrossMarginTransferHistoryParams, GetCryptoLoansIncomeHistoryParams, GetCryptoLoansIncomeHistoryResponse, GetDualInvestmentPositionsParams, GetDualInvestmentProductListParams, GetEarningsListParams, GetEarningsListResponse, GetETHRateHistoryParams, GetEthRedemptionHistoryParams, GetEthStakingAccountResponse, GetEthStakingAccountV2Response, GetEthStakingHistoryParams, GetEthStakingQuotaResponse, GetExtraBonusListParams, GetExtraBonusListResponse, GetFiatOrderHistoryParams, GetFiatOrderHistoryResponse, GetFiatPaymentsHistoryResponse, GetFlexibleCryptoLoanBorrowHistoryParams, GetFlexibleLoanLTVAdjustmentHistoryParams, GetFlexibleLoanOngoingOrdersParams, GetFlexibleRedemptionRecordParams, GetFlexibleRewardsHistoryParams, GetFlexibleSubscriptionPreviewParams, GetFlexibleSubscriptionRecordParams, GetFlexibleSubscriptionRecordResponse, GetForceLiquidationRecordParams, GetFutureAccountTransferHistoryParams, GetFuturesLeadTraderStatusResponse, GetFuturesLeadTradingSymbolWhitelistResponse, GetFutureTickLevelOrderbookDataLinkParams, GetHashrateResaleDetailParams, GetHashrateResaleDetailResponse, GetHashrateResaleListParams, GetHashrateResaleListResponse, GetIndexDetailsResponse, GetIndexLinkedPlanPositionDetailsResponse, GetIndexLinkedPlanRebalanceHistoryParams, GetIndexLinkedPlanRedemptionHistoryParams, GetLoanableAssetsDataParams, GetLoanBorrowHistoryParams, GetLoanCoinPaginatedHistoryParams, GetLoanLTVAdjustmentHistoryParams, GetLoanOngoingOrdersParams, GetLoanRepaymentHistoryParams, GetLockedRedemptionRecordParams, GetLockedRewardsHistory, GetLockedRewardsHistoryParams, GetLockedSubscriptionPreviewParams, GetLockedSubscriptionRecordParams, GetMarginAccountBorrowRepayRecordsParams, GetMarginCapitalFlowParams, GetMarginInterestHistoryParams, GetMarginOrderCountUsageParams, GetMinerDetailsParams, GetMinerDetailsResponse, GetMinerListParams, GetMinerListResponse, GetMiningAccountEarningParams, GetMiningAccountEarningResponse, getMiningAccountsListParams, getMiningAccountsListResponse, GetMiningAlgoListResponse, GetMiningCoinListResponse, GetNextHourlyInterestRateParams, GetNftAssetParams, GetNftDepositHistoryParams, GetNftTransactionHistoryParams, GetNftWithdrawHistoryParams, GetOCOParams, GetOneTimeTransactionStatusParams, GetOneTimeTransactionStatusResponse, GetOrderStatusParams, GetPayTradeHistoryParams, GetPlanDetailsParams, GetPortfolioMarginAssetIndexPriceResponse, GetPortfolioMarginAssetLeverageResponse, GetPortfolioMarginProAccountInfoResponse, GetPortfolioMarginProBankruptcyLoanAmountResponse, GetPortfolioMarginProCollateralRateResponse, GetPortfolioMarginProInterestHistoryParams, GetPortfolioMarginProInterestHistoryResponse, GetRateHistory, GetRateHistoryParams, GetSmallLiabilityExchangeHistoryParams, GetSolStakingHistoryReq, GetSourceAssetListParams, GetSourceAssetListResponse, GetSpotAlgoHistoricalOrdersParams, GetSpotAlgoSubOrdersParams, GetSpotAlgoSubOrdersResponse, GetSpotRebateHistoryRecordsParams, GetSpotRebateHistoryRecordsResponse, GetStatisticListParams, GetStatisticListResponse, GetSubAccountDepositHistoryParams, GetSubscriptionTransactionHistoryParams, GetTargetAssetListParams, GetTargetAssetListResponse, GetTargetAssetROIParams, GetUniversalTransferBrokerParams, GetVipLoanOngoingOrdersParams, GetVipLoanRepaymentHistoryParams, GetWbethRewardsHistoryResponse, GetWrapHistoryParams, HistoricalAlgoOrder, HistoricalDataLink, HistoricalSpotAlgoOrder, IndexLinkedPlanRedemptionRecord, IsolatedMarginAccountInfo, IsolatedMarginAccountTransferParams, IsolatedMarginFeeData, IsolatedMarginSymbol, IsolatedMarginTierData, LeftDailyPurchaseQuotaFlexibleProductResponse, LiabilityCoinLeverageBracket, LoanableAssetData, LoanBorrowHistory, LoanLTVAdjustmentHistory, LoanOngoingOrder, LoanRepaymentHistory, LockedRedemptionRecord, LockedSubscriptionPreview, LockedSubscriptionRecord, ManagedSubAccountDepositAddress, ManagedSubAccountDepositAddressParams, ManagedSubAccountFuturesAssetsResponse, ManagedSubAccountListParams, ManagedSubAccountMarginAssetsResponse, ManagedSubAccountSnapshot, ManagedSubAccountSnapshotParams, ManagedSubAccountTransferLogParams, ManagedSubAccountTransferTTLogParams, ManagerSubTransferHistoryVos, ManagerSubUserInfoVo, ManualLiquidationParams, ManualLiquidationResponse, MarginAccountLoanParams, MarginAccountRecord, MarginAvailableInventoryResponse, MarginCapitalFlow, MarginDelistSchedule, MarginInterestHistory, MarginInterestRateHistory, MarginOrderCountUsageResponse, MarginOTOCOOrder, MarginOTOOrder, MarginTransactionResponse, NewFutureAccountTransferParams, NewOrderListOTOCOParams, NewOrderListOTOCOResponse, NewOrderListOTOParams, NewOrderListOTOResponse, NewSpotOrderParams, NewSpotSOROrderParams, NextHourlyInterestRate, NftAsset, NftDeposit, NftTransaction, NftWithdraw, OrderBookResponse, OrderList, OrderListResponse, OrderRateLimitUsage, OrderResponseTypeFor, PortfolioMarginProAccountBalance, PortfolioMarginProSpanAccountInfo, PreventedMatch, PreventedMatchesParams, PurchaseFlexibleProductResponse, PurchaseRecordParams, QueryBrokerFuturesCommissionRebateParams, QueryBrokerSpotCommissionRebateParams, QueryCrossMarginAccountDetailsParams, QueryCrossMarginFeeDataParams, QueryCrossMarginPairResponse, QueryIsolatedMarginTierDataParams, QueryMarginAccountAllOCOParams, QueryMarginAccountTradeListParams, QueryMarginAssetResponse, QueryMarginInterestRateHistoryParams, QueryMarginPriceIndexResponse, QueryMarginRecordParams, QueryMaxBorrowResponse, QueryMaxTransferOutAmountResponse, QuerySubAccountCoinFuturesCommissionParams, QuerySubAccountFuturesAssetInfoParams, QuerySubAccountFuturesCommissionParams, QuerySubAccountSpotMarginAssetInfoParams, RawAccountTrade, RawTrade, RedeemBlvtParams, RedeemBlvtResponse, RedeemEthParams, RedeemEthResponse, RedeemGiftCardParams, RedeemSolResponse, RemoveBSwapLiquidityParams, RepayCryptoFlexibleLoanParams, RepayCryptoFlexibleLoanResponse, RepayCryptoLoanParams, RepayCryptoLoanResponse, ReplaceSpotOrderParams, ReplaceSpotOrderResultSuccess, RollingWindowTickerParams, SetAutoSubscribeParams, SimpleEarnAccountResponse, SimpleEarnFlexibleProduct, SimpleEarnFlexibleProductPositionParams, SimpleEarnLockedProduct, SimpleEarnLockedProductPosition, SimpleEarnLockedProductPositionParams, SimpleEarnProductListParams, SimpleEarnRedeemFlexibleProductParams, SimpleEarnRedeemResponse, SimpleEarnSubscribeFlexibleProductResponse, SimpleEarnSubscribeLockedProductResponse, SimpleEarnSubscribeProductParams, SmallLiabilityExchangeCoin, SmallLiabilityExchangeHistory, SolRedemptionHistoryRecord, SolStakingAccount, SolStakingHistoryRecord, SolStakingQuota, SOROrderResponseFull, SORTestOrderResponse, SpecialLowLatencyKeyInfo, SpecialLowLatencyKeyResponse, SpotAlgoOrder, SpotOrder, StakingBasicParams, StakingHistory, StakingHistoryParams, StakingPersonalLeftQuota, StakingProduct, StakingProductPosition, StakingProductType, SubAccountAddOrDeleteIPList, SubAccountAssetDetails, SubAccountAssets, SubAccountAssetsParams, SubaccountBalances, SubAccountBrokerMarginAsset, SubaccountBrokerSpotAsset, SubAccountCOINMDetail, SubAccountCOINMPositionRisk, SubAccountCOINMSummary, SubAccountDeposit, SubAccountDepositAddress, SubAccountDepositAddressParams, SubAccountDepositHistoryList, SubAccountDepositHistoryParams, SubAccountEnableFutures, SubAccountEnableLeverageToken, SubAccountEnableMargin, SubAccountEnableOrDisableIPRestriction, SubAccountFuturesAccountDetail, SubAccountFuturesAccountSummary, SubAccountFuturesAssetTransfer, SubAccountFuturesAssetTransferHistory, SubAccountFuturesAssetTransferHistoryParams, SubAccountFuturesAssetTransferParams, SubAccountListParams, SubAccountListResponse, SubAccountMarginAccountDetail, SubAccountsMarginAccountSummary, SubAccountSpotAssetsSummary, SubAccountSpotAssetsSummaryParams, SubAccountSpotAssetTransferHistory, SubAccountSpotAssetTransferHistoryParams, SubAccountStatus, SubAccountSummaryOnFuturesAccountV2Params, SubAccountTransactionStatistics, SubAccountTransfer, SubAccountTransferHistory, SubAccountTransferHistoryParams, SubAccountTransferParams, SubAccountTransferToMasterParams, SubAccountTransferToSameMasterParams, SubAccountUniversalTransfer, SubAccountUniversalTransferHistoryParams, SubAccountUniversalTransferHistoryResponse, SubAccountUniversalTransferParams, SubAccountUSDMDetail, SubAccountUSDMPositionRisk, SubAccountUSDMSummary, SubmitConvertLimitOrderParams, SubmitDepositCreditParams, SubmitDepositCreditResponse, SubmitHashrateResaleParams, SubmitIndexLinkedPlanRedemptionParams, SubmitMarginOTOCOOrderParams, SubmitMarginOTOOrderParams, SubmitOneTimeTransactionParams, SubmitOneTimeTransactionResponse, SubmitSpotTwapNewOrderParams, SubmitSpotTwapNewOrderResponse, SubmitTwapNewOrderParams, SubmitTwapNewOrderResponse, SubmitVpNewOrderParams, SubmitVpNewOrderResponse, SubscribeBlvtParams, SubscribeBlvtResponse, SubscribeDualInvestmentProductParams, SubscribeDualInvestmentProductResponse, SubscribeEthStakingV2Response, SubscribeSolStakingResponse, SymbolOrderBookTicker, SymbolTradeFee, SystemStatusResponse, TargetAssetROI, ToggleBNBBurnParams, TradingDayTickerFull, TradingDayTickerMini, TradingDayTickerParams, TransferBrokerSubAccount, TransferBrokerSubAccountParams, UniversalTransferBrokerParams, UniversalTransferHistoryParams, UniversalTransferParams, UpdateIpRestrictionForSubApiKey, UsdtMarginedFuturesResponse, UserAsset, VipCollateralAccount, VipLoanAccruedInterestParams, VipLoanAccruedInterestRecord, VipLoanBorrowParams, VipLoanBorrowResponse, VipLoanInterestRateHistoryParams, VipLoanInterestRateRecord, VipLoanRenewParams, VipLoanRenewResponse, VipLoanRepaymentHistory, VipLoanRepayParams, VipLoanRepayResponse, VipOngoingOrder, VirtualSubAccount, WalletBalance, WithdrawAddress, WithdrawAssetsFromManagedSubAccountParams, WithdrawHistory, WithdrawHistoryParams, WithdrawParams, WrapBethResponse, WrapHistory } from './types/spot';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class MainClient extends BaseRestClient {
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig);
    fetchLatencySummary(): Promise<any>;
    getServerTime(baseUrlKeyOverride?: BinanceBaseUrlKey): Promise<number>;
    testConnectivity(): Promise<object>;
    getExchangeInfo(params?: ExchangeInfoParams): Promise<ExchangeInfo>;
    getOrderBook(params: OrderBookParams): Promise<OrderBookResponse>;
    getRecentTrades(params: RecentTradesParams): Promise<RawTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateTrade[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getUIKlines(params: KlinesParams): Promise<Kline[]>;
    getAvgPrice(params: BasicSymbolParam): Promise<CurrentAvgPrice>;
    get24hrChangeStatististics(params: BasicSymbolParam): Promise<DailyChangeStatistic>;
    get24hrChangeStatististics(params?: SymbolArrayParam): Promise<DailyChangeStatistic[]>;
    getTradingDayTicker(params: TradingDayTickerParams): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]>;
    getSymbolPriceTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolOrderBookTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]>;
    getRollingWindowTicker(params: RollingWindowTickerParams): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]>;
    submitNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>>;
    testNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<object>;
    getOrder(params: GetOrderParams): Promise<SpotOrder>;
    cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult>;
    cancelAllSymbolOrders(params: BasicSymbolParam): Promise<CancelSpotOrderResult[]>;
    replaceOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: ReplaceSpotOrderParams<T, RT>): Promise<ReplaceSpotOrderResultSuccess<T, RT>>;
    getOpenOrders(params?: Partial<BasicSymbolParam>): Promise<SpotOrder[]>;
    getAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]>;
    submitNewOCO(params: NewOCOParams): Promise<any>;
    submitNewOrderList<T extends OrderResponseType>(params: NewOrderListParams<T>): Promise<OrderListResponse<T>>;
    submitNewOrderListOTO(params: NewOrderListOTOParams): Promise<NewOrderListOTOResponse>;
    submitNewOrderListOTOCO(params: NewOrderListOTOCOParams): Promise<NewOrderListOTOCOResponse>;
    cancelOCO(params: CancelOCOParams): Promise<CancelOrderListResult>;
    getOCO(params?: GetOCOParams): Promise<OrderList>;
    getAllOCO(params?: BasicFromPaginatedParams): Promise<OrderList[]>;
    getAllOpenOCO(): Promise<OrderList[]>;
    submitNewSOROrder(params: NewSpotSOROrderParams): Promise<SOROrderResponseFull>;
    testNewSOROrder(params: NewSpotSOROrderParams & {
        computeCommissionRates?: boolean;
    }): Promise<object | SORTestOrderResponse>;
    getAccountInformation(): Promise<AccountInformation>;
    getAccountTradeList(params: SymbolFromPaginatedRequestFromId & {
        orderId?: number;
    }): Promise<RawAccountTrade[]>;
    getOrderRateLimit(): Promise<OrderRateLimitUsage[]>;
    getPreventedMatches(params: PreventedMatchesParams): Promise<PreventedMatch[]>;
    getAllocations(params: AllocationsParams): Promise<any>;
    getCommissionRates(params: {
        symbol: string;
    }): Promise<CommissionRates>;
    getCrossMarginCollateralRatio(): Promise<{
        collaterals: Collateral[];
        assetNames: string[];
    }[]>;
    getAllCrossMarginPairs(): Promise<QueryCrossMarginPairResponse[]>;
    getIsolatedMarginAllSymbols(params?: {
        symbol?: string;
    }): Promise<IsolatedMarginSymbol[]>;
    getAllMarginAssets(): Promise<QueryMarginAssetResponse[]>;
    getMarginDelistSchedule(): Promise<MarginDelistSchedule[]>;
    getIsolatedMarginTierData(params: QueryIsolatedMarginTierDataParams): Promise<IsolatedMarginTierData[]>;
    queryMarginPriceIndex(params: BasicSymbolParam): Promise<QueryMarginPriceIndexResponse>;
    getMarginAvailableInventory(params: {
        type: string;
    }): Promise<MarginAvailableInventoryResponse>;
    getLeverageBracket(): Promise<LiabilityCoinLeverageBracket[]>;
    getNextHourlyInterestRate(params: GetNextHourlyInterestRateParams): Promise<NextHourlyInterestRate[]>;
    getMarginInterestHistory(params: GetMarginInterestHistoryParams): Promise<{
        rows: MarginInterestHistory[];
        total: number;
    }>;
    submitMarginAccountBorrowRepay(params: MarginAccountLoanParams): Promise<MarginTransactionResponse>;
    getMarginAccountBorrowRepayRecords(params: GetMarginAccountBorrowRepayRecordsParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    getMarginInterestRateHistory(params: QueryMarginInterestRateHistoryParams): Promise<MarginInterestRateHistory[]>;
    queryMaxBorrow(params: BasicMarginAssetParams): Promise<QueryMaxBorrowResponse>;
    getMarginForceLiquidationRecord(params: GetForceLiquidationRecordParams): Promise<{
        rows: ForceLiquidationRecord[];
        total: number;
    }>;
    getSmallLiabilityExchangeCoins(): Promise<SmallLiabilityExchangeCoin[]>;
    getSmallLiabilityExchangeHistory(params: GetSmallLiabilityExchangeHistoryParams): Promise<{
        total: number;
        rows: SmallLiabilityExchangeHistory[];
    }>;
    marginAccountCancelOpenOrders(params: BasicSymbolParam): Promise<CancelSpotOrderResult[]>;
    marginAccountCancelOCO(params: CancelOCOParams): Promise<any>;
    marginAccountCancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult>;
    marginAccountNewOCO(params: NewOCOParams): Promise<any>;
    marginAccountNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>>;
    getMarginOrderCountUsage(params: GetMarginOrderCountUsageParams): Promise<MarginOrderCountUsageResponse[]>;
    queryMarginAccountAllOCO(params: QueryMarginAccountAllOCOParams): Promise<any>;
    queryMarginAccountAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]>;
    queryMarginAccountOCO(params: GetOCOParams): Promise<any>;
    queryMarginAccountOpenOCO(params: {
        isIsolated?: 'TRUE' | 'FALSE';
        symbol?: string;
    }): Promise<any>;
    queryMarginAccountOpenOrders(params: BasicSymbolParam): Promise<SpotOrder[]>;
    queryMarginAccountOrder(params: GetOrderParams): Promise<SpotOrder>;
    queryMarginAccountTradeList(params: QueryMarginAccountTradeListParams): Promise<any>;
    submitSmallLiabilityExchange(params: {
        assetNames: string[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    submitManualLiquidation(params: ManualLiquidationParams): Promise<ManualLiquidationResponse[]>;
    submitMarginOTOOrder(params: SubmitMarginOTOOrderParams): Promise<MarginOTOOrder>;
    submitMarginOTOCOOrder(params: SubmitMarginOTOCOOrderParams): Promise<MarginOTOCOOrder>;
    createMarginSpecialLowLatencyKey(params: CreateSpecialLowLatencyKeyParams): Promise<SpecialLowLatencyKeyResponse>;
    deleteMarginSpecialLowLatencyKey(params?: {
        apiKey?: string;
        apiName?: string;
        symbol?: string;
    }): Promise<any>;
    updateMarginIPForSpecialLowLatencyKey(params: {
        apiKey: string;
        symbol?: string;
        ip: string;
    }): Promise<object>;
    getMarginSpecialLowLatencyKeys(params: {
        symbol?: string;
    }): Promise<SpecialLowLatencyKeyInfo[]>;
    getMarginSpecialLowLatencyKey(params: {
        apiKey: string;
        symbol?: string;
    }): Promise<SpecialLowLatencyKeyInfo>;
    getCrossMarginTransferHistory(params: GetCrossMarginTransferHistoryParams): Promise<RowsWithTotal<CrossMarginTransferHistory>>;
    queryMaxTransferOutAmount(params: BasicMarginAssetParams): Promise<QueryMaxTransferOutAmountResponse>;
    updateCrossMarginMaxLeverage(params: {
        maxLeverage: number;
    }): Promise<{
        success: boolean;
    }>;
    disableIsolatedMarginAccount(params: {
        symbol: string;
    }): Promise<{
        success: boolean;
        symbol: string;
    }>;
    enableIsolatedMarginAccount(params: {
        symbols: string;
    }): Promise<{
        success: boolean;
        symbol: string;
    }>;
    getBNBBurn(): Promise<BNBBurnResponse>;
    getMarginSummary(): Promise<any>;
    queryCrossMarginAccountDetails(): Promise<QueryCrossMarginAccountDetailsParams>;
    getCrossMarginFeeData(params: QueryCrossMarginFeeDataParams): Promise<CrossMarginFeeData[]>;
    getIsolatedMarginAccountLimit(): Promise<{
        enabledAccount: number;
        maxAccount: number;
    }>;
    getIsolatedMarginAccountInfo(params?: {
        symbols?: string;
    }): Promise<IsolatedMarginAccountInfo>;
    getIsolatedMarginFeeData(params: QueryCrossMarginFeeDataParams): Promise<IsolatedMarginFeeData[]>;
    toggleBNBBurn(params: ToggleBNBBurnParams): Promise<BNBBurnResponse>;
    getMarginCapitalFlow(params: GetMarginCapitalFlowParams): Promise<MarginCapitalFlow[]>;
    queryLoanRecord(params: QueryMarginRecordParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    queryRepayRecord(params: QueryMarginRecordParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    isolatedMarginAccountTransfer(params: IsolatedMarginAccountTransferParams): Promise<MarginTransactionResponse>;
    getBalances(): Promise<AllCoinsInformationResponse[]>;
    withdraw(params: WithdrawParams): Promise<{
        id: string;
    }>;
    getWithdrawHistory(params?: WithdrawHistoryParams): Promise<WithdrawHistory[]>;
    getWithdrawAddresses(): Promise<WithdrawAddress[]>;
    getDepositHistory(params?: DepositHistoryParams): Promise<DepositHistory[]>;
    getDepositAddress(params: DepositAddressParams): Promise<DepositAddressResponse>;
    getDepositAddresses(params: DepositAddressListParams): Promise<DepositAddress[]>;
    submitDepositCredit(params: SubmitDepositCreditParams): Promise<SubmitDepositCreditResponse>;
    getAutoConvertStablecoins(): Promise<ConvertibleCoinsResponse>;
    setConvertibleCoins(params: ConvertibleCoinsParams): Promise<void>;
    getAssetDetail(params?: Partial<BasicAssetParam>): Promise<Record<ExchangeSymbol, AssetDetail>>;
    getWalletBalances(): Promise<WalletBalance[]>;
    getUserAsset(params: GetAssetParams): Promise<UserAsset[]>;
    submitUniversalTransfer(params: UniversalTransferParams): Promise<{
        tranId: number;
    }>;
    getUniversalTransferHistory(params: UniversalTransferHistoryParams): Promise<any>;
    getDust(): Promise<DustInfo>;
    convertDustToBnb(params: ConvertDustParams): Promise<DustConversion>;
    getDustLog(params?: BasicTimeRangeParam): Promise<DustLog>;
    getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any>;
    getTradeFee(params?: Partial<BasicSymbolParam>): Promise<SymbolTradeFee[]>;
    getFundingAsset(params: GetAssetParams): Promise<FundingAsset[]>;
    getCloudMiningHistory(params: CloudMiningHistoryParams): Promise<{
        total: number;
        rows: CloudMining[];
    }>;
    getDelegationHistory(params: DelegationHistoryParams): Promise<RowsWithTotal<DelegationHistory>>;
    submitNewFutureAccountTransfer(params: NewFutureAccountTransferParams): Promise<{
        tranId: number;
    }>;
    getFutureAccountTransferHistory(params: GetFutureAccountTransferHistoryParams): Promise<RowsWithTotal<FutureAccountTransfer>>;
    getCrossCollateralBorrowHistory(params?: CoinStartEndLimit): Promise<any>;
    getCrossCollateralRepaymentHistory(params?: CoinStartEndLimit): Promise<any>;
    getCrossCollateralWalletV2(): Promise<any>;
    getAdjustCrossCollateralLTVHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    getCrossCollateralLiquidationHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    getCrossCollateralInterestHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    getAccountInfo(): Promise<AccountInfo>;
    getDailyAccountSnapshot(params: DailyAccountSnapshotParams): Promise<DailyAccountSnapshot>;
    disableFastWithdrawSwitch(): Promise<object>;
    enableFastWithdrawSwitch(): Promise<object>;
    getAccountStatus(): Promise<{
        data: string;
    }>;
    getApiTradingStatus(): Promise<APITradingStatus>;
    getApiKeyPermissions(): Promise<APIPermissions>;
    getSystemStatus(): Promise<SystemStatusResponse>;
    getDelistSchedule(): Promise<DelistScheduleResponse[]>;
    createVirtualSubAccount(params: CreateSubAccountParams): Promise<VirtualSubAccount>;
    getSubAccountList(params?: SubAccountListParams): Promise<SubAccountListResponse>;
    subAccountEnableFutures(email: string): Promise<SubAccountEnableFutures>;
    subAccountEnableMargin(email: string): Promise<SubAccountEnableMargin>;
    enableOptionsForSubAccount(params: {
        email: string;
    }): Promise<EnableOptionsForSubAccountResponse>;
    subAccountEnableLeverageToken(params: SubAccountEnableLeverageToken): Promise<SubAccountEnableLeverageToken>;
    getSubAccountStatusOnMarginOrFutures(params?: {
        email?: string;
    }): Promise<SubAccountStatus[]>;
    getSubAccountFuturesPositionRisk(email: string): Promise<FuturesPositionRisk[]>;
    getSubAccountFuturesPositionRiskV2(params: BasicFuturesSubAccountParams): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk>;
    getSubAccountTransactionStatistics(params: {
        email: string;
    }): Promise<SubAccountTransactionStatistics>;
    getSubAccountIPRestriction(params: BasicSubAccount): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountDeleteIPList(params: SubAccountAddOrDeleteIPList): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountAddIPRestriction(params: AddIpRestriction): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountAddIPList(params: SubAccountEnableOrDisableIPRestriction): Promise<SubAccountAddOrDeleteIPList>;
    subAccountEnableOrDisableIPRestriction(params: EnableOrDisableIPRestrictionForSubAccountParams): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountFuturesTransfer(params: SubAccountTransferParams): Promise<SubAccountTransfer>;
    getSubAccountFuturesAccountDetail(email: string): Promise<SubAccountFuturesAccountDetail>;
    getSubAccountDetailOnFuturesAccountV2(params: BasicFuturesSubAccountParams): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail>;
    getSubAccountDetailOnMarginAccount(email: string): Promise<SubAccountMarginAccountDetail>;
    getSubAccountDepositAddress(params: SubAccountDepositAddressParams): Promise<SubAccountDepositAddress>;
    getSubAccountDepositHistory(params: SubAccountDepositHistoryParams): Promise<DepositHistory[]>;
    getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary>;
    getSubAccountSummaryOnFuturesAccountV2(params: SubAccountSummaryOnFuturesAccountV2Params): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary>;
    getSubAccountsSummaryOfMarginAccount(): Promise<SubAccountsMarginAccountSummary>;
    subAccountMarginTransfer(params: SubAccountTransferParams): Promise<SubAccountTransfer>;
    getSubAccountAssets(params: SubAccountAssetsParams): Promise<SubAccountAssets>;
    getSubAccountAssetsMaster(params: {
        email: string;
    }): Promise<{
        balances: SubaccountBalances[];
    }>;
    getSubAccountFuturesAssetTransferHistory(params: SubAccountFuturesAssetTransferHistoryParams): Promise<SubAccountFuturesAssetTransferHistory>;
    getSubAccountSpotAssetTransferHistory(params?: SubAccountSpotAssetTransferHistoryParams): Promise<SubAccountSpotAssetTransferHistory>;
    getSubAccountSpotAssetsSummary(params?: SubAccountSpotAssetsSummaryParams): Promise<SubAccountSpotAssetsSummary>;
    getSubAccountUniversalTransferHistory(params?: SubAccountUniversalTransferHistoryParams): Promise<SubAccountUniversalTransferHistoryResponse>;
    subAccountFuturesAssetTransfer(params: SubAccountFuturesAssetTransferParams): Promise<SubAccountFuturesAssetTransfer>;
    subAccountTransferHistory(params?: SubAccountTransferHistoryParams): Promise<SubAccountTransferHistory[]>;
    subAccountTransferToMaster(params: SubAccountTransferToMasterParams): Promise<SubAccountTransfer>;
    subAccountTransferToSameMaster(params: SubAccountTransferToSameMasterParams): Promise<SubAccountTransfer>;
    subAccountUniversalTransfer(params: SubAccountUniversalTransferParams): Promise<SubAccountUniversalTransfer>;
    depositAssetsIntoManagedSubAccount(params: SubAccountTransferToSameMasterParams): Promise<MarginTransactionResponse>;
    getManagedSubAccountDepositAddress(params: ManagedSubAccountDepositAddressParams): Promise<ManagedSubAccountDepositAddress>;
    withdrawAssetsFromManagedSubAccount(params: WithdrawAssetsFromManagedSubAccountParams): Promise<MarginTransactionResponse>;
    getManagedSubAccountTransfersParent(params: ManagedSubAccountTransferLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccountTransferLog(params: ManagedSubAccountTransferTTLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccountTransfersInvestor(params: ManagedSubAccountTransferLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccounts(params: ManagedSubAccountListParams): Promise<{
        total: number;
        managerSubUserInfoVoList: ManagerSubUserInfoVo[];
    }>;
    getManagedSubAccountSnapshot(params: ManagedSubAccountSnapshotParams): Promise<ManagedSubAccountSnapshot>;
    getManagedSubAccountAssetDetails(email: string): Promise<SubAccountAssetDetails[]>;
    getManagedSubAccountMarginAssets(params: {
        email: string;
        accountType?: string;
    }): Promise<ManagedSubAccountMarginAssetsResponse>;
    getManagedSubAccountFuturesAssets(params: {
        email: string;
        accountType?: string;
    }): Promise<ManagedSubAccountFuturesAssetsResponse>;
    getAutoInvestAssets(): Promise<{
        targetAssets: string[];
        sourceAssets: string[];
    }>;
    getAutoInvestSourceAssets(params: GetSourceAssetListParams): Promise<GetSourceAssetListResponse>;
    getAutoInvestTargetAssets(params: GetTargetAssetListParams): Promise<GetTargetAssetListResponse>;
    getAutoInvestTargetAssetsROI(params: GetTargetAssetROIParams): Promise<TargetAssetROI[]>;
    getAutoInvestIndex(params: {
        indexId: number;
    }): Promise<GetIndexDetailsResponse>;
    getAutoInvestPlans(params: {
        planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
    }): Promise<any>;
    submitAutoInvestOneTimeTransaction(params: SubmitOneTimeTransactionParams): Promise<SubmitOneTimeTransactionResponse>;
    updateAutoInvestPlanStatus(params: ChangePlanStatusParams): Promise<ChangePlanStatusResponse>;
    updateAutoInvestmentPlanOld(params: EditInvestmentPlanParams): Promise<EditInvestmentPlanResponse>;
    updateAutoInvestmentPlan(params: EditInvestmentPlanParams): Promise<EditInvestmentPlanResponse>;
    submitAutoInvestRedemption(params: SubmitIndexLinkedPlanRedemptionParams): Promise<{
        redemptionId: number;
    }>;
    getAutoInvestSubscriptionTransactions(params: GetSubscriptionTransactionHistoryParams): Promise<any>;
    getOneTimeTransactionStatus(params: GetOneTimeTransactionStatusParams): Promise<GetOneTimeTransactionStatusResponse>;
    submitAutoInvestmentPlanOld(params: CreateInvestmentPlanParams): Promise<CreateInvestmentPlanResponse>;
    submitAutoInvestmentPlan(params: CreateInvestmentPlanParams): Promise<CreateInvestmentPlanResponse>;
    getAutoInvestRedemptionHistory(params: GetIndexLinkedPlanRedemptionHistoryParams): Promise<IndexLinkedPlanRedemptionRecord[]>;
    getAutoInvestPlan(params: GetPlanDetailsParams): Promise<any>;
    getAutoInvestUserIndex(params: {
        indexId: number;
    }): Promise<GetIndexLinkedPlanPositionDetailsResponse>;
    getAutoInvestRebalanceHistory(params: GetIndexLinkedPlanRebalanceHistoryParams): Promise<GetIndexLinkedPlanRebalanceHistoryParams[]>;
    getConvertPairs(params: GetAllConvertPairsParams): Promise<any>;
    getConvertAssetInfo(): Promise<any>;
    convertQuoteRequest(params: ConvertQuoteRequestParams): Promise<any>;
    acceptQuoteRequest(params: AcceptQuoteRequestParams): Promise<any>;
    getConvertTradeHistory(params: GetConvertTradeHistoryParams): Promise<any>;
    getOrderStatus(params: GetOrderStatusParams): Promise<any>;
    submitConvertLimitOrder(params: SubmitConvertLimitOrderParams): Promise<any>;
    cancelConvertLimitOrder(params: {
        orderId: number;
    }): Promise<any>;
    getConvertLimitOpenOrders(): Promise<{
        list: ConvertLimitOpenOrder[];
    }>;
    getEthStakingAccount(): Promise<GetEthStakingAccountResponse>;
    getEthStakingAccountV2(): Promise<GetEthStakingAccountV2Response>;
    getEthStakingQuota(): Promise<GetEthStakingQuotaResponse>;
    subscribeEthStakingV1(params: {
        amount: number;
    }): Promise<{
        success: boolean;
    }>;
    subscribeEthStakingV2(params: {
        amount: number;
    }): Promise<SubscribeEthStakingV2Response>;
    redeemEth(params: RedeemEthParams): Promise<RedeemEthResponse>;
    wrapBeth(params: {
        amount: number;
    }): Promise<WrapBethResponse>;
    getEthStakingHistory(params: GetEthStakingHistoryParams): Promise<{
        rows: EthStakingHistory[];
        total: number;
    }>;
    getEthRedemptionHistory(params: GetEthRedemptionHistoryParams): Promise<{
        rows: EthRedemptionHistory[];
        total: number;
    }>;
    getBethRewardsHistory(params: GetBethRewardsHistoryParams): Promise<{
        rows: BethRewardsHistory[];
        total: number;
    }>;
    getWbethRewardsHistory(params: GetWrapHistoryParams): Promise<GetWbethRewardsHistoryResponse>;
    getEthRateHistory(params: GetETHRateHistoryParams): Promise<{
        rows: ETHRateHistory[];
        total: string;
    }>;
    getBethWrapHistory(params: GetWrapHistoryParams): Promise<{
        rows: WrapHistory[];
        total: number;
    }>;
    getBethUnwrapHistory(params: GetWrapHistoryParams): Promise<{
        rows: WrapHistory[];
        total: number;
    }>;
    getStakingProducts(params: StakingBasicParams & {
        asset?: string;
    }): Promise<StakingProduct[]>;
    getStakingProductPosition(params: StakingBasicParams & {
        productId?: string;
        asset?: string;
    }): Promise<StakingProductPosition[]>;
    getStakingHistory(params: StakingHistoryParams): Promise<StakingHistory[]>;
    getPersonalLeftQuotaOfStakingProduct(params: {
        product: StakingProductType;
        productId: string;
    }): Promise<StakingPersonalLeftQuota>;
    getSolStakingAccount(): Promise<SolStakingAccount>;
    getSolStakingQuota(): Promise<SolStakingQuota>;
    subscribeSolStaking(params: {
        amount: number;
    }): Promise<SubscribeSolStakingResponse>;
    redeemSol(params: {
        amount: number;
    }): Promise<RedeemSolResponse>;
    getSolStakingHistory(params?: GetSolStakingHistoryReq): Promise<{
        rows: SolStakingHistoryRecord[];
        total: number;
    }>;
    getSolRedemptionHistory(params?: {
        rows: SolRedemptionHistoryRecord[];
        total: number;
    }): Promise<SolRedemptionHistoryRecord>;
    getBnsolRewardsHistory(params?: GetBnsolRewardsHistoryReq): Promise<{
        estRewardsInSOL: string;
        rows: BnsolRewardHistoryRecord[];
        total: number;
    }>;
    getBnsolRateHistory(params?: GetBnsolRateHistoryReq): Promise<{
        rows: BnsolRateHistoryRecord[];
        total: string;
    }>;
    getFuturesLeadTraderStatus(): Promise<GetFuturesLeadTraderStatusResponse>;
    getFuturesLeadTradingSymbolWhitelist(): Promise<GetFuturesLeadTradingSymbolWhitelistResponse[]>;
    getMiningAlgos(): Promise<GetMiningAlgoListResponse[]>;
    getMiningCoins(): Promise<GetMiningCoinListResponse[]>;
    getHashrateResales(params: GetHashrateResaleListParams): Promise<GetHashrateResaleListResponse>;
    getMiners(params: GetMinerListParams): Promise<GetMinerListResponse>;
    getMinerDetails(params: GetMinerDetailsParams): Promise<GetMinerDetailsResponse[]>;
    getExtraBonuses(params: GetExtraBonusListParams): Promise<GetExtraBonusListResponse>;
    getMiningEarnings(params: GetEarningsListParams): Promise<GetEarningsListResponse>;
    cancelHashrateResaleConfig(params: CancelHashrateResaleConfigParams): Promise<boolean>;
    getHashrateResale(params: GetHashrateResaleDetailParams): Promise<GetHashrateResaleDetailResponse>;
    getMiningAccountEarnings(params: GetMiningAccountEarningParams): Promise<GetMiningAccountEarningResponse>;
    getMiningStatistics(params: GetStatisticListParams): Promise<GetStatisticListResponse>;
    submitHashrateResale(params: SubmitHashrateResaleParams): Promise<number>;
    getMiningAccounts(params: getMiningAccountsListParams): Promise<getMiningAccountsListResponse>;
    submitVpNewOrder(params: SubmitVpNewOrderParams): Promise<SubmitVpNewOrderResponse>;
    submitTwapNewOrder(params: SubmitTwapNewOrderParams): Promise<SubmitTwapNewOrderResponse>;
    cancelAlgoOrder(params: {
        algoId: number;
    }): Promise<CancelAlgoOrderResponse>;
    getAlgoSubOrders(params: GetAlgoSubOrdersParams): Promise<GetAlgoSubOrdersResponse>;
    getAlgoOpenOrders(): Promise<{
        total: number;
        orders: AlgoOrder[];
    }>;
    getAlgoHistoricalOrders(params: GetAlgoHistoricalOrdersParams): Promise<{
        total: number;
        orders: HistoricalAlgoOrder[];
    }>;
    submitSpotAlgoTwapOrder(params: SubmitSpotTwapNewOrderParams): Promise<SubmitSpotTwapNewOrderResponse>;
    cancelSpotAlgoOrder(params: {
        algoId: number;
    }): Promise<CancelSpotAlgoOrderResponse>;
    getSpotAlgoSubOrders(params: GetSpotAlgoSubOrdersParams): Promise<GetSpotAlgoSubOrdersResponse>;
    getSpotAlgoOpenOrders(): Promise<{
        total: number;
        orders: SpotAlgoOrder[];
    }>;
    getSpotAlgoHistoricalOrders(params: GetSpotAlgoHistoricalOrdersParams): Promise<{
        total: number;
        orders: HistoricalSpotAlgoOrder[];
    }>;
    getCryptoLoanFlexibleCollateralAssets(params: {
        collateralCoin?: string;
    }): Promise<{
        rows: FlexibleLoanCollateralAssetData[];
        total: number;
    }>;
    getCryptoLoanFlexibleAssets(params: {
        loanCoin?: string;
    }): Promise<{
        rows: FlexibleLoanAssetData[];
        total: number;
    }>;
    borrowCryptoLoanFlexible(params: BorrowFlexibleLoanParams): Promise<BorrowFlexibleLoanResponse>;
    repayCryptoLoanFlexible(params: RepayCryptoFlexibleLoanParams): Promise<RepayCryptoFlexibleLoanResponse>;
    adjustCryptoLoanFlexibleLTV(params: AdjustFlexibleCryptoLoanLTVParams): Promise<AdjustFlexibleCryptoLoanLTVResponse>;
    getCryptoLoanFlexibleLTVAdjustmentHistory(params: GetFlexibleLoanLTVAdjustmentHistoryParams): Promise<{
        rows: FlexibleLoanLTVAdjustmentHistory[];
        total: number;
    }>;
    getLoanFlexibleBorrowHistory(params: GetFlexibleCryptoLoanBorrowHistoryParams): Promise<{
        rows: FlexibleCryptoLoanBorrowHistory[];
        total: number;
    }>;
    getCryptoLoanFlexibleOngoingOrders(params: GetFlexibleLoanOngoingOrdersParams): Promise<{
        rows: FlexibleLoanOngoingOrder[];
        total: number;
    }>;
    getLoanFlexibleRepaymentHistory(params: GetLoanRepaymentHistoryParams): Promise<{
        rows: LoanRepaymentHistory[];
        total: number;
    }>;
    getCryptoLoanLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
        rows: LoanableAssetData[];
        total: number;
    }>;
    getCryptoLoanCollateralRepayRate(params: CheckCollateralRepayRateParams): Promise<CheckCollateralRepayRateResponse>;
    getCryptoLoanCollateralAssetsData(params: GetCollateralAssetDataParams): Promise<{
        rows: CollateralAssetData[];
        total: number;
    }>;
    getCryptoLoansIncomeHistory(params: GetCryptoLoansIncomeHistoryParams): Promise<GetCryptoLoansIncomeHistoryResponse[]>;
    borrowCryptoLoan(params: BorrowCryptoLoanParams): Promise<BorrowCryptoLoanResponse>;
    repayCryptoLoan(params: RepayCryptoLoanParams): Promise<RepayCryptoLoanResponse>;
    adjustCryptoLoanLTV(params: AdjustCryptoLoanLTVParams): Promise<AdjustCryptoLoanLTVResponse>;
    customizeCryptoLoanMarginCall(params: CustomizeMarginCallParams): Promise<{
        rows: CustomizeMarginCall[];
        total: number;
    }>;
    getCryptoLoanOngoingOrders(params: GetLoanOngoingOrdersParams): Promise<{
        rows: LoanOngoingOrder[];
        total: number;
    }>;
    getCryptoLoanBorrowHistory(params: GetLoanBorrowHistoryParams): Promise<{
        rows: LoanBorrowHistory[];
        total: number;
    }>;
    getCryptoLoanLTVAdjustmentHistory(params: GetLoanLTVAdjustmentHistoryParams): Promise<{
        rows: LoanLTVAdjustmentHistory[];
        total: number;
    }>;
    getCryptoLoanRepaymentHistory(params: GetLoanRepaymentHistoryParams): Promise<any>;
    getSimpleEarnAccount(): Promise<SimpleEarnAccountResponse>;
    getFlexibleSavingProducts(params?: SimpleEarnProductListParams): Promise<{
        rows: SimpleEarnFlexibleProduct[];
        total: number;
    }>;
    getSimpleEarnLockedProductList(params?: SimpleEarnProductListParams): Promise<{
        rows: SimpleEarnLockedProduct[];
        total: number;
    }>;
    getFlexibleProductPosition(params?: SimpleEarnFlexibleProductPositionParams): Promise<{
        rows: any[];
        total: number;
    }>;
    getLockedProductPosition(params?: SimpleEarnLockedProductPositionParams): Promise<{
        rows: SimpleEarnLockedProductPosition[];
        total: number;
    }>;
    getFlexiblePersonalLeftQuota(params: {
        productId: string;
    }): Promise<{
        leftPersonalQuota: string;
    }>;
    getLockedPersonalLeftQuota(params: {
        projectId: string;
    }): Promise<{
        leftPersonalQuota: string;
    }>;
    purchaseFlexibleProduct(params: SimpleEarnSubscribeProductParams): Promise<SimpleEarnSubscribeFlexibleProductResponse>;
    subscribeSimpleEarnLockedProduct(params: SimpleEarnSubscribeProductParams): Promise<SimpleEarnSubscribeLockedProductResponse>;
    redeemFlexibleProduct(params: SimpleEarnRedeemFlexibleProductParams): Promise<SimpleEarnRedeemResponse>;
    redeemLockedProduct(params: {
        positionId: string;
    }): Promise<SimpleEarnRedeemResponse>;
    setFlexibleAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
        success: boolean;
    }>;
    setLockedAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
        success: boolean;
    }>;
    getFlexibleSubscriptionPreview(params: GetFlexibleSubscriptionPreviewParams): Promise<FlexibleSubscriptionPreview>;
    getLockedSubscriptionPreview(params: GetLockedSubscriptionPreviewParams): Promise<LockedSubscriptionPreview[]>;
    setLockedProductRedeemOption(params: {
        positionId: string;
        redeemTo: 'SPOT' | 'FLEXIBLE';
    }): Promise<{
        success: boolean;
    }>;
    getFlexibleSubscriptionRecord(params: GetFlexibleSubscriptionRecordParams): Promise<{
        rows: GetFlexibleSubscriptionRecordResponse[];
        total: number;
    }>;
    getLockedSubscriptionRecord(params: GetLockedSubscriptionRecordParams): Promise<{
        rows: LockedSubscriptionRecord[];
        total: number;
    }>;
    getFlexibleRedemptionRecord(params: GetFlexibleRedemptionRecordParams): Promise<{
        rows: FlexibleRedemptionRecord[];
        total: number;
    }>;
    getLockedRedemptionRecord(params: GetLockedRedemptionRecordParams): Promise<{
        rows: LockedRedemptionRecord[];
        total: number;
    }>;
    getFlexibleRewardsHistory(params: GetFlexibleRewardsHistoryParams): Promise<{
        rows: FlexibleRewardsHistory[];
        total: number;
    }>;
    getLockedRewardsHistory(params: GetLockedRewardsHistoryParams): Promise<{
        rows: GetLockedRewardsHistory[];
        total: number;
    }>;
    getCollateralRecord(params: GetCollateralRecordParams): Promise<{
        rows: CollateralRecord[];
        total: string;
    }>;
    getRateHistory(params: GetRateHistoryParams): Promise<{
        rows: GetRateHistory[];
        total: string;
    }>;
    getVipBorrowInterestRate(params: {
        loanCoin: string;
    }): Promise<BorrowInterestRate[]>;
    getVipLoanInterestRateHistory(params: VipLoanInterestRateHistoryParams): Promise<{
        rows: VipLoanInterestRateRecord[];
        total: number;
    }>;
    getVipLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
        rows: LoanableAssetData[];
        total: number;
    }>;
    getVipCollateralAssets(params: {
        collateralCoin?: string;
    }): Promise<{
        rows: CollateralAssetData[];
        total: number;
    }>;
    getVipLoanOpenOrders(params: GetVipLoanOngoingOrdersParams): Promise<{
        rows: VipOngoingOrder[];
        total: number;
    }>;
    getVipLoanRepaymentHistory(params: GetVipLoanRepaymentHistoryParams): Promise<{
        rows: VipLoanRepaymentHistory[];
        total: number;
    }>;
    checkVipCollateralAccount(params: CheckVipCollateralAccountParams): Promise<{
        rows: VipCollateralAccount[];
        total: number;
    }>;
    getVipApplicationStatus(params: GetApplicationStatusParams): Promise<{
        rows: ApplicationStatus[];
        total: number;
    }>;
    renewVipLoan(params: VipLoanRenewParams): Promise<VipLoanRenewResponse>;
    repayVipLoan(params: VipLoanRepayParams): Promise<VipLoanRepayResponse>;
    borrowVipLoan(params: VipLoanBorrowParams): Promise<VipLoanBorrowResponse>;
    getDualInvestmentProducts(params: GetDualInvestmentProductListParams): Promise<{
        total: number;
        list: DualInvestmentProduct[];
    }>;
    subscribeDualInvestmentProduct(params: SubscribeDualInvestmentProductParams): Promise<SubscribeDualInvestmentProductResponse>;
    getDualInvestmentPositions(params: GetDualInvestmentPositionsParams): Promise<{
        total: number;
        list: DualInvestmentPosition[];
    }>;
    getDualInvestmentAccounts(): Promise<CheckDualInvestmentAccountsResponse>;
    getVipLoanAccruedInterest(params?: VipLoanAccruedInterestParams): Promise<{
        rows: VipLoanAccruedInterestRecord[];
        total: number;
    }>;
    updateAutoCompoundStatus(params: ChangeAutoCompoundStatusParams): Promise<ChangeAutoCompoundStatusResponse>;
    createGiftCard(params: CreateGiftCardParams): Promise<any>;
    createDualTokenGiftCard(params: CreateDualTokenGiftCardParams): Promise<any>;
    redeemGiftCard(params: RedeemGiftCardParams): Promise<any>;
    verifyGiftCard(params: {
        referenceNo: string;
    }): Promise<any>;
    getTokenLimit(params: {
        baseToken: string;
    }): Promise<any>;
    getRsaPublicKey(): Promise<any>;
    getNftTransactionHistory(params: GetNftTransactionHistoryParams): Promise<{
        total: number;
        list: NftTransaction[];
    }>;
    getNftDepositHistory(params: GetNftDepositHistoryParams): Promise<{
        total: number;
        list: NftDeposit[];
    }>;
    getNftWithdrawHistory(params: GetNftWithdrawHistoryParams): Promise<{
        total: number;
        list: NftWithdraw[];
    }>;
    getNftAsset(params: GetNftAssetParams): Promise<{
        total: number;
        list: NftAsset[];
    }>;
    getC2CTradeHistory(params: GetC2CTradeHistoryParams): Promise<GetC2CTradeHistoryResponse>;
    getFiatOrderHistory(params: GetFiatOrderHistoryParams): Promise<GetFiatOrderHistoryResponse>;
    getFiatPaymentsHistory(params: GetFiatOrderHistoryParams): Promise<GetFiatPaymentsHistoryResponse>;
    getSpotRebateHistoryRecords(params: GetSpotRebateHistoryRecordsParams): Promise<GetSpotRebateHistoryRecordsResponse>;
    getPortfolioMarginIndexPrice(params?: {
        asset?: string;
    }): Promise<GetPortfolioMarginAssetIndexPriceResponse[]>;
    getPortfolioMarginAssetLeverage(): Promise<GetPortfolioMarginAssetLeverageResponse[]>;
    getPortfolioMarginProCollateralRate(): Promise<GetPortfolioMarginProCollateralRateResponse[]>;
    getPortfolioMarginProTieredCollateralRate(): Promise<any[]>;
    getPortfolioMarginProAccountInfo(): Promise<GetPortfolioMarginProAccountInfoResponse>;
    bnbTransfer(params: BnbTransferParams): Promise<{
        tranId: number;
    }>;
    submitPortfolioMarginProFullTransfer(): Promise<{
        msg: string;
    }>;
    submitPortfolioMarginProSpecificTransfer(params: {
        asset: string;
    }): Promise<{
        msg: string;
    }>;
    repayPortfolioMarginProBankruptcyLoan(params: {
        from?: 'SPOT' | 'MARGIN';
    }): Promise<{
        tranId: number;
    }>;
    getPortfolioMarginProBankruptcyLoanAmount(): Promise<GetPortfolioMarginProBankruptcyLoanAmountResponse>;
    repayFuturesNegativeBalance(): Promise<{
        msg: string;
    }>;
    updateAutoRepayFuturesStatus(params: {
        autoRepay: string;
    }): Promise<{
        msg: string;
    }>;
    getAutoRepayFuturesStatus(): Promise<{
        autoRepay: boolean;
    }>;
    getPortfolioMarginProInterestHistory(params: GetPortfolioMarginProInterestHistoryParams): Promise<GetPortfolioMarginProInterestHistoryResponse[]>;
    getPortfolioMarginProSpanAccountInfo(): Promise<PortfolioMarginProSpanAccountInfo>;
    getPortfolioMarginProAccountBalance(params?: {
        asset?: string;
    }): Promise<PortfolioMarginProAccountBalance[]>;
    getFuturesTickLevelOrderbookDataLink(params: GetFutureTickLevelOrderbookDataLinkParams): Promise<{
        data: HistoricalDataLink[];
    }>;
    getBlvtInfo(params?: {
        tokenName?: string;
    }): Promise<any[]>;
    subscribeBlvt(params: SubscribeBlvtParams): Promise<SubscribeBlvtResponse>;
    getBlvtSubscriptionRecord(params: GetBlvtSubscriptionRecordParams): Promise<BlvtSubscriptionRecord[]>;
    redeemBlvt(params: RedeemBlvtParams): Promise<RedeemBlvtResponse>;
    getBlvtRedemptionRecord(params: GetBlvtRedemptionRecordParams): Promise<BlvtRedemptionRecord[]>;
    getBlvtUserLimitInfo(params: {
        tokenName?: string;
    }): Promise<BlvtUserLimitInfo[]>;
    getPayTransactions(params: GetPayTradeHistoryParams): Promise<any>;
    createBrokerSubAccount(params: CreateBrokerSubAccountParams): Promise<BrokerSubAccount>;
    getBrokerSubAccount(params: GetBrokerSubAccountParams): Promise<BrokerSubAccount[]>;
    enableMarginBrokerSubAccount(params: EnableMarginBrokerSubAccountParams): Promise<EnableMarginBrokerSubAccountResponse>;
    createApiKeyBrokerSubAccount(params: CreateApiKeyBrokerSubAccountParams): Promise<CreateApiKeyBrokerSubAccountResponse>;
    changePermissionApiKeyBrokerSubAccount(params: ChangePermissionApiKeyBrokerSubAccountParams): Promise<ChangePermissionApiKeyBrokerSubAccountResponse>;
    changeComissionBrokerSubAccount(params: ChangePermissionApiKeyBrokerSubAccountParams): Promise<ChangePermissionApiKeyBrokerSubAccountResponse>;
    enableUniversalTransferApiKeyBrokerSubAccount(params: EnableUniversalTransferApiKeyBrokerSubAccountParams): Promise<EnableUniversalTransferApiKeyBrokerSubAccountResponse>;
    updateIpRestrictionForSubAccountApiKey(params: UpdateIpRestrictionForSubApiKey): Promise<{
        status: string;
        ipList?: string[];
        updateTime: number;
        apiKey: string;
    }>;
    deleteIPRestrictionForSubAccountApiKey(params: {
        subAccountId: string;
        subAccountApiKey: string;
        ipAddress?: string;
    }): Promise<{
        subaccountId: string;
        apikey: string;
        ipList: string[];
        updateTime: number;
    }>;
    deleteApiKeyBrokerSubAccount(params: DeleteApiKeyBrokerSubAccountParams): Promise<object>;
    getSubAccountBrokerIpRestriction(params: {
        subAccountId: string;
        subAccountApiKey: string;
    }): Promise<{
        subaccountId: string;
        ipRestrict: boolean;
        apikey: string;
        ipList: string[];
        updateTime: number;
    }>;
    getApiKeyBrokerSubAccount(params: GetApiKeyBrokerSubAccountParams): Promise<ApiKeyBrokerSubAccount[]>;
    getBrokerInfo(): Promise<GetBrokerInfoResponse>;
    updateSubAccountBNBBurn(params: {
        subAccountId: string;
        spotBNBBurn: 'true' | 'false';
    }): Promise<{
        subAccountId: string;
        spotBNBBurn: boolean;
    }>;
    updateSubAccountMarginInterestBNBBurn(params: {
        subAccountId: string;
        interestBNBBurn: 'true' | 'false';
    }): Promise<{
        subAccountId: string;
        interestBNBBurn: boolean;
    }>;
    getSubAccountBNBBurnStatus(params: {
        subAccountId: string;
    }): Promise<{
        subAccountId: string;
        spotBNBBurn: boolean;
        interestBNBBurn: boolean;
    }>;
    transferBrokerSubAccount(params: TransferBrokerSubAccountParams): Promise<TransferBrokerSubAccount>;
    getBrokerSubAccountHistory(params: GetBrokerSubAccountHistoryParams): Promise<BrokerSubAccountHistory[]>;
    submitBrokerSubFuturesTransfer(params: {
        fromId?: string;
        toId?: string;
        futuresType: number;
        asset: string;
        amount: number;
        clientTranId?: string;
    }): Promise<{
        success: boolean;
        txnId: string;
        clientTranId?: string;
    }>;
    getSubAccountFuturesTransferHistory(params: {
        subAccountId: string;
        futuresType: number;
        clientTranId?: string;
        startTime?: number;
        endTime?: number;
        page?: number;
        limit?: number;
    }): Promise<any>;
    getBrokerSubDepositHistory(params: GetSubAccountDepositHistoryParams): Promise<SubAccountDeposit[]>;
    getBrokerSubAccountSpotAssets(params: QuerySubAccountSpotMarginAssetInfoParams): Promise<{
        data: SubaccountBrokerSpotAsset[];
        timestamp: number;
    }>;
    getSubAccountMarginAssetInfo(params: QuerySubAccountSpotMarginAssetInfoParams): Promise<{
        data: SubAccountBrokerMarginAsset[];
        timestamp: number;
    }>;
    querySubAccountFuturesAssetInfo(params: QuerySubAccountFuturesAssetInfoParams): Promise<{
        data: (UsdtMarginedFuturesResponse | CoinMarginedFuturesResponse)[];
        timestamp: number;
    }>;
    universalTransferBroker(params: UniversalTransferBrokerParams): Promise<{
        txnId: number;
        clientTranId: string;
    }>;
    getUniversalTransferBroker(params: GetUniversalTransferBrokerParams): Promise<BrokerUniversalTransfer[]>;
    updateBrokerSubAccountCommission(params: ChangeSubAccountCommissionParams): Promise<ChangeSubAccountCommissionResponse>;
    updateBrokerSubAccountFuturesCommission(params: ChangeSubAccountFuturesCommissionParams): Promise<ChangeSubAccountFuturesCommissionResponse>;
    getBrokerSubAccountFuturesCommission(params: QuerySubAccountFuturesCommissionParams): Promise<BrokerSubAccountFuturesCommission[]>;
    updateBrokerSubAccountCoinFuturesCommission(params: ChangeSubAccountCoinFuturesCommissionParams): Promise<ChangeSubAccountFuturesCommissionResponse>;
    getBrokerSubAccountCoinFuturesCommission(params: QuerySubAccountCoinFuturesCommissionParams): Promise<BrokerSubAccountCoinFuturesCommission[]>;
    getBrokerSpotCommissionRebate(params: QueryBrokerSpotCommissionRebateParams): Promise<BrokerCommissionRebate[]>;
    getBrokerFuturesCommissionRebate(params: QueryBrokerFuturesCommissionRebateParams): Promise<BrokerCommissionRebate[]>;
    getBrokerSpotRebateHistory(days: 7 | 30, customerId?: string): import("./util/requestUtils").GenericAPIResponse;
    getBrokerIfNewSpotUser(): Promise<{
        rebateWorking: boolean;
        ifNewUser: boolean;
    }>;
    getBrokerSubAccountDepositHistory(params?: GetBrokerSubAccountDepositHistoryParams): Promise<SubAccountDepositHistoryList[]>;
    getBrokerUserCustomisedId(market: 'spot' | 'futures'): import("./util/requestUtils").GenericAPIResponse;
    enableFuturesBrokerSubAccount(params: EnableFuturesBrokerSubAccountParams): Promise<EnableFuturesBrokerSubAccountResponse>;
    enableMarginApiKeyBrokerSubAccount(params: EnableMarginApiKeyBrokerSubAccountParams): Promise<BrokerSubAccount>;
    private validateOrderId;
    getSpotUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveSpotUserDataListenKey(listenKey: string): Promise<object>;
    closeSpotUserDataListenKey(listenKey: string): Promise<object>;
    getMarginUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveMarginUserDataListenKey(listenKey: string): Promise<object>;
    closeMarginUserDataListenKey(listenKey: string): Promise<object>;
    getIsolatedMarginUserDataListenKey(params: {
        symbol: string;
    }): Promise<{
        listenKey: string;
    }>;
    keepAliveIsolatedMarginUserDataListenKey(params: {
        symbol: string;
        listenKey: string;
    }): Promise<object>;
    closeIsolatedMarginUserDataListenKey(params: {
        symbol: string;
        listenKey: string;
    }): Promise<object>;
    getBSwapLiquidity(params?: {
        poolId: number;
    }): Promise<BSwapLiquidity[]>;
    addBSwapLiquidity(params: AddBSwapLiquidityParams): Promise<{
        operationId: number;
    }>;
    removeBSwapLiquidity(params: RemoveBSwapLiquidityParams): Promise<{
        operationId: number;
    }>;
    getBSwapOperations(params?: BSwapOperationsParams): Promise<BSwapOperations[]>;
    getLeftDailyPurchaseQuotaFlexibleProduct(params: {
        productId: string;
    }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse>;
    getLeftDailyRedemptionQuotaFlexibleProduct(params: {
        productId: string;
    }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse & {
        dailyQuota: string;
        minRedemptionAmount: string;
    }>;
    purchaseFixedAndActivityProject(params: {
        projectId: string;
        lot: number;
    }): Promise<PurchaseFlexibleProductResponse>;
    getFixedAndActivityProjects(params: FixedAndActivityProjectParams): Promise<any[]>;
    getFixedAndActivityProductPosition(params: FixedAndActivityProjectPositionParams): Promise<any[]>;
    getLendingAccount(): Promise<StakingProduct[]>;
    getPurchaseRecord(params: PurchaseRecordParams): Promise<any[]>;
    getRedemptionRecord(params: PurchaseRecordParams): Promise<any[]>;
    getInterestHistory(params: PurchaseRecordParams): Promise<any[]>;
    changeFixedAndActivityPositionToDailyPosition(params: {
        projectId: string;
        lot: number;
        positionId?: number;
    }): Promise<PurchaseFlexibleProductResponse>;
    enableConvertSubAccount(params: EnableConvertSubAccountParams): Promise<any>;
    convertBUSD(params: ConvertTransfer): Promise<ConvertTransferResponse>;
    getConvertBUSDHistory(params: GetConvertBUSDHistoryParams): Promise<{
        total: number;
        rows: BUSDConversionRecord[];
    }>;
}
export declare const SpotClient: typeof MainClient;
