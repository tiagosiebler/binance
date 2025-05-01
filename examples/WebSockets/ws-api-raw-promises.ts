/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefaultLogger,
  WebsocketClient,
  WS_KEY_MAP,
  WSAPIWsKey,
} from '../../src/index';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient, WSAPIWsKey } from 'binance';

const logger = {
  ...DefaultLogger,
  // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
  trace: (...params) => console.log(new Date(), 'trace', ...params),
};

let key = process.env.API_KEY_COM;
let secret = process.env.API_SECRET_COM;

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwasdfasfasf4VI6HF5a1mmn6Xwbbwqj5CzUuTy1
-----END PRIVATE KEY-----
`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2Vasdfasfasfasfasfn38QTxwLU9o=
-----END PUBLIC KEY-----
`;

key = 'TQpJN8MYasdfdasfadsfasf7DoCxTjQEbrobdG';
secret = privateKey;

const wsClient = new WebsocketClient(
  {
    api_key: key,
    api_secret: secret,
    beautify: true,
    // testnet: true,
  },
  logger, // Optional: inject a custom logger
);

/**
 * General event handlers for monitoring the WebsocketClient
 */
wsClient.on('message', (data) => {
  console.log('raw message received ', JSON.stringify(data));
});
wsClient.on('response', (data) => {
  // WS API responses can be processed here too, but that is optional
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

async function main() {
  /**
   *
   * If you haven't connected yet, the WebsocketClient will automatically connect and authenticate you as soon as you send
   * your first command. That connection will then be reused for every command you send, unless the connection drops - then
   * it will automatically be replaced with a healthy connection.
   *
   * This "not connected yet" scenario can add an initial delay to your first command. If you want to prepare a connection
   * in advance, you can ask the WebsocketClient to prepare it before you start submitting commands (using the connectWSAPI() method shown below). This is optional.
   *
   */

  /**
   * Websockets (with their unique URLs) are tracked using the concept of a "WsKey".
   *
   * This WsKey identifies the "main" WS API connection URL (e.g. for spot & margin markets):
   * wss://ws-api.binance.com:443/ws-api/v3
   *
   * Other notable keys:
   * - mainWSAPI2: alternative for "main"
   * - mainWSAPITestnet: "main" testnet
   * - usdmWSAPI: usdm futures
   * - usdmWSAPITestnet: usdm futures testnet
   * - coinmWSAPI: coinm futures
   * - coinmWSAPITestnet: coinm futures testnet
   */

  // Note: if you set "testnet: true" in the config, this will automatically resolve to WS_KEY_MAP.mainWSAPITestnet (you can keep using mainWSAPI).
  const WS_API_WS_KEY: WSAPIWsKey = WS_KEY_MAP.mainWSAPI;

  // Optional, if you see RECV Window errors, you can use this to manage time issues. However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  // wsClient.setTimeOffsetMs(-5000);

  // Optional, see above. Can be used to prepare a connection before sending commands. This is not required and will happen automatically
  // await wsClient.connectWSAPI(WS_API_WS_KEY);

  try {
    const wsAPIResponse = await wsClient.sendWSAPIRequest(
      WS_API_WS_KEY,
      'ping',
    );
    console.log(new Date(), 'wsapi PING: ', wsAPIResponse);
  } catch (e) {
    console.log(new Date(), 'wsapi PING error:', e);
  }

  try {
    const wsAPIResponse = await wsClient.sendWSAPIRequest(
      WS_API_WS_KEY,
      'session.status',
    );
    console.log(new Date(), 'wsapi sessionStatus: ', wsAPIResponse, {
      authSince: wsAPIResponse.result.authorizedSince,
    });
  } catch (e) {
    console.log(new Date(), 'wsapi sessionStatus error:', e);
  }

  try {
    const wsAPIResponse = await wsClient.sendWSAPIRequest(
      WS_API_WS_KEY,
      'exchangeInfo',
    );
    console.log(new Date(), 'wsapi exchangeInfo: ', wsAPIResponse, {
      // rateLimits: wsAPIResponse.result.rateLimits,
      // symbols: wsAPIResponse.result.symbols,
    });
  } catch (e) {
    console.log(new Date(), 'wsapi exchangeInfo error:', e);
  }

  try {
    const wsAPIResponse = await wsClient.sendWSAPIRequest(
      WS_API_WS_KEY,
      'order.place',
      {
        symbol: 'BTCUSDT',
        type: 'MARKET',
        side: 'SELL',
        quantity: 10,
        timestamp: Date.now(),
      },
    );
    console.log(new Date(), 'wsapi orderPlace: ', wsAPIResponse, {});
  } catch (e) {
    console.log(new Date(), 'wsapi orderPlace error:', e);
  }
}

// Start executing the example workflow
main().catch((e) => {
  console.log('mainError', e);
});
