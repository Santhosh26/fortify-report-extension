import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Gallery from "../Gallery/Gallery";
export declare class GalleryRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param extensionId -
     * @param accountName -
     */
    shareExtensionById(extensionId: string, accountName: string): Promise<void>;
    /**
     * @param extensionId -
     * @param accountName -
     */
    unshareExtensionById(extensionId: string, accountName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param accountName -
     */
    shareExtension(publisherName: string, extensionName: string, accountName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param accountName -
     */
    unshareExtension(publisherName: string, extensionName: string, accountName: string): Promise<void>;
    /**
     * @param itemId -
     * @param installationTarget -
     * @param testCommerce -
     * @param isFreeOrTrialInstall -
     */
    getAcquisitionOptions(itemId: string, installationTarget: string, testCommerce?: boolean, isFreeOrTrialInstall?: boolean): Promise<Gallery.AcquisitionOptions>;
    /**
     * @param acquisitionRequest -
     */
    requestAcquisition(acquisitionRequest: Gallery.ExtensionAcquisitionRequest): Promise<Gallery.ExtensionAcquisitionRequest>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param assetType -
     * @param accountToken -
     * @param acceptDefault -
     * @param accountTokenHeader - Header to pass the account token
     */
    getAssetByName(publisherName: string, extensionName: string, version: string, assetType: string, accountToken?: string, acceptDefault?: boolean, accountTokenHeader?: String): Promise<ArrayBuffer>;
    /**
     * @param extensionId -
     * @param version -
     * @param assetType -
     * @param accountToken -
     * @param acceptDefault -
     * @param accountTokenHeader - Header to pass the account token
     */
    getAsset(extensionId: string, version: string, assetType: string, accountToken?: string, acceptDefault?: boolean, accountTokenHeader?: String): Promise<ArrayBuffer>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param assetType -
     * @param accountToken -
     * @param accountTokenHeader - Header to pass the account token
     */
    getAssetAuthenticated(publisherName: string, extensionName: string, version: string, assetType: string, accountToken?: string, accountTokenHeader?: String): Promise<ArrayBuffer>;
    /**
     * @param publisherName -
     * @param azurePublisherId -
     */
    associateAzurePublisher(publisherName: string, azurePublisherId: string): Promise<Gallery.AzurePublisher>;
    /**
     * @param publisherName -
     */
    queryAssociatedAzurePublisher(publisherName: string): Promise<Gallery.AzurePublisher>;
    /**
     * @param languages -
     */
    getCategories(languages?: string): Promise<string[]>;
    /**
     * @param categoryName -
     * @param languages -
     * @param product -
     */
    getCategoryDetails(categoryName: string, languages?: string, product?: string): Promise<Gallery.CategoriesResult>;
    /**
     * @param product -
     * @param categoryId -
     * @param lcid -
     * @param source -
     * @param productVersion -
     * @param skus -
     * @param subSkus -
     * @param productArchitecture -
     */
    getCategoryTree(product: string, categoryId: string, lcid?: number, source?: string, productVersion?: string, skus?: string, subSkus?: string, productArchitecture?: string): Promise<Gallery.ProductCategory>;
    /**
     * @param product -
     * @param lcid -
     * @param source -
     * @param productVersion -
     * @param skus -
     * @param subSkus -
     */
    getRootCategories(product: string, lcid?: number, source?: string, productVersion?: string, skus?: string, subSkus?: string): Promise<Gallery.ProductCategoriesResult>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     */
    getCertificate(publisherName: string, extensionName: string, version?: string): Promise<ArrayBuffer>;
    /**
     * @param customerSupportRequest -
     */
    createSupportRequest(customerSupportRequest: Gallery.CustomerSupportRequest): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     */
    createDraftForEditExtension(publisherName: string, extensionName: string): Promise<Gallery.ExtensionDraft>;
    /**
     * @param draftPatch -
     * @param publisherName -
     * @param extensionName -
     * @param draftId -
     */
    performEditExtensionDraftOperation(draftPatch: Gallery.ExtensionDraftPatch, publisherName: string, extensionName: string, draftId: string): Promise<Gallery.ExtensionDraft>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param extensionName -
     * @param draftId -
     * @param fileName - Header to pass the filename of the uploaded data
     */
    updatePayloadInDraftForEditExtension(content: any, publisherName: string, extensionName: string, draftId: string, fileName?: String): Promise<Gallery.ExtensionDraft>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param extensionName -
     * @param draftId -
     * @param assetType -
     */
    addAssetForEditExtensionDraft(content: string, publisherName: string, extensionName: string, draftId: string, assetType: string): Promise<Gallery.ExtensionDraftAsset>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param product - Header to pass the product type of the payload file
     * @param fileName - Header to pass the filename of the uploaded data
     */
    createDraftForNewExtension(content: any, publisherName: string, product: String, fileName?: String): Promise<Gallery.ExtensionDraft>;
    /**
     * @param draftPatch -
     * @param publisherName -
     * @param draftId -
     */
    performNewExtensionDraftOperation(draftPatch: Gallery.ExtensionDraftPatch, publisherName: string, draftId: string): Promise<Gallery.ExtensionDraft>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param draftId -
     * @param fileName - Header to pass the filename of the uploaded data
     */
    updatePayloadInDraftForNewExtension(content: any, publisherName: string, draftId: string, fileName?: String): Promise<Gallery.ExtensionDraft>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param draftId -
     * @param assetType -
     */
    addAssetForNewExtensionDraft(content: string, publisherName: string, draftId: string, assetType: string): Promise<Gallery.ExtensionDraftAsset>;
    /**
     * @param publisherName -
     * @param draftId -
     * @param assetType -
     * @param extensionName -
     */
    getAssetFromEditExtensionDraft(publisherName: string, draftId: string, assetType: string, extensionName: string): Promise<ArrayBuffer>;
    /**
     * @param publisherName -
     * @param draftId -
     * @param assetType -
     */
    getAssetFromNewExtensionDraft(publisherName: string, draftId: string, assetType: string): Promise<ArrayBuffer>;
    /**
     * Get install/uninstall events of an extension. If both count and afterDate parameters are specified, count takes precedence.
     *
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param count - Count of events to fetch, applies to each event type.
     * @param afterDate - Fetch events that occurred on or after this date
     * @param include - Filter options. Supported values: install, uninstall, review, acquisition, sales. Default is to fetch all types of events
     * @param includeProperty - Event properties to include. Currently only 'lastContactDetails' is supported for uninstall events
     */
    getExtensionEvents(publisherName: string, extensionName: string, count?: number, afterDate?: Date, include?: string, includeProperty?: string): Promise<Gallery.ExtensionEvents>;
    /**
     * API endpoint to publish extension install/uninstall events. This is meant to be invoked by EMS only for sending us data related to install/uninstall of an extension.
     *
     * @param extensionEvents -
     */
    publishExtensionEvents(extensionEvents: Gallery.ExtensionEvents[]): Promise<void>;
    /**
     * @param extensionQuery -
     * @param accountToken -
     * @param accountTokenHeader - Header to pass the account token
     */
    queryExtensions(extensionQuery: Gallery.ExtensionQuery, accountToken?: string, accountTokenHeader?: String): Promise<Gallery.ExtensionQueryResult>;
    /**
     * @param content - Content to upload
     * @param extensionType -
     * @param reCaptchaToken -
     */
    createExtension(content: any, extensionType?: string, reCaptchaToken?: string): Promise<Gallery.PublishedExtension>;
    /**
     * @param extensionId -
     * @param version -
     */
    deleteExtensionById(extensionId: string, version?: string): Promise<void>;
    /**
     * @param extensionId -
     * @param version -
     * @param flags -
     */
    getExtensionById(extensionId: string, version?: string, flags?: Gallery.ExtensionQueryFlags): Promise<Gallery.PublishedExtension>;
    /**
     * @param extensionId -
     * @param reCaptchaToken -
     */
    updateExtensionById(extensionId: string, reCaptchaToken?: string): Promise<Gallery.PublishedExtension>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param extensionType -
     * @param reCaptchaToken -
     */
    createExtensionWithPublisher(content: any, publisherName: string, extensionType?: string, reCaptchaToken?: string): Promise<Gallery.PublishedExtension>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     */
    deleteExtension(publisherName: string, extensionName: string, version?: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param flags -
     * @param accountToken -
     * @param accountTokenHeader - Header to pass the account token
     */
    getExtension(publisherName: string, extensionName: string, version?: string, flags?: Gallery.ExtensionQueryFlags, accountToken?: string, accountTokenHeader?: String): Promise<Gallery.PublishedExtension>;
    /**
     * REST endpoint to update an extension.
     *
     * @param content - Content to upload
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param extensionType -
     * @param reCaptchaToken -
     * @param bypassScopeCheck - This parameter decides if the scope change check needs to be invoked or not
     */
    updateExtension(content: any, publisherName: string, extensionName: string, extensionType?: string, reCaptchaToken?: string, bypassScopeCheck?: boolean): Promise<Gallery.PublishedExtension>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param flags -
     */
    updateExtensionProperties(publisherName: string, extensionName: string, flags: Gallery.PublishedExtensionFlags): Promise<Gallery.PublishedExtension>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param hostType -
     * @param hostName -
     */
    shareExtensionWithHost(publisherName: string, extensionName: string, hostType: string, hostName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param hostType -
     * @param hostName -
     */
    unshareExtensionWithHost(publisherName: string, extensionName: string, hostType: string, hostName: string): Promise<void>;
    /**
     * Rest end point to validate if an Azure publisher owns an extension for 3rd party commerce scenario. Azure only supports POST operations and the above signature is not typical of the REST operations. http://sharepoint/sites/AzureUX/_layouts/15/WopiFrame2.aspx?sourcedoc=\{A793D31E-6DC6-4174-8FA3-DE3F82B51642\}&file=Data%20Market%20Partner%20integration%20with%20Marketplace%20service.docx&action=default
     *
     * @param azureRestApiRequestModel - All the parameters are sent in the request body
     */
    extensionValidator(azureRestApiRequestModel: Gallery.AzureRestApiRequestModel): Promise<void>;
    /**
     * Send Notification
     *
     * @param notificationData - Denoting the data needed to send notification
     */
    sendNotifications(notificationData: Gallery.NotificationsData): Promise<void>;
    /**
     * This endpoint gets hit when you download a VSTS extension from the Web UI
     *
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param accountToken -
     * @param acceptDefault -
     * @param accountTokenHeader - Header to pass the account token
     */
    getPackage(publisherName: string, extensionName: string, version: string, accountToken?: string, acceptDefault?: boolean, accountTokenHeader?: String): Promise<ArrayBuffer>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param assetType -
     * @param assetToken -
     * @param accountToken -
     * @param acceptDefault -
     * @param accountTokenHeader - Header to pass the account token
     */
    getAssetWithToken(publisherName: string, extensionName: string, version: string, assetType: string, assetToken?: string, accountToken?: string, acceptDefault?: boolean, accountTokenHeader?: String): Promise<ArrayBuffer>;
    /**
     * Delete publisher asset like logo
     *
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     */
    deletePublisherAsset(publisherName: string, assetType?: string): Promise<void>;
    /**
     * Get publisher asset like logo as a stream
     *
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     */
    getPublisherAsset(publisherName: string, assetType?: string): Promise<ArrayBuffer>;
    /**
     * Update publisher asset like logo. It accepts asset file as an octet stream and file name is passed in header values.
     *
     * @param content - Content to upload
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     * @param fileName - Header to pass the filename of the uploaded data
     */
    updatePublisherAsset(content: any, publisherName: string, assetType?: string, fileName?: String): Promise<{
        [key: string]: string;
    }>;
    /**
     * @param publisherName -
     */
    fetchDomainToken(publisherName: string): Promise<string>;
    /**
     * @param publisherName -
     */
    verifyDomainToken(publisherName: string): Promise<void>;
    /**
     * @param publisherQuery -
     */
    queryPublishers(publisherQuery: Gallery.PublisherQuery): Promise<Gallery.PublisherQueryResult>;
    /**
     * @param publisher -
     */
    createPublisher(publisher: Gallery.Publisher): Promise<Gallery.Publisher>;
    /**
     * @param publisherName -
     */
    deletePublisher(publisherName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param flags -
     */
    getPublisher(publisherName: string, flags?: number): Promise<Gallery.Publisher>;
    /**
     * @param publisher -
     * @param publisherName -
     */
    updatePublisher(publisher: Gallery.Publisher, publisherName: string): Promise<Gallery.Publisher>;
    /**
     * Endpoint to add/modify publisher membership. Currently Supports only addition/modification of 1 user at a time Works only for adding members of same tenant.
     *
     * @param roleAssignments - List of user identifiers(email address) and role to be added. Currently only one entry is supported.
     * @param publisherName - The name/id of publisher to which users have to be added
     * @param limitToCallerIdentityDomain - Should cross tenant addtions be allowed or not.
     */
    updatePublisherMembers(roleAssignments: Gallery.PublisherUserRoleAssignmentRef[], publisherName: string, limitToCallerIdentityDomain?: boolean): Promise<Gallery.PublisherRoleAssignment[]>;
    /**
     * @param content - Content to upload
     * @param publisherName -
     * @param extensionName -
     * @param extensionType -
     * @param reCaptchaToken -
     * @param bypassScopeCheck -
     */
    publishExtensionWithPublisherSignature(content: any, publisherName: string, extensionName: string, extensionType?: string, reCaptchaToken?: string, bypassScopeCheck?: boolean): Promise<Gallery.PublishedExtension>;
    /**
     * @param publisherName -
     */
    getPublisherWithoutToken(publisherName: string): Promise<Gallery.Publisher>;
    /**
     * Returns a list of questions with their responses associated with an extension.
     *
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param count - Number of questions to retrieve (defaults to 10).
     * @param page - Page number from which set of questions are to be retrieved.
     * @param afterDate - If provided, results questions are returned which were posted after this date
     */
    getQuestions(publisherName: string, extensionName: string, count?: number, page?: number, afterDate?: Date): Promise<Gallery.QuestionsResult>;
    /**
     * Flags a concern with an existing question for an extension.
     *
     * @param concern - User reported concern with a question for the extension.
     * @param pubName - Name of the publisher who published the extension.
     * @param extName - Name of the extension.
     * @param questionId - Identifier of the question to be updated for the extension.
     */
    reportQuestion(concern: Gallery.Concern, pubName: string, extName: string, questionId: number): Promise<Gallery.Concern>;
    /**
     * Creates a new question for an extension.
     *
     * @param question - Question to be created for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     */
    createQuestion(question: Gallery.Question, publisherName: string, extensionName: string): Promise<Gallery.Question>;
    /**
     * Deletes an existing question and all its associated responses for an extension. (soft delete)
     *
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question to be deleted for the extension.
     */
    deleteQuestion(publisherName: string, extensionName: string, questionId: number): Promise<void>;
    /**
     * Updates an existing question for an extension.
     *
     * @param question - Updated question to be set for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question to be updated for the extension.
     */
    updateQuestion(question: Gallery.Question, publisherName: string, extensionName: string, questionId: number): Promise<Gallery.Question>;
    /**
     * Creates a new response for a given question for an extension.
     *
     * @param response - Response to be created for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question for which response is to be created for the extension.
     */
    createResponse(response: Gallery.Response, publisherName: string, extensionName: string, questionId: number): Promise<Gallery.Response>;
    /**
     * Deletes a response for an extension. (soft delete)
     *
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifies the question whose response is to be deleted.
     * @param responseId - Identifies the response to be deleted.
     */
    deleteResponse(publisherName: string, extensionName: string, questionId: number, responseId: number): Promise<void>;
    /**
     * Updates an existing response for a given question for an extension.
     *
     * @param response - Updated response to be set for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question for which response is to be updated for the extension.
     * @param responseId - Identifier of the response which has to be updated.
     */
    updateResponse(response: Gallery.Response, publisherName: string, extensionName: string, questionId: number, responseId: number): Promise<Gallery.Response>;
    /**
     * Returns extension reports
     *
     * @param publisherName - Name of the publisher who published the extension
     * @param extensionName - Name of the extension
     * @param days - Last n days report. If afterDate and days are specified, days will take priority
     * @param count - Number of events to be returned
     * @param afterDate - Use if you want to fetch events newer than the specified date
     */
    getExtensionReports(publisherName: string, extensionName: string, days?: number, count?: number, afterDate?: Date): Promise<any>;
    /**
     * Returns a list of reviews associated with an extension
     *
     * @param publisherName - Name of the publisher who published the extension
     * @param extensionName - Name of the extension
     * @param count - Number of reviews to retrieve (defaults to 5)
     * @param filterOptions - FilterOptions to filter out empty reviews etcetera, defaults to none
     * @param beforeDate - Use if you want to fetch reviews older than the specified date, defaults to null
     * @param afterDate - Use if you want to fetch reviews newer than the specified date, defaults to null
     */
    getReviews(publisherName: string, extensionName: string, count?: number, filterOptions?: Gallery.ReviewFilterOptions, beforeDate?: Date, afterDate?: Date): Promise<Gallery.ReviewsResult>;
    /**
     * Returns a summary of the reviews
     *
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param beforeDate - Use if you want to fetch summary of reviews older than the specified date, defaults to null
     * @param afterDate - Use if you want to fetch summary of reviews newer than the specified date, defaults to null
     */
    getReviewsSummary(pubName: string, extName: string, beforeDate?: Date, afterDate?: Date): Promise<Gallery.ReviewSummary>;
    /**
     * Creates a new review for an extension
     *
     * @param review - Review to be created for the extension
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     */
    createReview(review: Gallery.Review, pubName: string, extName: string): Promise<Gallery.Review>;
    /**
     * Deletes a review
     *
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param reviewId - Id of the review which needs to be updated
     */
    deleteReview(pubName: string, extName: string, reviewId: number): Promise<void>;
    /**
     * Updates or Flags a review
     *
     * @param reviewPatch - ReviewPatch object which contains the changes to be applied to the review
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param reviewId - Id of the review which needs to be updated
     */
    updateReview(reviewPatch: Gallery.ReviewPatch, pubName: string, extName: string, reviewId: number): Promise<Gallery.ReviewPatch>;
    /**
     * @param category -
     */
    createCategory(category: Gallery.ExtensionCategory): Promise<Gallery.ExtensionCategory>;
    /**
     * Get all setting entries for the given user/all-users scope
     *
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     * @param key - Optional key under which to filter all the entries
     */
    getGalleryUserSettings(userScope: string, key?: string): Promise<{
        [key: string]: any;
    }>;
    /**
     * Set all setting entries for the given user/all-users scope
     *
     * @param entries - A key-value pair of all settings that need to be set
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     */
    setGalleryUserSettings(entries: {
        [key: string]: any;
    }, userScope: string): Promise<void>;
    /**
     * @param keyType -
     * @param expireCurrentSeconds -
     */
    generateKey(keyType: string, expireCurrentSeconds?: number): Promise<void>;
    /**
     * @param keyType -
     */
    getSigningKey(keyType: string): Promise<string>;
    /**
     * @param extensionStatisticsUpdate -
     * @param publisherName -
     * @param extensionName -
     */
    updateExtensionStatistics(extensionStatisticsUpdate: Gallery.ExtensionStatisticUpdate, publisherName: string, extensionName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param days -
     * @param aggregate -
     * @param afterDate -
     */
    getExtensionDailyStats(publisherName: string, extensionName: string, days?: number, aggregate?: Gallery.ExtensionStatsAggregateType, afterDate?: Date): Promise<Gallery.ExtensionDailyStats>;
    /**
     * This route/location id only supports HTTP POST anonymously, so that the page view daily stat can be incremented from Marketplace client. Trying to call GET on this route should result in an exception. Without this explicit implementation, calling GET on this public route invokes the above GET implementation GetExtensionDailyStats.
     *
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param version - Version of the extension
     */
    getExtensionDailyStatsAnonymous(publisherName: string, extensionName: string, version: string): Promise<Gallery.ExtensionDailyStats>;
    /**
     * Increments a daily statistic associated with the extension
     *
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param version - Version of the extension
     * @param statType - Type of stat to increment
     * @param targetPlatform -
     */
    incrementExtensionDailyStat(publisherName: string, extensionName: string, version: string, statType: string, targetPlatform?: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param version -
     * @param targetPlatform -
     */
    getVerificationLog(publisherName: string, extensionName: string, version: string, targetPlatform?: string): Promise<ArrayBuffer>;
    /**
     * Endpoint to get the latest version(s) of a VS Code extension.
     *
     * @param publisherName - The name of the publisher of the requested VS Code extension.
     * @param extensionName - The extension name.
     */
    getVSCodeExtensionLatestVersion(publisherName: string, extensionName: string): Promise<Gallery.PublishedExtension>;
    /**
     * @param itemName -
     * @param version -
     * @param statType -
     */
    updateVSCodeWebExtensionStatistics(itemName: string, version: string, statType: Gallery.VSCodeWebExtensionStatisicsType): Promise<void>;
}
