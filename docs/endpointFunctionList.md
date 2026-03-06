
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
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L724) |  | GET | `api/v3/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L728) |  | GET | `api/v3/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L748) |  | GET | `api/v3/depth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L752) |  | GET | `api/v3/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L756) |  | GET | `api/v3/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L760) |  | GET | `api/v3/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L766) |  | GET | `api/v3/klines` |
| [getUIKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L770) |  | GET | `api/v3/uiKlines` |
| [getAvgPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L774) |  | GET | `api/v3/avgPrice` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L778) |  | GET | `api/v3/ticker/24hr?symbols=` |
| [getTradingDayTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L808) |  | GET | `api/v3/ticker/tradingDay?symbols=` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L823) |  | GET | `api/v3/ticker/price?symbols=` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L840) |  | GET | `api/v3/ticker/bookTicker?symbols=` |
| [getRollingWindowTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L857) |  | GET | `api/v3/ticker?symbols=` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L879) | :closed_lock_with_key:  | POST | `api/v3/order` |
| [testNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L887) | :closed_lock_with_key:  | POST | `api/v3/order/test` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L895) | :closed_lock_with_key:  | GET | `api/v3/order` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L899) | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| [cancelAllSymbolOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L903) | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| [replaceOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L909) | :closed_lock_with_key:  | POST | `api/v3/order/cancelReplace` |
| [amendOrderKeepPriority()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L923) | :closed_lock_with_key:  | PUT | `fapi/v1/order/amend/keepPriority` |
| [getOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L930) | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L934) | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| [submitNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L941) | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| [submitNewOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L948) | :closed_lock_with_key:  | POST | `api/v3/orderList/oco` |
| [submitNewOrderListOTO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L957) | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| [submitNewOrderListOTOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L966) | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| [submitNewOrderListOPO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L976) | :closed_lock_with_key:  | POST | `api/v3/orderList/opo` |
| [submitNewOrderListOPOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L985) | :closed_lock_with_key:  | POST | `api/v3/orderList/opoco` |
| [cancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L995) | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| [getOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1000) | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| [getAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1004) | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| [getAllOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1011) | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| [submitNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1018) | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| [testNewSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1029) | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1045) | :closed_lock_with_key:  | GET | `api/v3/account` |
| [getAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1051) | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| [getOrderRateLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1057) | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| [getPreventedMatches()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1061) | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| [getAllocations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1067) | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| [getCommissionRates()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1071) | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| [getCrossMarginCollateralRatio()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1081) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| [getAllCrossMarginPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1090) |  | GET | `sapi/v1/margin/allPairs` |
| [getIsolatedMarginAllSymbols()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1094) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| [getAllMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1100) |  | GET | `sapi/v1/margin/allAssets` |
| [getMarginDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1104) | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| [getIsolatedMarginTierData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1108) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| [queryMarginPriceIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1114) |  | GET | `sapi/v1/margin/priceIndex` |
| [getMarginAvailableInventory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1120) | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| [getLeverageBracket()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1126) | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| [getNextHourlyInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1136) | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1142) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| [submitMarginAccountBorrowRepay()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1149) | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| [getMarginAccountBorrowRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1155) | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| [getMarginInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1161) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| [queryMaxBorrow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1167) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| [getMarginForceLiquidationRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1179) | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| [getSmallLiabilityExchangeCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1188) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| [getSmallLiabilityExchangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1192) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| [marginAccountCancelOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1204) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| [marginAccountCancelOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1210) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| [marginAccountCancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1215) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| [marginAccountNewOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1221) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| [marginAccountNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1228) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order` |
| [getMarginOrderCountUsage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1236) | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| [queryMarginAccountAllOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1242) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| [queryMarginAccountAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1248) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| [queryMarginAccountOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1254) | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| [queryMarginAccountOpenOCO()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1258) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| [queryMarginAccountOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1265) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| [queryMarginAccountOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1269) | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| [queryMarginAccountTradeList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1273) | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| [submitSmallLiabilityExchange()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1279) | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| [submitManualLiquidation()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1286) | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| [submitMarginOTOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1295) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oto` |
| [submitMarginOTOCOOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1307) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/otoco` |
| [createMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1320) | :closed_lock_with_key:  | POST | `sapi/v1/margin/apiKey` |
| [deleteMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1326) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/apiKey` |
| [updateMarginIPForSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1334) | :closed_lock_with_key:  | PUT | `sapi/v1/margin/apiKey/ip` |
| [getMarginSpecialLowLatencyKeys()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1345) | :closed_lock_with_key:  | GET | `sapi/v1/margin/api-key-list` |
| [getMarginSpecialLowLatencyKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1354) | :closed_lock_with_key:  | GET | `sapi/v1/margin/apiKey` |
| [getCrossMarginTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1367) | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| [queryMaxTransferOutAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1373) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| [updateCrossMarginMaxLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1385) | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| [disableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1391) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| [enableIsolatedMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1398) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| [getBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1405) | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| [getMarginSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1409) | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| [queryCrossMarginAccountDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1413) | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| [getCrossMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1417) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| [getIsolatedMarginAccountLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1423) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| [getIsolatedMarginAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1430) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| [getIsolatedMarginFeeData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1436) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| [toggleBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1442) | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| [getMarginCapitalFlow()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1450) | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| [queryLoanRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1459) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| [queryRepayRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1468) | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| [isolatedMarginAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1477) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| [getBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1489) | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| [withdraw()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1493) | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| [getWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1497) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| [getWithdrawAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1503) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| [getWithdrawQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1507) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/quota` |
| [getDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1514) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| [getDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1518) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| [getDepositAddresses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1524) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| [submitDepositCredit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1530) | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| [getAutoConvertStablecoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1539) | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| [setConvertibleCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1546) | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| [getAssetDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1559) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| [getWalletBalances()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1565) | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| [getUserAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1571) | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| [submitUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1575) | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| [getUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1581) | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| [getDust()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1587) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| [convertDustToBnb()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1591) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| [getDustLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1595) | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| [getAssetDividendRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1599) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| [getTradeFee()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1603) | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| [getFundingAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1607) | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| [getCloudMiningHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1611) | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| [getDelegationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1621) | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| [submitNewFutureAccountTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1651) | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| [getFutureAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1661) | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| [getCrossCollateralBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1670) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| [getCrossCollateralRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1677) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| [getCrossCollateralWalletV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1684) | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| [getAdjustCrossCollateralLTVHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1691) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| [getCrossCollateralLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1703) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| [getCrossCollateralInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1712) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| [getAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1724) | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| [getDailyAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1728) | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| [disableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1734) | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| [enableFastWithdrawSwitch()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1738) | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| [getAccountStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1742) | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| [getApiTradingStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1746) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| [getApiKeyPermissions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1750) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| [withdrawTravelRule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1766) | :closed_lock_with_key:  | POST | `sapi/v1/localentity/withdraw/apply` |
| [getTravelRuleWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1777) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/withdraw/history` |
| [getTravelRuleWithdrawHistoryV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1786) | :closed_lock_with_key:  | GET | `sapi/v2/localentity/withdraw/history` |
| [submitTravelRuleDepositQuestionnaire()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1798) | :closed_lock_with_key:  | PUT | `sapi/v1/localentity/deposit/provide-info` |
| [getTravelRuleDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1807) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/deposit/history` |
| [getOnboardedVASPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1818) | :closed_lock_with_key:  | GET | `sapi/v1/localentity/vasp` |
| [getSystemStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1828) |  | GET | `sapi/v1/system/status` |
| [getDelistSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1832) | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| [createVirtualSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1842) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| [getSubAccountList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1848) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| [subAccountEnableFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1854) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| [subAccountEnableMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1862) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| [enableOptionsForSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1866) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| [subAccountEnableLeverageToken()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1876) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| [getSubAccountStatusOnMarginOrFutures()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1882) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| [getSubAccountFuturesPositionRisk()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1888) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| [getSubAccountFuturesPositionRiskV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1896) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| [getSubAccountTransactionStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1902) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| [getSubAccountIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1917) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountDeleteIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1926) | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountAddIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1935) | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| [subAccountAddIPList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1948) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| [subAccountEnableOrDisableIPRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1961) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| [subAccountFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1976) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| [getSubAccountFuturesAccountDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1982) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| [getSubAccountDetailOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1988) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| [getSubAccountDetailOnMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1994) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| [getSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2000) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| [getSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2006) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| [getSubAccountFuturesAccountSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2012) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| [getSubAccountSummaryOnFuturesAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2016) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| [getSubAccountsSummaryOfMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2025) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| [subAccountMarginTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2029) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| [getSubAccountAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2035) | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| [getSubAccountAssetsMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2041) | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| [getSubAccountFuturesAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2047) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| [getSubAccountSpotAssetTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2056) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| [getSubAccountSpotAssetsSummary()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2062) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| [getSubAccountUniversalTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2068) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| [subAccountFuturesAssetTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2074) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| [subAccountTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2083) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| [subAccountTransferToMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2092) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| [subAccountTransferToSameMaster()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2098) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| [subAccountUniversalTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2104) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| [subAccountMovePosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2110) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/move-position` |
| [getSubAccountFuturesPositionMoveHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2119) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/move-position` |
| [depositAssetsIntoManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2134) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| [getManagedSubAccountDepositAddress()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2140) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| [withdrawAssetsFromManagedSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2149) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| [getManagedSubAccountTransfersParent()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2155) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| [getManagedSubAccountTransferLog()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2167) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| [getManagedSubAccountTransfersInvestor()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2179) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| [getManagedSubAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2191) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| [getManagedSubAccountSnapshot()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2198) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| [getManagedSubAccountAssetDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2207) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| [getManagedSubAccountMarginAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2213) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| [getManagedSubAccountFuturesAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2220) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| [getAutoInvestAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2236) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| [getAutoInvestSourceAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2243) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| [getAutoInvestTargetAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2252) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| [getAutoInvestTargetAssetsROI()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2261) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| [getAutoInvestIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2270) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| [getAutoInvestPlans()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2276) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| [submitAutoInvestOneTimeTransaction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2294) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| [updateAutoInvestPlanStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2310) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| [updateAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2319) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| [submitAutoInvestRedemption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2336) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| [getAutoInvestSubscriptionTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2344) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| [getOneTimeTransactionStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2350) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| [submitAutoInvestmentPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2359) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| [getAutoInvestRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2374) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| [getAutoInvestPlan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2383) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| [getAutoInvestUserIndex()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2387) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| [getAutoInvestRebalanceHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2396) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| [getConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2411) | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| [getConvertAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2415) | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| [convertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2425) | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| [acceptQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2429) | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| [getConvertTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2433) | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| [getOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2437) | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| [submitConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2441) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| [cancelConvertLimitOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2445) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| [getConvertLimitOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2449) | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| [getEthStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2464) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| [getEthStakingAccountV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2468) | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| [getEthStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2472) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| [subscribeEthStakingV1()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2485) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| [subscribeEthStakingV2()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2491) | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| [redeemEth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2497) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| [wrapBeth()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2501) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| [getEthStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2511) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| [getEthRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2521) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| [getBethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2531) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| [getWbethRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2541) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| [getEthRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2550) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| [getBethWrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2560) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| [getBethUnwrapHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2570) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| [getStakingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2583) | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| [getStakingProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2594) | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| [getStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2606) | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| [getPersonalLeftQuotaOfStakingProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2613) | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| [getSolStakingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2626) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/account` |
| [getSolStakingQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2630) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/quota` |
| [subscribeSolStaking()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2640) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/stake` |
| [redeemSol()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2646) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/redeem` |
| [claimSolBoostRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2650) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/claim` |
| [getSolStakingHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2662) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/stakingHistory` |
| [getSolRedemptionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2672) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/redemptionHistory` |
| [getBnsolRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2682) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/bnsolRewardsHistory` |
| [getBnsolRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2693) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/rateHistory` |
| [getSolBoostRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2703) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/boostRewardsHistory` |
| [getSolUnclaimedRewards()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2713) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/unclaimedRewards` |
| [getOnchainYieldsLockedProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2728) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/list` |
| [getOnchainYieldsLockedPersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2734) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/personalLeftQuota` |
| [getOnchainYieldsLockedPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2743) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/position` |
| [getOnchainYieldsAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2749) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/account` |
| [getOnchainYieldsLockedSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2759) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/subscriptionPreview` |
| [subscribeOnchainYieldsLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2768) | :closed_lock_with_key:  | POST | `sapi/v1/onchain-yields/locked/subscribe` |
| [setOnchainYieldsLockedAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2774) | :closed_lock_with_key:  | POST | `sapi/v1/onchain-yields/locked/setAutoSubscribe` |
| [setOnchainYieldsLockedRedeemOption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2783) | :closed_lock_with_key:  | POST | `sapi/v1/onchain-yields/locked/setRedeemOption` |
| [redeemOnchainYieldsLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2792) | :closed_lock_with_key:  | POST | `sapi/v1/onchain-yields/locked/redeem` |
| [getOnchainYieldsLockedSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2804) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/history/subscriptionRecord` |
| [getOnchainYieldsLockedRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2813) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/history/rewardsRecord` |
| [getOnchainYieldsLockedRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2822) | :closed_lock_with_key:  | GET | `sapi/v1/onchain-yields/locked/history/redemptionRecord` |
| [getSoftStakingProductList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2837) | :closed_lock_with_key:  | GET | `sapi/v1/soft-staking/list` |
| [setSoftStaking()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2843) | :closed_lock_with_key:  | GET | `sapi/v1/soft-staking/set` |
| [getSoftStakingRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2849) | :closed_lock_with_key:  | GET | `sapi/v1/soft-staking/history/rewardsRecord` |
| [getFuturesLeadTraderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2864) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| [getFuturesLeadTradingSymbolWhitelist()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2868) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| [getMiningAlgos()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2880) |  | GET | `sapi/v1/mining/pub/algoList` |
| [getMiningCoins()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2884) |  | GET | `sapi/v1/mining/pub/coinList` |
| [getHashrateResales()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2888) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| [getMiners()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2897) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| [getMinerDetails()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2901) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| [getExtraBonuses()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2907) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| [getMiningEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2913) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| [cancelHashrateResaleConfig()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2919) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| [getHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2928) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| [getMiningAccountEarnings()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2937) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| [getMiningStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2943) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| [submitHashrateResale()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2949) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| [getMiningAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2953) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| [submitVpNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2965) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| [submitTwapNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2972) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| [cancelAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2979) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| [getAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2985) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| [getAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2991) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| [getAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2998) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| [submitSpotAlgoTwapOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3011) | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| [cancelSpotAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3018) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| [getSpotAlgoSubOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3024) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| [getSpotAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3030) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| [getSpotAlgoHistoricalOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3037) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| [getCryptoLoanFlexibleCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3052) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| [getCryptoLoanFlexibleAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3061) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| [borrowCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3074) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| [repayCryptoLoanFlexible()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3080) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| [repayCryptoLoanFlexibleWithCollateral()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3086) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay/collateral` |
| [adjustCryptoLoanFlexibleLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3092) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| [getCryptoLoanFlexibleLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3104) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| [getFlexibleLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3116) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/rate` |
| [getLoanFlexibleBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3127) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| [getCryptoLoanFlexibleOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3136) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| [getFlexibleLoanLiquidationHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3145) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/liquidation/history` |
| [getLoanFlexibleRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3154) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| [getCryptoLoanLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3172) | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| [getCryptoLoanCollateralRepayRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3179) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| [getCryptoLoanCollateralAssetsData()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3188) | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| [getCryptoLoansIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3197) | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3212) | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3221) | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| [adjustCryptoLoanLTV()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3230) | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| [customizeCryptoLoanMarginCall()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3239) | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| [getCryptoLoanOngoingOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3255) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| [getCryptoLoanBorrowHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3262) | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| [getCryptoLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3269) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| [getCryptoLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3278) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| [getSimpleEarnAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3290) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/account` |
| [getFlexibleSavingProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3294) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/list` |
| [getSimpleEarnLockedProductList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3301) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/list` |
| [getFlexibleProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3310) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/position` |
| [getLockedProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3319) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/position` |
| [getFlexiblePersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3328) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| [getLockedPersonalLeftQuota()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3337) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| [purchaseFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3352) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/subscribe` |
| [subscribeSimpleEarnLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3358) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/subscribe` |
| [redeemFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3364) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/redeem` |
| [redeemLockedProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3370) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/redeem` |
| [setFlexibleAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3376) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| [setLockedAutoSubscribe()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3385) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| [getFlexibleSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3394) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| [getLockedSubscriptionPreview()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3403) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| [setLockedProductRedeemOption()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3412) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| [getFlexibleSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3430) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| [getLockedSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3442) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| [getFlexibleRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3454) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| [getLockedRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3466) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| [getFlexibleRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3476) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| [getLockedRewardsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3486) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| [getCollateralRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3496) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| [getRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3506) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| [getVipBorrowInterestRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3522) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| [getVipLoanInterestRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3528) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/interestRateHistory` |
| [getVipLoanableAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3537) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| [getVipCollateralAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3544) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| [getVipLoanOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3557) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| [getVipLoanRepaymentHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3564) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| [checkVipCollateralAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3573) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| [getVipApplicationStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3580) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| [renewVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3593) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| [repayVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3597) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| [borrowVipLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3601) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3611) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| [subscribeDualInvestmentProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3626) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| [getDualInvestmentPositions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3632) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| [getDualInvestmentAccounts()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3641) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| [getVipLoanAccruedInterest()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3645) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/accruedInterest` |
| [updateAutoCompoundStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3652) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| [createGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3667) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| [createDualTokenGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3671) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| [redeemGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3675) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| [verifyGiftCard()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3679) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| [getTokenLimit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3683) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| [getRsaPublicKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3687) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| [getNftTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3697) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| [getNftDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3704) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| [getNftWithdrawHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3711) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| [getNftAsset()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3718) | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| [getC2CTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3731) | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| [getFiatOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3746) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| [getFiatPaymentsHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3752) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| [fiatWithdraw()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3758) | :closed_lock_with_key:  | POST | `/sapi/v2/fiat/withdraw` |
| [fiatDeposit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3762) | :closed_lock_with_key:  | POST | `sapi/v1/fiat/deposit` |
| [getFiatOrderDetail()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3766) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/get-order-detail` |
| [getSpotRebateHistoryRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3778) | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| [getPortfolioMarginIndexPrice()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3791) |  | GET | `sapi/v1/portfolio/asset-index-price` |
| [getPortfolioMarginAssetLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3797) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| [getPortfolioMarginProCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3803) |  | GET | `sapi/v1/portfolio/collateralRate` |
| [getPortfolioMarginProTieredCollateralRate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3809) |  | GET | `sapi/v2/portfolio/collateralRate` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3820) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| [bnbTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3824) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| [submitPortfolioMarginProFullTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3830) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| [submitPortfolioMarginProSpecificTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3836) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| [repayPortfolioMarginProBankruptcyLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3842) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| [getPortfolioMarginProBankruptcyLoanAmount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3850) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| [repayFuturesNegativeBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3854) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| [updateAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3860) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| [getAutoRepayFuturesStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3866) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| [getPortfolioMarginProInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3872) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| [getPortfolioMarginProSpanAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3878) | :closed_lock_with_key:  | GET | `sapi/v2/portfolio/account` |
| [getPortfolioMarginProAccountBalance()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3882) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/balance` |
| [mintPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3892) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/mint` |
| [redeemPortfolioMarginBFUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3902) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/redeem` |
| [getPortfolioMarginBankruptcyLoanRepayHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3910) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan-history` |
| [transferLDUSDTPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3925) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/earn-asset-transfer` |
| [getTransferableEarnAssetBalanceForPortfolioMargin()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3938) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/earn-asset-balance` |
| [getFuturesTickLevelOrderbookDataLink()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3955) | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| [getBlvtInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3969) |  | GET | `sapi/v1/blvt/tokenInfo` |
| [subscribeBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3973) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| [getBlvtSubscriptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3977) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| [redeemBlvt()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3983) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| [getBlvtRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3987) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| [getBlvtUserLimitInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3993) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| [getPayTransactions()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4004) | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| [getInstLoanRiskUnit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4014) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-group/ltv-details` |
| [closeInstLoanRiskUnit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4020) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/loan-group` |
| [addInstLoanCollateralAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4024) | :closed_lock_with_key:  | POST | `sapi/v1/margin/loan-group/edit-member` |
| [getActiveInstLoanRiskUnits()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4030) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-groups/activated` |
| [getClosedInstLoanRiskUnits()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4034) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-groups/closed` |
| [getInstLoanForceLiquidationRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4046) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-group/force-liquidation` |
| [transferInstLoanRiskUnit()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4060) | :closed_lock_with_key:  | POST | `sapi/v1/margin/loan-group/transfer-out` |
| [borrowInstitutionalLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4072) | :closed_lock_with_key:  | POST | `sapi/v1/margin/loan-group/borrow` |
| [getInstLoanInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4078) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-group/interest-history` |
| [repayInstitutionalLoan()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4087) | :closed_lock_with_key:  | POST | `sapi/v1/margin/loan-group/repay` |
| [getInstLoanBorrowRepayRecords()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4093) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan-group/borrow-repay` |
| [getAlphaTokenList()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4105) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getAlphaExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4112) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getAlphaAggTrades()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4119) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getAlphaKlines()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4127) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getAlphaTicker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4135) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [createBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4149) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [getBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4155) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| [enableMarginBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4161) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| [createApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4167) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| [changePermissionApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4173) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [changeComissionBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4179) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| [enableUniversalTransferApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4185) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| [updateIpRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4194) | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| [deleteIPRestrictionForSubAccountApiKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4208) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| [deleteApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4224) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| [getSubAccountBrokerIpRestriction()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4230) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| [getApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4246) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| [getBrokerInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4252) | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| [updateSubAccountBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4256) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| [updateSubAccountMarginInterestBNBBurn()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4266) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| [getSubAccountBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4279) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| [deleteBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4295) | :closed_lock_with_key:  | DELETE | `/sapi/v1/broker/subAccount` |
| [transferBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4305) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| [getBrokerSubAccountHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4311) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| [submitBrokerSubFuturesTransfer()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4317) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| [getSubAccountFuturesTransferHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4332) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| [getBrokerSubDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4344) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| [getBrokerSubAccountSpotAssets()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4350) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| [getSubAccountMarginAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4359) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| [querySubAccountFuturesAssetInfo()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4368) | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| [universalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4377) | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| [getUniversalTransferBroker()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4384) | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| [updateBrokerSubAccountCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4396) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| [updateBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4402) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| [getBrokerSubAccountFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4411) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| [updateBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4420) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSubAccountCoinFuturesCommission()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4429) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| [getBrokerSpotCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4438) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| [getBrokerFuturesCommissionRebate()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4444) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| [getBrokerIfNewSpotUser()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4481) | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| [getBrokerSubAccountDepositHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4492) | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| [enableFuturesBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4511) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| [enableMarginApiKeyBrokerSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4521) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| [getSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4562) |  | POST | `api/v3/userDataStream` |
| [keepAliveSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4566) |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| [closeSpotUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4570) |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| [getMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4577) |  | POST | `sapi/v1/userDataStream` |
| [keepAliveMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4581) |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [closeMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4585) |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| [getIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4590) |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [keepAliveIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4598) |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [closeIsolatedMarginUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4607) |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params` |
| [getMarginRiskUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4619) |  | POST | `sapi/v1/margin/listen-key` |
| [keepAliveMarginRiskUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4623) |  | PUT | `sapi/v1/margin/listen-key?listenKey=${listenKey}` |
| [closeMarginRiskUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4627) |  | DELETE | `sapi/v1/margin/listen-key` |
| [getMarginListenToken()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4635) | :closed_lock_with_key:  | POST | `sapi/v1/userListenToken` |
| [getBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4657) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| [addBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4664) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| [removeBSwapLiquidity()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4673) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| [getBSwapOperations()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4682) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| [getLeftDailyPurchaseQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4697) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| [getLeftDailyRedemptionQuotaFlexibleProduct()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4706) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| [purchaseFixedAndActivityProject()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4720) | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| [getFixedAndActivityProjects()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4730) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| [getFixedAndActivityProductPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4739) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| [getLendingAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4748) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| [getPurchaseRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4755) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| [getRedemptionRecord()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4762) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| [getInterestHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4769) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| [changeFixedAndActivityPositionToDailyPosition()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4776) | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| [enableConvertSubAccount()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4793) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| [convertBUSD()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4801) | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| [getConvertBUSDHistory()](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4808) | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

