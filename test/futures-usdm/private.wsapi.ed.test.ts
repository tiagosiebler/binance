/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, LogParams, WebsocketAPIClient } from '../../src';
import { getTestProxy, getWSTestProxy } from '../proxy.util';

const silentLogger: DefaultLogger = {
  /** Ping/pong events and other raw messages that might be noisy. Enable this while troubleshooting. */
  trace: (..._params: LogParams): void => {
    // console.log(_params);
  },
  info: (..._params: LogParams): void => {
    // console.info(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  },
};

describe('Private Futures USDM WebSocket API - ED25519', () => {
  const api_key = process.env.API_ED25519_KEY_COM as string;
  const api_secret = process.env.API_ED25519_SECRET_COM as string;

  it('should have ED25519 keys', () => {
    expect(api_key).toBeDefined();
    expect(api_secret).toBeDefined();
  });

  const wsAPIClient = new WebsocketAPIClient(
    {
      api_key: api_key,
      api_secret: api_secret,
      beautify: true,

      // Inject proxy for WS
      ...getWSTestProxy(),
      // Inject proxy for REST requests made by WS client
      requestOptions: getTestProxy(),
    },
    silentLogger,
  );

  wsAPIClient.getWSClient().on('exception', (data) => {
    console.error('ws exception: ', JSON.stringify(data));
    wsAPIClient.disconnectAll();
    throw data;
  });

  it('should successfully make fetch request', async () => {
    try {
      const res = await wsAPIClient.getFuturesPositionV2({
        timestamp: Date.now(),
      });

      expect(res).toBeDefined();
      expect(Array.isArray(res.result)).toBe(true);
      expect(res.status).toBe(200);
    } catch (e) {
      console.error(`exception "${expect.getState().currentTestName}"`, e);
      expect(e).toBeUndefined(); // Force test failure
    }
  });

  it('should successfully post authenticated futures order', async () => {
    try {
      const res = await wsAPIClient.submitNewFuturesOrder('usdm', {
        symbol: 'BTCUSDT',
        side: 'BUY',
        type: 'MARKET',
        quantity: '0.01',
        timestamp: Date.now(),
      });

      console.log(`res "${expect.getState().currentTestName}"`, res);
      expect(res).toBeDefined();
    } catch (e) {
      // console.error(`exception "${expect.getState().currentTestName}"`, e);

      const expectedPermissionError = {
        wsKey: 'usdmWSAPI',
        id: 3,
        status: 401,
        error: {
          code: -2015,
          msg: 'Invalid API-key, IP, or permissions for action',
        },
        rateLimits: [
          {
            rateLimitType: 'REQUEST_WEIGHT',
            interval: 'MINUTE',
            intervalNum: 1,
            limit: -1,
            count: -1,
          },
        ],
        wsMarket: 'usdm',
      };

      // Read-only API keys, so an invalid permissions error confirms that sign was OK and we successfully authenticated, but just don't have permissions for that endpoint:
      expect(e.error?.code).toBe(expectedPermissionError.error.code);
      expect(e.status).toBe(expectedPermissionError.status);
    }
  });

  afterAll(async () => {
    await wsAPIClient.disconnectAll();
  });
});
