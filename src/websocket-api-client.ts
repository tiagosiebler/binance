import { NewFuturesOrderParams } from './types/futures';
import { ExchangeInfo, NewSpotOrderParams, OrderResponse } from './types/spot';
import { WSAPIResponse } from './types/websockets/ws-api';
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
import {
  WS_KEY_MAP,
  WSAPIWsKeyFutures,
  WSAPIWsKeyMain,
} from './util/websockets/websocket-util';
import { WebsocketClient } from './websocket-client';

function getFuturesMarketWsKey(market: 'usdm' | 'coinm'): WSAPIWsKeyFutures {
  if (market === 'usdm') {
    return WS_KEY_MAP.usdmWSAPI;
  }
  return WS_KEY_MAP.coinmWSAPI;
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
export class WebsocketAPIClient extends WebsocketClient {
  /*
   *
   * SPOT - General requests
   *
   */

  /**
   * Test connectivity to the WebSocket API
   */
  testSpotConnectivity(wsKey?: WSAPIWsKeyMain): Promise<WSAPIResponse<object>> {
    return this.sendWSAPIRequest(wsKey || WS_KEY_MAP.mainWSAPI, 'ping');
  }

  /**
   * Test connectivity to the WebSocket API and get the current server time
   */
  getSpotServerTime(
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<TimeWSAPIResponse>> {
    return this.sendWSAPIRequest(wsKey || WS_KEY_MAP.mainWSAPI, 'time');
  }

  /**
   * Query current exchange trading rules, rate limits, and symbol information
   */
  getSpotExchangeInfo(
    params?: ExchangeInfoWSAPIRequest,
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<ExchangeInfo>> {
    return this.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.mainWSAPI,
      'exchangeInfo',
      params,
    );
  }

  getSpotSessionStatus(
    wsKey?: WSAPIWsKeyMain,
  ): Promise<WSAPIResponse<WsAPISessionStatus>> {
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(WS_KEY_MAP.usdmWSAPI, 'depth', params);
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
    return this.sendWSAPIRequest(WS_KEY_MAP.usdmWSAPI, 'ticker.price', params);
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
    return this.sendWSAPIRequest(WS_KEY_MAP.usdmWSAPI, 'ticker.book', params);
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
    params: NewFuturesOrderParams,
  ): Promise<WSAPIResponse<FuturesOrderWSAPIResponse>> {
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
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
    return this.sendWSAPIRequest(
      getFuturesMarketWsKey(market),
      'account.status',
      params,
    );
  }
}
