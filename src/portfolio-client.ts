import { AxiosRequestConfig } from 'axios';

import {
  CancelPortfolioCMConditionalOrderReq,
  CancelPortfolioCMOrderReq,
  CancelPortfolioMarginOCOReq,
  CancelPortfolioMarginOrderReq,
  CancelPortfolioUMConditionalOrderReq,
  CancelPortfolioUMOrderReq,
  DownloadLinkResponse,
  GetMarginInterestHistoryReq,
  GetMarginLoanRecordsReq,
  GetMarginRepayRecordsReq,
  GetPortfolioInterestHistoryReq,
  ModifyPortfolioCMOrderReq,
  ModifyPortfolioUMOrderReq,
  NewPortfolioCMConditionalOrderReq,
  NewPortfolioCMConditionalOrderResponse,
  NewPortfolioCMOrderReq,
  NewPortfolioCMOrderResponse,
  NewPortfolioConditionalOrderResponse,
  NewPortfolioMarginOCOReq,
  NewPortfolioMarginOCOResponse,
  NewPortfolioMarginOrderReq,
  NewPortfolioMarginOrderResponse,
  NewPortfolioUMConditionalOrderReq,
  NewPortfolioUMOrderReq,
  NewPortfolioUMOrderResponse,
  PortfolioAccountInformation,
  PortfolioADLQuantile,
  PortfolioBalance,
  PortfolioCMAccountAsset,
  PortfolioCMAccountPosition,
  PortfolioCMCancelConditionalOrderResponse,
  PortfolioCMCancelOrderResponse,
  PortfolioCMConditionalHistoryOrder,
  PortfolioCMConditionalOrder,
  PortfolioCMForceOrder,
  PortfolioCMIncome,
  PortfolioCMLeverageBracket,
  PortfolioCMModifyOrderResponse,
  PortfolioCMOrder,
  PortfolioCMOrderModificationHistory,
  PortfolioCMPosition,
  PortfolioCMTrade,
  PortfolioMarginCancelAllOrdersResponse,
  PortfolioMarginCancelOrderResponse,
  PortfolioMarginForceOrder,
  PortfolioMarginInterestRecord,
  PortfolioMarginLoanRecord,
  PortfolioMarginOCO,
  PortfolioMarginOCOCancelResponse,
  PortfolioMarginOrder,
  PortfolioMarginRepayDebtReq,
  PortfolioMarginRepayDebtResponse,
  PortfolioMarginRepayRecord,
  PortfolioMarginTrade,
  PortfolioNegativeBalanceInterestRecord,
  PortfolioTradingStatus,
  PortfolioUMAccountAsset,
  PortfolioUMAccountAssetV2,
  PortfolioUMAccountConfig,
  PortfolioUMAccountPosition,
  PortfolioUMAccountPositionV2,
  PortfolioUMCancelConditionalOrderResponse,
  PortfolioUMCancelOrderResponse,
  PortfolioUMConditionalOrder,
  PortfolioUMForceOrder,
  PortfolioUMIncome,
  PortfolioUMLeverageBracket,
  PortfolioUMModifyOrderResponse,
  PortfolioUMOrder,
  PortfolioUMOrderModificationHistory,
  PortfolioUMPosition,
  PortfolioUMSymbolConfig,
  PortfolioUMTrade,
  QueryPortfolioAllCMConditionalOrdersReq,
  QueryPortfolioAllCMOrdersReq,
  QueryPortfolioAllUMConditionalOrdersReq,
  QueryPortfolioAllUMOrdersReq,
  QueryPortfolioCMConditionalOrderHistoryReq,
  QueryPortfolioCMForceOrdersReq,
  QueryPortfolioCMIncomeReq,
  QueryPortfolioCMOpenOrderReq,
  QueryPortfolioCMOrderAmendmentReq,
  QueryPortfolioCMOrderReq,
  QueryPortfolioCMTradesReq,
  QueryPortfolioMarginAllOCOReq,
  QueryPortfolioMarginAllOrdersReq,
  QueryPortfolioMarginForceOrdersReq,
  QueryPortfolioMarginOCOReq,
  QueryPortfolioMarginOrderReq,
  QueryPortfolioMarginTradesReq,
  QueryPortfolioUMConditionalOrderHistoryReq,
  QueryPortfolioUMForceOrdersReq,
  QueryPortfolioUMIncomeReq,
  QueryPortfolioUMOpenConditionalOrderReq,
  QueryPortfolioUMOpenOrderReq,
  QueryPortfolioUMOrderAmendmentReq,
  QueryPortfolioUMOrderReq,
  QueryPortfolioUMTradesReq,
} from './types/portfolio-margin';
import {
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  NewOCOParams,
  OrderIdProperty,
} from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

