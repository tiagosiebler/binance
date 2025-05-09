import { PortfolioClient } from '../../src/index';

// or
// import { PortfolioClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new PortfolioClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: true,
});

(async () => {
  try {
    const res = await client.getBalance();
    console.log('res', res);

    const listenKey = await client.getPMUserDataListenKey();
    console.log('listen key res: ', listenKey);

    // const newOrderRes = await client.submitNewUMOrder({
    //   symbol: 'BTCUSDT',
    //   side: 'BUY',
    //   type: 'MARKET',
    //   quantity: '10',
    // });

    // console.log('new order res: ', newOrderRes);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
