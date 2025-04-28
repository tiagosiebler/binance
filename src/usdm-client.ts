import { AxiosRequestConfig } from 'axios';

import { FundingRate } from './types/coin';
import {
  AggregateFuturesTrade,
  Basis,
  BasisParams,
  CancelAllOpenOrdersResult,
  CancelFuturesOrderResult,
  CancelMultipleOrdersParams,
  CancelOrdersTimeoutParams,
  ChangeStats24hr,
  ContinuousContractKlinesParams,
  ForceOrderResult,
  FundingRateHistory,
  FuturesAccountBalance,
  FuturesAccountConfig,
  FuturesAccountInformation,
  FuturesConvertOrderStatus,
  FuturesConvertPair,
  FuturesConvertQuote,
  FuturesConvertQuoteRequest,
  FuturesDataPaginatedParams,
  FuturesExchangeInfo,
  FuturesOrderBook,
  FuturesPosition,
  FuturesPositionTrade,
  FuturesPositionV3,
  FuturesSymbolOrderBookTicker,
  FuturesTradeHistoryDownloadId,
  FuturesTransactionDownloadLink,
  GetForceOrdersParams,
  GetFuturesOrderModifyHistoryParams,
  GetIncomeHistoryParams,
  GetPositionMarginChangeHistoryParams,
  HistoricOpenInterest,
  IncomeHistory,
  IndexPriceConstituents,
  IndexPriceKlinesParams,
  InsuranceFundBalance,
  MarkPrice,
  ModeChangeResult,
  ModifyFuturesOrderParams,
  ModifyFuturesOrderResult,
  ModifyOrderParams,
  MultiAssetModeResponse,
  MultiAssetsMode,
  NewFuturesOrderParams,
  NewOrderError,
  NewOrderResult,
  OpenInterest,
  OrderResult,
  PortfolioMarginProAccountInfo,
  PositionModeParams,
  PositionModeResponse,
  QuarterlyContractSettlementPrice,
  RawFuturesTrade,
  RebateDataOverview,
  SetCancelTimeoutResult,
  SetIsolatedMarginParams,
  SetIsolatedMarginResult,
  SetLeverageParams,
  SetLeverageResult,
  SetMarginTypeParams,
  SymbolConfig,
  SymbolKlinePaginatedParams,
  SymbolLeverageBracketsResult,
  UserCommissionRate,
  UserForceOrder,
} from './types/futures';
import {
  BasicSymbolPaginatedParams,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  GenericCodeMsgError,
  GetAllOrdersParams,
  GetOrderParams,
  HistoricalTradesParams,
  Kline,
  KlinesParams,
  NewOCOParams,
  numberInString,
  OrderBookParams,
  OrderIdProperty,
  RecentTradesParams,
  SymbolFromPaginatedRequestFromId,
  SymbolPrice,
} from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

