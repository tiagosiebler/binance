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
    const details = [
      {
        targetAsset: 'BTC',
        percentage: 60,
      },
      {
        targetAsset: 'ETH',
        percentage: 40,
      },
    ];

    // const res1 = await client.updateAutoInvestmentPlan({
    //   planId: 1,
    //   subscriptionAmount: 1.1111,
    //   subscriptionCycle: 'H1',
    //   subscriptionStartTime: 12,
    //   sourceAsset: 'USDT',
    //   details: [
    //     {
    //       targetAsset: 'BTC',
    //       percentage: 100,
    //     },
    //   ],
    // });
    // console.log('res1', res1);

    const res2 = await client.submitAutoInvestOneTimeTransaction({
      subscriptionAmount: 100,
      sourceAsset: 'USDT',
      details: [
        {
          targetAsset: 'BTC',
          percentage: 100,
        },
      ],
      planId: 123456,
      sourceType: 'MAIN_SITE',
    });

    console.log('res2', res2);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
