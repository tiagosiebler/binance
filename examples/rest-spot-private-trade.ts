import { NewSpotOrderParams, OrderResponseFull, MainClient, SymbolPrice } from '../src/index';

// or
// import { MainClient } from 'binance';

const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = new MainClient({
  api_key: key,
  api_secret: secret,
  beautifyResponses: true,
});

const entryAmountPercent = 50;// trigger trade with 50%
const symbol = 'BTCUSDT';
const assetDecimalPlaces = 4;// get this from exchange info, it varies per asset

// method to trim down to decimal.
function trimToDecimalPlaces(number: number, precision: number): number {
  const array: any[] = number.toString().split('.');
  array.push(array.pop().substring(0, precision));
  const trimmedstr = array.join('.');
  return parseFloat(trimmedstr);
}

/**
 * This is a very silly demonstration on placing market orders using various parts of the module.
 * By default it will use 50% of your available USDT balance to buy BTC and sell it again.
 */

(async () => {
  try {
    /**
     * Get available balance
     */
    const balance = await client.getBalances();

    const usdtBal = balance.find(assetBal => assetBal.coin === 'USDT');
    // console.log('USDT balance object: ', usdtBal);

    const usdtAvailable = usdtBal?.free;

    if (!usdtBal || !usdtAvailable) {
      return console.error('Error: funds to trade from USDT');
    }

    const buyAmountValue = Number(usdtAvailable) * (50 / 100);
    console.log(`Executing trade with ${entryAmountPercent}% of ${usdtAvailable} USDT = ${buyAmountValue} USDT value`);

    /**
     * Get last asset price
     */
    const btcTicker = await client.getSymbolPriceTicker({ symbol: symbol }) as SymbolPrice;
    const lastPrice = btcTicker?.price;
    if (!lastPrice) {
      return console.error('Error: no price returned');
    }

    /**
     * Calculate and submit buy amount
     */
    const buyAmountBtc = +(buyAmountValue / Number(lastPrice)).toFixed(assetDecimalPlaces);
    console.log(`Last ${symbol} price: ${lastPrice} => will buy ${buyAmountBtc} ${symbol}`);

    const buyOrderRequest: NewSpotOrderParams = {
      symbol: symbol,
      quantity: buyAmountBtc,
      side: 'BUY',
      type: 'MARKET',
      /**
       * ACK = confirmation of order acceptance (no placement/fill information) -> OrderResponseACK
       * RESULT = fill state -> OrderResponseResult
       * FULL = fill state + detail on fills and other detail -> OrderResponseFull
       */
      newOrderRespType: 'FULL'
    };

    console.log(`Submitting buy order: `, buyOrderRequest)
    await client.testNewOrder(buyOrderRequest);
    const buyOrderResult = await client.submitNewOrder(buyOrderRequest) as OrderResponseFull;
    console.log(`Order result: `, JSON.stringify({ request: buyOrderRequest, response: buyOrderResult }, null, 2));

    /**
     * Process bought fills and submit sell amount
     */
    const assetAmountBought = buyOrderResult.executedQty;
    const assetFillsMinusFees = buyOrderResult.fills.reduce(
      (sum, fill) => sum + Number(fill.qty) - (fill.commissionAsset !== 'BNB' ? Number(fill.commission) : 0), 0
    );
    console.log(`Filled buy ${symbol} ${assetAmountBought} : bought minus fees ${assetFillsMinusFees}`);

    const sellOrderRequest: NewSpotOrderParams = {
      symbol: symbol,
      quantity: trimToDecimalPlaces(assetFillsMinusFees, assetDecimalPlaces),
      side: 'SELL',
      type: 'MARKET',
      newOrderRespType: 'FULL'
    };

    console.log(`Submitting sell order: `, sellOrderRequest)
    await client.testNewOrder(sellOrderRequest);
    const sellOrderResult = await client.submitNewOrder(sellOrderRequest) as OrderResponseFull;
    console.log(`Order result: `, JSON.stringify({ request: sellOrderRequest, response: sellOrderResult }, null, 2));

    console.log(`All ${symbol} should have been sold!`);


  } catch (e) {
    console.error('Error: request failed: ', e);
  }

  process.exit(1);
})();
