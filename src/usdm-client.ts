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
  QuarterlyContractSettlementPrice,
  BasisParams,
  Basis,
  IndexPriceConstituents,
  ModifyOrderParams,
  FuturesTransactionDownloadLink,
  PortfolioMarginProAccountInfo,
  GetFuturesOrderModifyHistoryParams,
  FuturesTradeHistoryDownloadId,
} from './types/futures';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';
import { FundingRate } from './types/coin';

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
   * USD-Futures Account/Trade Endpoints
   *
   **/

  

  getCurrentPositionMode(): Promise<PositionModeResponse> {
    return this.getPrivate('fapi/v1/positionSide/dual');
  }

  

  getMultiAssetsMode(): Promise<MultiAssetModeResponse> {
    return this.getPrivate('fapi/v1/multiAssetsMargin');
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

  

  

  

  

  

  

 

  

  

 

 

  

  getBalance(): Promise<FuturesAccountBalance[]> {
    return this.getPrivate('fapi/v2/balance');
  }

  getAccountInformation(): Promise<FuturesAccountInformation> {
    return this.getPrivate('fapi/v2/account');
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
}
