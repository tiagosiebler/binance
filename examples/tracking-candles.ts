import { EventEmitter } from 'events';

import {
  WebsocketClient,
  isWsFormattedKline,
  USDMClient,
  KlineInterval,
} from '../src';

// or, with the npm package
/*
import {
  WebsocketClient,
  isWsFormattedKline,
  USDMClient,
  KlineInterval,
} from 'binance';
*/

/**
 * This elaborate example serves the following key functions:
 * - Connect to various candle websockets to receive realtime candle events (update open candle & append closed candle)
 * - Backfill some candles using the REST API
 * - Once backfilled, start processing candle events (update & append in-memory, depending if candle closed or not)
 * - Keep the candle stores trimmed, so we never store more than `maxStoredCandles` candles per symbol
 * - When a connection opens or reconnects, the backfill is executed again to ensure there are no gaps
 *
 * The "onCandleClosed()" function is where you would run custom logic with a dataset of candles (e.g. run some indicator calculations)
 */

const restClient = new USDMClient();
const wsClient = new WebsocketClient({
  beautify: true,
});

/**
 * Configuration logic
 */

const symbolsToMonitor: string[] = ['BTCUSDT', 'ETHUSDT'];
const timeframes: KlineInterval[] = ['1m'];
const maxStoredCandles = 3;

/**
 * Data stores
 */

interface EngineCandle {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  openTime: number;
  openDt: Date;
  closeTime: number;
  closeDt: Date;
}

/**
 * The shape of the events produced by the candle store.
 * All the info needed to query the candle store for all candles, after receiving a candle closed event
 */
interface CandleStoreEvent {
  symbol: string;
  interval: string;
}

/** These are the events produced by the candle store, which can be used to implement this abstraction layer */
export declare interface CandleEmitter extends EventEmitter {
  on(event: 'candleClose', listener: (event: CandleStoreEvent) => void): this;
  on(event: 'candleUpdate', listener: (event: CandleStoreEvent) => void): this;
}

/** Some options to configure the behaviour of the candle store */
interface CandleStoreOptions {
  /** Keep a ceiling on how many candles are stored, before old ones are discarded (prevent the store from growing forever into infinity) */
  maxStoredCandles?: number;
  eventEmitter: EventEmitter;
}

/**

/**
 * A general store for symbol/interval candles, including handling the currently open candle, with some utility methods
 */
export class CandleStore {
  private symbol: string;

  // Closed candles are stored as an array of candles per interval in this store.
  // This is essentially an object acting as a key/value store (key: interval, value: candle array)
  private closedCandles: Record<string, EngineCandle[]> = {};

  // Open candles are kept separate from the closed candles, also in a key/value store (key: interval, value: current open candle)
  private openCandles: Record<string, EngineCandle | null> = {};

  private maxStoredCandles: number;
  private emitter: EventEmitter;

  constructor(symbol: string, options: CandleStoreOptions) {
    // super();
    this.symbol = symbol;

    this.maxStoredCandles = options?.maxStoredCandles || 3;
    this.emitter = options.eventEmitter;
  }

  /**
   * Overwrite the current candle store, e.g. after backfilling. Candles are sorted automatically before overwriting the store
   */
  public setCandles(candles: EngineCandle[], interval: string): void {
    const ascendingCandles = [...candles].sort(
      (a, b) => a.closeTime - b.closeTime,
    );

    this.initCandleStores(interval);
    this.closedCandles[interval] = ascendingCandles;
  }

  public setOpenCandle(candle: EngineCandle | null, interval: string): void {
    this.openCandles[interval] = candle;
  }

  /**
   * Provide a candle event to the store for processing (e.g candle closed vs open candle updated).
   * - Closed candles are appended to the array.
   * - Open candles are tracked separately and only (optionally) used during the getCandles(true) query.
   */
  public processCandleEvent(
    candle: EngineCandle,
    interval: string,
    isCandleClosed: boolean,
  ): void {
    const evt = { symbol: this.symbol, interval };

    this.initCandleStores(interval);

    if (!isCandleClosed) {
      this.setOpenCandle(candle, interval);
      this.emitter.emit('candleUpdate', evt);
      // console.log(this.symbol, `Open candle update`);
      return;
    }

    this.setOpenCandle(null, interval);
    this.closedCandles[interval].push(candle);

    this.trimExcessCandles(interval);

    this.emitter.emit('candleClose', evt);
    // console.log(`Emit candle closed evt`, evt);
  }

