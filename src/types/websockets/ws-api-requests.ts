/**
 * Simple request params with timestamp & recv window optional
 */
export type WSAPIRecvWindowTimestamp = {
  recvWindow?: number;
  timestamp?: number;
} | void;

/**
 * Authentication request types
 */
export interface SessionLogonWSAPIRequest {
  apiKey: string;
  signature: string;
  timestamp: number;
}

/**
 * General request types
 */
export interface ExchangeInfoWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  permissions?: string[];
  showPermissionSets?: boolean;
  symbolStatus?: string;
}

/**
 * Market data request types
 */
export interface DepthWSAPIRequest {
  symbol: string;
  limit: number;
}

export interface TradesRecentWSAPIRequest {
  symbol: string;
  limit?: number;
}

export interface TradesHistoricalWSAPIRequest {
  symbol: string;
  fromId?: number;
  limit?: number;
}

export interface TradesAggregateWSAPIRequest {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface KlinesWSAPIRequest {
  symbol: string;
  interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface UIKlinesWSAPIRequest {
  symbol: string;
  interval: string; // '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|'3d'|'1w'|'1M'
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
}

export interface AvgPriceWSAPIRequest {
  symbol: string;
}

export interface Ticker24hrWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  type?: 'FULL' | 'MINI';
}

export interface TickerTradingDayWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  timeZone?: string;
  type?: 'FULL' | 'MINI';
}

export interface TickerWSAPIRequest {
  symbol?: string;
  symbols?: string[];
  windowSize?: string; // '1m', '2m' ... '59m', '1h', '2h' ... '23h', '1d', '2d' ... '7d'
  type?: 'FULL' | 'MINI';
}

export interface TickerPriceWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

export interface TickerBookWSAPIRequest {
  symbol?: string;
  symbols?: string[];
}

/**
 * Account request types - Spot
 */
export interface AccountStatusWSAPIRequest {
  omitZeroBalances?: boolean;
}

export interface AccountCommissionWSAPIRequest {
  symbol: string;
}

export interface AllOrdersWSAPIRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface AllOrderListsWSAPIRequest {
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface MyTradesWSAPIRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface MyPreventedMatchesWSAPIRequest {
  symbol: string;
  preventedMatchId?: number;
  orderId?: number;
  fromPreventedMatchId?: number;
  limit?: number;
}

export interface MyAllocationsWSAPIRequest {
  symbol: string;
  startTime?: number;
  endTime?: number;
  fromAllocationId?: number;
  limit?: number;
  orderId?: number;
}
