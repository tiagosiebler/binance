import {
  DefaultLogger,
  isWsFormattedFuturesUserDataEvent,
  isWsFormattedSpotUserDataEvent,
  isWsFormattedUserDataEvent,
  isWsFormattedSpotUserDataExecutionReport,
  WsUserDataEvents,
} from '../src';
import { WebsocketClient } from '../src/websocket-client';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

/**
 * This extended example for using the user data stream demonstrates one way to handle failures in the first connection attempt of the user data stream.
 * In most cases this is overkill!
 */
(async () => {
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  // optionally block some silly logs from showing in the logger
  const ignoredSillyLogMsgs = [
    'Sending ping',
    'Received pong, clearing pong timer',
    'Received ping, sending pong frame',
  ];

  // Optional, hook and customise logging behavior
  const logger = {
    ...DefaultLogger,
    silly: (msg, context) => {
      if (ignoredSillyLogMsgs.includes(msg)) {
        return;
      }
      console.log(JSON.stringify({ msg, context }));
    },
  };

  const wsClient = new WebsocketClient(
    {
      api_key: key,
      api_secret: secret,
      beautify: true,
    },
    logger
  );

  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  function onUserDataEvent(data: WsUserDataEvents) {
    // the market denotes which API category it came from
    // if (data.wsMarket.includes('spot')) {

    // or use a type guard, if one exists (PRs welcome)
    if (isWsFormattedSpotUserDataExecutionReport(data)) {
      console.log('spot user execution report event: ', data);
      return;
    }
    if (isWsFormattedSpotUserDataEvent(data)) {
      console.log('spot user data event: ', data);
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
    if (data.wsMarket.includes('coinmTestnet')) {
      console.log('coinmTestnet user data event: ', data);
      return;
    }
    if (isWsFormattedFuturesUserDataEvent(data)) {
      console.log('usdm user data event: ', data);
      return;
    }
  }

  wsClient.on('formattedMessage', (data) => {
    // The wsKey can be parsed to determine the type of message (what websocket it came from)
    // if (!Array.isArray(data) && data.wsKey.includes('userData')) {
    //   return onUserDataEvent(data);
    // }

    // or use a type guard if available
    if (isWsFormattedUserDataEvent(data)) {
      return onUserDataEvent(data);
    }
    console.log('formattedMsg: ', JSON.stringify(data, null, 2));
  });

  let didConnectUserDataSuccessfully = false;
  wsClient.on('open', (data) => {
    if (data.wsKey.includes('userData')) {
      didConnectUserDataSuccessfully = true;
    }
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
  wsClient.on('error', (data) => {
    console.error('ws saw error: ', data);

    // Note: manually re-subscribing like this may only be needed if the FIRST user data connection attempt failed
    // Capture exceptions using the error event, and handle this.
    if (!didConnectUserDataSuccessfully && data.wsKey.includes('userData')) {
      setTimeout(() => {
        console.warn(
          `Retrying connection to userdata ws ${data.wsKey} in 1 second...`
        );
        if (data.wsKey.includes('spot')) {
          wsClient.subscribeSpotUserDataStream();
        } else if (data.wsKey.includes('usdm')) {
          wsClient.subscribeUsdFuturesUserDataStream();
        }
      }, 1000);
    }
  });

  wsClient.subscribeSpotUserDataStream();
  // wsClient.subscribeMarginUserDataStream();
  // wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');
  wsClient.subscribeUsdFuturesUserDataStream();
})();
