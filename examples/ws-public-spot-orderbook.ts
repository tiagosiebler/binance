import {
  WebsocketClient,
  DefaultLogger,
  isWsPartialBookDepthEventFormatted,
  getContextFromWsKey,
} from '../src';

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
    // silly: () => {},
  };

  const wsClient = new WebsocketClient(
    {
      beautify: true,
    },
    logger,
  );

  /**
   * Simple example for receiving depth snapshots from spot orderbooks
   */
  wsClient.on('formattedMessage', (data) => {
    if (isWsPartialBookDepthEventFormatted(data)) {
      const context = getContextFromWsKey(data.wsKey);

      if (!context?.symbol) {
        throw new Error(`Failed to extract context from event?`);
      }

      console.log(`ws book event for "${context.symbol.toUpperCase()}"`, data);
      return;
    }

    console.log('log formattedMessage: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.ws.target.url);
  });
  wsClient.on('reply', (data) => {
    console.log('log reply: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });
  wsClient.on('error', (data) => {
    console.error(`ws error: `, data?.wsKey, data);
  });

  // Request subscription to the following symbol trade events:
  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
  // const symbols = ['BTCUSDT'];

  // Loop through symbols
  for (const symbol of symbols) {
    console.log('subscribing to trades for: ', symbol);
    wsClient.subscribePartialBookDepths(symbol, 20, 1000, 'spot');
  }
})();
