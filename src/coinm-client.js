"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinMClient = void 0;
const BaseRestClient_1 = require("./util/BaseRestClient");
const requestUtils_1 = require("./util/requestUtils");
class CoinMClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}, useTestnet) {
        const clientId = useTestnet ? 'coinmtest' : 'coinm';
        super(clientId, restClientOptions, requestOptions);
        this.clientId = clientId;
        return this;
    }
    async getServerTime() {
        return this.get((0, requestUtils_1.getServerTimeEndpoint)(this.clientId)).then((response) => response.serverTime);
    }
    testConnectivity() {
        return this.get('dapi/v1/ping');
    }
    getExchangeInfo() {
        return this.get('dapi/v1/exchangeInfo');
    }
    getOrderBook(params) {
        return this.get('dapi/v1/depth', params);
    }
    getRecentTrades(params) {
        return this.get('dapi/v1/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('dapi/v1/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('dapi/v1/aggTrades', params);
    }
    getMarkPrice(params) {
        return this.get('dapi/v1/premiumIndex', params);
    }
    getFundingRateHistory(params) {
        return this.get('dapi/v1/fundingRate', params);
    }
    getFundingRate(params) {
        return this.get('dapi/v1/fundingInfo', params);
    }
    getKlines(params) {
        return this.get('dapi/v1/klines', params);
    }
    getContinuousContractKlines(params) {
        return this.get('dapi/v1/continuousKlines', params);
    }
    getIndexPriceKlines(params) {
        return this.get('dapi/v1/indexPriceKlines', params);
    }
    getMarkPriceKlines(params) {
        return this.get('dapi/v1/markPriceKlines', params);
    }
    getPremiumIndexKlines(params) {
        return this.get('dapi/v1/premiumIndexKlines', params);
    }
    get24hrChangeStatististics(params) {
        return this.get24hrChangeStatistics(params);
    }
    get24hrChangeStatistics(params) {
        return this.get('dapi/v1/ticker/24hr', params);
    }
    getSymbolPriceTicker(params) {
        return this.get('dapi/v1/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        return this.get('dapi/v1/ticker/bookTicker', params).then((e) => (0, requestUtils_1.asArray)(e));
    }
    getOpenInterest(params) {
        return this.get('dapi/v1/openInterest', params);
    }
    getOpenInterestStatistics(params) {
        return this.get('futures/data/openInterestHist', params);
    }
    getTopTradersLongShortAccountRatio(params) {
        return this.get('futures/data/topLongShortAccountRatio', params);
    }
    getTopTradersLongShortPositionRatio(params) {
        return this.get('futures/data/topLongShortPositionRatio', params);
    }
    getGlobalLongShortAccountRatio(params) {
        return this.get('futures/data/globalLongShortAccountRatio', params);
    }
    getTakerBuySellVolume(params) {
        return this.get('futures/data/takerBuySellVol', params);
    }
    getCompositeSymbolIndex(params) {
        return this.get('futures/data/basis', params);
    }
    getIndexPriceConstituents(params) {
        return this.get('dapi/v1/constituents', params);
    }
    getQuarterlyContractSettlementPrices(params) {
        return this.get('futures/data/delivery-price', params);
    }
    submitNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('dapi/v1/order', params);
    }
    submitMultipleOrders(orders) {
        const stringOrders = orders.map((order) => {
            const orderToStringify = { ...order };
            this.validateOrderId(orderToStringify, 'newClientOrderId');
            return JSON.stringify(orderToStringify);
        });
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.postPrivate('dapi/v1/batchOrders', requestBody);
    }
    modifyOrder(params) {
        return this.putPrivate('dapi/v1/order', params);
    }
    modifyMultipleOrders(orders) {
        const stringOrders = orders.map((order) => {
            const orderToStringify = { ...order };
            return JSON.stringify(orderToStringify);
        });
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.putPrivate('dapi/v1/batchOrders', requestBody);
    }
    getOrderModifyHistory(params) {
        return this.getPrivate('dapi/v1/orderAmendment', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('dapi/v1/order', params);
    }
    cancelMultipleOrders(params) {
        const requestParams = {
            ...params,
        };
        if (params.orderIdList) {
            requestParams['orderIdList'] = JSON.stringify(params.orderIdList);
        }
        if (params.origClientOrderIdList) {
            requestParams['origClientOrderIdList'] = JSON.stringify(params.origClientOrderIdList);
        }
        return this.deletePrivate('dapi/v1/batchOrders', requestParams);
    }
    cancelAllOpenOrders(params) {
        return this.deletePrivate('dapi/v1/allOpenOrders', params);
    }
    setCancelOrdersOnTimeout(params) {
        return this.postPrivate('dapi/v1/countdownCancelAll', params);
    }
    getOrder(params) {
        return this.getPrivate('dapi/v1/order', params);
    }
    getAllOrders(params) {
        return this.getPrivate('dapi/v1/allOrders', params);
    }
    getAllOpenOrders(params) {
        return this.getPrivate('dapi/v1/openOrders', params);
    }
    getCurrentOpenOrder(params) {
        return this.getPrivate('dapi/v1/openOrder', params);
    }
    getForceOrders(params) {
        return this.getPrivate('dapi/v1/forceOrders', params);
    }
    getAccountTrades(params) {
        return this.getPrivate('dapi/v1/userTrades', params);
    }
    getPositions() {
        return this.getPrivate('dapi/v1/positionRisk');
    }
    setPositionMode(params) {
        return this.postPrivate('dapi/v1/positionSide/dual', params);
    }
    setMarginType(params) {
        return this.postPrivate('dapi/v1/marginType', params);
    }
    setLeverage(params) {
        return this.postPrivate('dapi/v1/leverage', params);
    }
    getADLQuantileEstimation(params) {
        return this.getPrivate('dapi/v1/adlQuantile', params);
    }
    setIsolatedPositionMargin(params) {
        return this.postPrivate('dapi/v1/positionMargin', params);
    }
    getPositionMarginChangeHistory(params) {
        return this.getPrivate('dapi/v1/positionMargin/history', params);
    }
    getBalance() {
        return this.getPrivate('dapi/v1/balance');
    }
    getAccountComissionRate(params) {
        return this.getPrivate('dapi/v1/commissionRate', params);
    }
    getAccountCommissionRate(params) {
        return this.getPrivate('dapi/v1/commissionRate', params);
    }
    getAccountInformation() {
        return this.getPrivate('dapi/v1/account');
    }
    getNotionalAndLeverageBrackets(params) {
        return this.getPrivate('dapi/v2/leverageBracket', params);
    }
    getCurrentPositionMode() {
        return this.getPrivate('dapi/v1/positionSide/dual');
    }
    getIncomeHistory(params) {
        return this.getPrivate('dapi/v1/income', params);
    }
    getDownloadIdForFuturesTransactionHistory(params) {
        return this.getPrivate('dapi/v1/income/asyn', params);
    }
    getFuturesTransactionHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/income/asyn/id', params);
    }
    getDownloadIdForFuturesOrderHistory(params) {
        return this.getPrivate('dapi/v1/order/asyn', params);
    }
    getFuturesOrderHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/order/asyn/id', params);
    }
    getDownloadIdForFuturesTradeHistory(params) {
        return this.getPrivate('dapi/v1/trade/asyn', params);
    }
    getFuturesTradeHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/trade/asyn/id', params);
    }
    getClassicPortfolioMarginAccount(params) {
        return this.getPrivate('dapi/v1/pmAccountInfo', params);
    }
    getClassicPortfolioMarginNotionalLimits(params) {
        return this.getPrivate('dapi/v1/pmExchangeInfo', params);
    }
    getBrokerIfNewFuturesUser(brokerId, type = 1) {
        return this.getPrivate('dapi/v1/apiReferral/ifNewUser', {
            brokerId,
            type,
        });
    }
    setBrokerCustomIdForClient(customerId, email) {
        return this.postPrivate('dapi/v1/apiReferral/customization', {
            customerId,
            email,
        });
    }
    getBrokerClientCustomIds(customerId, email, page, limit) {
        return this.getPrivate('dapi/v1/apiReferral/customization', {
            customerId,
            email,
            page,
            limit,
        });
    }
    getBrokerUserCustomId(brokerId) {
        return this.getPrivate('dapi/v1/apiReferral/userCustomization', {
            brokerId,
        });
    }
    getBrokerRebateDataOverview(type = 1) {
        return this.getPrivate('dapi/v1/apiReferral/overview', {
            type,
        });
    }
    getBrokerUserTradeVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/tradeVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getBrokerRebateVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/rebateVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getBrokerTradeDetail(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/traderSummary', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getFuturesUserDataListenKey() {
        return this.post('dapi/v1/listenKey');
    }
    keepAliveFuturesUserDataListenKey() {
        return this.put('dapi/v1/listenKey');
    }
    closeFuturesUserDataListenKey() {
        return this.delete('dapi/v1/listenKey');
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
}
exports.CoinMClient = CoinMClient;
//# sourceMappingURL=coinm-client.js.map