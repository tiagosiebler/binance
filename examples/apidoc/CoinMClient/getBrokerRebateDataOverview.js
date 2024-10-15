const { CoinMClient } = require('binance');

  // ENDPOINT: dapi/v1/apiReferral/overview
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L560

const client = new CoinMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getBrokerRebateDataOverview(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
