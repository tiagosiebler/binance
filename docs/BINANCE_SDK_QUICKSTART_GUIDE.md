# Binance SDK Quickstart Guide

This guide walks through key pieces of a Binance REST API, WebSocket & WebSocket API integration using [`binance`](https://www.npmjs.com/package/binance), the Binance JavaScript and TypeScript SDK by Siebly.io.

The SDK handles request building and connectivity for you, including request signing, WebSocket management, healthchecks, heartbeats, listen-key refreshes, resubscribe behavior, and WebSocket API response mapping so your code can stay focused on the workflow you are automating. This guide will walk you through installation and client selection, then moves through public calls, private auth, REST, streams, user data, and the WebSocket API.

**Key links**

- Binance JavaScript SDK by Siebly: [`binance`](https://www.npmjs.com/package/binance)
- GitHub Repository: [`tiagosiebler/binance`](https://github.com/tiagosiebler/binance)
- SDK function-endpoint map: [Binance JavaScript Endpoint Reference](./endpointFunctionList.md)
- REST examples: [Binance SDK REST examples](../examples/Rest)
- WebSocket examples: [Binance SDK WebSocket examples](../examples/WebSockets)
- More SDKs: [Siebly.io](https://siebly.io)

---

## Why use the SDK

A stable Binance integration is more than a handful of HTTP requests. Binance splits behavior across product groups, transports, key types, and environments:

- Spot, Margin, Wallet, Convert, Earn, and Sub-Account APIs live behind the main REST client, but not all of them share the same endpoint prefix or permission model.
- Some of these product groups expect API calls to reach different subdomains.
- USD-M Futures and COIN-M Futures have separate REST clients, symbols, endpoint prefixes, and WebSocket endpoints.
- Both have their own subdomains as well.
- Portfolio Margin uses a dedicated REST client and its own account model.
- Public streams, private user data streams, and WebSocket API commands are different flows.
- Private REST and WebSocket API requests must be signed.
- User data streams can involve listen keys, WebSocket API subscriptions, token refreshes, and reconnect handling.

Most of that work is handled for you, while the grouping & naming stays close to Binance's API naming. The SDK gives you dedicated REST API clients for the major product groups, `WebsocketClient` for streaming, `WebsocketAPIClient` for awaitable WebSocket API requests. It also includes TypeScript definitions, ESM/CJS support, proxy support, and optional response beautification.

---

## Install and API keys

If you do not have Node.js installed yet, install it first. The SDK is published to both [GitHub](https://github.com/tiagosiebler/binance) and [npm](https://www.npmjs.com/package/binance), and can therefore be installed with your favourite Node.js compatible package manager.

Install the SDK with npm:

```bash
npm install binance
```

Or use another npm-compatible package manager:

```bash
pnpm install binance
yarn add binance
```

Create API keys from the relevant Binance page:

- Binance live API keys: [Binance API Management](https://www.binance.com/en/my/settings/api-management)
- Binance Spot testnet: [Spot Test Network](https://testnet.binance.vision/)
- Binance Futures testnet: [Futures Testnet](https://testnet.binancefuture.com/)
- Binance demo trading: [Binance Demo Trading](https://demo.binance.com/)

> Always use the minimum permissions needed for your scenario. Trading does not require withdrawal permissions. Analytics does not require trading permissions.
> Always require strict IP whitelisting for any API keys that you create.

The main auth and environment rules are:

- Public market data does not require API keys.
- Private REST APIs require `api_key` and `api_secret`.
- Live, testnet, and demo trading credentials are separate, as they are separate environments.
- API permissions must match the product and action your code is using.
- HMAC keys are the common API key + secret flow. These are the "system generated" API keys, selected by default when creating new API keys for Binance.
- RSA and Ed25519 keys use self-generated private keys.
- Ed25519 is recommended for latency-sensitive integrations with the WebSocket API, as this enables session-based WebSocket API authentication, instead of having to authenticate every request.

All supported key types use the same SDK constructor shape. The SDK will automatically detect your key type and adjust request building & sign automatically:

```typescript
const client = new MainClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});
```

For HMAC, `api_secret` is your Binance API secret. For RSA or Ed25519, `api_secret` is your PEM private key.

Typical environment variables:

```bash
export BINANCE_API_KEY='your-api-key'
export BINANCE_API_SECRET='your-api-secret-or-private-key'
```

If you are only testing public endpoints, you do not need any keys at all.

---

## Products and clients

Binance is not one single API. The SDK splits REST clients around Binance's product boundaries:

| Product group                                                    | REST client          | Common usage                                                                                              |
| ---------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| Spot, Margin, Wallet, Convert, Earn, Sub-accounts, Broker, Alpha | `MainClient`         | Spot trading, account data, wallet flows, margin trading, transfers, savings/earn, sub-account management |
| USD-M Futures                                                    | `USDMClient`         | USDT/USDC margined futures market data, account data, positions, orders                                   |
| COIN-M Futures                                                   | `CoinMClient`        | Coin-margined futures market data, account data, positions, orders                                        |
| Portfolio Margin                                                 | `PortfolioClient`    | Portfolio Margin account, UM/CM/margin orders, balances, positions                                        |
| WebSocket streams                                                | `WebsocketClient`    | Public market data streams and private user data streams                                                  |
| WebSocket API                                                    | `WebsocketAPIClient` | REST-like Spot and Futures commands over persistent WebSocket API connections                             |

As a rule of thumb:

- Use `MainClient` when the Binance docs path starts with `api/` or `sapi/`, including Spot and many account/wallet APIs.
- Use `USDMClient` when the Binance docs path starts with `fapi/`.
- Use `CoinMClient` when the Binance docs path starts with `dapi/`.
- Use `PortfolioClient` when the Binance docs path starts with `papi/`.
- Use `WebsocketClient` when you want to subscribe to streams and receive events.
- Use `WebsocketAPIClient` when you want to send commands over WebSocket and await responses like REST.

For a complete method map, see [docs/endpointFunctionList.md](./endpointFunctionList.md). If any endpoints or properties seem to be missing, please open an issue on GitHub and we'll look into it. Targeted PRs are also welcome.

### REST, streams, listen keys, and WebSocket API

Binance uses several related but different integration patterns. It helps to keep them separate:

| Flow                         | SDK surface                                                                                                      | Best for                                                                                                                                          | What the SDK handles                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| REST API                     | `MainClient`, `USDMClient`, `CoinMClient`, `PortfolioClient`                                                     | Request/response calls, broad API coverage, occasional reads/writes, fallback reconciliation                                                      | Base URLs, request signing, timestamps, response parsing, errors                                    |
| Public WebSocket streams     | `WebsocketClient.subscribe(...)`                                                                                 | Live market data such as trades, klines, tickers, order book updates                                                                              | Connection routing, subscribe requests, heartbeats, reconnects, resubscribe                         |
| Listen-key user data streams | `WebsocketClient.subscribeUsdFuturesUserDataStream()`, `subscribeCoinFuturesUserDataStream()`, portfolio helpers | Private account events where Binance still uses listen keys, especially Futures and Portfolio Margin streams                                      | Listen-key creation, keepalive, refresh, reconnect, stream teardown                                 |
| WebSocket API user data      | `WebsocketAPIClient.subscribeUserDataStream(...)`                                                                | Spot user data and some newer private stream flows without the old Spot listen-key workflow                                                       | WebSocket API auth, subscription command, reconnect/resubscribe behavior                            |
| WebSocket API commands       | `WebsocketAPIClient` methods or `WebsocketClient.sendWSAPIRequest(...)`                                          | Lower-latency request/response commands over an already-open WebSocket, such as order tests, order placement, cancellation, status, account reads | WebSocket connection persistence, auth, request IDs, promise resolution, response/error correlation |

The WebSocket API is not just another stream. It is a request/response API over WebSocket. Since much of the functionality is a better alternative to the REST API, we've introduced the promise-driven `WebsocketAPIClient`. Lets you write code that feels like working with a REST API. Call a function to send a command over WS and await the response, without any of the complexity of managing asynchronous messaging over WebSockets (as well as the life-cycle complexities that come with keeping WebSockets healthy).

```typescript
const result = await wsApi.testSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '10000',
  timeInForce: 'GTC',
  timestamp: Date.now(),
});
```

Use REST when you want maximum endpoint coverage, simple one-off calls, or reconciliation after reconnects. Use the WebSocket API when you want persistent connectivity, lower request overhead, WebSocket API-only features, or a promise-driven command path that can share the same event-driven architecture as your streams. With Ed25519 keys, authentication can happen once per WebSocket API connection, which can improve latency in mid-to-high frequency systems. One less thing to repeat every request, is cumulatively saved time.

---

## Start building: first calls

If you only want the fastest path to a working integration, start here.

### 1. First Spot REST API request

```typescript
import { MainClient } from 'binance';

const client = new MainClient();

async function main() {
  const serverTime = await client.getServerTime();
  const exchangeInfo = await client.getExchangeInfo({ symbol: 'BTCUSDT' });
  const ticker = await client.getSymbolPriceTicker({ symbol: 'BTCUSDT' });
  const orderBook = await client.getOrderBook({ symbol: 'BTCUSDT', limit: 10 });
  const candles = await client.getKlines({
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: 5,
  });

  console.log({
    serverTime,
    symbol: exchangeInfo.symbols?.[0]?.symbol,
    ticker,
    orderBook,
    candles,
  });
}

main().catch(console.error);
```

That confirms public Spot REST is wired correctly.

See also: [Spot public REST example](../examples/Rest/Spot/rest-spot-public.ts)

### 2. First public Spot WebSocket stream

```typescript
import { WebsocketClient, WS_KEY_MAP } from 'binance';

const ws = new WebsocketClient({
  beautify: true,
});

ws.on('open', (data) => console.log('connected', data.wsKey, data.wsUrl));
ws.on('message', (data) => console.log('raw message', JSON.stringify(data)));
ws.on('formattedMessage', (data) => console.log('formatted', data));
ws.on('response', (data) => console.log('response', JSON.stringify(data)));
ws.on('reconnecting', (data) => console.log('reconnecting', data?.wsKey));
ws.on('reconnected', (data) => console.log('reconnected', data?.wsKey));
ws.on('exception', console.error);

ws.subscribe(['btcusdt@trade', 'btcusdt@bookTicker'], WS_KEY_MAP.main);
```

That gives you a live public Spot stream without any API keys.

See also: [Spot trades WebSocket example](../examples/WebSockets/Public/ws-public-spot-trades.ts)

### 3. First private Spot user data stream

For Spot user data streams, prefer the WebSocket API user data flow. It avoids the older Spot listen-key flow and keeps the stream on a managed WebSocket API connection.

```typescript
import { WebsocketAPIClient, WS_KEY_MAP } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautify: true,
});

wsApi.getWSClient().on('open', (data) => {
  console.log('ws api open', data.wsKey);
});

wsApi.getWSClient().on('formattedUserDataMessage', (data) => {
  console.log('account event', data);
});

wsApi.getWSClient().on('exception', console.error);

async function main() {
  await wsApi.subscribeUserDataStream(WS_KEY_MAP.mainWSAPI);
}

main().catch(console.error);
```

The SDK handles authentication and resubscribe behavior for the WebSocket API connection. With Ed25519 keys it can authenticate the WebSocket API session once. With HMAC or RSA keys it signs private WebSocket API commands individually, although that primarily matters in the context of sending regular commands (such as order submissions) via WebSocket API.

See also: [Spot user data stream over WebSocket API](<../examples/WebSockets/Private(userdata)/ws-userdata-wsapi.ts>)

### 4. First Spot order over REST API

```typescript
import { MainClient } from 'binance';

const client = new MainClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});

async function placeOrder() {
  const orderRequest = {
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: 0.001,
    price: 10000,
    timeInForce: 'GTC',
    newOrderRespType: 'FULL',
  } as const;

  // Validate the request without sending it to the matching engine.
  await client.testNewOrder(orderRequest);

  // Remove this comment when you are ready to place a real order.
  // const result = await client.submitNewOrder(orderRequest);
  // console.log(result);
}

placeOrder().catch(console.error);
```

Use `testNewOrder()` when you want to validate the request shape and signature without placing a live Spot order. Use `submitNewOrder()` only when you are ready to send the order.

See also: [Spot private trading example](../examples/Rest/Spot/rest-spot-private-trade.ts)

### 5. First USD-M Futures order

For strategy testing, `demoTrading: true` is usually more realistic than testnet because demo trading uses live market data with simulated trading.

```typescript
import { USDMClient } from 'binance';

const client = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  demoTrading: true,
});

async function placeFuturesOrder() {
  const account = await client.getAccountInformation();
  console.log('demo futures account can trade:', account.canTrade);

  const result = await client.submitNewOrder({
    symbol: 'BTCUSDT',
    side: 'SELL',
    type: 'MARKET',
    quantity: 0.001,
  });

  console.log(result);
}

placeFuturesOrder().catch(console.error);
```

See also: [USD-M Futures demo trading example](../examples/Rest/Futures/rest-usdm-demo.ts)

### 6. First WebSocket API request

The WebSocket API lets you send requests over a persistent WebSocket connection and await responses, similar to REST. This is useful for lower-latency workflows and for WebSocket API-only features.

```typescript
import { WebsocketAPIClient } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});

async function main() {
  const time = await wsApi.getSpotServerTime();

  const orderTest = await wsApi.testSpotOrder({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: '0.001',
    price: '10000',
    timeInForce: 'GTC',
    timestamp: Date.now(),
  });

  console.log({ time, orderTest });
}

main()
  .catch(console.error)
  .finally(() => wsApi.disconnectAll());
```

See also: [WebSocket API client example](../examples/WebSockets/WS-API/ws-api-client.ts)

---

## Spot, Margin, and Wallet REST

Most Binance integrations start with `MainClient`. It covers Spot trading and many account APIs under Binance's main REST API families.

### Create a public `MainClient`

```typescript
import { MainClient } from 'binance';

const client = new MainClient();
```

Public calls do not require keys.

### Create a private `MainClient`

If you plan on making private API calls, include API keys when creating the client:

```typescript
import { MainClient } from 'binance';

const client = new MainClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautifyResponses: true,
});
```

Private REST methods are signed automatically. You do not need to manually add timestamps, signatures, or `X-MBX-APIKEY` headers.

### Common public Spot market data calls

```typescript
const serverTime = await client.getServerTime();
const ping = await client.testConnectivity();
const exchangeInfo = await client.getExchangeInfo({ symbol: 'BTCUSDT' });
const orderBook = await client.getOrderBook({ symbol: 'BTCUSDT', limit: 10 });
const recentTrades = await client.getRecentTrades({
  symbol: 'BTCUSDT',
  limit: 10,
});
const aggregateTrades = await client.getAggregateTrades({
  symbol: 'BTCUSDT',
  limit: 10,
});
const candles = await client.getKlines({
  symbol: 'BTCUSDT',
  interval: '1m',
  limit: 10,
});
const averagePrice = await client.getAvgPrice({ symbol: 'BTCUSDT' });
const ticker = await client.getSymbolPriceTicker({ symbol: 'BTCUSDT' });
const bookTicker = await client.getSymbolOrderBookTicker({
  symbol: 'BTCUSDT',
});
```

### Common private Spot account and order calls

```typescript
const account = await client.getAccountInformation();
const balances = await client.getBalances();
const accountInfo = await client.getAccountInfo();
const openOrders = await client.getOpenOrders({ symbol: 'BTCUSDT' });
const allOrders = await client.getAllOrders({ symbol: 'BTCUSDT', limit: 10 });
const myTrades = await client.getAccountTradeList({
  symbol: 'BTCUSDT',
  limit: 10,
});
const tradeFee = await client.getTradeFee({ symbol: 'BTCUSDT' });
const apiPermissions = await client.getApiKeyPermissions();
```

See also:

- [Spot public REST example](../examples/Rest/Spot/rest-spot-public.ts)
- [Spot exchange info example](../examples/Rest/Spot/rest-spot-exchange-info.ts)
- [Spot private trading example](../examples/Rest/Spot/rest-spot-private-trade.ts)
- [Spot private miscellaneous account example](../examples/Rest/Spot/rest-spot-private-misc.ts)

### Spot order examples

Market order:

```typescript
await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quantity: 0.001,
  newOrderRespType: 'FULL',
});
```

Limit order:

```typescript
await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 10000,
  timeInForce: 'GTC',
});
```

Limit maker order:

```typescript
await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT_MAKER',
  quantity: 0.001,
  price: 10000,
});
```

Test an order without sending it:

```typescript
await client.testNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 10000,
  timeInForce: 'GTC',
});
```

Cancel an order:

```typescript
await client.cancelOrder({
  symbol: 'BTCUSDT',
  orderId: 123456789,
});
```

**Custom client order IDs**

You do not always need to set a custom client order ID. Most of the time, the cleanest option is to send the order without `newClientOrderId` and let the SDK handle the request normally:

```typescript
await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'LIMIT',
  quantity: 0.001,
  price: 13000,
  timeInForce: 'GTC',
});
```

If your system needs to know the client order ID before the order is sent, but the ID does not need to carry any meaning, ask the REST client to generate one:

```typescript
const newClientOrderId = client.generateNewOrderId();

await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'LIMIT',
  quantity: 0.001,
  price: 13000,
  timeInForce: 'GTC',
  newClientOrderId,
});
```

`generateNewOrderId()` is available on every REST client, including `MainClient`, `USDMClient`, `CoinMClient`, and `PortfolioClient`. The client already knows its product group, so the generated ID uses the right Binance-compatible prefix.

If you want to include a small piece of your own context in the client order ID, such as a take-profit marker or strategy step, use the product prefix from the client and append your suffix:

```typescript
const prefix = client.getOrderIdPrefix();
const suffix = `tp1_${Date.now()}`;
const newClientOrderId = `${prefix}${suffix}`;
const validBinanceClientOrderId = /^[.A-Z:/a-z0-9_-]{1,32}$/;

if (!validBinanceClientOrderId.test(newClientOrderId)) {
  throw new Error(`Invalid Binance client order ID: ${newClientOrderId}`);
}

await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'LIMIT',
  quantity: 0.001,
  price: 13000,
  timeInForce: 'GTC',
  newClientOrderId,
});
```

The prefix returned by `getOrderIdPrefix()` is 10 characters long. For endpoints with Binance's common 32-character client order ID limit, that leaves 22 characters for your own suffix. Keep the suffix short and use only characters Binance allows for that field.

If you need to track richer metadata than will comfortably fit in the client order ID, do not try to squeeze it into these custom order ID fields. Instead, generate an ID with `client.generateNewOrderId()` before placing the order, use that value as the key for your own metadata, and store the metadata locally or in an external store such as Redis. Later, when order updates arrive through REST polling or user data events, you can look up the richer context using the seen `newClientOrderId` value like a primary key, while keeping the exchange-facing ID short and valid.

Regular Spot/Futures/Portfolio orders usually use `newClientOrderId`; newer Futures algo or conditional flows may use `clientAlgoId` instead. The same rule applies: omit it unless you need it, use `generateNewOrderId()` when any unique ID is fine, and use `getOrderIdPrefix()` when building your own value.

### Margin REST examples

Margin APIs also live on `MainClient`.

```typescript
const marginAssets = await client.getAllMarginAssets();
const marginPairs = await client.getAllCrossMarginPairs();
const priceIndex = await client.queryMarginPriceIndex({ symbol: 'BTCUSDT' });

const crossMarginAccount = await client.queryCrossMarginAccountDetails();
const isolatedMarginAccount = await client.getIsolatedMarginAccountInfo({
  symbols: 'BTCUSDT',
});
const openMarginOrders = await client.queryMarginAccountOpenOrders({
  symbol: 'BTCUSDT',
});
```

Margin order:

```typescript
await client.marginAccountNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 10000,
  timeInForce: 'GTC',
  isIsolated: 'FALSE',
  sideEffectType: 'NO_SIDE_EFFECT',
});
```

Borrow or repay:

```typescript
await client.submitMarginAccountBorrowRepay({
  asset: 'USDT',
  symbol: 'BTCUSDT',
  amount: 25,
  type: 'BORROW',
  isIsolated: 'FALSE',
});
```

Margin permissions, collateral, interest, and liquidation behavior are account-specific. Keep margin trading code separate from ordinary Spot trading code even though both use `MainClient`.

### Wallet and transfer examples

Wallet and transfer APIs also live on `MainClient`.

```typescript
const balances = await client.getBalances();
const depositAddress = await client.getDepositAddress({
  coin: 'USDT',
  network: 'ETH',
});
const depositHistory = await client.getDepositHistory({ coin: 'USDT' });
const withdrawHistory = await client.getWithdrawHistory({ coin: 'USDT' });

const transferHistory = await client.getUniversalTransferHistory({
  type: 'MAIN_UMFUTURE',
});
```

Withdrawal calls are intentionally not shown as a quickstart. Use withdrawal permissions only when your system truly needs them, and isolate those keys from trading keys.

---

## Futures REST

Binance Futures are split into USD-M and COIN-M product groups. Use the dedicated client for the product you are integrating.

### Create public Futures clients

```typescript
import { CoinMClient, USDMClient } from 'binance';

const usdm = new USDMClient();
const coinm = new CoinMClient();
```

Public futures market data does not require keys.

### Create private Futures clients

```typescript
import { CoinMClient, USDMClient } from 'binance';

const usdm = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});

const coinm = new CoinMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});
```

Use `demoTrading: true` for Binance demo trading or `testnet: true` for testnet where supported:

```typescript
const demoUsdm = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  demoTrading: true,
});

const testnetUsdm = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  testnet: true,
});
```

Do not enable both `demoTrading` and `testnet` on the same client.

### Common public USD-M Futures market data calls

```typescript
const serverTime = await usdm.getServerTime();
const exchangeInfo = await usdm.getExchangeInfo();
const orderBook = await usdm.getOrderBook({ symbol: 'BTCUSDT', limit: 10 });
const recentTrades = await usdm.getRecentTrades({
  symbol: 'BTCUSDT',
  limit: 10,
});
const candles = await usdm.getKlines({
  symbol: 'BTCUSDT',
  interval: '1m',
  limit: 10,
});
const markPrice = await usdm.getMarkPrice({ symbol: 'BTCUSDT' });
const fundingHistory = await usdm.getFundingRateHistory({
  symbol: 'BTCUSDT',
  limit: 10,
});
const ticker = await usdm.getSymbolPriceTicker({ symbol: 'BTCUSDT' });
```

### Common public COIN-M Futures market data calls

```typescript
const serverTime = await coinm.getServerTime();
const exchangeInfo = await coinm.getExchangeInfo();
const orderBook = await coinm.getOrderBook({
  symbol: 'BTCUSD_PERP',
  limit: 10,
});
const candles = await coinm.getKlines({
  symbol: 'BTCUSD_PERP',
  interval: '1m',
  limit: 10,
});
const markPrice = await coinm.getMarkPrice({ symbol: 'BTCUSD_PERP' });
const ticker = await coinm.getSymbolPriceTicker({ symbol: 'BTCUSD_PERP' });
```

See also:

- [USD-M public REST example](../examples/Rest/Futures/rest-usdm-public.ts)
- [USD-M demo trading example](../examples/Rest/Futures/rest-usdm-demo.ts)
- [USD-M testnet example](../examples/Rest/Futures/rest-usdm-testnet.ts)

### Common private Futures account calls

```typescript
const balance = await usdm.getBalance();
const account = await usdm.getAccountInformation();
const positions = await usdm.getPositions({ symbol: 'BTCUSDT' });
const openOrders = await usdm.getAllOpenOrders({ symbol: 'BTCUSDT' });
const tradeHistory = await usdm.getAccountTrades({
  symbol: 'BTCUSDT',
  limit: 10,
});
const income = await usdm.getIncomeHistory({
  symbol: 'BTCUSDT',
  limit: 10,
});
```

### Futures order examples

Market order:

```typescript
await usdm.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'MARKET',
  quantity: 0.001,
});
```

Limit order:

```typescript
await usdm.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 10000,
  timeInForce: 'GTC',
});
```

Reduce-only limit order:

```typescript
await usdm.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 10000,
  timeInForce: 'GTC',
  reduceOnly: 'true',
});
```

Batch order management:

```typescript
await usdm.submitMultipleOrders([
  {
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: 0.001,
    price: 10000,
    timeInForce: 'GTC',
  },
  {
    symbol: 'BTCUSDT',
    side: 'SELL',
    type: 'LIMIT',
    quantity: 0.001,
    price: 13000,
    timeInForce: 'GTC',
  },
]);
```

See also:

- [USD-M order example](../examples/Rest/Futures/rest-usdm-order.ts)
- [USD-M stop-loss order example](../examples/Rest/Futures/rest-usdm-order-sl.ts)
- [USD-M bracket order example](../examples/Rest/Futures/rest-future-bracket-order.ts)

---

## Portfolio Margin REST

Portfolio Margin has its own account model and a dedicated `PortfolioClient`.

### Create a Portfolio Margin client

```typescript
import { PortfolioClient } from 'binance';

const portfolio = new PortfolioClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});
```

### Common Portfolio Margin calls

```typescript
const ping = await portfolio.testConnectivity();
const serverTime = await portfolio.getServerTime();
const balance = await portfolio.getBalance();
const account = await portfolio.getAccountInfo();
const umPositions = await portfolio.getUMPosition({ symbol: 'BTCUSDT' });
const cmPositions = await portfolio.getCMPosition({ pair: 'BTCUSD' });
const umOpenOrders = await portfolio.getAllUMOpenOrders({
  symbol: 'BTCUSDT',
});
const marginOpenOrders = await portfolio.getMarginOpenOrders({
  symbol: 'BTCUSDT',
});
```

Portfolio Margin order examples:

```typescript
await portfolio.submitNewUMOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '10000',
  timeInForce: 'GTC',
});

await portfolio.submitNewCMOrder({
  symbol: 'BTCUSD_PERP',
  side: 'SELL',
  type: 'MARKET',
  quantity: '1',
});

await portfolio.submitNewMarginOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quantity: '0.001',
  sideEffectType: 'NO_SIDE_EFFECT',
});
```

See also:

- [Portfolio Margin public REST example](../examples/Rest/Portfolio%20Margin/rest-portfoliomargin-public.ts)
- [Portfolio Margin private REST example](../examples/Rest/Portfolio%20Margin/rest-portfoliomargin-private.ts)

---

## WebSocket Streams

Use `WebsocketClient` when you want event-driven updates instead of polling REST. It is the shared client for public market streams and the older listen-key style user data streams.

The workflow is simple: create a client, add event handlers, provide API keys if you need private user data, and subscribe to the streams you want. The SDK opens the correct Binance endpoint, applies proxy settings if configured, fetches and refreshes listen keys where required, monitors heartbeats, reconnects stale sockets, and resubscribes cached topics after reconnect.

### Common `WebsocketClient` events

| Event                      | Meaning                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `open`                     | Connection established                                          |
| `message`                  | Raw streaming data received                                     |
| `formattedMessage`         | Beautified public stream data when `beautify: true`             |
| `formattedUserDataMessage` | Beautified private user data stream event when `beautify: true` |
| `response`                 | Subscribe, unsubscribe, auth, or WebSocket API acknowledgement  |
| `reconnecting`             | Connection dropped and retrying                                 |
| `reconnected`              | Connection restored and subscriptions resynced                  |
| `close`                    | Socket closed                                                   |
| `authenticated`            | WebSocket API session authentication succeeded                  |
| `exception`                | Errors and unexpected conditions                                |

### Understanding `WS_KEY_MAP`

`WS_KEY_MAP` tells the SDK which Binance WebSocket endpoint family to use. This matters because Spot, USD-M Futures, COIN-M Futures, Options, Portfolio Margin, and WebSocket API traffic do not all live on the same endpoint.

Common `WS_KEY_MAP` entries:

| Key                          | Use                                                                     |
| ---------------------------- | ----------------------------------------------------------------------- |
| `main`                       | Spot, margin, and isolated margin market data streams                   |
| `main2`                      | Alternate Spot stream port                                              |
| `main3`                      | Spot market-data-only stream endpoint                                   |
| `mainWSAPI`                  | Spot and margin WebSocket API                                           |
| `mainWSAPITestnet`           | Spot WebSocket API testnet                                              |
| `marginUserData`             | Margin user data over WebSocket API listen-token flow                   |
| `marginRiskUserData`         | Cross-margin risk data stream                                           |
| `usdmPublic`                 | USD-M high-frequency public market data, such as book and depth streams |
| `usdmMarket`                 | USD-M regular market data, such as trades, klines, tickers, mark price  |
| `usdmPrivate`                | USD-M private user data stream endpoint                                 |
| `usdmWSAPI`                  | USD-M Futures WebSocket API                                             |
| `coinm`                      | COIN-M market data and user data stream endpoint                        |
| `coinmWSAPI`                 | COIN-M Futures WebSocket API                                            |
| `eoptions`                   | European Options WebSocket streams                                      |
| `portfolioMarginUserData`    | Portfolio Margin user data stream                                       |
| `portfolioMarginProUserData` | Portfolio Margin Pro user data stream                                   |
| `alpha`                      | Alpha market data streams                                               |

These keys act like connection IDs. The SDK uses them to track connection state, cached subscriptions, reconnect behavior, and endpoint-specific routing.

### Public Spot WebSocket topics

```typescript
import { WebsocketClient, WS_KEY_MAP } from 'binance';

const ws = new WebsocketClient({ beautify: true });

ws.on('formattedMessage', (data) => console.log(data));
ws.on('exception', console.error);

ws.subscribe(
  [
    'btcusdt@trade',
    'btcusdt@aggTrade',
    'btcusdt@kline_1m',
    'btcusdt@bookTicker',
    'btcusdt@depth10@100ms',
  ],
  WS_KEY_MAP.main,
);
```

See also:

- [General public WebSocket example](../examples/WebSockets/Public/ws-public.ts)
- [Spot order book WebSocket example](../examples/WebSockets/Public/ws-public-spot-orderbook.ts)
- [Spot trades WebSocket example](../examples/WebSockets/Public/ws-public-spot-trades.ts)

### Public USD-M Futures WebSocket topics

USD-M Futures WebSockets have dedicated endpoint families for high-frequency public data and regular market data.

```typescript
import { WebsocketClient, WS_KEY_MAP } from 'binance';

const ws = new WebsocketClient({ beautify: true });

ws.on('formattedMessage', (data) => console.log(data));
ws.on('exception', console.error);

// High-frequency public data: book ticker and order book depth.
ws.subscribe(
  ['btcusdt@bookTicker', 'btcusdt@depth10@100ms', 'btcusdt@depth@100ms'],
  WS_KEY_MAP.usdmPublic,
);

// Regular market data: trades, mark price, klines, mini tickers, liquidations.
ws.subscribe(
  ['btcusdt@aggTrade', 'btcusdt@markPrice', 'btcusdt@kline_1m'],
  WS_KEY_MAP.usdmMarket,
);
```

See also:

- [USD-M public WebSocket example](../examples/WebSockets/Public/ws-usdm-public.ts)
- [USD-M funding stream example](../examples/WebSockets/Public/ws-public-usdm-funding.ts)

### Public COIN-M Futures WebSocket topics

```typescript
import { WebsocketClient, WS_KEY_MAP } from 'binance';

const ws = new WebsocketClient({ beautify: true });

ws.on('message', (data) => console.log(JSON.stringify(data)));
ws.on('exception', console.error);

ws.subscribe(
  ['btcusd_perp@aggTrade', 'btcusd_perp@markPrice', 'btcusd_perp@kline_1m'],
  WS_KEY_MAP.coinm,
);
```

COIN-M symbols and stream names are not the same as Spot or USD-M symbols. Treat symbols as product-specific strings.

---

## User Data Streams

User data streams are how Binance pushes private account events: order updates, execution updates, balance changes, position changes, margin events, and listen-key or subscription expiry events.

Binance uses two patterns for these streams: WebSocket API user data subscriptions and listen-key user data streams. The SDK supports both; the product group determines which path you should use.

For either pattern, listen for the WebSocket lifecycle events as well as account events. The event names are `reconnecting` and `reconnected`. `reconnecting` fires when the SDK starts replacing a dropped connection; `reconnected` fires after the replacement connection is open. Both include the `wsKey`, which tells you which connection was affected. For user data streams, `reconnected` is the right place to reconcile private state through REST in case account events were missed while the socket was down.

With `WebsocketAPIClient`, attach those handlers to `wsApi.getWSClient()`. With `WebsocketClient`, attach them directly to the client.

### Preferred Spot user data stream with `WebsocketAPIClient`

```typescript
import { WebsocketAPIClient, WS_KEY_MAP } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautify: true,
});

const wsClient = wsApi.getWSClient();

wsClient.on('formattedUserDataMessage', (data) => {
  console.log('spot account event', data);
});

wsClient.on('reconnecting', ({ wsKey }) => {
  console.log('spot user data reconnecting', wsKey);
});

wsClient.on('reconnected', ({ wsKey }) => {
  console.log('spot user data reconnected', wsKey);
  // Fetch account state, open orders, or recent fills here if needed.
});

wsClient.on('exception', console.error);

await wsApi.subscribeUserDataStream(WS_KEY_MAP.mainWSAPI);
```

This is the recommended path for Spot user data in this SDK version.

### Margin user data stream with `WebsocketAPIClient`

```typescript
import { WebsocketAPIClient, WS_KEY_MAP } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautify: true,
});

const wsClient = wsApi.getWSClient();

wsClient.on('formattedUserDataMessage', (data) => {
  console.log('margin account event', data);
});

wsClient.on('reconnecting', ({ wsKey }) => {
  console.log('margin user data reconnecting', wsKey);
});

wsClient.on('reconnected', ({ wsKey }) => {
  console.log('margin user data reconnected', wsKey);
});

await wsApi.subscribeUserDataStream(WS_KEY_MAP.marginUserData);
```

For margin, the SDK handles the listen-token workflow used by Binance's margin WebSocket API user data endpoint.

### Futures user data streams with `WebsocketClient`

For Futures user data streams, the SDK can manage listen keys for you through convenience methods.

```typescript
import { WebsocketClient } from 'binance';

const ws = new WebsocketClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautify: true,
});

ws.on('formattedUserDataMessage', (data) => {
  console.log('futures account event', data);
});

ws.on('reconnecting', ({ wsKey }) => {
  console.log('futures user data reconnecting', wsKey);
});

ws.on('reconnected', ({ wsKey }) => {
  console.log('futures user data reconnected', wsKey);
  // Fetch positions, balances, open orders, or fills here if needed.
});

ws.on('exception', console.error);

await ws.subscribeUsdFuturesUserDataStream();
// await ws.subscribeCoinFuturesUserDataStream();
```

The SDK will fetch the listen key, keep it alive, refresh it when needed, reconnect after network issues, and resubscribe where possible.

### Portfolio Margin user data stream

```typescript
import { WebsocketClient, WS_KEY_MAP } from 'binance';

const ws = new WebsocketClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  beautify: true,
});

ws.on('formattedUserDataMessage', (data) => {
  console.log('portfolio margin event', data);
});

ws.on('reconnecting', ({ wsKey }) => {
  console.log('portfolio margin user data reconnecting', wsKey);
});

ws.on('reconnected', ({ wsKey }) => {
  console.log('portfolio margin user data reconnected', wsKey);
});

ws.on('exception', console.error);

await ws.subscribePortfolioMarginUserDataStream(
  WS_KEY_MAP.portfolioMarginUserData,
);
```

See also:

- [User data stream overview](<../examples/WebSockets/Private(userdata)/ws-userdata-README.MD>)
- [Listen-key user data example](<../examples/WebSockets/Private(userdata)/ws-userdata-listenkey.ts>)
- [WebSocket API user data example](<../examples/WebSockets/Private(userdata)/ws-userdata-wsapi.ts>)
- [User data connection safety example](<../examples/WebSockets/Private(userdata)/ws-userdata-connection-safety.ts>)

---

## WebSocket API

Binance's WebSocket API is a request/response API over a persistent WebSocket connection. It is useful when you want lower request overhead than REST, or when a Binance feature is exposed through the WebSocket API flow.

`WebsocketAPIClient` wraps that in a promise-driven interface: call a method, await a promise, receive the response, and let the SDK manage the underlying WebSocket connection.

### Authentication

The SDK supports HMAC, RSA, and Ed25519 keys:

- HMAC: supported for REST and WebSocket API, but WebSocket API private commands are signed individually.
- RSA: supported for REST and WebSocket API, but WebSocket API private commands are signed individually.
- Ed25519: recommended for WebSocket API because the SDK can authenticate the WebSocket API session once and then send private commands without signing every command.

If your `api_secret` contains a PEM private key, the SDK automatically detects whether it should use RSA or Ed25519 signing.

See also:

- [Ed25519 auth example](../examples/auth/rest-private-ed25519.md)
- [RSA auth example](../examples/auth/rest-private-rsa.md)

### Spot examples

```typescript
import { WebsocketAPIClient } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});

const exchangeInfo = await wsApi.getSpotExchangeInfo({
  symbol: 'BTCUSDT',
});

const orderBook = await wsApi.getSpotOrderBook({
  symbol: 'BTCUSDT',
  limit: 10,
});

const account = await wsApi.getSpotAccountInformation({
  timestamp: Date.now(),
});

await wsApi.testSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '10000',
  timeInForce: 'GTC',
  timestamp: Date.now(),
});
```

Submit a Spot order over the WebSocket API:

```typescript
await wsApi.submitNewSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '10000',
  timeInForce: 'GTC',
});
```

### Futures examples

```typescript
import { WebsocketAPIClient } from 'binance';

const wsApi = new WebsocketAPIClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
});

const book = await wsApi.getFuturesOrderBook({
  symbol: 'BTCUSDT',
  limit: 10,
});

const balance = await wsApi.getFuturesAccountBalance('usdm', {
  timestamp: Date.now(),
});

await wsApi.submitNewFuturesOrder('usdm', {
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'MARKET',
  quantity: '0.001',
  timestamp: Date.now(),
});
```

See also:

- [WebSocket API client example](../examples/WebSockets/WS-API/ws-api-client.ts)
- [Raw WebSocket API promises example](../examples/WebSockets/WS-API/ws-api-raw-promises.ts)

---

## Environments and Special Endpoints

### Demo trading

Demo trading uses real market data with simulated trading. For strategy testing, this is usually more useful than testnet.

```typescript
const client = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  demoTrading: true,
});
```

Demo trading is supported by SDK options for REST and WebSocket clients where Binance provides demo endpoints.

### Testnet

Testnet uses separate credentials and simulated market conditions.

```typescript
const client = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  testnet: true,
});
```

Use testnet for endpoint wiring and permission checks. Do not use testnet market behavior as evidence that a live strategy is profitable or safe.

### Market maker endpoints

Binance provides market maker endpoints for eligible futures users. If you qualify and need those endpoints, enable them with `useMMSubdomain: true`.

```typescript
const usdm = new USDMClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  useMMSubdomain: true,
});

const ws = new WebsocketClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  useMMSubdomain: true,
});
```

Market maker endpoints are for supported futures products. They are not a general Spot endpoint override and are not available on testnet.

---

## Production Notes

Before a Binance integration trades unattended, these are the parts worth making explicit.

### 1. Roll out in layers

Move from public reads to private actions one layer at a time:

1. Public REST APIs
2. Public WebSockets
3. Private REST account reads
4. Private account/user data streams
5. Order validation
6. Tiny demo or live trading tests

For Futures, prefer demo trading before live trading if it fits your setup.

### 2. Reconnect, then backfill

Listen for `reconnecting` and `reconnected`. A dropped WebSocket connection is a normal production condition, especially during volatility or scheduled exchange disconnects.

If your system uses WebSockets for account or market state, a reconnect should usually trigger a REST backfill:

1. Pause risky order actions when `reconnecting` fires.
2. On `reconnected`, query REST for account state, orders, fills, positions, and any market state you depend on.
3. Reconcile internal state.
4. React to any discrepancies in internal vs exchange state, as needed.
5. Resume normal processing.

### 3. Keep credentials scoped

Live, demo trading, Spot testnet, and Futures testnet credentials are different. Keep them separate in your secrets manager and deployment configuration.

Use the minimum permissions needed for each key. A market-data key should not be able to trade. A trading key should not have withdrawal permissions. Do not put live secrets in frontend code. Make use of IP whitelisting for any API keys. These must be protected, treat them like passwords.

### 4. Keep streams and commands separate

Use `WebsocketClient` for streams. Use `WebsocketAPIClient` for commands you want to await. They share WebSocket infrastructure, but they solve different problems.

### 5. Treat symbols and order IDs as product-specific state

Spot, USD-M Futures, COIN-M Futures, Options, and Portfolio Margin do not all use the same symbol conventions:

- Spot: `BTCUSDT`
- USD-M Futures: `BTCUSDT`
- COIN-M Futures: `BTCUSD_PERP`
- Stream names are usually lowercase, such as `btcusdt@trade`. Refer to the examples and/or exchange API docs for exact stream names.

Client order IDs deserve the same care. If you do not need a custom client order ID, omit it. If your strategy relies on idempotency, retries, or reconciliation, generate an ID before sending the order and persist it using the restClient.generateNewOrderId() method. If you build your own value, keep the SDK's product prefix in place (query it using restClient.getOrderIdPrefix()) and stay within Binance's length and character constraints.

### 6. Watch clocks and rate limits

Private Binance requests are timestamp-sensitive. Keep your system clock synced and set `recvWindow` intentionally:

```typescript
const client = new MainClient({
  api_key: process.env.BINANCE_API_KEY!,
  api_secret: process.env.BINANCE_API_SECRET!,
  recvWindow: 5000,
});

await client.fetchLatencySummary();

// For WebSocket API clients:
wsApi.setTimeOffsetMs(-500);
```

The REST client also tracks Binance rate-limit headers it sees:

```typescript
const ticker = await client.getSymbolPriceTicker({ symbol: 'BTCUSDT' });
console.log(ticker);

console.log(client.getRateLimitStates());
```

If you see timestamp errors, fix system clock sync first. If you see rate-limit pressure, reduce polling, batch where the API allows it, and design around Binance's documented request weights.

For more guidance on resolving timestamp & recvWindow issues, refer to the following guidance:
https://github.com/sieblyio/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow

### 7. Logging and large integers

If you want SDK logs in your own monitoring stack, pass a logger:

```typescript
import { DefaultLogger, WebsocketClient } from 'binance';

const customLogger: typeof DefaultLogger = {
  ...DefaultLogger,
  trace: () => {},
  info: (...params) => console.info(new Date(), ...params),
  error: (...params) => console.error(new Date(), ...params),
};

const ws = new WebsocketClient(
  {
    api_key: process.env.BINANCE_API_KEY!,
    api_secret: process.env.BINANCE_API_SECRET!,
    beautify: true,
  },
  customLogger,
);
```

JavaScript cannot precisely represent integers above `Number.MAX_SAFE_INTEGER`. If you need to preserve very large order IDs from WebSocket messages, provide a custom parser:

```typescript
import { WebsocketClient } from 'binance';

const ws = new WebsocketClient({
  customParseJSONFn: (rawEvent) => {
    return JSON.parse(
      rawEvent.replace(/"orderId":\s*(\d+)/g, '"orderId":"$1"'),
    );
  },
});
```

See also: [custom parser example](../examples/WebSockets/Misc/ws-custom-parser.ts)

---

## FAQ

**Which REST client should I use?**

Use `MainClient` for Spot, margin, wallet, Convert, Earn, sub-account, and many account APIs. Use `USDMClient` for USD-M Futures. Use `CoinMClient` for COIN-M Futures. Use `PortfolioClient` for Portfolio Margin.

**Do I need API keys for public market data?**

No. Public REST market data and public WebSocket market data do not require API keys.

**Can I use one Binance API key for every product group?**

Sometimes, but only when the key belongs to the right environment and has the required product permissions enabled. Keep live, demo, and testnet credentials separate. Also keep high-risk permissions, especially withdrawals, separate from ordinary trading keys.

**What is the difference between HMAC, RSA, and Ed25519?**

HMAC is the standard API key + secret flow. RSA and Ed25519 use self-generated private keys. The SDK detects PEM private keys automatically when they are passed as `api_secret`. Ed25519 is recommended for latency-sensitive WebSocket API usage because it supports WebSocket API session authentication.

**Why both `WebsocketClient` and `WebsocketAPIClient`?**

- `WebsocketClient` is for subscriptions and streaming topics.
- `WebsocketAPIClient` is for commands over Binance's WebSocket API. Think "REST API" but over persistent WebSockets.

**Should I use listen keys for Spot user data?**

Prefer `WebsocketAPIClient.subscribeUserDataStream(WS_KEY_MAP.mainWSAPI)` for Spot user data in this SDK version. The older Spot listen-key workflow is still present in places for compatibility, but Binance has marked the Spot listen-key workflow as deprecated.

**What happens if a WebSocket connection drops?**

The SDK supports reconnect and resubscribe flows. Listen for `reconnecting` and `reconnected`. Use `reconnected` as a trigger to reconcile state through REST before resuming risky trading actions.

**Should I use demo trading or testnet?**

Use demo trading when you want simulated trading with real market data. Use testnet for API wiring, endpoint behavior, and permission checks. Do not treat testnet market behavior as representative of live market behavior.

**Can I use this Binance API SDK in TypeScript projects?**

Yes. The package is TypeScript-first and publishes type declarations.

**Do I need TypeScript to use this JavaScript Binance SDK?**

No. Pure JavaScript projects can use this SDK too. Type declarations are included and will help your IDE, but TypeScript is not required.

**Can I use this package in both ESM and CommonJS projects?**

Yes. The package supports both ESM-style imports and CommonJS `require()`.

**Does this guide cover every SDK method?**

No. This guide covers the common first steps and production concerns. For full method coverage, see:

- [Binance JavaScript endpoint reference](./endpointFunctionList.md)
- [Binance SDK examples](../examples)
- [TSDoc documentation](https://tsdocs.dev/docs/binance)

---

## Next steps

If you want to learn more about integrating with Binance APIs and WebSockets:

- Explore the [Binance JavaScript examples on GitHub](../examples)
- Review the full endpoint list: [Binance JavaScript endpoint reference](./endpointFunctionList.md)
- Check the Binance JavaScript SDK on npm: [`binance`](https://www.npmjs.com/package/binance)
- Browse the source code of the Binance JavaScript SDK on GitHub: [`tiagosiebler/binance`](https://github.com/tiagosiebler/binance)
- Review auth examples: [Ed25519](../examples/auth/rest-private-ed25519.md) and [RSA](../examples/auth/rest-private-rsa.md)
- Explore the wider SDK ecosystem: [Siebly.io](https://siebly.io)
