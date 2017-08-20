# Binance
A wrapper for the Binance API.  For more information on the API and parameters for requests visit https://www.binance.com/restapipub.html.

# Usage

```js
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: 'api-key', // Get this from your account on binance.com
    secret: 'api-secret', // Same for this
    timeout: 15000, // Optional, How long to wait for requests to finish before timing out, default is 15000 milliseconds
    disableBeautification: false
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
});

// You can use promises
binanceRest.aggTrades({
        limit: 250  // Object is transformed into a query string
    })
    .then((err, data) => {

    });

// Or you can provide a callback
binanceRest.aggTrades({ limit: 250 }, (err, data) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(data);
        }
});

// WebSocket API
const binanceWS = api.BinanceWS();

binanceWS.onDepthUpdate('BNBBTC', (data) => {
    console.log(data);
});

/*
 * onUserData requires an instance of binanceRest in order to make the necessary startUserDataStream and  
 * keepAliveUserDataStream calls
 */
binanceWS.onUserData(binanceRest, (data) => {
    console.log(data);
});
```

#  REST APIs

[ping](https://www.binance.com/restapipub.html#user-content-test-connectivity)

[time](https://www.binance.com/restapipub.html#user-content-check-server-time)

[depth](https://www.binance.com/restapipub.html#user-content-order-book)

[aggTrades](https://www.binance.com/restapipub.html#user-content-compressedaggregate-trades-list)

[klines](https://www.binance.com/restapipub.html#user-content-klinecandlesticks)

[ticker24hr](https://www.binance.com/restapipub.html#user-content-24hr-ticker-price-change-statistics)

[newOrder](https://www.binance.com/restapipub.html#user-content-new-order--signed)

[testOrder](https://www.binance.com/restapipub.html#user-content-test-new-order-signed)

[queryOrder](https://www.binance.com/restapipub.html#user-content-query-order-signed)

[cancelOrder](https://www.binance.com/restapipub.html#user-content-cancel-order-signed)

[openOrders](https://www.binance.com/restapipub.html#user-content-current-open-orders-signed)

[allOrders](https://www.binance.com/restapipub.html#user-content-all-orders-signed)

[account](https://www.binance.com/restapipub.html#user-content-account-information-signed)

[myTrades](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)

[startUserDataStream](https://www.binance.com/restapipub.html#user-content-start-user-data-stream-api-key)

[keepAliveUserDataStream](https://www.binance.com/restapipub.html#user-content-keepalive-user-data-stream-api-key)

[closeUserDataStream](https://www.binance.com/restapipub.html#user-content-close-user-data-stream-api-key)

# WebSocket APIs

[onDepthUpdate(symbol, eventHandler)](https://www.binance.com/restapipub.html#depth-wss-endpoint)

[onKline(symbol, interval, eventHandler)](https://www.binance.com/restapipub.html#kline-wss-endpoint)

[onAggTrade(symbol, eventHandler)](https://www.binance.com/restapipub.html#trades-wss-endpoint)

[onUserData(binanceRest, eventHandler)](https://www.binance.com/restapipub.html#user-wss-endpoint)

# License
[MIT](LICENSE)