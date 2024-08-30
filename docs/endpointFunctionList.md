
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/bybit-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
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
| `getServerTime()` |  | GET | `api/v3/ping` |
| `testConnectivity()` |  | GET | `api/v3/ping` |
| `getExchangeInfo()` |  | GET | `api/v3/exchangeInfo` |
| `getOrderBook()` |  | GET | `api/v3/depth` |
| `getRecentTrades()` |  | GET | `api/v3/trades` |
| `getHistoricalTrades()` |  | GET | `api/v3/historicalTrades` |
| `getAggregateTrades()` |  | GET | `api/v3/aggTrades` |
| `getKlines()` |  | GET | `api/v3/klines` |
| `getUIKlines()` |  | GET | `api/v3/uiKlines` |
| `getAvgPrice()` |  | GET | `api/v3/avgPrice` |
| `get24hrChangeStatististics()` |  | GET | `api/v3/ticker/24hr` |
| `getTradingDayTicker()` |  | GET | `api/v3/ticker/tradingDay` |
| `getSymbolPriceTicker()` |  | GET | `api/v3/ticker/price` |
| `getSymbolOrderBookTicker()` |  | GET | `api/v3/ticker/bookTicker` |
| `getRollingWindowTicker()` |  | GET | `api/v3/ticker` |
| `getOrder()` | :closed_lock_with_key:  | GET | `api/v3/order` |
| `cancelOrder()` | :closed_lock_with_key:  | DELETE | `api/v3/order` |
| `cancelAllSymbolOrders()` | :closed_lock_with_key:  | DELETE | `api/v3/openOrders` |
| `getOpenOrders()` | :closed_lock_with_key:  | GET | `api/v3/openOrders` |
| `getAllOrders()` | :closed_lock_with_key:  | GET | `api/v3/allOrders` |
| `submitNewOCO()` | :closed_lock_with_key:  | POST | `api/v3/order/oco` |
| `submitNewOrderListOTO()` | :closed_lock_with_key:  | POST | `api/v3/orderList/oto` |
| `submitNewOrderListOTOCO()` | :closed_lock_with_key:  | POST | `api/v3/orderList/otoco` |
| `cancelOCO()` | :closed_lock_with_key:  | DELETE | `api/v3/orderList` |
| `getOCO()` | :closed_lock_with_key:  | GET | `api/v3/orderList` |
| `getAllOCO()` | :closed_lock_with_key:  | GET | `api/v3/allOrderList` |
| `getAllOpenOCO()` | :closed_lock_with_key:  | GET | `api/v3/openOrderList` |
| `submitNewSOROrder()` | :closed_lock_with_key:  | POST | `api/v3/sor/order` |
| `testNewSOROrder()` | :closed_lock_with_key:  | POST | `api/v3/sor/order/test` |
| `getAccountInformation()` | :closed_lock_with_key:  | GET | `api/v3/account` |
| `getAccountTradeList()` | :closed_lock_with_key:  | GET | `api/v3/myTrades` |
| `getOrderRateLimit()` | :closed_lock_with_key:  | GET | `api/v3/rateLimit/order` |
| `getPreventedMatches()` | :closed_lock_with_key:  | GET | `api/v3/myPreventedMatches` |
| `getAllocations()` | :closed_lock_with_key:  | GET | `api/v3/myAllocations` |
| `getCommissionRates()` | :closed_lock_with_key:  | GET | `api/v3/account/commission` |
| `getCrossMarginCollateralRatio()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginCollateralRatio` |
| `getAllCrossMarginPairs()` |  | GET | `sapi/v1/margin/allPairs` |
| `getIsolatedMarginAllSymbols()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/allPairs` |
| `getAllMarginAssets()` |  | GET | `sapi/v1/margin/allAssets` |
| `getMarginDelistSchedule()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/delist-schedule` |
| `getIsolatedMarginTierData()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginTier` |
| `queryMarginPriceIndex()` |  | GET | `sapi/v1/margin/priceIndex` |
| `getMarginAvailableInventory()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/available-inventory` |
| `getLeverageBracket()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/leverageBracket` |
| `getNextHourlyInterestRate()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/next-hourly-interest-rate` |
| `getMarginInterestHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestHistory` |
| `submitMarginAccountBorrowRepay()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/borrow-repay` |
| `getMarginAccountBorrowRepayRecords()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/borrow-repay` |
| `getMarginInterestRateHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/interestRateHistory` |
| `queryMaxBorrow()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxBorrowable` |
| `getMarginForceLiquidationRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/forceLiquidationRec` |
| `getSmallLiabilityExchangeCoins()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability` |
| `getSmallLiabilityExchangeHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/exchange-small-liability-history` |
| `marginAccountCancelOpenOrders()` | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/openOrders` |
| `marginAccountCancelOCO()` | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/orderList` |
| `marginAccountCancelOrder()` | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/order` |
| `marginAccountNewOCO()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/order/oco` |
| `getMarginOrderCountUsage()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/rateLimit/order` |
| `queryMarginAccountAllOCO()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrderList` |
| `queryMarginAccountAllOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/allOrders` |
| `queryMarginAccountOCO()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/orderList` |
| `queryMarginAccountOpenOCO()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrderList` |
| `queryMarginAccountOpenOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/openOrders` |
| `queryMarginAccountOrder()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/order` |
| `queryMarginAccountTradeList()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/myTrades` |
| `submitSmallLiabilityExchange()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/exchange-small-liability` |
| `submitManualLiquidation()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/manual-liquidation` |
| `getCrossMarginTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/transfer` |
| `queryMaxTransferOutAmount()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/maxTransferable` |
| `updateCrossMarginMaxLeverage()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/max-leverage` |
| `disableIsolatedMarginAccount()` | :closed_lock_with_key:  | DELETE | `sapi/v1/margin/isolated/account` |
| `enableIsolatedMarginAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/account` |
| `getBNBBurn()` | :closed_lock_with_key:  | GET | `sapi/v1/bnbBurn` |
| `getMarginSummary()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/tradeCoeff` |
| `queryCrossMarginAccountDetails()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/account` |
| `getCrossMarginFeeData()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/crossMarginData` |
| `getIsolatedMarginAccountLimit()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/accountLimit` |
| `getIsolatedMarginAccountInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolated/account` |
| `getIsolatedMarginFeeData()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/isolatedMarginData` |
| `toggleBNBBurn()` | :closed_lock_with_key:  | POST | `sapi/v1/bnbBurn` |
| `getMarginCapitalFlow()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/capital-flow` |
| `queryLoanRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/loan` |
| `queryRepayRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/margin/repay` |
| `isolatedMarginAccountTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/margin/isolated/transfer` |
| `getBalances()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/config/getall` |
| `withdraw()` | :closed_lock_with_key:  | POST | `sapi/v1/capital/withdraw/apply` |
| `getWithdrawHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/history` |
| `getWithdrawAddresses()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/withdraw/address/list` |
| `getDepositHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/hisrec` |
| `getDepositAddress()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address` |
| `getDepositAddresses()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/address/list` |
| `submitDepositCredit()` | :closed_lock_with_key:  | POST | `sapi/v1/capital/deposit/credit-apply` |
| `getAutoConvertStablecoins()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/contract/convertible-coins` |
| `setConvertibleCoins()` | :closed_lock_with_key:  | POST | `sapi/v1/capital/contract/convertible-coins` |
| `getAssetDetail()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDetail` |
| `getWalletBalances()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/wallet/balance` |
| `getUserAsset()` | :closed_lock_with_key:  | POST | `sapi/v3/asset/getUserAsset` |
| `submitUniversalTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/asset/transfer` |
| `getUniversalTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/transfer` |
| `getDust()` | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust-btc` |
| `convertDustToBnb()` | :closed_lock_with_key:  | POST | `sapi/v1/asset/dust` |
| `getDustLog()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/dribblet` |
| `getAssetDividendRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/assetDividend` |
| `getTradeFee()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/tradeFee` |
| `getFundingAsset()` | :closed_lock_with_key:  | POST | `sapi/v1/asset/get-funding-asset` |
| `getCloudMiningHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage` |
| `getDelegationHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/custody/transfer-history` |
| `submitNewFutureAccountTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/futures/transfer` |
| `getFutureAccountTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/transfer` |
| `getCrossCollateralBorrowHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/borrow/history` |
| `getCrossCollateralRepaymentHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/repay/history` |
| `getCrossCollateralWalletV2()` | :closed_lock_with_key:  | GET | `sapi/v2/futures/loan/wallet` |
| `getAdjustCrossCollateralLTVHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/adjustCollateral/history` |
| `getCrossCollateralLiquidationHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/liquidationHistory` |
| `getCrossCollateralInterestHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/loan/interestHistory` |
| `getAccountInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/account/info` |
| `getDailyAccountSnapshot()` | :closed_lock_with_key:  | GET | `sapi/v1/accountSnapshot` |
| `disableFastWithdrawSwitch()` | :closed_lock_with_key:  | POST | `sapi/v1/account/disableFastWithdrawSwitch` |
| `enableFastWithdrawSwitch()` | :closed_lock_with_key:  | POST | `sapi/v1/account/enableFastWithdrawSwitch` |
| `getAccountStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/account/status` |
| `getApiTradingStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/account/apiTradingStatus` |
| `getApiKeyPermissions()` | :closed_lock_with_key:  | GET | `sapi/v1/account/apiRestrictions` |
| `getSystemStatus()` |  | GET | `sapi/v1/system/status` |
| `getDelistSchedule()` | :closed_lock_with_key:  | GET | `sapi/v1/spot/delist-schedule` |
| `createVirtualSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/virtualSubAccount` |
| `getSubAccountList()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/list` |
| `subAccountEnableFutures()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/enable` |
| `subAccountEnableMargin()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/enable` |
| `enableOptionsForSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/eoptions/enable` |
| `subAccountEnableLeverageToken()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/blvt/enable` |
| `getSubAccountStatusOnMarginOrFutures()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/status` |
| `getSubAccountFuturesPositionRisk()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/positionRisk` |
| `getSubAccountFuturesPositionRiskV2()` | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/positionRisk` |
| `getSubAccountTransactionStatistics()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transaction-statistics` |
| `getSubAccountIPRestriction()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| `subAccountDeleteIPList()` | :closed_lock_with_key:  | DELETE | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| `subAccountAddIPRestriction()` | :closed_lock_with_key:  | POST | `sapi/v2/sub-account/subAccountApi/ipRestriction` |
| `subAccountAddIPList()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` |
| `subAccountEnableOrDisableIPRestriction()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/subAccountApi/ipRestriction` |
| `subAccountFuturesTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/transfer` |
| `getSubAccountFuturesAccountDetail()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/account` |
| `getSubAccountDetailOnFuturesAccountV2()` | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/account` |
| `getSubAccountDetailOnMarginAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/account` |
| `getSubAccountDepositAddress()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subAddress` |
| `getSubAccountDepositHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/capital/deposit/subHisrec` |
| `getSubAccountFuturesAccountSummary()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/accountSummary` |
| `getSubAccountSummaryOnFuturesAccountV2()` | :closed_lock_with_key:  | GET | `sapi/v2/sub-account/futures/accountSummary` |
| `getSubAccountsSummaryOfMarginAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/margin/accountSummary` |
| `subAccountMarginTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/margin/transfer` |
| `getSubAccountAssets()` | :closed_lock_with_key:  | GET | `sapi/v3/sub-account/assets` |
| `getSubAccountAssetsMaster()` | :closed_lock_with_key:  | GET | `sapi/v4/sub-account/assets` |
| `getSubAccountFuturesAssetTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/futures/internalTransfer` |
| `getSubAccountSpotAssetTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/sub/transfer/history` |
| `getSubAccountSpotAssetsSummary()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/spotSummary` |
| `getSubAccountUniversalTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/universalTransfer` |
| `subAccountFuturesAssetTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/futures/internalTransfer` |
| `subAccountTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/sub-account/transfer/subUserHistory` |
| `subAccountTransferToMaster()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToMaster` |
| `subAccountTransferToSameMaster()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/transfer/subToSub` |
| `subAccountUniversalTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/sub-account/universalTransfer` |
| `depositAssetsIntoManagedSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/deposit` |
| `getManagedSubAccountDepositAddress()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/deposit/address` |
| `withdrawAssetsFromManagedSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/managed-subaccount/withdraw` |
| `getManagedSubAccountTransfersParent()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForTradeParent` |
| `getManagedSubAccountTransferLog()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/query-trans-log` |
| `getManagedSubAccountTransfersInvestor()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/queryTransLogForInvestor` |
| `getManagedSubAccounts()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/info` |
| `getManagedSubAccountSnapshot()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/accountSnapshot` |
| `getManagedSubAccountAssetDetails()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/asset` |
| `getManagedSubAccountMarginAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/marginAsset` |
| `getManagedSubAccountFuturesAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/managed-subaccount/fetch-future-asset` |
| `getAutoInvestAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/all/asset` |
| `getAutoInvestSourceAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/source-asset/list` |
| `getAutoInvestTargetAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/list` |
| `getAutoInvestTargetAssetsROI()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/target-asset/roi/list` |
| `getAutoInvestIndex()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/info` |
| `getAutoInvestPlans()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/list` |
| `submitAutoInvestOneTimeTransaction()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/one-off` |
| `updateAutoInvestPlanStatus()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit-status` |
| `updateAutoInvestmentPlanOld()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| `updateAutoInvestmentPlan()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/edit` |
| `submitAutoInvestRedemption()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/redeem` |
| `getAutoInvestSubscriptionTransactions()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/history/list` |
| `getOneTimeTransactionStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/one-off/status` |
| `submitAutoInvestmentPlanOld()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| `submitAutoInvestmentPlan()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/auto-invest/plan/add` |
| `getAutoInvestRedemptionHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/redeem/history` |
| `getAutoInvestPlan()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/plan/id` |
| `getAutoInvestUserIndex()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/index/user-summary` |
| `getAutoInvestRebalanceHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/auto-invest/rebalance/history` |
| `getConvertPairs()` | :closed_lock_with_key:  | GET | `sapi/v1/convert/exchangeInfo` |
| `getConvertAssetInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/convert/assetInfo` |
| `convertQuoteRequest()` | :closed_lock_with_key:  | POST | `sapi/v1/convert/getQuote` |
| `acceptQuoteRequest()` | :closed_lock_with_key:  | POST | `sapi/v1/convert/acceptQuote` |
| `getConvertTradeHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/convert/tradeFlow` |
| `getOrderStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/convert/orderStatus` |
| `submitConvertLimitOrder()` | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/placeOrder` |
| `cancelConvertLimitOrder()` | :closed_lock_with_key:  | POST | `sapi/v1/convert/limit/cancelOrder` |
| `getConvertLimitOpenOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/convert/limit/queryOpenOrders` |
| `getEthStakingAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/account` |
| `getEthStakingAccountV2()` | :closed_lock_with_key:  | GET | `sapi/v2/eth-staking/account` |
| `getEthStakingQuota()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/quota` |
| `subscribeEthStakingV1()` | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/stake` |
| `subscribeEthStakingV2()` | :closed_lock_with_key:  | POST | `sapi/v2/eth-staking/eth/stake` |
| `redeemEth()` | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/eth/redeem` |
| `wrapBeth()` | :closed_lock_with_key:  | POST | `sapi/v1/eth-staking/wbeth/wrap` |
| `getEthStakingHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/stakingHistory` |
| `getEthRedemptionHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/redemptionHistory` |
| `getBethRewardsHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rewardsHistory` |
| `getWbethRewardsHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/wbethRewardsHistory` |
| `getEthRateHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/eth/history/rateHistory` |
| `getBethWrapHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/wrapHistory` |
| `getBethUnwrapHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/eth-staking/wbeth/history/unwrapHistory` |
| `getStakingProducts()` | :closed_lock_with_key:  | GET | `sapi/v1/staking/productList` |
| `getStakingProductPosition()` | :closed_lock_with_key:  | GET | `sapi/v1/staking/position` |
| `getStakingHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/staking/stakingRecord` |
| `getPersonalLeftQuotaOfStakingProduct()` | :closed_lock_with_key:  | GET | `sapi/v1/staking/personalLeftQuota` |
| `getFuturesLeadTraderStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/userStatus` |
| `getFuturesLeadTradingSymbolWhitelist()` | :closed_lock_with_key:  | GET | `sapi/v1/copyTrading/futures/leadSymbol` |
| `getMiningAlgos()` |  | GET | `sapi/v1/mining/pub/algoList` |
| `getMiningCoins()` |  | GET | `sapi/v1/mining/pub/coinList` |
| `getHashrateResales()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/config/details/list` |
| `getMiners()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/list` |
| `getMinerDetails()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/worker/detail` |
| `getExtraBonuses()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/other` |
| `getMiningEarnings()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/list` |
| `cancelHashrateResaleConfig()` | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config/cancel` |
| `getHashrateResale()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/hash-transfer/profit/details` |
| `getMiningAccountEarnings()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/payment/uid` |
| `getMiningStatistics()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/status` |
| `submitHashrateResale()` | :closed_lock_with_key:  | POST | `sapi/v1/mining/hash-transfer/config` |
| `getMiningAccounts()` | :closed_lock_with_key:  | GET | `sapi/v1/mining/statistics/user/list` |
| `submitVpNewOrder()` | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderVp` |
| `submitTwapNewOrder()` | :closed_lock_with_key:  | POST | `sapi/v1/algo/futures/newOrderTwap` |
| `cancelAlgoOrder()` | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/futures/order` |
| `getAlgoSubOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/subOrders` |
| `getAlgoOpenOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/openOrders` |
| `getAlgoHistoricalOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/futures/historicalOrders` |
| `submitSpotAlgoTwapOrder()` | :closed_lock_with_key:  | POST | `sapi/v1/algo/spot/newOrderTwap` |
| `cancelSpotAlgoOrder()` | :closed_lock_with_key:  | DELETE | `sapi/v1/algo/spot/order` |
| `getSpotAlgoSubOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/subOrders` |
| `getSpotAlgoOpenOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/openOrders` |
| `getSpotAlgoHistoricalOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/algo/spot/historicalOrders` |
| `getCryptoLoanFlexibleCollateralAssets()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/collateral/data` |
| `getCryptoLoanFlexibleAssets()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/loanable/data` |
| `borrowCryptoLoanFlexible()` | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/borrow` |
| `repayCryptoLoanFlexible()` | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/repay` |
| `adjustCryptoLoanFlexibleLTV()` | :closed_lock_with_key:  | POST | `sapi/v2/loan/flexible/adjust/ltv` |
| `getCryptoLoanFlexibleLTVAdjustmentHistory()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ltv/adjustment/history` |
| `getLoanFlexibleBorrowHistory()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/borrow/history` |
| `getCryptoLoanFlexibleOngoingOrders()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/ongoing/orders` |
| `getLoanFlexibleRepaymentHistory()` | :closed_lock_with_key:  | GET | `sapi/v2/loan/flexible/repay/history` |
| `getCryptoLoanLoanableAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/loanable/data` |
| `getCryptoLoanCollateralRepayRate()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/collateral/rate` |
| `getCryptoLoanCollateralAssetsData()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/collateral/data` |
| `getCryptoLoansIncomeHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/income` |
| `borrowCryptoLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/borrow` |
| `repayCryptoLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/repay` |
| `adjustCryptoLoanLTV()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/adjust/ltv` |
| `customizeCryptoLoanMarginCall()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/customize/margin_call` |
| `getCryptoLoanOngoingOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/ongoing/orders` |
| `getCryptoLoanBorrowHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/borrow/history` |
| `getCryptoLoanLTVAdjustmentHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/ltv/adjustment/history` |
| `getCryptoLoanRepaymentHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/repay/history` |
| `getSimpleEarnAccount()` | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/account` |
| `getFlexibleSavingProducts()` | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/flexible/list` |
| `getSimpleEarnLockedProductList()` | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/locked/list` |
| `getFlexibleProductPosition()` | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/flexible/position` |
| `getLockedProductPosition()` | :closed_lock_with_key:  | GET | `/sapi/v1/simple-earn/locked/position` |
| `getFlexiblePersonalLeftQuota()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/personalLeftQuota` |
| `getLockedPersonalLeftQuota()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/personalLeftQuota` |
| `purchaseFlexibleProduct()` | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/flexible/subscribe` |
| `subscribeSimpleEarnLockedProduct()` | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/locked/subscribe` |
| `redeemFlexibleProduct()` | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/flexible/redeem` |
| `redeemLockedProduct()` | :closed_lock_with_key:  | POST | `/sapi/v1/simple-earn/locked/redeem` |
| `setFlexibleAutoSubscribe()` | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/flexible/setAutoSubscribe` |
| `setLockedAutoSubscribe()` | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setAutoSubscribe` |
| `getFlexibleSubscriptionPreview()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/subscriptionPreview` |
| `getLockedSubscriptionPreview()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/subscriptionPreview` |
| `setLockedProductRedeemOption()` | :closed_lock_with_key:  | POST | `sapi/v1/simple-earn/locked/setRedeemOption` |
| `getFlexibleSubscriptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/subscriptionRecord` |
| `getLockedSubscriptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/subscriptionRecord` |
| `getFlexibleRedemptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/redemptionRecord` |
| `getLockedRedemptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/redemptionRecord` |
| `getFlexibleRewardsHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rewardsRecord` |
| `getLockedRewardsHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/locked/history/rewardsRecord` |
| `getCollateralRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/collateralRecord` |
| `getRateHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/simple-earn/flexible/history/rateHistory` |
| `getVipBorrowInterestRate()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/interestRate` |
| `getVipLoanableAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/loanable/data` |
| `getVipCollateralAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/data` |
| `getVipLoanOpenOrders()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/ongoing/orders` |
| `getVipLoanRepaymentHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/repay/history` |
| `checkVipCollateralAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/collateral/account` |
| `getVipApplicationStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/loan/vip/request/data` |
| `renewVipLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/renew` |
| `repayVipLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/repay` |
| `borrowVipLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/loan/vip/borrow` |
| `getDualInvestmentProducts()` | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/list` |
| `subscribeDualInvestmentProduct()` | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/subscribe` |
| `getDualInvestmentPositions()` | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/positions` |
| `getDualInvestmentAccounts()` | :closed_lock_with_key:  | GET | `sapi/v1/dci/product/accounts` |
| `updateAutoCompoundStatus()` | :closed_lock_with_key:  | POST | `sapi/v1/dci/product/auto_compound/edit-status` |
| `createGiftCard()` | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/createCode` |
| `createDualTokenGiftCard()` | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/buyCode` |
| `redeemGiftCard()` | :closed_lock_with_key:  | POST | `sapi/v1/giftcard/redeemCode` |
| `verifyGiftCard()` | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/verify` |
| `getTokenLimit()` | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/buyCode/token-limit` |
| `getRsaPublicKey()` | :closed_lock_with_key:  | GET | `sapi/v1/giftcard/cryptography/rsa-public-key` |
| `getNftTransactionHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/transactions` |
| `getNftDepositHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/deposit` |
| `getNftWithdrawHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/nft/history/withdraw` |
| `getNftAsset()` | :closed_lock_with_key:  | GET | `sapi/v1/nft/user/getAsset` |
| `getC2CTradeHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/c2c/orderMatch/listUserOrderHistory` |
| `getFiatOrderHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/fiat/orders` |
| `getFiatPaymentsHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/fiat/payments` |
| `getSpotRebateHistoryRecords()` | :closed_lock_with_key:  | GET | `sapi/v1/rebate/taxQuery` |
| `getPortfolioMarginIndexPrice()` |  | GET | `sapi/v1/portfolio/asset-index-price` |
| `getPortfolioMarginAssetLeverage()` | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/margin-asset-leverage` |
| `getPortfolioMarginProCollateralRate()` |  | GET | `sapi/v1/portfolio/collateralRate` |
| `getPortfolioMarginProAccountInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/account` |
| `bnbTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/bnb-transfer` |
| `submitPortfolioMarginProFullTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/auto-collection` |
| `submitPortfolioMarginProSpecificTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/asset-collection` |
| `repayPortfolioMarginProBankruptcyLoan()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay` |
| `getPortfolioMarginProBankruptcyLoanAmount()` | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/pmLoan` |
| `repayFuturesNegativeBalance()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-negative-balance` |
| `updateAutoRepayFuturesStatus()` | :closed_lock_with_key:  | POST | `sapi/v1/portfolio/repay-futures-switch` |
| `getAutoRepayFuturesStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/repay-futures-switch` |
| `getPortfolioMarginProInterestHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/portfolio/interest-history` |
| `getFuturesTickLevelOrderbookDataLink()` | :closed_lock_with_key:  | GET | `sapi/v1/futures/histDataLink` |
| `getBlvtInfo()` |  | GET | `sapi/v1/blvt/tokenInfo` |
| `subscribeBlvt()` | :closed_lock_with_key:  | POST | `sapi/v1/blvt/subscribe` |
| `getBlvtSubscriptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/blvt/subscribe/record` |
| `redeemBlvt()` | :closed_lock_with_key:  | POST | `sapi/v1/blvt/redeem` |
| `getBlvtRedemptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/blvt/redeem/record` |
| `getBlvtUserLimitInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/blvt/userLimit` |
| `getPayTransactions()` | :closed_lock_with_key:  | GET | `sapi/v1/pay/transactions` |
| `createBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| `getBrokerSubAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount` |
| `enableMarginBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/futures` |
| `createApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi` |
| `changePermissionApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| `changeComissionBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission` |
| `enableUniversalTransferApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/permission/universalTransfer` |
| `updateIpRestrictionForSubAccountApiKey()` | :closed_lock_with_key:  | POST | `sapi/v2/broker/subAccountApi/ipRestriction` |
| `deleteIPRestrictionForSubAccountApiKey()` | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi/ipRestriction/ipList` |
| `deleteApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | DELETE | `sapi/v1/broker/subAccountApi` |
| `getSubAccountBrokerIpRestriction()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/ipRestriction` |
| `getApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi` |
| `getBrokerInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/info` |
| `updateSubAccountBNBBurn()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/spot` |
| `updateSubAccountMarginInterestBNBBurn()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/bnbBurn/marginInterest` |
| `getSubAccountBNBBurnStatus()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/bnbBurn/status` |
| `transferBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer` |
| `getBrokerSubAccountHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer` |
| `submitBrokerSubFuturesTransfer()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/transfer/futures` |
| `getSubAccountFuturesTransferHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/transfer/futures` |
| `getBrokerSubDepositHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/depositHist` |
| `getBrokerSubAccountSpotAssets()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/spotSummary` |
| `getSubAccountMarginAssetInfo()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccount/marginSummary` |
| `querySubAccountFuturesAssetInfo()` | :closed_lock_with_key:  | GET | `sapi/v3/broker/subAccount/futuresSummary` |
| `universalTransferBroker()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/universalTransfer` |
| `getUniversalTransferBroker()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/universalTransfer` |
| `updateBrokerSubAccountCommission()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission` |
| `updateBrokerSubAccountFuturesCommission()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/futures` |
| `getBrokerSubAccountFuturesCommission()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/futures` |
| `updateBrokerSubAccountCoinFuturesCommission()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| `getBrokerSubAccountCoinFuturesCommission()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/subAccountApi/commission/coinFutures` |
| `getBrokerSpotCommissionRebate()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/recentRecord` |
| `getBrokerFuturesCommissionRebate()` | :closed_lock_with_key:  | GET | `sapi/v1/broker/rebate/futures/recentRecord` |
| `getBrokerIfNewSpotUser()` | :closed_lock_with_key:  | GET | `sapi/v1/apiReferral/ifNewUser` |
| `getBrokerSubAccountDepositHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/bv1/apiReferral/ifNewUser` |
| `enableFuturesBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount` |
| `enableMarginApiKeyBrokerSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/margin` |
| `getSpotUserDataListenKey()` |  | POST | `api/v3/userDataStream` |
| `keepAliveSpotUserDataListenKey()` |  | PUT | `api/v3/userDataStream?listenKey=${listenKey}` |
| `closeSpotUserDataListenKey()` |  | DELETE | `api/v3/userDataStream?listenKey=${listenKey}` |
| `getMarginUserDataListenKey()` |  | POST | `sapi/v1/userDataStream` |
| `keepAliveMarginUserDataListenKey()` |  | PUT | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| `closeMarginUserDataListenKey()` |  | DELETE | `sapi/v1/userDataStream?listenKey=${listenKey}` |
| `getIsolatedMarginUserDataListenKey()` |  | POST | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| `keepAliveIsolatedMarginUserDataListenKey()` |  | PUT | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| `closeIsolatedMarginUserDataListenKey()` |  | DELETE | `sapi/v1/userDataStream/isolated?${serialiseParams(params)}` |
| `getBSwapLiquidity()` | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidity` |
| `addBSwapLiquidity()` | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityAdd` |
| `removeBSwapLiquidity()` | :closed_lock_with_key:  | POST | `sapi/v1/bswap/liquidityRemove` |
| `getBSwapOperations()` | :closed_lock_with_key:  | GET | `sapi/v1/bswap/liquidityOps` |
| `getLeftDailyPurchaseQuotaFlexibleProduct()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userLeftQuota` |
| `getLeftDailyRedemptionQuotaFlexibleProduct()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/daily/userRedemptionQuota` |
| `purchaseFixedAndActivityProject()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/customizedFixed/purchase` |
| `getFixedAndActivityProjects()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/list` |
| `getFixedAndActivityProductPosition()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/project/position/list` |
| `getLendingAccount()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/account` |
| `getPurchaseRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/purchaseRecord` |
| `getRedemptionRecord()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/redemptionRecord` |
| `getInterestHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/lending/union/interestHistory` |
| `changeFixedAndActivityPositionToDailyPosition()` | :closed_lock_with_key:  | POST | `sapi/v1/lending/positionChanged` |
| `enableConvertSubAccount()` | :closed_lock_with_key:  | POST | `sapi/v1/broker/subAccount/convert` |
| `convertBUSD()` | :closed_lock_with_key:  | POST | `sapi/v1/asset/convert-transfer` |
| `getConvertBUSDHistory()` | :closed_lock_with_key:  | GET | `sapi/v1/asset/convert-transfer/queryByPage` |

