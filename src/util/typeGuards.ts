import {
  WsFormattedMessage,
  WsMessage24hrMiniTickerRaw,
  WsMessage24hrTickerFormatted,
  WsMessageFuturesUserDataAccountConfigUpdateEventRaw,
  WsMessageFuturesUserDataAccountUpdateRaw,
  WsMessageFuturesUserDataEventFormatted,
  WsMessageFuturesUserDataOrderTradeUpdateEventRaw,
  WsMessageKlineFormatted,
  WsMessageKlineRaw,
  WsMessageMarkPriceUpdateEventFormatted,
  WsMessageSpotUserDataEventFormatted,
  WsRawMessage,
  WsUserDataEvents,
} from '..';

/*
  Use type guards to narrow down types with minimal efforts.
*/

export function isWsFormattedMarkPriceUpdateEvent(
  data: WsFormattedMessage
): data is WsMessageMarkPriceUpdateEventFormatted {
  return !Array.isArray(data) && data.eventType === 'markPriceUpdate';
}

export function isWsFormattedMarkPriceUpdateArray(
  data: WsFormattedMessage
): data is WsMessageMarkPriceUpdateEventFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    isWsFormattedMarkPriceUpdateEvent(data[0])
  );
}

/** @deprecated, use isWsFormattedMarkPriceUpdateEvent or isWsFormattedMarkPriceUpdateArray */
export function isWsFormattedMarkPriceUpdate(
  data: WsFormattedMessage
): data is WsMessageMarkPriceUpdateEventFormatted[] {
  return isWsFormattedMarkPriceUpdateArray(data);
}

export function isWsFormattedKline(
  data: WsFormattedMessage
): data is WsMessageKlineFormatted {
  return !Array.isArray(data) && data.eventType === 'kline';
}

export function isWsFormatted24hrTicker(
  data: WsFormattedMessage
): data is WsMessage24hrTickerFormatted {
  return !Array.isArray(data) && data.eventType === '24hrTicker';
}

export function isWsFormattedUserDataEvent(
  data: WsFormattedMessage
): data is WsUserDataEvents {
  return !Array.isArray(data) && data.wsKey.includes('userData');
}

export function isWsFormattedSpotUserDataEvent(
  data: WsFormattedMessage
): data is WsMessageSpotUserDataEventFormatted {
  return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('spot');
}

export function isWsFormattedFuturesUserDataEvent(
  data: WsFormattedMessage
): data is WsMessageFuturesUserDataEventFormatted {
  return isWsFormattedUserDataEvent(data) && data.wsMarket.includes('usdm');
}

/**
 * Typeguard to validate all symbol 24hrMiniTicker raw event
 */
export function isAll24hrMiniTickerRaw(
  data: WsRawMessage
): data is WsMessage24hrMiniTickerRaw[] {
  return Array.isArray(data) && data[0].e === '24hrMiniTicker';
}

/**
 * Typeguard to validate a single 24hrMiniTicker raw event
 */
export function is24hrMiniTickerRaw(
  data: WsRawMessage
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
  data: WsRawMessage
): data is WsMessageFuturesUserDataOrderTradeUpdateEventRaw {
  return !Array.isArray(data) && data.e === 'ORDER_TRADE_UPDATE';
}

/**
 * Typeguard to validate a single ACCOUNT_CONFIG_UPDATE raw event
 */
export function isAccountConfigUpdateRaw(
  data: WsRawMessage
): data is WsMessageFuturesUserDataAccountConfigUpdateEventRaw {
  return !Array.isArray(data) && data.e === 'ACCOUNT_CONFIG_UPDATE';
}

/**
 * Typeguard to validate a single ACCOUNT_UPDATE raw event
 */
export function isAccountUpdateRaw(
  data: WsRawMessage
): data is WsMessageFuturesUserDataAccountUpdateRaw {
  return !Array.isArray(data) && data.e === 'ACCOUNT_UPDATE';
}
