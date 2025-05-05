import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Policy from "../Policy/Policy";
import * as WebApi from "../WebApi/WebApi";
export declare class PolicyRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Create a policy configuration of a given policy type.
     *
     * @param configuration - The policy configuration to create.
     * @param project - Project ID or project name
     */
    createPolicyConfiguration(configuration: Policy.PolicyConfiguration, project: string): Promise<Policy.PolicyConfiguration>;
    /**
     * Delete a policy configuration by its ID.
     *
     * @param project - Project ID or project name
     * @param configurationId - ID of the policy configuration to delete.
     */
    deletePolicyConfiguration(project: string, configurationId: number): Promise<void>;
    /**
     * Get a policy configuration by its ID.
     *
     * @param project - Project ID or project name
     * @param configurationId - ID of the policy configuration
     */
    getPolicyConfiguration(project: string, configurationId: number): Promise<Policy.PolicyConfiguration>;
    /**
     * Get a list of policy configurations in a project.
     *
     * @param project - Project ID or project name
     * @param scope - [Provided for legacy reasons] The scope on which a subset of policies is defined.
     * @param policyType - Filter returned policies to only this type
     */
    getPolicyConfigurations(project: string, scope?: string, policyType?: string): Promise<WebApi.PagedList<Policy.PolicyConfiguration>>;
    /**
     * Update a policy configuration by its ID.
     *
     * @param configuration - The policy configuration to update.
     * @param project - Project ID or project name
     * @param configurationId - ID of the existing policy configuration to be updated.
     */
    updatePolicyConfiguration(configuration: Policy.PolicyConfiguration, project: string, configurationId: number): Promise<Policy.PolicyConfiguration>;
    /**
     * Gets the present evaluation state of a policy.
     *
     * @param project - Project ID or project name
     * @param evaluationId - ID of the policy evaluation to be retrieved.
     */
    getPolicyEvaluation(project: string, evaluationId: string): Promise<Policy.PolicyEvaluationRecord>;
    /**
     * Requeue the policy evaluation.
     *
     * @param project - Project ID or project name
     * @param evaluationId - ID of the policy evaluation to be retrieved.
     */
    requeuePolicyEvaluation(project: string, evaluationId: string): Promise<Policy.PolicyEvaluationRecord>;
    /**
     * Retrieves a list of all the policy evaluation statuses for a specific pull request.
     *
     * @param project - Project ID or project name
     * @param artifactId - A string which uniquely identifies the target of a policy evaluation.
     * @param includeNotApplicable - Some policies might determine that they do not apply to a specific pull request. Setting this parameter to true will return evaluation records even for policies which don't apply to this pull request.
     * @param top - The number of policy evaluation records to retrieve.
     * @param skip - The number of policy evaluation records to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     */
    getPolicyEvaluations(project: string, artifactId: string, includeNotApplicable?: boolean, top?: number, skip?: number): Promise<Policy.PolicyEvaluationRecord[]>;
    /**
     * Retrieve a specific revision of a given policy by ID.
     *
     * @param project - Project ID or project name
     * @param configurationId - The policy configuration ID.
     * @param revisionId - The revision ID.
     */
    getPolicyConfigurationRevision(project: string, configurationId: number, revisionId: number): Promise<Policy.PolicyConfiguration>;
    /**
     * Retrieve all revisions for a given policy.
     *
     * @param project - Project ID or project name
     * @param configurationId - The policy configuration ID.
     * @param top - The number of revisions to retrieve.
     * @param skip - The number of revisions to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     */
    getPolicyConfigurationRevisions(project: string, configurationId: number, top?: number, skip?: number): Promise<Policy.PolicyConfiguration[]>;
    /**
     * Retrieve a specific policy type by ID.
     *
     * @param project - Project ID or project name
     * @param typeId - The policy ID.
     */
    getPolicyType(project: string, typeId: string): Promise<Policy.PolicyType>;
    /**
     * Retrieve all available policy types.
     *
     * @param project - Project ID or project name
     */
    getPolicyTypes(project: string): Promise<Policy.PolicyType[]>;
}
