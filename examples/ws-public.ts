import { DefaultLogger } from '../src';
import { WebsocketClient } from '../src/websocket-client';

// or
// import { DefaultLogger, WebsocketClient } from 'binance';

(async () => {
  const key = 'APIKEY';
  const secret = 'APISECRET';

  const market = 'BTCUSDT';
  const coinMSymbol = 'XLMUSD_PERP';

  const logger = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient({
    api_key: key,
    api_secret: secret,
    beautify: true,
  }, logger);

  wsClient.on('message', (data) => {
    console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('formattedMessage', (data) => {
    if (!Array.isArray(data)) {
      if (data.eventType === 'kline') {
        console.log('kline received ', data.kline);
        return;
      }
      if (data.eventType === '24hrTicker') {
        console.log('24hrTicker received ', data);
        return;
      }
    }
    console.log('log formattedMessage: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey, data.ws.target.url);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('reply', (data) => {
    console.log('log reply: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey );
  });
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey );
  });

  // wsClient.subscribeSpotKline(market, '1m');
  // wsClient.subscribeKlines(market, '1m', 'usdm');
  // wsClient.subscribeCoinIndexPrice(coinMSymbol);
  // wsClient.subscribeMarkPrice(market, 'usdm');
  // wsClient.subscribeMarkPrice(coinMSymbol, 'coinm');
  // wsClient.subscribeAllMarketMarkPrice('usdm');
  // wsClient.subscribeAllMarketMarkPrice('coinm');
  wsClient.subscribeKlines(market, '1m', 'usdm');
  // wsClient.subscribeContinuousContractKlines(market, 'perpetual', '1m', 'usdm');
  // wsClient.subscribeIndexKlines(coinMSymbol, '1m');
  // wsClient.subscribeMarkPriceKlines(coinMSymbol, '1m');
  // wsClient.subscribeSymbolMini24hrTicker(market, 'usdm');
  // wsClient.subscribeSymbolMini24hrTicker(coinMSymbol, 'coinm');
  // wsClient.subscribeSymbolMini24hrTicker(market, 'spot');
  // wsClient.subscribeSymbol24hrTicker(market, 'usdm');
  // wsClient.subscribeSymbol24hrTicker(market, 'coinm');
  // wsClient.subscribeSymbol24hrTicker(coinMSymbol, 'spot');
  // wsClient.subscribeAllMini24hrTickers('usdm');
  // wsClient.subscribeAllMini24hrTickers('coinm');
  // wsClient.subscribeAllMini24hrTickers('spot');
  // wsClient.subscribeAll24hrTickers('usdm');
  // wsClient.subscribeAll24hrTickers('coinm');
  // wsClient.subscribeAll24hrTickers('spot');
  // wsClient.subscribeAllLiquidationOrders('usdm');
  // wsClient.subscribeAllLiquidationOrders('coinm');
  // wsClient.subscribeSpotSymbol24hrTicker(market);
  // wsClient.subscribeAggregateTrades(market, 'usdm');

})();
