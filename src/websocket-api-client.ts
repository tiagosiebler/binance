import { NewFuturesOrderParams } from './types/futures';
import { ExchangeInfo, NewSpotOrderParams, OrderResponse } from './types/spot';
import {
  WSAPIResponse,
  WSAPIUserDataListenKeyRequest,
} from './types/websockets/ws-api';
import {
  AccountCommissionWSAPIRequest,
  AccountStatusWSAPIRequest,
  AllOrderListsWSAPIRequest,
  AllOrdersWSAPIRequest,
  AvgPriceWSAPIRequest,
  DepthWSAPIRequest,
  ExchangeInfoWSAPIRequest,
  FuturesDepthWSAPIRequest,
  FuturesOrderCancelWSAPIRequest,
  FuturesOrderModifyWSAPIRequest,
  FuturesOrderStatusWSAPIRequest,
  FuturesPositionV2WSAPIRequest,
  FuturesPositionWSAPIRequest,
  FuturesTickerBookWSAPIRequest,
  FuturesTickerPriceWSAPIRequest,
  KlinesWSAPIRequest,
  MyAllocationsWSAPIRequest,
  MyPreventedMatchesWSAPIRequest,
  MyTradesWSAPIRequest,
  OpenOrdersCancelAllWSAPIRequest,
  OpenOrdersStatusWSAPIRequest,
  OrderCancelReplaceWSAPIRequest,
  OrderCancelWSAPIRequest,
  OrderListCancelWSAPIRequest,
  OrderListPlaceOCOWSAPIRequest,
  OrderListPlaceOTOCOWSAPIRequest,
  OrderListPlaceOTOWSAPIRequest,
  OrderListPlaceWSAPIRequest,
  OrderListStatusWSAPIRequest,
  OrderStatusWSAPIRequest,
  OrderTestWSAPIRequest,
  SOROrderPlaceWSAPIRequest,
  SOROrderTestWSAPIRequest,
  Ticker24hrWSAPIRequest,
  TickerBookWSAPIRequest,
  TickerPriceWSAPIRequest,
  TickerTradingDayWSAPIRequest,
  TickerWSAPIRequest,
  TradesAggregateWSAPIRequest,
  TradesHistoricalWSAPIRequest,
  TradesRecentWSAPIRequest,
  WSAPIRecvWindowTimestamp,
} from './types/websockets/ws-api-requests';
import {
  AccountCommissionWSAPIResponse,
  AccountStatusWSAPIResponse,
  AggregateTradeWSAPIResponse,
  AllocationWSAPIResponse,
  AvgPriceWSAPIResponse,
  DepthWSAPIResponse,
  FuturesAccountBalanceItemWSAPIResponse,
  FuturesAccountStatusWSAPIResponse,
  FuturesDepthWSAPIResponse,
  FuturesOrderWSAPIResponse,
  FuturesPositionV2WSAPIResponse,
  FuturesPositionWSAPIResponse,
  FuturesTickerBookWSAPIResponse,
  FuturesTickerPriceWSAPIResponse,
  KlineWSAPIResponse,
  OrderCancelReplaceWSAPIResponse,
  OrderCancelWSAPIResponse,
  OrderListCancelWSAPIResponse,
  OrderListPlaceWSAPIResponse,
  OrderListStatusWSAPIResponse,
  OrderTestWithCommissionWSAPIResponse,
  OrderTestWSAPIResponse,
  OrderWSAPIResponse,
  PreventedMatchWSAPIResponse,
  RateLimitWSAPIResponse,
  SOROrderPlaceWSAPIResponse,
  SOROrderTestWithCommissionWSAPIResponse,
  SOROrderTestWSAPIResponse,
  TickerBookWSAPIResponse,
  TickerFullWSAPIResponse,
  TickerMiniWSAPIResponse,
  TickerPriceWSAPIResponse,
  TimeWSAPIResponse,
  TradeWSAPIResponse,
  WsAPISessionStatus,
} from './types/websockets/ws-api-responses';
import { WSClientConfigurableOptions } from './types/websockets/ws-general';
import { DefaultLogger } from './util/logger';
import { isWSAPIWsKey } from './util/typeGuards';
import {
  getTestnetWsKey,
  WS_KEY_MAP,
  WS_LOGGER_CATEGORY,
  WSAPIWsKey,
  WSAPIWsKeyFutures,
  WSAPIWsKeyMain,
  WsKey,
} from './util/websockets/websocket-util';
import { WebsocketClient } from './websocket-client';

