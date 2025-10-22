const rollingTickerEventMap = {
  e: 'eventType',
  E: 'eventTime',
  s: 'symbol',
  p: 'priceChange',
  P: 'priceChangePercent',
  o: 'openPrice',
  h: 'highPrice',
  l: 'lowPrice',
  c: 'lastPrice',
  w: 'weightedAveragePrice',
  v: 'totalTradedBaseAssetVolume',
  q: 'totalTradedQuoteAssetVolume',
  O: 'statisticsOpenTime',
  C: 'statisticsCloseTime',
  F: 'firstTradeId',
  L: 'lastTradeId',
  n: 'totalTrades',
};

/**
 * The beautifier map defines how specific properties are renamed into a more readable property name.
 *
 * At first, it's a simple key:value map. The key is the original property name (e.g. aggTrades or bookTickerEvent (for the top-level name of an event: ("bookTicker" + "Event"))).
 *
 * The values have different behaviours:
 * - Value is an object, each child property is renamed to the value
 *   e.g. aggTrades: { a: "aggTradeId" } -> aggTrades: { aggTradeId: value }
 * - Value is a string, this points to another key in the map.
 *   e.g. klineEvent: { k: "kline" } resolves to
 *        klineEvent: { kline: { BEAUTIFIER_EVENT_MAP["kline"] } }
 * - Value is an array, each element in that array is transformed into an object.
 */
