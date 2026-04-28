import {
  FuturesExchangeInfo,
  FuturesSymbolExchangeInfo,
  FuturesSymbolFilter,
  FuturesSymbolMinNotionalFilter,
} from '../../types/futures';

type USDMFuturesFilterByType<TFilterType extends FuturesSymbolFilter['filterType']> =
  Extract<FuturesSymbolFilter, { filterType: TFilterType }>;

export interface USDMFuturesNormalisedSymbolFilters {
  symbol: string;
  pricePrecision: number;
  quantityPrecision: number;
  triggerProtect: number;
  price?: {
    minPrice: number;
    maxPrice: number;
    tickSize: number;
  };
  lotSize?: {
    minQty: number;
    maxQty: number;
    stepSize: number;
  };
  marketLotSize?: {
    minQty: number;
    maxQty: number;
    stepSize: number;
  };
  minNotional?: {
    notional: number;
  };
  percentPrice?: {
    multiplierUp: number;
    multiplierDown: number;
    multiplierDecimal: number;
  };
  maxOrders?: {
    limit: number;
  };
  maxAlgoOrders?: {
    limit: number;
  };
  maxPosition?: {
    maxPosition: number;
  };
}

function numberValue(value: string | number): number {
  return Number(value);
}

function findUSDMFuturesSymbolFilter<
  TFilterType extends FuturesSymbolFilter['filterType'],
>(
  filters: FuturesSymbolFilter[],
  filterType: TFilterType,
): USDMFuturesFilterByType<TFilterType> | undefined {
  return filters.find((filter) => filter.filterType === filterType) as
    | USDMFuturesFilterByType<TFilterType>
    | undefined;
}

/** Normalise a USDM Futures symbol's raw exchange-info filters into numeric fields. */
export function normaliseUSDMFuturesSymbolFilters(
  symbolInfo: FuturesSymbolExchangeInfo,
): USDMFuturesNormalisedSymbolFilters {
  const priceFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'PRICE_FILTER',
  );
  const lotSizeFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'LOT_SIZE',
  );
  const marketLotSizeFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'MARKET_LOT_SIZE',
  );
  const minNotionalFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'MIN_NOTIONAL',
  );
  const percentPriceFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'PERCENT_PRICE',
  );
  const maxOrdersFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'MAX_NUM_ORDERS',
  );
  const maxAlgoOrdersFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'MAX_NUM_ALGO_ORDERS',
  );
  const maxPositionFilter = findUSDMFuturesSymbolFilter(
    symbolInfo.filters,
    'MAX_POSITION',
  );

  return {
    symbol: symbolInfo.symbol,
    pricePrecision: symbolInfo.pricePrecision,
    quantityPrecision: symbolInfo.quantityPrecision,
    triggerProtect: numberValue(symbolInfo.triggerProtect),
    price: priceFilter
      ? {
          minPrice: numberValue(priceFilter.minPrice),
          maxPrice: numberValue(priceFilter.maxPrice),
          tickSize: numberValue(priceFilter.tickSize),
        }
      : undefined,
    lotSize: lotSizeFilter
      ? {
          minQty: numberValue(lotSizeFilter.minQty),
          maxQty: numberValue(lotSizeFilter.maxQty),
          stepSize: numberValue(lotSizeFilter.stepSize),
        }
      : undefined,
    marketLotSize: marketLotSizeFilter
      ? {
          minQty: numberValue(marketLotSizeFilter.minQty),
          maxQty: numberValue(marketLotSizeFilter.maxQty),
          stepSize: numberValue(marketLotSizeFilter.stepSize),
        }
      : undefined,
    minNotional: minNotionalFilter
      ? {
          notional: numberValue(minNotionalFilter.notional),
        }
      : undefined,
    percentPrice: percentPriceFilter
      ? {
          multiplierUp: numberValue(percentPriceFilter.multiplierUp),
          multiplierDown: numberValue(percentPriceFilter.multiplierDown),
          multiplierDecimal: numberValue(percentPriceFilter.multiplierDecimal),
        }
      : undefined,
    maxOrders: maxOrdersFilter ? { limit: maxOrdersFilter.limit } : undefined,
    maxAlgoOrders: maxAlgoOrdersFilter
      ? { limit: maxAlgoOrdersFilter.limit }
      : undefined,
    maxPosition: maxPositionFilter
      ? { maxPosition: numberValue(maxPositionFilter.maxPosition) }
      : undefined,
  };
}

/** Get normalised USDM Futures filters for one symbol. */
export function getUSDMFuturesSymbolFilters(
  exchangeInfo: FuturesExchangeInfo,
  symbol: string,
): USDMFuturesNormalisedSymbolFilters | null {
  const specs = exchangeInfo.symbols.find((sym) => sym.symbol === symbol);
  if (!specs) {
    return null;
  }

  return normaliseUSDMFuturesSymbolFilters(specs);
}

/** Returns an object where keys are USDM Futures symbols and values are normalised filters for that symbol. */
export function getUSDMFuturesSymbolFilterMap(
  exchangeInfo: FuturesExchangeInfo,
): Record<string, USDMFuturesNormalisedSymbolFilters> {
  return exchangeInfo.symbols.reduce(
    (res, spec) => {
      res[spec.symbol] = normaliseUSDMFuturesSymbolFilters(spec);
      return res;
    },
    {} as Record<string, USDMFuturesNormalisedSymbolFilters>,
  );
}

/** Get min notional filter for a USDM futures symbol */
export function getUSDMFuturesSymbolMinNotional(
  exchangeInfo: FuturesExchangeInfo,
  symbol: string,
): number | null {
  const specs = exchangeInfo.symbols.find((sym) => sym.symbol === symbol);
  if (!specs) {
    return null;
  }

  const filterType = 'MIN_NOTIONAL';
  const filter = specs.filters.find(
    (filter) => filter.filterType === filterType,
  ) as FuturesSymbolMinNotionalFilter;

  if (!filter) {
    return null;
  }

  return Number(filter.notional);
}

/** Returns an object where keys are USDM Futures symbols and values are min notionals for that symbol */
export function getUSDMFuturesMinNotionalSymbolMap(
  exchangeInfo: FuturesExchangeInfo,
): Record<string, number> {
  const minNotionals = exchangeInfo.symbols.reduce((res, spec) => {
    const filter = spec.filters.find(
      (filter) => filter.filterType === 'MIN_NOTIONAL',
    ) as FuturesSymbolMinNotionalFilter;
    if (filter) {
      res[spec.symbol] = filter.notional;
    }
    return res;
  }, {});

  return minNotionals;
}