export class USDMClient extends BaseRestClient {
  private clientId: BinanceBaseUrlKey;

  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
    useTestnet?: boolean,
  ) {
    const clientId = useTestnet ? 'usdmtest' : 'usdm';
    super(clientId, restClientOptions, requestOptions);

    this.clientId = clientId;
    return this;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(): Promise<number> {
    return this.get(getServerTimeEndpoint(this.clientId)).then(
      (response) => response.serverTime,
    );
  }

  /**
   *
   * MARKET DATA endpoints - Rest API
   *
   **/

  testConnectivity(): Promise<object> {
    return this.get('fapi/v1/ping');
  }

  getExchangeInfo(): Promise<FuturesExchangeInfo> {
    return this.get('fapi/v1/exchangeInfo');
  }

  getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook> {
    return this.get('fapi/v1/depth', params);
  }

  getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]> {
    return this.get('fapi/v1/trades', params);
  }

  getHistoricalTrades(
    params: HistoricalTradesParams,
  ): Promise<RawFuturesTrade[]> {
    return this.get('fapi/v1/historicalTrades', params);
  }

  getAggregateTrades(
    params: SymbolFromPaginatedRequestFromId,
  ): Promise<AggregateFuturesTrade[]> {
    return this.get('fapi/v1/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('fapi/v1/klines', params);
  }

  getContinuousContractKlines(
    params: ContinuousContractKlinesParams,
  ): Promise<Kline[]> {
    return this.get('fapi/v1/continuousKlines', params);
  }

  getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]> {
    return this.get('fapi/v1/indexPriceKlines', params);
  }

  getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]> {
    return this.get('fapi/v1/markPriceKlines', params);
  }

  getPremiumIndexKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]> {
    return this.get('fapi/v1/premiumIndexKlines', params);
  }

  getMarkPrice(params: { symbol: string }): Promise<MarkPrice>;

  getMarkPrice(): Promise<MarkPrice[]>;

  getMarkPrice(params?: { symbol?: string }): Promise<MarkPrice | MarkPrice[]> {
    return this.get('fapi/v1/premiumIndex', params);
  }

  getFundingRateHistory(
    params?: Partial<BasicSymbolPaginatedParams>,
  ): Promise<FundingRateHistory[]> {
    return this.get('fapi/v1/fundingRate', params);
  }

  getFundingRates(): Promise<FundingRate[]> {
    return this.get('fapi/v1/fundingInfo');
  }

  /**
   * @deprecated use get24hrChangeStatistics() instead (method without the typo)
   */
  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get('fapi/v1/ticker/24hr', params);
  }

  get24hrChangeStatistics(params: { symbol: string }): Promise<ChangeStats24hr>;

  get24hrChangeStatistics(): Promise<ChangeStats24hr[]>;

  get24hrChangeStatistics(params?: {
    symbol?: string;
  }): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get('fapi/v1/ticker/24hr', params);
  }

  getSymbolPriceTicker(params: { symbol: string }): Promise<SymbolPrice>;

  getSymbolPriceTicker(): Promise<SymbolPrice[]>;

  getSymbolPriceTicker(params?: {
    symbol?: string;
  }): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('fapi/v1/ticker/price', params);
  }

  getSymbolPriceTickerV2(params: { symbol: string }): Promise<SymbolPrice>;

  getSymbolPriceTickerV2(): Promise<SymbolPrice[]>;

  getSymbolPriceTickerV2(params?: {
    symbol?: string;
  }): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('fapi/v2/ticker/price', params);
  }

  getSymbolOrderBookTicker(params: {
    symbol: string;
  }): Promise<FuturesSymbolOrderBookTicker>;

  getSymbolOrderBookTicker(): Promise<FuturesSymbolOrderBookTicker[]>;

  getSymbolOrderBookTicker(params?: {
    symbol?: string;
  }): Promise<FuturesSymbolOrderBookTicker | FuturesSymbolOrderBookTicker[]> {
    return this.get('fapi/v1/ticker/bookTicker', params);
  }

  getQuarterlyContractSettlementPrices(params: {
    pair: string;
  }): Promise<QuarterlyContractSettlementPrice[]> {
    return this.get('futures/data/delivery-price', params);
  }

  getOpenInterest(params: { symbol: string }): Promise<OpenInterest> {
    return this.get('fapi/v1/openInterest', params);
  }

  getOpenInterestStatistics(
    params: FuturesDataPaginatedParams,
  ): Promise<HistoricOpenInterest[]> {
    return this.get('futures/data/openInterestHist', params);
  }

  getTopTradersLongShortPositionRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/topLongShortPositionRatio', params);
  }

  getTopTradersLongShortAccountRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/topLongShortAccountRatio', params);
  }

  getGlobalLongShortAccountRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/globalLongShortAccountRatio', params);
  }

  getTakerBuySellVolume(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/takerlongshortRatio', params);
  }

  getHistoricalBlvtNavKlines(params: SymbolKlinePaginatedParams): Promise<any> {
    return this.get('fapi/v1/lvtKlines', params);
  }

  getCompositeSymbolIndex(params?: { symbol?: string }): Promise<any> {
    return this.get('fapi/v1/indexInfo', params);
  }

  getMultiAssetsModeAssetIndex(params?: { symbol?: string }): Promise<any> {
    return this.get('fapi/v1/assetIndex', params);
  }

  /**
   * Possibly @deprecated, found only in old docs
   **/
  getBasis(params: BasisParams): Promise<Basis[]> {
    return this.get('futures/data/basis', params);
  }

  getIndexPriceConstituents(params: {
    symbol: string;
  }): Promise<IndexPriceConstituents> {
    return this.get('fapi/v1/constituents', params);
  }

  getInsuranceFundBalance(params?: {
    symbol?: string;
  }): Promise<InsuranceFundBalance | InsuranceFundBalance[]> {
    return this.get('fapi/v1/insuranceBalance', params);
  }

  /**
   *
   * TRADE endpoints - Rest API
   *
   **/

  submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('fapi/v1/order', params);
  }

  /**
   * Warning: max 5 orders at a time! This method does not throw, instead it returns
   * individual errors in the response array if any orders were rejected.
   *
   * Note: this method will automatically ensure "price" and "quantity" are sent as a
   * string, if present in the request. See #523 & #526 for more details.
   */
  submitMultipleOrders<TNumberType = numberInString>(
    orders: NewFuturesOrderParams<TNumberType>[],
  ): Promise<(NewOrderResult | NewOrderError)[]> {
    const stringOrders = orders.map((order) => {
      const orderToStringify = { ...order };

      // Known issue: `quantity` and `price` should be sent as strings, see #523, #526
      const price = orderToStringify['price'];
      if (price && typeof price == 'number') {
        orderToStringify['price'] = `${price}` as TNumberType;
      }

      const quantity = orderToStringify['quantity'];
      if (quantity && typeof quantity == 'number') {
        orderToStringify['quantity'] = `${quantity}` as TNumberType;
      }

      this.validateOrderId(orderToStringify, 'newClientOrderId');
      return JSON.stringify(orderToStringify);
    });
    const requestBody = {
      batchOrders: `[${stringOrders.join(',')}]`,
    };
    return this.postPrivate('fapi/v1/batchOrders', requestBody);
  }

  /**
   * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
   */
  modifyOrder(
    params: ModifyFuturesOrderParams,
  ): Promise<ModifyFuturesOrderResult> {
    return this.putPrivate('fapi/v1/order', params);
  }

  modifyMultipleOrders(orders: ModifyOrderParams[]): Promise<any> {
    const stringOrders = orders.map((order) => JSON.stringify(order));
    const requestBody = {
      batchOrders: `[${stringOrders.join(',')}]`,
    };
    return this.putPrivate('fapi/v1/batchOrders', requestBody);
  }

  getOrderModifyHistory(
    params: GetFuturesOrderModifyHistoryParams,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/orderAmendment', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult> {
    return this.deletePrivate('fapi/v1/order', params);
  }

  cancelMultipleOrders(
    params: CancelMultipleOrdersParams,
  ): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]> {
    const requestParams: object = {
      ...params,
    };

    if (params.orderIdList) {
      requestParams['orderIdList'] = JSON.stringify(params.orderIdList);
    }

    if (params.origClientOrderIdList) {
      requestParams['origClientOrderIdList'] = JSON.stringify(
        params.origClientOrderIdList,
      );
    }

    return this.deletePrivate('fapi/v1/batchOrders', requestParams);
  }

  cancelAllOpenOrders(params: {
    symbol: string;
  }): Promise<CancelAllOpenOrdersResult> {
    return this.deletePrivate('fapi/v1/allOpenOrders', params);
  }

  // Auto-cancel all open orders
  setCancelOrdersOnTimeout(
    params: CancelOrdersTimeoutParams,
  ): Promise<SetCancelTimeoutResult> {
    return this.postPrivate('fapi/v1/countdownCancelAll', params);
  }

  getOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('fapi/v1/order', params);
  }

  getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]> {
    return this.getPrivate('fapi/v1/allOrders', params);
  }

  getAllOpenOrders(params?: { symbol?: string }): Promise<OrderResult[]> {
    return this.getPrivate('fapi/v1/openOrders', params);
  }

  getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('fapi/v1/openOrder', params);
  }

  getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]> {
    return this.getPrivate('fapi/v1/forceOrders', params);
  }

  getAccountTrades(
    params: SymbolFromPaginatedRequestFromId & { orderId?: number },
  ): Promise<FuturesPositionTrade[]> {
    return this.getPrivate('fapi/v1/userTrades', params);
  }

  setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/marginType', params);
  }

  setPositionMode(params: PositionModeParams): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/positionSide/dual', params);
  }

  setLeverage(params: SetLeverageParams): Promise<SetLeverageResult> {
    return this.postPrivate('fapi/v1/leverage', params);
  }

  setMultiAssetsMode(params: {
    multiAssetsMargin: MultiAssetsMode;
  }): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/multiAssetsMargin', params);
  }

  setIsolatedPositionMargin(
    params: SetIsolatedMarginParams,
  ): Promise<SetIsolatedMarginResult> {
    return this.postPrivate('fapi/v1/positionMargin', params);
  }

  /**
   * @deprecated
   * Use getPositionsV3() instead
   **/
  getPositions(params?: Partial<BasicSymbolParam>): Promise<FuturesPosition[]> {
    return this.getPrivate('fapi/v2/positionRisk', params);
  }

  getPositionsV3(params?: { symbol?: string }): Promise<FuturesPositionV3[]> {
    return this.getPrivate('fapi/v3/positionRisk', params);
  }

  getADLQuantileEstimation(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('fapi/v1/adlQuantile', params);
  }

  getPositionMarginChangeHistory(
    params: GetPositionMarginChangeHistoryParams,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/positionMargin/history', params);
  }

  /**
   *
   * ACCOUNT endpoints - Rest API
   *
   **/

  getBalanceV3(): Promise<FuturesAccountBalance[]> {
    return this.getPrivate('fapi/v3/balance');
  }

  /**
   * @deprecated
   * Use getBalanceV3() instead
   **/
  getBalance(): Promise<FuturesAccountBalance[]> {
    return this.getPrivate('fapi/v2/balance');
  }

  getAccountInformationV3(): Promise<FuturesAccountInformation> {
    return this.getPrivate('fapi/v3/account');
  }

  /**
   * @deprecated
   * Use getAccountInformationV3() instead
   **/
  getAccountInformation(): Promise<FuturesAccountInformation> {
    return this.getPrivate('fapi/v2/account');
  }

  /**
   * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
   */
  getAccountComissionRate(
    params: BasicSymbolParam,
  ): Promise<UserCommissionRate> {
    return this.getPrivate('fapi/v1/commissionRate', params);
  }

  getAccountCommissionRate(params: {
    symbol: string;
  }): Promise<UserCommissionRate> {
    return this.getPrivate('fapi/v1/commissionRate', params);
  }

  getFuturesAccountConfig(): Promise<FuturesAccountConfig> {
    return this.getPrivate('fapi/v1/accountConfig');
  }

  getFuturesSymbolConfig(params: { symbol?: string }): Promise<SymbolConfig[]> {
    return this.getPrivate('fapi/v1/symbolConfig', params);
  }

  getUserForceOrders(): Promise<UserForceOrder[]> {
    return this.getPrivate('fapi/v1/rateLimit/order');
  }

  /**
   * Contrary to what the docs say - if symbol is provided, this returns an array with length 1 (assuming the symbol exists)
   */
  getNotionalAndLeverageBrackets(params?: {
    symbol?: string;
  }): Promise<SymbolLeverageBracketsResult[]> {
    return this.getPrivate('fapi/v1/leverageBracket', params);
  }

  getMultiAssetsMode(): Promise<MultiAssetModeResponse> {
    return this.getPrivate('fapi/v1/multiAssetsMargin');
  }

  getCurrentPositionMode(): Promise<PositionModeResponse> {
    return this.getPrivate('fapi/v1/positionSide/dual');
  }

  getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]> {
    return this.getPrivate('fapi/v1/income', params);
  }

  getApiQuantitativeRulesIndicators(params?: {
    symbol?: string;
  }): Promise<any> {
    return this.getPrivate('fapi/v1/apiTradingStatus', params);
  }

  getFuturesTransactionHistoryDownloadId(params: {
    startTime: number;
    endTime: number;
  }): Promise<FuturesTradeHistoryDownloadId> {
    return this.getPrivate('fapi/v1/income/asyn', params);
  }

  getFuturesTransactionHistoryDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionDownloadLink> {
    return this.getPrivate('fapi/v1/income/asyn/id', params);
  }

  getFuturesOrderHistoryDownloadId(params: {
    startTime: number;
    endTime: number;
  }): Promise<FuturesTradeHistoryDownloadId> {
    return this.getPrivate('fapi/v1/order/asyn', params);
  }

  getFuturesOrderHistoryDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionDownloadLink> {
    return this.getPrivate('fapi/v1/order/asyn/id', params);
  }

  getFuturesTradeHistoryDownloadId(params: {
    startTime: number;
    endTime: number;
  }): Promise<FuturesTradeHistoryDownloadId> {
    return this.getPrivate('fapi/v1/trade/asyn', params);
  }

  getFuturesTradeDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionDownloadLink> {
    return this.getPrivate('fapi/v1/trade/asyn/id', params);
  }

  setBNBBurnEnabled(params: {
    feeBurn: 'true' | 'false';
  }): Promise<{ code: number; msg: string }> {
    return this.postPrivate('fapi/v1/feeBurn', params);
  }

  getBNBBurnStatus(): Promise<{
    feeBurn: boolean;
  }> {
    return this.getPrivate('fapi/v1/feeBurn');
  }

  testOrder(params: NewFuturesOrderParams): Promise<any> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('fapi/v1/order/test', params);
  }

  /**
   *
   * Convert Endpoints
   *
   **/

  getAllConvertPairs(params?: {
    fromAsset?: string;
    toAsset?: string;
  }): Promise<FuturesConvertPair[]> {
    return this.get('fapi/v1/convert/exchangeInfo', params);
  }

  submitConvertQuoteRequest(
    params: FuturesConvertQuoteRequest,
  ): Promise<FuturesConvertQuote> {
    return this.postPrivate('fapi/v1/convert/getQuote', params);
  }

  acceptConvertQuote(params: { quoteId: string }): Promise<{
    orderId: string;
    createTime: number;
    orderStatus: 'PROCESS' | 'ACCEPT_SUCCESS' | 'SUCCESS' | 'FAIL';
  }> {
    return this.postPrivate('fapi/v1/convert/acceptQuote', params);
  }

  getConvertOrderStatus(params: {
    orderId?: string;
    quoteId?: string;
  }): Promise<FuturesConvertOrderStatus> {
    return this.getPrivate('fapi/v1/convert/orderStatus', params);
  }

  /**
   *
   * Portfolio Margin Pro Endpoints
   *
   **/

  getPortfolioMarginProAccountInfo(params: {
    asset: string;
  }): Promise<PortfolioMarginProAccountInfo> {
    return this.getPrivate('fapi/v1/pmAccountInfo', params);
  }

  /**
   *
   * Broker Futures Endpoints
   * Possibly @deprecated, found only in old docs
   * All broker endpoints start with /sapi/v1/broker or sapi/v2/broker or sapi/v3/broker
   *
   **/

  /**
   * @deprecated
   **/
  getBrokerIfNewFuturesUser(
    brokerId: string,
    type: 1 | 2 = 1,
  ): Promise<{ brokerId: string; rebateWorking: boolean; ifNewUser: boolean }> {
    return this.getPrivate('fapi/v1/apiReferral/ifNewUser', {
      brokerId,
      type,
    });
  }

  /**
   * @deprecated
   **/
  setBrokerCustomIdForClient(
    customerId: string,
    email: string,
  ): Promise<{ customerId: string; email: string }> {
    return this.postPrivate('fapi/v1/apiReferral/customization', {
      customerId,
      email,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerClientCustomIds(
    customerId: string,
    email: string,
    page?: number,
    limit?: number,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/customization', {
      customerId,
      email,
      page,
      limit,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerUserCustomId(brokerId: string): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/userCustomization', {
      brokerId,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerRebateDataOverview(type: 1 | 2 = 1): Promise<RebateDataOverview> {
    return this.getPrivate('fapi/v1/apiReferral/overview', {
      type,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerUserTradeVolume(
    type: 1 | 2 = 1,
    startTime?: number,
    endTime?: number,
    limit?: number,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/tradeVol', {
      type,
      startTime,
      endTime,
      limit,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerRebateVolume(
    type: 1 | 2 = 1,
    startTime?: number,
    endTime?: number,
    limit?: number,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/rebateVol', {
      type,
      startTime,
      endTime,
      limit,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerTradeDetail(
    type: 1 | 2 = 1,
    startTime?: number,
    endTime?: number,
    limit?: number,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/traderSummary', {
      type,
      startTime,
      endTime,
      limit,
    });
  }

  /**
   *
   * User Data Stream Endpoints
   *
   **/

  // USD-M Futures

  getFuturesUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('fapi/v1/listenKey');
  }

  keepAliveFuturesUserDataListenKey(): Promise<object> {
    return this.put('fapi/v1/listenKey');
  }

  closeFuturesUserDataListenKey(): Promise<object> {
    return this.delete('fapi/v1/listenKey');
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
}
