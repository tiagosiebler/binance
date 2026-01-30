import { WebsocketClient } from '../../../src';

// or
// import { WebsocketClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

async function start() {
  const wsClient = new WebsocketClient({
    api_key: key,
    api_secret: secret,
    beautify: true,
    /**
     * Demo trading uses real market data with simulated trading.
     * Perfect for testing strategies without risk.
     *
     * For more information:
     * https://www.binance.com/en/support/faq/how-to-test-my-functions-on-binance-spot-test-network-ab78f9a1b8824cf0a106b4229c76496d
     */
    demoTrading: true,
  });

  wsClient.on('formattedMessage', (data) => {
    console.log('Demo WS data: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('Demo WS connection opened:', data.wsKey);
  });

  wsClient.on('response', (data) => {
    console.log('Demo WS response: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('reconnected', (data) => {
    console.log('Demo WS reconnected ', data?.wsKey);
  });

  wsClient.on('exception', (data) => {
    console.error('Demo WS error', data);
  });

  // Subscribe to spot market streams on demo trading
  wsClient.subscribeSpotTrades('BTCUSDT');
  wsClient.subscribeSpotKline('BTCUSDT', '1m');
}

start();
