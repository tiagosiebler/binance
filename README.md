![npm downloads](https://img.shields.io/npm/dt/binance.svg)
![testing status](https://img.shields.io/travis/aarongarvey/binance.svg)
![code coverage](https://img.shields.io/coveralls/github/aarongarvey/binance.svg)

# Binance
A wrapper for the Binance REST and WebSocket APIs.  Uses both promises and callbacks, and beautifies the
binance API responses that normally use lots of one letter property names. For more information on the API and parameters for requests visit https://www.binance.com/restapipub.html

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

### **[ping([callback _function_])](https://www.binance.com/restapipub.html#user-content-test-connectivity)**

Response
```javascript
{}
```

### **[time([callback _function_])](https://www.binance.com/restapipub.html#user-content-check-server-time)**

Response
```javascript
{ serverTime: 1513800453289 }
```

### **[depth(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-order-book)**

Query Parameters

| Name               | Type    | Details                    |
|--------------------|---------|----------------------------|
| symbol             | string  |                            |
| limit *(optional)* | integer | Default and maximum of 100 |

Response
```javascript
{
    lastUpdateId: 52347642,
    bids: [
        [
            '0.04838500', // Price
            '0.18400000', // Quantity
            [] // Ignored
        ],
        ...
    ],
    asks: [
        [
            '0.04843900',
            '10.73400000',
            []
        ],
        ...
    ]
}
```

### **[aggTrades(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-compressedaggregate-trades-list)**

Query Parameters

| Name                   | Type    | Details                                                           |
|------------------------|---------|-------------------------------------------------------------------|
| symbol                 | string  |                                                                   |
| fromId *(optional)*    | long    | include to retrieve trades with ID >= fromId                      |
| startTime *(optional)* | long    | Timestamp in ms, include to retrieve trade.timestamp >= startTime |
| endTime *(optional)*   | long    | Timestamp in ms, include to retrieve trade.timestamp <= endTime   |
| limit *(optional)*     | integer | Default and maximum of 500                                        |

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

### **[klines(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-klinecandlesticks)**

Query Parameters


| Name                   | Type    | Description                                                            |
|------------------------|---------|------------------------------------------------------------------------|
| symbol                 | string  |                                                                        |
| interval               | string  | Options: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M |
| startTime *(optional)* | long    | Timestamp in ms                                                        |
| endTime *(optional)*   | long    | Timestamp in ms                                                        |
| limit *(optional)*     | integer | Default and maximum of 500                                             |

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

### **[ticker24hr(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-24hr-ticker-price-change-statistics)**

Query Parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| symbol | string |             |

Response
```javascript
{
    symbol: 'ETHBTC',
    priceChange: '0.00177600',
    priceChangePercent: '3.809',
    weightedAvgPrice: '0.04668755',
    prevClosePrice: '0.04662400',
    lastPrice: '0.04840000',
    lastQty: '4.91500000',
    bidPrice: '0.04831400',
    bidQty: '0.76500000',
    askPrice: '0.04844200',
    askQty: '7.13800000',
    openPrice: '0.04662400',
    highPrice: '0.04900000',
    lowPrice: '0.04400000',
    volume: '306627.07000000',
    quoteVolume: '14315.66748465',
    openTime: 1513716659596,
    closeTime: 1513803059596,
    firstId: 8168545,
    lastId: 8523993,
    count: 355449
}
```
</details>

### **[newOrder(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-new-order--signed)**

Query Parameters

| Name                          | Type    | Description                                                        |
|-------------------------------|---------|--------------------------------------------------------------------|
| symbol                        | string  |                                                                    |
| side                          | enum    | BUY, SELL                                                          |
| type                          | enum    | LIMIT, MARKET                                                      |
| timeInForce                   | enum    | GTC, IOC (Good till cancelled, Immediate or Cancel)                |
| quantity                      | decimal |                                                                    |
| price                         | decimal |                                                                    |
| newClientOrderId *(optional)* | string  | A unique id for the order, will be generated if not sent           |
| stopPrice *(optional)*        | decimal | Used with stop orders                                              |
| icebergQty *(optional)*       | decimal | Used with iceberg orders                                           |

Response
```javascript
{
    "symbol": "LTCBTC",
    "orderId": 1,
    "clientOrderId": "myOrder1",
    "transactTime": 1499827319559
}
```

### **[testOrder(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-test-new-order-signed)**

Query Parameters

| Name                          | Type    | Description                                                        |
|-------------------------------|---------|--------------------------------------------------------------------|
| symbol                        | string  |                                                                    |
| side                          | enum    | BUY, SELL                                                          |
| type                          | enum    | LIMIT, MARKET                                                      |
| timeInForce                   | enum    | GTC, IOC (Good till cancelled, Immediate or Cancel)                |
| quantity                      | decimal |                                                                    |
| price                         | decimal |                                                                    |
| newClientOrderId *(optional)* | string  | A unique id for the order, will be generated if not sent           |
| stopPrice *(optional)*        | decimal | Used with stop orders                                              |
| icebergQty *(optional)*       | decimal | Used with iceberg orders                                           |

Response
```javascript
{}
```

### **[queryOrder(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-query-order-signed)**

Query Parameters

| Name                           | Type   | Description                                                        |
|--------------------------------|--------|--------------------------------------------------------------------|
| symbol                         | string |                                                                    |
| orderId *(optional)*           | long   | If not present, origClientOrderId must be sent                     |
| origClientOrderId *(optional)* | string | If not present, orderId must be sent                               |

Response
```javascript
{
    "symbol": "LTCBTC",
    "orderId": 1,
    "clientOrderId": "myOrder1",
    "price": "0.1",
    "origQty": "1.0",
    "executedQty": "0.0",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.0",
    "icebergQty": "0.0",
    "time": 1499827319559
}
```

### **[cancelOrder(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-cancel-order-signed)**

Query Parameters

| Name                           | Type   | Description                                                 |
|--------------------------------|--------|-------------------------------------------------------------|
| symbol                         | string |                                                             |
| orderId *(optional)*           | long   | If not present, origClientOrderId must be sent              |
| origClientOrderId *(optional)* | string | If not present, orderId must be sent                        |
| newClientOrderId *(optional)*  | string | Used to uniquely identify this cancel, generated by default |

Response
```javascript
{
    "symbol": "LTCBTC",
    "origClientOrderId": "myOrder1",
    "orderId": 1,
    "clientOrderId": "cancelMyOrder1"
}
```

### **[openOrders(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-current-open-orders-signed)**

Query Parameters

| Name                           | Type   | Description |
|--------------------------------|--------|-------------|
| symbol                         | string |             |

Response
```javascript
[
    {
        "symbol": "LTCBTC",
        "orderId": 1,
        "clientOrderId": "myOrder1",
        "price": "0.1",
        "origQty": "1.0",
        "executedQty": "0.0",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "BUY",
        "stopPrice": "0.0",
        "icebergQty": "0.0",
        "time": 1499827319559
    },
    ...
]
```

### **[allOrders(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-all-orders-signed)**

Query Parameters

| Name                 | Type    | Description                                                                    |
|----------------------|---------|--------------------------------------------------------------------------------|
| symbol               | string  |                                                                                |
| orderId *(optional)* | long    | If set, retrieve orders with ID >= orderId, otherwise most recent are returned |
| limit *(optional)*   | integer | Default and maximum of 500                                                     |

Response
```javascript
[
    {
        "symbol": "LTCBTC",
        "orderId": 1,
        "clientOrderId": "myOrder1",
        "price": "0.1",
        "origQty": "1.0",
        "executedQty": "0.0",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "BUY",
        "stopPrice": "0.0",
        "icebergQty": "0.0",
        "time": 1499827319559
    },
    ...
]
```

### **[account(query _object_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-information-signed)**

Response
```javascript
{
    "makerCommission": 15,
    "takerCommission": 15,
    "buyerCommission": 0,
    "sellerCommission": 0,
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "updateTime": 1502765854332,
    "balances": [
        {
            "asset": "BTC",
            "free": "4723846.89208129",
            "locked": "0.00000000"
        },
        ...
    ]
}
```

### **[myTrades(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)**

Query Parameters

| Name                | Type    | Description                                                     |
|---------------------|---------|-----------------------------------------------------------------|
| symbol              | string  |                                                                 |
| fromId *(optional)* | long    | TradeId to fetch from.  Retrieves most recent trades by default |
| limit *(optional)*  | integer | Default and maximum of 500                                      |

Response
```javascript
[
    {
        id: 1068299,
        orderId: 5496403,
        price: '0.00050431',
        qty: '30.00000000',
        commission: '0.00001513',
        commissionAsset: 'BTC',
        time: 1513275761857,
        isBuyer: false,
        isMaker: false,
        isBestMatch: true
    },
    ...
]
```

### **[withdraw(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)**

Query Parameters

| Name                    | Type    | Description                                                  |
|-------------------------|---------|--------------------------------------------------------------|
| asset                   | string  |                                                              |
| address                 | string  |                                                              |
| addressTag *(optional)* | string  | Secondary address identifier for coins like XRP, XMR, etc... |
| amount                  | decimal |                                                              |
| name *(optional)*       | string  | Description of the address                                   |

Response
```javascript
{
    "msg": "success",
    "success": true,
    "id": "7213fea8e94b4a5593d507237e5a555b"
}
```

### **[withdrawHistory(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)**

Query Parameters

| Name                   | Type    | Description                                                                                                               |
|------------------------|---------|---------------------------------------------------------------------------------------------------------------------------|
| asset *(optional)*     | string  |                                                                                                                           |
| status *(optional)*    | integer | { 0: 'Email Sent', 1: 'Cancelled', 2: 'Awaiting Approval', 3: 'Rejected', 4: 'Processing', 5: 'Failure', 6: 'Completed' } |
| startTime *(optional)* | long    | Timestamp in ms                                                                                                           |
| endTime *(optional)*   | long    | Timestamp in ms                                                                                                           |

Response
```javascript
{
    "withdrawList": [
        {
            "id": "7213fea8e94b4a5593d507237e5a555b"
            "amount": 1,
            "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
            "asset": "ETH",
            "txId": "0xdf33b22bdb2b28b1f75ccd201a4a4m6e7g83jy5fc5d5a9d1340961598cfcb0a1",
            "applyTime": 1508198532000,
            "status": 4
        },
        ...
    ],
    "success": true
}
```

### **[depositHistory(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)**

Query Parameters

| Name                   | Type    | Description                    |
|------------------------|---------|--------------------------------|
| asset *(optional)*     | string  |                                |
| status *(optional)*    | integer | { 0: 'Pending', 1: 'Success' } |
| startTime *(optional)* | long    | Timestamp in ms                |
| endTime *(optional)*   | long    | Timestamp in ms                |

Response
```javascript
{
    "depositList": [
        {
            "insertTime": 1508298532000,
            "amount": 1000,
            "asset": "XMR",
            "address": "463tWEBn5XZJSxLU34r6g7h8jtxuNcDbjLSjkn3XAXHCbLrTTErJrBWYgHJQyrCwkNgYvyV3z8zctJLPCZy24jvb3NiTcTJ",
            "addressTag": "342341222",
            "txId": "b3c6219639c8ae3f9cf010cdc24fw7f7yt8j1e063f9b4bd1a05cb44c4b6e2509",
            "status": 1
        },
        ...
    ],
    "success": true
}
```

### **[depositAddress(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-account-trade-list-signed)**

Query Parameters

| Name                    | Type    | Description |
|-------------------------|---------|-------------|
| asset                   | string  |             |

Response
```javascript
{
    "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
    "success": true,
    "addressTag": "1231212",
    "asset": "BNB"
}
```

### **[startUserDataStream([callback _function_])](https://www.binance.com/restapipub.html#user-content-start-user-data-stream-api-key)**

Response
```javascript
{ "listenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1" }
```

### **[keepAliveUserDataStream(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-keepalive-user-data-stream-api-key)**

Response
```javascript
{}
```

### **[closeUserDataStream(query _object|string_, [callback _function_])](https://www.binance.com/restapipub.html#user-content-close-user-data-stream-api-key)**

Response
```javascript
{}
```

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

### **[onAggTrade(symbol, eventHandler)](https://www.binance.com/restapipub.html#trades-wss-endpoint)**

Returns the websocket, an instance of https://www.npmjs.com/package/ws

Response
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