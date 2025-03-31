
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/binance">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/binance/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/binance/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [main-client](#main-clientts)
- [usdm-client](#usdm-clientts)
- [coinm-client](#coinm-clientts)
- [portfolio-client](#portfolio-clientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# main-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [main-client.ts](/src/main-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L653) |  | GET | `api/v3/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L657) |  | GET | `api/v3/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L677) |  | GET | `api/v3/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L681) |  | GET | `api/v3/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L685) |  | GET | `api/v3/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L689) |  | GET | `api/v3/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L695) |  | GET | `api/v3/klines` |
| [getUIKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L699) |  | GET | `api/v3/uiKlines` |
| [getAvgPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L703) |  | GET | `api/v3/avgPrice` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L707) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [getTradingDayTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L724) |  | GET | `api/v3/ticker/tradingDay?symbols=` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L739) |  | GET | `api/v3/ticker/price?symbols=` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L755) |  | GET | `api/v3/ticker/bookTicker?symbols=` |
| [getRollingWindowTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L771) |  | GET | `api/v3/ticker?symbols=` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L793) | :closed_lock_with_key:  | POST | `api/v3/order` |
| [testNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L801) | :closed_lock_with_key:  | POST | `api/v3/order/test` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L809) | :closed_lock_with_key:  | GET | `api/v3/order` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L813) | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| [cancelAllSymbolOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L817) | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| [replaceOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L823) | :closed_lock_with_key:  | POST | `api/v3/order/cancelReplace` |
| [getOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L832) | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L836) | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| [submitNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L843) | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| [submitNewOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L850) | :closed_lock_with_key:  | POST | `api/v3/orderList/oco` |
| [submitNewOrderListOTO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L859) | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| [submitNewOrderListOTOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L868) | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| [cancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L878) | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| [getOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L883) | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| [getAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L887) | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| [getAllOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L894) | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| [submitNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L901) | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| [testNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L912) | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L928) | :closed_lock_with_key:  | GET | `api/v3/account` |
| [getAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L934) | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| [getOrderRateLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L940) | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| [getPreventedMatches()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L944) | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| [getAllocations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L950) | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| [getCommissionRates()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L954) | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| [getCrossMarginCollateralRatio()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L964) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| [getAllCrossMarginPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L973) |  | GET | `sapi/v1/margin/allPairs` |
| [getIsolatedMarginAllSymbols()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L977) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| [getAllMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L983) |  | GET | `sapi/v1/margin/allAssets` |
| [getMarginDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L987) | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| [getIsolatedMarginTierData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L991) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| [queryMarginPriceIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L997) |  | GET | `sapi/v1/margin/priceIndex` |
| [getMarginAvailableInventory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1003) | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| [getLeverageBracket()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1009) | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| [getNextHourlyInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1019) | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1025) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| [submitMarginAccountBorrowRepay()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1032) | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| [getMarginAccountBorrowRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1038) | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| [getMarginInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1044) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| [queryMaxBorrow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1050) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| [getMarginForceLiquidationRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1062) | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| [getSmallLiabilityExchangeCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1071) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| [getSmallLiabilityExchangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1075) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| [marginAccountCancelOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1087) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| [marginAccountCancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1093) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| [marginAccountCancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1098) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| [marginAccountNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1104) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| [marginAccountNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1111) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order` |
| [getMarginOrderCountUsage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1119) | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| [queryMarginAccountAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1125) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| [queryMarginAccountAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1131) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| [queryMarginAccountOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1137) | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| [queryMarginAccountOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1141) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| [queryMarginAccountOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1148) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| [queryMarginAccountOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1152) | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| [queryMarginAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1156) | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| [submitSmallLiabilityExchange()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1162) | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| [submitManualLiquidation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1169) | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| [submitMarginOTOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1178) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oto` |
| [submitMarginOTOCOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1190) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/otoco` |
| [createMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1203) | :closed_lock_with_key:  | POST | `sapi/v1/margin/apiKey` |
| [deleteMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1209) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/apiKey` |
| [updateMarginIPForSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1217) | :closed_lock_with_key:  | PUT | `sapi/v1/margin/apiKey/ip` |
| [getMarginSpecialLowLatencyKeys()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1228) | :closed_lock_with_key:  | GET | `sapi/v1/margin/api-key-list` |
| [getMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1237) | :closed_lock_with_key:  | GET | `sapi/v1/margin/apiKey` |
| [getCrossMarginTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1250) | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| [queryMaxTransferOutAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1256) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| [updateCrossMarginMaxLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1268) | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| [disableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1274) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| [enableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1281) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| [getBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1288) | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| [getMarginSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1292) | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| [queryCrossMarginAccountDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1296) | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| [getCrossMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1300) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| [getIsolatedMarginAccountLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1306) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| [getIsolatedMarginAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1313) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| [getIsolatedMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1319) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| [toggleBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1325) | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| [getMarginCapitalFlow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1333) | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| [queryLoanRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1342) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| [queryRepayRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1351) | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| [isolatedMarginAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1360) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| [getBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1372) | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| [withdraw()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1376) | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| [getWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1380) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| [getWithdrawAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1386) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| [getDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1390) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| [getDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1394) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| [getDepositAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1400) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| [submitDepositCredit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1406) | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| [getAutoConvertStablecoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1415) | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| [setConvertibleCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1422) | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| [getAssetDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1435) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| [getWalletBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1441) | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| [getUserAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1447) | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| [submitUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1451) | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| [getUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1457) | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| [getDust()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1463) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| [convertDustToBnb()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1467) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| [getDustLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1471) | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| [getAssetDividendRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1475) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| [getTradeFee()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1479) | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| [getFundingAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1483) | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| [getCloudMiningHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1487) | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| [getDelegationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1497) | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| [submitNewFutureAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1527) | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| [getFutureAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1537) | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| [getCrossCollateralBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1546) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| [getCrossCollateralRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1553) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| [getCrossCollateralWalletV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1560) | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| [getAdjustCrossCollateralLTVHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1567) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| [getCrossCollateralLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1579) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| [getCrossCollateralInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1588) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| [getAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1600) | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| [getDailyAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1604) | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| [disableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1610) | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| [enableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1614) | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| [getAccountStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1618) | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| [getApiTradingStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1622) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1626) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| [withdrawTravelRule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1642) | :closed_lock_with_key:  | POST | `sapi/v1/localentity/withdraw/apply` |
| [getTravelRuleWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1653) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/withdraw/history` |
| [getTravelRuleWithdrawHistoryV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1662) | :closed_lock_with_key:  | GET | `sapi/v2/localentity/withdraw/history` |
| [submitTravelRuleDepositQuestionnaire()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1674) | :closed_lock_with_key:  | PUT | `sapi/v1/localentity/deposit/provide-info` |
| [getTravelRuleDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1683) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/deposit/history` |
| [getOnboardedVASPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1692) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/vasp` |
| [getSystemStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1702) |  | GET | `sapi/v1/system/status` |
| [getDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1706) | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| [createVirtualSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1716) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| [getSubAccountList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1722) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| [subAccountEnableFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1728) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| [subAccountEnableMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1732) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| [enableOptionsForSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1736) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| [subAccountEnableLeverageToken()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1742) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| [getSubAccountStatusOnMarginOrFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1748) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| [getSubAccountFuturesPositionRisk()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1754) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| [getSubAccountFuturesPositionRiskV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1762) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| [getSubAccountTransactionStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1768) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| [getSubAccountIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1783) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountDeleteIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1792) | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountAddIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1801) | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| [subAccountAddIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1814) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountEnableOrDisableIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1827) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1842) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| [getSubAccountFuturesAccountDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1848) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| [getSubAccountDetailOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1854) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| [getSubAccountDetailOnMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1860) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| [getSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1866) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| [getSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1872) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| [getSubAccountFuturesAccountSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1878) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| [getSubAccountSummaryOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1882) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| [getSubAccountsSummaryOfMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1891) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| [subAccountMarginTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1895) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| [getSubAccountAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1901) | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| [getSubAccountAssetsMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1907) | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| [getSubAccountFuturesAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1913) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| [getSubAccountSpotAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1922) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| [getSubAccountSpotAssetsSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1928) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| [getSubAccountUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1934) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| [subAccountFuturesAssetTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1940) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| [subAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1949) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| [subAccountTransferToMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1958) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| [subAccountTransferToSameMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1964) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| [subAccountUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1970) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| [depositAssetsIntoManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1982) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| [getManagedSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1988) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| [withdrawAssetsFromManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1997) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| [getManagedSubAccountTransfersParent()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2003) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| [getManagedSubAccountTransferLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2015) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| [getManagedSubAccountTransfersInvestor()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2027) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| [getManagedSubAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2039) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| [getManagedSubAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2046) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| [getManagedSubAccountAssetDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2055) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| [getManagedSubAccountMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2061) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| [getManagedSubAccountFuturesAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2068) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| [getAutoInvestAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2084) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| [getAutoInvestSourceAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2091) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| [getAutoInvestTargetAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2100) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| [getAutoInvestTargetAssetsROI()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2109) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| [getAutoInvestIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2118) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| [getAutoInvestPlans()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2124) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| [submitAutoInvestOneTimeTransaction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2142) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| [updateAutoInvestPlanStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2158) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| [updateAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2172) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [updateAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2178) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [submitAutoInvestRedemption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2195) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| [getAutoInvestSubscriptionTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2203) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| [getOneTimeTransactionStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2209) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| [submitAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2222) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [submitAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2228) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [getAutoInvestRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2243) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| [getAutoInvestPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2252) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| [getAutoInvestUserIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2256) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| [getAutoInvestRebalanceHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2265) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| [getConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2280) | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| [getConvertAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2284) | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| [convertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2294) | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| [acceptQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2298) | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| [getConvertTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2302) | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| [getOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2306) | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2310) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2314) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| [getConvertLimitOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2318) | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| [getEthStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2333) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| [getEthStakingAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2337) | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| [getEthStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2341) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| [subscribeEthStakingV1()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2354) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| [subscribeEthStakingV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2360) | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| [redeemEth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2366) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| [wrapBeth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2370) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| [getEthStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2380) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| [getEthRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2390) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| [getBethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2400) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| [getWbethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2410) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| [getEthRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2419) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| [getBethWrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2429) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| [getBethUnwrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2439) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| [getStakingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2452) | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| [getStakingProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2463) | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| [getStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2475) | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| [getPersonalLeftQuotaOfStakingProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2482) | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| [getSolStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2495) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/account` |
| [getSolStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2499) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/quota` |
| [subscribeSolStaking()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2509) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/stake` |
| [redeemSol()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2515) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/redeem` |
| [claimSolBoostRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2519) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/claim` |
| [getSolStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2531) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/stakingHistory` |
| [getSolRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2541) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/redemptionHistory` |
| [getBnsolRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2551) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/bnsolRewardsHistory` |
| [getBnsolRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2562) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/rateHistory` |
| [getSolBoostRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2572) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/boostRewardsHistory` |
| [getSolUnclaimedRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2582) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/unclaimedRewards` |
| [getFuturesLeadTraderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2597) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| [getFuturesLeadTradingSymbolWhitelist()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2601) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| [getMiningAlgos()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2613) |  | GET | `sapi/v1/mining/pub/algoList` |
| [getMiningCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2617) |  | GET | `sapi/v1/mining/pub/coinList` |
| [getHashrateResales()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2621) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| [getMiners()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2630) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| [getMinerDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2634) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| [getExtraBonuses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2640) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| [getMiningEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2646) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| [cancelHashrateResaleConfig()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2652) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| [getHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2661) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| [getMiningAccountEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2670) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| [getMiningStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2676) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| [submitHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2682) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| [getMiningAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2686) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| [submitVpNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2698) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| [submitTwapNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2705) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| [cancelAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2712) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| [getAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2718) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| [getAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2724) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| [getAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2731) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| [submitSpotAlgoTwapOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2744) | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| [cancelSpotAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2751) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| [getSpotAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2757) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| [getSpotAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2763) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| [getSpotAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2770) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| [getCryptoLoanFlexibleCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2785) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| [getCryptoLoanFlexibleAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2794) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| [borrowCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2807) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| [repayCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2813) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| [repayCryptoLoanFlexibleWithCollateral()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2819) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay/collateral` |
| [adjustCryptoLoanFlexibleLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2825) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| [getCryptoLoanFlexibleLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2837) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| [getFlexibleLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2849) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/rate` |
| [getLoanFlexibleBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2860) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| [getCryptoLoanFlexibleOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2869) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| [getFlexibleLoanLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2878) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/liquidation/history` |
| [getLoanFlexibleRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2887) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| [getCryptoLoanLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2905) | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| [getCryptoLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2912) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| [getCryptoLoanCollateralAssetsData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2921) | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| [getCryptoLoansIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2930) | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2945) | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2954) | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| [adjustCryptoLoanLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2963) | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| [customizeCryptoLoanMarginCall()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2972) | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| [getCryptoLoanOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2988) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| [getCryptoLoanBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2995) | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| [getCryptoLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3002) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| [getCryptoLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3011) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| [getSimpleEarnAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3023) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/account` |
| [getFlexibleSavingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3027) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/list` |
| [getSimpleEarnLockedProductList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3034) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/list` |
| [getFlexibleProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3043) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/position` |
| [getLockedProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3052) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/position` |
| [getFlexiblePersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3061) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| [getLockedPersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3070) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| [purchaseFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3085) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/subscribe` |
| [subscribeSimpleEarnLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3091) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/subscribe` |
| [redeemFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3097) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/redeem` |
| [redeemLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3103) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/redeem` |
| [setFlexibleAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3109) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| [setLockedAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3118) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| [getFlexibleSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3127) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| [getLockedSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3136) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| [setLockedProductRedeemOption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3145) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| [getFlexibleSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3163) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| [getLockedSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3175) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| [getFlexibleRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3187) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| [getLockedRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3199) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| [getFlexibleRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3209) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| [getLockedRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3219) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| [getCollateralRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3229) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| [getRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3239) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| [getVipBorrowInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3255) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| [getVipLoanInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3261) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/interestRateHistory` |
| [getVipLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3270) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| [getVipCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3277) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| [getVipLoanOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3290) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| [getVipLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3297) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| [checkVipCollateralAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3306) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| [getVipApplicationStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3313) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| [renewVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3326) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| [repayVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3330) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| [borrowVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3334) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3344) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| [subscribeDualInvestmentProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3359) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| [getDualInvestmentPositions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3365) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| [getDualInvestmentAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3374) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| [getVipLoanAccruedInterest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3378) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/accruedInterest` |
| [updateAutoCompoundStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3385) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| [createGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3400) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| [createDualTokenGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3404) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| [redeemGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3408) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| [verifyGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3412) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| [getTokenLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3416) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| [getRsaPublicKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3420) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| [getNftTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3430) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| [getNftDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3437) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| [getNftWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3444) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| [getNftAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3451) | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| [getC2CTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3464) | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| [getFiatOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3479) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| [getFiatPaymentsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3485) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| [getSpotRebateHistoryRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3497) | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| [getPortfolioMarginIndexPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3510) |  | GET | `sapi/v1/portfolio/asset-index-price` |
| [getPortfolioMarginAssetLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3516) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| [getPortfolioMarginProCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3522) |  | GET | `sapi/v1/portfolio/collateralRate` |
| [getPortfolioMarginProTieredCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3528) |  | GET | `sapi/v2/portfolio/collateralRate` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3539) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| [bnbTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3543) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| [submitPortfolioMarginProFullTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3549) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| [submitPortfolioMarginProSpecificTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3555) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| [repayPortfolioMarginProBankruptcyLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3561) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| [getPortfolioMarginProBankruptcyLoanAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3569) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| [repayFuturesNegativeBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3573) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| [updateAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3579) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| [getAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3585) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| [getPortfolioMarginProInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3591) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| [getPortfolioMarginProSpanAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3597) | :closed_lock_with_key:  | GET | `sapi/v2/portfolio/account` |
| [getPortfolioMarginProAccountBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3601) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/balance` |
| [mintPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3607) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/mint` |
| [redeemPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3613) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/redeem` |
| [getFuturesTickLevelOrderbookDataLink()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3628) | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| [getBlvtInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3642) |  | GET | `sapi/v1/blvt/tokenInfo` |
| [subscribeBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3646) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| [getBlvtSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3650) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| [redeemBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3656) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| [getBlvtRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3660) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| [getBlvtUserLimitInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3666) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| [getPayTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3677) | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| [createBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3687) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3693) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| [enableMarginBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3699) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| [createApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3705) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| [changePermissionApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3711) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [changeComissionBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3717) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [enableUniversalTransferApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3723) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| [updateIpRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3732) | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| [deleteIPRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3746) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| [deleteApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3762) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| [getSubAccountBrokerIpRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3768) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| [getApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3784) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| [getBrokerInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3790) | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| [updateSubAccountBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3794) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| [updateSubAccountMarginInterestBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3804) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| [getSubAccountBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3817) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| [transferBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3831) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| [getBrokerSubAccountHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3837) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| [submitBrokerSubFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3843) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| [getSubAccountFuturesTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3858) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| [getBrokerSubDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3870) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| [getBrokerSubAccountSpotAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3876) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| [getSubAccountMarginAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3885) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| [querySubAccountFuturesAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3894) | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| [universalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3903) | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| [getUniversalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3910) | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| [updateBrokerSubAccountCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3922) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| [updateBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3928) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| [getBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3937) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| [updateBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3946) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3955) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSpotCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3964) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| [getBrokerFuturesCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3970) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| [getBrokerIfNewSpotUser()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4007) | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| [getBrokerSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4018) | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| [enableFuturesBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4037) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [enableMarginApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4047) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| [getSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4084) |  | POST | `api/v3/userDataStream` |
| [keepAliveSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4088) |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| [closeSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4092) |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| [getMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4097) |  | POST | `sapi/v1/userDataStream` |
| [keepAliveMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4101) |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [closeMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4105) |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [getIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4110) |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| [keepAliveIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4118) |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| [closeIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4127) |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| [getBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4150) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| [addBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4157) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| [removeBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4166) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| [getBSwapOperations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4175) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| [getLeftDailyPurchaseQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4190) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| [getLeftDailyRedemptionQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4199) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| [purchaseFixedAndActivityProject()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4213) | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| [getFixedAndActivityProjects()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4223) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| [getFixedAndActivityProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4232) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| [getLendingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4241) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| [getPurchaseRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4248) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| [getRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4255) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| [getInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4262) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| [changeFixedAndActivityPositionToDailyPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4269) | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| [enableConvertSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4286) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| [convertBUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4294) | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| [getConvertBUSDHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4301) | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

# usdm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [usdm-client.ts](/src/usdm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L129) |  | GET | `fapi/v1/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L133) |  | GET | `fapi/v1/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L137) |  | GET | `fapi/v1/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L141) |  | GET | `fapi/v1/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L145) |  | GET | `fapi/v1/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L151) |  | GET | `fapi/v1/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L157) |  | GET | `fapi/v1/klines` |
| [getContinuousContractKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L161) |  | GET | `fapi/v1/continuousKlines` |
| [getIndexPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L167) |  | GET | `fapi/v1/indexPriceKlines` |
| [getMarkPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L171) |  | GET | `fapi/v1/markPriceKlines` |
| [getPremiumIndexKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L175) |  | GET | `fapi/v1/premiumIndexKlines` |
| [getMarkPrice()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L179) |  | GET | `fapi/v1/premiumIndex` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L183) |  | GET | `fapi/v1/fundingRate` |
| [getFundingRates()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L189) |  | GET | `fapi/v1/fundingInfo` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L193) |  | GET | `fapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L199) |  | GET | `fapi/v1/ticker/price` |
| [getSymbolPriceTickerV2()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L205) |  | GET | `fapi/v2/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L211) |  | GET | `fapi/v1/ticker/bookTicker` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L217) |  | GET | `futures/data/delivery-price` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L223) |  | GET | `fapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L227) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L233) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L239) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L245) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L251) |  | GET | `futures/data/takerlongshortRatio` |
| [getHistoricalBlvtNavKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L255) |  | GET | `fapi/v1/lvtKlines` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L259) |  | GET | `fapi/v1/indexInfo` |
| [getMultiAssetsModeAssetIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L263) |  | GET | `fapi/v1/assetIndex` |
| [getBasis()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L270) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L274) |  | GET | `fapi/v1/constituents` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L286) | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L298) | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L327) | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L333) | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L341) | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L347) | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L351) | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L371) | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L378) | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L384) | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L388) | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L392) | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L396) | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L400) | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L404) | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L410) | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L414) | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L418) | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| [setMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L422) | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L428) | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L438) | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| [getPositionsV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L442) | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L446) | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L450) | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| [getBalanceV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L462) | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L470) | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| [getAccountInformationV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L474) | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L482) | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| [getAccountComissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L489) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L495) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getFuturesAccountConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L501) | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| [getFuturesSymbolConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L505) | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| [getUserForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L509) | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L516) | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| [getMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L522) | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L526) | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L530) | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| [getApiQuantitativeRulesIndicators()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L534) | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| [getFuturesTransactionHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L540) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L547) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| [getFuturesOrderHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L553) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L560) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| [getFuturesTradeHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L566) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| [getFuturesTradeDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L573) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| [setBNBBurnEnabled()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L579) | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| [getBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L585) | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| [testOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L591) | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| [getAllConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L602) |  | GET | `fapi/v1/convert/exchangeInfo` |
| [submitConvertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L609) | :closed_lock_with_key:  | POST | `fapi/v1/convert/getQuote` |
| [acceptConvertQuote()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L615) | :closed_lock_with_key:  | POST | `fapi/v1/convert/acceptQuote` |
| [getConvertOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L623) | :closed_lock_with_key:  | GET | `fapi/v1/convert/orderStatus` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L636) | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L653) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L666) | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L679) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L696) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L705) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L714) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L731) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L748) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L770) |  | POST | `fapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L774) |  | PUT | `fapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L778) |  | DELETE | `fapi/v1/listenKey` |

