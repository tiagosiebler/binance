const expect = require('chai').expect;
const binance = require('../lib/binance.js');
const BinanceRest = binance.BinanceRest;
const BinanceWS = binance.BinanceWS;

describe("Constructor", function () {

    it('should create a new instance', function () {

        let poloniex = new Poloniex();
        expect(poloniex).to.be.an.instanceOf(Poloniex);

    });
    it('should create a new instance with parameter options', function () {



    });

});