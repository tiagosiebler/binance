const { CoinMClient } = require('binance');

  // ENDPOINT: dapi/v1/openInterest
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L223

const client = new CoinMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOpenInterest(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
