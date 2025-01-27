"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioClient = void 0;
const BaseRestClient_1 = require("./util/BaseRestClient");
const requestUtils_1 = require("./util/requestUtils");
const PORTFOLIO_MARGIN_BASE_URL_KEY = 'papi';
class PortfolioClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}) {
        super(PORTFOLIO_MARGIN_BASE_URL_KEY, restClientOptions, requestOptions);
        this.clientId = PORTFOLIO_MARGIN_BASE_URL_KEY;
        this.clientId = this.getClientId();
        return this;
    }
    getClientId() {
        return PORTFOLIO_MARGIN_BASE_URL_KEY;
    }
    async getServerTime() {
        return this.get((0, requestUtils_1.getServerTimeEndpoint)('usdm')).then((response) => response.serverTime);
    }
    testConnectivity() {
        return this.get('papi/v1/ping');
    }
    submitNewUMOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('papi/v1/um/order', params);
    }
    submitNewUMConditionalOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('papi/v1/um/conditional/order', params);
    }
    submitNewCMOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('papi/v1/cm/order', params);
    }
    submitNewCMConditionalOrder(params) {
        this.validateOrderId(params, 'newClientStrategyId');
        return this.postPrivate('papi/v1/cm/conditional/order', params);
    }
    submitNewMarginOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('papi/v1/margin/order', params);
    }
    submitMarginLoan(params) {
        return this.postPrivate('papi/v1/marginLoan', params);
    }
    submitMarginRepay(params) {
        return this.postPrivate('papi/v1/repayLoan', params);
    }
    submitNewMarginOCO(params) {
        this.validateOrderId(params, 'limitClientOrderId');
        this.validateOrderId(params, 'stopClientOrderId');
        this.validateOrderId(params, 'listClientOrderId');
        return this.postPrivate('papi/v1/margin/order/oco', params);
    }
    cancelUMOrder(params) {
        return this.deletePrivate('papi/v1/um/order', params);
    }
    cancelAllUMOrders(params) {
        return this.deletePrivate('papi/v1/um/allOpenOrders', params);
    }
    cancelUMConditionalOrder(params) {
        return this.deletePrivate('papi/v1/um/conditional/order', params);
    }
    cancelAllUMConditionalOrders(params) {
        return this.deletePrivate('papi/v1/um/conditional/allOpenOrders', params);
    }
    cancelCMOrder(params) {
        return this.deletePrivate('papi/v1/cm/order', params);
    }
    cancelAllCMOrders(params) {
        return this.deletePrivate('papi/v1/cm/allOpenOrders', params);
    }
    cancelCMConditionalOrder(params) {
        return this.deletePrivate('papi/v1/cm/conditional/order', params);
    }
    cancelAllCMConditionalOrders(params) {
        return this.deletePrivate('papi/v1/cm/conditional/allOpenOrders', params);
    }
    cancelMarginOrder(params) {
        return this.deletePrivate('papi/v1/margin/order', params);
    }
    cancelMarginOCO(params) {
        return this.deletePrivate('papi/v1/margin/orderList', params);
    }
    cancelAllMarginOrders(params) {
        return this.deletePrivate('papi/v1/margin/allOpenOrders', params);
    }
    modifyUMOrder(params) {
        return this.putPrivate('papi/v1/um/order', params);
    }
    modifyCMOrder(params) {
        return this.putPrivate('papi/v1/cm/order', params);
    }
    getUMOrder(params) {
        return this.getPrivate('papi/v1/um/order', params);
    }
    getAllUMOrders(params) {
        return this.getPrivate('papi/v1/um/allOrders', params);
    }
    getUMOpenOrder(params) {
        return this.getPrivate('papi/v1/um/openOrder', params);
    }
    getAllUMOpenOrders(params) {
        return this.getPrivate('papi/v1/um/openOrders', params);
    }
    getAllUMConditionalOrders(params) {
        return this.getPrivate('papi/v1/um/conditional/allOrders', params);
    }
    getUMOpenConditionalOrders(params) {
        return this.getPrivate('papi/v1/um/conditional/openOrders', params);
    }
    getUMOpenConditionalOrder(params) {
        return this.getPrivate('papi/v1/um/conditional/openOrder', params);
    }
    getUMConditionalOrderHistory(params) {
        return this.getPrivate('papi/v1/um/conditional/orderHistory', params);
    }
    getCMOrder(params) {
        return this.getPrivate('papi/v1/cm/order', params);
    }
    getAllCMOrders(params) {
        return this.getPrivate('papi/v1/cm/allOrders', params);
    }
    getCMOpenOrder(params) {
        return this.getPrivate('papi/v1/cm/openOrder', params);
    }
    getAllCMOpenOrders(params) {
        return this.getPrivate('papi/v1/cm/openOrders', params);
    }
    getCMOpenConditionalOrders(params) {
        return this.getPrivate('papi/v1/cm/conditional/openOrders', params);
    }
    getCMOpenConditionalOrder(params) {
        return this.getPrivate('papi/v1/cm/conditional/openOrder', params);
    }
    getAllCMConditionalOrders(params) {
        return this.getPrivate('papi/v1/cm/conditional/allOrders', params);
    }
    getCMConditionalOrderHistory(params) {
        return this.getPrivate('papi/v1/cm/conditional/orderHistory', params);
    }
    getUMForceOrders(params) {
        return this.getPrivate('papi/v1/um/forceOrders', params);
    }
    getCMForceOrders(params) {
        return this.getPrivate('papi/v1/cm/forceOrders', params);
    }
    getUMOrderModificationHistory(params) {
        return this.getPrivate('papi/v1/um/orderAmendment', params);
    }
    getCMOrderModificationHistory(params) {
        return this.getPrivate('papi/v1/cm/orderAmendment', params);
    }
    getMarginForceOrders(params) {
        return this.getPrivate('papi/v1/margin/forceOrders', params);
    }
    getUMTrades(params) {
        return this.getPrivate('papi/v1/um/userTrades', params);
    }
    getCMTrades(params) {
        return this.getPrivate('papi/v1/cm/userTrades', params);
    }
    getUMADLQuantile(params) {
        return this.getPrivate('papi/v1/um/adlQuantile', params);
    }
    getCMADLQuantile(params) {
        return this.getPrivate('papi/v1/cm/adlQuantile', params);
    }
    toggleUMFeeBurn(params) {
        return this.postPrivate('papi/v1/um/feeBurn', params);
    }
    getUMFeeBurnStatus() {
        return this.getPrivate('papi/v1/um/feeBurn');
    }
    getMarginOrder(params) {
        return this.getPrivate('papi/v1/margin/order', params);
    }
    getMarginOpenOrders(params) {
        return this.getPrivate('papi/v1/margin/openOrders', params);
    }
    getAllMarginOrders(params) {
        return this.getPrivate('papi/v1/margin/allOrders', params);
    }
    getMarginOCO(params) {
        return this.getPrivate('papi/v1/margin/orderList', params);
    }
    getAllMarginOCO(params) {
        return this.getPrivate('papi/v1/margin/allOrderList', params);
    }
    getMarginOpenOCO() {
        return this.getPrivate('papi/v1/margin/openOrderList');
    }
    getMarginTrades(params) {
        return this.getPrivate('papi/v1/margin/myTrades', params);
    }
    repayMarginDebt(params) {
        return this.postPrivate('papi/v1/margin/repay-debt', params);
    }
    getBalance(params) {
        return this.getPrivate('papi/v1/balance', params);
    }
    getAccountInfo() {
        return this.getPrivate('papi/v1/account');
    }
    getMarginMaxBorrow(params) {
        return this.getPrivate('papi/v1/margin/maxBorrowable', params);
    }
    getMarginMaxWithdraw(params) {
        return this.getPrivate('papi/v1/margin/maxWithdraw', params);
    }
    getUMPosition(params) {
        return this.getPrivate('papi/v1/um/positionRisk', params);
    }
    getCMPosition(params) {
        return this.getPrivate('papi/v1/cm/positionRisk', params);
    }
    updateUMLeverage(params) {
        return this.postPrivate('papi/v1/um/leverage', params);
    }
    updateCMLeverage(params) {
        return this.postPrivate('papi/v1/cm/leverage', params);
    }
    updateUMPositionMode(params) {
        return this.postPrivate('papi/v1/um/positionSide/dual', params);
    }
    updateCMPositionMode(params) {
        return this.postPrivate('papi/v1/cm/positionSide/dual', params);
    }
    getUMPositionMode() {
        return this.getPrivate('papi/v1/um/positionSide/dual');
    }
    getCMPositionMode() {
        return this.getPrivate('papi/v1/cm/positionSide/dual');
    }
    getUMLeverageBrackets(params) {
        return this.getPrivate('papi/v1/um/leverageBracket', params);
    }
    getCMLeverageBrackets(params) {
        return this.getPrivate('papi/v1/cm/leverageBracket', params);
    }
    getUMTradingStatus(params) {
        return this.getPrivate('papi/v1/um/apiTradingStatus', params);
    }
    getUMCommissionRate(params) {
        return this.getPrivate('papi/v1/um/commissionRate', params);
    }
    getCMCommissionRate(params) {
        return this.getPrivate('papi/v1/cm/commissionRate', params);
    }
    getMarginLoanRecords(params) {
        return this.getPrivate('papi/v1/margin/marginLoan', params);
    }
    getMarginRepayRecords(params) {
        return this.getPrivate('papi/v1/margin/repayLoan', params);
    }
    getAutoRepayFuturesStatus() {
        return this.getPrivate('papi/v1/repay-futures-switch');
    }
    updateAutoRepayFuturesStatus(params) {
        return this.postPrivate('papi/v1/repay-futures-switch', params);
    }
    getMarginInterestHistory(params) {
        return this.getPrivate('papi/v1/margin/marginInterestHistory', params);
    }
    repayFuturesNegativeBalance() {
        return this.postPrivate('papi/v1/repay-futures-negative-balance');
    }
    getPortfolioNegativeBalanceInterestHistory(params) {
        return this.getPrivate('papi/v1/portfolio/interest-history', params);
    }
    autoCollectFunds() {
        return this.postPrivate('papi/v1/auto-collection');
    }
    transferAssetFuturesMargin(params) {
        return this.postPrivate('papi/v1/asset-collection', params);
    }
    transferBNB(params) {
        return this.postPrivate('papi/v1/bnb-transfer', params);
    }
    getUMIncomeHistory(params) {
        return this.getPrivate('papi/v1/um/income', params);
    }
    getCMIncomeHistory(params) {
        return this.getPrivate('papi/v1/cm/income', params);
    }
    getUMAccount() {
        return this.getPrivate('papi/v1/um/account');
    }
    getCMAccount() {
        return this.getPrivate('papi/v1/cm/account');
    }
    getUMAccountConfig() {
        return this.getPrivate('papi/v1/um/accountConfig');
    }
    getUMSymbolConfig(params) {
        return this.getPrivate('papi/v1/um/symbolConfig', params);
    }
    getUMAccountV2() {
        return this.getPrivate('papi/v2/um/account');
    }
    getUMTradeHistoryDownloadId(params) {
        return this.getPrivate('papi/v1/um/trade/asyn', params);
    }
    getUMTradeDownloadLink(params) {
        return this.getPrivate('papi/v1/um/trade/asyn/id', params);
    }
    getUMOrderHistoryDownloadId(params) {
        return this.getPrivate('papi/v1/um/order/asyn', params);
    }
    getUMOrderDownloadLink(params) {
        return this.getPrivate('papi/v1/um/order/asyn/id', params);
    }
    getUMTransactionHistoryDownloadId(params) {
        return this.getPrivate('papi/v1/um/income/asyn', params);
    }
    getUMTransactionDownloadLink(params) {
        return this.getPrivate('papi/v1/um/income/asyn/id', params);
    }
    validateOrderId(params, orderIdProperty) {
        const apiCategory = this.clientId;
        if (!params[orderIdProperty]) {
            params[orderIdProperty] = (0, requestUtils_1.generateNewOrderId)(apiCategory);
            return;
        }
        const expectedOrderIdPrefix = `x-${(0, requestUtils_1.getOrderIdPrefix)(apiCategory)}`;
        if (!params[orderIdProperty].startsWith(expectedOrderIdPrefix)) {
            (0, requestUtils_1.logInvalidOrderId)(orderIdProperty, expectedOrderIdPrefix, params);
        }
    }
    getPMUserDataListenKey() {
        return this.post('papi/v1/listenKey');
    }
    keepAlivePMUserDataListenKey() {
        return this.put('papi/v1/listenKey');
    }
    closePMUserDataListenKey() {
        return this.delete('papi/v1/listenKey');
    }
}
exports.PortfolioClient = PortfolioClient;
//# sourceMappingURL=portfolio-client.js.map