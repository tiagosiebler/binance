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

  // Subscribe to USDM futures market streams on demo trading
  wsClient.subscribeKlines('BTCUSDT', '1m', 'usdm');
  wsClient.subscribeUsdFuturesUserDataStream();
}

start();
