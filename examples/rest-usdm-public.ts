import { USDMClient } from '../src';

const client = new USDMClient({
  useTestnet: true,
  // keepAlive: true,
  // ... any other params,
});

client
  .getRecentTrades({
    symbol: 'BTCUSDT',
    limit: 2,
  })
  .then((r) => console.log('results: ', r))
  .catch((e) => console.error('exception: ', e));
