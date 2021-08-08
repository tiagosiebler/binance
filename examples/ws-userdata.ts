import { DefaultLogger } from '../src';
import { WebsocketClient } from '../src/websocket-client';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

(async () => {
  const key = 'APIKEY';
  const secret = 'APISECRET';

  const market = 'BTCUSDT';

  const logger = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient({
    api_key: key,
    api_secret: secret,
    beautify: true,
  }, logger);

  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('formattedMessage', (data) => {
    console.log('log formattedMessage: ', data);
    if (!Array.isArray(data) && data.wsMarket.includes('userData')) {
      if (data.wsMarket.includes('spot')) {
        // spot user data event
        return;
      }
      if (data.wsMarket.includes('margin')) {
        // spot margin data event
        return;
      }
      if (data.wsMarket.includes('isolatedMargin')) {
        // spot isolatedMargin data event
        return;
      }
      if (data.wsMarket.includes('usdmTestnet')) {
        // spot usdmTestnet data event
        return;
      }
      if (data.wsMarket.includes('usdm')) {
        // spot usdm data event
        return;
      }
    }
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.ws.target.url);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('reply', (data) => {
    console.log('log reply: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey );
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey );
  });

  wsClient.subscribeSpotUserDataStream();
  wsClient.subscribeMarginUserDataStream();
  wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');
  wsClient.subscribeUsdFuturesUserDataStream();

})();
