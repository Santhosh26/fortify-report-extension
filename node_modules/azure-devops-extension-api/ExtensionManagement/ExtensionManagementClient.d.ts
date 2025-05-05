import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as ExtensionManagement from "../ExtensionManagement/ExtensionManagement";
import * as Gallery from "../Gallery/Gallery";
export declare class ExtensionManagementRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * This API is called by acquisition/install page to get possible user actions like Buy/Request
     *
     * @param itemId - Fully qualified name of extension (\<publisher_id\>.\<extension_id\>)
     * @param testCommerce - Parameter to test paid preview extension without making azure plans public
     * @param isFreeOrTrialInstall - Parameter represents install or trial workflow (required for legacy install flows)
     * @param isAccountOwner - Parameter represents whether user is owner or PCA of an account
     * @param isLinked - Parameter represents whether account is linked with a subscription
     * @param isConnectedServer - Parameter represents whether Buy operation should be evaluated
     * @param isBuyOperationValid -
     */
    getAcquisitionOptions(itemId: string, testCommerce?: boolean, isFreeOrTrialInstall?: boolean, isAccountOwner?: boolean, isLinked?: boolean, isConnectedServer?: boolean, isBuyOperationValid?: boolean): Promise<ExtensionManagement.AcquisitionOptions>;
    /**
     * @param acquisitionRequest -
     */
    requestAcquisition(acquisitionRequest: ExtensionManagement.ExtensionAcquisitionRequest): Promise<ExtensionManagement.ExtensionAcquisitionRequest>;
    /**
     * @param publisherName -
     * @param extensionName -
     */
    getAuditLog(publisherName: string, extensionName: string): Promise<ExtensionManagement.ExtensionAuditLog>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param registrationId -
     */
    registerAuthorization(publisherName: string, extensionName: string, registrationId: string): Promise<ExtensionManagement.ExtensionAuthorization>;
    /**
     * @param doc -
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     */
    createDocumentByName(doc: any, publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string): Promise<any>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     * @param documentId -
     */
    deleteDocumentByName(publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string, documentId: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     * @param documentId -
     */
    getDocumentByName(publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string, documentId: string): Promise<any>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     */
    getDocumentsByName(publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string): Promise<any[]>;
    /**
     * @param doc -
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     */
    setDocumentByName(doc: any, publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string): Promise<any>;
    /**
     * @param doc -
     * @param publisherName -
     * @param extensionName -
     * @param scopeType -
     * @param scopeValue -
     * @param collectionName -
     */
    updateDocumentByName(doc: any, publisherName: string, extensionName: string, scopeType: string, scopeValue: string, collectionName: string): Promise<any>;
    /**
     * Query for one or more data collections for the specified extension.  Note: the token used for authorization must have been issued on behalf of the specified extension.
     *
     * @param collectionQuery -
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     */
    queryCollectionsByName(collectionQuery: ExtensionManagement.ExtensionDataCollectionQuery, publisherName: string, extensionName: string): Promise<ExtensionManagement.ExtensionDataCollection[]>;
    /**
     * List state and version information for all installed extensions.
     *
     * @param includeDisabled - If true (the default), include disabled extensions in the results.
     * @param includeErrors - If true, include installed extensions in an error state in the results.
     * @param includeInstallationIssues -
     * @param forceRefresh -
     */
    getStates(includeDisabled?: boolean, includeErrors?: boolean, includeInstallationIssues?: boolean, forceRefresh?: boolean): Promise<ExtensionManagement.ExtensionState[]>;
    /**
     * @param query -
     */
    queryExtensions(query: ExtensionManagement.InstalledExtensionQuery): Promise<ExtensionManagement.InstalledExtension[]>;
    /**
     * List the installed extensions in the account / project collection.
     *
     * @param includeDisabledExtensions - If true (the default), include disabled extensions in the results.
     * @param includeErrors - If true, include installed extensions with errors.
     * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
     * @param includeInstallationIssues -
     */
    getInstalledExtensions(includeDisabledExtensions?: boolean, includeErrors?: boolean, assetTypes?: string[], includeInstallationIssues?: boolean): Promise<ExtensionManagement.InstalledExtension[]>;
    /**
     * Update an installed extension. Typically this API is used to enable or disable an extension.
     *
     * @param extension -
     */
    updateInstalledExtension(extension: ExtensionManagement.InstalledExtension): Promise<ExtensionManagement.InstalledExtension>;
    /**
     * Get an installed extension by its publisher and extension name.
     *
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
     */
    getInstalledExtensionByName(publisherName: string, extensionName: string, assetTypes?: string[]): Promise<ExtensionManagement.InstalledExtension>;
    /**
     * Install the specified extension into the account / project collection.
     *
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param version -
     */
    installExtensionByName(publisherName: string, extensionName: string, version?: string): Promise<ExtensionManagement.InstalledExtension>;
    /**
     * Uninstall the specified extension from the account / project collection.
     *
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param reason -
     * @param reasonCode -
     */
    uninstallExtensionByName(publisherName: string, extensionName: string, reason?: string, reasonCode?: string): Promise<void>;
    /**
     * @param userId -
     */
    getPolicies(userId: string): Promise<Gallery.UserExtensionPolicy>;
    /**
     * @param rejectMessage -
     * @param publisherName -
     * @param extensionName -
     * @param requesterId -
     * @param state -
     */
    resolveRequest(rejectMessage: string, publisherName: string, extensionName: string, requesterId: string, state: ExtensionManagement.ExtensionRequestState): Promise<number>;
    /**
     */
    getRequests(): Promise<ExtensionManagement.RequestedExtension[]>;
    /**
     * @param rejectMessage -
     * @param publisherName -
     * @param extensionName -
     * @param state -
     */
    resolveAllRequests(rejectMessage: string, publisherName: string, extensionName: string, state: ExtensionManagement.ExtensionRequestState): Promise<number>;
    /**
     * @param publisherName -
     * @param extensionName -
     */
    deleteRequest(publisherName: string, extensionName: string): Promise<void>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param requestMessage -
     */
    requestExtension(publisherName: string, extensionName: string, requestMessage: string): Promise<ExtensionManagement.RequestedExtension>;
    /**
     */
    getToken(): Promise<string>;
}
