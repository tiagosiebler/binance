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
    console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('formattedMessage', (data) => {
    console.log('log formattedMessage: ', data);
    if (!Array.isArray(data)) {
      if (data.eventType === 'kline') {
        console.log('kline received ', data.kline);
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

  wsClient.subscribeSpotKline(market, '1m');

})();
