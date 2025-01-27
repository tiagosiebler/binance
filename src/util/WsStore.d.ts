import WebSocket from 'isomorphic-ws';
import { DefaultLogger } from '../logger';
import { WsKey } from '../websocket-client';
export declare enum WsConnectionStateEnum {
    INITIAL = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    CLOSING = 3,
    RECONNECTING = 4
}
type WsTopic = string;
type WsTopicList = Set<WsTopic>;
interface WsStoredState {
    ws?: WebSocket;
    connectionState?: WsConnectionStateEnum;
    activePingTimer?: ReturnType<typeof setTimeout> | undefined;
    activePongTimer?: ReturnType<typeof setTimeout> | undefined;
    activeReconnectTimer?: ReturnType<typeof setTimeout> | undefined;
    subscribedTopics: WsTopicList;
}
export default class WsStore {
    private wsState;
    private logger;
    constructor(logger: typeof DefaultLogger);
    get(key: WsKey, createIfMissing?: true): WsStoredState;
    get(key: WsKey, createIfMissing?: false): WsStoredState | undefined;
    getKeys(): WsKey[];
    create(key: WsKey): WsStoredState | undefined;
    delete(key: WsKey): void;
    hasExistingActiveConnection(key: WsKey): boolean;
    getWs(key: WsKey): WebSocket | undefined;
    setWs(key: WsKey, wsConnection: WebSocket): WebSocket;
    isWsOpen(key: WsKey): boolean;
    getConnectionState(key: WsKey): WsConnectionStateEnum;
    setConnectionState(key: WsKey, state: WsConnectionStateEnum): void;
    isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean;
    isWsConnecting(key: WsKey): boolean;
    getTopics(key: WsKey): WsTopicList;
    getTopicsByKey(): Record<WsKey, WsTopicList>;
    addTopic(key: WsKey, topic: WsTopic): WsTopicList;
    deleteTopic(key: WsKey, topic: WsTopic): boolean;
}
export {};
