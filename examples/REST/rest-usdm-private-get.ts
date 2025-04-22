import { USDMClient } from '../../src/index';
// import axios from 'axios';

// or
// import { USDMClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new USDMClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: true,
  disableTimeSync: true,
});

(async () => {
  try {
    const allNotionalBrackets = await client.getNotionalAndLeverageBrackets();
    console.log('allNotionalBrackets: ', allNotionalBrackets);

    const btcNotionalBrackets = await client.getNotionalAndLeverageBrackets({
      symbol: 'BTCUSDT',
    });
    console.log(
      'btcNotionalBrackets: ',
      JSON.stringify(btcNotionalBrackets, null, 2),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
