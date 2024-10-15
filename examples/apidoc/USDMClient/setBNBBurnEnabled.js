const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/feeBurn
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L584

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.setBNBBurnEnabled(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