function getFuturesMarketWsKey(market: 'usdm' | 'coinm'): WSAPIWsKeyFutures {
  if (market === 'usdm') {
    return WS_KEY_MAP.usdmWSAPI;
  }
  return WS_KEY_MAP.coinmWSAPI;
}

/**
 * Configurable options specific to only the REST-like WebsocketAPIClient
 */
export interface WSAPIClientConfigurableOptions {
  /**
   * Default: true
   *
   * If requestSubscribeUserDataStream() was used, automatically resubscribe if reconnected
   */
  resubscribeUserDataStreamAfterReconnect: boolean;
  /**
   * Default: 2 seconds
   *
   * Delay automatic userdata resubscribe by x seconds.
   */
  resubscribeUserDataStreamDelaySeconds: number;

  /**
   * Default: true
   *
   * Attach default event listeners, which will console log any high level
   * events (opened/reconnecting/reconnected/etc).
   *
   * If you disable this, you should set your own event listeners
   * on the embedded WS Client `wsApiClient.getWSClient().on(....)`.
   */
  attachEventListeners: boolean;
}

/**
 * Used to track that a connection had an active user data stream before it disconnected.
 *
 * Note: This is not the same as the "listenKey" WS API workflow (the listenKey workflow is deprecated).
 *
 * This does not return a listen key. This also does not require a regular "ping" on the listen key.
 */
interface ActiveUserDataStreamState {
  subscribedAt: Date;
  subscribeAttempt: number;
  respawnTimeout?: ReturnType<typeof setTimeout>;
}

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
export class WebsocketAPIClient {
  /**
   * Minimal state store around automating sticky "userDataStream.subscribe" sessions
   */
  private subscribedUserDataStreamState: Record<
    WSAPIWsKey | string,
    ActiveUserDataStreamState | undefined
  > = {};

  private wsClient: WebsocketClient;

  private logger: DefaultLogger;

