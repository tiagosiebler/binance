import { AxiosRequestConfig } from 'axios';
import {
  BasicAssetParam,
  BasicAssetPaginatedParams,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  GetOrderParams,
  OrderBookParams,
  HistoricalTradesParams,
  KlinesParams,
  RecentTradesParams,
  CancelOrderParams,
  CancelOCOParams,
  GetAllOrdersParams,
  NewOCOParams,
  SymbolFromPaginatedRequestFromId,
  OrderIdProperty,
  ExchangeSymbol,
} from './types/shared';

import {
  AllCoinsInformationResponse,
  DailyAccountSnapshotParams,
  DailyAccountSnapshot,
  DepositHistoryParams,
  SystemStatusResponse,
  WithdrawParams,
  DepositHistory,
  WithdrawHistoryParams,
  WithdrawHistory,
  DepositAddressResponse,
  ConvertDustParams,
  DepositAddressParams,
  BasicTimeRangeParam,
  UniversalTransferParams,
  SubAccountListParams,
  UniversalTransferHistoryParams,
  VirtualSubaccountParams,
  ExchangeInfoParams,
  NewSpotOrderParams,
  GetOCOParams,
  BasicFromPaginatedParams,
  APITradingStatus,
  AssetDetail,
  SymbolTradeFee,
  APIPermissions,
  ExchangeInfo,
  OrderBookResponse,
  RawTrade,
  AggregateTrade,
  CurrentAvgPrice,
  DailyChangeStatistic,
  SymbolPrice,
  SymbolOrderBookTicker,
  OrderResponseACK,
  OrderResponseResult,
  OrderResponseFull,
  CancelSpotOrderResult,
  SpotOrder,
  AccountInformation,
  RawAccountTrade,
} from './types/spot';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
  serialiseParams
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';

