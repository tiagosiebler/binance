import { DefaultLogger, WebsocketClient } from '../src';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

(async () => {
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';
  let wsKey;

  const logger = {
    ...DefaultLogger,
    silly: () => {},
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
    console.log('connection opened open:', data.wsKey, data.ws.target.url);
    wsKey = data.wsKey;
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });

  wsClient.subscribeUsdFuturesUserDataStream();

  setTimeout(() => wsClient.close(wsKey, false), 5000);
})();
