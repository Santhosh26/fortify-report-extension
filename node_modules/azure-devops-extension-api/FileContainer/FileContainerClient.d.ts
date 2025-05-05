import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as FileContainer from "../FileContainer/FileContainer";
import * as WebApi from "../WebApi/WebApi";
export declare class FileContainerRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Creates the specified items in the referenced container.
     *
     * @param items -
     * @param containerId -
     * @param scope - A guid representing the scope of the container. This is often the project id.
     */
    createItems(items: WebApi.VssJsonCollectionWrapperV<FileContainer.FileContainerItem[]>, containerId: number, scope?: string): Promise<FileContainer.FileContainerItem[]>;
    /**
     * Deletes the specified items in a container.
     *
     * @param containerId - Container Id.
     * @param itemPath - Path to delete.
     * @param scope - A guid representing the scope of the container. This is often the project id.
     */
    deleteItem(containerId: number, itemPath: string, scope?: string): Promise<void>;
    /**
     * Gets containers filtered by a comma separated list of artifact uris within the same scope, if not specified returns all containers
     *
     * @param scope - A guid representing the scope of the container. This is often the project id.
     * @param artifactUris -
     */
    getContainers(scope?: string, artifactUris?: string): Promise<FileContainer.FileContainer[]>;
    /**
     * Gets the specified file container object in a format dependent upon the given parameters or HTTP Accept request header
     *
     * @param containerId - The requested container Id
     * @param scope - A guid representing the scope of the container. This is often the project id.
     * @param itemPath - The path to the item of interest
     * @param metadata - If true, this overrides any specified format parameter or HTTP Accept request header to provide non-recursive information for the given itemPath
     * @param format - If specified, this overrides the HTTP Accept request header to return either 'json' or 'zip'.  If $format is specified, then api-version should also be specified as a query parameter.
     * @param downloadFileName - If specified and returning other than JSON format, then this download name will be used (else defaults to itemPath)
     * @param includeDownloadTickets -
     * @param isShallow - If true, returns only immediate children(files & folders) for the given itemPath. False will return all items recursively within itemPath.
     * @param ignoreRequestedMediaType - Set to true to ignore the HTTP Accept request header. Default is false.
     * @param includeBlobMetadata -
     * @param saveAbsolutePath - Set to false to not save the absolute path to the specified directory of the artifact in the returned archive. Works only for artifact directories. Default is true.
     * @param preferRedirect - Set to true to get the redirect response which leads to the stream with content. Default is false.
     */
    getItems(containerId: number, scope?: string, itemPath?: string, metadata?: boolean, format?: string, downloadFileName?: string, includeDownloadTickets?: boolean, isShallow?: boolean, ignoreRequestedMediaType?: boolean, includeBlobMetadata?: boolean, saveAbsolutePath?: boolean, preferRedirect?: boolean): Promise<FileContainer.FileContainerItem[]>;
}
