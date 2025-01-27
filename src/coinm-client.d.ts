import { AxiosRequestConfig } from 'axios';
import { ClassicPortfolioMarginAccount, ClassicPortfolioMarginNotionalLimit, CoinMAccountTradeParams, CoinMOpenInterest, CoinMPositionTrade, CoinMSymbolOrderBookTicker, FundingRate, FuturesTransactionHistoryDownloadLink, GetClassicPortfolioMarginNotionalLimitParams, PositionRisk, SymbolOrPair } from './types/coin';
import { AggregateFuturesTrade, CancelAllOpenOrdersResult, CancelFuturesOrderResult, CancelMultipleOrdersParams, CancelOrdersTimeoutParams, ChangeStats24hr, ContinuousContractKlinesParams, ForceOrderResult, FundingRateHistory, FuturesCoinMAccountBalance, FuturesCoinMAccountInformation, FuturesCoinMBasisParams, FuturesCoinMTakerBuySellVolumeParams, FuturesDataPaginatedParams, FuturesExchangeInfo, FuturesOrderBook, GetForceOrdersParams, GetIncomeHistoryParams, GetPositionMarginChangeHistoryParams, IncomeHistory, IndexPriceConstituents, IndexPriceKlinesParams, MarkPrice, ModeChangeResult, ModifyFuturesOrderParams, ModifyFuturesOrderResult, NewFuturesOrderParams, NewOrderError, NewOrderResult, OrderAmendment, OrderResult, PositionModeParams, PositionModeResponse, QuarterlyContractSettlementPrice, RawFuturesTrade, RebateDataOverview, SetCancelTimeoutResult, SetIsolatedMarginParams, SetIsolatedMarginResult, SetLeverageParams, SetLeverageResult, SetMarginTypeParams, SymbolKlinePaginatedParams, SymbolLeverageBracketsResult, UserCommissionRate } from './types/futures';
import { BasicSymbolPaginatedParams, BasicSymbolParam, CancelOrderParams, GenericCodeMsgError, GetAllOrdersParams, GetOrderModifyHistoryParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, OrderBookParams, RecentTradesParams, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class CoinMClient extends BaseRestClient {
    private clientId;
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig, useTestnet?: boolean);
    getServerTime(): Promise<number>;
    testConnectivity(): Promise<object>;
    getExchangeInfo(): Promise<FuturesExchangeInfo>;
    getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook>;
    getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawFuturesTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateFuturesTrade[]>;
    getMarkPrice(params?: Partial<BasicSymbolParam>): Promise<MarkPrice | MarkPrice[]>;
    getFundingRateHistory(params?: Partial<BasicSymbolPaginatedParams>): Promise<FundingRateHistory[]>;
    getFundingRate(params?: {
        symbol?: string;
    }): Promise<FundingRate[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getContinuousContractKlines(params: ContinuousContractKlinesParams): Promise<Kline[]>;
    getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]>;
    getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getPremiumIndexKlines(params: KlinesParams): Promise<Kline[]>;
    get24hrChangeStatististics(params?: Partial<BasicSymbolParam>): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    get24hrChangeStatistics(params?: Partial<BasicSymbolParam>): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    getSymbolPriceTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolOrderBookTicker(params?: SymbolOrPair): Promise<CoinMSymbolOrderBookTicker[]>;
    getOpenInterest(params: {
        symbol: string;
    }): Promise<CoinMOpenInterest>;
    getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortPositionRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getGlobalLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTakerBuySellVolume(params: FuturesCoinMTakerBuySellVolumeParams): Promise<any>;
    getCompositeSymbolIndex(params: FuturesCoinMBasisParams): Promise<any>;
    getIndexPriceConstituents(params: {
        symbol: string;
    }): Promise<IndexPriceConstituents>;
    getQuarterlyContractSettlementPrices(params: {
        pair: string;
    }): Promise<QuarterlyContractSettlementPrice[]>;
    submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult>;
    submitMultipleOrders(orders: NewFuturesOrderParams<string>[]): Promise<(NewOrderResult | NewOrderError)[]>;
    modifyOrder(params: ModifyFuturesOrderParams): Promise<ModifyFuturesOrderResult>;
    modifyMultipleOrders(orders: ModifyFuturesOrderParams[]): Promise<(ModifyFuturesOrderResult | NewOrderError)[]>;
    getOrderModifyHistory(params: GetOrderModifyHistoryParams): Promise<OrderAmendment[]>;
    cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult>;
    cancelMultipleOrders(params: CancelMultipleOrdersParams): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]>;
    cancelAllOpenOrders(params: BasicSymbolParam): Promise<CancelAllOpenOrdersResult>;
    setCancelOrdersOnTimeout(params: CancelOrdersTimeoutParams): Promise<SetCancelTimeoutResult>;
    getOrder(params: GetOrderParams): Promise<OrderResult>;
    getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]>;
    getAllOpenOrders(params?: Partial<BasicSymbolParam>): Promise<OrderResult[]>;
    getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult>;
    getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]>;
    getAccountTrades(params: CoinMAccountTradeParams & {
        orderId?: number;
    }): Promise<CoinMPositionTrade[]>;
    getPositions(): Promise<PositionRisk[]>;
    setPositionMode(params: PositionModeParams): Promise<ModeChangeResult>;
    setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult>;
    setLeverage(params: SetLeverageParams): Promise<SetLeverageResult>;
    getADLQuantileEstimation(params?: Partial<BasicSymbolParam>): Promise<any>;
    setIsolatedPositionMargin(params: SetIsolatedMarginParams): Promise<SetIsolatedMarginResult>;
    getPositionMarginChangeHistory(params: GetPositionMarginChangeHistoryParams): Promise<any>;
    getBalance(): Promise<FuturesCoinMAccountBalance[]>;
    getAccountComissionRate(params: BasicSymbolParam): Promise<UserCommissionRate>;
    getAccountCommissionRate(params: BasicSymbolParam): Promise<UserCommissionRate>;
    getAccountInformation(): Promise<FuturesCoinMAccountInformation>;
    getNotionalAndLeverageBrackets(params?: Partial<BasicSymbolParam>): Promise<SymbolLeverageBracketsResult[] | SymbolLeverageBracketsResult>;
    getCurrentPositionMode(): Promise<PositionModeResponse>;
    getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]>;
    getDownloadIdForFuturesTransactionHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesTransactionHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    getDownloadIdForFuturesOrderHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesOrderHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    getDownloadIdForFuturesTradeHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesTradeHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    getClassicPortfolioMarginAccount(params: {
        asset: string;
    }): Promise<ClassicPortfolioMarginAccount>;
    getClassicPortfolioMarginNotionalLimits(params?: GetClassicPortfolioMarginNotionalLimitParams): Promise<{
        notionalLimits: ClassicPortfolioMarginNotionalLimit[];
    }>;
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
