import WebSocket from 'isomorphic-ws';

export interface MessageEventLike {
  target: WebSocket;
  type: 'message';
  data: string;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}

export interface WSPublicTopicEventV5<TTopic extends string, TType, TData> {
  id?: string;
  topic: TTopic;
  type: TType;
  /** Cross sequence */
  cs?: number;
  /** Event timestamp */
  ts: number;
  data: TData;
  /**
   * matching engine timestamp (correlated with T from public trade channel)
   */
  cts: number;
  /**
   * Internal reference, can be used to determine if this is spot/linear/inverse/etc
   */
  // wsKey: WsKey;
}

export interface WSPrivateTopicEventV5<TTopic extends string, TData> {
  id?: string;
  topic: TTopic;
  creationTime: number;
  data: TData;
  // wsKey: WsKey;
}
