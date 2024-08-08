import { MainClient } from '../src/index';

// or
// import { MainClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new MainClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: true,
});

(async () => {
  try {
    const result = await client.submitAutoInvestOneTimeTransaction({
      sourceType: 'MAIN_SITE',
      subscriptionAmount: 100,
      sourceAsset: 'USDT',
      details: [
        {
          targetAsset: 'BTC',
          percentage: 60,
        },
        {
          targetAsset: 'ETH',
          percentage: 40,
        },
      ],
    });

    console.log('res2', result);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
