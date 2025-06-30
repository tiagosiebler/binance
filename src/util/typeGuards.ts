import {
  WsFormattedMessage,
  WsMessage24hrTickerFormatted,
  WsMessageAggTradeFormatted,
  WsMessageForceOrderFormatted,
  WsMessageFuturesUserDataAccountConfigUpdateEventFormatted,
  WsMessageFuturesUserDataAccountUpdateFormatted,
  WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted,
  WsMessageFuturesUserDataEventFormatted,
  WsMessageFuturesUserDataListenKeyExpiredFormatted,
  WsMessageFuturesUserDataMarginCallFormatted,
  WsMessageFuturesUserDataTradeUpdateEventFormatted,
  WsMessageKlineFormatted,
  WsMessageMarkPriceUpdateEventFormatted,
  WsMessagePartialBookDepthEventFormatted,
  WsMessageSpotBalanceUpdateFormatted,
  WsMessageSpotOutboundAccountPositionFormatted,
  WsMessageSpotUserDataEventFormatted,
  WsMessageSpotUserDataExecutionReportEventFormatted,
  WsMessageSpotUserDataListStatusEventFormatted,
  WsMessageTradeFormatted,
  WsUserDataEvents,
} from '../types/websockets/ws-events-formatted';
import {
  WsMessage24hrMiniTickerRaw,
  WsMessageFuturesUserDataAccountConfigUpdateEventRaw,
  WsMessageFuturesUserDataAccountUpdateRaw,
  WsMessageFuturesUserDataOrderTradeUpdateEventRaw,
  WsMessageKlineRaw,
  WsMessageRollingWindowTickerRaw,
  WsRawMessage,
} from '../types/websockets/ws-events-raw';
import {
  EVENT_TYPES_USER_DATA,
  WS_KEYS_FUTURES,
  WS_KEYS_SPOT,
  WSAPIWsKey,
  WsKey,
} from './websockets/websocket-util';

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}

/**
 * Use type guards to narrow down types with minimal efforts.
 *
 * The file is organised by Typeguards starting with `WsFormattedMessage` typeguards in the first half
 * and `WsRawMessage` typeguards in the second half.
 *
 */

export function isWsSpotConnection(data: WsFormattedMessage): boolean {
  return (
    !Array.isArray(data) && data.wsKey && WS_KEYS_SPOT.includes(data.wsKey)
  );
}
export function isWsFuturesConnection(data: WsFormattedMessage): boolean {
  return (
    !Array.isArray(data) && data.wsKey && WS_KEYS_FUTURES.includes(data.wsKey)
  );
}

export function isWSAPIWsKey(wsKey: WsKey): wsKey is WSAPIWsKey {
  switch (wsKey) {
    case 'mainWSAPITestnet':
    case 'mainWSAPI':
    case 'mainWSAPI2':
    case 'usdmWSAPI':
    case 'usdmWSAPITestnet':
    case 'coinmWSAPI':
    case 'coinmWSAPITestnet': {
      return true;
    }
    case 'main':
    case 'main2':
    case 'main3':
    case 'marginRiskUserData':
    case 'mainTestnetPublic':
    case 'mainTestnetUserData':
    case 'usdm':
    case 'usdmTestnet':
    case 'coinm':
    case 'coinmTestnet':
    case 'eoptions':
    case 'coinm2':
    case 'portfolioMarginUserData':
    case 'portfolioMarginProUserData': {
      return false;
    }
    default: {
      throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}"`);
    }
  }
}

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
    ['markPriceUpdate', 'markPrice'].includes(data[0].eventType)
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

/**
 * !ticker@arr
 * @param data
 * @returns
 */
export function isWsFormatted24hrTickerArray(
  data: WsFormattedMessage,
): data is WsMessage24hrTickerFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    // topic in ws url
    (['24hrTicker'].includes(data[0].eventType) || // multiplex subscriptions
      (!!data[0].streamName && ['!ticker@arr'].includes(data[0].streamName)))
  );
}

/**
 * !ticker_1h@arr
 *
 * @param data
 * @returns
 */
export function isWsFormattedRollingWindowTickerArray(
  data: WsFormattedMessage,
): data is WsMessage24hrTickerFormatted[] {
  return (
    Array.isArray(data) &&
    data.length !== 0 &&
    // topic in ws url
    (['1hTicker', '4hTicker', '1dTicker'].includes(data[0].eventType) ||
      // multiplex subscriptions
      (!!data[0].streamName &&
        ['!ticker_1h@arr', '!ticker_4h@arr', '!ticker_1d@arr'].includes(
          data[0].streamName,
        )))
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

const partialBookDepthEventTypeMap = new Map()
  // For dedicated connection
  .set('partialBookDepth', true)
  // For multiplex connection
  .set('depth5', true)
  .set('depth10', true)
  .set('depth20', true)
  .set('depth5@100ms', true)
  .set('depth10@100ms', true)
  .set('depth20@100ms', true)
  .set('depth5@1000ms', true)
  .set('depth10@1000ms', true)
  .set('depth20@1000ms', true);

/**
 * <symbol>@depth<levels> OR <symbol>@depth<levels>@100ms
 * @param data
 * @returns
 */
export function isWsPartialBookDepthEventFormatted(
  data: WsFormattedMessage,
): data is WsMessagePartialBookDepthEventFormatted {
  return (
    !Array.isArray(data) && partialBookDepthEventTypeMap.has(data.eventType)
  );
}

/**
 * Works for both the listen key & WS API user data stream workflows.
 *
 * - For the listen key workflow, uses the wsKey to identify the connection dedicated
 * to the user data stream.
 * - For the WS API user data stream, uses the eventType to identify user data events
 * from a known list (`EVENT_TYPES_USER_DATA`).
 */
export function isWsFormattedUserDataEvent(
  data: WsFormattedMessage,
): data is WsUserDataEvents {
  if (Array.isArray(data)) {
    return false;
  }

  // Old listenKey workflow has one dedicated connection per user data stream
  // Won't work for new WS API user data stream without listen key
  if (data.wsKey.includes('userData')) {
    return true;
  }

  if (data?.eventType && EVENT_TYPES_USER_DATA.includes(data.eventType)) {
    return true;
  }

  return false;
}

export function isWsFormattedSpotUserDataEvent(
  data: WsFormattedMessage,
): data is WsMessageSpotUserDataEventFormatted {
  return (
    isWsFormattedUserDataEvent(data) &&
    (data.wsMarket?.includes('spot') || isWsSpotConnection(data))
  );
}

export function isWsFormattedFuturesUserDataEvent(
  data: WsFormattedMessage,
): data is WsMessageFuturesUserDataEventFormatted {
  return (
    isWsFormattedUserDataEvent(data) &&
    (data.wsMarket?.includes('usdm') || isWsFuturesConnection(data))
  );
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

export interface WebsocketTopicSubscriptionConfirmationEvent {
  result: boolean;
  id: number;
}

export function isTopicSubscriptionConfirmation(
  msg: unknown,
): msg is WebsocketTopicSubscriptionConfirmationEvent {
  if (typeof msg !== 'object') {
    return false;
  }
  if (!msg) {
    return false;
  }
  if (typeof msg['result'] === 'boolean') {
    return false;
  }

  return false;
}

export function isTopicSubscriptionSuccess(
  msg: unknown,
): msg is WebsocketTopicSubscriptionConfirmationEvent {
  if (!isTopicSubscriptionConfirmation(msg)) return false;
  return msg.result === true;
}
