import {
  WsFormattedMessage,
  WsMessage24hrTickerFormatted,
  WsMessageFuturesUserDataEventFormatted,
  WsMessageKlineFormatted,
  WsMessageMarkPriceUpdateEventFormatted,
  WsMessageSpotUserDataEventFormatted,
  WsUserDataEvents
} from "..";

/*
  Use type guards to narrow down types with minimal efforts.
*/

export function isWsFormattedMarkPriceUpdate(
  data: WsFormattedMessage
): data is WsMessageMarkPriceUpdateEventFormatted[] {
  return Array.isArray(data)
    && data.length !== 0
    && data[0].eventType === 'markPriceUpdate';
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
