const Binance = require('./lib/binance.js').BinanceRest;
const binance = new Binance({
    key: 'I9xLeqLn6TbpRRGJrxXfffYwO39Fy7GJqIISDuiZ80yevaFunVqRmvEbAxeyUU8K',
    secret: 'rF6mZUdRmFw4rGqr3EwagxhFW8ew1VwQdpuEeE61RVP8UreSbOQ2dayoGEjv7nZA',
});

binance.account()
    .then((data) => {
        console.log(data);
    });