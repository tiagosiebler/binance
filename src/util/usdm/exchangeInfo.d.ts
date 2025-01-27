import { FuturesExchangeInfo } from '../../types/futures';
export declare function getUSDMFuturesSymbolMinNotional(exchangeInfo: FuturesExchangeInfo, symbol: string): number | null;
export declare function getUSDMFuturesMinNotionalSymbolMap(exchangeInfo: FuturesExchangeInfo): Record<string, number>;
