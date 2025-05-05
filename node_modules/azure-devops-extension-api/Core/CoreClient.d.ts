import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Core from "../Core/Core";
import * as Operations from "../Operations/Operations";
import * as WebApi from "../WebApi/WebApi";
export declare class CoreRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Removes the avatar for the project.
     *
     * @param projectId - The ID or name of the project.
     */
    removeProjectAvatar(projectId: string): Promise<void>;
    /**
     * Sets the avatar for the project.
     *
     * @param avatarBlob - The avatar blob data object to upload.
     * @param projectId - The ID or name of the project.
     */
    setProjectAvatar(avatarBlob: Core.ProjectAvatar, projectId: string): Promise<void>;
    /**
     * Gets list of user readable teams in a project and teams user is member of (excluded from readable list).
     *
     * @param projectId - The name or ID (GUID) of the team project containing the teams to retrieve.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     * @param top - Maximum number of teams to return.
     * @param skip - Number of teams to skip.
     */
    getProjectTeamsByCategory(projectId: string, expandIdentity?: boolean, top?: number, skip?: number): Promise<Core.CategorizedWebApiTeams>;
    /**
     * @param connectedServiceCreationData -
     * @param projectId -
     */
    createConnectedService(connectedServiceCreationData: Core.WebApiConnectedServiceDetails, projectId: string): Promise<Core.WebApiConnectedService>;
    /**
     * @param projectId -
     * @param name -
     */
    getConnectedServiceDetails(projectId: string, name: string): Promise<Core.WebApiConnectedServiceDetails>;
    /**
     * @param projectId -
     * @param kind -
     */
    getConnectedServices(projectId: string, kind?: Core.ConnectedServiceKind): Promise<Core.WebApiConnectedService[]>;
    /**
     * @param mruData -
     * @param mruName -
     */
    createIdentityMru(mruData: Core.IdentityData, mruName: string): Promise<void>;
    /**
     * @param mruData -
     * @param mruName -
     */
    deleteIdentityMru(mruData: Core.IdentityData, mruName: string): Promise<void>;
    /**
     * @param mruName -
     */
    getIdentityMru(mruName: string): Promise<WebApi.IdentityRef[]>;
    /**
     * @param mruData -
     * @param mruName -
     */
    updateIdentityMru(mruData: Core.IdentityData, mruName: string): Promise<void>;
    /**
     * Get a list of members for a specific team.
     *
     * @param projectId - The name or ID (GUID) of the team project the team belongs to.
     * @param teamId - The name or ID (GUID) of the team .
     * @param top -
     * @param skip -
     */
    getTeamMembersWithExtendedProperties(projectId: string, teamId: string, top?: number, skip?: number): Promise<WebApi.TeamMember[]>;
    /**
     * Get a process by ID.
     *
     * @param processId - ID for a process.
     */
    getProcessById(processId: string): Promise<Core.Process>;
    /**
     * Get a list of processes.
     *
     */
    getProcesses(): Promise<Core.Process[]>;
    /**
     * Get project collection with the specified id or name.
     *
     * @param collectionId -
     */
    getProjectCollection(collectionId: string): Promise<Core.TeamProjectCollection>;
    /**
     * Get project collection references for this application.
     *
     * @param top -
     * @param skip -
     */
    getProjectCollections(top?: number, skip?: number): Promise<Core.TeamProjectCollectionReference[]>;
    /**
     * Gets the history of changes to the project.
     *
     * @param minRevision - The minimum revision number to return in the history.
     */
    getProjectHistoryEntries(minRevision?: number): Promise<Core.ProjectInfo[]>;
    /**
     * Get project with the specified id or name, optionally including capabilities.
     *
     * @param projectId -
     * @param includeCapabilities - Include capabilities (such as source control) in the team project result (default: false).
     * @param includeHistory - Search within renamed projects (that had such name in the past).
     */
    getProject(projectId: string, includeCapabilities?: boolean, includeHistory?: boolean): Promise<Core.TeamProject>;
    /**
     * Get all projects in the organization that the authenticated user has access to.
     *
     * @param stateFilter - Filter on team projects in a specific team project state (default: WellFormed).
     * @param top -
     * @param skip -
     * @param continuationToken - Pointer that shows how many projects already been fetched.
     * @param getDefaultTeamImageUrl -
     */
    getProjects(stateFilter?: any, top?: number, skip?: number, continuationToken?: number, getDefaultTeamImageUrl?: boolean): Promise<WebApi.PagedList<Core.TeamProjectReference>>;
    /**
     * Queues a project to be created. Use the [GetOperation](../../operations/operations/get) to periodically check for create project status.
     *
     * @param projectToCreate - The project to create.
     */
    queueCreateProject(projectToCreate: Core.TeamProject): Promise<Operations.OperationReference>;
    /**
     * Queues a project to be deleted. Use the [GetOperation](../../operations/operations/get) to periodically check for delete project status.
     *
     * @param projectId - The project id of the project to delete.
     */
    queueDeleteProject(projectId: string): Promise<Operations.OperationReference>;
    /**
     * Update an existing project's name, abbreviation, description, or restore a project.
     *
     * @param projectUpdate - The updates for the project. The state must be set to wellFormed to restore the project.
     * @param projectId - The project id of the project to update.
     */
    updateProject(projectUpdate: Core.TeamProject, projectId: string): Promise<Operations.OperationReference>;
    /**
     * Get a collection of team project properties for multiple projects.
     *
     * @param projectIds - A comma-delimited string of team project IDs
     * @param properties -
     */
    getProjectsProperties(projectIds: string[], properties?: string[]): Promise<Core.ProjectProperties[]>;
    /**
     * Get a collection of team project properties.
     *
     * @param projectId - The team project ID.
     * @param keys - A comma-delimited string of team project property names. Wildcard characters ("?" and "*") are supported. If no key is specified, all properties will be returned.
     */
    getProjectProperties(projectId: string, keys?: string[]): Promise<Core.ProjectProperty[]>;
    /**
     * Create, update, and delete team project properties.
     *
     * @param projectId - The team project ID.
     * @param patchDocument - A JSON Patch document that represents an array of property operations. See RFC 6902 for more details on JSON Patch. The accepted operation verbs are Add and Remove, where Add is used for both creating and updating properties. The path consists of a forward slash and a property name.
     */
    setProjectProperties(projectId: string, patchDocument: WebApi.JsonPatchDocument): Promise<void>;
    /**
     * @param proxy -
     */
    createOrUpdateProxy(proxy: Core.Proxy): Promise<Core.Proxy>;
    /**
     * @param proxyUrl -
     * @param site -
     */
    deleteProxy(proxyUrl: string, site?: string): Promise<void>;
    /**
     * @param proxyUrl -
     */
    getProxies(proxyUrl?: string): Promise<Core.Proxy[]>;
    /**
     * Get a list of all teams.
     *
     * @param mine - If true, then return all teams requesting user is member. Otherwise return all teams user has read access.
     * @param top - Maximum number of teams to return.
     * @param skip - Number of teams to skip.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    getAllTeams(mine?: boolean, top?: number, skip?: number, expandIdentity?: boolean): Promise<Core.WebApiTeam[]>;
    /**
     * Create a team in a team project.
     *
     * @param team - The team data used to create the team.
     * @param projectId - The name or ID (GUID) of the team project in which to create the team.
     */
    createTeam(team: Core.WebApiTeam, projectId: string): Promise<Core.WebApiTeam>;
    /**
     * Delete a team.
     *
     * @param projectId - The name or ID (GUID) of the team project containing the team to delete.
     * @param teamId - The name or ID of the team to delete.
     */
    deleteTeam(projectId: string, teamId: string): Promise<void>;
    /**
     * Get a specific team.
     *
     * @param projectId - The name or ID (GUID) of the team project containing the team.
     * @param teamId - The name or ID (GUID) of the team.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    getTeam(projectId: string, teamId: string, expandIdentity?: boolean): Promise<Core.WebApiTeam>;
    /**
     * Get a list of teams.
     *
     * @param projectId -
     * @param mine - If true return all the teams requesting user is member, otherwise return all the teams user has read access.
     * @param top - Maximum number of teams to return.
     * @param skip - Number of teams to skip.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    getTeams(projectId: string, mine?: boolean, top?: number, skip?: number, expandIdentity?: boolean): Promise<Core.WebApiTeam[]>;
    /**
     * Update a team's name and/or description.
     *
     * @param teamData -
     * @param projectId - The name or ID (GUID) of the team project containing the team to update.
     * @param teamId - The name of ID of the team to update.
     */
    updateTeam(teamData: Core.WebApiTeam, projectId: string, teamId: string): Promise<Core.WebApiTeam>;
}
