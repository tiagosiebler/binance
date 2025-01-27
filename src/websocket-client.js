"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.parseRawWsMessage = void 0;
const events_1 = require("events");
const isomorphic_ws_1 = require("isomorphic-ws");
const coinm_client_1 = require("./coinm-client");
const logger_1 = require("./logger");
const main_client_1 = require("./main-client");
const usdm_client_1 = require("./usdm-client");
const beautifier_1 = require("./util/beautifier");
const requestUtils_1 = require("./util/requestUtils");
const ws_utils_1 = require("./util/ws-utils");
const WsStore_1 = require("./util/WsStore");
const wsBaseEndpoints = {
    spot: 'wss://stream.binance.com:9443',
    margin: 'wss://stream.binance.com:9443',
    isolatedMargin: 'wss://stream.binance.com:9443',
    usdm: 'wss://fstream.binance.com',
    usdmTestnet: 'wss://stream.binancefuture.com',
    coinm: 'wss://dstream.binance.com',
    coinmTestnet: 'wss://dstream.binancefuture.com',
    options: 'wss://vstream.binance.com',
    optionsTestnet: 'wss://testnetws.binanceops.com',
};
const loggerCategory = { category: 'binance-ws' };
function throwUnhandledSwitch(x, msg) {
    throw new Error(msg);
}
function parseEventTypeFromMessage(parsedMsg) {
    if (parsedMsg?.e) {
        return parsedMsg.e;
    }
    if (Array.isArray(parsedMsg) && parsedMsg.length) {
        return parsedMsg[0]?.e;
    }
    return;
}
function parseRawWsMessage(event) {
    if (typeof event === 'string') {
        const parsedEvent = JSON.parse(event);
        if (parsedEvent.data) {
            if (typeof parsedEvent.data === 'string') {
                return parseRawWsMessage(parsedEvent.data);
            }
            return parsedEvent.data;
        }
    }
    if (event?.data) {
        return JSON.parse(event.data);
    }
    return event;
}
exports.parseRawWsMessage = parseRawWsMessage;
class WebsocketClient extends events_1.EventEmitter {
    constructor(options, logger) {
        super();
        this.logger = logger || logger_1.DefaultLogger;
        this.wsStore = new WsStore_1.default(this.logger);
        this.beautifier = new beautifier_1.default();
        this.restClients = {};
        this.options = {
            pongTimeout: 7500,
            pingInterval: 10000,
            reconnectTimeout: 500,
            ...options,
        };
        this.listenKeyStateStore = {};
        this.wsUrlKeyMap = {};
        this.on('error', () => { });
    }
    getRestClientOptions() {
        return {
            ...this.options,
            ...this.options.restOptions,
            api_key: this.options.api_key,
            api_secret: this.options.api_secret,
        };
    }
    connectToWsUrl(url, wsKey, forceNewConnection) {
        const wsRefKey = wsKey || url;
        const oldWs = this.wsStore.getWs(wsRefKey);
        if (oldWs && this.wsStore.isWsOpen(wsRefKey) && !forceNewConnection) {
            this.logger.silly('connectToWsUrl(): Returning existing open WS connection', { ...loggerCategory, wsRefKey });
            return oldWs;
        }
        this.logger.silly(`connectToWsUrl(): Opening WS connection to URL: ${url}`, { ...loggerCategory, wsRefKey });
        const { protocols = [], ...wsOptions } = this.options.wsOptions || {};
        const ws = new isomorphic_ws_1.default(url, protocols, wsOptions);
        this.wsUrlKeyMap[url] = wsRefKey;
        if (typeof ws.on === 'function') {
            ws.on('ping', (event) => this.onWsPing(event, wsRefKey, ws, 'event'));
            ws.on('pong', (event) => this.onWsPong(event, wsRefKey, 'event'));
        }
        ws.onopen = (event) => this.onWsOpen(event, wsRefKey, url);
        ws.onerror = (event) => this.parseWsError('WS Error Event', event, wsRefKey, url);
        ws.onclose = (event) => this.onWsClose(event, wsRefKey, ws, url);
        ws.onmessage = (event) => this.onWsMessage(event, wsRefKey, 'function');
        ws.onping = (event) => this.onWsPing(event, wsRefKey, ws, 'function');
        ws.onpong = (event) => this.onWsPong(event, wsRefKey, 'function');
        this.wsStore.setWs(wsRefKey, ws);
        ws.wsKey = wsRefKey;
        return ws;
    }
    tryWsSend(wsKey, wsMessage) {
        try {
            this.logger.silly('Sending upstream ws message: ', {
                ...loggerCategory,
                wsMessage,
                wsKey,
            });
            if (!wsKey) {
                throw new Error('No wsKey provided');
            }
            const ws = this.getWs(wsKey);
            if (!ws) {
                throw new Error(`No active websocket connection exists for wsKey: ${wsKey}`);
            }
            ws.send(wsMessage);
        }
        catch (e) {
            this.logger.error('Failed to send WS message', {
                ...loggerCategory,
                wsMessage,
                wsKey,
                exception: e,
            });
        }
    }
    tryWsPing(wsKey) {
        try {
            if (!wsKey) {
                throw new Error('No wsKey provided');
            }
            const ws = this.getWs(wsKey);
            if (!ws) {
                throw new Error(`No active websocket connection exists for wsKey: ${wsKey}`);
            }
            if (ws.readyState === 1) {
                ws.ping();
                ws.pong();
            }
            else {
                this.logger.silly('WS ready state not open - refusing to send WS ping', { ...loggerCategory, wsKey, readyState: ws?.readyState });
            }
        }
        catch (e) {
            this.logger.error('Failed to send WS ping', {
                ...loggerCategory,
                wsKey,
                exception: e,
            });
        }
    }
    onWsOpen(ws, wsKey, wsUrl) {
        this.logger.silly(`onWsOpen(): ${wsUrl} : ${wsKey}`);
        if (this.wsStore.isConnectionState(wsKey, WsStore_1.WsConnectionStateEnum.RECONNECTING)) {
            this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
            this.emit('reconnected', { wsKey, ws });
        }
        else {
            this.logger.info('Websocket connected', { ...loggerCategory, wsKey });
            this.emit('open', { wsKey, ws });
        }
        this.setWsState(wsKey, WsStore_1.WsConnectionStateEnum.CONNECTED);
        const topics = [...this.wsStore.getTopics(wsKey)];
        if (topics.length) {
            this.requestSubscribeTopics(wsKey, topics);
        }
        if (!this.options.disableHeartbeat) {
            const wsState = this.wsStore.get(wsKey, true);
            if (wsState.activePingTimer) {
                clearInterval(wsState.activePingTimer);
            }
            wsState.activePingTimer = setInterval(() => this.sendPing(wsKey, wsUrl), this.options.pingInterval);
        }
    }
    onWsClose(event, wsKey, ws, wsUrl) {
        const wsConnectionState = this.wsStore.getConnectionState(wsKey);
        const { market, listenKey, isUserData } = (0, requestUtils_1.getContextFromWsKey)(wsKey);
        this.logger.info('Websocket connection closed', {
            ...loggerCategory,
            wsKey,
            eventCloseCode: event?.target?._closeCode,
            wsConnectionState,
            isUserData,
            listenKey,
            market,
        });
        this.clearTimers(wsKey);
        if (isUserData) {
            this.wsStore.delete(wsKey);
            if (listenKey) {
                this.clearUserDataKeepAliveTimer(listenKey);
            }
        }
        if (wsConnectionState !== WsStore_1.WsConnectionStateEnum.CLOSING) {
            this.reconnectWithDelay(wsKey, this.options.reconnectTimeout, wsUrl);
            this.emit('reconnecting', { wsKey, event, ws });
        }
        else {
            this.setWsState(wsKey, WsStore_1.WsConnectionStateEnum.INITIAL);
            this.emit('close', { wsKey, event, ws });
        }
    }
    onWsMessage(event, wsKey, source) {
        try {
            this.clearPongTimer(wsKey);
            const msg = parseRawWsMessage(event);
            (0, requestUtils_1.appendEventIfMissing)(msg, wsKey);
            (0, requestUtils_1.appendEventMarket)(msg, wsKey);
            const eventType = parseEventTypeFromMessage(msg);
            if (eventType) {
                this.emit('message', msg);
                if (eventType === 'listenKeyExpired') {
                    const { market } = (0, requestUtils_1.getContextFromWsKey)(wsKey);
                    this.logger.info(`${market} listenKey expired - attempting to respawn user data stream: ${wsKey}`);
                    const shouldTriggerReconnect = true;
                    this.close(wsKey, shouldTriggerReconnect);
                }
                if (this.options.beautify) {
                    const beautifiedMessage = this.beautifier.beautifyWsMessage(msg, eventType, false);
                    this.emit('formattedMessage', beautifiedMessage);
                    if (!Array.isArray(beautifiedMessage)) {
                        if ([
                            'balanceUpdate',
                            'executionReport',
                            'listStatus',
                            'listenKeyExpired',
                            'outboundAccountPosition',
                            'ACCOUNT_CONFIG_UPDATE',
                            'ACCOUNT_UPDATE',
                            'MARGIN_CALL',
                            'ORDER_TRADE_UPDATE',
                            'CONDITIONAL_ORDER_TRIGGER_REJECT',
                        ].includes(eventType)) {
                            this.emit('formattedUserDataMessage', beautifiedMessage);
                        }
                    }
                }
                return;
            }
            if (msg.result !== undefined) {
                this.emit('reply', {
                    type: event.type,
                    data: msg,
                    wsKey,
                });
                return;
            }
            this.logger.warning('Bug? Unhandled ws message event type. Check if appendEventIfMissing needs to parse wsKey.', {
                ...loggerCategory,
                parsedMessage: JSON.stringify(msg),
                rawEvent: event,
                wsKey,
                source,
            });
        }
        catch (e) {
            this.logger.error('Exception parsing ws message: ', {
                ...loggerCategory,
                rawEvent: event,
                wsKey,
                error: e,
                source,
            });
            this.emit('error', { wsKey, error: e, rawEvent: event, source });
        }
    }
    sendPing(wsKey, wsUrl) {
        this.clearPongTimer(wsKey);
        this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
        this.tryWsPing(wsKey);
        this.wsStore.get(wsKey, true).activePongTimer = setTimeout(() => this.executeReconnectableClose(wsKey, 'Pong timeout', wsUrl), this.options.pongTimeout);
    }
    onWsPing(event, wsKey, ws, source) {
        this.logger.silly('Received ping, sending pong frame', {
            ...loggerCategory,
            wsKey,
            source,
        });
        ws.pong();
    }
    onWsPong(event, wsKey, source) {
        this.logger.silly('Received pong, clearing pong timer', {
            ...loggerCategory,
            wsKey,
            source,
        });
        this.clearPongTimer(wsKey);
    }
    executeReconnectableClose(wsKey, reason, wsUrl) {
        this.logger.info(`${reason} - closing socket to reconnect`, {
            ...loggerCategory,
            wsKey,
            reason,
        });
        const wasOpen = this.wsStore.isWsOpen(wsKey);
        (0, ws_utils_1.safeTerminateWs)(this.getWs(wsKey));
        this.clearPingTimer(wsKey);
        this.clearPongTimer(wsKey);
        if (!wasOpen) {
            this.logger.info(`${reason} - socket already closed - trigger immediate reconnect`, {
                ...loggerCategory,
                wsKey,
                reason,
            });
            this.reconnectWithDelay(wsKey, this.options.reconnectTimeout, wsUrl);
        }
    }
    close(wsKey, shouldReconnectAfterClose) {
        this.logger.info('Closing connection', {
            ...loggerCategory,
            wsKey,
            willReconnect: shouldReconnectAfterClose,
        });
        this.setWsState(wsKey, shouldReconnectAfterClose
            ? WsStore_1.WsConnectionStateEnum.RECONNECTING
            : WsStore_1.WsConnectionStateEnum.CLOSING);
        this.clearTimers(wsKey);
        this.getWs(wsKey)?.close();
        const { listenKey } = (0, requestUtils_1.getContextFromWsKey)(wsKey);
        if (listenKey) {
            this.teardownUserDataListenKey(listenKey, this.getWs(wsKey));
        }
        else {
            (0, ws_utils_1.safeTerminateWs)(this.getWs(wsKey));
        }
    }
    closeAll(shouldReconnectAfterClose) {
        const keys = this.wsStore.getKeys();
        this.logger.info(`Closing all ws connections: ${keys}`);
        keys.forEach((key) => {
            this.close(key, shouldReconnectAfterClose);
        });
    }
    closeWs(ws, shouldReconnectAfterClose) {
        const wsKey = this.wsUrlKeyMap[ws.url] || ws?.wsKey;
        if (!wsKey) {
            throw new Error('Cannot close websocket as it has no known wsKey attached.');
        }
        return this.close(wsKey, shouldReconnectAfterClose);
    }
    parseWsError(context, error, wsKey, wsUrl) {
        this.logger.error(context, { ...loggerCategory, wsKey, error });
        if (!error.message) {
            this.logger.error(`${context} due to unexpected error: `, error);
            this.emit('error', { error, wsKey, wsUrl });
            return;
        }
        switch (error.message) {
            case 'Unexpected server response: 401':
                this.logger.error(`${context} due to 401 authorization failure.`, {
                    ...loggerCategory,
                    wsKey,
                });
                break;
            default:
                if (this.wsStore.getConnectionState(wsKey) !==
                    WsStore_1.WsConnectionStateEnum.CLOSING) {
                    this.logger.error(`${context} due to unexpected response error: "${error?.msg || error?.message || error}"`, { ...loggerCategory, wsKey, error });
                    this.executeReconnectableClose(wsKey, 'unhandled onWsError', wsUrl);
                }
                else {
                    this.logger.info(`${wsKey} socket forcefully closed. Will not reconnect.`);
                }
                break;
        }
        this.emit('error', { error, wsKey, wsUrl });
    }
    reconnectWithDelay(wsKey, connectionDelayMs, wsUrl) {
        this.clearTimers(wsKey);
        if (this.wsStore.getConnectionState(wsKey) !==
            WsStore_1.WsConnectionStateEnum.CONNECTING) {
            this.setWsState(wsKey, WsStore_1.WsConnectionStateEnum.RECONNECTING);
        }
        this.logger.info('Reconnecting to websocket with delay...', {
            ...loggerCategory,
            wsKey,
            connectionDelayMs,
        });
        if (this.wsStore.get(wsKey)?.activeReconnectTimer) {
            this.clearReconnectTimer(wsKey);
        }
        this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
            this.clearReconnectTimer(wsKey);
            if (wsKey.includes('userData')) {
                const { market, symbol, isTestnet } = (0, requestUtils_1.getContextFromWsKey)(wsKey);
                this.logger.info('Reconnecting to user data stream', {
                    ...loggerCategory,
                    wsKey,
                    market,
                    symbol,
                });
                this.wsStore.delete(wsKey);
                this.respawnUserDataStream(market, symbol, isTestnet);
                return;
            }
            this.logger.info('Reconnecting to public websocket', {
                ...loggerCategory,
                wsKey,
                wsUrl,
            });
            this.connectToWsUrl(wsUrl, wsKey);
        }, connectionDelayMs);
    }
    clearTimers(wsKey) {
        this.clearPingTimer(wsKey);
        this.clearPongTimer(wsKey);
        this.clearReconnectTimer(wsKey);
    }
    clearPingTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState?.activePingTimer) {
            clearInterval(wsState.activePingTimer);
            wsState.activePingTimer = undefined;
        }
    }
    clearPongTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState?.activePongTimer) {
            clearTimeout(wsState.activePongTimer);
            wsState.activePongTimer = undefined;
        }
    }
    clearReconnectTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState?.activeReconnectTimer) {
            clearTimeout(wsState.activeReconnectTimer);
            wsState.activeReconnectTimer = undefined;
        }
    }
    clearUserDataKeepAliveTimer(listenKey) {
        const state = this.listenKeyStateStore[listenKey];
        if (!state) {
            return;
        }
        if (state.keepAliveTimer) {
            this.logger.silly(`Clearing old listen key interval timer for ${listenKey}`);
            clearInterval(state.keepAliveTimer);
        }
        if (state.keepAliveRetryTimer) {
            this.logger.silly(`Clearing old listen key keepAliveRetry timer for ${listenKey}`);
            clearTimeout(state.keepAliveRetryTimer);
        }
    }
    getWsBaseUrl(market, wsKey) {
        if (this.options.wsUrl) {
            return this.options.wsUrl;
        }
        return wsBaseEndpoints[market];
    }
    getWs(wsKey) {
        return this.wsStore.getWs(wsKey);
    }
    setWsState(wsKey, state) {
        this.wsStore.setConnectionState(wsKey, state);
    }
    getSpotRestClient() {
        if (!this.restClients.spot) {
            this.restClients.spot = new main_client_1.MainClient(this.getRestClientOptions(), this.options.requestOptions);
        }
        return this.restClients.spot;
    }
    getUSDMRestClient(isTestnet) {
        if (isTestnet) {
            if (!this.restClients.usdmFuturesTestnet) {
                this.restClients.usdmFuturesTestnet = new usdm_client_1.USDMClient(this.getRestClientOptions(), this.options.requestOptions, isTestnet);
            }
            return this.restClients.usdmFuturesTestnet;
        }
        if (!this.restClients.usdmFutures) {
            this.restClients.usdmFutures = new usdm_client_1.USDMClient(this.getRestClientOptions(), this.options.requestOptions);
        }
        return this.restClients.usdmFutures;
    }
    getCOINMRestClient(isTestnet) {
        if (isTestnet) {
            if (!this.restClients.coinmFuturesTestnet) {
                this.restClients.coinmFuturesTestnet = new coinm_client_1.CoinMClient(this.getRestClientOptions(), this.options.requestOptions, isTestnet);
            }
            return this.restClients.coinmFuturesTestnet;
        }
        if (!this.restClients.coinmFutures) {
            this.restClients.coinmFutures = new coinm_client_1.CoinMClient(this.getRestClientOptions(), this.options.requestOptions);
        }
        return this.restClients.coinmFutures;
    }
    requestSubscribeTopics(wsKey, topics) {
        const wsMessage = JSON.stringify({
            method: 'SUBSCRIBE',
            params: topics,
            id: new Date().getTime(),
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    requestUnsubscribeTopics(wsKey, topics) {
        const wsMessage = JSON.stringify({
            op: 'UNSUBSCRIBE',
            params: topics,
            id: new Date().getTime(),
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    requestListSubscriptions(wsKey, requestId) {
        const wsMessage = JSON.stringify({
            method: 'LIST_SUBSCRIPTIONS',
            id: requestId,
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    requestSetProperty(wsKey, property, value, requestId) {
        const wsMessage = JSON.stringify({
            method: 'SET_PROPERTY',
            params: [property, value],
            id: requestId,
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    requestGetProperty(wsKey, property, requestId) {
        const wsMessage = JSON.stringify({
            method: 'GET_PROPERTY',
            params: [property],
            id: requestId,
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    getListenKeyState(listenKey, market) {
        const state = this.listenKeyStateStore[listenKey];
        if (state) {
            return state;
        }
        this.listenKeyStateStore[listenKey] = {
            market,
            lastKeepAlive: 0,
            keepAliveTimer: undefined,
            keepAliveRetryTimer: undefined,
            keepAliveFailures: 0,
        };
        return this.listenKeyStateStore[listenKey];
    }
    setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey, symbol, isTestnet) {
        const listenKeyState = this.getListenKeyState(listenKey, market);
        this.clearUserDataKeepAliveTimer(listenKey);
        this.logger.silly(`Created new listen key interval timer for ${listenKey}`);
        const minutes50 = 1000 * 60 * 50;
        listenKeyState.keepAliveTimer = setInterval(() => this.checkKeepAliveListenKey(listenKey, market, ws, wsKey, symbol, isTestnet), minutes50);
    }
    sendKeepAliveForMarket(listenKey, market, ws, wsKey, symbol, isTestnet) {
        switch (market) {
            case 'spot':
                return this.getSpotRestClient().keepAliveSpotUserDataListenKey(listenKey);
            case 'margin':
                return this.getSpotRestClient().keepAliveMarginUserDataListenKey(listenKey);
            case 'isolatedMargin':
                return this.getSpotRestClient().keepAliveIsolatedMarginUserDataListenKey({ listenKey, symbol: symbol });
            case 'coinm':
            case 'options':
            case 'optionsTestnet':
            case 'usdm':
                return this.getUSDMRestClient().keepAliveFuturesUserDataListenKey();
            case 'usdmTestnet':
                return this.getUSDMRestClient(isTestnet).keepAliveFuturesUserDataListenKey();
            case 'coinmTestnet':
                return this.getUSDMRestClient(isTestnet).keepAliveFuturesUserDataListenKey();
            default:
                throwUnhandledSwitch(market, `Failed to send keep alive for user data stream in unhandled market ${market}`);
        }
    }
    async checkKeepAliveListenKey(listenKey, market, ws, wsKey, symbol, isTestnet) {
        const listenKeyState = this.getListenKeyState(listenKey, market);
        try {
            if (listenKeyState.keepAliveRetryTimer) {
                clearTimeout(listenKeyState.keepAliveRetryTimer);
                listenKeyState.keepAliveRetryTimer = undefined;
            }
            await this.sendKeepAliveForMarket(listenKey, market, ws, wsKey, symbol, isTestnet);
            listenKeyState.lastKeepAlive = Date.now();
            listenKeyState.keepAliveFailures = 0;
            this.logger.info(`Completed keep alive cycle for listenKey(${listenKey}) in market(${market})`, { ...loggerCategory, listenKey });
        }
        catch (e) {
            listenKeyState.keepAliveFailures++;
            const errorCode = e?.code;
            if (errorCode === -1125) {
                this.logger.error('FATAL: Failed to keep WS alive for listen key - listen key expired/invalid. Respawning with fresh listen key...', {
                    ...loggerCategory,
                    listenKey,
                    error: e,
                    errorCode,
                    errorMsg: e?.message,
                });
                const shouldReconnectAfterClose = false;
                this.close(wsKey, shouldReconnectAfterClose);
                this.respawnUserDataStream(market, symbol);
                return;
            }
            if (listenKeyState.keepAliveFailures >= 3) {
                this.logger.error('FATAL: Failed to keep WS alive for listen key after 3 attempts', { ...loggerCategory, listenKey, error: e });
                const shouldReconnectAfterClose = false;
                this.close(wsKey, shouldReconnectAfterClose);
                this.respawnUserDataStream(market, symbol);
                return;
            }
            const reconnectDelaySeconds = 1000 * 15;
            this.logger.warning(`Userdata keep alive request failed due to error, trying again with short delay (${reconnectDelaySeconds} seconds)`, {
                ...loggerCategory,
                listenKey,
                error: e,
                keepAliveAttempts: listenKeyState.keepAliveFailures,
            });
            listenKeyState.keepAliveRetryTimer = setTimeout(() => this.checkKeepAliveListenKey(listenKey, market, ws, wsKey, symbol), reconnectDelaySeconds);
        }
    }
    teardownUserDataListenKey(listenKey, ws) {
        if (listenKey) {
            this.clearUserDataKeepAliveTimer(listenKey);
            delete this.listenKeyStateStore[listenKey];
            (0, ws_utils_1.safeTerminateWs)(ws);
        }
    }
    async respawnUserDataStream(market, symbol, isTestnet, respawnAttempt) {
        const forceNewConnection = false;
        const isReconnecting = true;
        let ws;
        try {
            switch (market) {
                case 'spot':
                    ws = await this.subscribeSpotUserDataStream(forceNewConnection, isReconnecting);
                    break;
                case 'margin':
                    ws = await this.subscribeMarginUserDataStream(forceNewConnection, isReconnecting);
                    break;
                case 'isolatedMargin':
                    ws = await this.subscribeIsolatedMarginUserDataStream(symbol, forceNewConnection, isReconnecting);
                    break;
                case 'usdm':
                    ws = await this.subscribeUsdFuturesUserDataStream(isTestnet, forceNewConnection, isReconnecting);
                    break;
                case 'usdmTestnet':
                    ws = await this.subscribeUsdFuturesUserDataStream(true, forceNewConnection, isReconnecting);
                    break;
                case 'coinm':
                    ws = await this.subscribeCoinFuturesUserDataStream(isTestnet, forceNewConnection, isReconnecting);
                    break;
                case 'coinmTestnet':
                    ws = await this.subscribeCoinFuturesUserDataStream(true, forceNewConnection, isReconnecting);
                    break;
                case 'options':
                case 'optionsTestnet':
                    throw new Error('TODO: respawn other user data streams once subscribe methods have been added');
                default:
                    throwUnhandledSwitch(market, `Failed to respawn user data stream - unhandled market: ${market}`);
            }
        }
        catch (e) {
            this.logger.error('Exception trying to spawn user data stream', {
                ...loggerCategory,
                market,
                symbol,
                isTestnet,
                error: e,
            });
            this.emit('error', { wsKey: market + '_' + 'userData', error: e });
        }
        if (!ws) {
            const delayInSeconds = 2;
            this.logger.error('User key respawn failed, trying again with short delay', {
                ...loggerCategory,
                market,
                symbol,
                isTestnet,
                respawnAttempt,
                delayInSeconds,
            });
            setTimeout(() => this.respawnUserDataStream(market, symbol, isTestnet, respawnAttempt ? respawnAttempt + 1 : 1), 1000 * delayInSeconds);
        }
    }
    subscribeEndpoint(endpoint, market, forceNewConnection) {
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, endpoint);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${endpoint}`, wsKey, forceNewConnection);
    }
    subscribeAggregateTrades(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'aggTrade';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeTrades(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'trade';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeCoinIndexPrice(symbol, updateSpeedMs = 3000, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'indexPrice';
        const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
        const market = 'coinm';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}${speedSuffix}`, wsKey, forceNewConnection);
    }
    subscribeMarkPrice(symbol, market, updateSpeedMs = 3000, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'markPrice';
        const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}${speedSuffix}`, wsKey, forceNewConnection);
    }
    subscribeAllMarketMarkPrice(market, updateSpeedMs = 3000, forceNewConnection) {
        const streamName = '!markPrice@arr';
        const speedSuffix = updateSpeedMs === 1000 ? '@1s' : '';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${streamName}${speedSuffix}`, wsKey, forceNewConnection);
    }
    subscribeKlines(symbol, interval, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'kline';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol, interval);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}_${interval}`, wsKey, forceNewConnection);
    }
    subscribeContinuousContractKlines(symbol, contractType, interval, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'continuousKline';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol, interval);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}_${contractType}@${streamName}_${interval}`, wsKey, forceNewConnection);
    }
    subscribeIndexKlines(symbol, interval, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'indexPriceKline';
        const market = 'coinm';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol, interval);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}_${interval}`, wsKey, forceNewConnection);
    }
    subscribeMarkPriceKlines(symbol, interval, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'markPrice_kline';
        const market = 'coinm';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol, interval);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}_${interval}`, wsKey, forceNewConnection);
    }
    subscribeSymbolMini24hrTicker(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'miniTicker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeAllMini24hrTickers(market, forceNewConnection) {
        const streamName = 'miniTicker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}@arr`, wsKey, forceNewConnection);
    }
    subscribeSymbol24hrTicker(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'ticker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeAll24hrTickers(market, forceNewConnection) {
        const streamName = 'ticker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}@arr`, wsKey, forceNewConnection);
    }
    subscribeAllRollingWindowTickers(market, windowSize, forceNewConnection) {
        const streamName = 'ticker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, windowSize);
        const wsUrl = this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}_${windowSize}@arr`;
        return this.connectToWsUrl(wsUrl, wsKey, forceNewConnection);
    }
    subscribeSymbolBookTicker(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'bookTicker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeAllBookTickers(market, forceNewConnection) {
        const streamName = 'bookTicker';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}`, wsKey, forceNewConnection);
    }
    subscribeSymbolLiquidationOrders(symbol, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'forceOrder';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${lowerCaseSymbol}@${streamName}`, wsKey, forceNewConnection);
    }
    subscribeAllLiquidationOrders(market, forceNewConnection) {
        const streamName = 'forceOrder@arr';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/!${streamName}`, wsKey, forceNewConnection);
    }
    subscribePartialBookDepths(symbol, levels, updateMs, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'depth';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName, lowerCaseSymbol);
        const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}${levels}${updateMsSuffx}`, wsKey, forceNewConnection);
    }
    subscribeDiffBookDepth(symbol, updateMs = 100, market, forceNewConnection) {
        const lowerCaseSymbol = symbol.toLowerCase();
        const streamName = 'depth';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'diffBookDepth', lowerCaseSymbol, String(updateMs));
        const updateMsSuffx = typeof updateMs === 'number' ? `@${updateMs}ms` : '';
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) +
            `/ws/${lowerCaseSymbol}@${streamName}${updateMsSuffx}`, wsKey, forceNewConnection);
    }
    subscribeContractInfoStream(market, forceNewConnection) {
        const streamName = '!contractInfo';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, streamName);
        return this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${streamName}`, wsKey, forceNewConnection);
    }
    subscribeSpotAggregateTrades(symbol, forceNewConnection) {
        return this.subscribeAggregateTrades(symbol, 'spot', forceNewConnection);
    }
    subscribeSpotTrades(symbol, forceNewConnection) {
        return this.subscribeTrades(symbol, 'spot', forceNewConnection);
    }
    subscribeSpotKline(symbol, interval, forceNewConnection) {
        return this.subscribeKlines(symbol, interval, 'spot', forceNewConnection);
    }
    subscribeSpotSymbolMini24hrTicker(symbol, forceNewConnection) {
        return this.subscribeSymbolMini24hrTicker(symbol, 'spot', forceNewConnection);
    }
    subscribeSpotAllMini24hrTickers(forceNewConnection) {
        return this.subscribeAllMini24hrTickers('spot', forceNewConnection);
    }
    subscribeSpotSymbol24hrTicker(symbol, forceNewConnection) {
        return this.subscribeSymbol24hrTicker(symbol, 'spot', forceNewConnection);
    }
    subscribeSpotAll24hrTickers(forceNewConnection) {
        return this.subscribeAll24hrTickers('spot', forceNewConnection);
    }
    subscribeSpotSymbolBookTicker(symbol, forceNewConnection) {
        return this.subscribeSymbolBookTicker(symbol, 'spot', forceNewConnection);
    }
    subscribeSpotAllBookTickers(forceNewConnection) {
        return this.subscribeAllBookTickers('spot', forceNewConnection);
    }
    subscribeSpotPartialBookDepth(symbol, levels, updateMs = 1000, forceNewConnection) {
        return this.subscribePartialBookDepths(symbol, levels, updateMs, 'spot', forceNewConnection);
    }
    subscribeSpotDiffBookDepth(symbol, updateMs = 1000, forceNewConnection) {
        return this.subscribeDiffBookDepth(symbol, updateMs, 'spot', forceNewConnection);
    }
    subscribeSpotUserDataStreamWithListenKey(listenKey, forceNewConnection, isReconnecting) {
        const market = 'spot';
        const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'userData', undefined, listenKey);
        if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
            this.logger.silly('Existing spot user data connection in progress for listen key. Avoiding duplicate');
            return this.getWs(wsKey);
        }
        this.setWsState(wsKey, isReconnecting
            ? WsStore_1.WsConnectionStateEnum.RECONNECTING
            : WsStore_1.WsConnectionStateEnum.CONNECTING);
        const ws = this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`, wsKey, forceNewConnection);
        this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey);
        return ws;
    }
    async subscribeSpotUserDataStream(forceNewConnection, isReconnecting) {
        try {
            const { listenKey } = await this.getSpotRestClient().getSpotUserDataListenKey();
            return this.subscribeSpotUserDataStreamWithListenKey(listenKey, forceNewConnection, isReconnecting);
        }
        catch (e) {
            this.logger.error('Failed to connect to spot user data', {
                ...loggerCategory,
                error: e,
            });
            this.emit('error', { wsKey: 'spot' + '_' + 'userData', error: e });
        }
    }
    async subscribeMarginUserDataStream(forceNewConnection, isReconnecting) {
        try {
            const { listenKey } = await this.getSpotRestClient().getMarginUserDataListenKey();
            const market = 'margin';
            const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'userData', undefined, listenKey);
            if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
                this.logger.silly('Existing margin user data connection in progress for listen key. Avoiding duplicate');
                return this.getWs(wsKey);
            }
            this.setWsState(wsKey, isReconnecting
                ? WsStore_1.WsConnectionStateEnum.RECONNECTING
                : WsStore_1.WsConnectionStateEnum.CONNECTING);
            const ws = this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`, wsKey, forceNewConnection);
            this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey);
            return ws;
        }
        catch (e) {
            this.logger.error('Failed to connect to margin user data', {
                ...loggerCategory,
                error: e,
            });
            this.emit('error', { wsKey: 'margin' + '_' + 'userData', error: e });
        }
    }
    async subscribeIsolatedMarginUserDataStream(symbol, forceNewConnection, isReconnecting) {
        try {
            const lowerCaseSymbol = symbol.toLowerCase();
            const { listenKey } = await this.getSpotRestClient().getIsolatedMarginUserDataListenKey({
                symbol: lowerCaseSymbol,
            });
            const market = 'isolatedMargin';
            const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'userData', lowerCaseSymbol, listenKey);
            if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
                this.logger.silly('Existing isolated margin user data connection in progress for listen key. Avoiding duplicate');
                return this.getWs(wsKey);
            }
            this.setWsState(wsKey, isReconnecting
                ? WsStore_1.WsConnectionStateEnum.RECONNECTING
                : WsStore_1.WsConnectionStateEnum.CONNECTING);
            const ws = this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`, wsKey, forceNewConnection);
            this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey, symbol);
            return ws;
        }
        catch (e) {
            this.logger.error('Failed to connect to isolated margin user data', {
                ...loggerCategory,
                error: e,
                symbol,
            });
            this.emit('error', {
                wsKey: 'isolatedMargin' + '_' + 'userData',
                error: e,
            });
        }
    }
    async subscribeUsdFuturesUserDataStream(isTestnet, forceNewConnection, isReconnecting) {
        try {
            const restClient = this.getUSDMRestClient(isTestnet);
            const { listenKey } = await restClient.getFuturesUserDataListenKey();
            const market = isTestnet ? 'usdmTestnet' : 'usdm';
            const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'userData', undefined, listenKey);
            if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
                this.logger.silly('Existing usd futures user data connection in progress for listen key. Avoiding duplicate');
                return this.getWs(wsKey);
            }
            this.setWsState(wsKey, isReconnecting
                ? WsStore_1.WsConnectionStateEnum.RECONNECTING
                : WsStore_1.WsConnectionStateEnum.CONNECTING);
            const ws = this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`, wsKey, forceNewConnection);
            this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey, undefined, isTestnet);
            return ws;
        }
        catch (e) {
            this.logger.error('Failed to connect to USD Futures user data', {
                ...loggerCategory,
                error: e,
            });
            this.emit('error', { wsKey: 'usdm' + '_' + 'userData', error: e });
        }
    }
    async subscribeCoinFuturesUserDataStream(isTestnet, forceNewConnection, isReconnecting) {
        try {
            const { listenKey } = await this.getCOINMRestClient(isTestnet).getFuturesUserDataListenKey();
            const market = isTestnet ? 'coinmTestnet' : 'coinm';
            const wsKey = (0, requestUtils_1.getWsKeyWithContext)(market, 'userData', undefined, listenKey);
            if (!forceNewConnection && this.wsStore.isWsConnecting(wsKey)) {
                this.logger.silly('Existing usd futures user data connection in progress for listen key. Avoiding duplicate');
                return this.getWs(wsKey);
            }
            this.setWsState(wsKey, isReconnecting
                ? WsStore_1.WsConnectionStateEnum.RECONNECTING
                : WsStore_1.WsConnectionStateEnum.CONNECTING);
            const ws = this.connectToWsUrl(this.getWsBaseUrl(market, wsKey) + `/ws/${listenKey}`, wsKey, forceNewConnection);
            this.setKeepAliveListenKeyTimer(listenKey, market, ws, wsKey, undefined, isTestnet);
            return ws;
        }
        catch (e) {
            this.logger.error('Failed to connect to COIN Futures user data', {
                ...loggerCategory,
                error: e,
            });
            this.emit('error', { wsKey: 'coinm' + '_' + 'userData', error: e });
        }
    }
}
exports.WebsocketClient = WebsocketClient;
//# sourceMappingURL=websocket-client.js.map