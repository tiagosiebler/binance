![npm downloads](https://img.shields.io/npm/dt/binance.svg)
![testing status](https://img.shields.io/travis/aarongarvey/binance.svg)
![code coverage](https://img.shields.io/coveralls/github/aarongarvey/binance.svg)

# Binance
A wrapper for the Binance REST and WebSocket APIs.  Uses both promises and callbacks, and beautifies the
binance API responses that normally use lots of one letter property names. For more information on the API and parameters for requests visit https://github.com/binance-exchange/binance-official-api-docs

# Usage/Example

```js
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: 'api-key', // Get this from your account on binance.com
    secret: 'api-secret', // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
    handleDrift: false
    /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
     * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
     * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
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
const binanceWS = new api.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true

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
 * You can use one websocket for multiple streams.  There are also helpers for the stream names, but the
 * documentation has all of the stream names should you want to specify them explicitly.
 */
const streams = binanceWS.streams;

binanceWS.onCombinedStream([
        streams.depth('BNBBTC'),
        streams.kline('BNBBTC', '5m'),
        streams.trade('BNBBTC'),
        streams.ticker('BNBBTC')
    ],
    (streamEvent) => {
        switch(streamEvent.stream) {
            case streams.depth('BNBBTC'):
                console.log('Depth event, update order book\n', streamEvent.data);
                break;
            case streams.kline('BNBBTC', '5m'):
                console.log('Kline event, update 5m candle display\n', streamEvent.data);
                break;
            case streams.trade('BNBBTC'):
                console.log('Trade event, update trade history\n', streamEvent.data);
                break;
            case streams.ticker('BNBBTC'):
                console.log('Ticker event, update market stats\n', streamEvent.data);
                break;
        }
    }
);

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

Example responses are only included for routes where the response is beautified, and therefore different than the official docs.  Click on any function call to see the related route information in the official documentation.

### **[ping([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#test-connectivity)**
For testing connectivity.

### **[time([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#check-server-time)**
Retrieves the current server time.

### **[exchangeInfo([callback _funcion_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#exchange-information)**
Retrieves the current exchange trading rules and symbol information.  Includes rate limits for request and orders,
as well as restrictions placed on various values when ordering.

### **[depth(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#order-book)**
Retrieves the order book for a given symbol.

### **[trades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#recent-trades-list)**
Retrieves the most recent trades for a given symbol(up to 500).

### **[historicalTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data)**
Retrieves historical trades by tradeId.  If no tradeId is specified the most recent trades are returned.

### **[aggTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#compressedaggregate-trades-list)**
Get compressed, aggregate trades. Trades that fill at the same time, from the same order, with the same price will have the quantity aggregated.

Beautified Response
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
Retrieve kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.

Beautified Response
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
Retrieve 24 hour price change statistics.

### **[tickerPrice(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-price-ticker)**
Retrieve latest price for a symbol or symbols.

### **[bookTicker(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-order-book-ticker)**
Retrieve best price/qty on the order book for a symbol or symbols.

### **[newOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#new-order--trade)**
Places a new order.

### **[testOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#test-new-order-trade)**
Places a test order.

### **[queryOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#query-order-user_data)**
Check an order's status.

### **[cancelOrder(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#cancel-order-trade)**
Cancel an open order.

### **[openOrders(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#current-open-orders-user_data)**
Get all open orders for a symbol, or all symbols. Careful when accessing this with no symbol as the number of requests counted against the rate limiter is equal to the number of symbols currently trading on the exchange.

### **[allOrders(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#all-orders-user_data)**
Retrieve all orders on an account, whether active, cancelled, or filled.

### **[account([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data)**
Retrieve current account information including commision rates, trading permissions, and free/locked balances.

### **[myTrades(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data)**
Retrieve all trades made by an account.

### **[withdraw(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#withdraw)**
Make a withdrawal.

### **[withdrawHistory(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#withdraw-history-user_data)**
Retrieve withdrawal history for an account for a specific asset, or all assets.  Includes status.

### **[depositHistory(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#deposit-history-user_data)**
Retrieve deposit history for an account for a specific asset, or all assets.  Includes status.

### **[depositAddress(query _object|string_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#deposit-address-user_data)**
Generate and retrieve a deposit address for a given asset.

### **[accountStatus([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/wapi-api.md#account-status-user_data)**
Retrieve account status.

### **[startUserDataStream([callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#start-user-data-stream-user_stream)**
For use in conjunction with the user data websocket.  Returns a listen key that must be specified.   [`onUserData()`](#onuserdatabinancerest-eventhandler-interval) will handle this for you when you pass it an instance of `BinanceRest`.

### **[keepAliveUserDataStream(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#keepalive-user-data-stream-user_stream)**
The keep alive request needed to keep a user data websocket open.  Will be automatically sent at a specified interval if using
[`onUserData()`](#onuserdatabinancerest-eventhandler-interval).

### **[closeUserDataStream(query _object_, [callback _function_])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#close-user-data-stream-user_stream)**
Closes the user data stream.

### **[allPrices([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)**
Returns the latest price for all symbols.  This route appears on the old API document, but does not appear in the most recent set of docs.  You should probably use `tickerPrice()` instead as it utilizes a route with a newer version.

### **[allBookTickers([callback _function_])](https://www.binance.com/restapipub.html#user-content-market-data-endpoints)**
Returns the best price/qty on the order book for all symbols.  This route appears on an old API document, but does not appear in the most recent set of docs.  You should probably use `bookTicker()` instead as it utilizes a route with a newer version.

# WebSocket APIs

### **[onDepthUpdate(symbol, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#diff-depth-stream)**

Order book price and quantity depth updates used to locally manage an order book, pushed every second.  Function call returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *\<symbol\>@depth*

Response
```javascript
{
    eventType: 'depthUpdate',
    eventTime: 1513807798461,
    symbol: 'BNBBTC',
    firstUpdateId: 17962354,
    lastUpdateId: 17962357, // syncs with updateId on depth route
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

### **[onDepthLevelUpdate(symbol, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#partial-book-depth-streams)**

Top \<levels\> bids and asks, pushed every second. Valid \<levels\> are 5, 10, or 20.  Function call returns the websocket, an instance of https://www.npmjs.com/package/ws.  See official docs for [response](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#partial-book-depth-streams).

Stream Name: *\<symbol\>@depth\<levels\>*

### **[onKline(symbol, interval, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#klinecandlestick-streams)**

Pushes updates to the current klines/candlesticks every second.  Valid intervals are described [here](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#klinecandlestick-streams).  Returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *\<symbol\>@kline_\<interval\>*

Beautified Response
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

Pushes trade information that is aggregated for a single taker order.  Returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *\<symbol\>@aggTrade*

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

### **[onTrade(symbol, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#trade-streams)**

Pushes raw trade information, with each trade having a unique buyer and seller.  Returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *\<symbol\>@trade*

Beautified Response
```javascript
{
    eventType: 'trade',
    eventTime: 1515266751986,
    symbol: 'BNBBTC',
    tradeId: 4684001,
    price: '0.00121490',
    quantity: '25.00000000',
    buyerOrderId: 14860825,
    sellerOrderId: 14860815,
    time: 1515266751974,
    maker: false,
    ignored: true
}
```

### **[onTicker(symbol, eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#individual-symbol-ticker-streams)**

24 hour ticker stats for a single symbol pushed every second.  Returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *\<symbol\>@ticker*

Beautified Response
```javascript
{ 
    eventType: '24hrTicker',
    eventTime: 1515266555314,
    symbol: 'BNBBTC',
    priceChange: '0.00036700',
    priceChangePercent: '44.111',
    weightedAveragePrice: '0.00102603',
    previousClose: '0.00083200',
    currentClose: '0.00119900',
    closeQuantity: '256.06000000',
    bestBid: '0.00119900',
    bestBidQuantity: '479.82000000',
    bestAskPrice: '0.00120000',
    bestAskQuantity: '93.56000000',
    open: '0.00083200',
    high: '0.00134950',
    low: '0.00080000',
    baseAssetVolume: '18940498.53000000',
    quoteAssetVolume: '19433.56011157',
    openTime: 1515180155234,
    closeTime: 1515266555234,
    firstTradeId: 4399671,
    lastTradeId: 4682727,
    trades: 283057
}
```

### **[onAllTickers(eventHandler)](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#all-market-tickers-stream)**

24hr Ticker statistics for all symbols in an array, pushed every second.  Returns the websocket, an instance of https://www.npmjs.com/package/ws

Stream Name: *!ticker@arr*

Beautified Response
```javascript
{ 
    eventType: '24hrTicker',
    eventTime: 1515266555314,
    symbol: 'BNBBTC',
    priceChange: '0.00036700',
    priceChangePercent: '44.111',
    weightedAveragePrice: '0.00102603',
    previousClose: '0.00083200',
    currentClose: '0.00119900',
    closeQuantity: '256.06000000',
    bestBid: '0.00119900',
    bestBidQuantity: '479.82000000',
    bestAskPrice: '0.00120000',
    bestAskQuantity: '93.56000000',
    open: '0.00083200',
    high: '0.00134950',
    low: '0.00080000',
    baseAssetVolume: '18940498.53000000',
    quoteAssetVolume: '19433.56011157',
    openTime: 1515180155234,
    closeTime: 1515266555234,
    firstTradeId: 4399671,
    lastTradeId: 4682727,
    trades: 283057
}
```

### **onCombinedStream(streams, eventHandler)**

*streams* should be an array of stream names.  You may specify these explicitly, or you can use some helper functions to generate them:

```javascript
const binanceWS = new api.BinanceWS();
const streams = binanceWS.streams;

binanceWS.onCombinedStream(
    [
        streams.depth('BNBBTC'),
        streams.depthLevel('BNBBTC', 5),
        streams.kline('BNBBTC', '5m'),
        streams.aggTrade('BNBBTC'),
        streams.trade('BNBBTC'),
        streams.ticker('BNBBTC'),
        streams.allTickers()
    ],
    (streamEvent) => {
        switch(streamEvent.stream) {
            case streams.depth('BNBBTC'):
                console.log('Depth Event', streamEvent.data);
                break;
            case streams.depthLevel('BNBBTC', 5):
                console.log('Depth Level Event', streamEvent.data);
                break;
            case streams.kline('BNBBTC', '5m'):
                console.log('Kline Event', streamEvent.data);
                break;
            case streams.aggTrade('BNBBTC'):
                console.log('AggTrade Event', streamEvent.data);
                break;
            case streams.trade('BNBBTC'):
                console.log('Trade Event', streamEvent.data);
                break;
            case streams.ticker('BNBBTC'):
                console.log('BNBBTC Ticker Event', streamEvent.data);
                break;
            case streams.allTickers():
                console.log('Ticker Event', streamEvent.data);
                break;
        }
    }
);
```

### **[onUserData(binanceRest, eventHandler, [interval])](https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md#user-data-streams-for-binance-2017-12-01)**

Will return the websocket via promise, `interval` defaults to 60000(ms), and is the amount of time between calls made to keep the user stream alive. `binanceRest` should be an instance of `BinanceRest` that will be used to get the `listenKey` and keep the stream alive.

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
    stopPrice: '0.00000000',
    icebergQuantity: '0.00000000',
    g: -1, // to be ignored
    originalClientOrderId: 'null',
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
    I: 21799081, // ignore
    w: false, // ignore
    maker: true
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
    lastUpdateTime: 1499405658848,
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

# Timestamp errors

Most can be resolved by adjusting your `recvWindow` a bit larger, but if your clock is constantly
or intermittently going out of sync with the server, the library is capable of calculating the
drift and adjusting the timestamps.  You have some options.  The first is to add the `handleDrift`
option to the constructor, setting it to `true`.  In this case, if your clock is ahead of the
server's, or falls behind and is outside the `recvWindow`, and a request fails, the library will
calculate the drift of your clock and reattempt the request.  It will also use the drift value to
adjust all subsequent calls.  This may add more time to the initial requests that fail, and could
potentially affect highly time sensitive trades.  The alternative is to use the
`startTimeSync(interval_in_ms)` and `endTimeSync` functions.  The former will begin an interval,
and each time it's called the drift will be calculated and used on all subsequent requests.  The
default interval is 5 minutes, and it should be specified in milliseconds.  The latter will clear
the interval.  You may also calculate the drift manually by calling `calculateDrift()`. The
resulting value will be stored internally and used on all subsequent calls.

# License
[MIT](LICENSE)