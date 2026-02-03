import { DefaultLogger, MainClient, WebsocketAPIClient } from '../../src';

describe('Auth with RSA keys', () => {
  const api_key = process.env.API_RSA_KEY_COM as string;
  const api_secret = process.env.API_RSA_SECRET_COM as string;

  it('should have RSA keys', () => {
    expect(api_key).toBeDefined();
    expect(api_secret).toBeDefined();
  });

  describe('REST API', () => {
    const restClient = new MainClient({
      api_key,
      api_secret,
      recvWindow: 15000,
    });

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
    //
    const wsApiClient = new WebsocketAPIClient(
      {
        api_key,
        api_secret,
        attachEventListeners: false,
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
