import { WsFormattedMessage } from '../types/websockets/ws-events-formatted';
import { BEAUTIFIER_EVENT_MAP } from './beautifier-maps';

export interface BeautifierConfig {
  warnKeyMissingInMap: boolean;
}

export default class Beautifier {
  private beautificationMap: Record<string, Record<string, any>>;

  private floatKeys: string[];

  private floatKeysHashMap: Record<string, boolean>;

  private config: BeautifierConfig | undefined;

  constructor(config: BeautifierConfig) {
    this.config = config;
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
      'cmUnrealizedPNL',
      'cmWalletBalance',
      'commission',
      'commissionAmount',
      'crossMarginAsset',
      'crossMarginBorrowed',
      'crossMarginFree',
      'crossMarginInterest',
      'crossMarginLocked',
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
      'negativeBalance',
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
      'totalWalletBalance',
      'trailingStopActivationPrice',
      'trailingStopCallbackRate',
      'umUnrealizedPNL',
      'umWalletBalance',
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
    // console.log('beautify()', { key });
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
      const valueType = typeof data;
      const isPrimitive =
        valueType === 'string' ||
        valueType === 'number' ||
        valueType === 'boolean';

      // Nothing to warn for primitives
      if (this.config?.warnKeyMissingInMap && !isPrimitive) {
        console.log(
          `Beautifier(): event not found in map: key(..., "${key}")`,
          {
            valueType,
            data,
          },
        );
        process.exit(-1);
      }
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
    event: any,
    eventType?: string,
    isCombined?: boolean,
    eventMapSuffix?: string,
  ): WsFormattedMessage {
    const eventMapSuffixResolved = eventMapSuffix || '';
    if (event.data) {
      return this.beautifyWsMessage(
        event.data,
        eventType,
        isCombined,
        eventMapSuffixResolved,
      );
    }

    if (Array.isArray(event)) {
      return event.map((event) => {
        if (event.e) {
          return this.beautify(
            event,
            event.e + eventMapSuffixResolved + 'Event',
          );
        }
        return event;
      });
    }

    if (event.e) {
      return this.beautify(
        event,
        event.e + eventMapSuffixResolved + 'Event',
      ) as WsFormattedMessage;
    }

    if (isCombined && typeof event === 'object' && event !== null) {
      return this.beautify(
        event,
        eventType + eventMapSuffixResolved,
      ) as WsFormattedMessage;
    }

    return event;
  }
}
