"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const beautifier_1 = require("./beautifier");
const requestUtils_1 = require("./requestUtils");
class BaseRestClient {
    constructor(baseUrlKey, options = {}, requestOptions = {}) {
        this.timeOffset = 0;
        this.options = {
            recvWindow: 5000,
            syncIntervalMs: 3600000,
            strictParamValidation: false,
            disableTimeSync: true,
            ...options,
        };
        this.globalRequestOptions = {
            timeout: 1000 * 60 * 5,
            headers: {},
            ...requestOptions,
        };
        this.key = options.api_key;
        this.secret = options.api_secret;
        if (this.key) {
            if (!this.globalRequestOptions.headers) {
                this.globalRequestOptions.headers = {};
            }
            this.globalRequestOptions.headers['X-MBX-APIKEY'] = this.key;
        }
        this.baseUrlKey = this.options.baseUrlKey || baseUrlKey;
        this.baseUrl = (0, requestUtils_1.getRestBaseUrl)(this.baseUrlKey, this.options);
        if (this.key && !this.secret) {
            throw new Error('API Key & Secret are both required for private enpoints');
        }
        if (this.options.disableTimeSync !== true) {
            this.syncTime();
            setInterval(this.syncTime.bind(this), +this.options.syncIntervalMs);
        }
        if (this.options.beautifyResponses) {
            this.beautifier = new beautifier_1.default();
        }
        this.syncTimePromise = null;
        this.apiLimitTrackers = {
            'x-mbx-used-weight': 0,
            'x-mbx-used-weight-1m': 0,
            'x-sapi-used-ip-weight-1m': 0,
            'x-mbx-order-count-1s': 0,
            'x-mbx-order-count-1m': 0,
            'x-mbx-order-count-1h': 0,
            'x-mbx-order-count-1d': 0,
        };
    }
    getBaseUrlKey() {
        return this.baseUrlKey;
    }
    getRateLimitStates() {
        return {
            ...this.apiLimitTrackers,
            lastUpdated: this.apiLimitLastUpdated,
        };
    }
    getTimeOffset() {
        return this.timeOffset;
    }
    setTimeOffset(value) {
        this.timeOffset = value;
    }
    get(endpoint, params) {
        return this._call('GET', endpoint, params);
    }
    getForBaseUrl(endpoint, baseUrlKey, params) {
        const baseUrl = (0, requestUtils_1.getRestBaseUrl)(baseUrlKey, {});
        return this._call('GET', endpoint, params, false, baseUrl);
    }
    getPrivate(endpoint, params) {
        return this._call('GET', endpoint, params, true);
    }
    post(endpoint, params) {
        return this._call('POST', endpoint, params);
    }
    postPrivate(endpoint, params) {
        return this._call('POST', endpoint, params, true);
    }
    put(endpoint, params) {
        return this._call('PUT', endpoint, params);
    }
    putPrivate(endpoint, params) {
        return this._call('PUT', endpoint, params, true);
    }
    delete(endpoint, params) {
        return this._call('DELETE', endpoint, params);
    }
    deletePrivate(endpoint, params) {
        return this._call('DELETE', endpoint, params, true);
    }
    async _call(method, endpoint, params, isPrivate, baseUrlOverride) {
        const timestamp = Date.now() + (this.getTimeOffset() || 0);
        if (isPrivate && (!this.key || !this.secret)) {
            throw new Error('Private endpoints require api and private keys to be set');
        }
        const { serialisedParams, signature, requestBody } = await (0, requestUtils_1.getRequestSignature)(params, this.key, this.secret, this.options.recvWindow, timestamp, this.options.strictParamValidation, this.options.filterUndefinedParams);
        const baseUrl = baseUrlOverride || this.baseUrl;
        const options = {
            ...this.globalRequestOptions,
            url: [baseUrl, endpoint].join('/'),
            method: method,
            json: true,
        };
        if (isPrivate) {
            options.url +=
                '?' + [serialisedParams, 'signature=' + signature].join('&');
        }
        else if (method === 'GET' || method === 'DELETE') {
            options.params = params;
        }
        else {
            options.data = (0, requestUtils_1.serialiseParams)(requestBody, this.options.strictParamValidation, true);
        }
        return (0, axios_1.default)(options)
            .then((response) => {
            this.updateApiLimitState(response.headers);
            if (response.status == 200) {
                return response.data;
            }
            throw response;
        })
            .then((response) => {
            if (!this.options.beautifyResponses || !this.beautifier) {
                return response;
            }
            try {
                return this.beautifier.beautify(response, endpoint) || response;
            }
            catch (e) {
                console.error('BaseRestClient response beautify failed: ', JSON.stringify({ response: response, error: e }));
            }
            return response;
        })
            .catch((e) => this.parseException(e, options.url));
    }
    parseException(e, url) {
        const { response, request, message } = e;
        if (response && response.headers) {
            this.updateApiLimitState(response.headers);
        }
        if (this.options.parseExceptions === false) {
            throw e;
        }
        if (!response) {
            if (!request) {
                throw message;
            }
            throw e;
        }
        throw {
            code: response.data?.code,
            message: response.data?.msg,
            body: response.data,
            headers: response.headers,
            requestUrl: url,
            requestBody: request.body,
            requestOptions: {
                ...this.options,
                api_key: undefined,
                api_secret: undefined,
            },
        };
    }
    updateApiLimitState(responseHeaders) {
        const delta = {};
        for (const headerKey in this.apiLimitTrackers) {
            const headerValue = responseHeaders[headerKey];
            const value = parseInt(headerValue);
            if (headerValue !== undefined && !isNaN(value)) {
                this.apiLimitTrackers[headerKey] = value;
                delta[headerKey] = {
                    updated: true,
                    valueParsed: value,
                    valueRaw: headerValue,
                };
            }
            else {
                delta[headerKey] = {
                    updated: false,
                    valueParsed: value,
                    valueRaw: headerValue,
                };
            }
        }
        this.apiLimitLastUpdated = new Date().getTime();
    }
    syncTime() {
        if (this.options.disableTimeSync === true) {
            return Promise.resolve();
        }
        if (this.syncTimePromise !== null) {
            return this.syncTimePromise;
        }
        this.syncTimePromise = this.fetchTimeOffset().then((offset) => {
            this.timeOffset = offset;
            this.syncTimePromise = null;
        });
        return this.syncTimePromise;
    }
    async fetchTimeOffset() {
        try {
            const start = Date.now();
            const serverTime = await this.getServerTime();
            const end = Date.now();
            const avgDrift = (end - start) / 2;
            return Math.ceil(serverTime - end + avgDrift);
        }
        catch (e) {
            console.error('Failed to fetch get time offset: ', e);
            return 0;
        }
    }
}
exports.default = BaseRestClient;
//# sourceMappingURL=BaseRestClient.js.map