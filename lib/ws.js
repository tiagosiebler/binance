const WebSocket = require('ws');
const Expander = require('./expander.js');

class BinanceWS {

    constructor() {
        this._baseUrl = 'wss://stream.binance.com:9443/ws/'
        this._sockets = {};
        this._expander = new Expander();
    }

    _setupWebSocket(eventHandler, path) {
        if (this._sockets[path]) {
            return this._sockets[path];
        }
        path = this._baseUrl + path;
        console.log('Listening for messages on', path);
        const ws = new WebSocket(path);
        ws.on('message', (json) => {
            const data = JSON.parse(json);
            console.log('Got data', data);
            eventHandler(this._expander.expand(data, data.e + 'Event'));
        });
    }

    onDepthUpdate(symbol, eventHandler) {
        const path = `${symbol.toLowerCase()}@depth`;
        this._setupWebSocket(eventHandler, path);
    }

    onKline(symbol, interval, eventHandler) {
        const path = `${symbol.toLowerCase()}@kline_${interval}`;
        this._setupWebSocket(eventHandler, path);
    }

    onAggTrade(symbol, eventHandler) {
        const path = `${symbol.toLowerCase()}@aggTrade`;
        this._setupWebSocket(eventHandler, path);
    }

    onUserData(binanceRest, eventHandler) {
        binanceRest.startUserDataStream()
            .then((response) => {
                this._setupWebSocket(eventHandler, response.listenKey);
                setInterval(() => {
                    binanceRest.keepAliveUserDataStream(response);
                }, 60000);
            });
    }
}

module.exports = BinanceWS;