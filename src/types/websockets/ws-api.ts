import { WS_KEY_MAP, WsKey } from '../../util/websockets/websocket-util';

export type WSAPIOperation = any; //'order.create' | 'order.amend' | 'order.cancel';

export type WsOperation =
  | 'SUBSCRIBE'
  | 'UNSUBSCRIBE'
  | 'LIST_SUBSCRIPTIONS'
  | 'SET_PROPERTY'
  | 'GET_PROPERTY';

export const WS_API_Operations: WSAPIOperation[] = [
  // 'order.create',
  // 'order.amend',
  // 'order.cancel',
];

export interface WsRequestOperationBinance<TWSTopic extends string> {
  method: WsOperation;
  params?: (TWSTopic | string | number)[];
  id: number;
}

export interface WSAPIRequest<
  TRequestParams = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TWSOperation extends WSAPIOperation = any,
> {
  reqId: string;
  op: TWSOperation;
  header: {
    'X-BAPI-TIMESTAMP': string;
    'X-BAPI-RECV-WINDOW': string;
  };
  args: [TRequestParams];
}

export interface WSAPIResponse<
  TResponseData extends object = object,
  TOperation extends WSAPIOperation = WSAPIOperation,
> {
  wsKey: WsKey;
  /** Auto-generated */
  reqId: string;
  retCode: 0 | number;
  retMsg: 'OK' | string;
  op: TOperation;
  data: TResponseData;
  header?: {
    'X-Bapi-Limit': string;
    'X-Bapi-Limit-Status': string;
    'X-Bapi-Limit-Reset-Timestamp': string;
    Traceid: string;
    Timenow: string;
  };
  connId: string;
}

export type Exact<T> = {
  // This part says: if there's any key that's not in T, it's an error
  [K: string]: never;
} & {
  [K in keyof T]: T[K];
};

/**
 * List of operations supported for this WsKey (connection)
 */
export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.main]: WsOperation;
  [WS_KEY_MAP.main2]: WsOperation;
  [WS_KEY_MAP.main3]: WsOperation;

  [WS_KEY_MAP.mainTestnetPublic]: WsOperation;
  [WS_KEY_MAP.mainTestnetUserData]: WsOperation;

  [WS_KEY_MAP.marginRiskUserData]: WsOperation;
  [WS_KEY_MAP.usdm]: WsOperation;
  [WS_KEY_MAP.usdmTestnet]: WsOperation;

  [WS_KEY_MAP.coinm]: WsOperation;
  [WS_KEY_MAP.coinm2]: WsOperation;
  [WS_KEY_MAP.coinmTestnet]: WsOperation;
  [WS_KEY_MAP.eoptions]: WsOperation;
  [WS_KEY_MAP.portfolioMarginUserData]: WsOperation;
  [WS_KEY_MAP.portfolioMarginProUserData]: WsOperation;

  [WS_KEY_MAP.mainWSAPI]: WSAPIOperation;
  [WS_KEY_MAP.mainWSAPI2]: WSAPIOperation;
  [WS_KEY_MAP.mainWSAPITestnet]: WSAPIOperation;

  [WS_KEY_MAP.usdmWSAPI]: WSAPIOperation;
  [WS_KEY_MAP.usdmWSAPITestnet]: WSAPIOperation;
}

/**
 * Request parameters expected per operation
 */
export interface WsAPITopicRequestParamMap {
  SUBSCRIBE: never;
  UNSUBSCRIBE: never;
  LIST_SUBSCRIPTIONS: never;
  SET_PROPERTY: never;
  GET_PROPERTY: never;
}

/**
 * Response structure expected for each operation
 */
export interface WsAPIOperationResponseMap {
  [key: string]: never;

  // 'order.create': WSAPIResponse<never, 'order.create'>;
  // ping: {
  //   retCode: 0 | number;
  //   retMsg: 'OK' | string;
  //   op: 'pong';
  //   data: [string];
  //   connId: string;
  // };
}