export const BEAUTIFIER_EVENT_MAP = {
  aggTrades: {
    a: 'aggTradeId',
    p: 'price',
    q: 'quantity',
    f: 'firstTradeId',
    l: 'lastTradeId',
    T: 'timestamp',
    m: 'maker',
    M: 'bestPriceMatch',
  },
  bookTickerEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    u: 'updateId',
    s: 'symbol',
    b: 'bidPrice',
    B: 'bidQty',
    a: 'askPrice',
    A: 'askQty',
  },
  klines: {
    0: 'openTime',
    1: 'open',
    2: 'high',
    3: 'low',
    4: 'close',
    5: 'volume',
    6: 'closeTime',
    7: 'quoteAssetVolume',
    8: 'trades',
    9: 'takerBaseAssetVolume',
    10: 'takerQuoteAssetVolume',
    11: 'ignored',
  },
  bids: [
    {
      0: 'price',
      1: 'quantity',
      2: 'ignored',
    },
  ],
  asks: [
    {
      0: 'price',
      1: 'quantity',
      2: 'ignored',
    },
  ],
  avgPriceEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    i: 'interval',
    w: 'averagePrice',
    T: 'lastTradeTime',
  },
  depthUpdateEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    s: 'symbol',
    U: 'firstUpdateId',
    u: 'lastUpdateId',
    pu: 'finalUpdateId', // Final update Id in last stream(ie `u` in last stream)
    b: 'bidDepthDelta',
    a: 'askDepthDelta',
  },
  depthOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    s: 'symbol',
    U: 'firstUpdateId',
    u: 'lastUpdateId',
    pu: 'lastUpdateId2',
    b: 'bidDepthDelta',
    a: 'askDepthDelta',
  },
  bidDepthDelta: [
    {
      0: 'price',
      1: 'quantity',
      2: 'ignored',
    },
  ],
  askDepthDelta: [
    {
      0: 'price',
      1: 'quantity',
      2: 'ignored',
    },
  ],
  klineEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    k: 'kline',
  },
  klineOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    k: 'kline',
  },
  continuous_klineEvent: {
    e: 'eventType',
    E: 'eventTime',
    ps: 'symbol',
    ct: 'contractType',
    k: 'kline', // pointer to "kline" mapper
  },
  indexPrice_klineEvent: {
    e: 'eventType',
    E: 'eventTime',
    ps: 'symbol',
    k: 'kline', // pointer to "kline" mapper
  },
  markPrice_klineEvent: {
    e: 'eventType',
    E: 'eventTime',
    ps: 'symbol',
    k: 'kline', // pointer to "kline" mapper
  },
  kline: {
    t: 'startTime',
    T: 'endTime',
    s: 'symbol',
    i: 'interval',
    f: 'firstTradeId',
    L: 'lastTradeId',
    o: 'open',
    c: 'close',
    h: 'high',
    l: 'low',
    v: 'volume',
    n: 'trades',
    x: 'final',
    q: 'quoteVolume',
    V: 'volumeActive',
    Q: 'quoteVolumeActive',
    B: 'ignored',
    F: 'firstTradeId', // used by european options klines
  },
  aggTradeEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    a: 'tradeId',
    p: 'price',
    q: 'quantity',
    f: 'firstTradeId',
    l: 'lastTradeId',
    T: 'time',
    m: 'maker',
    M: 'ignored',
  },
  outboundAccountInfoEvent: {
    e: 'eventType',
    E: 'eventTime',
    m: 'makerCommission',
    t: 'takerCommission',
    b: 'buyerCommission',
    s: 'sellerCommission',
    T: 'canTrade',
    W: 'canWithdraw',
    D: 'canDeposit',
    B: 'balances',
    u: 'lastUpdateTime',
  },
  outboundAccountPositionEvent: {
    e: 'eventType',
    E: 'eventTime',
    u: 'lastUpdateTime',
    B: 'balances',
  },
  balanceUpdateEvent: {
    e: 'eventType',
    E: 'eventTime',
    a: 'asset',
    d: 'balanceDelta',
    T: 'clearTime',
  },
  indexPriceUpdateEvent: {
    e: 'eventType',
    E: 'eventTime',
    i: 'symbol',
    p: 'indexPrice',
  },
  indexOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'indexPrice',
  },
  listStatusEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    g: 'orderListId',
    c: 'contingencyType',
    l: 'listStatusType',
    L: 'listOrderStatus',
    r: 'listRejectReason',
    C: 'listClientOrderId',
    T: 'transactionTime',
    O: 'orders',
  },
  markPriceUpdateEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'markPrice',
    i: 'indexPrice',
    P: 'settlePriceEstimate',
    r: 'fundingRate',
    T: 'nextFundingTime',
  },
  markPriceEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'markPrice',
    i: 'indexPrice',
    P: 'settlePriceEstimate',
    r: 'fundingRate',
    T: 'nextFundingTime',
    mp: 'optionsMarkPrice',
  },
  markPriceOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'markPrice',
    i: 'indexPrice',
    P: 'settlePriceEstimate',
    r: 'fundingRate',
    T: 'nextFundingTime',
    mp: 'optionsMarkPrice',
  },
  // '!markPrice@arrEvent': {
  //   e: 'eventType',
  //   E: 'eventTime',
  //   s: 'symbol',
  //   p: 'markPrice',
  //   i: 'indexPrice',
  //   P: 'settlePriceEstimate',
  //   r: 'fundingRate',
  //   T: 'nextFundingTime',
  // },
  orders: [
    {
      s: 'symbol',
      i: 'orderId',
      c: 'clientOrderId',
    },
  ],
  ACCOUNT_UPDATEEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    a: 'updateData',
  },
  MARGIN_CALLEvent: {
    e: 'eventType',
    E: 'eventTime',
    cw: 'crossWalletBalance',
    p: 'positions',
  },
  ORDER_TRADE_UPDATEEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    o: 'order',
  },
  TRADE_LITEEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    o: 'order',
    s: 'symbol',
    q: 'originalQuantity',
    p: 'originalPrice',
    m: 'isMakerSide',
    c: 'clientOrderId',
    S: 'side',
    L: 'lastFilledPrice',
    l: 'lastFilledQuantity',
    t: 'tradeId',
    i: 'orderId',
  },
  CONDITIONAL_ORDER_TRIGGER_REJECTEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    or: 'order',
    s: 'symbol',
    i: 'orderId',
    r: 'reason',
  },
  CONDITIONAL_ORDER_TRADE_UPDATEEvent: {
    e: 'eventType', // Event Type
    E: 'eventTime', // Event Time
    T: 'transactionTime', // Transaction Time
    fs: 'eventBusinessUnit', // Event business unit
    so: 'order', // order
  },
  order: {
    s: 'symbol',
    c: 'clientOrderId',
    S: 'orderSide',
    o: 'orderType',
    f: 'timeInForce',
    q: 'originalQuantity',
    p: 'originalPrice',
    ap: 'averagePrice',
    si: 'strategyId',
    st: 'strategyType',
    sp: 'stopPrice',
    x: 'executionType',
    X: 'orderStatus',
    i: 'orderId',
    l: 'lastFilledQuantity',
    z: 'orderFilledAccumulatedQuantity',
    L: 'lastFilledPrice',
    N: 'commissionAsset',
    n: 'commissionAmount',
    T: 'orderTradeTime',
    t: 'tradeId',
    b: 'bidsNotional',
    a: 'asksNotional',
    m: 'isMakerTrade',
    R: 'isReduceOnly',
    wt: 'stopPriceWorkingType',
    ot: 'originalOrderType',
    ps: 'positionSide',
    cp: 'isCloseAll',
    AP: 'trailingStopActivationPrice',
    cr: 'trailingStopCallbackRate',
    rp: 'realisedProfit',
    V: 'selfTradePrevention',
    pm: 'priceMatch',
    gtd: 'goodTillDate',
    os: 'strategyOrderStatus',
    ut: 'orderUpdateTime', // Order update Time
  },
  ACCOUNT_CONFIG_UPDATEEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    ac: 'assetConfiguration',
    ai: 'accountConfiguration',
  },
  COIN_SWAP_ORDEREvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    c: 'coinSwapOrder',
  },
  coinSwapOrder: {
    o: 'orderCreationTime',
    a: 'asset',
    qa: 'quoteAsset',
    // M: '0.16851104',
    // m: '100',
    // p: '0',
    // ma: '0',
    // sp: '',
    // bp: '0',
    // t: 1741998542188,
    // T: 1741998542189,
    // s: true
  },
  assetConfiguration: {
    s: 'symbol',
    l: 'leverage',
  },
  accountConfiguration: {
    j: 'isMultiAssetsMode',
  },
  positions: [
    {
      s: 'symbol',
      ps: 'positionSide',
      pa: 'positionAmount',
      mt: 'marginType',
      iw: 'isolatedWalletAmount',
      mp: 'markPrice',
      up: 'unrealisedPnl',
      mm: 'maintenanceMarginRequired',
    },
  ],
  listenKeyExpiredEvent: {
    e: 'eventType',
    E: 'eventTime',
  },
  updateData: {
    m: 'updateEventType',
    P: 'updatedPositions',
    B: 'updatedBalances',
  },
  updatedBalances: [
    {
      a: 'asset',
      wb: 'walletBalance',
      cw: 'crossWalletBalance',
      bc: 'balanceChange',
    },
  ],
  updatedPositions: [
    {
      s: 'symbol',
      ma: 'marginAsset',
      pa: 'positionAmount',
      ep: 'entryPrice',
      cr: 'accumulatedRealisedPreFee',
      up: 'unrealisedPnl',
      mt: 'marginType',
      iw: 'isolatedWalletAmount',
      ps: 'positionSide',
    },
  ],
  balances: [
    {
      a: 'asset',
      f: 'availableBalance',
      l: 'onOrderBalance',
    },
  ],
  executionReportEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    c: 'newClientOrderId',
    S: 'side',
    o: 'orderType',
    f: 'cancelType', // GTC 'Good till Cancel', IOC: 'Immediate or Cancel'
    q: 'quantity',
    p: 'price',
    P: 'stopPrice',
    F: 'icebergQuantity',
    g: 'orderListId',
    C: 'originalClientOrderId',
    x: 'executionType',
    X: 'orderStatus',
    r: 'rejectReason',
    i: 'orderId',
    l: 'lastTradeQuantity',
    z: 'accumulatedQuantity',
    L: 'lastTradePrice',
    n: 'commission',
    N: 'commissionAsset',
    T: 'tradeTime',
    t: 'tradeId',
    I: 'ignoreThis1',
    w: 'isOrderOnBook',
    m: 'isMaker',
    M: 'ignoreThis2',
    O: 'orderCreationTime',
    Z: 'cummulativeQuoteAssetTransactedQty',
    Y: 'lastQuoteAssetTransactedQty',
    Q: 'orderQuoteQty',
    W: 'workingTime',
    V: 'selfTradePreventionMode',
  },
  tradeEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    t: 'tradeId',
    p: 'price',
    q: 'quantity',
    b: 'buyerOrderId',
    a: 'sellerOrderId',
    T: 'time',
    m: 'maker',
    M: 'ignored',
  },
  tradeOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    t: 'tradeId',
    p: 'price',
    q: 'quantity',
    b: 'buyerOrderId',
    a: 'sellerOrderId',
    T: 'time',
    m: 'maker',
    M: 'ignored',
    S: 'direction',
    X: 'tradeType',
  },
  '24hrTickerEvent': {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'priceChange',
    P: 'priceChangePercent',
    w: 'weightedAveragePrice',
    x: 'previousClose',
    c: 'currentClose',
    Q: 'closeQuantity',
    b: 'bestBid',
    B: 'bestBidQuantity',
    a: 'bestAskPrice',
    A: 'bestAskQuantity',
    o: 'open',
    h: 'high',
    l: 'low',
    v: 'baseAssetVolume',
    q: 'quoteAssetVolume',
    O: 'openTime',
    C: 'closeTime',
    F: 'firstTradeId',
    L: 'lastTradeId',
    n: 'trades',
  },
  tickerEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    s: 'symbol',
    p: 'priceChange',
    P: 'priceChangePercent',
    w: 'weightedAveragePrice',
    x: 'previousClose',
    c: 'currentClose',
    Q: 'closeQuantity',
    b: 'bestBid',
    B: 'bestBidQuantity',
    a: 'bestAskPrice',
    A: 'bestAskQuantity',
    bo: 'bestBuyPrice',
    ao: 'bestSellPrice',
    bq: 'bestBuyQuantity',
    aq: 'bestSellQuantity',
    o: 'open',
    h: 'high',
    l: 'low',
    v: 'baseAssetVolume',
    q: 'quoteAssetVolume',
    O: 'openTime',
    C: 'closeTime',
    F: 'firstTradeId',
    L: 'lastTradeId',
    n: 'trades',
  },
  tickerOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    T: 'transactionTime',
    s: 'symbol',
    o: 'open',
    h: 'high',
    l: 'low',
    c: 'currentClose',
    V: 'contractVolume',
    A: 'baseAssetVolume',
    P: 'priceChangePercent',
    p: 'priceChange',
    Q: 'lastTradeVolume',
    F: 'firstTradeId',
    L: 'lastTradeId',
    n: 'trades',
    bo: 'bestBuyPrice',
    ao: 'bestSellPrice',
    bq: 'bestBuyQuantity',
    aq: 'bestSellQuantity',
    b: 'buyImpliedVolatility',
    a: 'sellImpliedVolatility',
    d: 'delta',
    t: 'theta',
    g: 'gamma',
    v: 'vega',
    vo: 'impliedVolatility',
    mp: 'markPrice',
    hl: 'buyMaximumPrice',
    ll: 'sellMinimumPrice',
    eep: 'estimatedStrikePrice',
  },
  openInterestOptionsEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    o: 'openInterestContracts',
    h: 'openInterestUSD',
  },
  '24hrMiniTickerEvent': {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    ps: 'contractSymbol',
    c: 'close',
    o: 'open',
    h: 'high',
    l: 'low',
    v: 'baseAssetVolume',
    q: 'quoteAssetVolume',
  },
  miniTickerEvent: {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    ps: 'contractSymbol',
    c: 'close',
    o: 'open',
    h: 'high',
    l: 'low',
    v: 'baseAssetVolume',
    q: 'quoteAssetVolume',
  },
  '1hTickerEvent': rollingTickerEventMap,
  '4hTickerEvent': rollingTickerEventMap,
  '1dTickerEvent': rollingTickerEventMap,
  forceOrderEvent: {
    e: 'eventType',
    E: 'eventTime',
    o: 'liquidationOrder',
  },
  liquidationOrder: {
    s: 'symbol',
    S: 'side',
    o: 'orderType',
    f: 'timeInForce',
    q: 'quantity',
    p: 'price',
    ap: 'averagePrice',
    X: 'orderStatus',
    l: 'lastFilledQuantity',
    z: 'orderFilledAccumulatedQuantity',
    T: 'orderTradeTime',
  },
  liabilityChangeEvent: {
    e: 'eventType', // Event Type
    E: 'eventTime', // Event Time
    a: 'asset', //Asset
    t: 'type', //Type
    T: 'transactionId', //Transaction ID
    p: 'principal', //Principal
    i: 'interest', //Interest
    l: 'totalLiability', //Total Liability
  },
  contractInfoEvent: {
    e: 'eventType', // Event Type
    E: 'eventTime', // Event Time
    s: 'symbol', // Symbol
    ps: 'pair', // Pair
    ct: 'contractType', // Contract type
    dt: 'deliveryDateTime', // Delivery date time
    ot: 'onboardDateTime', // onboard date time
    cs: 'contractStatus', // Contract status
    bks: 'notionalBrackets',
  },
  notionalBrackets: [
    {
      bs: 'notionalBracket', // Notional bracket
      bnf: 'floorNotional', // Floor notional of this bracket
      bnc: 'capNotional', // Cap notional of this bracket
      mmr: 'maintenanceRatio', // Maintenance ratio for this bracket
      cf: 'auxiliaryNumber', // Auxiliary number for quick calculation
      mi: 'minLeverage', // Min leverage for this bracket
      ma: 'maxLeverage', // Max leverage for this bracket
    },
  ],
  GRID_UPDATEEvent: {
    e: 'eventType', // Event Type
    T: 'transactionTime', // Transaction Time
    E: 'eventTime', // Event Time
    gu: 'grid',
  },
  grid: {
    si: 'strategyId', // Strategy ID
    st: 'strategyType', // Strategy Type
    ss: 'strategyStatus', // Strategy Status
    s: 'symbol', // Symbol
    r: 'realizedPnl', // Realized PNL
    up: 'unmatchedAveragePrice', // Unmatched Average Price
    uq: 'unmatchedQuantity', // Unmatched Quantity
    uf: 'unmatchedFee', // Unmatched Fee
    mp: 'matchedPnl', // Matched PNL
    ut: 'updateTime', // Update Time
  },

  STRATEGY_UPDATEEvent: {
    e: 'eventType', // Event Type
    T: 'transactionTime', // Transaction Time
    E: 'eventTime', // Event Time
    su: 'strategy',
  },

  strategy: {
    si: 'strategyId', // Strategy ID
    st: 'strategyType', // Strategy Type
    ss: 'strategyStatus', // Strategy Status
    s: 'symbol', // Symbol
    ut: 'updateTime', // Update Time
    c: 'opCode', // opCode
  },
};
