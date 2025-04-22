/* eslint-disable @typescript-eslint/no-unused-vars */
// or
// import {
//   WebsocketAPIClient,
// } from 'binance';

import { DefaultLogger, WebsocketAPIClient } from '../src';

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

// return by binance, generated using the publicKey (above)
const key = 'TQpJexamplerobdG';

// function attachEventHandlers<TWSClient extends WebsocketClient>(
//   wsClient: TWSClient,
// ): void {
//   /**
//    * General event handlers for monitoring the WebsocketClient
//    */
//   wsClient.on('message', (data) => {
//     // console.log('raw message received ', JSON.stringify(data));
//   });
//   wsClient.on('response', (data) => {
//     // console.log('ws response: ', JSON.stringify(data));
//   });
//   wsClient.on('open', (data) => {
//     console.log('ws connected', data.wsKey);
//   });
//   wsClient.on('reconnecting', ({ wsKey }) => {
//     console.log('ws automatically reconnecting.... ', wsKey);
//   });
//   wsClient.on('reconnected', (data) => {
//     console.log('ws has reconnected ', data?.wsKey);
//   });
//   wsClient.on('authenticated', (data) => {
//     console.log('ws has authenticated ', data?.wsKey);
//   });
//   wsClient.on('exception', (data) => {
//     console.error('ws exception: ', JSON.stringify(data));
//   });
// }

async function main() {
  const customLogger = {
    ...DefaultLogger,
    // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
    // trace: (...params) => console.log(new Date(), 'trace', ...params),
  };

  const wsClient = new WebsocketAPIClient(
    {
      api_key: key,
      api_secret: privateKey,
      beautify: true,

      // Enforce testnet ws connections, regardless of supplied wsKey
      // useTestnet: true,

      // If true, if you used requestSubscribeUserDataStream(), it will
      // automatically call this method again if you're reconnected
      resubscribeUserDataStreamAfterReconnect: true,

      // If you want your own event handlers instead of the default ones with logs, disable this setting and see the `attachEventHandlers` example below:
      // attachEventListeners: false
    },
    customLogger,
  );

  // Optional, attach basic event handlers, so nothing is left unhandled
  // attachEventHandlers(wsClient.getWSClient());

  // Optional, if you see RECV Window errors, you can use this to manage time issues.
  // ! However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  wsClient.setTimeOffsetMs(-5000);

  // Optional. Can be used to prepare a connection before sending commands.
  // Can be done as part of a bootstrapping workflow, to reduce initial latency when sending the first command
  // await wsClient.connectWSAPI(WS_KEY_MAP.mainWSAPI);

  try {
    const response = await wsClient.getSpotSessionStatus();
    console.log('getSessionStatus response: ', response);
  } catch (e) {
    console.log('getSessionStatus error: ', e);
  }

  try {
    const response = await wsClient.startUserDataStreamForKey({
      apiKey: key,
    });

    const listenKey = response.result.listenKey;

    console.log('startSpotUserDataStream response: ', listenKey);
  } catch (e) {
    console.log('startSpotUserDataStream error: ', e);
  }

  // // Note: unless you use onReconnectResubscribeUserDataStream, you
  // // will need to call this again after being reconnected
  // try {
  //   const response = await wsClient.subscribeUserDataStream(
  //     WS_KEY_MAP.mainWSAPITestnet,
  //   );

  //   console.log('requestSubscribeUserDataStream response: ', response);
  // } catch (e) {
  //   console.log('requestSubscribeUserDataStream error: ', e);
  // }

  // TODO: add all the other endpoints here, once done
}

// Start executing the example workflow
main();
