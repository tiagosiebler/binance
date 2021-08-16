import { SpotClient } from "../../src/spot-client";

describe('Private Spot REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new SpotClient({
    disableTimeSync: true,
    api_key: API_KEY,
    api_secret: API_SECRET,
  }, {
    timeout: 1000 * 60,
  });

  const symbol = 'BTCUSDT';
  const coin = 'BTC';

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Wallet Endpoints', () => {
    it('getSystemStatus()', async () => {
      expect(await api.getSystemStatus()).toMatchObject({'msg': "normal", 'status': 0});
    });
    
    it('getAccountInformation()', async () => {
      expect(await api.getAccountInformation()).toMatchObject({ data: expect.any(Object) });
    });

    it('getAllCoinsInformation()', async () => {
      expect(await api.getBalances()).toMatchObject(expect.any(Array));
    });

    it('getAccountTradeList(symbol)', async () => {
      expect(await api.getAccountTradeList({ symbol })).toMatchObject(expect.any(Array));
    });

    it('getDailyAccountSnapshot()', async () => {
      expect(await api.getDailyAccountSnapshot({
        type: 'SPOT',
       })).toMatchObject({
         code: 200,
         msg: expect.any(String),
         snapshotVos: expect.any(Array),
       });
    });

    it('getDepositHistory()', async () => {
      expect(await api.getDepositHistory()).toMatchObject(expect.any(Array));
    });

    it('getWithdrawHistory()', async () => {
      expect(await api.getWithdrawHistory()).toMatchObject(expect.any(Array));
    });

    it('getDespoitAddress()', async () => {
      expect(await api.getDepositAddress({ coin })).toMatchObject({
        address: expect.any(String),
        coin,
        tag: expect.any(String),
        url: expect.any(String),
      });
    });

    it('getAccountStatus()', async () => {
      expect(await api.getAccountStatus()).toMatchObject({ data: 'Normal' });
    });
    it('getDustLog()', async () => {
      expect(await api.getDustLog()).toMatchObject({
        userAssetDribblets: expect.any(Array),
      });
    });

    it('getAssetDividendRecord()', async () => {
      expect(await api.getAssetDividendRecord()).toMatchObject({
        rows: expect.any(Array),
      });
    });

    it('getAssetDetail()', async () => {
      expect(await api.getAssetDetail()).toMatchObject(expect.any(Object));
    });

    it('getTradeFee()', async () => {
      expect(await api.getTradeFee()).toMatchObject(expect.any(Array));
    });

    it.skip('getUniversalTransferHistory()', async () => {
      expect(await api.getUniversalTransferHistory({
        type: 'MAIN_UMFUTURE'
      })).toMatchObject({
        rows: expect.any(Array),
      });
    });

    it('getApiTradingStatus()', async () => {
      expect(await api.getApiTradingStatus()).toMatchObject({ data: expect.any(Object) });
    });

    it('getApiKeyPermissions()', async () => {
      expect(await api.getApiKeyPermissions()).toMatchObject(expect.any(Object));
    });

  });

  describe('Sub-Account Endpoints', () => {
    it.skip('getSubAccountList()', async () => {
      expect(await api.getSubAccountList()).toMatchObject(expect.any(Array));
    });
  });

  describe('User Data Stream', () => {
    describe('Binance Spot', () => {
      it('should create a user data key', async () => {
        const { listenKey } = await api.getSpotUserDataListenKey();
        expect(listenKey).toStrictEqual(expect.any(String));
      });

      it('should keep alive user data key', async () => {
        const { listenKey } = await api.getSpotUserDataListenKey();
        expect(await api.keepAliveSpotUserDataListenKey(listenKey)).toStrictEqual({});
      });

      it('should close user data key', async () => {
        const { listenKey } = await api.getSpotUserDataListenKey();
        expect(listenKey).toStrictEqual(expect.any(String));

        expect(await api.closeSpotUserDataListenKey(listenKey)).toStrictEqual({});
        expect(api.keepAliveSpotUserDataListenKey(listenKey)).rejects.toMatchObject({
          code: -1125,
          message: 'This listenKey does not exist.',
        });
      });
    });

    describe('Binance Margin', () => {
      it('should create a user data key', async () => {
        const { listenKey } = await api.getMarginUserDataListenKey();
        expect(listenKey).toStrictEqual(expect.any(String));
      });

      it('should keep alive user data key', async () => {
        const { listenKey } = await api.getMarginUserDataListenKey();
        expect(await api.keepAliveMarginUserDataListenKey(listenKey)).toStrictEqual({});
      });

      it('should close user data key', async () => {
        const { listenKey } = await api.getMarginUserDataListenKey();
        expect(listenKey).toStrictEqual(expect.any(String));

        expect(await api.closeMarginUserDataListenKey(listenKey)).toStrictEqual({});
        expect(api.keepAliveMarginUserDataListenKey(listenKey)).rejects.toMatchObject({
          code: -1105,
          message: 'This listenKey does not exist.',
        });
      });
    });

    describe.skip('Binance Isolated Margin', () => {
      it('should create a user data key', async () => {
        const { listenKey } = await api.getIsolatedMarginUserDataListenKey({ symbol });
        expect(listenKey).toStrictEqual(expect.any(String));
      });

      it('should keep alive user data key', async () => {
        const { listenKey } = await api.getIsolatedMarginUserDataListenKey({ symbol });
        expect(await api.keepAliveIsolatedMarginUserDataListenKey({ symbol, listenKey })).toStrictEqual({});
      });

      it('should close user data key', async () => {
        const { listenKey } = await api.getIsolatedMarginUserDataListenKey({ symbol });
        expect(await api.closeIsolatedMarginUserDataListenKey({ symbol, listenKey })).toStrictEqual({});
        expect(api.keepAliveIsolatedMarginUserDataListenKey({ symbol, listenKey })).rejects.toMatchObject({
          code: -1105,
          message: 'This listenKey does not exist.',
        });
      });
    });

  });
});
