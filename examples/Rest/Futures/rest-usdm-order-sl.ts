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
    // Hedge Mode example: find each open hedge position and replace its SL.
    const positions = await client.getPositionsV3({ symbol });
    const hedgePositions = positions.filter((position) => {
      if (position.positionSide === 'LONG') {
        return Number(position.positionAmt) > 0;
      }
      if (position.positionSide === 'SHORT') {
        return Number(position.positionAmt) < 0;
      }
      return false;
    });

    if (!hedgePositions.length) {
      console.log('No open LONG or SHORT hedge position found');
      return;
    }

    const openAlgoOrders = await client.getOpenAlgoOrders({
      symbol,
      algoType: 'CONDITIONAL',
    });
    const sdkOrderIdPrefix = client.getOrderIdPrefix();

    for (const position of hedgePositions) {
      if (
        position.positionSide !== 'LONG' &&
        position.positionSide !== 'SHORT'
      ) {
        continue;
      }

      const positionSide = position.positionSide;
      const side = positionSide === 'LONG' ? 'SELL' : 'BUY';
      const triggerPriceMultiplier = positionSide === 'LONG' ? 0.99 : 1.01;
      const appOwnedStops = openAlgoOrders.filter(
        (order) =>
          order.orderType === 'STOP_MARKET' &&
          order.positionSide === positionSide &&
          order.side === side &&
          order.clientAlgoId.startsWith(sdkOrderIdPrefix),
      );

      const stopLossOrder: FuturesNewAlgoOrderParams = {
        algoType: 'CONDITIONAL',
        symbol,
        side,
        positionSide,
        type: 'STOP_MARKET',
        closePosition: 'true',
        triggerPrice: (
          Number(position.markPrice) * triggerPriceMultiplier
        ).toFixed(3),
        workingType: 'MARK_PRICE',
        priceProtect: 'TRUE',
      };

      if (appOwnedStops.length > 1) {
        throw new Error(
          `More than one SDK-prefixed ${positionSide} STOP_MARKET algo order found; refusing to choose automatically.`,
        );
      }

      const existingStop = appOwnedStops[0];
      if (existingStop) {
        await client.cancelAlgoOrder({ algoId: existingStop.algoId });
      }

      const result = await client.submitNewAlgoOrder(stopLossOrder);
      console.log(`SL modified ${positionSide} result: `, result);
    }
  } catch (e) {
    console.error('SL update failed: ', e);
  }
}

start();
