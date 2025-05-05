import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Contributions from "../Contributions/Contributions";
export declare class ContributionsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Query for contribution nodes and provider details according the parameters in the passed in query object.
     *
     * @param query -
     */
    queryContributionNodes(query: Contributions.ContributionNodeQuery): Promise<Contributions.ContributionNodeQueryResult>;
    /**
     * @param query -
     * @param scopeName -
     * @param scopeValue -
     */
    queryDataProviders(query: Contributions.DataProviderQuery, scopeName?: string, scopeValue?: string): Promise<Contributions.DataProviderResult>;
    /**
     * @param contributionIds -
     * @param includeDisabledApps -
     * @param assetTypes -
     */
    getInstalledExtensions(contributionIds?: string[], includeDisabledApps?: boolean, assetTypes?: string[]): Promise<Contributions.InstalledExtension[]>;
    /**
     * @param publisherName -
     * @param extensionName -
     * @param assetTypes -
     */
    getInstalledExtensionByName(publisherName: string, extensionName: string, assetTypes?: string[]): Promise<Contributions.InstalledExtension>;
}
