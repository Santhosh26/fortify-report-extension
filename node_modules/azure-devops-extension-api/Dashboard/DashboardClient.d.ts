import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as TfsCore from "../Core/Core";
import * as Dashboard from "../Dashboard/Dashboard";
export declare class DashboardRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Create the supplied dashboard.
     *
     * @param dashboard - The initial state of the dashboard
     * @param teamContext - The team context for the operation
     */
    createDashboard(dashboard: Dashboard.Dashboard, teamContext: TfsCore.TeamContext): Promise<Dashboard.Dashboard>;
    /**
     * Delete a dashboard given its ID. This also deletes the widgets associated with this dashboard.
     *
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard to delete.
     */
    deleteDashboard(teamContext: TfsCore.TeamContext, dashboardId: string): Promise<void>;
    /**
     * Get a dashboard by its ID.
     *
     * @param teamContext - The team context for the operation
     * @param dashboardId -
     */
    getDashboard(teamContext: TfsCore.TeamContext, dashboardId: string): Promise<Dashboard.Dashboard>;
    /**
     * Get a list of dashboards under a project.
     *
     * @param teamContext - The team context for the operation
     */
    getDashboardsByProject(teamContext: TfsCore.TeamContext): Promise<Dashboard.Dashboard[]>;
    /**
     * Replace configuration for the specified dashboard. Replaces Widget list on Dashboard, only if property is supplied.
     *
     * @param dashboard - The Configuration of the dashboard to replace.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard to replace.
     */
    replaceDashboard(dashboard: Dashboard.Dashboard, teamContext: TfsCore.TeamContext, dashboardId: string): Promise<Dashboard.Dashboard>;
    /**
     * Update the name and position of dashboards in the supplied group, and remove omitted dashboards. Does not modify dashboard content.
     *
     * @param group -
     * @param teamContext - The team context for the operation
     */
    replaceDashboards(group: Dashboard.DashboardGroup, teamContext: TfsCore.TeamContext): Promise<Dashboard.DashboardGroup>;
    /**
     * Create a widget on the specified dashboard.
     *
     * @param widget - State of the widget to add
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of dashboard the widget will be added to.
     */
    createWidget(widget: Dashboard.Widget, teamContext: TfsCore.TeamContext, dashboardId: string): Promise<Dashboard.Widget>;
    /**
     * Delete the specified widget.
     *
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    deleteWidget(teamContext: TfsCore.TeamContext, dashboardId: string, widgetId: string): Promise<Dashboard.Dashboard>;
    /**
     * Get the current state of the specified widget.
     *
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to read.
     */
    getWidget(teamContext: TfsCore.TeamContext, dashboardId: string, widgetId: string): Promise<Dashboard.Widget>;
    /**
     * Override the  state of the specified widget.
     *
     * @param widget - State to be written for the widget.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    replaceWidget(widget: Dashboard.Widget, teamContext: TfsCore.TeamContext, dashboardId: string, widgetId: string): Promise<Dashboard.Widget>;
    /**
     * Perform a partial update of the specified widget.
     *
     * @param widget - Description of the widget changes to apply. All non-null fields will be replaced.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    updateWidget(widget: Dashboard.Widget, teamContext: TfsCore.TeamContext, dashboardId: string, widgetId: string): Promise<Dashboard.Widget>;
    /**
     * Get the widget metadata satisfying the specified contribution ID.
     *
     * @param contributionId - The ID of Contribution for the Widget
     * @param project - Project ID or project name
     */
    getWidgetMetadata(contributionId: string, project?: string): Promise<Dashboard.WidgetMetadataResponse>;
    /**
     * Get all available widget metadata in alphabetical order, including widgets marked with isVisibleFromCatalog == false.
     *
     * @param scope -
     * @param project - Project ID or project name
     */
    getWidgetTypes(scope: Dashboard.WidgetScope, project?: string): Promise<Dashboard.WidgetTypesResponse>;
}
