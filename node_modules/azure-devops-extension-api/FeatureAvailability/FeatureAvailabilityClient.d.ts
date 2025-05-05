import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as FeatureAvailability from "../FeatureAvailability/FeatureAvailability";
export declare class FeatureAvailabilityRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Retrieve a listing of all feature flags and their current states for a user
     *
     * @param userEmail - The email of the user to check
     */
    getAllFeatureFlags(userEmail?: string): Promise<FeatureAvailability.FeatureFlag[]>;
    /**
     * Retrieve information on a single feature flag and its current states
     *
     * @param name - The name of the feature to retrieve
     * @param checkFeatureExists - Check if feature exists
     */
    getFeatureFlagByName(name: string, checkFeatureExists?: boolean): Promise<FeatureAvailability.FeatureFlag>;
    /**
     * Retrieve information on a single feature flag and its current states for a user
     *
     * @param name - The name of the feature to retrieve
     * @param userEmail - The email of the user to check
     * @param checkFeatureExists - Check if feature exists
     */
    getFeatureFlagByNameAndUserEmail(name: string, userEmail: string, checkFeatureExists?: boolean): Promise<FeatureAvailability.FeatureFlag>;
    /**
     * Retrieve information on a single feature flag and its current states for a user
     *
     * @param name - The name of the feature to retrieve
     * @param userId - The id of the user to check
     * @param checkFeatureExists - Check if feature exists
     */
    getFeatureFlagByNameAndUserId(name: string, userId: string, checkFeatureExists?: boolean): Promise<FeatureAvailability.FeatureFlag>;
    /**
     * Change the state of an individual feature flag for a name
     *
     * @param state - State that should be set
     * @param name - The name of the feature to change
     * @param userEmail -
     * @param checkFeatureExists - Checks if the feature exists before setting the state
     * @param setAtApplicationLevelAlso -
     */
    updateFeatureFlag(state: FeatureAvailability.FeatureFlagPatch, name: string, userEmail?: string, checkFeatureExists?: boolean, setAtApplicationLevelAlso?: boolean): Promise<FeatureAvailability.FeatureFlag>;
}
