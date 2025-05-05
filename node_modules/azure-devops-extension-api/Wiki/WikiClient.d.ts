import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Comments_Contracts from "../Comments/Comments";
import * as Git from "../Git/Git";
import * as WebApi from "../WebApi/WebApi";
import * as Wiki from "../Wiki/Wiki";
export declare class WikiRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Uploads an attachment on a comment on a wiki page.
     *
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     */
    createCommentAttachment(content: any, project: string, wikiIdentifier: string, pageId: number): Promise<Comments_Contracts.CommentAttachment>;
    /**
     * Downloads an attachment on a comment on a wiki page.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param attachmentId - Attachment ID.
     */
    getAttachmentContent(project: string, wikiIdentifier: string, pageId: number, attachmentId: string): Promise<ArrayBuffer>;
    /**
     * Add a reaction on a wiki page comment.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name
     * @param pageId - Wiki page ID
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction being added
     */
    addCommentReaction(project: string, wikiIdentifier: string, pageId: number, commentId: number, type: Comments_Contracts.CommentReactionType): Promise<Comments_Contracts.CommentReaction>;
    /**
     * Delete a reaction on a wiki page comment.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or name
     * @param pageId - Wiki page ID
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction being deleted
     */
    deleteCommentReaction(project: string, wikiIdentifier: string, pageId: number, commentId: number, type: Comments_Contracts.CommentReactionType): Promise<Comments_Contracts.CommentReaction>;
    /**
     * Gets a list of users who have reacted for the given wiki comment with a given reaction type. Supports paging, with a default page size of 100 users at a time.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction for which the engaged users are being requested
     * @param top - Number of enagaged users to be returned in a given page. Optional, defaults to 100
     * @param skip - Number of engaged users to be skipped to page the next set of engaged users, defaults to 0
     */
    getEngagedUsers(project: string, wikiIdentifier: string, pageId: number, commentId: number, type: Comments_Contracts.CommentReactionType, top?: number, skip?: number): Promise<WebApi.IdentityRef[]>;
    /**
     * Add a comment on a wiki page.
     *
     * @param request - Comment create request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     */
    addComment(request: Comments_Contracts.CommentCreateParameters, project: string, wikiIdentifier: string, pageId: number): Promise<Comments_Contracts.Comment>;
    /**
     * Delete a comment on a wiki page.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or name.
     * @param pageId - Wiki page ID.
     * @param id - Comment ID.
     */
    deleteComment(project: string, wikiIdentifier: string, pageId: number, id: number): Promise<void>;
    /**
     * Returns a comment associated with the Wiki Page.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param id - ID of the comment to return.
     * @param excludeDeleted - Specify if the deleted comment should be skipped.
     * @param expand - Specifies the additional data retrieval options for comments.
     */
    getComment(project: string, wikiIdentifier: string, pageId: number, id: number, excludeDeleted?: boolean, expand?: Comments_Contracts.CommentExpandOptions): Promise<Comments_Contracts.Comment>;
    /**
     * Returns a pageable list of comments.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param top - Max number of comments to return.
     * @param continuationToken - Used to query for the next page of comments.
     * @param excludeDeleted - Specify if the deleted comments should be skipped.
     * @param expand - Specifies the additional data retrieval options for comments.
     * @param order - Order in which the comments should be returned.
     * @param parentId - CommentId of the parent comment.
     */
    listComments(project: string, wikiIdentifier: string, pageId: number, top?: number, continuationToken?: string, excludeDeleted?: boolean, expand?: Comments_Contracts.CommentExpandOptions, order?: Comments_Contracts.CommentSortOrder, parentId?: number): Promise<Comments_Contracts.CommentList>;
    /**
     * Update a comment on a wiki page.
     *
     * @param comment - Comment update request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param id - Comment ID.
     */
    updateComment(comment: Comments_Contracts.CommentUpdateParameters, project: string, wikiIdentifier: string, pageId: number, id: number): Promise<Comments_Contracts.Comment>;
    /**
     * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param path - Wiki page path.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    getPageText(project: string, wikiIdentifier: string, path?: string, recursionLevel?: Git.VersionControlRecursionType, versionDescriptor?: Git.GitVersionDescriptor, includeContent?: boolean): Promise<string>;
    /**
     * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param path - Wiki page path.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    getPageZip(project: string, wikiIdentifier: string, path?: string, recursionLevel?: Git.VersionControlRecursionType, versionDescriptor?: Git.GitVersionDescriptor, includeContent?: boolean): Promise<ArrayBuffer>;
    /**
     * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name..
     * @param id - Wiki page ID.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    getPageByIdText(project: string, wikiIdentifier: string, id: number, recursionLevel?: Git.VersionControlRecursionType, includeContent?: boolean): Promise<string>;
    /**
     * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name..
     * @param id - Wiki page ID.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    getPageByIdZip(project: string, wikiIdentifier: string, id: number, recursionLevel?: Git.VersionControlRecursionType, includeContent?: boolean): Promise<ArrayBuffer>;
    /**
     * Returns pageable list of Wiki Pages
     *
     * @param pagesBatchRequest - Wiki batch page request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param versionDescriptor - GitVersionDescriptor for the page. (Optional in case of ProjectWiki).
     */
    getPagesBatch(pagesBatchRequest: Wiki.WikiPagesBatchRequest, project: string, wikiIdentifier: string, versionDescriptor?: Git.GitVersionDescriptor): Promise<WebApi.PagedList<Wiki.WikiPageDetail>>;
    /**
     * Returns page detail corresponding to Page ID.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param pageViewsForDays - last N days from the current day for which page views is to be returned. It's inclusive of current day.
     */
    getPageData(project: string, wikiIdentifier: string, pageId: number, pageViewsForDays?: number): Promise<Wiki.WikiPageDetail>;
    /**
     * Creates a new page view stats resource or updates an existing page view stats resource.
     *
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param wikiVersion - Wiki version.
     * @param path - Wiki page path.
     * @param oldPath - Old page path. This is optional and required to rename path in existing page view stats.
     */
    createOrUpdatePageViewStats(project: string, wikiIdentifier: string, wikiVersion: Git.GitVersionDescriptor, path: string, oldPath?: string): Promise<Wiki.WikiPageViewStats>;
    /**
     * Creates the wiki resource.
     *
     * @param wikiCreateParams - Parameters for the wiki creation.
     * @param project - Project ID or project name
     */
    createWiki(wikiCreateParams: Wiki.WikiCreateParametersV2, project?: string): Promise<Wiki.WikiV2>;
    /**
     * Deletes the wiki corresponding to the wiki ID or wiki name provided.
     *
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    deleteWiki(wikiIdentifier: string, project?: string): Promise<Wiki.WikiV2>;
    /**
     * Gets all wikis in a project or collection.
     *
     * @param project - Project ID or project name
     */
    getAllWikis(project?: string): Promise<Wiki.WikiV2[]>;
    /**
     * Gets the wiki corresponding to the wiki ID or wiki name provided.
     *
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    getWiki(wikiIdentifier: string, project?: string): Promise<Wiki.WikiV2>;
    /**
     * Updates the wiki corresponding to the wiki ID or wiki name provided using the update parameters.
     *
     * @param updateParameters - Update parameters.
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    updateWiki(updateParameters: Wiki.WikiUpdateParameters, wikiIdentifier: string, project?: string): Promise<Wiki.WikiV2>;
}
