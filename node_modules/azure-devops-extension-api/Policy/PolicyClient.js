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
    var PolicyRestClient = /** @class */ (function (_super) {
        __extends(PolicyRestClient, _super);
        function PolicyRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Create a policy configuration of a given policy type.
         *
         * @param configuration - The policy configuration to create.
         * @param project - Project ID or project name
         */
        PolicyRestClient.prototype.createPolicyConfiguration = function (configuration, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
                            routeValues: {
                                project: project
                            },
                            body: configuration
                        })];
                });
            });
        };
        /**
         * Delete a policy configuration by its ID.
         *
         * @param project - Project ID or project name
         * @param configurationId - ID of the policy configuration to delete.
         */
        PolicyRestClient.prototype.deletePolicyConfiguration = function (project, configurationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
                            routeValues: {
                                project: project,
                                configurationId: configurationId
                            }
                        })];
                });
            });
        };
        /**
         * Get a policy configuration by its ID.
         *
         * @param project - Project ID or project name
         * @param configurationId - ID of the policy configuration
         */
        PolicyRestClient.prototype.getPolicyConfiguration = function (project, configurationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
                            routeValues: {
                                project: project,
                                configurationId: configurationId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of policy configurations in a project.
         *
         * @param project - Project ID or project name
         * @param scope - [Provided for legacy reasons] The scope on which a subset of policies is defined.
         * @param policyType - Filter returned policies to only this type
         */
        PolicyRestClient.prototype.getPolicyConfigurations = function (project, scope, policyType) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                var _this = this;
                return __generator(this, function (_a) {
                    queryValues = {
                        scope: scope,
                        policyType: policyType
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
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
         * Update a policy configuration by its ID.
         *
         * @param configuration - The policy configuration to update.
         * @param project - Project ID or project name
         * @param configurationId - ID of the existing policy configuration to be updated.
         */
        PolicyRestClient.prototype.updatePolicyConfiguration = function (configuration, project, configurationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
                            routeValues: {
                                project: project,
                                configurationId: configurationId
                            },
                            body: configuration
                        })];
                });
            });
        };
        /**
         * Gets the present evaluation state of a policy.
         *
         * @param project - Project ID or project name
         * @param evaluationId - ID of the policy evaluation to be retrieved.
         */
        PolicyRestClient.prototype.getPolicyEvaluation = function (project, evaluationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Evaluations/{evaluationId}",
                            routeValues: {
                                project: project,
                                evaluationId: evaluationId
                            }
                        })];
                });
            });
        };
        /**
         * Requeue the policy evaluation.
         *
         * @param project - Project ID or project name
         * @param evaluationId - ID of the policy evaluation to be retrieved.
         */
        PolicyRestClient.prototype.requeuePolicyEvaluation = function (project, evaluationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/policy/Evaluations/{evaluationId}",
                            routeValues: {
                                project: project,
                                evaluationId: evaluationId
                            }
                        })];
                });
            });
        };
        /**
         * Retrieves a list of all the policy evaluation statuses for a specific pull request.
         *
         * @param project - Project ID or project name
         * @param artifactId - A string which uniquely identifies the target of a policy evaluation.
         * @param includeNotApplicable - Some policies might determine that they do not apply to a specific pull request. Setting this parameter to true will return evaluation records even for policies which don't apply to this pull request.
         * @param top - The number of policy evaluation records to retrieve.
         * @param skip - The number of policy evaluation records to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
         */
        PolicyRestClient.prototype.getPolicyEvaluations = function (project, artifactId, includeNotApplicable, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        artifactId: artifactId,
                        includeNotApplicable: includeNotApplicable,
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Evaluations",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Retrieve a specific revision of a given policy by ID.
         *
         * @param project - Project ID or project name
         * @param configurationId - The policy configuration ID.
         * @param revisionId - The revision ID.
         */
        PolicyRestClient.prototype.getPolicyConfigurationRevision = function (project, configurationId, revisionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/configurations/{configurationId}/Revisions/{revisionId}",
                            routeValues: {
                                project: project,
                                configurationId: configurationId,
                                revisionId: revisionId
                            }
                        })];
                });
            });
        };
        /**
         * Retrieve all revisions for a given policy.
         *
         * @param project - Project ID or project name
         * @param configurationId - The policy configuration ID.
         * @param top - The number of revisions to retrieve.
         * @param skip - The number of revisions to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
         */
        PolicyRestClient.prototype.getPolicyConfigurationRevisions = function (project, configurationId, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/configurations/{configurationId}/Revisions/{revisionId}",
                            routeValues: {
                                project: project,
                                configurationId: configurationId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Retrieve a specific policy type by ID.
         *
         * @param project - Project ID or project name
         * @param typeId - The policy ID.
         */
        PolicyRestClient.prototype.getPolicyType = function (project, typeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Types/{typeId}",
                            routeValues: {
                                project: project,
                                typeId: typeId
                            }
                        })];
                });
            });
        };
        /**
         * Retrieve all available policy types.
         *
         * @param project - Project ID or project name
         */
        PolicyRestClient.prototype.getPolicyTypes = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/policy/Types/{typeId}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        PolicyRestClient.RESOURCE_AREA_ID = "fb13a388-40dd-4a04-b530-013a739c72ef";
        return PolicyRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.PolicyRestClient = PolicyRestClient;
});