export class SpotClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super('spot1', restClientOptions, requestOptions);
    return this;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(baseUrlKeyOverride?: BinanceBaseUrlKey): Promise<number> {
    const baseUrlKey = baseUrlKeyOverride || this.getBaseUrlKey();
    const endpoint = getServerTimeEndpoint(baseUrlKey);
    const response = await this.getForBaseUrl(endpoint, baseUrlKey);
    return response.serverTime;
  }

  /**
   *
   * Wallet Endpoints
   *
  **/

  getSystemStatus(): Promise<SystemStatusResponse> {
    return this.get('sapi/v1/system/status');
  }

  getBalances(): Promise<AllCoinsInformationResponse[]> {
    return this.getPrivate('sapi/v1/capital/config/getall');
  }

  getDailyAccountSnapshot(params: DailyAccountSnapshotParams): Promise<DailyAccountSnapshot> {
    return this.getPrivate('sapi/v1/accountSnapshot', params);
  }

  disableFastWithdrawSwitch(): Promise<{}> {
    return this.postPrivate('sapi/v1/account/disableFastWithdrawSwitch');
  }

  enableFastWithdrawSwitch(): Promise<{}> {
    return this.postPrivate('sapi/v1/account/enableFastWithdrawSwitch');
  }

  withdraw(params: WithdrawParams): Promise<{ id: string }> {
    return this.postPrivate('sapi/v1/capital/withdraw/apply', params);
  }

  getDepositHistory(params?: DepositHistoryParams): Promise<DepositHistory[]> {
    return this.getPrivate('sapi/v1/capital/deposit/hisrec', params);
  }

  getWithdrawHistory(params?: WithdrawHistoryParams): Promise<WithdrawHistory[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/history', params);
  }

  getDepositAddress(params: DepositAddressParams): Promise<DepositAddressResponse> {
    return this.getPrivate('sapi/v1/capital/deposit/address', params);
  }

  getAccountStatus(): Promise<{ data: string; }> {
    return this.getPrivate('sapi/v1/account/status');
  }

  getDustLog(params?: BasicTimeRangeParam): Promise<any> {
    return this.getPrivate('sapi/v1/asset/dribblet', params);
  }

  convertDustToBnb(params: ConvertDustParams): Promise<any> {
    return this.postPrivate('sapi/v1/asset/dust', params);
  }

  getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any> {
    return this.getPrivate('sapi/v1/asset/assetDividend', params);
  }

  getAssetDetail(params?: Partial<BasicAssetParam>): Promise<Record<ExchangeSymbol, AssetDetail>> {
    return this.getPrivate('sapi/v1/asset/assetDetail', params);
  }

  getTradeFee(params?: Partial<BasicSymbolParam>): Promise<SymbolTradeFee[]> {
    return this.getPrivate('sapi/v1/asset/tradeFee', params);
  }

  submitUniversalTransfer(params: UniversalTransferParams): Promise<{ tranId: number; }> {
    return this.postPrivate('sapi/v1/asset/transfer', params);
  }

  getUniversalTransferHistory(params: UniversalTransferHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/asset/transfer', params);
  }

  getApiTradingStatus(): Promise<APITradingStatus> {
    return this.getPrivate('sapi/v1/account/apiTradingStatus');
  }

  getApiKeyPermissions(): Promise<APIPermissions> {
    return this.getPrivate('sapi/v1/account/apiRestrictions');
  }

  /**
   *
   * Sub-Account Endpoints
   *
  **/

  createVirtualSubAccount(params: VirtualSubaccountParams): Promise<any> {
    return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
  }

  getSubAccountList(params?: SubAccountListParams): Promise<any> {
    return this.getPrivate('sapi/v1/sub-account/list', params);
  }

  // TODO: https://binance-docs.github.io/apidocs/spot/en/#sub-account-endpoints

  /**
   *
   * Market Data Endpoints
   *
  **/

  testConnectivity(): Promise<{}> {
    return this.get('api/v3/ping');
  }

  getExchangeInfo(params?: ExchangeInfoParams): Promise<ExchangeInfo> {
    const symbols = params?.symbols && JSON.stringify(params.symbols);
    const symbol = params?.symbol;

    let urlSuffix = '';
    if (symbols || symbol) {
      urlSuffix += '?' + (symbols || symbol);
    }

    return this.get('api/v3/exchangeInfo' + urlSuffix);
  }

  getOrderBook(params: OrderBookParams): Promise<OrderBookResponse> {
    return this.get('api/v3/depth', params);
  }

  getRecentTrades(params: RecentTradesParams): Promise<RawTrade[]> {
    return this.get('api/v3/trades', params);
  }

  getHistoricalTrades(params: HistoricalTradesParams): Promise<RawTrade[]> {
    return this.getPrivate('api/v3/historicalTrades', params);
  }

  getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateTrade[]> {
    return this.get('api/v3/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<any> {
    return this.get('api/v3/klines', params);
  }

  getAvgPrice(params: BasicSymbolParam): Promise<CurrentAvgPrice> {
    return this.get('api/v3/avgPrice', params);
  }

  get24hrChangeStatististics(params?: Partial<BasicSymbolParam>): Promise<DailyChangeStatistic | DailyChangeStatistic[]> {
    if (!params?.symbol) {
      return this.get('api/v3/ticker/24hr') as Promise<DailyChangeStatistic[]>;
    }
    return this.get('api/v3/ticker/24hr', params) as Promise<DailyChangeStatistic>;
  }

  getSymbolPriceTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('api/v3/ticker/price', params);
  }

  getSymbolOrderBookTicker(params?: Partial<BasicSymbolParam>): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]> {
    return this.get('api/v3/ticker/bookTicker', params);
  }

  /**
   *
   * Spot Account/Trade Endpoints
   *
  **/

  testNewOrder(params: NewSpotOrderParams): Promise<{}> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order/test', params);
  }

  submitNewOrder(params: NewSpotOrderParams): Promise<OrderResponseACK | OrderResponseResult | OrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    const result = this.postPrivate('api/v3/order', params);

    switch (params.newOrderRespType) {
      case 'ACK':
        return result as Promise<OrderResponseACK>;

      case 'RESULT':
        return result as Promise<OrderResponseResult>;

      case 'FULL':
        return result as Promise<OrderResponseFull>;
    }

    return result;
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('api/v3/order', params);
  }

  cancelAllSymbolOrders(params: BasicSymbolParam): Promise<CancelSpotOrderResult[]> {
    return this.deletePrivate('api/v3/openOrders', params);
  }

  getOrder(params: GetOrderParams): Promise<SpotOrder> {
    return this.getPrivate('api/v3/order', params);
  }

  getOpenOrders(params?: Partial<BasicSymbolParam>): Promise<SpotOrder[]> {
    return this.getPrivate('api/v3/openOrders', params);
  }

  getAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]> {
    return this.getPrivate('api/v3/allOrders', params);
  }

  submitNewOCO(params: NewOCOParams): Promise<any> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    return this.postPrivate('api/v3/order/oco', params);
  }

  cancelOCO(params: CancelOCOParams): Promise<any> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.deletePrivate('api/v3/orderList', params);
  }

  getOCO(params?: GetOCOParams): Promise<any> {
    return this.getPrivate('api/v3/orderList', params);
  }

  getAllOCO(params?: BasicFromPaginatedParams): Promise<any> {
    return this.postPrivate('api/v3/allOrderList', params);
  }

  getAllOpenOCO(): Promise<any> {
    return this.postPrivate('api/v3/openOrderList');
  }

  getAccountInformation(): Promise<AccountInformation> {
    return this.postPrivate('api/v3/account');
  }

  getAccountTradeList(params: SymbolFromPaginatedRequestFromId): Promise<RawAccountTrade[]> {
    return this.getPrivate('api/v3/myTrades', params);
  }

  /**
   *
   * Margin Account/Trade Endpoints
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#margin-account-trade


  /**
   *
   * User Data Stream Endpoints
   *
  **/

  // spot
  getSpotUserDataListenKey(): Promise<{ listenKey: string; }> {
    return this.post('api/v3/userDataStream');
  }

  keepAliveSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  closeSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  // margin
  getMarginUserDataListenKey(): Promise<{ listenKey: string; }> {
    return this.post('sapi/v1/userDataStream');
  }

  keepAliveMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  closeMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  // isolated margin
  getIsolatedMarginUserDataListenKey(params: { symbol: string; }): Promise<{ listenKey: string; }> {
    return this.post(`sapi/v1/userDataStream/isolated?${serialiseParams(params)}`);
  }

  keepAliveIsolatedMarginUserDataListenKey(params: { symbol: string; listenKey: string; }): Promise<{}> {
    return this.put(`sapi/v1/userDataStream/isolated?${serialiseParams(params)}`);
  }

  closeIsolatedMarginUserDataListenKey(params: { symbol: string; listenKey: string; }): Promise<{}> {
    return this.delete(`sapi/v1/userDataStream/isolated?${serialiseParams(params)}`);
  }

  /**
   *
   * Savings Endpoints
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#savings-endpoints

  /**
   *
   * Mining Endpoints
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#mining-endpoints

  /**
   *
   * Futures Management Endpoints
   * Note: to trade futures use the usdm-client or coinm-client. The spot client only has the futures endpoints listed in the "spot" docs category
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#futures

  /**
   *
   * BLVT Endpoints
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#blvt-endpoints

  /**
   *
   * BSwap Endpoints
   *
  **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#bswap-endpoints


  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(params: NewSpotOrderParams | CancelOrderParams | NewOCOParams | CancelOCOParams, orderIdProperty: OrderIdProperty): void {
    const apiCategory = 'spot';
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
