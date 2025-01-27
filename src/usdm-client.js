"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDMClient = void 0;
const BaseRestClient_1 = require("./util/BaseRestClient");
const requestUtils_1 = require("./util/requestUtils");
class USDMClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}, useTestnet) {
        const clientId = useTestnet ? 'usdmtest' : 'usdm';
        super(clientId, restClientOptions, requestOptions);
        this.clientId = clientId;
        return this;
    }
    async getServerTime() {
        return this.get((0, requestUtils_1.getServerTimeEndpoint)(this.clientId)).then((response) => response.serverTime);
    }
    testConnectivity() {
        return this.get('fapi/v1/ping');
    }
    getExchangeInfo() {
        return this.get('fapi/v1/exchangeInfo');
    }
    getOrderBook(params) {
        return this.get('fapi/v1/depth', params);
    }
    getRecentTrades(params) {
        return this.get('fapi/v1/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('fapi/v1/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('fapi/v1/aggTrades', params);
    }
    getKlines(params) {
        return this.get('fapi/v1/klines', params);
    }
    getContinuousContractKlines(params) {
        return this.get('fapi/v1/continuousKlines', params);
    }
    getIndexPriceKlines(params) {
        return this.get('fapi/v1/indexPriceKlines', params);
    }
    getMarkPriceKlines(params) {
        return this.get('fapi/v1/markPriceKlines', params);
    }
    getPremiumIndexKlines(params) {
        return this.get('fapi/v1/premiumIndexKlines', params);
    }
    getMarkPrice(params) {
        return this.get('fapi/v1/premiumIndex', params);
    }
    getFundingRateHistory(params) {
        return this.get('fapi/v1/fundingRate', params);
    }
    getFundingRates() {
        return this.get('fapi/v1/fundingInfo');
    }
    get24hrChangeStatististics(params) {
        return this.get24hrChangeStatistics(params);
    }
    get24hrChangeStatistics(params) {
        return this.get('fapi/v1/ticker/24hr', params);
    }
    getSymbolPriceTicker(params) {
        return this.get('fapi/v1/ticker/price', params);
    }
    getSymbolPriceTickerV2(params) {
        return this.get('fapi/v2/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        return this.get('fapi/v1/ticker/bookTicker', params);
    }
    getQuarterlyContractSettlementPrices(params) {
        return this.get('futures/data/delivery-price', params);
    }
    getOpenInterest(params) {
        return this.get('fapi/v1/openInterest', params);
    }
    getOpenInterestStatistics(params) {
        return this.get('futures/data/openInterestHist', params);
    }
    getTopTradersLongShortPositionRatio(params) {
        return this.get('futures/data/topLongShortPositionRatio', params);
    }
    getTopTradersLongShortAccountRatio(params) {
        return this.get('futures/data/topLongShortAccountRatio', params);
    }
    getGlobalLongShortAccountRatio(params) {
        return this.get('futures/data/globalLongShortAccountRatio', params);
    }
    getTakerBuySellVolume(params) {
        return this.get('futures/data/takerlongshortRatio', params);
    }
    getHistoricalBlvtNavKlines(params) {
        return this.get('fapi/v1/lvtKlines', params);
    }
    getCompositeSymbolIndex(params) {
        return this.get('fapi/v1/indexInfo', params);
    }
    getMultiAssetsModeAssetIndex(params) {
        return this.get('fapi/v1/assetIndex', params);
    }
    getBasis(params) {
        return this.get('futures/data/basis', params);
    }
    getIndexPriceConstituents(params) {
        return this.get('fapi/v1/constituents', params);
    }
    submitNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('fapi/v1/order', params);
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
        return this.postPrivate('fapi/v1/batchOrders', requestBody);
    }
    modifyOrder(params) {
        return this.putPrivate('fapi/v1/order', params);
    }
    modifyMultipleOrders(orders) {
        const stringOrders = orders.map((order) => JSON.stringify(order));
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.putPrivate('fapi/v1/batchOrders', requestBody);
    }
    getOrderModifyHistory(params) {
        return this.getPrivate('fapi/v1/orderAmendment', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('fapi/v1/order', params);
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
        return this.deletePrivate('fapi/v1/batchOrders', requestParams);
    }
    cancelAllOpenOrders(params) {
        return this.deletePrivate('fapi/v1/allOpenOrders', params);
    }
    setCancelOrdersOnTimeout(params) {
        return this.postPrivate('fapi/v1/countdownCancelAll', params);
    }
    getOrder(params) {
        return this.getPrivate('fapi/v1/order', params);
    }
    getAllOrders(params) {
        return this.getPrivate('fapi/v1/allOrders', params);
    }
    getAllOpenOrders(params) {
        return this.getPrivate('fapi/v1/openOrders', params);
    }
    getCurrentOpenOrder(params) {
        return this.getPrivate('fapi/v1/openOrder', params);
    }
    getForceOrders(params) {
        return this.getPrivate('fapi/v1/forceOrders', params);
    }
    getAccountTrades(params) {
        return this.getPrivate('fapi/v1/userTrades', params);
    }
    setMarginType(params) {
        return this.postPrivate('fapi/v1/marginType', params);
    }
    setPositionMode(params) {
        return this.postPrivate('fapi/v1/positionSide/dual', params);
    }
    setLeverage(params) {
        return this.postPrivate('fapi/v1/leverage', params);
    }
    setMultiAssetsMode(params) {
        return this.postPrivate('fapi/v1/multiAssetsMargin', params);
    }
    setIsolatedPositionMargin(params) {
        return this.postPrivate('fapi/v1/positionMargin', params);
    }
    getPositions(params) {
        return this.getPrivate('fapi/v2/positionRisk', params);
    }
    getPositionsV3(params) {
        return this.getPrivate('fapi/v3/positionRisk', params);
    }
    getADLQuantileEstimation(params) {
        return this.getPrivate('fapi/v1/adlQuantile', params);
    }
    getPositionMarginChangeHistory(params) {
        return this.getPrivate('fapi/v1/positionMargin/history', params);
    }
    getBalanceV3() {
        return this.getPrivate('fapi/v3/balance');
    }
    getBalance() {
        return this.getPrivate('fapi/v2/balance');
    }
    getAccountInformationV3() {
        return this.getPrivate('fapi/v3/account');
    }
    getAccountInformation() {
        return this.getPrivate('fapi/v2/account');
    }
    getAccountComissionRate(params) {
        return this.getPrivate('fapi/v1/commissionRate', params);
    }
    getAccountCommissionRate(params) {
        return this.getPrivate('fapi/v1/commissionRate', params);
    }
    getFuturesAccountConfig() {
        return this.getPrivate('fapi/v1/accountConfig');
    }
    getFuturesSymbolConfig(params) {
        return this.getPrivate('fapi/v1/symbolConfig', params);
    }
    getUserForceOrders() {
        return this.getPrivate('fapi/v1/rateLimit/order');
    }
    getNotionalAndLeverageBrackets(params) {
        return this.getPrivate('fapi/v1/leverageBracket', params);
    }
    getMultiAssetsMode() {
        return this.getPrivate('fapi/v1/multiAssetsMargin');
    }
    getCurrentPositionMode() {
        return this.getPrivate('fapi/v1/positionSide/dual');
    }
    getIncomeHistory(params) {
        return this.getPrivate('fapi/v1/income', params);
    }
    getApiQuantitativeRulesIndicators(params) {
        return this.getPrivate('fapi/v1/apiTradingStatus', params);
    }
    getFuturesTransactionHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/income/asyn', params);
    }
    getFuturesTransactionHistoryDownloadLink(params) {
        return this.getPrivate('fapi/v1/income/asyn/id', params);
    }
    getFuturesOrderHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/order/asyn', params);
    }
    getFuturesOrderHistoryDownloadLink(params) {
        return this.getPrivate('fapi/v1/order/asyn/id', params);
    }
    getFuturesTradeHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/trade/asyn', params);
    }
    getFuturesTradeDownloadLink(params) {
        return this.getPrivate('fapi/v1/trade/asyn/id', params);
    }
    setBNBBurnEnabled(params) {
        return this.postPrivate('fapi/v1/feeBurn', params);
    }
    getBNBBurnStatus() {
        return this.getPrivate('fapi/v1/feeBurn');
    }
    testOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('fapi/v1/order/test', params);
    }
    getAllConvertPairs(params) {
        return this.get('fapi/v1/convert/exchangeInfo', params);
    }
    submitConvertQuoteRequest(params) {
        return this.postPrivate('fapi/v1/convert/getQuote', params);
    }
    acceptConvertQuote(params) {
        return this.postPrivate('fapi/v1/convert/acceptQuote', params);
    }
    getConvertOrderStatus(params) {
        return this.getPrivate('fapi/v1/convert/orderStatus', params);
    }
    getPortfolioMarginProAccountInfo(params) {
        return this.getPrivate('fapi/v1/pmAccountInfo', params);
    }
    getBrokerIfNewFuturesUser(brokerId, type = 1) {
        return this.getPrivate('fapi/v1/apiReferral/ifNewUser', {
            brokerId,
            type,
        });
    }
    setBrokerCustomIdForClient(customerId, email) {
        return this.postPrivate('fapi/v1/apiReferral/customization', {
            customerId,
            email,
        });
    }
    getBrokerClientCustomIds(customerId, email, page, limit) {
        return this.getPrivate('fapi/v1/apiReferral/customization', {
            customerId,
            email,
            page,
            limit,
        });
    }
    getBrokerUserCustomId(brokerId) {
        return this.getPrivate('fapi/v1/apiReferral/userCustomization', {
            brokerId,
        });
    }
    getBrokerRebateDataOverview(type = 1) {
        return this.getPrivate('fapi/v1/apiReferral/overview', {
            type,
        });
    }
    getBrokerUserTradeVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('fapi/v1/apiReferral/tradeVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getBrokerRebateVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('fapi/v1/apiReferral/rebateVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getBrokerTradeDetail(type = 1, startTime, endTime, limit) {
        return this.getPrivate('fapi/v1/apiReferral/traderSummary', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    getFuturesUserDataListenKey() {
        return this.post('fapi/v1/listenKey');
    }
    keepAliveFuturesUserDataListenKey() {
        return this.put('fapi/v1/listenKey');
    }
    closeFuturesUserDataListenKey() {
        return this.delete('fapi/v1/listenKey');
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
exports.USDMClient = USDMClient;
//# sourceMappingURL=usdm-client.js.map