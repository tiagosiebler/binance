/* eslint-disable @typescript-eslint/no-explicit-any */
import WebSocket from 'isomorphic-ws';

import { DefaultLogger } from '../logger';
import {
  DeferredPromise,
  WSConnectedResult,
  WsConnectionStateEnum,
  WsStoredState,
} from './WsStore.types';

/**
 * Simple comparison of two objects, only checks 1-level deep (nested objects won't match)
 */
export function isDeepObjectMatch(object1: unknown, object2: unknown): boolean {
  if (typeof object1 === 'string' && typeof object2 === 'string') {
    return object1 === object2;
  }

  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    return false;
  }

  for (const key in object1) {
    const value1 = (object1 as any)[key];
    const value2 = (object2 as any)[key];

    if (value1 !== value2) {
      return false;
    }
  }
  return true;
}

export const DEFERRED_PROMISE_REF = {
  CONNECTION_IN_PROGRESS: 'CONNECTION_IN_PROGRESS',
  AUTHENTICATION_IN_PROGRESS: 'AUTHENTICATION_IN_PROGRESS',
} as const;

type DeferredPromiseRef =
  (typeof DEFERRED_PROMISE_REF)[keyof typeof DEFERRED_PROMISE_REF];

export class WsStore<
  WsKey extends string,
  TWSTopicSubscribeEventArgs extends string | object,
