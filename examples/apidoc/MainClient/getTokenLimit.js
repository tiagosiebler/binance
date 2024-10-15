const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/giftcard/buyCode/token-limit
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3141

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getTokenLimit(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
