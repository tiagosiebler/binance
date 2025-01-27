"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountUpdateRaw = exports.isAccountConfigUpdateRaw = exports.isOrderTradeUpdateRaw = exports.isKlineRaw = exports.is24hrMiniTickerRaw = exports.isAllRollingWindowTickerRaw = exports.isAll24hrMiniTickerRaw = exports.isWsFormattedFuturesUserDataListenKeyExpired = exports.isWsFormattedFuturesUserDataAccountConfigUpdateEvent = exports.isWsFormattedFuturesUserDataCondOrderTriggerRejectEvent = exports.isWsFormattedFuturesUserDataTradeUpdateEvent = exports.isWsFormattedFuturesUserDataMarginCall = exports.isWsFormattedFuturesUserDataAccountUpdate = exports.isWsFormattedSpotUserDataListStatusEvent = exports.isWsFormattedSpotBalanceUpdate = exports.isWsFormattedSpotOutboundAccountPosition = exports.isWsFormattedSpotUserDataExecutionReport = exports.isWsFormattedFuturesUserDataEvent = exports.isWsFormattedSpotUserDataEvent = exports.isWsFormattedUserDataEvent = exports.isWsPartialBookDepthEventFormatted = exports.isWsAggTradeFormatted = exports.isWsFormattedRollingWindowTickerArray = exports.isWsFormatted24hrTickerArray = exports.isWsFormattedForceOrder = exports.isWsFormatted24hrTicker = exports.isWsFormattedKline = exports.isWsFormattedTrade = exports.isWsFormattedMarkPriceUpdate = exports.isWsFormattedMarkPriceUpdateArray = exports.isWsFormattedMarkPriceUpdateEvent = void 0;
function isWsFormattedMarkPriceUpdateEvent(data) {
    return !Array.isArray(data) && data.eventType === 'markPriceUpdate';
}
exports.isWsFormattedMarkPriceUpdateEvent = isWsFormattedMarkPriceUpdateEvent;
function isWsFormattedMarkPriceUpdateArray(data) {
    return (Array.isArray(data) &&
        data.length !== 0 &&
        data[0].eventType === 'markPriceUpdate');
}
exports.isWsFormattedMarkPriceUpdateArray = isWsFormattedMarkPriceUpdateArray;
function isWsFormattedMarkPriceUpdate(data) {
    return isWsFormattedMarkPriceUpdateArray(data);
}
exports.isWsFormattedMarkPriceUpdate = isWsFormattedMarkPriceUpdate;
function isWsFormattedTrade(data) {
    return !Array.isArray(data) && data.eventType === 'trade';
}
exports.isWsFormattedTrade = isWsFormattedTrade;
function isWsFormattedKline(data) {
    return !Array.isArray(data) && data.eventType === 'kline';
}
exports.isWsFormattedKline = isWsFormattedKline;
function isWsFormatted24hrTicker(data) {
    return !Array.isArray(data) && data.eventType === '24hrTicker';
}
exports.isWsFormatted24hrTicker = isWsFormatted24hrTicker;
function isWsFormattedForceOrder(data) {
    return !Array.isArray(data) && data.eventType === 'forceOrder';
}
exports.isWsFormattedForceOrder = isWsFormattedForceOrder;
function isWsFormatted24hrTickerArray(data) {
    return (Array.isArray(data) &&
        data.length !== 0 &&
        data[0].eventType === '24hrTicker');
}
exports.isWsFormatted24hrTickerArray = isWsFormatted24hrTickerArray;
function isWsFormattedRollingWindowTickerArray(data) {
    return (Array.isArray(data) &&
        data.length !== 0 &&
        ['1hTicker', '4hTicker', '1dTicker'].includes(data[0].eventType));
}
exports.isWsFormattedRollingWindowTickerArray = isWsFormattedRollingWindowTickerArray;
function isWsAggTradeFormatted(data) {
    return !Array.isArray(data) && data.eventType === 'aggTrade';
}
exports.isWsAggTradeFormatted = isWsAggTradeFormatted;
function isWsPartialBookDepthEventFormatted(data) {
    return !Array.isArray(data) && data.eventType === 'partialBookDepth';
}
exports.isWsPartialBookDepthEventFormatted = isWsPartialBookDepthEventFormatted;
function isWsFormattedUserDataEvent(data) {
    return !Array.isArray(data) && data.wsKey.includes('userData');
}
exports.isWsFormattedUserDataEvent = isWsFormattedUserDataEvent;
function isWsFormattedSpotUserDataEvent(data) {
    return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('spot');
}
exports.isWsFormattedSpotUserDataEvent = isWsFormattedSpotUserDataEvent;
function isWsFormattedFuturesUserDataEvent(data) {
    return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('usdm');
}
exports.isWsFormattedFuturesUserDataEvent = isWsFormattedFuturesUserDataEvent;
function isWsFormattedSpotUserDataExecutionReport(data) {
    return (isWsFormattedSpotUserDataEvent(data) && data.eventType === 'executionReport');
}
exports.isWsFormattedSpotUserDataExecutionReport = isWsFormattedSpotUserDataExecutionReport;
function isWsFormattedSpotOutboundAccountPosition(data) {
    return (isWsFormattedSpotUserDataEvent(data) &&
        data.eventType === 'outboundAccountPosition');
}
exports.isWsFormattedSpotOutboundAccountPosition = isWsFormattedSpotOutboundAccountPosition;
function isWsFormattedSpotBalanceUpdate(data) {
    return (isWsFormattedSpotUserDataEvent(data) && data.eventType === 'balanceUpdate');
}
exports.isWsFormattedSpotBalanceUpdate = isWsFormattedSpotBalanceUpdate;
function isWsFormattedSpotUserDataListStatusEvent(data) {
    return (isWsFormattedSpotUserDataEvent(data) && data.eventType === 'listStatus');
}
exports.isWsFormattedSpotUserDataListStatusEvent = isWsFormattedSpotUserDataListStatusEvent;
function isWsFormattedFuturesUserDataAccountUpdate(data) {
    return (isWsFormattedFuturesUserDataEvent(data) &&
        data.eventType === 'ACCOUNT_UPDATE');
}
exports.isWsFormattedFuturesUserDataAccountUpdate = isWsFormattedFuturesUserDataAccountUpdate;
function isWsFormattedFuturesUserDataMarginCall(data) {
    return (isWsFormattedFuturesUserDataEvent(data) && data.eventType === 'MARGIN_CALL');
}
exports.isWsFormattedFuturesUserDataMarginCall = isWsFormattedFuturesUserDataMarginCall;
function isWsFormattedFuturesUserDataTradeUpdateEvent(data) {
    return (isWsFormattedFuturesUserDataEvent(data) &&
        data.eventType === 'ORDER_TRADE_UPDATE');
}
exports.isWsFormattedFuturesUserDataTradeUpdateEvent = isWsFormattedFuturesUserDataTradeUpdateEvent;
function isWsFormattedFuturesUserDataCondOrderTriggerRejectEvent(data) {
    return (isWsFormattedFuturesUserDataEvent(data) &&
        data.eventType === 'CONDITIONAL_ORDER_TRIGGER_REJECT');
}
exports.isWsFormattedFuturesUserDataCondOrderTriggerRejectEvent = isWsFormattedFuturesUserDataCondOrderTriggerRejectEvent;
function isWsFormattedFuturesUserDataAccountConfigUpdateEvent(data) {
    return (isWsFormattedFuturesUserDataEvent(data) &&
        data.eventType === 'ACCOUNT_CONFIG_UPDATE');
}
exports.isWsFormattedFuturesUserDataAccountConfigUpdateEvent = isWsFormattedFuturesUserDataAccountConfigUpdateEvent;
function isWsFormattedFuturesUserDataListenKeyExpired(data) {
    return (isWsFormattedFuturesUserDataEvent(data) &&
        data.eventType === 'listenKeyExpired');
}
exports.isWsFormattedFuturesUserDataListenKeyExpired = isWsFormattedFuturesUserDataListenKeyExpired;
function isAll24hrMiniTickerRaw(data) {
    return Array.isArray(data) && data[0].e === '24hrMiniTicker';
}
exports.isAll24hrMiniTickerRaw = isAll24hrMiniTickerRaw;
function isAllRollingWindowTickerRaw(data) {
    return (Array.isArray(data) &&
        ['1hTicker', '4hTicker', '1dTicker'].includes(data[0].e));
}
exports.isAllRollingWindowTickerRaw = isAllRollingWindowTickerRaw;
function is24hrMiniTickerRaw(data) {
    return !Array.isArray(data) && data.e === '24hrMiniTicker';
}
exports.is24hrMiniTickerRaw = is24hrMiniTickerRaw;
function isKlineRaw(data) {
    return !Array.isArray(data) && data.e === 'kline';
}
exports.isKlineRaw = isKlineRaw;
function isOrderTradeUpdateRaw(data) {
    return !Array.isArray(data) && data.e === 'ORDER_TRADE_UPDATE';
}
exports.isOrderTradeUpdateRaw = isOrderTradeUpdateRaw;
function isAccountConfigUpdateRaw(data) {
    return !Array.isArray(data) && data.e === 'ACCOUNT_CONFIG_UPDATE';
}
exports.isAccountConfigUpdateRaw = isAccountConfigUpdateRaw;
function isAccountUpdateRaw(data) {
    return !Array.isArray(data) && data.e === 'ACCOUNT_UPDATE';
}
exports.isAccountUpdateRaw = isAccountUpdateRaw;
//# sourceMappingURL=typeGuards.js.map