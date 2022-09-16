import { MainClient } from '../../src/index';

describe('Staking API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new MainClient(
    {
      disableTimeSync: true,
      api_key: API_KEY,
      api_secret: API_SECRET,
    },
    {
      timeout: 1000 * 60,
    }
  );

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Staking Endpoints', () => {
    it('getStakingProductList()', async () => {
      const result = await api.getStakingProductList({
        product: 'STAKING',
        size: 25,
      });
      console.log(Object.keys(result[0]));
      expect(result.length).toBe(25);
      expect(Object.keys(result[0]).sort()).toEqual(
        ['projectId', 'detail', 'quota'].sort()
      );
    });
  });
});
