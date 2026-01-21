import 'dotenv/config';
import { WebsocketAPIClient } from '../../src/websocket-api-client';
import { getTestProxy } from '../proxy.util';
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent('http://127.0.0.1:7890');
setGlobalDispatcher(proxyAgent);

describe('Private Futures USDM WebSocket API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  let wsClient: WebsocketAPIClient;

  beforeAll(async () => {
    const config = {
      api_key: API_KEY,
      api_secret: API_SECRET,
      attachEventListeners: true,// enabled console outputs
      testnet: true,
      ...getTestProxy(),
    }
    wsClient = new WebsocketAPIClient(config);
    const client = wsClient.getWSClient();

    // Wait for the WebSocket to open or authenticate
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('WebSocket open event did not trigger within 5 seconds'));
        // resolve();
      }, 5 * 1000);

      // reconnection won't trigger open or auth events
      // session logon is not available when using non-ed25519 keys
      if (wsClient.getKeyType() !== 'Ed25519') {
        client.on('open', ({ wsKey }) => {
          console.log("ws open event for wsKey:", wsKey);
          clearTimeout(timeout);
          resolve();
        });
      } else {
        client.on('authenticated', ({ wsKey }) => {
          console.log("ws authenticated event for wsKey:", wsKey);
          clearTimeout(timeout);
          resolve();
        });
      }

      // Trigger the connection and authentication
      client.connectWSAPI('usdmWSAPITestnet');
    });

    // await new Promise((resolve) => setTimeout(resolve, 10 * 1000)); // wait for 1 second to ensure connection is stable
  });

  afterAll(() => {
    // Close WebSocket connections
    wsClient.getWSClient().closeAll();
  });

  describe('Account Information', () => {
    it('getFuturesAccountBalanceV2() should return balance information', async () => {
      const response = await wsClient.getFuturesAccountBalanceV2({
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.any(Array),
        rateLimits: expect.any(Array),
      });

      if (response.result && response.result.length > 0) {
        expect(response.result[0]).toMatchObject({
          accountAlias: expect.any(String),
          asset: expect.any(String),
          balance: expect.any(String),
          crossWalletBalance: expect.any(String),
          crossUnPnl: expect.any(String),
          availableBalance: expect.any(String),
          maxWithdrawAmount: expect.any(String),
          updateTime: expect.any(Number),
        });
      }
    }, 10000);

    it('getFuturesAccountBalance() for USDM should return balance information', async () => {
      const response = await wsClient.getFuturesAccountBalance('usdm', {
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.any(Array),
        rateLimits: expect.any(Array),
      });

      if (response.result && response.result.length > 0) {
        expect(response.result[0]).toMatchObject({
          accountAlias: expect.any(String),
          asset: expect.any(String),
          balance: expect.any(String),
          crossWalletBalance: expect.any(String),
          crossUnPnl: expect.any(String),
          availableBalance: expect.any(String),
          maxWithdrawAmount: expect.any(String),
          updateTime: expect.any(Number),
        });
      }
    }, 10000);

    it('getFuturesAccountStatusV2() should return account status', async () => {
      const response = await wsClient.getFuturesAccountStatusV2({
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.objectContaining({
          totalInitialMargin: expect.any(String),
          totalMaintMargin: expect.any(String),
          totalWalletBalance: expect.any(String),
          totalUnrealizedProfit: expect.any(String),
          totalMarginBalance: expect.any(String),
          totalPositionInitialMargin: expect.any(String),
          totalOpenOrderInitialMargin: expect.any(String),
          totalCrossWalletBalance: expect.any(String),
          totalCrossUnPnl: expect.any(String),
          availableBalance: expect.any(String),
          maxWithdrawAmount: expect.any(String),
          assets: expect.any(Array),
          positions: expect.any(Array),
        }),
        rateLimits: expect.any(Array),
      });
    }, 10000);

    it('getFuturesAccountStatus() for USDM should return account status', async () => {
      const response = await wsClient.getFuturesAccountStatus('usdm', {
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.objectContaining({
          feeTier: expect.any(Number),
          canTrade: expect.any(Boolean),
          canDeposit: expect.any(Boolean),
          canWithdraw: expect.any(Boolean),
          updateTime: expect.any(Number),
          totalInitialMargin: expect.any(String),
          totalMaintMargin: expect.any(String),
          totalWalletBalance: expect.any(String),
          totalUnrealizedProfit: expect.any(String),
          totalMarginBalance: expect.any(String),
          totalPositionInitialMargin: expect.any(String),
          totalOpenOrderInitialMargin: expect.any(String),
          totalCrossWalletBalance: expect.any(String),
          totalCrossUnPnl: expect.any(String),
          availableBalance: expect.any(String),
          maxWithdrawAmount: expect.any(String),
          assets: expect.any(Array),
          positions: expect.any(Array),
        }),
        rateLimits: expect.any(Array),
      });
    }, 10000);

    it('getFuturesPositionV2() should return position information', async () => {
      const response = await wsClient.getFuturesPositionV2({
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.any(Array),
        rateLimits: expect.any(Array),
      });

      if (response.result && response.result.length > 0) {
        expect(response.result[0]).toMatchObject({
          symbol: expect.any(String),
          positionAmt: expect.any(String),
          entryPrice: expect.any(String),
          markPrice: expect.any(String),
          unRealizedProfit: expect.any(String),
          liquidationPrice: expect.any(String),
          leverage: expect.any(Number),
          maxNotionalValue: expect.any(String),
          marginType: expect.any(String),
          isolatedMargin: expect.any(String),
          isAutoAddMargin: expect.any(Boolean),
          positionSide: expect.any(String),
          notional: expect.any(String),
          isolatedWallet: expect.any(String),
          updateTime: expect.any(Number),
        });
      }
    }, 10000);

    it('getFuturesPosition() for USDM should return position information', async () => {
      const response = await wsClient.getFuturesPosition('usdm', {
        timestamp: Date.now(),
      });

      expect(response).toMatchObject({
        id: expect.any(Number),
        status: 200,
        result: expect.any(Array),
        rateLimits: expect.any(Array),
      });

      if (response.result && response.result.length > 0) {
        expect(response.result[0]).toMatchObject({
          symbol: expect.any(String),
          positionAmt: expect.any(String),
          entryPrice: expect.any(String),
          markPrice: expect.any(String),
          unRealizedProfit: expect.any(String),
          liquidationPrice: expect.any(String),
          leverage: expect.any(String),
          maxNotionalValue: expect.any(String),
          marginType: expect.any(String),
          isolatedMargin: expect.any(String),
          isAutoAddMargin: expect.any(String),
          positionSide: expect.any(String),
          notional: expect.any(String),
          isolatedWallet: expect.any(String),
          updateTime: expect.any(Number),
        });
      }
    }, 10000);
  });
});
