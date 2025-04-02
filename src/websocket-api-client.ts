import { NewFuturesOrderParams } from './types/futures';
import { NewSpotOrderParams, OrderResponse } from './types/spot';
import { WSAPIResponse } from './types/websockets/ws-api';
import {
  FuturesOrderWSAPIResponse,
  WsAPISessionStatus,
} from './types/websockets/ws-api-responses';
import { WS_KEY_MAP, WSAPIWsKeyMain } from './util/websockets/websocket-util';
import { WebsocketClient } from './websocket-client';

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * Some methods support passing in a custom "wsKey". This is a reference to which WS connection should
 * be used to transmit that message. This is only useful if you wish to use an alternative wss
 * domain that is supported by the SDK.
 *
 * Note: To use testnet, don't set the wsKey - use `testnet: true` in
 * the constructor instead.
 *
 * Note: You can also directly use the sendWSAPIRequest() method to make WS API calls, but some
 * may find the below methods slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using sendWSAPIRequest() directly:
 * https://github.com/tiagosiebler/binance/blob/wsapi/examples/ws-api-promises.ts#L52-L61
 */
export class WebsocketAPIClient extends WebsocketClient {
  getSessionStatus(
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
  submitNewSpotOrder(
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
