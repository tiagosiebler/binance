# Binance WebSocket Streams

This Node.js, JavaScript & TypeScript SDK for Binance has complete support for all available WebSocket capabilities of Binance's API offering.

## Capabilities

These WebSocket capabilities are split into two key groups:

1. WebSocket Consumers:
   - Subscribe to market data & receive realtime updates.
   - Subscribe to private account data & receive realtime updates (generally called the user data stream).
2. WebSocket API:
   - Send requests & commands over a persistent WebSocket (WSAPI) connection. E.g. Submit an order.
   - Subscribe to private account data & receive realtime updates (generally called the user data stream), over a persistent WebSocket (WSAPI) connection. Note:
     - This was previously available without the WebSocket API, via a mechanic involving a temporary listenKey.
     - In recent updates, the WebSocket API supports subscribing to the user data stream (private updates).
     - In some cases, this is the only way to subsrcibe to the user data stream (e.g. in Spot markets).

## Architecture

### WebsocketClient

This SDK has all WebSocket capabilities integrated in the dedicated class called the `WebsocketClient`. This can be imported from the package directly. This all-in-one class handles all aspects of Binance's WebSocket capabilities, across all subdomains & endpoints. It also includes the raw capabilities to support integration with the WebSocket API. Subscriptions, heartbeats and connection recovery after disconnect - these are all included automatically.

If the answer to any of these is yes, you should be using the WebsocketClient:

- You want to subscribe to & receive realtime updates for public market data.
- You want raw control over how & where WebSocket API commands are sent.

If you are looking for a more convenient integration with Binance's WebSocket API, you should look at the `WebsocketAPIClient`.

### WebsocketAPIClient

This is a utility class built over the WebsocketClient to especially provide a more convenient way of using Binance's WebSocket API. While WebSockets are asynchronous by design, the WebsocketAPIClient provides a way to send WebSocket API commands and await the result. All commands are wrapped in a promise and internal event tracking ensures promises are resolved or rejected as part of the command life cycle.

This utility class in this SDK allows you to integrate the WebSocket API in the same way that you would integrate a REST API. Make a request and await the result.

As of early 2026, some of the user data streams are also only available via the WebSocket API streams. This has been integrated into the WebsocketAPIClient and is available with a number of user data methods, depending on the product group. Some references:

- Spot: `wsApiClient.subscribeUserDataStream(WS_KEY_MAP.mainWSAPI)`
- Margin: `wsApiClient.subscribeUserDataStream(WS_KEY_MAP.marginUserData)`
- USDM Futures: `wsApiClient.subscribeUserDataStream(WS_KEY_MAP.usdmWSAPI)`
- CoinM Futures: `wsApiClient.subscribeUserDataStream(WS_KEY_MAP.coinmWSAPI)`

## Key Features

### Base URL Split & Migration

On 06/03/2026, Binance announced a routing upgrade to their USDM Futures WebSocket System, titled: "Binance USDⓈ-M Futures WebSocket System Upgrade Notice (2026-03-06)".

#### Key Highlights:

- Introduction of three dedicated WebSocket base URLs:
  - Public (high-frequency public market data)
    - wss://fstream.binance.com/public
  - Market (regular market data)
    - wss://fstream.binance.com/market
  - Private (user data streams)
    - wss://fstream.binance.com/private
- New endpoints are supported immediately upon this announcement.
- Legacy WebSocket URLs will be permanently retired on 2026-04-23.
- Documentation including endpoint & stream mapping: https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Important-WebSocket-Change-Notice#public-high-frequency-public-data

#### Binance JavaScript SDK Support

All three dedicated WebSocket base URLs are supported. Each with their own unique WsKey, used to track each unique connection.

Continue to subscribe to market data as before with the dedicated subscribe method, but ensure to provide the connection key depending on the type of market data you are consuming.

Minimal examples:

```typescript
// ...

// For public (high-frequency public data)
const wsKeyUsdmPublic = WS_KEY_MAP.usdmPublic;
wsClient.subscribe(['btcusdt@bookTicker', 'btcusdt@depth'], wsKeyUsdmPublic);

// For market (regular market data)
const wsKeyUsdmMarket = WS_KEY_MAP.usdmMarket;
wsClient.subscribe(['btcusdt@aggTrade', 'btcusdt@forceOrder'], wsKeyUsdmMarket);

// For user data, continue using the subscribe user data stream method as before.
// The SDK will automatically route to the "private" endpoint for USDM Futures:
wsClient.subscribeUsdFuturesUserDataStream();
```

#### Legacy `wsClient.subscribe*()` methods

If you're using any of the per-topic convenience methods, such as `wsClient.subscribeAggregateTrades(...)`, no change is required. The SDK will automatically route the topic subscription request to the appropriate WS URL.

## Further Reading

For detailed examples, refer to the examples in this folder, as well as the following documentation:

- Binance JavaScript SDK QuickStart Guide: https://siebly.io/sdk/binance/javascript
- Binance JavaScript SDK Readme: https://www.npmjs.com/package/binance
