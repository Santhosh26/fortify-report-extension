import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Locations from "../Locations/Locations";
import * as WebApi from "../WebApi/WebApi";
export declare class LocationsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * This was copied and adapted from TeamFoundationConnectionService.Connect()
     *
     * @param connectOptions -
     * @param lastChangeId - Obsolete 32-bit LastChangeId
     * @param lastChangeId64 - Non-truncated 64-bit LastChangeId
     */
    getConnectionData(connectOptions?: WebApi.ConnectOptions, lastChangeId?: number, lastChangeId64?: number): Promise<Locations.ConnectionData>;
    /**
     * @param areaId -
     * @param enterpriseName -
     * @param organizationName -
     */
    getResourceArea(areaId: string, enterpriseName?: string, organizationName?: string): Promise<Locations.ResourceAreaInfo>;
    /**
     * @param areaId -
     * @param hostId -
     */
    getResourceAreaByHost(areaId: string, hostId: string): Promise<Locations.ResourceAreaInfo>;
    /**
     * @param enterpriseName -
     * @param organizationName -
     */
    getResourceAreas(enterpriseName?: string, organizationName?: string): Promise<Locations.ResourceAreaInfo[]>;
    /**
     * @param hostId -
     */
    getResourceAreasByHost(hostId: string): Promise<Locations.ResourceAreaInfo[]>;
    /**
     * @param serviceType -
     * @param identifier -
     */
    deleteServiceDefinition(serviceType: string, identifier: string): Promise<void>;
    /**
     * Finds a given service definition.
     *
     * @param serviceType -
     * @param identifier -
     * @param allowFaultIn - If true, we will attempt to fault in a host instance mapping if in SPS.
     * @param previewFaultIn - If true, we will calculate and return a host instance mapping, but not persist it.
     */
    getServiceDefinition(serviceType: string, identifier: string, allowFaultIn?: boolean, previewFaultIn?: boolean): Promise<Locations.ServiceDefinition>;
    /**
     * @param serviceType -
     */
    getServiceDefinitions(serviceType?: string): Promise<Locations.ServiceDefinition[]>;
    /**
     * @param serviceDefinitions -
     */
    updateServiceDefinitions(serviceDefinitions: WebApi.VssJsonCollectionWrapperV<Locations.ServiceDefinition[]>): Promise<void>;
}
