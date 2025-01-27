import { AxiosRequestConfig } from 'axios';
import { FundingRate } from './types/coin';
import { AggregateFuturesTrade, Basis, BasisParams, CancelAllOpenOrdersResult, CancelFuturesOrderResult, CancelMultipleOrdersParams, CancelOrdersTimeoutParams, ChangeStats24hr, ContinuousContractKlinesParams, ForceOrderResult, FundingRateHistory, FuturesAccountBalance, FuturesAccountConfig, FuturesAccountInformation, FuturesConvertOrderStatus, FuturesConvertPair, FuturesConvertQuote, FuturesConvertQuoteRequest, FuturesDataPaginatedParams, FuturesExchangeInfo, FuturesOrderBook, FuturesPosition, FuturesPositionTrade, FuturesSymbolOrderBookTicker, FuturesTradeHistoryDownloadId, FuturesTransactionDownloadLink, GetForceOrdersParams, GetFuturesOrderModifyHistoryParams, GetIncomeHistoryParams, GetPositionMarginChangeHistoryParams, HistoricOpenInterest, IncomeHistory, IndexPriceConstituents, IndexPriceKlinesParams, MarkPrice, ModeChangeResult, ModifyFuturesOrderParams, ModifyFuturesOrderResult, ModifyOrderParams, MultiAssetModeResponse, MultiAssetsMode, NewFuturesOrderParams, NewOrderError, NewOrderResult, OpenInterest, OrderResult, PortfolioMarginProAccountInfo, PositionModeParams, PositionModeResponse, QuarterlyContractSettlementPrice, RawFuturesTrade, RebateDataOverview, SetCancelTimeoutResult, SetIsolatedMarginParams, SetIsolatedMarginResult, SetLeverageParams, SetLeverageResult, SetMarginTypeParams, SymbolConfig, SymbolKlinePaginatedParams, SymbolLeverageBracketsResult, UserCommissionRate, UserForceOrder } from './types/futures';
import { BasicSymbolPaginatedParams, BasicSymbolParam, CancelOrderParams, GenericCodeMsgError, GetAllOrdersParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, OrderBookParams, RecentTradesParams, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class USDMClient extends BaseRestClient {
    private clientId;
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig, useTestnet?: boolean);
    getServerTime(): Promise<number>;
    testConnectivity(): Promise<object>;
    getExchangeInfo(): Promise<FuturesExchangeInfo>;
    getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook>;
    getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawFuturesTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateFuturesTrade[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getContinuousContractKlines(params: ContinuousContractKlinesParams): Promise<Kline[]>;
    getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]>;
    getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getPremiumIndexKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getMarkPrice(params: BasicSymbolParam): Promise<MarkPrice>;
    getMarkPrice(): Promise<MarkPrice[]>;
    getFundingRateHistory(params?: Partial<BasicSymbolPaginatedParams>): Promise<FundingRateHistory[]>;
    getFundingRates(): Promise<FundingRate[]>;
    get24hrChangeStatististics(params?: Partial<BasicSymbolParam>): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    get24hrChangeStatistics(params: Partial<BasicSymbolParam>): Promise<ChangeStats24hr[]>;
    get24hrChangeStatistics(params?: Partial<BasicSymbolParam>): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    get24hrChangeStatistics(params: Partial<BasicSymbolParam>): Promise<ChangeStats24hr>;
    getSymbolPriceTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolPriceTickerV2(params?: Partial<BasicSymbolParam>): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolOrderBookTicker(params?: Partial<BasicSymbolParam>): Promise<FuturesSymbolOrderBookTicker | FuturesSymbolOrderBookTicker[]>;
    getQuarterlyContractSettlementPrices(params: {
        pair: string;
    }): Promise<QuarterlyContractSettlementPrice[]>;
    getOpenInterest(params: BasicSymbolParam): Promise<OpenInterest>;
    getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<HistoricOpenInterest[]>;
    getTopTradersLongShortPositionRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getGlobalLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTakerBuySellVolume(params: FuturesDataPaginatedParams): Promise<any>;
    getHistoricalBlvtNavKlines(params: SymbolKlinePaginatedParams): Promise<any>;
    getCompositeSymbolIndex(params?: Partial<BasicSymbolParam>): Promise<any>;
    getMultiAssetsModeAssetIndex(params?: {
        symbol?: string;
    }): Promise<any>;
    getBasis(params: BasisParams): Promise<Basis[]>;
    getIndexPriceConstituents(params: {
        symbol: string;
    }): Promise<IndexPriceConstituents>;
    submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult>;
    submitMultipleOrders<TNumberType = number>(orders: NewFuturesOrderParams<TNumberType>[]): Promise<(NewOrderResult | NewOrderError)[]>;
    modifyOrder(params: ModifyFuturesOrderParams): Promise<ModifyFuturesOrderResult>;
    modifyMultipleOrders(orders: ModifyOrderParams[]): Promise<any>;
    getOrderModifyHistory(params: GetFuturesOrderModifyHistoryParams): Promise<any>;
    cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult>;
    cancelMultipleOrders(params: CancelMultipleOrdersParams): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]>;
    cancelAllOpenOrders(params: BasicSymbolParam): Promise<CancelAllOpenOrdersResult>;
    setCancelOrdersOnTimeout(params: CancelOrdersTimeoutParams): Promise<SetCancelTimeoutResult>;
    getOrder(params: GetOrderParams): Promise<OrderResult>;
    getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]>;
    getAllOpenOrders(params?: Partial<BasicSymbolParam>): Promise<OrderResult[]>;
    getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult>;
    getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]>;
    getAccountTrades(params: SymbolFromPaginatedRequestFromId & {
        orderId?: number;
    }): Promise<FuturesPositionTrade[]>;
    setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult>;
    setPositionMode(params: PositionModeParams): Promise<ModeChangeResult>;
    setLeverage(params: SetLeverageParams): Promise<SetLeverageResult>;
    setMultiAssetsMode(params: {
        multiAssetsMargin: MultiAssetsMode;
    }): Promise<ModeChangeResult>;
    setIsolatedPositionMargin(params: SetIsolatedMarginParams): Promise<SetIsolatedMarginResult>;
    getPositions(params?: Partial<BasicSymbolParam>): Promise<FuturesPosition[]>;
    getPositionsV3(params?: {
        symbol?: string;
    }): Promise<FuturesPosition[]>;
    getADLQuantileEstimation(params?: Partial<BasicSymbolParam>): Promise<any>;
    getPositionMarginChangeHistory(params: GetPositionMarginChangeHistoryParams): Promise<any>;
    getBalanceV3(): Promise<FuturesAccountBalance[]>;
    getBalance(): Promise<FuturesAccountBalance[]>;
    getAccountInformationV3(): Promise<FuturesAccountInformation>;
    getAccountInformation(): Promise<FuturesAccountInformation>;
    getAccountComissionRate(params: BasicSymbolParam): Promise<UserCommissionRate>;
    getAccountCommissionRate(params: BasicSymbolParam): Promise<UserCommissionRate>;
    getFuturesAccountConfig(): Promise<FuturesAccountConfig>;
    getFuturesSymbolConfig(params: {
        symbol?: string;
    }): Promise<SymbolConfig[]>;
    getUserForceOrders(): Promise<UserForceOrder[]>;
    getNotionalAndLeverageBrackets(params?: Partial<BasicSymbolParam>): Promise<SymbolLeverageBracketsResult[]>;
    getMultiAssetsMode(): Promise<MultiAssetModeResponse>;
    getCurrentPositionMode(): Promise<PositionModeResponse>;
    getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]>;
    getApiQuantitativeRulesIndicators(params?: Partial<BasicSymbolParam>): Promise<any>;
    getFuturesTransactionHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesTransactionHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    getFuturesOrderHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesOrderHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    getFuturesTradeHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesTradeDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    setBNBBurnEnabled(params: {
        feeBurn: 'true' | 'false';
    }): Promise<{
        code: number;
        msg: string;
    }>;
    getBNBBurnStatus(): Promise<{
        feeBurn: boolean;
    }>;
    testOrder(params: NewFuturesOrderParams): Promise<any>;
    getAllConvertPairs(params?: {
        fromAsset?: string;
        toAsset?: string;
    }): Promise<FuturesConvertPair[]>;
    submitConvertQuoteRequest(params: FuturesConvertQuoteRequest): Promise<FuturesConvertQuote>;
    acceptConvertQuote(params: {
        quoteId: string;
    }): Promise<{
        orderId: string;
        createTime: number;
        orderStatus: 'PROCESS' | 'ACCEPT_SUCCESS' | 'SUCCESS' | 'FAIL';
    }>;
    getConvertOrderStatus(params: {
        orderId?: string;
        quoteId?: string;
    }): Promise<FuturesConvertOrderStatus>;
    getPortfolioMarginProAccountInfo(params: {
        asset: string;
    }): Promise<PortfolioMarginProAccountInfo>;
    getBrokerIfNewFuturesUser(brokerId: string, type?: 1 | 2): Promise<{
        brokerId: string;
        rebateWorking: boolean;
        ifNewUser: boolean;
    }>;
    setBrokerCustomIdForClient(customerId: string, email: string): Promise<{
        customerId: string;
        email: string;
    }>;
    getBrokerClientCustomIds(customerId: string, email: string, page?: number, limit?: number): Promise<any>;
    getBrokerUserCustomId(brokerId: string): Promise<any>;
    getBrokerRebateDataOverview(type?: 1 | 2): Promise<RebateDataOverview>;
    getBrokerUserTradeVolume(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    getBrokerRebateVolume(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    getBrokerTradeDetail(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    getFuturesUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveFuturesUserDataListenKey(): Promise<object>;
    closeFuturesUserDataListenKey(): Promise<object>;
    private validateOrderId;
}
