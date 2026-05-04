import { WebsocketClient } from '../../src/websocket-client';
import {
  getTopicsPerWSKey,
  getUsdmMarketDataWsKeyForTopic,
  WS_KEY_MAP,
  WsTopicRequest,
} from '../../src/util/websockets/websocket-util';

describe('USD-M websocket routing', () => {
  it('resolves legacy usdm market data topics to split wsKeys', () => {
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdm,
        'btcusdt@bookTicker',
      ),
    ).toBe(WS_KEY_MAP.usdmPublic);
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdm,
        'btcusdt@depth10@100ms',
      ),
    ).toBe(WS_KEY_MAP.usdmPublic);
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdm,
        'btcusdt@aggTrade',
      ),
    ).toBe(WS_KEY_MAP.usdmMarket);
    expect(
      getUsdmMarketDataWsKeyForTopic(WS_KEY_MAP.usdm, 'btcusdt@kline_1m'),
    ).toBe(WS_KEY_MAP.usdmMarket);
    expect(
      getUsdmMarketDataWsKeyForTopic(WS_KEY_MAP.usdm, '!forceOrder@arr'),
    ).toBe(WS_KEY_MAP.usdmMarket);
    expect(
      getUsdmMarketDataWsKeyForTopic(WS_KEY_MAP.usdm, 'btcusdt@trade'),
    ).toBe(WS_KEY_MAP.usdmMarket);
  });

  it('resolves legacy usdm testnet market data topics to split testnet wsKeys', () => {
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdmTestnet,
        'btcusdt@depth@100ms',
      ),
    ).toBe(WS_KEY_MAP.usdmTestnetPublic);
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdmTestnet,
        '!miniTicker@arr',
      ),
    ).toBe(WS_KEY_MAP.usdmTestnetMarket);
  });

  it('does not reroute explicit split wsKeys', () => {
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdmPublic,
        'btcusdt@aggTrade',
      ),
    ).toBe(WS_KEY_MAP.usdmPublic);
    expect(
      getUsdmMarketDataWsKeyForTopic(
        WS_KEY_MAP.usdmMarket,
        'btcusdt@depth',
      ),
    ).toBe(WS_KEY_MAP.usdmMarket);
  });

  it('groups mixed legacy usdm topics by resolved split wsKey', () => {
    const topics: WsTopicRequest<string>[] = [
      { topic: 'btcusdt@bookTicker' },
      { topic: 'ethusdt@depth5@100ms' },
      { topic: 'btcusdt@aggTrade' },
      { topic: '!miniTicker@arr' },
    ];

    const topicsPerWsKey = getTopicsPerWSKey(topics, WS_KEY_MAP.usdm);

    expect(
      topicsPerWsKey[WS_KEY_MAP.usdmPublic]?.map((topic) => topic.topic),
    ).toEqual(['btcusdt@bookTicker', 'ethusdt@depth5@100ms']);
    expect(
      topicsPerWsKey[WS_KEY_MAP.usdmMarket]?.map((topic) => topic.topic),
    ).toEqual(['btcusdt@aggTrade', '!miniTicker@arr']);
  });

  it('subscribes once per resolved split wsKey for legacy usdm topics', async () => {
    const wsClient = new WebsocketClient();
    const connectSpy = jest
      .spyOn(wsClient, 'connect')
      .mockResolvedValue(undefined);

    await wsClient.subscribe(
      [
        'btcusdt@bookTicker',
        'ethusdt@depth5@100ms',
        'btcusdt@aggTrade',
        'btcusdt@kline_1m',
      ],
      WS_KEY_MAP.usdm,
    );

    expect(connectSpy).toHaveBeenCalledTimes(2);
    expect(connectSpy).toHaveBeenCalledWith(WS_KEY_MAP.usdmPublic);
    expect(connectSpy).toHaveBeenCalledWith(WS_KEY_MAP.usdmMarket);

    const publicTopics = [
      ...wsClient.getWsStore().getTopics(WS_KEY_MAP.usdmPublic),
    ].map((topic) => topic.topic);
    const marketTopics = [
      ...wsClient.getWsStore().getTopics(WS_KEY_MAP.usdmMarket),
    ].map((topic) => topic.topic);

    expect(publicTopics).toEqual([
      'btcusdt@bookTicker',
      'ethusdt@depth5@100ms',
    ]);
    expect(marketTopics).toEqual(['btcusdt@aggTrade', 'btcusdt@kline_1m']);
  });

  it('unsubscribes from the resolved split wsKeys for legacy usdm topics', async () => {
    const wsClient = new WebsocketClient();
    jest.spyOn(wsClient, 'connect').mockResolvedValue(undefined);

    const topics = ['btcusdt@bookTicker', 'btcusdt@aggTrade'];

    await wsClient.subscribe(topics, WS_KEY_MAP.usdm);
    await wsClient.unsubscribe(topics, WS_KEY_MAP.usdm);

    expect(wsClient.getWsStore().getTopics(WS_KEY_MAP.usdmPublic).size).toBe(0);
    expect(wsClient.getWsStore().getTopics(WS_KEY_MAP.usdmMarket).size).toBe(0);
  });

  it('connectPublic opens split usdm market data connections', async () => {
    const wsClient = new WebsocketClient();
    const connectSpy = jest
      .spyOn(wsClient, 'connect')
      .mockResolvedValue(undefined);

    await Promise.all(wsClient.connectPublic());

    expect(connectSpy).toHaveBeenCalledWith(WS_KEY_MAP.usdmPublic);
    expect(connectSpy).toHaveBeenCalledWith(WS_KEY_MAP.usdmMarket);
    expect(connectSpy).not.toHaveBeenCalledWith(WS_KEY_MAP.usdm);
  });
});
