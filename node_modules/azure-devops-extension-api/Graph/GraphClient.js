/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../Common/RestClientBase"], function (require, exports, RestClientBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphRestClient = /** @class */ (function (_super) {
        __extends(GraphRestClient, _super);
        function GraphRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * @param subjectDescriptor -
         */
        GraphRestClient.prototype.deleteAvatar = function (subjectDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/Subjects/{subjectDescriptor}/Avatars",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * @param subjectDescriptor -
         * @param size -
         * @param format -
         */
        GraphRestClient.prototype.getAvatar = function (subjectDescriptor, size, format) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        size: size,
                        format: format
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Subjects/{subjectDescriptor}/Avatars",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param avatar -
         * @param subjectDescriptor -
         */
        GraphRestClient.prototype.setAvatar = function (avatar, subjectDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/Graph/Subjects/{subjectDescriptor}/Avatars",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            },
                            body: avatar
                        })];
                });
            });
        };
        /**
         */
        GraphRestClient.prototype.getCachePolicies = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/CachePolicies"
                        })];
                });
            });
        };
        /**
         * Resolve a storage key to a descriptor
         *
         * @param storageKey - Storage key of the subject (user, group, scope, etc.) to resolve
         */
        GraphRestClient.prototype.getDescriptor = function (storageKey) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Descriptors/{storageKey}",
                            routeValues: {
                                storageKey: storageKey
                            }
                        })];
                });
            });
        };
        /**
         * Acquires the full set of federated provider authentication data available for the given graph subject and provider name.
         *
         * @param subjectDescriptor - the descriptor of the graph subject that we should acquire data for
         * @param providerName - the name of the provider to acquire data for, e.g. "github.com"
         * @param versionHint - a version hint that can be used for optimistic cache concurrency and to support retries on access token failures; note that this is a hint only and does not guarantee a particular version on the response
         */
        GraphRestClient.prototype.getFederatedProviderData = function (subjectDescriptor, providerName, versionHint) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        providerName: providerName,
                        versionHint: versionHint
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/FederatedProviderData/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Create a new Azure DevOps group or materialize an existing AAD group.
         *
         * @param creationContext - The subset of the full graph group used to uniquely find the graph subject in an external provider.
         * @param scopeDescriptor - A descriptor referencing the scope (collection, project) in which the group should be created. If omitted, will be created in the scope of the enclosing account or organization. Valid only for VSTS groups.
         * @param groupDescriptors - A comma separated list of descriptors referencing groups you want the graph group to join
         */
        GraphRestClient.prototype.createGroup = function (creationContext, scopeDescriptor, groupDescriptors) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scopeDescriptor: scopeDescriptor,
                        groupDescriptors: groupDescriptors && groupDescriptors.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/Groups/{groupDescriptor}",
                            queryParams: queryValues,
                            body: creationContext
                        })];
                });
            });
        };
        /**
         * Removes an Azure DevOps group from all of its parent groups.
         *
         * @param groupDescriptor - The descriptor of the group to delete.
         */
        GraphRestClient.prototype.deleteGroup = function (groupDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/Groups/{groupDescriptor}",
                            routeValues: {
                                groupDescriptor: groupDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Get a group by its descriptor.
         *
         * @param groupDescriptor - The descriptor of the desired graph group.
         */
        GraphRestClient.prototype.getGroup = function (groupDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Groups/{groupDescriptor}",
                            routeValues: {
                                groupDescriptor: groupDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Update the properties of an Azure DevOps group.
         *
         * @param groupDescriptor - The descriptor of the group to modify.
         * @param patchDocument - The JSON+Patch document containing the fields to alter.
         */
        GraphRestClient.prototype.updateGroup = function (groupDescriptor, patchDocument) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/Graph/Groups/{groupDescriptor}",
                            routeValues: {
                                groupDescriptor: groupDescriptor
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            body: patchDocument
                        })];
                });
            });
        };
        /**
         * Identity Translation - Translate endpoint is supposed to be used by geneva action.
         *
         * @param masterId -
         * @param localId -
         */
        GraphRestClient.prototype.translate = function (masterId, localId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        masterId: masterId,
                        localId: localId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/IdentityTranslation",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets all requested members in the current scope (usually organization or account).
         *
         * @param memberLookup -
         */
        GraphRestClient.prototype.lookupMembers = function (memberLookup) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/MemberLookup",
                            body: memberLookup
                        })];
                });
            });
        };
        /**
         * This endpoint returns a result for any member that has ever been valid in the system, even if the member has since been deleted or has had all their memberships deleted. The current validity of the member is indicated through its disabled property, which is omitted when false.
         *
         * @param memberDescriptor - The descriptor of the desired member.
         */
        GraphRestClient.prototype.getMemberByDescriptor = function (memberDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/Graph/Members/{memberDescriptor}",
                            routeValues: {
                                memberDescriptor: memberDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Create a new membership between a container and subject.
         *
         * @param subjectDescriptor - A descriptor to a group or user that can be the child subject in the relationship.
         * @param containerDescriptor - A descriptor to a group that can be the container in the relationship.
         */
        GraphRestClient.prototype.addMembership = function (subjectDescriptor, containerDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/Graph/Memberships/{subjectDescriptor}/{containerDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor,
                                containerDescriptor: containerDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Check to see if a membership relationship between a container and subject exists.
         *
         * @param subjectDescriptor - The group or user that is a child subject of the relationship.
         * @param containerDescriptor - The group that is the container in the relationship.
         */
        GraphRestClient.prototype.checkMembershipExistence = function (subjectDescriptor, containerDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "HEAD",
                            routeTemplate: "_apis/Graph/Memberships/{subjectDescriptor}/{containerDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor,
                                containerDescriptor: containerDescriptor
                            },
                            returnRawResponse: true
                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, true];
                            });
                        }); }).catch(function (error) {
                            if (error.status === 404) {
                                return false;
                            }
                            throw error;
                        })];
                });
            });
        };
        /**
         * Get a membership relationship between a container and subject.
         *
         * @param subjectDescriptor - A descriptor to the child subject in the relationship.
         * @param containerDescriptor - A descriptor to the container in the relationship.
         */
        GraphRestClient.prototype.getMembership = function (subjectDescriptor, containerDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Memberships/{subjectDescriptor}/{containerDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor,
                                containerDescriptor: containerDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Deletes a membership between a container and subject.
         *
         * @param subjectDescriptor - A descriptor to a group or user that is the child subject in the relationship.
         * @param containerDescriptor - A descriptor to a group that is the container in the relationship.
         */
        GraphRestClient.prototype.removeMembership = function (subjectDescriptor, containerDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/Memberships/{subjectDescriptor}/{containerDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor,
                                containerDescriptor: containerDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Get all the memberships where this descriptor is a member in the relationship.
         *
         * @param subjectDescriptor - Fetch all direct memberships of this descriptor.
         * @param direction - Defaults to Up.
         * @param depth - The maximum number of edges to traverse up or down the membership tree. Currently the only supported value is '1'.
         */
        GraphRestClient.prototype.listMemberships = function (subjectDescriptor, direction, depth) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        direction: direction,
                        depth: depth
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Memberships/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Check whether a subject is active or inactive.
         *
         * @param subjectDescriptor - Descriptor of the subject (user, group, scope, etc.) to check state of
         */
        GraphRestClient.prototype.getMembershipState = function (subjectDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/MembershipStates/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Traverse memberships of the given subject descriptors.
         *
         * @param membershipTraversalLookup - Fetch the descendants/ancestors of the list of descriptors depending on direction.
         * @param direction - The default value is Unknown.
         * @param depth - The default value is '1'.
         */
        GraphRestClient.prototype.lookupMembershipTraversals = function (membershipTraversalLookup, direction, depth) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        direction: direction,
                        depth: depth
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/MembershipTraversals/{subjectDescriptor}",
                            queryParams: queryValues,
                            body: membershipTraversalLookup
                        })];
                });
            });
        };
        /**
         * Traverse memberships of the given subject descriptor.
         *
         * @param subjectDescriptor - Fetch the descendants/ancestors of this descriptor depending on direction.
         * @param direction - The default value is Unknown.
         * @param depth - The default value is '1'.
         */
        GraphRestClient.prototype.traverseMemberships = function (subjectDescriptor, direction, depth) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        direction: direction,
                        depth: depth
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/MembershipTraversals/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param userDescriptor -
         */
        GraphRestClient.prototype.getProviderInfo = function (userDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Users/{userDescriptor}/ProviderInfo",
                            routeValues: {
                                userDescriptor: userDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * @param jsondocument -
         */
        GraphRestClient.prototype.requestAccess = function (jsondocument) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/RequestAccess",
                            body: jsondocument
                        })];
                });
            });
        };
        /**
         * Batch-map a list of users to new users.
         *
         * @param mappings - A list of mappings.
         */
        GraphRestClient.prototype.resolve = function (mappings) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/ResolveDisconnectedUsers",
                            body: mappings
                        })];
                });
            });
        };
        /**
         * @param creationContext -
         * @param scopeDescriptor -
         */
        GraphRestClient.prototype.createScope = function (creationContext, scopeDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/Scopes/{scopeDescriptor}",
                            routeValues: {
                                scopeDescriptor: scopeDescriptor
                            },
                            body: creationContext
                        })];
                });
            });
        };
        /**
         * @param scopeDescriptor -
         */
        GraphRestClient.prototype.deleteScope = function (scopeDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/Scopes/{scopeDescriptor}",
                            routeValues: {
                                scopeDescriptor: scopeDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Get a scope identified by its descriptor
         *
         * @param scopeDescriptor - A descriptor that uniquely identifies a scope.
         */
        GraphRestClient.prototype.getScope = function (scopeDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Scopes/{scopeDescriptor}",
                            routeValues: {
                                scopeDescriptor: scopeDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * @param scopeDescriptor -
         * @param patchDocument -
         */
        GraphRestClient.prototype.updateScope = function (scopeDescriptor, patchDocument) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/Graph/Scopes/{scopeDescriptor}",
                            routeValues: {
                                scopeDescriptor: scopeDescriptor
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            body: patchDocument
                        })];
                });
            });
        };
        /**
         * Materialize an existing AAD service principal into the ADO account.
         *
         * @param creationContext - The subset of the full graph service principal used to uniquely find the graph subject in an external provider.
         * @param groupDescriptors - A comma separated list of descriptors of groups you want the graph service principal to join
         */
        GraphRestClient.prototype.createServicePrincipal = function (creationContext, groupDescriptors) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        groupDescriptors: groupDescriptors && groupDescriptors.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/ServicePrincipals/{servicePrincipalDescriptor}",
                            queryParams: queryValues,
                            body: creationContext
                        })];
                });
            });
        };
        /**
         * Disables a service principal.
         *
         * @param servicePrincipalDescriptor - The descriptor of the service principal to delete.
         */
        GraphRestClient.prototype.deleteServicePrincipal = function (servicePrincipalDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/ServicePrincipals/{servicePrincipalDescriptor}",
                            routeValues: {
                                servicePrincipalDescriptor: servicePrincipalDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Get a service principal by its descriptor.
         *
         * @param servicePrincipalDescriptor - The descriptor of the desired service principal.
         */
        GraphRestClient.prototype.getServicePrincipal = function (servicePrincipalDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/ServicePrincipals/{servicePrincipalDescriptor}",
                            routeValues: {
                                servicePrincipalDescriptor: servicePrincipalDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Map an existing service principal to a different service principal.
         *
         * @param updateContext - The subset of the full graph service principal used to uniquely find the graph subject in an external provider.
         * @param servicePrincipalDescriptor - The descriptor of the service principal to update
         */
        GraphRestClient.prototype.updateServicePrincipal = function (updateContext, servicePrincipalDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/Graph/ServicePrincipals/{servicePrincipalDescriptor}",
                            routeValues: {
                                servicePrincipalDescriptor: servicePrincipalDescriptor
                            },
                            body: updateContext
                        })];
                });
            });
        };
        /**
         * Resolve a descriptor to a storage key.
         *
         * @param subjectDescriptor -
         */
        GraphRestClient.prototype.getStorageKey = function (subjectDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/StorageKeys/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Resolve descriptors to users, groups or scopes (Subjects) in a batch.
         *
         * @param subjectLookup - A list of descriptors that specifies a subset of subjects to retrieve. Each descriptor uniquely identifies the subject across all instance scopes, but only at a single point in time.
         */
        GraphRestClient.prototype.lookupSubjects = function (subjectLookup) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/SubjectLookup",
                            body: subjectLookup
                        })];
                });
            });
        };
        /**
         * Search for Azure Devops users, or/and groups. Results will be returned in a batch with no more than 100 graph subjects.
         *
         * @param subjectQuery - The query that we'll be using to search includes the following: Query: the search term. The search will be prefix matching only. SubjectKind: "User" or "Group" can be specified, both or either ScopeDescriptor: Non-default scope can be specified, i.e. project scope descriptor
         */
        GraphRestClient.prototype.querySubjects = function (subjectQuery) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/SubjectQuery",
                            body: subjectQuery
                        })];
                });
            });
        };
        /**
         * Resolve a descriptor to a user, group or scope.
         *
         * @param subjectDescriptor - The descriptor of the desired subject.
         */
        GraphRestClient.prototype.getSubject = function (subjectDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Subjects/{subjectDescriptor}",
                            routeValues: {
                                subjectDescriptor: subjectDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Materialize an existing AAD or MSA user into the ADO account.
         *
         * @param creationContext - The subset of the full graph user used to uniquely find the graph subject in an external provider.
         * @param groupDescriptors - A comma separated list of descriptors of groups you want the graph user to join
         */
        GraphRestClient.prototype.createUser = function (creationContext, groupDescriptors) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        groupDescriptors: groupDescriptors && groupDescriptors.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Graph/Users/{userDescriptor}",
                            queryParams: queryValues,
                            body: creationContext
                        })];
                });
            });
        };
        /**
         * Disables a user.
         *
         * @param userDescriptor - The descriptor of the user to delete.
         */
        GraphRestClient.prototype.deleteUser = function (userDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Graph/Users/{userDescriptor}",
                            routeValues: {
                                userDescriptor: userDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Get a user by its descriptor.
         *
         * @param userDescriptor - The descriptor of the desired user.
         */
        GraphRestClient.prototype.getUser = function (userDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Graph/Users/{userDescriptor}",
                            routeValues: {
                                userDescriptor: userDescriptor
                            }
                        })];
                });
            });
        };
        /**
         * Map an existing user to a different user.
         *
         * @param updateContext - The subset of the full graph user used to uniquely find the graph subject in an external provider.
         * @param userDescriptor - The descriptor of the user to update
         */
        GraphRestClient.prototype.updateUser = function (updateContext, userDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/Graph/Users/{userDescriptor}",
                            routeValues: {
                                userDescriptor: userDescriptor
                            },
                            body: updateContext
                        })];
                });
            });
        };
        GraphRestClient.RESOURCE_AREA_ID = "bb1e7ec9-e901-4b68-999a-de7012b920f8";
        return GraphRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.GraphRestClient = GraphRestClient;
});
