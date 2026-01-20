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
      attachEventListeners: true,
      testnet: true,
      ...getTestProxy(),
    }
    wsClient = new WebsocketAPIClient(config);
    const client = wsClient.getWSClient();
    const keyType = wsClient.getKeyType();

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('WebSocket open event did not trigger within 20 seconds'));
      }, 20000);

      // session logon is not available when using non-ed25519 keys
      if (keyType !== 'Ed25519') {
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
      client.connectWSAPI('usdmWSAPITestnet').catch((err) => {
        console.error('Failed to connect WSAPI:', err);
        reject();
      });
    });
  });

  afterAll(() => {
    // Close WebSocket connections
    wsClient.getWSClient().closeAll();
  });

  describe('Account Information', () => {
    it('getFuturesAccountBalanceV2() should return balance information', async () => {
      if (!wsClient) return;
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

    // it('getFuturesAccountBalance() for USDM should return balance information', async () => {
    //   const response = await wsClient.getFuturesAccountBalance('usdm', {
    //     timestamp: Date.now(),
    //   });

    //   expect(response).toMatchObject({
    //     id: expect.any(Number),
    //     status: 200,
    //     result: expect.any(Array),
    //     rateLimits: expect.any(Array),
    //   });

    //   if (response.result && response.result.length > 0) {
    //     expect(response.result[0]).toMatchObject({
    //       accountAlias: expect.any(String),
    //       asset: expect.any(String),
    //       balance: expect.any(String),
    //       crossWalletBalance: expect.any(String),
    //       crossUnPnl: expect.any(String),
    //       availableBalance: expect.any(String),
    //       maxWithdrawAmount: expect.any(String),
    //       updateTime: expect.any(Number),
    //     });
    //   }
    // }, 10000);

    // it('getFuturesAccountStatusV2() should return account status', async () => {
    //   const response = await wsClient.getFuturesAccountStatusV2({
    //     timestamp: Date.now(),
    //   });

    //   expect(response).toMatchObject({
    //     id: expect.any(Number),
    //     status: 200,
    //     result: expect.objectContaining({
    //       feeTier: expect.any(Number),
    //       canTrade: expect.any(Boolean),
    //       canDeposit: expect.any(Boolean),
    //       canWithdraw: expect.any(Boolean),
    //       updateTime: expect.any(Number),
    //       totalInitialMargin: expect.any(String),
    //       totalMaintMargin: expect.any(String),
    //       totalWalletBalance: expect.any(String),
    //       totalUnrealizedProfit: expect.any(String),
    //       totalMarginBalance: expect.any(String),
    //       totalPositionInitialMargin: expect.any(String),
    //       totalOpenOrderInitialMargin: expect.any(String),
    //       totalCrossWalletBalance: expect.any(String),
    //       totalCrossUnPnl: expect.any(String),
    //       availableBalance: expect.any(String),
    //       maxWithdrawAmount: expect.any(String),
    //       assets: expect.any(Array),
    //       positions: expect.any(Array),
    //     }),
    //     rateLimits: expect.any(Array),
    //   });
    // }, 10000);

    // it('getFuturesAccountStatus() for USDM should return account status', async () => {
    //   const response = await wsClient.getFuturesAccountStatus('usdm', {
    //     timestamp: Date.now(),
    //   });

    //   expect(response).toMatchObject({
    //     id: expect.any(Number),
    //     status: 200,
    //     result: expect.objectContaining({
    //       feeTier: expect.any(Number),
    //       canTrade: expect.any(Boolean),
    //       canDeposit: expect.any(Boolean),
    //       canWithdraw: expect.any(Boolean),
    //       updateTime: expect.any(Number),
    //       totalInitialMargin: expect.any(String),
    //       totalMaintMargin: expect.any(String),
    //       totalWalletBalance: expect.any(String),
    //       totalUnrealizedProfit: expect.any(String),
    //       totalMarginBalance: expect.any(String),
    //       totalPositionInitialMargin: expect.any(String),
    //       totalOpenOrderInitialMargin: expect.any(String),
    //       totalCrossWalletBalance: expect.any(String),
    //       totalCrossUnPnl: expect.any(String),
    //       availableBalance: expect.any(String),
    //       maxWithdrawAmount: expect.any(String),
    //       assets: expect.any(Array),
    //       positions: expect.any(Array),
    //     }),
    //     rateLimits: expect.any(Array),
    //   });
    // }, 10000);
  });

  //   describe('Optional signRequest parameter', () => {
  //     it('getFuturesAccountBalanceV2() with signRequest=true should work', async () => {
  //       const response = await wsClient.getFuturesAccountBalanceV2({
  //         timestamp: Date.now(),
  //       });

  //       expect(response).toMatchObject({
  //         id: expect.any(Number),
  //         status: 200,
  //         result: expect.any(Array),
  //         rateLimits: expect.any(Array),
  //       });
  //     }, 10000);

  //     it('getFuturesAccountStatusV2() with signRequest=true should work', async () => {
  //       const response = await wsClient.getFuturesAccountStatusV2({
  //         timestamp: Date.now(),
  //       });

  //       expect(response).toMatchObject({
  //         id: expect.any(Number),
  //         status: 200,
  //         result: expect.any(Object),
  //         rateLimits: expect.any(Array),
  //       });
  //     }, 10000);
  //   });
});
