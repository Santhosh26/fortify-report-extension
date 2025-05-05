import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Graph from "../Graph/Graph";
import * as Profile from "../Profile/Profile";
import * as WebApi from "../WebApi/WebApi";
export declare class GraphRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param subjectDescriptor -
     */
    deleteAvatar(subjectDescriptor: string): Promise<void>;
    /**
     * @param subjectDescriptor -
     * @param size -
     * @param format -
     */
    getAvatar(subjectDescriptor: string, size?: Profile.AvatarSize, format?: string): Promise<Profile.Avatar>;
    /**
     * @param avatar -
     * @param subjectDescriptor -
     */
    setAvatar(avatar: Profile.Avatar, subjectDescriptor: string): Promise<void>;
    /**
     */
    getCachePolicies(): Promise<Graph.GraphCachePolicies>;
    /**
     * Resolve a storage key to a descriptor
     *
     * @param storageKey - Storage key of the subject (user, group, scope, etc.) to resolve
     */
    getDescriptor(storageKey: string): Promise<Graph.GraphDescriptorResult>;
    /**
     * Acquires the full set of federated provider authentication data available for the given graph subject and provider name.
     *
     * @param subjectDescriptor - the descriptor of the graph subject that we should acquire data for
     * @param providerName - the name of the provider to acquire data for, e.g. "github.com"
     * @param versionHint - a version hint that can be used for optimistic cache concurrency and to support retries on access token failures; note that this is a hint only and does not guarantee a particular version on the response
     */
    getFederatedProviderData(subjectDescriptor: string, providerName: string, versionHint?: number): Promise<Graph.GraphFederatedProviderData>;
    /**
     * Create a new Azure DevOps group or materialize an existing AAD group.
     *
     * @param creationContext - The subset of the full graph group used to uniquely find the graph subject in an external provider.
     * @param scopeDescriptor - A descriptor referencing the scope (collection, project) in which the group should be created. If omitted, will be created in the scope of the enclosing account or organization. Valid only for VSTS groups.
     * @param groupDescriptors - A comma separated list of descriptors referencing groups you want the graph group to join
     */
    createGroup(creationContext: Graph.GraphGroupCreationContext, scopeDescriptor?: string, groupDescriptors?: string[]): Promise<Graph.GraphGroup>;
    /**
     * Removes an Azure DevOps group from all of its parent groups.
     *
     * @param groupDescriptor - The descriptor of the group to delete.
     */
    deleteGroup(groupDescriptor: string): Promise<void>;
    /**
     * Get a group by its descriptor.
     *
     * @param groupDescriptor - The descriptor of the desired graph group.
     */
    getGroup(groupDescriptor: string): Promise<Graph.GraphGroup>;
    /**
     * Update the properties of an Azure DevOps group.
     *
     * @param groupDescriptor - The descriptor of the group to modify.
     * @param patchDocument - The JSON+Patch document containing the fields to alter.
     */
    updateGroup(groupDescriptor: string, patchDocument: WebApi.JsonPatchDocument): Promise<Graph.GraphGroup>;
    /**
     * Identity Translation - Translate endpoint is supposed to be used by geneva action.
     *
     * @param masterId -
     * @param localId -
     */
    translate(masterId?: string, localId?: string): Promise<string>;
    /**
     * Gets all requested members in the current scope (usually organization or account).
     *
     * @param memberLookup -
     */
    lookupMembers(memberLookup: Graph.GraphSubjectLookup): Promise<{
        [key: string]: Graph.GraphMember;
    }>;
    /**
     * This endpoint returns a result for any member that has ever been valid in the system, even if the member has since been deleted or has had all their memberships deleted. The current validity of the member is indicated through its disabled property, which is omitted when false.
     *
     * @param memberDescriptor - The descriptor of the desired member.
     */
    getMemberByDescriptor(memberDescriptor: string): Promise<Graph.GraphMember>;
    /**
     * Create a new membership between a container and subject.
     *
     * @param subjectDescriptor - A descriptor to a group or user that can be the child subject in the relationship.
     * @param containerDescriptor - A descriptor to a group that can be the container in the relationship.
     */
    addMembership(subjectDescriptor: string, containerDescriptor: string): Promise<Graph.GraphMembership>;
    /**
     * Check to see if a membership relationship between a container and subject exists.
     *
     * @param subjectDescriptor - The group or user that is a child subject of the relationship.
     * @param containerDescriptor - The group that is the container in the relationship.
     */
    checkMembershipExistence(subjectDescriptor: string, containerDescriptor: string): Promise<boolean>;
    /**
     * Get a membership relationship between a container and subject.
     *
     * @param subjectDescriptor - A descriptor to the child subject in the relationship.
     * @param containerDescriptor - A descriptor to the container in the relationship.
     */
    getMembership(subjectDescriptor: string, containerDescriptor: string): Promise<Graph.GraphMembership>;
    /**
     * Deletes a membership between a container and subject.
     *
     * @param subjectDescriptor - A descriptor to a group or user that is the child subject in the relationship.
     * @param containerDescriptor - A descriptor to a group that is the container in the relationship.
     */
    removeMembership(subjectDescriptor: string, containerDescriptor: string): Promise<void>;
    /**
     * Get all the memberships where this descriptor is a member in the relationship.
     *
     * @param subjectDescriptor - Fetch all direct memberships of this descriptor.
     * @param direction - Defaults to Up.
     * @param depth - The maximum number of edges to traverse up or down the membership tree. Currently the only supported value is '1'.
     */
    listMemberships(subjectDescriptor: string, direction?: Graph.GraphTraversalDirection, depth?: number): Promise<Graph.GraphMembership[]>;
    /**
     * Check whether a subject is active or inactive.
     *
     * @param subjectDescriptor - Descriptor of the subject (user, group, scope, etc.) to check state of
     */
    getMembershipState(subjectDescriptor: string): Promise<Graph.GraphMembershipState>;
    /**
     * Traverse memberships of the given subject descriptors.
     *
     * @param membershipTraversalLookup - Fetch the descendants/ancestors of the list of descriptors depending on direction.
     * @param direction - The default value is Unknown.
     * @param depth - The default value is '1'.
     */
    lookupMembershipTraversals(membershipTraversalLookup: Graph.GraphSubjectLookup, direction?: Graph.GraphTraversalDirection, depth?: number): Promise<{
        [key: string]: Graph.GraphMembershipTraversal;
    }>;
    /**
     * Traverse memberships of the given subject descriptor.
     *
     * @param subjectDescriptor - Fetch the descendants/ancestors of this descriptor depending on direction.
     * @param direction - The default value is Unknown.
     * @param depth - The default value is '1'.
     */
    traverseMemberships(subjectDescriptor: string, direction?: Graph.GraphTraversalDirection, depth?: number): Promise<Graph.GraphMembershipTraversal>;
    /**
     * @param userDescriptor -
     */
    getProviderInfo(userDescriptor: string): Promise<Graph.GraphProviderInfo>;
    /**
     * @param jsondocument -
     */
    requestAccess(jsondocument: any): Promise<void>;
    /**
     * Batch-map a list of users to new users.
     *
     * @param mappings - A list of mappings.
     */
    resolve(mappings: Graph.IdentityMappings): Promise<Graph.ResolveDisconnectedUsersResponse>;
    /**
     * @param creationContext -
     * @param scopeDescriptor -
     */
    createScope(creationContext: Graph.GraphScopeCreationContext, scopeDescriptor?: string): Promise<Graph.GraphScope>;
    /**
     * @param scopeDescriptor -
     */
    deleteScope(scopeDescriptor: string): Promise<void>;
    /**
     * Get a scope identified by its descriptor
     *
     * @param scopeDescriptor - A descriptor that uniquely identifies a scope.
     */
    getScope(scopeDescriptor: string): Promise<Graph.GraphScope>;
    /**
     * @param scopeDescriptor -
     * @param patchDocument -
     */
    updateScope(scopeDescriptor: string, patchDocument: WebApi.JsonPatchDocument): Promise<void>;
    /**
     * Materialize an existing AAD service principal into the ADO account.
     *
     * @param creationContext - The subset of the full graph service principal used to uniquely find the graph subject in an external provider.
     * @param groupDescriptors - A comma separated list of descriptors of groups you want the graph service principal to join
     */
    createServicePrincipal(creationContext: Graph.GraphServicePrincipalCreationContext, groupDescriptors?: string[]): Promise<Graph.GraphServicePrincipal>;
    /**
     * Disables a service principal.
     *
     * @param servicePrincipalDescriptor - The descriptor of the service principal to delete.
     */
    deleteServicePrincipal(servicePrincipalDescriptor: string): Promise<void>;
    /**
     * Get a service principal by its descriptor.
     *
     * @param servicePrincipalDescriptor - The descriptor of the desired service principal.
     */
    getServicePrincipal(servicePrincipalDescriptor: string): Promise<Graph.GraphServicePrincipal>;
    /**
     * Map an existing service principal to a different service principal.
     *
     * @param updateContext - The subset of the full graph service principal used to uniquely find the graph subject in an external provider.
     * @param servicePrincipalDescriptor - The descriptor of the service principal to update
     */
    updateServicePrincipal(updateContext: Graph.GraphServicePrincipalUpdateContext, servicePrincipalDescriptor: string): Promise<Graph.GraphServicePrincipal>;
    /**
     * Resolve a descriptor to a storage key.
     *
     * @param subjectDescriptor -
     */
    getStorageKey(subjectDescriptor: string): Promise<Graph.GraphStorageKeyResult>;
    /**
     * Resolve descriptors to users, groups or scopes (Subjects) in a batch.
     *
     * @param subjectLookup - A list of descriptors that specifies a subset of subjects to retrieve. Each descriptor uniquely identifies the subject across all instance scopes, but only at a single point in time.
     */
    lookupSubjects(subjectLookup: Graph.GraphSubjectLookup): Promise<{
        [key: string]: Graph.GraphSubject;
    }>;
    /**
     * Search for Azure Devops users, or/and groups. Results will be returned in a batch with no more than 100 graph subjects.
     *
     * @param subjectQuery - The query that we'll be using to search includes the following: Query: the search term. The search will be prefix matching only. SubjectKind: "User" or "Group" can be specified, both or either ScopeDescriptor: Non-default scope can be specified, i.e. project scope descriptor
     */
    querySubjects(subjectQuery: Graph.GraphSubjectQuery): Promise<Graph.GraphSubject[]>;
    /**
     * Resolve a descriptor to a user, group or scope.
     *
     * @param subjectDescriptor - The descriptor of the desired subject.
     */
    getSubject(subjectDescriptor: string): Promise<Graph.GraphSubject>;
    /**
     * Materialize an existing AAD or MSA user into the ADO account.
     *
     * @param creationContext - The subset of the full graph user used to uniquely find the graph subject in an external provider.
     * @param groupDescriptors - A comma separated list of descriptors of groups you want the graph user to join
     */
    createUser(creationContext: Graph.GraphUserCreationContext, groupDescriptors?: string[]): Promise<Graph.GraphUser>;
    /**
     * Disables a user.
     *
     * @param userDescriptor - The descriptor of the user to delete.
     */
    deleteUser(userDescriptor: string): Promise<void>;
    /**
     * Get a user by its descriptor.
     *
     * @param userDescriptor - The descriptor of the desired user.
     */
    getUser(userDescriptor: string): Promise<Graph.GraphUser>;
    /**
     * Map an existing user to a different user.
     *
     * @param updateContext - The subset of the full graph user used to uniquely find the graph subject in an external provider.
     * @param userDescriptor - The descriptor of the user to update
     */
    updateUser(updateContext: Graph.GraphUserUpdateContext, userDescriptor: string): Promise<Graph.GraphUser>;
}
