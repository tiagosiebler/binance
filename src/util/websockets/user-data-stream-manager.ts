import {
  WebsocketClientOptions,
  WsMarket,
} from '../../types/websockets/ws-general';
import { DefaultLogger } from '../logger';
import { RestClientOptions } from '../requestUtils';
import { neverGuard } from '../typeGuards';
import { WS_ERROR_CODE } from './enum';
import { ListenKeyStateCache } from './listen-key-state-cache';
import { RestClientCache } from './rest-client-cache';
import {
  getLegacyWsKeyContext,
  getLegacyWsStoreKeyWithContext,
  getRealWsKeyFromDerivedWsKey,
  MiscUserDataConnectionState,
  safeTerminateWs,
  WS_LOGGER_CATEGORY,
  WsKey,
  WsTopicRequest,
} from './websocket-util';
import { WsStore } from './WsStore';
import { WSConnectedResult, WsConnectionStateEnum } from './WsStore.types';

export interface UserDataStreamManagerConfig {
  logger: DefaultLogger;
  wsStore: WsStore<WsKey, WsTopicRequest<string>>;
  restClientCache: RestClientCache;

  /** Fn pointers so we don't have direct access to the WS client */
  respawnUserDataFn: (
    wsKey: WsKey,
    market: WsMarket,
    context: {
      symbol?: string;
      isTestnet?: boolean;
      respawnAttempt?: number;
    },
  ) => Promise<void>;

  getWsUrlFn(
    wsKey: WsKey,
    connectionType: 'market' | 'userData' | 'wsAPI',
  ): Promise<string>;

  getRestClientOptionsFn: () => RestClientOptions;
  getWsClientOptionsfn: () => WebsocketClientOptions;

  closeWsFn: (wsKey: WsKey, force?: boolean) => any;

  connectFn: (
    wsKey: WsKey,
    customUrl?: string | undefined,
    throwOnError?: boolean,
  ) => Promise<WSConnectedResult | undefined>;
}

/**
 * A minimal attempt at separating all the user data stream handling workflows from
 * the rest of the WS Client logic.
 *
 * This abstraction handles:
 *
 * - spawning the ws connection with the listen key
 * - tracking metadata for a connection & the embedded listen key
 * - handling listen key keep-alive triggers
 * - handling ws respawn with listen key checks
 */
export class UserDataStreamManager {
  private logger: DefaultLogger;

  private listenKeyStateCache: ListenKeyStateCache;

  private wsStore: WsStore<WsKey, WsTopicRequest<string, unknown>>;

  private restClientCache: RestClientCache;

  private respawnUserDataStream: UserDataStreamManagerConfig['respawnUserDataFn'];

  private closeWsFn: UserDataStreamManagerConfig['closeWsFn'];

  private connectFn: UserDataStreamManagerConfig['connectFn'];

  private getWsUrlFn: UserDataStreamManagerConfig['getWsUrlFn'];

  private getRestClientOptionsFn: UserDataStreamManagerConfig['getRestClientOptionsFn'];

  private getWsClientOptionsfn: UserDataStreamManagerConfig['getWsClientOptionsfn'];

  constructor(config: UserDataStreamManagerConfig) {
    this.logger = config.logger;
    this.wsStore = config.wsStore;
    this.restClientCache = config.restClientCache;
    this.respawnUserDataStream = config.respawnUserDataFn;
    this.closeWsFn = config.closeWsFn;
    this.connectFn = config.connectFn;
    this.getWsUrlFn = config.getWsUrlFn;
    this.getRestClientOptionsFn = config.getRestClientOptionsFn;
    this.getWsClientOptionsfn = config.getWsClientOptionsfn;

    this.listenKeyStateCache = new ListenKeyStateCache(this.logger);

    // this.wsClient = config.wsClient;
  }

  // getWSClient(): WebsocketClient {
  //   return this.wsClient;
  // }

  getWsStore(): WsStore<WsKey, WsTopicRequest<string, unknown>> {
    return this.wsStore;
  }