# coinm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [coinm-client.ts](/src/coinm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L122) |  | GET | `dapi/v1/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L126) |  | GET | `dapi/v1/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L130) |  | GET | `dapi/v1/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L134) |  | GET | `dapi/v1/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L138) |  | GET | `dapi/v1/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L144) |  | GET | `dapi/v1/aggTrades` |
| [getMarkPrice()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L153) |  | GET | `dapi/v1/premiumIndex` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L157) |  | GET | `dapi/v1/fundingRate` |
| [getFundingRate()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L163) |  | GET | `dapi/v1/fundingInfo` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L167) |  | GET | `dapi/v1/klines` |
| [getContinuousContractKlines()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L171) |  | GET | `dapi/v1/continuousKlines` |
| [getIndexPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L177) |  | GET | `dapi/v1/indexPriceKlines` |
| [getMarkPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L181) |  | GET | `dapi/v1/markPriceKlines` |
| [getPremiumIndexKlines()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L185) |  | GET | `dapi/v1/premiumIndexKlines` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L192) |  | GET | `dapi/v1/ticker/24hr` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L198) |  | GET | `dapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L205) |  | GET | `dapi/v1/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L212) |  | GET | `dapi/v1/ticker/bookTicker` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L221) |  | GET | `dapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L225) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L229) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L235) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L241) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L247) |  | GET | `futures/data/takerBuySellVol` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L253) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L261) |  | GET | `dapi/v1/constituents` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L271) |  | GET | `futures/data/delivery-price` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L283) | :closed_lock_with_key:  | POST | `dapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L293) | :closed_lock_with_key:  | POST | `dapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L310) | :closed_lock_with_key:  | PUT | `dapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L319) | :closed_lock_with_key:  | PUT | `dapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L332) | :closed_lock_with_key:  | GET | `dapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L338) | :closed_lock_with_key:  | DELETE | `dapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L342) | :closed_lock_with_key:  | DELETE | `dapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L362) | :closed_lock_with_key:  | DELETE | `dapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L369) | :closed_lock_with_key:  | POST | `dapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L375) | :closed_lock_with_key:  | GET | `dapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L379) | :closed_lock_with_key:  | GET | `dapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L383) | :closed_lock_with_key:  | GET | `dapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L387) | :closed_lock_with_key:  | GET | `dapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L391) | :closed_lock_with_key:  | GET | `dapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L395) | :closed_lock_with_key:  | GET | `dapi/v1/userTrades` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L401) | :closed_lock_with_key:  | GET | `dapi/v1/positionRisk` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L408) | :closed_lock_with_key:  | POST | `dapi/v1/positionSide/dual` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L412) | :closed_lock_with_key:  | POST | `dapi/v1/marginType` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L416) | :closed_lock_with_key:  | POST | `dapi/v1/leverage` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L420) | :closed_lock_with_key:  | GET | `dapi/v1/adlQuantile` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L424) | :closed_lock_with_key:  | POST | `dapi/v1/positionMargin` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L430) | :closed_lock_with_key:  | GET | `dapi/v1/positionMargin/history` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L441) | :closed_lock_with_key:  | GET | `dapi/v1/balance` |
| [getAccountComissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L448) | :closed_lock_with_key:  | GET | `dapi/v1/commissionRate` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L454) | :closed_lock_with_key:  | GET | `dapi/v1/commissionRate` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L460) | :closed_lock_with_key:  | GET | `dapi/v1/account` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L467) | :closed_lock_with_key:  | GET | `dapi/v2/leverageBracket` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L476) | :closed_lock_with_key:  | GET | `dapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L480) | :closed_lock_with_key:  | GET | `dapi/v1/income` |
| [getDownloadIdForFuturesTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L484) | :closed_lock_with_key:  | GET | `dapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L494) | :closed_lock_with_key:  | GET | `dapi/v1/income/asyn/id` |
| [getDownloadIdForFuturesOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L500) | :closed_lock_with_key:  | GET | `dapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L510) | :closed_lock_with_key:  | GET | `dapi/v1/order/asyn/id` |
| [getDownloadIdForFuturesTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L516) | :closed_lock_with_key:  | GET | `dapi/v1/trade/asyn` |
| [getFuturesTradeHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L526) | :closed_lock_with_key:  | GET | `dapi/v1/trade/asyn/id` |
| [getClassicPortfolioMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L538) | :closed_lock_with_key:  | GET | `dapi/v1/pmAccountInfo` |
| [getClassicPortfolioMarginNotionalLimits()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L547) | :closed_lock_with_key:  | GET | `dapi/v1/pmExchangeInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L566) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L579) | :closed_lock_with_key:  | POST | `dapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L592) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L609) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L618) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L627) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L644) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L661) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L681) |  | POST | `dapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L685) |  | PUT | `dapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L689) |  | DELETE | `dapi/v1/listenKey` |

