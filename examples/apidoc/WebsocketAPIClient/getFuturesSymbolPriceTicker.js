const { WebsocketAPIClient } = require('binance');

// This example shows how to call this Binance WebSocket API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "binance" for Binance exchange
// This Binance API SDK is available on npm via "npm install binance"
// WS API ENDPOINT: ticker.price
// METHOD: WebSocket API
// PUBLIC: YES

// Create a WebSocket API client instance
const client = new WebsocketAPIClient({
  api_key: 'insert_api_key_here',
  api_secret: 'insert_api_secret_here',
});

// The WebSocket connection is established automatically when needed
// You can use the client to make requests immediately

// Example use of the getFuturesSymbolPriceTicker method
client.getFuturesSymbolPriceTicker(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

