import {
  FuturesContractType,
  FuturesSymbolOrderBookTicker,
  OpenInterest,
  PositionSide,
} from './futures';
import {
  numberInString,
  OrderSide,
  SymbolFromPaginatedRequestFromId,
} from './shared';

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

export interface CoinMOpenInterest extends OpenInterest {
  pair: string;
  contractType: FuturesContractType;
}
export type SymbolOrPair =
  | { pair: string; symbol?: never }
  | { pair?: never; symbol: string };

export interface CoinMSymbolOrderBookTicker
  extends FuturesSymbolOrderBookTicker {
  pair: string;
}

export interface CoinMAccountTradeParamsWithPair
  extends Partial<SymbolFromPaginatedRequestFromId> {
  pair: string;
  symbol?: never;
  fromId?: never;
}

export interface CoinMAccountTradeParamsWithSymbol
  extends Partial<SymbolFromPaginatedRequestFromId> {
  symbol: string;
  pair?: never;
}

export type CoinMAccountTradeParams =
  | CoinMAccountTradeParamsWithSymbol
  | CoinMAccountTradeParamsWithPair;

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
