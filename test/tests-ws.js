const expect = require('chai').expect;
const { EventEmitter } = require('events');

const binanceApi = require('../lib/binance.js');
const BinanceWS = binanceApi.BinanceWS;

// Set true to help gather data for new tests.
let debugRaw = false;
let debugBeautified = false;

function validateWebSocket(name, testData, beautified, ...args) {
    it('raw', done => {
        const binance = new BinanceWS(false);
        if (!debugRaw) {
            binance.WebSocket = EventEmitter;
        }

        let result = null;
        let rawArgs = [
            ...args, data => {
                result = data;
                if (debugRaw) {
                    console.log(JSON.stringify(data));
                    done();
                    process.exit(1);
                }
            }
        ];

        const ws = binance[name](...rawArgs);
        if (!debugRaw) {
            ws.emit('message', testData);
            expect(result).to.deep.equal(testData);
            done();
        }
    });
    it('beautified', done => {
        const binance = new BinanceWS(true);
        if (!debugBeautified) {
            binance.WebSocket = EventEmitter;
        }

        let result = null;
        let beautyArgs = [
            ...args, data => {
                result = data;
                if (debugBeautified) {
                    console.log(JSON.stringify(data));
                }
            }
        ];

        const ws = binance[name](...beautyArgs);
        ws.emit('message', testData);
        expect(result).to.deep.equal(beautified);
        done();
    });
}

