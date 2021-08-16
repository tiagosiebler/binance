import { AxiosRequestConfig } from 'axios';

import {
  BasicSymbolPaginatedParams,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  GetOrderParams,
  OrderBookParams,
  HistoricalTradesParams,
  KlinesParams,
  RecentTradesParams,
  CancelOrderParams,
  CancelOCOParams,
  NewOCOParams,
  SymbolFromPaginatedRequestFromId,
  OrderIdProperty,
  GetAllOrdersParams,
  GenericCodeMsgError,
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
  FuturesKline,
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
} from './types/futures';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';

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
    return this.get(getServerTimeEndpoint(this.clientId))
      .then(response => response.serverTime);
  }

  /**
   *
   * Market Data Endpoints
   *
  **/

  testConnectivity(): Promise<{}> {
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

  getHistoricalTrades(params: HistoricalTradesParams): Promise<RawFuturesTrade[]> {
    return this.get('fapi/v1/historicalTrades', params);
  }

  getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateFuturesTrade[]> {
    return this.get('fapi/v1/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<FuturesKline[]> {
    return this.get('fapi/v1/klines', params);
  }

  getContinuousContractKlines(params: ContinuousContractKlinesParams): Promise<FuturesKline[]> {
    return this.get('fapi/v1/continuousKlines', params);
  }

  getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<FuturesKline[]> {
    return this.get('fapi/v1/indexPriceKlines', params);
  }

  getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<FuturesKline[]> {
    return this.get('fapi/v1/markPriceKlines', params);
  }

  getMarkPrice(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.get('fapi/v1/premiumIndex', params);
  }

  getFundingRateHistory(params?: Partial<BasicSymbolPaginatedParams>): Promise<FundingRateHistory[]> {
    return this.get('fapi/v1/fundingRate', params);
  }

  get24hrChangeStatististics(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.get('fapi/v1/ticker/24hr', params);
  }

  getSymbolPriceTicker(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.get('fapi/v1/ticker/price', params);
  }

  getSymbolOrderBookTicker(params?: Partial<BasicSymbolParam>): Promise<FuturesSymbolOrderBookTicker | FuturesSymbolOrderBookTicker[]> {
    return this.get('fapi/v1/ticker/bookTicker', params);
  }

  getOpenInterest(params: BasicSymbolParam): Promise<OpenInterest> {
    return this.get('fapi/v1/openInterest', params);
  }

  getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/openInterestHist', params);
  }

  getTopTradersLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/topLongShortAccountRatio', params);
  }

  getTopTradersLongShortPositionRatio(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/topLongShortPositionRatio', params);
  }

  getGlobalLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/globalLongShortAccountRatio', params);
  }

  getTakerBuySellVolume(params: FuturesDataPaginatedParams): Promise<any> {
    return this.get('futures/data/takerlongshortRatio', params);
  }

  getHistoricalBlvtNavKlines(params: SymbolKlinePaginatedParams): Promise<any> {
    return this.get('fapi/v1/lvtKlines', params);
  }

  getCompositeSymbolIndex(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.get('fapi/v1/indexInfo', params);
  }

  /**
   *
   * USD-Futures Account/Trade Endpoints
   *
  **/

  setPositionMode(params: PositionModeParams): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/positionSide/dual', params);
  }

  getCurrentPositionMode(): Promise<PositionModeResponse> {
    return this.getPrivate('fapi/v1/positionSide/dual');
  }

  setMultiAssetsMode(params: {
    multiAssetsMargin: MultiAssetsMode;
  }): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/multiAssetsMargin', params);
  }

  getMultiAssetsMode(): Promise<MultiAssetModeResponse> {
    return this.getPrivate('fapi/v1/multiAssetsMargin');
  }

  submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult | NewOrderError> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('fapi/v1/order', params);
  }

  /**
   * Warning: max 5 orders at a time!
   */
  submitMultipleOrders(batchOrders: NewFuturesOrderParams[]): Promise<(NewOrderResult | NewOrderError)[]> {
    batchOrders.forEach(order => this.validateOrderId(order, 'newClientOrderId'));
    return this.postPrivate('fapi/v1/batchOrders', { batchOrders });
  }

  getOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('fapi/v1/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult> {
    return this.deletePrivate('fapi/v1/order', params);
  }

  cancelAllOpenOrders(params: BasicSymbolParam): Promise<CancelAllOpenOrdersResult> {
    return this.deletePrivate('fapi/v1/allOpenOrders', params);
  }

  cancelMultipleOrders(params: CancelMultipleOrdersParams): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]> {
    return this.deletePrivate('fapi/v1/batchOrders', params);
  }

  // Auto-cancel all open orders
  setCancelOrdersOnTimeout(params: CancelOrdersTimeoutParams): Promise<any> {
    return this.postPrivate('fapi/v1/positionSide', params);
  }

  getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('fapi/v1/openOrder', params);
  }

  getAllOpenOrders(params?: Partial<BasicSymbolParam>): Promise<OrderResult[]> {
    return this.getPrivate('fapi/v1/openOrders', params);
  }

  getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]> {
    return this.getPrivate('fapi/v1/allOrders', params);
  }

  getBalance(): Promise<FuturesAccountBalance[]> {
    return this.getPrivate('fapi/v2/balance');
  }

  getAccountInformation(): Promise<FuturesAccountInformation> {
    return this.getPrivate('fapi/v2/account');
  }

  setLeverage(params: SetLeverageParams): Promise<SetLeverageResult> {
    return this.postPrivate('fapi/v1/leverage', params);
  }

  setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult> {
    return this.postPrivate('fapi/v1/marginType', params);
  }

  setIsolatedPositionMargin(params: SetIsolatedMarginParams): Promise<SetIsolatedMarginResult> {
    return this.postPrivate('fapi/v1/positionMargin', params);
  }

  getPositionMarginChangeHistory(params: GetPositionMarginChangeHistoryParams): Promise<any> {
    return this.getPrivate('fapi/v1/positionMargin/history', params);
  }

  getPositions(params?: Partial<BasicSymbolParam>): Promise<FuturesPosition[]> {
    return this.getPrivate('fapi/v2/positionRisk', params);
  }

  getAccountTrades(params: SymbolFromPaginatedRequestFromId): Promise<FuturesPositionTrade[]> {
    return this.getPrivate('fapi/v1/userTrades', params);
  }

  getIncomeHistory(params?: GetIncomeHistoryParams): Promise<any> {
    return this.getPrivate('fapi/v1/income', params);
  }

  getNotionalAndLeverageBrackets(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.getPrivate('fapi/v1/leverageBracket', params);
  }

  getADLQuantileEstimation(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.getPrivate('fapi/v1/adlQuantile', params);
  }

  getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]> {
    return this.getPrivate('fapi/v1/forceOrders', params);
  }

  getApiQuantitativeRulesIndicators(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.getPrivate('fapi/v1/apiTradingStatus', params);
  }

  getAccountComissionRate(params: BasicSymbolParam): Promise<any> {
    return this.getPrivate('fapi/v1/commissionRate', params);
  }

  /**
   *
   * Broker Futures Endpoints
   *
  **/

  // 1 == USDT-Margined, 2 == Coin-margined
  getBrokerIfNewFuturesUser(brokerId: string, type: 1 | 2 = 1): Promise<{ brokerId: string; rebateWorking: boolean; ifNewUser: boolean; }> {
    return this.getPrivate('fapi/v1/apiReferral/ifNewUser', {
      brokerId,
      type,
    });
  }

  setCustomIdForClient(customerId: string, email: string): Promise<{ customerId: string; email: string; }> {
    return this.postPrivate('fapi/v1/apiReferral/customization', {
      customerId,
      email,
    });
  }

  /**
   *
   * User Data Stream Endpoints
   *
  **/

  // USD-M Futures

  getFuturesUserDataListenKey(): Promise<{ listenKey: string; }> {
    return this.post('fapi/v1/listenKey');
  }

  keepAliveFuturesUserDataListenKey(): Promise<{}> {
    return this.put('fapi/v1/listenKey');
  }

  closeFuturesUserDataListenKey(): Promise<{}> {
    return this.delete('fapi/v1/listenKey');
  }


  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(params: NewFuturesOrderParams | CancelOrderParams | NewOCOParams | CancelOCOParams, orderIdProperty: OrderIdProperty): void {
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
};
