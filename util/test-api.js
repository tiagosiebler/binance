const config = require('./config.js');
const BinanceRest = require('../lib/rest.js');
const binanceRest = new BinanceRest({
    key: config.apiKey, // Get this from your account on binance.com
    secret: config.secret, // Same for this
    timeout: 15000,
    recvWindow: 10000
});

binanceRest[process.argv[2]](process.argv[3] && JSON.parse(process.argv[3]))
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
