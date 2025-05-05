import { IIdentity, IdentitiesGetConnectionsResponseModel } from "./IdentityService";
export interface IPeoplePickerProvider {
    /**
     * Add identities to the MRU
     * @returns A promise that returns true if successful false otherwise
     */
    addIdentitiesToMRU?: (identities: IIdentity[]) => Promise<boolean>;
    /**
     * Request Entity information given an entityId
     */
    getEntityFromUniqueAttribute: (entityId: string) => IIdentity | PromiseLike<IIdentity>;
    /**
     * If no input is in the search box when clicked, provide a set of identities to show (used for MRU)
     */
    onEmptyInputFocus?: () => IIdentity[] | PromiseLike<IIdentity[]> | null;
    /**
     * Given a list of currently selected items and a filter string, return a list of suggestions to put in the suggestion list
     */
    onFilterIdentities: (filter: string, selectedItems?: IIdentity[]) => IIdentity[] | PromiseLike<IIdentity[]> | null;
    /**
     * Request connection information about a given Entity.
     */
    onRequestConnectionInformation: (entity: IIdentity, getDirectReports?: boolean) => IdentitiesGetConnectionsResponseModel | PromiseLike<IdentitiesGetConnectionsResponseModel>;
    /**
     * Remove identities from the MRU
     * @returns A promise that returns true if successful false otherwise
     */
    removeIdentitiesFromMRU?: (identities: IIdentity[]) => Promise<boolean>;
}
export declare class PeoplePickerProvider implements IPeoplePickerProvider {
    private identityService;
    constructor();
    addIdentitiesToMRU: (identities: IIdentity[]) => Promise<boolean>;
    getEntityFromUniqueAttribute: (entityId: string) => IIdentity | PromiseLike<IIdentity>;
    onEmptyInputFocus: () => IIdentity[] | PromiseLike<IIdentity[]>;
    onFilterIdentities: (filter: string, selectedItems?: IIdentity[] | undefined) => IIdentity[] | Promise<IIdentity[]>;
    onRequestConnectionInformation: (entity: IIdentity, getDirectReports?: boolean | undefined) => IdentitiesGetConnectionsResponseModel | PromiseLike<IdentitiesGetConnectionsResponseModel>;
    removeIdentitiesFromMRU: (identities: IIdentity[]) => Promise<boolean>;
    private _onSearchPersona;
}
