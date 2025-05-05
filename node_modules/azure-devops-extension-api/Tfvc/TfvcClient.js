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
    var TfvcRestClient = /** @class */ (function (_super) {
        __extends(TfvcRestClient, _super);
        function TfvcRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Get a single branch hierarchy at the given path with parents or children as specified.
         *
         * @param path - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
         * @param project - Project ID or project name
         * @param includeParent - Return the parent branch, if there is one. Default: False
         * @param includeChildren - Return child branches, if there are any. Default: False
         */
        TfvcRestClient.prototype.getBranch = function (path, project, includeParent, includeChildren) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        includeParent: includeParent,
                        includeChildren: includeChildren
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a collection of branch roots -- first-level children, branches with no parents.
         *
         * @param project - Project ID or project name
         * @param includeParent - Return the parent branch, if there is one. Default: False
         * @param includeChildren - Return the child branches for each root branch. Default: False
         * @param includeDeleted - Return deleted branches. Default: False
         * @param includeLinks - Return links. Default: False
         */
        TfvcRestClient.prototype.getBranches = function (project, includeParent, includeChildren, includeDeleted, includeLinks) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        includeParent: includeParent,
                        includeChildren: includeChildren,
                        includeDeleted: includeDeleted,
                        includeLinks: includeLinks
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get branch hierarchies below the specified scopePath
         *
         * @param scopePath - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
         * @param project - Project ID or project name
         * @param includeDeleted - Return deleted branches. Default: False
         * @param includeLinks - Return links. Default: False
         */
        TfvcRestClient.prototype.getBranchRefs = function (scopePath, project, includeDeleted, includeLinks) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scopePath: scopePath,
                        includeDeleted: includeDeleted,
                        includeLinks: includeLinks
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Retrieve Tfvc changes for a given changeset.
         *
         * @param id - ID of the changeset. Default: null
         * @param skip - Number of results to skip. Default: null
         * @param top - The maximum number of results to return. Default: null
         */
        TfvcRestClient.prototype.getChangesetChanges = function (id, skip, top) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$skip': skip,
                        '$top': top
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/changesets/{id}/changes",
                            routeValues: {
                                id: id
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
         * Create a new changeset.
         *
         * @param changeset -
         * @param project - Project ID or project name
         */
        TfvcRestClient.prototype.createChangeset = function (changeset, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
                            routeValues: {
                                project: project
                            },
                            body: changeset
                        })];
                });
            });
        };
        /**
         * Retrieve a Tfvc Changeset
         *
         * @param id - Changeset Id to retrieve.
         * @param project - Project ID or project name
         * @param maxChangeCount - Number of changes to return (maximum 100 changes) Default: 0
         * @param includeDetails - Include policy details and check-in notes in the response. Default: false
         * @param includeWorkItems - Include workitems. Default: false
         * @param maxCommentLength - Include details about associated work items in the response. Default: null
         * @param includeSourceRename - Include renames.  Default: false
         * @param skip - Number of results to skip. Default: null
         * @param top - The maximum number of results to return. Default: null
         * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
         * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
         */
        TfvcRestClient.prototype.getChangeset = function (id, project, maxChangeCount, includeDetails, includeWorkItems, maxCommentLength, includeSourceRename, skip, top, orderby, searchCriteria) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        maxChangeCount: maxChangeCount,
                        includeDetails: includeDetails,
                        includeWorkItems: includeWorkItems,
                        maxCommentLength: maxCommentLength,
                        includeSourceRename: includeSourceRename,
                        '$skip': skip,
                        '$top': top,
                        '$orderby': orderby,
                        searchCriteria: searchCriteria
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
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
         * Retrieve Tfvc Changesets
         *
         * @param project - Project ID or project name
         * @param maxCommentLength - Include details about associated work items in the response. Default: null
         * @param skip - Number of results to skip. Default: null
         * @param top - The maximum number of results to return. Default: null
         * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
         * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
         */
        TfvcRestClient.prototype.getChangesets = function (project, maxCommentLength, skip, top, orderby, searchCriteria) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        maxCommentLength: maxCommentLength,
                        '$skip': skip,
                        '$top': top,
                        '$orderby': orderby,
                        searchCriteria: searchCriteria
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns changesets for a given list of changeset Ids.
         *
         * @param changesetsRequestData - List of changeset IDs.
         */
        TfvcRestClient.prototype.getBatchedChangesets = function (changesetsRequestData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/tfvc/ChangesetsBatch",
                            body: changesetsRequestData
                        })];
                });
            });
        };
        /**
         * Retrieves the work items associated with a particular changeset.
         *
         * @param id - ID of the changeset.
         */
        TfvcRestClient.prototype.getChangesetWorkItems = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/changesets/{id}/workItems",
                            routeValues: {
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
         *
         * @param itemRequestData -
         * @param project - Project ID or project name
         */
        TfvcRestClient.prototype.getItemsBatch = function (itemRequestData, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/tfvc/ItemBatch",
                            routeValues: {
                                project: project
                            },
                            body: itemRequestData
                        })];
                });
            });
        };
        /**
         * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
         *
         * @param itemRequestData -
         * @param project - Project ID or project name
         */
        TfvcRestClient.prototype.getItemsBatchZip = function (itemRequestData, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/tfvc/ItemBatch",
                            routeValues: {
                                project: project
                            },
                            body: itemRequestData
                        })];
                });
            });
        };
        /**
         * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
         *
         * @param path - Version control path of an individual item to return.
         * @param project - Project ID or project name
         * @param fileName - file name of item returned.
         * @param download - If true, create a downloadable attachment.
         * @param scopePath - Version control path of a folder to return multiple items.
         * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
         * @param versionDescriptor - Version descriptor.  Default is null.
         * @param includeContent - Set to true to include item content when requesting json.  Default is false.
         */
        TfvcRestClient.prototype.getItem = function (path, project, fileName, download, scopePath, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        fileName: fileName,
                        download: download,
                        scopePath: scopePath,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
         *
         * @param path - Version control path of an individual item to return.
         * @param project - Project ID or project name
         * @param fileName - file name of item returned.
         * @param download - If true, create a downloadable attachment.
         * @param scopePath - Version control path of a folder to return multiple items.
         * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
         * @param versionDescriptor - Version descriptor.  Default is null.
         * @param includeContent - Set to true to include item content when requesting json.  Default is false.
         */
        TfvcRestClient.prototype.getItemContent = function (path, project, fileName, download, scopePath, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        fileName: fileName,
                        download: download,
                        scopePath: scopePath,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of Tfvc items
         *
         * @param project - Project ID or project name
         * @param scopePath - Version control path of a folder to return multiple items.
         * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
         * @param includeLinks - True to include links.
         * @param versionDescriptor -
         */
        TfvcRestClient.prototype.getItems = function (project, scopePath, recursionLevel, includeLinks, versionDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scopePath: scopePath,
                        recursionLevel: recursionLevel,
                        includeLinks: includeLinks,
                        versionDescriptor: versionDescriptor
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
         *
         * @param path - Version control path of an individual item to return.
         * @param project - Project ID or project name
         * @param fileName - file name of item returned.
         * @param download - If true, create a downloadable attachment.
         * @param scopePath - Version control path of a folder to return multiple items.
         * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
         * @param versionDescriptor - Version descriptor.  Default is null.
         * @param includeContent - Set to true to include item content when requesting json.  Default is false.
         */
        TfvcRestClient.prototype.getItemText = function (path, project, fileName, download, scopePath, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        fileName: fileName,
                        download: download,
                        scopePath: scopePath,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "text/plain",
                            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
         *
         * @param path - Version control path of an individual item to return.
         * @param project - Project ID or project name
         * @param fileName - file name of item returned.
         * @param download - If true, create a downloadable attachment.
         * @param scopePath - Version control path of a folder to return multiple items.
         * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
         * @param versionDescriptor - Version descriptor.  Default is null.
         * @param includeContent - Set to true to include item content when requesting json.  Default is false.
         */
        TfvcRestClient.prototype.getItemZip = function (path, project, fileName, download, scopePath, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        fileName: fileName,
                        download: download,
                        scopePath: scopePath,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get items under a label.
         *
         * @param labelId - Unique identifier of label
         * @param top - Max number of items to return
         * @param skip - Number of items to skip
         */
        TfvcRestClient.prototype.getLabelItems = function (labelId, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/labels/{labelId}/items",
                            routeValues: {
                                labelId: labelId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a single deep label.
         *
         * @param labelId - Unique identifier of label
         * @param requestData - maxItemCount
         * @param project - Project ID or project name
         */
        TfvcRestClient.prototype.getLabel = function (labelId, requestData, project) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        requestData: requestData
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Labels/{labelId}",
                            routeValues: {
                                project: project,
                                labelId: labelId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a collection of shallow label references.
         *
         * @param requestData - labelScope, name, owner, and itemLabelFilter
         * @param project - Project ID or project name
         * @param top - Max number of labels to return, defaults to 100 when undefined
         * @param skip - Number of labels to skip
         */
        TfvcRestClient.prototype.getLabels = function (requestData, project, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        requestData: requestData,
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/Labels/{labelId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get changes included in a shelveset.
         *
         * @param shelvesetId - Shelveset's unique ID
         * @param top - Max number of changes to return
         * @param skip - Number of changes to skip
         */
        TfvcRestClient.prototype.getShelvesetChanges = function (shelvesetId, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        shelvesetId: shelvesetId,
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/shelvesets/changes",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a single deep shelveset.
         *
         * @param shelvesetId - Shelveset's unique ID
         * @param requestData - includeDetails, includeWorkItems, maxChangeCount, and maxCommentLength
         */
        TfvcRestClient.prototype.getShelveset = function (shelvesetId, requestData) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        shelvesetId: shelvesetId,
                        requestData: requestData
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/shelvesets",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Return a collection of shallow shelveset references.
         *
         * @param requestData - name, owner, and maxCommentLength
         * @param top - Max number of shelvesets to return
         * @param skip - Number of shelvesets to skip
         */
        TfvcRestClient.prototype.getShelvesets = function (requestData, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        requestData: requestData,
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/shelvesets",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get work items associated with a shelveset.
         *
         * @param shelvesetId - Shelveset's unique ID
         */
        TfvcRestClient.prototype.getShelvesetWorkItems = function (shelvesetId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        shelvesetId: shelvesetId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/tfvc/shelvesets/workitems",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Provides File Count and Uncompressed Bytes for a Collection/Project at a particular scope for TFVC.
         *
         * @param project - Project ID or project name
         * @param scopePath - '$/' for collection, '$/project' for specific project
         */
        TfvcRestClient.prototype.getTfvcStatistics = function (project, scopePath) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scopePath: scopePath
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/tfvc/stats",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        TfvcRestClient.RESOURCE_AREA_ID = "8aa40520-446d-40e6-89f6-9c9f9ce44c48";
        return TfvcRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.TfvcRestClient = TfvcRestClient;
});
