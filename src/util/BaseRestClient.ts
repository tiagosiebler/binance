import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { BinanceBaseUrlKey } from '../types/shared';
import {
  serialiseParams,
  RestClientOptions,
  GenericAPIResponse,
  getRestBaseUrl,
  getRequestSignature,
} from './requestUtils';
import Beautifier from './beautifier';

type ApiLimitHeader =
  | 'x-mbx-used-weight'
  | 'x-mbx-used-weight-1m'
  | 'x-sapi-used-ip-weight-1m'
  | 'x-mbx-order-count-1s'
  | 'x-mbx-order-count-1m'
  | 'x-mbx-order-count-1h'
  | 'x-mbx-order-count-1d';

export default abstract class BaseRestClient {
  private timeOffset: number = 0;
  private syncTimePromise: null | Promise<void>;
  private options: RestClientOptions;
  private baseUrl: string;
  private globalRequestOptions: AxiosRequestConfig;
  private key: string | undefined;
  private secret: string | undefined;
  private baseUrlKey: BinanceBaseUrlKey;
  private beautifier: Beautifier | undefined;

  public apiLimitTrackers: Record<ApiLimitHeader, number>;
  public apiLimitLastUpdated: number;

  constructor(
    baseUrlKey: BinanceBaseUrlKey,
    options: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    this.options = {
      recvWindow: 5000,
      // how often to sync time drift with binance servers
      syncIntervalMs: 3600000,
      // if true, we'll throw errors if any params are undefined
      strictParamValidation: false,
      // disable the time sync mechanism by default
      disableTimeSync: true,
      ...options,
    };

    this.globalRequestOptions = {
      // in ms == 5 minutes by default
      timeout: 1000 * 60 * 5,
      headers: {
        // 'content-type': 'application/x-www-form-urlencoded';
      },
      // custom request options based on axios specs - see: https://github.com/axios/axios#request-config
      ...requestOptions,
    };

    this.key = options.api_key;
    this.secret = options.api_secret;

    if (this.key) {
      if (!this.globalRequestOptions.headers) {
        this.globalRequestOptions.headers = {};
      }
      this.globalRequestOptions.headers['X-MBX-APIKEY'] = this.key;
    }

    this.baseUrlKey = this.options.baseUrlKey || baseUrlKey;
    this.baseUrl = getRestBaseUrl(this.baseUrlKey, this.options);

    if (this.key && !this.secret) {
      throw new Error(
        'API Key & Secret are both required for private enpoints',
      );
    }

    if (this.options.disableTimeSync !== true) {
      this.syncTime();
      setInterval(this.syncTime.bind(this), +this.options.syncIntervalMs!);
    }

    if (this.options.beautifyResponses) {
      this.beautifier = new Beautifier();
    }

    this.syncTimePromise = null;

    this.apiLimitTrackers = {
      'x-mbx-used-weight': 0,
      'x-mbx-used-weight-1m': 0,
      'x-sapi-used-ip-weight-1m': 0,
      'x-mbx-order-count-1s': 0,
      'x-mbx-order-count-1m': 0,
      'x-mbx-order-count-1h': 0,
      'x-mbx-order-count-1d': 0,
    };
  }

  abstract getServerTime(
    baseUrlKeyOverride?: BinanceBaseUrlKey,
  ): Promise<number>;

  public getBaseUrlKey(): BinanceBaseUrlKey {
    return this.baseUrlKey;
  }

  public getRateLimitStates() {
    return {
      ...this.apiLimitTrackers,
      lastUpdated: this.apiLimitLastUpdated,
    };
  }

  /**
   * Return time sync offset, automatically set if time sync is enabled. A higher offset means system clock is behind server time.
   */
  public getTimeOffset(): number {
    return this.timeOffset;
  }

  public setTimeOffset(value: number) {
    this.timeOffset = value;
  }

  public get(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('GET', endpoint, params);
  }

  public getForBaseUrl(
    endpoint: string,
    baseUrlKey: BinanceBaseUrlKey,
    params?: any,
  ) {
    const baseUrl = getRestBaseUrl(baseUrlKey, {});
    return this._call('GET', endpoint, params, false, baseUrl);
  }