  private options: WSClientConfigurableOptions & WSAPIClientConfigurableOptions;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: DefaultLogger,
  ) {
    this.wsClient = new WebsocketClient(options, logger);

    this.options = {
      resubscribeUserDataStreamAfterReconnect: true,
      resubscribeUserDataStreamDelaySeconds: 2,
      attachEventListeners: true,
      ...options,
    };

    this.logger = this.wsClient.logger;

    this.setupDefaultEventListeners();

    this.wsClient.on('reconnected', ({ wsKey }) => {
      this.handleWSReconnectedEvent({ wsKey });
    });
  }

  public getWSClient(): WebsocketClient {
    return this.wsClient;
  }

  public setTimeOffsetMs(newOffset: number): void {
    return this.getWSClient().setTimeOffsetMs(newOffset);
  }

  /*
   *
   * SPOT - General requests
   *
   */

  /**
   * Test connectivity to the WebSocket API
   */
  testSpotConnectivity(wsKey?: WSAPIWsKeyMain): Promise<WSAPIResponse<object>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ping',
    );
  }

  /**
   * Test connectivity to the WebSocket API and get the current server time
   */
  getSpotServerTime(
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<TimeWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'time',
    );
  }

  /**
   * Query current exchange trading rules, rate limits, and symbol information
   */
  getSpotExchangeInfo(
    params?: ExchangeInfoWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<ExchangeInfo>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'exchangeInfo',
      params,
    );
  }

  getSpotSessionStatus(
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<WsAPISessionStatus>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'session.status',
    );
  }

  /*
   *
   * SPOT - Market data requests
   *
   */

  /**
   * Get current order book
   * Note: If you need to continuously monitor order book updates, consider using WebSocket Streams
   */
  getSpotOrderBook(
    params: DepthWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<DepthWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'depth',
      params,
    );
  }

  /**
   * Get recent trades
   * Note: If you need access to real-time trading activity, consider using WebSocket Streams
   */
  getSpotRecentTrades(
    params: TradesRecentWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<TradeWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'trades.recent',
      params,
    );
  }

  /**
   * Get historical trades
   * Note: If fromId is not specified, the most recent trades are returned
   */
  getSpotHistoricalTrades(
    params: TradesHistoricalWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<TradeWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'trades.historical',
      params,
    );
  }

  /**
   * Get aggregate trades
   * Note: An aggregate trade represents one or more individual trades that fill at the same time
   */
  getSpotAggregateTrades(
    params: TradesAggregateWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<AggregateTradeWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'trades.aggregate',
      params,
    );
  }

  /**
   * Get klines (candlestick bars)
   * Note: If you need access to real-time kline updates, consider using WebSocket Streams
   */
  getSpotKlines(
    params: KlinesWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<KlineWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'klines',
      params,
    );
  }

  /**
   * Get klines (candlestick bars) optimized for presentation
   * Note: This request is similar to klines, having the same parameters and response
   */
  getSpotUIKlines(
    params: KlinesWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<KlineWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'uiKlines',
      params,
    );
  }

  /**
   * Get current average price for a symbol
   */
  getSpotAveragePrice(
    params: AvgPriceWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<AvgPriceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'avgPrice',
      params,
    );
  }

  /**
   * Get 24-hour rolling window price change statistics
   * Note: If you need to continuously monitor trading statistics, consider using WebSocket Streams
   */
  getSpot24hrTicker(
    params?: Ticker24hrWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<
      | TickerFullWSAPIResponse
      | TickerMiniWSAPIResponse
      | TickerFullWSAPIResponse[]
      | TickerMiniWSAPIResponse[]
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ticker.24hr',
      params,
    );
  }

  /**
   * Get price change statistics for a trading day
   */
  getSpotTradingDayTicker(
    params: TickerTradingDayWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<
      | TickerFullWSAPIResponse
      | TickerMiniWSAPIResponse
      | TickerFullWSAPIResponse[]
      | TickerMiniWSAPIResponse[]
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ticker.tradingDay',
      params,
    );
  }

  /**
   * Get rolling window price change statistics with a custom window
   * Note: Window size precision is limited to 1 minute
   */
  getSpotTicker(
    params: TickerWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<
      | TickerFullWSAPIResponse
      | TickerMiniWSAPIResponse
      | TickerFullWSAPIResponse[]
      | TickerMiniWSAPIResponse[]
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ticker',
      params,
    );
  }

  /**
   * Get the latest market price for a symbol
   * Note: If you need access to real-time price updates, consider using WebSocket Streams
   */
  getSpotSymbolPriceTicker(
    params?: TickerPriceWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<TickerPriceWSAPIResponse | TickerPriceWSAPIResponse[]>
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ticker.price',
      params,
    );
  }

  /**
   * Get the current best price and quantity on the order book
   * Note: If you need access to real-time order book ticker updates, consider using WebSocket Streams
   */
  getSpotSymbolOrderBookTicker(
    params?: TickerBookWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<TickerBookWSAPIResponse | TickerBookWSAPIResponse[]>
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'ticker.book',
      params,
    );
  }

  /*
   *
   * SPOT - Trading requests
   *
   */

  /**
   * Submit a spot order
   */
  submitNewSpotOrder(
    params: NewSpotOrderParams,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.place',
      params,
    );
  }

  /**
   * Test order placement
   * Note: Validates new order parameters and verifies your signature but does not send the order into the matching engine
   */
  testSpotOrder(
    params: OrderTestWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<OrderTestWSAPIResponse | OrderTestWithCommissionWSAPIResponse>
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.test',
      params,
    );
  }

  /**
   * Check execution status of an order
   * Note: If both orderId and origClientOrderId parameters are specified, only orderId is used
   */
  getSpotOrderStatus(
    params: OrderStatusWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.status',
      params,
    );
  }

  /**
   * Cancel an active order
   * Note: If both orderId and origClientOrderId parameters are specified, only orderId is used
   */
  cancelSpotOrder(
    params: OrderCancelWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderCancelWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.cancel',
      params,
    );
  }

  /**
   * Cancel an existing order and immediately place a new order
   * Note: If both cancelOrderId and cancelOrigClientOrderId parameters are specified, only cancelOrderId is used
   */
  cancelReplaceSpotOrder(
    params: OrderCancelReplaceWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderCancelReplaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'order.cancelReplace',
      params,
    );
  }

  /**
   * Query execution status of all open orders
   * Note: If you need to continuously monitor order status updates, consider using WebSocket Streams
   */
  getSpotOpenOrders(
    params: OpenOrdersStatusWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'openOrders.status',
      params,
    );
  }

  /**
   * Cancel all open orders on a symbol
   * Note: This includes orders that are part of an order list
   */
  cancelAllSpotOpenOrders(
    params: OpenOrdersCancelAllWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<(OrderCancelWSAPIResponse | OrderListCancelWSAPIResponse)[]>
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'openOrders.cancelAll',
      params,
    );
  }

  /**
   * Place a new order list
   * Note: This is a deprecated endpoint, consider using placeOCOOrderList instead
   */
  placeSpotOrderList(
    params: OrderListPlaceWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListPlaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.place',
      params,
    );
  }

  /**
   * Place a new OCO (One-Cancels-the-Other) order list
   * Note: Activation of one order immediately cancels the other
   */
  placeSpotOCOOrderList(
    params: OrderListPlaceOCOWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListPlaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.place.oco',
      params,
    );
  }

  /**
   * Place a new OTO (One-Triggers-the-Other) order list
   * Note: The pending order is placed only when the working order is fully filled
   */
  placeSpotOTOOrderList(
    params: OrderListPlaceOTOWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListPlaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.place.oto',
      params,
    );
  }

  /**
   * Place a new OTOCO (One-Triggers-One-Cancels-the-Other) order list
   * Note: The pending orders are placed only when the working order is fully filled
   */
  placeSpotOTOCOOrderList(
    params: OrderListPlaceOTOCOWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListPlaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.place.otoco',
      params,
    );
  }

  /**
   * Check execution status of an order list
   * Note: If both origClientOrderId and orderListId parameters are specified, only origClientOrderId is used
   */
  getSpotOrderListStatus(
    params: OrderListStatusWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListStatusWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.status',
      params,
    );
  }

  /**
   * Cancel an active order list
   * Note: If both orderListId and listClientOrderId parameters are specified, only orderListId is used
   */
  cancelSpotOrderList(
    params: OrderListCancelWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListCancelWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'orderList.cancel',
      params,
    );
  }

  /**
   * Query execution status of all open order lists
   * Note: If you need to continuously monitor order status updates, consider using WebSocket Streams
   */
  getSpotOpenOrderLists(
    params: WSAPIRecvWindowTimestamp,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListStatusWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'openOrderLists.status',
      params,
    );
  }

  /**
   * Place a new order using Smart Order Routing (SOR)
   * Note: Only supports LIMIT and MARKET orders. quoteOrderQty is not supported
   */
  placeSpotSOROrder(
    params: SOROrderPlaceWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<SOROrderPlaceWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'sor.order.place',
      params,
    );
  }

  /**
   * Test new order creation and signature/recvWindow using Smart Order Routing (SOR)
   * Note: Creates and validates a new order but does not send it into the matching engine
   */
  testSpotSOROrder(
    params: SOROrderTestWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<
    WSAPIResponse<
      SOROrderTestWSAPIResponse | SOROrderTestWithCommissionWSAPIResponse
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'sor.order.test',
      params,
    );
  }

  /*
   *
   * SPOT - Account requests
   *
   */

  /**
   * Query information about your account
   * Note: Weight: 20
   */
  getSpotAccountStatus(
    params: AccountStatusWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<AccountStatusWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'account.status',
      params,
    );
  }

  /**
   * Query your current unfilled order count for all intervals
   * Note: Weight: 40
   */
  getSpotOrderRateLimits(
    params: WSAPIRecvWindowTimestamp,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<RateLimitWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'account.rateLimits.orders',
      params,
    );
  }

  /**
   * Query information about all your orders – active, canceled, filled – filtered by time range
   * Note: Weight: 20
   */
  getSpotAllOrders(
    params: AllOrdersWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'allOrders',
      params,
    );
  }

  /**
   * Query information about all your order lists, filtered by time range
   * Note: Weight: 20
   */
  getSpotAllOrderLists(
    params: AllOrderListsWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<OrderListStatusWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'allOrderLists',
      params,
    );
  }

  /**
   * Query information about all your trades, filtered by time range
   * Note: Weight: 20
   */
  getSpotMyTrades(
    params: MyTradesWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<TradeWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'myTrades',
      params,
    );
  }

  /**
   * Displays the list of orders that were expired due to STP
   * Note: Weight varies based on query type (2-20)
   */
  getSpotPreventedMatches(
    params: MyPreventedMatchesWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<PreventedMatchWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'myPreventedMatches',
      params,
    );
  }

  /**
   * Retrieves allocations resulting from SOR order placement
   * Note: Weight: 20
   */
  getSpotAllocations(
    params: MyAllocationsWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<AllocationWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'myAllocations',
      params,
    );
  }

  /**
   * Get current account commission rates
   * Note: Weight: 20
   */
  getSpotAccountCommission(
    params: AccountCommissionWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<AccountCommissionWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'account.commission',
      params,
    );
  }

  /*
   *
   * FUTURES - Market data requests
   *
   */

  /**
   * Get current order book for futures
   * Note: If you need to continuously monitor order book updates, consider using WebSocket Streams
   */
  getFuturesOrderBook(
    params: FuturesDepthWSAPIRequest,
  ): Promise<WSAPIResponse<FuturesDepthWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'depth',
      params,
    );
  }

  /**
   * Get latest price for a futures symbol or symbols
   * Note: If symbol is not provided, prices for all symbols will be returned
   */
  getFuturesSymbolPriceTicker(
    params?: FuturesTickerPriceWSAPIRequest,
  ): Promise<
    WSAPIResponse<
      FuturesTickerPriceWSAPIResponse | FuturesTickerPriceWSAPIResponse[]
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'ticker.price',
      params,
    );
  }

  /**
   * Get best price/qty on the order book for a futures symbol or symbols
   * Note: If symbol is not provided, bookTickers for all symbols will be returned
   */
  getFuturesSymbolOrderBookTicker(
    params?: FuturesTickerBookWSAPIRequest,
  ): Promise<
    WSAPIResponse<
      FuturesTickerBookWSAPIResponse | FuturesTickerBookWSAPIResponse[]
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'ticker.book',
      params,
    );
  }

  /*
   *
   * FUTURES - Trading requests
   *
   */

  /**
   * Submit a futures order
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  submitNewFuturesOrder(
    market: 'usdm' | 'coinm',
    params: NewFuturesOrderParams & { timestamp: number; recvWindow?: number },
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'order.place',
      params,
    );
  }

  /**
   * Modify an existing futures order
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  modifyFuturesOrder(
    market: 'usdm' | 'coinm',
    params: FuturesOrderModifyWSAPIRequest,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'order.modify',
      params,
    );
  }

  /**
   * Cancel a futures order
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  cancelFuturesOrder(
    market: 'usdm' | 'coinm',
    params: FuturesOrderCancelWSAPIRequest,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'order.cancel',
      params,
    );
  }

  /**
   * Query futures order status
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  getFuturesOrderStatus(
    market: 'usdm' | 'coinm',
    params: FuturesOrderStatusWSAPIRequest,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'order.status',
      params,
    );
  }

  /**
   * Get current position information (V2)
   * Note: Only symbols that have positions or open orders will be returned
   */
  getFuturesPositionV2(
    params: FuturesPositionV2WSAPIRequest,
  ): Promise<WSAPIResponse<FuturesPositionV2WSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'v2/account.position',
      params,
    );
  }

  /**
   * Get current position information
   * Note: Only symbols that have positions or open orders will be returned
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  getFuturesPosition(
    market: 'usdm' | 'coinm',
    params: FuturesPositionWSAPIRequest,
  ): Promise<WSAPIResponse<FuturesPositionWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'account.position',
      params,
    );
  }

  /*
   *
   * FUTURES - Account requests
   *
   */

  /**
   * Get account balance information (V2)
   * Note: Returns balance information for all assets
   */
  getFuturesAccountBalanceV2(
    params: WSAPIRecvWindowTimestamp,
  ): Promise<WSAPIResponse<FuturesAccountBalanceItemWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'v2/account.balance',
      params,
    );
  }

  /**
   * Get account balance information
   * Note: Returns balance information for all assets
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  getFuturesAccountBalance(
    market: 'usdm' | 'coinm',
    params: WSAPIRecvWindowTimestamp,
  ): Promise<WSAPIResponse<FuturesAccountBalanceItemWSAPIResponse[]>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'account.balance',
      params,
    );
  }

  /**
   * Get account information (V2)
   * Note: Returns detailed account information including positions and assets
   */
  getFuturesAccountStatusV2(
    params: WSAPIRecvWindowTimestamp,
  ): Promise<WSAPIResponse<FuturesAccountStatusWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.usdmWSAPI,
      'v2/account.status',
      params,
    );
  }

  /**
   * Get account information
   * Note: Returns detailed account information including positions and assets
   *
   * This endpoint is used for both USDM and COINM futures.
   */
  getFuturesAccountStatus(
    market: 'usdm' | 'coinm',
    params: WSAPIRecvWindowTimestamp,
  ): Promise<WSAPIResponse<FuturesAccountStatusWSAPIResponse>> {
    return this.wsClient.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'account.status',
      params,
    );
  }

  /*
   *
   * User data stream requests
   *
   */

  /**
   * Start the user data stream for an apiKey (passed as param).
   *
   * Note: for "Spot" markets, the listenKey workflow is deprecated, use `subscribeUserDataStream()` instead.
   *
   * @param params
   * @param wsKey
   * @returns listenKey
   */
  startUserDataStreamForKey(
    params: { apiKey: string },
    wsKey: WSAPIWsKey = WS_KEY_MAP.mainWSAPI,
  ): Promise<WSAPIResponse<{ listenKey: string }>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey,
      'userDataStream.start',
      params,
    );
  }

  /**
   * Attempt to "ping" a listen key.
   *
   * Note: for "Spot" markets, the listenKey workflow is deprecated, use `subscribeUserDataStream()` instead.
   *
   * @param params
   * @param wsKey
   * @returns
   */
  pingUserDataStreamForKey(
    params: WSAPIUserDataListenKeyRequest,
    wsKey: WSAPIWsKey = WS_KEY_MAP.mainWSAPI,
  ): Promise<WSAPIResponse<object>> {
    return this.wsClient.sendWSAPIRequest(wsKey, 'userDataStream.ping', params);
  }

  /**
   * Stop the user data stream listen key.
   *
   * @param params
   * @param wsKey
   * @returns
   */
  stopUserDataStreamForKey(
    params: WSAPIUserDataListenKeyRequest,
    wsKey: WSAPIWsKey = WS_KEY_MAP.mainWSAPI,
  ): Promise<WSAPIResponse<object>> {
    return this.wsClient.sendWSAPIRequest(wsKey, 'userDataStream.stop', params);
  }

  /**
   * Request user data stream subscription on the currently authenticated connection.
   *
   * If reconnected, this will automatically resubscribe unless you unsubscribe manually.
   */
  async subscribeUserDataStream(
    wsKey: WSAPIWsKey,
  ): Promise<WSAPIResponse<object>> {
    const resolvedWsKey = this.options.testnet ? getTestnetWsKey(wsKey) : wsKey;

    const res = await this.wsClient.sendWSAPIRequest(
      resolvedWsKey,
      'userDataStream.subscribe',
    );

    // Used to track whether this connection had the general "userDataStream.subscribe" called.
    // Used as part of `resubscribeUserDataStreamAfterReconnect` to know which connections to resub.
    this.subscribedUserDataStreamState[resolvedWsKey] = {
      subscribedAt: new Date(),
      subscribeAttempt: 0,
    };

    return res;
  }

  /**
   * Unsubscribe from the user data stream subscription on the currently authenticated connection.
   *
   * If reconnected, this will also stop it from automatically resubscribing after reconnect.
   */
  unsubscribeUserDataStream(
    wsKey: WSAPIWsKey,
  ): Promise<WSAPIResponse<{ listenKey: string }>> {
    const resolvedWsKey = this.options.testnet ? getTestnetWsKey(wsKey) : wsKey;

    delete this.subscribedUserDataStreamState[resolvedWsKey];
    return this.wsClient.sendWSAPIRequest(
      resolvedWsKey,
      'userDataStream.unsubscribe',
    );
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   * Private methods for handling some of the convenience/automation provided by the WS API Client
   *
   *
   *
   *
   *
   *
   *
   */

  private setupDefaultEventListeners() {
    if (this.options.attachEventListeners) {
      /**
       * General event handlers for monitoring the WebsocketClient
       */
      this.wsClient
        .on('open', (data) => {
          console.log(new Date(), 'ws connected', data.wsKey);
        })
        .on('reconnecting', ({ wsKey }) => {
          console.log(new Date(), 'ws automatically reconnecting.... ', wsKey);
        })
        .on('reconnected', (data) => {
          console.log(new Date(), 'ws has reconnected ', data?.wsKey);
        })
        .on('authenticated', (data) => {
          console.info(new Date(), 'ws has authenticated ', data?.wsKey);
        })
        .on('exception', (data) => {
          console.error(new Date(), 'ws exception: ', JSON.stringify(data));
        });
    }
  }

  private async tryResubscribeUserDataStream(wsKey: WSAPIWsKey) {
    const subscribeState = this.getSubscribedUserDataStreamState(wsKey);

    const respawnDelayInSeconds =
      this.options.resubscribeUserDataStreamDelaySeconds;

    this.logger.error(
      'tryResubscribeUserDataStream(): resubscribing to user data stream....',
      {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      },
    );

    try {
      if (this.subscribedUserDataStreamState[wsKey]?.respawnTimeout) {
        clearTimeout(this.subscribedUserDataStreamState[wsKey].respawnTimeout);
        delete this.subscribedUserDataStreamState[wsKey].respawnTimeout;
      }

      subscribeState.subscribeAttempt++;
      await this.subscribeUserDataStream(wsKey);

      this.subscribedUserDataStreamState[wsKey] = {
        ...subscribeState,
        subscribedAt: new Date(),
        subscribeAttempt: 0,
      };

      this.logger.info('tryResubscribeUserDataStream()->ok', {
        ...WS_LOGGER_CATEGORY,
        ...subscribeState,
        wsKey,
      });
    } catch (e) {
      this.logger.error(
        'tryResubscribeUserDataStream() exception - retry after timeout',
        {
          ...WS_LOGGER_CATEGORY,
          wsKey,
          exception: e,
          subscribeState,
        },
      );

      subscribeState.respawnTimeout = setTimeout(() => {
        this.tryResubscribeUserDataStream(wsKey);
      }, 1000 * respawnDelayInSeconds);

      this.subscribedUserDataStreamState[wsKey] = {
        ...subscribeState,
      };
    }
  }

  private getSubscribedUserDataStreamState(wsKey: WSAPIWsKey) {
    const subscribedState = this.subscribedUserDataStreamState[wsKey] || {
      subscribedAt: new Date(),
      subscribeAttempt: 0,
    };
    return subscribedState;
  }

  private handleWSReconnectedEvent(params: { wsKey: WsKey }) {
    const wsKey = params.wsKey;

    // Not a WS API connection
    if (!isWSAPIWsKey(wsKey)) {
      return;
    }

    const fnName = 'handleWSReconnectedEvent()';

    // For the workflow without the listen key
    if (
      // Feature enabled
      this.options.resubscribeUserDataStreamAfterReconnect &&
      // Was subscribed to user data stream (without listen key)
      this.subscribedUserDataStreamState[wsKey]
    ) {
      // Delay existing timer, if exists
      if (this.subscribedUserDataStreamState[wsKey]?.respawnTimeout) {
        clearTimeout(this.subscribedUserDataStreamState[wsKey].respawnTimeout);
        delete this.subscribedUserDataStreamState[wsKey].respawnTimeout;

        this.logger.error(
          `${fnName} -> resubUserData(): Respawn timer already active while trying to queue respawn...delaying existing timer further...`,
          {
            ...WS_LOGGER_CATEGORY,
            wsKey,
          },
        );
      }

      this.logger.trace(
        `${fnName} -> resubUserData():: queued resubscribe for wsKey user data stream`,
        {
          ...WS_LOGGER_CATEGORY,
          wsKey,
        },
      );

      // Queue resubscribe workflow
      this.subscribedUserDataStreamState[wsKey].respawnTimeout = setTimeout(
        () => {
          this.tryResubscribeUserDataStream(wsKey);
        },
        1000 * this.options.resubscribeUserDataStreamDelaySeconds,
      );
    }
  }
}
