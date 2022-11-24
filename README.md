# Node.js & Typescript Binance API SDK

[![Tests](https://circleci.com/gh/tiagosiebler/binance.svg?style=shield)](https://circleci.com/gh/tiagosiebler/binance)
[![npm version](https://img.shields.io/npm/v/binance)][1] [![npm size](https://img.shields.io/bundlephobia/min/binance/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/binance)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/binance)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/binance/badge)](https://www.codefactor.io/repository/github/tiagosiebler/binance)

[![connector logo](https://github.com/tiagosiebler/binance/blob/master/docs/images/logo1.png?raw=true)][1]

[1]: https://www.npmjs.com/package/binance

Node.js connector for the Binance APIs and WebSockets, with TypeScript & browser support.

- Extremely robust connector with significant trading volume in production (livenet).
- Heavy end-to-end testing with real API calls.
  - End-to-end testing before any release.
  - Real API calls in e2e tests.
- Support REST APIs for Binance Spot, Margin, Isolated Margin & USDM Futures.
  - Strongly typed on most requests and responses.
- Support Websockets for Binance Spot, Margin, Isolated Margin & USDM Futures.
  - Event driven messaging.
  - Smart websocket persistence
    - Automatically handle silent websocket disconnections through timed heartbeats, including the scheduled 24hr disconnect.
    - Automatically handle listenKey persistence and expiration/refresh.
    - Emit `reconnected` event when dropped connection is restored.
  - Strongly typed on most websocket events.
  - Optional:
    - Automatic beautification of websocket events (from one-letter keys to descriptive words, and strings with floats to numbers).
    - Automatic beautification of REST responses (parsing numbers in strings to numbers).
- Proxy support via axios integration.

## Installation

`npm install binance --save`

## Examples

Refer to the [examples](./examples) folder for implementation demos.

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/binance/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Questions about Binance APIs & WebSockets? Ask in the official [Binance API](https://t.me/binance_api_english) group on telegram.

## Related projects

Check out my related projects:

- Try my connectors:
  - [binance](https://www.npmjs.com/package/binance)
  - [bybit-api](https://www.npmjs.com/package/bybit-api)
  - [okx-api](https://www.npmjs.com/package/okx-api)
  - [bitget-api](https://www.npmjs.com/package/bitget-api)
  - [ftx-api](https://www.npmjs.com/package/ftx-api)
- Try my misc utilities:
  - [orderbooks](https://www.npmjs.com/package/orderbooks)
- Check out my examples:
  - [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples)

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Binance's API documentation.

- [Binance API Documentation](https://binance-docs.github.io/apidocs/)

## Structure

This project uses typescript. Resources are stored in 3 key structures:

- [src](./src) - the whole connector written in typescript
- [lib](./lib) - the javascript version of the project (compiled from typescript). This should not be edited directly, as it will be overwritten with each release.
- [dist](./dist) - the packed bundle of the project for use in browser environments.

---

# Usage

Create API credentials at Binance

- [Livenet](https://www.binance.com/en/support/faq/360002502072?ref=IVRLUZJO)

## REST API Clients

There are several REST API modules as there are some differences in each API group.

1. `MainClient` for most APIs, including: spot, margin, isolated margin, mining, BLVT, BSwap, Fiat & sub-account management.
2. `USDMClient` for USD-M futures APIs.
3. `CoinMClient` for COIN-M futures APIs.

Vanilla Options connectors are not yet available, though contributions are welcome!

### REST Spot/Margin/etc

Start by importing the spot client. API credentials are optional, though an error is thrown when attempting any private API calls without credentials.

```javascript
const { MainClient } = require('binance');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

const client = new MainClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
});

client
  .getAccountTradeList({ symbol: 'BTCUSDT' })
  .then((result) => {
    console.log('getAccountTradeList result: ', result);
  })
  .catch((err) => {
    console.error('getAccountTradeList error: ', err);
  });

client
  .getExchangeInfo()
  .then((result) => {
    console.log('getExchangeInfo inverse result: ', result);
  })
  .catch((err) => {
    console.error('getExchangeInfo inverse error: ', err);
  });
```

See [spot-client.ts](./src/main-client.ts) for further information.

### REST USD-M Futures

Start by importing the usd-m client. API credentials are optional, though an error is thrown when attempting any private API calls without credentials.

```javascript
const { USDMClient } = require('binance');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

const client = new USDMClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
});

client
  .getBalance()
  .then((result) => {
    console.log('getBalance result: ', result);
  })
  .catch((err) => {
    console.error('getBalance error: ', err);
  });

client
  .get24hrChangeStatististics()
  .then((result) => {
    console.log('get24hrChangeStatististics inverse futures result: ', result);
  })
  .catch((err) => {
    console.error('get24hrChangeStatististics inverse futures error: ', err);
  });
```

See [usdm-client.ts](./src/usdm-client.ts) for further information.

### REST COIN-M Futures

Start by importing the coin-m client. API credentials are optional, though an error is thrown when attempting any private API calls without credentials.

```javascript
const { CoinMClient } = require('binance');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

const client = new CoinMClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
});

client
  .getSymbolOrderBookTicker()
  .then((result) => {
    console.log('getSymbolOrderBookTicker result: ', result);
  })
  .catch((err) => {
    console.error('getSymbolOrderBookTicker error: ', err);
  });
```

See [coinm-client.ts](./src/coinm-client.ts) for further information.

## WebSockets

All websockets are accessible via the shared `WebsocketClient`. As before, API credentials are optional unless the user data stream is required.

```javascript
const { WebsocketClient } = require('binance');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

// optionally override the logger
const logger = {
  ...DefaultLogger,
  silly: (...params) => {},
};

const wsClient = new WebsocketClient(
  {
    api_key: key,
    api_secret: secret,
    beautify: true,
    // Disable ping/pong ws heartbeat mechanism (not recommended)
    // disableHeartbeat: true
  },
  logger
);

// receive raw events
wsClient.on('message', (data) => {
  console.log('raw message received ', JSON.stringify(data, null, 2));
});

// notification when a connection is opened
wsClient.on('open', (data) => {
  console.log('connection opened open:', data.wsKey, data.ws.target.url);
});

// receive formatted events with beautified keys. Any "known" floats stored in strings as parsed as floats.
wsClient.on('formattedMessage', (data) => {
  console.log('formattedMessage: ', data);
});

// read response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
wsClient.on('reply', (data) => {
  console.log('log reply: ', JSON.stringify(data, null, 2));
});

// receive notification when a ws connection is reconnecting automatically
wsClient.on('reconnecting', (data) => {
  console.log('ws automatically reconnecting.... ', data?.wsKey);
});

// receive notification that a reconnection completed successfully (e.g use REST to check for missing data)
wsClient.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});

// Recommended: receive error events (e.g. first reconnection failed)
wsClient.on('error', (data) => {
  console.log('ws saw error ', data?.wsKey);
});

// Call methods to subcribe to as many websockets as you want.
// Each method spawns a new connection, unless a websocket already exists for that particular request topic.
// wsClient.subscribeSpotAggregateTrades(market);
// wsClient.subscribeSpotTrades(market);
// wsClient.subscribeSpotKline(market, interval);
// wsClient.subscribeSpotSymbolMini24hrTicker(market);
// wsClient.subscribeSpotAllMini24hrTickers();
// wsClient.subscribeSpotSymbol24hrTicker(market);
// wsClient.subscribeSpotAll24hrTickers();
// wsClient.subscribeSpotSymbolBookTicker(market);
// wsClient.subscribeSpotAllBookTickers();
// wsClient.subscribeSpotPartialBookDepth(market, 5);
// wsClient.subscribeSpotDiffBookDepth(market);

wsClient.subscribeSpotUserDataStream();
wsClient.subscribeMarginUserDataStream();
wsClient.subscribeIsolatedMarginUserDataStream('BTCUSDT');

wsClient.subscribeUsdFuturesUserDataStream();

// each method also restores the WebSocket object, which can be interacted with for more control
// const ws1 = wsClient.subscribeSpotSymbolBookTicker(market);
// const ws2 = wsClient.subscribeSpotAllBookTickers();
// const ws3 = wsClient.subscribeSpotUserDataStream(listenKey);

// optionally directly open a connection to a URL. Not recommended for production use.
// const ws4 = wsClient.connectToWsUrl(`wss://stream.binance.com:9443/ws/${listenKey}`, 'customDirectWsConnection1');
```

See [websocket-client.ts](./src/websocket-client.ts) for further information. Also see [ws-userdata.ts](./examples/ws-userdata.ts) for user data examples.

---

## Customise Logging

Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('binance');

// Enable all logging on the silly level
DefaultLogger.silly = (...params) => {
  console.log('sillyLog: ', params);
};

const ws = new WebsocketClient(
  api_key: 'xxx',
  api_secret: 'yyyy',
  DefaultLogger
);
```

## Browser Usage

Build a bundle using webpack:

- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

However, note that browser usage will lead to CORS errors due to Binance.

---

## Contributions & Thanks

### Donations

#### tiagosiebler

If you found this project interesting or useful, do consider [sponsoring me](https://github.com/sponsors/tiagosiebler) on github or registering with my [referral link](https://accounts.binance.com/en/register?ref=IVRLUZJO). Thank you!

Or buy me a coffee using any of these:

- BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
- ETH (ERC20): `0xd773d8e6a50758e1ada699bb6c4f98bb4abf82da`

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/ftx-api,tiagosiebler/bybit-api,tiagosiebler/binance,tiagosiebler/orderbooks,tiagosiebler/okx-api,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/ftx-api&tiagosiebler/bybit-api&tiagosiebler/binance&tiagosiebler/orderbooks&tiagosiebler/okx-api&tiagosiebler/awesome-crypto-examples&Date)
