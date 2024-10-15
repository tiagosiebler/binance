const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/mining/pub/algoList
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2401

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getMiningAlgos(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
