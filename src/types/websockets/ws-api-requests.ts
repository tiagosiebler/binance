/**
 * Simple request params with timestamp & recv window optional
 */
export type WSAPIRecvWindowTimestamp = {
  recvWindow?: number;
  timestamp?: number;
} | void;
