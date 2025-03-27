import { AxiosRequestConfig } from 'axios';

import {
  ClassicPortfolioMarginAccount,
  ClassicPortfolioMarginNotionalLimit,
  CoinMAccountTradeParams,
  CoinMOpenInterest,
  CoinMPositionTrade,
  CoinMSymbolOrderBookTicker,
  FundingRate,
  FuturesTransactionHistoryDownloadLink,
  GetClassicPortfolioMarginNotionalLimitParams,
  PositionRisk,
} from './types/coin';
import {
  AggregateFuturesTrade,
  CancelAllOpenOrdersResult,
  CancelFuturesOrderResult,
  CancelMultipleOrdersParams,
  CancelOrdersTimeoutParams,
  ChangeStats24hr,
  ContinuousContractKlinesParams,
  ForceOrderResult,
  FundingRateHistory,
  FuturesCoinMAccountBalance,
  FuturesCoinMAccountInformation,
  FuturesCoinMBasisParams,
  FuturesCoinMTakerBuySellVolumeParams,
  FuturesDataPaginatedParams,
  FuturesExchangeInfo,
  FuturesOrderBook,
  GetForceOrdersParams,
  GetIncomeHistoryParams,
  GetPositionMarginChangeHistoryParams,
  IncomeHistory,
  IndexPriceConstituents,
  IndexPriceKlinesParams,
  MarkPrice,
  ModeChangeResult,
  ModifyFuturesOrderParams,
  ModifyFuturesOrderResult,
  NewFuturesOrderParams,
  NewOrderError,
  NewOrderResult,
  OrderAmendment,
  OrderResult,
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
  SymbolKlinePaginatedParams,
  SymbolLeverageBracketsResult,
  UserCommissionRate,
} from './types/futures';
import {
  BasicSymbolPaginatedParams,
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  GenericCodeMsgError,
  GetAllOrdersParams,
  GetOrderModifyHistoryParams,
  GetOrderParams,
  HistoricalTradesParams,
  Kline,
  KlinesParams,
  NewOCOParams,
  OrderBookParams,
  OrderIdProperty,
  RecentTradesParams,
  SymbolFromPaginatedRequestFromId,
  SymbolPrice,
} from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import {
  asArray,
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

export class CoinMClient extends BaseRestClient {
  private clientId: BinanceBaseUrlKey;

  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
    useTestnet?: boolean,
  ) {
    const clientId = useTestnet ? 'coinmtest' : 'coinm';

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
   * Market Data Endpoints
   *
   **/

  testConnectivity(): Promise<object> {
    return this.get('dapi/v1/ping');
  }

  getExchangeInfo(): Promise<FuturesExchangeInfo> {
    return this.get('dapi/v1/exchangeInfo');
  }

  getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook> {
    return this.get('dapi/v1/depth', params);
  }

  getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]> {
    return this.get('dapi/v1/trades', params);
  }

  getHistoricalTrades(
    params: HistoricalTradesParams,
  ): Promise<RawFuturesTrade[]> {
    return this.get('dapi/v1/historicalTrades', params);
  }

  getAggregateTrades(
    params: SymbolFromPaginatedRequestFromId,
  ): Promise<AggregateFuturesTrade[]> {
    return this.get('dapi/v1/aggTrades', params);
  }

  /**
   * Index Price and Mark Price
   */
  getMarkPrice(params?: { symbol?: string }): Promise<MarkPrice | MarkPrice[]> {
    return this.get('dapi/v1/premiumIndex', params);
  }

  getFundingRateHistory(
    params?: Partial<BasicSymbolPaginatedParams>,
  ): Promise<FundingRateHistory[]> {
    return this.get('dapi/v1/fundingRate', params);
  }

  getFundingRate(params?: { symbol?: string }): Promise<FundingRate[]> {
    return this.get('dapi/v1/fundingInfo', params);
  }

  getKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('dapi/v1/klines', params);
  }

  getContinuousContractKlines(
    params: ContinuousContractKlinesParams,
  ): Promise<Kline[]> {
    return this.get('dapi/v1/continuousKlines', params);
  }

  getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]> {
    return this.get('dapi/v1/indexPriceKlines', params);
  }

  getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]> {
    return this.get('dapi/v1/markPriceKlines', params);
  }

  getPremiumIndexKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('dapi/v1/premiumIndexKlines', params);
  }

  /**
   * @deprecated use get24hrChangeStatistics() instead (method without the typo)
   */
  get24hrChangeStatististics(params?: {
    symbol?: string;
  }): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get24hrChangeStatistics(params);
  }

  get24hrChangeStatistics(params?: {
    symbol?: string;
    pair?: string;
  }): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get('dapi/v1/ticker/24hr', params);
  }

  getSymbolPriceTicker(params?: {
    symbol?: string;
    pair?: string;
  }): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('dapi/v1/ticker/price', params);
  }

  getSymbolOrderBookTicker(params?: {
    symbol?: string;
    pair?: string;
  }): Promise<CoinMSymbolOrderBookTicker[]> {
    return this.get('dapi/v1/ticker/bookTicker', params).then((e) =>
      asArray(e),
    );
  }

  getOpenInterest(params: { symbol: string }): Promise<CoinMOpenInterest> {
    return this.get('dapi/v1/openInterest', params);
  }

  getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/openInterestHist', params);
  }

  getTopTradersLongShortAccountRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/topLongShortAccountRatio', params);
  }

  getTopTradersLongShortPositionRatio(
    params: FuturesDataPaginatedParams & { pair?: string },
  ): Promise<any> {
    return this.get('futures/data/topLongShortPositionRatio', params);
  }

  getGlobalLongShortAccountRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/globalLongShortAccountRatio', params);
  }

  getTakerBuySellVolume(
    params: FuturesCoinMTakerBuySellVolumeParams,
  ): Promise<any> {
    return this.get('futures/data/takerBuySellVol', params);
  }

  getCompositeSymbolIndex(params: FuturesCoinMBasisParams): Promise<any> {
    return this.get('futures/data/basis', params);
  }

  /**
   * possibly @deprecated
   * Only in old documentation, not in new one
   **/
  getIndexPriceConstituents(params: {
    symbol: string;
  }): Promise<IndexPriceConstituents> {
    return this.get('dapi/v1/constituents', params);
  }

  /**
   * possibly @deprecated
   * Only in old documentation, not in new one
   **/
  getQuarterlyContractSettlementPrices(params: {
    pair: string;
  }): Promise<QuarterlyContractSettlementPrice[]> {
    return this.get('futures/data/delivery-price', params);
  }

  /**
   *
   * Trade Endpoints
   *
   **/

  submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('dapi/v1/order', params);
  }

  /**
   * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
   *
   * Known issue: `quantity` and `price` should be sent as strings
   */
  submitMultipleOrders(
    orders: NewFuturesOrderParams<string>[],
  ): Promise<(NewOrderResult | NewOrderError)[]> {
    const stringOrders = orders.map((order) => {
      const orderToStringify = { ...order };
      this.validateOrderId(orderToStringify, 'newClientOrderId');
      return JSON.stringify(orderToStringify);
    });
    const requestBody = {
      batchOrders: `[${stringOrders.join(',')}]`,
    };
    return this.postPrivate('dapi/v1/batchOrders', requestBody);
  }

  /**
   * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
   */
  modifyOrder(
    params: ModifyFuturesOrderParams,
  ): Promise<ModifyFuturesOrderResult> {
    return this.putPrivate('dapi/v1/order', params);
  }

  /**
   * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
   */
  modifyMultipleOrders(
    orders: ModifyFuturesOrderParams[],
  ): Promise<(ModifyFuturesOrderResult | NewOrderError)[]> {
    const stringOrders = orders.map((order) => {
      const orderToStringify = { ...order };
      return JSON.stringify(orderToStringify);
    });
    const requestBody = {
      batchOrders: `[${stringOrders.join(',')}]`,
    };
    return this.putPrivate('dapi/v1/batchOrders', requestBody);
  }

  getOrderModifyHistory(
    params: GetOrderModifyHistoryParams,
  ): Promise<OrderAmendment[]> {
    return this.getPrivate('dapi/v1/orderAmendment', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult> {
    return this.deletePrivate('dapi/v1/order', params);
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

    return this.deletePrivate('dapi/v1/batchOrders', requestParams);
  }

  cancelAllOpenOrders(params: {
    symbol?: string;
  }): Promise<CancelAllOpenOrdersResult> {
    return this.deletePrivate('dapi/v1/allOpenOrders', params);
  }

  // Auto-cancel all open orders
  setCancelOrdersOnTimeout(
    params: CancelOrdersTimeoutParams,
  ): Promise<SetCancelTimeoutResult> {
    return this.postPrivate('dapi/v1/countdownCancelAll', params);
  }

  getOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('dapi/v1/order', params);
  }

  getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]> {
    return this.getPrivate('dapi/v1/allOrders', params);
  }

  getAllOpenOrders(params?: { symbol?: string }): Promise<OrderResult[]> {
    return this.getPrivate('dapi/v1/openOrders', params);
  }

  getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('dapi/v1/openOrder', params);
  }

  getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]> {
    return this.getPrivate('dapi/v1/forceOrders', params);
  }

  getAccountTrades(
    params: CoinMAccountTradeParams & { orderId?: number },
  ): Promise<CoinMPositionTrade[]> {
    return this.getPrivate('dapi/v1/userTrades', params);
  }

  getPositions(params?: {
    marginAsset?: string;
    pair?: string;
  }): Promise<PositionRisk[]> {
    return this.getPrivate('dapi/v1/positionRisk', params);
  }

  setPositionMode(params: PositionModeParams): Promise<ModeChangeResult> {
    return this.postPrivate('dapi/v1/positionSide/dual', params);
  }

  setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult> {
    return this.postPrivate('dapi/v1/marginType', params);
  }

  setLeverage(params: SetLeverageParams): Promise<SetLeverageResult> {
    return this.postPrivate('dapi/v1/leverage', params);
  }

  getADLQuantileEstimation(params?: { symbol?: string }): Promise<any> {
    return this.getPrivate('dapi/v1/adlQuantile', params);
  }

  setIsolatedPositionMargin(
    params: SetIsolatedMarginParams,
  ): Promise<SetIsolatedMarginResult> {
    return this.postPrivate('dapi/v1/positionMargin', params);
  }

  getPositionMarginChangeHistory(
    params: GetPositionMarginChangeHistoryParams,
  ): Promise<any> {
    return this.getPrivate('dapi/v1/positionMargin/history', params);
  }
  /**
   *
   * Account Endpoints
   *
   **/

  getBalance(): Promise<FuturesCoinMAccountBalance[]> {
    return this.getPrivate('dapi/v1/balance');
  }

  /**
   * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
   */
  getAccountComissionRate(params: {
    symbol?: string;
  }): Promise<UserCommissionRate> {
    return this.getPrivate('dapi/v1/commissionRate', params);
  }

  getAccountCommissionRate(params: {
    symbol?: string;
  }): Promise<UserCommissionRate> {
    return this.getPrivate('dapi/v1/commissionRate', params);
  }

  getAccountInformation(): Promise<FuturesCoinMAccountInformation> {
    return this.getPrivate('dapi/v1/account');
  }

  /**
   * Notional Bracket for Symbol (NOT "pair")
   */
  getNotionalAndLeverageBrackets(params?: {
    symbol?: string;
  }): Promise<SymbolLeverageBracketsResult[] | SymbolLeverageBracketsResult> {
    return this.getPrivate('dapi/v2/leverageBracket', params);
  }

  // TO ADD: dapi/v1/leverageBracket
  // can use dapi/v2/leverageBracket

  getCurrentPositionMode(): Promise<PositionModeResponse> {
    return this.getPrivate('dapi/v1/positionSide/dual');
  }

  getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]> {
    return this.getPrivate('dapi/v1/income', params);
  }

  getDownloadIdForFuturesTransactionHistory(params: {
    startTime: number;
    endTime: number;
  }): Promise<{
    avgCostTimestampOfLast30d: number;
    downloadId: string;
  }> {
    return this.getPrivate('dapi/v1/income/asyn', params);
  }

  getFuturesTransactionHistoryDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionHistoryDownloadLink> {
    return this.getPrivate('dapi/v1/income/asyn/id', params);
  }

  getDownloadIdForFuturesOrderHistory(params: {
    startTime: number;
    endTime: number;
  }): Promise<{
    avgCostTimestampOfLast30d: number;
    downloadId: string;
  }> {
    return this.getPrivate('dapi/v1/order/asyn', params);
  }

  getFuturesOrderHistoryDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionHistoryDownloadLink> {
    return this.getPrivate('dapi/v1/order/asyn/id', params);
  }

  getDownloadIdForFuturesTradeHistory(params: {
    startTime: number;
    endTime: number;
  }): Promise<{
    avgCostTimestampOfLast30d: number;
    downloadId: string;
  }> {
    return this.getPrivate('dapi/v1/trade/asyn', params);
  }

  getFuturesTradeHistoryDownloadLink(params: {
    downloadId: string;
  }): Promise<FuturesTransactionHistoryDownloadLink> {
    return this.getPrivate('dapi/v1/trade/asyn/id', params);
  }

  /**
   *
   * Portfolio Margin Endpoints
   *
   **/

  getClassicPortfolioMarginAccount(params: {
    asset: string;
  }): Promise<ClassicPortfolioMarginAccount> {
    return this.getPrivate('dapi/v1/pmAccountInfo', params);
  }

  /**
   * @deprecated at 6th August, 2024
   **/
  getClassicPortfolioMarginNotionalLimits(
    params?: GetClassicPortfolioMarginNotionalLimitParams,
  ): Promise<{
    notionalLimits: ClassicPortfolioMarginNotionalLimit[];
  }> {
    return this.getPrivate('dapi/v1/pmExchangeInfo', params);
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
    return this.getPrivate('dapi/v1/apiReferral/ifNewUser', {
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
    return this.postPrivate('dapi/v1/apiReferral/customization', {
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
    return this.getPrivate('dapi/v1/apiReferral/customization', {
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
    return this.getPrivate('dapi/v1/apiReferral/userCustomization', {
      brokerId,
    });
  }

  /**
   * @deprecated
   **/
  getBrokerRebateDataOverview(type: 1 | 2 = 1): Promise<RebateDataOverview> {
    return this.getPrivate('dapi/v1/apiReferral/overview', {
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
    return this.getPrivate('dapi/v1/apiReferral/tradeVol', {
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
    return this.getPrivate('dapi/v1/apiReferral/rebateVol', {
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
    return this.getPrivate('dapi/v1/apiReferral/traderSummary', {
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

  getFuturesUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('dapi/v1/listenKey');
  }

  keepAliveFuturesUserDataListenKey(): Promise<object> {
    return this.put('dapi/v1/listenKey');
  }

  closeFuturesUserDataListenKey(): Promise<object> {
    return this.delete('dapi/v1/listenKey');
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
