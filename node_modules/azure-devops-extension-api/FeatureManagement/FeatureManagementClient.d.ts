import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as FeatureManagement from "../FeatureManagement/FeatureManagement";
export declare class FeatureManagementRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Get a specific feature by its id
     *
     * @param featureId - The contribution id of the feature
     */
    getFeature(featureId: string): Promise<FeatureManagement.ContributedFeature>;
    /**
     * Get a list of all defined features
     *
     * @param targetContributionId - Optional target contribution. If null/empty, return all features. If specified include the features that target the specified contribution.
     */
    getFeatures(targetContributionId?: string): Promise<FeatureManagement.ContributedFeature[]>;
    /**
     * Get the state of the specified feature for the given user/all-users scope
     *
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     */
    getFeatureState(featureId: string, userScope: string): Promise<FeatureManagement.ContributedFeatureState>;
    /**
     * Set the state of a feature
     *
     * @param feature - Posted feature state object. Should specify the effective value.
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
     * @param reason - Reason for changing the state
     * @param reasonCode - Short reason code
     */
    setFeatureState(feature: FeatureManagement.ContributedFeatureState, featureId: string, userScope: string, reason?: string, reasonCode?: string): Promise<FeatureManagement.ContributedFeatureState>;
    /**
     * Get the state of the specified feature for the given named scope
     *
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
     * @param scopeValue - Value of the scope (e.g. the project or team id)
     */
    getFeatureStateForScope(featureId: string, userScope: string, scopeName: string, scopeValue: string): Promise<FeatureManagement.ContributedFeatureState>;
    /**
     * Set the state of a feature at a specific scope
     *
     * @param feature - Posted feature state object. Should specify the effective value.
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
     * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
     * @param scopeValue - Value of the scope (e.g. the project or team id)
     * @param reason - Reason for changing the state
     * @param reasonCode - Short reason code
     */
    setFeatureStateForScope(feature: FeatureManagement.ContributedFeatureState, featureId: string, userScope: string, scopeName: string, scopeValue: string, reason?: string, reasonCode?: string): Promise<FeatureManagement.ContributedFeatureState>;
    /**
     * Get the effective state for a list of feature ids
     *
     * @param query - Features to query along with current scope values
     */
    queryFeatureStates(query: FeatureManagement.ContributedFeatureStateQuery): Promise<FeatureManagement.ContributedFeatureStateQuery>;
    /**
     * Get the states of the specified features for the default scope
     *
     * @param query - Query describing the features to query.
     * @param userScope -
     */
    queryFeatureStatesForDefaultScope(query: FeatureManagement.ContributedFeatureStateQuery, userScope: string): Promise<FeatureManagement.ContributedFeatureStateQuery>;
    /**
     * Get the states of the specified features for the specific named scope
     *
     * @param query - Query describing the features to query.
     * @param userScope -
     * @param scopeName -
     * @param scopeValue -
     */
    queryFeatureStatesForNamedScope(query: FeatureManagement.ContributedFeatureStateQuery, userScope: string, scopeName: string, scopeValue: string): Promise<FeatureManagement.ContributedFeatureStateQuery>;
}
