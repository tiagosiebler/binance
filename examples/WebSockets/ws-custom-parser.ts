// Optional, for 3rd scenario below:
// Import 3rd party library for parsing big number types in JSON
// import JSONbig from 'json-bigint';

import { WebsocketClient } from '../../src';

// Demonstrates using a custom JSON parser for incoming WS messages to preserve big integers

/**
 * ETHUSDT in futures can have unusually large orderId values, sent as numbers. See this thread for more details:
 * https://github.com/tiagosiebler/binance/issues/208
 *
 * If this is a problem for you, you can set a custom JSON parsing alternative using the customParseJSONFn hook injected into the WebsocketClient's constructor, as below:
 */
const ws = new WebsocketClient({
  // Default behaviour, if you don't include this:
  // customParseJSONFn: (rawEvent) => {
  //   return JSON.parse(rawEvent);
  // },
  // Or, pre-process the raw event using RegEx, before using the same workflow:
  customParseJSONFn: (rawEvent) => {
    return JSON.parse(
      rawEvent.replace(/"orderId":\s*(\d+)/g, '"orderId":"$1"'),
    );
  },
  // Or, use a 3rd party library such as json-bigint:
  // customParseJSONFn: (rawEvent) => {
  //   return JSONbig({ storeAsString: true }).parse(rawEvent);
  // },
});

ws.on('open', ({ wsKey }) => {
  console.log('ws connected', wsKey);
});

ws.on('message', (msg) => {
  console.log('msg:', msg);
});

// Subscribe to a couple of topics
// Note: '!ticker@arr' has been deprecated (2025-11-14). Using '!miniTicker@arr' instead.
ws.subscribe(['btcusdt@trade', '!miniTicker@arr'], 'main');
