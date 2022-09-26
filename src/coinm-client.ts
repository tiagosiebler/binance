import { AxiosRequestConfig } from 'axios';
import {
  CoinMAccountTradeParams,
  CoinMOpenInterest,
  CoinMPositionTrade,
  CoinMSymbolOrderBookTicker,
  PositionRisk,
  SymbolOrPair,
} from './types/coin';
import { BinanceBaseUrlKey } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import {
  asArray,
  getServerTimeEndpoint,
  RestClientOptions,
} from './util/requestUtils';

export class CoinMClient extends BaseRestClient {
  private clientId: BinanceBaseUrlKey;

  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    const clientId = 'coinm';
    super(clientId, restClientOptions, requestOptions);

    this.clientId = clientId;
    return this;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(): Promise<number> {
    return this.get(getServerTimeEndpoint(this.clientId)).then(
      (response) => response.serverTime
    );
  }

  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#change-log
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#general-info
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#testnet
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#general-api-information
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#limits
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#endpoint-security-type
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#signed-trade-and-user_data-endpoint-security
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#public-endpoints-info
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#filters
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#market-data-endpoints
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#test-connectivity
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#check-server-time
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#exchange-information
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#order-book
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#recent-trades-list
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#old-trades-lookup-market_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#compressed-aggregate-trades-list
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#index-price-and-mark-price
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-funding-rate-history-of-perpetual-futures
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#kline-candlestick-data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#continuous-contract-kline-candlestick-data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#index-price-kline-candlestick-data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#mark-price-kline-candlestick-data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#24hr-ticker-price-change-statistics
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#symbol-price-ticker

  getSymbolOrderBookTicker(
    params?: SymbolOrPair
  ): Promise<CoinMSymbolOrderBookTicker[]> {
    return this.get('dapi/v1/ticker/bookTicker', params).then((e) =>
      asArray(e)
    );
  }

  getOpenInterest(params: { symbol: string }): Promise<CoinMOpenInterest> {
    return this.get('dapi/v1/openInterest', params);
  }

  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#open-interest-statistics
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#top-trader-long-short-ratio-accounts
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#top-trader-long-short-ratio-positions
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#long-short-ratio
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#taker-buy-sell-volume
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#basis
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#websocket-market-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#live-subscribing-unsubscribing-to-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#aggregate-trade-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#index-price-stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#mark-price-stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#mark-price-of-all-symbols-of-a-pair
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#kline-candlestick-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#continuous-contract-kline-candlestick-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#index-kline-candlestick-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#mark-price-kline-candlestick-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#individual-symbol-mini-ticker-stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#all-market-mini-tickers-stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#individual-symbol-ticker-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#all-market-tickers-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#individual-symbol-book-ticker-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#all-book-tickers-stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#liquidation-order-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#all-market-liquidation-order-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#partial-book-depth-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#diff-book-depth-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#how-to-manage-a-local-order-book-correctly
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#account-trades-endpoints
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#new-future-account-transfer
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-future-account-transaction-history-list
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#change-position-mode-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-current-position-mode-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#new-order-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#modify-order-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#place-multiple-orders-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#modify-multiple-orders-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-order-modify-history-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#query-order-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#cancel-order-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#cancel-all-open-orders-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#cancel-multiple-orders-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#auto-cancel-all-open-orders-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#query-current-open-order-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#current-all-open-orders-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#all-orders-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#futures-account-balance-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#account-information-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#change-initial-leverage-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#change-margin-type-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#modify-isolated-position-margin-trade
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-position-margin-change-history-trade

  getPositions(): Promise<PositionRisk[]> {
    return this.getPrivate('dapi/v1/positionRisk');
  }

  getAccountTrades(
    params: CoinMAccountTradeParams
  ): Promise<CoinMPositionTrade[]> {
    return this.getPrivate('dapi/v1/userTrades', params);
  }

  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#get-income-history-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#notional-bracket-for-symbol-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#notional-bracket-for-pair-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#user-39-s-force-orders-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#position-adl-quantile-estimation-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#user-commission-rate-user_data
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#user-data-streams
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#start-user-data-stream-user_stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#keepalive-user-data-stream-user_stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#close-user-data-stream-user_stream
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#event-margin-call
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#event-balance-and-position-update
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#event-order-update
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#websocket-user-data-request
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#request-user-39-s-account-information
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#request-user-39-s-account-balance
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#request-user-39-s-position
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#event-account-configuration-update-leverage-update
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#portfolio-margin-endpoints
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#portfolio-margin-exchange-information
  //TODO - https://binance-docs.github.io/apidocs/delivery/en/#portfolio-margin-account-information-user_data
}
