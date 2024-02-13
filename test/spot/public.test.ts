import { MainClient } from '../../src/index';
import { getTestProxy } from '../proxy.util';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe('Public Spot REST API Endpoints', () => {
  const api = new MainClient({}, getTestProxy());

  const symbol = 'BTCUSDT';
  const interval = '15m';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Misc', () => {
    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getBalances()).rejects.toMatchObject(
        notAuthenticatedError(),
      );
    });

    it('getServerTime() should return number', async () => {
      expect(await api.getServerTime()).toStrictEqual(expect.any(Number));
    });

    it('getSystemStatus()', async () => {
      expect(await api.getSystemStatus()).toMatchObject({
        msg: 'normal',
        status: 0,
      });
    });

    it('testConnectivity()', async () => {
      expect(await api.testConnectivity()).toStrictEqual({});
    });
  });

  describe('Market Data Endpoints', () => {
    it('getExchangeInfo()', async () => {
      expect(await api.getExchangeInfo()).toMatchObject({
        exchangeFilters: expect.any(Array),
        rateLimits: expect.any(Array),
        serverTime: expect.any(Number),
        symbols: expect.any(Array),
        timezone: expect.any(String),
      });
    });
  });
});
