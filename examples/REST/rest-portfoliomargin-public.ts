import { PortfolioClient } from '../../src/index';

// or
// import { PortfolioClient } from 'binance';

const client = new PortfolioClient({
  beautifyResponses: true,
});

(async () => {
  try {
    // const serverTime = await client.getServerTime();
    // console.log('serverTime: ', serverTime);

    const res = await client.testConnectivity();
    console.log('res', res);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
