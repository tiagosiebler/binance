/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClient } from '../src';

// or, with the npm package
/*
import {
  WebsocketClient,
  DefaultLogger,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
} from 'binance';
*/

(async () => {
  // Without typescript:
  // const logger = {
  const logger: DefaultLogger = {
    ...DefaultLogger,
    trace: (...params) => {
      // A simple way to suppress heartbeats but receive all other traces
      // if (params[0].includes('ping') || params[0].includes('pong')) {
      //   return;
      // }
      console.log('\n', new Date(), 'trace ', ...params);
    },
  };

  const wsClient = new WebsocketClient(
    {
      // Optional: when enabled, the SDK will try to format incoming data into more readable objects.
      // Beautified data is emitted via the "formattedMessage" event
      beautify: true,
    },
    logger, // Optional: customise logging behaviour by extending or overwriting the default logger implementation
  );

  // Raw unprocessed incoming data, e.g. if you have the beautifier disabled
  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data, null, 2));
    // console.log('raw message received ', JSON.stringify(data));
    // console.log('raw message received ', data);
  });

  // Formatted data that has gone through the beautifier
  wsClient.on('formattedMessage', (data) => {
    console.log('log formattedMessage: ', data);
  });

  wsClient.on('formattedUserDataMessage', (data) => {
    console.log('log formattedUserDataMessage: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('response', (data) => {
    console.log('log response: ', data?.message || JSON.stringify(data));
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });

  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
    // No action needed here, unless you need to query the REST API after being reconnected.
  });

  try {
    /**
     * The Websocket Client will automatically manage connectivity and active topics/subscriptions for you.
     *
     * Simply call wsClient.subscribe(topic, wsKey) as many times as you want, with or without an array.
     */

    // E.g. one at a time, routed to the coinm futures websockets:
    wsClient.subscribe('btcusd@indexPrice', 'coinm');
    wsClient.subscribe('btcusd@miniTicker', 'coinm');

    // Or send many topics at once to a stream, e.g. the usdm futures stream:
    wsClient.subscribe(
      [
        'btcusdt@aggTrade',
        'btcusdt@markPrice',
        '!ticker@arr',
        '!miniTicker@arr',
      ],
      'usdm',
    );

    /**
     * Subscribe to each available type of spot market topic, the new way
     */
    await wsClient.subscribe(
      [
        // Aggregate Trade Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#aggregate-trade-streams
        'btcusdt@aggTrade',
        // Trade Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#trade-streams
        'btcusdt@trade',
        // Kline/Candlestick Streams for UTC
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
        'btcusdt@kline_5m',
        // Kline/Candlestick Streams with timezone offset
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-with-timezone-offset
        'btcusdt@kline_5m@+08:00',
        // Individual Symbol Mini Ticker Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-mini-ticker-stream
        'btcusdt@miniTicker',
        // All Market Mini Tickers Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-mini-tickers-stream
        '!miniTicker@arr',
        // Individual Symbol Ticker Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-ticker-streams
        'btcusdt@ticker',
        // All Market Tickers Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-tickers-stream
        '!ticker@arr',
        // Individual Symbol Rolling Window Statistics Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-rolling-window-statistics-streams
        'btcusdt@ticker_1h',
        // All Market Rolling Window Statistics Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-rolling-window-statistics-streams
        '!ticker_1h@arr',
        // Individual Symbol Book Ticker Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-book-ticker-streams
        'btcusdt@bookTicker',
        // Average Price
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#average-price
        'btcusdt@avgPrice',
        // Partial Book Depth Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#partial-book-depth-streams
        'btcusdt@depth5',
        'btcusdt@depth10@100ms',
        // Diff. Depth Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#diff-depth-stream
        'btcusdt@depth',
        'btcusdt@depth@100ms',
      ],
      // Look at the `WS_KEY_URL_MAP` for a list of values here:
      // https://github.com/tiagosiebler/binance/blob/master/src/util/websockets/websocket-util.ts
      // "main" connects to wss://stream.binance.com:9443/stream
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
      'main',
    );

    const symbol = 'BTCUSDT';

    /**
     * Subscribe to each available european options market data websocket topic, the new way:
     *
     * https://developers.binance.com/docs/derivatives/option/websocket-market-streams/New-Symbol-Info
     *
     * https://eapi.binance.com/eapi/v1/exchangeInfo
     */
    const optionsAsset = 'ETH';
    const optionsExpiration = '250328';
    const optionsSymbol = 'BTC-250328-140000-C';
    await wsClient.subscribe(
      [
        'option_pair',
        `${optionsAsset}@openInterest@${optionsExpiration}`,
        `${optionsAsset}@markPrice`,
        `${optionsSymbol}@kline_1m`,
        `${optionsAsset}@ticker@${optionsExpiration}`,
        `${symbol}@index`,
        `${optionsAsset}@trade`,
        `${optionsSymbol}@depth100`,
      ],
      'eoptions',
    );

    /**
     *
     * For those that used the Node.js Binance SDK before the v3 release, you can
     * still subscribe to available market topics the "old" way, for convenience
     * when migrating from the old WebsocketClient to the new multiplex client):
     *
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const coinMSymbol = 'ETHUSD_PERP';
    const coinMSymbol2 = 'ETHUSD';
    wsClient.subscribeAggregateTrades(symbol, 'usdm');
    wsClient.subscribeTrades(symbol, 'spot');
    wsClient.subscribeTrades(symbol, 'usdm');
    wsClient.subscribeTrades(coinMSymbol, 'coinm');
    wsClient.subscribeCoinIndexPrice(coinMSymbol2);
    wsClient.subscribeAllBookTickers('usdm');
    wsClient.subscribeSpotKline(symbol, '1m');
    wsClient.subscribeMarkPrice(symbol, 'usdm');
    wsClient.subscribeMarkPrice(coinMSymbol, 'coinm');
    wsClient.subscribeAllMarketMarkPrice('usdm');
    wsClient.subscribeAllMarketMarkPrice('coinm');
    wsClient.subscribeKlines(symbol, '1m', 'usdm');
    wsClient.subscribeContinuousContractKlines(
      symbol,
      'perpetual',
      '1m',
      'usdm',
    );
    wsClient.subscribeIndexKlines(coinMSymbol2, '1m');
    wsClient.subscribeMarkPriceKlines(coinMSymbol, '1m');
    wsClient.subscribeSymbolMini24hrTicker(symbol, 'spot'); // 0116 265 5309, opt 1
    wsClient.subscribeSymbolMini24hrTicker(symbol, 'usdm');
    wsClient.subscribeSymbolMini24hrTicker(coinMSymbol, 'coinm');
    wsClient.subscribeSymbol24hrTicker(symbol, 'spot');
    wsClient.subscribeSymbol24hrTicker(symbol, 'usdm');
    wsClient.subscribeSymbol24hrTicker(coinMSymbol, 'coinm');
    wsClient.subscribeAllMini24hrTickers('spot');
    wsClient.subscribeAllMini24hrTickers('usdm');
    wsClient.subscribeAllMini24hrTickers('coinm');
    wsClient.subscribeAll24hrTickers('spot');
    wsClient.subscribeAll24hrTickers('usdm');
    wsClient.subscribeAll24hrTickers('coinm');
    wsClient.subscribeSymbolLiquidationOrders(symbol, 'usdm');
    wsClient.subscribeAllLiquidationOrders('usdm');
    wsClient.subscribeAllLiquidationOrders('coinm');
    wsClient.subscribeSpotSymbol24hrTicker(symbol);
    wsClient.subscribeSpotPartialBookDepth('ETHBTC', 5, 1000);
    wsClient.subscribeAllRollingWindowTickers('spot', '1d');
    wsClient.subscribeSymbolBookTicker(symbol, 'spot');
    wsClient.subscribePartialBookDepths(symbol, 5, 100, 'spot');
    wsClient.subscribeDiffBookDepth(symbol, 100, 'spot');
    wsClient.subscribeContractInfoStream('usdm');
    wsClient.subscribeContractInfoStream('coinm');
  } catch (e) {
    console.error('exception on subscribe attempt: ', e);
  }
})();