# usdm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [usdm-client.ts](/src/usdm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getServerTime()` |  | GET | `fapi/v1/ping` |
| `testConnectivity()` |  | GET | `fapi/v1/ping` |
| `getExchangeInfo()` |  | GET | `fapi/v1/exchangeInfo` |
| `getOrderBook()` |  | GET | `fapi/v1/depth` |
| `getRecentTrades()` |  | GET | `fapi/v1/trades` |
| `getHistoricalTrades()` |  | GET | `fapi/v1/historicalTrades` |
| `getAggregateTrades()` |  | GET | `fapi/v1/aggTrades` |
| `getKlines()` |  | GET | `fapi/v1/klines` |
| `getContinuousContractKlines()` |  | GET | `fapi/v1/continuousKlines` |
| `getIndexPriceKlines()` |  | GET | `fapi/v1/indexPriceKlines` |
| `getMarkPriceKlines()` |  | GET | `fapi/v1/markPriceKlines` |
| `getPremiumIndexKlines()` |  | GET | `fapi/v1/premiumIndexKlines` |
| `getMarkPrice()` |  | GET | `fapi/v1/premiumIndex` |
| `getFundingRateHistory()` |  | GET | `fapi/v1/fundingRate` |
| `getFundingRates()` |  | GET | `fapi/v1/fundingInfo` |
| `get24hrChangeStatististics()` |  | GET | `fapi/v1/ticker/24hr` |
| `get24hrChangeStatistics()` |  | GET | `fapi/v1/ticker/24hr` |
| `getSymbolPriceTicker()` |  | GET | `fapi/v1/ticker/price` |
| `getSymbolPriceTickerV2()` |  | GET | `fapi/v2/ticker/price` |
| `getSymbolOrderBookTicker()` |  | GET | `fapi/v1/ticker/bookTicker` |
| `getQuarterlyContractSettlementPrices()` |  | GET | `futures/data/delivery-price` |
| `getOpenInterest()` |  | GET | `fapi/v1/openInterest` |
| `getOpenInterestStatistics()` |  | GET | `futures/data/openInterestHist` |
| `getTopTradersLongShortPositionRatio()` |  | GET | `futures/data/topLongShortPositionRatio` |
| `getTopTradersLongShortAccountRatio()` |  | GET | `futures/data/topLongShortAccountRatio` |
| `getGlobalLongShortAccountRatio()` |  | GET | `futures/data/globalLongShortAccountRatio` |
| `getTakerBuySellVolume()` |  | GET | `futures/data/takerlongshortRatio` |
| `getHistoricalBlvtNavKlines()` |  | GET | `fapi/v1/lvtKlines` |
| `getCompositeSymbolIndex()` |  | GET | `fapi/v1/indexInfo` |
| `getMultiAssetsModeAssetIndex()` |  | GET | `fapi/v1/assetIndex` |
| `getBasis()` |  | GET | `futures/data/basis` |
| `getIndexPriceConstituents()` |  | GET | `fapi/v1/constituents` |
| `submitNewOrder()` | :closed_lock_with_key:  | POST | `fapi/v1/order` |
| `submitMultipleOrders()` | :closed_lock_with_key:  | POST | `fapi/v1/batchOrders` |
| `modifyOrder()` | :closed_lock_with_key:  | PUT | `fapi/v1/order` |
| `modifyMultipleOrders()` | :closed_lock_with_key:  | PUT | `fapi/v1/batchOrders` |
| `getOrderModifyHistory()` | :closed_lock_with_key:  | GET | `fapi/v1/orderAmendment` |
| `cancelOrder()` | :closed_lock_with_key:  | DELETE | `fapi/v1/order` |
| `cancelMultipleOrders()` | :closed_lock_with_key:  | DELETE | `fapi/v1/batchOrders` |
| `cancelAllOpenOrders()` | :closed_lock_with_key:  | DELETE | `fapi/v1/allOpenOrders` |
| `setCancelOrdersOnTimeout()` | :closed_lock_with_key:  | POST | `fapi/v1/countdownCancelAll` |
| `getOrder()` | :closed_lock_with_key:  | GET | `fapi/v1/order` |
| `getAllOrders()` | :closed_lock_with_key:  | GET | `fapi/v1/allOrders` |
| `getAllOpenOrders()` | :closed_lock_with_key:  | GET | `fapi/v1/openOrders` |
| `getCurrentOpenOrder()` | :closed_lock_with_key:  | GET | `fapi/v1/openOrder` |
| `getForceOrders()` | :closed_lock_with_key:  | GET | `fapi/v1/forceOrders` |
| `getAccountTrades()` | :closed_lock_with_key:  | GET | `fapi/v1/userTrades` |
| `setMarginType()` | :closed_lock_with_key:  | POST | `fapi/v1/marginType` |
| `setPositionMode()` | :closed_lock_with_key:  | POST | `fapi/v1/positionSide/dual` |
| `setLeverage()` | :closed_lock_with_key:  | POST | `fapi/v1/leverage` |
| `setMultiAssetsMode()` | :closed_lock_with_key:  | POST | `fapi/v1/multiAssetsMargin` |
| `setIsolatedPositionMargin()` | :closed_lock_with_key:  | POST | `fapi/v1/positionMargin` |
| `getPositions()` | :closed_lock_with_key:  | GET | `fapi/v2/positionRisk` |
| `getPositionsV3()` | :closed_lock_with_key:  | GET | `fapi/v3/positionRisk` |
| `getADLQuantileEstimation()` | :closed_lock_with_key:  | GET | `fapi/v1/adlQuantile` |
| `getPositionMarginChangeHistory()` | :closed_lock_with_key:  | GET | `fapi/v1/positionMargin/history` |
| `getBalanceV3()` | :closed_lock_with_key:  | GET | `fapi/v3/balance` |
| `getBalance()` | :closed_lock_with_key:  | GET | `fapi/v2/balance` |
| `getAccountInformationV3()` | :closed_lock_with_key:  | GET | `fapi/v3/account` |
| `getAccountInformation()` | :closed_lock_with_key:  | GET | `fapi/v2/account` |
| `getAccountComissionRate()` | :closed_lock_with_key:  | GET | `fapi/v1/commissionRate` |
| `getFuturesAccountConfig()` | :closed_lock_with_key:  | GET | `fapi/v1/accountConfig` |
| `getFuturesSymbolConfig()` | :closed_lock_with_key:  | GET | `fapi/v1/symbolConfig` |
| `getUserForceOrders()` | :closed_lock_with_key:  | GET | `fapi/v1/rateLimit/order` |
| `getNotionalAndLeverageBrackets()` | :closed_lock_with_key:  | GET | `fapi/v1/leverageBracket` |
| `getMultiAssetsMode()` | :closed_lock_with_key:  | GET | `fapi/v1/multiAssetsMargin` |
| `getCurrentPositionMode()` | :closed_lock_with_key:  | GET | `fapi/v1/positionSide/dual` |
| `getIncomeHistory()` | :closed_lock_with_key:  | GET | `fapi/v1/income` |
| `getApiQuantitativeRulesIndicators()` | :closed_lock_with_key:  | GET | `fapi/v1/apiTradingStatus` |
| `getFuturesTransactionHistoryDownloadId()` | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn` |
| `getFuturesTransactionHistoryDownloadLink()` | :closed_lock_with_key:  | GET | `fapi/v1/income/asyn/id` |
| `getFuturesOrderHistoryDownloadId()` | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn` |
| `getFuturesOrderHistoryDownloadLink()` | :closed_lock_with_key:  | GET | `fapi/v1/order/asyn/id` |
| `getFuturesTradeHistoryDownloadId()` | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn` |
| `getFuturesTradeDownloadLink()` | :closed_lock_with_key:  | GET | `fapi/v1/trade/asyn/id` |
| `setBNBBurnEnabled()` | :closed_lock_with_key:  | POST | `fapi/v1/feeBurn` |
| `getBNBBurnStatus()` | :closed_lock_with_key:  | GET | `fapi/v1/feeBurn` |
| `testOrder()` | :closed_lock_with_key:  | POST | `fapi/v1/order/test` |
| `getPortfolioMarginProAccountInfo()` | :closed_lock_with_key:  | GET | `fapi/v1/pmAccountInfo` |
| `getBrokerIfNewFuturesUser()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/ifNewUser` |
| `setBrokerCustomIdForClient()` | :closed_lock_with_key:  | POST | `fapi/v1/apiReferral/customization` |
| `getBrokerClientCustomIds()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/customization` |
| `getBrokerUserCustomId()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/userCustomization` |
| `getBrokerRebateDataOverview()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/overview` |
| `getBrokerUserTradeVolume()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/tradeVol` |
| `getBrokerRebateVolume()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/rebateVol` |
| `getBrokerTradeDetail()` | :closed_lock_with_key:  | GET | `fapi/v1/apiReferral/traderSummary` |
| `getFuturesUserDataListenKey()` |  | POST | `fapi/v1/listenKey` |
| `keepAliveFuturesUserDataListenKey()` |  | PUT | `fapi/v1/listenKey` |
| `closeFuturesUserDataListenKey()` |  | DELETE | `fapi/v1/listenKey` |

# coinm-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [coinm-client.ts](/src/coinm-client.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `getServerTime()` |  | GET | `dapi/v1/ping` |
| `testConnectivity()` |  | GET | `dapi/v1/ping` |
| `getExchangeInfo()` |  | GET | `dapi/v1/exchangeInfo` |
| `getOrderBook()` |  | GET | `dapi/v1/depth` |
| `getRecentTrades()` |  | GET | `dapi/v1/trades` |
| `getHistoricalTrades()` |  | GET | `dapi/v1/historicalTrades` |
| `getAggregateTrades()` |  | GET | `dapi/v1/aggTrades` |
| `getMarkPrice()` |  | GET | `dapi/v1/premiumIndex` |
| `getFundingRateHistory()` |  | GET | `dapi/v1/fundingRate` |
| `getFundingRate()` |  | GET | `dapi/v1/fundingInfo` |
| `getKlines()` |  | GET | `dapi/v1/klines` |
| `getContinuousContractKlines()` |  | GET | `dapi/v1/continuousKlines` |
| `getIndexPriceKlines()` |  | GET | `dapi/v1/indexPriceKlines` |
| `getMarkPriceKlines()` |  | GET | `dapi/v1/markPriceKlines` |
| `getPremiumIndexKlines()` |  | GET | `dapi/v1/premiumIndexKlines` |
| `get24hrChangeStatististics()` |  | GET | `dapi/v1/ticker/24hr` |
| `get24hrChangeStatistics()` |  | GET | `dapi/v1/ticker/24hr` |
| `getSymbolPriceTicker()` |  | GET | `dapi/v1/ticker/price` |
| `getSymbolOrderBookTicker()` |  | GET | `dapi/v1/ticker/bookTicker` |
| `getOpenInterest()` |  | GET | `dapi/v1/openInterest` |
| `getOpenInterestStatistics()` |  | GET | `futures/data/openInterestHist` |
| `getTopTradersLongShortAccountRatio()` |  | GET | `futures/data/topLongShortAccountRatio` |
| `getTopTradersLongShortPositionRatio()` |  | GET | `futures/data/topLongShortPositionRatio` |
| `getGlobalLongShortAccountRatio()` |  | GET | `futures/data/globalLongShortAccountRatio` |
| `getTakerBuySellVolume()` |  | GET | `futures/data/takerBuySellVol` |
| `getCompositeSymbolIndex()` |  | GET | `futures/data/basis` |
| `getIndexPriceConstituents()` |  | GET | `dapi/v1/constituents` |
| `getQuarterlyContractSettlementPrices()` |  | GET | `futures/data/delivery-price` |
| `submitNewOrder()` | :closed_lock_with_key:  | POST | `dapi/v1/order` |
| `submitMultipleOrders()` | :closed_lock_with_key:  | POST | `dapi/v1/batchOrders` |
| `modifyOrder()` | :closed_lock_with_key:  | PUT | `dapi/v1/order` |
| `modifyMultipleOrders()` | :closed_lock_with_key:  | PUT | `dapi/v1/batchOrders` |
| `getOrderModifyHistory()` | :closed_lock_with_key:  | GET | `dapi/v1/orderAmendment` |
| `cancelOrder()` | :closed_lock_with_key:  | DELETE | `dapi/v1/order` |
| `cancelMultipleOrders()` | :closed_lock_with_key:  | DELETE | `dapi/v1/batchOrders` |
| `cancelAllOpenOrders()` | :closed_lock_with_key:  | DELETE | `dapi/v1/allOpenOrders` |
| `setCancelOrdersOnTimeout()` | :closed_lock_with_key:  | POST | `dapi/v1/countdownCancelAll` |
| `getOrder()` | :closed_lock_with_key:  | GET | `dapi/v1/order` |
| `getAllOrders()` | :closed_lock_with_key:  | GET | `dapi/v1/allOrders` |
| `getAllOpenOrders()` | :closed_lock_with_key:  | GET | `dapi/v1/openOrders` |
| `getCurrentOpenOrder()` | :closed_lock_with_key:  | GET | `dapi/v1/openOrder` |
| `getForceOrders()` | :closed_lock_with_key:  | GET | `dapi/v1/forceOrders` |
| `getAccountTrades()` | :closed_lock_with_key:  | GET | `dapi/v1/userTrades` |
| `getPositions()` | :closed_lock_with_key:  | GET | `dapi/v1/positionRisk` |
| `setPositionMode()` | :closed_lock_with_key:  | POST | `dapi/v1/positionSide/dual` |
| `setMarginType()` | :closed_lock_with_key:  | POST | `dapi/v1/marginType` |
| `setLeverage()` | :closed_lock_with_key:  | POST | `dapi/v1/leverage` |
| `getADLQuantileEstimation()` | :closed_lock_with_key:  | GET | `dapi/v1/adlQuantile` |
| `setIsolatedPositionMargin()` | :closed_lock_with_key:  | POST | `dapi/v1/positionMargin` |
| `getPositionMarginChangeHistory()` | :closed_lock_with_key:  | GET | `dapi/v1/positionMargin/history` |
| `getBalance()` | :closed_lock_with_key:  | GET | `dapi/v1/balance` |
| `getAccountComissionRate()` | :closed_lock_with_key:  | GET | `dapi/v1/commissionRate` |
| `getAccountInformation()` | :closed_lock_with_key:  | GET | `dapi/v1/account` |
| `getNotionalAndLeverageBrackets()` | :closed_lock_with_key:  | GET | `dapi/v2/leverageBracket` |
| `getCurrentPositionMode()` | :closed_lock_with_key:  | GET | `dapi/v1/positionSide/dual` |
| `getIncomeHistory()` | :closed_lock_with_key:  | GET | `dapi/v1/income` |
| `getClassicPortfolioMarginAccount()` | :closed_lock_with_key:  | GET | `dapi/v1/pmAccountInfo` |
| `getClassicPortfolioMarginNotionalLimits()` | :closed_lock_with_key:  | GET | `dapi/v1/pmExchangeInfo` |
| `getBrokerIfNewFuturesUser()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/ifNewUser` |
| `setBrokerCustomIdForClient()` | :closed_lock_with_key:  | POST | `dapi/v1/apiReferral/customization` |
| `getBrokerClientCustomIds()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/customization` |
| `getBrokerUserCustomId()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/userCustomization` |
| `getBrokerRebateDataOverview()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/overview` |
| `getBrokerUserTradeVolume()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/tradeVol` |
| `getBrokerRebateVolume()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/rebateVol` |
| `getBrokerTradeDetail()` | :closed_lock_with_key:  | GET | `dapi/v1/apiReferral/traderSummary` |
| `getFuturesUserDataListenKey()` |  | POST | `dapi/v1/listenKey` |
| `keepAliveFuturesUserDataListenKey()` |  | PUT | `dapi/v1/listenKey` |
| `closeFuturesUserDataListenKey()` |  | DELETE | `dapi/v1/listenKey` |