
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
- [websocket-api-client](#websocket-api-clientts)


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
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L660) |  | GET | `api/v3/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L664) |  | GET | `api/v3/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L684) |  | GET | `api/v3/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L688) |  | GET | `api/v3/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L692) |  | GET | `api/v3/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L696) |  | GET | `api/v3/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L702) |  | GET | `api/v3/klines` |
| [getUIKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L706) |  | GET | `api/v3/uiKlines` |
| [getAvgPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L710) |  | GET | `api/v3/avgPrice` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L718) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L753) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [getTradingDayTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L780) |  | GET | `api/v3/ticker/tradingDay?symbols=` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L795) |  | GET | `api/v3/ticker/price?symbols=` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L811) |  | GET | `api/v3/ticker/bookTicker?symbols=` |
| [getRollingWindowTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L827) |  | GET | `api/v3/ticker?symbols=` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L849) | :closed_lock_with_key:  | POST | `api/v3/order` |
| [testNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L857) | :closed_lock_with_key:  | POST | `api/v3/order/test` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L865) | :closed_lock_with_key:  | GET | `api/v3/order` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L869) | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| [cancelAllSymbolOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L873) | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| [replaceOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L879) | :closed_lock_with_key:  | POST | `api/v3/order/cancelReplace` |
| [amendOrderKeepPriority()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L893) | :closed_lock_with_key:  | PUT | `fapi/v1/order/amend/keepPriority` |
| [getOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L900) | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L904) | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| [submitNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L911) | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| [submitNewOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L918) | :closed_lock_with_key:  | POST | `api/v3/orderList/oco` |
| [submitNewOrderListOTO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L927) | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| [submitNewOrderListOTOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L936) | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| [cancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L946) | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| [getOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L951) | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| [getAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L955) | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| [getAllOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L962) | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| [submitNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L969) | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| [testNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L980) | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L996) | :closed_lock_with_key:  | GET | `api/v3/account` |
| [getAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1002) | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| [getOrderRateLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1008) | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| [getPreventedMatches()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1012) | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| [getAllocations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1018) | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| [getCommissionRates()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1022) | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| [getCrossMarginCollateralRatio()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1032) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| [getAllCrossMarginPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1041) |  | GET | `sapi/v1/margin/allPairs` |
| [getIsolatedMarginAllSymbols()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1045) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| [getAllMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1051) |  | GET | `sapi/v1/margin/allAssets` |
| [getMarginDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1055) | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| [getIsolatedMarginTierData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1059) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| [queryMarginPriceIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1065) |  | GET | `sapi/v1/margin/priceIndex` |
| [getMarginAvailableInventory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1071) | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| [getLeverageBracket()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1077) | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| [getNextHourlyInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1087) | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1093) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| [submitMarginAccountBorrowRepay()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1100) | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| [getMarginAccountBorrowRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1106) | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| [getMarginInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1112) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| [queryMaxBorrow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1118) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| [getMarginForceLiquidationRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1130) | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| [getSmallLiabilityExchangeCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1139) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| [getSmallLiabilityExchangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1143) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| [marginAccountCancelOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1155) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| [marginAccountCancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1161) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| [marginAccountCancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1166) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| [marginAccountNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1172) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| [marginAccountNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1179) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order` |
| [getMarginOrderCountUsage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1187) | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| [queryMarginAccountAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1193) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| [queryMarginAccountAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1199) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| [queryMarginAccountOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1205) | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| [queryMarginAccountOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1209) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| [queryMarginAccountOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1216) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| [queryMarginAccountOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1220) | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| [queryMarginAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1224) | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| [submitSmallLiabilityExchange()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1230) | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| [submitManualLiquidation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1237) | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| [submitMarginOTOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1246) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oto` |
| [submitMarginOTOCOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1258) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/otoco` |
| [createMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1271) | :closed_lock_with_key:  | POST | `sapi/v1/margin/apiKey` |
| [deleteMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1277) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/apiKey` |
| [updateMarginIPForSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1285) | :closed_lock_with_key:  | PUT | `sapi/v1/margin/apiKey/ip` |
| [getMarginSpecialLowLatencyKeys()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1296) | :closed_lock_with_key:  | GET | `sapi/v1/margin/api-key-list` |
| [getMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1305) | :closed_lock_with_key:  | GET | `sapi/v1/margin/apiKey` |
| [getCrossMarginTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1318) | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| [queryMaxTransferOutAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1324) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| [updateCrossMarginMaxLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1336) | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| [disableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1342) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| [enableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1349) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| [getBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1356) | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| [getMarginSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1360) | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| [queryCrossMarginAccountDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1364) | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| [getCrossMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1368) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| [getIsolatedMarginAccountLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1374) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| [getIsolatedMarginAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1381) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| [getIsolatedMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1387) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| [toggleBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1393) | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| [getMarginCapitalFlow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1401) | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| [queryLoanRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1410) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| [queryRepayRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1419) | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| [isolatedMarginAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1428) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| [getBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1440) | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| [withdraw()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1444) | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| [getWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1448) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| [getWithdrawAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1454) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| [getDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1458) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| [getDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1462) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| [getDepositAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1468) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| [submitDepositCredit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1474) | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| [getAutoConvertStablecoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1483) | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| [setConvertibleCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1490) | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| [getAssetDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1503) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| [getWalletBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1509) | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| [getUserAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1515) | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| [submitUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1519) | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| [getUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1525) | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| [getDust()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1531) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| [convertDustToBnb()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1535) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| [getDustLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1539) | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| [getAssetDividendRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1543) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| [getTradeFee()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1547) | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| [getFundingAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1551) | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| [getCloudMiningHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1555) | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| [getDelegationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1565) | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| [submitNewFutureAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1595) | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| [getFutureAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1605) | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| [getCrossCollateralBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1614) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| [getCrossCollateralRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1621) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| [getCrossCollateralWalletV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1628) | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| [getAdjustCrossCollateralLTVHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1635) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| [getCrossCollateralLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1647) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| [getCrossCollateralInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1656) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| [getAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1668) | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| [getDailyAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1672) | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| [disableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1678) | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| [enableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1682) | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| [getAccountStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1686) | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| [getApiTradingStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1690) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1694) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| [withdrawTravelRule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1710) | :closed_lock_with_key:  | POST | `sapi/v1/localentity/withdraw/apply` |
| [getTravelRuleWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1721) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/withdraw/history` |
| [getTravelRuleWithdrawHistoryV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1730) | :closed_lock_with_key:  | GET | `sapi/v2/localentity/withdraw/history` |
| [submitTravelRuleDepositQuestionnaire()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1742) | :closed_lock_with_key:  | PUT | `sapi/v1/localentity/deposit/provide-info` |
| [getTravelRuleDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1751) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/deposit/history` |
| [getOnboardedVASPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1760) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/vasp` |
| [getSystemStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1770) |  | GET | `sapi/v1/system/status` |
| [getDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1774) | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| [createVirtualSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1784) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| [getSubAccountList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1790) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| [subAccountEnableFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1796) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| [subAccountEnableMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1804) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| [enableOptionsForSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1808) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| [subAccountEnableLeverageToken()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1818) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| [getSubAccountStatusOnMarginOrFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1824) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| [getSubAccountFuturesPositionRisk()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1830) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| [getSubAccountFuturesPositionRiskV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1838) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| [getSubAccountTransactionStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1844) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| [getSubAccountIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1859) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountDeleteIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1868) | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountAddIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1877) | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| [subAccountAddIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1890) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountEnableOrDisableIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1903) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1918) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| [getSubAccountFuturesAccountDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1924) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| [getSubAccountDetailOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1930) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| [getSubAccountDetailOnMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1936) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| [getSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1942) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| [getSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1948) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| [getSubAccountFuturesAccountSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1954) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| [getSubAccountSummaryOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1958) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| [getSubAccountsSummaryOfMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1967) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| [subAccountMarginTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1971) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| [getSubAccountAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1977) | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| [getSubAccountAssetsMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1983) | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| [getSubAccountFuturesAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1989) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| [getSubAccountSpotAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1998) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| [getSubAccountSpotAssetsSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2004) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| [getSubAccountUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2010) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| [subAccountFuturesAssetTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2016) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| [subAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2025) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| [subAccountTransferToMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2034) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| [subAccountTransferToSameMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2040) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| [subAccountUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2046) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| [subAccountMovePosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2052) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/move-position` |
| [getSubAccountFuturesPositionMoveHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2061) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/move-position` |
| [depositAssetsIntoManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2076) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| [getManagedSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2082) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| [withdrawAssetsFromManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2091) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| [getManagedSubAccountTransfersParent()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2097) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| [getManagedSubAccountTransferLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2109) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| [getManagedSubAccountTransfersInvestor()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2121) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| [getManagedSubAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2133) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| [getManagedSubAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2140) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| [getManagedSubAccountAssetDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2149) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| [getManagedSubAccountMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2155) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| [getManagedSubAccountFuturesAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2162) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| [getAutoInvestAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2178) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| [getAutoInvestSourceAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2185) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| [getAutoInvestTargetAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2194) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| [getAutoInvestTargetAssetsROI()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2203) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| [getAutoInvestIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2212) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| [getAutoInvestPlans()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2218) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| [submitAutoInvestOneTimeTransaction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2236) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| [updateAutoInvestPlanStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2252) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| [updateAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2266) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [updateAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2272) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [submitAutoInvestRedemption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2289) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| [getAutoInvestSubscriptionTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2297) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| [getOneTimeTransactionStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2303) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| [submitAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2316) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [submitAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2322) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [getAutoInvestRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2337) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| [getAutoInvestPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2346) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| [getAutoInvestUserIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2350) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| [getAutoInvestRebalanceHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2359) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| [getConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2374) | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| [getConvertAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2378) | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| [convertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2388) | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| [acceptQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2392) | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| [getConvertTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2396) | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| [getOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2400) | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2404) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2408) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| [getConvertLimitOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2412) | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| [getEthStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2427) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| [getEthStakingAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2431) | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| [getEthStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2435) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| [subscribeEthStakingV1()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2448) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| [subscribeEthStakingV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2454) | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| [redeemEth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2460) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| [wrapBeth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2464) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| [getEthStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2474) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| [getEthRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2484) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| [getBethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2494) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| [getWbethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2504) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| [getEthRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2513) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| [getBethWrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2523) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| [getBethUnwrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2533) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| [getStakingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2546) | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| [getStakingProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2557) | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| [getStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2569) | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| [getPersonalLeftQuotaOfStakingProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2576) | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| [getSolStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2589) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/account` |
| [getSolStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2593) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/quota` |
| [subscribeSolStaking()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2603) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/stake` |
| [redeemSol()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2609) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/redeem` |
| [claimSolBoostRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2613) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/claim` |
| [getSolStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2625) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/stakingHistory` |
| [getSolRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2635) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/redemptionHistory` |
| [getBnsolRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2645) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/bnsolRewardsHistory` |
| [getBnsolRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2656) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/rateHistory` |
| [getSolBoostRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2666) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/boostRewardsHistory` |
| [getSolUnclaimedRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2676) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/unclaimedRewards` |
| [getFuturesLeadTraderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2691) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| [getFuturesLeadTradingSymbolWhitelist()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2695) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| [getMiningAlgos()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2707) |  | GET | `sapi/v1/mining/pub/algoList` |
| [getMiningCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2711) |  | GET | `sapi/v1/mining/pub/coinList` |
| [getHashrateResales()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2715) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| [getMiners()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2724) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| [getMinerDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2728) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| [getExtraBonuses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2734) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| [getMiningEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2740) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| [cancelHashrateResaleConfig()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2746) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| [getHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2755) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| [getMiningAccountEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2764) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| [getMiningStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2770) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| [submitHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2776) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| [getMiningAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2780) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| [submitVpNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2792) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| [submitTwapNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2799) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| [cancelAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2806) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| [getAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2812) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| [getAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2818) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| [getAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2825) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| [submitSpotAlgoTwapOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2838) | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| [cancelSpotAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2845) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| [getSpotAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2851) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| [getSpotAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2857) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| [getSpotAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2864) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| [getCryptoLoanFlexibleCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2879) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| [getCryptoLoanFlexibleAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2888) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| [borrowCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2901) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| [repayCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2907) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| [repayCryptoLoanFlexibleWithCollateral()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2913) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay/collateral` |
| [adjustCryptoLoanFlexibleLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2919) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| [getCryptoLoanFlexibleLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2931) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| [getFlexibleLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2943) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/rate` |
| [getLoanFlexibleBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2954) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| [getCryptoLoanFlexibleOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2963) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| [getFlexibleLoanLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2972) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/liquidation/history` |
| [getLoanFlexibleRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2981) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| [getCryptoLoanLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2999) | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| [getCryptoLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3006) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| [getCryptoLoanCollateralAssetsData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3015) | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| [getCryptoLoansIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3024) | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3039) | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3048) | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| [adjustCryptoLoanLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3057) | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| [customizeCryptoLoanMarginCall()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3066) | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| [getCryptoLoanOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3082) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| [getCryptoLoanBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3089) | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| [getCryptoLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3096) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| [getCryptoLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3105) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| [getSimpleEarnAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3117) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/account` |
| [getFlexibleSavingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3121) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/list` |
| [getSimpleEarnLockedProductList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3128) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/list` |
| [getFlexibleProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3137) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/position` |
| [getLockedProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3146) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/position` |
| [getFlexiblePersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3155) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| [getLockedPersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3164) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| [purchaseFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3179) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/subscribe` |
| [subscribeSimpleEarnLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3185) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/subscribe` |
| [redeemFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3191) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/redeem` |
| [redeemLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3197) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/redeem` |
| [setFlexibleAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3203) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| [setLockedAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3212) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| [getFlexibleSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3221) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| [getLockedSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3230) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| [setLockedProductRedeemOption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3239) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| [getFlexibleSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3257) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| [getLockedSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3269) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| [getFlexibleRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3281) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| [getLockedRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3293) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| [getFlexibleRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3303) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| [getLockedRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3313) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| [getCollateralRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3323) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| [getRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3333) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| [getVipBorrowInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3349) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| [getVipLoanInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3355) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/interestRateHistory` |
| [getVipLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3364) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| [getVipCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3371) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| [getVipLoanOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3384) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| [getVipLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3391) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| [checkVipCollateralAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3400) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| [getVipApplicationStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3407) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| [renewVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3420) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| [repayVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3424) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| [borrowVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3428) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3438) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| [subscribeDualInvestmentProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3453) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| [getDualInvestmentPositions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3459) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| [getDualInvestmentAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3468) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| [getVipLoanAccruedInterest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3472) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/accruedInterest` |
| [updateAutoCompoundStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3479) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| [createGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3494) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| [createDualTokenGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3498) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| [redeemGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3502) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| [verifyGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3506) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| [getTokenLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3510) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| [getRsaPublicKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3514) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| [getNftTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3524) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| [getNftDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3531) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| [getNftWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3538) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| [getNftAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3545) | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| [getC2CTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3558) | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| [getFiatOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3573) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| [getFiatPaymentsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3579) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| [getSpotRebateHistoryRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3591) | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| [getPortfolioMarginIndexPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3604) |  | GET | `sapi/v1/portfolio/asset-index-price` |
| [getPortfolioMarginAssetLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3610) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| [getPortfolioMarginProCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3616) |  | GET | `sapi/v1/portfolio/collateralRate` |
| [getPortfolioMarginProTieredCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3622) |  | GET | `sapi/v2/portfolio/collateralRate` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3633) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| [bnbTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3637) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| [submitPortfolioMarginProFullTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3643) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| [submitPortfolioMarginProSpecificTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3649) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| [repayPortfolioMarginProBankruptcyLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3655) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| [getPortfolioMarginProBankruptcyLoanAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3663) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| [repayFuturesNegativeBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3667) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| [updateAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3673) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| [getAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3679) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| [getPortfolioMarginProInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3685) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| [getPortfolioMarginProSpanAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3691) | :closed_lock_with_key:  | GET | `sapi/v2/portfolio/account` |
| [getPortfolioMarginProAccountBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3695) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/balance` |
| [mintPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3701) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/mint` |
| [redeemPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3707) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/redeem` |
| [getPortfolioMarginBankruptcyLoanRepayHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3715) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan-history` |
| [transferLDUSDTPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3730) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/earn-asset-transfer` |
| [getTransferableEarnAssetBalanceForPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3743) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/earn-asset-balance` |
| [getFuturesTickLevelOrderbookDataLink()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3760) | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| [getBlvtInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3774) |  | GET | `sapi/v1/blvt/tokenInfo` |
| [subscribeBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3778) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| [getBlvtSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3782) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| [redeemBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3788) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| [getBlvtRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3792) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| [getBlvtUserLimitInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3798) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| [getPayTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3809) | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| [createBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3819) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3825) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| [enableMarginBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3831) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| [createApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3837) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| [changePermissionApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3843) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [changeComissionBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3849) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [enableUniversalTransferApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3855) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| [updateIpRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3864) | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| [deleteIPRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3878) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| [deleteApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3894) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| [getSubAccountBrokerIpRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3900) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| [getApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3916) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| [getBrokerInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3922) | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| [updateSubAccountBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3926) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| [updateSubAccountMarginInterestBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3936) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| [getSubAccountBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3949) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| [deleteBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3965) | :closed_lock_with_key:  | DELETE | `/sapi/v1/broker/subAccount` |
| [transferBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3975) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| [getBrokerSubAccountHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3981) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| [submitBrokerSubFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3987) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| [getSubAccountFuturesTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4002) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| [getBrokerSubDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4014) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| [getBrokerSubAccountSpotAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4020) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| [getSubAccountMarginAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4029) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| [querySubAccountFuturesAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4038) | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| [universalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4047) | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| [getUniversalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4054) | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| [updateBrokerSubAccountCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4066) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| [updateBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4072) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| [getBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4081) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| [updateBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4090) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4099) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSpotCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4108) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| [getBrokerFuturesCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4114) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| [getBrokerIfNewSpotUser()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4151) | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| [getBrokerSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4162) | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| [enableFuturesBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4181) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [enableMarginApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4191) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| [getSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4228) |  | POST | `api/v3/userDataStream` |
| [keepAliveSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4232) |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| [closeSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4236) |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| [getMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4241) |  | POST | `sapi/v1/userDataStream` |
| [keepAliveMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4245) |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [closeMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4249) |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [getIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4254) |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [keepAliveIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4262) |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [closeIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4271) |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [getBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4294) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| [addBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4301) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| [removeBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4310) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| [getBSwapOperations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4319) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| [getLeftDailyPurchaseQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4334) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| [getLeftDailyRedemptionQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4343) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| [purchaseFixedAndActivityProject()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4357) | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| [getFixedAndActivityProjects()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4367) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| [getFixedAndActivityProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4376) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| [getLendingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4385) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| [getPurchaseRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4392) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| [getRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4399) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| [getInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4406) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| [changeFixedAndActivityPositionToDailyPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4413) | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| [enableConvertSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4430) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| [convertBUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4438) | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| [getConvertBUSDHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4445) | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

