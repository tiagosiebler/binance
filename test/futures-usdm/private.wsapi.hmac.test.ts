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

describe('Private Futures USDM WebSocket API - HMAC', () => {
  const api_key = process.env.API_KEY_COM as string;
  const api_secret = process.env.API_SECRET_COM as string;

  it('should have HMAC keys', () => {
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

  it('should successfully make fetch request', async () => {
    try {
      const res = await wsAPIClient.getFuturesPositionV2({
        timestamp: Date.now(),
      });

      // console.log('Authenticated request result: ', res);

      // const resExample = {
      //   wsKey: 'usdmWSAPI',
      //   id: 2,
      //   status: 200,
      //   result: [],
      //   rateLimits: [
      //     {
      //       rateLimitType: 'REQUEST_WEIGHT',
      //       interval: 'MINUTE',
      //       intervalNum: 1,
      //       limit: 2400,
      //       count: 12,
      //     },
      //   ],
      //   wsMarket: 'usdm',
      //   request: {
      //     wsKey: 'usdmWSAPI',
      //     id: 2,
      //     method: 'v2/account.position',
      //     params: { timestamp: 1774865233143 },
      //   },
      // };

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

      const badSign = {
        error: {
          code: -1022,
          msg: 'Signature for this request is not valid.',
        },
        id: 2,
        rateLimits: [
          {
            count: -1,
            interval: 'MINUTE',
            intervalNum: 1,
            limit: -1,
            rateLimitType: 'REQUEST_WEIGHT',
          },
        ],
        request: {
          operation: 'order.place',
          params: {
            apiKey:
              'QPVIc2PQPNnV8h4rDwlsYkcTz061V6GN9DeRxcJfWtLids9yhk28mDThEX4pPhla',
            newClientOrderId: 'x-15PC4ZJye2LGo2cMhpEcyRQ5xFA3TA',
            quantity: '0.01',
            side: 'BUY',
            signature:
              '3f42f380bb5478654038ecbe5e6e9c6b99ac1e4d067e0420b58b5c313c7fd29f',
            symbol: 'BTCUSDT',
            timestamp: 1774865454149,
            type: 'MARKET',
          },
          wsKey: 'usdmWSAPI',
        },
        status: 400,
        wsKey: 'usdmWSAPI',
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
