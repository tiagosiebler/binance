import { SpotClient } from '../src/index';

const client = new SpotClient({
  // Optional (default: false) - when true, response strings are parsed to floats (only for known keys).
  // beautifyResponses: true,
});

(async () => {
  try {
    console.log('getAvgPrice: ', await client.getAvgPrice({ symbol: 'BTCUSDT' }));
    console.log('getExchangeInfo: ', JSON.stringify(await client.getExchangeInfo(), null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
