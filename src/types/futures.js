"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumPositionMarginChangeType = exports.EnumMultiAssetMode = exports.EnumDualSideMode = void 0;
var EnumDualSideMode;
(function (EnumDualSideMode) {
    EnumDualSideMode["HedgeMode"] = "true";
    EnumDualSideMode["OneWayMode"] = "false";
})(EnumDualSideMode || (exports.EnumDualSideMode = EnumDualSideMode = {}));
var EnumMultiAssetMode;
(function (EnumMultiAssetMode) {
    EnumMultiAssetMode["MultiAssetsMode"] = "true";
    EnumMultiAssetMode["SingleAssetsMode"] = "false";
})(EnumMultiAssetMode || (exports.EnumMultiAssetMode = EnumMultiAssetMode = {}));
var EnumPositionMarginChangeType;
(function (EnumPositionMarginChangeType) {
    EnumPositionMarginChangeType[EnumPositionMarginChangeType["AddPositionMargin"] = 1] = "AddPositionMargin";
    EnumPositionMarginChangeType[EnumPositionMarginChangeType["ReducePositionMargin"] = 0] = "ReducePositionMargin";
})(EnumPositionMarginChangeType || (exports.EnumPositionMarginChangeType = EnumPositionMarginChangeType = {}));
//# sourceMappingURL=futures.js.map