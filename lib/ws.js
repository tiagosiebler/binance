const EventEmitter = require('events');
const WebSocket = require('ws');
const Beautifier = require('./beautifier.js');
const _ = require('underscore');
const retry = require('retry');

class Socket extends EventEmitter {

    constructor(path, { isCombinedPath = false, retryOptions = {}, verbose = false }) {
        super();

        this._baseUrl = 'wss://stream.binance.com:9443/ws/';
        this._combinedBaseUrl = 'wss://stream.binance.com:9443/stream?streams=';

        this._path = path;
        this._isCombinedPath = isCombinedPath;

        this._ws = null;
        this._onMessageHandler = _.noop();

        this._options = {
            verbose: verbose,
            retryOptions: _.defaults(retryOptions, {
                forever: true,
                factor: 1.3,
                maxTimeout: 5 * 60 * 1000
            })
        };
    }

    _getPath() {
        return new Promise(resolve => {
            if (_.isObject(this._path)) {
                return this._path.getAuthenticatedPath().then(resolve);
            }

            resolve(this._path);
        }).then(path => (this._isCombinedPath ? this._combinedBaseUrl : this._baseUrl) + path);
    }

    onMessage(handlerFn) {
        this._onMessageHandler = handlerFn;
    }

    connect() {
        const attemptConnect = (path) => {
            return new Promise((resolve) => {
                const operation = retry.operation(this._options.retryOptions);

                operation.attempt((currentAttempt) => {
                    this._ws = new WebSocket(path);
                    this._ws.once('error', e => {
                        if (this._options.verbose) {
                            console.log(`WebSocket connect attempt #${ currentAttempt }`);
                        }

                        operation.retry(e);
                    });

                    this._ws.once('open', () => {
                        this._onConnected();
                        resolve(this);
                    });
                });
            });
        };

        this.disconnect();
        return this._getPath().then(attemptConnect);
    }

    disconnect() {
        if (this._ws) {
            this._ws.removeAllListeners('close');
            this._ws.terminate();
        }

        if (_.isObject(this._path)) {
            this._path.flushKeepAlive();
        }
    }

    getWebSocket() {
        return this._ws;
    }

    _onConnected() {
        this._ws.on('message', this._onMessageHandler);
        this._ws.on('unexpected-response', _.noop);
        this._ws.on('error', _.noop);
        this._ws.once('close', () => this._reconnect());

        this.emit('connected');
    }

    _reconnect() {
        this.emit('reconnect');
        return this.connect();
    }
}

class BinanceWS {

    constructor(options = {}) {
        if (_.isBoolean(options)) {
            // support legacy boolean param that controls response beautification
            options = { beautify: options };
        }

        this._beautifier = new Beautifier();
        this._options = _.defaults(options, { beautify: true, verbose: false, retryOptions: {} });

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

    _setupWebSocket(eventHandler, path, isCombinedPath) {
        const socketOptions = _.pick(this._options, ['retryOptions', 'verbose']);
        const socket = new Socket(path, _.extend(socketOptions, { isCombinedPath }));

        socket.onMessage(message => {
            let event;
            try {
                event = JSON.parse(message);
            } catch (e) {
                if (this._options.verbose) {
                    console.error('WebSocket message handler received invalid JSON message', message);
                }
                event = message;
            }

            if (this._options.beautify) {
                if (event.stream) {
                    event.data = this._beautifyResponse(event.data);
                } else {
                    event = this._beautifyResponse(event);
                }
            }

            eventHandler(event);
        });

        return socket.connect();
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
        return data;
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
        const setupAuth = () => {
            let intervalId;

            return {
                flushKeepAlive() {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                },

                getAuthenticatedPath() {
                    return binanceRest.startUserDataStream()
                        .then(response => {
                            intervalId = setInterval(() => {
                                binanceRest.keepAliveUserDataStream(response).catch(e => {
                                    const msg = 'Failed requesting keepAliveUserDataStream for onUserData listener';
                                    console.error(new Date(), msg, e);
                                });
                            }, interval);

                            return response.listenKey;
                        });
                }
            };
        };

        return this._setupWebSocket(eventHandler, setupAuth());
    }

    onCombinedStream(streams, eventHandler) {
        return this._setupWebSocket(eventHandler, streams.join('/'), true);
    }

}

module.exports = BinanceWS;