  public async subscribeGeneralUserDataStreamWithListenKey(
    wsKey: WsKey,
    market: WsMarket,
    listenKey: string,
    forceNewConnection?: boolean,
    miscState?: MiscUserDataConnectionState,
  ): Promise<WSConnectedResult | undefined> {
    const streamName = 'userData';
    const symbol = miscState?.symbol;

    this.logger.trace('subscribeGeneralUserDataStreamWithListenKey(): ', {
      wsKey,
      market,
      listenKey,
      forceNewConnection,
      miscState,
    });

    const derivedWsKey = getLegacyWsStoreKeyWithContext(
      market,
      streamName,
      symbol,
      listenKey,
      wsKey,
    );

    const wsState = this.getWsStore().get(derivedWsKey, true);
    if (
      !forceNewConnection &&
      this.getWsStore().isConnectionAttemptInProgress(derivedWsKey)
    ) {
      const stateLastChangedAt = wsState?.connectionStateChangedAt;
      const timestamp = stateLastChangedAt?.getTime();
      const timestampNow = new Date().getTime();

      const stateChangedTimeAgo = timestampNow - (timestamp || NaN);

      this.logger.trace(
        `Existing ${wsKey} user data connection in progress for listen key. Avoiding duplicate`,
        { stateLastChangedAt, stateChangedTimeAgo, wsKey, derivedWsKey },
      );
      return this.getWsStore().getWs(derivedWsKey);
    }

    // Prepare the WS state for awareness whether this is a reconnect or fresh connect
    if (miscState?.isReconnecting) {
      this.getWsStore().setConnectionState(
        derivedWsKey,
        WsConnectionStateEnum.RECONNECTING,
      );
    }

    // Begin the connection process with the active listen key
    try {
      const wsBaseUrl = await this.getWsUrlFn(wsKey, 'userData');
      const wsURL = wsBaseUrl + `/${listenKey}`;

      const throwOnConnectionError = true;
      const connectResult = await this.connectFn(
        derivedWsKey,
        wsURL,
        throwOnConnectionError,
      );

      if (!connectResult) {
        this.logger.error(
          'Exception in user data manager, connection error? ',
          { wsBaseUrl, wsURL, connectResult },
        );
        throw new Error(
          'userDataManager->subscribeGeneral()-> connection error?',
        );
      }

      // Start & store timer to keep alive listen key (and handle expiration)
      this.setKeepAliveListenKeyTimer(
        listenKey,
        market,
        connectResult.ws,
        derivedWsKey,
      );

      return connectResult.ws;
    } catch (e) {
      this.logger.error(
        'Exception in subscribeGeneralUserDataStreamWithListenKey()',
        { ...WS_LOGGER_CATEGORY, wsKey, derivedWsKey, e: e?.stack || e },
      );

      // In case any timers already exist, pre-wipe
      this.listenKeyStateCache.clearAllListenKeyState(listenKey);

      // So the next attempt doesn't think an attempt is already in progress
      this.getWsStore().setConnectionState(
        derivedWsKey,
        WsConnectionStateEnum.ERROR,
      );

      throw e;
    }
  }

  private setKeepAliveListenKeyTimer(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    // This MUST happen before fetching listenKey state,
    // since the getListenKeyState() creates new state,
    // while clearAllListenKeyState DELETES it
    this.listenKeyStateCache.clearAllListenKeyState(listenKey);

    const listenKeyState = this.listenKeyStateCache.getListenKeyState(
      listenKey,
      market,
    );

    // this.logger.trace(
    //   `----> setKeepAliveListenKeyTimer() -> CREATED NEW keepAliveListenKey INTERVAL timer for ${listenKey}`,
    // );

    // Set timer to keep WS alive every 50 minutes
    const minutes50 = 1000 * 60 * 50;
    listenKeyState.keepAliveTimer = setInterval(
      () =>
        this.checkKeepAliveListenKey(
          listenKey,
          market,
          ws,
          wsKey,
          symbol,
          isTestnet,
        ),
      minutes50,
      // 1000 * 60
    );
  }

  private async checkKeepAliveListenKey(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    derivedWsKey: WsKey,
    symbol?: string,
    isTestnet?: boolean,
  ) {
    const listenKeyState = this.listenKeyStateCache.getListenKeyState(
      listenKey,
      market,
    );

    const wsKey = getRealWsKeyFromDerivedWsKey(derivedWsKey);

    try {
      if (listenKeyState.keepAliveRetryTimer) {
        clearTimeout(listenKeyState.keepAliveRetryTimer);
        listenKeyState.keepAliveRetryTimer = undefined;

        this.logger.trace(
          `checkKeepAliveListenKey() -> CLEARED old one-off keepAliveRetryTimer timer for ${listenKey}`,
        );
      }

      await this.sendKeepAliveForMarket(
        listenKey,
        market,
        ws,
        wsKey,
        derivedWsKey,
        symbol,
      );

      listenKeyState.lastKeepAlive = Date.now();
      listenKeyState.keepAliveFailures = 0;
      this.logger.info(
        `Completed keep alive cycle for listenKey(${listenKey}) in market(${market})`,
        { ...WS_LOGGER_CATEGORY, listenKey },
      );
    } catch (e) {
      listenKeyState.keepAliveFailures++;

      // Reconnect follows a less automatic workflow since this is tied to a listen key (which may need a new one).
      // - Kill connection first, with instruction NOT to reconnect automatically
      // - Then respawn a connection with a potentially new listen key (since the old one may be invalid now)
      const shouldReconnectAfterClose = false;

      const errorCode = e?.code;
      if (errorCode === WS_ERROR_CODE.LISTEN_KEY_NOT_FOUND) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key - listen key expired/invalid. Respawning with fresh listen key...',
          {
            ...WS_LOGGER_CATEGORY,
            listenKey,
            error: e,
            errorCode,
            errorMsg: e?.message,
          },
        );

        this.closeWsFn(derivedWsKey, shouldReconnectAfterClose);
        this.respawnUserDataStream(wsKey, market, { symbol, isTestnet });

        return;
      }

