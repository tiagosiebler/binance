import { CoinMClient } from '../../src';
import { CoinMSymbolOrderBookTicker } from '../../src/types/coin';
import { getTestProxy } from '../proxy.util';

describe('Private Futures USDM REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new CoinMClient(
    {
      disableTimeSync: true,
      api_key: API_KEY,
      api_secret: API_SECRET,
    },
    getTestProxy(),
  );
  let book: CoinMSymbolOrderBookTicker[];

  beforeAll(async () => {
    book = await api.getSymbolOrderBookTicker();
  });

  describe('Account/Trade Endpoints', () => {
    it('getSymbolOrderBookTicker', async () => {
      expect(book.length).toBeGreaterThanOrEqual(1);
      expect(+book[0].askPrice).toBeGreaterThanOrEqual(0);
    });

    it('getAccountTrades()', async () => {
      const trades = await api.getAccountTrades({ symbol: book[0].symbol });
      expect(trades.length).toBeGreaterThanOrEqual(0);
      if (trades.length) {
        expect(trades[0].orderId).toBeGreaterThanOrEqual(0);
      }
    });

    it('getOpenInterest', async () => {
      const interest = await api.getOpenInterest({ symbol: book[0].symbol });
      expect(Math.abs(+interest.openInterest)).toBeGreaterThan(0);
    });
  });
});
