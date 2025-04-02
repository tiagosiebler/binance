/* eslint-disable @typescript-eslint/no-unused-vars */
// or
// import {
//   WebsocketAPIClient,
//   WebsocketClient,
//   WS_KEY_MAP,
// } from 'binance';

import { WebsocketAPIClient, WebsocketClient, WS_KEY_MAP } from '../src';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const wsClient = new WebsocketAPIClient({
  api_key: key,
  api_secret: secret,
  beautify: true,
});

function attachEventHandlers<TWSClient extends WebsocketClient>(
  wsClient: TWSClient,
): void {
  /**
   * General event handlers for monitoring the WebsocketClient
   */
  wsClient.on('message', (data) => {
    console.log('raw message received ', JSON.stringify(data));
  });
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
  // Attach basic event handlers, so nothing is left unhandled
  attachEventHandlers(wsClient);

  // Optional, see above. Can be used to prepare a connection before sending commands
  // await wsClient.connectWSAPI(WS_KEY_MAP.mainWSAPI);

  try {
    const result = await wsClient.getSessionStatus();
    console.log('getSessionStatus result: ', result);
  } catch (e) {
    console.log('getSessionStatus error: ', e);
  }

  // TODO: add all the other endpoints here, once done
}

// Start executing the example workflow
main();
