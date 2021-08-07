import { SpotClient } from "@src/spot-client";
import { NewFuturesOrderParams } from "@src/types/futures";
import { BinanceBaseUrlKey, CancelOCOParams, CancelOrderParams, NewOCOParams, OrderIdProperty } from "@src/types/shared";
import { WsMarket } from "@src/types/websockets";
import { USDMClient } from "@src/usdm-client";
import { WsKey } from "@src/websocket-client";

export type RestClient = SpotClient | USDMClient;

export interface RestClientOptions {
  api_key?: string;

  api_secret?: string;

  // override the max size of the request window (in ms)
  recv_window?: number;

  // how often to sync time drift with binance servers
  sync_interval_ms?: number | string;

  // Default: false. Disable above sync mechanism if true.
  disable_time_sync?: boolean;

  // Default: false. If true, we'll throw errors if any params are undefined
  strict_param_validation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api2.binance.com'
  baseUrl?: string;

  // manually override with one of the known base URLs in the library
  baseUrlKey?: BinanceBaseUrlKey,

  // Default: true. whether to try and post-process request exceptions.
  parse_exceptions?: boolean;
}

export type GenericAPIResponse<T = any> = Promise<T>;

export function getOrderIdPrefix(network: BinanceBaseUrlKey): string {
  switch (network) {
    case 'spot':
    case 'spot1':
    case 'spot2':
    case 'spot3':
    case 'spot4':
    default:
      return 'U5D79M5B';

    case 'usdm':
    case 'usdmtest':
    case 'coinm':
      return '15PC4ZJy';

    case 'voptions':
    case 'voptionstest':
      return '';
  }
}

export function generateNewOrderId(network: BinanceBaseUrlKey): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const maxLength = 25;

  let randomString = 'x-' + getOrderIdPrefix(network);
  for (let i = randomString.length; i < maxLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum + 1);
  }
  return randomString;
}

export function serialiseParams(params: object = {}, strict_validation = false): string {
  return Object.keys(params)
    .map(key => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error('Failed to sign API request due to undefined parameter');
      }
      return `${key}=${value}`;
    })
    .join('&');
};

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
  // testnet is same as `usdmtest`

  // Vanilla Options
  voptions: 'https://vapi.binance.com',
  voptionstest: 'https://testnet.binanceops.com',
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
      return 'dapi/v1/time';

    case 'voptions':
    case 'voptionstest':
      return 'vapi/v1/time';
  }
}

export function getRestBaseUrl(clientType: BinanceBaseUrlKey, restInverseOptions: RestClientOptions): string {
  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (restInverseOptions.baseUrlKey) {
    return BINANCE_BASE_URLS[restInverseOptions.baseUrlKey];
  }

  return BINANCE_BASE_URLS[clientType];
}

export function isPublicEndpoint (endpoint: string): boolean {
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
  params: NewFuturesOrderParams | CancelOrderParams | NewOCOParams | CancelOCOParams
) {
  console.warn(`WARNING: '${orderIdProperty}' invalid - it should be prefixed with ${expectedOrderIdPrefix}. Use the 'client.generateNewOrderId()' REST client utility method to generate a fresh order ID on demand. Original request: ${JSON.stringify(params)}`);
}

export function appendEventIfMissing(wsMsg: any, wsKey: WsKey) {
  if (wsMsg.e) {
    return;
  }

  if (wsKey.indexOf('bookTicker') !== -1) {
    wsMsg.e = 'bookTicker';
    return;
  }

  if (wsKey.indexOf('partialBookDepth') !== -1) {
    wsMsg.e = 'partialBookDepth';
    return;
  }

  if (wsKey.indexOf('diffBookDepth') !== -1) {
    wsMsg.e = 'diffBookDepth';
    return;
  }
}

interface WsContext {
  symbol: string | undefined;
  market: WsMarket;
  isTestnet: boolean | undefined;
  isUserData: boolean;
  streamName: string;
  listenKey: string | undefined
  otherParams: undefined | string[];
}

export function getContextFromWsKey(wsKey: WsKey): WsContext {
  const [market, streamName, symbol, listenKey, ...otherParams] = wsKey.split('_');
  return {
    symbol: symbol === 'undefined' ? undefined : symbol,
    market: market as WsMarket,
    isTestnet: market.includes('estnet'),
    isUserData: wsKey.includes('userData'),
    streamName,
    listenKey: listenKey === 'undefined' ? undefined : listenKey,
    otherParams,
  }
}

export function getWsKeyWithContext(market: WsMarket, streamName: string, symbol: string | undefined = undefined, listenKey: string | undefined = undefined, ...otherParams: (string | boolean)[]): WsKey {
  return [market, streamName, symbol, listenKey, ...otherParams].join('_');
}

export function appendEventMarket(wsMsg: any, wsKey: WsKey) {
  const { market } = getContextFromWsKey(wsKey)
  wsMsg.wsMarket = market;
  wsMsg.wsKey = wsKey;
}
