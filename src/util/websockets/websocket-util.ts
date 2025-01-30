import WebSocket from 'isomorphic-ws';

import { WSAPIRequest } from '../../types/websockets/ws-api';
import { APIMarket, WsTopic } from '../../types/websockets/ws-general';
import { WebsocketClientOptions, WsKey } from '../../websocket-client';
import { DefaultLogger } from '../logger';
import { neverGuard } from '../typeGuards';

export const WS_LOGGER_CATEGORY = { category: 'binance-ws' };

export const WS_KEY_MAP = {
  v5SpotPublic: 'v5SpotPublic',
  v5LinearPublic: 'v5LinearPublic',
  v5InversePublic: 'v5InversePublic',
  v5OptionPublic: 'v5OptionPublic',
  v5Private: 'v5Private',
  /**
   * The V5 Websocket API (for sending orders over WS)
   */
  v5PrivateTrade: 'v5PrivateTrade',
} as const;

export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.v5Private,
  WS_KEY_MAP.v5PrivateTrade,
];

export const PUBLIC_WS_KEYS = [
  WS_KEY_MAP.v5SpotPublic,
  WS_KEY_MAP.v5LinearPublic,
  WS_KEY_MAP.v5InversePublic,
  WS_KEY_MAP.v5OptionPublic,
] as string[];

/** Used to automatically determine if a sub request should be to the public or private ws (when there's two) */
const PRIVATE_TOPICS = [
  'stop_order',
  'outboundAccountInfo',
  'executionReport',
  'ticketInfo',
  // copy trading apis
  'copyTradePosition',
  'copyTradeOrder',
  'copyTradeExecution',
  'copyTradeWallet',
  // usdc options
  'user.openapi.option.position',
  'user.openapi.option.trade',
  'user.order',
  'user.openapi.option.order',
  'user.service',
  'user.openapi.greeks',
  'user.mmp.event',
  // usdc perps
  'user.openapi.perp.position',
  'user.openapi.perp.trade',
  'user.openapi.perp.order',
  'user.service',
  // unified margin
  'user.position.unifiedAccount',
  'user.execution.unifiedAccount',
  'user.order.unifiedAccount',
  'user.wallet.unifiedAccount',
  'user.greeks.unifiedAccount',
  // contract v3
  'user.position.contractAccount',
  'user.execution.contractAccount',
  'user.order.contractAccount',
  'user.wallet.contractAccount',
  // v5
  'position',
  'execution',
  'order',
  'wallet',
  'greeks',
];

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

interface NetworkMapV3 {
  livenet: string;
  livenet2?: string;
  testnet: string;
  testnet2?: string;
}

type PublicPrivateNetwork = 'public' | 'private';

/**
 * The following WS keys are logical.
 *
 * They're not directly used as a market. They usually have one private endpoint but many public ones,
 * so they need a bit of extra handling for seamless messaging between endpoints.
 *
 * For the unified keys, the "split" happens using the symbol. Symbols suffixed with USDT are obviously USDT topics.
 * For the v5 endpoints, the subscribe/unsubscribe call must specify the category the subscription should route to.
 */
type PublicOnlyWsKeys =
  | 'v5SpotPublic'
  | 'v5LinearPublic'
  | 'v5InversePublic'
  | 'v5OptionPublic';

export const WS_BASE_URL_MAP: Record<
  APIMarket,
  Record<PublicPrivateNetwork, NetworkMapV3>
> &
  Record<PublicOnlyWsKeys, Record<'public', NetworkMapV3>> &
  Record<
    typeof WS_KEY_MAP.v5PrivateTrade,
    Record<PublicPrivateNetwork, NetworkMapV3>
  > = {
  v5: {
    public: {
      livenet: 'public topics are routed internally via the public wskeys',
      testnet: 'public topics are routed internally via the public wskeys',
    },
    private: {
      livenet: 'wss://stream.bybit.com/v5/private',
      testnet: 'wss://stream-testnet.bybit.com/v5/private',
    },
  },
  v5PrivateTrade: {
    public: {
      livenet: 'public topics are routed internally via the public wskeys',
      testnet: 'public topics are routed internally via the public wskeys',
    },
    private: {
      livenet: 'wss://stream.bybit.com/v5/trade',
      testnet: 'wss://stream-testnet.bybit.com/v5/trade',
    },
  },
  v5SpotPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/spot',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/spot',
    },
  },
  v5LinearPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/linear',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/linear',
    },
  },
  v5InversePublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/inverse',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/inverse',
    },
  },
  v5OptionPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/option',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/option',
    },
  },
};

export function isPrivateWsTopic(topic: string): boolean {
  return PRIVATE_TOPICS.includes(topic);
}

export function getWsKeyForTopic(
  market: APIMarket,
  topic: string,
  isPrivate?: boolean,
): WsKey {
  const isPrivateTopic = isPrivate === true || PRIVATE_TOPICS.includes(topic);
  switch (market) {
    case 'v5': {
      if (isPrivateTopic) {
        return WS_KEY_MAP.v5Private;
      }
      return WS_KEY_MAP.v5Private;
    }
    default: {
      throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
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

  const isTestnet = wsClientOptions.testnet;
  const networkKey = isTestnet ? 'testnet' : 'livenet';

  switch (wsKey) {
    case WS_KEY_MAP.v5Private: {
      return WS_BASE_URL_MAP.v5.private[networkKey];
    }
    case WS_KEY_MAP.v5PrivateTrade: {
      return WS_BASE_URL_MAP[wsKey].private[networkKey];
    }
    case WS_KEY_MAP.v5SpotPublic: {
      return WS_BASE_URL_MAP.v5SpotPublic.public[networkKey];
    }
    case WS_KEY_MAP.v5LinearPublic: {
      return WS_BASE_URL_MAP.v5LinearPublic.public[networkKey];
    }
    case WS_KEY_MAP.v5InversePublic: {
      return WS_BASE_URL_MAP.v5InversePublic.public[networkKey];
    }
    case WS_KEY_MAP.v5OptionPublic: {
      return WS_BASE_URL_MAP.v5OptionPublic.public[networkKey];
    }
    default: {
      logger.error('getWsUrl(): Unhandled wsKey: ', {
        category: 'bybit-ws',
        wsKey,
      });
      throw neverGuard(wsKey, 'getWsUrl(): Unhandled wsKey');
    }
  }
}

export function getMaxTopicsPerSubscribeEvent(
  market: APIMarket,
  wsKey: WsKey,
): number | null {
  switch (market) {
    case 'v5': {
      if (wsKey === WS_KEY_MAP.v5SpotPublic) {
        return 10;
      }
      return null;
    }
    default: {
      throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
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
  market: APIMarket,
  normalisedTopicRequests: WsTopicRequest[],
  wsKey?: WsKey,
  isPrivateTopic?: boolean,
): {
  [key in WsKey]?: WsTopicRequest<WsTopic>[];
} {
  const perWsKeyTopics: { [key in WsKey]?: WsTopicRequest<WsTopic>[] } = {};

  // Sort into per wsKey arrays, in case topics are mixed together for different wsKeys
  for (const topicRequest of normalisedTopicRequests) {
    const derivedWsKey =
      wsKey || getWsKeyForTopic(market, topicRequest.topic, isPrivateTopic);

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
