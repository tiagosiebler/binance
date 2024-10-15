const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/managed-subaccount/query-trans-log
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1830

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getManagedSubAccountTransferLog(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
