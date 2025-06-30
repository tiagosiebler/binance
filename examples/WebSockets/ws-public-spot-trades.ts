import {
  DefaultLogger,
  isWsFormattedTrade,
  WebsocketClient,
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

  wsClient.on('formattedMessage', (data) => {
    if (isWsFormattedTrade(data)) {
      console.log('trade event ', data);
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

  // Request subscription to the following symbol trade events:
  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

  // Loop through symbols
  for (const symbol of symbols) {
    console.log('subscribing to trades for: ', symbol);
    wsClient.subscribeSpotTrades(symbol);
  }
})();
