import { nanoid } from 'nanoid';

import { MainClient } from '../main-client';
import { NewFuturesOrderParams } from '../types/futures';
import {
  BinanceBaseUrlKey,
  CancelOCOParams,
  CancelOrderParams,
  NewOCOParams,
  OrderIdProperty,
} from '../types/shared';
import { WsMarket } from '../types/websockets';
import { USDMClient } from '../usdm-client';
import { WsKey } from '../websocket-client';
import { signMessage } from './node-support';

export type RestClient = MainClient | USDMClient;

export interface RestClientOptions {
  api_key?: string;

  api_secret?: string;

  // override the max size of the request window (in ms)
  recvWindow?: number;

  // how often to sync time drift with binance servers
  syncIntervalMs?: number | string;

  // Default: true. Set to false to enable this mechanism, which is not recommended.
  disableTimeSync?: boolean;

  // Default: false. If true, we'll throw errors if any params are undefined
  strictParamValidation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api2.binance.com'
  baseUrl?: string;

  // manually override with one of the known base URLs in the library
  baseUrlKey?: BinanceBaseUrlKey;

  // Default: true. whether to try and post-process request exceptions.
  parseExceptions?: boolean;

  // Default: false, if true will try to resolve known strings containing numbers to "number" type
  beautifyResponses?: boolean;

  // Default: false, if true will try to filter off undefined values from request params
  filterUndefinedParams?: boolean;

  /**
   * Default: false. If true, use testnet when available
   */
  useTestnet?: boolean;
}

export type GenericAPIResponse<T = any> = Promise<T>;

// function throwUnhandledSwitch(x: never, msg: string): never {
//   throw new Error(msg);
// }

export function getOrderIdPrefix(network: BinanceBaseUrlKey): string {
  switch (network) {
    case 'spot':
    case 'spot1':
    case 'spot2':
    case 'spot3':
    case 'spot4':
      return 'U5D79M5B';

    case 'usdm':
    case 'usdmtest':
    case 'coinm':
    case 'coinmtest':
    case 'papi':
      return '15PC4ZJy';

    case 'voptions':
    case 'voptionstest':
      return '';

    default:
      // throwUnhandledSwitch(network, `"${network}" unhandled`);
      return 'U5D79M5B';
  }
}

export function generateNewOrderId(network: BinanceBaseUrlKey): string {
  const id = nanoid(22);
  const prefixedId = 'x-' + getOrderIdPrefix(network) + id;

  return prefixedId;
}

export function serialiseParams(
  params: object = {},
  strict_validation = false,
  encodeValues: boolean = false,
  filterUndefinedParams: boolean = false,
): string {
  const paramKeys = !filterUndefinedParams
    ? Object.keys(params)
    : Object.keys(params).filter((key) => typeof params[key] !== 'undefined');

  return paramKeys
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter',
        );
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    })
    .join('&');
}

export interface SignedRequestState {
  // Request body as an object, as originally provided by caller
  requestBody: any;
  // Params serialised into a query string, including timestamp and revvwindow
  serialisedParams: string | undefined;
  timestamp?: number;
  signature?: string;
  recvWindow?: number;
}

export async function getRequestSignature(
  data: any,
  key?: string,
  secret?: string,
  recvWindow?: number,
  timestamp?: number,
  strictParamValidation?: boolean,
  filterUndefinedParams?: boolean,
): Promise<SignedRequestState> {
  // Optional, set to 5000 by default. Increase if timestamp/recvWindow errors are seen.
  const requestRecvWindow = data?.recvWindow ?? recvWindow ?? 5000;

  if (key && secret) {
    const requestParams = {
      ...data,
      timestamp,
      recvWindow: requestRecvWindow,
    };
    const serialisedParams = serialiseParams(
      requestParams,
      strictParamValidation,
      true,
      filterUndefinedParams,
    );
    const signature = await signMessage(serialisedParams, secret);
    requestParams.signature = signature;

    return {
      requestBody: { ...data },
      serialisedParams,
      timestamp: timestamp,
      signature: signature,
      recvWindow: requestRecvWindow,
    };
  }

  return { requestBody: data, serialisedParams: undefined };
}

