import {
  WsFormattedMessage,
  WsMessage24hrMiniTickerRaw,
  WsMessage24hrTickerFormatted,
  WsMessageAggTradeFormatted,
  WsMessageForceOrderFormatted,
  WsMessageFuturesUserDataAccountConfigUpdateEventFormatted,
  WsMessageFuturesUserDataAccountConfigUpdateEventRaw,
  WsMessageFuturesUserDataAccountUpdateFormatted,
  WsMessageFuturesUserDataAccountUpdateRaw,
  WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted,
  WsMessageFuturesUserDataEventFormatted,
  WsMessageFuturesUserDataListenKeyExpiredFormatted,
  WsMessageFuturesUserDataMarginCallFormatted,
  WsMessageFuturesUserDataOrderTradeUpdateEventRaw,
  WsMessageFuturesUserDataTradeUpdateEventFormatted,
  WsMessageKlineFormatted,
  WsMessageKlineRaw,
  WsMessageMarkPriceUpdateEventFormatted,
  WsMessagePartialBookDepthEventFormatted,
  WsMessageRollingWindowTickerFormatted,
  WsMessageRollingWindowTickerRaw,
  WsMessageSpotBalanceUpdateFormatted,
  WsMessageSpotOutboundAccountPositionFormatted,
  WsMessageSpotUserDataEventFormatted,
  WsMessageSpotUserDataExecutionReportEventFormatted,
  WsMessageSpotUserDataListStatusEventFormatted,
  WsMessageTradeFormatted,
  WsRawMessage,
  WsUserDataEvents,
} from '../types/websockets';

/**
 * Use type guards to narrow down types with minimal efforts.
 *
 * The file is organised by Typeguards starting with `WsFormattedMessage` typeguards in the first half
 * and `WsRawMessage` typeguards in the second half.
 *
 */

/**
 * Typeguards for WsFormattedMessage event types:
 */

export function isWsFormattedMarkPriceUpdateEvent(
  data: WsFormattedMessage,
): data is WsMessageMarkPriceUpdateEventFormatted {
  return !Array.isArray(data) && data.eventType === 'markPriceUpdate';
}

export function isWsFormattedMarkPriceUpdateArray(
  data: WsFormattedMessage,
): data is WsMessageMarkPriceUpdateEventFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    data[0].eventType === 'markPriceUpdate'
  );
}

/** @deprecated, use isWsFormattedMarkPriceUpdateEvent or isWsFormattedMarkPriceUpdateArray */
export function isWsFormattedMarkPriceUpdate(
  data: WsFormattedMessage,
): data is WsMessageMarkPriceUpdateEventFormatted[] {
  return isWsFormattedMarkPriceUpdateArray(data);
}

export function isWsFormattedTrade(
  data: WsFormattedMessage,
): data is WsMessageTradeFormatted {
  return !Array.isArray(data) && data.eventType === 'trade';
}

export function isWsFormattedKline(
  data: WsFormattedMessage,
): data is WsMessageKlineFormatted {
  return !Array.isArray(data) && data.eventType === 'kline';
}

export function isWsFormatted24hrTicker(
  data: WsFormattedMessage,
): data is WsMessage24hrTickerFormatted {
  return !Array.isArray(data) && data.eventType === '24hrTicker';
}

export function isWsFormattedForceOrder(
  data: WsFormattedMessage,
): data is WsMessageForceOrderFormatted {
  return !Array.isArray(data) && data.eventType === 'forceOrder';
}

export function isWsFormatted24hrTickerArray(
  data: WsFormattedMessage,
): data is WsMessage24hrTickerFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    data[0].eventType === '24hrTicker'
  );
}

export function isWsFormattedRollingWindowTickerArray(
  data: WsFormattedMessage,
): data is WsMessageRollingWindowTickerFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    ['1hTicker', '4hTicker', '1dTicker'].includes(data[0].eventType)
  );
}

/**
 * Typeguard to validate a 'Compressed/Aggregate' trade
 */
export function isWsAggTradeFormatted(
  data: WsFormattedMessage,
): data is WsMessageAggTradeFormatted {
  return !Array.isArray(data) && data.eventType === 'aggTrade';
}

export function isWsPartialBookDepthEventFormatted(
  data: WsFormattedMessage,
): data is WsMessagePartialBookDepthEventFormatted {
  return !Array.isArray(data) && data.eventType === 'partialBookDepth';
}

export function isWsFormattedUserDataEvent(
  data: WsFormattedMessage,
): data is WsUserDataEvents {
  return !Array.isArray(data) && data.wsKey.includes('userData');
}

export function isWsFormattedSpotUserDataEvent(
  data: WsFormattedMessage,
): data is WsMessageSpotUserDataEventFormatted {
  return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('spot');
}

