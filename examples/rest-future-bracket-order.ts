import {
  USDMClient,
  NewFuturesOrderParams
} from '../src/index';

const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = new USDMClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: true
});

const symbol = 'ETHUSDT';

// submit a 1:1 bracket market buy order with market entry order
(async () => {
  try {
    // TODO: check balance and do other validations

    const assetPrices = await client.getMarkPrice({
      symbol: "ETHUSDT"
    })
    const markPrice: number = Number(assetPrices.markPrice)
    const stopLossPrice = Number(markPrice * 99.9 / 100).toFixed(2)
    const takeProfitPrice = Number(markPrice * 100.1 / 100).toFixed(2)

    // create three orders
    // 1. entry order (GTC),
    // 2. take profit order (GTE_GTC),
    // 3. stop loss order (GTE_GTC)

    const entryOrder: NewFuturesOrderParams<string> = {
      positionSide: "BOTH",
      quantity: "0.01",
      reduceOnly: "false",
      side: "BUY",
      symbol: "ETHUSDT",
      type: "MARKET",
    };

    const takeProfitOrder: NewFuturesOrderParams<string> = {
      positionSide: "BOTH",
      priceProtect: "TRUE",
      quantity: "0.01",
      side: "SELL",
      stopPrice: takeProfitPrice,
      symbol: "ETHUSDT",
      timeInForce: "GTE_GTC",
      type: "TAKE_PROFIT_MARKET",
      workingType: "MARK_PRICE",
      closePosition: "true"
    };

    const stopLossOrder: NewFuturesOrderParams<string> = {
      positionSide: "BOTH",
      priceProtect: "TRUE",
      quantity: "0.01",
      side: "SELL",
      stopPrice: stopLossPrice,
      symbol: "ETHUSDT",
      timeInForce: "GTE_GTC",
      type: "STOP_MARKET",
      workingType: "MARK_PRICE",
      closePosition: "true"
    };

    const openedOrder = await client.submitMultipleOrders([entryOrder, takeProfitOrder, stopLossOrder])
      .catch(e => console.log(e?.body || e));
    console.log(openedOrder);
  } catch (e) {
    console.log(e);
  }
})();
