import { MainClient } from '../src/index';

// or
// import { MainClient } from 'binance';

const client = new MainClient({
  // Optional (default: false) - when true, response strings are parsed to floats (only for known keys).
  // beautifyResponses: true,
});

(async () => {
  try {
    // console.log(
    //   'getAvgPrice: ',
    //   await client.getAvgPrice({ symbol: 'BTCUSDT' }),
    // );
    // console.log(
    //   'getExchangeInfo: ',
    //   JSON.stringify(await client.getExchangeInfo(), null, 2),
    // );

    const oneTicker = await client.get24hrChangeStatististics({
      symbol: 'BTCUSDT',
    });
    console.log('getTickers', oneTicker);

    const manyTickers = await client.get24hrChangeStatististics({
      symbols: ['BTCUSDT', 'ETHUSDT'],
    });
    console.log('getTickers many', manyTickers);
    const allTickers = await client.get24hrChangeStatististics();
    console.log('getTickers all', allTickers);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
