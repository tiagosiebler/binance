import { FuturesNewAlgoOrderParams, USDMClient } from '../../../src/index';

// or
// import { FuturesNewAlgoOrderParams, USDMClient } from 'binance';

const key = process.env.API_KEY_COM || 'APIKEY';
const secret = process.env.API_SECRET_COM || 'APISECRET';

const client = new USDMClient({
  api_secret: secret,
  api_key: key,
  beautifyResponses: false,
});

const symbol = process.env.BINANCE_EXAMPLE_SYMBOL || 'BTCUSDT';

async function start() {
  try {
    // Hedge Mode example: find the LONG position and prepare a replacement SL.
    const positions = await client.getPositionsV3({ symbol });
    const longPosition = positions.find(
      (position) => position.positionSide === 'LONG',
    );
    const longAmount = Number(longPosition?.positionAmt || 0);

    if (!longPosition || longAmount <= 0) {
      console.log('No open LONG position found');
      return;
    }

    const openAlgoOrders = await client.getOpenAlgoOrders({
      symbol,
      algoType: 'CONDITIONAL',
    });
    const sdkOrderIdPrefix = client.getOrderIdPrefix();
    const appOwnedLongStops = openAlgoOrders.filter(
      (order) =>
        order.orderType === 'STOP_MARKET' &&
        order.positionSide === 'LONG' &&
        order.side === 'SELL' &&
        order.clientAlgoId.startsWith(sdkOrderIdPrefix),
    );

    const stopLossOrder: FuturesNewAlgoOrderParams = {
      algoType: 'CONDITIONAL',
      symbol,
      side: 'SELL',
      positionSide: 'LONG',
      type: 'STOP_MARKET',
      closePosition: 'true',
      triggerPrice: (Number(longPosition.markPrice) * 0.99).toFixed(3),
      workingType: 'MARK_PRICE',
      priceProtect: 'TRUE',
    };

    if (appOwnedLongStops.length > 1) {
      throw new Error(
        'More than one SDK-prefixed LONG STOP_MARKET algo order found; refusing to choose automatically.',
      );
    }

    const existingStop = appOwnedLongStops[0];
    if (existingStop) {
      await client.cancelAlgoOrder({ algoId: existingStop.algoId });
    }

    const result = await client.submitNewAlgoOrder(stopLossOrder);
    console.log('SL modified sell result: ', result);
  } catch (e) {
    console.error('market sell failed: ', e);
  }
}

start();
