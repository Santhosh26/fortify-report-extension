import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Profile from "../Profile/Profile";
import * as WebApi from "../WebApi/WebApi";
export declare class ProfileRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param id -
     * @param descriptor -
     */
    deleteProfileAttribute(id: string, descriptor: string): Promise<void>;
    /**
     * @param id -
     * @param descriptor -
     */
    getProfileAttribute(id: string, descriptor: string): Promise<Profile.ProfileAttribute>;
    /**
     * @param id -
     * @param partition -
     * @param modifiedSince -
     * @param modifiedAfterRevision -
     * @param withCoreAttributes -
     * @param coreAttributes -
     */
    getProfileAttributes(id: string, partition: string, modifiedSince?: string, modifiedAfterRevision?: string, withCoreAttributes?: boolean, coreAttributes?: string): Promise<Profile.ProfileAttribute[]>;
    /**
     * @param container -
     * @param id -
     * @param descriptor -
     */
    setProfileAttribute(container: any, id: string, descriptor: string): Promise<void>;
    /**
     * @param attributesCollection -
     * @param id -
     */
    setProfileAttributes(attributesCollection: WebApi.VssJsonCollectionWrapperV<Profile.ProfileAttributeBase<any>[]>, id: string): Promise<void>;
    /**
     * @param id -
     * @param size -
     * @param format -
     */
    getAvatar(id: string, size?: string, format?: string): Promise<Profile.Avatar>;
    /**
     * @param container -
     * @param id -
     * @param size -
     * @param format -
     * @param displayName -
     */
    getAvatarPreview(container: any, id: string, size?: string, format?: string, displayName?: string): Promise<Profile.Avatar>;
    /**
     * @param id -
     */
    resetAvatar(id: string): Promise<void>;
    /**
     * @param container -
     * @param id -
     */
    setAvatar(container: any, id: string): Promise<void>;
    /**
     * Create profile
     *
     * @param createProfileContext - Context for profile creation
     * @param autoCreate - Create profile automatically
     */
    createProfile(createProfileContext: Profile.CreateProfileContext, autoCreate?: boolean): Promise<Profile.Profile>;
    /**
     * Gets a user profile.
     *
     * @param id - The ID of the target user profile within the same organization, or 'me' to get the profile of the current authenticated user.
     * @param details - Return public profile information such as display name, email address, country, etc. If false, the withAttributes parameter is ignored.
     * @param withAttributes - If true, gets the attributes (named key-value pairs of arbitrary data) associated with the profile. The partition parameter must also have a value.
     * @param partition - The partition (named group) of attributes to return.
     * @param coreAttributes - A comma-delimited list of core profile attributes to return. Valid values are Email, Avatar, DisplayName, and ContactWithOffers.
     * @param forceRefresh - Not used in this version of the API.
     */
    getProfile(id: string, details?: boolean, withAttributes?: boolean, partition?: string, coreAttributes?: string, forceRefresh?: boolean): Promise<Profile.Profile>;
    /**
     * Update profile
     *
     * @param profile - Update profile
     * @param id - Profile ID
     */
    updateProfile(profile: Profile.Profile, id: string): Promise<void>;
}
