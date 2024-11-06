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
   * Market Data Endpoints
   *
   **/

  testConnectivity(): Promise<{}> {
    return this.get('papi/v1/ping');
  }

  /**
   *
   * TRADE endpoints - Rest API
   *
   **/

  submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('papi/v1/um/order', params);
  }

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
