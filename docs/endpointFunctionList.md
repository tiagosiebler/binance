
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
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L658) |  | GET | `api/v3/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L662) |  | GET | `api/v3/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L682) |  | GET | `api/v3/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L686) |  | GET | `api/v3/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L690) |  | GET | `api/v3/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L694) |  | GET | `api/v3/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L700) |  | GET | `api/v3/klines` |
| [getUIKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L704) |  | GET | `api/v3/uiKlines` |
| [getAvgPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L708) |  | GET | `api/v3/avgPrice` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L716) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L751) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [getTradingDayTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L778) |  | GET | `api/v3/ticker/tradingDay?symbols=` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L793) |  | GET | `api/v3/ticker/price?symbols=` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L809) |  | GET | `api/v3/ticker/bookTicker?symbols=` |
| [getRollingWindowTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L825) |  | GET | `api/v3/ticker?symbols=` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L847) | :closed_lock_with_key:  | POST | `api/v3/order` |
| [testNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L855) | :closed_lock_with_key:  | POST | `api/v3/order/test` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L863) | :closed_lock_with_key:  | GET | `api/v3/order` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L867) | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| [cancelAllSymbolOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L871) | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| [replaceOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L877) | :closed_lock_with_key:  | POST | `api/v3/order/cancelReplace` |
| [getOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L886) | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L890) | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| [submitNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L897) | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| [submitNewOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L904) | :closed_lock_with_key:  | POST | `api/v3/orderList/oco` |
| [submitNewOrderListOTO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L913) | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| [submitNewOrderListOTOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L922) | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| [cancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L932) | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| [getOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L937) | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| [getAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L941) | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| [getAllOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L948) | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| [submitNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L955) | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| [testNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L966) | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L982) | :closed_lock_with_key:  | GET | `api/v3/account` |
| [getAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L988) | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| [getOrderRateLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L994) | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| [getPreventedMatches()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L998) | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| [getAllocations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1004) | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| [getCommissionRates()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1008) | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| [getCrossMarginCollateralRatio()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1018) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| [getAllCrossMarginPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1027) |  | GET | `sapi/v1/margin/allPairs` |
| [getIsolatedMarginAllSymbols()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1031) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| [getAllMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1037) |  | GET | `sapi/v1/margin/allAssets` |
| [getMarginDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1041) | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| [getIsolatedMarginTierData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1045) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| [queryMarginPriceIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1051) |  | GET | `sapi/v1/margin/priceIndex` |
| [getMarginAvailableInventory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1057) | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| [getLeverageBracket()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1063) | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| [getNextHourlyInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1073) | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1079) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| [submitMarginAccountBorrowRepay()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1086) | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| [getMarginAccountBorrowRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1092) | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| [getMarginInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1098) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| [queryMaxBorrow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1104) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| [getMarginForceLiquidationRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1116) | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| [getSmallLiabilityExchangeCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1125) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| [getSmallLiabilityExchangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1129) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| [marginAccountCancelOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1141) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| [marginAccountCancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1147) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| [marginAccountCancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1152) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| [marginAccountNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1158) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| [marginAccountNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1165) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order` |
| [getMarginOrderCountUsage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1173) | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| [queryMarginAccountAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1179) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| [queryMarginAccountAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1185) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| [queryMarginAccountOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1191) | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| [queryMarginAccountOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1195) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| [queryMarginAccountOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1202) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| [queryMarginAccountOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1206) | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| [queryMarginAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1210) | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| [submitSmallLiabilityExchange()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1216) | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| [submitManualLiquidation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1223) | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| [submitMarginOTOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1232) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oto` |
| [submitMarginOTOCOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1244) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/otoco` |
| [createMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1257) | :closed_lock_with_key:  | POST | `sapi/v1/margin/apiKey` |
| [deleteMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1263) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/apiKey` |
| [updateMarginIPForSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1271) | :closed_lock_with_key:  | PUT | `sapi/v1/margin/apiKey/ip` |
| [getMarginSpecialLowLatencyKeys()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1282) | :closed_lock_with_key:  | GET | `sapi/v1/margin/api-key-list` |
| [getMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1291) | :closed_lock_with_key:  | GET | `sapi/v1/margin/apiKey` |
| [getCrossMarginTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1304) | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| [queryMaxTransferOutAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1310) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| [updateCrossMarginMaxLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1322) | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| [disableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1328) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| [enableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1335) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| [getBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1342) | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| [getMarginSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1346) | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| [queryCrossMarginAccountDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1350) | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| [getCrossMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1354) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| [getIsolatedMarginAccountLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1360) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| [getIsolatedMarginAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1367) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| [getIsolatedMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1373) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| [toggleBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1379) | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| [getMarginCapitalFlow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1387) | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| [queryLoanRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1396) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| [queryRepayRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1405) | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| [isolatedMarginAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1414) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| [getBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1426) | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| [withdraw()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1430) | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| [getWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1434) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| [getWithdrawAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1440) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| [getDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1444) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| [getDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1448) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| [getDepositAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1454) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| [submitDepositCredit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1460) | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| [getAutoConvertStablecoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1469) | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| [setConvertibleCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1476) | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| [getAssetDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1489) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| [getWalletBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1495) | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| [getUserAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1501) | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| [submitUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1505) | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| [getUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1511) | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| [getDust()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1517) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| [convertDustToBnb()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1521) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| [getDustLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1525) | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| [getAssetDividendRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1529) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| [getTradeFee()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1533) | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| [getFundingAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1537) | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| [getCloudMiningHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1541) | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| [getDelegationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1551) | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| [submitNewFutureAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1581) | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| [getFutureAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1591) | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| [getCrossCollateralBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1600) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| [getCrossCollateralRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1607) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| [getCrossCollateralWalletV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1614) | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| [getAdjustCrossCollateralLTVHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1621) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| [getCrossCollateralLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1633) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| [getCrossCollateralInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1642) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| [getAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1654) | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| [getDailyAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1658) | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| [disableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1664) | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| [enableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1668) | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| [getAccountStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1672) | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| [getApiTradingStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1676) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1680) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| [withdrawTravelRule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1696) | :closed_lock_with_key:  | POST | `sapi/v1/localentity/withdraw/apply` |
| [getTravelRuleWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1707) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/withdraw/history` |
| [getTravelRuleWithdrawHistoryV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1716) | :closed_lock_with_key:  | GET | `sapi/v2/localentity/withdraw/history` |
| [submitTravelRuleDepositQuestionnaire()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1728) | :closed_lock_with_key:  | PUT | `sapi/v1/localentity/deposit/provide-info` |
| [getTravelRuleDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1737) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/deposit/history` |
| [getOnboardedVASPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1746) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/vasp` |
| [getSystemStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1756) |  | GET | `sapi/v1/system/status` |
| [getDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1760) | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| [createVirtualSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1770) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| [getSubAccountList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1776) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| [subAccountEnableFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1782) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| [subAccountEnableMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1786) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| [enableOptionsForSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1790) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| [subAccountEnableLeverageToken()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1796) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| [getSubAccountStatusOnMarginOrFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1802) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| [getSubAccountFuturesPositionRisk()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1808) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| [getSubAccountFuturesPositionRiskV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1816) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| [getSubAccountTransactionStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1822) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| [getSubAccountIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1837) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountDeleteIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1846) | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountAddIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1855) | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| [subAccountAddIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1868) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountEnableOrDisableIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1881) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1896) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| [getSubAccountFuturesAccountDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1902) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| [getSubAccountDetailOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1908) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| [getSubAccountDetailOnMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1914) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| [getSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1920) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| [getSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1926) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| [getSubAccountFuturesAccountSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1932) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| [getSubAccountSummaryOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1936) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| [getSubAccountsSummaryOfMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1945) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| [subAccountMarginTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1949) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| [getSubAccountAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1955) | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| [getSubAccountAssetsMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1961) | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| [getSubAccountFuturesAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1967) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| [getSubAccountSpotAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1976) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| [getSubAccountSpotAssetsSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1982) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| [getSubAccountUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1988) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| [subAccountFuturesAssetTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1994) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| [subAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2003) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| [subAccountTransferToMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2012) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| [subAccountTransferToSameMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2018) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| [subAccountUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2024) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| [subAccountMovePosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2030) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/move-position` |
| [getSubAccountFuturesPositionMoveHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2039) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/move-position` |
| [depositAssetsIntoManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2054) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| [getManagedSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2060) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| [withdrawAssetsFromManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2069) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| [getManagedSubAccountTransfersParent()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2075) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| [getManagedSubAccountTransferLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2087) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| [getManagedSubAccountTransfersInvestor()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2099) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| [getManagedSubAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2111) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| [getManagedSubAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2118) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| [getManagedSubAccountAssetDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2127) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| [getManagedSubAccountMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2133) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| [getManagedSubAccountFuturesAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2140) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| [getAutoInvestAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2156) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| [getAutoInvestSourceAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2163) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| [getAutoInvestTargetAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2172) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| [getAutoInvestTargetAssetsROI()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2181) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| [getAutoInvestIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2190) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| [getAutoInvestPlans()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2196) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| [submitAutoInvestOneTimeTransaction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2214) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| [updateAutoInvestPlanStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2230) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| [updateAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2244) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [updateAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2250) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [submitAutoInvestRedemption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2267) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| [getAutoInvestSubscriptionTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2275) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| [getOneTimeTransactionStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2281) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| [submitAutoInvestmentPlanOld()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2294) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [submitAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2300) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [getAutoInvestRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2315) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| [getAutoInvestPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2324) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| [getAutoInvestUserIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2328) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| [getAutoInvestRebalanceHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2337) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| [getConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2352) | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| [getConvertAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2356) | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| [convertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2366) | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| [acceptQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2370) | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| [getConvertTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2374) | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| [getOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2378) | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2382) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2386) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| [getConvertLimitOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2390) | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| [getEthStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2405) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| [getEthStakingAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2409) | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| [getEthStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2413) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| [subscribeEthStakingV1()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2426) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| [subscribeEthStakingV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2432) | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| [redeemEth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2438) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| [wrapBeth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2442) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| [getEthStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2452) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| [getEthRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2462) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| [getBethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2472) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| [getWbethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2482) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| [getEthRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2491) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| [getBethWrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2501) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| [getBethUnwrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2511) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| [getStakingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2524) | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| [getStakingProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2535) | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| [getStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2547) | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| [getPersonalLeftQuotaOfStakingProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2554) | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| [getSolStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2567) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/account` |
| [getSolStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2571) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/quota` |
| [subscribeSolStaking()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2581) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/stake` |
| [redeemSol()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2587) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/redeem` |
| [claimSolBoostRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2591) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/claim` |
| [getSolStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2603) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/stakingHistory` |
| [getSolRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2613) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/redemptionHistory` |
| [getBnsolRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2623) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/bnsolRewardsHistory` |
| [getBnsolRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2634) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/rateHistory` |
| [getSolBoostRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2644) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/boostRewardsHistory` |
| [getSolUnclaimedRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2654) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/unclaimedRewards` |
| [getFuturesLeadTraderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2669) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| [getFuturesLeadTradingSymbolWhitelist()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2673) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| [getMiningAlgos()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2685) |  | GET | `sapi/v1/mining/pub/algoList` |
| [getMiningCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2689) |  | GET | `sapi/v1/mining/pub/coinList` |
| [getHashrateResales()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2693) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| [getMiners()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2702) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| [getMinerDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2706) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| [getExtraBonuses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2712) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| [getMiningEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2718) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| [cancelHashrateResaleConfig()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2724) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| [getHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2733) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| [getMiningAccountEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2742) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| [getMiningStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2748) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| [submitHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2754) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| [getMiningAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2758) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| [submitVpNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2770) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| [submitTwapNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2777) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| [cancelAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2784) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| [getAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2790) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| [getAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2796) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| [getAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2803) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| [submitSpotAlgoTwapOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2816) | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| [cancelSpotAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2823) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| [getSpotAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2829) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| [getSpotAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2835) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| [getSpotAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2842) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| [getCryptoLoanFlexibleCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2857) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| [getCryptoLoanFlexibleAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2866) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| [borrowCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2879) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| [repayCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2885) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| [repayCryptoLoanFlexibleWithCollateral()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2891) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay/collateral` |
| [adjustCryptoLoanFlexibleLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2897) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| [getCryptoLoanFlexibleLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2909) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| [getFlexibleLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2921) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/rate` |
| [getLoanFlexibleBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2932) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| [getCryptoLoanFlexibleOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2941) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| [getFlexibleLoanLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2950) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/liquidation/history` |
| [getLoanFlexibleRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2959) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| [getCryptoLoanLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2977) | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| [getCryptoLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2984) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| [getCryptoLoanCollateralAssetsData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2993) | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| [getCryptoLoansIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3002) | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3017) | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3026) | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| [adjustCryptoLoanLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3035) | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| [customizeCryptoLoanMarginCall()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3044) | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| [getCryptoLoanOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3060) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| [getCryptoLoanBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3067) | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| [getCryptoLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3074) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| [getCryptoLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3083) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| [getSimpleEarnAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3095) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/account` |
| [getFlexibleSavingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3099) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/list` |
| [getSimpleEarnLockedProductList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3106) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/list` |
| [getFlexibleProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3115) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/position` |
| [getLockedProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3124) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/position` |
| [getFlexiblePersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3133) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| [getLockedPersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3142) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| [purchaseFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3157) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/subscribe` |
| [subscribeSimpleEarnLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3163) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/subscribe` |
| [redeemFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3169) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/redeem` |
| [redeemLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3175) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/redeem` |
| [setFlexibleAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3181) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| [setLockedAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3190) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| [getFlexibleSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3199) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| [getLockedSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3208) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| [setLockedProductRedeemOption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3217) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| [getFlexibleSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3235) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| [getLockedSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3247) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| [getFlexibleRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3259) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| [getLockedRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3271) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| [getFlexibleRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3281) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| [getLockedRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3291) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| [getCollateralRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3301) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| [getRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3311) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| [getVipBorrowInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3327) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| [getVipLoanInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3333) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/interestRateHistory` |
| [getVipLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3342) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| [getVipCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3349) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| [getVipLoanOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3362) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| [getVipLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3369) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| [checkVipCollateralAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3378) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| [getVipApplicationStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3385) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| [renewVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3398) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| [repayVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3402) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| [borrowVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3406) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3416) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| [subscribeDualInvestmentProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3431) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| [getDualInvestmentPositions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3437) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| [getDualInvestmentAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3446) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| [getVipLoanAccruedInterest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3450) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/accruedInterest` |
| [updateAutoCompoundStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3457) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| [createGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3472) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| [createDualTokenGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3476) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| [redeemGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3480) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| [verifyGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3484) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| [getTokenLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3488) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| [getRsaPublicKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3492) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| [getNftTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3502) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| [getNftDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3509) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| [getNftWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3516) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| [getNftAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3523) | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| [getC2CTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3536) | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| [getFiatOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3551) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| [getFiatPaymentsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3557) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| [getSpotRebateHistoryRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3569) | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| [getPortfolioMarginIndexPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3582) |  | GET | `sapi/v1/portfolio/asset-index-price` |
| [getPortfolioMarginAssetLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3588) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| [getPortfolioMarginProCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3594) |  | GET | `sapi/v1/portfolio/collateralRate` |
| [getPortfolioMarginProTieredCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3600) |  | GET | `sapi/v2/portfolio/collateralRate` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3611) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| [bnbTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3615) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| [submitPortfolioMarginProFullTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3621) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| [submitPortfolioMarginProSpecificTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3627) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| [repayPortfolioMarginProBankruptcyLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3633) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| [getPortfolioMarginProBankruptcyLoanAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3641) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| [repayFuturesNegativeBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3645) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| [updateAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3651) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| [getAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3657) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| [getPortfolioMarginProInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3663) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| [getPortfolioMarginProSpanAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3669) | :closed_lock_with_key:  | GET | `sapi/v2/portfolio/account` |
| [getPortfolioMarginProAccountBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3673) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/balance` |
| [mintPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3679) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/mint` |
| [redeemPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3685) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/redeem` |
| [getPortfolioMarginBankruptcyLoanRepayHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3693) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan-history` |
| [transferLDUSDTPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3708) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/earn-asset-transfer` |
| [getTransferableEarnAssetBalanceForPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3721) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/earn-asset-balance` |
| [getFuturesTickLevelOrderbookDataLink()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3738) | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| [getBlvtInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3752) |  | GET | `sapi/v1/blvt/tokenInfo` |
| [subscribeBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3756) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| [getBlvtSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3760) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| [redeemBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3766) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| [getBlvtRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3770) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| [getBlvtUserLimitInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3776) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| [getPayTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3787) | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| [createBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3797) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3803) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| [enableMarginBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3809) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| [createApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3815) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| [changePermissionApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3821) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [changeComissionBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3827) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [enableUniversalTransferApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3833) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| [updateIpRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3842) | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| [deleteIPRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3856) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| [deleteApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3872) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| [getSubAccountBrokerIpRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3878) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| [getApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3894) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| [getBrokerInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3900) | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| [updateSubAccountBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3904) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| [updateSubAccountMarginInterestBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3914) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| [getSubAccountBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3927) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| [deleteBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3943) | :closed_lock_with_key:  | DELETE | `/sapi/v1/broker/subAccount` |
| [transferBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3953) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| [getBrokerSubAccountHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3959) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| [submitBrokerSubFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3965) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| [getSubAccountFuturesTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3980) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| [getBrokerSubDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3992) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| [getBrokerSubAccountSpotAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3998) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| [getSubAccountMarginAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4007) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| [querySubAccountFuturesAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4016) | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| [universalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4025) | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| [getUniversalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4032) | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| [updateBrokerSubAccountCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4044) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| [updateBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4050) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| [getBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4059) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| [updateBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4068) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4077) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSpotCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4086) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| [getBrokerFuturesCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4092) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| [getBrokerIfNewSpotUser()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4129) | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| [getBrokerSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4140) | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| [enableFuturesBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4159) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [enableMarginApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4169) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| [getSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4206) |  | POST | `api/v3/userDataStream` |
| [keepAliveSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4210) |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| [closeSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4214) |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| [getMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4219) |  | POST | `sapi/v1/userDataStream` |
| [keepAliveMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4223) |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [closeMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4227) |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [getIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4232) |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [keepAliveIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4240) |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [closeIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4249) |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [getBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4272) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| [addBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4279) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| [removeBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4288) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| [getBSwapOperations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4297) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| [getLeftDailyPurchaseQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4312) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| [getLeftDailyRedemptionQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4321) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| [purchaseFixedAndActivityProject()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4335) | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| [getFixedAndActivityProjects()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4345) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| [getFixedAndActivityProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4354) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| [getLendingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4363) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| [getPurchaseRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4370) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| [getRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4377) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| [getInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4384) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| [changeFixedAndActivityPositionToDailyPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4391) | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| [enableConvertSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4408) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| [convertBUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4416) | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| [getConvertBUSDHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4423) | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

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
| [getFundingRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L187) |  | GET | `fapi/v1/fundingRate` |
| [getFundingRates()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L193) |  | GET | `fapi/v1/fundingInfo` |
| [get24hrChangeStatististics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L200) |  | GET | `fapi/v1/ticker/24hr` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L206) |  | GET | `fapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L216) |  | GET | `fapi/v1/ticker/price` |
| [getSymbolPriceTickerV2()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L226) |  | GET | `fapi/v2/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L236) |  | GET | `fapi/v1/ticker/bookTicker` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L248) |  | GET | `futures/data/delivery-price` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L254) |  | GET | `fapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L258) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L264) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L270) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L276) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L282) |  | GET | `futures/data/takerlongshortRatio` |
| [getHistoricalBlvtNavKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L286) |  | GET | `fapi/v1/lvtKlines` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L290) |  | GET | `fapi/v1/indexInfo` |
| [getMultiAssetsModeAssetIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L294) |  | GET | `fapi/v1/assetIndex` |
| [getBasis()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L301) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L305) |  | GET | `fapi/v1/constituents` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L317) | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L329) | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L358) | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L364) | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L372) | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L378) | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L382) | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L402) | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L409) | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L415) | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L419) | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L423) | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L427) | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L431) | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L435) | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L441) | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L445) | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L449) | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| [setMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L453) | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L459) | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L469) | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| [getPositionsV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L473) | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L477) | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L481) | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| [getBalanceV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L493) | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L501) | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| [getAccountInformationV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L505) | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L513) | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| [getAccountComissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L520) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L526) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getFuturesAccountConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L532) | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| [getFuturesSymbolConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L536) | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| [getUserForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L540) | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L547) | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| [getMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L553) | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L557) | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L561) | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| [getApiQuantitativeRulesIndicators()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L565) | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| [getFuturesTransactionHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L571) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L578) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| [getFuturesOrderHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L584) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L591) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| [getFuturesTradeHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L597) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| [getFuturesTradeDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L604) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| [setBNBBurnEnabled()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L610) | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| [getBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L616) | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| [testOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L622) | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| [getAllConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L633) |  | GET | `fapi/v1/convert/exchangeInfo` |
| [submitConvertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L640) | :closed_lock_with_key:  | POST | `fapi/v1/convert/getQuote` |
| [acceptConvertQuote()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L646) | :closed_lock_with_key:  | POST | `fapi/v1/convert/acceptQuote` |
| [getConvertOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L654) | :closed_lock_with_key:  | GET | `fapi/v1/convert/orderStatus` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L667) | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L684) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L697) | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L710) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L727) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L736) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L745) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L762) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L779) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L801) |  | POST | `fapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L805) |  | PUT | `fapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L809) |  | DELETE | `fapi/v1/listenKey` |

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