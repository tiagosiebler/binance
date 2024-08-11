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
   * USD-Futures Account/Trade Endpoints
   *
   **/

  

  getCurrentPositionMode(): Promise<PositionModeResponse> {
    return this.getPrivate('dapi/v1/positionSide/dual');
  }

  
  

 
 

  

  

  

  

 

 
 

  

  getBalance(): Promise<FuturesCoinMAccountBalance[]> {
    return this.getPrivate('dapi/v1/balance');
  }

  getAccountInformation(): Promise<FuturesCoinMAccountInformation> {
    return this.getPrivate('dapi/v1/account');
  }

 

  

 

  

  
  

  getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]> {
    return this.getPrivate('dapi/v1/income', params);
  }

  /**
   * Notional Bracket for Symbol (NOT "pair")
   */
  getNotionalAndLeverageBrackets(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolLeverageBracketsResult[] | SymbolLeverageBracketsResult> {
    return this.getPrivate('dapi/v2/leverageBracket', params);
  }

  

  

  getAccountComissionRate(
    params: BasicSymbolParam,
  ): Promise<UserCommissionRate> {
    return this.getPrivate('dapi/v1/commissionRate', params);
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
    return this.getPrivate('dapi/v1/apiReferral/ifNewUser', {
      brokerId,
      type,
    });
  }

  setBrokerCustomIdForClient(
    customerId: string,
    email: string,
  ): Promise<{ customerId: string; email: string }> {
    return this.postPrivate('dapi/v1/apiReferral/customization', {
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
    return this.getPrivate('dapi/v1/apiReferral/customization', {
      customerId,
      email,
      page,
      limit,
    });
  }

  getBrokerUserCustomId(brokerId: string): Promise<any> {
    return this.getPrivate('dapi/v1/apiReferral/userCustomization', {
      brokerId,
    });
  }

  getBrokerRebateDataOverview(type: 1 | 2 = 1): Promise<RebateDataOverview> {
    return this.getPrivate('dapi/v1/apiReferral/overview', {
      type,
    });
  }

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

  keepAliveFuturesUserDataListenKey(): Promise<{}> {
    return this.put('dapi/v1/listenKey');
  }

  closeFuturesUserDataListenKey(): Promise<{}> {
    return this.delete('dapi/v1/listenKey');
  }

  /**
   *
   * Classic Portfolio Margin Endpoints
   *
   **/

  getClassicPortfolioMarginNotionalLimits(
    params?: GetClassicPortfolioMarginNotionalLimitParams,
  ): Promise<{
    notionalLimits: ClassicPortfolioMarginNotionalLimit[];
  }> {
    return this.getPrivate('dapi/v1/pmExchangeInfo', params);
  }

  getClassicPortfolioMarginAccount(params: {
    asset: string;
  }): Promise<ClassicPortfolioMarginAccount> {
    return this.getPrivate('dapi/v1/pmAccountInfo', params);
  }
}
