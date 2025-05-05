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
    var BuildRestClient = /** @class */ (function (_super) {
        __extends(BuildRestClient, _super);
        function BuildRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Associates an artifact with a build.
         *
         * @param artifact - The artifact.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.createArtifact = function (artifact, project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.5",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            body: artifact
                        })];
                });
            });
        };
        /**
         * Gets a specific artifact for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param artifactName - The name of the artifact.
         */
        BuildRestClient.prototype.getArtifact = function (project, buildId, artifactName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        artifactName: artifactName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.5",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a specific artifact for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param artifactName - The name of the artifact.
         */
        BuildRestClient.prototype.getArtifactContentZip = function (project, buildId, artifactName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        artifactName: artifactName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.5",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets all artifacts for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.getArtifacts = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.5",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Gets a file from the build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param artifactName - The name of the artifact.
         * @param fileId - The primary key for the file.
         * @param fileName - The name that the file will be set to.
         */
        BuildRestClient.prototype.getFile = function (project, buildId, artifactName, fileId, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        artifactName: artifactName,
                        fileId: fileId,
                        fileName: fileName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.5",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the list of attachments of a specific type that are associated with a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param type - The type of attachment.
         */
        BuildRestClient.prototype.getAttachments = function (project, buildId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/attachments/{type}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                type: type
                            }
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getAttachment = function (project, buildId, timelineId, recordId, type, name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/{timelineId}/{recordId}/attachments/{type}/{name}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                timelineId: timelineId,
                                recordId: recordId,
                                type: type,
                                name: name
                            }
                        })];
                });
            });
        };
        /**
         * @param resources -
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.authorizeProjectResources = function (resources, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/authorizedresources",
                            routeValues: {
                                project: project
                            },
                            body: resources
                        })];
                });
            });
        };
        /**
         * @param project - Project ID or project name
         * @param type -
         * @param id -
         */
        BuildRestClient.prototype.getProjectResources = function (project, type, id) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        type: type,
                        id: id
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/authorizedresources",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a badge that indicates the status of the most recent build for a definition. Note that this API is deprecated. Prefer StatusBadgeController.GetStatusBadge.
         *
         * @param project - The project ID or name.
         * @param definitionId - The ID of the definition.
         * @param branchName - The name of the branch.
         */
        BuildRestClient.prototype.getBadge = function (project, definitionId, branchName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        branchName: branchName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/public/build/definitions/{project}/{definitionId}/badge",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a list of branches for the given source code repository.
         *
         * @param project - Project ID or project name
         * @param providerName - The name of the source provider.
         * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
         * @param repository - The vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
         * @param branchName - If supplied, the name of the branch to check for specifically.
         */
        BuildRestClient.prototype.listBranches = function (project, providerName, serviceEndpointId, repository, branchName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository,
                        branchName: branchName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/branches",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a badge that indicates the status of the most recent build for the specified branch.
         *
         * @param project - Project ID or project name
         * @param repoType - The repository type.
         * @param repoId - The repository ID.
         * @param branchName - The branch name.
         */
        BuildRestClient.prototype.getBuildBadge = function (project, repoType, repoId, branchName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        repoId: repoId,
                        branchName: branchName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/repos/{repoType}/badge",
                            routeValues: {
                                project: project,
                                repoType: repoType
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a badge that indicates the status of the most recent build for the specified branch.
         *
         * @param project - Project ID or project name
         * @param repoType - The repository type.
         * @param repoId - The repository ID.
         * @param branchName - The branch name.
         */
        BuildRestClient.prototype.getBuildBadgeData = function (project, repoType, repoId, branchName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        repoId: repoId,
                        branchName: branchName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/repos/{repoType}/badge",
                            routeValues: {
                                project: project,
                                repoType: repoType
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets all retention leases that apply to a specific build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.getRetentionLeasesForBuild = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/leases",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Deletes a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.deleteBuild = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Gets a build
         *
         * @param project - Project ID or project name
         * @param buildId -
         * @param propertyFilters -
         */
        BuildRestClient.prototype.getBuild = function (project, buildId, propertyFilters) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        propertyFilters: propertyFilters
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getBuilds = function (project, definitions, queues, buildNumber, minTime, maxTime, requestedFor, reasonFilter, statusFilter, resultFilter, tagFilters, properties, top, continuationToken, maxBuildsPerDefinition, deletedFilter, queryOrder, branchName, buildIds, repositoryId, repositoryType) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        definitions: definitions && definitions.join(","),
                        queues: queues && queues.join(","),
                        buildNumber: buildNumber,
                        minTime: minTime,
                        maxTime: maxTime,
                        requestedFor: requestedFor,
                        reasonFilter: reasonFilter,
                        statusFilter: statusFilter,
                        resultFilter: resultFilter,
                        tagFilters: tagFilters && tagFilters.join(","),
                        properties: properties && properties.join(","),
                        '$top': top,
                        continuationToken: continuationToken,
                        maxBuildsPerDefinition: maxBuildsPerDefinition,
                        deletedFilter: deletedFilter,
                        queryOrder: queryOrder,
                        branchName: branchName,
                        buildIds: buildIds && buildIds.join(","),
                        repositoryId: repositoryId,
                        repositoryType: repositoryType
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project
                            },
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
         * Queues a build
         *
         * @param build -
         * @param project - Project ID or project name
         * @param ignoreWarnings -
         * @param checkInTicket -
         * @param sourceBuildId -
         * @param definitionId - Optional definition id to queue a build without a body. Ignored if there's a valid body
         */
        BuildRestClient.prototype.queueBuild = function (build, project, ignoreWarnings, checkInTicket, sourceBuildId, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ignoreWarnings: ignoreWarnings,
                        checkInTicket: checkInTicket,
                        sourceBuildId: sourceBuildId,
                        definitionId: definitionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues,
                            body: build
                        })];
                });
            });
        };
        /**
         * Updates a build.
         *
         * @param build - The build.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param retry -
         */
        BuildRestClient.prototype.updateBuild = function (build, project, buildId, retry) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        retry: retry
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues,
                            body: build
                        })];
                });
            });
        };
        /**
         * Updates multiple builds.
         *
         * @param builds - The builds to update.
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.updateBuilds = function (builds, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}",
                            routeValues: {
                                project: project
                            },
                            body: builds
                        })];
                });
            });
        };
        /**
         * Gets the changes associated with a build
         *
         * @param project - Project ID or project name
         * @param buildId -
         * @param continuationToken -
         * @param top - The maximum number of changes to return
         * @param includeSourceChange -
         */
        BuildRestClient.prototype.getBuildChanges = function (project, buildId, continuationToken, top, includeSourceChange) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        continuationToken: continuationToken,
                        '$top': top,
                        includeSourceChange: includeSourceChange
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/changes",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
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
         * Gets the changes made to the repository between two given builds.
         *
         * @param project - Project ID or project name
         * @param fromBuildId - The ID of the first build.
         * @param toBuildId - The ID of the last build.
         * @param top - The maximum number of changes to return.
         */
        BuildRestClient.prototype.getChangesBetweenBuilds = function (project, fromBuildId, toBuildId, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fromBuildId: fromBuildId,
                        toBuildId: toBuildId,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/changes",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a controller
         *
         * @param controllerId -
         */
        BuildRestClient.prototype.getBuildController = function (controllerId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/build/Controllers/{controllerId}",
                            routeValues: {
                                controllerId: controllerId
                            }
                        })];
                });
            });
        };
        /**
         * Gets controller, optionally filtered by name
         *
         * @param name -
         */
        BuildRestClient.prototype.getBuildControllers = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        name: name
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/build/Controllers/{controllerId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Creates a new definition.
         *
         * @param definition - The definition.
         * @param project - Project ID or project name
         * @param definitionToCloneId -
         * @param definitionToCloneRevision -
         */
        BuildRestClient.prototype.createDefinition = function (definition, project, definitionToCloneId, definitionToCloneRevision) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        definitionToCloneId: definitionToCloneId,
                        definitionToCloneRevision: definitionToCloneRevision
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues,
                            body: definition
                        })];
                });
            });
        };
        /**
         * Deletes a definition and all associated builds.
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         */
        BuildRestClient.prototype.deleteDefinition = function (project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            }
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getDefinition = function (project, definitionId, revision, minMetricsTime, propertyFilters, includeLatestBuilds) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        revision: revision,
                        minMetricsTime: minMetricsTime,
                        propertyFilters: propertyFilters && propertyFilters.join(","),
                        includeLatestBuilds: includeLatestBuilds
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getDefinitions = function (project, name, repositoryId, repositoryType, queryOrder, top, continuationToken, minMetricsTime, definitionIds, path, builtAfter, notBuiltAfter, includeAllProperties, includeLatestBuilds, taskIdFilter, processType, yamlFilename) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        name: name,
                        repositoryId: repositoryId,
                        repositoryType: repositoryType,
                        queryOrder: queryOrder,
                        '$top': top,
                        continuationToken: continuationToken,
                        minMetricsTime: minMetricsTime,
                        definitionIds: definitionIds && definitionIds.join(","),
                        path: path,
                        builtAfter: builtAfter,
                        notBuiltAfter: notBuiltAfter,
                        includeAllProperties: includeAllProperties,
                        includeLatestBuilds: includeLatestBuilds,
                        taskIdFilter: taskIdFilter,
                        processType: processType,
                        yamlFilename: yamlFilename
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project
                            },
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
         * Restores a deleted definition
         *
         * @param project - Project ID or project name
         * @param definitionId - The identifier of the definition to restore.
         * @param deleted - When false, restores a deleted definition.
         */
        BuildRestClient.prototype.restoreDefinition = function (project, definitionId, deleted) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        deleted: deleted
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates an existing build definition.  In order for this operation to succeed, the value of the "Revision" property of the request body must match the existing build definition's. It is recommended that you obtain the existing build definition by using GET, modify the build definition as necessary, and then submit the modified definition with PUT.
         *
         * @param definition - The new version of the definition. Its "Revision" property must match the existing definition for the update to be accepted.
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param secretsSourceDefinitionId -
         * @param secretsSourceDefinitionRevision -
         */
        BuildRestClient.prototype.updateDefinition = function (definition, project, definitionId, secretsSourceDefinitionId, secretsSourceDefinitionRevision) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        secretsSourceDefinitionId: secretsSourceDefinitionId,
                        secretsSourceDefinitionRevision: secretsSourceDefinitionRevision
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.7",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues,
                            body: definition
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getFileContents = function (project, providerName, serviceEndpointId, repository, commitOrBranch, path) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository,
                        commitOrBranch: commitOrBranch,
                        path: path
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "text/plain",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/fileContents",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Creates a new folder.
         *
         * @param folder - The folder.
         * @param project - Project ID or project name
         * @param path - The full path of the folder.
         */
        BuildRestClient.prototype.createFolder = function (folder, project, path) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/build/folders/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues,
                            body: folder
                        })];
                });
            });
        };
        /**
         * Deletes a definition folder. Definitions and their corresponding builds will also be deleted.
         *
         * @param project - Project ID or project name
         * @param path - The full path to the folder.
         */
        BuildRestClient.prototype.deleteFolder = function (project, path) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/folders/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a list of build definition folders.
         *
         * @param project - Project ID or project name
         * @param path - The path to start with.
         * @param queryOrder - The order in which folders should be returned.
         */
        BuildRestClient.prototype.getFolders = function (project, path, queryOrder) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        queryOrder: queryOrder
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/folders/{*path}",
                            routeValues: {
                                project: project,
                                path: path
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates an existing folder at given  existing path
         *
         * @param folder - The new version of the folder.
         * @param project - Project ID or project name
         * @param path - The full path to the folder.
         */
        BuildRestClient.prototype.updateFolder = function (folder, project, path) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/folders/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues,
                            body: folder
                        })];
                });
            });
        };
        /**
         * Gets pipeline general settings.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getBuildGeneralSettings = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/generalSettings",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Updates pipeline general settings.
         *
         * @param newSettings -
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.updateBuildGeneralSettings = function (newSettings, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/generalSettings",
                            routeValues: {
                                project: project
                            },
                            body: newSettings
                        })];
                });
            });
        };
        /**
         * Returns the retention history for the project collection. This includes pipelines that have custom retention rules that may prevent the retention job from cleaning them up, runs per pipeline with retention type, files associated with pipelines owned by the collection with retention type, and the number of files per pipeline.
         *
         * @param daysToLookback -
         */
        BuildRestClient.prototype.getRetentionHistory = function (daysToLookback) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        daysToLookback: daysToLookback
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/build/retention/history",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the latest build for a definition, optionally scoped to a specific branch.
         *
         * @param project - Project ID or project name
         * @param definition - definition name with optional leading folder path, or the definition id
         * @param branchName - optional parameter that indicates the specific branch to use. If not specified, the default branch is used.
         */
        BuildRestClient.prototype.getLatestBuild = function (project, definition, branchName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        branchName: branchName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/latest/{*definition}",
                            routeValues: {
                                project: project,
                                definition: definition
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Adds new leases for pipeline runs.
         *
         * @param newLeases -
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.addRetentionLeases = function (newLeases, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project
                            },
                            body: newLeases
                        })];
                });
            });
        };
        /**
         * Removes specific retention leases.
         *
         * @param project - Project ID or project name
         * @param ids -
         */
        BuildRestClient.prototype.deleteRetentionLeasesById = function (project, ids) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ids: ids && ids.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns the details of the retention lease given a lease id.
         *
         * @param project - Project ID or project name
         * @param leaseId -
         */
        BuildRestClient.prototype.getRetentionLease = function (project, leaseId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project,
                                leaseId: leaseId
                            }
                        })];
                });
            });
        };
        /**
         * Returns any leases matching the specified MinimalRetentionLeases
         *
         * @param project - Project ID or project name
         * @param leasesToFetch - List of JSON-serialized MinimalRetentionLeases separated by '|'
         */
        BuildRestClient.prototype.getRetentionLeasesByMinimalRetentionLeases = function (project, leasesToFetch) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        leasesToFetch: leasesToFetch && leasesToFetch.join("|")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns any leases owned by the specified entity, optionally scoped to a single pipeline definition and run.
         *
         * @param project - Project ID or project name
         * @param ownerId -
         * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
         * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
         */
        BuildRestClient.prototype.getRetentionLeasesByOwnerId = function (project, ownerId, definitionId, runId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ownerId: ownerId,
                        definitionId: definitionId,
                        runId: runId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns any leases owned by the specified user, optionally scoped to a single pipeline definition and run.
         *
         * @param project - Project ID or project name
         * @param userOwnerId - The user id to search for.
         * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
         * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
         */
        BuildRestClient.prototype.getRetentionLeasesByUserId = function (project, userOwnerId, definitionId, runId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        userOwnerId: userOwnerId,
                        definitionId: definitionId,
                        runId: runId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates the duration or pipeline protection status of a retention lease.
         *
         * @param leaseUpdate - The new data for the retention lease.
         * @param project - Project ID or project name
         * @param leaseId - The ID of the lease to update.
         */
        BuildRestClient.prototype.updateRetentionLease = function (leaseUpdate, project, leaseId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
                            routeValues: {
                                project: project,
                                leaseId: leaseId
                            },
                            body: leaseUpdate
                        })];
                });
            });
        };
        /**
         * Gets an individual log file for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param logId - The ID of the log file.
         * @param startLine - The start line.
         * @param endLine - The end line.
         */
        BuildRestClient.prototype.getBuildLog = function (project, buildId, logId, startLine, endLine) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        startLine: startLine,
                        endLine: endLine
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            httpResponseType: "text/plain",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                logId: logId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets an individual log file for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param logId - The ID of the log file.
         * @param startLine - The start line.
         * @param endLine - The end line.
         */
        BuildRestClient.prototype.getBuildLogLines = function (project, buildId, logId, startLine, endLine) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        startLine: startLine,
                        endLine: endLine
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                logId: logId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the logs for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.getBuildLogs = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Gets the logs for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.getBuildLogsZip = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Gets an individual log file for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param logId - The ID of the log file.
         * @param startLine - The start line.
         * @param endLine - The end line.
         */
        BuildRestClient.prototype.getBuildLogZip = function (project, buildId, logId, startLine, endLine) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        startLine: startLine,
                        endLine: endLine
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                logId: logId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets build metrics for a project.
         *
         * @param project - Project ID or project name
         * @param metricAggregationType - The aggregation type to use (hourly, daily).
         * @param minMetricsTime - The date from which to calculate metrics.
         */
        BuildRestClient.prototype.getProjectMetrics = function (project, metricAggregationType, minMetricsTime) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        minMetricsTime: minMetricsTime
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/Metrics/{metricAggregationType}",
                            routeValues: {
                                project: project,
                                metricAggregationType: metricAggregationType
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets build metrics for a definition.
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param minMetricsTime - The date from which to calculate metrics.
         */
        BuildRestClient.prototype.getDefinitionMetrics = function (project, definitionId, minMetricsTime) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        minMetricsTime: minMetricsTime
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/Metrics",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets all build definition options supported by the system.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getBuildOptionDefinitions = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/options",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getPathContents = function (project, providerName, serviceEndpointId, repository, commitOrBranch, path) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository,
                        commitOrBranch: commitOrBranch,
                        path: path
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/pathContents",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets properties for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
         */
        BuildRestClient.prototype.getBuildProperties = function (project, buildId, filter) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        filter: filter && filter.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/properties",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates properties for a build.
         *
         * @param document - A json-patch document describing the properties to update.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.updateBuildProperties = function (document, project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/properties",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            body: document
                        })];
                });
            });
        };
        /**
         * Gets properties for a definition.
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
         */
        BuildRestClient.prototype.getDefinitionProperties = function (project, definitionId, filter) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        filter: filter && filter.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/properties",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates properties for a definition.
         *
         * @param document - A json-patch document describing the properties to update.
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         */
        BuildRestClient.prototype.updateDefinitionProperties = function (document, project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/properties",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            body: document
                        })];
                });
            });
        };
        /**
         * Gets a pull request object from source provider.
         *
         * @param project - Project ID or project name
         * @param providerName - The name of the source provider.
         * @param pullRequestId - Vendor-specific id of the pull request.
         * @param repositoryId - Vendor-specific identifier or the name of the repository that contains the pull request.
         * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
         */
        BuildRestClient.prototype.getPullRequest = function (project, providerName, pullRequestId, repositoryId, serviceEndpointId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        repositoryId: repositoryId,
                        serviceEndpointId: serviceEndpointId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/pullRequests/{pullRequestId}",
                            routeValues: {
                                project: project,
                                providerName: providerName,
                                pullRequestId: pullRequestId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a build report.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param type -
         */
        BuildRestClient.prototype.getBuildReport = function (project, buildId, type) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        type: type
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/report",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a build report.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param type -
         */
        BuildRestClient.prototype.getBuildReportHtmlContent = function (project, buildId, type) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        type: type
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            httpResponseType: "text/html",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/report",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.listRepositories = function (project, providerName, serviceEndpointId, repository, resultSet, pageResults, continuationToken) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository,
                        resultSet: resultSet,
                        pageResults: pageResults,
                        continuationToken: continuationToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/repositories",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param resources -
         * @param project - Project ID or project name
         * @param definitionId -
         */
        BuildRestClient.prototype.authorizeDefinitionResources = function (resources, project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/resources",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            body: resources
                        })];
                });
            });
        };
        /**
         * @param project - Project ID or project name
         * @param definitionId -
         */
        BuildRestClient.prototype.getDefinitionResources = function (project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/resources",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            }
                        })];
                });
            });
        };
        /**
         * Gets information about build resources in the system.
         *
         */
        BuildRestClient.prototype.getResourceUsage = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/build/ResourceUsage"
                        })];
                });
            });
        };
        /**
         * Gets the project's retention settings.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getRetentionSettings = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/retention",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Updates the project's retention settings.
         *
         * @param updateModel -
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.updateRetentionSettings = function (updateModel, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/retention",
                            routeValues: {
                                project: project
                            },
                            body: updateModel
                        })];
                });
            });
        };
        /**
         * Gets all revisions of a definition.
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         */
        BuildRestClient.prototype.getDefinitionRevisions = function (project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/revisions",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            }
                        })];
                });
            });
        };
        /**
         * Gets the build settings.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getBuildSettings = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/settings",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Updates the build settings.
         *
         * @param settings - The new settings.
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.updateBuildSettings = function (settings, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/settings",
                            routeValues: {
                                project: project
                            },
                            body: settings
                        })];
                });
            });
        };
        /**
         * Get a list of source providers and their capabilities.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.listSourceProviders = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Update a build stage
         *
         * @param updateParameters -
         * @param buildId -
         * @param stageRefName -
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.updateStage = function (updateParameters, buildId, stageRefName, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/stages/{stageRefName}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                stageRefName: stageRefName
                            },
                            body: updateParameters
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getStatusBadge = function (project, definition, branchName, stageName, jobName, configuration, label) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        branchName: branchName,
                        stageName: stageName,
                        jobName: jobName,
                        configuration: configuration,
                        label: label
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/status/{*definition}",
                            routeValues: {
                                project: project,
                                definition: definition
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Adds a tag to a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param tag - The tag to add.
         */
        BuildRestClient.prototype.addBuildTag = function (project, buildId, tag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                tag: tag
                            }
                        })];
                });
            });
        };
        /**
         * Adds tags to a build.
         *
         * @param tags - The tags to add. Request body is composed directly from listed tags.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.addBuildTags = function (tags, project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            body: tags
                        })];
                });
            });
        };
        /**
         * Removes a tag from a build. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param tag - The tag to remove.
         */
        BuildRestClient.prototype.deleteBuildTag = function (project, buildId, tag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                tag: tag
                            }
                        })];
                });
            });
        };
        /**
         * Gets the tags for a build.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.getBuildTags = function (project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            }
                        })];
                });
            });
        };
        /**
         * Adds/Removes tags from a build.
         *
         * @param updateParameters - The tags to add/remove.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         */
        BuildRestClient.prototype.updateBuildTags = function (updateParameters, project, buildId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Adds a tag to a definition
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param tag - The tag to add.
         */
        BuildRestClient.prototype.addDefinitionTag = function (project, definitionId, tag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId,
                                tag: tag
                            }
                        })];
                });
            });
        };
        /**
         * Adds multiple tags to a definition.
         *
         * @param tags - The tags to add.
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         */
        BuildRestClient.prototype.addDefinitionTags = function (tags, project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            body: tags
                        })];
                });
            });
        };
        /**
         * Removes a tag from a definition. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param tag - The tag to remove.
         */
        BuildRestClient.prototype.deleteDefinitionTag = function (project, definitionId, tag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId,
                                tag: tag
                            }
                        })];
                });
            });
        };
        /**
         * Gets the tags for a definition.
         *
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         * @param revision - The definition revision number. If not specified, uses the latest revision of the definition.
         */
        BuildRestClient.prototype.getDefinitionTags = function (project, definitionId, revision) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        revision: revision
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Adds/Removes tags from a definition.
         *
         * @param updateParameters - The tags to add/remove.
         * @param project - Project ID or project name
         * @param definitionId - The ID of the definition.
         */
        BuildRestClient.prototype.updateDefinitionTags = function (updateParameters, project, definitionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Removes a tag from builds, definitions, and from the tag store
         *
         * @param project - Project ID or project name
         * @param tag - The tag to remove.
         */
        BuildRestClient.prototype.deleteTag = function (project, tag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/tags/{*tag}",
                            routeValues: {
                                project: project,
                                tag: tag
                            }
                        })];
                });
            });
        };
        /**
         * Gets a list of all build tags in the project.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getTags = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/tags/{*tag}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Deletes a build definition template.
         *
         * @param project - Project ID or project name
         * @param templateId - The ID of the template.
         */
        BuildRestClient.prototype.deleteTemplate = function (project, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
                            routeValues: {
                                project: project,
                                templateId: templateId
                            }
                        })];
                });
            });
        };
        /**
         * Gets a specific build definition template.
         *
         * @param project - Project ID or project name
         * @param templateId - The ID of the requested template.
         */
        BuildRestClient.prototype.getTemplate = function (project, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
                            routeValues: {
                                project: project,
                                templateId: templateId
                            }
                        })];
                });
            });
        };
        /**
         * Gets all definition templates.
         *
         * @param project - Project ID or project name
         */
        BuildRestClient.prototype.getTemplates = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Updates an existing build definition template.
         *
         * @param template - The new version of the template.
         * @param project - Project ID or project name
         * @param templateId - The ID of the template.
         */
        BuildRestClient.prototype.saveTemplate = function (template, project, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
                            routeValues: {
                                project: project,
                                templateId: templateId
                            },
                            body: template
                        })];
                });
            });
        };
        /**
         * Gets details for a build
         *
         * @param project - Project ID or project name
         * @param buildId -
         * @param timelineId -
         * @param changeId -
         * @param planId -
         */
        BuildRestClient.prototype.getBuildTimeline = function (project, buildId, timelineId, changeId, planId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        changeId: changeId,
                        planId: planId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/Timeline/{timelineId}",
                            routeValues: {
                                project: project,
                                buildId: buildId,
                                timelineId: timelineId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Recreates the webhooks for the specified triggers in the given source code repository.
         *
         * @param triggerTypes - The types of triggers to restore webhooks for.
         * @param project - Project ID or project name
         * @param providerName - The name of the source provider.
         * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
         * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
         */
        BuildRestClient.prototype.restoreWebhooks = function (triggerTypes, project, providerName, serviceEndpointId, repository) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/webhooks",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues,
                            body: triggerTypes
                        })];
                });
            });
        };
        /**
         * Gets a list of webhooks installed in the given source code repository.
         *
         * @param project - Project ID or project name
         * @param providerName - The name of the source provider.
         * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
         * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
         */
        BuildRestClient.prototype.listWebhooks = function (project, providerName, serviceEndpointId, repository) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        serviceEndpointId: serviceEndpointId,
                        repository: repository
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/webhooks",
                            routeValues: {
                                project: project,
                                providerName: providerName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the work items associated with a build. Only work items in the same project are returned.
         *
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param top - The maximum number of work items to return.
         */
        BuildRestClient.prototype.getBuildWorkItemsRefs = function (project, buildId, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/workitems",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the work items associated with a build, filtered to specific commits.
         *
         * @param commitIds - A comma-delimited list of commit IDs.
         * @param project - Project ID or project name
         * @param buildId - The ID of the build.
         * @param top - The maximum number of work items to return, or the number of commits to consider if no commit IDs are specified.
         */
        BuildRestClient.prototype.getBuildWorkItemsRefsFromCommits = function (commitIds, project, buildId, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/build/builds/{buildId}/workitems",
                            routeValues: {
                                project: project,
                                buildId: buildId
                            },
                            queryParams: queryValues,
                            body: commitIds
                        })];
                });
            });
        };
        /**
         * Gets all the work items between two builds.
         *
         * @param project - Project ID or project name
         * @param fromBuildId - The ID of the first build.
         * @param toBuildId - The ID of the last build.
         * @param top - The maximum number of work items to return.
         */
        BuildRestClient.prototype.getWorkItemsBetweenBuilds = function (project, fromBuildId, toBuildId, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fromBuildId: fromBuildId,
                        toBuildId: toBuildId,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/_apis/build/workitems",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
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
        BuildRestClient.prototype.getDefinitionYaml = function (project, definitionId, revision, minMetricsTime, propertyFilters, includeLatestBuilds) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        revision: revision,
                        minMetricsTime: minMetricsTime,
                        propertyFilters: propertyFilters && propertyFilters.join(","),
                        includeLatestBuilds: includeLatestBuilds
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/yaml",
                            routeValues: {
                                project: project,
                                definitionId: definitionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        BuildRestClient.RESOURCE_AREA_ID = "965220d5-5bb9-42cf-8d67-9b146df2a5a4";
        return BuildRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.BuildRestClient = BuildRestClient;
});
