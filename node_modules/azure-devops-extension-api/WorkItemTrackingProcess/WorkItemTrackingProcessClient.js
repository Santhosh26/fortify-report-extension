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
    var WorkItemTrackingProcessRestClient = /** @class */ (function (_super) {
        __extends(WorkItemTrackingProcessRestClient, _super);
        function WorkItemTrackingProcessRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Creates a single behavior in the given process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         */
        WorkItemTrackingProcessRestClient.prototype.createProcessBehavior = function (behavior, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
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
         * @param behaviorRefName - The reference name of the behavior
         */
        WorkItemTrackingProcessRestClient.prototype.deleteProcessBehavior = function (processId, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                behaviorRefName: behaviorRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a behavior of the process.
         *
         * @param processId - The ID of the process
         * @param behaviorRefName - The reference name of the behavior
         * @param expand -
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessBehavior = function (processId, behaviorRefName, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                behaviorRefName: behaviorRefName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Returns a list of all behaviors in the process.
         *
         * @param processId - The ID of the process
         * @param expand -
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessBehaviors = function (processId, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Replaces a behavior in the process.
         *
         * @param behaviorData -
         * @param processId - The ID of the process
         * @param behaviorRefName - The reference name of the behavior
         */
        WorkItemTrackingProcessRestClient.prototype.updateProcessBehavior = function (behaviorData, processId, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                behaviorRefName: behaviorRefName
                            },
                            body: behaviorData
                        })];
                });
            });
        };
        /**
         * Creates a control in a group.
         *
         * @param control - The control.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param groupId - The ID of the group to add the control to.
         */
        WorkItemTrackingProcessRestClient.prototype.createControlInGroup = function (control, processId, witRefName, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
         * Moves a control to a specified group.
         *
         * @param control - The control.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param groupId - The ID of the group to move the control to.
         * @param controlId - The ID of the control.
         * @param removeFromGroupId - The group ID to remove the control from.
         */
        WorkItemTrackingProcessRestClient.prototype.moveControlToGroup = function (control, processId, witRefName, groupId, controlId, removeFromGroupId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        removeFromGroupId: removeFromGroupId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
         * Removes a control from the work item form.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param groupId - The ID of the group.
         * @param controlId - The ID of the control to remove.
         */
        WorkItemTrackingProcessRestClient.prototype.removeControlFromGroup = function (processId, witRefName, groupId, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
         * Updates a control on the work item form.
         *
         * @param control - The updated control.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param groupId - The ID of the group.
         * @param controlId - The ID of the control.
         */
        WorkItemTrackingProcessRestClient.prototype.updateControl = function (control, processId, witRefName, groupId, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
         * Adds a field to a work item type.
         *
         * @param field -
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.addFieldToWorkItemType = function (field, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: field
                        })];
                });
            });
        };
        /**
         * Returns a list of all fields in a work item type.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.getAllWorkItemTypeFields = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a field in a work item type.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param fieldRefName - The reference name of the field.
         * @param expand -
         */
        WorkItemTrackingProcessRestClient.prototype.getWorkItemTypeField = function (processId, witRefName, fieldRefName, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                fieldRefName: fieldRefName
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Removes a field from a work item type. Does not permanently delete the field.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param fieldRefName - The reference name of the field.
         */
        WorkItemTrackingProcessRestClient.prototype.removeWorkItemTypeField = function (processId, witRefName, fieldRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                fieldRefName: fieldRefName
                            }
                        })];
                });
            });
        };
        /**
         * Updates a field in a work item type.
         *
         * @param field -
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param fieldRefName - The reference name of the field.
         */
        WorkItemTrackingProcessRestClient.prototype.updateWorkItemTypeField = function (field, processId, witRefName, fieldRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                fieldRefName: fieldRefName
                            },
                            body: field
                        })];
                });
            });
        };
        /**
         * Adds a group to the work item form.
         *
         * @param group - The group.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param pageId - The ID of the page to add the group to.
         * @param sectionId - The ID of the section to add the group to.
         */
        WorkItemTrackingProcessRestClient.prototype.addGroup = function (group, processId, witRefName, pageId, sectionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
         * Moves a group to a different page and section.
         *
         * @param group - The updated group.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param pageId - The ID of the page the group is in.
         * @param sectionId - The ID of the section the group is i.n
         * @param groupId - The ID of the group.
         * @param removeFromPageId - ID of the page to remove the group from.
         * @param removeFromSectionId - ID of the section to remove the group from.
         */
        WorkItemTrackingProcessRestClient.prototype.moveGroupToPage = function (group, processId, witRefName, pageId, sectionId, groupId, removeFromPageId, removeFromSectionId) {
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
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
         * Moves a group to a different section.
         *
         * @param group - The updated group.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param pageId - The ID of the page the group is in.
         * @param sectionId - The ID of the section the group is in.
         * @param groupId - The ID of the group.
         * @param removeFromSectionId - ID of the section to remove the group from.
         */
        WorkItemTrackingProcessRestClient.prototype.moveGroupToSection = function (group, processId, witRefName, pageId, sectionId, groupId, removeFromSectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        removeFromSectionId: removeFromSectionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
         * Removes a group from the work item form.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param pageId - The ID of the page the group is in
         * @param sectionId - The ID of the section to the group is in
         * @param groupId - The ID of the group
         */
        WorkItemTrackingProcessRestClient.prototype.removeGroup = function (processId, witRefName, pageId, sectionId, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
         * Updates a group in the work item form.
         *
         * @param group - The updated group.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param pageId - The ID of the page the group is in.
         * @param sectionId - The ID of the section the group is in.
         * @param groupId - The ID of the group.
         */
        WorkItemTrackingProcessRestClient.prototype.updateGroup = function (group, processId, witRefName, pageId, sectionId, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
         * Gets the form layout.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.getFormLayout = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Creates a picklist.
         *
         * @param picklist - Picklist
         */
        WorkItemTrackingProcessRestClient.prototype.createList = function (picklist) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/lists/{listId}",
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
        WorkItemTrackingProcessRestClient.prototype.deleteList = function (listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/lists/{listId}",
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
        WorkItemTrackingProcessRestClient.prototype.getList = function (listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/lists/{listId}",
                            routeValues: {
                                listId: listId
                            }
                        })];
                });
            });
        };
        /**
         * Returns meta data of the picklist.
         *
         */
        WorkItemTrackingProcessRestClient.prototype.getListsMetadata = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/lists/{listId}"
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
        WorkItemTrackingProcessRestClient.prototype.updateList = function (picklist, listId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/lists/{listId}",
                            routeValues: {
                                listId: listId
                            },
                            body: picklist
                        })];
                });
            });
        };
        /**
         * Adds a page to the work item form.
         *
         * @param page - The page.
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.addPage = function (page, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
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
        WorkItemTrackingProcessRestClient.prototype.removePage = function (processId, witRefName, pageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
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
         * Updates a page on the work item form
         *
         * @param page - The page
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessRestClient.prototype.updatePage = function (page, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
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
         * Creates a process.
         *
         * @param createRequest - CreateProcessModel.
         */
        WorkItemTrackingProcessRestClient.prototype.createNewProcess = function (createRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processTypeId}",
                            body: createRequest
                        })];
                });
            });
        };
        /**
         * Removes a process of a specific ID.
         *
         * @param processTypeId -
         */
        WorkItemTrackingProcessRestClient.prototype.deleteProcessById = function (processTypeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processTypeId}",
                            routeValues: {
                                processTypeId: processTypeId
                            }
                        })];
                });
            });
        };
        /**
         * Edit a process of a specific ID.
         *
         * @param updateRequest -
         * @param processTypeId -
         */
        WorkItemTrackingProcessRestClient.prototype.editProcess = function (updateRequest, processTypeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processTypeId}",
                            routeValues: {
                                processTypeId: processTypeId
                            },
                            body: updateRequest
                        })];
                });
            });
        };
        /**
         * Get list of all processes including system and inherited.
         *
         * @param expand -
         */
        WorkItemTrackingProcessRestClient.prototype.getListOfProcesses = function (expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processTypeId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a single process of a specified ID.
         *
         * @param processTypeId -
         * @param expand -
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessByItsId = function (processTypeId, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processTypeId}",
                            routeValues: {
                                processTypeId: processTypeId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Adds a rule to work item type in the process.
         *
         * @param processRuleCreate -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessRestClient.prototype.addProcessWorkItemTypeRule = function (processRuleCreate, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            },
                            body: processRuleCreate
                        })];
                });
            });
        };
        /**
         * Removes a rule from the work item type in the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param ruleId - The ID of the rule
         */
        WorkItemTrackingProcessRestClient.prototype.deleteProcessWorkItemTypeRule = function (processId, witRefName, ruleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                ruleId: ruleId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a single rule in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param ruleId - The ID of the rule
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessWorkItemTypeRule = function (processId, witRefName, ruleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                ruleId: ruleId
                            }
                        })];
                });
            });
        };
        /**
         * Returns a list of all rules in the work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessWorkItemTypeRules = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Updates a rule in the work item type of the process.
         *
         * @param processRule -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param ruleId - The ID of the rule
         */
        WorkItemTrackingProcessRestClient.prototype.updateProcessWorkItemTypeRule = function (processRule, processId, witRefName, ruleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                ruleId: ruleId
                            },
                            body: processRule
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
        WorkItemTrackingProcessRestClient.prototype.createStateDefinition = function (stateModel, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
        WorkItemTrackingProcessRestClient.prototype.deleteStateDefinition = function (processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
         * Returns a single state definition in a work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - The ID of the state
         */
        WorkItemTrackingProcessRestClient.prototype.getStateDefinition = function (processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
         * Returns a list of all state definitions in a work item type of the process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         */
        WorkItemTrackingProcessRestClient.prototype.getStateDefinitions = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Hides a state definition in the work item type of the process.Only states with customizationType:System can be hidden.
         *
         * @param hideStateModel -
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param stateId - The ID of the state
         */
        WorkItemTrackingProcessRestClient.prototype.hideStateDefinition = function (hideStateModel, processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
        WorkItemTrackingProcessRestClient.prototype.updateStateDefinition = function (stateModel, processId, witRefName, stateId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
         * Deletes a system control modification on the work item form.
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param controlId - The ID of the control.
         */
        WorkItemTrackingProcessRestClient.prototype.deleteSystemControl = function (processId, witRefName, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                controlId: controlId
                            }
                        })];
                });
            });
        };
        /**
         * Gets edited system controls for a work item type in a process. To get all system controls (base + edited) use layout API(s)
         *
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.getSystemControls = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Updates/adds a system control on the work item form.
         *
         * @param control -
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         * @param controlId - The ID of the control.
         */
        WorkItemTrackingProcessRestClient.prototype.updateSystemControl = function (control, processId, witRefName, controlId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName,
                                controlId: controlId
                            },
                            body: control
                        })];
                });
            });
        };
        /**
         * Creates a work item type in the process.
         *
         * @param workItemType -
         * @param processId - The ID of the process on which to create work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.createProcessWorkItemType = function (workItemType, processId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
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
         * @param processId - The ID of the process.
         * @param witRefName - The reference name of the work item type.
         */
        WorkItemTrackingProcessRestClient.prototype.deleteProcessWorkItemType = function (processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
                            routeValues: {
                                processId: processId,
                                witRefName: witRefName
                            }
                        })];
                });
            });
        };
        /**
         * Returns a single work item type in a process.
         *
         * @param processId - The ID of the process
         * @param witRefName - The reference name of the work item type
         * @param expand - Flag to determine what properties of work item type to return
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessWorkItemType = function (processId, witRefName, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
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
         * Returns a list of all work item types in a process.
         *
         * @param processId - The ID of the process
         * @param expand - Flag to determine what properties of work item type to return
         */
        WorkItemTrackingProcessRestClient.prototype.getProcessWorkItemTypes = function (processId, expand) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        '$expand': expand
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
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
        WorkItemTrackingProcessRestClient.prototype.updateProcessWorkItemType = function (workItemTypeUpdate, processId, witRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
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
         * Adds a behavior to the work item type of the process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         */
        WorkItemTrackingProcessRestClient.prototype.addBehaviorToWorkItemType = function (behavior, processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
        WorkItemTrackingProcessRestClient.prototype.getBehaviorForWorkItemType = function (processId, witRefNameForBehaviors, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
        WorkItemTrackingProcessRestClient.prototype.getBehaviorsForWorkItemType = function (processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
        WorkItemTrackingProcessRestClient.prototype.removeBehaviorFromWorkItemType = function (processId, witRefNameForBehaviors, behaviorRefName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
         * Updates a behavior for the work item type of the process.
         *
         * @param behavior -
         * @param processId - The ID of the process
         * @param witRefNameForBehaviors - Work item type reference name for the behavior
         */
        WorkItemTrackingProcessRestClient.prototype.updateBehaviorToWorkItemType = function (behavior, processId, witRefNameForBehaviors) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
                            routeValues: {
                                processId: processId,
                                witRefNameForBehaviors: witRefNameForBehaviors
                            },
                            body: behavior
                        })];
                });
            });
        };
        WorkItemTrackingProcessRestClient.RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";
        return WorkItemTrackingProcessRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.WorkItemTrackingProcessRestClient = WorkItemTrackingProcessRestClient;
});
