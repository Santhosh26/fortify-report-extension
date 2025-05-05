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
    var FileContainerRestClient = /** @class */ (function (_super) {
        __extends(FileContainerRestClient, _super);
        function FileContainerRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Creates the specified items in the referenced container.
         *
         * @param items -
         * @param containerId -
         * @param scope - A guid representing the scope of the container. This is often the project id.
         */
        FileContainerRestClient.prototype.createItems = function (items, containerId, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scope: scope
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            method: "POST",
                            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
                            routeValues: {
                                containerId: containerId
                            },
                            queryParams: queryValues,
                            body: items
                        })];
                });
            });
        };
        /**
         * Deletes the specified items in a container.
         *
         * @param containerId - Container Id.
         * @param itemPath - Path to delete.
         * @param scope - A guid representing the scope of the container. This is often the project id.
         */
        FileContainerRestClient.prototype.deleteItem = function (containerId, itemPath, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        itemPath: itemPath,
                        scope: scope
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            method: "DELETE",
                            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
                            routeValues: {
                                containerId: containerId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets containers filtered by a comma separated list of artifact uris within the same scope, if not specified returns all containers
         *
         * @param scope - A guid representing the scope of the container. This is often the project id.
         * @param artifactUris -
         */
        FileContainerRestClient.prototype.getContainers = function (scope, artifactUris) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scope: scope,
                        artifactUris: artifactUris
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets the specified file container object in a format dependent upon the given parameters or HTTP Accept request header
         *
         * @param containerId - The requested container Id
         * @param scope - A guid representing the scope of the container. This is often the project id.
         * @param itemPath - The path to the item of interest
         * @param metadata - If true, this overrides any specified format parameter or HTTP Accept request header to provide non-recursive information for the given itemPath
         * @param format - If specified, this overrides the HTTP Accept request header to return either 'json' or 'zip'.  If $format is specified, then api-version should also be specified as a query parameter.
         * @param downloadFileName - If specified and returning other than JSON format, then this download name will be used (else defaults to itemPath)
         * @param includeDownloadTickets -
         * @param isShallow - If true, returns only immediate children(files & folders) for the given itemPath. False will return all items recursively within itemPath.
         * @param ignoreRequestedMediaType - Set to true to ignore the HTTP Accept request header. Default is false.
         * @param includeBlobMetadata -
         * @param saveAbsolutePath - Set to false to not save the absolute path to the specified directory of the artifact in the returned archive. Works only for artifact directories. Default is true.
         * @param preferRedirect - Set to true to get the redirect response which leads to the stream with content. Default is false.
         */
        FileContainerRestClient.prototype.getItems = function (containerId, scope, itemPath, metadata, format, downloadFileName, includeDownloadTickets, isShallow, ignoreRequestedMediaType, includeBlobMetadata, saveAbsolutePath, preferRedirect) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        scope: scope,
                        itemPath: itemPath,
                        metadata: metadata,
                        '$format': format,
                        downloadFileName: downloadFileName,
                        includeDownloadTickets: includeDownloadTickets,
                        isShallow: isShallow,
                        ignoreRequestedMediaType: ignoreRequestedMediaType,
                        includeBlobMetadata: includeBlobMetadata,
                        saveAbsolutePath: saveAbsolutePath,
                        preferRedirect: preferRedirect
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.4",
                            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
                            routeValues: {
                                containerId: containerId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        return FileContainerRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.FileContainerRestClient = FileContainerRestClient;
});