const BINANCE_BASE_URLS: Record<BinanceBaseUrlKey, string> = {
  // spot/margin/savings/mining
  spot: 'https://api.binance.com',
  spot1: 'https://api.binance.com',
  spot2: 'https://api1.binance.com',
  spot3: 'https://api2.binance.com',
  spot4: 'https://api3.binance.com',

  // USDM Futures
  usdm: 'https://fapi.binance.com',
  usdmtest: 'https://testnet.binancefuture.com',

  // COINM Futures
  coinm: 'https://dapi.binance.com',
  coinmtest: 'https://testnet.binancefuture.com',

  // Vanilla Options
  voptions: 'https://vapi.binance.com',
  voptionstest: 'https://testnet.binanceops.com',

  // Portfolio Margin
  papi: 'https://papi.binance.com',
};

export function getServerTimeEndpoint(urlKey: BinanceBaseUrlKey): string {
  switch (urlKey) {
    case 'spot':
    case 'spot1':
    case 'spot2':
    case 'spot3':
    case 'spot4':
    default:
      return 'api/v3/time';

    case 'usdm':
    case 'usdmtest':
      return 'fapi/v1/time';

    case 'coinm':
    case 'coinmtest':
      return 'dapi/v1/time';

    case 'voptions':
    case 'voptionstest':
      return 'vapi/v1/time';
  }
}

export function getRestBaseUrl(
  clientType: BinanceBaseUrlKey,
  restClientOptions: RestClientOptions,
): string {
  if (restClientOptions.baseUrl) {
    return restClientOptions.baseUrl;
  }

  if (restClientOptions.baseUrlKey) {
    return BINANCE_BASE_URLS[restClientOptions.baseUrlKey];
  }

  return BINANCE_BASE_URLS[clientType];
}

export function isPublicEndpoint(endpoint: string): boolean {
  if (endpoint.startsWith('v2/public')) {
    return true;
  }
  if (endpoint.startsWith('public/linear')) {
    return true;
  }
  return false;
}

export function isWsPong(response: any) {
  return (
    response.request &&
    response.request.op === 'ping' &&
    response.ret_msg === 'pong' &&
    response.success === true
  );
}

export function logInvalidOrderId(
  orderIdProperty: OrderIdProperty,
  expectedOrderIdPrefix: string,
  params:
    | NewFuturesOrderParams
    | CancelOrderParams
    | NewOCOParams
    | CancelOCOParams,
) {
  console.warn(
    `WARNING: '${orderIdProperty}' invalid - it should be prefixed with ${expectedOrderIdPrefix}. Use the 'client.generateNewOrderId()' REST client utility method to generate a fresh order ID on demand. Original request: ${JSON.stringify(
      params,
    )}`,
  );
}

export function appendEventIfMissing(wsMsg: any, wsKey: WsKey) {
  if (wsMsg.e) {
    return;
  }

  if (wsKey.indexOf('bookTicker') !== -1) {
    wsMsg.e = 'bookTicker';
    return;
  }

  if (wsKey.indexOf('diffBookDepth') !== -1) {
    wsMsg.e = 'diffBookDepth';
    return;
  }

  if (
    wsKey.indexOf('partialBookDepth') !== -1 ||
    wsKey.indexOf('depth') !== -1
  ) {
    wsMsg.e = 'partialBookDepth';
    return;
  }

  // console.warn('couldnt derive event type: ', wsKey);
}

interface WsContext {
  symbol: string | undefined;
  market: WsMarket;
  isTestnet: boolean | undefined;
  isUserData: boolean;
  streamName: string;
  listenKey: string | undefined;
  otherParams: undefined | string[];
}

export function getContextFromWsKey(wsKey: WsKey): WsContext {
  const [market, streamName, symbol, listenKey, ...otherParams] =
    wsKey.split('_');
  return {
    symbol: symbol === 'undefined' ? undefined : symbol,
    market: market as WsMarket,
    isTestnet: market.includes('estnet'),
    isUserData: wsKey.includes('userData'),
    streamName,
    listenKey: listenKey === 'undefined' ? undefined : listenKey,
    otherParams,
  };
}

export function getWsKeyWithContext(
  market: WsMarket,
  streamName: string,
  symbol: string | undefined = undefined,
  listenKey: string | undefined = undefined,
  ...otherParams: (string | boolean)[]
): WsKey {
  return [market, streamName, symbol, listenKey, ...otherParams].join('_');
}

export function appendEventMarket(wsMsg: any, wsKey: WsKey) {
  const { market } = getContextFromWsKey(wsKey);
  wsMsg.wsMarket = market;
  wsMsg.wsKey = wsKey;
}

export function asArray<T>(el: T[] | T): T[] {
  return Array.isArray(el) ? el : [el];
}
