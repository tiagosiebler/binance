import { WsFormattedMessage } from '../types/websockets';
import { BEAUTIFIER_EVENT_MAP } from './beautifier-maps';

export default class Beautifier {
  private beautificationMap: Record<string, Record<string, any>>;
  private floatKeys: string[];
  private floatKeysHashMap: Record<string, boolean>;

  constructor() {
    this.floatKeys = [
      'accumulatedQuantity',
      'accumulatedRealisedPreFee',
      'asks',
      'asksNotional',
      'askPrice',
      'askQty',
      'availableBalance',
      'averagePrice',
      'balanceDelta',
      'balances',
      'balanceChange',
      'baseAssetVolume',
      'bestAskPrice',
      'bestAskQuantity',
      'bids',
      'bidsNotional',
      'bestBid',
      'bestBidQuantity',
      'bidPrice',
      'bidQty',
      'buyerCommission',
      'close',
      'closeQuantity',
      'closeTime',
      'commission',
      'commissionAmount',
      'crossWalletBalance',
      'currentClose',
      'cummulativeQuoteAssetTransactedQty',
      'entryPrice',
      'executedQty',
      'free',
      'freeze',
      'fundingRate',
      'high',
      'highPrice',
      'icebergQuantity',
      'icebergQty',
      'ignored',
      'income',
      'indexPrice',
      'ipoable',
      'ipoing',
      'isolatedMargin',
      'isolatedWallet',
      'isolatedWalletAmount',
      'lastFilledPrice',
      'lastFilledQuantity',
      'lastPrice',
      'lastTradeId',
      'lastTradePrice',
      'lastTradeQuantity',
      'lastQuoteAssetTransactedQty',
      'liquidationPrice',
      'locked',
      'low',
      'lowPrice',
      'maintenanceMarginRequired',
      'makerCommission',
      'markPrice',
      'maxNotionalValue',
      'maxPrice',
      'maxQty',
      'minNotional',
      'minPrice',
      'minQty',
      'multiplierDown',
      'multiplierUp',
      'multiplierDecimal',
      'newTraderRebateCommission',
      'notional',
      'oldTraderRebateCommission',
      'onOrderBalance',
      'open',
      'openPrice',
      'orderQuoteQty',
      'orderFilledAccumulatedQuantity',
      'originalPrice',
      'originalQuantity',
      'origQty',
      'positionAmount',
      'positionAmt',
      'previousClose',
      'prevClosePrice',
      'price',
      'priceChange',
      'priceChangePercent',
      'quantity',
      'qty',
      'quoteAssetVolume',
      'quoteVolume',
      'quoteVolumeActive',
      'realisedProfit',
      'sellerCommission',
      'settlePriceEstimate',
      'statisticsCloseTime',
      'statisticsOpenTime',
      'stepSize',
      'stopPrice',
      'storage',
      'takerBaseAssetVolume',
      'takerCommission',
      'takerQuoteAssetVolume',
      'tickSize',
      'totalRebateVol',
      'totalTrades',
      'totalTradeVol',
      'totalTradedBaseAssetVolume',
      'totalTradedQuoteAssetVolume',
      'trailingStopActivationPrice',
      'trailingStopCallbackRate',
      'unrealisedPnl',
      'unRealizedProfit',
      'volume',
      'volumeActive',
      'walletBalance',
      'weightedAveragePrice',
      'weightedAvgPrice',
      'withdrawFee',
      'withdrawMax',
      'withdrawMin',
      'withdrawIntegerMultiple',
      'withdrawing',
    ];

    // Map so we don't have to perform indexOf for each iteration
    this.floatKeysHashMap = {};
    this.floatKeys.forEach((keyName) => {
      this.floatKeysHashMap[keyName] = true;
    });

    this.beautificationMap = BEAUTIFIER_EVENT_MAP;
  }

  beautifyValueWithKey(key: string | number, val: unknown) {
    if (typeof val === 'string' && this.floatKeysHashMap[key] && val !== '') {
      const result = parseFloat(val);
      if (isNaN(result)) {
        return val;
      }
      return result;
    }
    return val;
  }

