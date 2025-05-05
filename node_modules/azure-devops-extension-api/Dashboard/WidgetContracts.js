/**
 * From /Tfs/WebPlatform/Client/TFS/Dashboards/WidgetContracts.ts
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Used to differentiate between widget status helpers
     */
    var WidgetStatusType;
    (function (WidgetStatusType) {
        /**
         * The widget loaded successfully
         */
        WidgetStatusType[WidgetStatusType["Success"] = 0] = "Success";
        /**
         * The widget failed to load
         */
        WidgetStatusType[WidgetStatusType["Failure"] = 1] = "Failure";
        /**
         * The widget needs to be configured
         */
        WidgetStatusType[WidgetStatusType["Unconfigured"] = 2] = "Unconfigured";
    })(WidgetStatusType = exports.WidgetStatusType || (exports.WidgetStatusType = {}));
});
