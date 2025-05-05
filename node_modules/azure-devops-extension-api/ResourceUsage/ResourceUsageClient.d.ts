import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as ResourceUsage from "../ResourceUsage/ResourceUsage";
export declare class ResourceUsageRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Gets the Project Level limits and Usage for a project.
     *
     * @param project - Project ID or project name
     */
    getProjectLimit(project: string): Promise<{
        [key: string]: ResourceUsage.Usage;
    }>;
    /**
     */
    getLimits(): Promise<{
        [key: string]: ResourceUsage.Usage;
    }>;
}
