import JSONbig from 'json-bigint';
import { WebsocketClient } from '../../src';

// Demonstrates using a custom JSON parser for incoming WS messages to preserve big integers

const ws = new WebsocketClient({
  // Recommended: represent large integers as strings to avoid JSON.stringify issues
  parseWsMessageFn: JSONbig({ storeAsString: true }).parse,
});

ws.on('open', ({ wsKey }) => {
  console.log('ws connected', wsKey);
});

ws.on('message', (msg) => {
  console.log('msg:', msg);
});

// Subscribe to a couple of topics
ws.subscribe(['btcusdt@trade', '!ticker@arr'], 'main');
