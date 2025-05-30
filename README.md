# Node.js & JavaScript SDK for Binance REST APIs & WebSockets

[![Build & Test](https://github.com/tiagosiebler/binance/actions/workflows/test.yml/badge.svg)](https://github.com/tiagosiebler/binance/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/binance)][1]
[![npm size](https://img.shields.io/bundlephobia/min/binance/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/binance)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/binance)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/binance/badge)](https://www.codefactor.io/repository/github/tiagosiebler/binance)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)

<p align="center">
  <a href="https://www.npmjs.com/package/binance">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/binance/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/binance/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

[1]: https://www.npmjs.com/package/binance

Updated & performant JavaScript & Node.js SDK for the Binance REST APIs and WebSockets:

- Extensive integration with Binance REST APIs and WebSockets.
- TypeScript support (with type declarations for most API requests & responses).
- Supports Binance REST APIs for Binance Spot, Margin, Isolated Margin, USDM & CoinM Futures.
  - Strongly typed on most requests and responses.
  - Automated end-to-end tests on most API calls, ensuring no breaking changes are released.
- Extremely robust & performant JavaScript/Node.js Binance SDK with significant trading volume in production (livenet).
- Actively maintained with a modern, promise-driven interface.
- Support for seamless HMAC and RSA authentication for private Binance REST API and WebSocket calls.
  - Passing a private key as a secret will automatically revert to RSA authentication.
- Supports Websockets for Binance Spot, Margin, Isolated Margin, USDM & CoinM Futures.
  - Event driven messaging.
  - Smart websocket persistence
    - Automatically handle silent websocket disconnections through timed heartbeats, including the scheduled 24hr disconnect.
    - Automatically handle listenKey persistence and expiration/refresh.
    - Emit `reconnected` event when dropped connection is restored.
  - Strongly typed on most websocket events, with typeguards available for TypeScript users.
  - Optional:
    - Automatic beautification of Websocket events (from one-letter keys to descriptive words, and strings with floats to numbers).
    - Automatic beautification of REST responses (parsing numbers in strings to numbers).
- Heavy automated end-to-end testing with real API calls.
  - End-to-end testing before any release.
  - Real API calls in e2e tests.
- Proxy support via axios integration.
- Active community support & collaboration in telegram: [Node.js Algo Traders](https://t.me/nodetraders).

## Installation

`npm install binance --save`

## Examples

Refer to the [examples](./examples) folder for implementation demos.

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/binance/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Questions about Binance APIs & WebSockets? Ask in the official [Binance API](https://t.me/binance_api_english) group on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/sieblyio)

<!-- template_related_projects -->

## Related projects

Check out my related JavaScript/TypeScript/Node.js projects:

- Try my REST API & WebSocket SDKs:
  - [Bybit-api Node.js SDK](https://www.npmjs.com/package/bybit-api)
  - [Okx-api Node.js SDK](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK](https://www.npmjs.com/package/binance)
  - [Gateio-api Node.js SDK](https://www.npmjs.com/package/gateio-api)
  - [Bitget-api Node.js SDK](https://www.npmjs.com/package/bitget-api)
  - [Kucoin-api Node.js SDK](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase-api Node.js SDK](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart-api Node.js SDK](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Binance's API documentation.

- [Binance API Documentation](https://developers.binance.com/docs)

  - [ Spot ](https://developers.binance.com/docs/binance-spot-api-docs)
  - [ Derivatives ](https://developers.binance.com/docs/derivatives)
  - [ Margin ](https://developers.binance.com/docs/margin_trading)
  - [ Wallet ](https://developers.binance.com/docs/wallet)

- [Find all products here](https://developers.binance.com/en)

- [REST Endpoint Function List](./docs/endpointFunctionList.md)
- [TSDoc Documentation (autogenerated using typedoc)](https://tsdocs.dev/docs/binance)

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
  logger,
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

## Browser/Frontend Usage

### Import

This is the "modern" way, allowing the package to be directly imported into frontend projects with full typescript support.

1. Install these dependencies
   ```sh
   npm install crypto-browserify stream-browserify
   ```
2. Add this to your `tsconfig.json`
   ```json
   {
     "compilerOptions": {
       "paths": {
         "crypto": [
           "./node_modules/crypto-browserify"
         ],
         "stream": [
           "./node_modules/stream-browserify"
         ]
   }
   ```
3. Declare this in the global context of your application (ex: in polyfills for angular)
   ```js
   (window as any).global = window;
   ```

### Webpack

This is the "old" way of using this package on webpages. This will build a minified js bundle that can be pulled in using a script tag on a website.

Build a bundle using webpack:

- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

However, note that browser usage will lead to CORS errors due to Binance.

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->

<!---
old ones:
  - BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
  - BTC(SegWit): `bc1ql64wr9z3khp2gy7dqlmqw7cp6h0lcusz0zjtls`
  - ETH(ERC20): `0xe0bbbc805e0e83341fadc210d6202f4022e50992`
  - USDT(TRC20): `TA18VUywcNEM9ahh3TTWF3sFpt9rkLnnQa
-->
<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
