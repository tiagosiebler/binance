const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/continuousKlines
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L162

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getContinuousContractKlines(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
