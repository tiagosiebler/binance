import {
  WsMessage24hrMiniTickerFormatted,
  WsMessage24hrMiniTickerRaw,
  WsMessage24hrTickerFormatted,
  WsMessage24hrTickerRaw,
  WsMessageAggTradeFormatted,
  WsMessageAggTradeRaw,
  WsMessageBookTickerEventFormatted,
  WsMessageBookTickerEventRaw,
  WsMessageForceOrderFormatted,
  WsMessageForceOrderRaw,
  WsMessageFuturesUserDataAccountConfigUpdateEventFormatted,
  WsMessageFuturesUserDataAccountConfigUpdateEventRaw,
  WsMessageFuturesUserDataAccountUpdateFormatted,
  WsMessageFuturesUserDataAccountUpdateRaw,
  WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted,
  WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw,
  WsMessageFuturesUserDataListenKeyExpiredFormatted,
  WsMessageFuturesUserDataListenKeyExpiredRaw,
  WsMessageFuturesUserDataMarginCallFormatted,
  WsMessageFuturesUserDataMarginCallRaw,
  WsMessageFuturesUserDataOrderTradeUpdateEventRaw,
  WsMessageFuturesUserDataTradeUpdateEventFormatted,
  WsMessageIndexPriceUpdateEventFormatted,
  WsMessageIndexPriceUpdateEventRaw,
  WsMessageKlineFormatted,
  WsMessageKlineRaw,
  WsMessageMarkPriceUpdateEventFormatted,
  WsMessagePartialBookDepthEventFormatted,
  WsMessagePartialBookDepthEventRaw,
  WsMessageRollingWindowTickerFormatted,
  WsMessageRollingWindowTickerRaw,
  WsMessageSpotBalanceUpdateFormatted,
  WsMessageSpotBalanceUpdateRaw,
  WsMessageSpotOutboundAccountPositionFormatted,
  WsMessageSpotOutboundAccountPositionRaw,
  WsMessageSpotUserDataExecutionReportEventFormatted,
  WsMessageSpotUserDataExecutionReportEventRaw,
  WsMessageSpotUserDataListStatusEventFormatted,
  WsMessageSpotUserDataListStatusEventRaw,
  WsMessageTradeFormatted,
  WsMessageTradeRaw,
} from './websockets.events';

export type WsRawSpotUserDataEventRaw =
  | WsMessageSpotUserDataExecutionReportEventRaw
  | WsMessageSpotOutboundAccountPositionRaw
  | WsMessageSpotBalanceUpdateRaw
  | WsMessageSpotUserDataListStatusEventRaw;

export type WsMessageSpotUserDataEventFormatted =
  | WsMessageSpotUserDataExecutionReportEventFormatted
  | WsMessageSpotOutboundAccountPositionFormatted
  | WsMessageSpotBalanceUpdateFormatted
  | WsMessageSpotUserDataListStatusEventFormatted;

export type WsMessageFuturesUserDataEventRaw =
  | WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw;

// TODO: consistent across USDM vs COINM?
export type WsMessageFuturesUserDataEventFormatted =
  | WsMessageFuturesUserDataAccountUpdateFormatted
  | WsMessageFuturesUserDataListenKeyExpiredFormatted
  | WsMessageFuturesUserDataMarginCallFormatted
  | WsMessageFuturesUserDataTradeUpdateEventFormatted
  | WsMessageFuturesUserDataAccountConfigUpdateEventFormatted
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventFormatted;

export type WsRawMessage =
  | WsMessageKlineRaw
  | WsMessageAggTradeRaw
  | WsMessageTradeRaw
  | WsMessage24hrMiniTickerRaw
  | WsMessage24hrMiniTickerRaw[]
  | WsMessage24hrTickerRaw
  | WsMessage24hrTickerRaw[]
  | WsMessageRollingWindowTickerRaw[]
  | WsMessageBookTickerEventRaw
  | WsMessagePartialBookDepthEventRaw
  | WsMessageForceOrderRaw
  | WsRawSpotUserDataEventRaw
  | WsMessageIndexPriceUpdateEventRaw
  | WsMessageFuturesUserDataAccountUpdateRaw
  | WsMessageFuturesUserDataListenKeyExpiredRaw
  | WsMessageFuturesUserDataMarginCallRaw
  | WsMessageFuturesUserDataOrderTradeUpdateEventRaw
  | WsMessageFuturesUserDataAccountConfigUpdateEventRaw
  | WsMessageFuturesUserDataCondOrderTriggerRejectEventRaw;

export type WsUserDataEvents =
  | WsMessageSpotUserDataEventFormatted
  | WsMessageFuturesUserDataEventFormatted;

export type WsFormattedMessage =
  | WsUserDataEvents
  | WsMessageKlineFormatted
  | WsMessageAggTradeFormatted
  | WsMessageTradeFormatted
  | WsMessage24hrMiniTickerFormatted
  | WsMessage24hrTickerFormatted
  | WsMessageBookTickerEventFormatted
  | WsMessagePartialBookDepthEventFormatted
  | WsMessageIndexPriceUpdateEventFormatted
  | WsMessageMarkPriceUpdateEventFormatted
  | WsMessageForceOrderFormatted
  | WsMessage24hrMiniTickerFormatted[]
  | WsMessage24hrTickerFormatted[]
  | WsMessageRollingWindowTickerFormatted[]
  | WsMessageMarkPriceUpdateEventFormatted[];
