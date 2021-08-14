import { SpotClient } from '../src/index';

// or
// import { SpotClient } from 'binance';

const key = 'APIKEY';
const secret = 'APISECRET';

const client = new SpotClient({
  api_key: key,
  api_secret: secret,
});

(async () => {
  try {
    console.log('getAccountStatus: ', await client.getAccountStatus());
    console.log('getApiTradingStatus: ', await client.getApiTradingStatus());
    console.log('getApiKeyPermissions: ', await client.getApiKeyPermissions());
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
