import { AxiosRequestConfig } from 'axios';

import {
  BasicSymbolPaginatedParams,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  GetOrderParams,
  OrderBookParams,
  HistoricalTradesParams,
  KlinesParams,
  Kline,
  RecentTradesParams,
  CancelOrderParams,
  CancelOCOParams,
  NewOCOParams,
  SymbolFromPaginatedRequestFromId,
  OrderIdProperty,
  GetAllOrdersParams,
  GenericCodeMsgError,
  SymbolPrice,
} from './types/shared';

import {
  ContinuousContractKlinesParams,
  IndexPriceKlinesParams,
  SymbolKlinePaginatedParams,
  FuturesDataPaginatedParams,
  MultiAssetsMode,
  NewFuturesOrderParams,
  CancelMultipleOrdersParams,
  CancelOrdersTimeoutParams,
  SetLeverageParams,
  SetMarginTypeParams,
  SetIsolatedMarginParams,
  GetPositionMarginChangeHistoryParams,
  GetIncomeHistoryParams,
  GetForceOrdersParams,
  FuturesExchangeInfo,
  FuturesOrderBook,
  RawFuturesTrade,
  AggregateFuturesTrade,
  FundingRateHistory,
  FuturesSymbolOrderBookTicker,
  OpenInterest,
  ModeChangeResult,
  PositionModeParams,
  PositionModeResponse,
  MultiAssetModeResponse,
  NewOrderResult,
  NewOrderError,
  OrderResult,
  CancelFuturesOrderResult,
  CancelAllOpenOrdersResult,
  FuturesAccountBalance,
  FuturesAccountInformation,
  SetLeverageResult,
  SetIsolatedMarginResult,
  FuturesPosition,
  FuturesPositionTrade,
  ForceOrderResult,
  SymbolLeverageBracketsResult,
  IncomeHistory,
  RebateDataOverview,
  SetCancelTimeoutResult,
  ChangeStats24hr,
  MarkPrice,
  HistoricOpenInterest,
  UserCommissionRate,
  ModifyFuturesOrderParams,
  ModifyFuturesOrderResult,
} from './types/futures';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';
import {
  CancelPortfolioCMConditionalOrderParams,
  CancelPortfolioCMOrderParams,
  CancelPortfolioMarginOCOParams,
  CancelPortfolioMarginOrderParams,
  CancelPortfolioUMConditionalOrderParams,
  CancelPortfolioUMOrderParams,
  ModifyPortfolioCMOrderParams,
  ModifyPortfolioUMOrderParams,
  NewPortfolioCMConditionalOrderParams,
  NewPortfolioCMOrderParams,
  NewPortfolioConditionalOrderParams,
  NewPortfolioMarginOCOParams,
  NewPortfolioMarginOrderParams,
  PortfolioCMCancelConditionalOrderResponse,
  PortfolioCMCancelOrderResponse,
  PortfolioCMConditionalOrderHistoryResponse,
  PortfolioCMConditionalOrderQueryResponse,
  PortfolioCMConditionalOrderResponse,
  PortfolioCMForceOrder,
  PortfolioCMModifyOrderResponse,
  PortfolioCMOpenConditionalOrderResponse,
  PortfolioCMOrderModificationHistory,
  PortfolioCMOrderQueryResponse,
  PortfolioCMOrderResponse,
  PortfolioCMTrade,
  PortfolioConditionalOrderResponse,
  PortfolioMarginCancelAllOrdersResponse,
  PortfolioMarginCancelOrderResponse,
  PortfolioMarginForceOrder,
  PortfolioMarginOCOCancelResponse,
  PortfolioMarginOCOResponse,
  PortfolioMarginOrderResponse,
  PortfolioUMCancelConditionalOrderResponse,
  PortfolioUMCancelOrderResponse,
  PortfolioUMConditionalOrderHistoryResponse,
  PortfolioUMConditionalOrderQueryResponse,
  PortfolioUMForceOrder,
  PortfolioUMModifyOrderResponse,
  PortfolioUMOpenConditionalOrderResponse,
  PortfolioUMOrderModificationHistory,
  PortfolioUMOrderQueryResponse,
  PortfolioUMTrade,
  QueryPortfolioAllCMConditionalOrdersParams,
  QueryPortfolioAllCMOrdersParams,
  QueryPortfolioAllUMConditionalOrdersParams,
  QueryPortfolioAllUMOrdersParams,
  QueryPortfolioAllUMOrdersResponse,
  QueryPortfolioCMConditionalOrderHistoryParams,
  QueryPortfolioCMForceOrdersParams,
  QueryPortfolioCMOpenOrderParams,
  QueryPortfolioCMOrderAmendmentParams,
  QueryPortfolioCMOrderParams,
  QueryPortfolioCMTradesParams,
  QueryPortfolioMarginForceOrdersParams,
  QueryPortfolioUMAllOpenOrdersResponse,
  QueryPortfolioUMConditionalOrderHistoryParams,
  QueryPortfolioUMForceOrdersParams,
  QueryPortfolioUMOpenConditionalOrderParams,
  QueryPortfolioUMOpenOrderParams,
  QueryPortfolioUMOrderAmendmentParams,
  QueryPortfolioUMOrderParams,
  QueryPortfolioUMTradesParams,
} from './types/portfolio-margin';

