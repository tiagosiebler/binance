import { FuturesContractType, PositionSide } from './futures';
import { numberInString, OrderSide } from './shared';

export interface PositionRisk {
  symbol: string;
  positionAmt: numberInString;
  entryPrice: numberInString;
  markPrice: numberInString;
  unRealizedProfit: numberInString;
  liquidationPrice: numberInString;
  leverage: numberInString;
  maxQty: numberInString;
  marginType: string;
  isolatedMargin: numberInString;
  isAutoAddMargin: boolean;
  positionSide: PositionSide;
  updateTime: number;
}

export interface CoinMOpenInterest {
  symbol: string;
  pair: string;
  openInterest: numberInString;
  contractType: FuturesContractType;
  time: number;
}
export type SymbolOrPair =
  | { pair: string; symbol?: never }
  | { pair?: never; symbol: string };

export interface CoinMSymbolOrderBookTicker {
  symbol: string;
  pair: string;
  bidPrice: numberInString;
  bidQty: numberInString;
  askPrice: numberInString;
  askQty: numberInString;
  time: number;
}

export interface CoinMPaginatedRequest {
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface CoinMAccountTradeParamsWithPair extends CoinMPaginatedRequest {
  pair: string;
  symbol?: never;
  fromId?: never;
}

export interface CoinMAccountTradeParamsWithSymbol
  extends CoinMPaginatedRequest {
  symbol: string;
  pair?: never;
}

export interface CoinMAccountTradeParamsWithFromId
  extends CoinMPaginatedRequest {
  fromId: number;
  startTime?: never;
  endTime?: never;
}

export type CoinMAccountTradeParams =
  | CoinMAccountTradeParamsWithSymbol
  | CoinMAccountTradeParamsWithPair
  | CoinMAccountTradeParamsWithFromId;

export interface CoinMPositionTrade {
  symbol: string;
  id: number;
  orderId: number;
  pair: string;
  side: OrderSide;
  price: numberInString;
  qty: numberInString;
  realizedPnl: numberInString;
  marginAsset: string;
  baseQty: numberInString;
  commission: numberInString;
  commissionAsset: string;
  time: number;
  positionSide: PositionSide;
  buyer: boolean;
  maker: boolean;
}
