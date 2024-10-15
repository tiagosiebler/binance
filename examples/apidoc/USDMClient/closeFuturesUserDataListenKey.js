const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/listenKey
  // METHOD: DELETE
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L776

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.closeFuturesUserDataListenKey(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
