# Binance API - Examples

This folder contains ready to go examples demonstrating various aspects of this API implementation, written in TypeScript (but they are compatible with pure JavaScript projects).

Found something difficult to implement? Contribute to these examples and help others!

## Getting started

- Clone the project (or download it as a zip, or install the module in your own project `npm install binance`).
- Edit the sample as needed (some samples require edits, e.g API keys or import statements to import from npm, not src).
- Execute the sample using tsx: `tsx examples/REST/rest-spot-public.ts`.

Samples that refer to API credentials using `process.env.API_KEY_COM` can be spawned with environment variables. Unix/macOS example:
```
APIKEY='apikeypastedhere' APISECRET='apisecretpastedhere' tsx examples/WebSockets/ws-userdata-listenkey.ts
```

Or edit the example directly to hardcode your API keys.

### WebSockets

All examples relating to WebSockets can be found in the [examples/WebSockets](./WebSockets/) folder. High level summary of available examples:

#### Consumers

These are purely for receiving data from Binance's WebSockets (market data, account updates, etc).

##### Market Data

These examples demonstrate subscribing to & receiving market data from Binance's WebSockets:

- ws-public.ts
  - Demonstration on general usage of the WebSocket client to subscribe to / unsubscribe from one or more market data topics.
- ws-public-spot-orderbook.ts
  - Subscribing to orderbook events for multiple symbols in spot markets.
-	ws-public-spot-trades.ts
  - Subscribing to raw trades for multiple symbols in spot markets.
- ws-unsubscribe.ts
  - Subscribing to a list of topics, and then unsubscribing from a few topics in that list.
- ws-public-usdm-funding.ts
  - Simple example subscribing to a general topic, and how to process incoming events to only extract funding rates from those events.

##### Account Data

These examples demonstrate receiving account update events from Binance's WebSockets:

-	ws-userdata-listenkey.ts
  - Demonstration on subscribing to various user data streams (spot, margin, futures),
  - Handling incoming user data events
  - Using provided type guards to determine which product group the user data event is for (spot, margin, futures, etc).
- ws-userdata-listenKey-testnet.ts
  - Similar to above, but on testnet.
- ws-userdata-connection-safety.ts
  - Demonstration on extra safety around the first user data stream connection.
  - Note: this is overkill in most situations...

##### WebSocket API

These examples demonstrate how to send commands using Binance's WebSocket API (e.g. submitting orders). Very similar to the REST API, but using a persisted WebSocket connection instead of HTTP requests.

- ws-api-client.ts
  - Demonstration of using Binance's WebSocket API in Node.js/JavaScript/TypeScript, using the WebsocketAPIClient.
  - This WebsocketAPIClient is very similar to a REST client, with one method per available command (endpoint) and fully typed requests & responses.
  - Routing is automatically handled via the WebsocketClient, including authentication and connection persistence. Just call the functions you need - the SDK does the rest.
  - From a usage perspective, it feels like a REST API - you can await responses just like a HTTP request.
- ws-api-raw-promises.ts
  - More verbose usage of the WebSocket API using the `sendWSAPIRequest()` method.
  - The `WebsocketAPIClient` uses this method too, so in most cases it is simple to just use the `WebsocketAPIClient` instead.
- ws-userdata-wsapi.ts
  - The listenKey workflow for the user data stream is deprecated (in spot markets).
  - This example demonstrates how to subscribe to the user data stream in spot markets, without a listen key, using the WebSocket API.

##### Misc Workflows

These are miscellaneous examples that cover one or more of the above categories:

- ws-close.ts
  - Closing the (old listen-key driven) user data stream.
  - Unsubscribing from various topics.
- ws-proxy-socks.ts
  - Using WebSockets over a SOCKS proxy.
- deprecated-ws-public.ts


### REST APIs

All examples relating to REST APIs can be found in the [examples/REST](./REST/) folder. Most examples are named around functionality & product group. Any examples with "private" involve API calls relating to your account (such as changing settings or submitting orders, etc),

High level summary for some of the available examples, but check the folder for a complete list:

#### REST USDM Examples

- `rest-future-bracket-order.ts` Creates three order, entry, TP, SL and submit them all at once using `submitMultipleOrders`
- `rest-usdm-order.ts` Creates single entry, using `submitNewOrder`
- `rest-usdm-order-sl.ts` Modify current Stop Loss order(HedgeMode only)
