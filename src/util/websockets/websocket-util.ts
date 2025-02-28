/* eslint-disable @typescript-eslint/no-unused-vars */
import WebSocket from 'isomorphic-ws';

import { WsMarket } from '../../types/websockets';
import { WSAPIRequest } from '../../types/websockets/ws-api';
import {
  WebsocketClientOptions,
  WsTopic,
} from '../../types/websockets/ws-general';
import { DefaultLogger } from '../logger';
import { neverGuard } from '../typeGuards';

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

export const WS_KEY_URL_MAP: Record<WsKey, string> = {
  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
  main: 'wss://stream.binance.com:9443', // spot, margin, isolated margin, user data
  main2: 'wss://stream.binance.com:443', // spot, margin, isolated margin, user data | alternative
  main3: 'wss://data-stream.binance.vision', // spot, margin, isolated margin | alternative | MARKET DATA ONLY | NO USER DATA

  // https://developers.binance.com/docs/binance-spot-api-docs/testnet/web-socket-streams#general-wss-information
  mainTestnetPublic: 'wss://testnet.binance.vision',
  mainTestnetUserData: 'wss://stream.testnet.binance.vision:9443',

  // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/general-api-information
  // TODO:
  mainWSAPI: 'wss://ws-api.binance.com:443',
  mainWSAPI2: 'wss://ws-api.binance.com:9443',
  mainWSAPITestnet: 'wss://testnet.binance.vision',

  // https://developers.binance.com/docs/margin_trading/risk-data-stream
  // Margin websocket only support Cross Margin Accounts
  marginRiskUserData: 'wss://margin-stream.binance.com',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams
  // market data, user data
  usdm: 'wss://fstream.binance.com',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info
  usdmTestnet: 'wss://stream.binancefuture.com',

  // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info
  // ONLY WS API
  // TODO:
  usdmWSAPI: 'wss://ws-fapi.binance.com',
  usdmWSAPITestnet: 'wss://testnet.binancefuture.com',

  // https://developers.binance.com/docs/derivatives/coin-margined-futures/websocket-market-streams
  // market data, user data
  coinm: 'wss://dstream.binance.com',
  coinm2: 'wss://dstream-auth.binance.com', // Warning, coinm2 requires a listenkey
  // https://developers.binance.com/docs/derivatives/coin-margined-futures/general-info
  coinmTestnet: 'wss://dstream.binancefuture.com',

  // https://developers.binance.com/docs/derivatives/option/websocket-market-streams
  // https://developers.binance.com/docs/derivatives/option/user-data-streams
  eoptions: 'wss://nbstream.binance.com/eoptions',
  // optionsTestnet: 'wss://testnetws.binanceops.com',

  // https://developers.binance.com/docs/derivatives/portfolio-margin/user-data-streams
  portfolioMarginUserData: 'wss://fstream.binance.com',

  // https://developers.binance.com/docs/derivatives/portfolio-margin-pro/portfolio-margin-pro-user-data-stream
  portfolioMarginProUserData: 'wss://fstream.binance.com',
};

export function getWsURLSuffix(
  wsKey: WsKey,
  connectionType: 'market' | 'userData' | 'wsAPI',
): string {
  switch (wsKey) {
    case 'main':
    case 'main2':
    case 'main3':
    case 'mainWSAPI':
    case 'mainWSAPI2':
    case 'marginRiskUserData':
    case 'mainTestnetPublic':
    case 'mainTestnetUserData':
    case 'mainWSAPITestnet': {
      switch (connectionType) {
        case 'market':
          return '/stream';
        case 'userData':
          return '/ws';
        case 'wsAPI':
          return '/ws-api/v3';
        default: {
          throw neverGuard(
            connectionType,
            `Unhandled connectionType "${wsKey}/${connectionType}"`,
          );
        }
      }
    }
    case 'usdm':
    case 'usdmWSAPI':
    case 'usdmTestnet':
    case 'usdmWSAPITestnet': {
      switch (connectionType) {
        case 'market':
          return '/stream';
        case 'userData':
          return '/ws';
        case 'wsAPI':
          return '/ws-fapi/v1';
        default: {
          throw neverGuard(
            connectionType,
            `Unhandled connectionType "${wsKey}/${connectionType}"`,
          );
        }
      }
    }
    case 'coinm':
    case 'coinmTestnet':
    case 'eoptions':
      switch (connectionType) {
        case 'market':
          return '/stream';
        case 'userData':
          return '/ws';
        case 'wsAPI':
          return '/ws-capi/v1';
        default: {
          throw neverGuard(
            connectionType,
            `Unhandled connectionType "${wsKey}/${connectionType}"`,
          );
        }
      }
    case 'coinm2':
      return '/stream&listenKey=';
    case 'portfolioMarginUserData':
      return '/pm/ws'; // pm/ws/listenKeyHere
    case 'portfolioMarginProUserData':
      return '/pm-classic/ws';
    default: {
      throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}"`);
    }
  }
}

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
const PRIVATE_TOPICS: string[] = [];

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
 * Does nothing if `ws` is undefined. Does nothing in browsers.
 */
