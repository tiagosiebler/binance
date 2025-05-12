/* eslint-disable @typescript-eslint/no-unused-vars */
// or
// import { DefaultLogger, WebsocketAPIClient, WS_KEY_MAP } from 'binance';
// or
// const { DefaultLogger, WebsocketAPIClient, WS_KEY_MAP } = require('binance');

import { DefaultLogger, WebsocketAPIClient } from '../../src';

/**
 * The WS API only works with an Ed25519 API key.
 *
 * Check the rest-private-ed25519.md in this folder for more guidance
 * on preparing this Ed25519 API key.
 */

const publicKey = `-----BEGIN PUBLIC KEY-----
MCexampleQTxwLU9o=
-----END PUBLIC KEY-----
`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAexamplewqj5CzUuTy1
-----END PRIVATE KEY-----
`;

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

// returned by binance, generated using the publicKey (above)
// const key = 'BVv39ATnIme5TTZRcC3I04C3FqLVM7vCw3Hf7mMT7uu61nEZK8xV1V5dmhf9kifm';
// Your Ed25519 private key is passed as the "secret"
// const secret = privateKey;

// function attachEventHandlers<TWSClient extends WebsocketClient>(
//   wsClient: TWSClient,
// ): void {
//   /**
//    * General event handlers for monitoring the WebsocketClient
//    */
//   wsClient.on('message', (data) => {
//     // console.log('raw message received ', JSON.stringify(data));
//   });
//   wsClient.on('response', (data) => {
//     // console.log('ws response: ', JSON.stringify(data));
//   });
//   wsClient.on('open', (data) => {
//     console.log('ws connected', data.wsKey);
//   });
//   wsClient.on('reconnecting', ({ wsKey }) => {
//     console.log('ws automatically reconnecting.... ', wsKey);
//   });
//   wsClient.on('reconnected', (data) => {
//     console.log('ws has reconnected ', data?.wsKey);
//   });
//   wsClient.on('authenticated', (data) => {
//     console.log('ws has authenticated ', data?.wsKey);
//   });
//   wsClient.on('exception', (data) => {
//     console.error('ws exception: ', JSON.stringify(data));
//   });
// }

async function main() {
  const customLogger = {
    ...DefaultLogger,
    // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
    // trace: (...params) => console.log(new Date(), 'trace', ...params),
  };

  const wsClient = new WebsocketAPIClient(
    {
      api_key: key,
      api_secret: secret,
      beautify: true,

      // Enforce testnet ws connections, regardless of supplied wsKey
      // testnet: true,

      // Note: unless you set this to false, the SDK will automatically call
      // the `subscribeUserDataStream()` method again if reconnected (if you called it before):
      // resubscribeUserDataStreamAfterReconnect: true,

      // If you want your own event handlers instead of the default ones with logs, disable this setting and see the `attachEventHandlers` example below:
      // attachEventListeners: false
    },
    customLogger,
  );

  // Optional, attach basic event handlers, so nothing is left unhandled
  // attachEventHandlers(wsClient.getWSClient());

  // Optional, if you see RECV Window errors, you can use this to manage time issues.
  // ! However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  // wsClient.setTimeOffsetMs(-5000);

  // Optional. Can be used to prepare a connection before sending commands.
  // Can be done as part of a bootstrapping workflow, to reduce initial latency when sending the first command
  // await wsClient.getWSClient().connectWSAPI(WS_KEY_MAP.mainWSAPI);

  try {
    const response = await wsClient.getSpotSessionStatus();
    console.log('getSessionStatus response: ', response);
  } catch (e) {
    console.log('getSessionStatus error: ', e);
  }

  try {
    const response = await wsClient.getSpotServerTime();
    console.log('getSpotServerTime response: ', response);
  } catch (e) {
    console.log('getSpotServerTime error: ', e);
  }

  try {
    const response = await wsClient.getSpotExchangeInfo();
    console.log('getSpotExchangeInfo response: ', response);
  } catch (e) {
    console.log('getSpotExchangeInfo error: ', e);
  }

  try {
    const response = await wsClient.getSpotOrderBook({ symbol: 'BTCUSDT' });
    console.log('getSpotOrderBook response: ', response);
  } catch (e) {
    console.log('getSpotOrderBook error: ', e);
  }

  try {
    const response = await wsClient.getSpotHistoricalTrades({
      symbol: 'BTCUSDT',
      fromId: 0,
      limit: 1,
    });
    console.log('getSpotHistoricalTrades response: ', response);
  } catch (e) {
    console.log('getSpotHistoricalTrades error: ', e);
  }

  // SPOT - Market data requests
  try {
    const response = await wsClient.getSpotRecentTrades({
      symbol: 'BTCUSDT',
      limit: 1,
    });
    console.log('getSpotRecentTrades response: ', response);
  } catch (e) {
    console.log('getSpotRecentTrades error: ', e);
  }

  try {
    const response = await wsClient.getSpotAggregateTrades({
      symbol: 'BNBBTC',
      fromId: 50000000,
      limit: 1,
    });
    console.log('getSpotAggregateTrades response: ', response);
  } catch (e) {
    console.log('getSpotAggregateTrades error: ', e);
  }

  try {
    const response = await wsClient.getSpotKlines({
      symbol: 'BNBBTC',
      interval: '1h',
      startTime: 1655969280000,
      limit: 1,
    });
    console.log('getSpotKlines response: ', response);
  } catch (e) {
    console.log('getSpotKlines error: ', e);
  }

  try {
    const response = await wsClient.getSpotUIKlines({
      symbol: 'BNBBTC',
      interval: '1h',
      startTime: 1655969280000,
      limit: 1,
    });
    console.log('getSpotUIKlines response: ', response);
  } catch (e) {
    console.log('getSpotUIKlines error: ', e);
  }

  try {
    const response = await wsClient.getSpotAveragePrice({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotAveragePrice response: ', response);
  } catch (e) {
    console.log('getSpotAveragePrice error: ', e);
  }

  try {
    const response = await wsClient.getSpot24hrTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getSpot24hrTicker response: ', response);
  } catch (e) {
    console.log('getSpot24hrTicker error: ', e);
  }

  try {
    const response = await wsClient.getSpotTradingDayTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotTradingDayTicker response: ', response);
  } catch (e) {
    console.log('getSpotTradingDayTicker error: ', e);
  }

  try {
    const response = await wsClient.getSpotTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotTicker response: ', response);
  } catch (e) {
    console.log('getSpotTicker error: ', e);
  }

  try {
    const response = await wsClient.getSpotSymbolPriceTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotSymbolPriceTicker response: ', response);
  } catch (e) {
    console.log('getSpotSymbolPriceTicker error: ', e);
  }

  try {
    const response = await wsClient.getSpotSymbolOrderBookTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotSymbolOrderBookTicker response: ', response);
  } catch (e) {
    console.log('getSpotSymbolOrderBookTicker error: ', e);
  }

  // SPOT - Trading requests
  try {
    const response = await wsClient.submitNewSpotOrder({
      symbol: 'BTCUSDT',
      side: 'SELL',
      type: 'LIMIT',
      timeInForce: 'GTC',
      price: '23416.10000000',
      quantity: '0.00847000',
    });
    console.log('submitNewSpotOrder response: ', response);
  } catch (e) {
    console.log('submitNewSpotOrder error: ', e);
  }

  try {
    const response = await wsClient.testSpotOrder({
      symbol: 'BTCUSDT',
      side: 'SELL',
      type: 'LIMIT',
      timeInForce: 'GTC',
      price: '23416.1',
      quantity: '0.001',
      timestamp: Date.now(),
    });
    console.log('testSpotOrder response: ', response);
  } catch (e) {
    console.log('testSpotOrder error: ', e);
  }

  try {
    const response = await wsClient.getSpotOrderStatus({
      symbol: 'BTCUSDT',
      orderId: 12345678,
      timestamp: Date.now(),
    });
    console.log('getSpotOrderStatus response: ', response);
  } catch (e) {
    console.log('getSpotOrderStatus error: ', e);
  }

  try {
    const response = await wsClient.cancelSpotOrder({
      symbol: 'BTCUSDT',
      orderId: 12345678,
      timestamp: Date.now(),
    });
    console.log('cancelSpotOrder response: ', response);
  } catch (e) {
    console.log('cancelSpotOrder error: ', e);
  }

  try {
    const response = await wsClient.cancelReplaceSpotOrder({
      symbol: 'BTCUSDT',
      cancelReplaceMode: 'ALLOW_FAILURE',
      cancelOrigClientOrderId: '4d96324ff9d44481926157',
      side: 'SELL',
      type: 'LIMIT',
      timeInForce: 'GTC',
      price: '23416.10000000',
      quantity: '0.00847000',
      timestamp: Date.now(),
    });
    console.log('cancelReplaceSpotOrder response: ', response);
  } catch (e) {
    console.log('cancelReplaceSpotOrder error: ', e);
  }

  try {
    const response = await wsClient.amendSpotOrderKeepPriority({
      newQty: '5',
      origClientOrderId: 'my_test_order1',
      recvWindow: 5000,
      symbol: 'BTCUSDT',
      timestamp: Date.now(),
    });
    console.log('amendSpotOrderKeepPriority response: ', response);
  } catch (e) {
    console.log('amendSpotOrderKeepPriority error: ', e);
  }

  try {
    const response = await wsClient.getSpotOpenOrders({
      symbol: 'BTCUSDT',
      timestamp: Date.now(),
    });
    console.log('getSpotOpenOrders response: ', response);
  } catch (e) {
    console.log('getSpotOpenOrders error: ', e);
  }

  try {
    const response = await wsClient.cancelAllSpotOpenOrders({
      symbol: 'BTCUSDT',
      timestamp: Date.now(),
    });
    console.log('cancelAllSpotOpenOrders response: ', response);
  } catch (e) {
    console.log('cancelAllSpotOpenOrders error: ', e);
  }

  try {
    const response = await wsClient.placeSpotOrderList({
      symbol: 'BTCUSDT',
      side: 'SELL',
      price: '23420.00000000',
      quantity: '0.00650000',
      stopPrice: '23410.00000000',
      stopLimitPrice: '23405.00000000',
      stopLimitTimeInForce: 'GTC',
      newOrderRespType: 'RESULT',
      timestamp: Date.now(),
    });
    console.log('placeSpotOrderList response: ', response);
  } catch (e) {
    console.log('placeSpotOrderList error: ', e);
  }

  try {
    const response = await wsClient.placeSpotOCOOrderList({
      symbol: 'LTCBNB',
      side: 'BUY',
      quantity: 1,
      timestamp: 1711062760647,
      aboveType: 'STOP_LOSS_LIMIT',
      abovePrice: '1.5',
      aboveStopPrice: '1.50000001',
      aboveTimeInForce: 'GTC',
      belowType: 'LIMIT_MAKER',
      belowPrice: '1.49999999',
    });
    console.log('placeSpotOCOOrderList response: ', response);
  } catch (e) {
    console.log('placeSpotOCOOrderList error: ', e);
  }

  try {
    const response = await wsClient.placeSpotOTOOrderList({
      pendingQuantity: 1,
      pendingSide: 'BUY',
      pendingType: 'MARKET',
      symbol: 'LTCBNB',
      recvWindow: 5000,
      timestamp: 1712544395951,
      workingPrice: 1,
      workingQuantity: 1,
      workingSide: 'SELL',
      workingTimeInForce: 'GTC',
      workingType: 'LIMIT',
    });
    console.log('placeSpotOTOOrderList response: ', response);
  } catch (e) {
    console.log('placeSpotOTOOrderList error: ', e);
  }

  try {
    const response = await wsClient.placeSpotOTOCOOrderList({
      pendingQuantity: 5,
      pendingSide: 'SELL',
      pendingBelowPrice: 5,
      pendingBelowType: 'LIMIT_MAKER',
      pendingAboveStopPrice: 0.5,
      pendingAboveType: 'STOP_LOSS',
      symbol: 'LTCBNB',
      recvWindow: 5000,
      timestamp: Date.now(),
      workingPrice: 1.5,
      workingQuantity: 1,
      workingSide: 'BUY',
      workingTimeInForce: 'GTC',
      workingType: 'LIMIT',
    });
    console.log('placeSpotOTOCOOrderList response: ', response);
  } catch (e) {
    console.log('placeSpotOTOCOOrderList error: ', e);
  }

  try {
    const response = await wsClient.getSpotOrderListStatus({
      orderListId: 12345678,
      timestamp: Date.now(),
    });
    console.log('getSpotOrderListStatus response: ', response);
  } catch (e) {
    console.log('getSpotOrderListStatus error: ', e);
  }

  try {
    const response = await wsClient.cancelSpotOrderList({
      symbol: 'BTCUSDT',
      orderListId: 1274512,
      timestamp: Date.now(),
    });
    console.log('cancelSpotOrderList response: ', response);
  } catch (e) {
    console.log('cancelSpotOrderList error: ', e);
  }

  try {
    const response = await wsClient.getSpotOpenOrderLists({
      timestamp: Date.now(),
    });
    console.log('getSpotOpenOrderLists response: ', response);
  } catch (e) {
    console.log('getSpotOpenOrderLists error: ', e);
  }

  try {
    const response = await wsClient.placeSpotSOROrder({
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'LIMIT',
      quantity: 0.5,
      timeInForce: 'GTC',
      price: 31000,
      timestamp: Date.now(),
    });
    console.log('placeSpotSOROrder response: ', response);
  } catch (e) {
    console.log('placeSpotSOROrder error: ', e);
  }

  try {
    const response = await wsClient.testSpotSOROrder({
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'LIMIT',
      quantity: 0.1,
      timeInForce: 'GTC',
      price: 0.1,
      timestamp: Date.now(),
    });
    console.log('testSpotSOROrder response: ', response);
  } catch (e) {
    console.log('testSpotSOROrder error: ', e);
  }

  // SPOT - Account requests
  try {
    const response = await wsClient.getSpotAccountInformation({
      timestamp: Date.now(),
    });
    console.log('getSpotAccountInformation response: ', response);
  } catch (e) {
    console.log('getSpotAccountInformation error: ', e);
  }

  try {
    const response = await wsClient.getSpotOrderRateLimits({
      timestamp: Date.now(),
    });
    console.log('getSpotOrderRateLimits response: ', response);
  } catch (e) {
    console.log('getSpotOrderRateLimits error: ', e);
  }

  try {
    const response = await wsClient.getSpotAllOrders({
      symbol: 'BTCUSDT',
      limit: 10,
    });
    console.log('getSpotAllOrders response: ', response);
  } catch (e) {
    console.log('getSpotAllOrders error: ', e);
  }

  try {
    const response = await wsClient.getSpotAllOrderLists({
      limit: 10,
    });
    console.log('getSpotAllOrderLists response: ', response);
  } catch (e) {
    console.log('getSpotAllOrderLists error: ', e);
  }

  try {
    const response = await wsClient.getSpotMyTrades({
      symbol: 'BTCUSDT',
      limit: 10,
    });
    console.log('getSpotMyTrades response: ', response);
  } catch (e) {
    console.log('getSpotMyTrades error: ', e);
  }

  try {
    const response = await wsClient.getSpotPreventedMatches({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotPreventedMatches response: ', response);
  } catch (e) {
    console.log('getSpotPreventedMatches error: ', e);
  }

  try {
    const response = await wsClient.getSpotAllocations({
      symbol: 'BTCUSDT',
      orderId: 12345678,
    });
    console.log('getSpotAllocations response: ', response);
  } catch (e) {
    console.log('getSpotAllocations error: ', e);
  }

  try {
    const response = await wsClient.getSpotAccountCommission({
      symbol: 'BTCUSDT',
    });
    console.log('getSpotAccountCommission response: ', response);
  } catch (e) {
    console.log('getSpotAccountCommission error: ', e);
  }

  // FUTURES - Market data requests
  try {
    const response = await wsClient.getFuturesOrderBook({
      symbol: 'BTCUSDT',
    });
    console.log('getFuturesOrderBook response: ', response);
  } catch (e) {
    console.log('getFuturesOrderBook error: ', e);
  }

  try {
    const response = await wsClient.getFuturesSymbolPriceTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getFuturesSymbolPriceTicker response: ', response);
  } catch (e) {
    console.log('getFuturesSymbolPriceTicker error: ', e);
  }

  try {
    const response = await wsClient.getFuturesSymbolOrderBookTicker({
      symbol: 'BTCUSDT',
    });
    console.log('getFuturesSymbolOrderBookTicker response: ', response);
  } catch (e) {
    console.log('getFuturesSymbolOrderBookTicker error: ', e);
  }

  // FUTURES - Trading requests
  try {
    const response = await wsClient.submitNewFuturesOrder('usdm', {
      positionSide: 'BOTH',
      price: '43187.00',
      quantity: 0.1,
      side: 'BUY',
      symbol: 'BTCUSDT',
      timeInForce: 'GTC',
      timestamp: Date.now(),
      type: 'LIMIT',
    });
    console.log('submitNewFuturesOrder response: ', response);
  } catch (e) {
    console.log('submitNewFuturesOrder error: ', e);
  }

  try {
    const response = await wsClient.modifyFuturesOrder('usdm', {
      orderId: 328971409,
      origType: 'LIMIT',
      positionSide: 'SHORT',
      price: '43769.1',
      priceMatch: 'NONE',
      quantity: '0.11',
      side: 'SELL',
      symbol: 'BTCUSDT',
      timestamp: Date.now(),
    });
    console.log('modifyFuturesOrder response: ', response);
  } catch (e) {
    console.log('modifyFuturesOrder error: ', e);
  }

  try {
    const response = await wsClient.cancelFuturesOrder('usdm', {
      symbol: 'BTCUSDT',
      orderId: 328971409,
      timestamp: Date.now(),
    });
    console.log('cancelFuturesOrder response: ', response);
  } catch (e) {
    console.log('cancelFuturesOrder error: ', e);
  }

  try {
    const response = await wsClient.getFuturesOrderStatus('usdm', {
      orderId: 328999071,
      symbol: 'BTCUSDT',
      timestamp: Date.now(),
    });
    console.log('getFuturesOrderStatus response: ', response);
  } catch (e) {
    console.log('getFuturesOrderStatus error: ', e);
  }

  try {
    const response = await wsClient.getFuturesPositionV2({
      timestamp: Date.now(),
    });
    console.log('getFuturesPositionV2 response: ', response);
  } catch (e) {
    console.log('getFuturesPositionV2 error: ', e);
  }

  try {
    const response = await wsClient.getFuturesPosition('usdm', {
      timestamp: Date.now(),
    });
    console.log('getFuturesPosition response: ', response);
  } catch (e) {
    console.log('getFuturesPosition error: ', e);
  }

  // FUTURES - Account requests
  try {
    const response = await wsClient.getFuturesAccountBalanceV2({
      timestamp: Date.now(),
    });
    console.log('getFuturesAccountBalanceV2 response: ', response);
  } catch (e) {
    console.log('getFuturesAccountBalanceV2 error: ', e);
  }

  try {
    const response = await wsClient.getFuturesAccountBalance('usdm', {
      timestamp: Date.now(),
    });
    console.log('getFuturesAccountBalance response: ', response);
  } catch (e) {
    console.log('getFuturesAccountBalance error: ', e);
  }

  try {
    const response = await wsClient.getFuturesAccountStatusV2({
      timestamp: Date.now(),
    });
    console.log('getFuturesAccountStatusV2 response: ', response);
  } catch (e) {
    console.log('getFuturesAccountStatusV2 error: ', e);
  }

  try {
    const response = await wsClient.getFuturesAccountStatus('usdm', {
      timestamp: Date.now(),
    });
    console.log('getFuturesAccountStatus response: ', response);
  } catch (e) {
    console.log('getFuturesAccountStatus error: ', e);
  }
}

// Start executing the example workflow
main();
