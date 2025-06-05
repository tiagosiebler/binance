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
import { WsConnectionStateEnum } from '../../src/util/websockets/WsStore.types';

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

    console.log(
      'onUserDataEvent()->unhandled: ',
      JSON.stringify(data, null, 2),
    );
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

  // Example 1: Spot, by default, routes to the "main" wss domain "wss://stream.binance.com:9443".
  // No parameters needed, just call the subscribe function.
  wsClient.subscribeSpotUserDataStream();

  // // Example 2: Optional: subscribe to spot via other wss domains
  wsClient.subscribeSpotUserDataStream('main2'); // routed to "wss://stream.binance.com:443"

  // // Example 3: cross margin
  wsClient.subscribeCrossMarginUserDataStream();

  // Example 4: isolated margin
  wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDC');

  /**
   * Futures
   */

  // Example 5: usdm futures
  wsClient.subscribeUsdFuturesUserDataStream();

  // Example 6: coinm futures
  wsClient.subscribeCoinFuturesUserDataStream();

  // Example 7: portfolio margin
  // wsClient.subscribePortfolioMarginUserDataStream();

  // Example 8: portfolio margin pro
  // wsClient.subscribePortfolioMarginUserDataStream('portfolioMarginProUserData');

  // after 15 seconds, kill user data connections one by one (or all at once)
  setTimeout(() => {
    // console.log('killing all connections at once');
    // wsClient.closeAll();

    // or:
    console.log('killing individual connections');

    try {
      // console.log('killing all connections');
      // wsClient.closeAll();
      // Example 1:
      wsClient.unsubscribeSpotUserDataStream();
      // Example 2: use the wsKey to route to another domain
      wsClient.unsubscribeSpotUserDataStream('main2');
      // Example 3: cross margin
      wsClient.unsubscribeCrossMarginUserDataStream();
      // Example 4: isolated margin
      wsClient.unsubscribeIsolatedMarginUserDataStream('BTCUSDC');
      // Example 5: usdm futures
      wsClient.unsubscribeUsdFuturesUserDataStream();
      // Example 6: coinm futures
      wsClient.unsubscribeCoinFuturesUserDataStream();
      // // Example 7: portfolio margin
      // wsClient.unsubscribePortfolioMarginUserDataStream();
      // // Example 8: portfolio margin pro
      // wsClient.unsubscribePortfolioMarginUserDataStream(
      //   'portfolioMarginProUserData',
      // );
    } catch (e) {
      console.error('Exception trying to close a user data stream: ', e);
    }
  }, 1000 * 15);

  // after 20 seconds, list the remaining open connections
  setTimeout(() => {
    try {
      console.log(
        'remaining connections:',
        wsClient
          .getWsStore()
          .getKeys()
          .filter(
            (key) =>
              wsClient.getWsStore().get(key)?.connectionState ===
              WsConnectionStateEnum.CONNECTED,
          ),
      );
    } catch (e) {
      console.error('Exception trying to close a user data stream: ', e);
    }
  }, 1000 * 20);
})();
