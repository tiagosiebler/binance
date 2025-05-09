import { USDMClient } from '../../src/usdm-client';
import { getTestProxy } from '../proxy.util';
import { notAuthenticatedError } from '../response.util';

describe('Public Futures USDM REST API Endpoints', () => {
  const api = new USDMClient({}, getTestProxy());

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
      expect(await api.get24hrChangeStatistics()).toMatchObject(
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
