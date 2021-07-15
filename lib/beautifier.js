const _ = require('underscore');

class Beautifier {
    constructor() {
        var inst = this;
        this._beautifications = {
            aggTrades: {
                a: 'aggTradeId',
                p: 'price',
                q: 'quantity',
                f: 'firstTradeId',
                l: 'lastTradeId',
                T: 'timestamp',
                m: 'maker',
                M: 'bestPriceMatch'
            },
            bookTicker: {
                u: 'updateId',
                s: 'symbol',
                b: 'bidPrice',
                B: 'bidQty',
                a: 'askPrice',
                A: 'askQty'
            },
            klines: {
                0: 'openTime',
                1: 'open',
                2: 'high',
                3: 'low',
                4: 'close',
                5: 'volume',
                6: 'closeTime',
                7: 'quoteAssetVolume',
                8: 'trades',
                9: 'takerBaseAssetVolume',
                10: 'takerQuoteAssetVolume',
                11: 'ignored'
            },
            bids: [
                {
                    0: 'price',
                    1: 'quantity',
                    2: 'ignored'
                }
            ],
            asks: [
                {
                    0: 'price',
                    1: 'quantity',
                    2: 'ignored'
                }
            ],
            depthUpdateEvent: {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                U: 'firstUpdateId',
                u: 'lastUpdateId',
                b: 'bidDepthDelta',
                a: 'askDepthDelta'
            },
            bidDepthDelta: [
                {
                    0: 'price',
                    1: 'quantity',
                    2: 'ignored'
                }
            ],
            askDepthDelta: [
                {
                    0: 'price',
                    1: 'quantity',
                    2: 'ignored'
                }
            ],
            klineEvent: {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                k: 'kline'
            },
            kline: {
                t: 'startTime',
                T: 'endTime',
                s: 'symbol',
                i: 'interval',
                f: 'firstTradeId',
                L: 'lastTradeId',
                o: 'open',
                c: 'close',
                h: 'high',
                l: 'low',
                v: 'volume',
                n: 'trades',
                x: 'final',
                q: 'quoteVolume',
                V: 'volumeActive',
                Q: 'quoteVolumeActive',
                B: 'ignored'
            },
            aggTradeEvent: {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                a: 'tradeId',
                p: 'price',
                q: 'quantity',
                f: 'firstTradeId',
                l: 'lastTradeId',
                T: 'time',
                m: 'maker',
                M: 'ignored'
            },
            outboundAccountInfoEvent: {
                e: 'eventType',
                E: 'eventTime',
                m: 'makerCommission',
                t: 'takerCommission',
                b: 'buyerCommission',
                s: 'sellerCommission',
                T: 'canTrade',
                W: 'canWithdraw',
                D: 'canDeposit',
                B: 'balances',
                u: 'lastUpdateTime'
            },
            outboundAccountPositionEvent: {
                e: 'eventType',
                E: 'eventTime',
                u: 'lastUpdateTime',
                B: 'balances'
            },
            balances: [
                {
                    a: 'asset',
                    f: 'availableBalance',
                    l: 'onOrderBalance'
                }
            ],
            executionReportEvent: {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                c: 'newClientOrderId',
                S: 'side',
                o: 'orderType',
                f: 'cancelType', // GTC 'Good till Cancel', IOC: 'Immediate or Cancel'
                q: 'quantity',
                p: 'price',
                P: 'stopPrice',
                F: 'icebergQuantity',
                C: 'originalClientOrderId',
                x: 'executionType',
                X: 'orderStatus',
                r: 'rejectReason',
                i: 'orderId',
                l: 'lastTradeQuantity',
                z: 'accumulatedQuantity',
                L: 'lastTradePrice',
                n: 'commission',
                N: 'commissionAsset',
                m: 'maker',
                T: 'tradeTime',
                t: 'tradeId'
            },
            tradeEvent: {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                t: 'tradeId',
                p: 'price',
                q: 'quantity',
                b: 'buyerOrderId',
                a: 'sellerOrderId',
                T: 'time',
                m: 'maker',
                M: 'ignored'
            },
            '24hrTickerEvent': {
                e: 'eventType',
                E: 'eventTime',
                s: 'symbol',
                p: 'priceChange',
                P: 'priceChangePercent',
                w: 'weightedAveragePrice',
                x: 'previousClose',
                c: 'currentClose',
                Q: 'closeQuantity',
                b: 'bestBid',
                B: 'bestBidQuantity',
                a: 'bestAskPrice',
                A: 'bestAskQuantity',
                o: 'open',
                h: 'high',
                l: 'low',
                v: 'baseAssetVolume',
                q: 'quoteAssetVolume',
                O: 'openTime',
                C: 'closeTime',
                F: 'firstTradeId',
                L: 'lastTradeId',
                n: 'trades'
            }
        };

        this._floatKeys = [
            'accumulatedQuantity',
            'asks',
            'askPrice',
            'askQty',
            'availableBalance',
            'balances',
            'baseAssetVolume',
            'bestAskPrice',
            'bestAskQuantity',
            'bids',
            'bestBid',
            'bestBidQuantity',
            'bidPrice',
            'bidQty',
            'buyerCommission',
            'close',
            'closeQuantity',
            'closeTime',
            'commission',
            'currentClose',
            'executedQty',
            'free',
            'high',
            'highPrice',
            'lastPrice',
            'lowPrice',
            'ignored',
            'icebergQuantity',
            'icebergQty',
            'lastTradeQuantity',
            'locked',
            'low',
            'makerCommission',
            'onOrderBalance',
            'open',
            'openPrice',
            'origQty',
            'previousClose',
            'prevClosePrice',
            'price',
            'priceChange',
            'priceChangePercent',
            'quantity',
            'qty',
            'quoteAssetVolume',
            'quoteVolume',
            'sellerCommission',
            'stopPrice',
            'takerBaseAssetVolume',
            'takerCommission',
            'takerQuoteAssetVolume',
            'volume',
            'weightedAveragePrice',
            'weightedAvgPrice'
        ];
        // Map so we don't have to perform indexOf for each iteration
        this._floatKeysHashMap = {};
        _.each(this._floatKeys, function (keyName) {
            inst._floatKeysHashMap[keyName] = 1;
        });
    }

