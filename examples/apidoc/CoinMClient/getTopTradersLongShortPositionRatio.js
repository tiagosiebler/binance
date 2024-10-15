const { CoinMClient } = require('binance');

  // ENDPOINT: futures/data/topLongShortPositionRatio
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L237

const client = new CoinMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getTopTradersLongShortPositionRatio(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
