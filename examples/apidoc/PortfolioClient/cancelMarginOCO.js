const { PortfolioClient } = require('binance');

  // This example shows how to call this Binance API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "binance" for Binance exchange
  // This Binance API SDK is available on npm via "npm install binance"
  // ENDPOINT: papi/v1/margin/orderList
  // METHOD: DELETE
  // PUBLIC: NO

const client = new PortfolioClient({
  api_key: 'insert_api_key_here',
  api_secret: 'insert_api_secret_here',
});

client.cancelMarginOCO(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
