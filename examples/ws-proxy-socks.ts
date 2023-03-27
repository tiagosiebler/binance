/**
 * Minimal example for using a socks proxy with the ws client, extracted from https://github.com/tiagosiebler/binance/pull/319
 */
import { WebsocketClient } from '../src';

// or
// import { WebsocketClient } from 'binance';

const { SocksProxyAgent } = require('socks-proxy-agent');

const agent = new SocksProxyAgent(process.env.http_proxy);
const wsClient = new WebsocketClient({
  beautify: true,
  wsOptions: {
    agent: agent,
  },
});

wsClient.on('formattedMessage', (data) => {
  console.log('log formattedMessage: ', data);
});
wsClient.on('open', (data) => {
  console.log('connection opened open:', data.wsKey, data.ws.target.url);
});

wsClient.on('reply', (data) => {
  console.log('log reply: ', JSON.stringify(data, null, 2));
});
wsClient.on('reconnecting', (data) => {
  console.log('ws automatically reconnecting.... ', data?.wsKey);
});
wsClient.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});

wsClient.subscribeAll24hrTickers('usdm');
