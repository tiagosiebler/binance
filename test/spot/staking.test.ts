import { MainClient } from '../../src/index';
import { getTestProxy } from '../proxy.util';

describe('Staking API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new MainClient(
    {
      api_key: API_KEY,
      api_secret: API_SECRET,
    },
    {
      timeout: 1000 * 60,
      ...getTestProxy(),
    },
  );

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Staking Endpoints', () => {
    it('getStakingProductList()', async () => {
      const result = await api.getStakingProducts({
        product: 'STAKING',
        size: 25,
      });

      expect(result.length).toBe(25);
      expect(Object.keys(result[0]).sort()).toEqual(
        ['projectId', 'detail', 'quota'].sort(),
      );
    });

    it('getStakingProductPosition()', async () => {
      const result = await api.getStakingProductPosition({
        product: 'STAKING',
        size: 25,
      });
      expect(Array.isArray(result)).toBe(true);
    });

    it('getStakingHistory()', async () => {
      const result = await api.getStakingHistory({
        product: 'STAKING',
        txnType: 'INTEREST',
      });

      expect(Array.isArray(result)).toBe(true);
      if (result.length) {
        expect(
          Object.keys(result[0])
            .filter(
              (e) =>
                ['positionId', 'time', 'asset', 'amount', 'status'].indexOf(
                  e,
                ) >= 0,
            )
            .sort(),
        ).toEqual(['positionId', 'time', 'asset', 'amount', 'status'].sort());
      }
    });
  });

  it('getPersonalLeftQuotaOfStakingProduct()', async () => {
    const products = await api.getStakingProducts({
      product: 'STAKING',
      size: 2,
    });

    const result = await api.getPersonalLeftQuotaOfStakingProduct({
      product: 'STAKING',
      productId: products[0].projectId,
    });

    expect(!Number.isNaN(result.leftPersonalQuota)).toBe(true);
  });
});