export function isWsFormattedFuturesUserDataEvent(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataEventFormatted {
  return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('usdm');
}

export function isWsFormattedSpotUserDataExecutionReport(
  data: WsFormattedMessage,
): data is WsMessageSpotUserDataExecutionReportEventFormatted {
  return (
    isWsFormattedSpotUserDataEvent(data) && data.eventType === 'executionReport'
  );
}

export function isWsFormattedSpotOutboundAccountPosition(
  data: WsFormattedMessage,
): data is WsMessageSpotOutboundAccountPositionFormatted {
  return (
    isWsFormattedSpotUserDataEvent(data) &&
    data.eventType === 'outboundAccountPosition'
  );
}

export function isWsFormattedSpotBalanceUpdate(
  data: WsFormattedMessage,
): data is WsMessageSpotBalanceUpdateFormatted {
  return (
    isWsFormattedSpotUserDataEvent(data) && data.eventType === 'balanceUpdate'
  );
}

export function isWsFormattedSpotUserDataListStatusEvent(
  data: WsFormattedMessage,
): data is WsMessageSpotUserDataListStatusEventFormatted {
  return (
    isWsFormattedSpotUserDataEvent(data) && data.eventType === 'listStatus'
  );
}

export function isWsFormattedFuturesUserDataAccountUpdate(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataAccountUpdateFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) &&
    data.eventType === 'ACCOUNT_UPDATE'
  );
}

export function isWsFormattedFuturesUserDataMarginCall(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataMarginCallFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) && data.eventType === 'MARGIN_CALL'
  );
}

export function isWsFormattedFuturesUserDataTradeUpdateEvent(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataTradeUpdateEventFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) &&
    data.eventType === 'ORDER_TRADE_UPDATE'
  );
}

export function isWsFormattedFuturesUserDataCondOrderTriggerRejectEvent(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) &&
    data.eventType === 'CONDITIONAL_ORDER_TRIGGER_REJECT'
  );
}

export function isWsFormattedFuturesUserDataAccountConfigUpdateEvent(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataAccountConfigUpdateEventFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) &&
    data.eventType === 'ACCOUNT_CONFIG_UPDATE'
  );
}

export function isWsFormattedFuturesUserDataListenKeyExpired(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataListenKeyExpiredFormatted {
  return (
    isWsFormattedFuturesUserDataEvent(data) &&
    data.eventType === 'listenKeyExpired'
  );
}

/**
 * Typeguards for WsRawMessage event types:
 */

/**
 * Typeguard to validate all symbol 24hrMiniTicker raw event
 */
export function isAll24hrMiniTickerRaw(
  data: WsRawMessage,
): data is WsMessage24hrMiniTickerRaw[] {
  return Array.isArray(data) && data[0].e === '24hrMiniTicker';
}

export function isAllRollingWindowTickerRaw(
  data: WsRawMessage,
): data is WsMessageRollingWindowTickerRaw[] {
  return (
    Array.isArray(data) &&
    ['1hTicker', '4hTicker', '1dTicker'].includes(data[0].e)
  );
}

/**
 * Typeguard to validate a single 24hrMiniTicker raw event
 */
export function is24hrMiniTickerRaw(
  data: WsRawMessage,
): data is WsMessage24hrMiniTickerRaw {
  return !Array.isArray(data) && data.e === '24hrMiniTicker';
}

/**
 * Typeguard to validate a single kline raw event
 */
export function isKlineRaw(data: WsRawMessage): data is WsMessageKlineRaw {
  return !Array.isArray(data) && data.e === 'kline';
}

/**
 * Typeguard to validate a single ORDER_TRADE_UPDATE raw event
 */
export function isOrderTradeUpdateRaw(
  data: WsRawMessage,
): data is WsMessageFuturesUserDataOrderTradeUpdateEventRaw {
  return !Array.isArray(data) && data.e === 'ORDER_TRADE_UPDATE';
}

/**
 * Typeguard to validate a single ACCOUNT_CONFIG_UPDATE raw event
 */
export function isAccountConfigUpdateRaw(
  data: WsRawMessage,
): data is WsMessageFuturesUserDataAccountConfigUpdateEventRaw {
  return !Array.isArray(data) && data.e === 'ACCOUNT_CONFIG_UPDATE';
}

/**
 * Typeguard to validate a single ACCOUNT_UPDATE raw event
 */
export function isAccountUpdateRaw(
  data: WsRawMessage,
): data is WsMessageFuturesUserDataAccountUpdateRaw {
  return !Array.isArray(data) && data.e === 'ACCOUNT_UPDATE';
}