  /**
   * Beautify array or object, recurisvely
   */
  beautifyObjectValues(data: any | any[]) {
    if (Array.isArray(data)) {
      return this.beautifyArrayValues(data);
    }
    const beautifedObject = {};
    for (const [key, val] of Object.entries(data)) {
      const type = typeof val;
      if (Array.isArray(val)) {
        beautifedObject[key] = this.beautifyArrayValues(val, key);
      } else if (key === 'e' && type === 'string') {
        beautifedObject['eventType'] = this.beautifyValueWithKey(key, val);
      } else if (type === 'object') {
        beautifedObject[key] = this.beautifyObjectValues(val);
      } else {
        beautifedObject[key] = this.beautifyValueWithKey(key, val);
      }
    }
    return beautifedObject;
  }

  // TODO: if not matched return original object....
  beautifyArrayValues(data: any[], parentKey?: string | number) {
    const beautifedArray: any[] = [];
    for (const [key, val] of data.entries()) {
      const type = typeof val;
      if (Array.isArray(val)) {
        beautifedArray.push(this.beautifyArrayValues(val, parentKey || key));
      } else if (type === 'string' || type === 'number' || type === 'boolean') {
        beautifedArray.push(this.beautifyValueWithKey(parentKey || key, val));
      } else {
        beautifedArray.push(this.beautifyObjectValues(val));
      }
    }
    return beautifedArray;
  }

  beautify(data: any, key?: string | number) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      console.warn(
        `beautify(object, ${key}) is not valid key - beautification failed `,
        data,
        key,
      );
      return data;
    }
    const knownBeautification = this.beautificationMap[key];
    if (!knownBeautification) {
      // console.log(`beautify unknown key(..., "${key}")`);
      if (Array.isArray(data)) {
        return this.beautifyArrayValues(data);
      }
      if (typeof data === 'object' && data !== null) {
        return this.beautifyObjectValues(data);
      }
      return this.beautifyValueWithKey(key, data);
    }

    const newItem = {};
    for (const key in data) {
      const value = data[key];
      const valueType = typeof value;

      let newKey = knownBeautification[key] || key;
      if (Array.isArray(newKey)) {
        newKey = newKey[0];
      }

      if (!Array.isArray(value)) {
        if (valueType === 'object' && value !== null) {
          newItem[newKey] = this.beautify(value, knownBeautification[key]);
        } else {
          newItem[newKey] = this.beautifyValueWithKey(newKey, value);
        }
        continue;
      }

      const newArray: any[] = [];
      if (Array.isArray(this.beautificationMap[newKey])) {
        for (const elementValue of value) {
          const mappedBeautification =
            this.beautificationMap[knownBeautification[key]];
          const childMapping = mappedBeautification[0];

          if (typeof childMapping === 'object' && childMapping !== null) {
            const mappedResult = {};
            for (const childElementKey in elementValue) {
              const newKey = childMapping[childElementKey] || childElementKey;
              mappedResult[newKey] = this.beautify(
                elementValue[childElementKey],
                newKey,
              );
            }
            newArray.push(mappedResult);
            continue;
          }

          newArray.push(this.beautify(elementValue, childMapping));
        }
      }
      newItem[newKey] = newArray;
    }
    return newItem;
  }

  /**
   * Entry point to beautify WS message. EventType is determined automatically unless this is a combined stream event.
   */
  beautifyWsMessage(
    data: any,
    eventType?: string,
    isCombined?: boolean,
  ): WsFormattedMessage {
    if (Array.isArray(data)) {
      return data.map((event) => {
        if (event.e) {
          return this.beautify(event, event.e + 'Event');
        }
        return event;
      });
    } else if (data.e) {
      return this.beautify(data, data.e + 'Event') as WsFormattedMessage;
    } else if (isCombined && typeof data === 'object' && data !== null) {
      return this.beautify(data, eventType) as WsFormattedMessage;
    }
    return data;
  }
}