# usdm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [usdm-client.ts](/src/usdm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [testConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L142) |  | GET | `fapi/v1/ping` |
| [getExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L146) |  | GET | `fapi/v1/exchangeInfo` |
| [getOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L150) |  | GET | `fapi/v1/depth` |
| [getRpiOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L154) |  | GET | `fapi/v1/rpiDepth` |
| [getRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L161) |  | GET | `fapi/v1/trades` |
| [getHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L165) |  | GET | `fapi/v1/historicalTrades` |
| [getAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L171) |  | GET | `fapi/v1/aggTrades` |
| [getKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L177) |  | GET | `fapi/v1/klines` |
| [getContinuousContractKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L181) |  | GET | `fapi/v1/continuousKlines` |
| [getIndexPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L187) |  | GET | `fapi/v1/indexPriceKlines` |
| [getMarkPriceKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L191) |  | GET | `fapi/v1/markPriceKlines` |
| [getPremiumIndexKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L195) |  | GET | `fapi/v1/premiumIndexKlines` |
| [getMarkPrice()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L199) |  | GET | `fapi/v1/premiumIndex` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L207) |  | GET | `fapi/v1/fundingRate` |
| [getFundingRates()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L213) |  | GET | `fapi/v1/fundingInfo` |
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L217) |  | GET | `fapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L227) |  | GET | `fapi/v1/ticker/price` |
| [getSymbolPriceTickerV2()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L237) |  | GET | `fapi/v2/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L247) |  | GET | `fapi/v1/ticker/bookTicker` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L259) |  | GET | `futures/data/delivery-price` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L265) |  | GET | `fapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L269) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L275) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L281) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L287) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L293) |  | GET | `futures/data/takerlongshortRatio` |
| [getHistoricalBlvtNavKlines()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L297) |  | GET | `fapi/v1/lvtKlines` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L301) |  | GET | `fapi/v1/indexInfo` |
| [getMultiAssetsModeAssetIndex()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L305) |  | GET | `fapi/v1/assetIndex` |
| [getBasis()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L312) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L316) |  | GET | `fapi/v1/constituents` |
| [getInsuranceFundBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L322) |  | GET | `fapi/v1/insuranceBalance` |
| [getTradingSchedule()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L328) |  | GET | `fapi/v1/tradingSchedule` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L338) | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L350) | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L379) | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L385) | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L393) | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L399) | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L403) | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L423) | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L430) | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L436) | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L440) | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L444) | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L448) | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L452) | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L456) | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L462) | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L466) | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L470) | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| [setMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L474) | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L480) | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L490) | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| [getPositionsV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L494) | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L498) | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| [getSymbolAdlRisk()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L502) |  | GET | `fapi/v1/symbolAdlRisk` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L512) | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| [getBalanceV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L524) | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L532) | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| [getAccountInformationV3()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L536) | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L544) | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L548) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| [getFuturesAccountConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L554) | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| [getFuturesSymbolConfig()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L558) | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| [getUserForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L562) | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L569) | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| [getMultiAssetsMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L575) | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L579) | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L583) | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| [getApiQuantitativeRulesIndicators()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L587) | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| [getFuturesTransactionHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L593) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L600) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| [getFuturesOrderHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L606) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L613) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| [getFuturesTradeHistoryDownloadId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L619) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| [getFuturesTradeDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L626) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| [setBNBBurnEnabled()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L632) | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| [getBNBBurnStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L638) | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| [signTradFiPerpsAgreement()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L644) | :closed_lock_with_key:  | POST | `fapi/v1/stock/contract` |
| [testOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L648) | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| [submitNewAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L660) | :closed_lock_with_key:  | POST | `fapi/v1/algoOrder` |
| [cancelAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L667) | :closed_lock_with_key:  | DELETE | `fapi/v1/algoOrder` |
| [cancelAllAlgoOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L673) | :closed_lock_with_key:  | DELETE | `fapi/v1/algoOpenOrders` |
| [getAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L679) | :closed_lock_with_key:  | GET | `fapi/v1/algoOrder` |
| [getOpenAlgoOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L685) | :closed_lock_with_key:  | GET | `fapi/v1/openAlgoOrders` |
| [getAllAlgoOrders()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L691) | :closed_lock_with_key:  | GET | `fapi/v1/allAlgoOrders` |
| [getAllConvertPairs()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L703) |  | GET | `fapi/v1/convert/exchangeInfo` |
| [submitConvertQuoteRequest()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L710) | :closed_lock_with_key:  | POST | `fapi/v1/convert/getQuote` |
| [acceptConvertQuote()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L716) | :closed_lock_with_key:  | POST | `fapi/v1/convert/acceptQuote` |
| [getConvertOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L724) | :closed_lock_with_key:  | GET | `fapi/v1/convert/orderStatus` |
| [getPortfolioMarginProAccountInfo()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L737) | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L754) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L767) | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L780) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L797) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L806) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L815) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L832) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L849) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L871) |  | POST | `fapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L875) |  | PUT | `fapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L879) |  | DELETE | `fapi/v1/listenKey` |

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
| [get24hrChangeStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L189) |  | GET | `dapi/v1/ticker/24hr` |
| [getSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L196) |  | GET | `dapi/v1/ticker/price` |
| [getSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L203) |  | GET | `dapi/v1/ticker/bookTicker` |
| [getOpenInterest()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L212) |  | GET | `dapi/v1/openInterest` |
| [getOpenInterestStatistics()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L216) |  | GET | `futures/data/openInterestHist` |
| [getTopTradersLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L220) |  | GET | `futures/data/topLongShortAccountRatio` |
| [getTopTradersLongShortPositionRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L226) |  | GET | `futures/data/topLongShortPositionRatio` |
| [getGlobalLongShortAccountRatio()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L232) |  | GET | `futures/data/globalLongShortAccountRatio` |
| [getTakerBuySellVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L238) |  | GET | `futures/data/takerBuySellVol` |
| [getCompositeSymbolIndex()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L244) |  | GET | `futures/data/basis` |
| [getIndexPriceConstituents()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L252) |  | GET | `dapi/v1/constituents` |
| [getQuarterlyContractSettlementPrices()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L262) |  | GET | `futures/data/delivery-price` |
| [submitNewOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L274) | :closed_lock_with_key:  | POST | `dapi/v1/order` |
| [submitMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L284) | :closed_lock_with_key:  | POST | `dapi/v1/batchOrders` |
| [modifyOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L301) | :closed_lock_with_key:  | PUT | `dapi/v1/order` |
| [modifyMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L310) | :closed_lock_with_key:  | PUT | `dapi/v1/batchOrders` |
| [getOrderModifyHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L323) | :closed_lock_with_key:  | GET | `dapi/v1/orderAmendment` |
| [cancelOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L329) | :closed_lock_with_key:  | DELETE | `dapi/v1/order` |
| [cancelMultipleOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L333) | :closed_lock_with_key:  | DELETE | `dapi/v1/batchOrders` |
| [cancelAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L353) | :closed_lock_with_key:  | DELETE | `dapi/v1/allOpenOrders` |
| [setCancelOrdersOnTimeout()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L360) | :closed_lock_with_key:  | POST | `dapi/v1/countdownCancelAll` |
| [getOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L366) | :closed_lock_with_key:  | GET | `dapi/v1/order` |
| [getAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L370) | :closed_lock_with_key:  | GET | `dapi/v1/allOrders` |
| [getAllOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L374) | :closed_lock_with_key:  | GET | `dapi/v1/openOrders` |
| [getCurrentOpenOrder()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L378) | :closed_lock_with_key:  | GET | `dapi/v1/openOrder` |
| [getForceOrders()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L382) | :closed_lock_with_key:  | GET | `dapi/v1/forceOrders` |
| [getAccountTrades()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L386) | :closed_lock_with_key:  | GET | `dapi/v1/userTrades` |
| [getPositions()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L392) | :closed_lock_with_key:  | GET | `dapi/v1/positionRisk` |
| [setPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L399) | :closed_lock_with_key:  | POST | `dapi/v1/positionSide/dual` |
| [setMarginType()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L403) | :closed_lock_with_key:  | POST | `dapi/v1/marginType` |
| [setLeverage()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L407) | :closed_lock_with_key:  | POST | `dapi/v1/leverage` |
| [getADLQuantileEstimation()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L411) | :closed_lock_with_key:  | GET | `dapi/v1/adlQuantile` |
| [setIsolatedPositionMargin()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L415) | :closed_lock_with_key:  | POST | `dapi/v1/positionMargin` |
| [getPositionMarginChangeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L421) | :closed_lock_with_key:  | GET | `dapi/v1/positionMargin/history` |
| [getBalance()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L432) | :closed_lock_with_key:  | GET | `dapi/v1/balance` |
| [getAccountCommissionRate()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L436) | :closed_lock_with_key:  | GET | `dapi/v1/commissionRate` |
| [getAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L442) | :closed_lock_with_key:  | GET | `dapi/v1/account` |
| [getNotionalAndLeverageBrackets()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L449) | :closed_lock_with_key:  | GET | `dapi/v2/leverageBracket` |
| [getCurrentPositionMode()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L458) | :closed_lock_with_key:  | GET | `dapi/v1/positionSide/dual` |
| [getIncomeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L462) | :closed_lock_with_key:  | GET | `dapi/v1/income` |
| [getDownloadIdForFuturesTransactionHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L466) | :closed_lock_with_key:  | GET | `dapi/v1/income/asyn` |
| [getFuturesTransactionHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L476) | :closed_lock_with_key:  | GET | `dapi/v1/income/asyn/id` |
| [getDownloadIdForFuturesOrderHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L482) | :closed_lock_with_key:  | GET | `dapi/v1/order/asyn` |
| [getFuturesOrderHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L492) | :closed_lock_with_key:  | GET | `dapi/v1/order/asyn/id` |
| [getDownloadIdForFuturesTradeHistory()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L498) | :closed_lock_with_key:  | GET | `dapi/v1/trade/asyn` |
| [getFuturesTradeHistoryDownloadLink()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L508) | :closed_lock_with_key:  | GET | `dapi/v1/trade/asyn/id` |
| [getClassicPortfolioMarginAccount()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L520) | :closed_lock_with_key:  | GET | `dapi/v1/pmAccountInfo` |
| [getClassicPortfolioMarginNotionalLimits()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L529) | :closed_lock_with_key:  | GET | `dapi/v1/pmExchangeInfo` |
| [getBrokerIfNewFuturesUser()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L548) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/ifNewUser` |
| [setBrokerCustomIdForClient()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L561) | :closed_lock_with_key:  | POST | `dapi/v1/apiReferral/customization` |
| [getBrokerClientCustomIds()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L574) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/customization` |
| [getBrokerUserCustomId()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L591) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/userCustomization` |
| [getBrokerRebateDataOverview()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L600) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/overview` |
| [getBrokerUserTradeVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L609) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/tradeVol` |
| [getBrokerRebateVolume()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L626) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/rebateVol` |
| [getBrokerTradeDetail()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L643) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/traderSummary` |
| [getFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L663) |  | POST | `dapi/v1/listenKey` |
| [keepAliveFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L667) |  | PUT | `dapi/v1/listenKey` |
| [closeFuturesUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L671) |  | DELETE | `dapi/v1/listenKey` |

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
| [getPMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L830) |  | POST | `papi/v1/listenKey` |
| [keepAlivePMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L834) |  | PUT | `papi/v1/listenKey` |
| [closePMUserDataListenKey()](https://github.com/tiagosiebler/binance/blob/master/src/portfolio-client.ts#L838) |  | DELETE | `papi/v1/listenKey` |

# websocket-api-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [websocket-api-client.ts](/src/websocket-api-client.ts). 

This client provides WebSocket API endpoints which allow for faster interactions with the Binance API via a WebSocket connection.

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [disconnectAll()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L252) |  | WS | `ping` |
| [testSpotConnectivity()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L265) |  | WS | `ping` |
| [getSpotServerTime()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L277) |  | WS | `time` |
| [getSpotExchangeInfo()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L291) |  | WS | `exchangeInfo` |
| [getSpotOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L313) |  | WS | `depth` |
| [getSpotRecentTrades()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L329) |  | WS | `trades.recent` |
| [getSpotHistoricalTrades()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L345) |  | WS | `trades.historical` |
| [getSpotAggregateTrades()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L361) |  | WS | `trades.aggregate` |
| [getSpotKlines()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L377) |  | WS | `klines` |
| [getSpotUIKlines()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L393) |  | WS | `uiKlines` |
| [getSpotAveragePrice()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L408) |  | WS | `avgPrice` |
| [getSpot24hrTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L424) |  | WS | `ticker.24hr` |
| [getSpotTradingDayTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L443) |  | WS | `ticker.tradingDay` |
| [getSpotTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L463) |  | WS | `ticker` |
| [getSpotSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L483) |  | WS | `ticker.price` |
| [getSpotSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L499) |  | WS | `ticker.book` |
| [getSpotSessionStatus()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L519) |  | WS | `session.status` |
| [submitNewSpotOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L537) |  | WS | `order.place` |
| [testSpotOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L552) |  | WS | `order.test` |
| [getSpotOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L569) |  | WS | `order.status` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L584) |  | WS | `order.cancel` |
| [cancelReplaceSpotOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L599) |  | WS | `order.cancelReplace` |
| [amendSpotOrderKeepPriority()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L615) |  | WS | `order.amend.keepPriority` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L630) |  | WS | `openOrders.status` |
| [cancelAllSpotOpenOrders()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L645) |  | WS | `openOrders.cancelAll` |
| [placeSpotOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L662) |  | WS | `orderList.place` |
| [placeSpotOCOOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L677) |  | WS | `orderList.place.oco` |
| [placeSpotOTOOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L692) |  | WS | `orderList.place.oto` |
| [placeSpotOTOCOOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L707) |  | WS | `orderList.place.otoco` |
| [placeSpotOPOOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L722) |  | WS | `orderList.place.opo` |
| [placeSpotOPOCOOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L737) |  | WS | `orderList.place.opoco` |
| [getSpotOrderListStatus()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L752) |  | WS | `orderList.status` |
| [cancelSpotOrderList()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L767) |  | WS | `orderList.cancel` |
| [getSpotOpenOrderLists()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L782) |  | WS | `openOrderLists.status` |
| [placeSpotSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L797) |  | WS | `sor.order.place` |
| [testSpotSOROrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L812) |  | WS | `sor.order.test` |
| [getSpotAccountInformation()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L837) |  | WS | `account.status` |
| [getSpotOrderRateLimits()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L852) |  | WS | `account.rateLimits.orders` |
| [getSpotAllOrders()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L867) |  | WS | `allOrders` |
| [getSpotAllOrderLists()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L882) |  | WS | `allOrderLists` |
| [getSpotMyTrades()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L897) |  | WS | `myTrades` |
| [getSpotPreventedMatches()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L912) |  | WS | `myPreventedMatches` |
| [getSpotAllocations()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L927) |  | WS | `myAllocations` |
| [getSpotAccountCommission()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L942) |  | WS | `account.commission` |
| [getFuturesOrderBook()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L963) |  | WS | `depth` |
| [getFuturesSymbolPriceTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L978) |  | WS | `ticker.price` |
| [getFuturesSymbolOrderBookTicker()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L995) |  | WS | `ticker.book` |
| [submitNewFuturesOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1017) |  | WS | `order.place` |
| [modifyFuturesOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1033) |  | WS | `order.modify` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1049) |  | WS | `order.cancel` |
| [getFuturesOrderStatus()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1065) |  | WS | `order.status` |
| [getFuturesPositionV2()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1080) |  | WS | `v2/account.position` |
| [getFuturesPosition()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1096) |  | WS | `account.position` |
| [submitNewFuturesAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1112) |  | WS | `algoOrder.place` |
| [cancelFuturesAlgoOrder()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1128) |  | WS | `algoOrder.cancel` |
| [getFuturesAccountBalanceV2()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1148) |  | WS | `v2/account.balance` |
| [getFuturesAccountBalance()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1164) |  | WS | `account.balance` |
| [getFuturesAccountStatusV2()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1179) |  | WS | `v2/account.status` |
| [getFuturesAccountStatus()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1195) |  | WS | `account.status` |
| [startUserDataStreamForKey()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1221) |  | WS | `userDataStream.start` |
| [pingUserDataStreamForKey()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1241) |  | WS | `userDataStream.ping` |
| [stopUserDataStreamForKey()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1255) |  | WS | `userDataStream.stop` |
| [subscribeUserDataStream()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1286) |  | WS | `userDataStream.unsubscribe` |
| [unsubscribeUserDataStream()](https://github.com/tiagosiebler/binance/blob/master/src/websocket-api-client.ts#L1415) |  | WS | `userDataStream.unsubscribe` |