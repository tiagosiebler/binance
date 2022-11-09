import {
  WebsocketClient,
  DefaultLogger,
  isWsFormattedMarkPriceUpdateArray,
} from '../src';

// or, with the npm package
/*
import {
  WebsocketClient,
  DefaultLogger,
  isWsFormattedMarkPriceUpdateArray,
} from 'binance';
*/

(async () => {
  const logger = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient(
    {
      // api_key: key,
      // api_secret: secret,
      beautify: true,
    },
    logger
  );

  wsClient.on('formattedMessage', (data) => {
    if (isWsFormattedMarkPriceUpdateArray(data)) {
      console.log('all mark price evt received ');

      const mapped = data
        .map((r) => {
          return {
            ...r,
            // value is in decimal, multiply by 100 to get percent value
            fundingRate: (Number(r.fundingRate) * 100).toFixed(2),
          };
        })
        .sort((a, b) => a.symbol.localeCompare(b.symbol));

      // log table sorted alphabetically by symbol
      console.table(mapped);
      return;
    }

    console.log('log unhandled formatted msg: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.ws.target.url);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('reply', (data) => {
    console.log('log reply: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });

  wsClient.subscribeAllMarketMarkPrice('usdm', 1000);
})();
