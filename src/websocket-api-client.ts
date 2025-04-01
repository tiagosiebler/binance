import { NewFuturesOrderParams } from './types/futures';
import { NewSpotOrderParams, OrderResponse } from './types/spot';
import {
  Exact,
  WsAPIOperationResponseMap,
  WSAPIResponse,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
} from './types/websockets/ws-api';
import {
  FuturesOrderWSAPIResponse,
  WsAPISessionStatus,
} from './types/websockets/ws-api-responses';
import {
  WS_KEY_MAP,
  WSAPIWsKey,
  WSAPIWsKeyMain,
} from './util/websockets/websocket-util';
import { WebsocketClient } from './websocket-client';

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * You can directly use the sendWSAPIRequest method to make WS API calls, but some
 * may find this slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using this method directly:
 * https://github.com/tiagosiebler/binance/blob/wsapi/examples/ws-api-promises.ts#L52-L61
 */
export class WebsocketAPIClient extends WebsocketClient {
  async getSessionStatus(
    params?: undefined,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<WsAPISessionStatus>> {
    return this.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'session.status',
    );
  }

  /**
   * Submit a spot order
   */
  async submitNewSpotOrder(
    params: NewSpotOrderParams,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderResponse>> {
    return this.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.place',
      params,
    );
  }

  /**
   * Submit a futures order
   */
  async submitNewFuturesOrder(
    params: NewFuturesOrderParams,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.sendWSAPIRequest(WS_KEY_MAP.usdmWSAPI, 'order.place', params);
  }
}
