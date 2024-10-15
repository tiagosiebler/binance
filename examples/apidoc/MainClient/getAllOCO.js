const { MainClient } = require('binance');

  // ENDPOINT: api/v3/allOrderList
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L776

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getAllOCO(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
