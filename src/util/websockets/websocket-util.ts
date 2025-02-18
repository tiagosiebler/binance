/* eslint-disable @typescript-eslint/no-unused-vars */
import WebSocket from 'isomorphic-ws';

import { DefaultLogger } from '../..';
import { WSAPIRequest } from '../../types/websockets/ws-api';
import {
  WebsocketClientOptions,
  WsTopic,
} from '../../types/websockets/ws-general';
// import { DefaultLogger } from '../logger';
// import { neverGuard } from '../typeGuards';

export const WS_LOGGER_CATEGORY = { category: 'binance-ws' };

export const WS_KEY_MAP = {
  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
  main: 'main', // spot, margin, isolated margin, user data
  main2: 'main2', // spot, margin, isolated margin, user data | alternative
  main3: 'main3', // spot, margin, isolated margin | alternative | MARKET DATA ONLY | NO USER DATA

  // https://developers.binance.com/docs/binance-spot-api-docs/testnet/web-socket-streams#general-wss-information
  mainTestnetPublic: 'mainTestnetPublic',
  mainTestnetUserData: 'mainTestnetUserData',

  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
  mainWSAPI: 'mainWSAPI', // trading over WS in spot, margin, isolated margin. User data supported too.
  mainWSAPI2: 'mainWSAPI2', // trading over WS in spot, margin, isolated margin. User data supported too.
  mainWSAPITestnet: 'mainWSAPITestnet', // trading over WS in spot, margin, isolated margin | TESTNET

  // https://developers.binance.com/docs/margin_trading/risk-data-stream
  marginRiskUserData: 'marginRiskUserData',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams
  // market data, user data
  usdm: 'usdm',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info
  usdmTestnet: 'usdmTestnet',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
  // ONLY WS API | NO USER DATA
  usdmWSAPI: 'usdmWSAPI',
  usdmWSAPITestnet: 'usdmWSAPITestnet',

  // https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-market-streams
  // market data, user data
  coinm: 'coinm',
  coinm2: 'coinm2',
  // https://developers.binance.com/docs/derivatives/coin-margined-futures/general-info
  coinmTestnet: 'coinmTestnet',

  eoptions: 'eoptions',
  // optionsTestnet: 'optionsTestnet',

  // https://developers.binance.com/docs/derivatives/portfolio-margin/user-data-streams
  portfolioMarginUserData: 'portfolioMarginUserData',

  // https://developers.binance.com/docs/derivatives/portfolio-margin-pro/portfolio-margin-pro-user-data-stream
  portfolioMarginProUserData: 'portfolioMarginProUserData',
} as const;

export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];

/**
   *
   * Listen key sub on an active connection
{
  "method": "SUBSCRIBE",
  "params": [
    "listenkey"
  ],
  "id": 1
}

   *
   *
   */

export const WS_KEY_URL_MAP: Record<WsKey, string> = {
  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
  main: 'wss://stream.binance.com:9443/stream', // spot, margin, isolated margin, user data
  main2: 'wss://stream.binance.com:443/stream', // spot, margin, isolated margin, user data | alternative
  main3: 'wss://data-stream.binance.vision/stream', // spot, margin, isolated margin | alternative | MARKET DATA ONLY | NO USER DATA

  // https://developers.binance.com/docs/binance-spot-api-docs/testnet/web-socket-streams#general-wss-information
  mainTestnetPublic: 'wss://testnet.binance.vision/stream',
  // TODO:
  mainTestnetUserData: 'wss://stream.testnet.binance.vision:9443/stream',

  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
  // TODO:
  mainWSAPI: 'wss://ws-api.binance.com:443/ws-api/v3',
  mainWSAPI2: 'wss://ws-api.binance.com:9443/ws-api/v3',
  mainWSAPITestnet: 'wss://testnet.binance.vision/ws-api/v3',

  // https://developers.binance.com/docs/margin_trading/risk-data-stream
  // Margin websocket only support Cross Margin Accounts
  // TODO:
  marginRiskUserData: 'wss://margin-stream.binance.com/stream',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams
  // market data, user data
  usdm: 'wss://fstream.binance.com/stream',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info
  usdmTestnet: 'wss://stream.binancefuture.com/stream',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
  // ONLY WS API
  // TODO:
  usdmWSAPI: 'wss://ws-fapi.binance.com/ws-fapi/v1',
  usdmWSAPITestnet: 'wss://testnet.binancefuture.com/ws-fapi/v1',

  // https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-market-streams
  // market data, user data
  coinm: 'wss://dstream.binance.com/stream',
  // TODO: requires listenkey
  coinm2: 'wss://dstream-auth.binance.com/stream&listenKey=',
  // https://developers.binance.com/docs/derivatives/coin-margined-futures/general-info
  coinmTestnet: 'wss://dstream.binancefuture.com/stream',

  // https://developers.binance.com/docs/derivatives/option/websocket-market-streams
  // https://developers.binance.com/docs/derivatives/option/user-data-streams
  eoptions: 'wss://nbstream.binance.com/eoptions/stream',
  // optionsTestnet: 'wss://testnetws.binanceops.com',

  // https://developers.binance.com/docs/derivatives/portfolio-margin/user-data-streams
  // TODO:
  portfolioMarginUserData: 'wss://fstream.binance.com/pm', // /ws/listekeyhere

  // https://developers.binance.com/docs/derivatives/portfolio-margin-pro/portfolio-margin-pro-user-data-stream
  // TODO:
  portfolioMarginProUserData: 'wss://fstream.binance.com/pm-classic', // /ws/listenkeyhere
};