  public getPrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('GET', endpoint, params, true);
  }

  public post(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('POST', endpoint, params);
  }

  public postPrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('POST', endpoint, params, true);
  }

  public put(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('PUT', endpoint, params);
  }

  public putPrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('PUT', endpoint, params, true);
  }

  public delete(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('DELETE', endpoint, params);
  }

  public deletePrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('DELETE', endpoint, params, true);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
   */
  public async _call(
    method: Method,
    endpoint: string,
    params?: any,
    isPrivate?: boolean,
    baseUrlOverride?: string,
  ): GenericAPIResponse {
    const timestamp = Date.now() + (this.getTimeOffset() || 0);

    if (isPrivate && (!this.key || !this.secret)) {
      throw new Error(
        'Private endpoints require api and private keys to be set',
      );
    }

    // Handles serialisation of params into query string (url?key1=value1&key2=value2), handles encoding of values, adds timestamp and signature to request.
    const { serialisedParams, signature, requestBody } =
      await getRequestSignature(
        params,
        this.key,
        this.secret,
        this.options.recvWindow,
        timestamp,
        this.options.strictParamValidation,
        this.options.filterUndefinedParams,
      );

    const baseUrl = baseUrlOverride || this.baseUrl;

    const options = {
      ...this.globalRequestOptions,
      url: [baseUrl, endpoint].join('/'),
      method: method,
      json: true,
    };

    if (isPrivate) {
      options.url +=
        '?' + [serialisedParams, 'signature=' + signature].join('&');
    } else if (method === 'GET' || method === 'DELETE') {
      options.params = params;
    } else {
      options.data = serialiseParams(
        requestBody,
        this.options.strictParamValidation,
        true,
      );
    }

    // console.log(
    //   'sending request: ',
    //   JSON.stringify(
    //     {
    //       reqOptions: options,
    //       reqParams: params,
    //     },
    //     null,
    //     2
    //   )
    // );

    return axios(options)
      .then((response) => {
        this.updateApiLimitState(response.headers, options.url);
        if (response.status == 200) {
          return response.data;
        }

        throw response;
      })
      .then((response) => {
        if (!this.options.beautifyResponses || !this.beautifier) {
          return response;
        }

        // Fallback to original response if beautifier fails
        try {
          return this.beautifier.beautify(response, endpoint) || response;
        } catch (e) {
          console.error(
            'BaseRestClient response beautify failed: ',
            JSON.stringify({ response: response, error: e }),
          );
        }
        return response;
      })
      .catch((e) => this.parseException(e, options.url));
  }

  /**
   * @private generic handler to parse request exceptions
   */
  private parseException(
    e: AxiosError<{ code: string; msg: string }>,
    url: string,
  ): unknown {
    const { response, request, message } = e;

    if (response && response.headers) {
      this.updateApiLimitState(response.headers, url);
    }

    if (this.options.parseExceptions === false) {
      throw e;
    }

    // Something happened in setting up the request that triggered an Error
    if (!response) {
      if (!request) {
        throw message;
      }

      // request made but no response received
      throw e;
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw {
      code: response.data?.code,
      message: response.data?.msg,
      body: response.data,
      headers: response.headers,
      requestUrl: url,
      requestBody: request.body,
      requestOptions: {
        ...this.options,
        api_key: undefined,
        api_secret: undefined,
      },
    };
  }

  // TODO: cleanup?
  private updateApiLimitState(
    responseHeaders: Record<string, any>,
    requestedUrl: string,
  ) {
    const delta: Record<string, any> = {};
    for (const headerKey in this.apiLimitTrackers) {
      const headerValue = responseHeaders[headerKey];
      const value = parseInt(headerValue);
      if (headerValue !== undefined && !isNaN(value)) {
        // TODO: track last seen by key? insetad of all? some keys not returned by some endpoints more useful in estimating whether reset should've happened
        this.apiLimitTrackers[headerKey] = value;
        delta[headerKey] = {
          updated: true,
          valueParsed: value,
          valueRaw: headerValue,
        };
      } else {
        delta[headerKey] = {
          updated: false,
          valueParsed: value,
          valueRaw: headerValue,
        };
      }
    }
    // console.log('responseHeaders: ', requestedUrl);
    // console.table(responseHeaders);
    // console.table(delta);
    this.apiLimitLastUpdated = new Date().getTime();
  }

  /**
   * Trigger time sync and store promise
   */
  public syncTime(): Promise<void> {
    if (this.options.disableTimeSync === true) {
      return Promise.resolve();
    }

    if (this.syncTimePromise !== null) {
      return this.syncTimePromise;
    }

    this.syncTimePromise = this.fetchTimeOffset().then((offset) => {
      this.timeOffset = offset;
      this.syncTimePromise = null;
    });

    return this.syncTimePromise;
  }

  /**
   * Estimate drift based on client<->server latency
   */
  async fetchTimeOffset(): Promise<number> {
    try {
      const start = Date.now();
      const serverTime = await this.getServerTime();
      const end = Date.now();

      const avgDrift = (end - start) / 2;
      return Math.ceil(serverTime - end + avgDrift);
    } catch (e) {
      console.error('Failed to fetch get time offset: ', e);
      return 0;
    }
  }
}
