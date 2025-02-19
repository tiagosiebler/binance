import { AxiosRequestConfig } from 'axios';

import { CoinMClient } from '../../coinm-client';
import { MainClient } from '../../main-client';
import { USDMClient } from '../../usdm-client';
import { RestClientOptions } from '../requestUtils';

interface RestClientStore {
  spot: MainClient;
  margin: MainClient;
  usdmFutures: USDMClient;
  usdmFuturesTestnet: USDMClient;
  coinmFutures: CoinMClient;
  coinmFuturesTestnet: CoinMClient;
  // options: MainClient;
}

export class RestClientCache {
  private restClients: Partial<RestClientStore>;

  public getSpotRestClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
  ): MainClient {
    if (!this.restClients.spot) {
      this.restClients.spot = new MainClient(restOptions, requestOptions);
    }
    return this.restClients.spot;
  }

  public getUSDMRestClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
    isTestnet?: boolean,
  ): USDMClient {
    if (isTestnet) {
      if (!this.restClients.usdmFuturesTestnet) {
        this.restClients.usdmFuturesTestnet = new USDMClient(
          restOptions,
          requestOptions,
          isTestnet, // TODO: migrate to using restOptions param instead, deprecate this flag
        );
      }
      return this.restClients.usdmFuturesTestnet;
    }

    if (!this.restClients.usdmFutures) {
      this.restClients.usdmFutures = new USDMClient(
        restOptions,
        requestOptions,
      );
    }
    return this.restClients.usdmFutures;
  }

  public getCOINMRestClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
    isTestnet?: boolean,
  ): CoinMClient {
    if (isTestnet) {
      if (!this.restClients.coinmFuturesTestnet) {
        this.restClients.coinmFuturesTestnet = new CoinMClient(
          restOptions,
          requestOptions,
          isTestnet, // TODO: migrate to using restOptions param instead, deprecate this flag
        );
      }
      return this.restClients.coinmFuturesTestnet;
    }

    if (!this.restClients.coinmFutures) {
      this.restClients.coinmFutures = new CoinMClient(
        restOptions,
        requestOptions,
      );
    }
    return this.restClients.coinmFutures;
  }
}
