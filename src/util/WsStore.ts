import { WsKey } from '../websocket-client';
import { DefaultLogger } from '../logger';

import WebSocket from 'isomorphic-ws';

export enum WsConnectionStateEnum {
  INITIAL = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
  RECONNECTING = 4,
  // ERROR = 5,
}

/** A "topic" is always a string */
type WsTopic = string;

/**
 * A "Set" is used to ensure we only subscribe to a topic once (tracking a list of unique topics we're expected to be connected to)
 * Note: Accurate duplicate tracking only works for plaintext topics. E.g. JSON objects may not be seen as duplicates if keys are in different orders. If that's needed, check the FTX implementation.
 */
type WsTopicList = Set<WsTopic>;

interface WsStoredState {
  /** The currently active websocket connection */
  ws?: WebSocket;
  /** The current lifecycle state of the connection (enum) */
  connectionState?: WsConnectionStateEnum;
  /** A timer that will send an upstream heartbeat (ping) when it expires */
  activePingTimer?: ReturnType<typeof setTimeout> | undefined;
  /** A timer tracking that an upstream heartbeat was sent, expecting a reply before it expires */
  activePongTimer?: ReturnType<typeof setTimeout> | undefined;
  /** If a reconnection is in progress, this will have the timer for the delayed reconnect */
  activeReconnectTimer?: ReturnType<typeof setTimeout> | undefined;
  /**
   * All the topics we are expected to be subscribed to (and we automatically resubscribe to if the connection drops)
   */
  subscribedTopics: WsTopicList;
}

export default class WsStore {
  private wsState: Record<string, WsStoredState>;
  private logger: typeof DefaultLogger;

  constructor(logger: typeof DefaultLogger) {
    this.logger = logger || DefaultLogger;
    this.wsState = {};
  }

  /** Get WS stored state for key, optionally create if missing */
  get(key: WsKey, createIfMissing?: true): WsStoredState;
  get(key: WsKey, createIfMissing?: false): WsStoredState | undefined;
  get(key: WsKey, createIfMissing?: boolean): WsStoredState | undefined {
    if (this.wsState[key]) {
      return this.wsState[key];
    }

    if (createIfMissing) {
      return this.create(key);
    }
  }

  getKeys(): WsKey[] {
    return Object.keys(this.wsState) as WsKey[];
  }

  create(key: WsKey): WsStoredState | undefined {
    if (this.hasExistingActiveConnection(key)) {
      this.logger.warning(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key)
      );
    }
    this.wsState[key] = {
      subscribedTopics: new Set(),
      connectionState: WsConnectionStateEnum.INITIAL,
    };
    return this.get(key);
  }

  delete(key: WsKey) {
    if (this.hasExistingActiveConnection(key)) {
      const ws = this.getWs(key);
      this.logger.warning(
        'WsStore deleting state for connection still open: ',
        ws
      );
      ws?.close();
    }
    delete this.wsState[key];
  }

  /* connection websocket */

  hasExistingActiveConnection(key: WsKey) {
    return this.get(key) && this.isWsOpen(key);
  }

  getWs(key: WsKey): WebSocket | undefined {
    return this.get(key)?.ws;
  }

  setWs(key: WsKey, wsConnection: WebSocket): WebSocket {
    if (this.isWsOpen(key)) {
      this.logger.warning(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key)
      );
    }
    this.get(key, true)!.ws = wsConnection;
    return wsConnection;
  }

  /* connection state */

  isWsOpen(key: WsKey): boolean {
    const existingConnection = this.getWs(key);
    return (
      !!existingConnection &&
      existingConnection.readyState === existingConnection.OPEN
    );
  }

  getConnectionState(key: WsKey): WsConnectionStateEnum {
    return this.get(key, true)!.connectionState!;
  }

  setConnectionState(key: WsKey, state: WsConnectionStateEnum) {
    this.get(key, true)!.connectionState = state;
  }

  isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean {
    return this.getConnectionState(key) === state;
  }

  isWsConnecting(key: WsKey): boolean {
    return (
      this.isConnectionState(key, WsConnectionStateEnum.CONNECTING) ||
      this.isConnectionState(key, WsConnectionStateEnum.RECONNECTING)
    );
  }

  /* subscribed topics */

  getTopics(key: WsKey): WsTopicList {
    return this.get(key, true)!.subscribedTopics;
  }

  getTopicsByKey(): Record<WsKey, WsTopicList> {
    const result = {};
    for (const refKey in this.wsState) {
      result[refKey] = this.getTopics(refKey);
    }
    return result;
  }

  addTopic(key: WsKey, topic: WsTopic) {
    return this.getTopics(key).add(topic);
  }

  deleteTopic(key: WsKey, topic: WsTopic) {
    return this.getTopics(key).delete(topic);
  }
}
