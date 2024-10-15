const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/margin/delist-schedule
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L874

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getMarginDelistSchedule(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