      // If max failurees reached, tear down and respawn if allowed
      if (listenKeyState.keepAliveFailures >= 3) {
        this.logger.error(
          'FATAL: Failed to keep WS alive for listen key after 3 attempts',
          { ...WS_LOGGER_CATEGORY, listenKey, error: e },
        );

        this.closeWsFn(derivedWsKey, shouldReconnectAfterClose);
        this.respawnUserDataStream(wsKey, market, { symbol, isTestnet });

        return;
      }

      const reconnectDelaySeconds = 1000 * 15;
      this.logger.info(
        `Userdata keep alive request failed due to error, trying again with short delay (${reconnectDelaySeconds} seconds)`,
        {
          ...WS_LOGGER_CATEGORY,
          listenKey,
          error: e,
          keepAliveAttempts: listenKeyState.keepAliveFailures,
        },
      );

      this.logger.trace(
        `checkKeepAliveListenKey() -> CREATED NEW one-off keepAliveRetryTimer  timer for ${listenKey}`,
      );
      listenKeyState.keepAliveRetryTimer = setTimeout(
        () =>
          this.checkKeepAliveListenKey(
            listenKey,
            market,
            ws,
            derivedWsKey,
            symbol,
          ),
        reconnectDelaySeconds,
      );
    }
  }

  teardownUserDataListenKey(listenKey?: string, ws?: WebSocket) {
    if (listenKey) {
      this.listenKeyStateCache.clearAllListenKeyState(listenKey);
      safeTerminateWs(ws, true);
    }
  }

  async triggerUserDataReconnectionWorkflow(
    legacyWsKey: string,
  ): Promise<void> {
    this.logger.trace(`triggerCustomReconnectionWorkflow(${legacyWsKey})`);
    if (legacyWsKey.includes('userData')) {
      const legacyWsKeyContext = getLegacyWsKeyContext(legacyWsKey);
      if (!legacyWsKeyContext) {
        throw new Error(
          `triggerCustomReconnectionWorkflow(): no context found in supplied wsKey: "${legacyWsKey}"`,
        );
      }

      const { market, symbol, isTestnet, listenKey, wsKey } =
        legacyWsKeyContext;

      this.logger.info('Preparing to reconnect userData stream...', {
        ...WS_LOGGER_CATEGORY,
        legacyWsKey,
        market,
        symbol,
        isTestnet,
        listenKey,
        wsKey,
      });

      if (listenKey) {
        this.logger.trace('Checking if old listenKey has active timers...', {
          listenKey,
        });
        this.listenKeyStateCache.clearAllListenKeyState(listenKey);
      } else {
        throw new Error('No listenKey stashed in legacyWsKey context???');
      }

      this.logger.info('Reconnecting to user data stream...', {
        ...WS_LOGGER_CATEGORY,
        ...legacyWsKeyContext,
        wsKey,
        market,
        symbol,
      });

      // We'll set a new one once the new stream respawns, it might have a diff listenKey in the wsKey
      this.getWsStore().delete(legacyWsKey as any);

      if (!wsKey) {
        const errorMessage =
          'triggerCustomReconnectionWorkflow(): missing real "wsKey" from legacy context';
        this.logger.error(errorMessage, {
          legacyWsKeyContext,
          legacyWsKey,
        });
        throw new Error(errorMessage);
      }

      this.respawnUserDataStream(wsKey, market, {
        symbol,
        isTestnet,
      });

      return;
    }
  }

  private sendKeepAliveForMarket(
    listenKey: string,
    market: WsMarket,
    ws: WebSocket,
    wsKey: WsKey,
    deriedWsKey: string,
    symbol?: string,
  ) {
    switch (market) {
      case 'spot':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveSpotUserDataListenKey(listenKey);
      case 'spotTestnet':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveSpotUserDataListenKey(listenKey);
      case 'crossMargin':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveMarginUserDataListenKey(listenKey);
      case 'riskDataMargin':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveMarginRiskUserDataListenKey(listenKey);
      case 'isolatedMargin':
        return this.restClientCache
          .getSpotRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveIsolatedMarginUserDataListenKey({
            listenKey,
            symbol: symbol!,
          });
      case 'coinm':
      case 'options':
      case 'optionsTestnet':
      case 'usdm':
        return this.restClientCache
          .getUSDMRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'usdmTestnet':
        return this.restClientCache
          .getUSDMRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'coinmTestnet':
        return this.restClientCache
          .getCOINMRestClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAliveFuturesUserDataListenKey();
      case 'portfoliom':
        return this.restClientCache
          .getPortfolioClient(
            this.getRestClientOptionsFn(),
            this.getWsClientOptionsfn().requestOptions,
          )
          .keepAlivePMUserDataListenKey();
      default:
        throw neverGuard(
          market,
          `Failed to send keep alive for user data stream in unhandled market ${market}`,
        );
    }
  }
}
