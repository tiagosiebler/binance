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

  /**
   * Index Price and Mark Price
   */
  getMarkPrice(
    params?: Partial<BasicSymbolParam>,
  ): Promise<MarkPrice | MarkPrice[]> {
    return this.get('fapi/v1/premiumIndex', params);
  }

  getFundingRateHistory(
    params?: Partial<BasicSymbolPaginatedParams>,
  ): Promise<FundingRateHistory[]> {
    return this.get('fapi/v1/fundingRate', params);
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

  /**
   * @deprecated use get24hrChangeStatistics() instead (method without the typo)
   */
  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get24hrChangeStatistics(params);
  }

  get24hrChangeStatistics(
    params: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr[]>;
  get24hrChangeStatistics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]>;
  get24hrChangeStatistics(
    params: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr>;

  get24hrChangeStatistics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get('fapi/v1/ticker/24hr', params);
  }

  getSymbolPriceTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('fapi/v1/ticker/price', params);
  }

  getSymbolOrderBookTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<FuturesSymbolOrderBookTicker | FuturesSymbolOrderBookTicker[]> {
    return this.get('fapi/v1/ticker/bookTicker', params);
  }

  getOpenInterest(params: BasicSymbolParam): Promise<OpenInterest> {
    return this.get('fapi/v1/openInterest', params);
  }

  getOpenInterestStatistics(
    params: FuturesDataPaginatedParams,
  ): Promise<HistoricOpenInterest[]> {
    return this.get('futures/data/openInterestHist', params);
  }

  getTopTradersLongShortAccountRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/topLongShortAccountRatio', params);
  }

  getTopTradersLongShortPositionRatio(
    params: FuturesDataPaginatedParams,
  ): Promise<any> {
    return this.get('futures/data/topLongShortPositionRatio', params);
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

  submitNewOrder(
    params: NewFuturesOrderParams,
  ): Promise<NewOrderResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('fapi/v1/order', params);
  }

    /**
   * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
   */
    modifyOrder(
      params: ModifyFuturesOrderParams,
    ): Promise<ModifyFuturesOrderResult> {
      return this.putPrivate('fapi/v1/order', params);
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
    return this.postPrivate('fapi/v1/batchOrders', requestBody);
  }

  getOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('fapi/v1/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult> {
    return this.deletePrivate('fapi/v1/order', params);
  }

  cancelAllOpenOrders(
    params: BasicSymbolParam,
  ): Promise<CancelAllOpenOrdersResult> {
    return this.deletePrivate('fapi/v1/allOpenOrders', params);
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

  // Auto-cancel all open orders
  setCancelOrdersOnTimeout(
    params: CancelOrdersTimeoutParams,
  ): Promise<SetCancelTimeoutResult> {
    return this.postPrivate('fapi/v1/countdownCancelAll', params);
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

  setIsolatedPositionMargin(
    params: SetIsolatedMarginParams,
  ): Promise<SetIsolatedMarginResult> {
    return this.postPrivate('fapi/v1/positionMargin', params);
  }

  getPositionMarginChangeHistory(
    params: GetPositionMarginChangeHistoryParams,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/positionMargin/history', params);
  }

  getPositions(params?: Partial<BasicSymbolParam>): Promise<FuturesPosition[]> {
    return this.getPrivate('fapi/v2/positionRisk', params);
  }

  getAccountTrades(
    params: SymbolFromPaginatedRequestFromId & { orderId?: number },
  ): Promise<FuturesPositionTrade[]> {
    return this.getPrivate('fapi/v1/userTrades', params);
  }

  getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]> {
    return this.getPrivate('fapi/v1/income', params);
  }

  /**
   * Contrary to what the docs say - if symbol is provided, this returns an array with length 1 (assuming the symbol exists)
   */
  getNotionalAndLeverageBrackets(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolLeverageBracketsResult[]> {
    return this.getPrivate('fapi/v1/leverageBracket', params);
  }

  getADLQuantileEstimation(params?: Partial<BasicSymbolParam>): Promise<any> {
    return this.getPrivate('fapi/v1/adlQuantile', params);
  }

  getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]> {
    return this.getPrivate('fapi/v1/forceOrders', params);
  }

  getApiQuantitativeRulesIndicators(
    params?: Partial<BasicSymbolParam>,
  ): Promise<any> {
    return this.getPrivate('fapi/v1/apiTradingStatus', params);
  }

  getAccountComissionRate(
    params: BasicSymbolParam,
  ): Promise<UserCommissionRate> {
    return this.getPrivate('fapi/v1/commissionRate', params);
  }

  /**
   *
   * Broker Futures Endpoints
   *
   **/

  // 1 == USDT-Margined, 2 == Coin-margined
  getBrokerIfNewFuturesUser(
    brokerId: string,
    type: 1 | 2 = 1,
  ): Promise<{ brokerId: string; rebateWorking: boolean; ifNewUser: boolean }> {
    return this.getPrivate('fapi/v1/apiReferral/ifNewUser', {
      brokerId,
      type,
    });
  }

  setBrokerCustomIdForClient(
    customerId: string,
    email: string,
  ): Promise<{ customerId: string; email: string }> {
    return this.postPrivate('fapi/v1/apiReferral/customization', {
      customerId,
      email,
    });
  }

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

  getBrokerUserCustomId(brokerId: string): Promise<any> {
    return this.getPrivate('fapi/v1/apiReferral/userCustomization', {
      brokerId,
    });
  }

  getBrokerRebateDataOverview(type: 1 | 2 = 1): Promise<RebateDataOverview> {
    return this.getPrivate('fapi/v1/apiReferral/overview', {
      type,
    });
  }

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

  keepAliveFuturesUserDataListenKey(): Promise<{}> {
    return this.put('fapi/v1/listenKey');
  }

  closeFuturesUserDataListenKey(): Promise<{}> {
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
