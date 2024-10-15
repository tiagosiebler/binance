const { CoinMClient } = require('binance');

  // ENDPOINT: dapi/v1/ticker/bookTicker
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L215

const client = new CoinMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSymbolOrderBookTicker(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
