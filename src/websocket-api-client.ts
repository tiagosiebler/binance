import { NewFuturesOrderParams } from './types/futures';
import { NewSpotOrderParams, OrderResponse } from './types/spot';
import { WSAPIResponse, WsAPIWsKeyTopicMap } from './types/websockets/ws-api';
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
    const WS_API_WS_KEY: WSAPIWsKey = wsKey || WS_KEY_MAP.mainWSAPI;
    const WS_API_OPERATION: WsAPIWsKeyTopicMap[typeof WS_API_WS_KEY] =
      'session.status';

    try {
      const wsAPIResponse = await this.sendWSAPIRequest(
        WS_API_WS_KEY,
        WS_API_OPERATION,
      );

      return wsAPIResponse;
    } catch (e) {
      e.request = undefined;
      e.wsKey = WS_API_WS_KEY;
      e.operation = WS_API_OPERATION;
      throw e;
    }
  }

  /**
   * Submit a spot order
   */
  async submitNewSpotOrder(
    params: NewSpotOrderParams,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderResponse>> {
    const WS_API_WS_KEY: WSAPIWsKey = wsKey || WS_KEY_MAP.mainWSAPI;
    const WS_API_OPERATION: WsAPIWsKeyTopicMap[typeof WS_API_WS_KEY] =
      'order.place';

    try {
      const wsAPIResponse = await this.sendWSAPIRequest(
        WS_API_WS_KEY,
        WS_API_OPERATION,
        params,
      );

      return wsAPIResponse as WSAPIResponse<OrderResponse>;
    } catch (e) {
      e.request = params;
      e.wsKey = WS_API_WS_KEY;
      e.operation = WS_API_OPERATION;
      throw e;
    }
  }

  /**
   * Submit a futures order
   */
  async submitNewFuturesOrder(
    params: NewFuturesOrderParams,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    const WS_API_WS_KEY: WSAPIWsKey = wsKey || WS_KEY_MAP.usdmWSAPI;
    const WS_API_OPERATION: WsAPIWsKeyTopicMap[typeof WS_API_WS_KEY] =
      'order.place';

    try {
      const wsAPIResponse = await this.sendWSAPIRequest(
        WS_API_WS_KEY,
        WS_API_OPERATION,
        params,
      );

      return wsAPIResponse as WSAPIResponse<FuturesOrderWSAPIResponse>;
    } catch (e) {
      e.request = params;
      e.wsKey = WS_API_WS_KEY;
      e.operation = WS_API_OPERATION;
      throw e;
    }
  }
}
