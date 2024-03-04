import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';
import { USDMClient } from '../../src/usdm-client';
import { getTestProxy } from '../proxy.util';

describe('Public Futures USDM REST API Endpoints', () => {
  const api = new USDMClient({}, getTestProxy());

  const symbol = 'BTCUSDT';
  const interval = '15m';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Misc', () => {
    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getCurrentPositionMode()).rejects.toMatchObject(
        notAuthenticatedError(),
      );
    });

    it('getServerTime() should return number', async () => {
      expect(await api.getServerTime()).toStrictEqual(expect.any(Number));
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

    it('getMarkPrice()', async () => {
      expect(await api.getMarkPrice()).toMatchObject(expect.any(Array));
    });

    it('getFundingRateHistory()', async () => {
      expect(await api.getFundingRateHistory()).toMatchObject(
        expect.any(Array),
      );
    });

    it('get24hrChangeStatististics()', async () => {
      expect(await api.get24hrChangeStatististics()).toMatchObject(
        expect.any(Array),
      );
    });

    it('getSymbolPriceTicker()', async () => {
      expect(await api.getSymbolPriceTicker()).toMatchObject(expect.any(Array));
    });

    it('getSymbolOrderBookTicker()', async () => {
      expect(await api.getSymbolOrderBookTicker()).toMatchObject(
        expect.any(Array),
      );
    });

    it('getCompositeSymbolIndex()', async () => {
      expect(await api.getCompositeSymbolIndex()).toMatchObject(
        expect.any(Array),
      );
    });
  });
});