# portfolio-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [portfolio-client.ts](/src/portfolio-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L159) |  | GET | `papi/v1/ping` |
| [submitNewUMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L169) | :closed_lock_with_key:  | POST | `papi/v1/um/order` |
| [submitNewUMConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L176) | :closed_lock_with_key:  | POST | `papi/v1/um/conditional/order` |
| [submitNewCMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L183) | :closed_lock_with_key:  | POST | `papi/v1/cm/order` |
| [submitNewCMConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L190) | :closed_lock_with_key:  | POST | `papi/v1/cm/conditional/order` |
| [submitNewMarginOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L197) | :closed_lock_with_key:  | POST | `papi/v1/margin/order` |
| [submitMarginLoan()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L204) | :closed_lock_with_key:  | POST | `papi/v1/marginLoan` |
| [submitMarginRepay()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L210) | :closed_lock_with_key:  | POST | `papi/v1/repayLoan` |
| [submitNewMarginOCO()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L216) | :closed_lock_with_key:  | POST | `papi/v1/margin/order/oco` |
| [cancelUMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L225) | :closed_lock_with_key:  | DELETE | `papi/v1/um/order` |
| [cancelAllUMOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L231) | :closed_lock_with_key:  | DELETE | `papi/v1/um/allOpenOrders` |
| [cancelUMConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L238) | :closed_lock_with_key:  | DELETE | `papi/v1/um/conditional/order` |
| [cancelAllUMConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L244) | :closed_lock_with_key:  | DELETE | `papi/v1/um/conditional/allOpenOrders` |
| [cancelCMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L251) | :closed_lock_with_key:  | DELETE | `papi/v1/cm/order` |
| [cancelAllCMOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L257) | :closed_lock_with_key:  | DELETE | `papi/v1/cm/allOpenOrders` |
| [cancelCMConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L264) | :closed_lock_with_key:  | DELETE | `papi/v1/cm/conditional/order` |
| [cancelAllCMConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L270) | :closed_lock_with_key:  | DELETE | `papi/v1/cm/conditional/allOpenOrders` |
| [cancelMarginOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L277) | :closed_lock_with_key:  | DELETE | `papi/v1/margin/order` |
| [cancelMarginOCO()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L283) | :closed_lock_with_key:  | DELETE | `papi/v1/margin/orderList` |
| [cancelAllMarginOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L289) | :closed_lock_with_key:  | DELETE | `papi/v1/margin/allOpenOrders` |
| [modifyUMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L295) | :closed_lock_with_key:  | PUT | `papi/v1/um/order` |
| [modifyCMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L301) | :closed_lock_with_key:  | PUT | `papi/v1/cm/order` |
| [getUMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L307) | :closed_lock_with_key:  | GET | `papi/v1/um/order` |
| [getAllUMOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L311) | :closed_lock_with_key:  | GET | `papi/v1/um/allOrders` |
| [getUMOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L317) | :closed_lock_with_key:  | GET | `papi/v1/um/openOrder` |
| [getAllUMOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L323) | :closed_lock_with_key:  | GET | `papi/v1/um/openOrders` |
| [getAllUMConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L327) | :closed_lock_with_key:  | GET | `papi/v1/um/conditional/allOrders` |
| [getUMOpenConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L333) | :closed_lock_with_key:  | GET | `papi/v1/um/conditional/openOrders` |
| [getUMOpenConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L339) | :closed_lock_with_key:  | GET | `papi/v1/um/conditional/openOrder` |
| [getUMConditionalOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L345) | :closed_lock_with_key:  | GET | `papi/v1/um/conditional/orderHistory` |
| [getCMOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L351) | :closed_lock_with_key:  | GET | `papi/v1/cm/order` |
| [getAllCMOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L355) | :closed_lock_with_key:  | GET | `papi/v1/cm/allOrders` |
| [getCMOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L361) | :closed_lock_with_key:  | GET | `papi/v1/cm/openOrder` |
| [getAllCMOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L367) | :closed_lock_with_key:  | GET | `papi/v1/cm/openOrders` |
| [getCMOpenConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L374) | :closed_lock_with_key:  | GET | `papi/v1/cm/conditional/openOrders` |
| [getCMOpenConditionalOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L380) | :closed_lock_with_key:  | GET | `papi/v1/cm/conditional/openOrder` |
| [getAllCMConditionalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L388) | :closed_lock_with_key:  | GET | `papi/v1/cm/conditional/allOrders` |
| [getCMConditionalOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L394) | :closed_lock_with_key:  | GET | `papi/v1/cm/conditional/orderHistory` |
| [getUMForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L400) | :closed_lock_with_key:  | GET | `papi/v1/um/forceOrders` |
| [getCMForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L406) | :closed_lock_with_key:  | GET | `papi/v1/cm/forceOrders` |
| [getUMOrderModificationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L412) | :closed_lock_with_key:  | GET | `papi/v1/um/orderAmendment` |
| [getCMOrderModificationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L418) | :closed_lock_with_key:  | GET | `papi/v1/cm/orderAmendment` |
| [getMarginForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L424) | :closed_lock_with_key:  | GET | `papi/v1/margin/forceOrders` |
| [getUMTrades()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L431) | :closed_lock_with_key:  | GET | `papi/v1/um/userTrades` |
| [getCMTrades()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L435) | :closed_lock_with_key:  | GET | `papi/v1/cm/userTrades` |
| [getUMADLQuantile()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L439) | :closed_lock_with_key:  | GET | `papi/v1/um/adlQuantile` |
| [getCMADLQuantile()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L448) | :closed_lock_with_key:  | GET | `papi/v1/cm/adlQuantile` |
| [toggleUMFeeBurn()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L457) | :closed_lock_with_key:  | POST | `papi/v1/um/feeBurn` |
| [getUMFeeBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L463) | :closed_lock_with_key:  | GET | `papi/v1/um/feeBurn` |
| [getMarginOrder()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L467) | :closed_lock_with_key:  | GET | `papi/v1/margin/order` |
| [getMarginOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L473) | :closed_lock_with_key:  | GET | `papi/v1/margin/openOrders` |
| [getAllMarginOrders()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L479) | :closed_lock_with_key:  | GET | `papi/v1/margin/allOrders` |
| [getMarginOCO()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L485) | :closed_lock_with_key:  | GET | `papi/v1/margin/orderList` |
| [getAllMarginOCO()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L491) | :closed_lock_with_key:  | GET | `papi/v1/margin/allOrderList` |
| [getMarginOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L497) | :closed_lock_with_key:  | GET | `papi/v1/margin/openOrderList` |
| [getMarginTrades()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L501) | :closed_lock_with_key:  | GET | `papi/v1/margin/myTrades` |
| [repayMarginDebt()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L507) | :closed_lock_with_key:  | POST | `papi/v1/margin/repay-debt` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L519) | :closed_lock_with_key:  | GET | `papi/v1/balance` |
| [getAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L523) | :closed_lock_with_key:  | GET | `papi/v1/account` |
| [getMarginMaxBorrow()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L527) | :closed_lock_with_key:  | GET | `papi/v1/margin/maxBorrowable` |
| [getMarginMaxWithdraw()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L534) | :closed_lock_with_key:  | GET | `papi/v1/margin/maxWithdraw` |
| [getUMPosition()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L540) | :closed_lock_with_key:  | GET | `papi/v1/um/positionRisk` |
| [getCMPosition()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L544) | :closed_lock_with_key:  | GET | `papi/v1/cm/positionRisk` |
| [updateUMLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L551) | :closed_lock_with_key:  | POST | `papi/v1/um/leverage` |
| [updateCMLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L559) | :closed_lock_with_key:  | POST | `papi/v1/cm/leverage` |
| [updateUMPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L567) | :closed_lock_with_key:  | POST | `papi/v1/um/positionSide/dual` |
| [updateCMPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L576) | :closed_lock_with_key:  | POST | `papi/v1/cm/positionSide/dual` |
| [getUMPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L585) | :closed_lock_with_key:  | GET | `papi/v1/um/positionSide/dual` |
| [getCMPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L591) | :closed_lock_with_key:  | GET | `papi/v1/cm/positionSide/dual` |
| [getUMLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L597) | :closed_lock_with_key:  | GET | `papi/v1/um/leverageBracket` |
| [getCMLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L607) | :closed_lock_with_key:  | GET | `papi/v1/cm/leverageBracket` |
| [getUMTradingStatus()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L616) | :closed_lock_with_key:  | GET | `papi/v1/um/apiTradingStatus` |
| [getUMCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L622) | :closed_lock_with_key:  | GET | `papi/v1/um/commissionRate` |
| [getCMCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L630) | :closed_lock_with_key:  | GET | `papi/v1/cm/commissionRate` |
| [getMarginLoanRecords()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L638) | :closed_lock_with_key:  | GET | `papi/v1/margin/marginLoan` |
| [getMarginRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L645) | :closed_lock_with_key:  | GET | `papi/v1/margin/repayLoan` |
| [getAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L652) | :closed_lock_with_key:  | GET | `papi/v1/repay-futures-switch` |
| [updateAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L658) | :closed_lock_with_key:  | POST | `papi/v1/repay-futures-switch` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L666) | :closed_lock_with_key:  | GET | `papi/v1/margin/marginInterestHistory` |
| [repayFuturesNegativeBalance()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L673) | :closed_lock_with_key:  | POST | `papi/v1/repay-futures-negative-balance` |
| [getPortfolioNegativeBalanceInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L679) | :closed_lock_with_key:  | GET | `papi/v1/portfolio/interest-history` |
| [autoCollectFunds()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L685) | :closed_lock_with_key:  | POST | `papi/v1/auto-collection` |
| [transferAssetFuturesMargin()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L691) | :closed_lock_with_key:  | POST | `papi/v1/asset-collection` |
| [transferBNB()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L697) | :closed_lock_with_key:  | POST | `papi/v1/bnb-transfer` |
| [getUMIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L706) | :closed_lock_with_key:  | GET | `papi/v1/um/income` |
| [getCMIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L712) | :closed_lock_with_key:  | GET | `papi/v1/cm/income` |
| [getUMAccount()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L718) | :closed_lock_with_key:  | GET | `papi/v1/um/account` |
| [getCMAccount()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L725) | :closed_lock_with_key:  | GET | `papi/v1/cm/account` |
| [getUMAccountConfig()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L732) | :closed_lock_with_key:  | GET | `papi/v1/um/accountConfig` |
| [getUMSymbolConfig()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L736) | :closed_lock_with_key:  | GET | `papi/v1/um/symbolConfig` |
| [getUMAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L742) | :closed_lock_with_key:  | GET | `papi/v2/um/account` |
| [getUMTradeHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L749) | :closed_lock_with_key:  | GET | `papi/v1/um/trade/asyn` |
| [getUMTradeDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L759) | :closed_lock_with_key:  | GET | `papi/v1/um/trade/asyn/id` |
| [getUMOrderHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L765) | :closed_lock_with_key:  | GET | `papi/v1/um/order/asyn` |
| [getUMOrderDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L775) | :closed_lock_with_key:  | GET | `papi/v1/um/order/asyn/id` |
| [getUMTransactionHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L781) | :closed_lock_with_key:  | GET | `papi/v1/um/income/asyn` |
| [getUMTransactionDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L791) | :closed_lock_with_key:  | GET | `papi/v1/um/income/asyn/id` |
| [getPMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L826) |  | POST | `papi/v1/listenKey` |
| [keepAlivePMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L830) |  | PUT | `papi/v1/listenKey` |
| [closePMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L834) |  | DELETE | `papi/v1/listenKey` |