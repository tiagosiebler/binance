import { DefaultLogger, WsFormattedMessage } from '../src';
import { WebsocketClient } from '../src/websocket-client';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

(async () => {
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const logger = {
    ...DefaultLogger,
    silly: () => {},
  };

  const wsClient = new WebsocketClient({
    api_key: key,
    api_secret: secret,
    beautify: true,
  }, logger);

  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  function onUserDataEvent(data: WsFormattedMessage) {
    if (Array.isArray(data)) {
      return;
    }

    // the market denotes which API category it came from
    if (data.wsMarket.includes('spot')) {
      console.log('spot user data event: ', data);
      // spot user data event
      return;
    }
    if (data.wsMarket.includes('margin')) {
      console.log('margin user data event: ', data);
      return;
    }
    if (data.wsMarket.includes('isolatedMargin')) {
      console.log('isolatedMargin user data event: ', data);
      return;
    }
    if (data.wsMarket.includes('usdmTestnet')) {
      console.log('usdmTestnet user data event: ', data);
      return;
    }
    if (data.wsMarket.includes('usdm')) {
      console.log('usdm user data event: ', data);
      return;
    }
  }

  wsClient.on('formattedMessage', (data) => {
    // The wsKey can be parsed to determine the type of message (what websocket it came from)
    if (!Array.isArray(data) && data.wsKey.includes('userData')) {
      return onUserDataEvent(data);
    }
    console.log('formattedMsg: ', JSON.stringify(data, null, 2));
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
  // wsClient.subscribeMarginUserDataStream();
  // wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');
  wsClient.subscribeUsdFuturesUserDataStream();

})();
