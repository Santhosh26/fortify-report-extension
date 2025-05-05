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
    var FeatureManagementRestClient = /** @class */ (function (_super) {
        __extends(FeatureManagementRestClient, _super);
        function FeatureManagementRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Get a specific feature by its id
         *
         * @param featureId - The contribution id of the feature
         */
        FeatureManagementRestClient.prototype.getFeature = function (featureId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/FeatureManagement/Features/{featureId}",
                            routeValues: {
                                featureId: featureId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of all defined features
         *
         * @param targetContributionId - Optional target contribution. If null/empty, return all features. If specified include the features that target the specified contribution.
         */
        FeatureManagementRestClient.prototype.getFeatures = function (targetContributionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        targetContributionId: targetContributionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/FeatureManagement/Features/{featureId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get the state of the specified feature for the given user/all-users scope
         *
         * @param featureId - Contribution id of the feature
         * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
         */
        FeatureManagementRestClient.prototype.getFeatureState = function (featureId, userScope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{featureId}",
                            routeValues: {
                                featureId: featureId,
                                userScope: userScope
                            }
                        })];
                });
            });
        };
        /**
         * Set the state of a feature
         *
         * @param feature - Posted feature state object. Should specify the effective value.
         * @param featureId - Contribution id of the feature
         * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
         * @param reason - Reason for changing the state
         * @param reasonCode - Short reason code
         */
        FeatureManagementRestClient.prototype.setFeatureState = function (feature, featureId, userScope, reason, reasonCode) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        reason: reason,
                        reasonCode: reasonCode
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{featureId}",
                            routeValues: {
                                featureId: featureId,
                                userScope: userScope
                            },
                            queryParams: queryValues,
                            body: feature
                        })];
                });
            });
        };
        /**
         * Get the state of the specified feature for the given named scope
         *
         * @param featureId - Contribution id of the feature
         * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
         * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
         * @param scopeValue - Value of the scope (e.g. the project or team id)
         */
        FeatureManagementRestClient.prototype.getFeatureStateForScope = function (featureId, userScope, scopeName, scopeValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{scopeName}/{scopeValue}/{featureId}",
                            routeValues: {
                                featureId: featureId,
                                userScope: userScope,
                                scopeName: scopeName,
                                scopeValue: scopeValue
                            }
                        })];
                });
            });
        };
        /**
         * Set the state of a feature at a specific scope
         *
         * @param feature - Posted feature state object. Should specify the effective value.
         * @param featureId - Contribution id of the feature
         * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
         * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
         * @param scopeValue - Value of the scope (e.g. the project or team id)
         * @param reason - Reason for changing the state
         * @param reasonCode - Short reason code
         */
        FeatureManagementRestClient.prototype.setFeatureStateForScope = function (feature, featureId, userScope, scopeName, scopeValue, reason, reasonCode) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        reason: reason,
                        reasonCode: reasonCode
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{scopeName}/{scopeValue}/{featureId}",
                            routeValues: {
                                featureId: featureId,
                                userScope: userScope,
                                scopeName: scopeName,
                                scopeValue: scopeValue
                            },
                            queryParams: queryValues,
                            body: feature
                        })];
                });
            });
        };
        /**
         * Get the effective state for a list of feature ids
         *
         * @param query - Features to query along with current scope values
         */
        FeatureManagementRestClient.prototype.queryFeatureStates = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery",
                            body: query
                        })];
                });
            });
        };
        /**
         * Get the states of the specified features for the default scope
         *
         * @param query - Query describing the features to query.
         * @param userScope -
         */
        FeatureManagementRestClient.prototype.queryFeatureStatesForDefaultScope = function (query, userScope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery/{userScope}",
                            routeValues: {
                                userScope: userScope
                            },
                            body: query
                        })];
                });
            });
        };
        /**
         * Get the states of the specified features for the specific named scope
         *
         * @param query - Query describing the features to query.
         * @param userScope -
         * @param scopeName -
         * @param scopeValue -
         */
        FeatureManagementRestClient.prototype.queryFeatureStatesForNamedScope = function (query, userScope, scopeName, scopeValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery/{userScope}/{scopeName}/{scopeValue}",
                            routeValues: {
                                userScope: userScope,
                                scopeName: scopeName,
                                scopeValue: scopeValue
                            },
                            body: query
                        })];
                });
            });
        };
        return FeatureManagementRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.FeatureManagementRestClient = FeatureManagementRestClient;
});
