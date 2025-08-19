/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClient } from '../../src';

// or, with the npm package
/*
import {
  WebsocketClient,
  DefaultLogger,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
} from 'binance';
*/

(async () => {
  // Without typescript:
  // const logger = {
  const logger: DefaultLogger = {
    ...DefaultLogger,
    /* trace: (...params) => {
      // A simple way to suppress heartbeats but receive all other traces
      // if (params[0].includes('ping') || params[0].includes('pong')) {
      //   return;
      // }
      console.log('\n', new Date(), 'trace ', ...params);
    } ,*/
  };

  const wsClient = new WebsocketClient(
    {
      // Optional: when enabled, the SDK will try to format incoming data into more readable objects.
      // Beautified data is emitted via the "formattedMessage" event
      beautify: true,
    },
    logger, // Optional: customise logging behaviour by extending or overwriting the default logger implementation
  );

  // Raw unprocessed incoming data, e.g. if you have the beautifier disabled
  wsClient.on('message', (data) => {
    // console.log('raw message received ', JSON.stringify(data, null, 2));
    // console.log('raw message received ', JSON.stringify(data));
    //console.log('log rawMessage: ', data);
  });

  // Formatted data that has gone through the beautifier
  wsClient.on('formattedMessage', (data) => {
    //console.log('log formattedMessage: ', data);
    /**
     * Optional: we've included type-guards for many formatted websocket topics.
     *
     * These can be used within `if` blocks to narrow down specific event types (even for non-typescript users).
     */
    // if (isWsAggTradeFormatted(data)) {
    //   console.log('log agg trade: ', data);
    //   return;
    // }
    // // For one symbol
    // if (isWsFormattedMarkPriceUpdateEvent(data)) {
    //   console.log('log mark price: ', data);
    //   return;
    // }
    // // for many symbols
    // if (isWsFormattedMarkPriceUpdateArray(data)) {
    //   console.log('log mark prices: ', data);
    //   return;
    // }
    // if (isWsFormattedKline(data)) {
    //   console.log('log kline: ', data);
    //   return;
    // }
    // if (isWsFormattedTrade(data)) {
    //   return console.log('log trade: ', data);
    // }
    // if (isWsFormattedForceOrder(data)) {
    //   return console.log('log force order: ', data);
    // }
    // if (isWsFormatted24hrTickerArray(data)) {
    //   return console.log('log 24hr ticker array: ', data);
    // }
    // if (isWsFormattedRollingWindowTickerArray(data)) {
    //   return console.log('log rolling window ticker array: ', data);
    // }
    // if (isWsFormatted24hrTicker(data)) {
    //   return console.log('log 24hr ticker: ', data);
    // }
    // if (isWsPartialBookDepthEventFormatted(data)) {
    //   return console.log('log partial book depth event: ', data);
    // }
  });

  wsClient.on('formattedUserDataMessage', (data) => {
    //console.log('log formattedUserDataMessage: ', data);
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('response', (data) => {
    console.log('log response: ', data?.message || JSON.stringify(data));
  });

  wsClient.on('reconnecting', (data) => {
    console.log('ws automatically reconnecting.... ', data?.wsKey);
  });

  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
    // No action needed here, unless you need to query the REST API after being reconnected.
  });

  try {
    /**
     * The Websocket Client will automatically manage connectivity and active topics/subscriptions for you.
     *
     * Simply call wsClient.subscribe(topic, wsKey) as many times as you want, with or without an array.
     */

    // // E.g. one at a time, routed to the coinm futures websockets:
    // wsClient.subscribe('btcusd@indexPrice', 'coinm');
    // wsClient.subscribe('btcusd@miniTicker', 'coinm');

    // // Or send many topics at once to a stream, e.g. the usdm futures stream:
    // wsClient.subscribe(
    //   [
    //     'btcusdt@aggTrade',
    //     'btcusdt@markPrice',
    //     '!ticker@arr',
    //     '!miniTicker@arr',
    //   ],
    //   'usdm',
    // );

    const symbol = 'BTCUSDT';
    const coinMSymbol = 'ETHUSD_PERP';
    const coinMSymbol2 = 'ETHUSD';

    /**
     * Subscribe to each available type of spot market topic, the new way
     */
    await wsClient.subscribe(
      [
        // Aggregate Trade Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#aggregate-trade-streams
        'btcusdt@aggTrade',
        // Trade Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#trade-streams
        'btcusdt@trade',
        // Kline/Candlestick Streams for UTC
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
        'btcusdt@kline_5m',
        // Kline/Candlestick Streams with timezone offset
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-with-timezone-offset
        'btcusdt@kline_5m@+08:00',
        // Individual Symbol Mini Ticker Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-mini-ticker-stream
        'btcusdt@miniTicker',
        // All Market Mini Tickers Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-mini-tickers-stream
        '!miniTicker@arr',
        // Individual Symbol Ticker Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-ticker-streams
        'btcusdt@ticker',
        // All Market Tickers Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-tickers-stream
        '!ticker@arr',
        // Individual Symbol Rolling Window Statistics Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-rolling-window-statistics-streams
        'btcusdt@ticker_1h',
        // All Market Rolling Window Statistics Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#all-market-rolling-window-statistics-streams
        '!ticker_1h@arr',
        // Individual Symbol Book Ticker Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-book-ticker-streams
        'btcusdt@bookTicker',
        // Average Price
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#average-price
        'btcusdt@avgPrice',
        // Partial Book Depth Streams
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#partial-book-depth-streams
        'btcusdt@depth5',
        'btcusdt@depth10@100ms',
        // Diff. Depth Stream
        // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#diff-depth-stream
        'btcusdt@depth',
        'btcusdt@depth@100ms',
        'btcusdt@depth@500ms',
        'btcusdt@depth@1000ms',
      ],
      // Look at the `WS_KEY_URL_MAP` for a list of values here:
      // https://github.com/tiagosiebler/binance/blob/master/src/util/websockets/websocket-util.ts
      // "main" connects to wss://stream.binance.com:9443/stream
      // https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
      'main',
    );

    await wsClient.subscribe(
      [
        // Aggregate Trade Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Aggregate-Trade-Streams
        'btcusdt@aggTrade',
        // Mark Price Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Mark-Price-Stream
        'btcusdt@markPrice',
        'btcusdt@markPrice@1s',
        // Mark Price Stream for All market
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Mark-Price-Stream-for-All-market
        '!markPrice@arr',
        // Kline/Candlestick Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Kline-Candlestick-Streams
        // 'btcusdt@kline_1m',
        // Continuous Contract Kline/Candlestick Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Continuous-Contract-Kline-Candlestick-Streams
        // 'btcusdt_perpetual@continuousKline_1m', // DOESNT EXIST AS TYPE GUARD, ONLY IN BEAUTIFIER
        // Individual Symbol Mini Ticker Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Individual-Symbol-Mini-Ticker-Stream
        // 'btcusdt@miniTicker', // DOESNT EXIST AS TYPE GUARD, ONLY FOR RAW MESSAGE
        // All Market Mini Tickers Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Market-Mini-Tickers-Stream
        // '!miniTicker@arr', // DOESNT EXIST AS TYPE GUARD
        // Individual Symbol Ticker Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Individual-Symbol-Ticker-Streams
        //'btcusdt@ticker',
        // All Market Tickers Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Market-Tickers-Stream
        // '!ticker@arr', // DOESNT EXIST AS TYPE GUARD
        // Individual Symbol Book Ticker Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Individual-Symbol-Book-Ticker-Streams
        //'btcusdt@bookTicker', // DOESNT EXIST AS TYPE GUARD
        // All Book Tickers Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Book-Tickers-Stream
        // '!bookTicker', // DOESNT EXIST AS TYPE GUARD
        // Liquidation Order Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Liquidation-Order-Streams
        // 'btcusdt@forceOrder',
        // Liquidation Order Stream for All market
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Market-Liquidation-Order-Streams
        //'!forceOrder@arr',
        // Partial Book Depth Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Partial-Book-Depth-Streams
        //'btcusdt@depth5',
        // 'btcusdt@depth10@100ms'
        // Diff. Book Depth Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Diff-Book-Depth-Streams
        'driftusdt@depth',
        'slerfusdt@depth',
        'kmnousdt@depth',
        'jupusdt@depth',
        'rplusdt@depth',
        'chrusdt@depth',
        'spxusdt@depth',
        'hmstrusdt@depth',
        'ponkeusdt@depth',
        'vanryusdt@depth',
        'deepusdt@depth',
        'imxusdt@depth',
        'aergousdt@depth',
        'avaxusdt@depth',
        'ogusdt@depth',
        'bicousdt@depth',
        'degousdt@depth',
        'virtualusdt@depth',
        'blzusdt@depth',
        'neousdc@depth',
        'xvgusdt@depth',
        'thetausdt@depth',
        'arusdt@depth',
        'skateusdt@depth',
        'bnxusdt@depth',
        'saharausdt@depth',
        'ctkusdt@depth',
        'penguusdt@depth',
        'gtcusdt@depth',
        'partiusdt@depth',
        'ethusdt@depth',
        'dgbusdt@depth',
        'alphausdt@depth',
        'treeusdt@depth',
        'ipusdt@depth',
        'dusdt@depth',
        'carvusdt@depth',
        'hiveusdt@depth',
        'galausdt@depth',
        'oceanusdt@depth',
        'duskusdt@depth',
        'ausdt@depth',
        'quickusdt@depth',
        'fidausdt@depth',
        'velodromeusdt@depth',
        'superusdt@depth',
        'zorausdt@depth',
        'lrcusdt@depth',
        'zkjusdt@depth',
        'pixelusdt@depth',
        'milkusdt@depth',
        'solusdc@depth',
        'bakeusdt@depth',
        'aceusdt@depth',
        'tnsrusdt@depth',
        'ctsiusdt@depth',
        'filusdc@depth',
        'moodengusdt@depth',
        'epicusdt@depth',
        'btcusdt_251226@depth',
        'notusdt@depth',
        'qntusdt@depth',
        'b2usdt@depth',
        'iotausdt@depth',
        '1000satsusdt@depth',
        '1000000bobusdt@depth',
        'melaniausdt@depth',
        'ambusdt@depth',
        'btcstusdt@depth',
        'c98usdt@depth',
        'neousdt@depth',
        'loomusdt@depth',
        'wavesusdt@depth',
        'solusdt@depth',
        'pufferusdt@depth',
        'syrupusdt@depth',
        'yalausdt@depth',
        'zrousdt@depth',
        'broccoli714usdt@depth',
        'bidusdt@depth',
        'renderusdt@depth',
        'xmrusdt@depth',
        'apeusdt@depth',
        'ntrnusdt@depth',
        'bsvusdt@depth',
        'rifusdt@depth',
        'cvcusdt@depth',
        'walusdt@depth',
        'eosusdt@depth',
        'fetusdt@depth',
        'wifusdc@depth',
        'bomeusdt@depth',
        'naorisusdt@depth',
        'ltcusdc@depth',
        'sxpusdt@depth',
        'biousdt@depth',
        'husdt@depth',
        'rlcusdt@depth',
        'cetususdt@depth',
        'musdt@depth',
        'dydxusdt@depth',
        'jasmyusdt@depth',
        'mewusdt@depth',
        'hifiusdt@depth',
        'ontusdt@depth',
        'zkusdt@depth',
        'xlmusdt@depth',
        'kavausdt@depth',
        'fartcoinusdt@depth',
        'busdt@depth',
        'sxtusdt@depth',
        'alchusdt@depth',
        'batusdt@depth',
        'sandusdt@depth',
        'broccolif3busdt@depth',
        'mboxusdt@depth',
        'velvetusdt@depth',
        'uxlinkusdt@depth',
        'olusdt@depth',
        'movrusdt@depth',
        'sfpusdt@depth',
        'gusdt@depth',
        'jellyjellyusdt@depth',
        '1000catusdt@depth',
        'actusdt@depth',
        'cusdt@depth',
        'cvxusdt@depth',
        'hyperusdt@depth',
        'sonicusdt@depth',
        'iotxusdt@depth',
        'dotusdt@depth',
        'linkusdc@depth',
        'magicusdt@depth',
        'icntusdt@depth',
        'slpusdt@depth',
        'berausdt@depth',
        'agldusdt@depth',
        'yggusdt@depth',
        'aiotusdt@depth',
        'sntusdt@depth',
        'ainusdt@depth',
        'arcusdt@depth',
        'omniusdt@depth',
        'popcatusdt@depth',
        'skyaiusdt@depth',
        'pythusdt@depth',
        'obolusdt@depth',
        'bnbusdt@depth',
        'inusdt@depth',
        'oneusdt@depth',
        'dentusdt@depth',
        'omgusdt@depth',
        'promptusdt@depth',
        'aiusdt@depth',
        'hookusdt@depth',
        'nfpusdt@depth',
        'sophusdt@depth',
        'dmcusdt@depth',
        'tonusdt@depth',
        'enausdc@depth',
        'gmxusdt@depth',
        'xaiusdt@depth',
        'tausdt@depth',
        'opusdt@depth',
        'griffainusdt@depth',
        'animeusdt@depth',
        'santosusdt@depth',
        'metisusdt@depth',
        'sirenusdt@depth',
        'fttusdt@depth',
        'townsusdt@depth',
        'iostusdt@depth',
        'yfiusdt@depth',
        'scusdt@depth',
        'manausdt@depth',
        'ai16zusdt@depth',
        'ethfiusdc@depth',
        'pnutusdc@depth',
        'diausdt@depth',
        'newtusdt@depth',
        'lskusdt@depth',
        'dexeusdt@depth',
        'vvvusdt@depth',
        'ksmusdt@depth',
        'fxsusdt@depth',
        '1000ratsusdt@depth',
        'jstusdt@depth',
        '1inchusdt@depth',
        'tokenusdt@depth',
        'xrpusdc@depth',
        'btcusdt_250926@depth',
        'frontusdt@depth',
        'ethusdc@depth',
        'cfxusdt@depth',
        'spellusdt@depth',
        '1000xecusdt@depth',
        'ghstusdt@depth',
        'nearusdt@depth',
        'arbusdt@depth',
        'ftmusdt@depth',
        'bdxnusdt@depth',
        'bullausdt@depth',
        'brettusdt@depth',
        '1000bonkusdc@depth',
        'sunusdt@depth',
        'ethbtc@depth',
        'strkusdt@depth',
        'babyusdt@depth',
        'api3usdt@depth',
        'linkusdt@depth',
        'aliceusdt@depth',
        'signusdt@depth',
        'stxusdt@depth',
        'gunusdt@depth',
        'asrusdt@depth',
        'xrpusdt@depth',
        'bananas31usdt@depth',
        'kncusdt@depth',
        'merlusdt@depth',
        '1000cheemsusdt@depth',
        'radusdt@depth',
        'sqdusdt@depth',
        'ssvusdt@depth',
        'funusdt@depth',
        'listausdt@depth',
        'reiusdt@depth',
        'eptusdt@depth',
        'auctionusdt@depth',
        'suiusdc@depth',
        'formusdt@depth',
        'seiusdt@depth',
        'vanausdt@depth',
        '1000000mogusdt@depth',
        'perpusdt@depth',
        'tusdt@depth',
        'initusdt@depth',
        'dogeusdt@depth',
        'xtzusdt@depth',
        'nilusdt@depth',
        'aixbtusdt@depth',
        'kaitousdc@depth',
        '1000xusdt@depth',
        'safeusdt@depth',
        'komausdt@depth',
        'tlmusdt@depth',
        'enausdt@depth',
        'pippinusdt@depth',
        'haedalusdt@depth',
        'agtusdt@depth',
        'myxusdt@depth',
        'umausdt@depth',
        'powrusdt@depth',
        'phbusdt@depth',
        'hypeusdt@depth',
        'flowusdt@depth',
        'ipusdc@depth',
        '1000whyusdt@depth',
        'ilvusdt@depth',
        'scrusdt@depth',
        'vthousdt@depth',
        'lqtyusdt@depth',
        'bchusdc@depth',
        'trbusdt@depth',
        'reefusdt@depth',
        'highusdt@depth',
        'luna2usdt@depth',
        'btcusdc@depth',
        'homeusdt@depth',
        'cotiusdt@depth',
        'nxpcusdt@depth',
        'swarmsusdt@depth',
        'btcusdt@depth',
        'adausdt@depth',
        'btcdomusdt@depth',
        'bchusdt@depth',
        'turbousdt@depth',
        'dodoxusdt@depth',
        'rsrusdt@depth',
        '1000flokiusdt@depth',
        'nearusdc@depth',
        'ondousdt@depth',
        'vidtusdt@depth',
        'cakeusdt@depth',
        'celrusdt@depth',
        'maviausdt@depth',
        'pumpbtcusdt@depth',
        'neirousdt@depth',
        'morphousdt@depth',
        'grtusdt@depth',
        'tiausdt@depth',
        'soonusdt@depth',
        'allusdt@depth',
        'lumiausdt@depth',
        'straxusdt@depth',
        'portalusdt@depth',
        'tacusdt@depth',
        'usdcusdt@depth',
        'goatusdt@depth',
        'maticusdt@depth',
        'arkmusdt@depth',
        'paxgusdt@depth',
        'algousdt@depth',
        'ordiusdc@depth',
        'maticusdc@depth',
        'dymusdt@depth',
        'crvusdt@depth',
        'tstusdt@depth',
        'roseusdt@depth',
        'bntusdt@depth',
        'pundixusdt@depth',
        'axsusdt@depth',
        'tagusdt@depth',
        'bnbbtc@depth',
        'idolusdt@depth',
        'idusdt@depth',
        'synusdt@depth',
        'gmtusdt@depth',
        'ustcusdt@depth',
        'uniusdt@depth',
        'oxtusdt@depth',
        'polusdt@depth',
        'bondusdt@depth',
        'tutusdt@depth',
        'cosusdt@depth',
        'icpusdt@depth',
        'polyxusdt@depth',
        'kdausdt@depth',
        'darusdt@depth',
        'peopleusdt@depth',
        'usualusdt@depth',
        'chillguyusdt@depth',
        'shellusdt@depth',
        'glmusdt@depth',
        'ckbusdt@depth',
        'wifusdt@depth',
        'taikousdt@depth',
        'rvnusdt@depth',
        'zetausdt@depth',
        '1mbabydogeusdt@depth',
        'gpsusdt@depth',
        'sklusdt@depth',
        'eduusdt@depth',
        'memefiusdt@depth',
        'bomeusdc@depth',
        'banusdt@depth',
        'susdt@depth',
        'adausdc@depth',
        'rdntusdt@depth',
        '1000luncusdt@depth',
        '1000bonkusdt@depth',
        'vetusdt@depth',
        'aevousdt@depth',
        'b3usdt@depth',
        'atomusdt@depth',
        'ethfiusdt@depth',
        'blurusdt@depth',
        'wldusdt@depth',
        'twtusdt@depth',
        'degenusdt@depth',
        'lausdt@depth',
        'ltcusdt@depth',
        'myrousdt@depth',
        'mtlusdt@depth',
        'athusdt@depth',
        'rareusdt@depth',
        'storjusdt@depth',
        'port3usdt@depth',
        'jtousdt@depth',
        'agixusdt@depth',
        'catiusdt@depth',
        'mantausdt@depth',
        'celousdt@depth',
        '1000pepeusdc@depth',
        'defiusdt@depth',
        'trumpusdt@depth',
        'heiusdt@depth',
        'pumpusdt@depth',
        'chzusdt@depth',
        'xcnusdt@depth',
        'alpacausdt@depth',
        'beamxusdt@depth',
        'bswusdt@depth',
        'avaaiusdt@depth',
        'hbarusdt@depth',
        'zilusdt@depth',
        'renusdt@depth',
        'orbsusdt@depth',
        'hftusdt@depth',
        'waxpusdt@depth',
        'icxusdt@depth',
        'etcusdt@depth',
        'avausdt@depth',
        'bnbusdc@depth',
        'nknusdt@depth',
        'unfiusdt@depth',
        'axlusdt@depth',
        'ankrusdt@depth',
        'snxusdt@depth',
        'hotusdt@depth',
        'aaveusdc@depth',
        'achusdt@depth',
        'proveusdt@depth',
        'iousdt@depth',
        'troyusdt@depth',
        'dfusdt@depth',
        'moveusdt@depth',
        'avaxusdc@depth',
        'sagausdt@depth',
        'stousdt@depth',
        'cyberusdt@depth',
        'acxusdt@depth',
        'runeusdt@depth',
        'keyusdt@depth',
        'stptusdt@depth',
        'ethusdt_250926@depth',
        'a2zusdt@depth',
        '1000pepeusdt@depth',
        'egldusdt@depth',
        'wusdt@depth',
        'stgusdt@depth',
        'sushiusdt@depth',
        'cgptusdt@depth',
        'fusdt@depth',
        'kaiausdt@depth',
        'ethusdt_251226@depth',
        'fluxusdt@depth',
        'mlnusdt@depth',
        'steemusdt@depth',
        'nmrusdt@depth',
        'esportsusdt@depth',
        'badgerusdt@depth',
        'wctusdt@depth',
        'rayusdt@depth',
        'aaveusdt@depth',
        'xvsusdt@depth',
        'roninusdt@depth',
        'glmrusdt@depth',
        'bananausdt@depth',
        'linausdt@depth',
        'mavusdt@depth',
        'woousdt@depth',
        'voxelusdt@depth',
        'playusdt@depth',
        'uniusdc@depth',
        'resolvusdt@depth',
        'solvusdt@depth',
        'ethwusdt@depth',
        'plumeusdt@depth',
        'bandusdt@depth',
        'hippousdt@depth',
        'rezusdt@depth',
        'mdtusdt@depth',
        'compusdt@depth',
        'ordiusdt@depth',
        'neiroethusdt@depth',

        // Composite Index Symbol Information Streams
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Composite-Index-Symbol-Information-Streams
        // 'btcusdt@compositeIndex' // DOESNT EXIST AS TYPE GUARD
        // Contract Info Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Contract-Info-Stream
        // '!contractInfo' // DOESNT EXIST AS TYPE GUARD
        // Multi-Assets Mode Asset Index Stream
        // https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Multi-Assets-Mode-Asset-Index
        // '!assetIndex@arr' // DOESNT EXIST AS TYPE GUARD
        // 'btcusdt@assetIndex'
      ],
      'usdm',
    );

    /**
     * Subscribe to each available european options market data websocket topic, the new way:
     *
     * https://developers.binance.com/docs/derivatives/option/websocket-market-streams/New-Symbol-Info
     *
     * https://eapi.binance.com/eapi/v1/exchangeInfo
     */
    const optionsAsset = 'ETH';
    const optionsExpiration = '250328';
    const optionsSymbol = 'BTC-250328-140000-C';
    await wsClient.subscribe(
      [
        'option_pair',
        `${optionsAsset}@openInterest@${optionsExpiration}`,
        `${optionsAsset}@markPrice`,
        `${optionsSymbol}@kline_1m`,
        `${optionsAsset}@ticker@${optionsExpiration}`,
        `${symbol}@index`,
        `${optionsAsset}@trade`,
        `${optionsSymbol}@depth100`,
      ],
      'eoptions',
    );

    // /**
    //  *
    //  * For those that used the Node.js Binance SDK before the v3 release, you can
    //  * still subscribe to available market topics the "old" way, for convenience
    //  * when migrating from the old WebsocketClient to the new multiplex client):
    //  *
    //  */

    // wsClient.subscribeAggregateTrades(symbol, 'usdm');
    // wsClient.subscribeTrades(symbol, 'spot');
    // wsClient.subscribeTrades(symbol, 'usdm');
    // wsClient.subscribeTrades(coinMSymbol, 'coinm');
    // wsClient.subscribeCoinIndexPrice(coinMSymbol2);
    // wsClient.subscribeAllBookTickers('usdm');
    // wsClient.subscribeSpotKline(symbol, '1m');
    // wsClient.subscribeMarkPrice(symbol, 'usdm');
    // wsClient.subscribeMarkPrice(coinMSymbol, 'coinm');
    // wsClient.subscribeAllMarketMarkPrice('usdm');
    // wsClient.subscribeAllMarketMarkPrice('coinm');
    // wsClient.subscribeKlines(symbol, '1m', 'usdm');
    // wsClient.subscribeContinuousContractKlines(
    //   symbol,
    //   'perpetual',
    //   '1m',
    //   'usdm',
    // );
    // wsClient.subscribeIndexKlines(coinMSymbol2, '1m');
    // wsClient.subscribeMarkPriceKlines(coinMSymbol, '1m');
    // wsClient.subscribeSymbolMini24hrTicker(symbol, 'spot'); // 0116 265 5309, opt 1
    // wsClient.subscribeSymbolMini24hrTicker(symbol, 'usdm');
    // wsClient.subscribeSymbolMini24hrTicker(coinMSymbol, 'coinm');
    // wsClient.subscribeSymbol24hrTicker(symbol, 'spot');
    // wsClient.subscribeSymbol24hrTicker(symbol, 'usdm');
    // wsClient.subscribeSymbol24hrTicker(coinMSymbol, 'coinm');
    // wsClient.subscribeAllMini24hrTickers('spot');
    // wsClient.subscribeAllMini24hrTickers('usdm');
    // wsClient.subscribeAllMini24hrTickers('coinm');
    // wsClient.subscribeAll24hrTickers('spot');
    // wsClient.subscribeAll24hrTickers('usdm');
    // wsClient.subscribeAll24hrTickers('coinm');
    // wsClient.subscribeSymbolLiquidationOrders(symbol, 'usdm');
    // wsClient.subscribeAllLiquidationOrders('usdm');
    // wsClient.subscribeAllLiquidationOrders('coinm');
    // wsClient.subscribeSpotSymbol24hrTicker(symbol);
    // wsClient.subscribeSpotPartialBookDepth('ETHBTC', 5, 1000);
    // wsClient.subscribeAllRollingWindowTickers('spot', '1d');
    // wsClient.subscribeSymbolBookTicker(symbol, 'spot');
    // wsClient.subscribePartialBookDepths(symbol, 5, 100, 'spot');
    // wsClient.subscribeDiffBookDepth(symbol, 100, 'spot');
    // wsClient.subscribeContractInfoStream('usdm');
    // wsClient.subscribeContractInfoStream('coinm');
  } catch (e) {
    console.error('exception on subscribe attempt: ', e);
  }
})();
