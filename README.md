![npm downloads](https://img.shields.io/npm/dt/binance.svg)
![testing status](https://img.shields.io/travis/aarongarvey/binance.svg)
![code coverage](https://img.shields.io/coveralls/github/aarongarvey/binance.svg)

# Binance
A wrapper for the Binance REST and WebSocket APIs.  Uses both promises and callbacks, and beautifies the
binance API responses that normally use lots of one letter property names. For more information on the API and parameters for requests visit https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md

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

### **[allPrices([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)**

This route appeared on an old API document, but does not appear in the most recent set of docs.  Use at your own risk.

Response
```javascript
[
    {
        symbol: 'ETHBTC',
        price: '0.04789700'
    },{
        symbol: 'LTCBTC',
        price: '0.01885200'
    },
    ...
]
```

### **[allBookTickers([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)**

This route appeared on an old API document, but does not appear in the most recent set of docs.  Use at your own risk.

Response
```javascript
[
    {
        symbol: 'ETHBTC',
        bidPrice: '0.04790000',
        bidQty: '15.00000000',
        askPrice: '0.04801200',
        askQty: '13.86000000'
    },
    {
        symbol: 'LTCBTC',
        bidPrice: '0.01885200',
        bidQty: '3.13000000',
        askPrice: '0.01889000',
        askQty: '0.07000000'
    },
    ...
]
```

### **[ping([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#test-connectivity)**

### **[time([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#check-server-time)**

### **[exchangeInfo([callback _funcion_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#exchange-information)**

### **[depth(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#order-book)**

### **[trades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#recent-trades-list)**

### **[historicalTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data)**

### **[aggTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#compressedaggregate-trades-list)**

Response
```javascript
[
    {
        aggTradeId: 7891757,
        price: '0.04840900',
        quantity: '0.02800000',
        firstTradeId: 8516629,
        lastTradeId: 8516629,
        timestamp: 1513801086350,
        maker: false,
        bestPriceMatch: true
    },
    {
        aggTradeId: 7891758,
        price: '0.04841100',
        quantity: '0.10600000',
        firstTradeId: 8516630,
        lastTradeId: 8516630,
        timestamp: 1513801086350,
        maker: false,
        bestPriceMatch: true
    },
    ...
]
```

### **[klines(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#klinecandlestick-data)**

Response
```javascript
[
    {
        openTime: 1513802580000,
        open: '0.04837200',
        high: '0.04859200',
        low: '0.04837000',
        close: '0.04837100',
        volume: '181.69100000',
        closeTime: 1513802639999,
        quoteAssetVolume: '8.79608770',
        trades: 249,
        takerBaseAssetVolume: '75.74200000',
        takerQuoteAssetVolume: '3.67104146',
        ignored: '0'
    },
    {
        openTime: 1513802640000,
        open: '0.04837100',
        high: '0.04850100',
        low: '0.04837000',
        close: '0.04837200',
        volume: '93.56300000',
        closeTime: 1513802699999,
        quoteAssetVolume: '4.53177905',
        trades: 149,
        takerBaseAssetVolume: '20.14700000',
        takerQuoteAssetVolume: '0.97561723',
        ignored: '0'
    },
    ...
]
```

### **[ticker24hr(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#24hr-ticker-price-change-statistics)**

### **[tickerPrice(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-price-ticker)**

### **[bookTicker(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-order-book-ticker)**

### **[newOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#new-order--trade)**

### **[testOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#test-new-order-trade)**

### **[queryOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#query-order-user_data)**

### **[cancelOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#cancel-order-trade)**

### **[openOrders(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#current-open-orders-user_data)**

### **[allOrders(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#all-orders-user_data)**

### **[account([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data)**

### **[myTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data)**

### **[withdraw(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#withdraw)**

### **[withdrawHistory(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#withdraw-history-user_data)**

### **[depositHistory(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#deposit-history-user_data)**

### **[depositAddress(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#deposit-address-user_data)**

### **[accountStatus([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#account-status-user_data)**

### **[startUserDataStream([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#start-user-data-stream-user_stream)**

### **[keepAliveUserDataStream(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#keepalive-user-data-stream-user_stream)**

### **[closeUserDataStream(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#close-user-data-stream-user_stream)**

# WebSocket APIs

### **[onDepthUpdate(symbol, eventHandler)](https://www.binance.com/restapipub.html#depth-wss-endpoint)**

Function call returns the websocket, an instance of https://www.npmjs.com/package/ws

Response
```javascript
{
    eventType: 'depthUpdate',
    eventTime: 1513807798461,
    symbol: 'BNBBTC',
    U: 17962354,
    updateId: 17962357, // syncs with updateId on depth route
    bidDepthDelta: [
        {
            price: '0.00031239',
            quantity: '0.00000000', //quantity of 0 means remove it
            ignored: []
        },
        ...
    ],
    askDepthDelta: [
        {
            price: '0.00031388',
            quantity: '0.00000000',
            ignored: []
        },
        ...
    ]
}
```

### **[onKline(symbol, interval, eventHandler)](https://www.binance.com/restapipub.html#kline-wss-endpoint)**

Returns the websocket, an instance of https://www.npmjs.com/package/ws

Response
```javascript
{
    eventType: 'kline',
    eventTime: 1513808234049,
    symbol: 'ETHBTC',
    kline:
    {
        startTime: 1513808220000,
        endTime: 1513808279999,
        symbol: 'ETHBTC',
        interval: '1m',
        firstTradeId: 8542266,
        lastTradeId: 8542357,
        open: '0.04854000',
        close: '0.04865100',
        high: '0.04865200',
        low: '0.04854000',
        volume: '53.30600000',
        trades: 92,
        final: false,
        quoteVolume: '2.59145375',
        volumeActive: '41.01100000',
        quoteVolumeActive: '1.99422739',
        ignored: '0'
    }
}
```

### **[onAggTrade(symbol, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#aggregate-trade-streams)**

Returns the websocket, an instance of https://www.npmjs.com/package/ws

Beautified Response
```javascript
{
    eventType: 'aggTrade',
    eventTime: 1513808427335,
    symbol: 'ETHBTC',
    tradeId: 7915993,
    price: '0.04858100',
    quantity: '0.06100000',
    firstTradeId: 8543066,
    lastTradeId: 8543066,
    time: 1513808427329,
    maker: false,
    ignored: true
}
```

### **[onUserData(binanceRest, eventHandler, [interval])](https://www.binance.com/restapipub.html#user-wss-endpoint)**

Will return the websocket via promise, **interval** defaults to 60000, is the amount of time between calls made to keep the user stream alive, **binanceRest** should be an instance of BinanceRest that will be used to get the listenKey and keep the stream alive

Responses
```javascript
{
    eventType: 'executionReport',
    eventTime: 1513808673916,
    symbol: 'IOTABTC',
    newClientOrderId: '81gmMRozYdU73D27Ho1W1K',
    side: 'SELL',
    orderType: 'LIMIT',
    cancelType: 'GTC',
    quantity: '10.00000000',
    price: '0.00030120',
    P: '0.00000000',
    F: '0.00000000',
    g: -1,
    C: 'null',
    executionType: 'TRADE',
    orderStatus: 'FILLED',
    rejectReason: 'NONE',
    orderId: 9409314,
    lastTradeQuantity: '10.00000000',
    accumulatedQuantity: '10.00000000',
    lastTradePrice: '0.00030120',
    commission: '0.00000301',
    commissionAsset: 'BTC',
    tradeTime: 1513808673912,
    tradeId: 3023119,
    I: 21799081,
    w: false,
    maker: true,
    M: true
}
```
```javascript
{
    eventType: 'outboundAccountInfo',
    eventTime: 1513808673916,
    makerCommission: 10,
    takerCommission: 10,
    buyerCommission: 0,
    sellerCommission: 0,
    canTrade: true,
    canWithdraw: true,
    canDeposit: true,
    balances: [
        {
            asset: 'BTC',
            availableBalance: '0.00301025',
            onOrderBalance: '0.00000000'
        },
        ...
    ]
}
```

# License
[MIT](LICENSE)