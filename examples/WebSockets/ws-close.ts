import { DefaultLogger, WebsocketClient } from '../../src/index';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

(async () => {
  const key = process.env.API_KEY_COM || 'APIKEY';
  const secret = process.env.API_SECRET_COM || 'APISECRET';

  const logger = {
    ...DefaultLogger,
    trace: () => {},
  };

  const wsClient = new WebsocketClient(
    {
      api_key: key,
      api_secret: secret,
      beautify: true,
    },
    logger,
  );

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.wsUrl);
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });

  wsClient.on('message', (data) => {
    console.log('data received: ', data);
  });
  wsClient.on('response', (data) => {
    console.log('response received: ', data);
  });

  wsClient.subscribeUsdFuturesUserDataStream();

  wsClient.subscribe(
    ['!miniTicker@arr', 'btcusdt@avgPrice', 'btcusdt@kline_5m'],
    'main',
  );

  setTimeout(() => {
    // unsubscribe from user data stream (for usd futures)
    wsClient.unsubscribeUsdFuturesUserDataStream();

    // unsubscribe from individual topics on a connection, one at a time:
    // wsClient.unsubscribe('!miniTicker@arr', 'main');

    // arrays also supported:
    wsClient.unsubscribe(['!miniTicker@arr', 'btcusdt@avgPrice'], 'main');
  }, 5000);
})();
