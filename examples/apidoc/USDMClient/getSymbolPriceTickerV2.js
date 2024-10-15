const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v2/ticker/price
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L230

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSymbolPriceTickerV2(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
