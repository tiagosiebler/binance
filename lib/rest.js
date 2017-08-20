const request = require('request');
const qs = require('querystring');
const _ = require('underscore');
const crypto = require('crypto');
const Beautifier = require('./beautifier.js');

class BinanceRest {

    constructor({ key, secret, recvWindow, timeout, disableBeautification }) {
        this.key = key;
        this.secret = secret;
        this.recvWindow = recvWindow;
        this.timeout = timeout || 15000;
        this.disableBeautification = disableBeautification;

        this._beautifier = new Beautifier();
        this._baseUrl = `https://www.binance.com/api/v1/`;
    }

    _makeRequest(query, callback, route, security, method) {
        const queryString = qs.stringify(query);
        const options = {
            url: `${this._baseUrl}${route}`,
            timeout: this.timeout
        }
        if (queryString) {
            options.url += '?' + queryString;
        }
        if (security === 'SIGNED') {
            if (options.url.substr(options.url.length - 1) !== '?') {
                options.url += '&';
            }
            options.url += `signature=${this._sign(queryString)}`;
        }
        if (security === 'API-KEY' || security === 'SIGNED') {
            options.headers = {
                'X-MBX-APIKEY': this.key
            }
        }
        if (method) {
            options.method = method;
        }

        if (callback) {
            request(options, callback);
        } else {
            return new Promise((resolve, reject) => {
                request(options, (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else if (response.statusCode >= 400) {
                        reject(JSON.parse(body));
                    } else {
                        let payload = JSON.parse(body);
                        if (_.isArray(payload)) {
                            payload = _.map(payload, (item) => {
                                return this._doBeautifications(item, route);
                            });
                        } else {
                            payload = this._doBeautifications(payload);
                        }
                        resolve(payload, route);
                    }
                });
            });
        }
    }

    _doBeautifications(response, route) {
        if (this._disableExpansions) {
            return response;
        }
        return this._beautifier.beautify(response, route);
    }

    _sign(queryString) {
        return crypto.createHash('sha256')
            .update(this.secret + '|' + queryString)
            .digest('hex');
    }

    // Public APIs
    ping(callback) {
        return this._makeRequest({}, callback, 'ping');
    }

    time(callback) {
        return this._makeRequest({}, callback, 'time');
    }

    depth(query, callback) {
        return this._makeRequest(query, callback, 'depth');
    }

    aggTrades(query, callback) {
        return this._makeRequest(query, callback, 'aggTrades');
    }

    klines(query, callback) {
        return this._makeRequest(query, callback, 'klines');
    }

    ticker24hr(query, callback) {
        return this._makeRequest(query, callback, 'ticker/24hr');
    }

    // Private APIs
    newOrder(query, callback) {
        return this._makeRequest(query, callback, 'order', 'SIGNED', 'POST');
    }

    testOrder(query, callback) {
        return this._makeRequest(query, callback, 'order/test', 'SIGNED', 'POST');
    }

    queryOrder(query, callback) {
        return this._makeRequest(query, callback, 'order', 'SIGNED');
    }

    cancelOrder(query, callback) {
        return this._makeRequest(query, callback, 'order', 'SIGNED', 'DELETE');
    }

    openOrders(query, callback) {
        return this._makeRequest(query, callback, 'openOrders', 'SIGNED');
    }

    allOrders(query, callback) {
        return this._makeRequest(query, callback, 'allOrders', 'SIGNED');
    }

    account(query, callback) {
        return this._makeRequest(query, callback, 'account', 'SIGNED');
    }

    myTrades(query, callback) {
        return this._makeRequest(query, callback, 'myTrades', 'SIGNED');
    }

    startUserDataStream(callback) {
        return this._makeRequest('', callback, 'userDataStream', 'API-KEY', 'POST');
    }

    keepAliveUserDataStream(query, callback) {
        return this._makeRequest(query, callback, 'userDataStream', 'API-KEY', 'PUT');
    }

    closeUserDataStream(query, callback) {
        return this._makeRequest(query, callback, 'userDataStream', 'API-KEY', 'DELETE');
    }
}

module.exports = BinanceRest;