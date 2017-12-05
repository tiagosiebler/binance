# Binance
A wrapper for the Binance REST and WebSocket APIs.  For more information on the API and parameters for requests visit https://www.binance.com/restapipub.html

# Usage/Example

```js
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: 'api-key', // Get this from your account on binance.com
    secret: 'api-secret', // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
});

// You can use promises
binanceRest.allOrders({
        symbol: 'BNBBTC'  // Object is transformed into a query string, timestamp is automatically added
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });

/*
 * Or you can provide a callback.  Also, instead of passing an object as the query, routes
 * that only mandate a symbol, or symbol and timestamp, can be passed a string.
 */
binanceRest.allOrders('BNBBTC', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

/*
 * WebSocket API
 *
 * Each call to onXXXX initiates a new websocket for the specified route, and calls your callback with
 * the payload of each message received.  Each call to onXXXX returns the instance of the websocket
 * client if you want direct access(https://www.npmjs.com/package/ws).
 */
const binanceWS = new api.BinanceWS();

binanceWS.onDepthUpdate('BNBBTC', (data) => {
    console.log(data);
});

binanceWS.onAggTrade('BNBBTC', (data) => {
    console.log(data);
});

binanceWS.onKline('BNBBTC', '1m', (data) => {
    console.log(data);
});

/*
 * onUserData requires an instance of BinanceRest in order to make the necessary startUserDataStream and
 * keepAliveUserDataStream calls.  The webSocket instance is returned by promise rather than directly
 * due to needing to request a listenKey from the server first.
 */
binanceWS.onUserData(binanceRest, (data) => {
        console.log(data);
    }, 60000) // Optional, how often the keep alive should be sent in milliseconds
    .then((ws) => {
        // websocket instance available here
    });
```

# REST APIs

[allPrices([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)

[allBookTickersTi([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)

[ping([callback _function_])](https://www.binance.com/restapipub.html#user-content-test-connectivity)

[time([callback _function_])](https://www.binance.com/restapipub.html#user-content-check-server-time)

[depth(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-order-book)

[aggTrades(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-compressedaggregate-trades-list)

[klines(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-klinecandlesticks)

[ticker24hr(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-24hr-ticker-price-change-statistics)

[newOrder(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-new-order--signed)

[testOrder(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-test-new-order-signed) - If this ends up making a real order it's the API, not this library

[queryOrder(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-query-order-signed)

[cancelOrder(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-cancel-order-signed)

[openOrders(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-current-open-orders-signed)

[allOrders(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-all-orders-signed)

[account(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-information-signed)

[myTrades(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[withdraw(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[withdrawHistory(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[depositHistory(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[depositAddress(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[startUserDataStream([callback _function_])](https://www.binance.com/restapipub.html#user-content-start-user-data-stream-api-key)

[keepAliveUserDataStream(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-keepalive-user-data-stream-api-key)

[closeUserDataStream(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-close-user-data-stream-api-key)

# WebSocket APIs

[onDepthUpdate(symbol, eventHandler)](https://www.binance.com/restapipub.html#depth-wss-endpoint) - Returns the websocket, an instance of https://www.npmjs.com/package/ws

[onKline(symbol, interval, eventHandler)](https://www.binance.com/restapipub.html#kline-wss-endpoint) - Returns the websocket, an instance of https://www.npmjs.com/package/ws

[onAggTrade(symbol, eventHandler)](https://www.binance.com/restapipub.html#trades-wss-endpoint) - Returns the websocket, an instance of https://www.npmjs.com/package/ws

[onUserData(binanceRest, eventHandler, [interval])](https://www.binance.com/restapipub.html#user-wss-endpoint) - Will return the websocket via promise, **interval** defaults to 60000, is the amount of time between calls made to keep the user stream alive, **binanceRest** should be an instance of BinanceRest that will be used to get the listenKey and keep the stream alive

# License
[MIT](LICENSE)