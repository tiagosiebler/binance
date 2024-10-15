const { CoinMClient } = require('binance');

  // ENDPOINT: futures/data/openInterestHist
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L227

const client = new CoinMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getOpenInterestStatistics(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
