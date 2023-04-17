import { USDMClient } from '../src/index';

// or
// import { USDMClient } from 'binance';

const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = new USDMClient({
  api_secret: secret,
  api_key: key,
  beautifyResponses: true,
});

async function start() {
  try {
    // To open a short position - if you don't have a position yet, and your account is set to one-way mode, just place a sell order to open a short position
    const result = await client.submitNewOrder({
      side: 'SELL',
      symbol: 'BTCUSDT',
      type: 'MARKET',
      quantity: 0.001,
    });

    console.log('market sell result: ', result);
  } catch (e) {
    console.error('market sell failed: ', e);
  }
}

start();
