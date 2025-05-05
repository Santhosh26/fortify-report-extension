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
    var WorkRestClient = /** @class */ (function (_super) {
        __extends(WorkRestClient, _super);
        function WorkRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Creates/updates an automation rules settings
         *
         * @param ruleRequestModel - Required parameters to create/update an automation rules settings
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateAutomationRule = function (ruleRequestModel, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/automationrules",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: ruleRequestModel
                        })];
                });
            });
        };
        /**
         * Gets backlog configuration for a team
         *
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getBacklogConfigurations = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/backlogconfiguration",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of work items within a backlog level
         *
         * @param teamContext - The team context for the operation
         * @param backlogId -
         */
        WorkRestClient.prototype.getBacklogLevelWorkItems = function (teamContext, backlogId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/backlogs/{backlogId}/workItems",
                            routeValues: {
                                project: project,
                                team: team,
                                backlogId: backlogId
                            }
                        })];
                });
            });
        };
        /**
         * Get a backlog level
         *
         * @param teamContext - The team context for the operation
         * @param id - The id of the backlog level
         */
        WorkRestClient.prototype.getBacklog = function (teamContext, id) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/backlogs/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * List all backlog levels
         *
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getBacklogs = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/backlogs/{id}",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Gets a badge that displays the status of columns on the board.
         *
         * @param teamContext - The team context for the operation
         * @param id - The id of the board.
         * @param columnOptions - Determines what columns to show.
         * @param columns - If columnOptions is set to custom, specify the list of column names.
         */
        WorkRestClient.prototype.getBoardBadge = function (teamContext, id, columnOptions, columns) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues, project, team;
                return __generator(this, function (_a) {
                    queryValues = {
                        columnOptions: columnOptions,
                        columns: columns && columns.join(",")
                    };
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boardbadge/{id}",
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
         * Gets a badge that displays the status of columns on the board.
         *
         * @param teamContext - The team context for the operation
         * @param id - The id of the board.
         * @param columnOptions - Determines what columns to show.
         * @param columns - If columnOptions is set to custom, specify the list of column names.
         */
        WorkRestClient.prototype.getBoardBadgeData = function (teamContext, id, columnOptions, columns) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues, project, team;
                return __generator(this, function (_a) {
                    queryValues = {
                        columnOptions: columnOptions,
                        columns: columns && columns.join(",")
                    };
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boardbadge/{id}",
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
         * Get available board columns in a project
         *
         * @param project - Project ID or project name
         */
        WorkRestClient.prototype.getColumnSuggestedValues = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/boardcolumns",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Returns the list of parent field filter model for the given list of workitem ids
         *
         * @param teamContext - The team context for the operation
         * @param childBacklogContextCategoryRefName -
         * @param workitemIds -
         */
        WorkRestClient.prototype.getBoardMappingParentItems = function (teamContext, childBacklogContextCategoryRefName, workitemIds) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues, project, team;
                return __generator(this, function (_a) {
                    queryValues = {
                        childBacklogContextCategoryRefName: childBacklogContextCategoryRefName,
                        workitemIds: workitemIds && workitemIds.join(",")
                    };
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/boardparents",
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
         * Get available board rows in a project
         *
         * @param project - Project ID or project name
         */
        WorkRestClient.prototype.getRowSuggestedValues = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/boardrows",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Get board
         *
         * @param teamContext - The team context for the operation
         * @param id - identifier for board, either board's backlog level name (Eg:"Stories") or Id
         */
        WorkRestClient.prototype.getBoard = function (teamContext, id) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get boards
         *
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getBoards = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Update board options
         *
         * @param options - options to updated
         * @param teamContext - The team context for the operation
         * @param id - identifier for board, either category plural name (Eg:"Stories") or guid
         */
        WorkRestClient.prototype.setBoardOptions = function (options, teamContext, id) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            },
                            body: options
                        })];
                });
            });
        };
        /**
         * Get board user settings for a board id
         *
         * @param teamContext - The team context for the operation
         * @param board - Board ID or Name
         */
        WorkRestClient.prototype.getBoardUserSettings = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/boardusersettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update board user settings for the board id
         *
         * @param boardUserSettings -
         * @param teamContext - The team context for the operation
         * @param board -
         */
        WorkRestClient.prototype.updateBoardUserSettings = function (boardUserSettings, teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/boardusersettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            },
                            body: boardUserSettings
                        })];
                });
            });
        };
        /**
         * Get a team's capacity including total capacity and days off
         *
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.getCapacitiesWithIdentityRefAndTotals = function (teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            }
                        })];
                });
            });
        };
        /**
         * Get a team member's capacity
         *
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         * @param teamMemberId - ID of the team member
         */
        WorkRestClient.prototype.getCapacityWithIdentityRef = function (teamContext, iterationId, teamMemberId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId,
                                teamMemberId: teamMemberId
                            }
                        })];
                });
            });
        };
        /**
         * Replace a team's capacity
         *
         * @param capacities - Team capacity to replace
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.replaceCapacitiesWithIdentityRef = function (capacities, teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            },
                            body: capacities
                        })];
                });
            });
        };
        /**
         * Update a team member's capacity
         *
         * @param patch - Updated capacity
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         * @param teamMemberId - ID of the team member
         */
        WorkRestClient.prototype.updateCapacityWithIdentityRef = function (patch, teamContext, iterationId, teamMemberId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId,
                                teamMemberId: teamMemberId
                            },
                            body: patch
                        })];
                });
            });
        };
        /**
         * Get board card Rule settings for the board id or board by name
         *
         * @param teamContext - The team context for the operation
         * @param board -
         */
        WorkRestClient.prototype.getBoardCardRuleSettings = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardrulesettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update board card Rule settings for the board id or board by name
         *
         * @param boardCardRuleSettings -
         * @param teamContext - The team context for the operation
         * @param board -
         */
        WorkRestClient.prototype.updateBoardCardRuleSettings = function (boardCardRuleSettings, teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardrulesettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            },
                            body: boardCardRuleSettings
                        })];
                });
            });
        };
        /**
         * Update taskboard card Rule settings
         *
         * @param boardCardRuleSettings -
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateTaskboardCardRuleSettings = function (boardCardRuleSettings, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/taskboard/cardrulesettings",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: boardCardRuleSettings
                        })];
                });
            });
        };
        /**
         * Get board card settings for the board id or board by name
         *
         * @param teamContext - The team context for the operation
         * @param board -
         */
        WorkRestClient.prototype.getBoardCardSettings = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardsettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update board card settings for the board id or board by name
         *
         * @param boardCardSettingsToSave -
         * @param teamContext - The team context for the operation
         * @param board -
         */
        WorkRestClient.prototype.updateBoardCardSettings = function (boardCardSettingsToSave, teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardsettings",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            },
                            body: boardCardSettingsToSave
                        })];
                });
            });
        };
        /**
         * Update taskboard card settings
         *
         * @param boardCardSettingsToSave -
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateTaskboardCardSettings = function (boardCardSettingsToSave, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/taskboard/cardsettings",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: boardCardSettingsToSave
                        })];
                });
            });
        };
        /**
         * Get a board chart
         *
         * @param teamContext - The team context for the operation
         * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
         * @param name - The chart name
         */
        WorkRestClient.prototype.getBoardChart = function (teamContext, board, name) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board,
                                name: name
                            }
                        })];
                });
            });
        };
        /**
         * Get board charts
         *
         * @param teamContext - The team context for the operation
         * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
         */
        WorkRestClient.prototype.getBoardCharts = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update a board chart
         *
         * @param chart -
         * @param teamContext - The team context for the operation
         * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
         * @param name - The chart name
         */
        WorkRestClient.prototype.updateBoardChart = function (chart, teamContext, board, name) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board,
                                name: name
                            },
                            body: chart
                        })];
                });
            });
        };
        /**
         * Get columns on a board
         *
         * @param teamContext - The team context for the operation
         * @param board - Name or ID of the specific board
         */
        WorkRestClient.prototype.getBoardColumns = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update columns on a board
         *
         * @param boardColumns - List of board columns to update
         * @param teamContext - The team context for the operation
         * @param board - Name or ID of the specific board
         */
        WorkRestClient.prototype.updateBoardColumns = function (boardColumns, teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            },
                            body: boardColumns
                        })];
                });
            });
        };
        /**
         * Get Delivery View Data
         *
         * @param project - Project ID or project name
         * @param id - Identifier for delivery view
         * @param revision - Revision of the plan for which you want data. If the current plan is a different revision you will get an ViewRevisionMismatchException exception. If you do not supply a revision you will get data for the latest revision.
         * @param startDate - The start date of timeline
         * @param endDate - The end date of timeline
         */
        WorkRestClient.prototype.getDeliveryTimelineData = function (project, id, revision, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        revision: revision,
                        startDate: startDate,
                        endDate: endDate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/plans/{id}/deliverytimeline",
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
         * Get an iteration's capacity for all teams in iteration
         *
         * @param project - Project ID or project name
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.getTotalIterationCapacities = function (project, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/iterations/{iterationId}/iterationcapacities",
                            routeValues: {
                                project: project,
                                iterationId: iterationId
                            }
                        })];
                });
            });
        };
        /**
         * Delete a team's iteration by iterationId
         *
         * @param teamContext - The team context for the operation
         * @param id - ID of the iteration
         */
        WorkRestClient.prototype.deleteTeamIteration = function (teamContext, id) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get team's iteration by iterationId
         *
         * @param teamContext - The team context for the operation
         * @param id - ID of the iteration
         */
        WorkRestClient.prototype.getTeamIteration = function (teamContext, id) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get a team's iterations using timeframe filter
         *
         * @param teamContext - The team context for the operation
         * @param timeframe - A filter for which iterations are returned based on relative time. Only Current is supported currently.
         */
        WorkRestClient.prototype.getTeamIterations = function (teamContext, timeframe) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues, project, team;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$timeframe': timeframe
                    };
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
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
         * Add an iteration to the team
         *
         * @param iteration - Iteration to add
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.postTeamIteration = function (iteration, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: iteration
                        })];
                });
            });
        };
        /**
         * Add a new plan for the team
         *
         * @param postedPlan - Plan definition
         * @param project - Project ID or project name
         */
        WorkRestClient.prototype.createPlan = function (postedPlan, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/work/plans/{id}",
                            routeValues: {
                                project: project
                            },
                            body: postedPlan
                        })];
                });
            });
        };
        /**
         * Delete the specified plan
         *
         * @param project - Project ID or project name
         * @param id - Identifier of the plan
         */
        WorkRestClient.prototype.deletePlan = function (project, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/work/plans/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get the information for the specified plan
         *
         * @param project - Project ID or project name
         * @param id - Identifier of the plan
         */
        WorkRestClient.prototype.getPlan = function (project, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/plans/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get the information for all the plans configured for the given team
         *
         * @param project - Project ID or project name
         */
        WorkRestClient.prototype.getPlans = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/plans/{id}",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Update the information for the specified plan
         *
         * @param updatedPlan - Plan definition to be updated
         * @param project - Project ID or project name
         * @param id - Identifier of the plan
         */
        WorkRestClient.prototype.updatePlan = function (updatedPlan, project, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/work/plans/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            body: updatedPlan
                        })];
                });
            });
        };
        /**
         * Get process configuration
         *
         * @param project - Project ID or project name
         */
        WorkRestClient.prototype.getProcessConfiguration = function (project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/_apis/work/processconfiguration",
                            routeValues: {
                                project: project
                            }
                        })];
                });
            });
        };
        /**
         * Get rows on a board
         *
         * @param teamContext - The team context for the operation
         * @param board - Name or ID of the specific board
         */
        WorkRestClient.prototype.getBoardRows = function (teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Update rows on a board
         *
         * @param boardRows - List of board rows to update
         * @param teamContext - The team context for the operation
         * @param board - Name or ID of the specific board
         */
        WorkRestClient.prototype.updateBoardRows = function (boardRows, teamContext, board) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                team: team,
                                board: board
                            },
                            body: boardRows
                        })];
                });
            });
        };
        /**
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getColumns = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/taskboardColumns",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * @param updateColumns -
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateColumns = function (updateColumns, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/{team}/_apis/work/taskboardColumns",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: updateColumns
                        })];
                });
            });
        };
        /**
         * @param teamContext - The team context for the operation
         * @param iterationId -
         */
        WorkRestClient.prototype.getWorkItemColumns = function (teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/taskboardWorkItems/{iterationId}/{workItemId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            }
                        })];
                });
            });
        };
        /**
         * @param updateColumn -
         * @param teamContext - The team context for the operation
         * @param iterationId -
         * @param workItemId -
         */
        WorkRestClient.prototype.updateWorkItemColumn = function (updateColumn, teamContext, iterationId, workItemId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/taskboardWorkItems/{iterationId}/{workItemId}",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId,
                                workItemId: workItemId
                            },
                            body: updateColumn
                        })];
                });
            });
        };
        /**
         * Get team's days off for an iteration
         *
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.getTeamDaysOff = function (teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/teamdaysoff",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            }
                        })];
                });
            });
        };
        /**
         * Set a team's days off for an iteration
         *
         * @param daysOffPatch - Team's days off patch containing a list of start and end dates
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.updateTeamDaysOff = function (daysOffPatch, teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/teamdaysoff",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            },
                            body: daysOffPatch
                        })];
                });
            });
        };
        /**
         * Get a collection of team field values
         *
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getTeamFieldValues = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/teamfieldvalues",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Update team field values
         *
         * @param patch -
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateTeamFieldValues = function (patch, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/teamfieldvalues",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: patch
                        })];
                });
            });
        };
        /**
         * Get a team's settings
         *
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.getTeamSettings = function (teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings",
                            routeValues: {
                                project: project,
                                team: team
                            }
                        })];
                });
            });
        };
        /**
         * Update a team's settings
         *
         * @param teamSettingsPatch - TeamSettings changes
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.updateTeamSettings = function (teamSettingsPatch, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: teamSettingsPatch
                        })];
                });
            });
        };
        /**
         * Get work items for iteration
         *
         * @param teamContext - The team context for the operation
         * @param iterationId - ID of the iteration
         */
        WorkRestClient.prototype.getIterationWorkItems = function (teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/workitems",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            }
                        })];
                });
            });
        };
        /**
         * Reorder Product Backlog/Boards Work Items
         *
         * @param operation -
         * @param teamContext - The team context for the operation
         */
        WorkRestClient.prototype.reorderBacklogWorkItems = function (operation, teamContext) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/workitemsorder",
                            routeValues: {
                                project: project,
                                team: team
                            },
                            body: operation
                        })];
                });
            });
        };
        /**
         * Reorder Sprint Backlog/Taskboard Work Items
         *
         * @param operation -
         * @param teamContext - The team context for the operation
         * @param iterationId - The id of the iteration
         */
        WorkRestClient.prototype.reorderIterationWorkItems = function (operation, teamContext, iterationId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, team;
                return __generator(this, function (_a) {
                    project = teamContext.projectId || teamContext.project;
                    team = teamContext.teamId || teamContext.team;
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/{team}/_apis/work/iterations/{iterationId}/workitemsorder",
                            routeValues: {
                                project: project,
                                team: team,
                                iterationId: iterationId
                            },
                            body: operation
                        })];
                });
            });
        };
        WorkRestClient.RESOURCE_AREA_ID = "1d4f49f9-02b9-4e26-b826-2cdb6195f2a9";
        return WorkRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.WorkRestClient = WorkRestClient;
});
