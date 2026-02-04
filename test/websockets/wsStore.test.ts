import { isDeepObjectMatch } from '../../src/util/websockets/WsStore';

describe('WsStore', () => {
  describe('isDeepObjectMatch()', () => {
    it('should match two equal strings', () => {
      expect(isDeepObjectMatch('btcusdt@trade', 'btcusdt@trade')).toBeTruthy();
      expect(isDeepObjectMatch('btcusdt@trade', 'ethusdt@trade')).toBeFalsy();
    });

    it('should match simple topic objects', () => {
      const topic1 = {
        topic: 'btcusdt@trade',
      };
      const topic2 = {
        topic: 'btcusdt@trade',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match topic objects with payload, even if keys are differently ordered', () => {
      const topic1 = {
        topic: 'depth',
        payload: { symbol: 'BTCUSDT', limit: 20 },
      };
      const topic2 = {
        payload: { symbol: 'BTCUSDT', limit: 20 },
        topic: 'depth',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match nested payload objects', () => {
      const topic1 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
          windowSize: '1h',
        },
      };
      const topic2 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
          windowSize: '1h',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should NOT match topics with different payload values', () => {
      const topic1 = {
        topic: 'depth',
        payload: { symbol: 'BTCUSDT', limit: 20 },
      };
      const topic2 = {
        topic: 'depth',
        payload: { symbol: 'ETHUSDT', limit: 20 },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match topics with nested payload differences', () => {
      const topic1 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
          windowSize: '1h',
        },
      };
      const topic2 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
          windowSize: '24h',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing payload property)', () => {
      const topic1 = {
        topic: 'depth',
        payload: { symbol: 'BTCUSDT', limit: 20 },
      };
      const topic2 = {
        topic: 'depth',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (missing nested property)', () => {
      const topic1 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
          windowSize: '1h',
        },
      };
      const topic2 = {
        topic: 'ticker',
        payload: {
          symbol: 'BTCUSDT',
        },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match string to object', () => {
      expect(
        isDeepObjectMatch('btcusdt@trade', { topic: 'btcusdt@trade' }),
      ).toBeFalsy();
    });
  });
});