> {
  private wsState: Record<string, WsStoredState<TWSTopicSubscribeEventArgs>> =
    {};

  private logger: DefaultLogger;

  constructor(logger: DefaultLogger) {
    this.logger = logger || DefaultLogger;
  }

  /** Get WS stored state for key, optionally create if missing */
  get(
    key: WsKey,
    createIfMissing?: true,
  ): WsStoredState<TWSTopicSubscribeEventArgs>;

  get(
    key: WsKey,
    createIfMissing?: false,
  ): WsStoredState<TWSTopicSubscribeEventArgs> | undefined;

  get(
    key: WsKey,
    createIfMissing?: boolean,
  ): WsStoredState<TWSTopicSubscribeEventArgs> | undefined {
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

  create(key: WsKey): WsStoredState<TWSTopicSubscribeEventArgs> | undefined {
    if (this.hasExistingActiveConnection(key)) {
      this.logger.info(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key),
      );
    }
    this.wsState[key] = {
      subscribedTopics: new Set<TWSTopicSubscribeEventArgs>(),
      connectionState: WsConnectionStateEnum.INITIAL,
      deferredPromiseStore: {},
    };
    return this.get(key);
  }

  delete(key: WsKey): void {
    // TODO: should we allow this at all? Perhaps block this from happening...
    if (this.hasExistingActiveConnection(key)) {
      const ws = this.getWs(key);
      this.logger.info(
        'WsStore deleting state for connection still open: ',
        ws,
      );
      ws?.close();
    }
    delete this.wsState[key];
  }

  /* connection websocket */

  hasExistingActiveConnection(key: WsKey): boolean {
    return this.get(key) && this.isWsOpen(key);
  }

  getWs(key: WsKey): WebSocket | undefined {
    return this.get(key)?.ws;
  }

  setWs(key: WsKey, wsConnection: WebSocket): WebSocket {
    if (this.isWsOpen(key)) {
      this.logger.info(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key),
      );
    }

    this.get(key, true).ws = wsConnection;
    return wsConnection;
  }

  /**
   * deferred promises
   */

  getDeferredPromise<TSuccessResult = any>(
    wsKey: WsKey,
    promiseRef: string | DeferredPromiseRef,
  ): DeferredPromise<TSuccessResult> | undefined {
    const storeForKey = this.get(wsKey);
    if (!storeForKey) {
      return;
    }

    const deferredPromiseStore = storeForKey.deferredPromiseStore;
    return deferredPromiseStore[promiseRef];
  }

  createDeferredPromise<TSuccessResult = any>(
    wsKey: WsKey,
    promiseRef: string | DeferredPromiseRef,
    throwIfExists: boolean,
  ): DeferredPromise<TSuccessResult> {
    const existingPromise = this.getDeferredPromise<TSuccessResult>(
      wsKey,
      promiseRef,
    );
    if (existingPromise) {
      if (throwIfExists) {
        throw new Error(`Promise exists for "${wsKey}"`);
      } else {
        // console.log('existing promise');
        return existingPromise;
      }
    }

    // console.log('create promise');
    const createIfMissing = true;
    const storeForKey = this.get(wsKey, createIfMissing);

    // TODO: Once stable, use Promise.withResolvers in future
    const deferredPromise: DeferredPromise = {};

    deferredPromise.promise = new Promise((resolve, reject) => {
      deferredPromise.resolve = resolve;
      deferredPromise.reject = reject;
    });

    const deferredPromiseStore = storeForKey.deferredPromiseStore;

    deferredPromiseStore[promiseRef] = deferredPromise;

    return deferredPromise;
  }

  resolveDeferredPromise(
    wsKey: WsKey,
    promiseRef: string | DeferredPromiseRef,
    value: unknown,
    removeAfter: boolean,
  ): void {
    const promise = this.getDeferredPromise(wsKey, promiseRef);
    if (promise?.resolve) {
      promise.resolve(value);
    }
    if (removeAfter) {
      this.removeDeferredPromise(wsKey, promiseRef);
    }
  }

  rejectDeferredPromise(
    wsKey: WsKey,
    promiseRef: string | DeferredPromiseRef,
    value: unknown,
    removeAfter: boolean,
  ): void {
    const promise = this.getDeferredPromise(wsKey, promiseRef);

    if (promise?.reject) {
      this.logger.trace(
        `rejectDeferredPromise(): rejecting ${wsKey}/${promiseRef}`,
        value,
      );

      if (typeof value === 'string') {
        promise.reject(new Error(value));
      } else {
        promise.reject(value);
      }
    }

    if (removeAfter) {
      this.removeDeferredPromise(wsKey, promiseRef);
    }
  }

  removeDeferredPromise(
    wsKey: WsKey,
    promiseRef: string | DeferredPromiseRef,
  ): void {
    const storeForKey = this.get(wsKey);
    if (!storeForKey) {
      return;
    }

    const deferredPromise = storeForKey.deferredPromiseStore[promiseRef];
    if (deferredPromise) {
      // Just in case it's pending
      if (deferredPromise.resolve) {
        deferredPromise.resolve('promiseRemoved');
      }

      delete storeForKey.deferredPromiseStore[promiseRef];
    }
  }

  rejectAllDeferredPromises(wsKey: WsKey, reason: string): void {
    const storeForKey = this.get(wsKey);
    const deferredPromiseStore = storeForKey.deferredPromiseStore;
    if (!storeForKey || !deferredPromiseStore) {
      return;
    }

    const reservedKeys = Object.values(DEFERRED_PROMISE_REF) as string[];

    for (const promiseRef in deferredPromiseStore) {
      // Skip reserved keys, such as the connection promise
      if (reservedKeys.includes(promiseRef)) {
        continue;
      }

      try {
        this.logger.trace(
          `rejectAllDeferredPromises(): rejecting ${wsKey}/${promiseRef}/${reason}`,
        );
        this.rejectDeferredPromise(wsKey, promiseRef, reason, true);
      } catch (e) {
        this.logger.error(
          'rejectAllDeferredPromises(): Exception rejecting deferred promise',
          { wsKey: wsKey, reason, promiseRef, exception: e },
        );
      }
    }
  }

  /** Get promise designed to track a connection attempt in progress. Resolves once connected. */
  getConnectionInProgressPromise(
    wsKey: WsKey,
  ): DeferredPromise<WSConnectedResult> | undefined {
    return this.getDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.CONNECTION_IN_PROGRESS,
    );
  }

  getAuthenticationInProgressPromise(
    wsKey: WsKey,
  ): DeferredPromise<WSConnectedResult & { event: any }> | undefined {
    return this.getDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.AUTHENTICATION_IN_PROGRESS,
    );
  }

  /**
   * Create a deferred promise designed to track a connection attempt in progress.
   *
   * Will throw if existing promise is found.
   */
  createConnectionInProgressPromise(
    wsKey: WsKey,
    throwIfExists: boolean,
  ): DeferredPromise<WSConnectedResult> {
    return this.createDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.CONNECTION_IN_PROGRESS,
      throwIfExists,
    );
  }

  createAuthenticationInProgressPromise(
    wsKey: WsKey,
    throwIfExists: boolean,
  ): DeferredPromise<WSConnectedResult & { event: any }> {
    return this.createDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.AUTHENTICATION_IN_PROGRESS,
      throwIfExists,
    );
  }

  /** Remove promise designed to track a connection attempt in progress */
  removeConnectingInProgressPromise(wsKey: WsKey): void {
    return this.removeDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.CONNECTION_IN_PROGRESS,
    );
  }

  removeAuthenticationInProgressPromise(wsKey: WsKey): void {
    return this.removeDeferredPromise(
      wsKey,
      DEFERRED_PROMISE_REF.AUTHENTICATION_IN_PROGRESS,
    );
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
    return this.get(key, true).connectionState!;
  }

  setConnectionState(key: WsKey, state: WsConnectionStateEnum) {
    this.get(key, true).connectionState = state;
    this.get(key, true).connectionStateChangedAt = new Date();
  }

  isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean {
    return this.getConnectionState(key) === state;
  }

  /**
   * Check if we're currently in the process of opening a connection for any reason. Safer than only checking "CONNECTING" as the state
   * @param key
   * @returns
   */
  isConnectionAttemptInProgress(key: WsKey): boolean {
    const isConnectionInProgress =
      this.isConnectionState(key, WsConnectionStateEnum.CONNECTING) ||
      this.isConnectionState(key, WsConnectionStateEnum.RECONNECTING);

    if (isConnectionInProgress) {
      const wsState = this.get(key, true);
      const stateLastChangedAt = wsState?.connectionStateChangedAt;
      const stateChangedAtTimestamp = stateLastChangedAt?.getTime();
      if (stateChangedAtTimestamp) {
        const timestampNow = new Date().getTime();
        const stateChangedTimeAgo = timestampNow - stateChangedAtTimestamp;
        const stateChangeTimeout = 15000; // allow a max 15 second timeout since the last state change before assuming stuck;
        if (stateChangedTimeAgo >= stateChangeTimeout) {
          const msg = 'State change timed out, reconnect workflow stuck?';
          this.logger.error(msg, { key, wsState });
          this.setConnectionState(key, WsConnectionStateEnum.ERROR);
        }
      }
    }

    return isConnectionInProgress;
  }

  /* subscribed topics */

  getTopics(key: WsKey): Set<TWSTopicSubscribeEventArgs> {
    return this.get(key, true).subscribedTopics;
  }

  getTopicsByKey(): Record<string, Set<TWSTopicSubscribeEventArgs>> {
    const result: any = {};

    for (const refKey in this.wsState) {
      result[refKey] = this.getTopics(refKey as WsKey);
    }

    return result;
  }

  /**
   * Find matching "topic" request from the store
   * @param key
   * @param topic
   * @returns
   */
  getMatchingTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    const allTopics = this.getTopics(key).values();
    for (const storedTopic of allTopics) {
      if (isDeepObjectMatch(topic, storedTopic)) {
        return storedTopic;
      }
    }
  }

  addTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    // Check for duplicate topic. If already tracked, don't store this one
    const existingTopic = this.getMatchingTopic(key, topic);
    if (existingTopic) {
      return this.getTopics(key);
    }
    return this.getTopics(key).add(topic);
  }

  deleteTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    // Check if we're subscribed to a topic like this
    const storedTopic = this.getMatchingTopic(key, topic);
    if (storedTopic) {
      this.getTopics(key).delete(storedTopic);
    }

    return this.getTopics(key);
  }
}
