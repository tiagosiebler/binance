const request = require('request');
const qs = require('querystring');
const _ = require('underscore');
const crypto = require('crypto');
const Expander = require('./expander.js');

class BinanceRest {

    constructor({ key, secret, recvWindow, timeout, disableExpansions }) {
        this._key = key;
        this._secret = secret;
        this._recvWindow = recvWindow;
        this._baseUrl = `https://www.binance.com/api/v1/`;
        this._timeout = timeout || 15000;
        this._expander = new Expander();
        this._disableExpansions = disableExpansions;
    }

    _makeRequest(query, callback, route, security, method) {
        const queryString = qs.stringify(query);
        const options = {
            url: `${this._baseUrl}${route}`,
            timeout: this._timeout
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
                'X-MBX-APIKEY': this._key
            }
        }
        if (method) {
            options.method = method;
        }

        if (callback) {
            request(options, callback);
        } else {
            console.log('Making request with options:', JSON.stringify(options));
            return new Promise((resolve, reject) => {
                try {
                    request(options, (err, response, body) => {
                        if (err) {
                            reject(err);
                        } else if (response.statusCode >= 400) {
                            reject(JSON.parse(body));
                        } else {
                            resolve(this._doExpansions(JSON.parse(body), route));
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            });
        }
    }

    _doExpansions(response, route) {
        if (this._disableExpansions) {
            return response;
        }
        return this._expander.expand(response, route);
    }

    _sign(queryString) {
        return crypto.createHash('sha256')
            .update(this._secret + '|' + queryString)
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