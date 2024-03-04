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
  Kline,
  NewOCOParams,
  OrderBookParams,
  OrderIdProperty,
  RecentTradesParams,
  SymbolFromPaginatedRequestFromId,
  SymbolPrice,
  RowsWithTotal,
  CoinStartEndLimit,
  SymbolArrayParam,
} from './types/shared';

import {
  AccountInformation,
  AddBSwapLiquidityParams,
  AggregateTrade,
  AllCoinsInformationResponse,
  ApiKeyBrokerSubAccount,
  APIPermissions,
  APITradingStatus,
  AssetDetail,
  BasicBSwapResp,
  BasicFromPaginatedParams,
  BasicFuturesSubAccountParams,
  BasicMarginAssetParams,
  BasicSubAccount,
  BasicTimeRangeParam,
  BrokerSubAccount,
  BrokerSubAccountHistory,
  BSwapLiquidity,
  BSwapOperations,
  BSwapOperationsParams,
  CancelSpotOrderResult,
  ChangePermissionApiKeyBrokerSubAccountParams,
  ChangePermissionApiKeyBrokerSubAccountResponse,
  ConvertDustParams,
  CreateApiKeyBrokerSubAccountParams,
  CreateApiKeyBrokerSubAccountResponse,
  CreateBrokerSubAccountParams,
  CreateSubAccountParams,
  CrossMarginAccountTransferParams,
  CurrentAvgPrice,
  DailyAccountSnapshot,
  DailyAccountSnapshotParams,
  DailyChangeStatistic,
  DeleteApiKeyBrokerSubAccountParams,
  DepositAddressParams,
  DepositAddressResponse,
  DepositHistory,
  DepositHistoryParams,
  DustConversion,
  DustInfo,
  DustLog,
  EnableFuturesBrokerSubAccountParams,
  EnableFuturesBrokerSubAccountResponse,
  EnableMarginApiKeyBrokerSubAccountParams,
  EnableMarginBrokerSubAccountParams,
  EnableMarginBrokerSubAccountResponse,
  EnableOrDisableIPRestrictionForSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountParams,
  EnableUniversalTransferApiKeyBrokerSubAccountResponse,
  ExchangeInfo,
  ExchangeInfoParams,
  FixedAndActivityProjectParams,
  FixedAndActivityProjectPositionParams,
  FlexibleSavingBasicParams,
  FuturesPositionRisk,
  GetApiKeyBrokerSubAccountParams,
  GetBrokerInfoResponse,
  GetBrokerSubAccountParams,
  GetBrokerSubAccountHistoryParams,
  GetBrokerSubAccountDepositHistoryParams,
  GetOCOParams,
  GetUniversalTransferBrokerParams,
  IsolatedMarginAccountInfo,
  IsolatedMarginAccountTransferParams,
  LeftDailyPurchaseQuotaFlexibleProductResponse,
  MarginAccountLoanParams,
  MarginRecordResponse,
  MarginTransactionResponse,
  NewSpotOrderParams,
  OrderBookResponse,
  OrderResponseACK,
  OrderResponseFull,
  OrderResponseResult,
  TransferBrokerSubAccountParams,
  TransferBrokerSubAccount,
  PurchaseFlexibleProductParams,
  PurchaseFlexibleProductResponse,
  PurchaseRecordParams,
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
  RedeemFlexibleProductParams,
  RemoveBSwapLiquidityParams,
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
  SymbolTradeFee,
  SystemStatusResponse,
  UniversalTransferBrokerParams,
  UniversalTransferHistoryParams,
  UniversalTransferParams,
  VirtualSubAccount,
  WithdrawAssetsFromManagedSubAccountParams,
  WithdrawHistory,
  WithdrawHistoryParams,
  WithdrawParams,
  NewFutureAccountTransferParams,
  GetFutureAccountTransferHistoryParams,
  FutureAccountTransfer,
  GetLoanCoinPaginatedHistoryParams,
  SubAccountDepositHistoryList,
  ConvertQuoteRequestParams,
  GetConvertTradeHistoryParams,
  GetOrderStatusParams,
  EnableConvertSubAccountParams,
  AcceptQuoteRequestParams,
  ReplaceSpotOrderParams,
  ReplaceSpotOrderResultError,
  ReplaceSpotOrderResultSuccess,
  NewSpotSOROrderParams,
  SOROrderResponseFull,
  SORTestOrderResponse,
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

  getDailyAccountSnapshot(
    params: DailyAccountSnapshotParams,
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
    params?: WithdrawHistoryParams,
  ): Promise<WithdrawHistory[]> {
    return this.getPrivate('sapi/v1/capital/withdraw/history', params);
  }

  getDepositAddress(
    params: DepositAddressParams,
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
    params?: Partial<BasicAssetParam>,
  ): Promise<Record<ExchangeSymbol, AssetDetail>> {
    return this.getPrivate('sapi/v1/asset/assetDetail', params);
  }

  getTradeFee(params?: Partial<BasicSymbolParam>): Promise<SymbolTradeFee[]> {
    return this.getPrivate('sapi/v1/asset/tradeFee', params);
  }

  submitUniversalTransfer(
    params: UniversalTransferParams,
  ): Promise<{ tranId: number }> {
    return this.postPrivate('sapi/v1/asset/transfer', params);
  }

  getUniversalTransferHistory(
    params: UniversalTransferHistoryParams,
  ): Promise<any> {
    return this.getPrivate('sapi/v1/asset/transfer', params);
  }

  getApiTradingStatus(): Promise<APITradingStatus> {
    return this.getPrivate('sapi/v1/account/apiTradingStatus');
  }

  getApiKeyPermissions(): Promise<APIPermissions> {
    return this.getPrivate('sapi/v1/account/apiRestrictions');
  }

  acceptQuoteRequest(params: AcceptQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/acceptQuote', params);
  }

  enableConvertSubAccount(params: EnableConvertSubAccountParams): Promise<any> {
    return this.postPrivate('sapi/v1/broker/subAccount/convert', params);
  }

  convertQuoteRequest(params: ConvertQuoteRequestParams): Promise<any> {
    return this.postPrivate('sapi/v1/convert/getQuote', params);
  }

  getOrderStatus(params: GetOrderStatusParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/orderStatus', params);
  }

  getConvertTradeHistory(params: GetConvertTradeHistoryParams): Promise<any> {
    return this.getPrivate('sapi/v1/convert/tradeFlow', params);
  }

  /**
   *
   * Sub-Account Endpoints
   *
   **/

  createVirtualSubAccount(
    params: CreateSubAccountParams,
  ): Promise<VirtualSubAccount> {
    return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
  }

  getSubAccountList(
    params?: SubAccountListParams,
  ): Promise<SubAccountListResponse> {
    return this.getPrivate('sapi/v1/sub-account/list', params);
  }

  getSubAccountSpotAssetTransferHistory(
    params?: SubAccountSpotAssetTransferHistoryParams,
  ): Promise<SubAccountSpotAssetTransferHistory> {
    return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
  }

  getSubAccountFuturesAssetTransferHistory(
    params: SubAccountFuturesAssetTransferHistoryParams,
  ): Promise<SubAccountFuturesAssetTransferHistory> {
    return this.getPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  subAccountFuturesAssetTransfer(
    params: SubAccountFuturesAssetTransferParams,
  ): Promise<SubAccountFuturesAssetTransfer> {
    return this.postPrivate(
      'sapi/v1/sub-account/futures/internalTransfer',
      params,
    );
  }

  getSubAccountAssets(
    params: SubAccountAssetsParams,
  ): Promise<SubAccountAssets> {
    return this.getPrivate('sapi/v3/sub-account/assets', params);
  }

  getSubAccountSpotAssetsSummary(
    params?: SubAccountSpotAssetsSummaryParams,
  ): Promise<SubAccountSpotAssetsSummary> {
    return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
  }

  getSubAccountDepositAddress(
    params: SubAccountDepositAddressParams,
  ): Promise<SubAccountDepositAddress> {
    return this.getPrivate('sapi/v1/capital/deposit/subAddress', params);
  }

  getSubAccountDepositHistory(
    params: SubAccountDepositHistoryParams,
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
    email: string,
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
    email: string,
  ): Promise<SubAccountFuturesAccountDetail> {
    return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
  }

  getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary> {
    return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
  }

  getSubAccountFuturesPositionRisk(
    email: string,
  ): Promise<FuturesPositionRisk[]> {
    return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
      email,
    });
  }

  subAccountFuturesTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
  }

  subAccountMarginTransfer(
    params: SubAccountTransferParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
  }

  subAccountTransferToSameMaster(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
  }

  subAccountTransferToMaster(
    params: SubAccountTransferToMasterParams,
  ): Promise<SubAccountTransfer> {
    return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
  }

  subAccountTransferHistory(
    params?: SubAccountTransferHistoryParams,
  ): Promise<SubAccountTransferHistory[]> {
    return this.getPrivate(
      'sapi/v1/sub-account/transfer/subUserHistory',
      params,
    );
  }

  subAccountUniversalTransfer(
    params: SubAccountUniversalTransferParams,
  ): Promise<SubAccountUniversalTransfer> {
    return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountUniversalTransferHistory(
    params?: SubAccountUniversalTransferHistoryParams,
  ): Promise<SubAccountUniversalTransferHistoryResponse> {
    return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
  }

  getSubAccountDetailOnFuturesAccountV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail> {
    return this.getPrivate('sapi/v2/sub-account/futures/account', params);
  }

  getSubAccountSummaryOnFuturesAccountV2(
    params: SubAccountSummaryOnFuturesAccountV2Params,
  ): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary> {
    return this.getPrivate(
      'sapi/v2/sub-account/futures/accountSummary',
      params,
    );
  }

  getSubAccountFuturesPositionRiskV2(
    params: BasicFuturesSubAccountParams,
  ): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk> {
    return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
  }

  subAccountEnableLeverageToken(
    params: SubAccountEnableLeverageToken,
  ): Promise<SubAccountEnableLeverageToken> {
    return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
  }

  subAccountEnableOrDisableIPRestriction(
    params: EnableOrDisableIPRestrictionForSubAccountParams,
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  subAccountAddIPList(
    params: SubAccountnableOrDisableIPRestriction,
  ): Promise<SubAccountAddOrDeleteIPList> {
    return this.postPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  getSubAccountIPRestriction(
    params: BasicSubAccount,
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.getPrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction',
      params,
    );
  }

  subAccountDeleteIPList(
    params: SubAccountnableOrDisableIPRestriction,
  ): Promise<SubAccountnableOrDisableIPRestriction> {
    return this.deletePrivate(
      'sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
      params,
    );
  }

  depositAssetsIntoManagedSubAccount(
    params: SubAccountTransferToSameMasterParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
  }

  getManagedSubAccountAssetDetails(
    email: string,
  ): Promise<SubAccountAssetDetails[]> {
    return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
  }

  withdrawAssetsFromManagedSubAccount(
    params: WithdrawAssetsFromManagedSubAccountParams,
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

  getBrokerSubAccountDepositHistory(
    params?: GetBrokerSubAccountDepositHistoryParams,
  ): Promise<SubAccountDepositHistoryList[]> {
    return this.getPrivate('sapi/v1/broker/subAccount/depositHist', params);
  }

  getBrokerUserCustomisedId(market: 'spot' | 'futures') {
    const prefix = market === 'spot' ? 'sapi' : 'fapi';
    return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
  }

  createBrokerSubAccount(
    params: CreateBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  getBrokerSubAccountHistory(
    params: GetBrokerSubAccountHistoryParams,
  ): Promise<BrokerSubAccountHistory[]> {
    return this.getPrivate('sapi/v1/broker/transfer', params);
  }

  getBrokerSubAccount(
    params: GetBrokerSubAccountParams,
  ): Promise<BrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccount', params);
  }

  getApiKeyBrokerSubAccount(
    params: GetApiKeyBrokerSubAccountParams,
  ): Promise<ApiKeyBrokerSubAccount[]> {
    return this.getPrivate('sapi/v1/broker/subAccountApi', params);
  }

  createApiKeyBrokerSubAccount(
    params: CreateApiKeyBrokerSubAccountParams,
  ): Promise<CreateApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi', params);
  }

  deleteApiKeyBrokerSubAccount(
    params: DeleteApiKeyBrokerSubAccountParams,
  ): Promise<{}> {
    return this.deletePrivate('sapi/v1/broker/subAccountApi', params);
  }

  changePermissionApiKeyBrokerSubAccount(
    params: ChangePermissionApiKeyBrokerSubAccountParams,
  ): Promise<ChangePermissionApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
  }

  changeComissionBrokerSubAccount(
    params: ChangePermissionApiKeyBrokerSubAccountParams,
  ): Promise<ChangePermissionApiKeyBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
  }

  enableUniversalTransferApiKeyBrokerSubAccount(
    params: EnableUniversalTransferApiKeyBrokerSubAccountParams,
  ): Promise<EnableUniversalTransferApiKeyBrokerSubAccountResponse> {
    return this.postPrivate(
      'sapi/v1/broker/subAccountApi/permission/universalTransfer',
      params,
    );
  }

  enableMarginBrokerSubAccount(
    params: EnableMarginBrokerSubAccountParams,
  ): Promise<EnableMarginBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount/futures', params);
  }

  enableFuturesBrokerSubAccount(
    params: EnableFuturesBrokerSubAccountParams,
  ): Promise<EnableFuturesBrokerSubAccountResponse> {
    return this.postPrivate('sapi/v1/broker/subAccount', params);
  }

  enableMarginApiKeyBrokerSubAccount(
    params: EnableMarginApiKeyBrokerSubAccountParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/subAccount/margin', params);
  }

  transferBrokerSubAccount(
    params: TransferBrokerSubAccountParams,
  ): Promise<TransferBrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/transfer', params);
  }

  universalTransferBroker(
    params: UniversalTransferBrokerParams,
  ): Promise<BrokerSubAccount> {
    return this.postPrivate('sapi/v1/broker/universalTransfer', params);
  }

  getUniversalTransferBroker(
    params: GetUniversalTransferBrokerParams,
  ): Promise<BrokerSubAccount> {
    return this.getPrivate('sapi/v1/broker/universalTransfer', params);
  }

  getBrokerInfo(): Promise<GetBrokerInfoResponse> {
    return this.getPrivate('sapi/v1/broker/info');
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
      urlSuffix += '?symbols=' + symbols;
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
    return this.get('api/v3/historicalTrades', params);
  }

  getAggregateTrades(
    params: SymbolFromPaginatedRequestFromId,
  ): Promise<AggregateTrade[]> {
    return this.get('api/v3/aggTrades', params);
  }

  getKlines(params: KlinesParams): Promise<Kline[]> {
    return this.get('api/v3/klines', params);
  }

  getAvgPrice(params: BasicSymbolParam): Promise<CurrentAvgPrice> {
    return this.get('api/v3/avgPrice', params);
  }

  get24hrChangeStatististics(
    params: BasicSymbolParam,
  ): Promise<DailyChangeStatistic>;

  get24hrChangeStatististics(
    params?: SymbolArrayParam,
  ): Promise<DailyChangeStatistic[]>;

  get24hrChangeStatististics(
    params?: Partial<BasicSymbolParam> | Partial<SymbolArrayParam>,
  ): Promise<DailyChangeStatistic | DailyChangeStatistic[]> {
    if (params && typeof params['symbol'] === 'string') {
      return this.get('api/v3/ticker/24hr', params);
    }

    if (params && params['symbols'] && Array.isArray(params['symbols'])) {
      const symbols = (params as SymbolArrayParam).symbols;
      const symbolsQueryParam = JSON.stringify(symbols);

      return this.get('api/v3/ticker/24hr?symbols=' + symbolsQueryParam);
    }

    return this.get('api/v3/ticker/24hr');
  }

  getSymbolPriceTicker(
    params?: Partial<BasicSymbolParam>,
  ): Promise<SymbolPrice | SymbolPrice[]> {
    return this.get('api/v3/ticker/price', params);
  }

  getSymbolOrderBookTicker(
    params?: Partial<BasicSymbolParam>,
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

  replaceOrder(
    params: ReplaceSpotOrderParams,
  ): Promise<ReplaceSpotOrderResultSuccess> {
    return this.postPrivate('api/v3/order/cancelReplace', params);
  }

  submitNewOrder(
    params: NewSpotOrderParams,
  ): Promise<OrderResponseACK | OrderResponseResult | OrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('api/v3/order', params);
  }

  cancelAllSymbolOrders(
    params: BasicSymbolParam,
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

  /**
   * Query open OCO
   */
  getAllOpenOCO(): Promise<any> {
    return this.getPrivate('api/v3/openOrderList');
  }

  /**
   * Places an order using smart order routing (SOR).
   */
  submitNewSOROrder(
    params: NewSpotSOROrderParams,
  ): Promise<SOROrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/sor/order', params);
  }

  /**
   * Test new order creation and signature/recvWindow using smart order routing (SOR).
   * Creates and validates a new order but does not send it into the matching engine.
   */
  testNewSOROrder(
    params: NewSpotSOROrderParams & { computeCommissionRates?: boolean },
  ): Promise<{} | SORTestOrderResponse> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('api/v3/sor/order/test', params);
  }

  /**
   *
   *
   * Spot Account Endpoints
   *
   *
   */

  /**
   * Get current account information
   */
  getAccountInformation(): Promise<AccountInformation> {
    return this.getPrivate('api/v3/account');
  }

  getAccountTradeList(
    params: SymbolFromPaginatedRequestFromId & { orderId?: number },
  ): Promise<RawAccountTrade[]> {
    return this.getPrivate('api/v3/myTrades', params);
  }

  /**
   *
   * Margin Account/Trade Endpoints
   *
   **/

  crossMarginAccountTransfer(
    params: CrossMarginAccountTransferParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/transfer', params);
  }

  marginAccountBorrow(
    params: MarginAccountLoanParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/loan', params);
  }

  marginAccountRepay(
    params: MarginAccountLoanParams,
  ): Promise<MarginTransactionResponse> {
    return this.postPrivate('sapi/v1/margin/repay', params);
  }

  queryMarginAsset(
    params: QueryMarginAssetParams,
  ): Promise<QueryMarginAssetResponse> {
    return this.get('sapi/v1/margin/asset', params);
  }

  queryCrossMarginPair(
    params: QueryCrossMarginPairParams,
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
    params: BasicSymbolParam,
  ): Promise<QueryMarginPriceIndexResponse> {
    return this.get('sapi/v1/margin/priceIndex', params);
  }

  marginAccountNewOrder(
    params: NewSpotOrderParams,
  ): Promise<OrderResponseACK | OrderResponseResult | OrderResponseFull> {
    this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('sapi/v1/margin/order', params);
  }

  marginAccountCancelOrder(
    params: CancelOrderParams,
  ): Promise<CancelSpotOrderResult> {
    return this.deletePrivate('sapi/v1/margin/order', params);
  }

  marginAccountCancelOpenOrders(
    params: BasicSymbolParam,
  ): Promise<CancelSpotOrderResult[]> {
    return this.deletePrivate('sapi/v1/margin/openOrders', params);
  }

  // TODO - https://binance-docs.github.io/apidocs/spot/en/#get-cross-margin-transfer-history-user_data

  queryLoanRecord(
    params: QueryMarginRecordParams,
  ): Promise<MarginRecordResponse> {
    return this.getPrivate('sapi/v1/margin/loan', params);
  }

  queryRepayRecord(
    params: QueryMarginRecordParams,
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
    params: GetAllOrdersParams,
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
    params: BasicMarginAssetParams,
  ): Promise<QueryMaxBorrowResponse> {
    return this.getPrivate('sapi/v1/margin/maxBorrowable', params);
  }

  queryMaxTransferOutAmount(
    params: BasicMarginAssetParams,
  ): Promise<QueryMaxTransferOutAmountResponse> {
    return this.getPrivate('sapi/v1/margin/maxTransferable', params);
  }

  isolatedMarginAccountTransfer(
    params: IsolatedMarginAccountTransferParams,
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
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  keepAliveIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.put(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
    );
  }

  closeIsolatedMarginUserDataListenKey(params: {
    symbol: string;
    listenKey: string;
  }): Promise<{}> {
    return this.delete(
      `sapi/v1/userDataStream/isolated?${serialiseParams(params)}`,
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
    },
  ): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/staking/productList`, params);
  }

  getStakingProductPosition(
    params: StakingBasicParams & {
      productId?: string;
      asset?: string;
    },
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
  getFlexibleSavingProducts(
    params: FlexibleSavingBasicParams,
  ): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/simple-earn/flexible/list`, params);
  }

  purchaseFlexibleProduct(
    params: PurchaseFlexibleProductParams,
  ): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate(`sapi/v1/simple-earn/flexible/subscribe`, params);
  }

  redeemFlexibleProduct(params: RedeemFlexibleProductParams): Promise<{}> {
    return this.postPrivate(`sapi/v1/simple-earn/flexible/redeem`, params);
  }

  getFlexibleProductPosition(params: {
    asset?: string;
  }): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/simple-earn/flexible/position`, params);
  }

  getLeftDailyPurchaseQuotaFlexibleProduct(params: {
    productId: string;
  }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse> {
    return this.getPrivate(`sapi/v1/lending/daily/userLeftQuota`, params);
  }

  getLeftDailyRedemptionQuotaFlexibleProduct(params: {
    productId: string;
  }): Promise<
    LeftDailyPurchaseQuotaFlexibleProductResponse & {
      dailyQuota: string;
      minRedemptionAmount: string;
    }
  > {
    return this.getPrivate(`sapi/v1/lending/daily/userRedemptionQuota`, params);
  }

  purchaseFixedAndActivityProject(params: {
    projectId: string;
    lot: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate(`sapi/v1/lending/customizedFixed/purchase`, params);
  }

  getFixedAndActivityProjects(
    params: FixedAndActivityProjectParams,
  ): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/project/list`, params);
  }

  getFixedAndActivityProductPosition(
    params: FixedAndActivityProjectPositionParams,
  ): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/project/position/list`, params);
  }

  getLendingAccount(): Promise<StakingProduct[]> {
    return this.getPrivate(`sapi/v1/lending/union/account`);
  }

  getPurchaseRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/purchaseRecord`, params);
  }

  getRedemptionRecord(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/redemptionRecord`, params);
  }

  getInterestHistory(params: PurchaseRecordParams): Promise<any[]> {
    return this.getPrivate(`sapi/v1/lending/union/interestHistory`, params);
  }

  changeFixedAndActivityPositionToDailyPosition(params: {
    projectId: string;
    lot: number;
    positionId?: number;
  }): Promise<PurchaseFlexibleProductResponse> {
    return this.postPrivate(`sapi/v1/lending/positionChanged`, params);
  }

  /**
   *
   * Mining Endpoints
   *
   **/

  //TODO: https://binance-docs.github.io/apidocs/spot/en/#mining-endpoints

  /**
   *
   * Futures Management Endpoints:
   * https://binance-docs.github.io/apidocs/spot/en/#futures
   *
   * Note: to trade futures use the usdm-client or coinm-client.
   * MainClient only has the futures endpoints listed in the "spot" docs category, primarily used for transfers.
   *
   **/

  /**
   * Execute transfer between spot account and futures account.
   *
   * Type:
   * - 1: transfer from spot account to USDT-Ⓜ futures account.
   * - 2: transfer from USDT-Ⓜ futures account to spot account.
   * - 3: transfer from spot account to COIN-Ⓜ futures account.
   * - 4: transfer from COIN-Ⓜ futures account to spot account.
   */
  submitNewFutureAccountTransfer(
    params: NewFutureAccountTransferParams,
  ): Promise<{ tranId: number }> {
    return this.postPrivate(`sapi/v1/futures/transfer`, params);
  }

  getFutureAccountTransferHistory(
    params: GetFutureAccountTransferHistoryParams,
  ): Promise<RowsWithTotal<FutureAccountTransfer>> {
    return this.getPrivate(`sapi/v1/futures/transfer`, params);
  }

  getCrossCollateralBorrowHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/borrow/history`, params);
  }

  getCrossCollateralRepaymentHistory(params?: CoinStartEndLimit): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/repay/history`, params);
  }

  getCrossCollateralWalletV2(): Promise<any> {
    return this.getPrivate(`sapi/v2/futures/loan/wallet`);
  }

  getAdjustCrossCollateralLTVHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(
      `sapi/v1/futures/loan/adjustCollateral/history`,
      params,
    );
  }

  getCrossCollateralLiquidationHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/liquidationHistory`, params);
  }

  getCrossCollateralInterestHistory(
    params?: GetLoanCoinPaginatedHistoryParams,
  ): Promise<any> {
    return this.getPrivate(`sapi/v1/futures/loan/interestHistory`, params);
  }

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

  getBSwapLiquidity(params?: { poolId: number }): Promise<BSwapLiquidity[]> {
    return this.getPrivate('sapi/v1/bswap/liquidity');
  }

  addBSwapLiquidity(params: AddBSwapLiquidityParams): Promise<BasicBSwapResp> {
    return this.postPrivate('sapi/v1/bswap/liquidityAdd');
  }

  removeBSwapLiquidity(
    params: RemoveBSwapLiquidityParams,
  ): Promise<BasicBSwapResp> {
    return this.postPrivate('sapi/v1/bswap/liquidityRemove');
  }

  getBSwapOperations(
    params?: BSwapOperationsParams,
  ): Promise<BSwapOperations[]> {
    return this.getPrivate('sapi/v1/bswap/liquidityOps');
  }

  //TODO: add missing bswap-endpoints https://binance-docs.github.io/apidocs/spot/en/#bswap-endpoints

  /**
   * Validate syntax meets requirements set by binance. Log warning if not.
   */
  private validateOrderId(
    params:
      | NewSpotOrderParams
      | CancelOrderParams
      | NewOCOParams
      | CancelOCOParams,
    orderIdProperty: OrderIdProperty,
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
