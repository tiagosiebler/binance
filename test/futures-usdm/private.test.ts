import { NewFuturesOrderParams } from '../../src/types/futures';
import { USDMClient } from '../../src/usdm-client';
import { getTestProxy } from '../proxy.util';

describe('Private Futures USDM REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new USDMClient(
    {
      api_key: API_KEY,
      api_secret: API_SECRET,
    },
    getTestProxy(),
  );

  const symbol = 'BTCUSDT';

  beforeEach(() => {
    // console.log(`IP request weight: `, api.getRateLimitStates());
  });

  describe('Account/Trade Endpoints', () => {
    it('getCurrentPositionMode()', async () => {
      expect(await api.getCurrentPositionMode()).toStrictEqual({
        dualSidePosition: expect.any(Boolean),
      });
    });

    it('getMultiAssetsMode()', async () => {
      expect(await api.getMultiAssetsMode()).toStrictEqual({
        multiAssetsMargin: expect.any(Boolean),
      });
    });

    it('getAllOpenOrders()', async () => {
      expect(await api.getAllOpenOrders()).toMatchObject(expect.any(Array));
    });

    it('getBalance()', async () => {
      expect(await api.getBalance()).toMatchObject(expect.any(Array));
    });

    it('getAccountInformation()', async () => {
      expect(await api.getAccountInformation()).toMatchObject({
        assets: expect.any(Array),
        availableBalance: expect.any(String),
        canDeposit: expect.any(Boolean),
        canTrade: expect.any(Boolean),
        canWithdraw: expect.any(Boolean),
        feeTier: expect.any(Number),
        maxWithdrawAmount: expect.any(String),
        positions: expect.any(Array),
        totalCrossUnPnl: expect.any(String),
        totalCrossWalletBalance: expect.any(String),
        totalInitialMargin: expect.any(String),
        totalMaintMargin: expect.any(String),
        totalMarginBalance: expect.any(String),
        totalOpenOrderInitialMargin: expect.any(String),
        totalPositionInitialMargin: expect.any(String),
        totalUnrealizedProfit: expect.any(String),
        totalWalletBalance: expect.any(String),
        updateTime: expect.any(Number),
      });
    });

    it('getPositions()', async () => {
      expect(await api.getPositions()).toMatchObject(expect.any(Array));
    });

    it('getIncomeHistory()', async () => {
      expect(await api.getIncomeHistory()).toMatchObject(expect.any(Array));
    });

    it('getNotionalAndLeverageBrackets()', async () => {
      expect(await api.getNotionalAndLeverageBrackets()).toMatchObject(
        expect.any(Array),
      );
    });

    it('getADLQuantileEstimation()', async () => {
      expect(await api.getADLQuantileEstimation()).toMatchObject(
        expect.any(Array),
      );
    });

    it('getForceOrders()', async () => {
      expect(await api.getForceOrders()).toMatchObject(expect.any(Array));
    });

    it('getApiQuantitativeRulesIndicators()', async () => {
      expect(await api.getApiQuantitativeRulesIndicators()).toMatchObject({
        indicators: expect.any(Object),
        updateTime: expect.any(Number),
      });
    });

    it('getAccountComissionRate()', async () => {
      expect(await api.getAccountComissionRate({ symbol })).toMatchObject({
        makerCommissionRate: expect.any(String),
        symbol: expect.any(String),
        takerCommissionRate: expect.any(String),
      });
    });

    it('cancelOrder()', async () => {
      expect(
        api.cancelOrder({ symbol, orderId: 123456 }),
      ).rejects.toMatchObject({
        code: -2011,
        message: 'Unknown order sent.',
        body: { code: -2011, msg: 'Unknown order sent.' },
      });
    });

    it('cancelAllOpenOrders()', async () => {
      expect(api.cancelAllOpenOrders({ symbol })).resolves.toMatchObject({
        code: 200,
      });
    });

    it('submitMultipleOrders()', async () => {
      const templateOrder: NewFuturesOrderParams<string> = {
        symbol: 'VETUSDT',
        side: 'BUY',
        type: 'MARKET',
        positionSide: 'LONG',
        quantity: '1000000',
      };
      const orders: NewFuturesOrderParams<string>[] = [
        templateOrder,
        templateOrder,
      ];
      expect(api.submitMultipleOrders(orders)).resolves.toMatchObject([
        {
          code: -4061,
          msg: "Order's position side does not match user's setting.",
        },
        {
          code: -4061,
          msg: "Order's position side does not match user's setting.",
        },
      ]);
    });
  });

  describe('User Data Stream', () => {
    it('should create a user data key', async () => {
      const { listenKey } = await api.getFuturesUserDataListenKey();
      expect(listenKey).toStrictEqual(expect.any(String));
    });

    it('should keep alive user data key', async () => {
      await api.getFuturesUserDataListenKey();
      expect(await api.keepAliveFuturesUserDataListenKey()).toStrictEqual({});
    });

    it('should close user data key', async () => {
      await api.getFuturesUserDataListenKey();
      expect(await api.closeFuturesUserDataListenKey()).toStrictEqual({});
      expect(api.keepAliveFuturesUserDataListenKey()).rejects.toMatchObject({
        code: -1125,
        message: 'This listenKey does not exist.',
      });
    });
  });
});
