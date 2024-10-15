const { MainClient } = require('binance');

  // ENDPOINT: sapi/v3/broker/subAccount/futuresSummary
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3595

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.querySubAccountFuturesAssetInfo(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