  private initCandleStores(interval: string) {
    if (
      !this.closedCandles[interval] ||
      !Array.isArray(this.closedCandles[interval])
    ) {
      this.closedCandles[interval] = [];
    }
  }

  /**
   * Execute a store-trim. This is called automatically during candle-closed events, but
   * can be called manually (e.g. after backfilling) to ensure the store only keeps the most recent `maxStoredCandles`.
   */
  public trimExcessCandles(interval: string): void {
    const maxStored = this.maxStoredCandles;

    this.initCandleStores(interval);

    const totalCandles = this.closedCandles[interval]?.length;
    if (totalCandles <= maxStored) {
      return;
    }

    const elementsToRemove = totalCandles - maxStored;

    // This mutates the closed candle store to remove the first x elements
    this.closedCandles[interval].splice(0, elementsToRemove);
  }

  /**
   * Query all candles in the store for an interval.
   * Optionally append the currently open candle to the end of the array.
   */
  public getCandles(
    interval: string,
    includeOpenCandle?: boolean,
  ): EngineCandle[] {
    const candles = this.closedCandles[interval];
    const openCandle = this.openCandles[interval];

    this.initCandleStores(interval);

    if (!candles) {
      return [];
    }

    // check last candle has same open time as open candle, just in case
    if (
      !includeOpenCandle ||
      !openCandle ||
      openCandle.openTime === candles[candles.length - 1].openTime
    ) {
      return candles;
    }

    // Include open candle at end of array
    return [...candles, openCandle];
  }
}

/**
 * A key value store for all symbols & intervals
 *
 * // All CandleStores for that symbol (one per symbol, supports many intervals in one store)
 * const symbolCandles = allCandleStores[symbol];
 *
 */
const allCandleStores: Record<string, CandleStore> = {};

// Util store to track which symbol/interval a wskey represents (instead of dismantling the wskey)
const wsKeyContextStore: Record<
  string,
  { symbol: string; interval: KlineInterval }
> = {};

/**
 * Get a candle store for a symbol.
 * Since a missing candle store is automatically initialised, you can assume this will always return a candle store.
 */
function getCandleStore(symbol: string): CandleStore {
  initCandleStoreIfMissing(symbol);
  return allCandleStores[symbol];
}

const eventEmitter = new EventEmitter();

// Hook up event consumers on the shared event emitter
eventEmitter.on('candleClose', (e) => onCandleClosed(e.symbol, e.interval));
eventEmitter.on('candleUpdate', (e) => {
  // console.log('candle updated', {
  //   dt: new Date(),
  //   symbol: e.symbol,
  //   interval: e.interval,
  // });
});

/** Ensure a candle store exists for this symbol & attach consumers to the store */
function initCandleStoreIfMissing(symbol: string): void {
  if (allCandleStores[symbol]) {
    return;
  }

  // Inject your own event emitter and initialise one candle store per symbol (it supports multiple intervals)
  allCandleStores[symbol] = new CandleStore(symbol, {
    maxStoredCandles: maxStoredCandles,
    eventEmitter: eventEmitter,
  });
}

/**
 * Websocket Listeners
 */

wsClient.on('formattedMessage', (data) => {
  if (isWsFormattedKline(data)) {
    const candle = data.kline;
    const isCandleClosed = data.kline.final;
    // console.log('kline received ', { candle, isCandleClosed });

    const { open, close, high, low, volume, interval, symbol } = candle;

    const engineCandle: EngineCandle = {
      open,
      close,
      high,
      low,
      volume,
      openTime: candle.startTime,
      openDt: new Date(candle.startTime),
      closeTime: candle.endTime,
      closeDt: new Date(candle.endTime),
    };

    initCandleStoreIfMissing(symbol);

    // const candleStore: CandleStore = allIntervalCandleStores[symbol][interval];
    const candleStore: CandleStore = allCandleStores[symbol];
    candleStore.processCandleEvent(engineCandle, interval, isCandleClosed);

    return;
  }
  console.log('log formattedMessage: ', data);
});

