const WebSocket = require('ws');
const Beautifier = require('./beautifier.js');

class BinanceWS {

    constructor() {
        this._baseUrl = 'wss://stream.binance.com:9443/ws/'
        this._sockets = {};
        this._beautifier = new Beautifier();
    }

    _setupWebSocket(eventHandler, path) {
        if (this._sockets[path]) {
            return this._sockets[path];
        }
        path = this._baseUrl + path;
        const ws = new WebSocket(path);
        ws.on('message', (json) => {
            const data = JSON.parse(json);
            eventHandler(this._beautifier.beautify(data, data.e + 'Event'));
        });
        return ws;
    }

    onDepthUpdate(symbol, eventHandler) {
        const path = `${symbol.toLowerCase()}@depth`;
        return this._setupWebSocket(eventHandler, path);
    }

    onKline(symbol, interval, eventHandler) {
        const path = `${symbol.toLowerCase()}@kline_${interval}`;
        return this._setupWebSocket(eventHandler, path);
    }

    onAggTrade(symbol, eventHandler) {
        const path = `${symbol.toLowerCase()}@aggTrade`;
        return this._setupWebSocket(eventHandler, path);
    }

    onUserData(binanceRest, eventHandler, interval) {
        binanceRest.startUserDataStream()
            .then((response) => {
                return this._setupWebSocket(eventHandler, response.listenKey);
                setInterval(() => {
                    binanceRest.keepAliveUserDataStream(response);
                }, interval || 60000);
            });
    }
}

module.exports = BinanceWS;