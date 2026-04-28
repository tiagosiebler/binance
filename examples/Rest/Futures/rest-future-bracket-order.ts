import {
  FuturesNewAlgoOrderParams,
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
    const stopLossPrice = ((markPrice * 99.9) / 100).toFixed(2);
    const takeProfitPrice = ((markPrice * 100.1) / 100).toFixed(2);

    const entryOrder = {
      positionSide: 'BOTH',
      quantity,
      reduceOnly: 'false',
      side: 'BUY',
      symbol,
      type: 'MARKET',
    } as const;

    const takeProfitOrder: FuturesNewAlgoOrderParams = {
      algoType: 'CONDITIONAL',
      positionSide: 'BOTH',
      priceProtect: 'TRUE',
      side: 'SELL',
      triggerPrice: takeProfitPrice,
      symbol,
      type: 'TAKE_PROFIT_MARKET',
      workingType: 'MARK_PRICE',
      closePosition: 'true',
    };

    const stopLossOrder: FuturesNewAlgoOrderParams = {
      algoType: 'CONDITIONAL',
      positionSide: 'BOTH',
      priceProtect: 'TRUE',
      side: 'SELL',
      triggerPrice: stopLossPrice,
      symbol,
      type: 'STOP_MARKET',
      workingType: 'MARK_PRICE',
      closePosition: 'true',
    };

    const openedOrder = await client.submitNewOrder(entryOrder);
    const takeProfitAlgoOrder =
      await client.submitNewAlgoOrder(takeProfitOrder);
    const stopLossAlgoOrder = await client.submitNewAlgoOrder(stopLossOrder);

    console.log({ openedOrder, takeProfitAlgoOrder, stopLossAlgoOrder });
  } catch (e) {
    console.error(e);
  }
})();
