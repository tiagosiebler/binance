import { WsConnectionState } from '../websocket-client';
import { DefaultLogger } from '../logger';

import WebSocket from 'isomorphic-ws';

type WsTopic = string;
type WsTopicList = Set<WsTopic>;

interface WsStoredState {
  ws?: WebSocket;
  connectionState?: WsConnectionState;
  activePingTimer?: NodeJS.Timeout | number | undefined;
  activePongTimer?: NodeJS.Timeout | number | undefined;
  subscribedTopics: WsTopicList;
};


export default class WsStore {
  private wsState: Record<string, WsStoredState>
  private logger: typeof DefaultLogger;

  constructor(logger: typeof DefaultLogger) {
    this.logger = logger || DefaultLogger;
    this.wsState = {};
  }

  get(key: string, createIfMissing?: boolean): WsStoredState | undefined {
    if (this.wsState[key]) {
      return this.wsState[key];
    }

    if (createIfMissing) {
      return this.create(key);
    }
  }

  getKeys(): string[] {
    return Object.keys(this.wsState);
  }

  create(key: string): WsStoredState | undefined {
    if (this.hasExistingActiveConnection(key)) {
      this.logger.warning('WsStore setConnection() overwriting existing open connection: ', this.getWs(key));
    }
    this.wsState[key] = {
      subscribedTopics: new Set(),
      connectionState: WsConnectionState.READY_STATE_INITIAL
    };
    return this.get(key);
  }

  delete(key: string) {
    if (this.hasExistingActiveConnection(key)) {
      const ws = this.getWs(key);
      this.logger.warning('WsStore deleting state for connection still open: ', ws);
      ws?.close();
    }
    delete this.wsState[key];
  }

  /* connection websocket */

  hasExistingActiveConnection(key: string) {
    return this.get(key) && this.isWsOpen(key);
  }

  getWs(key: string): WebSocket | undefined {
    return this.get(key)?.ws;
  }

  setWs(key: string, wsConnection: WebSocket): WebSocket {
    if (this.isWsOpen(key)) {
      this.logger.warning('WsStore setConnection() overwriting existing open connection: ', this.getWs(key));
    }
    this.get(key, true)!.ws = wsConnection;
    return wsConnection;
  }

  /* connection state */

  isWsOpen(key: string): boolean {
    const existingConnection = this.getWs(key);
    return !!existingConnection && existingConnection.readyState === existingConnection.OPEN;
  }

  getConnectionState(key: string): WsConnectionState {
    return this.get(key, true)!.connectionState!;
  }

  setConnectionState(key: string, state: WsConnectionState) {
    this.get(key, true)!.connectionState = state;
  }

  isConnectionState(key: string, state: WsConnectionState): boolean {
    return this.getConnectionState(key) === state;
  }

  /* subscribed topics */

  getTopics(key: string): WsTopicList {
    return this.get(key, true)!.subscribedTopics;
  }

  getTopicsByKey(): Record<string, WsTopicList> {
    const result = {};
    for (const refKey in this.wsState) {
      result[refKey] = this.getTopics(refKey);
    }
    return result;
  }

  addTopic(key: string, topic: WsTopic) {
    return this.getTopics(key).add(topic);
  }

  deleteTopic(key: string, topic: WsTopic) {
    return this.getTopics(key).delete(topic);
  }
}
