import { AxiosRequestConfig } from 'axios';
import {
  ClassicPortfolioMarginAccount,
  ClassicPortfolioMarginNotionalLimit,
  CoinMAccountTradeParams,
  CoinMOpenInterest,
  CoinMPositionTrade,
  CoinMSymbolOrderBookTicker,
  FundingRate,
  GetClassicPortfolioMarginNotionalLimitParams,
  PositionRisk,
  SymbolOrPair,
} from './types/coin';
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
  GetOrderModifyHistoryParams,
  SymbolPrice,
} from './types/shared';

import {
  ContinuousContractKlinesParams,
  IndexPriceKlinesParams,
  SymbolKlinePaginatedParams,
  FuturesDataPaginatedParams,
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
  ModeChangeResult,
  PositionModeParams,
  PositionModeResponse,
  NewOrderResult,
  NewOrderError,
  OrderResult,
  QuarterlyContractSettlementPrice,
  CancelFuturesOrderResult,
  CancelAllOpenOrdersResult,
  SetLeverageResult,
  SetIsolatedMarginResult,
  ForceOrderResult,
  SymbolLeverageBracketsResult,
  IncomeHistory,
  RebateDataOverview,
  SetCancelTimeoutResult,
  ChangeStats24hr,
  MarkPrice,
  FuturesCoinMTakerBuySellVolumeParams,
  FuturesCoinMBasisParams,
  ModifyFuturesOrderResult,
  ModifyFuturesOrderParams,
  OrderAmendment,
  FuturesCoinMAccountBalance,
  FuturesCoinMAccountInformation,
  UserCommissionRate,
  IndexPriceConstituents,
} from './types/futures';

import {
  asArray,
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';

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

  testConnectivity(): Promise<{}> {
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
  getMarkPrice(
    params?: Partial<BasicSymbolParam>,
  ): Promise<MarkPrice | MarkPrice[]> {
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
  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get24hrChangeStatistics(params);
  }

  get24hrChangeStatistics(
    params?: Partial<BasicSymbolParam>,
  ): Promise<ChangeStats24hr | ChangeStats24hr[]> {
    return this.get('dapi/v1/ticker/24hr', params);
  }

  getSymbolPriceTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('dapi/v1/ticker/price', params);
  }

  getSymbolOrderBookTicker(
    params?: SymbolOrPair,
  ): Promise<CoinMSymbolOrderBookTicker[]> {
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
    params: FuturesDataPaginatedParams,
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
   * Only in old documentation, not in new one
   **/
  getIndexPriceConstituents(params: {
    symbol: string;
  }): Promise<IndexPriceConstituents> {
    return this.get('dapi/v1/constituents', params);
  }

  /**
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

  /**
   *
   * Account Endpoints
   *
   **/

  /**
   *
   * Portfolio Margin Endpoints
   *
   **/

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
