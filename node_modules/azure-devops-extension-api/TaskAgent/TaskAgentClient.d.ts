import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as TaskAgent from "../TaskAgent/TaskAgent";
import * as WebApi from "../WebApi/WebApi";
export declare class TaskAgentRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param agentCloud -
     */
    addAgentCloud(agentCloud: TaskAgent.TaskAgentCloud): Promise<TaskAgent.TaskAgentCloud>;
    /**
     * @param agentCloudId -
     */
    deleteAgentCloud(agentCloudId: number): Promise<TaskAgent.TaskAgentCloud>;
    /**
     * @param agentCloudId -
     */
    getAgentCloud(agentCloudId: number): Promise<TaskAgent.TaskAgentCloud>;
    /**
     */
    getAgentClouds(): Promise<TaskAgent.TaskAgentCloud[]>;
    /**
     * @param updatedCloud -
     * @param agentCloudId -
     */
    updateAgentCloud(updatedCloud: TaskAgent.TaskAgentCloud, agentCloudId: number): Promise<TaskAgent.TaskAgentCloud>;
    /**
     * Get agent cloud types.
     *
     */
    getAgentCloudTypes(): Promise<TaskAgent.TaskAgentCloudType[]>;
    /**
     * @param project - Project ID or project name
     * @param queueId -
     * @param top -
     * @param continuationToken -
     */
    getAgentRequestsForQueue(project: string, queueId: number, top: number, continuationToken?: string): Promise<WebApi.PagedList<TaskAgent.TaskAgentJobRequest>>;
    /**
     * @param request -
     * @param project - Project ID or project name
     * @param queueId -
     */
    queueAgentRequest(request: TaskAgent.TaskAgentJobRequest, project: string, queueId: number): Promise<TaskAgent.TaskAgentJobRequest>;
    /**
     * Adds an agent to a pool.  You probably don't want to call this endpoint directly. Instead, [configure an agent](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) using the agent download package.
     *
     * @param agent - Details about the agent being added
     * @param poolId - The agent pool in which to add the agent
     */
    addAgent(agent: TaskAgent.TaskAgent, poolId: number): Promise<TaskAgent.TaskAgent>;
    /**
     * Delete an agent.  You probably don't want to call this endpoint directly. Instead, [use the agent configuration script](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) to remove an agent from your organization.
     *
     * @param poolId - The pool ID to remove the agent from
     * @param agentId - The agent ID to remove
     */
    deleteAgent(poolId: number, agentId: number): Promise<void>;
    /**
     * Get information about an agent.
     *
     * @param poolId - The agent pool containing the agent
     * @param agentId - The agent ID to get information about
     * @param includeCapabilities - Whether to include the agent's capabilities in the response
     * @param includeAssignedRequest - Whether to include details about the agent's current work
     * @param includeLastCompletedRequest - Whether to include details about the agents' most recent completed work
     * @param propertyFilters - Filter which custom properties will be returned
     */
    getAgent(poolId: number, agentId: number, includeCapabilities?: boolean, includeAssignedRequest?: boolean, includeLastCompletedRequest?: boolean, propertyFilters?: string[]): Promise<TaskAgent.TaskAgent>;
    /**
     * Get a list of agents.
     *
     * @param poolId - The agent pool containing the agents
     * @param agentName - Filter on agent name
     * @param includeCapabilities - Whether to include the agents' capabilities in the response
     * @param includeAssignedRequest - Whether to include details about the agents' current work
     * @param includeLastCompletedRequest - Whether to include details about the agents' most recent completed work
     * @param propertyFilters - Filter which custom properties will be returned
     * @param demands - Filter by demands the agents can satisfy
     */
    getAgents(poolId: number, agentName?: string, includeCapabilities?: boolean, includeAssignedRequest?: boolean, includeLastCompletedRequest?: boolean, propertyFilters?: string[], demands?: string[]): Promise<TaskAgent.TaskAgent[]>;
    /**
     * Replace an agent.  You probably don't want to call this endpoint directly. Instead, [use the agent configuration script](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) to remove and reconfigure an agent from your organization.
     *
     * @param agent - Updated details about the replacing agent
     * @param poolId - The agent pool to use
     * @param agentId - The agent to replace
     */
    replaceAgent(agent: TaskAgent.TaskAgent, poolId: number, agentId: number): Promise<TaskAgent.TaskAgent>;
    /**
     * Update agent details.
     *
     * @param agent - Updated details about the agent
     * @param poolId - The agent pool to use
     * @param agentId - The agent to update
     */
    updateAgent(agent: TaskAgent.TaskAgent, poolId: number, agentId: number): Promise<TaskAgent.TaskAgent>;
    /**
     * Returns list of azure subscriptions
     *
     */
    getAzureManagementGroups(): Promise<TaskAgent.AzureManagementGroupQueryResult>;
    /**
     * Returns list of azure subscriptions
     *
     */
    getAzureSubscriptions(): Promise<TaskAgent.AzureSubscriptionQueryResult>;
    /**
     * GET a PAT token for managing (configuring, removing, tagging) deployment targets in a deployment group.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment targets are managed.
     */
    generateDeploymentGroupAccessToken(project: string, deploymentGroupId: number): Promise<string>;
    /**
     * Create a deployment group.
     *
     * @param deploymentGroup - Deployment group to create.
     * @param project - Project ID or project name
     */
    addDeploymentGroup(deploymentGroup: TaskAgent.DeploymentGroupCreateParameter, project: string): Promise<TaskAgent.DeploymentGroup>;
    /**
     * Delete a deployment group.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to be deleted.
     */
    deleteDeploymentGroup(project: string, deploymentGroupId: number): Promise<void>;
    /**
     * Get a deployment group by its ID.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     * @param actionFilter - Get the deployment group only if this action can be performed on it.
     * @param expand - Include these additional details in the returned object.
     */
    getDeploymentGroup(project: string, deploymentGroupId: number, actionFilter?: TaskAgent.DeploymentGroupActionFilter, expand?: TaskAgent.DeploymentGroupExpands): Promise<TaskAgent.DeploymentGroup>;
    /**
     * Get a list of deployment groups by name or IDs.
     *
     * @param project - Project ID or project name
     * @param name - Name of the deployment group.
     * @param actionFilter - Get only deployment groups on which this action can be performed.
     * @param expand - Include these additional details in the returned objects.
     * @param continuationToken - Get deployment groups with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment groups to return. Default is **1000**.
     * @param ids - Comma separated list of IDs of the deployment groups.
     */
    getDeploymentGroups(project: string, name?: string, actionFilter?: TaskAgent.DeploymentGroupActionFilter, expand?: TaskAgent.DeploymentGroupExpands, continuationToken?: string, top?: number, ids?: number[]): Promise<WebApi.PagedList<TaskAgent.DeploymentGroup>>;
    /**
     * Update a deployment group.
     *
     * @param deploymentGroup - Deployment group to update.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     */
    updateDeploymentGroup(deploymentGroup: TaskAgent.DeploymentGroupUpdateParameter, project: string, deploymentGroupId: number): Promise<TaskAgent.DeploymentGroup>;
    /**
     * Get a list of deployment group metrics.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupName - Name of the deployment group.
     * @param continuationToken - Get metrics for deployment groups with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment group metrics to return. Default is **50**.
     */
    getDeploymentGroupsMetrics(project: string, deploymentGroupName?: string, continuationToken?: string, top?: number): Promise<WebApi.PagedList<TaskAgent.DeploymentGroupMetrics>>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineId -
     * @param completedRequestCount -
     */
    getAgentRequestsForDeploymentMachine(project: string, deploymentGroupId: number, machineId: number, completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineIds -
     * @param completedRequestCount -
     */
    getAgentRequestsForDeploymentMachines(project: string, deploymentGroupId: number, machineIds?: number[], completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     */
    refreshDeploymentMachines(project: string, deploymentGroupId: number): Promise<void>;
    /**
     * GET a PAT token for managing (configuring, removing, tagging) deployment agents in a deployment pool.
     *
     * @param poolId - ID of the deployment pool in which deployment agents are managed.
     */
    generateDeploymentPoolAccessToken(poolId: number): Promise<string>;
    /**
     * Get a list of deployment pool summaries.
     *
     * @param poolName - Name of the deployment pool.
     * @param expands - Include these additional details in the returned objects.
     * @param poolIds - List of deployment pool ids.
     */
    getDeploymentPoolsSummary(poolName?: string, expands?: TaskAgent.DeploymentPoolSummaryExpands, poolIds?: number[]): Promise<TaskAgent.DeploymentPoolSummary[]>;
    /**
     * Get agent requests for a deployment target.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the target belongs.
     * @param targetId - ID of the deployment target.
     * @param completedRequestCount - Maximum number of completed requests to return. Default is **50**
     */
    getAgentRequestsForDeploymentTarget(project: string, deploymentGroupId: number, targetId: number, completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * Get agent requests for a list deployment targets.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the targets belong.
     * @param targetIds - Comma separated list of IDs of the deployment targets.
     * @param ownerId - Id of owner of agent job request.
     * @param completedOn - Datetime to return request after this time.
     * @param completedRequestCount - Maximum number of completed requests to return for each target. Default is **50**
     */
    getAgentRequestsForDeploymentTargets(project: string, deploymentGroupId: number, targetIds?: number[], ownerId?: number, completedOn?: Date, completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * Upgrade the deployment targets in a deployment group.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     */
    refreshDeploymentTargets(project: string, deploymentGroupId: number): Promise<void>;
    /**
     * Proxy for a GET request defined by an 'endpoint'. The request is authorized using a service connection. The response is filtered using an XPath/Json based selector.
     *
     * @param endpoint - Describes the URL to fetch.
     */
    queryEndpoint(endpoint: TaskAgent.TaskDefinitionEndpoint): Promise<string[]>;
    /**
     * Get environment deployment execution history
     *
     * @param project - Project ID or project name
     * @param environmentId -
     * @param continuationToken -
     * @param top -
     */
    getEnvironmentDeploymentExecutionRecords(project: string, environmentId: number, continuationToken?: string, top?: number): Promise<WebApi.PagedList<TaskAgent.EnvironmentDeploymentExecutionRecord>>;
    /**
     * Create an environment.
     *
     * @param environmentCreateParameter - Environment to create.
     * @param project - Project ID or project name
     */
    addEnvironment(environmentCreateParameter: TaskAgent.EnvironmentCreateParameter, project: string): Promise<TaskAgent.EnvironmentInstance>;
    /**
     * Delete the specified environment.
     *
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     */
    deleteEnvironment(project: string, environmentId: number): Promise<void>;
    /**
     * Get an environment by its ID.
     *
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     * @param expands - Include these additional details in the returned objects.
     */
    getEnvironmentById(project: string, environmentId: number, expands?: TaskAgent.EnvironmentExpands): Promise<TaskAgent.EnvironmentInstance>;
    /**
     * Get all environments.
     *
     * @param project - Project ID or project name
     * @param name -
     * @param continuationToken -
     * @param top -
     */
    getEnvironments(project: string, name?: string, continuationToken?: string, top?: number): Promise<WebApi.PagedList<TaskAgent.EnvironmentInstance>>;
    /**
     * Update the specified environment.
     *
     * @param environmentUpdateParameter - Environment data to update.
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     */
    updateEnvironment(environmentUpdateParameter: TaskAgent.EnvironmentUpdateParameter, project: string, environmentId: number): Promise<TaskAgent.EnvironmentInstance>;
    /**
     * @param hubName -
     * @param includeEnterpriseUsersCount -
     * @param includeHostedAgentMinutesCount -
     */
    getTaskHubLicenseDetails(hubName: string, includeEnterpriseUsersCount?: boolean, includeHostedAgentMinutesCount?: boolean): Promise<TaskAgent.TaskHubLicenseDetails>;
    /**
     * @param taskHubLicenseDetails -
     * @param hubName -
     */
    updateTaskHubLicenseDetails(taskHubLicenseDetails: TaskAgent.TaskHubLicenseDetails, hubName: string): Promise<TaskAgent.TaskHubLicenseDetails>;
    /**
     * @param inputValidationRequest -
     */
    validateInputs(inputValidationRequest: TaskAgent.InputValidationRequest): Promise<TaskAgent.InputValidationRequest>;
    /**
     * @param poolId -
     * @param requestId -
     * @param lockToken -
     * @param result -
     * @param agentShuttingDown -
     */
    deleteAgentRequest(poolId: number, requestId: number, lockToken: string, result?: TaskAgent.TaskResult, agentShuttingDown?: boolean): Promise<void>;
    /**
     * @param poolId -
     * @param requestId -
     * @param includeStatus -
     */
    getAgentRequest(poolId: number, requestId: number, includeStatus?: boolean): Promise<TaskAgent.TaskAgentJobRequest>;
    /**
     * @param poolId -
     * @param top -
     * @param continuationToken -
     */
    getAgentRequests(poolId: number, top: number, continuationToken?: string): Promise<WebApi.PagedList<TaskAgent.TaskAgentJobRequest>>;
    /**
     * @param poolId -
     * @param agentId -
     * @param completedRequestCount -
     */
    getAgentRequestsForAgent(poolId: number, agentId: number, completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * @param poolId -
     * @param agentIds -
     * @param completedRequestCount -
     */
    getAgentRequestsForAgents(poolId: number, agentIds?: number[], completedRequestCount?: number): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * @param poolId -
     * @param planId -
     * @param jobId -
     */
    getAgentRequestsForPlan(poolId: number, planId: string, jobId?: string): Promise<TaskAgent.TaskAgentJobRequest[]>;
    /**
     * @param request -
     * @param poolId -
     */
    queueAgentRequestByPool(request: TaskAgent.TaskAgentJobRequest, poolId: number): Promise<TaskAgent.TaskAgentJobRequest>;
    /**
     * @param request -
     * @param poolId -
     * @param requestId -
     * @param lockToken -
     * @param updateOptions -
     */
    updateAgentRequest(request: TaskAgent.TaskAgentJobRequest, poolId: number, requestId: number, lockToken: string, updateOptions?: TaskAgent.TaskAgentRequestUpdateOptions): Promise<TaskAgent.TaskAgentJobRequest>;
    /**
     * @param createParameters -
     * @param project - Project ID or project name
     * @param environmentId -
     */
    addKubernetesResource(createParameters: TaskAgent.KubernetesResourceCreateParameters, project: string, environmentId: number): Promise<TaskAgent.KubernetesResource>;
    /**
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     */
    deleteKubernetesResource(project: string, environmentId: number, resourceId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     */
    getKubernetesResource(project: string, environmentId: number, resourceId: number): Promise<TaskAgent.KubernetesResource>;
    /**
     * @param project - Project ID or project name
     * @param machineGroupId -
     */
    generateDeploymentMachineGroupAccessToken(project: string, machineGroupId: number): Promise<string>;
    /**
     * @param machineGroup -
     * @param project - Project ID or project name
     */
    addDeploymentMachineGroup(machineGroup: TaskAgent.DeploymentMachineGroup, project: string): Promise<TaskAgent.DeploymentMachineGroup>;
    /**
     * @param project - Project ID or project name
     * @param machineGroupId -
     */
    deleteDeploymentMachineGroup(project: string, machineGroupId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param machineGroupId -
     * @param actionFilter -
     */
    getDeploymentMachineGroup(project: string, machineGroupId: number, actionFilter?: TaskAgent.MachineGroupActionFilter): Promise<TaskAgent.DeploymentMachineGroup>;
    /**
     * @param project - Project ID or project name
     * @param machineGroupName -
     * @param actionFilter -
     */
    getDeploymentMachineGroups(project: string, machineGroupName?: string, actionFilter?: TaskAgent.MachineGroupActionFilter): Promise<TaskAgent.DeploymentMachineGroup[]>;
    /**
     * @param machineGroup -
     * @param project - Project ID or project name
     * @param machineGroupId -
     */
    updateDeploymentMachineGroup(machineGroup: TaskAgent.DeploymentMachineGroup, project: string, machineGroupId: number): Promise<TaskAgent.DeploymentMachineGroup>;
    /**
     * @param project - Project ID or project name
     * @param machineGroupId -
     * @param tagFilters -
     */
    getDeploymentMachineGroupMachines(project: string, machineGroupId: number, tagFilters?: string[]): Promise<TaskAgent.DeploymentMachine[]>;
    /**
     * @param deploymentMachines -
     * @param project - Project ID or project name
     * @param machineGroupId -
     */
    updateDeploymentMachineGroupMachines(deploymentMachines: TaskAgent.DeploymentMachine[], project: string, machineGroupId: number): Promise<TaskAgent.DeploymentMachine[]>;
    /**
     * @param machine -
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     */
    addDeploymentMachine(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineId -
     */
    deleteDeploymentMachine(project: string, deploymentGroupId: number, machineId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineId -
     * @param expand -
     */
    getDeploymentMachine(project: string, deploymentGroupId: number, machineId: number, expand?: TaskAgent.DeploymentMachineExpands): Promise<TaskAgent.DeploymentMachine>;
    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param tags -
     * @param name -
     * @param expand -
     */
    getDeploymentMachines(project: string, deploymentGroupId: number, tags?: string[], name?: string, expand?: TaskAgent.DeploymentMachineExpands): Promise<TaskAgent.DeploymentMachine[]>;
    /**
     * @param machine -
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineId -
     */
    replaceDeploymentMachine(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number, machineId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * @param machine -
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     * @param machineId -
     */
    updateDeploymentMachine(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number, machineId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * @param machines -
     * @param project - Project ID or project name
     * @param deploymentGroupId -
     */
    updateDeploymentMachines(machines: TaskAgent.DeploymentMachine[], project: string, deploymentGroupId: number): Promise<TaskAgent.DeploymentMachine[]>;
    /**
     * @param definition -
     * @param poolId -
     */
    createAgentPoolMaintenanceDefinition(definition: TaskAgent.TaskAgentPoolMaintenanceDefinition, poolId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition>;
    /**
     * @param poolId -
     * @param definitionId -
     */
    deleteAgentPoolMaintenanceDefinition(poolId: number, definitionId: number): Promise<void>;
    /**
     * @param poolId -
     * @param definitionId -
     */
    getAgentPoolMaintenanceDefinition(poolId: number, definitionId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition>;
    /**
     * @param poolId -
     */
    getAgentPoolMaintenanceDefinitions(poolId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition[]>;
    /**
     * @param definition -
     * @param poolId -
     * @param definitionId -
     */
    updateAgentPoolMaintenanceDefinition(definition: TaskAgent.TaskAgentPoolMaintenanceDefinition, poolId: number, definitionId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition>;
    /**
     * @param poolId -
     * @param jobId -
     */
    deleteAgentPoolMaintenanceJob(poolId: number, jobId: number): Promise<void>;
    /**
     * @param poolId -
     * @param jobId -
     */
    getAgentPoolMaintenanceJob(poolId: number, jobId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceJob>;
    /**
     * @param poolId -
     * @param jobId -
     */
    getAgentPoolMaintenanceJobLogs(poolId: number, jobId: number): Promise<ArrayBuffer>;
    /**
     * @param poolId -
     * @param definitionId -
     */
    getAgentPoolMaintenanceJobs(poolId: number, definitionId?: number): Promise<TaskAgent.TaskAgentPoolMaintenanceJob[]>;
    /**
     * @param job -
     * @param poolId -
     */
    queueAgentPoolMaintenanceJob(job: TaskAgent.TaskAgentPoolMaintenanceJob, poolId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceJob>;
    /**
     * @param job -
     * @param poolId -
     * @param jobId -
     */
    updateAgentPoolMaintenanceJob(job: TaskAgent.TaskAgentPoolMaintenanceJob, poolId: number, jobId: number): Promise<TaskAgent.TaskAgentPoolMaintenanceJob>;
    /**
     * @param poolId -
     * @param messageId -
     * @param sessionId -
     */
    deleteMessage(poolId: number, messageId: number, sessionId: string): Promise<void>;
    /**
     * @param poolId -
     * @param sessionId -
     * @param lastMessageId -
     */
    getMessage(poolId: number, sessionId: string, lastMessageId?: number): Promise<TaskAgent.TaskAgentMessage>;
    /**
     * @param poolId -
     * @param agentId -
     */
    refreshAgent(poolId: number, agentId: number): Promise<void>;
    /**
     * @param poolId -
     */
    refreshAgents(poolId: number): Promise<void>;
    /**
     * @param message -
     * @param poolId -
     * @param requestId -
     */
    sendMessage(message: TaskAgent.TaskAgentMessage, poolId: number, requestId: number): Promise<void>;
    /**
     * @param packageType -
     * @param platform -
     * @param version -
     */
    getPackage(packageType: string, platform: string, version: string): Promise<TaskAgent.PackageMetadata>;
    /**
     * @param packageType -
     * @param platform -
     * @param top -
     */
    getPackages(packageType: string, platform?: string, top?: number): Promise<TaskAgent.PackageMetadata[]>;
    /**
     * @param poolId -
     */
    getAgentPoolMetadata(poolId: number): Promise<string>;
    /**
     * @param agentPoolMetadata -
     * @param poolId -
     */
    setAgentPoolMetadata(agentPoolMetadata: any, poolId: number): Promise<void>;
    /**
     * Checks if current identity has passed permissions on a pool.
     *
     * @param poolId - Id of the pool to check
     * @param permissions - Permissions to check. Multiple permissions might be merged into single value using bitwise OR operator (e.g. AgentPoolPermissions.Manage | AgentPoolPermissions.View)
     */
    hasPoolPermissions(poolId: number, permissions: number): Promise<boolean>;
    /**
     * Create an agent pool.
     *
     * @param pool - Details about the new agent pool
     */
    addAgentPool(pool: TaskAgent.TaskAgentPool): Promise<TaskAgent.TaskAgentPool>;
    /**
     * Delete an agent pool.
     *
     * @param poolId - ID of the agent pool to delete
     */
    deleteAgentPool(poolId: number): Promise<void>;
    /**
     * Get information about an agent pool.
     *
     * @param poolId - An agent pool ID
     * @param properties - Agent pool properties (comma-separated)
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentPool(poolId: number, properties?: string[], actionFilter?: TaskAgent.TaskAgentPoolActionFilter): Promise<TaskAgent.TaskAgentPool>;
    /**
     * Get a list of agent pools.
     *
     * @param poolName - Filter by name
     * @param properties - Filter by agent pool properties (comma-separated)
     * @param poolType - Filter by pool type
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentPools(poolName?: string, properties?: string[], poolType?: TaskAgent.TaskAgentPoolType, actionFilter?: TaskAgent.TaskAgentPoolActionFilter): Promise<TaskAgent.TaskAgentPool[]>;
    /**
     * Get a list of agent pools.
     *
     * @param poolIds - pool Ids to fetch
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentPoolsByIds(poolIds: number[], actionFilter?: TaskAgent.TaskAgentPoolActionFilter): Promise<TaskAgent.TaskAgentPool[]>;
    /**
     * Update properties on an agent pool
     *
     * @param pool - Updated agent pool details
     * @param poolId - The agent pool to update
     */
    updateAgentPool(pool: TaskAgent.TaskAgentPool, poolId: number): Promise<TaskAgent.TaskAgentPool>;
    /**
     * Create a new agent queue to connect a project to an agent pool.
     *
     * @param queue - Details about the queue to create
     * @param project - Project ID or project name
     * @param authorizePipelines - Automatically authorize this queue when using YAML
     */
    addAgentQueue(queue: TaskAgent.TaskAgentQueue, project?: string, authorizePipelines?: boolean): Promise<TaskAgent.TaskAgentQueue>;
    /**
     * Create a new team project.
     *
     * @param project - Project ID or project name
     */
    createTeamProject(project?: string): Promise<void>;
    /**
     * Removes an agent queue from a project.
     *
     * @param queueId - The agent queue to remove
     * @param project - Project ID or project name
     */
    deleteAgentQueue(queueId: number, project?: string): Promise<void>;
    /**
     * Get information about an agent queue.
     *
     * @param queueId - The agent queue to get information about
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentQueue(queueId: number, project?: string, actionFilter?: TaskAgent.TaskAgentQueueActionFilter): Promise<TaskAgent.TaskAgentQueue>;
    /**
     * Get a list of agent queues.
     *
     * @param project - Project ID or project name
     * @param queueName - Filter on the agent queue name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentQueues(project?: string, queueName?: string, actionFilter?: TaskAgent.TaskAgentQueueActionFilter): Promise<TaskAgent.TaskAgentQueue[]>;
    /**
     * Get a list of agent queues by their IDs
     *
     * @param queueIds - A comma-separated list of agent queue IDs to retrieve
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentQueuesByIds(queueIds: number[], project?: string, actionFilter?: TaskAgent.TaskAgentQueueActionFilter): Promise<TaskAgent.TaskAgentQueue[]>;
    /**
     * Get a list of agent queues by their names
     *
     * @param queueNames - A comma-separated list of agent names to retrieve
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentQueuesByNames(queueNames: string[], project?: string, actionFilter?: TaskAgent.TaskAgentQueueActionFilter): Promise<TaskAgent.TaskAgentQueue[]>;
    /**
     * Get a list of agent queues by pool ids
     *
     * @param poolIds - A comma-separated list of pool ids to get the corresponding queues for
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    getAgentQueuesForPools(poolIds: number[], project?: string, actionFilter?: TaskAgent.TaskAgentQueueActionFilter): Promise<TaskAgent.TaskAgentQueue[]>;
    /**
     * @param agentCloudId -
     */
    getAgentCloudRequests(agentCloudId: number): Promise<TaskAgent.TaskAgentCloudRequest[]>;
    /**
     */
    getResourceLimits(): Promise<TaskAgent.ResourceLimit[]>;
    /**
     * @param parallelismTag -
     * @param poolIsHosted -
     * @param includeRunningRequests -
     */
    getResourceUsage(parallelismTag?: string, poolIsHosted?: boolean, includeRunningRequests?: boolean): Promise<TaskAgent.ResourceUsage>;
    /**
     * @param project - Project ID or project name
     * @param taskGroupId -
     */
    getTaskGroupHistory(project: string, taskGroupId: string): Promise<TaskAgent.TaskGroupRevision[]>;
    /**
     * Delete a secure file
     *
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     */
    deleteSecureFile(project: string, secureFileId: string): Promise<void>;
    /**
     * Download a secure file by Id
     *
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     * @param ticket - A valid download ticket
     * @param download - If download is true, the file is sent as attachement in the response body. If download is false, the response body contains the file stream.
     */
    downloadSecureFile(project: string, secureFileId: string, ticket: string, download?: boolean): Promise<ArrayBuffer>;
    /**
     * Get a secure file
     *
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     * @param includeDownloadTicket - If includeDownloadTicket is true and the caller has permissions, a download ticket is included in the response.
     * @param actionFilter -
     */
    getSecureFile(project: string, secureFileId: string, includeDownloadTicket?: boolean, actionFilter?: TaskAgent.SecureFileActionFilter): Promise<TaskAgent.SecureFile>;
    /**
     * Get secure files
     *
     * @param project - Project ID or project name
     * @param namePattern - Name of the secure file to match. Can include wildcards to match multiple files.
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter - Filter by secure file permissions for View, Manage or Use action. Defaults to View.
     */
    getSecureFiles(project: string, namePattern?: string, includeDownloadTickets?: boolean, actionFilter?: TaskAgent.SecureFileActionFilter): Promise<TaskAgent.SecureFile[]>;
    /**
     * Get secure files
     *
     * @param project - Project ID or project name
     * @param secureFileIds - A list of secure file Ids
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter -
     */
    getSecureFilesByIds(project: string, secureFileIds: string[], includeDownloadTickets?: boolean, actionFilter?: TaskAgent.SecureFileActionFilter): Promise<TaskAgent.SecureFile[]>;
    /**
     * Get secure files
     *
     * @param project - Project ID or project name
     * @param secureFileNames - A list of secure file Ids
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter -
     */
    getSecureFilesByNames(project: string, secureFileNames: string[], includeDownloadTickets?: boolean, actionFilter?: TaskAgent.SecureFileActionFilter): Promise<TaskAgent.SecureFile[]>;
    /**
     * Query secure files using a name pattern and a condition on file properties.
     *
     * @param condition - The main condition syntax is described [here](https://go.microsoft.com/fwlink/?linkid=842996). Use the *property('property-name')* function to access the value of the specified property of a secure file. It returns null if the property is not set. E.g. \`\`\` and( eq( property('devices'), '2' ), in( property('provisioning profile type'), 'ad hoc', 'development' ) ) \`\`\`
     * @param project - Project ID or project name
     * @param namePattern - Name of the secure file to match. Can include wildcards to match multiple files.
     */
    querySecureFilesByProperties(condition: string, project: string, namePattern?: string): Promise<TaskAgent.SecureFile[]>;
    /**
     * Update the name or properties of an existing secure file
     *
     * @param secureFile - The secure file with updated name and/or properties
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     */
    updateSecureFile(secureFile: TaskAgent.SecureFile, project: string, secureFileId: string): Promise<TaskAgent.SecureFile>;
    /**
     * Update properties and/or names of a set of secure files. Files are identified by their IDs. Properties provided override the existing one entirely, i.e. do not merge.
     *
     * @param secureFiles - A list of secure file objects. Only three field must be populated Id, Name, and Properties. The rest of fields in the object are ignored.
     * @param project - Project ID or project name
     */
    updateSecureFiles(secureFiles: TaskAgent.SecureFile[], project: string): Promise<TaskAgent.SecureFile[]>;
    /**
     * Upload a secure file, include the file stream in the request body
     *
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param name - Name of the file to upload
     * @param authorizePipelines - If authorizePipelines is true, then the secure file is authorized for use by all pipelines in the project.
     */
    uploadSecureFile(content: any, project: string, name: string, authorizePipelines?: boolean): Promise<TaskAgent.SecureFile>;
    /**
     * @param session -
     * @param poolId -
     */
    createAgentSession(session: TaskAgent.TaskAgentSession, poolId: number): Promise<TaskAgent.TaskAgentSession>;
    /**
     * @param poolId -
     * @param sessionId -
     */
    deleteAgentSession(poolId: number, sessionId: string): Promise<void>;
    /**
     * Register a deployment target to a deployment group. Generally this is called by agent configuration tool.
     *
     * @param machine - Deployment target to register.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the deployment target is registered.
     */
    addDeploymentTarget(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * Delete a deployment target in a deployment group. This deletes the agent from associated deployment pool too.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is deleted.
     * @param targetId - ID of the deployment target to delete.
     */
    deleteDeploymentTarget(project: string, deploymentGroupId: number, targetId: number): Promise<void>;
    /**
     * Get a deployment target by its ID in a deployment group
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which deployment target belongs.
     * @param targetId - ID of the deployment target to return.
     * @param expand - Include these additional details in the returned objects.
     */
    getDeploymentTarget(project: string, deploymentGroupId: number, targetId: number, expand?: TaskAgent.DeploymentTargetExpands): Promise<TaskAgent.DeploymentMachine>;
    /**
     * Get a list of deployment targets in a deployment group.
     *
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     * @param tags - Get only the deployment targets that contain all these comma separted list of tags.
     * @param name - Name pattern of the deployment targets to return.
     * @param partialNameMatch - When set to true, treats **name** as pattern. Else treats it as absolute match. Default is **false**.
     * @param expand - Include these additional details in the returned objects.
     * @param agentStatus - Get only deployment targets that have this status.
     * @param agentJobResult - Get only deployment targets that have this last job result.
     * @param continuationToken - Get deployment targets with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment targets to return. Default is **1000**.
     * @param enabled - Get only deployment targets that are enabled or disabled. Default is 'null' which returns all the targets.
     * @param propertyFilters -
     */
    getDeploymentTargets(project: string, deploymentGroupId: number, tags?: string[], name?: string, partialNameMatch?: boolean, expand?: TaskAgent.DeploymentTargetExpands, agentStatus?: TaskAgent.TaskAgentStatusFilter, agentJobResult?: TaskAgent.TaskAgentJobResultFilter, continuationToken?: string, top?: number, enabled?: boolean, propertyFilters?: string[]): Promise<WebApi.PagedList<TaskAgent.DeploymentMachine>>;
    /**
     * Replace a deployment target in a deployment group. Generally this is called by agent configuration tool.
     *
     * @param machine - New deployment target.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is replaced.
     * @param targetId - ID of the deployment target to replace.
     */
    replaceDeploymentTarget(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number, targetId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * Update a deployment target and its agent properties in a deployment group. Generally this is called by agent configuration tool.
     *
     * @param machine - Deployment target to update.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is updated.
     * @param targetId - ID of the deployment target to update.
     */
    updateDeploymentTarget(machine: TaskAgent.DeploymentMachine, project: string, deploymentGroupId: number, targetId: number): Promise<TaskAgent.DeploymentMachine>;
    /**
     * Update tags of a list of deployment targets in a deployment group.
     *
     * @param machines - Deployment targets with tags to udpdate.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment targets are updated.
     */
    updateDeploymentTargets(machines: TaskAgent.DeploymentTargetUpdateParameter[], project: string, deploymentGroupId: number): Promise<TaskAgent.DeploymentMachine[]>;
    /**
     * Create a task group.
     *
     * @param taskGroup - Task group object to create.
     * @param project - Project ID or project name
     */
    addTaskGroup(taskGroup: TaskAgent.TaskGroupCreateParameter, project: string): Promise<TaskAgent.TaskGroup>;
    /**
     * Delete a task group.
     *
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group to be deleted.
     * @param comment - Comments to delete.
     */
    deleteTaskGroup(project: string, taskGroupId: string, comment?: string): Promise<void>;
    /**
     * Get task group.
     *
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group.
     * @param versionSpec - version specification of the task group. examples: 1, 1.0.
     * @param expand - The properties that should be expanded. example $expand=Tasks will expand nested task groups.
     */
    getTaskGroup(project: string, taskGroupId: string, versionSpec: string, expand?: TaskAgent.TaskGroupExpands): Promise<TaskAgent.TaskGroup>;
    /**
     * @param project - Project ID or project name
     * @param taskGroupId -
     * @param revision -
     */
    getTaskGroupRevision(project: string, taskGroupId: string, revision: number): Promise<string>;
    /**
     * List task groups.
     *
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group.
     * @param expanded - 'true' to recursively expand task groups. Default is 'false'.
     * @param taskIdFilter - Guid of the taskId to filter.
     * @param deleted - 'true'to include deleted task groups. Default is 'false'.
     * @param top - Number of task groups to get.
     * @param continuationToken - Gets the task groups after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order. Default is 'CreatedOnDescending'.
     */
    getTaskGroups(project: string, taskGroupId?: string, expanded?: boolean, taskIdFilter?: string, deleted?: boolean, top?: number, continuationToken?: Date, queryOrder?: TaskAgent.TaskGroupQueryOrder): Promise<TaskAgent.TaskGroup[]>;
    /**
     * @param taskGroupMetadata -
     * @param project - Project ID or project name
     * @param parentTaskGroupId -
     */
    publishTaskGroup(taskGroupMetadata: TaskAgent.PublishTaskGroupMetadata, project: string, parentTaskGroupId: string): Promise<TaskAgent.TaskGroup[]>;
    /**
     * @param taskGroup -
     * @param project - Project ID or project name
     */
    undeleteTaskGroup(taskGroup: TaskAgent.TaskGroup, project: string): Promise<TaskAgent.TaskGroup[]>;
    /**
     * Update a task group.
     *
     * @param taskGroup - Task group to update.
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group to update.
     */
    updateTaskGroup(taskGroup: TaskAgent.TaskGroupUpdateParameter, project: string, taskGroupId?: string): Promise<TaskAgent.TaskGroup>;
    /**
     * @param taskGroupUpdateProperties -
     * @param project - Project ID or project name
     * @param taskGroupId -
     * @param disablePriorVersions -
     */
    updateTaskGroupProperties(taskGroupUpdateProperties: TaskAgent.TaskGroupUpdatePropertiesBase, project: string, taskGroupId: string, disablePriorVersions?: boolean): Promise<TaskAgent.TaskGroup[]>;
    /**
     * @param taskId -
     */
    deleteTaskDefinition(taskId: string): Promise<void>;
    /**
     * @param taskId -
     * @param versionString -
     * @param visibility -
     * @param scopeLocal -
     */
    getTaskContentZip(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): Promise<ArrayBuffer>;
    /**
     * @param taskId -
     * @param versionString -
     * @param visibility -
     * @param scopeLocal -
     */
    getTaskDefinition(taskId: string, versionString: string, visibility?: string[], scopeLocal?: boolean): Promise<TaskAgent.TaskDefinition>;
    /**
     * @param taskId -
     * @param visibility -
     * @param scopeLocal -
     * @param allVersions -
     */
    getTaskDefinitions(taskId?: string, visibility?: string[], scopeLocal?: boolean, allVersions?: boolean): Promise<TaskAgent.TaskDefinition[]>;
    /**
     * @param poolId -
     * @param agentId -
     * @param currentState -
     */
    updateAgentUpdateState(poolId: number, agentId: number, currentState: string): Promise<TaskAgent.TaskAgent>;
    /**
     * @param userCapabilities -
     * @param poolId -
     * @param agentId -
     */
    updateAgentUserCapabilities(userCapabilities: {
        [key: string]: string;
    }, poolId: number, agentId: number): Promise<TaskAgent.TaskAgent>;
    /**
     * Add a variable group.
     *
     * @param variableGroupParameters -
     */
    addVariableGroup(variableGroupParameters: TaskAgent.VariableGroupParameters): Promise<TaskAgent.VariableGroup>;
    /**
     * Delete a variable group
     *
     * @param groupId - Id of the variable group.
     * @param projectIds -
     */
    deleteVariableGroup(groupId: number, projectIds: string[]): Promise<void>;
    /**
     * Add a variable group.
     *
     * @param variableGroupProjectReferences -
     * @param variableGroupId -
     */
    shareVariableGroup(variableGroupProjectReferences: TaskAgent.VariableGroupProjectReference[], variableGroupId: number): Promise<void>;
    /**
     * Update a variable group.
     *
     * @param variableGroupParameters -
     * @param groupId - Id of the variable group to update.
     */
    updateVariableGroup(variableGroupParameters: TaskAgent.VariableGroupParameters, groupId: number): Promise<TaskAgent.VariableGroup>;
    /**
     * Get a variable group.
     *
     * @param project - Project ID or project name
     * @param groupId - Id of the variable group.
     */
    getVariableGroup(project: string, groupId: number): Promise<TaskAgent.VariableGroup>;
    /**
     * Get variable groups.
     *
     * @param project - Project ID or project name
     * @param groupName - Name of variable group.
     * @param actionFilter - Action filter for the variable group. It specifies the action which can be performed on the variable groups.
     * @param top - Number of variable groups to get.
     * @param continuationToken - Gets the variable groups after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order. Default is 'IdDescending'.
     */
    getVariableGroups(project: string, groupName?: string, actionFilter?: TaskAgent.VariableGroupActionFilter, top?: number, continuationToken?: number, queryOrder?: TaskAgent.VariableGroupQueryOrder): Promise<TaskAgent.VariableGroup[]>;
    /**
     * Get variable groups by ids.
     *
     * @param project - Project ID or project name
     * @param groupIds - Comma separated list of Ids of variable groups.
     * @param loadSecrets - Flag indicating if the secrets within variable groups should be loaded.
     */
    getVariableGroupsById(project: string, groupIds: number[], loadSecrets?: boolean): Promise<TaskAgent.VariableGroup[]>;
    /**
     * @param createParameters -
     * @param project - Project ID or project name
     * @param environmentId -
     */
    addVirtualMachineGroup(createParameters: TaskAgent.VirtualMachineGroupCreateParameters, project: string, environmentId: number): Promise<TaskAgent.VirtualMachineGroup>;
    /**
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     */
    deleteVirtualMachineGroup(project: string, environmentId: number, resourceId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     */
    getVirtualMachineGroup(project: string, environmentId: number, resourceId: number): Promise<TaskAgent.VirtualMachineGroup>;
    /**
     * @param resource -
     * @param project - Project ID or project name
     * @param environmentId -
     */
    updateVirtualMachineGroup(resource: TaskAgent.VirtualMachineGroup, project: string, environmentId: number): Promise<TaskAgent.VirtualMachineGroup>;
    /**
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     * @param continuationToken -
     * @param name -
     * @param partialNameMatch -
     * @param tags -
     * @param top -
     */
    getVirtualMachines(project: string, environmentId: number, resourceId: number, continuationToken?: string, name?: string, partialNameMatch?: boolean, tags?: string[], top?: number): Promise<WebApi.PagedList<TaskAgent.VirtualMachine>>;
    /**
     * @param machines -
     * @param project - Project ID or project name
     * @param environmentId -
     * @param resourceId -
     */
    updateVirtualMachines(machines: TaskAgent.VirtualMachine[], project: string, environmentId: number, resourceId: number): Promise<TaskAgent.VirtualMachine[]>;
    /**
     * @param tenantId -
     * @param redirectUri -
     * @param promptOption -
     * @param completeCallbackPayload -
     * @param completeCallbackByAuthCode -
     */
    createAadOAuthRequest(tenantId: string, redirectUri: string, promptOption?: TaskAgent.AadLoginPromptOption, completeCallbackPayload?: string, completeCallbackByAuthCode?: boolean): Promise<string>;
    /**
     */
    getVstsAadTenantId(): Promise<string>;
    /**
     * GET the Yaml schema used for Yaml file validation.
     *
     * @param validateTaskNames - Whether the schema should validate that tasks are actually installed (useful for offline tools where you don't want validation).
     */
    getYamlSchema(validateTaskNames?: boolean): Promise<any>;
}
