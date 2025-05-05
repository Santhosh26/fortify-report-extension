/**
 * From /Tfs/WebPlatform/Client/TFS/Dashboards/WidgetHelpers.ts
 */
define(["require", "exports", "./WidgetContracts"], function (require, exports, WidgetContracts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WidgetStatusHelper = /** @class */ (function () {
        function WidgetStatusHelper() {
        }
        /**
         * method to encapsulate a successful result for a widget loading operation (load, reload, openLightbox etc)
         * @param state any state information to be passed to the initiator of the loading call.
         * @param title title for the lightbox of a widget when available.
         * @returns promise encapsulating the status of the widget loading operations.
         */
        WidgetStatusHelper.Success = function (state) {
            return Promise.resolve({
                state: state,
                statusType: WidgetContracts_1.WidgetStatusType.Success
            });
        };
        /**
         * method to encapsulate a failed result for a widget loading operation (load, reload, openLightbox etc)
         * @param message message to display as part within the widget error experience.
         * @param isUserVisible indicates whether the message should be displayed to the user or a generic error message displayed. Defaults to true.
         * @param isRichText indicates whether the message is an html that can be rendered as a rich experience. Defaults to false. Only trusted extensions are
         * allowed to set this to true. For any 3rd party widgets passing this value as true, it will be ignored.
         * @returns promise encapsulating the status of the widget loading operations.
         */
        WidgetStatusHelper.Failure = function (message, isUserVisible, isRichText) {
            if (isUserVisible === void 0) { isUserVisible = true; }
            if (isRichText === void 0) { isRichText = false; }
            return Promise.reject({
                message: message,
                isRichText: isRichText,
                isUserVisible: isUserVisible
            });
        };
        /**
         * method to encapsulate a result for a widget loading operation that results in the widget being in an unconfigured state.
         * @returns promise encapsulating the status of the widget loading operations.
         */
        WidgetStatusHelper.Unconfigured = function () {
            return Promise.resolve({
                statusType: WidgetContracts_1.WidgetStatusType.Unconfigured
            });
        };
        return WidgetStatusHelper;
    }());
    exports.WidgetStatusHelper = WidgetStatusHelper;
    var WidgetConfigurationSave = /** @class */ (function () {
        function WidgetConfigurationSave() {
        }
        /**
         * method to encapsulate a valid state that is returned by the widget configuration
         * @param customSettings settings from the widget configuration to be returned as part of this state.
         * @returns promise encapsulating the state being returned.
         */
        WidgetConfigurationSave.Valid = function (customSettings) {
            return Promise.resolve({
                customSettings: customSettings,
                isValid: true
            });
        };
        /**
         * method to encapsulate an invalid state that is returned by the widget configuration
         * @returns promise encapsulating the state being returned.
         */
        WidgetConfigurationSave.Invalid = function () {
            return Promise.reject({
                isValid: false
            });
        };
        return WidgetConfigurationSave;
    }());
    exports.WidgetConfigurationSave = WidgetConfigurationSave;
    var WidgetSizeConverter = /** @class */ (function () {
        function WidgetSizeConverter() {
        }
        /**
        * Calculates a dimension in pixels, given widget cell size and grid dimensions
        * @returns size in pixels
        */
        WidgetSizeConverter.CalculatePixelSize = function (cellCount, gridCellSize, gridMarginSize) {
            //the dimensions of a multi-celled widget are a combination of space of the occupied cells AND the margins between those cells
            var marginCount = cellCount - 1;
            return gridCellSize * cellCount + gridMarginSize * marginCount;
        };
        /**
        * @returns width in pixels for 1x1 widget
        */
        WidgetSizeConverter.GetWidgetWidth = function () {
            return WidgetSizeConverter.CellWidth;
        };
        /**
        * @returns height in pixels for 1x1 widget
        */
        WidgetSizeConverter.GetWidgetHeight = function () {
            return WidgetSizeConverter.CellHeight;
        };
        /**
        * @returns width in pixels for widget gutter
        */
        WidgetSizeConverter.GetWidgetMarginWidth = function () {
            return WidgetSizeConverter.CellMarginWidth;
        };
        /**
        *  @returns height in pixels for widget gutter
        */
        WidgetSizeConverter.GetWidgetMarginHeight = function () {
            return WidgetSizeConverter.CellMarginHeight;
        };
        /**
        * Converts widget column span into pixels
        * @returns width in pixels
        */
        WidgetSizeConverter.ColumnsToPixelWidth = function (columnSpan) {
            return this.CalculatePixelSize(columnSpan, WidgetSizeConverter.GetWidgetWidth(), WidgetSizeConverter.GetWidgetMarginWidth());
        };
        /**
        * Converts widget row span into pixels
        * @returns height in pixels
        */
        WidgetSizeConverter.RowsToPixelHeight = function (rowSpan) {
            return this.CalculatePixelSize(rowSpan, WidgetSizeConverter.GetWidgetHeight(), WidgetSizeConverter.GetWidgetMarginHeight());
        };
        /**
        * Cell width of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
        */
        WidgetSizeConverter.CellWidth = 160;
        /**
        * Cell height of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
        */
        WidgetSizeConverter.CellHeight = 160;
        /**
        * Cell gutter width between the cells that is used to draw the widget, this excludes the border around the widget (i.e. this is distance between widgets)
        */
        WidgetSizeConverter.CellMarginWidth = 10;
        /**
        * Cell gutter height between the cells that is used to draw the widget, this excludes the border around the widget  (i.e. this is distance between widgets)
        */
        WidgetSizeConverter.CellMarginHeight = 10;
        return WidgetSizeConverter;
    }());
    exports.WidgetSizeConverter = WidgetSizeConverter;
});
