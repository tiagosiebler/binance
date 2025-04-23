# User Data Streams - Binance

The user data streams are the WebSocket method for asynchronously receiving events when any changes happen on your account. Including but not limited to:
- order events (filled/cancelled/updated/etc)
- position events
- balance events (deposit/withdraw/etc)
- misc events (leverage changed, position mode changed, etc)

## Mechanisms

There are currently two key mechanisms for subscribing to user data events

### Mechanisms - Listen Key

The older and original mechanism involves a listen key. This is requested via the REST API and then used when opening a connection to the user data stream.

The listen key can expire and needs a regular "ping" (a REST API call) to keep it alive.

With the "binance" Node.js & JavaScript SDK, you can easily subscribe to the user data stream via the listen key workflow, through just one function call.

The SDK will automatically:
- fetch a listen key
- perform regular keep alive requests on the listen key
- handle listen key expiry/refresh
- handle reconnects, if a connection is temporarily lost

All you have to do is ask for the user data stream and process incoming events - the SDK will handle the rest!

For a working example, refer to the [ws-userdata-listenkey](./ws-userdata-listenkey.ts) example.

**Deprecation warning: As of April 2025, the listen key workflow is also deprecated for Spot markets (no known ETA for removal).** Refer to the changelog for details: https://developers.binance.com/docs/binance-spot-api-docs/CHANGELOG#2025-04-07

### Mechanisms - WS API User Data Stream

The newer mechanism for the user data stream is via an active WebSocket API connection. This is a simpler mechanism in that it does not require a listen key. You can easily use this new mechanism via the WebsocketClient (or WebsocketAPIClient) within this SDK.

For a working example, refer to the [ws-userdata-wsapi](./ws-userdata-wsapi.ts) example.
