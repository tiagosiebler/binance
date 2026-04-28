import type { FuturesExchangeInfo } from '../src/types/futures';
import {
  getUSDMFuturesSymbolFilterMap,
  getUSDMFuturesSymbolFilters,
  normaliseUSDMFuturesSymbolFilters,
} from '../src/util/usdm';

const exchangeInfo = {
  symbols: [
    {
      symbol: 'BTCUSDT',
      pricePrecision: 2,
      quantityPrecision: 3,
      triggerProtect: '0.0500',
      filters: [
        {
          filterType: 'PRICE_FILTER',
          minPrice: '0.10',
          maxPrice: '1000000',
          tickSize: '0.10',
        },
        {
          filterType: 'LOT_SIZE',
          minQty: '0.001',
          maxQty: '1000',
          stepSize: '0.001',
        },
        {
          filterType: 'MARKET_LOT_SIZE',
          minQty: '0.001',
          maxQty: '2000',
          stepSize: '0.001',
        },
        {
          filterType: 'MIN_NOTIONAL',
          notional: '100',
        },
        {
          filterType: 'PERCENT_PRICE',
          multiplierUp: '1.1500',
          multiplierDown: '0.8500',
          multiplierDecimal: '4',
        },
        {
          filterType: 'MAX_NUM_ORDERS',
          limit: 200,
        },
        {
          filterType: 'MAX_NUM_ALGO_ORDERS',
          limit: 10,
        },
        {
          filterType: 'MAX_POSITION',
          maxPosition: '500',
        },
      ],
    },
  ],
} as unknown as FuturesExchangeInfo;

describe('USDM exchange info helpers', () => {
  it('normalises raw symbol filters into numeric fields', () => {
    const filters = normaliseUSDMFuturesSymbolFilters(
      exchangeInfo.symbols[0],
    );

    expect(filters).toStrictEqual({
      symbol: 'BTCUSDT',
      pricePrecision: 2,
      quantityPrecision: 3,
      triggerProtect: 0.05,
      price: {
        minPrice: 0.1,
        maxPrice: 1000000,
        tickSize: 0.1,
      },
      lotSize: {
        minQty: 0.001,
        maxQty: 1000,
        stepSize: 0.001,
      },
      marketLotSize: {
        minQty: 0.001,
        maxQty: 2000,
        stepSize: 0.001,
      },
      minNotional: {
        notional: 100,
      },
      percentPrice: {
        multiplierUp: 1.15,
        multiplierDown: 0.85,
        multiplierDecimal: 4,
      },
      maxOrders: {
        limit: 200,
      },
      maxAlgoOrders: {
        limit: 10,
      },
      maxPosition: {
        maxPosition: 500,
      },
    });
  });

  it('gets normalised filters for one symbol', () => {
    expect(getUSDMFuturesSymbolFilters(exchangeInfo, 'BTCUSDT')?.symbol).toBe(
      'BTCUSDT',
    );
    expect(getUSDMFuturesSymbolFilters(exchangeInfo, 'ETHUSDT')).toBeNull();
  });

  it('builds a normalised filter map keyed by symbol', () => {
    const filterMap = getUSDMFuturesSymbolFilterMap(exchangeInfo);

    expect(filterMap.BTCUSDT.minNotional?.notional).toBe(100);
    expect(filterMap.BTCUSDT.lotSize?.stepSize).toBe(0.001);
  });
});
