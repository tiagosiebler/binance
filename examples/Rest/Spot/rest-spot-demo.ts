import { MainClient } from '../../../src/index';

// or
// import { MainClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new MainClient({
  api_secret: secret,
  api_key: key,
  beautifyResponses: true,
  /**
   * Demo trading uses real market data with simulated trading.
   * Perfect for testing strategies without risk.
   */
  demoTrading: true,
});

async function start() {
  try {
    // Get account information on demo trading
    const accountInfo = await client.getAccountInformation();
    console.log('Demo account info: ', accountInfo);

    // Place a test order on demo trading
    const result = await client.submitNewOrder({
      side: 'BUY',
      symbol: 'BTCUSDT',
      type: 'MARKET',
      quantity: 0.001,
    });

    console.log('Demo market buy result: ', result);
  } catch (e) {
    console.error('Demo trading request failed: ', e);
  }
}

start();