export function safeTerminateWs(
  ws?: WebSocket | any,
  fallbackToClose?: boolean,
): boolean {
  if (!ws) {
    return false;
  }
  if (typeof ws['terminate'] === 'function') {
    ws.terminate();
    return true;
  } else if (fallbackToClose) {
    ws.close();
  }

  return false;
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

export function resolveUserDataMarketForWsKey(wsKey: WsKey): WsMarket {
  switch (wsKey) {
    case 'main':
    case 'main2':
    case 'main3':
    case 'mainWSAPI':
    case 'mainWSAPI2':
    case 'marginRiskUserData':
      return 'spot';
    case 'mainTestnetPublic':
    case 'mainTestnetUserData':
    case 'mainWSAPITestnet':
      return 'spotTestnet';
    case 'usdm':
    case 'usdmWSAPI':
      return 'usdm';
    case 'usdmTestnet':
    case 'usdmWSAPITestnet':
      return 'usdmTestnet';
    case 'coinm':
    case 'coinm2':
      return 'coinm';
    case 'coinmTestnet':
      return 'coinmTestnet';
    case 'eoptions':
      return 'options';
    case 'portfolioMarginUserData':
    case 'portfolioMarginProUserData':
      return 'portfoliom';
    default: {
      throw neverGuard(
        wsKey,
        `resolveMarketForWsKey(): Unhandled WsKey "${wsKey}"`,
      );
    }
  }
}

/**
 * Used by the legacy subscribe* utility methods to determine which wsKey to route the subscription to.
 */
export function resolveWsKeyForLegacyMarket(
  market: 'spot' | 'usdm' | 'coinm',
): WsKey {
  switch (market) {
    case 'spot': {
      return 'main';
    }
    case 'coinm': {
      return 'coinm';
    }
    case 'usdm': {
      return 'usdm';
    }
  }
}

/**
 * Try to resolve event.data. Example circumstance: {"stream":"!forceOrder@arr","data":{"e":"forceOrder","E":1634653599186,"o":{"s":"IOTXUSDT","S":"SELL","o":"LIMIT","f":"IOC","q":"3661","p":"0.06606","ap":"0.06669","X":"FILLED","l":"962","z":"3661","T":1634653599180}}}
 */
export function parseRawWsMessage(event: any) {
  if (typeof event === 'string') {
    const parsedEvent = JSON.parse(event);

    if (parsedEvent.data) {
      if (typeof parsedEvent.data === 'string') {
        return parseRawWsMessage(parsedEvent.data);
      }
      return parsedEvent.data;
    }
  }
  if (event?.data) {
    return JSON.parse(event.data);
  }
  return event;
}

export interface MiscUserDataConnectionState {
  isReconnecting?: boolean;
  respawnAttempt?: number;
}

interface WsContext {
  symbol: string | undefined;
  legacyWsKey: string | undefined;
  wsKey: WsKey | undefined;
  market: WsMarket;
  isTestnet: boolean | undefined;
  isUserData: boolean;
  streamName: string;
  listenKey: string | undefined;
  otherParams: undefined | string[];
}

export function getContextFromWsKey(legacyWsKey: any): WsContext {
  const [market, streamName, symbol, listenKey, wsKey, ...otherParams] =
    legacyWsKey.split('_');
  return {
    symbol: symbol === 'undefined' ? undefined : symbol,
    legacyWsKey,
    wsKey,
    market: market as WsMarket,
    isTestnet: market.includes('estnet'),
    isUserData: legacyWsKey.includes('userData'),
    streamName,
    listenKey: listenKey === 'undefined' ? undefined : listenKey,
    otherParams,
  };
}

/**
 * The legacy WS client creates a deterministic WS Key based on consistent input parameters
 */
export function getLegacyWsStoreKeyWithContext(
  market: WsMarket,
  streamName: string,
  symbol: string | undefined = undefined,
  listenKey: string | undefined = undefined,
  ...otherParams: (string | boolean)[]
): any {
  return [market, streamName, symbol, listenKey, ...otherParams].join('_');
}

export function getLegacyWsKeyContext(wsKey: string): WsContext | undefined {
  if (wsKey.indexOf('userData') !== -1) {
    return getContextFromWsKey(wsKey);
  }
  return undefined;
}

export function getRealWsKeyFromDerivedWsKey(wsKey: string | WsKey): WsKey {
  if (!wsKey.includes('userData')) {
    return wsKey as WsKey;
  }

  const legacyWsKeyContext = getLegacyWsKeyContext(wsKey);
  if (!legacyWsKeyContext || !legacyWsKeyContext.wsKey) {
    throw new Error(
      `getRealWsKeyFromDerivedWsKey(): no context found in supplied wsKey: "${wsKey}" | "${legacyWsKeyContext}"`,
    );
  }

  return legacyWsKeyContext.wsKey;
}

export function appendEventMarket(wsMsg: any, wsKey: WsKey) {
  const { market } = getContextFromWsKey(wsKey);
  wsMsg.wsMarket = market;
  wsMsg.wsKey = wsKey;
}
