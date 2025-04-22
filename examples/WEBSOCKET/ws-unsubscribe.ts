/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebsocketClient } from '../../src/index';

// or, with the npm package
/*
import {
  WebsocketClient,
  DefaultLogger,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
} from 'binance';
*/

/**
 *
 * A simple demonstration on how to unsubscribe from one or more topics.
 *
 */
(async () => {
  const wsClient = new WebsocketClient();

  // Raw unprocessed incoming data, e.g. if you have the beautifier disabled
  wsClient.on('message', (data) => {
    console.log('raw message received ', JSON.stringify(data));
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);
  });

  wsClient.on('response', (data) => {
    console.log('log response: ', data?.message || JSON.stringify(data));
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });

  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });

  try {
    /**
     * The Websocket Client will automatically manage connectivity and active topics/subscriptions for you.
     *
     * Simply call wsClient.subscribe(topic, wsKey) as many times as you want, with or without an array.
     */

    const wsTopicList = [
      // Aggregate Trade Streams
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#aggregate-trade-streams
      'btcusdt@aggTrade',
      // Kline/Candlestick Streams for UTC
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
      'btcusdt@kline_5m',
      // Individual Symbol Mini Ticker Stream
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-mini-ticker-stream
      'btcusdt@miniTicker',
      // Individual Symbol Ticker Streams
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-ticker-streams
      'btcusdt@ticker',
      // Individual Symbol Rolling Window Statistics Streams
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-rolling-window-statistics-streams
      'btcusdt@ticker_1h',
      // Average Price
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#average-price
      'btcusdt@avgPrice',
    ];

    console.log(
      new Date(),
      'Subscribing to the following topics: ',
      wsTopicList,
    );

    /**
     * Subscribe to each available type of spot market topic, the new way
     */
    await wsClient.subscribe(wsTopicList, 'main');

    const unsubscribeFromList = [
      'btcusdt@aggTrade',
      'btcusdt@kline_5m',
      'btcusdt@miniTicker',
      'btcusdt@ticker',
      'btcusdt@ticker_1h',
    ];

    // 5 seconds later, unsubscribe from almost all topics except avg price
    setTimeout(() => {
      console.log(
        new Date(),
        'Unsubscribing from the following topics: ',
        unsubscribeFromList,
      );
      wsClient.unsubscribe(unsubscribeFromList, 'main');
    }, 1000 * 5);
  } catch (e) {
    console.error('exception on subscribe attempt: ', e);
  }
})();
