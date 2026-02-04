import { DefaultLogger, MainClient, WebsocketAPIClient } from '../../src';
import { getTestProxy, getWSTestProxy } from '../proxy.util';

describe('Auth with ED25519 keys', () => {
  const api_key = process.env.API_ED25519_KEY_COM as string;
  const api_secret = process.env.API_ED25519_SECRET_COM as string;

  it('should have ED25519 keys', () => {
    expect(api_key).toBeDefined();
    expect(api_secret).toBeDefined();
  });

  describe('REST API', () => {
    const restClient = new MainClient(
      {
        api_key,
        api_secret,
        recvWindow: 15000,
      },
      getTestProxy(),
    );

    it('should successfully call a public endpoint', async () => {
      const time = await restClient.getServerTime();
      expect(time).toBeDefined();
      expect(typeof time).toBe('number');
    });

    it('should successfully call a private endpoint', async () => {
      try {
        const accountInfo = await restClient.getAccountInformation();
        expect(accountInfo).toBeDefined();
      } catch (e) {
        console.error('Exception calling private endpoint:', e);
        throw e;
      }
    });
  });

  describe('WebSocket API', () => {
    const wsApiClient = new WebsocketAPIClient(
      {
        api_key,
        api_secret,
        attachEventListeners: false,
        // Inject proxy for WS
        ...getWSTestProxy(),
        // Inject proxy for REST requests made by WS client
        requestOptions: getTestProxy(),
      },
      {
        ...DefaultLogger,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: (..._args: any[]) => {
          // Uncomment to enable WS info logging during tests
          // DefaultLogger.info(...args);
        },
      },
    );

    afterAll(async () => {
      await wsApiClient.disconnectAll();
    });

    it('should successfully call a private request', async () => {
      try {
        const accountInfo = await wsApiClient.getSpotAccountInformation({
          timestamp: Date.now(),
        });
        expect(accountInfo).toBeDefined();
      } catch (e) {
        console.error('Exception calling private WS endpoint:', e);
        throw e;
      }
    });
  });
});