export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  // WS_KEY_MAP.v5Private,
  // WS_KEY_MAP.v5PrivateTrade,
];

// export const PUBLIC_WS_KEYS = [
//   WS_KEY_MAP.main,
//   WS_KEY_MAP.main,
//   WS_KEY_MAP.main,
// ] as WsKey[];

/** Used to automatically determine if a sub request should be to the public or private ws (when there's two) */
const PRIVATE_TOPICS = [];

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 * - Category: required for bybit, since different categories have different public endpoints
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = unknown,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = unknown,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

export function isPrivateWsTopic(topic: string): boolean {
  return PRIVATE_TOPICS.includes(topic);
}

export function getWsKeyForTopic(
  wsKey: string,
  // topic: string,
  // isPrivate?: boolean,
): WsKey {
  // const isPrivateTopic = isPrivate === true || PRIVATE_TOPICS.includes(topic);
  switch (wsKey) {
    // case 'v5': {
    //   if (isPrivateTopic) {
    //     return WS_KEY_MAP.main;
    //   }
    //   return WS_KEY_MAP.main;
    // }
    default: {
      return WS_KEY_MAP.main;
      // throw neverGuard(wsKey, 'getWsKeyForTopic(): Unhandled market');
    }
  }
}

export function getWsUrl(
  wsKey: WsKey,
  wsClientOptions: WebsocketClientOptions,
  logger: typeof DefaultLogger,
): string {
  const wsUrl = wsClientOptions.wsUrl;
  if (wsUrl) {
    return wsUrl;
  }

  // https://bybit-exchange.github.io/docs/v5/demo
  // const isDemoTrading = wsClientOptions.demoTrading;
  // if (isDemoTrading) {
  //   return 'wss://stream-demo.bybit.com/v5/private';
  // }

  // TODO:
  // const isTestnet = wsClientOptions.testnet;
  // const networkKey = isTestnet ? 'testnet' : 'livenet';

  const resolvedUrl = WS_KEY_URL_MAP[wsKey];
  return resolvedUrl;

  // switch (wsKey) {
  //   case WS_KEY_MAP.v5Private: {
  //     return WS_BASE_URL_MAP.v5.private[networkKey];
  //   }
  //   case WS_KEY_MAP.v5PrivateTrade: {
  //     return WS_BASE_URL_MAP[wsKey].private[networkKey];
  //   }
  //   case WS_KEY_MAP.v5SpotPublic: {
  //     return WS_BASE_URL_MAP.v5SpotPublic.public[networkKey];
  //   }
  //   case WS_KEY_MAP.v5LinearPublic: {
  //     return WS_BASE_URL_MAP.v5LinearPublic.public[networkKey];
  //   }
  //   case WS_KEY_MAP.v5InversePublic: {
  //     return WS_BASE_URL_MAP.v5InversePublic.public[networkKey];
  //   }
  //   case WS_KEY_MAP.v5OptionPublic: {
  //     return WS_BASE_URL_MAP.v5OptionPublic.public[networkKey];
  //   }
  //   default: {
  //     logger.error('getWsUrl(): Unhandled wsKey: ', {
  //       category: 'bybit-ws',
  //       wsKey,
  //     });
  //     throw neverGuard(wsKey, 'getWsUrl(): Unhandled wsKey');
  //   }
  // }
}

export function getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
  switch (wsKey) {
    // case 'v5': {
    //   if (wsKey === WS_KEY_MAP.v5SpotPublic) {
    //     return 10;
    //   }
    //   return null;
    // }
    default: {
      return null;
      // throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
    }
  }
}

