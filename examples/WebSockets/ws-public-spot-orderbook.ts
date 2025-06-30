/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  DefaultLogger,
  isWsPartialBookDepthEventFormatted,
  WebsocketClient,
  WsMessagePartialBookDepthEventFormatted,
} from '../../src/index';

// or, with the npm package
/*
import {
  WebsocketClient,
  DefaultLogger,
  isWsFormattedTrade,
} from 'binance';
*/

(async () => {
  const logger = {
    ...DefaultLogger,
    // trace: () => {},
  };

  const wsClient = new WebsocketClient(
    {
      beautify: true,
    },
    logger,
  );

  const topicsPartialBookDepths: string[] = [];

  /**
   * Simple example for receiving depth snapshots from spot orderbooks
   */
  wsClient.on('formattedMessage', (data) => {
    if (isWsPartialBookDepthEventFormatted(data)) {
      const [symbol] = data.streamName.split('@');
      if (!symbol) {
        throw new Error('Failed to extract context from event?');
      }

      console.log(`ws book event for "${symbol.toUpperCase()}"`, data);
      return;
    }

    console.log('log formattedMessage: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.wsUrl);
  });
  wsClient.on('response', (data) => {
    console.log('log response: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });
  wsClient.on('exception', (data) => {
    console.error('ws exception: ', data?.wsKey, data);
  });

  // Request subscription to the following symbol events:
  const symbols = ['BTCUSDT'];
  // const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

  // Loop through symbols
  for (const symbol of symbols) {
    console.log('subscribing to trades for: ', symbol);
    // The old way, convenient but unnecessary:
    // wsClient.subscribePartialBookDepths(symbol, levels, 1000, 'spot');

    // Manually build a topic matching the structure expected by binance:
    // btcusdt@depth20@1000ms

    const streamName = 'depth';
    const levels = 20;
    const updateMs = '@' + 1000 + 'ms';

    const topic = `${symbol.toLowerCase()}@${streamName}${levels}${updateMs}`;
    topicsPartialBookDepths.push(topic);
  }

  // Request subscribe for these topics in the main product group (spot markets are under "main")
  wsClient.subscribe(topicsPartialBookDepths, 'main');
})();
