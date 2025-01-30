import { WS_KEY_MAP } from '../../util/websockets/websocket-util';
import { WsKey } from './ws-general';

export type WSAPIOperation = 'order.create' | 'order.amend' | 'order.cancel';

export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'auth'
  | 'ping'
  | 'pong';

export const WS_API_Operations: WSAPIOperation[] = [
  'order.create',
  'order.amend',
  'order.cancel',
];

export interface WsRequestOperationBybit<TWSTopic extends string> {
  req_id: string;
  op: WsOperation;
  args?: (TWSTopic | string | number)[];
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
    // Referer: typeof APIID;
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
  [WS_KEY_MAP.v5PrivateTrade]: WSAPIOperation;
}

/**
 * Request parameters expected per operation
 */
export interface WsAPITopicRequestParamMap {
  'order.create': never;
}

/**
 * Response structure expected for each operation
 */
export interface WsAPIOperationResponseMap {
  'order.create': WSAPIResponse<never, 'order.create'>;
  ping: {
    retCode: 0 | number;
    retMsg: 'OK' | string;
    op: 'pong';
    data: [string];
    connId: string;
  };
}
