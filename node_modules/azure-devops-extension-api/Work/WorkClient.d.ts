import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as TfsCore from "../Core/Core";
import * as Work from "../Work/Work";
export declare class WorkRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Creates/updates an automation rules settings
     *
     * @param ruleRequestModel - Required parameters to create/update an automation rules settings
     * @param teamContext - The team context for the operation
     */
    updateAutomationRule(ruleRequestModel: Work.TeamAutomationRulesSettingsRequestModel, teamContext: TfsCore.TeamContext): Promise<void>;
    /**
     * Gets backlog configuration for a team
     *
     * @param teamContext - The team context for the operation
     */
    getBacklogConfigurations(teamContext: TfsCore.TeamContext): Promise<Work.BacklogConfiguration>;
    /**
     * Get a list of work items within a backlog level
     *
     * @param teamContext - The team context for the operation
     * @param backlogId -
     */
    getBacklogLevelWorkItems(teamContext: TfsCore.TeamContext, backlogId: string): Promise<Work.BacklogLevelWorkItems>;
    /**
     * Get a backlog level
     *
     * @param teamContext - The team context for the operation
     * @param id - The id of the backlog level
     */
    getBacklog(teamContext: TfsCore.TeamContext, id: string): Promise<Work.BacklogLevelConfiguration>;
    /**
     * List all backlog levels
     *
     * @param teamContext - The team context for the operation
     */
    getBacklogs(teamContext: TfsCore.TeamContext): Promise<Work.BacklogLevelConfiguration[]>;
    /**
     * Gets a badge that displays the status of columns on the board.
     *
     * @param teamContext - The team context for the operation
     * @param id - The id of the board.
     * @param columnOptions - Determines what columns to show.
     * @param columns - If columnOptions is set to custom, specify the list of column names.
     */
    getBoardBadge(teamContext: TfsCore.TeamContext, id: string, columnOptions?: Work.BoardBadgeColumnOptions, columns?: string[]): Promise<Work.BoardBadge>;
    /**
     * Gets a badge that displays the status of columns on the board.
     *
     * @param teamContext - The team context for the operation
     * @param id - The id of the board.
     * @param columnOptions - Determines what columns to show.
     * @param columns - If columnOptions is set to custom, specify the list of column names.
     */
    getBoardBadgeData(teamContext: TfsCore.TeamContext, id: string, columnOptions?: Work.BoardBadgeColumnOptions, columns?: string[]): Promise<string>;
    /**
     * Get available board columns in a project
     *
     * @param project - Project ID or project name
     */
    getColumnSuggestedValues(project?: string): Promise<Work.BoardSuggestedValue[]>;
    /**
     * Returns the list of parent field filter model for the given list of workitem ids
     *
     * @param teamContext - The team context for the operation
     * @param childBacklogContextCategoryRefName -
     * @param workitemIds -
     */
    getBoardMappingParentItems(teamContext: TfsCore.TeamContext, childBacklogContextCategoryRefName: string, workitemIds: number[]): Promise<Work.ParentChildWIMap[]>;
    /**
     * Get available board rows in a project
     *
     * @param project - Project ID or project name
     */
    getRowSuggestedValues(project?: string): Promise<Work.BoardSuggestedValue[]>;
    /**
     * Get board
     *
     * @param teamContext - The team context for the operation
     * @param id - identifier for board, either board's backlog level name (Eg:"Stories") or Id
     */
    getBoard(teamContext: TfsCore.TeamContext, id: string): Promise<Work.Board>;
    /**
     * Get boards
     *
     * @param teamContext - The team context for the operation
     */
    getBoards(teamContext: TfsCore.TeamContext): Promise<Work.BoardReference[]>;
    /**
     * Update board options
     *
     * @param options - options to updated
     * @param teamContext - The team context for the operation
     * @param id - identifier for board, either category plural name (Eg:"Stories") or guid
     */
    setBoardOptions(options: {
        [key: string]: string;
    }, teamContext: TfsCore.TeamContext, id: string): Promise<{
        [key: string]: string;
    }>;
    /**
     * Get board user settings for a board id
     *
     * @param teamContext - The team context for the operation
     * @param board - Board ID or Name
     */
    getBoardUserSettings(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardUserSettings>;
    /**
     * Update board user settings for the board id
     *
     * @param boardUserSettings -
     * @param teamContext - The team context for the operation
     * @param board -
     */
    updateBoardUserSettings(boardUserSettings: {
        [key: string]: string;
    }, teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardUserSettings>;
    /**
     * Get a team's capacity including total capacity and days off
     *
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    getCapacitiesWithIdentityRefAndTotals(teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.TeamCapacity>;
    /**
     * Get a team member's capacity
     *
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     * @param teamMemberId - ID of the team member
     */
    getCapacityWithIdentityRef(teamContext: TfsCore.TeamContext, iterationId: string, teamMemberId: string): Promise<Work.TeamMemberCapacityIdentityRef>;
    /**
     * Replace a team's capacity
     *
     * @param capacities - Team capacity to replace
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    replaceCapacitiesWithIdentityRef(capacities: Work.TeamMemberCapacityIdentityRef[], teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.TeamMemberCapacityIdentityRef[]>;
    /**
     * Update a team member's capacity
     *
     * @param patch - Updated capacity
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     * @param teamMemberId - ID of the team member
     */
    updateCapacityWithIdentityRef(patch: Work.CapacityPatch, teamContext: TfsCore.TeamContext, iterationId: string, teamMemberId: string): Promise<Work.TeamMemberCapacityIdentityRef>;
    /**
     * Get board card Rule settings for the board id or board by name
     *
     * @param teamContext - The team context for the operation
     * @param board -
     */
    getBoardCardRuleSettings(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardCardRuleSettings>;
    /**
     * Update board card Rule settings for the board id or board by name
     *
     * @param boardCardRuleSettings -
     * @param teamContext - The team context for the operation
     * @param board -
     */
    updateBoardCardRuleSettings(boardCardRuleSettings: Work.BoardCardRuleSettings, teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardCardRuleSettings>;
    /**
     * Update taskboard card Rule settings
     *
     * @param boardCardRuleSettings -
     * @param teamContext - The team context for the operation
     */
    updateTaskboardCardRuleSettings(boardCardRuleSettings: Work.BoardCardRuleSettings, teamContext: TfsCore.TeamContext): Promise<void>;
    /**
     * Get board card settings for the board id or board by name
     *
     * @param teamContext - The team context for the operation
     * @param board -
     */
    getBoardCardSettings(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardCardSettings>;
    /**
     * Update board card settings for the board id or board by name
     *
     * @param boardCardSettingsToSave -
     * @param teamContext - The team context for the operation
     * @param board -
     */
    updateBoardCardSettings(boardCardSettingsToSave: Work.BoardCardSettings, teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardCardSettings>;
    /**
     * Update taskboard card settings
     *
     * @param boardCardSettingsToSave -
     * @param teamContext - The team context for the operation
     */
    updateTaskboardCardSettings(boardCardSettingsToSave: Work.BoardCardSettings, teamContext: TfsCore.TeamContext): Promise<void>;
    /**
     * Get a board chart
     *
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     * @param name - The chart name
     */
    getBoardChart(teamContext: TfsCore.TeamContext, board: string, name: string): Promise<Work.BoardChart>;
    /**
     * Get board charts
     *
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     */
    getBoardCharts(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardChartReference[]>;
    /**
     * Update a board chart
     *
     * @param chart -
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     * @param name - The chart name
     */
    updateBoardChart(chart: Work.BoardChart, teamContext: TfsCore.TeamContext, board: string, name: string): Promise<Work.BoardChart>;
    /**
     * Get columns on a board
     *
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    getBoardColumns(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardColumn[]>;
    /**
     * Update columns on a board
     *
     * @param boardColumns - List of board columns to update
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    updateBoardColumns(boardColumns: Work.BoardColumn[], teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardColumn[]>;
    /**
     * Get Delivery View Data
     *
     * @param project - Project ID or project name
     * @param id - Identifier for delivery view
     * @param revision - Revision of the plan for which you want data. If the current plan is a different revision you will get an ViewRevisionMismatchException exception. If you do not supply a revision you will get data for the latest revision.
     * @param startDate - The start date of timeline
     * @param endDate - The end date of timeline
     */
    getDeliveryTimelineData(project: string, id: string, revision?: number, startDate?: Date, endDate?: Date): Promise<Work.DeliveryViewData>;
    /**
     * Get an iteration's capacity for all teams in iteration
     *
     * @param project - Project ID or project name
     * @param iterationId - ID of the iteration
     */
    getTotalIterationCapacities(project: string, iterationId: string): Promise<Work.IterationCapacity>;
    /**
     * Delete a team's iteration by iterationId
     *
     * @param teamContext - The team context for the operation
     * @param id - ID of the iteration
     */
    deleteTeamIteration(teamContext: TfsCore.TeamContext, id: string): Promise<void>;
    /**
     * Get team's iteration by iterationId
     *
     * @param teamContext - The team context for the operation
     * @param id - ID of the iteration
     */
    getTeamIteration(teamContext: TfsCore.TeamContext, id: string): Promise<Work.TeamSettingsIteration>;
    /**
     * Get a team's iterations using timeframe filter
     *
     * @param teamContext - The team context for the operation
     * @param timeframe - A filter for which iterations are returned based on relative time. Only Current is supported currently.
     */
    getTeamIterations(teamContext: TfsCore.TeamContext, timeframe?: string): Promise<Work.TeamSettingsIteration[]>;
    /**
     * Add an iteration to the team
     *
     * @param iteration - Iteration to add
     * @param teamContext - The team context for the operation
     */
    postTeamIteration(iteration: Work.TeamSettingsIteration, teamContext: TfsCore.TeamContext): Promise<Work.TeamSettingsIteration>;
    /**
     * Add a new plan for the team
     *
     * @param postedPlan - Plan definition
     * @param project - Project ID or project name
     */
    createPlan(postedPlan: Work.CreatePlan, project: string): Promise<Work.Plan>;
    /**
     * Delete the specified plan
     *
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    deletePlan(project: string, id: string): Promise<void>;
    /**
     * Get the information for the specified plan
     *
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    getPlan(project: string, id: string): Promise<Work.Plan>;
    /**
     * Get the information for all the plans configured for the given team
     *
     * @param project - Project ID or project name
     */
    getPlans(project: string): Promise<Work.Plan[]>;
    /**
     * Update the information for the specified plan
     *
     * @param updatedPlan - Plan definition to be updated
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    updatePlan(updatedPlan: Work.UpdatePlan, project: string, id: string): Promise<Work.Plan>;
    /**
     * Get process configuration
     *
     * @param project - Project ID or project name
     */
    getProcessConfiguration(project: string): Promise<Work.ProcessConfiguration>;
    /**
     * Get rows on a board
     *
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    getBoardRows(teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardRow[]>;
    /**
     * Update rows on a board
     *
     * @param boardRows - List of board rows to update
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    updateBoardRows(boardRows: Work.BoardRow[], teamContext: TfsCore.TeamContext, board: string): Promise<Work.BoardRow[]>;
    /**
     * @param teamContext - The team context for the operation
     */
    getColumns(teamContext: TfsCore.TeamContext): Promise<Work.TaskboardColumns>;
    /**
     * @param updateColumns -
     * @param teamContext - The team context for the operation
     */
    updateColumns(updateColumns: Work.UpdateTaskboardColumn[], teamContext: TfsCore.TeamContext): Promise<Work.TaskboardColumns>;
    /**
     * @param teamContext - The team context for the operation
     * @param iterationId -
     */
    getWorkItemColumns(teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.TaskboardWorkItemColumn[]>;
    /**
     * @param updateColumn -
     * @param teamContext - The team context for the operation
     * @param iterationId -
     * @param workItemId -
     */
    updateWorkItemColumn(updateColumn: Work.UpdateTaskboardWorkItemColumn, teamContext: TfsCore.TeamContext, iterationId: string, workItemId: number): Promise<void>;
    /**
     * Get team's days off for an iteration
     *
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    getTeamDaysOff(teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.TeamSettingsDaysOff>;
    /**
     * Set a team's days off for an iteration
     *
     * @param daysOffPatch - Team's days off patch containing a list of start and end dates
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    updateTeamDaysOff(daysOffPatch: Work.TeamSettingsDaysOffPatch, teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.TeamSettingsDaysOff>;
    /**
     * Get a collection of team field values
     *
     * @param teamContext - The team context for the operation
     */
    getTeamFieldValues(teamContext: TfsCore.TeamContext): Promise<Work.TeamFieldValues>;
    /**
     * Update team field values
     *
     * @param patch -
     * @param teamContext - The team context for the operation
     */
    updateTeamFieldValues(patch: Work.TeamFieldValuesPatch, teamContext: TfsCore.TeamContext): Promise<Work.TeamFieldValues>;
    /**
     * Get a team's settings
     *
     * @param teamContext - The team context for the operation
     */
    getTeamSettings(teamContext: TfsCore.TeamContext): Promise<Work.TeamSetting>;
    /**
     * Update a team's settings
     *
     * @param teamSettingsPatch - TeamSettings changes
     * @param teamContext - The team context for the operation
     */
    updateTeamSettings(teamSettingsPatch: Work.TeamSettingsPatch, teamContext: TfsCore.TeamContext): Promise<Work.TeamSetting>;
    /**
     * Get work items for iteration
     *
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    getIterationWorkItems(teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.IterationWorkItems>;
    /**
     * Reorder Product Backlog/Boards Work Items
     *
     * @param operation -
     * @param teamContext - The team context for the operation
     */
    reorderBacklogWorkItems(operation: Work.ReorderOperation, teamContext: TfsCore.TeamContext): Promise<Work.ReorderResult[]>;
    /**
     * Reorder Sprint Backlog/Taskboard Work Items
     *
     * @param operation -
     * @param teamContext - The team context for the operation
     * @param iterationId - The id of the iteration
     */
    reorderIterationWorkItems(operation: Work.ReorderOperation, teamContext: TfsCore.TeamContext, iterationId: string): Promise<Work.ReorderResult[]>;
}
