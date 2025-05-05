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
    var WorkItemTrackingProcessDefinitionsRestClient = /** @class */ (function (_super) {
        __extends(WorkItemTrackingProcessDefinitionsRestClient, _super);
        function WorkItemTrackingProcessDefinitionsRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Creates a single behavior in the given process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.createBehavior = function (behavior, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
                            routeValues: {
                                processId: processId
                            },
                            body: behavior
                        })];
                });
            });
        };
        /**
         * Removes a behavior in the process.
         *
         * @param processId - The ID of the process
         * @param behaviorId - The ID of the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.deleteBehavior = function (processId, behaviorId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
                            routeValues: {
                                processId: processId,
                                behaviorId: behaviorId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a single behavior in the process.
         *
         * @param processId - The ID of the process
         * @param behaviorId - The ID of the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getBehavior = function (processId, behaviorId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
                            routeValues: {
                                processId: processId,
                                behaviorId: behaviorId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of all behaviors in the process.
         *
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getBehaviors = function (processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
                            routeValues: {
                                processId: processId
                            }
                        })];
                });
            });
        };
        /**
         * Replaces a behavior in the process.
         *
         * @param behaviorData -
         * @param processId - The ID of the process
         * @param behaviorId - The ID of the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.replaceBehavior = function (behaviorData, processId, behaviorId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
                            routeValues: {
                                processId: processId,
                                behaviorId: behaviorId
                            },
                            body: behaviorData
                        })];
                });
            });
        };
        /**
         * Creates a control in a group
         *
         * @param control - The control
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param groupId - The ID of the group to add the control to
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.addControlToGroup = function (control, processId, witRefName, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                groupId: groupId
                            },
                            body: control
                        })];
                });
            });
        };
        /**
         * Updates a control on the work item form
         *
         * @param control - The updated control
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param groupId - The ID of the group
         * @param controlId - The ID of the control
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.editControl = function (control, processId, witRefName, groupId, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                groupId: groupId,
                                controlId: controlId
                            },
                            body: control
                        })];
                });
            });
        };
        /**
         * Removes a control from the work item form
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param groupId - The ID of the group
         * @param controlId - The ID of the control to remove
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.removeControlFromGroup = function (processId, witRefName, groupId, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                groupId: groupId,
                                controlId: controlId
                            }
                        })];
                });
            });
        };
        /**
         * Moves a control to a new group
         *
         * @param control - The control
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param groupId - The ID of the group to move the control to
         * @param controlId - The id of the control
         * @param removeFromGroupId - The group to remove the control from
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.setControlInGroup = function (control, processId, witRefName, groupId, controlId, removeFromGroupId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        removeFromGroupId: removeFromGroupId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                groupId: groupId,
                                controlId: controlId
                            },
                            queryParams: queryValues,
                            body: control
                        })];
                });
            });
        };
        /**
         * Creates a single field in the process.
         *
         * @param field -
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.createField = function (field, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/fields/{field}",
                            routeValues: {
                                processId: processId
                            },
                            body: field
                        })];
                });
            });
        };
        /**
         * Updates a given field in the process.
         *
         * @param field -
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateField = function (field, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/fields/{field}",
                            routeValues: {
                                processId: processId
                            },
                            body: field
                        })];
                });
            });
        };
        /**
         * Adds a group to the work item form
         *
         * @param group - The group
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page to add the group to
         * @param sectionId - The ID of the section to add the group to
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.addGroup = function (group, processId, witRefName, pageId, sectionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId,
                                sectionId: sectionId
                            },
                            body: group
                        })];
                });
            });
        };
        /**
         * Updates a group in the work item form
         *
         * @param group - The updated group
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page the group is in
         * @param sectionId - The ID of the section the group is in
         * @param groupId - The ID of the group
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.editGroup = function (group, processId, witRefName, pageId, sectionId, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId,
                                sectionId: sectionId,
                                groupId: groupId
                            },
                            body: group
                        })];
                });
            });
        };
        /**
         * Removes a group from the work item form
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page the group is in
         * @param sectionId - The ID of the section to the group is in
         * @param groupId - The ID of the group
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.removeGroup = function (processId, witRefName, pageId, sectionId, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId,
                                sectionId: sectionId,
                                groupId: groupId
                            }
                        })];
                });
            });
        };
        /**
         * Moves a group to a different page and section
         *
         * @param group - The updated group
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page the group is in
         * @param sectionId - The ID of the section the group is in
         * @param groupId - The ID of the group
         * @param removeFromPageId - ID of the page to remove the group from
         * @param removeFromSectionId - ID of the section to remove the group from
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.setGroupInPage = function (group, processId, witRefName, pageId, sectionId, groupId, removeFromPageId, removeFromSectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        removeFromPageId: removeFromPageId,
                        removeFromSectionId: removeFromSectionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId,
                                sectionId: sectionId,
                                groupId: groupId
                            },
                            queryParams: queryValues,
                            body: group
                        })];
                });
            });
        };
        /**
         * Moves a group to a different section
         *
         * @param group - The updated group
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page the group is in
         * @param sectionId - The ID of the section the group is in
         * @param groupId - The ID of the group
         * @param removeFromSectionId - ID of the section to remove the group from
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.setGroupInSection = function (group, processId, witRefName, pageId, sectionId, groupId, removeFromSectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        removeFromSectionId: removeFromSectionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId,
                                sectionId: sectionId,
                                groupId: groupId
                            },
                            queryParams: queryValues,
                            body: group
                        })];
                });
            });
        };
        /**
         * Gets the form layout
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getFormLayout = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns meta data of the picklist.
         *
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getListsMetadata = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/lists"
                        })];
                });
            });
        };
        /**
         * Creates a picklist.
         *
         * @param picklist -
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.createList = function (picklist) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
                            body: picklist
                        })];
                });
            });
        };
        /**
         * Removes a picklist.
         *
         * @param listId - The ID of the list
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.deleteList = function (listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
                            routeValues: {
                                listId: listId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a picklist.
         *
         * @param listId - The ID of the list
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getList = function (listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
                            routeValues: {
                                listId: listId
                            }
                        })];
                });
            });
        };
        /**
         * Updates a list.
         *
         * @param picklist -
         * @param listId - The ID of the list
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateList = function (picklist, listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
                            routeValues: {
                                listId: listId
                            },
                            body: picklist
                        })];
                });
            });
        };
        /**
         * Adds a page to the work item form
         *
         * @param page - The page
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.addPage = function (page, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: page
                        })];
                });
            });
        };
        /**
         * Updates a page on the work item form
         *
         * @param page - The page
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.editPage = function (page, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: page
                        })];
                });
            });
        };
        /**
         * Removes a page from the work item form
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.removePage = function (processId, witRefName, pageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                pageId: pageId
                            }
                        })];
                });
            });
        };
        /**
         * Creates a state definition in the work item type of the process.
         *
         * @param stateModel -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.createStateDefinition = function (stateModel, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: stateModel
                        })];
                });
            });
        };
        /**
         * Removes a state definition in the work item type of the process.
         *
         * @param processId - ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - ID of the state
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.deleteStateDefinition = function (processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                stateId: stateId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a state definition in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - The ID of the state
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getStateDefinition = function (processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                stateId: stateId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of all state definitions in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getStateDefinitions = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Hides a state definition in the work item type of the process.
         *
         * @param hideStateModel -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - The ID of the state
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.hideStateDefinition = function (hideStateModel, processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                stateId: stateId
                            },
                            body: hideStateModel
                        })];
                });
            });
        };
        /**
         * Updates a given state definition in the work item type of the process.
         *
         * @param stateModel -
         * @param processId - ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - ID of the state
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateStateDefinition = function (stateModel, processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                stateId: stateId
                            },
                            body: stateModel
                        })];
                });
            });
        };
        /**
         * Adds a behavior to the work item type of the process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.addBehaviorToWorkItemType = function (behavior, processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors
                            },
                            body: behavior
                        })];
                });
            });
        };
        /**
         * Returns a behavior for the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         * @param behaviorRefName - The reference name of the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getBehaviorForWorkItemType = function (processId, witRefNameForBehaviors, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors,
                                behaviorRefName: behaviorRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of all behaviors for the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getBehaviorsForWorkItemType = function (processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors
                            }
                        })];
                });
            });
        };
        /**
         * Removes a behavior for the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         * @param behaviorRefName - The reference name of the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.removeBehaviorFromWorkItemType = function (processId, witRefNameForBehaviors, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors,
                                behaviorRefName: behaviorRefName
                            }
                        })];
                });
            });
        };
        /**
         * Updates default work item type for the behavior of the process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateBehaviorToWorkItemType = function (behavior, processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors
                            },
                            body: behavior
                        })];
                });
            });
        };
        /**
         * Creates a work item type in the process.
         *
         * @param workItemType -
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.createWorkItemType = function (workItemType, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId
                            },
                            body: workItemType
                        })];
                });
            });
        };
        /**
         * Removes a work item type in the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.deleteWorkItemType = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param expand -
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getWorkItemType = function (processId, witRefName, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns a list of all work item types in the process.
         *
         * @param processId - The ID of the process
         * @param expand -
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getWorkItemTypes = function (processId, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Updates a work item type of the process.
         *
         * @param workItemTypeUpdate -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateWorkItemType = function (workItemTypeUpdate, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: workItemTypeUpdate
                        })];
                });
            });
        };
        /**
         * Adds a field to the work item type in the process.
         *
         * @param field -
         * @param processId - The ID of the process
         * @param witRefNameForFields - Work item type reference name for the field
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.addFieldToWorkItemType = function (field, processId, witRefNameForFields) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForFields: witRefNameForFields
                            },
                            body: field
                        })];
                });
            });
        };
        /**
         * Returns a single field in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForFields - Work item type reference name for fields
         * @param fieldRefName - The reference name of the field
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getWorkItemTypeField = function (processId, witRefNameForFields, fieldRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForFields: witRefNameForFields,
                                fieldRefName: fieldRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of all fields in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForFields - Work item type reference name for fields
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.getWorkItemTypeFields = function (processId, witRefNameForFields) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForFields: witRefNameForFields
                            }
                        })];
                });
            });
        };
        /**
         * Removes a field in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefNameForFields - Work item type reference name for fields
         * @param fieldRefName - The reference name of the field
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.removeFieldFromWorkItemType = function (processId, witRefNameForFields, fieldRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForFields: witRefNameForFields,
                                fieldRefName: fieldRefName
                            }
                        })];
                });
            });
        };
        /**
         * Updates a single field in the scope of the given process and work item type.
         *
         * @param field - The model with which to update the field
         * @param processId - The ID of the process
         * @param witRefNameForFields - Work item type reference name for fields
         */
        WorkItemTrackingProcessDefinitionsRestClient.prototype.updateWorkItemTypeField = function (field, processId, witRefNameForFields) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForFields: witRefNameForFields
                            },
                            body: field
                        })];
                });
            });
        };
        WorkItemTrackingProcessDefinitionsRestClient.RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";
        return WorkItemTrackingProcessDefinitionsRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.WorkItemTrackingProcessDefinitionsRestClient = WorkItemTrackingProcessDefinitionsRestClient;
});
