import { AxiosRequestConfig } from 'axios';
import {
  BasicAssetPaginatedParams,
  BasicAssetParam,
  BasicSymbolParam,
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  ExchangeSymbol,
  GetAllOrdersParams,
  GetOrderParams,
  HistoricalTradesParams,
  KlinesParams,
  NewOCOParams,
  OrderBookParams,
  OrderIdProperty,
  RecentTradesParams,
  SymbolFromPaginatedRequestFromId,
} from './types/shared';

import {
  AccountInformation,
  AggregateTrade,
  AllCoinsInformationResponse,
  APIPermissions,
  APITradingStatus,
  AssetDetail,
  BasicFromPaginatedParams,
  BasicFuturesSubAccountParams,
  BasicMarginAssetParams,
  BasicSubAccount,
  BasicTimeRangeParam,
  CancelSpotOrderResult,
  ConvertDustParams,
  CreateSubAccountParams,
  CrossMarginAccountTransferParams,
  CurrentAvgPrice,
  DailyAccountSnapshot,
  DailyAccountSnapshotParams,
  DailyChangeStatistic,
  DepositAddressParams,
  DepositAddressResponse,
  DepositHistory,
  DepositHistoryParams,
  DustConversion,
  DustInfo,
  DustLog,
  EnableOrDisableIPRestrictionForSubAccountParams,
  ExchangeInfo,
  ExchangeInfoParams,
  FuturesPositionRisk,
  GetOCOParams,
  IsolatedMarginAccountInfo,
  IsolatedMarginAccountTransferParams,
  MarginAccountLoanParams,
  MarginRecordResponse,
  MarginTransactionResponse,
  NewSpotOrderParams,
  OrderBookResponse,
  OrderResponseACK,
  OrderResponseFull,
  OrderResponseResult,
  QueryCrossMarginAccountDetailsParams,
  QueryCrossMarginPairParams,
  QueryCrossMarginPairResponse,
  QueryMarginAssetParams,
  QueryMarginAssetResponse,
  QueryMarginPriceIndexResponse,
  QueryMarginRecordParams,
  QueryMaxBorrowResponse,
  QueryMaxTransferOutAmountResponse,
  RawAccountTrade,
  RawTrade,
  SpotOrder,
  StakingBasicParams,
  StakingHistory,
  StakingHistoryParams,
  StakingPersonalLeftQuota,
  StakingProduct,
  StakingProductPosition,
  StakingProductType,
  SubAccountAddOrDeleteIPList,
  SubAccountAssetDetails,
  SubAccountAssets,
  SubAccountAssetsParams,
  SubAccountCOINMDetail,
  SubAccountCOINMPositionRisk,
  SubAccountCOINMSummary,
  SubAccountDepositAddress,
  SubAccountDepositAddressParams,
  SubAccountDepositHistoryParams,
  SubAccountEnableFutures,
  SubAccountEnableLeverageToken,
  SubAccountEnableMargin,
  SubAccountFuturesAccountDetail,
  SubAccountFuturesAccountSummary,
  SubAccountFuturesAssetTransfer,
  SubAccountFuturesAssetTransferHistory,
  SubAccountFuturesAssetTransferHistoryParams,
  SubAccountFuturesAssetTransferParams,
  SubAccountListParams,
  SubAccountListResponse,
  SubAccountMarginAccountDetail,
  SubAccountnableOrDisableIPRestriction,
  SubAccountsMarginAccountSummary,
  SubAccountSpotAssetsSummary,
  SubAccountSpotAssetsSummaryParams,
  SubAccountSpotAssetTransferHistory,
  SubAccountSpotAssetTransferHistoryParams,
  SubAccountStatus,
  SubAccountSummaryOnFuturesAccountV2Params,
  SubAccountTransfer,
  SubAccountTransferHistory,
  SubAccountTransferHistoryParams,
  SubAccountTransferParams,
  SubAccountTransferToMasterParams,
  SubAccountTransferToSameMasterParams,
  SubAccountUniversalTransfer,
  SubAccountUniversalTransferHistoryParams,
  SubAccountUniversalTransferHistoryResponse,
  SubAccountUniversalTransferParams,
  SubAccountUSDMDetail,
  SubAccountUSDMPositionRisk,
  SubAccountUSDMSummary,
  SymbolOrderBookTicker,
  SymbolPrice,
  SymbolTradeFee,
  SystemStatusResponse,
  UniversalTransferHistoryParams,
  UniversalTransferParams,
  VirtualSubAccount,
  WithdrawAssetsFromManagedSubAccountParams,
  WithdrawHistory,
  WithdrawHistoryParams,
  WithdrawParams,
} from './types/spot';

