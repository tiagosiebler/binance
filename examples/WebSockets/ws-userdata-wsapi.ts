/* eslint-disable @typescript-eslint/no-unused-vars */
// or
// import { WebsocketAPIClient, WebsocketClient, WS_KEY_MAP } from 'binance';
// or
// const { WebsocketAPIClient, WebsocketClient, WS_KEY_MAP } = require('binance');

import {
  isWsFormattedFuturesUserDataEvent,
  isWsFormattedSpotBalanceUpdate,
  isWsFormattedSpotOutboundAccountPosition,
  isWsFormattedSpotUserDataEvent,
  isWsFormattedUserDataEvent,
  WebsocketAPIClient,
  WebsocketClient,
  WS_KEY_MAP,
} from '../../src';

/**
 * The WS API only works with an Ed25519 API key.
 *
 * Check the rest-private-ed25519.md in this folder for more guidance
 * on preparing this Ed25519 API key.
 */

const publicKey = `-----BEGIN PUBLIC KEY-----
MCexampleQTxwLU9o=
-----END PUBLIC KEY-----
`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAexamplewqj5CzUuTy1
-----END PRIVATE KEY-----
`;

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

// returned by binance, generated using the publicKey (above)
// const key = 'BVv39ATnIme5TTZRcC3I04C3FqLVM7vCw3Hf7mMT7uu61nEZK8xV1V5dmhf9kifm';
// Your Ed25519 private key is passed as the "secret"
// const secret = privateKey;

function attachEventHandlers<TWSClient extends WebsocketClient>(
  wsClient: TWSClient,
): void {
  /**
   * General event handlers for monitoring the WebsocketClient
   */

  // Raw events received from binance, as is:
  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data));
  });

  // Formatted events from the built-in beautifier, with fully readable property names and parsed floats:
  wsClient.on('formattedMessage', (data) => {
    // We've included type guards for many events, especially on the user data stream, to help easily
    // identify events using simple `if` checks.
    //
    // Use `if` checks to narrow down specific events from the user data stream
    if (isWsFormattedSpotOutboundAccountPosition(data)) {
      console.log(
        'formattedMessage->isWsFormattedSpotOutboundAccountPosition: ',
        data,
      );
      return;
    }
    if (isWsFormattedSpotBalanceUpdate(data)) {
      console.log('formattedMessage->isWsFormattedSpotBalanceUpdate: ', data);
      return;
    }

    //// More general handlers, if you prefer:

    // Any user data event in spot:
    if (isWsFormattedSpotUserDataEvent(data)) {
      console.log('formattedMessage->isWsFormattedSpotUserDataEvent: ', data);
    }
    // Any user data event in futures:
    if (isWsFormattedFuturesUserDataEvent(data)) {
      console.log(
        'formattedMessage->isWsFormattedFuturesUserDataEvent: ',
        data,
      );
    }

    // Any user data event on any market (spot + futures)
    if (isWsFormattedUserDataEvent(data)) {
      console.log('formattedMessage->isWsFormattedUserDataEvent: ', data);
      return;
    }
    console.log('formattedMessage: ', data);
  });

  // Formatted user data events also have a dedicated event handler, but that's optional and no different to the above
  // wsClient.on('formattedUserDataMessage', (data) => {
  //   if (isWsFormattedSpotOutboundAccountPosition(data)) {
  //     return;
  //     // console.log(
  //     //   'formattedUserDataMessage->isWsFormattedSpotOutboundAccountPosition: ',
  //     //   data,
  //     // );
  //   }
  //   if (isWsFormattedSpotBalanceUpdate(data)) {
  //     return console.log(
  //       'formattedUserDataMessage->isWsFormattedSpotBalanceUpdate: ',
  //       data,
  //     );
  //   }
  //   console.log('formattedUserDataMessage: ', data);
  // });
  wsClient.on('response', (data) => {
    // console.log('ws response: ', JSON.stringify(data));
  });
  wsClient.on('open', (data) => {
    console.log('ws connected', data.wsKey);
  });
  wsClient.on('reconnecting', ({ wsKey }) => {
    console.log('ws automatically reconnecting.... ', wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });
  wsClient.on('authenticated', (data) => {
    console.log('ws has authenticated ', data?.wsKey);
  });
  wsClient.on('exception', (data) => {
    console.error('ws exception: ', JSON.stringify(data));
  });
}

async function main() {
  const wsClient = new WebsocketAPIClient({
    api_key: key,
    api_secret: secret,
    beautify: true,

    // Enforce testnet ws connections, regardless of supplied wsKey:
    testnet: true,

    // Note: unless you set this to false, the SDK will automatically call
    // the `subscribeUserDataStream()` method again if reconnected (if you called it before):
    // resubscribeUserDataStreamAfterReconnect: true,

    // If you want your own event handlers instead of the default ones with logs, disable this setting and see the `attachEventHandlers` example below:
    attachEventListeners: false,
  });

  // Attach your own event handlers to process incoming events
  // You may want to disable the default ones to avoid unnecessary logs (via attachEventListeners:false, above)
  attachEventHandlers(wsClient.getWSClient());

  // Optional, if you see RECV Window errors, you can use this to manage time issues.
  // ! However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  // wsClient.setTimeOffsetMs(-5000);

  // Note: unless you set resubscribeUserDataStreamAfterReconnect to false, the SDK will
  // automatically call this method again if reconnected,
  try {
    const response = await wsClient.subscribeUserDataStream(
      WS_KEY_MAP.mainWSAPI, // The `mainWSAPI` wsKey will connect to the "spot" Websocket API on Binance.
    );

    console.log('subscribeUserDataStream response: ', response);
  } catch (e) {
    console.log('subscribeUserDataStream error: ', e);
  }
}

// Start executing the example workflow
main();
