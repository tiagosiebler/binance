import {
  FuturesExchangeInfo,
  FuturesSymbolMinNotionalFilter,
} from '../../types/futures';

/** Get min notional filter for a USDM futures symbol */
export function getUSDMFuturesSymbolMinNotional(
  exchangeInfo: FuturesExchangeInfo,
  symbol: string
): number | null {
  const specs = exchangeInfo.symbols.find((sym) => sym.symbol === symbol);
  if (!specs) {
    return null;
  }

  const filterType = 'MIN_NOTIONAL';
  const filter = specs.filters.find(
    (filter) => filter.filterType === filterType
  ) as FuturesSymbolMinNotionalFilter;

  if (!filter) {
    return null;
  }

  return Number(filter.notional);
}

/** Returns an object where keys are USDM Futures symbols and values are min notionals for that symbol */
export function getUSDMFuturesMinNotionalSymbolMap(
  exchangeInfo: FuturesExchangeInfo
): Record<string, number> {
  const minNotionals = exchangeInfo.symbols.reduce((res, spec) => {
    const filter = spec.filters.find(
      (filter) => filter.filterType === 'MIN_NOTIONAL'
    ) as FuturesSymbolMinNotionalFilter;
    if (filter) {
      res[spec.symbol] = filter.notional;
    }
    return res;
  }, {});

  return minNotionals;
}
