const { MainClient } = require('binance');

  // This example shows how to call this Binance API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "binance" for Binance exchange
  // This Binance API SDK is available on npm via "npm install binance"
  // ENDPOINT: sapi/v1/margin/listen-key?listenKey=${listenKey}
  // METHOD: PUT
  // PUBLIC: YES

const client = new MainClient({
  api_key: 'insert_api_key_here',
  api_secret: 'insert_api_secret_here',
});

client.keepAliveMarginRiskUserDataListenKey(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
