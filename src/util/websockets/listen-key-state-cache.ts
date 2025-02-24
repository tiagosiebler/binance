import { WsMarket } from '../../types/websockets';
import { DefaultLogger } from '../logger';

interface ListenKeyPersistenceState {
  keepAliveTimer: ReturnType<typeof setInterval> | undefined;
  keepAliveRetryTimer: ReturnType<typeof setTimeout> | undefined;
  lastKeepAlive: number;
  market: WsMarket;
  keepAliveFailures: number;
}

export class ListenKeyStateCache {
  private logger: DefaultLogger;

  private listenKeyStateStore: Record<string, ListenKeyPersistenceState> = {};

  constructor(customLogger?: DefaultLogger) {
    this.logger = customLogger || DefaultLogger;
  }

  public getListenKeyState(
    listenKey: string,
    market: WsMarket,
  ): ListenKeyPersistenceState {
    const state = this.listenKeyStateStore[listenKey];
    if (state) {
      return state;
    }

    // this.logger.trace(
    //   `--> getListenKeyState(${market}) -> CREATED NEW listenKeyState for ${listenKey}`,
    // );
    this.listenKeyStateStore[listenKey] = {
      market,
      lastKeepAlive: 0,
      keepAliveTimer: undefined,
      keepAliveRetryTimer: undefined,
      keepAliveFailures: 0,
    };
    return this.listenKeyStateStore[listenKey];
  }

  private clearUserDataKeepAliveTimer(listenKey: string): void {
    const state = this.listenKeyStateStore[listenKey];
    if (!state) {
      // this.logger.trace(
      //   `clearUserDataKeepAliveTimer() -> No listenKeyState found for ${listenKey}`,
      // );
      return;
    }

    if (state.keepAliveTimer) {
      // this.logger.trace(
      //   `----> clearUserDataKeepAliveTimer() -> CLEARED old listenKey keepAlive INTERVAL timer for ${listenKey}`,
      // );
      clearInterval(state.keepAliveTimer);
    } else {
      // this.logger.trace(
      //   `----> clearUserDataKeepAliveTimer() -> No listen key keepAlive INTERVAL timer to clear for ${listenKey}`,
      // );
    }

    if (state.keepAliveRetryTimer) {
      // this.logger.trace(
      //   `----> clearUserDataKeepAliveTimer() -> CLEARED old listen key keepAlive RETRY timer for ${listenKey}`,
      // );
      clearTimeout(state.keepAliveRetryTimer);
    } else {
      // this.logger.trace(
      //   `----> clearUserDataKeepAliveTimer() -> No keepAlive RETRY timer to clear for ${listenKey}`,
      // );
    }
  }

  /**
   * Remove all state for listen key. Clears timers too, if any exist on this listen key store.
   */
  public clearAllListenKeyState(listenKey: string): void {
    // this.logger.trace(
    //   `clearAllListenKeyState() -> Checking whether we need to clear timers and remove state for ${listenKey}`,
    // );
    this.clearUserDataKeepAliveTimer(listenKey);

    if (this.listenKeyStateStore[listenKey]) {
      // this.logger.trace(
      //   `-> clearAllListenKeyState() -> CLEARED ALL listen key state for ${listenKey}`,
      // );
    } else {
      // this.logger.trace(
      //   `-> clearAllListenKeyState() -> No listen key state to clear ${listenKey}`,
      // );
    }

    delete this.listenKeyStateStore[listenKey];
  }
}
