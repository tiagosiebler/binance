import {
  FuturesNewAlgoOrderParams,
  NewFuturesOrderParams,
  USDMClient,
} from '../../../src/index';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new USDMClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: false,
});

(async () => {
  try {
    const symbol = process.env.BINANCE_EXAMPLE_SYMBOL || 'ETHUSDT';
    const quantity = Number(process.env.BINANCE_EXAMPLE_QUANTITY || '0.01');

    const assetPrices = await client.getMarkPrice({ symbol });
    const markPrice = Number(assetPrices.markPrice);
    const stopLossPrice = Number(((markPrice * 99.9) / 100).toFixed(2));
    const takeProfitPrice = Number(((markPrice * 100.1) / 100).toFixed(2));

    const entryOrder: NewFuturesOrderParams = {
      positionSide: 'BOTH',
      quantity,
      reduceOnly: 'false',
      side: 'BUY',
      symbol,
      type: 'MARKET',
    };

    const takeProfitOrder: NewFuturesOrderParams = {
      positionSide: 'BOTH',
      price: takeProfitPrice,
      quantity,
      reduceOnly: 'true',
      side: 'SELL',
      symbol,
      timeInForce: 'GTX',
      type: 'LIMIT',
    };

    const stopLossOrder: FuturesNewAlgoOrderParams = {
      algoType: 'CONDITIONAL',
      positionSide: 'BOTH',
      priceProtect: 'true',
      side: 'SELL',
      triggerPrice: stopLossPrice,
      symbol,
      type: 'STOP_MARKET',
      workingType: 'MARK_PRICE',
      closePosition: 'true',
    };

    const openedOrder = await client.submitNewOrder(entryOrder);
    const takeProfitLimitOrder = await client.submitNewOrder(takeProfitOrder);
    const stopLossAlgoOrder = await client.submitNewAlgoOrder(stopLossOrder);

    console.log({ openedOrder, takeProfitLimitOrder, stopLossAlgoOrder });
  } catch (e) {
    console.error(e);
  }
})();
