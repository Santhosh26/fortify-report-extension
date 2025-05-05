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
    var WikiRestClient = /** @class */ (function (_super) {
        __extends(WikiRestClient, _super);
        function WikiRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Uploads an attachment on a comment on a wiki page.
         *
         * @param content - Content to upload
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         */
        WikiRestClient.prototype.createCommentAttachment = function (content, project, wikiIdentifier, pageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/attachments/{attachmentId}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                            },
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * Downloads an attachment on a comment on a wiki page.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param attachmentId - Attachment ID.
         */
        WikiRestClient.prototype.getAttachmentContent = function (project, wikiIdentifier, pageId, attachmentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/attachments/{attachmentId}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                attachmentId: attachmentId
                            }
                        })];
                });
            });
        };
        /**
         * Add a reaction on a wiki page comment.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name
         * @param pageId - Wiki page ID
         * @param commentId - ID of the associated comment
         * @param type - Type of the reaction being added
         */
        WikiRestClient.prototype.addCommentReaction = function (project, wikiIdentifier, pageId, commentId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                commentId: commentId,
                                type: type
                            }
                        })];
                });
            });
        };
        /**
         * Delete a reaction on a wiki page comment.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or name
         * @param pageId - Wiki page ID
         * @param commentId - ID of the associated comment
         * @param type - Type of the reaction being deleted
         */
        WikiRestClient.prototype.deleteCommentReaction = function (project, wikiIdentifier, pageId, commentId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                commentId: commentId,
                                type: type
                            }
                        })];
                });
            });
        };
        /**
         * Gets a list of users who have reacted for the given wiki comment with a given reaction type. Supports paging, with a default page size of 100 users at a time.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param commentId - ID of the associated comment
         * @param type - Type of the reaction for which the engaged users are being requested
         * @param top - Number of enagaged users to be returned in a given page. Optional, defaults to 100
         * @param skip - Number of engaged users to be skipped to page the next set of engaged users, defaults to 0
         */
        WikiRestClient.prototype.getEngagedUsers = function (project, wikiIdentifier, pageId, commentId, type, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}/users",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                commentId: commentId,
                                type: type
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Add a comment on a wiki page.
         *
         * @param request - Comment create request.
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         */
        WikiRestClient.prototype.addComment = function (request, project, wikiIdentifier, pageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId
                            },
                            body: request
                        })];
                });
            });
        };
        /**
         * Delete a comment on a wiki page.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or name.
         * @param pageId - Wiki page ID.
         * @param id - Comment ID.
         */
        WikiRestClient.prototype.deleteComment = function (project, wikiIdentifier, pageId, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Returns a comment associated with the Wiki Page.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param id - ID of the comment to return.
         * @param excludeDeleted - Specify if the deleted comment should be skipped.
         * @param expand - Specifies the additional data retrieval options for comments.
         */
        WikiRestClient.prototype.getComment = function (project, wikiIdentifier, pageId, id, excludeDeleted, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        excludeDeleted: excludeDeleted,
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns a pageable list of comments.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param top - Max number of comments to return.
         * @param continuationToken - Used to query for the next page of comments.
         * @param excludeDeleted - Specify if the deleted comments should be skipped.
         * @param expand - Specifies the additional data retrieval options for comments.
         * @param order - Order in which the comments should be returned.
         * @param parentId - CommentId of the parent comment.
         */
        WikiRestClient.prototype.listComments = function (project, wikiIdentifier, pageId, top, continuationToken, excludeDeleted, expand, order, parentId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        continuationToken: continuationToken,
                        excludeDeleted: excludeDeleted,
                        '$expand': expand,
                        order: order,
                        parentId: parentId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update a comment on a wiki page.
         *
         * @param comment - Comment update request.
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param id - Comment ID.
         */
        WikiRestClient.prototype.updateComment = function (comment, project, wikiIdentifier, pageId, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId,
                                id: id
                            },
                            body: comment
                        })];
                });
            });
        };
        /**
         * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param path - Wiki page path.
         * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
         * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
         * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
         */
        WikiRestClient.prototype.getPageText = function (project, wikiIdentifier, path, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            httpResponseType: "text/plain",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{*path}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param path - Wiki page path.
         * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
         * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
         * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
         */
        WikiRestClient.prototype.getPageZip = function (project, wikiIdentifier, path, recursionLevel, versionDescriptor, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        path: path,
                        recursionLevel: recursionLevel,
                        versionDescriptor: versionDescriptor,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{*path}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name..
         * @param id - Wiki page ID.
         * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
         * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
         */
        WikiRestClient.prototype.getPageByIdText = function (project, wikiIdentifier, id, recursionLevel, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        recursionLevel: recursionLevel,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            httpResponseType: "text/plain",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name..
         * @param id - Wiki page ID.
         * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
         * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
         */
        WikiRestClient.prototype.getPageByIdZip = function (project, wikiIdentifier, id, recursionLevel, includeContent) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        recursionLevel: recursionLevel,
                        includeContent: includeContent
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            httpResponseType: "application/zip",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{id}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns pageable list of Wiki Pages
         *
         * @param pagesBatchRequest - Wiki batch page request.
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param versionDescriptor - GitVersionDescriptor for the page. (Optional in case of ProjectWiki).
         */
        WikiRestClient.prototype.getPagesBatch = function (pagesBatchRequest, project, wikiIdentifier, versionDescriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        versionDescriptor: versionDescriptor
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pagesBatch",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            },
                            queryParams: queryValues,
                            body: pagesBatchRequest,
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
         * Returns page detail corresponding to Page ID.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param pageId - Wiki page ID.
         * @param pageViewsForDays - last N days from the current day for which page views is to be returned. It's inclusive of current day.
         */
        WikiRestClient.prototype.getPageData = function (project, wikiIdentifier, pageId, pageViewsForDays) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        pageViewsForDays: pageViewsForDays
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/stats",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier,
                                pageId: pageId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Creates a new page view stats resource or updates an existing page view stats resource.
         *
         * @param project - Project ID or project name
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param wikiVersion - Wiki version.
         * @param path - Wiki page path.
         * @param oldPath - Old page path. This is optional and required to rename path in existing page view stats.
         */
        WikiRestClient.prototype.createOrUpdatePageViewStats = function (project, wikiIdentifier, wikiVersion, path, oldPath) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        wikiVersion: wikiVersion,
                        path: path,
                        oldPath: oldPath
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pageViewStats/{*path}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Creates the wiki resource.
         *
         * @param wikiCreateParams - Parameters for the wiki creation.
         * @param project - Project ID or project name
         */
        WikiRestClient.prototype.createWiki = function (wikiCreateParams, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
                            routeValues: {
                                project: project
                            },
                            body: wikiCreateParams
                        })];
                });
            });
        };
        /**
         * Deletes the wiki corresponding to the wiki ID or wiki name provided.
         *
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param project - Project ID or project name
         */
        WikiRestClient.prototype.deleteWiki = function (wikiIdentifier, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            }
                        })];
                });
            });
        };
        /**
         * Gets all wikis in a project or collection.
         *
         * @param project - Project ID or project name
         */
        WikiRestClient.prototype.getAllWikis = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.2",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Gets the wiki corresponding to the wiki ID or wiki name provided.
         *
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param project - Project ID or project name
         */
        WikiRestClient.prototype.getWiki = function (wikiIdentifier, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.2",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            }
                        })];
                });
            });
        };
        /**
         * Updates the wiki corresponding to the wiki ID or wiki name provided using the update parameters.
         *
         * @param updateParameters - Update parameters.
         * @param wikiIdentifier - Wiki ID or wiki name.
         * @param project - Project ID or project name
         */
        WikiRestClient.prototype.updateWiki = function (updateParameters, wikiIdentifier, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
                            routeValues: {
                                project: project,
                                wikiIdentifier: wikiIdentifier
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        WikiRestClient.RESOURCE_AREA_ID = "bf7d82a0-8aa5-4613-94ef-6172a5ea01f3";
        return WikiRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.WikiRestClient = WikiRestClient;
});
