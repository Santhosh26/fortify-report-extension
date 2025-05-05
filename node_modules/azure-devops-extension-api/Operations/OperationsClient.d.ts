import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Operations from "../Operations/Operations";
export declare class OperationsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Gets an operation from the operationId using the given pluginId.
     *
     * @param operationId - The ID for the operation.
     * @param pluginId - The ID for the plugin.
     */
    getOperation(operationId: string, pluginId?: string): Promise<Operations.Operation>;
}
