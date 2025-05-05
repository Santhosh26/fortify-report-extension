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
define(["require", "exports", "../Common/RestClientBase", "../Common/Util/Serialization"], function (require, exports, RestClientBase_1, Serialization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreRestClient = /** @class */ (function (_super) {
        __extends(CoreRestClient, _super);
        function CoreRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Removes the avatar for the project.
         *
         * @param projectId - The ID or name of the project.
         */
        CoreRestClient.prototype.removeProjectAvatar = function (projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/projects/{projectId}/avatar",
                            routeValues: {
                                projectId: projectId
                            }
                        })];
                });
            });
        };
        /**
         * Sets the avatar for the project.
         *
         * @param avatarBlob - The avatar blob data object to upload.
         * @param projectId - The ID or name of the project.
         */
        CoreRestClient.prototype.setProjectAvatar = function (avatarBlob, projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/projects/{projectId}/avatar",
                            routeValues: {
                                projectId: projectId
                            },
                            body: avatarBlob
                        })];
                });
            });
        };
        /**
         * Gets list of user readable teams in a project and teams user is member of (excluded from readable list).
         *
         * @param projectId - The name or ID (GUID) of the team project containing the teams to retrieve.
         * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
         * @param top - Maximum number of teams to return.
         * @param skip - Number of teams to skip.
         */
        CoreRestClient.prototype.getProjectTeamsByCategory = function (projectId, expandIdentity, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expandIdentity': expandIdentity,
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/projects/{projectId}/categorizedTeams/",
                            routeValues: {
                                projectId: projectId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param connectedServiceCreationData -
         * @param projectId -
         */
        CoreRestClient.prototype.createConnectedService = function (connectedServiceCreationData, projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
                            routeValues: {
                                projectId: projectId
                            },
                            body: connectedServiceCreationData
                        })];
                });
            });
        };
        /**
         * @param projectId -
         * @param name -
         */
        CoreRestClient.prototype.getConnectedServiceDetails = function (projectId, name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
                            routeValues: {
                                projectId: projectId,
                                name: name
                            }
                        })];
                });
            });
        };
        /**
         * @param projectId -
         * @param kind -
         */
        CoreRestClient.prototype.getConnectedServices = function (projectId, kind) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        kind: kind
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
                            routeValues: {
                                projectId: projectId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param mruData -
         * @param mruName -
         */
        CoreRestClient.prototype.createIdentityMru = function (mruData, mruName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/core/identityMru/{mruName}",
                            routeValues: {
                                mruName: mruName
                            },
                            body: mruData
                        })];
                });
            });
        };
        /**
         * @param mruData -
         * @param mruName -
         */
        CoreRestClient.prototype.deleteIdentityMru = function (mruData, mruName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/core/identityMru/{mruName}",
                            routeValues: {
                                mruName: mruName
                            }
                        })];
                });
            });
        };
        /**
         * @param mruName -
         */
        CoreRestClient.prototype.getIdentityMru = function (mruName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/core/identityMru/{mruName}",
                            routeValues: {
                                mruName: mruName
                            }
                        })];
                });
            });
        };
        /**
         * @param mruData -
         * @param mruName -
         */
        CoreRestClient.prototype.updateIdentityMru = function (mruData, mruName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/core/identityMru/{mruName}",
                            routeValues: {
                                mruName: mruName
                            },
                            body: mruData
                        })];
                });
            });
        };
        /**
         * Get a list of members for a specific team.
         *
         * @param projectId - The name or ID (GUID) of the team project the team belongs to.
         * @param teamId - The name or ID (GUID) of the team .
         * @param top -
         * @param skip -
         */
        CoreRestClient.prototype.getTeamMembersWithExtendedProperties = function (projectId, teamId, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/projects/{projectId}/teams/{teamId}/members",
                            routeValues: {
                                projectId: projectId,
                                teamId: teamId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a process by ID.
         *
         * @param processId - ID for a process.
         */
        CoreRestClient.prototype.getProcessById = function (processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/process/processes/{*processId}",
                            routeValues: {
                                processId: processId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of processes.
         *
         */
        CoreRestClient.prototype.getProcesses = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/process/processes/{*processId}"
                        })];
                });
            });
        };
        /**
         * Get project collection with the specified id or name.
         *
         * @param collectionId -
         */
        CoreRestClient.prototype.getProjectCollection = function (collectionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/projectCollections/{collectionId}",
                            routeValues: {
                                collectionId: collectionId
                            }
                        })];
                });
            });
        };
        /**
         * Get project collection references for this application.
         *
         * @param top -
         * @param skip -
         */
        CoreRestClient.prototype.getProjectCollections = function (top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/projectCollections/{collectionId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the history of changes to the project.
         *
         * @param minRevision - The minimum revision number to return in the history.
         */
        CoreRestClient.prototype.getProjectHistoryEntries = function (minRevision) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        minRevision: minRevision
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/projectHistory",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get project with the specified id or name, optionally including capabilities.
         *
         * @param projectId -
         * @param includeCapabilities - Include capabilities (such as source control) in the team project result (default: false).
         * @param includeHistory - Search within renamed projects (that had such name in the past).
         */
        CoreRestClient.prototype.getProject = function (projectId, includeCapabilities, includeHistory) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        includeCapabilities: includeCapabilities,
                        includeHistory: includeHistory
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            routeTemplate: "_apis/projects/{*projectId}",
                            routeValues: {
                                projectId: projectId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get all projects in the organization that the authenticated user has access to.
         *
         * @param stateFilter - Filter on team projects in a specific team project state (default: WellFormed).
         * @param top -
         * @param skip -
         * @param continuationToken - Pointer that shows how many projects already been fetched.
         * @param getDefaultTeamImageUrl -
         */
        CoreRestClient.prototype.getProjects = function (stateFilter, top, skip, continuationToken, getDefaultTeamImageUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        stateFilter: stateFilter,
                        '$top': top,
                        '$skip': skip,
                        continuationToken: continuationToken,
                        getDefaultTeamImageUrl: getDefaultTeamImageUrl
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            routeTemplate: "_apis/projects/{*projectId}",
                            queryParams: queryValues,
                            returnRawResponse: true
                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var body;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, response.text().then(Serialization_1.deserializeVssJsonObject)];
                                    case 1:
                                        body = _a.sent();
                                        body.continuationToken = response.headers.get("x-ms-continuationtoken");
                                        return [2 /*return*/, body];
                                }
                            });
                        }); })];
                });
            });
        };
        /**
         * Queues a project to be created. Use the [GetOperation](../../operations/operations/get) to periodically check for create project status.
         *
         * @param projectToCreate - The project to create.
         */
        CoreRestClient.prototype.queueCreateProject = function (projectToCreate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            method: "POST",
                            routeTemplate: "_apis/projects/{*projectId}",
                            body: projectToCreate
                        })];
                });
            });
        };
        /**
         * Queues a project to be deleted. Use the [GetOperation](../../operations/operations/get) to periodically check for delete project status.
         *
         * @param projectId - The project id of the project to delete.
         */
        CoreRestClient.prototype.queueDeleteProject = function (projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            method: "DELETE",
                            routeTemplate: "_apis/projects/{*projectId}",
                            routeValues: {
                                projectId: projectId
                            }
                        })];
                });
            });
        };
        /**
         * Update an existing project's name, abbreviation, description, or restore a project.
         *
         * @param projectUpdate - The updates for the project. The state must be set to wellFormed to restore the project.
         * @param projectId - The project id of the project to update.
         */
        CoreRestClient.prototype.updateProject = function (projectUpdate, projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            method: "PATCH",
                            routeTemplate: "_apis/projects/{*projectId}",
                            routeValues: {
                                projectId: projectId
                            },
                            body: projectUpdate
                        })];
                });
            });
        };
        /**
         * Get a collection of team project properties for multiple projects.
         *
         * @param projectIds - A comma-delimited string of team project IDs
         * @param properties -
         */
        CoreRestClient.prototype.getProjectsProperties = function (projectIds, properties) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        projectIds: projectIds && projectIds.join(","),
                        properties: properties && properties.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/projectsproperties",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a collection of team project properties.
         *
         * @param projectId - The team project ID.
         * @param keys - A comma-delimited string of team project property names. Wildcard characters ("?" and "*") are supported. If no key is specified, all properties will be returned.
         */
        CoreRestClient.prototype.getProjectProperties = function (projectId, keys) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        keys: keys && keys.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/projects/{projectId}/properties",
                            routeValues: {
                                projectId: projectId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Create, update, and delete team project properties.
         *
         * @param projectId - The team project ID.
         * @param patchDocument - A JSON Patch document that represents an array of property operations. See RFC 6902 for more details on JSON Patch. The accepted operation verbs are Add and Remove, where Add is used for both creating and updating properties. The path consists of a forward slash and a property name.
         */
        CoreRestClient.prototype.setProjectProperties = function (projectId, patchDocument) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/projects/{projectId}/properties",
                            routeValues: {
                                projectId: projectId
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
         * @param proxy -
         */
        CoreRestClient.prototype.createOrUpdateProxy = function (proxy) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/proxies",
                            body: proxy
                        })];
                });
            });
        };
        /**
         * @param proxyUrl -
         * @param site -
         */
        CoreRestClient.prototype.deleteProxy = function (proxyUrl, site) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        proxyUrl: proxyUrl,
                        site: site
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/proxies",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param proxyUrl -
         */
        CoreRestClient.prototype.getProxies = function (proxyUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        proxyUrl: proxyUrl
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/proxies",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of all teams.
         *
         * @param mine - If true, then return all teams requesting user is member. Otherwise return all teams user has read access.
         * @param top - Maximum number of teams to return.
         * @param skip - Number of teams to skip.
         * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
         */
        CoreRestClient.prototype.getAllTeams = function (mine, top, skip, expandIdentity) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$mine': mine,
                        '$top': top,
                        '$skip': skip,
                        '$expandIdentity': expandIdentity
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "_apis/teams",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Create a team in a team project.
         *
         * @param team - The team data used to create the team.
         * @param projectId - The name or ID (GUID) of the team project in which to create the team.
         */
        CoreRestClient.prototype.createTeam = function (team, projectId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
                            routeValues: {
                                projectId: projectId
                            },
                            body: team
                        })];
                });
            });
        };
        /**
         * Delete a team.
         *
         * @param projectId - The name or ID (GUID) of the team project containing the team to delete.
         * @param teamId - The name or ID of the team to delete.
         */
        CoreRestClient.prototype.deleteTeam = function (projectId, teamId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
                            routeValues: {
                                projectId: projectId,
                                teamId: teamId
                            }
                        })];
                });
            });
        };
        /**
         * Get a specific team.
         *
         * @param projectId - The name or ID (GUID) of the team project containing the team.
         * @param teamId - The name or ID (GUID) of the team.
         * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
         */
        CoreRestClient.prototype.getTeam = function (projectId, teamId, expandIdentity) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expandIdentity': expandIdentity
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
                            routeValues: {
                                projectId: projectId,
                                teamId: teamId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of teams.
         *
         * @param projectId -
         * @param mine - If true return all the teams requesting user is member, otherwise return all the teams user has read access.
         * @param top - Maximum number of teams to return.
         * @param skip - Number of teams to skip.
         * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
         */
        CoreRestClient.prototype.getTeams = function (projectId, mine, top, skip, expandIdentity) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$mine': mine,
                        '$top': top,
                        '$skip': skip,
                        '$expandIdentity': expandIdentity
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
                            routeValues: {
                                projectId: projectId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update a team's name and/or description.
         *
         * @param teamData -
         * @param projectId - The name or ID (GUID) of the team project containing the team to update.
         * @param teamId - The name of ID of the team to update.
         */
        CoreRestClient.prototype.updateTeam = function (teamData, projectId, teamId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PATCH",
                            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
                            routeValues: {
                                projectId: projectId,
                                teamId: teamId
                            },
                            body: teamData
                        })];
                });
            });
        };
        CoreRestClient.RESOURCE_AREA_ID = "79134c72-4a58-4b42-976c-04e7115f32bf";
        return CoreRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.CoreRestClient = CoreRestClient;
});