import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
  serialiseParams,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';

export class MainClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
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

  getDailyAccountSnapshot(
    params: DailyAccountSnapshotParams
  ): Promise<DailyAccountSnapshot> {
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

  getWithdrawHistory(
    params?: WithdrawHistoryParams
  ): Promise<WithdrawHistory[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/history', params);
  }

  getDepositAddress(
    params: DepositAddressParams
  ): Promise<DepositAddressResponse> {
    return this.getPrivate('sapi/v1/capital/deposit/address', params);
  }

  getAccountStatus(): Promise<{ data: string }> {
    return this.getPrivate('sapi/v1/account/status');
  }

  getDustLog(params?: BasicTimeRangeParam): Promise<DustLog> {
    return this.getPrivate('sapi/v1/asset/dribblet', params);
  }

  convertDustToBnb(params: ConvertDustParams): Promise<DustConversion> {
    return this.postPrivate('sapi/v1/asset/dust', params);
  }

  getDust(): Promise<DustInfo> {
    return this.postPrivate('sapi/v1/asset/dust-btc');
  }

  getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any> {
    return this.getPrivate('sapi/v1/asset/assetDividend', params);
  }

  getAssetDetail(
    params?: Partial<BasicAssetParam>
  ): Promise<Record<ExchangeSymbol, AssetDetail>> {
    return this.getPrivate('sapi/v1/asset/assetDetail', params);
  }

  getTradeFee(params?: Partial<BasicSymbolParam>): Promise<SymbolTradeFee[]> {
    return this.getPrivate('sapi/v1/asset/tradeFee', params);
  }

  submitUniversalTransfer(
    params: UniversalTransferParams
  ): Promise<{ tranId: number }> {
    return this.postPrivate('sapi/v1/asset/transfer', params);
  }

  getUniversalTransferHistory(
    params: UniversalTransferHistoryParams
  ): Promise<any> {
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

  createVirtualSubAccount(
    params: CreateSubAccountParams
  ): Promise<VirtualSubAccount> {
    return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
  }

  getSubAccountList(
    params?: SubAccountListParams
  ): Promise<SubAccountListResponse> {
    return this.getPrivate('sapi/v1/sub-account/list', params);
  }

  getSubAccountSpotAssetTransferHistory(
    params?: SubAccountSpotAssetTransferHistoryParams
  ): Promise<SubAccountSpotAssetTransferHistory> {
    return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
  }

  getSubAccountFuturesAssetTransferHistory(
    params: SubAccountFuturesAssetTransferHistoryParams
  ): Promise<SubAccountFuturesAssetTransferHistory> {
    return this.getPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params
    );
  }

  subAccountFuturesAssetTransfer(
    params: SubAccountFuturesAssetTransferParams
  ): Promise<SubAccountFuturesAssetTransfer> {
    return this.postPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params
    );
  }

  getSubAccountAssets(
    params: SubAccountAssetsParams
  ): Promise<SubAccountAssets> {
    return this.getPrivate('sapi/v3/sub-account/assets', params);
  }

  getSubAccountSpotAssetsSummary(
    params?: SubAccountSpotAssetsSummaryParams
  ): Promise<SubAccountSpotAssetsSummary> {
    return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
  }

  getSubAccountDepositAddress(
    params: SubAccountDepositAddressParams
  ): Promise<SubAccountDepositAddress> {
    return this.getPrivate('sapi/v1/capital/deposit/subAddress', params);
  }

  getSubAccountDepositHistory(
    params: SubAccountDepositHistoryParams
  ): Promise<DepositHistory[]> {
    return this.getPrivate('sapi/v1/capital/deposit/subHisrec', params);
  }

  getSubAccountStatusOnMarginOrFutures(params?: {
    email?: string;
  }): Promise<SubAccountStatus[]> {
    return this.getPrivate('sapi/v1/sub-account/status', params);
  }

  subAccountEnableMargin(email: string): Promise<SubAccountEnableMargin> {
    return this.postPrivate('sapi/v1/sub-account/margin/enable', { email });
  }

  getSubAccountDetailOnMarginAccount(
    email: string
  ): Promise<SubAccountMarginAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/margin/account', { email });
  }

  getSubAccountsSummaryOfMarginAccount(): Promise<SubAccountsMarginAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/margin/accountSummary');
  }

  subAccountEnableFutures(email: string): Promise<SubAccountEnableFutures> {
    return this.postPrivate('sapi/v1/sub-account/futures/enable', { email });
  }

  getSubAccountFuturesAccountDetail(
    email: string
  ): Promise<SubAccountFuturesAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
  }

  getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
  }

  getSubAccountFuturesPositionRisk(
    email: string
  ): Promise<FuturesPositionRisk[]> {
    return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
      email,
    });
  }

  subAccountFuturesTransfer(
    params: SubAccountTransferParams
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
  }

  subAccountMarginTransfer(
    params: SubAccountTransferParams
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
  }

  subAccountTransferToSameMaster(
    params: SubAccountTransferToSameMasterParams
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
  }

  subAccountTransferToMaster(
    params: SubAccountTransferToMasterParams
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
  }

  subAccountTransferHistory(
    params?: SubAccountTransferHistoryParams
  ): Promise<SubAccountTransferHistory[]> {
    return this.getPrivate(
      'sapi/v1/sub-account/transfer/subUserHistory',
      params
    );
  }

  subAccountUniversalTransfer(
    params: SubAccountUniversalTransferParams
  ): Promise<SubAccountUniversalTransfer> {
    return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountUniversalTransferHistory(
    params?: SubAccountUniversalTransferHistoryParams
  ): Promise<SubAccountUniversalTransferHistoryResponse> {
    return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountDetailOnFuturesAccountV2(
    params: BasicFuturesSubAccountParams
  ): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail> {
    return this.getPrivate('sapi/v2/sub-account/futures/account', params);
  }

  getSubAccountSummaryOnFuturesAccountV2(
    params: SubAccountSummaryOnFuturesAccountV2Params
  ): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary> {
    return this.getPrivate(
      'sapi/v2/sub-account/futures/accountSummary',
      params
    );
  }

  getSubAccountFuturesPositionRiskV2(
    params: BasicFuturesSubAccountParams
  ): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk> {
    return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
  }

  subAccountEnableLeverageToken(
    params: SubAccountEnableLeverageToken
  ): Promise<SubAccountEnableLeverageToken> {
    return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
  }

  subAccountEnableOrDisableIPRestriction(
    params: EnableOrDisableIPRestrictionForSubAccountParams
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params
    );
  }

  subAccountAddIPList(
    params: SubAccountnableOrDisableIPRestriction
  ): Promise<SubAccountAddOrDeleteIPList> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params
    );
  }

  getSubAccountIPRestriction(
    params: BasicSubAccount
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.getPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params
    );
  }

  subAccountDeleteIPList(
    params: SubAccountnableOrDisableIPRestriction
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.deletePrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params
    );
  }

  depositAssetsIntoManagedSubAccount(
    params: SubAccountTransferToSameMasterParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
  }

  getManagedSubAccountAssetDetails(
    email: string
  ): Promise<SubAccountAssetDetails[]> {
    return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
  }

  withdrawAssetsFromManagedSubAccount(
    params: WithdrawAssetsFromManagedSubAccountParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/withdraw', params);
  }

  /**
   * Broker Endpoints
   */

  getBrokerIfNewSpotUser(): Promise<{
    rebateWorking: boolean;
    ifNewUser: boolean;
  }> {
    return this.getPrivate('sapi/v1/apiReferral/ifNewUser');
  }

  getBrokerUserCustomisedId(market: 'spot' | 'futures') {
    const prefix = market === 'spot' ? 'sapi' : 'fapi';
    return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
  }

  // USD & Coin-M can be found under API getIncome() (find "API rebate" in results)
  getBrokerSpotRebateHistory(days: 7 | 30, customerId?: string) {
    if (days === 7) {
      return this.getPrivate('sapi/v1/apiReferral/rebate/recentRecord', {
        customerId,
      });
    }
    if (days === 30) {
      return this.getPrivate('sapi/v1/apiReferral/rebate/historicalRecord', {
        customerId,
      });
    }
  }

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
    if (symbol) {
      urlSuffix += '?symbol=' + symbol;
    } else if (symbols) {
      urlSuffix += '?' + symbols;
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

  getAggregateTrades(
    params: SymbolFromPaginatedRequestFromId
  ): Promise<AggregateTrade[]> {
    return this.get('api/v3/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<any> {
    return this.get('api/v3/klines', params);
  }

  getAvgPrice(params: BasicSymbolParam): Promise<CurrentAvgPrice> {
    return this.get('api/v3/avgPrice', params);
  }

  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam>
  ): Promise<DailyChangeStatistic | DailyChangeStatistic[]> {
    if (!params?.symbol) {
      return this.get('api/v3/ticker/24hr') as Promise<DailyChangeStatistic[]>;
    }
    return this.get(
      'api/v3/ticker/24hr',
      params
    ) as Promise<DailyChangeStatistic>;
  }

  getSymbolPriceTicker(
    params?: Partial<BasicSymbolParam>
  ): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('api/v3/ticker/price', params);
  }

  getSymbolOrderBookTicker(
    params?: Partial<BasicSymbolParam>
  ): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]> {
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

  submitNewOrder(
    params: NewSpotOrderParams
  ): Promise<OrderResponseACK | OrderResponseResult | OrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('api/v3/order', params);
  }

  cancelAllSymbolOrders(
    params: BasicSymbolParam
  ): Promise<CancelSpotOrderResult[]> {
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
    return this.getPrivate('api/v3/allOrderList', params);
  }

  getAllOpenOCO(): Promise<any> {
    return this.getPrivate('api/v3/openOrderList');
  }

  getAccountInformation(): Promise<AccountInformation> {
    return this.getPrivate('api/v3/account');
  }

  getAccountTradeList(
    params: SymbolFromPaginatedRequestFromId
  ): Promise<RawAccountTrade[]> {
    return this.getPrivate('api/v3/myTrades', params);
  }

  /**
   *
   * Margin Account/Trade Endpoints
   *
   **/

  crossMarginAccountTransfer(
    params: CrossMarginAccountTransferParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/transfer', params);
  }

  marginAccountBorrow(
    params: MarginAccountLoanParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/loan', params);
  }

  marginAccountRepay(
    params: MarginAccountLoanParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/repay', params);
  }

  queryMarginAsset(
    params: QueryMarginAssetParams
  ): Promise<QueryMarginAssetResponse> {
    return this.get('sapi/v1/margin/asset', params);
  }

  queryCrossMarginPair(
    params: QueryCrossMarginPairParams
  ): Promise<QueryCrossMarginPairResponse> {
    return this.get('sapi/v1/margin/pair', params);
  }

  getAllMarginAssets(): Promise<QueryMarginAssetResponse[]> {
    return this.get('sapi/v1/margin/allAssets');
  }

  getAllCrossMarginPairs(): Promise<QueryCrossMarginPairResponse[]> {
    return this.get('sapi/v1/margin/allPairs');
  }

  queryMarginPriceIndex(
    params: BasicSymbolParam
  ): Promise<QueryMarginPriceIndexResponse> {
    return this.get('sapi/v1/margin/priceIndex', params);
  }

  marginAccountNewOrder(
    params: NewSpotOrderParams
  ): Promise<OrderResponseACK | OrderResponseResult | OrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('sapi/v1/margin/order', params);
  }

  marginAccountCancelOrder(
    params: CancelOrderParams
  ): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('sapi/v1/margin/order', params);
  }

  marginAccountCancelOpenOrders(
    params: BasicSymbolParam
  ): Promise<CancelSpotOrderResult[]> {
    return this.deletePrivate('sapi/v1/margin/openOrders', params);
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-cross-margin-transfer-history-user_data

  queryLoanRecord(
    params: QueryMarginRecordParams
  ): Promise<MarginRecordResponse> {
    return this.getPrivate('sapi/v1/margin/loan', params);
  }

  queryRepayRecord(
    params: QueryMarginRecordParams
  ): Promise<MarginRecordResponse> {
    return this.getPrivate('sapi/v1/margin/repay', params);
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-interest-history-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-force-liquidation-record-user_data

  queryCrossMarginAccountDetails(): Promise<QueryCrossMarginAccountDetailsParams> {
    return this.getPrivate('sapi/v1/margin/account');
  }

  queryMarginAccountOrder(params: GetOrderParams): Promise<SpotOrder> {
    return this.getPrivate('sapi/v1/margin/order', params);
  }

  queryMarginAccountOpenOrders(params: BasicSymbolParam): Promise<SpotOrder[]> {
    return this.getPrivate('sapi/v1/margin/openOrders', params);
  }

  queryMarginAccountAllOrders(
    params: GetAllOrdersParams
  ): Promise<SpotOrder[]> {
    return this.getPrivate('sapi/v1/margin/allOrders', params);
  }

  marginAccountNewOCO(params: NewOCOParams): Promise<any> {
    this.validateOrderId(params, 'listClientOrderId');
    this.validateOrderId(params, 'limitClientOrderId');
    this.validateOrderId(params, 'stopClientOrderId');
    return this.postPrivate('sapi/v1/margin/order/oco', params);
  }

  marginAccountCancelOCO(params: CancelOCOParams): Promise<any> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.deletePrivate('sapi/v1/margin/orderList', params);
  }

  queryMarginAccountOCO(params: GetOCOParams): Promise<any> {
    return this.getPrivate('sapi/v1/margin/orderList', params);
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-all-oco-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-open-oco-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-trade-list-user_data

  queryMaxBorrow(
    params: BasicMarginAssetParams
  ): Promise<QueryMaxBorrowResponse> {
    return this.getPrivate('sapi/v1/margin/maxBorrowable', params);
  }

  queryMaxTransferOutAmount(
    params: BasicMarginAssetParams
  ): Promise<QueryMaxTransferOutAmountResponse> {
    return this.getPrivate('sapi/v1/margin/maxTransferable', params);
  }

  isolatedMarginAccountTransfer(
    params: IsolatedMarginAccountTransferParams
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/isolated/transfer', params);
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-isolated-margin-transfer-history-user_data

  getIsolatedMarginAccountInfo(params?: {
    symbols?: string;
  }): Promise<IsolatedMarginAccountInfo> {
    return this.getPrivate('sapi/v1/margin/isolated/account', { params });
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#disable-isolated-margin-account-trade

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#enable-isolated-margin-account-trade

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-enabled-isolated-margin-account-limit-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-symbol-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-all-isolated-margin-symbol-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#toggle-bnb-burn-on-spot-trade-and-margin-interest-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-bnb-burn-status-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-margin-interest-rate-history-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-fee-data-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-fee-data-user_data

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-tier-data-user_data

  /**
   *
   * User Data Stream Endpoints
   *
   **/

  // spot
  getSpotUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('api/v3/userDataStream');
  }

  keepAliveSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  closeSpotUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
  }

  // margin
  getMarginUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('sapi/v1/userDataStream');
  }

  keepAliveMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  closeMarginUserDataListenKey(listenKey: string): Promise<{}> {
    return this.delete(`sapi/v1/userDataStream?listenKey=${listenKey}`);
  }

  // isolated margin
  getIsolatedMarginUserDataListenKey(params: {
    symbol: string;
  }): Promise<{ listenKey: string }> {
    return this.post(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`
    );
  }

  keepAliveIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.put(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`
    );
  }

  closeIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.delete(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`
    );
  }

  /**
   *
   * Staking Endpoints
   *
   **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#purchase-staking-product-user_data
  //TODO: https://binance-docs.github.io/apidocs/spot/en/#redeem-staking-product-user_data
  //TODO: https://binance-docs.github.io/apidocs/spot/en/#set-auto-staking-user_data

  getStakingProducts(
    params: StakingBasicParams & {
      asset?: string;
    }
  ): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/staking/productList`, params);
  }

  getStakingProductPosition(
    params: StakingBasicParams & {
      productId?: string;
      asset?: string;
    }
  ): Promise<StakingProductPosition[]> {
    return this.getPrivate('sapi/v1/staking/position', params);
  }

  getStakingHistory(params: StakingHistoryParams): Promise<StakingHistory[]> {
    return this.getPrivate('sapi/v1/staking/stakingRecord', params);
  }

  getPersonalLeftQuotaOfStakingProduct(params: {
    product: StakingProductType;
    productId: string;
  }): Promise<StakingPersonalLeftQuota> {
    return this.getPrivate('sapi/v1/staking/personalLeftQuota', params);
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
  private validateOrderId(
    params:
      | NewSpotOrderParams
      | CancelOrderParams
      | NewOCOParams
      | CancelOCOParams,
    orderIdProperty: OrderIdProperty
  ): void {
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
}

/**
 * @deprecated use MainClient instead of SpotClient (it is the same)
 */
export const SpotClient = MainClient;
