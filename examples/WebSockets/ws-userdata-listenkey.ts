// or
// import {
//   DefaultLogger,
//   isWsFormattedFuturesUserDataEvent,
//   isWsFormattedSpotUserDataEvent,
//   isWsFormattedSpotUserDataExecutionReport,
//   isWsFormattedUserDataEvent,
//   WebsocketClient,
//   WsUserDataEvents,
// } from 'binance';

import {
  DefaultLogger,
  isWsFormattedFuturesUserDataEvent,
  isWsFormattedSpotUserDataEvent,
  isWsFormattedSpotUserDataExecutionReport,
  isWsFormattedUserDataEvent,
  WebsocketClient,
  WsUserDataEvents,
} from '../../src/index';

(async () => {
  const key = process.env.API_KEY_COM || 'APIKEY';
  const secret = process.env.API_SECRET_COM || 'APISECRET';

  console.log({ key, secret });

  const ignoredTraceLogMsgs = [
    'Sending ping',
    'Received ping frame, sending pong frame',
    'Received pong frame, clearing pong timer',
  ];

  // Optional, hook and customise logging behavior
  const logger = {
    ...DefaultLogger,
    trace: (msg, context) => {
      if (ignoredTraceLogMsgs.includes(msg)) {
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
      // testnet: true,
    },
    logger,
  );

  // wsClient.on('message', (data) => {
  //   console.log('raw message received ', JSON.stringify(data, null, 2));
  // });

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

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.wsUrl);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('response', (data) => {
    console.log('log response: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });

  wsClient.on('reconnected', (data) => {
    if (
      typeof data?.wsKey === 'string' &&
      data.wsKey.toLowerCase().includes('userdata')
    ) {
      console.log('ws for user data stream has reconnected ', data?.wsKey);
      // This is a good place to check your own state is still in sync with the account state on the exchange, in case any events were missed while the library was reconnecting:
      // - fetch balances
      // - fetch positions
      // - fetch orders
    } else {
      console.log('ws has reconnected ', data?.wsKey);
    }
  });

  wsClient.on('exception', (data) => {
    console.error('ws saw error: ', data);
  });

  /**
   * This example demonstrates subscribing to the user data stream via the
   * listen key workflow.
   *
   * Note: the listen key workflow is deprecated for "spot" markets. Use the
   * WebSocket API `userDataStream.subscribe` workflow instead (only available
   * in spot right now). See `subscribeUserDataStream()` in the WebsocketAPIClient.
   *
   * Each method below opens a dedicated WS connection attached to an automatically
   * fetched listen key (a session for your user data stream).
   *
   * Once subscribed, you don't need to do anything else. Listen-key keep-alive, refresh, reconnects, etc are all automatically handled by the SDK.
   */
  wsClient.subscribeSpotUserDataStream();
  // wsClient.subscribeCrossMarginUserDataStream();
  // wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');
  // wsClient.subscribeUsdFuturesUserDataStream();

  // setTimeout(() => {
  //   console.log('killing all connections');
  //   wsClient.closeAll();
  // }, 1000 * 15);
})();
