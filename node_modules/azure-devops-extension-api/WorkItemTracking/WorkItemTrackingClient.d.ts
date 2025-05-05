import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as WebApi from "../WebApi/WebApi";
import * as WorkItemTracking from "../WorkItemTracking/WorkItemTracking";
export declare class WorkItemTrackingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE. This returns Doing, Done, Follows and activity work items details.
     *
     * @param queryOption -
     */
    getAccountMyWorkData(queryOption?: WorkItemTracking.QueryOption): Promise<WorkItemTracking.AccountMyWorkResult>;
    /**
     * Gets recent work item activities
     *
     */
    getRecentActivityData(): Promise<WorkItemTracking.AccountRecentActivityWorkItemModel2[]>;
    /**
     * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE.
     *
     */
    getRecentMentions(): Promise<WorkItemTracking.AccountRecentMentionWorkItemModel[]>;
    /**
     * Get the list of work item tracking outbound artifact link types.
     *
     */
    getWorkArtifactLinkTypes(): Promise<WorkItemTracking.WorkArtifactLink[]>;
    /**
     * Queries work items linked to a given list of artifact URI.
     *
     * @param artifactUriQuery - Defines a list of artifact URI for querying work items.
     * @param project - Project ID or project name
     */
    queryWorkItemsForArtifactUris(artifactUriQuery: WorkItemTracking.ArtifactUriQuery, project?: string): Promise<WorkItemTracking.ArtifactUriQueryResult>;
    /**
     * Uploads an attachment.
     *
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param fileName - The name of the file
     * @param uploadType - Attachment upload type: Simple or Chunked
     * @param areaPath - Target project Area Path
     */
    createAttachment(content: any, project?: string, fileName?: string, uploadType?: string, areaPath?: string): Promise<WorkItemTracking.AttachmentReference>;
    /**
     * Downloads an attachment.
     *
     * @param id - Attachment ID
     * @param project - Project ID or project name
     * @param fileName - Name of the file
     * @param download - If set to \<c\>true\</c\> always download attachment
     */
    getAttachmentContent(id: string, project?: string, fileName?: string, download?: boolean): Promise<ArrayBuffer>;
    /**
     * Downloads an attachment.
     *
     * @param id - Attachment ID
     * @param project - Project ID or project name
     * @param fileName - Name of the file
     * @param download - If set to \<c\>true\</c\> always download attachment
     */
    getAttachmentZip(id: string, project?: string, fileName?: string, download?: boolean): Promise<ArrayBuffer>;
    /**
     * Gets root classification nodes or list of classification nodes for a given list of nodes ids, for a given project. In case ids parameter is supplied you will  get list of classification nodes for those ids. Otherwise you will get root classification nodes for this project.
     *
     * @param project - Project ID or project name
     * @param ids - Comma separated integer classification nodes ids. It's not required, if you want root nodes.
     * @param depth - Depth of children to fetch.
     * @param errorPolicy - Flag to handle errors in getting some nodes. Possible options are Fail and Omit.
     */
    getClassificationNodes(project: string, ids: number[], depth?: number, errorPolicy?: WorkItemTracking.ClassificationNodesErrorPolicy): Promise<WorkItemTracking.WorkItemClassificationNode[]>;
    /**
     * Gets root classification nodes under the project.
     *
     * @param project - Project ID or project name
     * @param depth - Depth of children to fetch.
     */
    getRootNodes(project: string, depth?: number): Promise<WorkItemTracking.WorkItemClassificationNode[]>;
    /**
     * Create new or update an existing classification node.
     *
     * @param postedNode - Node to create or update.
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     */
    createOrUpdateClassificationNode(postedNode: WorkItemTracking.WorkItemClassificationNode, project: string, structureGroup: WorkItemTracking.TreeStructureGroup, path?: string): Promise<WorkItemTracking.WorkItemClassificationNode>;
    /**
     * Delete an existing classification node.
     *
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     * @param reclassifyId - Id of the target classification node for reclassification.
     */
    deleteClassificationNode(project: string, structureGroup: WorkItemTracking.TreeStructureGroup, path?: string, reclassifyId?: number): Promise<void>;
    /**
     * Gets the classification node for a given node path.
     *
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     * @param depth - Depth of children to fetch.
     */
    getClassificationNode(project: string, structureGroup: WorkItemTracking.TreeStructureGroup, path?: string, depth?: number): Promise<WorkItemTracking.WorkItemClassificationNode>;
    /**
     * Update an existing classification node.
     *
     * @param postedNode - Node to create or update.
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     */
    updateClassificationNode(postedNode: WorkItemTracking.WorkItemClassificationNode, project: string, structureGroup: WorkItemTracking.TreeStructureGroup, path?: string): Promise<WorkItemTracking.WorkItemClassificationNode>;
    /**
     * Gets a comment for a work item at the specified revision.
     *
     * @param id - Work item id
     * @param revision - Revision for which the comment need to be fetched
     * @param project - Project ID or project name
     */
    getComment(id: number, revision: number, project?: string): Promise<WorkItemTracking.WorkItemComment>;
    /**
     * Gets the specified number of comments for a work item from the specified revision.
     *
     * @param id - Work item id
     * @param project - Project ID or project name
     * @param fromRevision - Revision from which comments are to be fetched (default is 1)
     * @param top - The number of comments to return (default is 200)
     * @param order - Ascending or descending by revision id (default is ascending)
     */
    getComments(id: number, project?: string, fromRevision?: number, top?: number, order?: WorkItemTracking.CommentSortOrder): Promise<WorkItemTracking.WorkItemComments>;
    /**
     * Create a new field.
     *
     * @param workItemField - New field definition
     * @param project - Project ID or project name
     */
    createField(workItemField: WorkItemTracking.WorkItemField, project?: string): Promise<WorkItemTracking.WorkItemField>;
    /**
     * Deletes the field. To undelete a filed, see "Update Field" API.
     *
     * @param fieldNameOrRefName - Field simple name or reference name
     * @param project - Project ID or project name
     */
    deleteField(fieldNameOrRefName: string, project?: string): Promise<void>;
    /**
     * Gets information on a specific field.
     *
     * @param fieldNameOrRefName - Field simple name or reference name
     * @param project - Project ID or project name
     */
    getField(fieldNameOrRefName: string, project?: string): Promise<WorkItemTracking.WorkItemField>;
    /**
     * Returns information for all fields. The project ID/name parameter is optional.
     *
     * @param project - Project ID or project name
     * @param expand - Use ExtensionFields to include extension fields, otherwise exclude them. Unless the feature flag for this parameter is enabled, extension fields are always included.
     */
    getFields(project?: string, expand?: WorkItemTracking.GetFieldsExpand): Promise<WorkItemTracking.WorkItemField[]>;
    /**
     * Update a field.
     *
     * @param payload - Payload contains desired value of the field's properties
     * @param fieldNameOrRefName - Name/reference name of the field to be updated
     * @param project - Project ID or project name
     */
    updateField(payload: WorkItemTracking.UpdateWorkItemField, fieldNameOrRefName: string, project?: string): Promise<WorkItemTracking.WorkItemField>;
    /**
     * Creates a query, or moves a query.
     *
     * @param postedQuery - The query to create.
     * @param project - Project ID or project name
     * @param query - The parent id or path under which the query is to be created.
     * @param validateWiqlOnly - If you only want to validate your WIQL query without actually creating one, set it to true. Default is false.
     */
    createQuery(postedQuery: WorkItemTracking.QueryHierarchyItem, project: string, query: string, validateWiqlOnly?: boolean): Promise<WorkItemTracking.QueryHierarchyItem>;
    /**
     * Delete a query or a folder. This deletes any permission change on the deleted query or folder and any of its descendants if it is a folder. It is important to note that the deleted permission changes cannot be recovered upon undeleting the query or folder.
     *
     * @param project - Project ID or project name
     * @param query - ID or path of the query or folder to delete.
     */
    deleteQuery(project: string, query: string): Promise<void>;
    /**
     * Gets the root queries and their children
     *
     * @param project - Project ID or project name
     * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
     * @param depth - In the folder of queries, return child queries and folders to this depth.
     * @param includeDeleted - Include deleted queries and folders
     */
    getQueries(project: string, expand?: WorkItemTracking.QueryExpand, depth?: number, includeDeleted?: boolean): Promise<WorkItemTracking.QueryHierarchyItem[]>;
    /**
     * Retrieves an individual query and its children
     *
     * @param project - Project ID or project name
     * @param query - ID or path of the query.
     * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
     * @param depth - In the folder of queries, return child queries and folders to this depth.
     * @param includeDeleted - Include deleted queries and folders
     * @param useIsoDateFormat - DateTime query clauses will be formatted using a ISO 8601 compliant format
     */
    getQuery(project: string, query: string, expand?: WorkItemTracking.QueryExpand, depth?: number, includeDeleted?: boolean, useIsoDateFormat?: boolean): Promise<WorkItemTracking.QueryHierarchyItem>;
    /**
     * Searches all queries the user has access to in the current project
     *
     * @param project - Project ID or project name
     * @param filter - The text to filter the queries with.
     * @param top - The number of queries to return (Default is 50 and maximum is 200).
     * @param expand -
     * @param includeDeleted - Include deleted queries and folders
     */
    searchQueries(project: string, filter: string, top?: number, expand?: WorkItemTracking.QueryExpand, includeDeleted?: boolean): Promise<WorkItemTracking.QueryHierarchyItemsResult>;
    /**
     * Update a query or a folder. This allows you to update, rename and move queries and folders.
     *
     * @param queryUpdate - The query to update.
     * @param project - Project ID or project name
     * @param query - The ID or path for the query to update.
     * @param undeleteDescendants - Undelete the children of this folder. It is important to note that this will not bring back the permission changes that were previously applied to the descendants.
     */
    updateQuery(queryUpdate: WorkItemTracking.QueryHierarchyItem, project: string, query: string, undeleteDescendants?: boolean): Promise<WorkItemTracking.QueryHierarchyItem>;
    /**
     * Gets a list of queries by ids (Maximum 1000)
     *
     * @param queryGetRequest -
     * @param project - Project ID or project name
     */
    getQueriesBatch(queryGetRequest: WorkItemTracking.QueryBatchGetRequest, project: string): Promise<WorkItemTracking.QueryHierarchyItem[]>;
    /**
     * Destroys the specified work item permanently from the Recycle Bin. This action can not be undone.
     *
     * @param id - ID of the work item to be destroyed permanently
     * @param project - Project ID or project name
     */
    destroyWorkItem(id: number, project?: string): Promise<void>;
    /**
     * Gets a deleted work item from Recycle Bin.
     *
     * @param id - ID of the work item to be returned
     * @param project - Project ID or project name
     */
    getDeletedWorkItem(id: number, project?: string): Promise<WorkItemTracking.WorkItemDelete>;
    /**
     * Gets the work items from the recycle bin, whose IDs have been specified in the parameters
     *
     * @param ids - Comma separated list of IDs of the deleted work items to be returned
     * @param project - Project ID or project name
     */
    getDeletedWorkItems(ids: number[], project?: string): Promise<WorkItemTracking.WorkItemDeleteReference[]>;
    /**
     * Gets a list of the IDs and the URLs of the deleted the work items in the Recycle Bin.
     *
     * @param project - Project ID or project name
     */
    getDeletedWorkItemShallowReferences(project?: string): Promise<WorkItemTracking.WorkItemDeleteShallowReference[]>;
    /**
     * Restores the deleted work item from Recycle Bin.
     *
     * @param payload - Paylod with instructions to update the IsDeleted flag to false
     * @param id - ID of the work item to be restored
     * @param project - Project ID or project name
     */
    restoreWorkItem(payload: WorkItemTracking.WorkItemDeleteUpdate, id: number, project?: string): Promise<WorkItemTracking.WorkItemDelete>;
    /**
     * Returns a fully hydrated work item for the requested revision
     *
     * @param id -
     * @param revisionNumber -
     * @param project - Project ID or project name
     * @param expand -
     */
    getRevision(id: number, revisionNumber: number, project?: string, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    /**
     * Returns the list of fully hydrated work item revisions, paged.
     *
     * @param id -
     * @param project - Project ID or project name
     * @param top -
     * @param skip -
     * @param expand -
     */
    getRevisions(id: number, project?: string, top?: number, skip?: number, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem[]>;
    /**
     * RESTful method to send mail for selected/queried work items.
     *
     * @param body -
     * @param project - Project ID or project name
     */
    sendMail(body: WorkItemTracking.SendMailBody, project?: string): Promise<void>;
    /**
     * Creates a template
     *
     * @param template - Template contents
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     */
    createTemplate(template: WorkItemTracking.WorkItemTemplate, project: string, team: string): Promise<WorkItemTracking.WorkItemTemplate>;
    /**
     * Gets template
     *
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param workitemtypename - Optional, When specified returns templates for given Work item type.
     */
    getTemplates(project: string, team: string, workitemtypename?: string): Promise<WorkItemTracking.WorkItemTemplateReference[]>;
    /**
     * Deletes the template with given id
     *
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template id
     */
    deleteTemplate(project: string, team: string, templateId: string): Promise<void>;
    /**
     * Gets the template with specified id
     *
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template Id
     */
    getTemplate(project: string, team: string, templateId: string): Promise<WorkItemTracking.WorkItemTemplate>;
    /**
     * Replace template contents
     *
     * @param templateContent - Template contents to replace with
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template id
     */
    replaceTemplate(templateContent: WorkItemTracking.WorkItemTemplate, project: string, team: string, templateId: string): Promise<WorkItemTracking.WorkItemTemplate>;
    /**
     * Returns a single update for a work item
     *
     * @param id -
     * @param updateNumber -
     * @param project - Project ID or project name
     */
    getUpdate(id: number, updateNumber: number, project?: string): Promise<WorkItemTracking.WorkItemUpdate>;
    /**
     * Returns the deltas between work item revisions
     *
     * @param id -
     * @param project - Project ID or project name
     * @param top -
     * @param skip -
     */
    getUpdates(id: number, project?: string, top?: number, skip?: number): Promise<WorkItemTracking.WorkItemUpdate[]>;
    /**
     * Gets the results of the query given its WIQL.
     *
     * @param wiql - The query containing the WIQL.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    queryByWiql(wiql: WorkItemTracking.Wiql, project?: string, team?: string, timePrecision?: boolean, top?: number): Promise<WorkItemTracking.WorkItemQueryResult>;
    /**
     * Gets the results of the query given the query ID.
     *
     * @param id - The query ID.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    getQueryResultCount(id: string, project?: string, team?: string, timePrecision?: boolean, top?: number): Promise<number>;
    /**
     * Gets the results of the query given the query ID.
     *
     * @param id - The query ID.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    queryById(id: string, project?: string, team?: string, timePrecision?: boolean, top?: number): Promise<WorkItemTracking.WorkItemQueryResult>;
    /**
     * Get a work item icon given the friendly name and icon color.
     *
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    getWorkItemIconJson(icon: string, color?: string, v?: number): Promise<WorkItemTracking.WorkItemIcon>;
    /**
     * Get a list of all work item icons.
     *
     */
    getWorkItemIcons(): Promise<WorkItemTracking.WorkItemIcon[]>;
    /**
     * Get a work item icon given the friendly name and icon color.
     *
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    getWorkItemIconSvg(icon: string, color?: string, v?: number): Promise<any>;
    /**
     * Get a work item icon given the friendly name and icon color.
     *
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    getWorkItemIconXaml(icon: string, color?: string, v?: number): Promise<any>;
    /**
     * Get a batch of work item links
     *
     * @param project - Project ID or project name
     * @param linkTypes - A list of types to filter the results to specific link types. Omit this parameter to get work item links of all link types.
     * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item links of all work item types.
     * @param continuationToken - Specifies the continuationToken to start the batch from. Omit this parameter to get the first batch of links.
     * @param startDateTime - Date/time to use as a starting point for link changes. Only link changes that occurred after that date/time will be returned. Cannot be used in conjunction with 'watermark' parameter.
     */
    getReportingLinksByLinkType(project?: string, linkTypes?: string[], types?: string[], continuationToken?: string, startDateTime?: Date): Promise<WorkItemTracking.ReportingWorkItemLinksBatch>;
    /**
     * Gets the work item relation type definition.
     *
     * @param relation - The relation name
     */
    getRelationType(relation: string): Promise<WorkItemTracking.WorkItemRelationType>;
    /**
     * Gets the work item relation types.
     *
     */
    getRelationTypes(): Promise<WorkItemTracking.WorkItemRelationType[]>;
    /**
     * Get a batch of work item revisions with the option of including deleted items
     *
     * @param project - Project ID or project name
     * @param fields - A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
     * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
     * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param includeIdentityRef - Return an identity reference instead of a string value for identity fields.
     * @param includeDeleted - Specify if the deleted item should be returned.
     * @param includeTagRef - Specify if the tag objects should be returned for System.Tags field.
     * @param includeLatestOnly - Return only the latest revisions of work items, skipping all historical revisions
     * @param expand - Return all the fields in work item revisions, including long text fields which are not returned by default
     * @param includeDiscussionChangesOnly - Return only the those revisions of work items, where only history field was changed
     * @param maxPageSize - The maximum number of results to return in this batch
     */
    readReportingRevisionsGet(project?: string, fields?: string[], types?: string[], continuationToken?: string, startDateTime?: Date, includeIdentityRef?: boolean, includeDeleted?: boolean, includeTagRef?: boolean, includeLatestOnly?: boolean, expand?: WorkItemTracking.ReportingRevisionsExpand, includeDiscussionChangesOnly?: boolean, maxPageSize?: number): Promise<WorkItemTracking.ReportingWorkItemRevisionsBatch>;
    /**
     * Get a batch of work item revisions. This request may be used if your list of fields is large enough that it may run the URL over the length limit.
     *
     * @param filter - An object that contains request settings: field filter, type filter, identity format
     * @param project - Project ID or project name
     * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param expand -
     */
    readReportingRevisionsPost(filter: WorkItemTracking.ReportingWorkItemRevisionsFilter, project?: string, continuationToken?: string, startDateTime?: Date, expand?: WorkItemTracking.ReportingRevisionsExpand): Promise<WorkItemTracking.ReportingWorkItemRevisionsBatch>;
    /**
     * Creates a single work item.
     *
     * @param document - The JSON Patch document representing the work item
     * @param project - Project ID or project name
     * @param type - The work item type of the work item to create
     * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
     * @param bypassRules - Do not enforce the work item type rules on this update
     * @param suppressNotifications - Do not fire any notifications for this change
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    createWorkItem(document: WebApi.JsonPatchDocument, project: string, type: string, validateOnly?: boolean, bypassRules?: boolean, suppressNotifications?: boolean, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    /**
     * Returns a single work item from a template.
     *
     * @param project - Project ID or project name
     * @param type - The work item type name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    getWorkItemTemplate(project: string, type: string, fields?: string, asOf?: Date, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    /**
     * Deletes the specified work item and sends it to the Recycle Bin, so that it can be restored back, if required. Optionally, if the destroy parameter has been set to true, it destroys the work item permanently. WARNING: If the destroy parameter is set to true, work items deleted by this command will NOT go to recycle-bin and there is no way to restore/recover them after deletion. It is recommended NOT to use this parameter. If you do, please use this parameter with extreme caution.
     *
     * @param id - ID of the work item to be deleted
     * @param project - Project ID or project name
     * @param destroy - Optional parameter, if set to true, the work item is deleted permanently. Please note: the destroy action is PERMANENT and cannot be undone.
     */
    deleteWorkItem(id: number, project?: string, destroy?: boolean): Promise<WorkItemTracking.WorkItemDelete>;
    /**
     * Returns a single work item.
     *
     * @param id - The work item id
     * @param project - Project ID or project name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    getWorkItem(id: number, project?: string, fields?: string[], asOf?: Date, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    /**
     * Returns a list of work items (Maximum 200)
     *
     * @param ids - The comma-separated list of requested work item ids. (Maximum 200 ids allowed).
     * @param project - Project ID or project name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     * @param errorPolicy - The flag to control error policy in a bulk get work items request. Possible options are \{Fail, Omit\}.
     */
    getWorkItems(ids: number[], project?: string, fields?: string[], asOf?: Date, expand?: WorkItemTracking.WorkItemExpand, errorPolicy?: WorkItemTracking.WorkItemErrorPolicy): Promise<WorkItemTracking.WorkItem[]>;
    /**
     * Updates a single work item.
     *
     * @param document - The JSON Patch document representing the update
     * @param id - The id of the work item to update
     * @param project - Project ID or project name
     * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
     * @param bypassRules - Do not enforce the work item type rules on this update
     * @param suppressNotifications - Do not fire any notifications for this change
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    updateWorkItem(document: WebApi.JsonPatchDocument, id: number, project?: string, validateOnly?: boolean, bypassRules?: boolean, suppressNotifications?: boolean, expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    /**
     * Gets work items for a list of work item ids (Maximum 200)
     *
     * @param workItemGetRequest -
     * @param project - Project ID or project name
     */
    getWorkItemsBatch(workItemGetRequest: WorkItemTracking.WorkItemBatchGetRequest, project?: string): Promise<WorkItemTracking.WorkItem[]>;
    /**
     * INTERNAL ONLY: It will be used for My account work experience. Get the work item type state color for multiple projects
     *
     * @param projectNames -
     */
    getWorkItemStateColors(projectNames: string[]): Promise<WorkItemTracking.ProjectWorkItemStateColors[]>;
    /**
     * Returns the next state on the given work item IDs.
     *
     * @param ids - list of work item ids
     * @param action - possible actions. Currently only supports checkin
     */
    getWorkItemNextStatesOnCheckinAction(ids: number[], action?: string): Promise<WorkItemTracking.WorkItemNextStateOnTransition[]>;
    /**
     * Get all work item type categories.
     *
     * @param project - Project ID or project name
     */
    getWorkItemTypeCategories(project: string): Promise<WorkItemTracking.WorkItemTypeCategory[]>;
    /**
     * Get specific work item type category by name.
     *
     * @param project - Project ID or project name
     * @param category - The category name
     */
    getWorkItemTypeCategory(project: string, category: string): Promise<WorkItemTracking.WorkItemTypeCategory>;
    /**
     * INTERNAL ONLY: It will be used for My account work experience. Get the wit type color for multiple projects
     *
     * @param projectNames -
     */
    getWorkItemTypeColors(projectNames: string[]): Promise<{
        key: string;
        value: WorkItemTracking.WorkItemTypeColor[];
    }[]>;
    /**
     * INTERNAL ONLY: It is used for color and icon providers. Get the wit type color for multiple projects
     *
     * @param projectNames -
     */
    getWorkItemTypeColorAndIcons(projectNames: string[]): Promise<{
        key: string;
        value: WorkItemTracking.WorkItemTypeColorAndIcon[];
    }[]>;
    /**
     * Returns a work item type definition.
     *
     * @param project - Project ID or project name
     * @param type - Work item type name
     */
    getWorkItemType(project: string, type: string): Promise<WorkItemTracking.WorkItemType>;
    /**
     * Returns the list of work item types
     *
     * @param project - Project ID or project name
     */
    getWorkItemTypes(project: string): Promise<WorkItemTracking.WorkItemType[]>;
    /**
     * Get a list of fields for a work item type with detailed references.
     *
     * @param project - Project ID or project name
     * @param type - Work item type.
     * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
     */
    getWorkItemTypeFieldsWithReferences(project: string, type: string, expand?: WorkItemTracking.WorkItemTypeFieldsExpandLevel): Promise<WorkItemTracking.WorkItemTypeFieldWithReferences[]>;
    /**
     * Get a field for a work item type with detailed references.
     *
     * @param project - Project ID or project name
     * @param type - Work item type.
     * @param field -
     * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
     */
    getWorkItemTypeFieldWithReferences(project: string, type: string, field: string, expand?: WorkItemTracking.WorkItemTypeFieldsExpandLevel): Promise<WorkItemTracking.WorkItemTypeFieldWithReferences>;
    /**
     * Returns the state names and colors for a work item type.
     *
     * @param project - Project ID or project name
     * @param type - The state name
     */
    getWorkItemTypeStates(project: string, type: string): Promise<WorkItemTracking.WorkItemStateColor[]>;
    /**
     * Export work item type
     *
     * @param project - Project ID or project name
     * @param type -
     * @param exportGlobalLists -
     */
    exportWorkItemTypeDefinition(project?: string, type?: string, exportGlobalLists?: boolean): Promise<WorkItemTracking.WorkItemTypeTemplate>;
    /**
     * Add/updates a work item type
     *
     * @param updateModel -
     * @param project - Project ID or project name
     */
    updateWorkItemTypeDefinition(updateModel: WorkItemTracking.WorkItemTypeTemplateUpdateModel, project?: string): Promise<WorkItemTracking.ProvisioningResult>;
}
