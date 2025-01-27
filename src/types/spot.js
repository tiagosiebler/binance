"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUniversalTransferType = exports.EnumWithdrawTransferType = exports.EnumWithdrawStatus = exports.EnumDepositStatus = void 0;
var EnumDepositStatus;
(function (EnumDepositStatus) {
    EnumDepositStatus[EnumDepositStatus["Pending"] = 0] = "Pending";
    EnumDepositStatus[EnumDepositStatus["CreditedButCannotWithdraw"] = 6] = "CreditedButCannotWithdraw";
    EnumDepositStatus[EnumDepositStatus["Success"] = 1] = "Success";
})(EnumDepositStatus || (exports.EnumDepositStatus = EnumDepositStatus = {}));
var EnumWithdrawStatus;
(function (EnumWithdrawStatus) {
    EnumWithdrawStatus[EnumWithdrawStatus["EmailSent"] = 0] = "EmailSent";
    EnumWithdrawStatus[EnumWithdrawStatus["Cancelled"] = 1] = "Cancelled";
    EnumWithdrawStatus[EnumWithdrawStatus["AwaitingApproval"] = 2] = "AwaitingApproval";
    EnumWithdrawStatus[EnumWithdrawStatus["Rejected"] = 3] = "Rejected";
    EnumWithdrawStatus[EnumWithdrawStatus["Processing"] = 4] = "Processing";
    EnumWithdrawStatus[EnumWithdrawStatus["Failure"] = 5] = "Failure";
    EnumWithdrawStatus[EnumWithdrawStatus["Completed"] = 6] = "Completed";
})(EnumWithdrawStatus || (exports.EnumWithdrawStatus = EnumWithdrawStatus = {}));
var EnumWithdrawTransferType;
(function (EnumWithdrawTransferType) {
    EnumWithdrawTransferType[EnumWithdrawTransferType["External"] = 0] = "External";
    EnumWithdrawTransferType[EnumWithdrawTransferType["Interal"] = 1] = "Interal";
})(EnumWithdrawTransferType || (exports.EnumWithdrawTransferType = EnumWithdrawTransferType = {}));
var EnumUniversalTransferType;
(function (EnumUniversalTransferType) {
    EnumUniversalTransferType["SpotToUSDM"] = "MAIN_UMFUTURE";
    EnumUniversalTransferType["SpotToCOINM"] = "MAIN_CMFUTURE";
    EnumUniversalTransferType["SpotToMargin"] = "MAIN_MARGIN";
    EnumUniversalTransferType["SpotToFunding"] = "MAIN_FUNDING";
    EnumUniversalTransferType["SpotToOptions"] = "MAIN_OPTION";
    EnumUniversalTransferType["FundingToSpot"] = "FUNDING_MAIN";
    EnumUniversalTransferType["FundingToUSDM"] = "FUNDING_UMFUTURE";
    EnumUniversalTransferType["FundingToCOINM"] = "FUNDING_CMFUTURE";
    EnumUniversalTransferType["FundingToMargin"] = "FUNDING_MARGIN";
    EnumUniversalTransferType["FundingToOptions"] = "FUNDING_OPTION";
    EnumUniversalTransferType["USDMToSpot"] = "UMFUTURE_MAIN";
    EnumUniversalTransferType["USDMToFunding"] = "UMFUTURE_FUNDING";
    EnumUniversalTransferType["USDMToMargin"] = "UMFUTURE_MARGIN";
    EnumUniversalTransferType["USDMToOptions"] = "UMFUTURE_OPTION";
    EnumUniversalTransferType["COINMToSpot"] = "CMFUTURE_MAIN";
    EnumUniversalTransferType["COINMToFunding"] = "CMFUTURE_FUNDING";
    EnumUniversalTransferType["COINMToMargin"] = "CMFUTURE_MARGIN";
    EnumUniversalTransferType["MarginToSpot"] = "MARGIN_MAIN";
    EnumUniversalTransferType["MarginToUSDM"] = "MARGIN_UMFUTURE";
    EnumUniversalTransferType["MarginToCOINM"] = "MARGIN_CMFUTURE";
    EnumUniversalTransferType["MarginToIsolatedMargin"] = "MARGIN_ISOLATEDMARGIN ";
    EnumUniversalTransferType["MarginToFunding"] = "MARGIN_FUNDING";
    EnumUniversalTransferType["MarginToOptions"] = "MARGIN_OPTION";
    EnumUniversalTransferType["IsolatedMarginToMargin"] = "ISOLATEDMARGIN_MARGIN";
    EnumUniversalTransferType["IsolatedMarginToIsolatedMargin"] = "ISOLATEDMARGIN_ISOLATEDMARGIN";
    EnumUniversalTransferType["OptionsToSpot"] = "OPTION_MAIN";
    EnumUniversalTransferType["OptionsToUSDM"] = "OPTION_UMFUTURE";
    EnumUniversalTransferType["OptionsToFunding"] = "OPTION_FUNDING";
    EnumUniversalTransferType["OptionsToMargin"] = "OPTION_MARGIN";
})(EnumUniversalTransferType || (exports.EnumUniversalTransferType = EnumUniversalTransferType = {}));
//# sourceMappingURL=spot.js.map