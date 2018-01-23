type Callback = (err: Error, data: object) => void;

declare class BinanceRest {
  new({
    key,
    secret,
    recvWindow,
    timeout,
    disableBeautification,
    handleDrift
  }: {
    key: string,
    secret: string,
    recvWindow?: number,
    timeout?: number,
    disableBeautification?: boolean,
    handleDrift?: boolean
  }): BinanceRest;

  account: (query: object | Callback, callback?: Callback) => Promise<object> | void;

  aggTrades: (query: object | string, callback?: Callback) => Promise<object> | void;

  allBookTickers: (callback?: Callback) => Promise<object> | void;

  allOrders: (query: object | string, callback?: Callback) => Promise<object> | void;

  allPrices: (callback?: Callback) => Promise<object> | void;

  bookTicker: (query: object, callback?: Callback) => Promise<object> | void;

  exchangeInfo: (callback?: Callback) => Promise<object> | void;

  historicalTrades: (query: object | string, callback?: Callback) => Promise<object> | void;

  depth: (query: object | string, callback?: Callback) => Promise<object> | void;

  klines: (query: object, callback?: Callback) => Promise<object> | void;

  ping: (callback?: Callback) => Promise<object> | void;

  ticker24hr: (query: object, callback?: Callback) => Promise<object> | void;

  tickerPrice: (query: object, callback?: Callback) => Promise<object> | void;

  time: (callback?: Callback) => Promise<object> | void;

  trades: (query: object | string, callback?: Callback) => Promise<object> | void;
}

declare class Beautifier {
  new(): Beautifier

  beautify(obj: object, type: object | string): object
}