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
    var BoardsRestClient = /** @class */ (function (_super) {
        __extends(BoardsRestClient, _super);
        function BoardsRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Add a new board for the project.
         *
         * @param postedBoard - Board definition.
         * @param project - Project ID or project name
         */
        BoardsRestClient.prototype.createBoard = function (postedBoard, project) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{id}",
                            routeValues: {
                                project: project
                            },
                            body: postedBoard
                        })];
                });
            });
        };
        /**
         * Deletes a board.
         *
         * @param project - Project ID or project name
         * @param id - Board identifier.
         */
        BoardsRestClient.prototype.deleteBoard = function (project, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/boards/boards/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Returns information for a board given its unique identifier.
         *
         * @param project - Project ID or project name
         * @param id - Board's unique identifier.
         */
        BoardsRestClient.prototype.getBoard = function (project, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get boards.
         *
         * @param project - Project ID or project name
         * @param top - The maximum number of boards to get.
         * @param skip - The number of boards to skip.
         */
        BoardsRestClient.prototype.getBoards = function (project, top, skip) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$top': top,
                        '$skip': skip
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{id}",
                            routeValues: {
                                project: project
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates a board.
         *
         * @param updatedBoard - New board data.
         * @param project - Project ID or project name
         * @param id - Id of the board to update.
         * @param eTag - Board Latest Changed Date
         */
        BoardsRestClient.prototype.updateBoard = function (updatedBoard, project, id, eTag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/boards/boards/{id}",
                            routeValues: {
                                project: project,
                                id: id
                            },
                            customHeaders: {
                                "ETag": eTag,
                            },
                            body: updatedBoard
                        })];
                });
            });
        };
        /**
         * Creates a new column on a board.
         *
         * @param boardColumn - Column data.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.createBoardColumn = function (boardColumn, project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                board: board
                            },
                            body: boardColumn
                        })];
                });
            });
        };
        /**
         * Deletes a column from a board.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Column identifier.
         * @param forceRemoveItems - Boolean indicating if items are to be force removed during the column delete.
         */
        BoardsRestClient.prototype.deleteBoardColumn = function (project, board, id, forceRemoveItems) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        forceRemoveItems: forceRemoveItems
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets column data for a board given its identifier.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Column identifier.
         */
        BoardsRestClient.prototype.getBoardColumn = function (project, board, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get columns in a board.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.getBoardColumns = function (project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Updates a board column.
         *
         * @param boardColumn - Column data.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Column identifier.
         * @param eTag - Column Latest Changed Date
         */
        BoardsRestClient.prototype.updateBoardColumn = function (boardColumn, project, board, id, eTag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            },
                            customHeaders: {
                                "ETag": eTag,
                            },
                            body: boardColumn
                        })];
                });
            });
        };
        /**
         * Adds a single item to a board.
         *
         * @param item - Item to add to the board.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.addBoardItem = function (item, project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
                            routeValues: {
                                project: project,
                                board: board
                            },
                            body: item
                        })];
                });
            });
        };
        /**
         * Gets data for a single board's item.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Item identifier.
         */
        BoardsRestClient.prototype.getBoardItem = function (project, board, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get items information for a board given its identifier.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.getBoardItems = function (project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
                            routeValues: {
                                project: project,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Removes an item from a board.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Board Item identifier to remove.
         */
        BoardsRestClient.prototype.removeBoardItem = function (project, board, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Updates a single item in a board.
         *
         * @param updateItemDef - Updated item data.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Update item id.
         * @param eTag - Item Latest Changed Date
         */
        BoardsRestClient.prototype.updateBoardItem = function (updateItemDef, project, board, id, eTag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "PUT",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            },
                            customHeaders: {
                                "ETag": eTag,
                            },
                            body: updateItemDef
                        })];
                });
            });
        };
        /**
         * Do an operation on a batch of items.
         *
         * @param batchRequest - Data defining the batch operation.
         * @param project - Project ID or project name
         * @param board - The id of the board containing the items.
         */
        BoardsRestClient.prototype.updateBoardItems = function (batchRequest, project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/itemsbatch",
                            routeValues: {
                                project: project,
                                board: board
                            },
                            body: batchRequest
                        })];
                });
            });
        };
        /**
         * Creates a new row on a board.
         *
         * @param boardRow - Row data.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.createBoardRow = function (boardRow, project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                board: board
                            },
                            body: boardRow
                        })];
                });
            });
        };
        /**
         * Deletes a row from a board.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Row identifier.
         * @param forceRemoveItems - Boolean indicating if items are to be force removed during the row delete.
         */
        BoardsRestClient.prototype.deleteBoardRow = function (project, board, id, forceRemoveItems) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        forceRemoveItems: forceRemoveItems
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "DELETE",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Gets a row given its identifier and board.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Board row identifier.
         */
        BoardsRestClient.prototype.getBoardRow = function (project, board, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * Get rows in a board given its identifier.
         *
         * @param project - Project ID or project name
         * @param board - Board identifier.
         */
        BoardsRestClient.prototype.getBoardRows = function (project, board) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                board: board
                            }
                        })];
                });
            });
        };
        /**
         * Updates a board row.
         *
         * @param boardRow - Row data.
         * @param project - Project ID or project name
         * @param board - Board identifier.
         * @param id - Row identifier.
         * @param eTag - Row Latest Changed Date
         */
        BoardsRestClient.prototype.updateBoardRow = function (boardRow, project, board, id, eTag) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "PATCH",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                id: id
                            },
                            customHeaders: {
                                "ETag": eTag,
                            },
                            body: boardRow
                        })];
                });
            });
        };
        /**
         * Creates a new sync for a column on a board.
         *
         * @param boardSync -
         * @param project - Project ID or project name
         * @param board -
         * @param column -
         */
        BoardsRestClient.prototype.createBoardSyncAction = function (boardSync, project, board, column) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "5.1-preview.1",
                            method: "POST",
                            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{column}/syncActions/{id}",
                            routeValues: {
                                project: project,
                                board: board,
                                column: column
                            },
                            body: boardSync
                        })];
                });
            });
        };
        BoardsRestClient.RESOURCE_AREA_ID = "11635d5f-a4f9-43ea-a48b-d56be43fee0f";
        return BoardsRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.BoardsRestClient = BoardsRestClient;
});
