import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Build from "../Build/Build";
import * as WebApi from "../WebApi/WebApi";
export declare class BuildRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Associates an artifact with a build.
     *
     * @param artifact - The artifact.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    createArtifact(artifact: Build.BuildArtifact, project: string, buildId: number): Promise<Build.BuildArtifact>;
    /**
     * Gets a specific artifact for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     */
    getArtifact(project: string, buildId: number, artifactName: string): Promise<Build.BuildArtifact>;
    /**
     * Gets a specific artifact for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     */
    getArtifactContentZip(project: string, buildId: number, artifactName: string): Promise<ArrayBuffer>;
    /**
     * Gets all artifacts for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    getArtifacts(project: string, buildId: number): Promise<Build.BuildArtifact[]>;
    /**
     * Gets a file from the build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     * @param fileId - The primary key for the file.
     * @param fileName - The name that the file will be set to.
     */
    getFile(project: string, buildId: number, artifactName: string, fileId: string, fileName: string): Promise<ArrayBuffer>;
    /**
     * Gets the list of attachments of a specific type that are associated with a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type - The type of attachment.
     */
    getAttachments(project: string, buildId: number, type: string): Promise<Build.Attachment[]>;
    /**
     * Gets a specific attachment.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param timelineId - The ID of the timeline.
     * @param recordId - The ID of the timeline record.
     * @param type - The type of the attachment.
     * @param name - The name of the attachment.
     */
    getAttachment(project: string, buildId: number, timelineId: string, recordId: string, type: string, name: string): Promise<ArrayBuffer>;
    /**
     * @param resources -
     * @param project - Project ID or project name
     */
    authorizeProjectResources(resources: Build.DefinitionResourceReference[], project: string): Promise<Build.DefinitionResourceReference[]>;
    /**
     * @param project - Project ID or project name
     * @param type -
     * @param id -
     */
    getProjectResources(project: string, type?: string, id?: string): Promise<Build.DefinitionResourceReference[]>;
    /**
     * Gets a badge that indicates the status of the most recent build for a definition. Note that this API is deprecated. Prefer StatusBadgeController.GetStatusBadge.
     *
     * @param project - The project ID or name.
     * @param definitionId - The ID of the definition.
     * @param branchName - The name of the branch.
     */
    getBadge(project: string, definitionId: number, branchName?: string): Promise<string>;
    /**
     * Gets a list of branches for the given source code repository.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - The vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param branchName - If supplied, the name of the branch to check for specifically.
     */
    listBranches(project: string, providerName: string, serviceEndpointId?: string, repository?: string, branchName?: string): Promise<string[]>;
    /**
     * Gets a badge that indicates the status of the most recent build for the specified branch.
     *
     * @param project - Project ID or project name
     * @param repoType - The repository type.
     * @param repoId - The repository ID.
     * @param branchName - The branch name.
     */
    getBuildBadge(project: string, repoType: string, repoId?: string, branchName?: string): Promise<Build.BuildBadge>;
    /**
     * Gets a badge that indicates the status of the most recent build for the specified branch.
     *
     * @param project - Project ID or project name
     * @param repoType - The repository type.
     * @param repoId - The repository ID.
     * @param branchName - The branch name.
     */
    getBuildBadgeData(project: string, repoType: string, repoId?: string, branchName?: string): Promise<string>;
    /**
     * Gets all retention leases that apply to a specific build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    getRetentionLeasesForBuild(project: string, buildId: number): Promise<Build.RetentionLease[]>;
    /**
     * Deletes a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    deleteBuild(project: string, buildId: number): Promise<void>;
    /**
     * Gets a build
     *
     * @param project - Project ID or project name
     * @param buildId -
     * @param propertyFilters -
     */
    getBuild(project: string, buildId: number, propertyFilters?: string): Promise<Build.Build>;
    /**
     * Gets a list of builds.
     *
     * @param project - Project ID or project name
     * @param definitions - A comma-delimited list of definition IDs. If specified, filters to builds for these definitions.
     * @param queues - A comma-delimited list of queue IDs. If specified, filters to builds that ran against these queues.
     * @param buildNumber - If specified, filters to builds that match this build number. Append * to do a prefix search.
     * @param minTime - If specified, filters to builds that finished/started/queued after this date based on the queryOrder specified.
     * @param maxTime - If specified, filters to builds that finished/started/queued before this date based on the queryOrder specified.
     * @param requestedFor - If specified, filters to builds requested for the specified user.
     * @param reasonFilter - If specified, filters to builds that match this reason.
     * @param statusFilter - If specified, filters to builds that match this status.
     * @param resultFilter - If specified, filters to builds that match this result.
     * @param tagFilters - A comma-delimited list of tags. If specified, filters to builds that have the specified tags.
     * @param properties - A comma-delimited list of properties to retrieve.
     * @param top - The maximum number of builds to return.
     * @param continuationToken - A continuation token, returned by a previous call to this method, that can be used to return the next set of builds.
     * @param maxBuildsPerDefinition - The maximum number of builds to return per definition.
     * @param deletedFilter - Indicates whether to exclude, include, or only return deleted builds.
     * @param queryOrder - The order in which builds should be returned.
     * @param branchName - If specified, filters to builds that built branches that built this branch.
     * @param buildIds - A comma-delimited list that specifies the IDs of builds to retrieve.
     * @param repositoryId - If specified, filters to builds that built from this repository.
     * @param repositoryType - If specified, filters to builds that built from repositories of this type.
     */
    getBuilds(project: string, definitions?: number[], queues?: number[], buildNumber?: string, minTime?: Date, maxTime?: Date, requestedFor?: string, reasonFilter?: Build.BuildReason, statusFilter?: Build.BuildStatus, resultFilter?: Build.BuildResult, tagFilters?: string[], properties?: string[], top?: number, continuationToken?: string, maxBuildsPerDefinition?: number, deletedFilter?: Build.QueryDeletedOption, queryOrder?: Build.BuildQueryOrder, branchName?: string, buildIds?: number[], repositoryId?: string, repositoryType?: string): Promise<WebApi.PagedList<Build.Build>>;
    /**
     * Queues a build
     *
     * @param build -
     * @param project - Project ID or project name
     * @param ignoreWarnings -
     * @param checkInTicket -
     * @param sourceBuildId -
     * @param definitionId - Optional definition id to queue a build without a body. Ignored if there's a valid body
     */
    queueBuild(build: Build.Build, project: string, ignoreWarnings?: boolean, checkInTicket?: string, sourceBuildId?: number, definitionId?: number): Promise<Build.Build>;
    /**
     * Updates a build.
     *
     * @param build - The build.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param retry -
     */
    updateBuild(build: Build.Build, project: string, buildId: number, retry?: boolean): Promise<Build.Build>;
    /**
     * Updates multiple builds.
     *
     * @param builds - The builds to update.
     * @param project - Project ID or project name
     */
    updateBuilds(builds: Build.Build[], project: string): Promise<Build.Build[]>;
    /**
     * Gets the changes associated with a build
     *
     * @param project - Project ID or project name
     * @param buildId -
     * @param continuationToken -
     * @param top - The maximum number of changes to return
     * @param includeSourceChange -
     */
    getBuildChanges(project: string, buildId: number, continuationToken?: string, top?: number, includeSourceChange?: boolean): Promise<WebApi.PagedList<Build.Change>>;
    /**
     * Gets the changes made to the repository between two given builds.
     *
     * @param project - Project ID or project name
     * @param fromBuildId - The ID of the first build.
     * @param toBuildId - The ID of the last build.
     * @param top - The maximum number of changes to return.
     */
    getChangesBetweenBuilds(project: string, fromBuildId?: number, toBuildId?: number, top?: number): Promise<Build.Change[]>;
    /**
     * Gets a controller
     *
     * @param controllerId -
     */
    getBuildController(controllerId: number): Promise<Build.BuildController>;
    /**
     * Gets controller, optionally filtered by name
     *
     * @param name -
     */
    getBuildControllers(name?: string): Promise<Build.BuildController[]>;
    /**
     * Creates a new definition.
     *
     * @param definition - The definition.
     * @param project - Project ID or project name
     * @param definitionToCloneId -
     * @param definitionToCloneRevision -
     */
    createDefinition(definition: Build.BuildDefinition, project: string, definitionToCloneId?: number, definitionToCloneRevision?: number): Promise<Build.BuildDefinition>;
    /**
     * Deletes a definition and all associated builds.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    deleteDefinition(project: string, definitionId: number): Promise<void>;
    /**
     * Gets a definition, optionally at a specific revision.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The revision number to retrieve. If this is not specified, the latest version will be returned.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param propertyFilters - A comma-delimited list of properties to include in the results.
     * @param includeLatestBuilds -
     */
    getDefinition(project: string, definitionId: number, revision?: number, minMetricsTime?: Date, propertyFilters?: string[], includeLatestBuilds?: boolean): Promise<Build.BuildDefinition>;
    /**
     * Gets a list of definitions.
     *
     * @param project - Project ID or project name
     * @param name - If specified, filters to definitions whose names match this pattern.
     * @param repositoryId - A repository ID. If specified, filters to definitions that use this repository.
     * @param repositoryType - If specified, filters to definitions that have a repository of this type.
     * @param queryOrder - Indicates the order in which definitions should be returned.
     * @param top - The maximum number of definitions to return.
     * @param continuationToken - A continuation token, returned by a previous call to this method, that can be used to return the next set of definitions.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param definitionIds - A comma-delimited list that specifies the IDs of definitions to retrieve.
     * @param path - If specified, filters to definitions under this folder.
     * @param builtAfter - If specified, filters to definitions that have builds after this date.
     * @param notBuiltAfter - If specified, filters to definitions that do not have builds after this date.
     * @param includeAllProperties - Indicates whether the full definitions should be returned. By default, shallow representations of the definitions are returned.
     * @param includeLatestBuilds - Indicates whether to return the latest and latest completed builds for this definition.
     * @param taskIdFilter - If specified, filters to definitions that use the specified task.
     * @param processType - If specified, filters to definitions with the given process type.
     * @param yamlFilename - If specified, filters to YAML definitions that match the given filename. To use this filter includeAllProperties should be set to true
     */
    getDefinitions(project: string, name?: string, repositoryId?: string, repositoryType?: string, queryOrder?: Build.DefinitionQueryOrder, top?: number, continuationToken?: string, minMetricsTime?: Date, definitionIds?: number[], path?: string, builtAfter?: Date, notBuiltAfter?: Date, includeAllProperties?: boolean, includeLatestBuilds?: boolean, taskIdFilter?: string, processType?: number, yamlFilename?: string): Promise<WebApi.PagedList<Build.BuildDefinitionReference>>;
    /**
     * Restores a deleted definition
     *
     * @param project - Project ID or project name
     * @param definitionId - The identifier of the definition to restore.
     * @param deleted - When false, restores a deleted definition.
     */
    restoreDefinition(project: string, definitionId: number, deleted: boolean): Promise<Build.BuildDefinition>;
    /**
     * Updates an existing build definition.  In order for this operation to succeed, the value of the "Revision" property of the request body must match the existing build definition's. It is recommended that you obtain the existing build definition by using GET, modify the build definition as necessary, and then submit the modified definition with PUT.
     *
     * @param definition - The new version of the definition. Its "Revision" property must match the existing definition for the update to be accepted.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param secretsSourceDefinitionId -
     * @param secretsSourceDefinitionRevision -
     */
    updateDefinition(definition: Build.BuildDefinition, project: string, definitionId: number, secretsSourceDefinitionId?: number, secretsSourceDefinitionRevision?: number): Promise<Build.BuildDefinition>;
    /**
     * Gets the contents of a file in the given source code repository.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param commitOrBranch - The identifier of the commit or branch from which a file's contents are retrieved.
     * @param path - The path to the file to retrieve, relative to the root of the repository.
     */
    getFileContents(project: string, providerName: string, serviceEndpointId?: string, repository?: string, commitOrBranch?: string, path?: string): Promise<string>;
    /**
     * Creates a new folder.
     *
     * @param folder - The folder.
     * @param project - Project ID or project name
     * @param path - The full path of the folder.
     */
    createFolder(folder: Build.Folder, project: string, path: string): Promise<Build.Folder>;
    /**
     * Deletes a definition folder. Definitions and their corresponding builds will also be deleted.
     *
     * @param project - Project ID or project name
     * @param path - The full path to the folder.
     */
    deleteFolder(project: string, path: string): Promise<void>;
    /**
     * Gets a list of build definition folders.
     *
     * @param project - Project ID or project name
     * @param path - The path to start with.
     * @param queryOrder - The order in which folders should be returned.
     */
    getFolders(project: string, path?: string, queryOrder?: Build.FolderQueryOrder): Promise<Build.Folder[]>;
    /**
     * Updates an existing folder at given  existing path
     *
     * @param folder - The new version of the folder.
     * @param project - Project ID or project name
     * @param path - The full path to the folder.
     */
    updateFolder(folder: Build.Folder, project: string, path: string): Promise<Build.Folder>;
    /**
     * Gets pipeline general settings.
     *
     * @param project - Project ID or project name
     */
    getBuildGeneralSettings(project: string): Promise<Build.PipelineGeneralSettings>;
    /**
     * Updates pipeline general settings.
     *
     * @param newSettings -
     * @param project - Project ID or project name
     */
    updateBuildGeneralSettings(newSettings: Build.PipelineGeneralSettings, project: string): Promise<Build.PipelineGeneralSettings>;
    /**
     * Returns the retention history for the project collection. This includes pipelines that have custom retention rules that may prevent the retention job from cleaning them up, runs per pipeline with retention type, files associated with pipelines owned by the collection with retention type, and the number of files per pipeline.
     *
     * @param daysToLookback -
     */
    getRetentionHistory(daysToLookback?: number): Promise<Build.BuildRetentionHistory>;
    /**
     * Gets the latest build for a definition, optionally scoped to a specific branch.
     *
     * @param project - Project ID or project name
     * @param definition - definition name with optional leading folder path, or the definition id
     * @param branchName - optional parameter that indicates the specific branch to use. If not specified, the default branch is used.
     */
    getLatestBuild(project: string, definition: string, branchName?: string): Promise<Build.Build>;
    /**
     * Adds new leases for pipeline runs.
     *
     * @param newLeases -
     * @param project - Project ID or project name
     */
    addRetentionLeases(newLeases: Build.NewRetentionLease[], project: string): Promise<Build.RetentionLease[]>;
    /**
     * Removes specific retention leases.
     *
     * @param project - Project ID or project name
     * @param ids -
     */
    deleteRetentionLeasesById(project: string, ids: number[]): Promise<void>;
    /**
     * Returns the details of the retention lease given a lease id.
     *
     * @param project - Project ID or project name
     * @param leaseId -
     */
    getRetentionLease(project: string, leaseId: number): Promise<Build.RetentionLease>;
    /**
     * Returns any leases matching the specified MinimalRetentionLeases
     *
     * @param project - Project ID or project name
     * @param leasesToFetch - List of JSON-serialized MinimalRetentionLeases separated by '|'
     */
    getRetentionLeasesByMinimalRetentionLeases(project: string, leasesToFetch: Build.MinimalRetentionLease[]): Promise<Build.RetentionLease[]>;
    /**
     * Returns any leases owned by the specified entity, optionally scoped to a single pipeline definition and run.
     *
     * @param project - Project ID or project name
     * @param ownerId -
     * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
     * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
     */
    getRetentionLeasesByOwnerId(project: string, ownerId?: string, definitionId?: number, runId?: number): Promise<Build.RetentionLease[]>;
    /**
     * Returns any leases owned by the specified user, optionally scoped to a single pipeline definition and run.
     *
     * @param project - Project ID or project name
     * @param userOwnerId - The user id to search for.
     * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
     * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
     */
    getRetentionLeasesByUserId(project: string, userOwnerId: string, definitionId?: number, runId?: number): Promise<Build.RetentionLease[]>;
    /**
     * Updates the duration or pipeline protection status of a retention lease.
     *
     * @param leaseUpdate - The new data for the retention lease.
     * @param project - Project ID or project name
     * @param leaseId - The ID of the lease to update.
     */
    updateRetentionLease(leaseUpdate: Build.RetentionLeaseUpdate, project: string, leaseId: number): Promise<Build.RetentionLease>;
    /**
     * Gets an individual log file for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    getBuildLog(project: string, buildId: number, logId: number, startLine?: number, endLine?: number): Promise<string>;
    /**
     * Gets an individual log file for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    getBuildLogLines(project: string, buildId: number, logId: number, startLine?: number, endLine?: number): Promise<string[]>;
    /**
     * Gets the logs for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    getBuildLogs(project: string, buildId: number): Promise<Build.BuildLog[]>;
    /**
     * Gets the logs for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    getBuildLogsZip(project: string, buildId: number): Promise<ArrayBuffer>;
    /**
     * Gets an individual log file for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    getBuildLogZip(project: string, buildId: number, logId: number, startLine?: number, endLine?: number): Promise<ArrayBuffer>;
    /**
     * Gets build metrics for a project.
     *
     * @param project - Project ID or project name
     * @param metricAggregationType - The aggregation type to use (hourly, daily).
     * @param minMetricsTime - The date from which to calculate metrics.
     */
    getProjectMetrics(project: string, metricAggregationType?: string, minMetricsTime?: Date): Promise<Build.BuildMetric[]>;
    /**
     * Gets build metrics for a definition.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param minMetricsTime - The date from which to calculate metrics.
     */
    getDefinitionMetrics(project: string, definitionId: number, minMetricsTime?: Date): Promise<Build.BuildMetric[]>;
    /**
     * Gets all build definition options supported by the system.
     *
     * @param project - Project ID or project name
     */
    getBuildOptionDefinitions(project?: string): Promise<Build.BuildOptionDefinition[]>;
    /**
     * Gets the contents of a directory in the given source code repository.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param commitOrBranch - The identifier of the commit or branch from which a file's contents are retrieved.
     * @param path - The path contents to list, relative to the root of the repository.
     */
    getPathContents(project: string, providerName: string, serviceEndpointId?: string, repository?: string, commitOrBranch?: string, path?: string): Promise<Build.SourceRepositoryItem[]>;
    /**
     * Gets properties for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
     */
    getBuildProperties(project: string, buildId: number, filter?: string[]): Promise<any>;
    /**
     * Updates properties for a build.
     *
     * @param document - A json-patch document describing the properties to update.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    updateBuildProperties(document: WebApi.JsonPatchDocument, project: string, buildId: number): Promise<any>;
    /**
     * Gets properties for a definition.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
     */
    getDefinitionProperties(project: string, definitionId: number, filter?: string[]): Promise<any>;
    /**
     * Updates properties for a definition.
     *
     * @param document - A json-patch document describing the properties to update.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    updateDefinitionProperties(document: WebApi.JsonPatchDocument, project: string, definitionId: number): Promise<any>;
    /**
     * Gets a pull request object from source provider.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param pullRequestId - Vendor-specific id of the pull request.
     * @param repositoryId - Vendor-specific identifier or the name of the repository that contains the pull request.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     */
    getPullRequest(project: string, providerName: string, pullRequestId: string, repositoryId?: string, serviceEndpointId?: string): Promise<Build.PullRequest>;
    /**
     * Gets a build report.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type -
     */
    getBuildReport(project: string, buildId: number, type?: string): Promise<Build.BuildReportMetadata>;
    /**
     * Gets a build report.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type -
     */
    getBuildReportHtmlContent(project: string, buildId: number, type?: string): Promise<any>;
    /**
     * Gets a list of source code repositories.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of a single repository to get.
     * @param resultSet - 'top' for the repositories most relevant for the endpoint. If not set, all repositories are returned. Ignored if 'repository' is set.
     * @param pageResults - If set to true, this will limit the set of results and will return a continuation token to continue the query.
     * @param continuationToken - When paging results, this is a continuation token, returned by a previous call to this method, that can be used to return the next set of repositories.
     */
    listRepositories(project: string, providerName: string, serviceEndpointId?: string, repository?: string, resultSet?: Build.ResultSet, pageResults?: boolean, continuationToken?: string): Promise<Build.SourceRepositories>;
    /**
     * @param resources -
     * @param project - Project ID or project name
     * @param definitionId -
     */
    authorizeDefinitionResources(resources: Build.DefinitionResourceReference[], project: string, definitionId: number): Promise<Build.DefinitionResourceReference[]>;
    /**
     * @param project - Project ID or project name
     * @param definitionId -
     */
    getDefinitionResources(project: string, definitionId: number): Promise<Build.DefinitionResourceReference[]>;
    /**
     * Gets information about build resources in the system.
     *
     */
    getResourceUsage(): Promise<Build.BuildResourceUsage>;
    /**
     * Gets the project's retention settings.
     *
     * @param project - Project ID or project name
     */
    getRetentionSettings(project: string): Promise<Build.ProjectRetentionSetting>;
    /**
     * Updates the project's retention settings.
     *
     * @param updateModel -
     * @param project - Project ID or project name
     */
    updateRetentionSettings(updateModel: Build.UpdateProjectRetentionSettingModel, project: string): Promise<Build.ProjectRetentionSetting>;
    /**
     * Gets all revisions of a definition.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    getDefinitionRevisions(project: string, definitionId: number): Promise<Build.BuildDefinitionRevision[]>;
    /**
     * Gets the build settings.
     *
     * @param project - Project ID or project name
     */
    getBuildSettings(project?: string): Promise<Build.BuildSettings>;
    /**
     * Updates the build settings.
     *
     * @param settings - The new settings.
     * @param project - Project ID or project name
     */
    updateBuildSettings(settings: Build.BuildSettings, project?: string): Promise<Build.BuildSettings>;
    /**
     * Get a list of source providers and their capabilities.
     *
     * @param project - Project ID or project name
     */
    listSourceProviders(project: string): Promise<Build.SourceProviderAttributes[]>;
    /**
     * Update a build stage
     *
     * @param updateParameters -
     * @param buildId -
     * @param stageRefName -
     * @param project - Project ID or project name
     */
    updateStage(updateParameters: Build.UpdateStageParameters, buildId: number, stageRefName: string, project?: string): Promise<void>;
    /**
     * \<p\>Gets the build status for a definition, optionally scoped to a specific branch, stage, job, and configuration.\</p\> \<p\>If there are more than one, then it is required to pass in a stageName value when specifying a jobName, and the same rule then applies for both if passing a configuration parameter.\</p\>
     *
     * @param project - Project ID or project name
     * @param definition - Either the definition name with optional leading folder path, or the definition id.
     * @param branchName - Only consider the most recent build for this branch. If not specified, the default branch is used.
     * @param stageName - Use this stage within the pipeline to render the status.
     * @param jobName - Use this job within a stage of the pipeline to render the status.
     * @param configuration - Use this job configuration to render the status
     * @param label - Replaces the default text on the left side of the badge.
     */
    getStatusBadge(project: string, definition: string, branchName?: string, stageName?: string, jobName?: string, configuration?: string, label?: string): Promise<string>;
    /**
     * Adds a tag to a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param tag - The tag to add.
     */
    addBuildTag(project: string, buildId: number, tag: string): Promise<string[]>;
    /**
     * Adds tags to a build.
     *
     * @param tags - The tags to add. Request body is composed directly from listed tags.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    addBuildTags(tags: string[], project: string, buildId: number): Promise<string[]>;
    /**
     * Removes a tag from a build. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param tag - The tag to remove.
     */
    deleteBuildTag(project: string, buildId: number, tag: string): Promise<string[]>;
    /**
     * Gets the tags for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    getBuildTags(project: string, buildId: number): Promise<string[]>;
    /**
     * Adds/Removes tags from a build.
     *
     * @param updateParameters - The tags to add/remove.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    updateBuildTags(updateParameters: Build.UpdateTagParameters, project: string, buildId: number): Promise<string[]>;
    /**
     * Adds a tag to a definition
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param tag - The tag to add.
     */
    addDefinitionTag(project: string, definitionId: number, tag: string): Promise<string[]>;
    /**
     * Adds multiple tags to a definition.
     *
     * @param tags - The tags to add.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    addDefinitionTags(tags: string[], project: string, definitionId: number): Promise<string[]>;
    /**
     * Removes a tag from a definition. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param tag - The tag to remove.
     */
    deleteDefinitionTag(project: string, definitionId: number, tag: string): Promise<string[]>;
    /**
     * Gets the tags for a definition.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The definition revision number. If not specified, uses the latest revision of the definition.
     */
    getDefinitionTags(project: string, definitionId: number, revision?: number): Promise<string[]>;
    /**
     * Adds/Removes tags from a definition.
     *
     * @param updateParameters - The tags to add/remove.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    updateDefinitionTags(updateParameters: Build.UpdateTagParameters, project: string, definitionId: number): Promise<string[]>;
    /**
     * Removes a tag from builds, definitions, and from the tag store
     *
     * @param project - Project ID or project name
     * @param tag - The tag to remove.
     */
    deleteTag(project: string, tag: string): Promise<string[]>;
    /**
     * Gets a list of all build tags in the project.
     *
     * @param project - Project ID or project name
     */
    getTags(project: string): Promise<string[]>;
    /**
     * Deletes a build definition template.
     *
     * @param project - Project ID or project name
     * @param templateId - The ID of the template.
     */
    deleteTemplate(project: string, templateId: string): Promise<void>;
    /**
     * Gets a specific build definition template.
     *
     * @param project - Project ID or project name
     * @param templateId - The ID of the requested template.
     */
    getTemplate(project: string, templateId: string): Promise<Build.BuildDefinitionTemplate>;
    /**
     * Gets all definition templates.
     *
     * @param project - Project ID or project name
     */
    getTemplates(project: string): Promise<Build.BuildDefinitionTemplate[]>;
    /**
     * Updates an existing build definition template.
     *
     * @param template - The new version of the template.
     * @param project - Project ID or project name
     * @param templateId - The ID of the template.
     */
    saveTemplate(template: Build.BuildDefinitionTemplate, project: string, templateId: string): Promise<Build.BuildDefinitionTemplate>;
    /**
     * Gets details for a build
     *
     * @param project - Project ID or project name
     * @param buildId -
     * @param timelineId -
     * @param changeId -
     * @param planId -
     */
    getBuildTimeline(project: string, buildId: number, timelineId?: string, changeId?: number, planId?: string): Promise<Build.Timeline>;
    /**
     * Recreates the webhooks for the specified triggers in the given source code repository.
     *
     * @param triggerTypes - The types of triggers to restore webhooks for.
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
     */
    restoreWebhooks(triggerTypes: Build.DefinitionTriggerType[], project: string, providerName: string, serviceEndpointId?: string, repository?: string): Promise<void>;
    /**
     * Gets a list of webhooks installed in the given source code repository.
     *
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
     */
    listWebhooks(project: string, providerName: string, serviceEndpointId?: string, repository?: string): Promise<Build.RepositoryWebhook[]>;
    /**
     * Gets the work items associated with a build. Only work items in the same project are returned.
     *
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param top - The maximum number of work items to return.
     */
    getBuildWorkItemsRefs(project: string, buildId: number, top?: number): Promise<WebApi.ResourceRef[]>;
    /**
     * Gets the work items associated with a build, filtered to specific commits.
     *
     * @param commitIds - A comma-delimited list of commit IDs.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param top - The maximum number of work items to return, or the number of commits to consider if no commit IDs are specified.
     */
    getBuildWorkItemsRefsFromCommits(commitIds: string[], project: string, buildId: number, top?: number): Promise<WebApi.ResourceRef[]>;
    /**
     * Gets all the work items between two builds.
     *
     * @param project - Project ID or project name
     * @param fromBuildId - The ID of the first build.
     * @param toBuildId - The ID of the last build.
     * @param top - The maximum number of work items to return.
     */
    getWorkItemsBetweenBuilds(project: string, fromBuildId: number, toBuildId: number, top?: number): Promise<WebApi.ResourceRef[]>;
    /**
     * Converts a definition to YAML, optionally at a specific revision.
     *
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The revision number to retrieve. If this is not specified, the latest version will be returned.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param propertyFilters - A comma-delimited list of properties to include in the results.
     * @param includeLatestBuilds -
     */
    getDefinitionYaml(project: string, definitionId: number, revision?: number, minMetricsTime?: Date, propertyFilters?: string[], includeLatestBuilds?: boolean): Promise<Build.YamlBuild>;
}
