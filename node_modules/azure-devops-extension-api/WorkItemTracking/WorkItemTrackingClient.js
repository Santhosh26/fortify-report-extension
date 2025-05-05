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
    var WorkItemTrackingRestClient = /** @class */ (function (_super) {
        __extends(WorkItemTrackingRestClient, _super);
        function WorkItemTrackingRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE. This returns Doing, Done, Follows and activity work items details.
         *
         * @param queryOption -
         */
        WorkItemTrackingRestClient.prototype.getAccountMyWorkData = function (queryOption) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$queryOption': queryOption
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/work/accountMyWork",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets recent work item activities
         *
         */
        WorkItemTrackingRestClient.prototype.getRecentActivityData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "_apis/work/accountMyWorkRecentActivity"
                        })];
                });
            });
        };
        /**
         * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE.
         *
         */
        WorkItemTrackingRestClient.prototype.getRecentMentions = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/work/accountRecentMentions"
                        })];
                });
            });
        };
        /**
         * Get the list of work item tracking outbound artifact link types.
         *
         */
        WorkItemTrackingRestClient.prototype.getWorkArtifactLinkTypes = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/wit/artifactLinkTypes"
                        })];
                });
            });
        };
        /**
         * Queries work items linked to a given list of artifact URI.
         *
         * @param artifactUriQuery - Defines a list of artifact URI for querying work items.
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.queryWorkItemsForArtifactUris = function (artifactUriQuery, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/artifactUriQuery",
                            routeValues: {
                                project: project
                            },
                            body: artifactUriQuery
                        })];
                });
            });
        };
        /**
         * Uploads an attachment.
         *
         * @param content - Content to upload
         * @param project - Project ID or project name
         * @param fileName - The name of the file
         * @param uploadType - Attachment upload type: Simple or Chunked
         * @param areaPath - Target project Area Path
         */
        WorkItemTrackingRestClient.prototype.createAttachment = function (content, project, fileName, uploadType, areaPath) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fileName: fileName,
                        uploadType: uploadType,
                        areaPath: areaPath
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/attachments/{id}",
                            routeValues: {
                                project: project
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                            },
                            queryParams: queryValues,
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * Downloads an attachment.
         *
         * @param id - Attachment ID
         * @param project - Project ID or project name
         * @param fileName - Name of the file
         * @param download - If set to \<c\>true\</c\> always download attachment
         */
        WorkItemTrackingRestClient.prototype.getAttachmentContent = function (id, project, fileName, download) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fileName: fileName,
                        download: download
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "{project}/_apis/wit/attachments/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Downloads an attachment.
         *
         * @param id - Attachment ID
         * @param project - Project ID or project name
         * @param fileName - Name of the file
         * @param download - If set to \<c\>true\</c\> always download attachment
         */
        WorkItemTrackingRestClient.prototype.getAttachmentZip = function (id, project, fileName, download) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fileName: fileName,
                        download: download
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/wit/attachments/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets root classification nodes or list of classification nodes for a given list of nodes ids, for a given project. In case ids parameter is supplied you will  get list of classification nodes for those ids. Otherwise you will get root classification nodes for this project.
         *
         * @param project - Project ID or project name
         * @param ids - Comma separated integer classification nodes ids. It's not required, if you want root nodes.
         * @param depth - Depth of children to fetch.
         * @param errorPolicy - Flag to handle errors in getting some nodes. Possible options are Fail and Omit.
         */
        WorkItemTrackingRestClient.prototype.getClassificationNodes = function (project, ids, depth, errorPolicy) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ids: ids && ids.join(","),
                        '$depth': depth,
                        errorPolicy: errorPolicy
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/classificationNodes",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets root classification nodes under the project.
         *
         * @param project - Project ID or project name
         * @param depth - Depth of children to fetch.
         */
        WorkItemTrackingRestClient.prototype.getRootNodes = function (project, depth) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$depth': depth
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/classificationNodes",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Create new or update an existing classification node.
         *
         * @param postedNode - Node to create or update.
         * @param project - Project ID or project name
         * @param structureGroup - Structure group of the classification node, area or iteration.
         * @param path - Path of the classification node.
         */
        WorkItemTrackingRestClient.prototype.createOrUpdateClassificationNode = function (postedNode, project, structureGroup, path) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
                            routeValues: {
                                project: project,
                                structureGroup: structureGroup,
                                path: path
                            },
                            body: postedNode
                        })];
                });
            });
        };
        /**
         * Delete an existing classification node.
         *
         * @param project - Project ID or project name
         * @param structureGroup - Structure group of the classification node, area or iteration.
         * @param path - Path of the classification node.
         * @param reclassifyId - Id of the target classification node for reclassification.
         */
        WorkItemTrackingRestClient.prototype.deleteClassificationNode = function (project, structureGroup, path, reclassifyId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$reclassifyId': reclassifyId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
                            routeValues: {
                                project: project,
                                structureGroup: structureGroup,
                                path: path
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the classification node for a given node path.
         *
         * @param project - Project ID or project name
         * @param structureGroup - Structure group of the classification node, area or iteration.
         * @param path - Path of the classification node.
         * @param depth - Depth of children to fetch.
         */
        WorkItemTrackingRestClient.prototype.getClassificationNode = function (project, structureGroup, path, depth) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$depth': depth
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
                            routeValues: {
                                project: project,
                                structureGroup: structureGroup,
                                path: path
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update an existing classification node.
         *
         * @param postedNode - Node to create or update.
         * @param project - Project ID or project name
         * @param structureGroup - Structure group of the classification node, area or iteration.
         * @param path - Path of the classification node.
         */
        WorkItemTrackingRestClient.prototype.updateClassificationNode = function (postedNode, project, structureGroup, path) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
                            routeValues: {
                                project: project,
                                structureGroup: structureGroup,
                                path: path
                            },
                            body: postedNode
                        })];
                });
            });
        };
        /**
         * Gets a comment for a work item at the specified revision.
         *
         * @param id - Work item id
         * @param revision - Revision for which the comment need to be fetched
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getComment = function (id, revision, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/comments/{revision}",
                            routeValues: {
                                project: project,
                                id: id,
                                revision: revision
                            }
                        })];
                });
            });
        };
        /**
         * Gets the specified number of comments for a work item from the specified revision.
         *
         * @param id - Work item id
         * @param project - Project ID or project name
         * @param fromRevision - Revision from which comments are to be fetched (default is 1)
         * @param top - The number of comments to return (default is 200)
         * @param order - Ascending or descending by revision id (default is ascending)
         */
        WorkItemTrackingRestClient.prototype.getComments = function (id, project, fromRevision, top, order) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fromRevision: fromRevision,
                        '$top': top,
                        order: order
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/comments/{revision}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Create a new field.
         *
         * @param workItemField - New field definition
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.createField = function (workItemField, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
                            routeValues: {
                                project: project
                            },
                            body: workItemField
                        })];
                });
            });
        };
        /**
         * Deletes the field. To undelete a filed, see "Update Field" API.
         *
         * @param fieldNameOrRefName - Field simple name or reference name
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.deleteField = function (fieldNameOrRefName, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
                            routeValues: {
                                project: project,
                                fieldNameOrRefName: fieldNameOrRefName
                            }
                        })];
                });
            });
        };
        /**
         * Gets information on a specific field.
         *
         * @param fieldNameOrRefName - Field simple name or reference name
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getField = function (fieldNameOrRefName, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
                            routeValues: {
                                project: project,
                                fieldNameOrRefName: fieldNameOrRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns information for all fields. The project ID/name parameter is optional.
         *
         * @param project - Project ID or project name
         * @param expand - Use ExtensionFields to include extension fields, otherwise exclude them. Unless the feature flag for this parameter is enabled, extension fields are always included.
         */
        WorkItemTrackingRestClient.prototype.getFields = function (project, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update a field.
         *
         * @param payload - Payload contains desired value of the field's properties
         * @param fieldNameOrRefName - Name/reference name of the field to be updated
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.updateField = function (payload, fieldNameOrRefName, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
                            routeValues: {
                                project: project,
                                fieldNameOrRefName: fieldNameOrRefName
                            },
                            body: payload
                        })];
                });
            });
        };
        /**
         * Creates a query, or moves a query.
         *
         * @param postedQuery - The query to create.
         * @param project - Project ID or project name
         * @param query - The parent id or path under which the query is to be created.
         * @param validateWiqlOnly - If you only want to validate your WIQL query without actually creating one, set it to true. Default is false.
         */
        WorkItemTrackingRestClient.prototype.createQuery = function (postedQuery, project, query, validateWiqlOnly) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        validateWiqlOnly: validateWiqlOnly
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project,
                                query: query
                            },
                            queryParams: queryValues,
                            body: postedQuery
                        })];
                });
            });
        };
        /**
         * Delete a query or a folder. This deletes any permission change on the deleted query or folder and any of its descendants if it is a folder. It is important to note that the deleted permission changes cannot be recovered upon undeleting the query or folder.
         *
         * @param project - Project ID or project name
         * @param query - ID or path of the query or folder to delete.
         */
        WorkItemTrackingRestClient.prototype.deleteQuery = function (project, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project,
                                query: query
                            }
                        })];
                });
            });
        };
        /**
         * Gets the root queries and their children
         *
         * @param project - Project ID or project name
         * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
         * @param depth - In the folder of queries, return child queries and folders to this depth.
         * @param includeDeleted - Include deleted queries and folders
         */
        WorkItemTrackingRestClient.prototype.getQueries = function (project, expand, depth, includeDeleted) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand,
                        '$depth': depth,
                        '$includeDeleted': includeDeleted
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Retrieves an individual query and its children
         *
         * @param project - Project ID or project name
         * @param query - ID or path of the query.
         * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
         * @param depth - In the folder of queries, return child queries and folders to this depth.
         * @param includeDeleted - Include deleted queries and folders
         * @param useIsoDateFormat - DateTime query clauses will be formatted using a ISO 8601 compliant format
         */
        WorkItemTrackingRestClient.prototype.getQuery = function (project, query, expand, depth, includeDeleted, useIsoDateFormat) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand,
                        '$depth': depth,
                        '$includeDeleted': includeDeleted,
                        '$useIsoDateFormat': useIsoDateFormat
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project,
                                query: query
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Searches all queries the user has access to in the current project
         *
         * @param project - Project ID or project name
         * @param filter - The text to filter the queries with.
         * @param top - The number of queries to return (Default is 50 and maximum is 200).
         * @param expand -
         * @param includeDeleted - Include deleted queries and folders
         */
        WorkItemTrackingRestClient.prototype.searchQueries = function (project, filter, top, expand, includeDeleted) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$filter': filter,
                        '$top': top,
                        '$expand': expand,
                        '$includeDeleted': includeDeleted
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update a query or a folder. This allows you to update, rename and move queries and folders.
         *
         * @param queryUpdate - The query to update.
         * @param project - Project ID or project name
         * @param query - The ID or path for the query to update.
         * @param undeleteDescendants - Undelete the children of this folder. It is important to note that this will not bring back the permission changes that were previously applied to the descendants.
         */
        WorkItemTrackingRestClient.prototype.updateQuery = function (queryUpdate, project, query, undeleteDescendants) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$undeleteDescendants': undeleteDescendants
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wit/queries/{*query}",
                            routeValues: {
                                project: project,
                                query: query
                            },
                            queryParams: queryValues,
                            body: queryUpdate
                        })];
                });
            });
        };
        /**
         * Gets a list of queries by ids (Maximum 1000)
         *
         * @param queryGetRequest -
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getQueriesBatch = function (queryGetRequest, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/queriesBatch",
                            routeValues: {
                                project: project
                            },
                            body: queryGetRequest
                        })];
                });
            });
        };
        /**
         * Destroys the specified work item permanently from the Recycle Bin. This action can not be undone.
         *
         * @param id - ID of the work item to be destroyed permanently
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.destroyWorkItem = function (id, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Gets a deleted work item from Recycle Bin.
         *
         * @param id - ID of the work item to be returned
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getDeletedWorkItem = function (id, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Gets the work items from the recycle bin, whose IDs have been specified in the parameters
         *
         * @param ids - Comma separated list of IDs of the deleted work items to be returned
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getDeletedWorkItems = function (ids, project) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ids: ids && ids.join(",")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a list of the IDs and the URLs of the deleted the work items in the Recycle Bin.
         *
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getDeletedWorkItemShallowReferences = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Restores the deleted work item from Recycle Bin.
         *
         * @param payload - Paylod with instructions to update the IsDeleted flag to false
         * @param id - ID of the work item to be restored
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.restoreWorkItem = function (payload, id, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            body: payload
                        })];
                });
            });
        };
        /**
         * Returns a fully hydrated work item for the requested revision
         *
         * @param id -
         * @param revisionNumber -
         * @param project - Project ID or project name
         * @param expand -
         */
        WorkItemTrackingRestClient.prototype.getRevision = function (id, revisionNumber, project, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/revisions/{revisionNumber}",
                            routeValues: {
                                project: project,
                                id: id,
                                revisionNumber: revisionNumber
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns the list of fully hydrated work item revisions, paged.
         *
         * @param id -
         * @param project - Project ID or project name
         * @param top -
         * @param skip -
         * @param expand -
         */
        WorkItemTrackingRestClient.prototype.getRevisions = function (id, project, top, skip, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/revisions/{revisionNumber}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * RESTful method to send mail for selected/queried work items.
         *
         * @param body -
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.sendMail = function (body, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/sendMail",
                            routeValues: {
                                project: project
                            },
                            body: body
                        })];
                });
            });
        };
        /**
         * Creates a template
         *
         * @param template - Template contents
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         */
        WorkItemTrackingRestClient.prototype.createTemplate = function (template, project, team) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/{team}/_apis/wit/templates",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: template
                        })];
                });
            });
        };
        /**
         * Gets template
         *
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param workitemtypename - Optional, When specified returns templates for given Work item type.
         */
        WorkItemTrackingRestClient.prototype.getTemplates = function (project, team, workitemtypename) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        workitemtypename: workitemtypename
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "{project}/{team}/_apis/wit/templates",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Deletes the template with given id
         *
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param templateId - Template id
         */
        WorkItemTrackingRestClient.prototype.deleteTemplate = function (project, team, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
                            routeValues: {
                                project: project,
                                team: team,
                                templateId: templateId
                            }
                        })];
                });
            });
        };
        /**
         * Gets the template with specified id
         *
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param templateId - Template Id
         */
        WorkItemTrackingRestClient.prototype.getTemplate = function (project, team, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
                            routeValues: {
                                project: project,
                                team: team,
                                templateId: templateId
                            }
                        })];
                });
            });
        };
        /**
         * Replace template contents
         *
         * @param templateContent - Template contents to replace with
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param templateId - Template id
         */
        WorkItemTrackingRestClient.prototype.replaceTemplate = function (templateContent, project, team, templateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
                            routeValues: {
                                project: project,
                                team: team,
                                templateId: templateId
                            },
                            body: templateContent
                        })];
                });
            });
        };
        /**
         * Returns a single update for a work item
         *
         * @param id -
         * @param updateNumber -
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getUpdate = function (id, updateNumber, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/updates/{updateNumber}",
                            routeValues: {
                                project: project,
                                id: id,
                                updateNumber: updateNumber
                            }
                        })];
                });
            });
        };
        /**
         * Returns the deltas between work item revisions
         *
         * @param id -
         * @param project - Project ID or project name
         * @param top -
         * @param skip -
         */
        WorkItemTrackingRestClient.prototype.getUpdates = function (id, project, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}/updates/{updateNumber}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the results of the query given its WIQL.
         *
         * @param wiql - The query containing the WIQL.
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param timePrecision - Whether or not to use time precision.
         * @param top - The max number of results to return.
         */
        WorkItemTrackingRestClient.prototype.queryByWiql = function (wiql, project, team, timePrecision, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        timePrecision: timePrecision,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/{team}/_apis/wit/wiql",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            queryParams: queryValues,
                            body: wiql
                        })];
                });
            });
        };
        /**
         * Gets the results of the query given the query ID.
         *
         * @param id - The query ID.
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param timePrecision - Whether or not to use time precision.
         * @param top - The max number of results to return.
         */
        WorkItemTrackingRestClient.prototype.getQueryResultCount = function (id, project, team, timePrecision, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        timePrecision: timePrecision,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "HEAD",
                            routeTemplate: "{project}/{team}/_apis/wit/wiql/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            },
                            queryParams: queryValues,
                            returnRawResponse: true
                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Number(response.headers.get("X-Total-Count"))];
                            });
                        }); })];
                });
            });
        };
        /**
         * Gets the results of the query given the query ID.
         *
         * @param id - The query ID.
         * @param project - Project ID or project name
         * @param team - Team ID or team name
         * @param timePrecision - Whether or not to use time precision.
         * @param top - The max number of results to return.
         */
        WorkItemTrackingRestClient.prototype.queryById = function (id, project, team, timePrecision, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        timePrecision: timePrecision,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/{team}/_apis/wit/wiql/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a work item icon given the friendly name and icon color.
         *
         * @param icon - The name of the icon
         * @param color - The 6-digit hex color for the icon
         * @param v - The version of the icon (used only for cache invalidation)
         */
        WorkItemTrackingRestClient.prototype.getWorkItemIconJson = function (icon, color, v) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        color: color,
                        v: v
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/wit/workItemIcons/{icon}",
                            routeValues: {
                                icon: icon
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of all work item icons.
         *
         */
        WorkItemTrackingRestClient.prototype.getWorkItemIcons = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/wit/workItemIcons/{icon}"
                        })];
                });
            });
        };
        /**
         * Get a work item icon given the friendly name and icon color.
         *
         * @param icon - The name of the icon
         * @param color - The 6-digit hex color for the icon
         * @param v - The version of the icon (used only for cache invalidation)
         */
        WorkItemTrackingRestClient.prototype.getWorkItemIconSvg = function (icon, color, v) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        color: color,
                        v: v
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            httpResponseType: "image/svg+xml",
                            routeTemplate: "_apis/wit/workItemIcons/{icon}",
                            routeValues: {
                                icon: icon
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a work item icon given the friendly name and icon color.
         *
         * @param icon - The name of the icon
         * @param color - The 6-digit hex color for the icon
         * @param v - The version of the icon (used only for cache invalidation)
         */
        WorkItemTrackingRestClient.prototype.getWorkItemIconXaml = function (icon, color, v) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        color: color,
                        v: v
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            httpResponseType: "image/xaml+xml",
                            routeTemplate: "_apis/wit/workItemIcons/{icon}",
                            routeValues: {
                                icon: icon
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a batch of work item links
         *
         * @param project - Project ID or project name
         * @param linkTypes - A list of types to filter the results to specific link types. Omit this parameter to get work item links of all link types.
         * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item links of all work item types.
         * @param continuationToken - Specifies the continuationToken to start the batch from. Omit this parameter to get the first batch of links.
         * @param startDateTime - Date/time to use as a starting point for link changes. Only link changes that occurred after that date/time will be returned. Cannot be used in conjunction with 'watermark' parameter.
         */
        WorkItemTrackingRestClient.prototype.getReportingLinksByLinkType = function (project, linkTypes, types, continuationToken, startDateTime) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        linkTypes: linkTypes && linkTypes.join(","),
                        types: types && types.join(","),
                        continuationToken: continuationToken,
                        startDateTime: startDateTime
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/reporting/workItemLinks",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the work item relation type definition.
         *
         * @param relation - The relation name
         */
        WorkItemTrackingRestClient.prototype.getRelationType = function (relation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "_apis/wit/workItemRelationTypes/{relation}",
                            routeValues: {
                                relation: relation
                            }
                        })];
                });
            });
        };
        /**
         * Gets the work item relation types.
         *
         */
        WorkItemTrackingRestClient.prototype.getRelationTypes = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "_apis/wit/workItemRelationTypes/{relation}"
                        })];
                });
            });
        };
        /**
         * Get a batch of work item revisions with the option of including deleted items
         *
         * @param project - Project ID or project name
         * @param fields - A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
         * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
         * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
         * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
         * @param includeIdentityRef - Return an identity reference instead of a string value for identity fields.
         * @param includeDeleted - Specify if the deleted item should be returned.
         * @param includeTagRef - Specify if the tag objects should be returned for System.Tags field.
         * @param includeLatestOnly - Return only the latest revisions of work items, skipping all historical revisions
         * @param expand - Return all the fields in work item revisions, including long text fields which are not returned by default
         * @param includeDiscussionChangesOnly - Return only the those revisions of work items, where only history field was changed
         * @param maxPageSize - The maximum number of results to return in this batch
         */
        WorkItemTrackingRestClient.prototype.readReportingRevisionsGet = function (project, fields, types, continuationToken, startDateTime, includeIdentityRef, includeDeleted, includeTagRef, includeLatestOnly, expand, includeDiscussionChangesOnly, maxPageSize) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fields: fields && fields.join(","),
                        types: types && types.join(","),
                        continuationToken: continuationToken,
                        startDateTime: startDateTime,
                        includeIdentityRef: includeIdentityRef,
                        includeDeleted: includeDeleted,
                        includeTagRef: includeTagRef,
                        includeLatestOnly: includeLatestOnly,
                        '$expand': expand,
                        includeDiscussionChangesOnly: includeDiscussionChangesOnly,
                        '$maxPageSize': maxPageSize
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/reporting/workItemRevisions",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a batch of work item revisions. This request may be used if your list of fields is large enough that it may run the URL over the length limit.
         *
         * @param filter - An object that contains request settings: field filter, type filter, identity format
         * @param project - Project ID or project name
         * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
         * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
         * @param expand -
         */
        WorkItemTrackingRestClient.prototype.readReportingRevisionsPost = function (filter, project, continuationToken, startDateTime, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        continuationToken: continuationToken,
                        startDateTime: startDateTime,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/reporting/workItemRevisions",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues,
                            body: filter
                        })];
                });
            });
        };
        /**
         * Creates a single work item.
         *
         * @param document - The JSON Patch document representing the work item
         * @param project - Project ID or project name
         * @param type - The work item type of the work item to create
         * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
         * @param bypassRules - Do not enforce the work item type rules on this update
         * @param suppressNotifications - Do not fire any notifications for this change
         * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
         */
        WorkItemTrackingRestClient.prototype.createWorkItem = function (document, project, type, validateOnly, bypassRules, suppressNotifications, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        validateOnly: validateOnly,
                        bypassRules: bypassRules,
                        suppressNotifications: suppressNotifications,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/workItems/${type}",
                            routeValues: {
                                project: project,
                                type: type
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            queryParams: queryValues,
                            body: document
                        })];
                });
            });
        };
        /**
         * Returns a single work item from a template.
         *
         * @param project - Project ID or project name
         * @param type - The work item type name
         * @param fields - Comma-separated list of requested fields
         * @param asOf - AsOf UTC date time string
         * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTemplate = function (project, type, fields, asOf, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fields: fields,
                        asOf: asOf,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/${type}",
                            routeValues: {
                                project: project,
                                type: type
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Deletes the specified work item and sends it to the Recycle Bin, so that it can be restored back, if required. Optionally, if the destroy parameter has been set to true, it destroys the work item permanently. WARNING: If the destroy parameter is set to true, work items deleted by this command will NOT go to recycle-bin and there is no way to restore/recover them after deletion. It is recommended NOT to use this parameter. If you do, please use this parameter with extreme caution.
         *
         * @param id - ID of the work item to be deleted
         * @param project - Project ID or project name
         * @param destroy - Optional parameter, if set to true, the work item is deleted permanently. Please note: the destroy action is PERMANENT and cannot be undone.
         */
        WorkItemTrackingRestClient.prototype.deleteWorkItem = function (id, project, destroy) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        destroy: destroy
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns a single work item.
         *
         * @param id - The work item id
         * @param project - Project ID or project name
         * @param fields - Comma-separated list of requested fields
         * @param asOf - AsOf UTC date time string
         * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
         */
        WorkItemTrackingRestClient.prototype.getWorkItem = function (id, project, fields, asOf, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        fields: fields && fields.join(","),
                        asOf: asOf,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns a list of work items (Maximum 200)
         *
         * @param ids - The comma-separated list of requested work item ids. (Maximum 200 ids allowed).
         * @param project - Project ID or project name
         * @param fields - Comma-separated list of requested fields
         * @param asOf - AsOf UTC date time string
         * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
         * @param errorPolicy - The flag to control error policy in a bulk get work items request. Possible options are \{Fail, Omit\}.
         */
        WorkItemTrackingRestClient.prototype.getWorkItems = function (ids, project, fields, asOf, expand, errorPolicy) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ids: ids && ids.join(","),
                        fields: fields && fields.join(","),
                        asOf: asOf,
                        '$expand': expand,
                        errorPolicy: errorPolicy
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates a single work item.
         *
         * @param document - The JSON Patch document representing the update
         * @param id - The id of the work item to update
         * @param project - Project ID or project name
         * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
         * @param bypassRules - Do not enforce the work item type rules on this update
         * @param suppressNotifications - Do not fire any notifications for this change
         * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
         */
        WorkItemTrackingRestClient.prototype.updateWorkItem = function (document, id, project, validateOnly, bypassRules, suppressNotifications, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        validateOnly: validateOnly,
                        bypassRules: bypassRules,
                        suppressNotifications: suppressNotifications,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wit/workItems/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            customHeaders: {
                                "Content-Type": "application/json-patch+json",
                            },
                            queryParams: queryValues,
                            body: document
                        })];
                });
            });
        };
        /**
         * Gets work items for a list of work item ids (Maximum 200)
         *
         * @param workItemGetRequest -
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemsBatch = function (workItemGetRequest, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/workItemsBatch",
                            routeValues: {
                                project: project
                            },
                            body: workItemGetRequest
                        })];
                });
            });
        };
        /**
         * INTERNAL ONLY: It will be used for My account work experience. Get the work item type state color for multiple projects
         *
         * @param projectNames -
         */
        WorkItemTrackingRestClient.prototype.getWorkItemStateColors = function (projectNames) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/workitemStateColor",
                            body: projectNames
                        })];
                });
            });
        };
        /**
         * Returns the next state on the given work item IDs.
         *
         * @param ids - list of work item ids
         * @param action - possible actions. Currently only supports checkin
         */
        WorkItemTrackingRestClient.prototype.getWorkItemNextStatesOnCheckinAction = function (ids, action) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        ids: ids && ids.join(","),
                        action: action
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "_apis/wit/workItemTransitions",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get all work item type categories.
         *
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeCategories = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItemTypeCategories/{category}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Get specific work item type category by name.
         *
         * @param project - Project ID or project name
         * @param category - The category name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeCategory = function (project, category) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItemTypeCategories/{category}",
                            routeValues: {
                                project: project,
                                category: category
                            }
                        })];
                });
            });
        };
        /**
         * INTERNAL ONLY: It will be used for My account work experience. Get the wit type color for multiple projects
         *
         * @param projectNames -
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeColors = function (projectNames) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/workitemTypeColor",
                            body: projectNames
                        })];
                });
            });
        };
        /**
         * INTERNAL ONLY: It is used for color and icon providers. Get the wit type color for multiple projects
         *
         * @param projectNames -
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeColorAndIcons = function (projectNames) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/wit/workItemTypeColorAndIcon",
                            body: projectNames
                        })];
                });
            });
        };
        /**
         * Returns a work item type definition.
         *
         * @param project - Project ID or project name
         * @param type - Work item type name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemType = function (project, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItemTypes/{type}",
                            routeValues: {
                                project: project,
                                type: type
                            }
                        })];
                });
            });
        };
        /**
         * Returns the list of work item types
         *
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypes = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.2",
                            routeTemplate: "{project}/_apis/wit/workItemTypes/{type}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of fields for a work item type with detailed references.
         *
         * @param project - Project ID or project name
         * @param type - Work item type.
         * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeFieldsWithReferences = function (project, type, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/fields/{field}",
                            routeValues: {
                                project: project,
                                type: type
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a field for a work item type with detailed references.
         *
         * @param project - Project ID or project name
         * @param type - Work item type.
         * @param field -
         * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeFieldWithReferences = function (project, type, field, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.3",
                            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/fields/{field}",
                            routeValues: {
                                project: project,
                                type: type,
                                field: field
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns the state names and colors for a work item type.
         *
         * @param project - Project ID or project name
         * @param type - The state name
         */
        WorkItemTrackingRestClient.prototype.getWorkItemTypeStates = function (project, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/states",
                            routeValues: {
                                project: project,
                                type: type
                            }
                        })];
                });
            });
        };
        /**
         * Export work item type
         *
         * @param project - Project ID or project name
         * @param type -
         * @param exportGlobalLists -
         */
        WorkItemTrackingRestClient.prototype.exportWorkItemTypeDefinition = function (project, type, exportGlobalLists) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        exportGlobalLists: exportGlobalLists
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            routeTemplate: "{project}/_apis/wit/workItemTypeTemplate/{type}",
                            routeValues: {
                                project: project,
                                type: type
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Add/updates a work item type
         *
         * @param updateModel -
         * @param project - Project ID or project name
         */
        WorkItemTrackingRestClient.prototype.updateWorkItemTypeDefinition = function (updateModel, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.0-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wit/workItemTypeTemplate/{type}",
                            routeValues: {
                                project: project
                            },
                            body: updateModel
                        })];
                });
            });
        };
        WorkItemTrackingRestClient.RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";
        return WorkItemTrackingRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.WorkItemTrackingRestClient = WorkItemTrackingRestClient;
});
