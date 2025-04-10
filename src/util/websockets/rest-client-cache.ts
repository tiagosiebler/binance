import { AxiosRequestConfig } from 'axios';

import { CoinMClient } from '../../coinm-client';
import { MainClient } from '../../main-client';
import { PortfolioClient } from '../../portfolio-client';
import { USDMClient } from '../../usdm-client';
import { RestClientOptions } from '../requestUtils';

interface RestClientStore {
  spot: MainClient;
  spotTestnet: MainClient;
  margin: MainClient;
  usdmFutures: USDMClient;
  usdmFuturesTestnet: USDMClient;
  coinmFutures: CoinMClient;
  coinmFuturesTestnet: CoinMClient;
  portfolio: PortfolioClient;
  // options: MainClient;
}

export class RestClientCache {
  private restClients: Partial<RestClientStore> = {};

  public getSpotRestClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
  ): MainClient {
    if (restOptions.useTestnet) {
      if (!this.restClients.spotTestnet) {
        this.restClients.spotTestnet = new MainClient(
          { ...restOptions },
          requestOptions,
        );
      }
      return this.restClients.spotTestnet;
    }
    if (!this.restClients.spot) {
      this.restClients.spot = new MainClient(restOptions, requestOptions);
    }
    return this.restClients.spot;
  }

  public getUSDMRestClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
  ): USDMClient {
    if (restOptions.useTestnet) {
      if (!this.restClients.usdmFuturesTestnet) {
        this.restClients.usdmFuturesTestnet = new USDMClient(
          restOptions,
          requestOptions,
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
  ): CoinMClient {
    if (restOptions.useTestnet) {
      if (!this.restClients.coinmFuturesTestnet) {
        this.restClients.coinmFuturesTestnet = new CoinMClient(
          restOptions,
          requestOptions,
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

  public getPortfolioClient(
    restOptions: RestClientOptions,
    requestOptions?: AxiosRequestConfig,
  ): PortfolioClient {
    if (!this.restClients.portfolio) {
      this.restClients.portfolio = new PortfolioClient(
        restOptions,
        requestOptions,
      );
    }
    return this.restClients.portfolio;
  }
}
