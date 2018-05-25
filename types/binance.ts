interface Callback {
  (err: Error, data: object): void;
}

interface WsHandler<T> {
  (data: T): any;
}

type BinanceNumber = string;

interface DepthDelta {
  price: BinanceNumber;
  quantity: BinanceNumber; //quantity of 0 means remove it
  ignored: any[];
}

export interface BinanceRest {
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

  account (query: object | Callback, callback?: Callback): Promise<object> | void;

  aggTrades (query: object | string, callback?: Callback): Promise<object> | void;

  allBookTickers (callback?: Callback): Promise<object> | void;

  allOrders (query: object | string, callback?: Callback): Promise<object> | void;

  allPrices (callback?: Callback): Promise<object> | void;

  bookTicker (query: object, callback?: Callback): Promise<object> | void;

  exchangeInfo (callback?: Callback): Promise<object> | void;

  historicalTrades (query: object | string, callback?: Callback): Promise<object> | void;

  depth (query: object | string, callback?: Callback): Promise<object> | void;

  klines (query: object, callback?: Callback): Promise<object> | void;

  ping (callback?: Callback): Promise<object> | void;

  ticker24hr (query: object, callback?: Callback): Promise<object> | void;

  tickerPrice (query: object, callback?: Callback): Promise<object> | void;

  time (callback?: Callback): Promise<object> | void;

  trades (query: object | string, callback?: Callback): Promise<object> | void;
}

export interface BinanceWS {
  new(beautified: boolean): BinanceWS;

  onDepthUpdate(symbol: string, eventHandler: WsHandler<{
    eventType: 'depthUpdate';
    eventTime: number;
    symbol: string;
    firstUpdateId: number;
    lastUpdateId: number; // syncs with updateId on depth route
    bidDepthDelta: DepthDelta[];
    askDepthDelta: DepthDelta[];
  }>): WebSocket;

  onDepthLevelUpdate(symbol: string, eventHandler: WsHandler<{
    lastUpdateId: number;  // Last update ID
    bids: any[][];
    asks: any[][];
  }>): WebSocket;

  onKline(symbol: string, interval: string, eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    kline: {
      startTime: number;
      endTime: number;
      symbol: string;
      interval: string;
      firstTradeId: number;
      lastTradeId: number;
      open: BinanceNumber;
      close: BinanceNumber;
      high: BinanceNumber;
      low: BinanceNumber;
      volume: BinanceNumber;
      trades: number;
      final: boolean;
      quoteVolume: BinanceNumber;
      volumeActive: BinanceNumber;
      quoteVolumeActive: BinanceNumber;
      ignored: BinanceNumber;
    };
  }>): WebSocket;

  onAggTrade(symbol: string, eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    tradeId: number;
    price: BinanceNumber;
    quantity: BinanceNumber;
    time: number;
    maker: boolean;
    ignored: boolean;
    firstTradeId: number;
    lastTradeId: number;
  }>): WebSocket;

  onTrade(symbol: string, eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    tradeId: number;
    price: BinanceNumber;
    quantity: BinanceNumber;
    time: number;
    maker: boolean;
    ignored: boolean;
    buyerOrderId: number;
    sellerOrderId: number;
  }>): WebSocket;

  onTicker(symbol: string, eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    priceChange: BinanceNumber;
    priceChangePercent: BinanceNumber;
    weightedAveragePrice: BinanceNumber;
    previousClose: BinanceNumber;
    currentClose: BinanceNumber;
    closeQuantity: BinanceNumber;
    bestBid: BinanceNumber;
    bestBidQuantity: BinanceNumber;
    bestAskPrice: BinanceNumber;
    bestAskQuantity: BinanceNumber;
    open: BinanceNumber;
    high: BinanceNumber;
    low: BinanceNumber;
    baseAssetVolume: BinanceNumber;
    quoteAssetVolume: BinanceNumber;
    openTime: number;
    closeTime: number;
    firstTradeId: number;
    lastTradeId: number;
    trades: number;
  }>): WebSocket;

  onAllTickers(eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    priceChange: BinanceNumber;
    priceChangePercent: BinanceNumber;
    weightedAveragePrice: BinanceNumber;
    previousClose: BinanceNumber;
    currentClose: BinanceNumber;
    closeQuantity: BinanceNumber;
    bestBid: BinanceNumber;
    bestBidQuantity: BinanceNumber;
    bestAskPrice: BinanceNumber;
    bestAskQuantity: BinanceNumber;
    open: BinanceNumber;
    high: BinanceNumber;
    low: BinanceNumber;
    baseAssetVolume: BinanceNumber;
    quoteAssetVolume: BinanceNumber;
    openTime: number;
    closeTime: number;
    firstTradeId: number;
    lastTradeId: number;
    trades: number;
  }>): WebSocket;

  onCombinedStream(streams: any[], eventHandler: WsHandler<any>): any;

  onUserData(binanceRest: BinanceRest, eventHandler: WsHandler<{
    eventType: string;
    eventTime: number;
    symbol: string;
    newClientOrderId: string;
    side: string;
    orderType: string;
    cancelType: string;
    quantity: BinanceNumber;
    price: BinanceNumber;
    stopPrice: BinanceNumber;
    icebergQuantity: BinanceNumber;
    g: number; // to be ignored
    originalClientOrderId: string;
    executionType: string;
    orderStatus: string;
    rejectReason: string;
    orderId: number;
    lastTradeQuantity: BinanceNumber;
    accumulatedQuantity: BinanceNumber;
    lastTradePrice: BinanceNumber;
    commission: BinanceNumber;
    commissionAsset: string;
    tradeTime: number;
    tradeId: number;
    I: number; // ignore
    w: boolean; // ignore
    maker: boolean;
  }>, interval?: number): Promise<WebSocket>;
}

declare class Beautifier {
  constructor();

  beautify(obj: object, type: object | string): object
}
