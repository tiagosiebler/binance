
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
| ['testConnectivity()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L571) |  | GET | `api/v3/ping` |
| ['getExchangeInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L575) |  | GET | `api/v3/exchangeInfo` |
| ['getOrderBook()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L595) |  | GET | `api/v3/depth` |
| ['getRecentTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L599) |  | GET | `api/v3/trades` |
| ['getHistoricalTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L603) |  | GET | `api/v3/historicalTrades` |
| ['getAggregateTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L607) |  | GET | `api/v3/aggTrades` |
| ['getKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L613) |  | GET | `api/v3/klines` |
| ['getUIKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L617) |  | GET | `api/v3/uiKlines` |
| ['getAvgPrice()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L621) |  | GET | `api/v3/avgPrice` |
| ['get24hrChangeStatististics()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L625) |  | GET | `api/v3/ticker/24hr` |
| ['getTradingDayTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L650) |  | GET | `api/v3/ticker/tradingDay` |
| ['getSymbolPriceTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L656) |  | GET | `api/v3/ticker/price` |
| ['getSymbolOrderBookTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L662) |  | GET | `api/v3/ticker/bookTicker` |
| ['getRollingWindowTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L668) |  | GET | `api/v3/ticker` |
| ['getOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L696) | :closed_lock_with_key:  | GET | `api/v3/order` |
| ['cancelOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L700) | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| ['cancelAllSymbolOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L704) | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| ['getOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L719) | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| ['getAllOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L723) | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| ['submitNewOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L730) | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| ['submitNewOrderListOTO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L747) | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| ['submitNewOrderListOTOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L757) | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| ['cancelOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L767) | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| ['getOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L772) | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| ['getAllOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L776) | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| ['getAllOpenOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L783) | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| ['submitNewSOROrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L790) | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| ['testNewSOROrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L801) | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| ['getAccountInformation()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L817) | :closed_lock_with_key:  | GET | `api/v3/account` |
| ['getAccountTradeList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L821) | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| ['getOrderRateLimit()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L827) | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| ['getPreventedMatches()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L831) | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| ['getAllocations()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L837) | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| ['getCommissionRates()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L841) | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| ['getCrossMarginCollateralRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L851) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| ['getAllCrossMarginPairs()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L860) |  | GET | `sapi/v1/margin/allPairs` |
| ['getIsolatedMarginAllSymbols()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L864) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| ['getAllMarginAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L870) |  | GET | `sapi/v1/margin/allAssets` |
| ['getMarginDelistSchedule()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L874) | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| ['getIsolatedMarginTierData()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L878) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| ['queryMarginPriceIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L884) |  | GET | `sapi/v1/margin/priceIndex` |
| ['getMarginAvailableInventory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L890) | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| ['getLeverageBracket()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L896) | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| ['getNextHourlyInterestRate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L906) | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| ['getMarginInterestHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L912) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| ['submitMarginAccountBorrowRepay()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L919) | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| ['getMarginAccountBorrowRepayRecords()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L925) | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| ['getMarginInterestRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L931) | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| ['queryMaxBorrow()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L937) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| ['getMarginForceLiquidationRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L949) | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| ['getSmallLiabilityExchangeCoins()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L958) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| ['getSmallLiabilityExchangeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L962) | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| ['marginAccountCancelOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L974) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| ['marginAccountCancelOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L980) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| ['marginAccountCancelOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L985) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| ['marginAccountNewOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L991) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| ['getMarginOrderCountUsage()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1006) | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| ['queryMarginAccountAllOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1012) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| ['queryMarginAccountAllOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1018) | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| ['queryMarginAccountOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1024) | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| ['queryMarginAccountOpenOCO()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1028) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| ['queryMarginAccountOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1035) | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| ['queryMarginAccountOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1039) | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| ['queryMarginAccountTradeList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1043) | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| ['submitSmallLiabilityExchange()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1049) | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| ['submitManualLiquidation()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1056) | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| ['submitMarginOTOOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1065) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oto` |
| ['submitMarginOTOCOOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1077) | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/otoco` |
| ['createMarginSpecialLowLatencyKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1090) | :closed_lock_with_key:  | POST | `sapi/v1/margin/apiKey` |
| ['deleteMarginSpecialLowLatencyKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1096) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/apiKey` |
| ['updateMarginIPForSpecialLowLatencyKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1104) | :closed_lock_with_key:  | PUT | `sapi/v1/margin/apiKey/ip` |
| ['getMarginSpecialLowLatencyKeys()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1115) | :closed_lock_with_key:  | GET | `sapi/v1/margin/api-key-list` |
| ['getMarginSpecialLowLatencyKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1124) | :closed_lock_with_key:  | GET | `sapi/v1/margin/apiKey` |
| ['getCrossMarginTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1137) | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| ['queryMaxTransferOutAmount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1143) | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| ['updateCrossMarginMaxLeverage()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1155) | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| ['disableIsolatedMarginAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1161) | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| ['enableIsolatedMarginAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1168) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| ['getBNBBurn()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1175) | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| ['getMarginSummary()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1179) | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| ['queryCrossMarginAccountDetails()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1183) | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| ['getCrossMarginFeeData()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1187) | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| ['getIsolatedMarginAccountLimit()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1193) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| ['getIsolatedMarginAccountInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1200) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| ['getIsolatedMarginFeeData()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1206) | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| ['toggleBNBBurn()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1212) | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| ['getMarginCapitalFlow()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1220) | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| ['queryLoanRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1229) | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| ['queryRepayRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1238) | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| ['isolatedMarginAccountTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1247) | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| ['getBalances()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1259) | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| ['withdraw()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1262) | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| ['getWithdrawHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1266) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| ['getWithdrawAddresses()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1272) | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| ['getDepositHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1276) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| ['getDepositAddress()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1280) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| ['getDepositAddresses()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1286) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| ['submitDepositCredit()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1292) | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| ['getAutoConvertStablecoins()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1298) | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| ['setConvertibleCoins()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1302) | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| ['getAssetDetail()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1315) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| ['getWalletBalances()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1321) | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| ['getUserAsset()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1325) | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| ['submitUniversalTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1329) | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| ['getUniversalTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1335) | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| ['getDust()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1341) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| ['convertDustToBnb()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1345) | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| ['getDustLog()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1349) | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| ['getAssetDividendRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1353) | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| ['getTradeFee()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1357) | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| ['getFundingAsset()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1361) | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| ['getCloudMiningHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1365) | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| ['getDelegationHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1375) | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| ['submitNewFutureAccountTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1405) | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| ['getFutureAccountTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1415) | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| ['getCrossCollateralBorrowHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1424) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| ['getCrossCollateralRepaymentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1430) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| ['getCrossCollateralWalletV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1436) | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| ['getAdjustCrossCollateralLTVHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1442) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| ['getCrossCollateralLiquidationHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1453) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| ['getCrossCollateralInterestHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1461) | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| ['getAccountInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1473) | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| ['getDailyAccountSnapshot()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1477) | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| ['disableFastWithdrawSwitch()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1483) | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| ['enableFastWithdrawSwitch()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1487) | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| ['getAccountStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1491) | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| ['getApiTradingStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1495) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| ['getApiKeyPermissions()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1499) | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| ['getSystemStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1517) |  | GET | `sapi/v1/system/status` |
| ['getDelistSchedule()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1521) | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| ['createVirtualSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1531) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| ['getSubAccountList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1537) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| ['subAccountEnableFutures()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1543) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| ['subAccountEnableMargin()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1547) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| ['enableOptionsForSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1551) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| ['subAccountEnableLeverageToken()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1557) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| ['getSubAccountStatusOnMarginOrFutures()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1563) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| ['getSubAccountFuturesPositionRisk()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1569) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| ['getSubAccountFuturesPositionRiskV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1577) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| ['getSubAccountTransactionStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1583) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| ['getSubAccountIPRestriction()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1598) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| ['subAccountDeleteIPList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1607) | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| ['subAccountAddIPRestriction()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1616) | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| ['subAccountAddIPList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1629) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| ['subAccountEnableOrDisableIPRestriction()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1642) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| ['subAccountFuturesTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1657) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| ['getSubAccountFuturesAccountDetail()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1663) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| ['getSubAccountDetailOnFuturesAccountV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1669) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| ['getSubAccountDetailOnMarginAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1675) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| ['getSubAccountDepositAddress()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1681) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| ['getSubAccountDepositHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1687) | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| ['getSubAccountFuturesAccountSummary()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1693) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| ['getSubAccountSummaryOnFuturesAccountV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1697) | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| ['getSubAccountsSummaryOfMarginAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1706) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| ['subAccountMarginTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1710) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| ['getSubAccountAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1716) | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| ['getSubAccountAssetsMaster()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1722) | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| ['getSubAccountFuturesAssetTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1728) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| ['getSubAccountSpotAssetTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1737) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| ['getSubAccountSpotAssetsSummary()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1743) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| ['getSubAccountUniversalTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1749) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| ['subAccountFuturesAssetTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1755) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| ['subAccountTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1764) | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| ['subAccountTransferToMaster()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1773) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| ['subAccountTransferToSameMaster()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1779) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| ['subAccountUniversalTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1785) | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| ['depositAssetsIntoManagedSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1797) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| ['getManagedSubAccountDepositAddress()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1803) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| ['withdrawAssetsFromManagedSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1812) | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| ['getManagedSubAccountTransfersParent()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1818) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| ['getManagedSubAccountTransferLog()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1830) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| ['getManagedSubAccountTransfersInvestor()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1842) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| ['getManagedSubAccounts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1854) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| ['getManagedSubAccountSnapshot()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1861) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| ['getManagedSubAccountAssetDetails()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1870) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| ['getManagedSubAccountMarginAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1876) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| ['getManagedSubAccountFuturesAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1882) | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| ['getAutoInvestAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1897) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| ['getAutoInvestSourceAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1904) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| ['getAutoInvestTargetAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1913) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| ['getAutoInvestTargetAssetsROI()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1922) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| ['getAutoInvestIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1931) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| ['getAutoInvestPlans()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1937) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| ['submitAutoInvestOneTimeTransaction()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1955) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| ['updateAutoInvestPlanStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1971) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| ['updateAutoInvestmentPlanOld()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1985) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| ['updateAutoInvestmentPlan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1991) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| ['submitAutoInvestRedemption()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2008) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| ['getAutoInvestSubscriptionTransactions()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2016) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| ['getOneTimeTransactionStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2022) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| ['submitAutoInvestmentPlanOld()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2035) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| ['submitAutoInvestmentPlan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2041) | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| ['getAutoInvestRedemptionHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2056) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| ['getAutoInvestPlan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2065) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| ['getAutoInvestUserIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2069) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| ['getAutoInvestRebalanceHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2078) | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| ['getConvertPairs()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2093) | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| ['getConvertAssetInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2097) | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| ['convertQuoteRequest()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2107) | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| ['acceptQuoteRequest()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2111) | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| ['getConvertTradeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2115) | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| ['getOrderStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2119) | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| ['submitConvertLimitOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2123) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| ['cancelConvertLimitOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2127) | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| ['getConvertLimitOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2131) | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| ['getEthStakingAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2146) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| ['getEthStakingAccountV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2150) | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| ['getEthStakingQuota()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2154) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| ['subscribeEthStakingV1()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2167) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| ['subscribeEthStakingV2()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2173) | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| ['redeemEth()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2179) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| ['wrapBeth()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2183) | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| ['getEthStakingHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2193) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| ['getEthRedemptionHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2203) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| ['getBethRewardsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2213) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| ['getWbethRewardsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2223) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| ['getEthRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2232) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| ['getBethWrapHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2242) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| ['getBethUnwrapHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2252) | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| ['getStakingProducts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2265) | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| ['getStakingProductPosition()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2276) | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| ['getStakingHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2288) | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| ['getPersonalLeftQuotaOfStakingProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2295) | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| ['getSolStakingAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2308) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/account` |
| ['getSolStakingQuota()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2312) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/quota` |
| ['subscribeSolStaking()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2322) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/stake` |
| ['redeemSol()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2328) | :closed_lock_with_key:  | POST | `sapi/v1/sol-staking/sol/redeem` |
| ['getSolStakingHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2338) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/stakingHistory` |
| ['getSolRedemptionHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2348) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/redemptionHistory` |
| ['getBnsolRewardsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2358) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/bnsolRewardsHistory` |
| ['getBnsolRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2369) | :closed_lock_with_key:  | GET | `sapi/v1/sol-staking/sol/history/rateHistory` |
| ['getFuturesLeadTraderStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2385) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| ['getFuturesLeadTradingSymbolWhitelist()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2389) | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| ['getMiningAlgos()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2401) |  | GET | `sapi/v1/mining/pub/algoList` |
| ['getMiningCoins()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2405) |  | GET | `sapi/v1/mining/pub/coinList` |
| ['getHashrateResales()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2409) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| ['getMiners()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2418) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| ['getMinerDetails()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2422) | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| ['getExtraBonuses()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2428) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| ['getMiningEarnings()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2434) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| ['cancelHashrateResaleConfig()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2440) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| ['getHashrateResale()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2449) | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| ['getMiningAccountEarnings()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2458) | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| ['getMiningStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2464) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| ['submitHashrateResale()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2470) | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| ['getMiningAccounts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2474) | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| ['submitVpNewOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2486) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| ['submitTwapNewOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2493) | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| ['cancelAlgoOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2500) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| ['getAlgoSubOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2506) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| ['getAlgoOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2512) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| ['getAlgoHistoricalOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2519) | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| ['submitSpotAlgoTwapOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2532) | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| ['cancelSpotAlgoOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2539) | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| ['getSpotAlgoSubOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2545) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| ['getSpotAlgoOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2551) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| ['getSpotAlgoHistoricalOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2558) | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| ['getCryptoLoanFlexibleCollateralAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2573) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| ['getCryptoLoanFlexibleAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2582) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| ['borrowCryptoLoanFlexible()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2595) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| ['repayCryptoLoanFlexible()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2601) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| ['adjustCryptoLoanFlexibleLTV()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2607) | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| ['getCryptoLoanFlexibleLTVAdjustmentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2619) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| ['getLoanFlexibleBorrowHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2631) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| ['getCryptoLoanFlexibleOngoingOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2640) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| ['getLoanFlexibleRepaymentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2649) | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| ['getCryptoLoanLoanableAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2664) | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| ['getCryptoLoanCollateralRepayRate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2671) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| ['getCryptoLoanCollateralAssetsData()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2677) | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| ['getCryptoLoansIncomeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2686) | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| ['borrowCryptoLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2698) | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| ['repayCryptoLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2704) | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| ['adjustCryptoLoanLTV()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2710) | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| ['customizeCryptoLoanMarginCall()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2716) | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| ['getCryptoLoanOngoingOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2729) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| ['getCryptoLoanBorrowHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2736) | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| ['getCryptoLoanLTVAdjustmentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2743) | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| ['getCryptoLoanRepaymentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2752) | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| ['getSimpleEarnAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2764) | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/account` |
| ['getFlexibleSavingProducts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2768) | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/flexible/list` |
| ['getSimpleEarnLockedProductList()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2775) | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/locked/list` |
| ['getFlexibleProductPosition()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2784) | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/flexible/position` |
| ['getLockedProductPosition()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2793) | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/locked/position` |
| ['getFlexiblePersonalLeftQuota()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2802) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| ['getLockedPersonalLeftQuota()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2811) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| ['purchaseFlexibleProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2826) | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/flexible/subscribe` |
| ['subscribeSimpleEarnLockedProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2832) | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/locked/subscribe` |
| ['redeemFlexibleProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2838) | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/flexible/redeem` |
| ['redeemLockedProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2844) | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/locked/redeem` |
| ['setFlexibleAutoSubscribe()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2850) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| ['setLockedAutoSubscribe()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2859) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| ['getFlexibleSubscriptionPreview()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2868) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| ['getLockedSubscriptionPreview()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2877) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| ['setLockedProductRedeemOption()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2886) | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| ['getFlexibleSubscriptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2904) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| ['getLockedSubscriptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2916) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| ['getFlexibleRedemptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2928) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| ['getLockedRedemptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2940) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| ['getFlexibleRewardsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2950) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| ['getLockedRewardsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2960) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| ['getCollateralRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2970) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| ['getRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2980) | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| ['getVipBorrowInterestRate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L2996) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| ['getVipLoanableAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3002) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| ['getVipCollateralAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3009) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| ['getVipLoanOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3022) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| ['getVipLoanRepaymentHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3029) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| ['checkVipCollateralAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3038) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| ['getVipApplicationStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3045) | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| ['renewVipLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3058) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| ['repayVipLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3062) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| ['borrowVipLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3066) | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| ['getDualInvestmentProducts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3076) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| ['subscribeDualInvestmentProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3091) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| ['getDualInvestmentPositions()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3097) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| ['getDualInvestmentAccounts()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3106) | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| ['updateAutoCompoundStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3110) | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| ['createGiftCard()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3125) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| ['createDualTokenGiftCard()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3129) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| ['redeemGiftCard()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3133) | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| ['verifyGiftCard()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3137) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| ['getTokenLimit()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3141) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| ['getRsaPublicKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3145) | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| ['getNftTransactionHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3155) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| ['getNftDepositHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3162) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| ['getNftWithdrawHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3169) | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| ['getNftAsset()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3176) | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| ['getC2CTradeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3189) | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| ['getFiatOrderHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3204) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| ['getFiatPaymentsHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3210) | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| ['getSpotRebateHistoryRecords()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3222) | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| ['getPortfolioMarginIndexPrice()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3235) |  | GET | `sapi/v1/portfolio/asset-index-price` |
| ['getPortfolioMarginAssetLeverage()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3241) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| ['getPortfolioMarginProCollateralRate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3247) |  | GET | `sapi/v1/portfolio/collateralRate` |
| ['getPortfolioMarginProTieredCollateralRate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3253) |  | GET | `sapi/v2/portfolio/collateralRate` |
| ['getPortfolioMarginProAccountInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3264) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| ['bnbTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3268) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| ['submitPortfolioMarginProFullTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3274) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| ['submitPortfolioMarginProSpecificTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3280) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| ['repayPortfolioMarginProBankruptcyLoan()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3286) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| ['getPortfolioMarginProBankruptcyLoanAmount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3294) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| ['repayFuturesNegativeBalance()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3298) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| ['updateAutoRepayFuturesStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3304) | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| ['getAutoRepayFuturesStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3310) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| ['getPortfolioMarginProInterestHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3316) | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| ['getFuturesTickLevelOrderbookDataLink()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3329) | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| ['getBlvtInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3343) |  | GET | `sapi/v1/blvt/tokenInfo` |
| ['subscribeBlvt()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3347) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| ['getBlvtSubscriptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3351) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| ['redeemBlvt()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3357) | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| ['getBlvtRedemptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3361) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| ['getBlvtUserLimitInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3367) | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| ['getPayTransactions()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3378) | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| ['createBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3388) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| ['getBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3394) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| ['enableMarginBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3400) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| ['createApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3406) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| ['changePermissionApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3412) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| ['changeComissionBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3418) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| ['enableUniversalTransferApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3424) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| ['updateIpRestrictionForSubAccountApiKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3433) | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| ['deleteIPRestrictionForSubAccountApiKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3447) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| ['deleteApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3463) | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| ['getSubAccountBrokerIpRestriction()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3469) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| ['getApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3485) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| ['getBrokerInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3491) | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| ['updateSubAccountBNBBurn()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3495) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| ['updateSubAccountMarginInterestBNBBurn()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3505) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| ['getSubAccountBNBBurnStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3518) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| ['transferBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3532) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| ['getBrokerSubAccountHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3538) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| ['submitBrokerSubFuturesTransfer()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3544) | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| ['getSubAccountFuturesTransferHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3559) | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| ['getBrokerSubDepositHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3571) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| ['getBrokerSubAccountSpotAssets()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3577) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| ['getSubAccountMarginAssetInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3586) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| ['querySubAccountFuturesAssetInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3595) | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| ['universalTransferBroker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3604) | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| ['getUniversalTransferBroker()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3611) | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| ['updateBrokerSubAccountCommission()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3623) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| ['updateBrokerSubAccountFuturesCommission()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3629) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| ['getBrokerSubAccountFuturesCommission()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3638) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| ['updateBrokerSubAccountCoinFuturesCommission()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3647) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| ['getBrokerSubAccountCoinFuturesCommission()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3656) | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| ['getBrokerSpotCommissionRebate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3665) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| ['getBrokerFuturesCommissionRebate()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3671) | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| ['getBrokerIfNewSpotUser()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3708) | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| ['getBrokerSubAccountDepositHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3719) | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| ['enableFuturesBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3738) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| ['enableMarginApiKeyBrokerSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3748) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| ['getSpotUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3785) |  | POST | `api/v3/userDataStream` |
| ['keepAliveSpotUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3789) |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| ['closeSpotUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3793) |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| ['getMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3798) |  | POST | `sapi/v1/userDataStream` |
| ['keepAliveMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3802) |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| ['closeMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3806) |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| ['getIsolatedMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3811) |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| ['keepAliveIsolatedMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3819) |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| ['closeIsolatedMarginUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3828) |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| ['getBSwapLiquidity()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3851) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| ['addBSwapLiquidity()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3858) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| ['removeBSwapLiquidity()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3867) | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| ['getBSwapOperations()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3876) | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| ['getLeftDailyPurchaseQuotaFlexibleProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3891) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| ['getLeftDailyRedemptionQuotaFlexibleProduct()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3900) | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| ['purchaseFixedAndActivityProject()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3914) | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| ['getFixedAndActivityProjects()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3924) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| ['getFixedAndActivityProductPosition()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3933) | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| ['getLendingAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3942) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| ['getPurchaseRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3949) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| ['getRedemptionRecord()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3956) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| ['getInterestHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3963) | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| ['changeFixedAndActivityPositionToDailyPosition()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3970) | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| ['enableConvertSubAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3987) | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| ['convertBUSD()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3993) | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| ['getConvertBUSDHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L4000) | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

# usdm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [usdm-client.ts](/src/usdm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| ['testConnectivity()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L130) |  | GET | `fapi/v1/ping` |
| ['getExchangeInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L134) |  | GET | `fapi/v1/exchangeInfo` |
| ['getOrderBook()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L138) |  | GET | `fapi/v1/depth` |
| ['getRecentTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L142) |  | GET | `fapi/v1/trades` |
| ['getHistoricalTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L146) |  | GET | `fapi/v1/historicalTrades` |
| ['getAggregateTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L152) |  | GET | `fapi/v1/aggTrades` |
| ['getKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L158) |  | GET | `fapi/v1/klines` |
| ['getContinuousContractKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L162) |  | GET | `fapi/v1/continuousKlines` |
| ['getIndexPriceKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L168) |  | GET | `fapi/v1/indexPriceKlines` |
| ['getMarkPriceKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L172) |  | GET | `fapi/v1/markPriceKlines` |
| ['getPremiumIndexKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L176) |  | GET | `fapi/v1/premiumIndexKlines` |
| ['getMarkPrice()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L180) |  | GET | `fapi/v1/premiumIndex` |
| ['getFundingRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L189) |  | GET | `fapi/v1/fundingRate` |
| ['getFundingRates()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L195) |  | GET | `fapi/v1/fundingInfo` |
| ['get24hrChangeStatististics()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L202) |  | GET | `fapi/v1/ticker/24hr` |
| ['get24hrChangeStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L208) |  | GET | `fapi/v1/ticker/24hr` |
| ['getSymbolPriceTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L224) |  | GET | `fapi/v1/ticker/price` |
| ['getSymbolPriceTickerV2()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L230) |  | GET | `fapi/v2/ticker/price` |
| ['getSymbolOrderBookTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L236) |  | GET | `fapi/v1/ticker/bookTicker` |
| ['getQuarterlyContractSettlementPrices()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L242) |  | GET | `futures/data/delivery-price` |
| ['getOpenInterest()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L248) |  | GET | `fapi/v1/openInterest` |
| ['getOpenInterestStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L252) |  | GET | `futures/data/openInterestHist` |
| ['getTopTradersLongShortPositionRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L258) |  | GET | `futures/data/topLongShortPositionRatio` |
| ['getTopTradersLongShortAccountRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L264) |  | GET | `futures/data/topLongShortAccountRatio` |
| ['getGlobalLongShortAccountRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L270) |  | GET | `futures/data/globalLongShortAccountRatio` |
| ['getTakerBuySellVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L276) |  | GET | `futures/data/takerlongshortRatio` |
| ['getHistoricalBlvtNavKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L280) |  | GET | `fapi/v1/lvtKlines` |
| ['getCompositeSymbolIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L284) |  | GET | `fapi/v1/indexInfo` |
| ['getMultiAssetsModeAssetIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L288) |  | GET | `fapi/v1/assetIndex` |
| ['getBasis()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L295) |  | GET | `futures/data/basis` |
| ['getIndexPriceConstituents()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L302) |  | GET | `fapi/v1/constituents` |
| ['submitNewOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L314) | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| ['submitMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L324) | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| ['modifyOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L341) | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| ['modifyMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L347) | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| ['getOrderModifyHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L355) | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| ['cancelOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L361) | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| ['cancelMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L365) | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| ['cancelAllOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L385) | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| ['setCancelOrdersOnTimeout()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L392) | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| ['getOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L398) | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| ['getAllOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L402) | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| ['getAllOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L406) | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| ['getCurrentOpenOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L410) | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| ['getForceOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L414) | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| ['getAccountTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L418) | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| ['setMarginType()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L424) | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| ['setPositionMode()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L428) | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| ['setLeverage()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L432) | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| ['setMultiAssetsMode()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L436) | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| ['setIsolatedPositionMargin()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L442) | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| ['getPositions()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L452) | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| ['getPositionsV3()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L456) | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| ['getADLQuantileEstimation()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L460) | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| ['getPositionMarginChangeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L464) | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| ['getBalanceV3()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L476) | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| ['getBalance()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L484) | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| ['getAccountInformationV3()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L488) | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| ['getAccountInformation()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L496) | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| ['getAccountComissionRate()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L500) | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| ['getFuturesAccountConfig()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L506) | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| ['getFuturesSymbolConfig()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L510) | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| ['getUserForceOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L514) | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| ['getNotionalAndLeverageBrackets()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L521) | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| ['getMultiAssetsMode()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L527) | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| ['getCurrentPositionMode()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L531) | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| ['getIncomeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L535) | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| ['getApiQuantitativeRulesIndicators()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L539) | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| ['getFuturesTransactionHistoryDownloadId()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L545) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| ['getFuturesTransactionHistoryDownloadLink()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L552) | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| ['getFuturesOrderHistoryDownloadId()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L558) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| ['getFuturesOrderHistoryDownloadLink()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L565) | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| ['getFuturesTradeHistoryDownloadId()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L571) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| ['getFuturesTradeDownloadLink()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L578) | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| ['setBNBBurnEnabled()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L584) | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| ['getBNBBurnStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L590) | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| ['testOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L596) | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| ['getAllConvertPairs()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L607) |  | GET | `fapi/v1/convert/exchangeInfo` |
| ['submitConvertQuoteRequest()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L614) | :closed_lock_with_key:  | POST | `fapi/v1/convert/getQuote` |
| ['acceptConvertQuote()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L620) | :closed_lock_with_key:  | POST | `fapi/v1/convert/acceptQuote` |
| ['getConvertOrderStatus()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L628) | :closed_lock_with_key:  | GET | `fapi/v1/convert/orderStatus` |
| ['getPortfolioMarginProAccountInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L641) | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| ['getBrokerIfNewFuturesUser()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L658) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| ['setBrokerCustomIdForClient()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L670) | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| ['getBrokerClientCustomIds()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L682) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| ['getBrokerUserCustomId()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L698) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| ['getBrokerRebateDataOverview()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L706) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| ['getBrokerUserTradeVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L714) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| ['getBrokerRebateVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L730) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| ['getBrokerTradeDetail()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L746) | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| ['getFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L768) |  | POST | `fapi/v1/listenKey` |
| ['keepAliveFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L772) |  | PUT | `fapi/v1/listenKey` |
| ['closeFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L776) |  | DELETE | `fapi/v1/listenKey` |

# coinm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [coinm-client.ts](/src/coinm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| ['testConnectivity()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L125) |  | GET | `dapi/v1/ping` |
| ['getExchangeInfo()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L129) |  | GET | `dapi/v1/exchangeInfo` |
| ['getOrderBook()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L133) |  | GET | `dapi/v1/depth` |
| ['getRecentTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L137) |  | GET | `dapi/v1/trades` |
| ['getHistoricalTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L141) |  | GET | `dapi/v1/historicalTrades` |
| ['getAggregateTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L147) |  | GET | `dapi/v1/aggTrades` |
| ['getMarkPrice()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L156) |  | GET | `dapi/v1/premiumIndex` |
| ['getFundingRateHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L162) |  | GET | `dapi/v1/fundingRate` |
| ['getFundingRate()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L168) |  | GET | `dapi/v1/fundingInfo` |
| ['getKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L172) |  | GET | `dapi/v1/klines` |
| ['getContinuousContractKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L176) |  | GET | `dapi/v1/continuousKlines` |
| ['getIndexPriceKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L182) |  | GET | `dapi/v1/indexPriceKlines` |
| ['getMarkPriceKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L186) |  | GET | `dapi/v1/markPriceKlines` |
| ['getPremiumIndexKlines()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L190) |  | GET | `dapi/v1/premiumIndexKlines` |
| ['get24hrChangeStatististics()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L197) |  | GET | `dapi/v1/ticker/24hr` |
| ['get24hrChangeStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L203) |  | GET | `dapi/v1/ticker/24hr` |
| ['getSymbolPriceTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L209) |  | GET | `dapi/v1/ticker/price` |
| ['getSymbolOrderBookTicker()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L215) |  | GET | `dapi/v1/ticker/bookTicker` |
| ['getOpenInterest()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L223) |  | GET | `dapi/v1/openInterest` |
| ['getOpenInterestStatistics()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L227) |  | GET | `futures/data/openInterestHist` |
| ['getTopTradersLongShortAccountRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L231) |  | GET | `futures/data/topLongShortAccountRatio` |
| ['getTopTradersLongShortPositionRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L237) |  | GET | `futures/data/topLongShortPositionRatio` |
| ['getGlobalLongShortAccountRatio()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L243) |  | GET | `futures/data/globalLongShortAccountRatio` |
| ['getTakerBuySellVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L249) |  | GET | `futures/data/takerBuySellVol` |
| ['getCompositeSymbolIndex()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L255) |  | GET | `futures/data/basis` |
| ['getIndexPriceConstituents()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L263) |  | GET | `dapi/v1/constituents` |
| ['getQuarterlyContractSettlementPrices()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L273) |  | GET | `futures/data/delivery-price` |
| ['submitNewOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L285) | :closed_lock_with_key:  | POST | `dapi/v1/order` |
| ['submitMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L295) | :closed_lock_with_key:  | POST | `dapi/v1/batchOrders` |
| ['modifyOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L312) | :closed_lock_with_key:  | PUT | `dapi/v1/order` |
| ['modifyMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L321) | :closed_lock_with_key:  | PUT | `dapi/v1/batchOrders` |
| ['getOrderModifyHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L334) | :closed_lock_with_key:  | GET | `dapi/v1/orderAmendment` |
| ['cancelOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L340) | :closed_lock_with_key:  | DELETE | `dapi/v1/order` |
| ['cancelMultipleOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L344) | :closed_lock_with_key:  | DELETE | `dapi/v1/batchOrders` |
| ['cancelAllOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L364) | :closed_lock_with_key:  | DELETE | `dapi/v1/allOpenOrders` |
| ['setCancelOrdersOnTimeout()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L371) | :closed_lock_with_key:  | POST | `dapi/v1/countdownCancelAll` |
| ['getOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L377) | :closed_lock_with_key:  | GET | `dapi/v1/order` |
| ['getAllOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L381) | :closed_lock_with_key:  | GET | `dapi/v1/allOrders` |
| ['getAllOpenOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L385) | :closed_lock_with_key:  | GET | `dapi/v1/openOrders` |
| ['getCurrentOpenOrder()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L389) | :closed_lock_with_key:  | GET | `dapi/v1/openOrder` |
| ['getForceOrders()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L393) | :closed_lock_with_key:  | GET | `dapi/v1/forceOrders` |
| ['getAccountTrades()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L397) | :closed_lock_with_key:  | GET | `dapi/v1/userTrades` |
| ['getPositions()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L403) | :closed_lock_with_key:  | GET | `dapi/v1/positionRisk` |
| ['setPositionMode()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L407) | :closed_lock_with_key:  | POST | `dapi/v1/positionSide/dual` |
| ['setMarginType()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L411) | :closed_lock_with_key:  | POST | `dapi/v1/marginType` |
| ['setLeverage()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L415) | :closed_lock_with_key:  | POST | `dapi/v1/leverage` |
| ['getADLQuantileEstimation()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L419) | :closed_lock_with_key:  | GET | `dapi/v1/adlQuantile` |
| ['setIsolatedPositionMargin()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L423) | :closed_lock_with_key:  | POST | `dapi/v1/positionMargin` |
| ['getPositionMarginChangeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L429) | :closed_lock_with_key:  | GET | `dapi/v1/positionMargin/history` |
| ['getBalance()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L440) | :closed_lock_with_key:  | GET | `dapi/v1/balance` |
| ['getAccountComissionRate()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L444) | :closed_lock_with_key:  | GET | `dapi/v1/commissionRate` |
| ['getAccountInformation()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L450) | :closed_lock_with_key:  | GET | `dapi/v1/account` |
| ['getNotionalAndLeverageBrackets()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L457) | :closed_lock_with_key:  | GET | `dapi/v2/leverageBracket` |
| ['getCurrentPositionMode()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L466) | :closed_lock_with_key:  | GET | `dapi/v1/positionSide/dual` |
| ['getIncomeHistory()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L470) | :closed_lock_with_key:  | GET | `dapi/v1/income` |
| ['getClassicPortfolioMarginAccount()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L480) | :closed_lock_with_key:  | GET | `dapi/v1/pmAccountInfo` |
| ['getClassicPortfolioMarginNotionalLimits()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L489) | :closed_lock_with_key:  | GET | `dapi/v1/pmExchangeInfo` |
| ['getBrokerIfNewFuturesUser()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L508) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/ifNewUser` |
| ['setBrokerCustomIdForClient()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L521) | :closed_lock_with_key:  | POST | `dapi/v1/apiReferral/customization` |
| ['getBrokerClientCustomIds()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L534) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/customization` |
| ['getBrokerUserCustomId()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L551) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/userCustomization` |
| ['getBrokerRebateDataOverview()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L560) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/overview` |
| ['getBrokerUserTradeVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L569) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/tradeVol` |
| ['getBrokerRebateVolume()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L586) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/rebateVol` |
| ['getBrokerTradeDetail()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L603) | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/traderSummary` |
| ['getFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L623) |  | POST | `dapi/v1/listenKey` |
| ['keepAliveFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L627) |  | PUT | `dapi/v1/listenKey` |
| ['closeFuturesUserDataListenKey()'](https://github.com/tiagosiebler/binance/blob/master/src/coinm-client.ts#L631) |  | DELETE | `dapi/v1/listenKey` |