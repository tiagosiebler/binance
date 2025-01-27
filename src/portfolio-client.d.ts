import { AxiosRequestConfig } from 'axios';
import { CancelPortfolioCMConditionalOrderReq, CancelPortfolioCMOrderReq, CancelPortfolioMarginOCOReq, CancelPortfolioMarginOrderReq, CancelPortfolioUMConditionalOrderReq, CancelPortfolioUMOrderReq, DownloadLinkResponse, GetMarginInterestHistoryReq, GetMarginLoanRecordsReq, GetMarginRepayRecordsReq, GetPortfolioInterestHistoryReq, ModifyPortfolioCMOrderReq, ModifyPortfolioUMOrderReq, NewPortfolioCMConditionalOrderReq, NewPortfolioCMConditionalOrderResponse, NewPortfolioCMOrderReq, NewPortfolioCMOrderResponse, NewPortfolioConditionalOrderResponse, NewPortfolioMarginOCOReq, NewPortfolioMarginOCOResponse, NewPortfolioMarginOrderReq, NewPortfolioMarginOrderResponse, NewPortfolioUMConditionalOrderReq, NewPortfolioUMOrderReq, NewPortfolioUMOrderResponse, PortfolioAccountInformation, PortfolioADLQuantile, PortfolioBalance, PortfolioCMAccountAsset, PortfolioCMAccountPosition, PortfolioCMCancelConditionalOrderResponse, PortfolioCMCancelOrderResponse, PortfolioCMConditionalHistoryOrder, PortfolioCMConditionalOrder, PortfolioCMForceOrder, PortfolioCMIncome, PortfolioCMLeverageBracket, PortfolioCMModifyOrderResponse, PortfolioCMOrder, PortfolioCMOrderModificationHistory, PortfolioCMPosition, PortfolioCMTrade, PortfolioMarginCancelAllOrdersResponse, PortfolioMarginCancelOrderResponse, PortfolioMarginForceOrder, PortfolioMarginInterestRecord, PortfolioMarginLoanRecord, PortfolioMarginOCO, PortfolioMarginOCOCancelResponse, PortfolioMarginOrder, PortfolioMarginRepayDebtReq, PortfolioMarginRepayDebtResponse, PortfolioMarginRepayRecord, PortfolioMarginTrade, PortfolioNegativeBalanceInterestRecord, PortfolioTradingStatus, PortfolioUMAccountAsset, PortfolioUMAccountAssetV2, PortfolioUMAccountConfig, PortfolioUMAccountPosition, PortfolioUMAccountPositionV2, PortfolioUMCancelConditionalOrderResponse, PortfolioUMCancelOrderResponse, PortfolioUMConditionalOrder, PortfolioUMForceOrder, PortfolioUMIncome, PortfolioUMLeverageBracket, PortfolioUMModifyOrderResponse, PortfolioUMOrder, PortfolioUMOrderModificationHistory, PortfolioUMPosition, PortfolioUMSymbolConfig, PortfolioUMTrade, QueryPortfolioAllCMConditionalOrdersReq, QueryPortfolioAllCMOrdersReq, QueryPortfolioAllUMConditionalOrdersReq, QueryPortfolioAllUMOrdersReq, QueryPortfolioCMConditionalOrderHistoryReq, QueryPortfolioCMForceOrdersReq, QueryPortfolioCMIncomeReq, QueryPortfolioCMOpenOrderReq, QueryPortfolioCMOrderAmendmentReq, QueryPortfolioCMOrderReq, QueryPortfolioCMTradesReq, QueryPortfolioMarginAllOCOReq, QueryPortfolioMarginAllOrdersReq, QueryPortfolioMarginForceOrdersReq, QueryPortfolioMarginOCOReq, QueryPortfolioMarginOrderReq, QueryPortfolioMarginTradesReq, QueryPortfolioUMConditionalOrderHistoryReq, QueryPortfolioUMForceOrdersReq, QueryPortfolioUMIncomeReq, QueryPortfolioUMOpenConditionalOrderReq, QueryPortfolioUMOpenOrderReq, QueryPortfolioUMOrderAmendmentReq, QueryPortfolioUMOrderReq, QueryPortfolioUMTradesReq } from './types/portfolio-margin';
import { BinanceBaseUrlKey } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class PortfolioClient extends BaseRestClient {
    private clientId;
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig);
    getClientId(): BinanceBaseUrlKey;
    getServerTime(): Promise<number>;
    testConnectivity(): Promise<object>;
    submitNewUMOrder(params: NewPortfolioUMOrderReq): Promise<NewPortfolioUMOrderResponse>;
    submitNewUMConditionalOrder(params: NewPortfolioUMConditionalOrderReq): Promise<NewPortfolioConditionalOrderResponse>;
    submitNewCMOrder(params: NewPortfolioCMOrderReq): Promise<NewPortfolioCMOrderResponse>;
    submitNewCMConditionalOrder(params: NewPortfolioCMConditionalOrderReq): Promise<NewPortfolioCMConditionalOrderResponse>;
    submitNewMarginOrder(params: NewPortfolioMarginOrderReq): Promise<NewPortfolioMarginOrderResponse>;
    submitMarginLoan(params: {
        asset: string;
        amount: string;
    }): Promise<{
        tranId: number;
    }>;
    submitMarginRepay(params: {
        asset: string;
        amount: string;
    }): Promise<{
        tranId: number;
    }>;
    submitNewMarginOCO(params: NewPortfolioMarginOCOReq): Promise<NewPortfolioMarginOCOResponse>;
    cancelUMOrder(params: CancelPortfolioUMOrderReq): Promise<PortfolioUMCancelOrderResponse>;
    cancelAllUMOrders(params: {
        symbol: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
    cancelUMConditionalOrder(params: CancelPortfolioUMConditionalOrderReq): Promise<PortfolioUMCancelConditionalOrderResponse>;
    cancelAllUMConditionalOrders(params: {
        symbol: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
    cancelCMOrder(params: CancelPortfolioCMOrderReq): Promise<PortfolioCMCancelOrderResponse>;
    cancelAllCMOrders(params: {
        symbol: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
    cancelCMConditionalOrder(params: CancelPortfolioCMConditionalOrderReq): Promise<PortfolioCMCancelConditionalOrderResponse>;
    cancelAllCMConditionalOrders(params: {
        symbol: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
    cancelMarginOrder(params: CancelPortfolioMarginOrderReq): Promise<PortfolioMarginCancelOrderResponse>;
    cancelMarginOCO(params: CancelPortfolioMarginOCOReq): Promise<PortfolioMarginOCOCancelResponse>;
    cancelAllMarginOrders(params: {
        symbol: string;
    }): Promise<PortfolioMarginCancelAllOrdersResponse[]>;
    modifyUMOrder(params: ModifyPortfolioUMOrderReq): Promise<PortfolioUMModifyOrderResponse>;
    modifyCMOrder(params: ModifyPortfolioCMOrderReq): Promise<PortfolioCMModifyOrderResponse>;
    getUMOrder(params: QueryPortfolioUMOrderReq): Promise<PortfolioUMOrder>;
    getAllUMOrders(params: QueryPortfolioAllUMOrdersReq): Promise<PortfolioUMOrder[]>;
    getUMOpenOrder(params: QueryPortfolioUMOpenOrderReq): Promise<PortfolioUMOrder>;
    getAllUMOpenOrders(params: {
        symbol?: string;
    }): Promise<PortfolioUMOrder[]>;
    getAllUMConditionalOrders(params: QueryPortfolioAllUMConditionalOrdersReq): Promise<PortfolioUMConditionalOrder[]>;
    getUMOpenConditionalOrders(params: {
        symbol?: string;
    }): Promise<PortfolioUMConditionalOrder[]>;
    getUMOpenConditionalOrder(params: QueryPortfolioUMOpenConditionalOrderReq): Promise<PortfolioUMConditionalOrder>;
    getUMConditionalOrderHistory(params: QueryPortfolioUMConditionalOrderHistoryReq): Promise<PortfolioUMConditionalOrder>;
    getCMOrder(params: QueryPortfolioCMOrderReq): Promise<PortfolioCMOrder>;
    getAllCMOrders(params: QueryPortfolioAllCMOrdersReq): Promise<PortfolioCMOrder[]>;
    getCMOpenOrder(params: QueryPortfolioCMOpenOrderReq): Promise<PortfolioCMOrder>;
    getAllCMOpenOrders(params: {
        symbol?: string;
        pair?: string;
    }): Promise<PortfolioCMOrder[]>;
    getCMOpenConditionalOrders(params: {
        symbol?: string;
    }): Promise<PortfolioCMConditionalOrder[]>;
    getCMOpenConditionalOrder(params: {
        symbol: string;
        strategyId?: number;
        newClientStrategyId?: string;
    }): Promise<PortfolioCMConditionalOrder>;
    getAllCMConditionalOrders(params: QueryPortfolioAllCMConditionalOrdersReq): Promise<PortfolioCMConditionalOrder[]>;
    getCMConditionalOrderHistory(params: QueryPortfolioCMConditionalOrderHistoryReq): Promise<PortfolioCMConditionalHistoryOrder>;
    getUMForceOrders(params: QueryPortfolioUMForceOrdersReq): Promise<PortfolioUMForceOrder[]>;
    getCMForceOrders(params: QueryPortfolioCMForceOrdersReq): Promise<PortfolioCMForceOrder[]>;
    getUMOrderModificationHistory(params: QueryPortfolioUMOrderAmendmentReq): Promise<PortfolioUMOrderModificationHistory[]>;
    getCMOrderModificationHistory(params: QueryPortfolioCMOrderAmendmentReq): Promise<PortfolioCMOrderModificationHistory[]>;
    getMarginForceOrders(params: QueryPortfolioMarginForceOrdersReq): Promise<{
        rows: PortfolioMarginForceOrder[];
        total: number;
    }>;
    getUMTrades(params: QueryPortfolioUMTradesReq): Promise<PortfolioUMTrade[]>;
    getCMTrades(params: QueryPortfolioCMTradesReq): Promise<PortfolioCMTrade[]>;
    getUMADLQuantile(params: {
        symbol?: string;
    }): Promise<{
        symbol: string;
        adlQuantile: PortfolioADLQuantile;
    }[]>;
    getCMADLQuantile(params: {
        symbol?: string;
    }): Promise<{
        symbol: string;
        adlQuantile: PortfolioADLQuantile;
    }[]>;
    toggleUMFeeBurn(params: {
        feeBurn: 'true' | 'false';
    }): Promise<{
        code: number;
        msg: string;
    }>;
    getUMFeeBurnStatus(): Promise<{
        feeBurn: boolean;
    }>;
    getMarginOrder(params: QueryPortfolioMarginOrderReq): Promise<PortfolioMarginOrder>;
    getMarginOpenOrders(params: {
        symbol: string;
    }): Promise<PortfolioMarginOrder>;
    getAllMarginOrders(params: QueryPortfolioMarginAllOrdersReq): Promise<PortfolioMarginOrder[]>;
    getMarginOCO(params: QueryPortfolioMarginOCOReq): Promise<PortfolioMarginOCO>;
    getAllMarginOCO(params: QueryPortfolioMarginAllOCOReq): Promise<PortfolioMarginOCO[]>;
    getMarginOpenOCO(): Promise<PortfolioMarginOCO[]>;
    getMarginTrades(params: QueryPortfolioMarginTradesReq): Promise<PortfolioMarginTrade[]>;
    repayMarginDebt(params: PortfolioMarginRepayDebtReq): Promise<PortfolioMarginRepayDebtResponse>;
    getBalance(params?: {
        asset?: string;
    }): Promise<PortfolioBalance>;
    getAccountInfo(): Promise<PortfolioAccountInformation>;
    getMarginMaxBorrow(params: {
        asset: string;
    }): Promise<{
        amount: string;
        borrowLimit: string;
    }>;
    getMarginMaxWithdraw(params: {
        asset: string;
    }): Promise<{
        amount: string;
    }>;
    getUMPosition(params?: {
        symbol?: string;
    }): Promise<PortfolioUMPosition[]>;
    getCMPosition(params?: {
        marginAsset?: string;
        pair?: string;
    }): Promise<PortfolioCMPosition[]>;
    updateUMLeverage(params: {
        symbol: string;
        leverage: number;
    }): Promise<{
        leverage: number;
        maxNotionalValue: string;
        symbol: string;
    }>;
    updateCMLeverage(params: {
        symbol: string;
        leverage: number;
    }): Promise<{
        leverage: number;
        maxQty: string;
        symbol: string;
    }>;
    updateUMPositionMode(params: {
        dualSidePosition: 'true' | 'false';
    }): Promise<{
        code: number;
        msg: string;
    }>;
    updateCMPositionMode(params: {
        dualSidePosition: 'true' | 'false';
    }): Promise<{
        code: number;
        msg: string;
    }>;
    getUMPositionMode(): Promise<{
        dualSidePosition: boolean;
    }>;
    getCMPositionMode(): Promise<{
        dualSidePosition: boolean;
    }>;
    getUMLeverageBrackets(params?: {
        symbol?: string;
    }): Promise<{
        symbol: string;
        notionalCoef: string;
        brackets: PortfolioUMLeverageBracket[];
    }[]>;
    getCMLeverageBrackets(params?: {
        symbol?: string;
    }): Promise<{
        symbol: string;
        brackets: PortfolioCMLeverageBracket[];
    }[]>;
    getUMTradingStatus(params?: {
        symbol?: string;
    }): Promise<PortfolioTradingStatus>;
    getUMCommissionRate(params: {
        symbol: string;
    }): Promise<{
        symbol: string;
        makerCommissionRate: string;
        takerCommissionRate: string;
    }>;
    getCMCommissionRate(params: {
        symbol: string;
    }): Promise<{
        symbol: string;
        makerCommissionRate: string;
        takerCommissionRate: string;
    }>;
    getMarginLoanRecords(params: GetMarginLoanRecordsReq): Promise<{
        rows: PortfolioMarginLoanRecord[];
        total: number;
    }>;
    getMarginRepayRecords(params: GetMarginRepayRecordsReq): Promise<{
        rows: PortfolioMarginRepayRecord[];
        total: number;
    }>;
    getAutoRepayFuturesStatus(): Promise<{
        autoRepay: boolean;
    }>;
    updateAutoRepayFuturesStatus(params: {
        autoRepay: 'true' | 'false';
    }): Promise<{
        msg: string;
    }>;
    getMarginInterestHistory(params?: GetMarginInterestHistoryReq): Promise<{
        rows: PortfolioMarginInterestRecord[];
        total: number;
    }>;
    repayFuturesNegativeBalance(): Promise<{
        msg: string;
    }>;
    getPortfolioNegativeBalanceInterestHistory(params?: GetPortfolioInterestHistoryReq): Promise<PortfolioNegativeBalanceInterestRecord[]>;
    autoCollectFunds(): Promise<{
        msg: string;
    }>;
    transferAssetFuturesMargin(params: {
        asset: string;
    }): Promise<{
        msg: string;
    }>;
    transferBNB(params: {
        amount: string;
        transferSide: 'TO_UM' | 'FROM_UM';
    }): Promise<{
        tranId: number;
    }>;
    getUMIncomeHistory(params?: QueryPortfolioUMIncomeReq): Promise<PortfolioUMIncome[]>;
    getCMIncomeHistory(params?: QueryPortfolioCMIncomeReq): Promise<PortfolioCMIncome[]>;
    getUMAccount(): Promise<{
        assets: PortfolioUMAccountAsset[];
        positions: PortfolioUMAccountPosition[];
    }>;
    getCMAccount(): Promise<{
        assets: PortfolioCMAccountAsset[];
        positions: PortfolioCMAccountPosition[];
    }>;
    getUMAccountConfig(): Promise<PortfolioUMAccountConfig>;
    getUMSymbolConfig(params?: {
        symbol?: string;
    }): Promise<PortfolioUMSymbolConfig[]>;
    getUMAccountV2(): Promise<{
        assets: PortfolioUMAccountAssetV2[];
        positions: PortfolioUMAccountPositionV2[];
    }>;
    getUMTradeHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getUMTradeDownloadLink(params: {
        downloadId: string;
    }): Promise<DownloadLinkResponse>;
    getUMOrderHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getUMOrderDownloadLink(params: {
        downloadId: string;
    }): Promise<DownloadLinkResponse>;
    getUMTransactionHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getUMTransactionDownloadLink(params: {
        downloadId: string;
    }): Promise<DownloadLinkResponse>;
    private validateOrderId;
    getPMUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAlivePMUserDataListenKey(): Promise<object>;
    closePMUserDataListenKey(): Promise<object>;
}