describe('BinanceWS', () => {
    describe('onDepthUpdate', () => {
        validateWebSocket('onDepthUpdate', {
            'e': 'depthUpdate',
            'E': 1519292621531,
            's': 'BTCUSDT',
            'U': 81977991,
            'u': 81978023,
            'b': [['10372.98000000', '0.55003100', []], ['10370.49000000', '1.06960000', []], ['10370.48000000', '0.06960000', []], ['10370.47000000', '0.06700000', []], ['10370.46000000', '0.06700000', []], ['10370.45000000', '0.06960000', []], ['10279.17000000', '0.00000000', []], ['10230.00000000', '2.40775400', []], ['10220.00000000', '5.51735600', []], ['10174.42000000', '0.05000000', []], ['10000.03000000', '0.25937000', []], ['10000.02000000', '0.11346100', []]],
            'a': [['10376.88000000', '0.07060000', []], ['10376.89000000', '0.00000000', []], ['10379.45000000', '0.00000000', []], ['10379.46000000', '0.00000000', []], ['10379.94000000', '0.04342800', []], ['10379.99000000', '0.06700000', []], ['10406.46000000', '0.02200000', []], ['10410.98000000', '0.00000000', []], ['11592.28000000', '0.00000000', []]]
        }, {
            'eventType': 'depthUpdate',
            'eventTime': 1519292621531,
            'symbol': 'BTCUSDT',
            'firstUpdateId': 81977991,
            'lastUpdateId': 81978023,
            'bidDepthDelta': [
                {
                    'price': '10372.98000000',
                    'quantity': '0.55003100',
                    'ignored': []
                }, { 'price': '10370.49000000', 'quantity': '1.06960000', 'ignored': [] }, {
                    'price': '10370.48000000',
                    'quantity': '0.06960000',
                    'ignored': []
                }, { 'price': '10370.47000000', 'quantity': '0.06700000', 'ignored': [] }, {
                    'price': '10370.46000000',
                    'quantity': '0.06700000',
                    'ignored': []
                }, { 'price': '10370.45000000', 'quantity': '0.06960000', 'ignored': [] }, {
                    'price': '10279.17000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10230.00000000', 'quantity': '2.40775400', 'ignored': [] }, {
                    'price': '10220.00000000',
                    'quantity': '5.51735600',
                    'ignored': []
                }, { 'price': '10174.42000000', 'quantity': '0.05000000', 'ignored': [] }, {
                    'price': '10000.03000000',
                    'quantity': '0.25937000',
                    'ignored': []
                }, { 'price': '10000.02000000', 'quantity': '0.11346100', 'ignored': [] }
            ],
            'askDepthDelta': [
                {
                    'price': '10376.88000000',
                    'quantity': '0.07060000',
                    'ignored': []
                }, { 'price': '10376.89000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10379.45000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10379.46000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10379.94000000',
                    'quantity': '0.04342800',
                    'ignored': []
                }, { 'price': '10379.99000000', 'quantity': '0.06700000', 'ignored': [] }, {
                    'price': '10406.46000000',
                    'quantity': '0.02200000',
                    'ignored': []
                }, { 'price': '10410.98000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '11592.28000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }
            ]
        }, 'BTCUSDT');
    });
    describe('onDepthLevelUpdate', () => {
        validateWebSocket('onDepthLevelUpdate', {
            'e': 'depthUpdate',
            'E': 1519294429854,
            's': 'BTCUSDT',
            'U': 82025287,
            'u': 82025323,
            'b':
                [
                    ['10129.36000000', '0.00000000', []],
                    ['10122.01000000', '0.33383300', []],
                    ['10121.16000000', '0.03952100', []],
                    ['10115.11000000', '0.04611700', []],
                    ['10115.00000000', '0.02039500', []],
                    ['10113.97000000', '0.33942100', []],
                    ['10113.96000000', '0.00000000', []],
                    ['10105.59000000', '0.12900000', []],
                    ['10103.57000000', '0.00000000', []],
                    ['10100.01000000', '0.22105300', []],
                    ['10028.70000000', '0.02000000', []],
                    ['10020.00000000', '3.78629300', []],
                    ['10019.94000000', '0.00000000', []],
                    ['10010.00000000', '11.24978800', []],
                    ['9800.00000000', '84.50801200', []]
                ],
            'a':
                [
                    ['10129.99000000', '0.00000000', []],
                    ['10130.00000000', '0.00000000', []],
                    ['10130.23000000', '0.00000000', []],
                    ['10130.50000000', '0.00000000', []],
                    ['10137.29000000', '0.16604200', []],
                    ['10139.99000000', '0.00000000', []],
                    ['10140.00000000', '0.76798200', []],
                    ['10148.00000000', '0.01002700', []],
                    ['10149.99000000', '0.02478700', []],
                    ['10153.95000000', '0.00000000', []],
                    ['10199.00000000', '0.08501200', []],
                    ['10256.47000000', '0.00000000', []],
                    ['10290.00000000', '1.87813000', []],
                    ['10349.80000000', '0.00000000', []]
                ]
        }, {
            'eventType': 'depthUpdate',
            'eventTime': 1519294429854,
            'symbol': 'BTCUSDT',
            'firstUpdateId': 82025287,
            'lastUpdateId': 82025323,
            'bidDepthDelta': [
                {
                    'price': '10129.36000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10122.01000000', 'quantity': '0.33383300', 'ignored': [] }, {
                    'price': '10121.16000000',
                    'quantity': '0.03952100',
                    'ignored': []
                }, { 'price': '10115.11000000', 'quantity': '0.04611700', 'ignored': [] }, {
                    'price': '10115.00000000',
                    'quantity': '0.02039500',
                    'ignored': []
                }, { 'price': '10113.97000000', 'quantity': '0.33942100', 'ignored': [] }, {
                    'price': '10113.96000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10105.59000000', 'quantity': '0.12900000', 'ignored': [] }, {
                    'price': '10103.57000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10100.01000000', 'quantity': '0.22105300', 'ignored': [] }, {
                    'price': '10028.70000000',
                    'quantity': '0.02000000',
                    'ignored': []
                }, { 'price': '10020.00000000', 'quantity': '3.78629300', 'ignored': [] }, {
                    'price': '10019.94000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10010.00000000', 'quantity': '11.24978800', 'ignored': [] }, {
                    'price': '9800.00000000',
                    'quantity': '84.50801200',
                    'ignored': []
                }
            ],
            'askDepthDelta': [
                {
                    'price': '10129.99000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10130.00000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10130.23000000',
                    'quantity': '0.00000000',
                    'ignored': []
                }, { 'price': '10130.50000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10137.29000000',
                    'quantity': '0.16604200',
                    'ignored': []
                }, { 'price': '10139.99000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10140.00000000',
                    'quantity': '0.76798200',
                    'ignored': []
                }, { 'price': '10148.00000000', 'quantity': '0.01002700', 'ignored': [] }, {
                    'price': '10149.99000000',
                    'quantity': '0.02478700',
                    'ignored': []
                }, { 'price': '10153.95000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10199.00000000',
                    'quantity': '0.08501200',
                    'ignored': []
                }, { 'price': '10256.47000000', 'quantity': '0.00000000', 'ignored': [] }, {
                    'price': '10290.00000000',
                    'quantity': '1.87813000',
                    'ignored': []
                }, { 'price': '10349.80000000', 'quantity': '0.00000000', 'ignored': [] }
            ]
        }, 'BTCUSDT', 1);
    });
    describe('onKline', () => {
        validateWebSocket('onKline', {
            'e': 'kline',
            'E': 1519294850477,
            's': 'BTCUSDT',
            'k':
                    {
                        't': 1519294800000,
                        'T': 1519294859999,
                        's': 'BTCUSDT',
                        'i': '1m',
                        'f': 20996460,
                        'L': 20997317,
                        'o': '10093.97000000',
                        'c': '10167.73000000',
                        'h': '10181.00000000',
                        'l': '10088.94000000',
                        'v': '172.64324200',
                        'n': 858,
                        'x': false,
                        'q': '1748546.81441086',
                        'V': '128.50733900',
                        'Q': '1301731.97583511',
                        'B': '0'
                    }
        }, {
            'eventType': 'kline',
            'eventTime': 1519294850477,
            'symbol': 'BTCUSDT',
            'kline': {
                'startTime': 1519294800000,
                'endTime': 1519294859999,
                'symbol': 'BTCUSDT',
                'interval': '1m',
                'firstTradeId': 20996460,
                'lastTradeId': 20997317,
                'open': '10093.97000000',
                'close': '10167.73000000',
                'high': '10181.00000000',
                'low': '10088.94000000',
                'volume': '172.64324200',
                'trades': 858,
                'final': false,
                'quoteVolume': '1748546.81441086',
                'volumeActive': '128.50733900',
                'quoteVolumeActive': '1301731.97583511',
                'ignored': '0'
            }
        }
            , 'BTCUSDT', '1m');
    });
    describe('onAggTrade', () => {
        validateWebSocket('onAggTrade', {
            'e': 'aggTrade',
            'E': 1519295160900,
            's': 'BTCUSDT',
            'a': 18319673,
            'p': '10110.41000000',
            'q': '0.04067400',
            'f': 21000246,
            'l': 21000246,
            'T': 1519295160897,
            'm': true,
            'M': true
        }, {
            'eventTime': 1519295160900,
            'eventType': 'aggTrade',
            'firstTradeId': 21000246,
            'ignored': true,
            'lastTradeId': 21000246,
            'maker': true,
            'price': '10110.41000000',
            'quantity': '0.04067400',
            'symbol': 'BTCUSDT',
            'time': 1519295160897,
            'tradeId': 18319673
        }, 'BTCUSDT');
    });
    describe('onTrade', () => {
        validateWebSocket('onTrade', {
            'e': 'trade',
            'E': 1519295178959,
            's': 'BTCUSDT',
            't': 21000368,
            'p': '10128.56000000',
            'q': '0.00555400',
            'b': 53391908,
            'a': 53391820,
            'T': 1519295178958,
            'm': false,
            'M': true
        }, {
            'eventType': 'trade',
            'eventTime': 1519295178959,
            'symbol': 'BTCUSDT',
            'tradeId': 21000368,
            'price': '10128.56000000',
            'quantity': '0.00555400',
            'buyerOrderId': 53391908,
            'sellerOrderId': 53391820,
            'time': 1519295178958,
            'maker': false,
            'ignored': true
        }
            , 'BTCUSDT');
    });
    describe('onTicker', () => {
        validateWebSocket('onTicker', {
            'e': '24hrTicker',
            'E': 1519295190942,
            's': 'BTCUSDT',
            'p': '-745.23000000',
            'P': '-6.837',
            'w': '10560.44438339',
            'x': '10899.94000000',
            'c': '10154.71000000',
            'Q': '0.11902200',
            'b': '10154.71000000',
            'B': '3.50438100',
            'a': '10154.94000000',
            'A': '0.06100000',
            'o': '10899.94000000',
            'h': '11109.00000000',
            'l': '10077.01000000',
            'v': '61368.59514400',
            'q': '648079635.90508401',
            'O': 1519208790943,
            'C': 1519295190943,
            'F': 20523640,
            'L': 21000509,
            'n': 476870
        }, {
            'eventType': '24hrTicker',
            'eventTime': 1519295190942,
            'symbol': 'BTCUSDT',
            'priceChange': '-745.23000000',
            'priceChangePercent': '-6.837',
            'weightedAveragePrice': '10560.44438339',
            'previousClose': '10899.94000000',
            'currentClose': '10154.71000000',
            'closeQuantity': '0.11902200',
            'bestBid': '10154.71000000',
            'bestBidQuantity': '3.50438100',
            'bestAskPrice': '10154.94000000',
            'bestAskQuantity': '0.06100000',
            'open': '10899.94000000',
            'high': '11109.00000000',
            'low': '10077.01000000',
            'baseAssetVolume': '61368.59514400',
            'quoteAssetVolume': '648079635.90508401',
            'openTime': 1519208790943,
            'closeTime': 1519295190943,
            'firstTradeId': 20523640,
            'lastTradeId': 21000509,
            'trades': 476870
        }, 'BTCUSDT');
    });
    describe('onAllTickers', () => {
        validateWebSocket('onAllTickers',
            [
                {
                    'e': '24hrTicker',
                    'E': 1519295238937,
                    's': 'ETHBTC',
                    'p': '-0.00008600',
                    'P': '-0.107',
                    'w': '0.08001944',
                    'x': '0.08063200',
                    'c': '0.08057200',
                    'Q': '0.80100000',
                    'b': '0.08057200',
                    'B': '1.36700000',
                    'a': '0.08060300',
                    'A': '5.68300000',
                    'o': '0.08065800',
                    'h': '0.08150000',
                    'l': '0.07810100',
                    'v': '94655.59300000',
                    'q': '7574.28711744',
                    'O': 1519208838932,
                    'C': 1519295238932,
                    'F': 36498858,
                    'L': 36796090,
                    'n': 297233
                }, {
                    'e': '24hrTicker',
                    'E': 1519295238888,
                    's': 'LTCBTC',
                    'p': '0.00004600',
                    'P': '0.230',
                    'w': '0.02006243',
                    'x': '0.01998500',
                    'c': '0.02002300',
                    'Q': '0.17000000',
                    'b': '0.02001700',
                    'B': '1.25000000',
                    'a': '0.02002900',
                    'A': '5.34000000',
                    'o': '0.01997700',
                    'h': '0.02060000',
                    'l': '0.01952300',
                    'v': '149881.77000000',
                    'q': '3006.99246797',
                    'O': 1519208838886,
                    'C': 1519295238886,
                    'F': 8083490,
                    'L': 8179397,
                    'n': 95908
                }
            ],
            [
                {
                    'eventType': '24hrTicker',
                    'eventTime': 1519295238937,
                    'symbol': 'ETHBTC',
                    'priceChange': '-0.00008600',
                    'priceChangePercent': '-0.107',
                    'weightedAveragePrice': '0.08001944',
                    'previousClose': '0.08063200',
                    'currentClose': '0.08057200',
                    'closeQuantity': '0.80100000',
                    'bestBid': '0.08057200',
                    'bestBidQuantity': '1.36700000',
                    'bestAskPrice': '0.08060300',
                    'bestAskQuantity': '5.68300000',
                    'open': '0.08065800',
                    'high': '0.08150000',
                    'low': '0.07810100',
                    'baseAssetVolume': '94655.59300000',
                    'quoteAssetVolume': '7574.28711744',
                    'openTime': 1519208838932,
                    'closeTime': 1519295238932,
                    'firstTradeId': 36498858,
                    'lastTradeId': 36796090,
                    'trades': 297233
                }, {
                    'eventType': '24hrTicker',
                    'eventTime': 1519295238888,
                    'symbol': 'LTCBTC',
                    'priceChange': '0.00004600',
                    'priceChangePercent': '0.230',
                    'weightedAveragePrice': '0.02006243',
                    'previousClose': '0.01998500',
                    'currentClose': '0.02002300',
                    'closeQuantity': '0.17000000',
                    'bestBid': '0.02001700',
                    'bestBidQuantity': '1.25000000',
                    'bestAskPrice': '0.02002900',
                    'bestAskQuantity': '5.34000000',
                    'open': '0.01997700',
                    'high': '0.02060000',
                    'low': '0.01952300',
                    'baseAssetVolume': '149881.77000000',
                    'quoteAssetVolume': '3006.99246797',
                    'openTime': 1519208838886,
                    'closeTime': 1519295238886,
                    'firstTradeId': 8083490,
                    'lastTradeId': 8179397,
                    'trades': 95908
                }
            ]
        );
    });
});
