"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotClient = exports.MainClient = void 0;
const BaseRestClient_1 = require("./util/BaseRestClient");
const requestUtils_1 = require("./util/requestUtils");
class MainClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}) {
        super('spot1', restClientOptions, requestOptions);
        return this;
    }
    async fetchLatencySummary() {
        const clientTimeReqStart = Date.now();
        const serverTime = await this.getServerTime();
        const clientTimeReqEnd = Date.now();
        console.log('serverTime', serverTime);
        const serverTimeMs = serverTime;
        const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
        const estimatedOneWayLatency = Math.floor(roundTripTime / 2);
        const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;
        const timeDifference = adjustedServerTime - clientTimeReqEnd;
        const result = {
            localTime: clientTimeReqEnd,
            serverTime: serverTimeMs,
            roundTripTime,
            estimatedOneWayLatency,
            adjustedServerTime,
            timeDifference,
        };
        console.log('Time synchronization results:');
        console.log(result);
        console.log(`Your approximate latency to exchange server:
    One way: ${estimatedOneWayLatency}ms.
    Round trip: ${roundTripTime}ms.
    `);
        if (timeDifference > 500) {
            console.warn(`WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
      Consider adjusting your system clock to avoid unwanted clock sync errors!
      Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`);
        }
        else {
            console.log(`Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`);
        }
        return result;
    }
    async getServerTime(baseUrlKeyOverride) {
        const baseUrlKey = baseUrlKeyOverride || this.getBaseUrlKey();
        const endpoint = (0, requestUtils_1.getServerTimeEndpoint)(baseUrlKey);
        const response = await this.getForBaseUrl(endpoint, baseUrlKey);
        return response.serverTime;
    }
    testConnectivity() {
        return this.get('api/v3/ping');
    }
    getExchangeInfo(params) {
        const symbols = params?.symbols && JSON.stringify(params.symbols);
        const symbol = params?.symbol;
        let urlSuffix = '';
        if (symbol) {
            urlSuffix += '?symbol=' + symbol;
        }
        else if (symbols) {
            urlSuffix += '?symbols=' + symbols;
        }
        return this.get('api/v3/exchangeInfo' + urlSuffix);
    }
    getOrderBook(params) {
        return this.get('api/v3/depth', params);
    }
    getRecentTrades(params) {
        return this.get('api/v3/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('api/v3/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('api/v3/aggTrades', params);
    }
    getKlines(params) {
        return this.get('api/v3/klines', params);
    }
    getUIKlines(params) {
        return this.get('api/v3/uiKlines', params);
    }
    getAvgPrice(params) {
        return this.get('api/v3/avgPrice', params);
    }
    get24hrChangeStatististics(params) {
        if (params && typeof params['symbol'] === 'string') {
            return this.get('api/v3/ticker/24hr', params);
        }
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const symbols = params.symbols;
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/24hr?symbols=' + symbolsQueryParam);
        }
        return this.get('api/v3/ticker/24hr');
    }
    getTradingDayTicker(params) {
        return this.get('api/v3/ticker/tradingDay', params);
    }
    getSymbolPriceTicker(params) {
        return this.get('api/v3/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        return this.get('api/v3/ticker/bookTicker', params);
    }
    getRollingWindowTicker(params) {
        return this.get('api/v3/ticker', params);
    }
    submitNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/order', params);
    }
    testNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/order/test', params);
    }
    getOrder(params) {
        return this.getPrivate('api/v3/order', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('api/v3/order', params);
    }
    cancelAllSymbolOrders(params) {
        return this.deletePrivate('api/v3/openOrders', params);
    }
    replaceOrder(params) {
        return this.postPrivate('api/v3/order/cancelReplace', params);
    }
    getOpenOrders(params) {
        return this.getPrivate('api/v3/openOrders', params);
    }
    getAllOrders(params) {
        return this.getPrivate('api/v3/allOrders', params);
    }
    submitNewOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'limitClientOrderId');
        this.validateOrderId(params, 'stopClientOrderId');
        return this.postPrivate('api/v3/order/oco', params);
    }
    submitNewOrderList(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'aboveClientOrderId');
        this.validateOrderId(params, 'belowClientOrderId');
        return this.postPrivate('api/v3/orderList/oco', params);
    }
    submitNewOrderListOTO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingClientOrderId');
        return this.postPrivate('api/v3/orderList/oto', params);
    }
    submitNewOrderListOTOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingAboveClientOrderId');
        this.validateOrderId(params, 'pendingBelowClientOrderId');
        return this.postPrivate('api/v3/orderList/otoco', params);
    }
    cancelOCO(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.deletePrivate('api/v3/orderList', params);
    }
    getOCO(params) {
        return this.getPrivate('api/v3/orderList', params);
    }
    getAllOCO(params) {
        return this.getPrivate('api/v3/allOrderList', params);
    }
    getAllOpenOCO() {
        return this.getPrivate('api/v3/openOrderList');
    }
    submitNewSOROrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/sor/order', params);
    }
    testNewSOROrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/sor/order/test', params);
    }
    getAccountInformation() {
        return this.getPrivate('api/v3/account');
    }
    getAccountTradeList(params) {
        return this.getPrivate('api/v3/myTrades', params);
    }
    getOrderRateLimit() {
        return this.getPrivate('api/v3/rateLimit/order');
    }
    getPreventedMatches(params) {
        return this.getPrivate('api/v3/myPreventedMatches', params);
    }
    getAllocations(params) {
        return this.getPrivate('api/v3/myAllocations', params);
    }
    getCommissionRates(params) {
        return this.getPrivate('api/v3/account/commission', params);
    }
    getCrossMarginCollateralRatio() {
        return this.getPrivate('sapi/v1/margin/crossMarginCollateralRatio');
    }
    getAllCrossMarginPairs() {
        return this.get('sapi/v1/margin/allPairs');
    }
    getIsolatedMarginAllSymbols(params) {
        return this.getPrivate('sapi/v1/margin/isolated/allPairs', params);
    }
    getAllMarginAssets() {
        return this.get('sapi/v1/margin/allAssets');
    }
    getMarginDelistSchedule() {
        return this.getPrivate('sapi/v1/margin/delist-schedule');
    }
    getIsolatedMarginTierData(params) {
        return this.getPrivate('sapi/v1/margin/isolatedMarginTier', params);
    }
    queryMarginPriceIndex(params) {
        return this.get('sapi/v1/margin/priceIndex', params);
    }
    getMarginAvailableInventory(params) {
        return this.getPrivate('sapi/v1/margin/available-inventory', params);
    }
    getLeverageBracket() {
        return this.getPrivate('sapi/v1/margin/leverageBracket');
    }
    getNextHourlyInterestRate(params) {
        return this.getPrivate('sapi/v1/margin/next-hourly-interest-rate', params);
    }
    getMarginInterestHistory(params) {
        return this.getPrivate('sapi/v1/margin/interestHistory', params);
    }
    submitMarginAccountBorrowRepay(params) {
        return this.postPrivate('sapi/v1/margin/borrow-repay', params);
    }
    getMarginAccountBorrowRepayRecords(params) {
        return this.getPrivate('sapi/v1/margin/borrow-repay', params);
    }
    getMarginInterestRateHistory(params) {
        return this.getPrivate('sapi/v1/margin/interestRateHistory', params);
    }
    queryMaxBorrow(params) {
        return this.getPrivate('sapi/v1/margin/maxBorrowable', params);
    }
    getMarginForceLiquidationRecord(params) {
        return this.getPrivate('sapi/v1/margin/forceLiquidationRec', params);
    }
    getSmallLiabilityExchangeCoins() {
        return this.getPrivate('sapi/v1/margin/exchange-small-liability');
    }
    getSmallLiabilityExchangeHistory(params) {
        return this.getPrivate('sapi/v1/margin/exchange-small-liability-history', params);
    }
    marginAccountCancelOpenOrders(params) {
        return this.deletePrivate('sapi/v1/margin/openOrders', params);
    }
    marginAccountCancelOCO(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.deletePrivate('sapi/v1/margin/orderList', params);
    }
    marginAccountCancelOrder(params) {
        return this.deletePrivate('sapi/v1/margin/order', params);
    }
    marginAccountNewOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'limitClientOrderId');
        this.validateOrderId(params, 'stopClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/oco', params);
    }
    marginAccountNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('sapi/v1/margin/order', params);
    }
    getMarginOrderCountUsage(params) {
        return this.getPrivate('sapi/v1/margin/rateLimit/order', params);
    }
    queryMarginAccountAllOCO(params) {
        return this.getPrivate('sapi/v1/margin/allOrderList', params);
    }
    queryMarginAccountAllOrders(params) {
        return this.getPrivate('sapi/v1/margin/allOrders', params);
    }
    queryMarginAccountOCO(params) {
        return this.getPrivate('sapi/v1/margin/orderList', params);
    }
    queryMarginAccountOpenOCO(params) {
        return this.getPrivate('sapi/v1/margin/openOrderList', params);
    }
    queryMarginAccountOpenOrders(params) {
        return this.getPrivate('sapi/v1/margin/openOrders', params);
    }
    queryMarginAccountOrder(params) {
        return this.getPrivate('sapi/v1/margin/order', params);
    }
    queryMarginAccountTradeList(params) {
        return this.getPrivate('sapi/v1/margin/myTrades', params);
    }
    submitSmallLiabilityExchange(params) {
        return this.postPrivate('sapi/v1/margin/exchange-small-liability', params);
    }
    submitManualLiquidation(params) {
        return this.postPrivate('sapi/v1/margin/manual-liquidation', params);
    }
    submitMarginOTOOrder(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/oto', params);
    }
    submitMarginOTOCOOrder(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingAboveClientOrderId');
        this.validateOrderId(params, 'pendingBelowClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/otoco', params);
    }
    createMarginSpecialLowLatencyKey(params) {
        return this.postPrivate('sapi/v1/margin/apiKey', params);
    }
    deleteMarginSpecialLowLatencyKey(params) {
        return this.deletePrivate('sapi/v1/margin/apiKey', params);
    }
    updateMarginIPForSpecialLowLatencyKey(params) {
        return this.putPrivate('sapi/v1/margin/apiKey/ip', params);
    }
    getMarginSpecialLowLatencyKeys(params) {
        return this.getPrivate('sapi/v1/margin/api-key-list', params);
    }
    getMarginSpecialLowLatencyKey(params) {
        return this.getPrivate('sapi/v1/margin/apiKey', params);
    }
    getCrossMarginTransferHistory(params) {
        return this.getPrivate('sapi/v1/margin/transfer', params);
    }
    queryMaxTransferOutAmount(params) {
        return this.getPrivate('sapi/v1/margin/maxTransferable', params);
    }
    updateCrossMarginMaxLeverage(params) {
        return this.postPrivate('sapi/v1/margin/max-leverage', params);
    }
    disableIsolatedMarginAccount(params) {
        return this.deletePrivate('sapi/v1/margin/isolated/account', params);
    }
    enableIsolatedMarginAccount(params) {
        return this.postPrivate('sapi/v1/margin/isolated/account', params);
    }
    getBNBBurn() {
        return this.getPrivate('sapi/v1/bnbBurn');
    }
    getMarginSummary() {
        return this.getPrivate('sapi/v1/margin/tradeCoeff');
    }
    queryCrossMarginAccountDetails() {
        return this.getPrivate('sapi/v1/margin/account');
    }
    getCrossMarginFeeData(params) {
        return this.getPrivate('sapi/v1/margin/crossMarginData', params);
    }
    getIsolatedMarginAccountLimit() {
        return this.getPrivate('sapi/v1/margin/isolated/accountLimit');
    }
    getIsolatedMarginAccountInfo(params) {
        return this.getPrivate('sapi/v1/margin/isolated/account', { params });
    }
    getIsolatedMarginFeeData(params) {
        return this.getPrivate('sapi/v1/margin/isolatedMarginData', params);
    }
    toggleBNBBurn(params) {
        return this.postPrivate('sapi/v1/bnbBurn', params);
    }
    getMarginCapitalFlow(params) {
        return this.getPrivate('sapi/v1/margin/capital-flow', params);
    }
    queryLoanRecord(params) {
        return this.getPrivate('sapi/v1/margin/loan', params);
    }
    queryRepayRecord(params) {
        return this.getPrivate('sapi/v1/margin/repay', params);
    }
    isolatedMarginAccountTransfer(params) {
        return this.postPrivate('sapi/v1/margin/isolated/transfer', params);
    }
    getBalances() {
        return this.getPrivate('sapi/v1/capital/config/getall');
    }
    withdraw(params) {
        return this.postPrivate('sapi/v1/capital/withdraw/apply', params);
    }
    getWithdrawHistory(params) {
        return this.getPrivate('sapi/v1/capital/withdraw/history', params);
    }
    getWithdrawAddresses() {
        return this.getPrivate('sapi/v1/capital/withdraw/address/list');
    }
    getDepositHistory(params) {
        return this.getPrivate('sapi/v1/capital/deposit/hisrec', params);
    }
    getDepositAddress(params) {
        return this.getPrivate('sapi/v1/capital/deposit/address', params);
    }
    getDepositAddresses(params) {
        return this.getPrivate('sapi/v1/capital/deposit/address/list', params);
    }
    submitDepositCredit(params) {
        return this.postPrivate('sapi/v1/capital/deposit/credit-apply', params);
    }
    getAutoConvertStablecoins() {
        return this.getPrivate('sapi/v1/capital/contract/convertible-coins');
    }
    setConvertibleCoins(params) {
        return this.postPrivate('sapi/v1/capital/contract/convertible-coins', params);
    }
    getAssetDetail(params) {
        return this.getPrivate('sapi/v1/asset/assetDetail', params);
    }
    getWalletBalances() {
        return this.getPrivate('sapi/v1/asset/wallet/balance');
    }
    getUserAsset(params) {
        return this.postPrivate('sapi/v3/asset/getUserAsset', params);
    }
    submitUniversalTransfer(params) {
        return this.postPrivate('sapi/v1/asset/transfer', params);
    }
    getUniversalTransferHistory(params) {
        return this.getPrivate('sapi/v1/asset/transfer', params);
    }
    getDust() {
        return this.postPrivate('sapi/v1/asset/dust-btc');
    }
    convertDustToBnb(params) {
        return this.postPrivate('sapi/v1/asset/dust', params);
    }
    getDustLog(params) {
        return this.getPrivate('sapi/v1/asset/dribblet', params);
    }
    getAssetDividendRecord(params) {
        return this.getPrivate('sapi/v1/asset/assetDividend', params);
    }
    getTradeFee(params) {
        return this.getPrivate('sapi/v1/asset/tradeFee', params);
    }
    getFundingAsset(params) {
        return this.postPrivate('sapi/v1/asset/get-funding-asset', params);
    }
    getCloudMiningHistory(params) {
        return this.getPrivate('sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage', params);
    }
    getDelegationHistory(params) {
        return this.getPrivate('sapi/v1/asset/custody/transfer-history', params);
    }
    submitNewFutureAccountTransfer(params) {
        return this.postPrivate('sapi/v1/futures/transfer', params);
    }
    getFutureAccountTransferHistory(params) {
        return this.getPrivate('sapi/v1/futures/transfer', params);
    }
    getCrossCollateralBorrowHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/borrow/history', params);
    }
    getCrossCollateralRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/repay/history', params);
    }
    getCrossCollateralWalletV2() {
        return this.getPrivate('sapi/v2/futures/loan/wallet');
    }
    getAdjustCrossCollateralLTVHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/adjustCollateral/history', params);
    }
    getCrossCollateralLiquidationHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/liquidationHistory', params);
    }
    getCrossCollateralInterestHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/interestHistory', params);
    }
    getAccountInfo() {
        return this.getPrivate('sapi/v1/account/info');
    }
    getDailyAccountSnapshot(params) {
        return this.getPrivate('sapi/v1/accountSnapshot', params);
    }
    disableFastWithdrawSwitch() {
        return this.postPrivate('sapi/v1/account/disableFastWithdrawSwitch');
    }
    enableFastWithdrawSwitch() {
        return this.postPrivate('sapi/v1/account/enableFastWithdrawSwitch');
    }
    getAccountStatus() {
        return this.getPrivate('sapi/v1/account/status');
    }
    getApiTradingStatus() {
        return this.getPrivate('sapi/v1/account/apiTradingStatus');
    }
    getApiKeyPermissions() {
        return this.getPrivate('sapi/v1/account/apiRestrictions');
    }
    getSystemStatus() {
        return this.get('sapi/v1/system/status');
    }
    getDelistSchedule() {
        return this.getPrivate('sapi/v1/spot/delist-schedule');
    }
    createVirtualSubAccount(params) {
        return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
    }
    getSubAccountList(params) {
        return this.getPrivate('sapi/v1/sub-account/list', params);
    }
    subAccountEnableFutures(email) {
        return this.postPrivate('sapi/v1/sub-account/futures/enable', { email });
    }
    subAccountEnableMargin(email) {
        return this.postPrivate('sapi/v1/sub-account/margin/enable', { email });
    }
    enableOptionsForSubAccount(params) {
        return this.postPrivate('sapi/v1/sub-account/eoptions/enable', params);
    }
    subAccountEnableLeverageToken(params) {
        return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
    }
    getSubAccountStatusOnMarginOrFutures(params) {
        return this.getPrivate('sapi/v1/sub-account/status', params);
    }
    getSubAccountFuturesPositionRisk(email) {
        return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
            email,
        });
    }
    getSubAccountFuturesPositionRiskV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
    }
    getSubAccountTransactionStatistics(params) {
        return this.getPrivate('sapi/v1/sub-account/transaction-statistics', params);
    }
    getSubAccountIPRestriction(params) {
        return this.getPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction', params);
    }
    subAccountDeleteIPList(params) {
        return this.deletePrivate('sapi/v1/sub-account/subAccountApi/ipRestriction/ipList', params);
    }
    subAccountAddIPRestriction(params) {
        return this.postPrivate('sapi/v2/sub-account/subAccountApi/ipRestriction', params);
    }
    subAccountAddIPList(params) {
        return this.postPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction/ipList', params);
    }
    subAccountEnableOrDisableIPRestriction(params) {
        return this.postPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction', params);
    }
    subAccountFuturesTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
    }
    getSubAccountFuturesAccountDetail(email) {
        return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
    }
    getSubAccountDetailOnFuturesAccountV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/account', params);
    }
    getSubAccountDetailOnMarginAccount(email) {
        return this.getPrivate('sapi/v1/sub-account/margin/account', { email });
    }
    getSubAccountDepositAddress(params) {
        return this.getPrivate('sapi/v1/capital/deposit/subAddress', params);
    }
    getSubAccountDepositHistory(params) {
        return this.getPrivate('sapi/v1/capital/deposit/subHisrec', params);
    }
    getSubAccountFuturesAccountSummary() {
        return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
    }
    getSubAccountSummaryOnFuturesAccountV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/accountSummary', params);
    }
    getSubAccountsSummaryOfMarginAccount() {
        return this.getPrivate('sapi/v1/sub-account/margin/accountSummary');
    }
    subAccountMarginTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
    }
    getSubAccountAssets(params) {
        return this.getPrivate('sapi/v3/sub-account/assets', params);
    }
    getSubAccountAssetsMaster(params) {
        return this.getPrivate('sapi/v4/sub-account/assets', params);
    }
    getSubAccountFuturesAssetTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/futures/internalTransfer', params);
    }
    getSubAccountSpotAssetTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
    }
    getSubAccountSpotAssetsSummary(params) {
        return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
    }
    getSubAccountUniversalTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
    }
    subAccountFuturesAssetTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/futures/internalTransfer', params);
    }
    subAccountTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/transfer/subUserHistory', params);
    }
    subAccountTransferToMaster(params) {
        return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
    }
    subAccountTransferToSameMaster(params) {
        return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
    }
    subAccountUniversalTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
    }
    depositAssetsIntoManagedSubAccount(params) {
        return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
    }
    getManagedSubAccountDepositAddress(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/deposit/address', params);
    }
    withdrawAssetsFromManagedSubAccount(params) {
        return this.postPrivate('sapi/v1/managed-subaccount/withdraw', params);
    }
    getManagedSubAccountTransfersParent(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/queryTransLogForTradeParent', params);
    }
    getManagedSubAccountTransferLog(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/query-trans-log', params);
    }
    getManagedSubAccountTransfersInvestor(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/queryTransLogForInvestor', params);
    }
    getManagedSubAccounts(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/info', params);
    }
    getManagedSubAccountSnapshot(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/accountSnapshot', params);
    }
    getManagedSubAccountAssetDetails(email) {
        return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
    }
    getManagedSubAccountMarginAssets(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/marginAsset', params);
    }
    getManagedSubAccountFuturesAssets(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/fetch-future-asset', params);
    }
    getAutoInvestAssets() {
        return this.getPrivate('sapi/v1/lending/auto-invest/all/asset');
    }
    getAutoInvestSourceAssets(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/source-asset/list', params);
    }
    getAutoInvestTargetAssets(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/target-asset/list', params);
    }
    getAutoInvestTargetAssetsROI(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/target-asset/roi/list', params);
    }
    getAutoInvestIndex(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/index/info', params);
    }
    getAutoInvestPlans(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/plan/list', params);
    }
    submitAutoInvestOneTimeTransaction(params) {
        const { details, ...allParams } = params;
        const requestParameters = { ...allParams };
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/one-off', requestParameters);
    }
    updateAutoInvestPlanStatus(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit-status', params);
    }
    updateAutoInvestmentPlanOld(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', params);
    }
    updateAutoInvestmentPlan(params) {
        const { details, ...allParams } = params;
        const requestParameters = { ...allParams };
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', requestParameters);
    }
    submitAutoInvestRedemption(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/redeem', params);
    }
    getAutoInvestSubscriptionTransactions(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/history/list', params);
    }
    getOneTimeTransactionStatus(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/one-off/status', params);
    }
    submitAutoInvestmentPlanOld(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', params);
    }
    submitAutoInvestmentPlan(params) {
        const { details, ...allParams } = params;
        const requestParameters = { ...allParams };
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', requestParameters);
    }
    getAutoInvestRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/redeem/history', params);
    }
    getAutoInvestPlan(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/plan/id', params);
    }
    getAutoInvestUserIndex(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/index/user-summary', params);
    }
    getAutoInvestRebalanceHistory(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/rebalance/history', params);
    }
    getConvertPairs(params) {
        return this.getPrivate('sapi/v1/convert/exchangeInfo', params);
    }
    getConvertAssetInfo() {
        return this.getPrivate('sapi/v1/convert/assetInfo');
    }
    convertQuoteRequest(params) {
        return this.postPrivate('sapi/v1/convert/getQuote', params);
    }
    acceptQuoteRequest(params) {
        return this.postPrivate('sapi/v1/convert/acceptQuote', params);
    }
    getConvertTradeHistory(params) {
        return this.getPrivate('sapi/v1/convert/tradeFlow', params);
    }
    getOrderStatus(params) {
        return this.getPrivate('sapi/v1/convert/orderStatus', params);
    }
    submitConvertLimitOrder(params) {
        return this.postPrivate('sapi/v1/convert/limit/placeOrder', params);
    }
    cancelConvertLimitOrder(params) {
        return this.postPrivate('sapi/v1/convert/limit/cancelOrder', params);
    }
    getConvertLimitOpenOrders() {
        return this.getPrivate('sapi/v1/convert/limit/queryOpenOrders');
    }
    getEthStakingAccount() {
        return this.getPrivate('sapi/v1/eth-staking/account');
    }
    getEthStakingAccountV2() {
        return this.getPrivate('sapi/v2/eth-staking/account');
    }
    getEthStakingQuota() {
        return this.getPrivate('sapi/v1/eth-staking/eth/quota');
    }
    subscribeEthStakingV1(params) {
        return this.postPrivate('sapi/v1/eth-staking/eth/stake', params);
    }
    subscribeEthStakingV2(params) {
        return this.postPrivate('sapi/v2/eth-staking/eth/stake', params);
    }
    redeemEth(params) {
        return this.postPrivate('sapi/v1/eth-staking/eth/redeem', params);
    }
    wrapBeth(params) {
        return this.postPrivate('sapi/v1/eth-staking/wbeth/wrap', params);
    }
    getEthStakingHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/stakingHistory', params);
    }
    getEthRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/redemptionHistory', params);
    }
    getBethRewardsHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/rewardsHistory', params);
    }
    getWbethRewardsHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/wbethRewardsHistory', params);
    }
    getEthRateHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/rateHistory', params);
    }
    getBethWrapHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/wbeth/history/wrapHistory', params);
    }
    getBethUnwrapHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/wbeth/history/unwrapHistory', params);
    }
    getStakingProducts(params) {
        return this.getPrivate('sapi/v1/staking/productList', params);
    }
    getStakingProductPosition(params) {
        return this.getPrivate('sapi/v1/staking/position', params);
    }
    getStakingHistory(params) {
        return this.getPrivate('sapi/v1/staking/stakingRecord', params);
    }
    getPersonalLeftQuotaOfStakingProduct(params) {
        return this.getPrivate('sapi/v1/staking/personalLeftQuota', params);
    }
    getSolStakingAccount() {
        return this.getPrivate('sapi/v1/sol-staking/account');
    }
    getSolStakingQuota() {
        return this.getPrivate('sapi/v1/sol-staking/sol/quota');
    }
    subscribeSolStaking(params) {
        return this.postPrivate('sapi/v1/sol-staking/sol/stake', params);
    }
    redeemSol(params) {
        return this.postPrivate('sapi/v1/sol-staking/sol/redeem', params);
    }
    getSolStakingHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/stakingHistory', params);
    }
    getSolRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/redemptionHistory', params);
    }
    getBnsolRewardsHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/bnsolRewardsHistory', params);
    }
    getBnsolRateHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/rateHistory', params);
    }
    getFuturesLeadTraderStatus() {
        return this.getPrivate('sapi/v1/copyTrading/futures/userStatus');
    }
    getFuturesLeadTradingSymbolWhitelist() {
        return this.getPrivate('sapi/v1/copyTrading/futures/leadSymbol');
    }
    getMiningAlgos() {
        return this.get('sapi/v1/mining/pub/algoList');
    }
    getMiningCoins() {
        return this.get('sapi/v1/mining/pub/coinList');
    }
    getHashrateResales(params) {
        return this.getPrivate('sapi/v1/mining/hash-transfer/config/details/list', params);
    }
    getMiners(params) {
        return this.getPrivate('sapi/v1/mining/worker/list', params);
    }
    getMinerDetails(params) {
        return this.getPrivate('sapi/v1/mining/worker/detail', params);
    }
    getExtraBonuses(params) {
        return this.getPrivate('sapi/v1/mining/payment/other', params);
    }
    getMiningEarnings(params) {
        return this.getPrivate('sapi/v1/mining/payment/list', params);
    }
    cancelHashrateResaleConfig(params) {
        return this.postPrivate('sapi/v1/mining/hash-transfer/config/cancel', params);
    }
    getHashrateResale(params) {
        return this.getPrivate('sapi/v1/mining/hash-transfer/profit/details', params);
    }
    getMiningAccountEarnings(params) {
        return this.getPrivate('sapi/v1/mining/payment/uid', params);
    }
    getMiningStatistics(params) {
        return this.getPrivate('sapi/v1/mining/statistics/user/status', params);
    }
    submitHashrateResale(params) {
        return this.postPrivate('sapi/v1/mining/hash-transfer/config', params);
    }
    getMiningAccounts(params) {
        return this.getPrivate('sapi/v1/mining/statistics/user/list', params);
    }
    submitVpNewOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/futures/newOrderVp', params);
    }
    submitTwapNewOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/futures/newOrderTwap', params);
    }
    cancelAlgoOrder(params) {
        return this.deletePrivate('sapi/v1/algo/futures/order', params);
    }
    getAlgoSubOrders(params) {
        return this.getPrivate('sapi/v1/algo/futures/subOrders', params);
    }
    getAlgoOpenOrders() {
        return this.getPrivate('sapi/v1/algo/futures/openOrders');
    }
    getAlgoHistoricalOrders(params) {
        return this.getPrivate('sapi/v1/algo/futures/historicalOrders', params);
    }
    submitSpotAlgoTwapOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/spot/newOrderTwap', params);
    }
    cancelSpotAlgoOrder(params) {
        return this.deletePrivate('sapi/v1/algo/spot/order', params);
    }
    getSpotAlgoSubOrders(params) {
        return this.getPrivate('sapi/v1/algo/spot/subOrders', params);
    }
    getSpotAlgoOpenOrders() {
        return this.getPrivate('sapi/v1/algo/spot/openOrders');
    }
    getSpotAlgoHistoricalOrders(params) {
        return this.getPrivate('sapi/v1/algo/spot/historicalOrders', params);
    }
    getCryptoLoanFlexibleCollateralAssets(params) {
        return this.getPrivate('sapi/v2/loan/flexible/collateral/data', params);
    }
    getCryptoLoanFlexibleAssets(params) {
        return this.getPrivate('sapi/v2/loan/flexible/loanable/data', params);
    }
    borrowCryptoLoanFlexible(params) {
        return this.postPrivate('sapi/v2/loan/flexible/borrow', params);
    }
    repayCryptoLoanFlexible(params) {
        return this.postPrivate('sapi/v2/loan/flexible/repay', params);
    }
    adjustCryptoLoanFlexibleLTV(params) {
        return this.postPrivate('sapi/v2/loan/flexible/adjust/ltv', params);
    }
    getCryptoLoanFlexibleLTVAdjustmentHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/ltv/adjustment/history', params);
    }
    getLoanFlexibleBorrowHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/borrow/history', params);
    }
    getCryptoLoanFlexibleOngoingOrders(params) {
        return this.getPrivate('sapi/v2/loan/flexible/ongoing/orders', params);
    }
    getLoanFlexibleRepaymentHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/repay/history', params);
    }
    getCryptoLoanLoanableAssets(params) {
        return this.getPrivate('sapi/v1/loan/loanable/data', params);
    }
    getCryptoLoanCollateralRepayRate(params) {
        return this.getPrivate('sapi/v1/loan/repay/collateral/rate', params);
    }
    getCryptoLoanCollateralAssetsData(params) {
        return this.getPrivate('sapi/v1/loan/collateral/data', params);
    }
    getCryptoLoansIncomeHistory(params) {
        return this.getPrivate('sapi/v1/loan/income', params);
    }
    borrowCryptoLoan(params) {
        return this.postPrivate('sapi/v1/loan/borrow', params);
    }
    repayCryptoLoan(params) {
        return this.postPrivate('sapi/v1/loan/repay', params);
    }
    adjustCryptoLoanLTV(params) {
        return this.postPrivate('sapi/v1/loan/adjust/ltv', params);
    }
    customizeCryptoLoanMarginCall(params) {
        return this.postPrivate('sapi/v1/loan/customize/margin_call', params);
    }
    getCryptoLoanOngoingOrders(params) {
        return this.getPrivate('sapi/v1/loan/ongoing/orders', params);
    }
    getCryptoLoanBorrowHistory(params) {
        return this.getPrivate('sapi/v1/loan/borrow/history', params);
    }
    getCryptoLoanLTVAdjustmentHistory(params) {
        return this.getPrivate('sapi/v1/loan/ltv/adjustment/history', params);
    }
    getCryptoLoanRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/loan/repay/history', params);
    }
    getSimpleEarnAccount() {
        return this.getPrivate('sapi/v1/simple-earn/account');
    }
    getFlexibleSavingProducts(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/list', params);
    }
    getSimpleEarnLockedProductList(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/list', params);
    }
    getFlexibleProductPosition(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/position', params);
    }
    getLockedProductPosition(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/position', params);
    }
    getFlexiblePersonalLeftQuota(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/personalLeftQuota', params);
    }
    getLockedPersonalLeftQuota(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/personalLeftQuota', params);
    }
    purchaseFlexibleProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/subscribe', params);
    }
    subscribeSimpleEarnLockedProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/subscribe', params);
    }
    redeemFlexibleProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/redeem', params);
    }
    redeemLockedProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/redeem', params);
    }
    setFlexibleAutoSubscribe(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/setAutoSubscribe', params);
    }
    setLockedAutoSubscribe(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/setAutoSubscribe', params);
    }
    getFlexibleSubscriptionPreview(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/subscriptionPreview', params);
    }
    getLockedSubscriptionPreview(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/subscriptionPreview', params);
    }
    setLockedProductRedeemOption(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/setRedeemOption', params);
    }
    getFlexibleSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/subscriptionRecord', params);
    }
    getLockedSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/subscriptionRecord', params);
    }
    getFlexibleRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/redemptionRecord', params);
    }
    getLockedRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/redemptionRecord', params);
    }
    getFlexibleRewardsHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/rewardsRecord', params);
    }
    getLockedRewardsHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/rewardsRecord', params);
    }
    getCollateralRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/collateralRecord', params);
    }
    getRateHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/rateHistory', params);
    }
    getVipBorrowInterestRate(params) {
        return this.getPrivate('sapi/v1/loan/vip/request/interestRate', params);
    }
    getVipLoanInterestRateHistory(params) {
        return this.getPrivate('sapi/v1/loan/vip/interestRateHistory', params);
    }
    getVipLoanableAssets(params) {
        return this.getPrivate('sapi/v1/loan/vip/loanable/data', params);
    }
    getVipCollateralAssets(params) {
        return this.getPrivate('sapi/v1/loan/vip/collateral/data', params);
    }
    getVipLoanOpenOrders(params) {
        return this.getPrivate('sapi/v1/loan/vip/ongoing/orders', params);
    }
    getVipLoanRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/loan/vip/repay/history', params);
    }
    checkVipCollateralAccount(params) {
        return this.getPrivate('sapi/v1/loan/vip/collateral/account', params);
    }
    getVipApplicationStatus(params) {
        return this.getPrivate('sapi/v1/loan/vip/request/data', params);
    }
    renewVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/renew', params);
    }
    repayVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/repay', params);
    }
    borrowVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/borrow', params);
    }
    getDualInvestmentProducts(params) {
        return this.getPrivate('sapi/v1/dci/product/list', params);
    }
    subscribeDualInvestmentProduct(params) {
        return this.postPrivate('sapi/v1/dci/product/subscribe', params);
    }
    getDualInvestmentPositions(params) {
        return this.getPrivate('sapi/v1/dci/product/positions', params);
    }
    getDualInvestmentAccounts() {
        return this.getPrivate('sapi/v1/dci/product/accounts');
    }
    getVipLoanAccruedInterest(params) {
        return this.getPrivate('sapi/v1/loan/vip/accruedInterest', params);
    }
    updateAutoCompoundStatus(params) {
        return this.postPrivate('sapi/v1/dci/product/auto_compound/edit-status', params);
    }
    createGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/createCode', params);
    }
    createDualTokenGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/buyCode', params);
    }
    redeemGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/redeemCode', params);
    }
    verifyGiftCard(params) {
        return this.getPrivate('sapi/v1/giftcard/verify', params);
    }
    getTokenLimit(params) {
        return this.getPrivate('sapi/v1/giftcard/buyCode/token-limit', params);
    }
    getRsaPublicKey() {
        return this.getPrivate('sapi/v1/giftcard/cryptography/rsa-public-key');
    }
    getNftTransactionHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/transactions', params);
    }
    getNftDepositHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/deposit', params);
    }
    getNftWithdrawHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/withdraw', params);
    }
    getNftAsset(params) {
        return this.getPrivate('sapi/v1/nft/user/getAsset', params);
    }
    getC2CTradeHistory(params) {
        return this.getPrivate('sapi/v1/c2c/orderMatch/listUserOrderHistory', params);
    }
    getFiatOrderHistory(params) {
        return this.getPrivate('sapi/v1/fiat/orders', params);
    }
    getFiatPaymentsHistory(params) {
        return this.getPrivate('sapi/v1/fiat/payments', params);
    }
    getSpotRebateHistoryRecords(params) {
        return this.getPrivate('sapi/v1/rebate/taxQuery', params);
    }
    getPortfolioMarginIndexPrice(params) {
        return this.get('sapi/v1/portfolio/asset-index-price', params);
    }
    getPortfolioMarginAssetLeverage() {
        return this.getPrivate('sapi/v1/portfolio/margin-asset-leverage');
    }
    getPortfolioMarginProCollateralRate() {
        return this.get('sapi/v1/portfolio/collateralRate');
    }
    getPortfolioMarginProTieredCollateralRate() {
        return this.get('sapi/v2/portfolio/collateralRate');
    }
    getPortfolioMarginProAccountInfo() {
        return this.getPrivate('sapi/v1/portfolio/account');
    }
    bnbTransfer(params) {
        return this.postPrivate('sapi/v1/portfolio/bnb-transfer', params);
    }
    submitPortfolioMarginProFullTransfer() {
        return this.postPrivate('sapi/v1/portfolio/auto-collection');
    }
    submitPortfolioMarginProSpecificTransfer(params) {
        return this.postPrivate('sapi/v1/portfolio/asset-collection', params);
    }
    repayPortfolioMarginProBankruptcyLoan(params) {
        return this.postPrivate('sapi/v1/portfolio/repay', params);
    }
    getPortfolioMarginProBankruptcyLoanAmount() {
        return this.getPrivate('sapi/v1/portfolio/pmLoan');
    }
    repayFuturesNegativeBalance() {
        return this.postPrivate('sapi/v1/portfolio/repay-futures-negative-balance');
    }
    updateAutoRepayFuturesStatus(params) {
        return this.postPrivate('sapi/v1/portfolio/repay-futures-switch', params);
    }
    getAutoRepayFuturesStatus() {
        return this.getPrivate('sapi/v1/portfolio/repay-futures-switch');
    }
    getPortfolioMarginProInterestHistory(params) {
        return this.getPrivate('sapi/v1/portfolio/interest-history', params);
    }
    getPortfolioMarginProSpanAccountInfo() {
        return this.getPrivate('sapi/v2/portfolio/account');
    }
    getPortfolioMarginProAccountBalance(params) {
        return this.getPrivate('sapi/v1/portfolio/balance', params);
    }
    getFuturesTickLevelOrderbookDataLink(params) {
        return this.getPrivate('sapi/v1/futures/histDataLink', params);
    }
    getBlvtInfo(params) {
        return this.get('sapi/v1/blvt/tokenInfo', params);
    }
    subscribeBlvt(params) {
        return this.postPrivate('sapi/v1/blvt/subscribe', params);
    }
    getBlvtSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/blvt/subscribe/record', params);
    }
    redeemBlvt(params) {
        return this.postPrivate('sapi/v1/blvt/redeem', params);
    }
    getBlvtRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/blvt/redeem/record', params);
    }
    getBlvtUserLimitInfo(params) {
        return this.getPrivate('sapi/v1/blvt/userLimit', params);
    }
    getPayTransactions(params) {
        return this.getPrivate('sapi/v1/pay/transactions', params);
    }
    createBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount', params);
    }
    getBrokerSubAccount(params) {
        return this.getPrivate('sapi/v1/broker/subAccount', params);
    }
    enableMarginBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/futures', params);
    }
    createApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi', params);
    }
    changePermissionApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
    }
    changeComissionBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
    }
    enableUniversalTransferApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission/universalTransfer', params);
    }
    updateIpRestrictionForSubAccountApiKey(params) {
        return this.postPrivate('sapi/v2/broker/subAccountApi/ipRestriction', params);
    }
    deleteIPRestrictionForSubAccountApiKey(params) {
        return this.deletePrivate('sapi/v1/broker/subAccountApi/ipRestriction/ipList', params);
    }
    deleteApiKeyBrokerSubAccount(params) {
        return this.deletePrivate('sapi/v1/broker/subAccountApi', params);
    }
    getSubAccountBrokerIpRestriction(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/ipRestriction', params);
    }
    getApiKeyBrokerSubAccount(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi', params);
    }
    getBrokerInfo() {
        return this.getPrivate('sapi/v1/broker/info');
    }
    updateSubAccountBNBBurn(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/bnbBurn/spot', params);
    }
    updateSubAccountMarginInterestBNBBurn(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/bnbBurn/marginInterest', params);
    }
    getSubAccountBNBBurnStatus(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/bnbBurn/status', params);
    }
    transferBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/transfer', params);
    }
    getBrokerSubAccountHistory(params) {
        return this.getPrivate('sapi/v1/broker/transfer', params);
    }
    submitBrokerSubFuturesTransfer(params) {
        return this.postPrivate('sapi/v1/broker/transfer/futures', params);
    }
    getSubAccountFuturesTransferHistory(params) {
        return this.getPrivate('sapi/v1/broker/transfer/futures', params);
    }
    getBrokerSubDepositHistory(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/depositHist', params);
    }
    getBrokerSubAccountSpotAssets(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/spotSummary', params);
    }
    getSubAccountMarginAssetInfo(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/marginSummary', params);
    }
    querySubAccountFuturesAssetInfo(params) {
        return this.getPrivate('sapi/v3/broker/subAccount/futuresSummary', params);
    }
    universalTransferBroker(params) {
        return this.postPrivate('sapi/v1/broker/universalTransfer', params);
    }
    getUniversalTransferBroker(params) {
        return this.getPrivate('sapi/v1/broker/universalTransfer', params);
    }
    updateBrokerSubAccountCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission', params);
    }
    updateBrokerSubAccountFuturesCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission/futures', params);
    }
    getBrokerSubAccountFuturesCommission(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/commission/futures', params);
    }
    updateBrokerSubAccountCoinFuturesCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission/coinFutures', params);
    }
    getBrokerSubAccountCoinFuturesCommission(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/commission/coinFutures', params);
    }
    getBrokerSpotCommissionRebate(params) {
        return this.getPrivate('sapi/v1/broker/rebate/recentRecord', params);
    }
    getBrokerFuturesCommissionRebate(params) {
        return this.getPrivate('sapi/v1/broker/rebate/futures/recentRecord', params);
    }
    getBrokerSpotRebateHistory(days, customerId) {
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
    getBrokerIfNewSpotUser() {
        return this.getPrivate('sapi/v1/apiReferral/ifNewUser');
    }
    getBrokerSubAccountDepositHistory(params) {
        return this.getPrivate('sapi/v1/bv1/apiReferral/ifNewUser', params);
    }
    getBrokerUserCustomisedId(market) {
        const prefix = market === 'spot' ? 'sapi' : 'fapi';
        return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
    }
    enableFuturesBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount', params);
    }
    enableMarginApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/margin', params);
    }
    validateOrderId(params, orderIdProperty) {
        const apiCategory = 'spot';
        if (!params[orderIdProperty]) {
            params[orderIdProperty] = (0, requestUtils_1.generateNewOrderId)(apiCategory);
            return;
        }
        const expectedOrderIdPrefix = `x-${(0, requestUtils_1.getOrderIdPrefix)(apiCategory)}`;
        if (!params[orderIdProperty].startsWith(expectedOrderIdPrefix)) {
            (0, requestUtils_1.logInvalidOrderId)(orderIdProperty, expectedOrderIdPrefix, params);
        }
    }
    getSpotUserDataListenKey() {
        return this.post('api/v3/userDataStream');
    }
    keepAliveSpotUserDataListenKey(listenKey) {
        return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
    }
    closeSpotUserDataListenKey(listenKey) {
        return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
    }
    getMarginUserDataListenKey() {
        return this.post('sapi/v1/userDataStream');
    }
    keepAliveMarginUserDataListenKey(listenKey) {
        return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
    }
    closeMarginUserDataListenKey(listenKey) {
        return this.delete(`sapi/v1/userDataStream?listenKey=${listenKey}`);
    }
    getIsolatedMarginUserDataListenKey(params) {
        return this.post(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    keepAliveIsolatedMarginUserDataListenKey(params) {
        return this.put(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    closeIsolatedMarginUserDataListenKey(params) {
        return this.delete(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    getBSwapLiquidity(params) {
        return this.getPrivate('sapi/v1/bswap/liquidity', params);
    }
    addBSwapLiquidity(params) {
        return this.postPrivate('sapi/v1/bswap/liquidityAdd', params);
    }
    removeBSwapLiquidity(params) {
        return this.postPrivate('sapi/v1/bswap/liquidityRemove', params);
    }
    getBSwapOperations(params) {
        return this.getPrivate('sapi/v1/bswap/liquidityOps', params);
    }
    getLeftDailyPurchaseQuotaFlexibleProduct(params) {
        return this.getPrivate('sapi/v1/lending/daily/userLeftQuota', params);
    }
    getLeftDailyRedemptionQuotaFlexibleProduct(params) {
        return this.getPrivate('sapi/v1/lending/daily/userRedemptionQuota', params);
    }
    purchaseFixedAndActivityProject(params) {
        return this.postPrivate('sapi/v1/lending/customizedFixed/purchase', params);
    }
    getFixedAndActivityProjects(params) {
        return this.getPrivate('sapi/v1/lending/project/list', params);
    }
    getFixedAndActivityProductPosition(params) {
        return this.getPrivate('sapi/v1/lending/project/position/list', params);
    }
    getLendingAccount() {
        return this.getPrivate('sapi/v1/lending/union/account');
    }
    getPurchaseRecord(params) {
        return this.getPrivate('sapi/v1/lending/union/purchaseRecord', params);
    }
    getRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/lending/union/redemptionRecord', params);
    }
    getInterestHistory(params) {
        return this.getPrivate('sapi/v1/lending/union/interestHistory', params);
    }
    changeFixedAndActivityPositionToDailyPosition(params) {
        return this.postPrivate('sapi/v1/lending/positionChanged', params);
    }
    enableConvertSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/convert', params);
    }
    convertBUSD(params) {
        return this.postPrivate('sapi/v1/asset/convert-transfer', params);
    }
    getConvertBUSDHistory(params) {
        return this.getPrivate('sapi/v1/asset/convert-transfer/queryByPage', params);
    }
}
exports.MainClient = MainClient;
exports.SpotClient = MainClient;
//# sourceMappingURL=main-client.js.map