wsClient.on('open', async (data) => {
  console.log('connection opened open:', data.wsKey, data.ws.target.url);

  const wsKey = data.wsKey;
  const wsKeyContext = wsKeyContextStore[wsKey];

  // Execute a backfill on open
  if (wsKey && wsKey.includes('kline') && wsKeyContext) {
    await backfillCandles(wsKeyContext.symbol, wsKeyContext.interval);
  }
});

// response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
wsClient.on('reply', (data) => {
  console.log('log reply: ', JSON.stringify(data, null, 2));
});
wsClient.on('reconnecting', (data) => {
  console.log('ws automatically reconnecting.... ', data?.wsKey);
});
wsClient.on('reconnected', async (data) => {
  const wsKey = data.wsKey;
  const wsKeyContext = wsKeyContextStore[wsKey];

  console.log(
    'ws has reconnected - re-executing backfill if candle ws',
    wsKey,
    wsKeyContext,
  );

  // Execute a backfill if the connection drops and reconnects
  if (wsKey && wsKey.includes('kline') && wsKeyContext) {
    await backfillCandles(wsKeyContext.symbol, wsKeyContext.interval);
  }
});

/**
 * Execute a 1-page backfill (1000 candles). Called automatically when a connection opens OR reconnects.
 */
async function backfillCandles(
  symbol: string,
  interval: KlineInterval,
): Promise<void> {
  initCandleStoreIfMissing(symbol);

  console.log(`Executing backfill for ${symbol} : ${interval}`);

  const initialCandleResult = await restClient.getKlines({
    symbol,
    interval,
    limit: 1000,
  });

  // Map to a standard candle structure
  const mappedEngineCandles: EngineCandle[] = initialCandleResult.map(
    (candle) => {
      return {
        open: Number(candle[1]),
        high: Number(candle[2]),
        low: Number(candle[3]),
        close: Number(candle[4]),
        volume: Number(candle[5]),
        openTime: candle[0],
        openDt: new Date(candle[0]),
        closeTime: candle[6],
        closeDt: new Date(candle[6]),
      };
    },
  );

  // Last candle might not be closed, so filter that out (ignore any candles with close time in the future)
  const closedCandles = mappedEngineCandles.filter(
    (c) => c.closeTime <= Date.now(),
  );

  // const candleStore: CandleStore = allIntervalCandleStores[symbol][interval];
  const candleStore: CandleStore = allCandleStores[symbol];

  // Overwrite the current candles in the store and remove excess candles
  candleStore.setCandles(closedCandles, interval);
  candleStore.trimExcessCandles(interval);

  console.log(`Finished backfill for ${symbol} : ${interval}`);
}

/**
 * Bootstrap a connection per symbol & timeframe. Backfill will automatically trigger when the connection opens successfully.
 * Note: this will spawn one websocket connection per symbol per timeframe. For complex cases, this may create too many connections.
 */
symbolsToMonitor.forEach((symbol) => {
  initCandleStoreIfMissing(symbol);

  timeframes.forEach(async (interval) => {
    // Open a websocket to start consuming candle events
    const result = wsClient.subscribeKlines(symbol, interval, 'usdm');
    const wsKey = result.wsKey;

    if (wsKey) {
      wsKeyContextStore[wsKey] = {
        symbol,
        interval,
      };
    } else {
      console.error('no wskey?');
    }

    console.log(`Opening connection for key: ${wsKey}`);
  });
});

function onCandleClosed(symbol: string, interval: string): void {
  // When a candle closes, fetch all closed candles from the store for that symbol, e.g. to calculate some indicators
  const closedSymbolCandles = getCandleStore(symbol).getCandles(interval);
  console.log('candle closed', {
    dt: new Date(),
    symbol,
    interval,
    closedSymbolCandles,
  });
}
