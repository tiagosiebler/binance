const expect = require('chai').expect;
const mockRequest = require('./mock-api.js');
const mock = require('mock-require');

mock('request', mockRequest);

const binanceApi = require('../lib/binance.js');
const BinanceRest = binanceApi.BinanceRest;
const BinanceWS = binanceApi.BinanceWS;

describe("BinanceRest", () => {
    let binance;

    beforeEach(() => {
        binance = new BinanceRest({
            key: 'super_secret_api_key',
            secret: 'super_secret_secret',
            recvWindow: 10000,
            timeout: 30000
        });
    });

    afterEach(() => {
        mockRequest.clearHandlers();
    });

    it('allows using callbacks', () => {
        mockRequest.setHandler('ping', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/ping'
            });
            callback(null, {
                statusCode: 200
            }, '{}');
        });
        return binance.ping()
            .then((response) => {
                expect(response).to.be.an('object').that.is.empty;
            });
    });

    it('calls reject on the promise if the status code returned is not 2xx', () => {
        mockRequest.setHandler('depth', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/depth?symbol=TEST'
            });
            callback(null, {
                statusCode: 400
            }, '{"code":-1121,"msg":"Invalid symbol."}');
        });
        return binance.depth('TEST')
            .then((response) => {
                throw new Error('Request should not have been successful');
            })
            .catch((err) => {
                expect(err).to.deep.equal({
                    code: -1121,
                    msg: 'Invalid symbol.'
                });
            });
    });

    it('returns an error to the callback if the status code returned is not 2xx', (done) => {
        mockRequest.setHandler('depth', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/depth?symbol=TEST'
            });
            callback(null, {
                statusCode: 400
            }, '{"code":-1121,"msg":"Invalid symbol."}');
        });
        binance.depth('TEST', (err) => {
            try {
                expect(err).to.deep.equal({
                    code: -1121,
                    msg: 'Invalid symbol.'
                });
                done();
            } catch (err) {
                done(err);
            } 
        });
    });

    it('throws an error if query is invalid', () => {
        expect(() => {
            binance.depth(null, () => {});
        }).to.throw();
    });

    it('throws an error if the callback is invalid', () => {
        expect(() => {
            binance.depth('BNBBTC', null);
        }).to.throw();
    });

    it('should make ping requests and handle the response', () => {
        mockRequest.setHandler('ping', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/ping'
            });
            callback(null, {
                statusCode: 200
            }, '{}');
        });
        return binance.ping()
            .then((response) => {
                expect(response).to.be.an('object').that.is.empty;
            });
    });

    it('should make time requests and handle the response', () => {
        mockRequest.setHandler('time', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/time'
            });
            callback(null, {
                statusCode: 200
            }, '{"serverTime":1503209580315}');
        });
        return binance.time()
            .then((response) => {
                expect(response).to.deep.equal({
                    serverTime: 1503209580315
                });
            });
    });

    it('should make depth requests and handle the response', () => {
        mockRequest.setHandler('depth', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/depth?symbol=ETHBTC&limit=5'
            });
            callback(null, {
                statusCode: 200
            }, '{"lastUpdateId":2727677,"bids":[["0.07085000","11.09700000",[]],["0.07080300","5.70500000",[]],["0.07070000","5.00000000",[]],["0.07067500","6.95000000",[]],["0.07065100","1.10100000",[]]],"asks":[["0.07096700","1.40300000",[]],["0.07118300","0.92900000",[]],["0.07119300","3.60300000",[]],["0.07125700","0.24900000",[]],["0.07129600","2.00000000",[]]]}');
        });
        return binance.depth({
                symbol: 'ETHBTC',
                limit: 5
            })
            .then((response) => {
                expect(response).to.deep.equal({
                    lastUpdateId: 2727677,
                    asks: [
                        ["0.07096700", "1.40300000", []],
                        ["0.07118300", "0.92900000", []],
                        ["0.07119300", "3.60300000", []],
                        ["0.07125700", "0.24900000", []],
                        ["0.07129600", "2.00000000", []]
                    ],
                    bids: [
                        ["0.07085000", "11.09700000", []],
                        ["0.07080300", "5.70500000", []],
                        ["0.07070000", "5.00000000", []],
                        ["0.07067500", "6.95000000", []],
                        ["0.07065100", "1.10100000", []]
                    ]
                });
            });
    });

    it('should make aggregated trade requests and handle the response', () => {
        mockRequest.setHandler('aggTrades', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/aggTrades?symbol=ETHBTC&limit=5'
            });
            callback(null, {
                statusCode: 200
            }, '[{"a":458006,"p": "0.07140500","q": "0.04900000","f":483670,"l":483670,"T":1503211746056,"m":false,"M":true},{"a":458007,"p": "0.07140500","q": "0.87200000","f":483671,"l":483671,"T":1503211750688,"m":false,"M":true},{"a":458008,"p": "0.07140500","q": "1.27300000","f":483672,"l":483672,"T":1503211750696,"m":false,"M":true},{"a":458009,"p": "0.07140500","q": "0.05700000","f":483673,"l":483673,"T":1503211750702,"m":false,"M":true},{"a":458010,"p": "0.07140500","q": "0.21900000","f":483674,"l":483674,"T":1503211750709,"m":false,"M":true}]');
        });
        return binance.aggTrades({
                symbol: 'ETHBTC',
                limit: 5
            })
            .then((response) => {
                expect(response).to.deep.equal([
                    {
                        aggTradeId:458006,
                        bestPriceMatch:true,
                        firstTradeId:483670,
                        lastTradeId:483670,
                        maker:false,
                        price: "0.07140500",
                        quantity: "0.04900000",
                        timestamp:1503211746056
                    },
                    {
                        aggTradeId: 458007,
                        bestPriceMatch: true,
                        firstTradeId: 483671,
                        lastTradeId: 483671,
                        maker: false,
                        price: "0.07140500",
                        quantity: "0.87200000",
                        timestamp: 1503211750688
                    },
                    {
                        aggTradeId: 458008,
                        bestPriceMatch: true,
                        firstTradeId: 483672,
                        lastTradeId: 483672,
                        maker: false,
                        price: "0.07140500",
                        quantity: "1.27300000",
                        timestamp: 1503211750696
                    },
                    {
                        aggTradeId: 458009,
                        bestPriceMatch: true,
                        firstTradeId: 483673,
                        lastTradeId: 483673,
                        maker: false,
                        price: "0.07140500",
                        quantity: "0.05700000",
                        timestamp: 1503211750702
                    },
                    {
                        aggTradeId: 458010,
                        bestPriceMatch: true,
                        firstTradeId: 483674,
                        lastTradeId: 483674,
                        maker: false,
                        price: "0.07140500",
                        quantity: "0.21900000",
                        timestamp :1503211750709
                    }
                ]);
            });
    });

    it('should make kline requests and handle the response', () => {
        mockRequest.setHandler('klines', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/klines?symbol=ETHBTC&interval=1m&limit=5'
            });
            callback(null, {
                statusCode: 200
            }, '[[1503213420000,"0.07120000","0.07132100","0.07120000","0.07130300","3.94900000",1503213479999,"0.28160693",6,"3.50900000","0.25026338","56742.16444446"],[1503213480000,"0.07130300","0.07137300","0.07120000","0.07137300","13.59200000",1503213539999,"0.96808274",15,"2.52600000","0.18018091","56676.42790975"],[1503213540000,"0.07137300","0.07159900","0.07127600","0.07136700","9.18600000",1503213599999,"0.65519433",21,"8.40100000","0.59919476","56659.02528193"],[1503213600000,"0.07127600","0.07142000","0.07127600","0.07132100","11.13600000",1503213659999,"0.79448882",14,"1.59700000","0.11399855","56672.51428193"],[1503213660000,"0.07132100","0.07132100","0.07132100","0.07132100","0.00000000",1503213719999,"0.00000000",0,"0.00000000","0.00000000","56672.51428193"]]');
        });
        return binance.klines({
                symbol: 'ETHBTC',
                interval: '1m',
                limit: 5
            })
            .then((response) => {
                expect(response).to.deep.equal([
                    {
                        close: "0.07130300",
                        closeTime: 1503213479999,
                        high: "0.07132100",
                        low: "0.07120000",
                        open: "0.07120000",
                        openTime: 1503213420000,
                        quoteAssetVolume: "0.28160693",
                        takerBaseAssetVolume: "3.50900000",
                        takerQuoteAssetVolume: "0.25026338",
                        trades: 6,
                        volume: "3.94900000",
                        ignored: "56742.16444446"
                    },
                    {
                        close: "0.07137300",
                        closeTime: 1503213539999,
                        high: "0.07137300",
                        low: "0.07120000",
                        open: "0.07130300",
                        openTime: 1503213480000,
                        quoteAssetVolume: "0.96808274",
                        takerBaseAssetVolume: "2.52600000",
                        takerQuoteAssetVolume: "0.18018091",
                        trades: 15,
                        volume: "13.59200000",
                        ignored: "56676.42790975"
                    },
                    {
                        close: "0.07136700",
                        closeTime: 1503213599999,
                        high: "0.07159900",
                        low: "0.07127600",
                        open: "0.07137300",
                        openTime: 1503213540000,
                        quoteAssetVolume: "0.65519433",
                        takerBaseAssetVolume: "8.40100000",
                        takerQuoteAssetVolume: "0.59919476",
                        trades: 21,
                        volume: "9.18600000",
                        ignored: "56659.02528193"
                    },
                    {
                        close: "0.07132100",
                        closeTime: 1503213659999,
                        high: "0.07142000",
                        low: "0.07127600",
                        open: "0.07127600",
                        openTime: 1503213600000,
                        quoteAssetVolume: "0.79448882",
                        takerBaseAssetVolume: "1.59700000",
                        takerQuoteAssetVolume: "0.11399855",
                        trades: 14,
                        volume: "11.13600000",
                        ignored: "56672.51428193"
                    },
                    {
                        close: "0.07132100",
                        closeTime: 1503213719999,
                        high: "0.07132100",
                        low: "0.07132100",
                        open: "0.07132100",
                        openTime: 1503213660000,
                        quoteAssetVolume: "0.00000000",
                        takerBaseAssetVolume: "0.00000000",
                        takerQuoteAssetVolume: "0.00000000",
                        trades: 0,
                        volume: "0.00000000",
                        ignored: "56672.51428193"
                    }
                ]);
            });
    });

    it('should make 24 hour ticker requests and handle the response', () => {
        mockRequest.setHandler('ticker/24hr', (options, callback) => {
            expect(options).to.deep.equal({
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/ticker/24hr?symbol=ETHBTC'
            });
            callback(null, {
                statusCode: 200
            }, '{"priceChange":"-0.00116100","priceChangePercent":"-1.614","weightedAvgPrice":"0.07098817","prevClosePrice":"0.07191900","lastPrice":"0.07075800","bidPrice":"0.07075800","askPrice":"0.07077200","openPrice":"0.07191900","highPrice":"0.07285800","lowPrice":"0.06900000","volume":"19985.33300000","openTime":1503128802623,"closeTime":1503215202623,"fristId":466817,"lastId":484582,"count":17766}');
        });
        return binance.ticker24hr({
                symbol: 'ETHBTC'
            })
            .then((response) => {
                expect(response).to.deep.equal({
                        askPrice: "0.07077200",
                        bidPrice: "0.07075800",
                        closeTime: 1503215202623,
                        count: 17766,
                        fristId: 466817,
                        highPrice: "0.07285800",
                        lastId: 484582,
                        lastPrice: "0.07075800",
                        lowPrice: "0.06900000",
                        openPrice: "0.07191900",
                        openTime: 1503128802623,
                        prevClosePrice: "0.07191900",
                        priceChange: "-0.00116100",
                        priceChangePercent: "-1.614",
                        volume: "19985.33300000",
                        weightedAvgPrice: "0.07098817"
                    });
            });
    });

    it('should make new order requests and handle the response', () => {
        mockRequest.setHandler('order', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'POST',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/order?symbol=BNBBTC&side=SELL&type=LIMIT&timeInForce=GTC&quantity=5&price=0.000635&timestamp=1503258350918&signature=fc62720e9435fa5c0571b4afa34c94437a337c2b3d3273185591241a85e398a3'
            });
            callback(null, {
                statusCode: 200
            }, '{"symbol":"BNBBTC","orderId":1497927,"clientOrderId":"dxkJuIgVohXkBsnI2Crnee","transactTime":1503258363847}');
        });
        return binance.newOrder({
                symbol: 'BNBBTC',
                side: 'SELL',
                type: 'LIMIT',
                timeInForce: 'GTC',
                quantity: 5,
                price: 0.000635,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal({
                    symbol: 'BNBBTC',
                    orderId: 1497927,
                    clientOrderId: 'dxkJuIgVohXkBsnI2Crnee',
                    transactTime: 1503258363847
                });
            });
    });

    it('should make new test order requests and handle the response', () => {
        mockRequest.setHandler('order/test', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'POST',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/order/test?symbol=BNBBTC&side=SELL&type=LIMIT&timeInForce=GTC&quantity=5&price=0.000635&timestamp=1503258350918&signature=fc62720e9435fa5c0571b4afa34c94437a337c2b3d3273185591241a85e398a3'
            });
            callback(null, {
                statusCode: 200
            }, '{}');
        });
        return binance.testOrder({
                symbol: 'BNBBTC',
                side: 'SELL',
                type: 'LIMIT',
                timeInForce: 'GTC',
                quantity: 5,
                price: 0.000635,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.be.an('object').that.is.empty;
            });
    });

    it('should make query order requests and handle the response', () => {
        mockRequest.setHandler('order', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/order?symbol=BNBBTC&orderId=1497927&timestamp=1503258350918&signature=c2d48dbf90f7b93c20addc8ec9ca87e28762345006edab322fe0ece70ecf5ed6'
            });
            callback(null, {
                statusCode: 200
            }, '{"symbol":"BNBBTC","orderId":1497927,"clientOrderId":"dxkJuIgVohXkBsnI2Crnee","price":"0.00063500","origQty":"5.00000000","executedQty":"5.00000000","status":"FILLED","timeInForce":"GTC","type":"LIMIT","side":"SELL","stopPrice":"0.00000000","icebergQty":"0.00000000","time":1503257997234}');
        });
        return binance.queryOrder({
                symbol: 'BNBBTC',
                orderId: 1497927,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal({
                    clientOrderId: "dxkJuIgVohXkBsnI2Crnee",
                    executedQty: "5.00000000",
                    icebergQty: "0.00000000",
                    orderId: 1497927,
                    origQty: "5.00000000",
                    price: "0.00063500",
                    side: "SELL",
                    status: "FILLED",
                    stopPrice: "0.00000000",
                    symbol: "BNBBTC",
                    time: 1503257997234,
                    timeInForce: "GTC",
                    type: "LIMIT"
                });
            });
    });

    it('should make open orders requests and handle the response', () => {
        mockRequest.setHandler('openOrders', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/openOrders?symbol=BNBBTC&timestamp=1503258350918&signature=52dc0002f67e47b906e7022242d8d9306a42eb5554283bf8a13e43e31991f915'
            });
            callback(null, {
                statusCode: 200
            }, '[{"symbol":"BNBBTC","orderId":1500955,"clientOrderId":"z7z7gslJeO4DCDgYe9LtgB","price":"0.00070000","origQty":"5.00000000","executedQty":"0.00000000","status":"NEW","timeInForce":"GTC","type":"LIMIT","side":"SELL","stopPrice":"0.00000000","icebergQty":"0.00000000","time":1503260089565}]');
        });
        return binance.openOrders({
                symbol: 'BNBBTC',
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal([{
                    clientOrderId: "z7z7gslJeO4DCDgYe9LtgB",
                    executedQty: "0.00000000",
                    icebergQty: "0.00000000",
                    orderId: 1500955,
                    origQty: "5.00000000",
                    price: "0.00070000",
                    side: "SELL",
                    status: "NEW",
                    stopPrice: "0.00000000",
                    symbol: "BNBBTC",
                    time: 1503260089565,
                    timeInForce: "GTC",
                    type: "LIMIT"
                }]);
            });
    });

    it('should make cancel order requests and handle the response', () => {
        mockRequest.setHandler('order', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'DELETE',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/order?symbol=BNBBTC&orderId=1500955&timestamp=1503258350918&signature=86af435a4e612964062c3c4a6bba8199b6d30900a35ad65ecd2fe1857c06f791'
            });
            callback(null, {
                statusCode: 200
            }, '{"symbol":"BNBBTC","origClientOrderId":"z7z7gslJeO4DCDgYe9LtgB","orderId":1500955,"clientOrderId":"jEZRtj2LoKo5Et5VIkNpTk"}');
        });
        return binance.cancelOrder({
                symbol: 'BNBBTC',
                orderId: 1500955,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal({
                    clientOrderId: "jEZRtj2LoKo5Et5VIkNpTk",
                    orderId: 1500955,
                    origClientOrderId: "z7z7gslJeO4DCDgYe9LtgB",
                    symbol: "BNBBTC",
                });
            });
    });

    it('should make all order requests and handle the response', () => {
        mockRequest.setHandler('allOrders', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/allOrders?symbol=BNBBTC&limit=1&timestamp=1503258350918&signature=804cc1a24059a2caaae890ec46a2acc9874b94d484f9e8aa9ae458a7a4101d62'
            });
            callback(null, {
                statusCode: 200
            }, '[{"symbol":"BNBBTC","orderId":1500955,"clientOrderId":"z7z7gslJeO4DCDgYe9LtgB","price":"0.00070000","origQty":"5.00000000","executedQty":"0.00000000","status":"CANCELED","timeInForce":"GTC","type":"LIMIT","side":"SELL","stopPrice":"0.00000000","icebergQty":"0.00000000","time":1503260089565}]');
        });
        return binance.allOrders({
                symbol: 'BNBBTC',
                limit: 1,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal([{
                    clientOrderId: "z7z7gslJeO4DCDgYe9LtgB",
                    executedQty: "0.00000000",
                    icebergQty: "0.00000000",
                    orderId: 1500955,
                    origQty: "5.00000000",
                    price: "0.00070000",
                    side: "SELL",
                    status: "CANCELED",
                    stopPrice: "0.00000000",
                    symbol: "BNBBTC",
                    time: 1503260089565,
                    timeInForce: "GTC",
                    type: "LIMIT"
                }]);
            });
    });

    it('should make account requests and handle the response', () => {
        mockRequest.setHandler('account', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/account?timestamp=1503258350918&signature=41793a079b4545ff8bb233a8563641d49165cafba3647850118c74e515d74d9d'
            });
            callback(null, {
                statusCode: 200
            }, '{"makerCommission":10,"takerCommission":10,"buyerCommission":0,"sellerCommission":0,"canTrade":true,"canWithdraw":true,"canDeposit":true,"balances":[{"asset":"BTC","free":"0.00370801","locked":"0.00000000"},{"asset":"LTC","free":"0.00000000","locked":"0.00000000"},{"asset":"ETH","free":"0.26982983","locked":"0.00000000"},{"asset":"BNC","free":"0.00000000","locked":"0.00000000"},{"asset":"ICO","free":"0.00000000","locked":"0.00000000"},{"asset":"NEO","free":"0.00000000","locked":"0.00000000"},{"asset":"BNB","free":"926.00000000","locked":"0.00000000"},{"asset":"123","free":"0.00000000","locked":"0.00000000"},{"asset":"456","free":"0.00000000","locked":"0.00000000"},{"asset":"QTUM","free":"0.00000000","locked":"0.00000000"},{"asset":"EOS","free":"0.00000000","locked":"0.00000000"},{"asset":"SNT","free":"0.00000000","locked":"0.00000000"},{"asset":"BNT","free":"0.00000000","locked":"0.00000000"},{"asset":"GAS","free":"95.45000000","locked":"0.00000000"},{"asset":"BCC","free":"0.00000000","locked":"0.00000000"},{"asset":"BTM","free":"0.00000000","locked":"0.00000000"},{"asset":"USDT","free":"0.00000000","locked":"0.00000000"},{"asset":"HCC","free":"0.00000000","locked":"0.00000000"},{"asset":"HSR","free":"0.00000000","locked":"0.00000000"},{"asset":"OAX","free":"0.00000000","locked":"0.00000000"},{"asset":"DNT","free":"0.00000000","locked":"0.00000000"},{"asset":"MCO","free":"0.00000000","locked":"0.00000000"},{"asset":"ICN","free":"0.00000000","locked":"0.00000000"}]}');
        });
        return binance.account({
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal({
                    makerCommission: 10,
                    takerCommission: 10,
                    buyerCommission: 0,
                    sellerCommission: 0,
                    canTrade: true,
                    canWithdraw: true,
                    canDeposit: true,
                    balances: [
                        { asset: 'BTC', free: '0.00370801', locked: '0.00000000' },
                        { asset: 'LTC', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'ETH', free: '0.26982983', locked: '0.00000000' },
                        { asset: 'BNC', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'ICO', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'NEO', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'BNB', free: '926.00000000', locked: '0.00000000' },
                        { asset: '123', free: '0.00000000', locked: '0.00000000' },
                        { asset: '456', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'QTUM', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'EOS', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'SNT', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'BNT', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'GAS', free: '95.45000000', locked: '0.00000000' },
                        { asset: 'BCC', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'BTM', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'USDT', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'HCC', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'HSR', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'OAX', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'DNT', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'MCO', free: '0.00000000', locked: '0.00000000' },
                        { asset: 'ICN', free: '0.00000000', locked: '0.00000000' }
                    ]
                });
            });
    });

    it('should make my trades requests and handle the response', () => {
        mockRequest.setHandler('myTrades', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/myTrades?symbol=BNBBTC&limit=1&timestamp=1503258350918&signature=804cc1a24059a2caaae890ec46a2acc9874b94d484f9e8aa9ae458a7a4101d62'
            });
            callback(null, {
                statusCode: 200
            }, '[{"id":345660,"price":"0.00063907","qty":"5.00000000","commission":"0.00000000","commissionAsset":"BNB","time":1503257997234,"isBuyer":false,"isMaker":false,"isBestMatch":true}]');
        });
        return binance.myTrades({
                symbol: 'BNBBTC',
                limit: 1,
                timestamp: 1503258350918
            })
            .then((response) => {
                expect(response).to.deep.equal([{
                    commission: "0.00000000",
                    commissionAsset: "BNB",
                    id: 345660,
                    isBestMatch: true,
                    isBuyer: false,
                    isMaker: false,
                    price: "0.00063907",
                    qty: "5.00000000",
                    time: 1503257997234
                }]);
            });
    });

    it('should make requests to start a user data stream and handle the response', () => {
        mockRequest.setHandler('userDataStream', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'POST',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/userDataStream'
            });
            callback(null, {
                statusCode: 200
            }, '{"listenKey":"DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU"}');
        });
        return binance.startUserDataStream()
            .then((response) => {
                expect(response).to.deep.equal({
                    listenKey: 'DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU'
                });
            });
    });

    it('should make requests to keep a user data stream alive and handle the response', () => {
        mockRequest.setHandler('userDataStream', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'PUT',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/userDataStream?listenKey=DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU'
            });
            callback(null, {
                statusCode: 200
            }, '{}');
        });
        return binance.keepAliveUserDataStream({
                listenKey: 'DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU'
            })
            .then((response) => {
                expect(response).to.be.an('object').that.is.empty;
            });
    });

    it('should make requests to close a user data stream and handle the response', () => {
        mockRequest.setHandler('userDataStream', (options, callback) => {
            expect(options).to.deep.equal({
                headers: {
                    'X-MBX-APIKEY': 'super_secret_api_key'
                },
                method: 'DELETE',
                timeout: 30000,
                url: 'https://www.binance.com/api/v1/userDataStream?listenKey=DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU'
            });
            callback(null, {
                statusCode: 200
            }, '{}');
        });
        return binance.closeUserDataStream({
                listenKey: 'DdfvqZ427zcWvtOzBSxmchhHPKV1t0lVCHdztRjIdU7CygJckPIIYmx5TOqU'
            })
            .then((response) => {
                expect(response).to.be.an('object').that.is.empty;
            });
    });
});