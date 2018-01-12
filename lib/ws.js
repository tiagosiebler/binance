const WebSocket = require('ws');
const Beautifier = require('./beautifier.js');
const _ = require('underscore');

class BinanceWS {

    constructor(beautify = true) {
        this._baseUrl = 'wss://stream.binance.com:9443/ws/';
        this._combinedBaseUrl = 'wss://stream.binance.com:9443/stream?streams=';
        this._sockets = {};
        this._beautifier = new Beautifier();
        this._beautify = beautify;

        this.streams = {
            depth: (symbol) => `${symbol.toLowerCase()}@depth`,
            depthLevel: (symbol, level) => `${symbol.toLowerCase()}@depth${level}`,
            kline: (symbol, interval) => `${symbol.toLowerCase()}@kline_${interval}`,
            aggTrade: (symbol) => `${symbol.toLowerCase()}@aggTrade`,
            trade: (symbol) => `${symbol.toLowerCase()}@trade`,
            ticker: (symbol) => `${symbol.toLowerCase()}@ticker`,
            allTickers: () => '!ticker@arr'
        };
    }

    _setupWebSocket(eventHandler, path, isCombined) {
        if (this._sockets[path]) {
            return this._sockets[path];
        }
        path = (isCombined ? this._combinedBaseUrl : this._baseUrl) + path;
        const ws = new WebSocket(path);
        ws.on('message', (json) => {
            let response = JSON.parse(json);
            if (this._beautify) {
                if (response.stream) {
                    response.data = this._beautifyResponse(response.data);
                } else {
                    response = this._beautifyResponse(response);
                }
            }

            eventHandler(response);
        });
        return ws;
    }

    _beautifyResponse(data) {
        if (_.isArray(data)) {
            return _.map(data, event => {
                if (event.e) {
                    return this._beautifier.beautify(event, event.e + 'Event');
                }
                return event;
            });
        } else if (data.e) {
            return this._beautifier.beautify(data, data.e + 'Event');
        }
    }

    onDepthUpdate(symbol, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.depth(symbol));
    }

    onDepthLevelUpdate(symbol, level, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.depthLevel(symbol, level));
    }

    onKline(symbol, interval, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.kline(symbol, interval));
    }

    onAggTrade(symbol, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.aggTrade(symbol));
    }

    onTrade(symbol, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.trade(symbol));
    }

    onTicker(symbol, eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.ticker(symbol));
    }

    onAllTickers(eventHandler) {
        return this._setupWebSocket(eventHandler, this.streams.allTickers());
    }

    onUserData(binanceRest, eventHandler, interval = 60000) {
        return binanceRest.startUserDataStream()
            .then((response) => {
                setInterval(() => {
                    binanceRest.keepAliveUserDataStream(response);
                }, interval);
                return this._setupWebSocket(eventHandler, response.listenKey);
            });
    }

    onCombinedStream(streams, eventHandler) {
        return this._setupWebSocket(eventHandler, streams.join('/'), true);
    }

}

module.exports = BinanceWS;
