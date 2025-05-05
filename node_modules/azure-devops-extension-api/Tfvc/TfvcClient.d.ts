import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Tfvc from "../Tfvc/Tfvc";
import * as WebApi from "../WebApi/WebApi";
export declare class TfvcRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Get a single branch hierarchy at the given path with parents or children as specified.
     *
     * @param path - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
     * @param project - Project ID or project name
     * @param includeParent - Return the parent branch, if there is one. Default: False
     * @param includeChildren - Return child branches, if there are any. Default: False
     */
    getBranch(path: string, project?: string, includeParent?: boolean, includeChildren?: boolean): Promise<Tfvc.TfvcBranch>;
    /**
     * Get a collection of branch roots -- first-level children, branches with no parents.
     *
     * @param project - Project ID or project name
     * @param includeParent - Return the parent branch, if there is one. Default: False
     * @param includeChildren - Return the child branches for each root branch. Default: False
     * @param includeDeleted - Return deleted branches. Default: False
     * @param includeLinks - Return links. Default: False
     */
    getBranches(project?: string, includeParent?: boolean, includeChildren?: boolean, includeDeleted?: boolean, includeLinks?: boolean): Promise<Tfvc.TfvcBranch[]>;
    /**
     * Get branch hierarchies below the specified scopePath
     *
     * @param scopePath - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
     * @param project - Project ID or project name
     * @param includeDeleted - Return deleted branches. Default: False
     * @param includeLinks - Return links. Default: False
     */
    getBranchRefs(scopePath: string, project?: string, includeDeleted?: boolean, includeLinks?: boolean): Promise<Tfvc.TfvcBranchRef[]>;
    /**
     * Retrieve Tfvc changes for a given changeset.
     *
     * @param id - ID of the changeset. Default: null
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     */
    getChangesetChanges(id?: number, skip?: number, top?: number): Promise<WebApi.PagedList<Tfvc.TfvcChange>>;
    /**
     * Create a new changeset.
     *
     * @param changeset -
     * @param project - Project ID or project name
     */
    createChangeset(changeset: Tfvc.TfvcChangeset, project?: string): Promise<Tfvc.TfvcChangesetRef>;
    /**
     * Retrieve a Tfvc Changeset
     *
     * @param id - Changeset Id to retrieve.
     * @param project - Project ID or project name
     * @param maxChangeCount - Number of changes to return (maximum 100 changes) Default: 0
     * @param includeDetails - Include policy details and check-in notes in the response. Default: false
     * @param includeWorkItems - Include workitems. Default: false
     * @param maxCommentLength - Include details about associated work items in the response. Default: null
     * @param includeSourceRename - Include renames.  Default: false
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
     * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
     */
    getChangeset(id: number, project?: string, maxChangeCount?: number, includeDetails?: boolean, includeWorkItems?: boolean, maxCommentLength?: number, includeSourceRename?: boolean, skip?: number, top?: number, orderby?: string, searchCriteria?: Tfvc.TfvcChangesetSearchCriteria): Promise<Tfvc.TfvcChangeset>;
    /**
     * Retrieve Tfvc Changesets
     *
     * @param project - Project ID or project name
     * @param maxCommentLength - Include details about associated work items in the response. Default: null
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
     * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
     */
    getChangesets(project?: string, maxCommentLength?: number, skip?: number, top?: number, orderby?: string, searchCriteria?: Tfvc.TfvcChangesetSearchCriteria): Promise<Tfvc.TfvcChangesetRef[]>;
    /**
     * Returns changesets for a given list of changeset Ids.
     *
     * @param changesetsRequestData - List of changeset IDs.
     */
    getBatchedChangesets(changesetsRequestData: Tfvc.TfvcChangesetsRequestData): Promise<Tfvc.TfvcChangesetRef[]>;
    /**
     * Retrieves the work items associated with a particular changeset.
     *
     * @param id - ID of the changeset.
     */
    getChangesetWorkItems(id?: number): Promise<Tfvc.AssociatedWorkItem[]>;
    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param itemRequestData -
     * @param project - Project ID or project name
     */
    getItemsBatch(itemRequestData: Tfvc.TfvcItemRequestData, project?: string): Promise<Tfvc.TfvcItem[][]>;
    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     *
     * @param itemRequestData -
     * @param project - Project ID or project name
     */
    getItemsBatchZip(itemRequestData: Tfvc.TfvcItemRequestData, project?: string): Promise<ArrayBuffer>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    getItem(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: Tfvc.VersionControlRecursionType, versionDescriptor?: Tfvc.TfvcVersionDescriptor, includeContent?: boolean): Promise<Tfvc.TfvcItem>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    getItemContent(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: Tfvc.VersionControlRecursionType, versionDescriptor?: Tfvc.TfvcVersionDescriptor, includeContent?: boolean): Promise<ArrayBuffer>;
    /**
     * Get a list of Tfvc items
     *
     * @param project - Project ID or project name
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param includeLinks - True to include links.
     * @param versionDescriptor -
     */
    getItems(project?: string, scopePath?: string, recursionLevel?: Tfvc.VersionControlRecursionType, includeLinks?: boolean, versionDescriptor?: Tfvc.TfvcVersionDescriptor): Promise<Tfvc.TfvcItem[]>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    getItemText(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: Tfvc.VersionControlRecursionType, versionDescriptor?: Tfvc.TfvcVersionDescriptor, includeContent?: boolean): Promise<string>;
    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     *
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    getItemZip(path: string, project?: string, fileName?: string, download?: boolean, scopePath?: string, recursionLevel?: Tfvc.VersionControlRecursionType, versionDescriptor?: Tfvc.TfvcVersionDescriptor, includeContent?: boolean): Promise<ArrayBuffer>;
    /**
     * Get items under a label.
     *
     * @param labelId - Unique identifier of label
     * @param top - Max number of items to return
     * @param skip - Number of items to skip
     */
    getLabelItems(labelId: string, top?: number, skip?: number): Promise<Tfvc.TfvcItem[]>;
    /**
     * Get a single deep label.
     *
     * @param labelId - Unique identifier of label
     * @param requestData - maxItemCount
     * @param project - Project ID or project name
     */
    getLabel(labelId: string, requestData: Tfvc.TfvcLabelRequestData, project?: string): Promise<Tfvc.TfvcLabel>;
    /**
     * Get a collection of shallow label references.
     *
     * @param requestData - labelScope, name, owner, and itemLabelFilter
     * @param project - Project ID or project name
     * @param top - Max number of labels to return, defaults to 100 when undefined
     * @param skip - Number of labels to skip
     */
    getLabels(requestData: Tfvc.TfvcLabelRequestData, project?: string, top?: number, skip?: number): Promise<Tfvc.TfvcLabelRef[]>;
    /**
     * Get changes included in a shelveset.
     *
     * @param shelvesetId - Shelveset's unique ID
     * @param top - Max number of changes to return
     * @param skip - Number of changes to skip
     */
    getShelvesetChanges(shelvesetId: string, top?: number, skip?: number): Promise<Tfvc.TfvcChange[]>;
    /**
     * Get a single deep shelveset.
     *
     * @param shelvesetId - Shelveset's unique ID
     * @param requestData - includeDetails, includeWorkItems, maxChangeCount, and maxCommentLength
     */
    getShelveset(shelvesetId: string, requestData?: Tfvc.TfvcShelvesetRequestData): Promise<Tfvc.TfvcShelveset>;
    /**
     * Return a collection of shallow shelveset references.
     *
     * @param requestData - name, owner, and maxCommentLength
     * @param top - Max number of shelvesets to return
     * @param skip - Number of shelvesets to skip
     */
    getShelvesets(requestData?: Tfvc.TfvcShelvesetRequestData, top?: number, skip?: number): Promise<Tfvc.TfvcShelvesetRef[]>;
    /**
     * Get work items associated with a shelveset.
     *
     * @param shelvesetId - Shelveset's unique ID
     */
    getShelvesetWorkItems(shelvesetId: string): Promise<Tfvc.AssociatedWorkItem[]>;
    /**
     * Provides File Count and Uncompressed Bytes for a Collection/Project at a particular scope for TFVC.
     *
     * @param project - Project ID or project name
     * @param scopePath - '$/' for collection, '$/project' for specific project
     */
    getTfvcStatistics(project?: string, scopePath?: string): Promise<Tfvc.TfvcStatistics>;
}