const PORTFOLIO_MARGIN_BASE_URL_KEY = 'papi';

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

  testConnectivity(): Promise<{}> {
    return this.get('papi/v1/ping');
  }

  /**
   *
   * DERIVATIVES -TRADE endpoints
   *
   **/

  submitNewUMOrder(params: NewFuturesOrderParams): Promise<NewOrderResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/um/order', params);
  }

  submitNewUMConditionalOrder(
    params: NewPortfolioConditionalOrderParams,
  ): Promise<PortfolioConditionalOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/um/conditional/order', params);
  }

  submitNewCMOrder(
    params: NewPortfolioCMOrderParams,
  ): Promise<PortfolioCMOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/cm/order', params);
  }

  submitNewCMConditionalOrder(
    params: NewPortfolioCMConditionalOrderParams,
  ): Promise<PortfolioCMConditionalOrderResponse> {
    this.validateOrderId(params, 'newClientStrategyId');
    return this.postPrivate('papi/v1/cm/conditional/order', params);
  }

  submitNewMarginOrder(
    params: NewPortfolioMarginOrderParams,
  ): Promise<PortfolioMarginOrderResponse> {
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
    params: NewPortfolioMarginOCOParams,
  ): Promise<PortfolioMarginOCOResponse> {
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    this.validateOrderId(params, 'listClientOrderId');
    return this.postPrivate('papi/v1/margin/order/oco', params);
  }

  cancelUMOrder(
    params: CancelPortfolioUMOrderParams,
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
    params: CancelPortfolioUMConditionalOrderParams,
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
    params: CancelPortfolioCMOrderParams,
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
    params: CancelPortfolioCMConditionalOrderParams,
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
    params: CancelPortfolioMarginOrderParams,
  ): Promise<PortfolioMarginCancelOrderResponse> {
    return this.deletePrivate('papi/v1/margin/order', params);
  }

  cancelMarginOCO(
    params: CancelPortfolioMarginOCOParams,
  ): Promise<PortfolioMarginOCOCancelResponse> {
    return this.deletePrivate('papi/v1/margin/orderList', params);
  }

  cancelAllMarginOrders(params: {
    symbol: string;
  }): Promise<PortfolioMarginCancelAllOrdersResponse[]> {
    return this.deletePrivate('papi/v1/margin/allOpenOrders', params);
  }

  modifyUMOrder(
    params: ModifyPortfolioUMOrderParams,
  ): Promise<PortfolioUMModifyOrderResponse> {
    return this.putPrivate('papi/v1/um/order', params);
  }

  modifyCMOrder(
    params: ModifyPortfolioCMOrderParams,
  ): Promise<PortfolioCMModifyOrderResponse> {
    return this.putPrivate('papi/v1/cm/order', params);
  }

  getUMOrder(
    params: QueryPortfolioUMOrderParams,
  ): Promise<PortfolioUMOrderQueryResponse> {
    return this.getPrivate('papi/v1/um/order', params);
  }

  getAllUMOrders(
    params: QueryPortfolioAllUMOrdersParams,
  ): Promise<QueryPortfolioAllUMOrdersResponse> {
    return this.getPrivate('papi/v1/um/allOrders', params);
  }

  getUMOpenOrder(
    params: QueryPortfolioUMOpenOrderParams,
  ): Promise<PortfolioUMOrderQueryResponse> {
    return this.getPrivate('papi/v1/um/openOrder', params);
  }

  getAllUMOpenOrders(params: {
    symbol?: string;
  }): Promise<QueryPortfolioUMAllOpenOrdersResponse> {
    return this.getPrivate('papi/v1/um/openOrders', params);
  }

  getAllUMConditionalOrders(
    params: QueryPortfolioAllUMConditionalOrdersParams,
  ): Promise<PortfolioUMConditionalOrderQueryResponse[]> {
    return this.getPrivate('papi/v1/um/conditional/allOrders', params);
  }

  getUMOpenConditionalOrders(params: {
    symbol?: string;
  }): Promise<PortfolioUMOpenConditionalOrderResponse> {
    return this.getPrivate('papi/v1/um/conditional/openOrders', params);
  }

  getUMOpenConditionalOrder(
    params: QueryPortfolioUMOpenConditionalOrderParams,
  ): Promise<PortfolioUMOpenConditionalOrderResponse> {
    return this.getPrivate('papi/v1/um/conditional/openOrder', params);
  }

  getUMConditionalOrderHistory(
    params: QueryPortfolioUMConditionalOrderHistoryParams,
  ): Promise<PortfolioUMConditionalOrderHistoryResponse> {
    return this.getPrivate('papi/v1/um/conditional/orderHistory', params);
  }

  getCMOrder(
    params: QueryPortfolioCMOrderParams,
  ): Promise<PortfolioCMOrderQueryResponse> {
    return this.getPrivate('papi/v1/cm/order', params);
  }

  getAllCMOrders(
    params: QueryPortfolioAllCMOrdersParams,
  ): Promise<PortfolioCMOrderQueryResponse[]> {
    return this.getPrivate('papi/v1/cm/allOrders', params);
  }

  getCMOpenOrder(
    params: QueryPortfolioCMOpenOrderParams,
  ): Promise<PortfolioCMOrderQueryResponse> {
    return this.getPrivate('papi/v1/cm/openOrder', params);
  }

  getAllCMOpenOrders(params: {
    symbol?: string;
    pair?: string;
  }): Promise<PortfolioCMOrderQueryResponse[]> {
    return this.getPrivate('papi/v1/cm/openOrders', params);
  }

  getCMOpenConditionalOrders(params: {
    symbol?: string;
  }): Promise<PortfolioCMOpenConditionalOrderResponse[]> {
    return this.getPrivate('papi/v1/cm/conditional/openOrders', params);
  }

  getCMOpenConditionalOrder(params: {
    symbol: string;
    strategyId?: number;
    newClientStrategyId?: string;
  }): Promise<PortfolioCMOpenConditionalOrderResponse> {
    return this.getPrivate('papi/v1/cm/conditional/openOrder', params);
  }

  getAllCMConditionalOrders(
    params: QueryPortfolioAllCMConditionalOrdersParams,
  ): Promise<PortfolioCMConditionalOrderQueryResponse[]> {
    return this.getPrivate('papi/v1/cm/conditional/allOrders', params);
  }

  getCMConditionalOrderHistory(
    params: QueryPortfolioCMConditionalOrderHistoryParams,
  ): Promise<PortfolioCMConditionalOrderHistoryResponse> {
    return this.getPrivate('papi/v1/cm/conditional/orderHistory', params);
  }

  getUMForceOrders(
    params: QueryPortfolioUMForceOrdersParams,
  ): Promise<PortfolioUMForceOrder[]> {
    return this.getPrivate('papi/v1/um/forceOrders', params);
  }

  getCMForceOrders(
    params: QueryPortfolioCMForceOrdersParams,
  ): Promise<PortfolioCMForceOrder[]> {
    return this.getPrivate('papi/v1/cm/forceOrders', params);
  }

  getUMOrderModificationHistory(
    params: QueryPortfolioUMOrderAmendmentParams,
  ): Promise<PortfolioUMOrderModificationHistory[]> {
    return this.getPrivate('papi/v1/um/orderAmendment', params);
  }

  getCMOrderModificationHistory(
    params: QueryPortfolioCMOrderAmendmentParams,
  ): Promise<PortfolioCMOrderModificationHistory[]> {
    return this.getPrivate('papi/v1/cm/orderAmendment', params);
  }

  getMarginForceOrders(params: QueryPortfolioMarginForceOrdersParams): Promise<{
    rows: PortfolioMarginForceOrder[];
    total: number;
  }> {
    return this.getPrivate('papi/v1/margin/forceOrders', params);
  }

  getUMTrades(
    params: QueryPortfolioUMTradesParams,
  ): Promise<PortfolioUMTrade[]> {
    return this.getPrivate('papi/v1/um/userTrades', params);
  }

  getCMTrades(
    params: QueryPortfolioCMTradesParams,
  ): Promise<PortfolioCMTrade[]> {
    return this.getPrivate('papi/v1/cm/userTrades', params);
  }

  /**
   *
   * DERIVATIVES - ACCOUNT endpoints
   *
   **/

  getBalance(params?: { asset?: string }): Promise<unknown[]> {
    return this.getPrivate('papi/v1/balance', params);
  }

  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(
    params:
      | NewFuturesOrderParams
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
  getPMUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('papi/v1/listenKey');
  }

  keepAlivePMUserDataListenKey(): Promise<{}> {
    return this.put('papi/v1/listenKey');
  }

  closePMUserDataListenKey(): Promise<{}> {
    return this.delete('papi/v1/listenKey');
  }
}
