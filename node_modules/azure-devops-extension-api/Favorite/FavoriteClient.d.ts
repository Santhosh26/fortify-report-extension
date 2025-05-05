import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Favorite from "../Favorite/Favorite";
export declare class FavoriteRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * @param faultInMissingHost -
     */
    getFavoriteProviders(faultInMissingHost?: boolean): Promise<Favorite.FavoriteProvider[]>;
    /**
     * @param favorite -
     */
    createFavorite(favorite: Favorite.FavoriteCreateParameters): Promise<Favorite.Favorite>;
    /**
     * @param favorite -
     * @param ownerScopeType -
     * @param ownerScopeId -
     */
    createFavoriteOfOwner(favorite: Favorite.FavoriteCreateParameters, ownerScopeType: string, ownerScopeId: string): Promise<Favorite.Favorite>;
    /**
     * @param favoriteId -
     * @param artifactType -
     * @param artifactScopeType -
     * @param artifactScopeId -
     */
    deleteFavoriteById(favoriteId: string, artifactType: string, artifactScopeType: string, artifactScopeId?: string): Promise<void>;
    /**
     * @param favoriteId -
     * @param ownerScopeType -
     * @param ownerScopeId -
     * @param artifactType -
     * @param artifactScopeType -
     * @param artifactScopeId -
     */
    deleteFavoriteOfOwnerById(favoriteId: string, ownerScopeType: string, ownerScopeId: string, artifactType: string, artifactScopeType: string, artifactScopeId?: string): Promise<void>;
    /**
     * @param artifactType -
     * @param artifactId -
     * @param artifactScopeType -
     * @param artifactScopeId -
     * @param includeExtendedDetails -
     */
    getFavoriteByArtifact(artifactType: string, artifactId: string, artifactScopeType: string, artifactScopeId?: string, includeExtendedDetails?: boolean): Promise<Favorite.Favorite>;
    /**
     * @param favoriteId -
     * @param artifactScopeType -
     * @param artifactType -
     * @param artifactScopeId -
     * @param includeExtendedDetails -
     */
    getFavoriteById(favoriteId: string, artifactScopeType: string, artifactType: string, artifactScopeId?: string, includeExtendedDetails?: boolean): Promise<Favorite.Favorite>;
    /**
     * @param favoriteId -
     * @param ownerScopeType -
     * @param ownerScopeId -
     * @param artifactScopeType -
     * @param artifactType -
     * @param artifactScopeId -
     * @param includeExtendedDetails -
     */
    getFavoriteOfOwnerById(favoriteId: string, ownerScopeType: string, ownerScopeId: string, artifactScopeType: string, artifactType: string, artifactScopeId?: string, includeExtendedDetails?: boolean): Promise<Favorite.Favorite>;
    /**
     * @param artifactType -
     * @param artifactScopeType -
     * @param artifactScopeId -
     * @param includeExtendedDetails -
     */
    getFavorites(artifactType?: string, artifactScopeType?: string, artifactScopeId?: string, includeExtendedDetails?: boolean): Promise<Favorite.Favorite[]>;
    /**
     * @param ownerScopeType -
     * @param ownerScopeId -
     * @param artifactType -
     * @param artifactScopeType -
     * @param artifactScopeId -
     * @param includeExtendedDetails -
     */
    getFavoritesOfOwner(ownerScopeType: string, ownerScopeId: string, artifactType?: string, artifactScopeType?: string, artifactScopeId?: string, includeExtendedDetails?: boolean): Promise<Favorite.Favorite[]>;
}