export const WS_ERROR_ENUM = {
  NOT_AUTHENTICATED_SPOT_V3: '-1004',
  API_ERROR_GENERIC: '10001',
  API_SIGN_AUTH_FAILED: '10003',
  USDC_OPTION_AUTH_FAILED: '3303006',
};

/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined.
 */
export function safeTerminateWs(ws?: WebSocket | unknown) {
  // #305: ws.terminate() undefined in browsers
  if (ws && typeof ws['terminate'] === 'function') {
    ws.terminate();
  }
}
/**
 * WS API promises are stored using a primary key. This key is constructed using
 * properties found in every request & reply.
 */
export function getPromiseRefForWSAPIRequest(
  requestEvent: WSAPIRequest<unknown>,
): string {
  const promiseRef = [requestEvent.op, requestEvent.reqId].join('_');
  return promiseRef;
}

/**
 * Users can conveniently pass topics as strings or objects (object has topic name + optional params).
 *
 * This method normalises topics into objects (object has topic name + optional params).
 */
export function getNormalisedTopicRequests(
  wsTopicRequests: WsTopicRequestOrStringTopic<string>[],
): WsTopicRequest<string>[] {
  const normalisedTopicRequests: WsTopicRequest<string>[] = [];

  for (const wsTopicRequest of wsTopicRequests) {
    // passed as string, convert to object
    if (typeof wsTopicRequest === 'string') {
      const topicRequest: WsTopicRequest<string> = {
        topic: wsTopicRequest,
        payload: undefined,
      };
      normalisedTopicRequests.push(topicRequest);
      continue;
    }

    // already a normalised object, thanks to user
    normalisedTopicRequests.push(wsTopicRequest);
  }
  return normalisedTopicRequests;
}

/**
 * Groups topics in request into per-wsKey groups
 * @param normalisedTopicRequests
 * @param wsKey
 * @param isPrivateTopic
 * @returns
 */
export function getTopicsPerWSKey(
  normalisedTopicRequests: WsTopicRequest[],
  wsKey: WsKey,
  // isPrivateTopic?: boolean,
): {
  [key in WsKey]?: WsTopicRequest<WsTopic>[];
} {
  const perWsKeyTopics: { [key in WsKey]?: WsTopicRequest<WsTopic>[] } = {};

  // Sort into per wsKey arrays, in case topics are mixed together for different wsKeys
  for (const topicRequest of normalisedTopicRequests) {
    // const derivedWsKey =
    //   wsKey || getWsKeyForTopic(market, topicRequest.topic, isPrivateTopic);
    const derivedWsKey = wsKey;

    if (
      !perWsKeyTopics[derivedWsKey] ||
      !Array.isArray(perWsKeyTopics[derivedWsKey])
    ) {
      perWsKeyTopics[derivedWsKey] = [];
    }

    perWsKeyTopics[derivedWsKey]!.push(topicRequest);
  }

  return perWsKeyTopics;
}

export function parseEventTypeFromMessage(
  wsKey: WsKey,
  parsedMsg?: any,
): string | undefined {
  if (parsedMsg?.e) {
    return parsedMsg.e;
  }
  if (parsedMsg?.stream && typeof parsedMsg?.stream === 'string') {
    const streamName = parsedMsg.stream;
    // console.log(`parseEventTypeFromMessage(${wsKey}) `, streamName, parsedMsg);

    const eventType = streamName.split('@');

    // All symbol streams can be returned as is, just need to extract the left-most text before any @ or _
    if (streamName.startsWith('!')) {
      const subEventType = eventType[0].split('_');
      return subEventType[0].replace('!', '');
    }

    // Per symbol streams can have the symbol trimmed off (string before first "@")
    // E.g. btcusdt@kline_5m@+08:00 -> kline_5m@+08:00
    if (eventType.length) {
      // remove first, keep the rest rejoined
      eventType.shift();

      // Edge case, for european options, the suffix is a variable date so will never match the map
      if (wsKey === 'eoptions') {
        return eventType[0];
      }
      return eventType.join('@');
    }

    console.error(
      'parseEventTypeFromMessage(): Cannot extract event type from message: ',
      parsedMsg,
    );
  }
  if (parsedMsg?.data) {
    return parseEventTypeFromMessage(wsKey, parsedMsg.data);
  }
  if (Array.isArray(parsedMsg) && parsedMsg.length) {
    return parseEventTypeFromMessage(wsKey, parsedMsg[0]);
  }

  return;
}
