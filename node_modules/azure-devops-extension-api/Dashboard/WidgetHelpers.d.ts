/**
 * From /Tfs/WebPlatform/Client/TFS/Dashboards/WidgetHelpers.ts
 */
import { CustomSettings, SaveStatus, WidgetStatus } from "./WidgetContracts";
export declare class WidgetStatusHelper {
    /**
     * method to encapsulate a successful result for a widget loading operation (load, reload, openLightbox etc)
     * @param state any state information to be passed to the initiator of the loading call.
     * @param title title for the lightbox of a widget when available.
     * @returns promise encapsulating the status of the widget loading operations.
     */
    static Success(state?: string): Promise<WidgetStatus>;
    /**
     * method to encapsulate a failed result for a widget loading operation (load, reload, openLightbox etc)
     * @param message message to display as part within the widget error experience.
     * @param isUserVisible indicates whether the message should be displayed to the user or a generic error message displayed. Defaults to true.
     * @param isRichText indicates whether the message is an html that can be rendered as a rich experience. Defaults to false. Only trusted extensions are
     * allowed to set this to true. For any 3rd party widgets passing this value as true, it will be ignored.
     * @returns promise encapsulating the status of the widget loading operations.
     */
    static Failure(message: string, isUserVisible?: boolean, isRichText?: boolean): Promise<WidgetStatus>;
    /**
     * method to encapsulate a result for a widget loading operation that results in the widget being in an unconfigured state.
     * @returns promise encapsulating the status of the widget loading operations.
     */
    static Unconfigured(): Promise<WidgetStatus>;
}
export declare class WidgetConfigurationSave {
    /**
     * method to encapsulate a valid state that is returned by the widget configuration
     * @param customSettings settings from the widget configuration to be returned as part of this state.
     * @returns promise encapsulating the state being returned.
     */
    static Valid(customSettings: CustomSettings): Promise<SaveStatus>;
    /**
     * method to encapsulate an invalid state that is returned by the widget configuration
     * @returns promise encapsulating the state being returned.
     */
    static Invalid(): Promise<SaveStatus>;
}
export declare class WidgetSizeConverter {
    /**
    * Cell width of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
    */
    private static CellWidth;
    /**
    * Cell height of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
    */
    private static CellHeight;
    /**
    * Cell gutter width between the cells that is used to draw the widget, this excludes the border around the widget (i.e. this is distance between widgets)
    */
    private static CellMarginWidth;
    /**
    * Cell gutter height between the cells that is used to draw the widget, this excludes the border around the widget  (i.e. this is distance between widgets)
    */
    private static CellMarginHeight;
    /**
    * Calculates a dimension in pixels, given widget cell size and grid dimensions
    * @returns size in pixels
    */
    private static CalculatePixelSize;
    /**
    * @returns width in pixels for 1x1 widget
    */
    static GetWidgetWidth(): number;
    /**
    * @returns height in pixels for 1x1 widget
    */
    static GetWidgetHeight(): number;
    /**
    * @returns width in pixels for widget gutter
    */
    static GetWidgetMarginWidth(): number;
    /**
    *  @returns height in pixels for widget gutter
    */
    static GetWidgetMarginHeight(): number;
    /**
    * Converts widget column span into pixels
    * @returns width in pixels
    */
    static ColumnsToPixelWidth(columnSpan: number): number;
    /**
    * Converts widget row span into pixels
    * @returns height in pixels
    */
    static RowsToPixelHeight(rowSpan: number): number;
}
