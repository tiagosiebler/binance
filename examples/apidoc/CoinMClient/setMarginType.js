const { CoinMClient } = require('binance');

  // This example shows how to call this Binance API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "binance" for Binance exchange
  // This Binance API SDK is available on npm via "npm install binance"
  // ENDPOINT: dapi/v1/marginType
  // METHOD: POST
  // PUBLIC: NO

const client = new CoinMClient({
  api_key: 'insert_api_key_here',
  api_secret: 'insert_api_secret_here',
});

client.setMarginType(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
