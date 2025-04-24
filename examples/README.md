# Binance API - Examples

This folder contains ready to go examples demonstrating various aspects of this API implementation, written in TypeScript (but they are compatible with pure JavaScript projects).

Found something difficult to implement? Contribute to these examples and help others!

## Getting started

- Clone the project (or download it as a zip, or install the module in your own project `npm install binance`).
- Edit the sample as needed (some samples require edits, e.g API keys or import statements).
- Execute the sample using tsx: `tsx examples/REST/rest-spot-public.ts`.

Samples that API credentials using `process.env.API_KEY_COM` can be spawned with environment variables. Unix/macOS example:
```
APIKEY="apikeypastedhere" APISECRET="apisecretpastedhere" tsx examples/WebSockets/ws-userdata-listenkey.ts
```

### WebSockets

All examples relating to WebSockets can be found in the [examples/WebSockets](./WebSockets/) folder. High level summary of available examples:

#### Consumers

These are purely for receiving data from Binance's WebSockets (market data, account updates, etc).

##### Market Data
- ws-public.ts
  - Demonstration on general usage of the WebSocket client to subscribe to / unsubscribe from one or more market data topics.
- ws-public-spot-orderbook.ts
-	ws-public-spot-trades.ts

##### Account Data

- ws-close.ts
- ws-unsubscribe.ts
- ws-proxy-socks.ts
- ws-public-usdm-funding.ts
- ws-userdata-testnet.ts
-	ws-userdata-listenkey.ts
- ws-userdata-connection-safety.ts
- ws-userdata-wsapi.ts
- ws-api-client.ts
- ws-api-raw-promises.ts
- deprecated-ws-public.ts

## REST USDM Examples

- `rest-future-bracket-order.ts` Creates three order, entry, TP, SL and submit them all at once using `submitMultipleOrders`
- `rest-usdm-order.ts` Creates single entry, using `submitNewOrder`
- `rest-usdm-order-sl.ts` Modify current Stop Loss order(HedgeMode only)
