import binance,{ BinanceRest } from "../index";

const binanceRest = new BinanceRest({
  key: 'string',
  secret: 'string',
  // recvWindow?: number,
  // timeout?: number,
  // disableBeautification?: boolean,
  // handleDrift?: boolean
});

binanceRest.allOrders('');