# usdm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [usdm-client.ts](/src/usdm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L130) |  | GET | `fapi/v1/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L134) |  | GET | `fapi/v1/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L138) |  | GET | `fapi/v1/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L142) |  | GET | `fapi/v1/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L146) |  | GET | `fapi/v1/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L152) |  | GET | `fapi/v1/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L158) |  | GET | `fapi/v1/klines` |
| [getContinuousContractKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L162) |  | GET | `fapi/v1/continuousKlines` |
| [getIndexPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L168) |  | GET | `fapi/v1/indexPriceKlines` |
| [getMarkPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L172) |  | GET | `fapi/v1/markPriceKlines` |
| [getPremiumIndexKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L176) |  | GET | `fapi/v1/premiumIndexKlines` |
| [getMarkPrice()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L180) |  | GET | `fapi/v1/premiumIndex` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L188) |  | GET | `fapi/v1/fundingRate` |
| [getFundingRates()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L194) |  | GET | `fapi/v1/fundingInfo` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L201) |  | GET | `fapi/v1/ticker/24hr` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L207) |  | GET | `fapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L217) |  | GET | `fapi/v1/ticker/price` |
| [getSymbolPriceTickerV2()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L227) |  | GET | `fapi/v2/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L237) |  | GET | `fapi/v1/ticker/bookTicker` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L249) |  | GET | `futures/data/delivery-price` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L255) |  | GET | `fapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L259) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L265) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L271) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L277) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L283) |  | GET | `futures/data/takerlongshortRatio` |
| [getHistoricalBlvtNavKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L287) |  | GET | `fapi/v1/lvtKlines` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L291) |  | GET | `fapi/v1/indexInfo` |
| [getMultiAssetsModeAssetIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L295) |  | GET | `fapi/v1/assetIndex` |
| [getBasis()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L302) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L306) |  | GET | `fapi/v1/constituents` |
| [getInsuranceFundBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L312) |  | GET | `fapi/v1/insuranceBalance` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L324) | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L336) | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L365) | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L371) | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L379) | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L385) | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L389) | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L409) | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L416) | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L422) | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L426) | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L430) | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L434) | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L438) | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L442) | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L448) | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L452) | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L456) | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| [setMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L460) | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L466) | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L476) | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| [getPositionsV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L480) | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L484) | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L488) | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| [getBalanceV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L500) | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L508) | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| [getAccountInformationV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L512) | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L520) | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| [getAccountComissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L527) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L533) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getFuturesAccountConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L539) | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| [getFuturesSymbolConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L543) | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| [getUserForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L547) | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L554) | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| [getMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L560) | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L564) | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L568) | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| [getApiQuantitativeRulesIndicators()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L572) | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| [getFuturesTransactionHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L578) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L585) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| [getFuturesOrderHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L591) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L598) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| [getFuturesTradeHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L604) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| [getFuturesTradeDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L611) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| [setBNBBurnEnabled()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L617) | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| [getBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L623) | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| [testOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L629) | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| [getAllConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L640) |  | GET | `fapi/v1/convert/exchangeInfo` |
| [submitConvertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L647) | :closed_lock_with_key:  | POST | `fapi/v1/convert/getQuote` |
| [acceptConvertQuote()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L653) | :closed_lock_with_key:  | POST | `fapi/v1/convert/acceptQuote` |
| [getConvertOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L661) | :closed_lock_with_key:  | GET | `fapi/v1/convert/orderStatus` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L674) | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L691) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L704) | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L717) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L734) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L743) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L752) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L769) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L786) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L808) |  | POST | `fapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L812) |  | PUT | `fapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L816) |  | DELETE | `fapi/v1/listenKey` |

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