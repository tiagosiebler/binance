const number = require('bignumber.js');

module.exports = {
    processFilters(
        symbolInfo,
        { quantity, price },
        {
            priceRounding = 'ROUND_HALF_UP',
            quantityRounding = 'ROUND_DOWN'
        } = {}
    ) {
        if (typeof price === 'number') {
            price = price.toFixed(8);
        }
        if (typeof quantity === 'number') {
            quantity = quantity.toFixed(8);
        }

        let priceFilter = symbolInfo.filters.filter(
            f => f.filterType === 'PRICE_FILTER'
        )[0];
        if (priceFilter) {
            const { minPrice, maxPrice, tickSize } = priceFilter;
            const dp = number(tickSize).dp();
            if (number(price).lt(minPrice)) {
                price = minPrice;
            }
            if (number(price).gt(maxPrice)) {
                price = maxPrice;
            }
            const mod = number(price).mod(tickSize);
            price = number(price)
                .minus(mod)
                .toFixed(dp, number[priceRounding]);
        }

        let lotSizeFilter = symbolInfo.filters.filter(
            f => f.filterType === 'LOT_SIZE'
        )[0];
        if (lotSizeFilter) {
            const { minQty, maxQty, stepSize } = lotSizeFilter;
            const dp = number(stepSize).dp();
            if (number(quantity).lt(minQty)) {
                quantity = minQty;
            }
            if (number(quantity).gt(maxQty)) {
                quantity = maxQty;
            }

            let minNotionalFilter = symbolInfo.filters.filter(
                f => f.filterType === 'MIN_NOTIONAL'
            )[0];
            if (minNotionalFilter) {
                if (
                    number(quantity)
                        .times(price)
                        .lt(minNotionalFilter.minNotional)
                ) {
                    // Always round up for minNotional since we can't be below it.
                    quantity = number(minNotionalFilter.minNotional)
                        .div(price)
                        .toFixed(dp, number.ROUND_UP);

                    const mod = number(quantity).mod(stepSize);
                    if (mod.gt(0)) {
                        quantity = number(quantity)
                            .plus(stepSize)
                            .minus(mod)
                            .toFixed(dp, number[quantityRounding]);
                    }
                }
            }

            const mod = number(quantity).mod(stepSize);
            quantity = number(quantity)
                .minus(mod)
                .toFixed(dp, number[quantityRounding]);

            quantity = number(quantity).toFixed(dp, number[quantityRounding]);
        }

        return {
            quantity,
            price
        };
    }
};
