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
    var GalleryRestClient = /** @class */ (function (_super) {
        __extends(GalleryRestClient, _super);
        function GalleryRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * @param extensionId -
         * @param accountName -
         */
        GalleryRestClient.prototype.shareExtensionById = function (extensionId, accountName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}/accounts/{accountName}",
                            routeValues: {
                                extensionId: extensionId,
                                accountName: accountName
                            }
                        })];
                });
            });
        };
        /**
         * @param extensionId -
         * @param accountName -
         */
        GalleryRestClient.prototype.unshareExtensionById = function (extensionId, accountName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}/accounts/{accountName}",
                            routeValues: {
                                extensionId: extensionId,
                                accountName: accountName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param accountName -
         */
        GalleryRestClient.prototype.shareExtension = function (publisherName, extensionName, accountName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/accountsbyname/{accountName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                accountName: accountName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param accountName -
         */
        GalleryRestClient.prototype.unshareExtension = function (publisherName, extensionName, accountName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/accountsbyname/{accountName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                accountName: accountName
                            }
                        })];
                });
            });
        };
        /**
         * @param itemId -
         * @param installationTarget -
         * @param testCommerce -
         * @param isFreeOrTrialInstall -
         */
        GalleryRestClient.prototype.getAcquisitionOptions = function (itemId, installationTarget, testCommerce, isFreeOrTrialInstall) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        installationTarget: installationTarget,
                        testCommerce: testCommerce,
                        isFreeOrTrialInstall: isFreeOrTrialInstall
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/acquisitionoptions/{itemId}",
                            routeValues: {
                                itemId: itemId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param acquisitionRequest -
         */
        GalleryRestClient.prototype.requestAcquisition = function (acquisitionRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/acquisitionrequests",
                            body: acquisitionRequest
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param assetType -
         * @param accountToken -
         * @param acceptDefault -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getAssetByName = function (publisherName, extensionName, version, assetType, accountToken, acceptDefault, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken,
                        acceptDefault: acceptDefault
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/public/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/assetbyname/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version,
                                assetType: assetType
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param extensionId -
         * @param version -
         * @param assetType -
         * @param accountToken -
         * @param acceptDefault -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getAsset = function (extensionId, version, assetType, accountToken, acceptDefault, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken,
                        acceptDefault: acceptDefault
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/public/gallery/extensions/{extensionId}/{version}/assets/{assetType}",
                            routeValues: {
                                extensionId: extensionId,
                                version: version,
                                assetType: assetType
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param assetType -
         * @param accountToken -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getAssetAuthenticated = function (publisherName, extensionName, version, assetType, accountToken, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/assets/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version,
                                assetType: assetType
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param azurePublisherId -
         */
        GalleryRestClient.prototype.associateAzurePublisher = function (publisherName, azurePublisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        azurePublisherId: azurePublisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/azurepublisher",
                            routeValues: {
                                publisherName: publisherName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         */
        GalleryRestClient.prototype.queryAssociatedAzurePublisher = function (publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/azurepublisher",
                            routeValues: {
                                publisherName: publisherName
                            }
                        })];
                });
            });
        };
        /**
         * @param languages -
         */
        GalleryRestClient.prototype.getCategories = function (languages) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        languages: languages
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/categories",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param categoryName -
         * @param languages -
         * @param product -
         */
        GalleryRestClient.prototype.getCategoryDetails = function (categoryName, languages, product) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        languages: languages,
                        product: product
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/categories/{categoryName}",
                            routeValues: {
                                categoryName: categoryName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param product -
         * @param categoryId -
         * @param lcid -
         * @param source -
         * @param productVersion -
         * @param skus -
         * @param subSkus -
         * @param productArchitecture -
         */
        GalleryRestClient.prototype.getCategoryTree = function (product, categoryId, lcid, source, productVersion, skus, subSkus, productArchitecture) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        lcid: lcid,
                        source: source,
                        productVersion: productVersion,
                        skus: skus,
                        subSkus: subSkus,
                        productArchitecture: productArchitecture
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/{product}/categories/{categoryId}",
                            routeValues: {
                                product: product,
                                categoryId: categoryId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param product -
         * @param lcid -
         * @param source -
         * @param productVersion -
         * @param skus -
         * @param subSkus -
         */
        GalleryRestClient.prototype.getRootCategories = function (product, lcid, source, productVersion, skus, subSkus) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        lcid: lcid,
                        source: source,
                        productVersion: productVersion,
                        skus: skus,
                        subSkus: subSkus
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/{product}/categories/root",
                            routeValues: {
                                product: product
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param version -
         */
        GalleryRestClient.prototype.getCertificate = function (publisherName, extensionName, version) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/certificates/{version}",
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
         * @param customerSupportRequest -
         */
        GalleryRestClient.prototype.createSupportRequest = function (customerSupportRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/support",
                            body: customerSupportRequest
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         */
        GalleryRestClient.prototype.createDraftForEditExtension = function (publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            }
                        })];
                });
            });
        };
        /**
         * @param draftPatch -
         * @param publisherName -
         * @param extensionName -
         * @param draftId -
         */
        GalleryRestClient.prototype.performEditExtensionDraftOperation = function (draftPatch, publisherName, extensionName, draftId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                draftId: draftId
                            },
                            body: draftPatch
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param extensionName -
         * @param draftId -
         * @param fileName - Header to pass the filename of the uploaded data
         */
        GalleryRestClient.prototype.updatePayloadInDraftForEditExtension = function (content, publisherName, extensionName, draftId, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                draftId: draftId
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                                "X-Market-UploadFileName": fileName,
                            },
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param extensionName -
         * @param draftId -
         * @param assetType -
         */
        GalleryRestClient.prototype.addAssetForEditExtensionDraft = function (content, publisherName, extensionName, draftId, assetType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}/assets/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                draftId: draftId,
                                assetType: assetType
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
         * @param content - Content to upload
         * @param publisherName -
         * @param product - Header to pass the product type of the payload file
         * @param fileName - Header to pass the filename of the uploaded data
         */
        GalleryRestClient.prototype.createDraftForNewExtension = function (content, publisherName, product, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                                "X-Market-UploadFileProduct": product,
                                "X-Market-UploadFileName": fileName,
                            },
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * @param draftPatch -
         * @param publisherName -
         * @param draftId -
         */
        GalleryRestClient.prototype.performNewExtensionDraftOperation = function (draftPatch, publisherName, draftId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName,
                                draftId: draftId
                            },
                            body: draftPatch
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param draftId -
         * @param fileName - Header to pass the filename of the uploaded data
         */
        GalleryRestClient.prototype.updatePayloadInDraftForNewExtension = function (content, publisherName, draftId, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
                            routeValues: {
                                publisherName: publisherName,
                                draftId: draftId
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                                "X-Market-UploadFileName": fileName,
                            },
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param draftId -
         * @param assetType -
         */
        GalleryRestClient.prototype.addAssetForNewExtensionDraft = function (content, publisherName, draftId, assetType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                draftId: draftId,
                                assetType: assetType
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
         * @param publisherName -
         * @param draftId -
         * @param assetType -
         * @param extensionName -
         */
        GalleryRestClient.prototype.getAssetFromEditExtensionDraft = function (publisherName, draftId, assetType, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        extensionName: extensionName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                draftId: draftId,
                                assetType: assetType
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param draftId -
         * @param assetType -
         */
        GalleryRestClient.prototype.getAssetFromNewExtensionDraft = function (publisherName, draftId, assetType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                draftId: draftId,
                                assetType: assetType
                            }
                        })];
                });
            });
        };
        /**
         * Get install/uninstall events of an extension. If both count and afterDate parameters are specified, count takes precedence.
         *
         * @param publisherName - Name of the publisher
         * @param extensionName - Name of the extension
         * @param count - Count of events to fetch, applies to each event type.
         * @param afterDate - Fetch events that occurred on or after this date
         * @param include - Filter options. Supported values: install, uninstall, review, acquisition, sales. Default is to fetch all types of events
         * @param includeProperty - Event properties to include. Currently only 'lastContactDetails' is supported for uninstall events
         */
        GalleryRestClient.prototype.getExtensionEvents = function (publisherName, extensionName, count, afterDate, include, includeProperty) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        count: count,
                        afterDate: afterDate,
                        include: include,
                        includeProperty: includeProperty
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/events",
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
         * API endpoint to publish extension install/uninstall events. This is meant to be invoked by EMS only for sending us data related to install/uninstall of an extension.
         *
         * @param extensionEvents -
         */
        GalleryRestClient.prototype.publishExtensionEvents = function (extensionEvents) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/events",
                            body: extensionEvents
                        })];
                });
            });
        };
        /**
         * @param extensionQuery -
         * @param accountToken -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.queryExtensions = function (extensionQuery, accountToken, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/gallery/extensionquery",
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues,
                            body: extensionQuery
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param extensionType -
         * @param reCaptchaToken -
         */
        GalleryRestClient.prototype.createExtension = function (content, extensionType, reCaptchaToken) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        extensionType: extensionType,
                        reCaptchaToken: reCaptchaToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}",
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
         * @param extensionId -
         * @param version -
         */
        GalleryRestClient.prototype.deleteExtensionById = function (extensionId, version) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        version: version
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}",
                            routeValues: {
                                extensionId: extensionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param extensionId -
         * @param version -
         * @param flags -
         */
        GalleryRestClient.prototype.getExtensionById = function (extensionId, version, flags) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        version: version,
                        flags: flags
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}",
                            routeValues: {
                                extensionId: extensionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param extensionId -
         * @param reCaptchaToken -
         */
        GalleryRestClient.prototype.updateExtensionById = function (extensionId, reCaptchaToken) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        reCaptchaToken: reCaptchaToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/extensions/{extensionId}",
                            routeValues: {
                                extensionId: extensionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param extensionType -
         * @param reCaptchaToken -
         */
        GalleryRestClient.prototype.createExtensionWithPublisher = function (content, publisherName, extensionType, reCaptchaToken) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        extensionType: extensionType,
                        reCaptchaToken: reCaptchaToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
                            routeValues: {
                                publisherName: publisherName
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
         * @param publisherName -
         * @param extensionName -
         * @param version -
         */
        GalleryRestClient.prototype.deleteExtension = function (publisherName, extensionName, version) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        version: version
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
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
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param flags -
         * @param accountToken -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getExtension = function (publisherName, extensionName, version, flags, accountToken, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        version: version,
                        flags: flags,
                        accountToken: accountToken
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * REST endpoint to update an extension.
         *
         * @param content - Content to upload
         * @param publisherName - Name of the publisher
         * @param extensionName - Name of the extension
         * @param extensionType -
         * @param reCaptchaToken -
         * @param bypassScopeCheck - This parameter decides if the scope change check needs to be invoked or not
         */
        GalleryRestClient.prototype.updateExtension = function (content, publisherName, extensionName, extensionType, reCaptchaToken, bypassScopeCheck) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        extensionType: extensionType,
                        reCaptchaToken: reCaptchaToken,
                        bypassScopeCheck: bypassScopeCheck
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
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
         * @param publisherName -
         * @param extensionName -
         * @param flags -
         */
        GalleryRestClient.prototype.updateExtensionProperties = function (publisherName, extensionName, flags) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        flags: flags
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
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
         * @param publisherName -
         * @param extensionName -
         * @param hostType -
         * @param hostName -
         */
        GalleryRestClient.prototype.shareExtensionWithHost = function (publisherName, extensionName, hostType, hostName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/extensionshare/{hostType}/{hostName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                hostType: hostType,
                                hostName: hostName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param hostType -
         * @param hostName -
         */
        GalleryRestClient.prototype.unshareExtensionWithHost = function (publisherName, extensionName, hostType, hostName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/extensionshare/{hostType}/{hostName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                hostType: hostType,
                                hostName: hostName
                            }
                        })];
                });
            });
        };
        /**
         * Rest end point to validate if an Azure publisher owns an extension for 3rd party commerce scenario. Azure only supports POST operations and the above signature is not typical of the REST operations. http://sharepoint/sites/AzureUX/_layouts/15/WopiFrame2.aspx?sourcedoc=\{A793D31E-6DC6-4174-8FA3-DE3F82B51642\}&file=Data%20Market%20Partner%20integration%20with%20Marketplace%20service.docx&action=default
         *
         * @param azureRestApiRequestModel - All the parameters are sent in the request body
         */
        GalleryRestClient.prototype.extensionValidator = function (azureRestApiRequestModel) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/extensionValidator",
                            body: azureRestApiRequestModel
                        })];
                });
            });
        };
        /**
         * Send Notification
         *
         * @param notificationData - Denoting the data needed to send notification
         */
        GalleryRestClient.prototype.sendNotifications = function (notificationData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/notifications",
                            body: notificationData
                        })];
                });
            });
        };
        /**
         * This endpoint gets hit when you download a VSTS extension from the Web UI
         *
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param accountToken -
         * @param acceptDefault -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getPackage = function (publisherName, extensionName, version, accountToken, acceptDefault, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken,
                        acceptDefault: acceptDefault
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/package",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param assetType -
         * @param assetToken -
         * @param accountToken -
         * @param acceptDefault -
         * @param accountTokenHeader - Header to pass the account token
         */
        GalleryRestClient.prototype.getAssetWithToken = function (publisherName, extensionName, version, assetType, assetToken, accountToken, acceptDefault, accountTokenHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        accountToken: accountToken,
                        acceptDefault: acceptDefault
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/public/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/privateasset/{assetToken}/{*assetType}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version,
                                assetType: assetType,
                                assetToken: assetToken
                            },
                            customHeaders: {
                                "X-Market-AccountToken": accountTokenHeader,
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Delete publisher asset like logo
         *
         * @param publisherName - Internal name of the publisher
         * @param assetType - Type of asset. Default value is 'logo'.
         */
        GalleryRestClient.prototype.deletePublisherAsset = function (publisherName, assetType) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        assetType: assetType
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
                            routeValues: {
                                publisherName: publisherName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get publisher asset like logo as a stream
         *
         * @param publisherName - Internal name of the publisher
         * @param assetType - Type of asset. Default value is 'logo'.
         */
        GalleryRestClient.prototype.getPublisherAsset = function (publisherName, assetType) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        assetType: assetType
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
                            routeValues: {
                                publisherName: publisherName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update publisher asset like logo. It accepts asset file as an octet stream and file name is passed in header values.
         *
         * @param content - Content to upload
         * @param publisherName - Internal name of the publisher
         * @param assetType - Type of asset. Default value is 'logo'.
         * @param fileName - Header to pass the filename of the uploaded data
         */
        GalleryRestClient.prototype.updatePublisherAsset = function (content, publisherName, assetType, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        assetType: assetType
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
                            routeValues: {
                                publisherName: publisherName
                            },
                            customHeaders: {
                                "Content-Type": "application/octet-stream",
                                "X-Market-UploadFileName": fileName,
                            },
                            queryParams: queryValues,
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         */
        GalleryRestClient.prototype.fetchDomainToken = function (publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/verify/token",
                            routeValues: {
                                publisherName: publisherName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         */
        GalleryRestClient.prototype.verifyDomainToken = function (publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/verify/token",
                            routeValues: {
                                publisherName: publisherName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherQuery -
         */
        GalleryRestClient.prototype.queryPublishers = function (publisherQuery) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/gallery/publisherquery",
                            body: publisherQuery
                        })];
                });
            });
        };
        /**
         * @param publisher -
         */
        GalleryRestClient.prototype.createPublisher = function (publisher) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}",
                            body: publisher
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         */
        GalleryRestClient.prototype.deletePublisher = function (publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}",
                            routeValues: {
                                publisherName: publisherName
                            }
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param flags -
         */
        GalleryRestClient.prototype.getPublisher = function (publisherName, flags) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        flags: flags
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}",
                            routeValues: {
                                publisherName: publisherName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisher -
         * @param publisherName -
         */
        GalleryRestClient.prototype.updatePublisher = function (publisher, publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}",
                            routeValues: {
                                publisherName: publisherName
                            },
                            body: publisher
                        })];
                });
            });
        };
        /**
         * Endpoint to add/modify publisher membership. Currently Supports only addition/modification of 1 user at a time Works only for adding members of same tenant.
         *
         * @param roleAssignments - List of user identifiers(email address) and role to be added. Currently only one entry is supported.
         * @param publisherName - The name/id of publisher to which users have to be added
         * @param limitToCallerIdentityDomain - Should cross tenant addtions be allowed or not.
         */
        GalleryRestClient.prototype.updatePublisherMembers = function (roleAssignments, publisherName, limitToCallerIdentityDomain) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        limitToCallerIdentityDomain: limitToCallerIdentityDomain
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}",
                            routeValues: {
                                publisherName: publisherName
                            },
                            queryParams: queryValues,
                            body: roleAssignments
                        })];
                });
            });
        };
        /**
         * @param content - Content to upload
         * @param publisherName -
         * @param extensionName -
         * @param extensionType -
         * @param reCaptchaToken -
         * @param bypassScopeCheck -
         */
        GalleryRestClient.prototype.publishExtensionWithPublisherSignature = function (content, publisherName, extensionName, extensionType, reCaptchaToken, bypassScopeCheck) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        extensionType: extensionType,
                        reCaptchaToken: reCaptchaToken,
                        bypassScopeCheck: bypassScopeCheck
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/publishersignedextension/{extensionName}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            customHeaders: {
                                "Content-Type": "multipart/related",
                            },
                            queryParams: queryValues,
                            body: content,
                            isRawData: true
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         */
        GalleryRestClient.prototype.getPublisherWithoutToken = function (publisherName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/publisherWithoutToken/{publisherName}",
                            routeValues: {
                                publisherName: publisherName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of questions with their responses associated with an extension.
         *
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param count - Number of questions to retrieve (defaults to 10).
         * @param page - Page number from which set of questions are to be retrieved.
         * @param afterDate - If provided, results questions are returned which were posted after this date
         */
        GalleryRestClient.prototype.getQuestions = function (publisherName, extensionName, count, page, afterDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        count: count,
                        page: page,
                        afterDate: afterDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/qna",
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
         * Flags a concern with an existing question for an extension.
         *
         * @param concern - User reported concern with a question for the extension.
         * @param pubName - Name of the publisher who published the extension.
         * @param extName - Name of the extension.
         * @param questionId - Identifier of the question to be updated for the extension.
         */
        GalleryRestClient.prototype.reportQuestion = function (concern, pubName, extName, questionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/qna/{questionId}/concern",
                            routeValues: {
                                pubName: pubName,
                                extName: extName,
                                questionId: questionId
                            },
                            body: concern
                        })];
                });
            });
        };
        /**
         * Creates a new question for an extension.
         *
         * @param question - Question to be created for the extension.
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         */
        GalleryRestClient.prototype.createQuestion = function (question, publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            body: question
                        })];
                });
            });
        };
        /**
         * Deletes an existing question and all its associated responses for an extension. (soft delete)
         *
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param questionId - Identifier of the question to be deleted for the extension.
         */
        GalleryRestClient.prototype.deleteQuestion = function (publisherName, extensionName, questionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                questionId: questionId
                            }
                        })];
                });
            });
        };
        /**
         * Updates an existing question for an extension.
         *
         * @param question - Updated question to be set for the extension.
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param questionId - Identifier of the question to be updated for the extension.
         */
        GalleryRestClient.prototype.updateQuestion = function (question, publisherName, extensionName, questionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                questionId: questionId
                            },
                            body: question
                        })];
                });
            });
        };
        /**
         * Creates a new response for a given question for an extension.
         *
         * @param response - Response to be created for the extension.
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param questionId - Identifier of the question for which response is to be created for the extension.
         */
        GalleryRestClient.prototype.createResponse = function (response, publisherName, extensionName, questionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                questionId: questionId
                            },
                            body: response
                        })];
                });
            });
        };
        /**
         * Deletes a response for an extension. (soft delete)
         *
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param questionId - Identifies the question whose response is to be deleted.
         * @param responseId - Identifies the response to be deleted.
         */
        GalleryRestClient.prototype.deleteResponse = function (publisherName, extensionName, questionId, responseId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                questionId: questionId,
                                responseId: responseId
                            }
                        })];
                });
            });
        };
        /**
         * Updates an existing response for a given question for an extension.
         *
         * @param response - Updated response to be set for the extension.
         * @param publisherName - Name of the publisher who published the extension.
         * @param extensionName - Name of the extension.
         * @param questionId - Identifier of the question for which response is to be updated for the extension.
         * @param responseId - Identifier of the response which has to be updated.
         */
        GalleryRestClient.prototype.updateResponse = function (response, publisherName, extensionName, questionId, responseId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                questionId: questionId,
                                responseId: responseId
                            },
                            body: response
                        })];
                });
            });
        };
        /**
         * Returns extension reports
         *
         * @param publisherName - Name of the publisher who published the extension
         * @param extensionName - Name of the extension
         * @param days - Last n days report. If afterDate and days are specified, days will take priority
         * @param count - Number of events to be returned
         * @param afterDate - Use if you want to fetch events newer than the specified date
         */
        GalleryRestClient.prototype.getExtensionReports = function (publisherName, extensionName, days, count, afterDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        days: days,
                        count: count,
                        afterDate: afterDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/reports",
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
         * Returns a list of reviews associated with an extension
         *
         * @param publisherName - Name of the publisher who published the extension
         * @param extensionName - Name of the extension
         * @param count - Number of reviews to retrieve (defaults to 5)
         * @param filterOptions - FilterOptions to filter out empty reviews etcetera, defaults to none
         * @param beforeDate - Use if you want to fetch reviews older than the specified date, defaults to null
         * @param afterDate - Use if you want to fetch reviews newer than the specified date, defaults to null
         */
        GalleryRestClient.prototype.getReviews = function (publisherName, extensionName, count, filterOptions, beforeDate, afterDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        count: count,
                        filterOptions: filterOptions,
                        beforeDate: beforeDate,
                        afterDate: afterDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/reviews",
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
         * Returns a summary of the reviews
         *
         * @param pubName - Name of the publisher who published the extension
         * @param extName - Name of the extension
         * @param beforeDate - Use if you want to fetch summary of reviews older than the specified date, defaults to null
         * @param afterDate - Use if you want to fetch summary of reviews newer than the specified date, defaults to null
         */
        GalleryRestClient.prototype.getReviewsSummary = function (pubName, extName, beforeDate, afterDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        beforeDate: beforeDate,
                        afterDate: afterDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/publishers/{pubName}/extensions/{extName}/reviews/summary",
                            routeValues: {
                                pubName: pubName,
                                extName: extName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Creates a new review for an extension
         *
         * @param review - Review to be created for the extension
         * @param pubName - Name of the publisher who published the extension
         * @param extName - Name of the extension
         */
        GalleryRestClient.prototype.createReview = function (review, pubName, extName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
                            routeValues: {
                                pubName: pubName,
                                extName: extName
                            },
                            body: review
                        })];
                });
            });
        };
        /**
         * Deletes a review
         *
         * @param pubName - Name of the publisher who published the extension
         * @param extName - Name of the extension
         * @param reviewId - Id of the review which needs to be updated
         */
        GalleryRestClient.prototype.deleteReview = function (pubName, extName, reviewId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
                            routeValues: {
                                pubName: pubName,
                                extName: extName,
                                reviewId: reviewId
                            }
                        })];
                });
            });
        };
        /**
         * Updates or Flags a review
         *
         * @param reviewPatch - ReviewPatch object which contains the changes to be applied to the review
         * @param pubName - Name of the publisher who published the extension
         * @param extName - Name of the extension
         * @param reviewId - Id of the review which needs to be updated
         */
        GalleryRestClient.prototype.updateReview = function (reviewPatch, pubName, extName, reviewId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
                            routeValues: {
                                pubName: pubName,
                                extName: extName,
                                reviewId: reviewId
                            },
                            body: reviewPatch
                        })];
                });
            });
        };
        /**
         * @param category -
         */
        GalleryRestClient.prototype.createCategory = function (category) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/categories",
                            body: category
                        })];
                });
            });
        };
        /**
         * Get all setting entries for the given user/all-users scope
         *
         * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
         * @param key - Optional key under which to filter all the entries
         */
        GalleryRestClient.prototype.getGalleryUserSettings = function (userScope, key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/settings/{userScope}/{*key}",
                            routeValues: {
                                userScope: userScope,
                                key: key
                            }
                        })];
                });
            });
        };
        /**
         * Set all setting entries for the given user/all-users scope
         *
         * @param entries - A key-value pair of all settings that need to be set
         * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
         */
        GalleryRestClient.prototype.setGalleryUserSettings = function (entries, userScope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/settings/{userScope}/{*key}",
                            routeValues: {
                                userScope: userScope
                            },
                            body: entries
                        })];
                });
            });
        };
        /**
         * @param keyType -
         * @param expireCurrentSeconds -
         */
        GalleryRestClient.prototype.generateKey = function (keyType, expireCurrentSeconds) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        expireCurrentSeconds: expireCurrentSeconds
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/gallery/signingkey/{keyType}",
                            routeValues: {
                                keyType: keyType
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param keyType -
         */
        GalleryRestClient.prototype.getSigningKey = function (keyType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/signingkey/{keyType}",
                            routeValues: {
                                keyType: keyType
                            }
                        })];
                });
            });
        };
        /**
         * @param extensionStatisticsUpdate -
         * @param publisherName -
         * @param extensionName -
         */
        GalleryRestClient.prototype.updateExtensionStatistics = function (extensionStatisticsUpdate, publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/statistics",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            },
                            body: extensionStatisticsUpdate
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param days -
         * @param aggregate -
         * @param afterDate -
         */
        GalleryRestClient.prototype.getExtensionDailyStats = function (publisherName, extensionName, days, aggregate, afterDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        days: days,
                        aggregate: aggregate,
                        afterDate: afterDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/stats",
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
         * This route/location id only supports HTTP POST anonymously, so that the page view daily stat can be incremented from Marketplace client. Trying to call GET on this route should result in an exception. Without this explicit implementation, calling GET on this public route invokes the above GET implementation GetExtensionDailyStats.
         *
         * @param publisherName - Name of the publisher
         * @param extensionName - Name of the extension
         * @param version - Version of the extension
         */
        GalleryRestClient.prototype.getExtensionDailyStatsAnonymous = function (publisherName, extensionName, version) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/stats",
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
         * Increments a daily statistic associated with the extension
         *
         * @param publisherName - Name of the publisher
         * @param extensionName - Name of the extension
         * @param version - Version of the extension
         * @param statType - Type of stat to increment
         * @param targetPlatform -
         */
        GalleryRestClient.prototype.incrementExtensionDailyStat = function (publisherName, extensionName, version, statType, targetPlatform) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        statType: statType,
                        targetPlatform: targetPlatform
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/stats",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param publisherName -
         * @param extensionName -
         * @param version -
         * @param targetPlatform -
         */
        GalleryRestClient.prototype.getVerificationLog = function (publisherName, extensionName, version, targetPlatform) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        targetPlatform: targetPlatform
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            httpResponseType: "application/octet-stream",
                            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/verificationlog",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName,
                                version: version
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Endpoint to get the latest version(s) of a VS Code extension.
         *
         * @param publisherName - The name of the publisher of the requested VS Code extension.
         * @param extensionName - The extension name.
         */
        GalleryRestClient.prototype.getVSCodeExtensionLatestVersion = function (publisherName, extensionName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/public/gallery/vscode/{publisherName}/{extensionName}/latest",
                            routeValues: {
                                publisherName: publisherName,
                                extensionName: extensionName
                            }
                        })];
                });
            });
        };
        /**
         * @param itemName -
         * @param version -
         * @param statType -
         */
        GalleryRestClient.prototype.updateVSCodeWebExtensionStatistics = function (itemName, version, statType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/gallery/itemName/{itemName}/version/{version}/statType/{statType}/vscodewebextension",
                            routeValues: {
                                itemName: itemName,
                                version: version,
                                statType: statType
                            }
                        })];
                });
            });
        };
        GalleryRestClient.RESOURCE_AREA_ID = "69d21c00-f135-441b-b5ce-3626378e0819";
        return GalleryRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.GalleryRestClient = GalleryRestClient;
});
