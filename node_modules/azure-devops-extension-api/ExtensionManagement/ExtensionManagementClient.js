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
    var ExtensionManagementRestClient = /** @class */ (function (_super) {
        __extends(ExtensionManagementRestClient, _super);
        function ExtensionManagementRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * This API is called by acquisition/install page to get possible user actions like Buy/Request
         *
         * @param itemId - Fully qualified name of extension (\<publisher_id\>.\<extension_id\>)
         * @param testCommerce - Parameter to test paid preview extension without making azure plans public
         * @param isFreeOrTrialInstall - Parameter represents install or trial workflow (required for legacy install flows)
         * @param isAccountOwner - Parameter represents whether user is owner or PCA of an account
         * @param isLinked - Parameter represents whether account is linked with a subscription
         * @param isConnectedServer - Parameter represents whether Buy operation should be evaluated
         * @param isBuyOperationValid -
         */
        ExtensionManagementRestClient.prototype.getAcquisitionOptions = function (itemId, testCommerce, isFreeOrTrialInstall, isAccountOwner, isLinked, isConnectedServer, isBuyOperationValid) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        itemId: itemId,
                        testCommerce: testCommerce,
                        isFreeOrTrialInstall: isFreeOrTrialInstall,
                        isAccountOwner: isAccountOwner,
                        isLinked: isLinked,
                        isConnectedServer: isConnectedServer,
                        isBuyOperationValid: isBuyOperationValid
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/AcquisitionOptions",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param acquisitionRequest -
         */
        ExtensionManagementRestClient.prototype.requestAcquisition = function (acquisitionRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/AcquisitionRequests",
                            body: acquisitionRequest
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         */
        ExtensionManagementRestClient.prototype.getAuditLog = function (publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/AuditLog/{publisherName}/{extensionName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param registrationId -
         */
        ExtensionManagementRestClient.prototype.registerAuthorization = function (publisherName, extensionName, registrationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Authorizations/{registrationId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                registrationId: registrationId
                            }
                        })];
                });
            });
        };
        /**
         * @param doc -
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         */
        ExtensionManagementRestClient.prototype.createDocumentByName = function (doc, publisherName, extensionName, scopeType, scopeValue, collectionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName
                            },
                            body: doc
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         * @param documentId -
         */
        ExtensionManagementRestClient.prototype.deleteDocumentByName = function (publisherName, extensionName, scopeType, scopeValue, collectionName, documentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName,
                                documentId: documentId
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         * @param documentId -
         */
        ExtensionManagementRestClient.prototype.getDocumentByName = function (publisherName, extensionName, scopeType, scopeValue, collectionName, documentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName,
                                documentId: documentId
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         */
        ExtensionManagementRestClient.prototype.getDocumentsByName = function (publisherName, extensionName, scopeType, scopeValue, collectionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName
                            }
                        })];
                });
            });
        };
        /**
         * @param doc -
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         */
        ExtensionManagementRestClient.prototype.setDocumentByName = function (doc, publisherName, extensionName, scopeType, scopeValue, collectionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName
                            },
                            body: doc
                        })];
                });
            });
        };
        /**
         * @param doc -
         * @param publisherName -
         * @param extensionName -
         * @param scopeType -
         * @param scopeValue -
         * @param collectionName -
         */
        ExtensionManagementRestClient.prototype.updateDocumentByName = function (doc, publisherName, extensionName, scopeType, scopeValue, collectionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                scopeType: scopeType,
                                scopeValue: scopeValue,
                                collectionName: collectionName
                            },
                            body: doc
                        })];
                });
            });
        };
        /**
         * Query for one or more data collections for the specified extension.  Note: the token used for authorization must have been issued on behalf of the specified extension.
         *
         * @param collectionQuery -
         * @param publisherName - Name of the publisher. Example: "fabrikam".
         * @param extensionName - Name of the extension. Example: "ops-tools".
         */
        ExtensionManagementRestClient.prototype.queryCollectionsByName = function (collectionQuery, publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/ExtensionDataCollectionQuery",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            body: collectionQuery
                        })];
                });
            });
        };
        /**
         * List state and version information for all installed extensions.
         *
         * @param includeDisabled - If true (the default), include disabled extensions in the results.
         * @param includeErrors - If true, include installed extensions in an error state in the results.
         * @param includeInstallationIssues -
         * @param forceRefresh -
         */
        ExtensionManagementRestClient.prototype.getStates = function (includeDisabled, includeErrors, includeInstallationIssues, forceRefresh) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        includeDisabled: includeDisabled,
                        includeErrors: includeErrors,
                        includeInstallationIssues: includeInstallationIssues,
                        forceRefresh: forceRefresh
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/ExtensionManagement/ExtensionStates",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param query -
         */
        ExtensionManagementRestClient.prototype.queryExtensions = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionQuery",
                            body: query
                        })];
                });
            });
        };
        /**
         * List the installed extensions in the account / project collection.
         *
         * @param includeDisabledExtensions - If true (the default), include disabled extensions in the results.
         * @param includeErrors - If true, include installed extensions with errors.
         * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
         * @param includeInstallationIssues -
         */
        ExtensionManagementRestClient.prototype.getInstalledExtensions = function (includeDisabledExtensions, includeErrors, assetTypes, includeInstallationIssues) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        includeDisabledExtensions: includeDisabledExtensions,
                        includeErrors: includeErrors,
                        assetTypes: assetTypes && assetTypes.join(":"),
                        includeInstallationIssues: includeInstallationIssues
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{extensionId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update an installed extension. Typically this API is used to enable or disable an extension.
         *
         * @param extension -
         */
        ExtensionManagementRestClient.prototype.updateInstalledExtension = function (extension) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{extensionId}",
                            body: extension
                        })];
                });
            });
        };
        /**
         * Get an installed extension by its publisher and extension name.
         *
         * @param publisherName - Name of the publisher. Example: "fabrikam".
         * @param extensionName - Name of the extension. Example: "ops-tools".
         * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
         */
        ExtensionManagementRestClient.prototype.getInstalledExtensionByName = function (publisherName, extensionName, assetTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        assetTypes: assetTypes && assetTypes.join(":")
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Install the specified extension into the account / project collection.
         *
         * @param publisherName - Name of the publisher. Example: "fabrikam".
         * @param extensionName - Name of the extension. Example: "ops-tools".
         * @param version -
         */
        ExtensionManagementRestClient.prototype.installExtensionByName = function (publisherName, extensionName, version) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version
                            }
                        })];
                });
            });
        };
        /**
         * Uninstall the specified extension from the account / project collection.
         *
         * @param publisherName - Name of the publisher. Example: "fabrikam".
         * @param extensionName - Name of the extension. Example: "ops-tools".
         * @param reason -
         * @param reasonCode -
         */
        ExtensionManagementRestClient.prototype.uninstallExtensionByName = function (publisherName, extensionName, reason, reasonCode) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        reason: reason,
                        reasonCode: reasonCode
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param userId -
         */
        ExtensionManagementRestClient.prototype.getPolicies = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/Policies/{userId}",
                            routeValues: {
                                userId: userId
                            }
                        })];
                });
            });
        };
        /**
         * @param rejectMessage -
         * @param publisherName -
         * @param extensionName -
         * @param requesterId -
         * @param state -
         */
        ExtensionManagementRestClient.prototype.resolveRequest = function (rejectMessage, publisherName, extensionName, requesterId, state) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        state: state
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/{requesterId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                requesterId: requesterId
                            },
                            queryParams: queryValues,
                            body: rejectMessage
                        })];
                });
            });
        };
        /**
         */
        ExtensionManagementRestClient.prototype.getRequests = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions"
                        })];
                });
            });
        };
        /**
         * @param rejectMessage -
         * @param publisherName -
         * @param extensionName -
         * @param state -
         */
        ExtensionManagementRestClient.prototype.resolveAllRequests = function (rejectMessage, publisherName, extensionName, state) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        state: state
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            queryParams: queryValues,
                            body: rejectMessage
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         */
        ExtensionManagementRestClient.prototype.deleteRequest = function (publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/me",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param requestMessage -
         */
        ExtensionManagementRestClient.prototype.requestExtension = function (publisherName, extensionName, requestMessage) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/me",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            body: requestMessage
                        })];
                });
            });
        };
        /**
         */
        ExtensionManagementRestClient.prototype.getToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/ExtensionManagement/Token"
                        })];
                });
            });
        };
        ExtensionManagementRestClient.RESOURCE_AREA_ID = "6c2b0933-3600-42ae-bf8b-93d4f7e83594";
        return ExtensionManagementRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.ExtensionManagementRestClient = ExtensionManagementRestClient;
});
