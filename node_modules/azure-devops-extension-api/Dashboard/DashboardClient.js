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
    var DashboardRestClient = /** @class */ (function (_super) {
        __extends(DashboardRestClient, _super);
        function DashboardRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Create the supplied dashboard.
         *
         * @param dashboard - The initial state of the dashboard
         * @param teamContext - The team context for the operation
         */
        DashboardRestClient.prototype.createDashboard = function (dashboard, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: dashboard
                        })];
                });
            });
        };
        /**
         * Delete a dashboard given its ID. This also deletes the widgets associated with this dashboard.
         *
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard to delete.
         */
        DashboardRestClient.prototype.deleteDashboard = function (teamContext, dashboardId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "DELETE",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId
                            }
                        })];
                });
            });
        };
        /**
         * Get a dashboard by its ID.
         *
         * @param teamContext - The team context for the operation
         * @param dashboardId -
         */
        DashboardRestClient.prototype.getDashboard = function (teamContext, dashboardId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of dashboards under a project.
         *
         * @param teamContext - The team context for the operation
         */
        DashboardRestClient.prototype.getDashboardsByProject = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Replace configuration for the specified dashboard. Replaces Widget list on Dashboard, only if property is supplied.
         *
         * @param dashboard - The Configuration of the dashboard to replace.
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard to replace.
         */
        DashboardRestClient.prototype.replaceDashboard = function (dashboard, teamContext, dashboardId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId
                            },
                            body: dashboard
                        })];
                });
            });
        };
        /**
         * Update the name and position of dashboards in the supplied group, and remove omitted dashboards. Does not modify dashboard content.
         *
         * @param group -
         * @param teamContext - The team context for the operation
         */
        DashboardRestClient.prototype.replaceDashboards = function (group, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: group
                        })];
                });
            });
        };
        /**
         * Create a widget on the specified dashboard.
         *
         * @param widget - State of the widget to add
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of dashboard the widget will be added to.
         */
        DashboardRestClient.prototype.createWidget = function (widget, teamContext, dashboardId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId
                            },
                            body: widget
                        })];
                });
            });
        };
        /**
         * Delete the specified widget.
         *
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard containing the widget.
         * @param widgetId - ID of the widget to update.
         */
        DashboardRestClient.prototype.deleteWidget = function (teamContext, dashboardId, widgetId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId,
                                widgetId: widgetId
                            }
                        })];
                });
            });
        };
        /**
         * Get the current state of the specified widget.
         *
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard containing the widget.
         * @param widgetId - ID of the widget to read.
         */
        DashboardRestClient.prototype.getWidget = function (teamContext, dashboardId, widgetId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId,
                                widgetId: widgetId
                            }
                        })];
                });
            });
        };
        /**
         * Override the  state of the specified widget.
         *
         * @param widget - State to be written for the widget.
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard containing the widget.
         * @param widgetId - ID of the widget to update.
         */
        DashboardRestClient.prototype.replaceWidget = function (widget, teamContext, dashboardId, widgetId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId,
                                widgetId: widgetId
                            },
                            body: widget
                        })];
                });
            });
        };
        /**
         * Perform a partial update of the specified widget.
         *
         * @param widget - Description of the widget changes to apply. All non-null fields will be replaced.
         * @param teamContext - The team context for the operation
         * @param dashboardId - ID of the dashboard containing the widget.
         * @param widgetId - ID of the widget to update.
         */
        DashboardRestClient.prototype.updateWidget = function (widget, teamContext, dashboardId, widgetId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
                            routeValues: {
                                project: project,
                                team: team,
                                dashboardId: dashboardId,
                                widgetId: widgetId
                            },
                            body: widget
                        })];
                });
            });
        };
        /**
         * Get the widget metadata satisfying the specified contribution ID.
         *
         * @param contributionId - The ID of Contribution for the Widget
         * @param project - Project ID or project name
         */
        DashboardRestClient.prototype.getWidgetMetadata = function (contributionId, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/Dashboard/WidgetTypes/{contributionId}",
                            routeValues: {
                                project: project,
                                contributionId: contributionId
                            }
                        })];
                });
            });
        };
        /**
         * Get all available widget metadata in alphabetical order, including widgets marked with isVisibleFromCatalog == false.
         *
         * @param scope -
         * @param project - Project ID or project name
         */
        DashboardRestClient.prototype.getWidgetTypes = function (scope, project) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$scope': scope
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/Dashboard/WidgetTypes/{contributionId}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        DashboardRestClient.RESOURCE_AREA_ID = "31c84e0a-3ece-48fd-a29d-100849af99ba";
        return DashboardRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.DashboardRestClient = DashboardRestClient;
});