const PORTFOLIO_MARGIN_BASE_URL_KEY: BinanceBaseUrlKey = 'papi';

/**
 * REST client for Portfolio Margin APIs (papi)
 *
 * https://developers.binance.com/docs/derivatives/portfolio-margin/general-info
 */
export class PortfolioClient extends BaseRestClient {
  private clientId: BinanceBaseUrlKey = PORTFOLIO_MARGIN_BASE_URL_KEY;

  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(PORTFOLIO_MARGIN_BASE_URL_KEY, restClientOptions, requestOptions);

    this.clientId = this.getClientId();

    return this;
  }

  getClientId(): BinanceBaseUrlKey {
    return PORTFOLIO_MARGIN_BASE_URL_KEY;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(): Promise<number> {
    return this.get(getServerTimeEndpoint('usdm')).then(
      (response) => response.serverTime,
    );
  }

  /**
   *
   * Misc Endpoints
   *
   **/

  testConnectivity(): Promise<object> {
    return this.get('papi/v1/ping');
  }

  /**
   *
   * DERIVATIVES -TRADE endpoints
   *
   **/

  submitNewUMOrder(
    params: NewPortfolioUMOrderReq,
  ): Promise<NewPortfolioUMOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/um/order', params);
  }

  submitNewUMConditionalOrder(
    params: NewPortfolioUMConditionalOrderReq,
  ): Promise<NewPortfolioConditionalOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/um/conditional/order', params);
  }

  submitNewCMOrder(
    params: NewPortfolioCMOrderReq,
  ): Promise<NewPortfolioCMOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/cm/order', params);
  }

  submitNewCMConditionalOrder(
    params: NewPortfolioCMConditionalOrderReq,
  ): Promise<NewPortfolioCMConditionalOrderResponse> {
    this.validateOrderId(params, 'newClientStrategyId');
    return this.postPrivate('papi/v1/cm/conditional/order', params);
  }

  submitNewMarginOrder(
    params: NewPortfolioMarginOrderReq,
  ): Promise<NewPortfolioMarginOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/margin/order', params);
  }

  submitMarginLoan(params: { asset: string; amount: string }): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('papi/v1/marginLoan', params);
  }

  submitMarginRepay(params: { asset: string; amount: string }): Promise<{
    tranId: number;
  }> {
    return this.postPrivate('papi/v1/repayLoan', params);
  }

  submitNewMarginOCO(
    params: NewPortfolioMarginOCOReq,
  ): Promise<NewPortfolioMarginOCOResponse> {
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    this.validateOrderId(params, 'listClientOrderId');
    return this.postPrivate('papi/v1/margin/order/oco', params);
  }

  cancelUMOrder(
    params: CancelPortfolioUMOrderReq,
  ): Promise<PortfolioUMCancelOrderResponse> {
    return this.deletePrivate('papi/v1/um/order', params);
  }

  cancelAllUMOrders(params: { symbol: string }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.deletePrivate('papi/v1/um/allOpenOrders', params);
  }

  cancelUMConditionalOrder(
    params: CancelPortfolioUMConditionalOrderReq,
  ): Promise<PortfolioUMCancelConditionalOrderResponse> {
    return this.deletePrivate('papi/v1/um/conditional/order', params);
  }

  cancelAllUMConditionalOrders(params: { symbol: string }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.deletePrivate('papi/v1/um/conditional/allOpenOrders', params);
  }

  cancelCMOrder(
    params: CancelPortfolioCMOrderReq,
  ): Promise<PortfolioCMCancelOrderResponse> {
    return this.deletePrivate('papi/v1/cm/order', params);
  }

  cancelAllCMOrders(params: { symbol: string }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.deletePrivate('papi/v1/cm/allOpenOrders', params);
  }

  cancelCMConditionalOrder(
    params: CancelPortfolioCMConditionalOrderReq,
  ): Promise<PortfolioCMCancelConditionalOrderResponse> {
    return this.deletePrivate('papi/v1/cm/conditional/order', params);
  }

  cancelAllCMConditionalOrders(params: { symbol: string }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.deletePrivate('papi/v1/cm/conditional/allOpenOrders', params);
  }

  cancelMarginOrder(
    params: CancelPortfolioMarginOrderReq,
  ): Promise<PortfolioMarginCancelOrderResponse> {
    return this.deletePrivate('papi/v1/margin/order', params);
  }

  cancelMarginOCO(
    params: CancelPortfolioMarginOCOReq,
  ): Promise<PortfolioMarginOCOCancelResponse> {
    return this.deletePrivate('papi/v1/margin/orderList', params);
  }

  cancelAllMarginOrders(params: {
    symbol: string;
  }): Promise<PortfolioMarginCancelAllOrdersResponse[]> {
    return this.deletePrivate('papi/v1/margin/allOpenOrders', params);
  }

  modifyUMOrder(
    params: ModifyPortfolioUMOrderReq,
  ): Promise<PortfolioUMModifyOrderResponse> {
    return this.putPrivate('papi/v1/um/order', params);
  }

  modifyCMOrder(
    params: ModifyPortfolioCMOrderReq,
  ): Promise<PortfolioCMModifyOrderResponse> {
    return this.putPrivate('papi/v1/cm/order', params);
  }

  getUMOrder(params: QueryPortfolioUMOrderReq): Promise<PortfolioUMOrder> {
    return this.getPrivate('papi/v1/um/order', params);
  }

  getAllUMOrders(
    params: QueryPortfolioAllUMOrdersReq,
  ): Promise<PortfolioUMOrder[]> {
    return this.getPrivate('papi/v1/um/allOrders', params);
  }

  getUMOpenOrder(
    params: QueryPortfolioUMOpenOrderReq,
  ): Promise<PortfolioUMOrder> {
    return this.getPrivate('papi/v1/um/openOrder', params);
  }

  getAllUMOpenOrders(params: { symbol?: string }): Promise<PortfolioUMOrder[]> {
    return this.getPrivate('papi/v1/um/openOrders', params);
  }

  getAllUMConditionalOrders(
    params: QueryPortfolioAllUMConditionalOrdersReq,
  ): Promise<PortfolioUMConditionalOrder[]> {
    return this.getPrivate('papi/v1/um/conditional/allOrders', params);
  }

  getUMOpenConditionalOrders(params: {
    symbol?: string;
  }): Promise<PortfolioUMConditionalOrder[]> {
    return this.getPrivate('papi/v1/um/conditional/openOrders', params);
  }

  getUMOpenConditionalOrder(
    params: QueryPortfolioUMOpenConditionalOrderReq,
  ): Promise<PortfolioUMConditionalOrder> {
    return this.getPrivate('papi/v1/um/conditional/openOrder', params);
  }

  getUMConditionalOrderHistory(
    params: QueryPortfolioUMConditionalOrderHistoryReq,
  ): Promise<PortfolioUMConditionalOrder> {
    return this.getPrivate('papi/v1/um/conditional/orderHistory', params);
  }

  getCMOrder(params: QueryPortfolioCMOrderReq): Promise<PortfolioCMOrder> {
    return this.getPrivate('papi/v1/cm/order', params);
  }

  getAllCMOrders(
    params: QueryPortfolioAllCMOrdersReq,
  ): Promise<PortfolioCMOrder[]> {
    return this.getPrivate('papi/v1/cm/allOrders', params);
  }

  getCMOpenOrder(
    params: QueryPortfolioCMOpenOrderReq,
  ): Promise<PortfolioCMOrder> {
    return this.getPrivate('papi/v1/cm/openOrder', params);
  }

  getAllCMOpenOrders(params: {
    symbol?: string;
    pair?: string;
  }): Promise<PortfolioCMOrder[]> {
    return this.getPrivate('papi/v1/cm/openOrders', params);
  }

  getCMOpenConditionalOrders(params: {
    symbol?: string;
  }): Promise<PortfolioCMConditionalOrder[]> {
    return this.getPrivate('papi/v1/cm/conditional/openOrders', params);
  }

  getCMOpenConditionalOrder(params: {
    symbol: string;
    strategyId?: number;
    newClientStrategyId?: string;
  }): Promise<PortfolioCMConditionalOrder> {
    return this.getPrivate('papi/v1/cm/conditional/openOrder', params);
  }

  getAllCMConditionalOrders(
    params: QueryPortfolioAllCMConditionalOrdersReq,
  ): Promise<PortfolioCMConditionalOrder[]> {
    return this.getPrivate('papi/v1/cm/conditional/allOrders', params);
  }

  getCMConditionalOrderHistory(
    params: QueryPortfolioCMConditionalOrderHistoryReq,
  ): Promise<PortfolioCMConditionalHistoryOrder> {
    return this.getPrivate('papi/v1/cm/conditional/orderHistory', params);
  }

  getUMForceOrders(
    params: QueryPortfolioUMForceOrdersReq,
  ): Promise<PortfolioUMForceOrder[]> {
    return this.getPrivate('papi/v1/um/forceOrders', params);
  }

  getCMForceOrders(
    params: QueryPortfolioCMForceOrdersReq,
  ): Promise<PortfolioCMForceOrder[]> {
    return this.getPrivate('papi/v1/cm/forceOrders', params);
  }

  getUMOrderModificationHistory(
    params: QueryPortfolioUMOrderAmendmentReq,
  ): Promise<PortfolioUMOrderModificationHistory[]> {
    return this.getPrivate('papi/v1/um/orderAmendment', params);
  }

  getCMOrderModificationHistory(
    params: QueryPortfolioCMOrderAmendmentReq,
  ): Promise<PortfolioCMOrderModificationHistory[]> {
    return this.getPrivate('papi/v1/cm/orderAmendment', params);
  }

  getMarginForceOrders(params: QueryPortfolioMarginForceOrdersReq): Promise<{
    rows: PortfolioMarginForceOrder[];
    total: number;
  }> {
    return this.getPrivate('papi/v1/margin/forceOrders', params);
  }

  getUMTrades(params: QueryPortfolioUMTradesReq): Promise<PortfolioUMTrade[]> {
    return this.getPrivate('papi/v1/um/userTrades', params);
  }

  getCMTrades(params: QueryPortfolioCMTradesReq): Promise<PortfolioCMTrade[]> {
    return this.getPrivate('papi/v1/cm/userTrades', params);
  }

  getUMADLQuantile(params: { symbol?: string }): Promise<
    {
      symbol: string;
      adlQuantile: PortfolioADLQuantile;
    }[]
  > {
    return this.getPrivate('papi/v1/um/adlQuantile', params);
  }

  getCMADLQuantile(params: { symbol?: string }): Promise<
    {
      symbol: string;
      adlQuantile: PortfolioADLQuantile;
    }[]
  > {
    return this.getPrivate('papi/v1/cm/adlQuantile', params);
  }

  toggleUMFeeBurn(params: {
    feeBurn: 'true' | 'false'; // 'true': Fee Discount On; 'false': Fee Discount Off
  }): Promise<{ code: number; msg: string }> {
    return this.postPrivate('papi/v1/um/feeBurn', params);
  }

  getUMFeeBurnStatus(): Promise<{ feeBurn: boolean }> {
    return this.getPrivate('papi/v1/um/feeBurn');
  }

  getMarginOrder(
    params: QueryPortfolioMarginOrderReq,
  ): Promise<PortfolioMarginOrder> {
    return this.getPrivate('papi/v1/margin/order', params);
  }

  getMarginOpenOrders(params: {
    symbol: string;
  }): Promise<PortfolioMarginOrder> {
    return this.getPrivate('papi/v1/margin/openOrders', params);
  }

  getAllMarginOrders(
    params: QueryPortfolioMarginAllOrdersReq,
  ): Promise<PortfolioMarginOrder[]> {
    return this.getPrivate('papi/v1/margin/allOrders', params);
  }

  getMarginOCO(
    params: QueryPortfolioMarginOCOReq,
  ): Promise<PortfolioMarginOCO> {
    return this.getPrivate('papi/v1/margin/orderList', params);
  }

  getAllMarginOCO(
    params: QueryPortfolioMarginAllOCOReq,
  ): Promise<PortfolioMarginOCO[]> {
    return this.getPrivate('papi/v1/margin/allOrderList', params);
  }

  getMarginOpenOCO(): Promise<PortfolioMarginOCO[]> {
    return this.getPrivate('papi/v1/margin/openOrderList');
  }

  getMarginTrades(
    params: QueryPortfolioMarginTradesReq,
  ): Promise<PortfolioMarginTrade[]> {
    return this.getPrivate('papi/v1/margin/myTrades', params);
  }

  repayMarginDebt(
    params: PortfolioMarginRepayDebtReq,
  ): Promise<PortfolioMarginRepayDebtResponse> {
    return this.postPrivate('papi/v1/margin/repay-debt', params);
  }

  /**
   *
   * DERIVATIVES - ACCOUNT endpoints
   *
   **/

  getBalance(params?: { asset?: string }): Promise<PortfolioBalance> {
    return this.getPrivate('papi/v1/balance', params);
  }

  getAccountInfo(): Promise<PortfolioAccountInformation> {
    return this.getPrivate('papi/v1/account');
  }

  getMarginMaxBorrow(params: { asset: string }): Promise<{
    amount: string; // account's currently max borrowable amount with sufficient system availability
    borrowLimit: string; // max borrowable amount limited by the account level
  }> {
    return this.getPrivate('papi/v1/margin/maxBorrowable', params);
  }

  getMarginMaxWithdraw(params: { asset: string }): Promise<{
    amount: string; // max withdrawable amount
  }> {
    return this.getPrivate('papi/v1/margin/maxWithdraw', params);
  }

  getUMPosition(params?: { symbol?: string }): Promise<PortfolioUMPosition[]> {
    return this.getPrivate('papi/v1/um/positionRisk', params);
  }

  getCMPosition(params?: {
    marginAsset?: string;
    pair?: string;
  }): Promise<PortfolioCMPosition[]> {
    return this.getPrivate('papi/v1/cm/positionRisk', params);
  }

  updateUMLeverage(params: { symbol: string; leverage: number }): Promise<{
    leverage: number;
    maxNotionalValue: string;
    symbol: string;
  }> {
    return this.postPrivate('papi/v1/um/leverage', params);
  }

  updateCMLeverage(params: { symbol: string; leverage: number }): Promise<{
    leverage: number;
    maxQty: string;
    symbol: string;
  }> {
    return this.postPrivate('papi/v1/cm/leverage', params);
  }

  updateUMPositionMode(params: {
    dualSidePosition: 'true' | 'false';
  }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.postPrivate('papi/v1/um/positionSide/dual', params);
  }

  updateCMPositionMode(params: {
    dualSidePosition: 'true' | 'false';
  }): Promise<{
    code: number;
    msg: string;
  }> {
    return this.postPrivate('papi/v1/cm/positionSide/dual', params);
  }

  getUMPositionMode(): Promise<{
    dualSidePosition: boolean; // true: Hedge Mode; false: One-way Mode
  }> {
    return this.getPrivate('papi/v1/um/positionSide/dual');
  }

  getCMPositionMode(): Promise<{
    dualSidePosition: boolean; // true: Hedge Mode; false: One-way Mode
  }> {
    return this.getPrivate('papi/v1/cm/positionSide/dual');
  }

  getUMLeverageBrackets(params?: { symbol?: string }): Promise<
    {
      symbol: string;
      notionalCoef: string;
      brackets: PortfolioUMLeverageBracket[];
    }[]
  > {
    return this.getPrivate('papi/v1/um/leverageBracket', params);
  }

  getCMLeverageBrackets(params?: { symbol?: string }): Promise<
    {
      symbol: string;
      brackets: PortfolioCMLeverageBracket[];
    }[]
  > {
    return this.getPrivate('papi/v1/cm/leverageBracket', params);
  }

  getUMTradingStatus(params?: {
    symbol?: string;
  }): Promise<PortfolioTradingStatus> {
    return this.getPrivate('papi/v1/um/apiTradingStatus', params);
  }

  getUMCommissionRate(params: { symbol: string }): Promise<{
    symbol: string;
    makerCommissionRate: string; // e.g., "0.0002" for 0.02%
    takerCommissionRate: string; // e.g., "0.0004" for 0.04%
  }> {
    return this.getPrivate('papi/v1/um/commissionRate', params);
  }

  getCMCommissionRate(params: { symbol: string }): Promise<{
    symbol: string;
    makerCommissionRate: string; // e.g., "0.0002" for 0.02%
    takerCommissionRate: string; // e.g., "0.0004" for 0.04%
  }> {
    return this.getPrivate('papi/v1/cm/commissionRate', params);
  }

  getMarginLoanRecords(params: GetMarginLoanRecordsReq): Promise<{
    rows: PortfolioMarginLoanRecord[];
    total: number;
  }> {
    return this.getPrivate('papi/v1/margin/marginLoan', params);
  }

  getMarginRepayRecords(params: GetMarginRepayRecordsReq): Promise<{
    rows: PortfolioMarginRepayRecord[];
    total: number;
  }> {
    return this.getPrivate('papi/v1/margin/repayLoan', params);
  }

  getAutoRepayFuturesStatus(): Promise<{
    autoRepay: boolean; // true: auto-repay futures is on; false: auto-repay futures is off
  }> {
    return this.getPrivate('papi/v1/repay-futures-switch');
  }

  updateAutoRepayFuturesStatus(params: {
    autoRepay: 'true' | 'false';
  }): Promise<{
    msg: string;
  }> {
    return this.postPrivate('papi/v1/repay-futures-switch', params);
  }

  getMarginInterestHistory(params?: GetMarginInterestHistoryReq): Promise<{
    rows: PortfolioMarginInterestRecord[];
    total: number;
  }> {
    return this.getPrivate('papi/v1/margin/marginInterestHistory', params);
  }

  repayFuturesNegativeBalance(): Promise<{
    msg: string;
  }> {
    return this.postPrivate('papi/v1/repay-futures-negative-balance');
  }

  getPortfolioNegativeBalanceInterestHistory(
    params?: GetPortfolioInterestHistoryReq,
  ): Promise<PortfolioNegativeBalanceInterestRecord[]> {
    return this.getPrivate('papi/v1/portfolio/interest-history', params);
  }

  autoCollectFunds(): Promise<{
    msg: string;
  }> {
    return this.postPrivate('papi/v1/auto-collection');
  }

  transferAssetFuturesMargin(params: { asset: string }): Promise<{
    msg: string;
  }> {
    return this.postPrivate('papi/v1/asset-collection', params);
  }

  transferBNB(params: {
    amount: string;
    transferSide: 'TO_UM' | 'FROM_UM';
  }): Promise<{
    tranId: number; // transaction id
  }> {
    return this.postPrivate('papi/v1/bnb-transfer', params);
  }

  getUMIncomeHistory(
    params?: QueryPortfolioUMIncomeReq,
  ): Promise<PortfolioUMIncome[]> {
    return this.getPrivate('papi/v1/um/income', params);
  }

  getCMIncomeHistory(
    params?: QueryPortfolioCMIncomeReq,
  ): Promise<PortfolioCMIncome[]> {
    return this.getPrivate('papi/v1/cm/income', params);
  }

  getUMAccount(): Promise<{
    assets: PortfolioUMAccountAsset[];
    positions: PortfolioUMAccountPosition[]; // positions of all symbols in the market
  }> {
    return this.getPrivate('papi/v1/um/account');
  }

  getCMAccount(): Promise<{
    assets: PortfolioCMAccountAsset[];
    positions: PortfolioCMAccountPosition[];
  }> {
    return this.getPrivate('papi/v1/cm/account');
  }

  getUMAccountConfig(): Promise<PortfolioUMAccountConfig> {
    return this.getPrivate('papi/v1/um/accountConfig');
  }

  getUMSymbolConfig(params?: {
    symbol?: string;
  }): Promise<PortfolioUMSymbolConfig[]> {
    return this.getPrivate('papi/v1/um/symbolConfig', params);
  }

  getUMAccountV2(): Promise<{
    assets: PortfolioUMAccountAssetV2[];
    positions: PortfolioUMAccountPositionV2[]; // positions of all symbols in the market
  }> {
    return this.getPrivate('papi/v2/um/account');
  }

  getUMTradeHistoryDownloadId(params: {
    startTime: number; // Timestamp in ms
    endTime: number; // Timestamp in ms
  }): Promise<{
    avgCostTimestampOfLast30d: number; // Average time taken for data download in the past 30 days
    downloadId: string;
  }> {
    return this.getPrivate('papi/v1/um/trade/asyn', params);
  }

  getUMTradeDownloadLink(params: {
    downloadId: string;
  }): Promise<DownloadLinkResponse> {
    return this.getPrivate('papi/v1/um/trade/asyn/id', params);
  }

  getUMOrderHistoryDownloadId(params: {
    startTime: number; // Timestamp in ms
    endTime: number; // Timestamp in ms
  }): Promise<{
    avgCostTimestampOfLast30d: number; // Average time taken for data download in the past 30 days
    downloadId: string;
  }> {
    return this.getPrivate('papi/v1/um/order/asyn', params);
  }

  getUMOrderDownloadLink(params: {
    downloadId: string;
  }): Promise<DownloadLinkResponse> {
    return this.getPrivate('papi/v1/um/order/asyn/id', params);
  }

  getUMTransactionHistoryDownloadId(params: {
    startTime: number; // Timestamp in ms
    endTime: number; // Timestamp in ms
  }): Promise<{
    avgCostTimestampOfLast30d: number; // Average time taken for data download in the past 30 days
    downloadId: string;
  }> {
    return this.getPrivate('papi/v1/um/income/asyn', params);
  }

  getUMTransactionDownloadLink(params: {
    downloadId: string;
  }): Promise<DownloadLinkResponse> {
    return this.getPrivate('papi/v1/um/income/asyn/id', params);
  }

  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(
    params:
      | NewPortfolioUMOrderReq
      | CancelOrderParams
      | NewOCOParams
      | CancelOCOParams,
    orderIdProperty: OrderIdProperty,
  ): void {
    const apiCategory = this.clientId;

    if (!params[orderIdProperty]) {
      params[orderIdProperty] = generateNewOrderId(apiCategory);
      return;
    }

    const expectedOrderIdPrefix1 = `x-${getOrderIdPrefix(apiCategory, 'v1')}`;
    const expectedOrderIdPrefix2 = `x-${getOrderIdPrefix(apiCategory, 'v2')}`;
    if (
      !params[orderIdProperty].startsWith(expectedOrderIdPrefix1) ||
      !params[orderIdProperty].startsWith(expectedOrderIdPrefix2)
    ) {
      logInvalidOrderId(orderIdProperty, expectedOrderIdPrefix2, params);
    }
  }

  /**
   *
   * User Data Stream Endpoints
   *
   **/
  getPMUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('papi/v1/listenKey');
  }

  keepAlivePMUserDataListenKey(): Promise<object> {
    return this.put('papi/v1/listenKey');
  }

  closePMUserDataListenKey(): Promise<object> {
    return this.delete('papi/v1/listenKey');
  }
}
