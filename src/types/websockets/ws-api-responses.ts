export interface WsAPISessionStatus {
  apiKey: string;
  authorizedSince: number;
  connectedSince: number;
  returnRateLimits: boolean;
  serverTime: number;
  userDataStream: boolean;
}