    beautifyKeyVal(key, val) {
        if (this._floatKeysHashMap[key]) {
            return parseFloat(val);
        }
        return val;
    }

    beautifyObject(data) {
        var inst = this;
        _.mapObject(data, function(val, key) {
            if (_.isArray(val)) {
              data[key] = inst.beautifyArray(val, key);
            } else {
              data[key] = inst.beautifyKeyVal(key, val);
            }
        });
        return data;
    }

    beautifyArray(data, parentKey) {
        var inst = this;
        var result = [];
        _.each(data, function (val, key) {
          if (_.isArray(val)) {
            result.push(inst.beautifyArray(val, parentKey || key));
          } else if (_.isObject(val)) {
            result.push(inst.beautifyObject(val))
          } else {
            result.push(inst.beautifyKeyVal(parentKey || key, val));
          }
        });
        return result;
    }

    beautify(object, type) {
        const beautifications = this._beautifications[type];

        if (!beautifications) {
          if (_.isArray(object)) {
            object = this.beautifyArray(object);
          } else if (_.isObject(object)) {
            object = this.beautifyObject(object);
          }
          return object;
        }

        let newItem = {};
        _.each(object, (value, key) => {
            const newKey = beautifications[key] || key;
            if (_.isArray(value)) {
                const newArray = [];
                if (_.isArray(this._beautifications[beautifications[key]])) {
                    _.each(value, arrayValue => {
                        newArray.push(
                            this.beautify(
                                arrayValue,
                                this._beautifications[beautifications[key]][0]
                            )
                        );
                    });
                } else {
                    _.each(value, (arrayValue, arrayKey) => {
                        newArray.push(
                            this.beautify(value, beautifications[arrayKey])
                        );
                    });
                }
                newItem[newKey] = newArray;
            } else if (_.isObject(value)) {
                newItem[newKey] = this.beautify(value, beautifications[key]);
            } else {
              newItem[newKey] = this.beautifyKeyVal(newKey, value);
            }
        });
        return newItem;
    }
}

module.exports = Beautifier;
