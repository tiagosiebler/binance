import {
  DefaultLogger,
  isWsDiffBookDepthEventFormatted,
  isWsPartialBookDepthEventFormatted,
  WebsocketClient,
  WS_KEY_MAP,
} from '../../../src';

// or, with the npm package
/*
import {
  DefaultLogger,
  isWsDiffBookDepthEventFormatted,
  isWsPartialBookDepthEventFormatted,
  WebsocketClient,
  WS_KEY_MAP,
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
    console.log('raw message received ', JSON.stringify(data));
    // console.log('log rawMessage: ', data);
  });

  // Formatted data that has gone through the beautifier
  wsClient.on('formattedMessage', (data) => {
    // console.log('log formattedMessage: ', data);

    /**
     * Optional: we've included type-guards for many formatted websocket topics.
     *
     * These can be used within `if` blocks to narrow down specific event types (even for non-typescript users).
     */
    // if (isWsAggTradeFormatted(data)) {
    //   console.log('log agg trade: ', data);
    //   return;
    // }

    // // For one symbol
    // if (isWsFormattedMarkPriceUpdateEvent(data)) {
    //   console.log('log mark price: ', data);
    //   return;
    // }

    // // for many symbols
    // if (isWsFormattedMarkPriceUpdateArray(data)) {
    //   console.log('log mark prices: ', data);
    //   return;
    // }

    // if (isWsFormattedKline(data)) {
    //   console.log('log kline: ', data);
    //   return;
    // }

    // if (isWsFormattedTrade(data)) {
    //   return console.log('log trade: ', data);
    // }

    // if (isWsFormattedForceOrder(data)) {
    //   return console.log('log force order: ', data);
    // }

    // if (isWsFormatted24hrTickerArray(data)) {
    //   return console.log('log 24hr ticker array: ', data);
    // }

    // if (isWsFormattedRollingWindowTickerArray(data)) {
    //   return console.log('log rolling window ticker array: ', data);
    // }

    // if (isWsFormatted24hrTicker(data)) {
    //   return console.log('log 24hr ticker: ', data);
    // }

    if (isWsPartialBookDepthEventFormatted(data)) {
      return console.log('log partial book depth event: ', data);
    }

    if (isWsDiffBookDepthEventFormatted(data)) {
      return console.log('log diff book depthUpdate event: ', data);
    }
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
     *
     * The WsKey is a reference to the connection that this topic should be routed to.
     * WS_KEY_MAP is a complete enum with all the available WsKey values.
     *
     * The following topics are routed to the "market" endpoint for USDM Futures market data, as per the following documentation:
     * https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Important-WebSocket-Change-Notice#public-high-frequency-public-data
     */

    // Uses the high-frequency order book & core public feeds WS URL dedicated to USDM Futures:
    // wss://fstream.binance.com/public/stream
    const wsConnectionKey = WS_KEY_MAP.usdmPublic;

    /**
     * Subscribe to each available type of USDM Derivatives market topic, the new way
     */
    await wsClient.subscribe(
      [
        // Individual Symbol Book Ticker Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-book-ticker-streams
        'btcusdt@bookTicker',
        // All Book Tickers Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Book-Tickers-Stream
        '!bookTicker', // DOESNT EXIST AS TYPE GUARD
        // Partial Book Depth Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Partial-Book-Depth-Streams
        'btcusdt@depth5',
        'btcusdt@depth10@100ms',
        // Diff. Book Depth Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Diff-Book-Depth-Streams
        'btcusdt@depth',
        'btcusdt@depth@100ms',
        'btcusdt@depth@500ms',
      ],
      wsConnectionKey,
    );

    // /**
    //  *
    //  * For those that used the Node.js Binance SDK before the v3 release, you can
    //  * still subscribe to available market topics the "old" way, for convenience
    //  * when migrating from the old WebsocketClient to the new multiplex client):
    //  *
    //  */

    // wsClient.subscribeAggregateTrades(symbol, 'usdm');
    // wsClient.subscribeTrades(symbol, 'spot');
    // wsClient.subscribeTrades(symbol, 'usdm');
    // wsClient.subscribeTrades(coinMSymbol, 'coinm');
    // wsClient.subscribeCoinIndexPrice(coinMSymbol2);
    // wsClient.subscribeAllBookTickers('usdm');
    // wsClient.subscribeSpotKline(symbol, '1m');
    // wsClient.subscribeMarkPrice(symbol, 'usdm');
    // wsClient.subscribeMarkPrice(coinMSymbol, 'coinm');
    // wsClient.subscribeAllMarketMarkPrice('usdm');
    // wsClient.subscribeAllMarketMarkPrice('coinm');
    // wsClient.subscribeKlines(symbol, '1m', 'usdm');
    // wsClient.subscribeContinuousContractKlines(
    //   symbol,
    //   'perpetual',
    //   '1m',
    //   'usdm',
    // );
    // wsClient.subscribeIndexKlines(coinMSymbol2, '1m');
    // wsClient.subscribeMarkPriceKlines(coinMSymbol, '1m');
    // wsClient.subscribeSymbolMini24hrTicker(symbol, 'spot'); // 0116 265 5309, opt 1
    // wsClient.subscribeSymbolMini24hrTicker(symbol, 'usdm');
    // wsClient.subscribeSymbolMini24hrTicker(coinMSymbol, 'coinm');
    // wsClient.subscribeSymbol24hrTicker(symbol, 'spot');
    // wsClient.subscribeSymbol24hrTicker(symbol, 'usdm');
    // wsClient.subscribeSymbol24hrTicker(coinMSymbol, 'coinm');
    // wsClient.subscribeAllMini24hrTickers('spot');
    // wsClient.subscribeAllMini24hrTickers('usdm');
    // wsClient.subscribeAllMini24hrTickers('coinm');
    // wsClient.subscribeAll24hrTickers('spot');
    // wsClient.subscribeAll24hrTickers('usdm');
    // wsClient.subscribeAll24hrTickers('coinm');
    // wsClient.subscribeSymbolLiquidationOrders(symbol, 'usdm');
    // wsClient.subscribeAllLiquidationOrders('usdm');
    // wsClient.subscribeAllLiquidationOrders('coinm');
    // wsClient.subscribeSpotSymbol24hrTicker(symbol);
    // wsClient.subscribeSpotPartialBookDepth('ETHBTC', 5, 1000);
    // wsClient.subscribeAllRollingWindowTickers('spot', '1d');
    // wsClient.subscribeSymbolBookTicker(symbol, 'spot');
    // wsClient.subscribePartialBookDepths(symbol, 5, 100, 'spot');
    // wsClient.subscribeDiffBookDepth(symbol, 100, 'spot');
    // wsClient.subscribeContractInfoStream('usdm');
    // wsClient.subscribeContractInfoStream('coinm');
  } catch (e) {
    console.error('exception on subscribe attempt: ', e);
  }
})();
