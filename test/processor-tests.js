const { expect } = require('chai');

describe('processing', () => {
    const ValueProcessor = require('../lib/processor');
    const { processFilters } = ValueProcessor;

    it('is exposed out the package', () => {
        const binance = require('../lib/binance');
        expect(ValueProcessor).to.equal(binance.ValueProcessor);
    });

    describe('processFilters', () => {
        const symbolInfo1 = {
            symbol: 'ETHBTC',
            status: 'TRADING',
            baseAsset: 'ETH',
            baseAssetPrecision: 8,
            quoteAsset: 'BTC',
            quotePrecision: 8,
            orderTypes: [
                'LIMIT',
                'LIMIT_MAKER',
                'MARKET',
                'STOP_LOSS_LIMIT',
                'TAKE_PROFIT_LIMIT'
            ],
            icebergAllowed: true,
            filters: [
                {
                    filterType: 'PRICE_FILTER',
                    minPrice: '0.00000100',
                    maxPrice: '100000.00000000',
                    tickSize: '0.00000100'
                },
                {
                    filterType: 'LOT_SIZE',
                    minQty: '0.00100000',
                    maxQty: '100000.00000000',
                    stepSize: '0.00100000'
                },
                { filterType: 'MIN_NOTIONAL', minNotional: '0.00100000' }
            ]
        };

        it('fixes quantities which are below the min lot size', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: 0.0001,
                    price: 1
                })
            ).to.deep.equal({
                quantity: '0.001',
                price: '1.000000'
            });
        });
        it('fixes quantities which are above the max lot size', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: 1000000000,
                    price: 1
                })
            ).to.deep.equal({
                quantity: '100000.000',
                price: '1.000000'
            });
        });
        it('fixes quantities based on step size ending with 1', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: 1,
                    price: 1
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1.0001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1.0009',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1.001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '1.001',
                price: '1.000000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '0.9999',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '1.000000'
            });
        });

        it('fixes prices which are below the min price', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: '5000.000',
                    price: '0.000000000001'
                })
            ).to.deep.equal({
                quantity: '5000.000',
                price: '0.000001'
            });
        });
        it('fixes prices which are above the max price', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: 1,
                    price: 1000000000
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '100000.000000'
            });
        });
        it('fixes prices based on step size ending with 1', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1',
                    price: '1.000001'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000001'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1',
                    price: '1.0000011'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000001'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1',
                    price: '1.0000011'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000001'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '1',
                    price: '1.0000019'
                })
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000001'
            });
            expect(
                processFilters(
                    symbolInfo1,
                    {
                        quantity: '1',
                        price: '1.0000019'
                    },
                    { priceRounding: 'ROUND_DOWN' }
                )
            ).to.deep.equal({
                quantity: '1.000',
                price: '1.000001'
            });
        });
        it('fixes quantity and price when below the min notional', () => {
            expect(
                processFilters(symbolInfo1, {
                    quantity: '.00000001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.001',
                price: '1.000000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '.00000001',
                    price: '0.500000'
                })
            ).to.deep.equal({
                quantity: '0.002',
                price: '0.500000'
            });
            expect(
                processFilters(symbolInfo1, {
                    quantity: '.00000001',
                    price: '0.000125'
                })
            ).to.deep.equal({
                quantity: '8.000',
                price: '0.000125'
            });
        });

        const symbolInfo2 = {
            symbol: 'ETHBTC',
            status: 'TRADING',
            baseAsset: 'ETH',
            baseAssetPrecision: 8,
            quoteAsset: 'BTC',
            quotePrecision: 8,
            orderTypes: [
                'LIMIT',
                'LIMIT_MAKER',
                'MARKET',
                'STOP_LOSS_LIMIT',
                'TAKE_PROFIT_LIMIT'
            ],
            icebergAllowed: true,
            filters: [
                {
                    filterType: 'PRICE_FILTER',
                    minPrice: '0.00000300',
                    maxPrice: '100000.00000000',
                    tickSize: '0.00000300'
                },
                {
                    filterType: 'LOT_SIZE',
                    minQty: '0.00300000',
                    maxQty: '100000.00000000',
                    stepSize: '0.00300000'
                },
                { filterType: 'MIN_NOTIONAL', minNotional: '0.00100000' }
            ]
        };

        it('fixes quantities based on step size ending with something other than 1', () => {
            expect(
                processFilters(symbolInfo2, {
                    quantity: 1,
                    price: 1
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1.0001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1.0009',
                    price: '1.000001'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1.001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '0.9999',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
        });
        it('fixes prices based on step size ending with something other than 1', () => {
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1',
                    price: '1.000001'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1',
                    price: '1.0000011'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1',
                    price: '1.0000011'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '1',
                    price: '1.0000019'
                })
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
            expect(
                processFilters(
                    symbolInfo2,
                    {
                        quantity: '1',
                        price: '1.0000019'
                    },
                    { priceRounding: 'ROUND_DOWN' }
                )
            ).to.deep.equal({
                quantity: '0.999',
                price: '0.999999'
            });
        });
        it('fixes quantity and price when below the min notional, with step size not ending with 1', () => {
            expect(
                processFilters(symbolInfo2, {
                    quantity: '.00000001',
                    price: '1.000000'
                })
            ).to.deep.equal({
                quantity: '0.003',
                price: '0.999999'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '.00000004',
                    price: '0.150000'
                })
            ).to.deep.equal({
                quantity: '0.009',
                price: '0.150000'
            });
            expect(
                processFilters(symbolInfo2, {
                    quantity: '.00000001',
                    price: '0.000125'
                })
            ).to.deep.equal({
                quantity: '8.133',
                price: '0.000123'
            });
        });
    });
});
