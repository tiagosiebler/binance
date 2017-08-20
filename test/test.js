const BinanceRest = require('../lib/rest.js');

const binance = new BinanceRest({
    key: 'I9xLeqLn6TbpRRGJrxXfffYwO39Fy7GJqIISDuiZ80yevaFunVqRmvEbAxeyUU8K',
    secret: 'rF6mZUdRmFw4rGqr3EwagxhFW8ew1VwQdpuEeE61RVP8UreSbOQ2dayoGEjv7nZA'
});

binance.startUserDataStream()
    .then((data) => {
        console.log(data);
    });