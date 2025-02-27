/* eslint-disable @typescript-eslint/no-explicit-any */
import WebSocket from 'isomorphic-ws';

export enum WsConnectionStateEnum {
  INITIAL = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
  RECONNECTING = 4,
  // ERROR_RECONNECTING = 5,
  ERROR = 5,
}

export interface DeferredPromise<TSuccess = any, TError = any> {
  resolve?: (value: TSuccess) => TSuccess;
  reject?: (value: TError) => TError;
  promise?: Promise<TSuccess>;
}

export interface WSConnectedResult {
  wsKey: string;
  ws: WebSocket;
}

export interface WsStoredState<TWSTopicSubscribeEvent extends string | object> {
  /** The currently active websocket connection */
  ws?: WebSocket;
  /** The current lifecycle state of the connection (enum) */
  connectionState?: WsConnectionStateEnum;
  connectionStateChangedAt?: Date;
  /** A timer that will send an upstream heartbeat (ping) when it expires */
  activePingTimer?: ReturnType<typeof setTimeout> | undefined;
  /** A timer tracking that an upstream heartbeat was sent, expecting a reply before it expires */
  activePongTimer?: ReturnType<typeof setTimeout> | undefined;
  /** If a reconnection is in progress, this will have the timer for the delayed reconnect */
  activeReconnectTimer?: ReturnType<typeof setTimeout> | undefined;
  /**
   * When a connection attempt is in progress (even for reconnect), a promise is stored here.
   *
   * This promise will resolve once connected (and will then get removed);
   */
  // connectionInProgressPromise?: DeferredPromise | undefined;
  deferredPromiseStore: Record<string, DeferredPromise>;
  /**
   * All the topics we are expected to be subscribed to on this connection (and we automatically resubscribe to if the connection drops)
   *
   * A "Set" and a deep-object-match are used to ensure we only subscribe to a
   * topic once (tracking a list of unique topics we're expected to be connected to)
   */
  subscribedTopics: Set<TWSTopicSubscribeEvent>;
  /** Whether this connection has completed authentication (only applies to private connections) */
  isAuthenticated?: boolean;
  /**
   * Whether this connection has completed authentication before for the Websocket API, so it k
   * nows to automatically reauth if reconnected
   */
  didAuthWSAPI?: boolean;
  /** To reauthenticate on the WS API, which channel do we send to? */
  WSAPIAuthChannel?: string;
}
