# Binance API

## 2.0.14
- Update values thrown by exception parser.

## 2.0.13
- Expose time sync offset getter/setter in base client. `getTimeOffset()/setTimeOffest(value)`.
- Add handler to signMessage method, falling back to browser equivalent if method is not a function (react/preact/#141).

## 2.0.12
- Increase default timeout for websocket pong heartbeats to 7500ms.

## 2.0.11
- Fix APIs that use the DELETE method.

## 2.0.9-10
- Fix typo in websocket types.
- Fix missing type properties for ws messages.

## 2.0.8
- Emit `reconnected` events for reconnected user data stream.

## 2.0.6
- Fix symbol & margin asset types for futures user data updated position event.

## 2.0.5
- Refine types for user data websocket events (futures)

## 2.0.4
- Disable 'silly' logger category by default to reduce ping/pong noise.
- Expand ws support to other API categories.
- Expand beautifier support for other WS messages.

## 2.0.3
- Expand main-client APIs.
- Expand usdm-client APIs.

## 2.0.2
- Fix getAccountInformation main endpoint.
- Fix a few missing APIs.
- Refactor SpotClient->MainClient. SpotClient will be deprecated in future (MainClient is the same, just a different name).
- Fix build errors from incorrect module imports.

## 2.0.0

- Introduction for typescript with strong types on most request parameters & responses.
  - NPM package includes transpiled framework & type declarations.
  - Supports both typescript and vanilla node.js projects.
  - REST requests and responses include detailed types, though some may still be missing.
  - Raw and beautified WS events include detailed types, though some may still be missing.
- Introduction for webpack.
  - To generate a browser bundle clone & build the library then run webpack using `npm run pack`.
- Introduction for integration tests via jest on all REST clients.
  - Tests are executed automatically to avoid unintended breaking changes on release.
  - Real API calls are made to validate integration.
- Complete networking overhaul using [axios](https://github.com/axios/axios).
  - Small & modern framework. Significant reduction in dependencies via deprecation of `request`.
  - Support for proxies and [other axios-supported functionality](https://github.com/axios/axios#request-config).
  - Support for backend (node) and frontend (browser) requests.
- Complete overhaul in websockets client.
  - Websocket events are still (optionally) beautified consistently with how the previous library worked.
  - New event-driven architecture.
  - Support for USDM Futures. More to come in a future release.
  - Automatic connection monitoring, with automatic reconnect if the connection goes stale.
  - Automatic userData connection monitoring, with automatic refresh and respawn if previous listen key expires or the connection closes unexpectedly.
- Complete overhaul in REST client.
  - Revamped spot client (see [spot-client](./src/spot-client.ts)).
  - Introduction of [usdm-client](./src/usdm-client.ts) for USDM Futures.
- Passive tracking & storage of API limit states (IP request weight & order weight).
  - Parsed automatically via response headers when any request is made, if header is detected.
  - See `getRateLimitStates()` to query the last seen weights on any of the REST clients.
- Smarter time-sync to handle common recvWindow latency issues (optional, default on).

### 2.0.0-beta.4

- Breaking change: refactor most options to camel case (instead of underscore separation).
- Add optional beautifier support for REST responses (parses known numbers stored as strings into numbers).

### 2.0.0-beta.5-8

- Breaking change: refactor spot getAllCoinsInformation to getBalances().
- Fix POST request format to www-form-urlencoded.

<!-- ## 2.0.1 -->
  <!-- - Introduction of [coinm-client](./src/coinm-client.ts) for COINM Futures. -->
  <!-- - Introduction of [vanilla-client](./src/vanilla-client.ts) for Vanilla Options. -->
