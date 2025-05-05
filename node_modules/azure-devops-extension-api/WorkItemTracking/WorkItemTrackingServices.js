define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contribution ids of Azure Boards services which can be obtained from DevOps.getService
     */
    var WorkItemTrackingServiceIds;
    (function (WorkItemTrackingServiceIds) {
        /**
         * Host service for opening the work item form
         */
        WorkItemTrackingServiceIds["WorkItemFormNavigationService"] = "ms.vss-work-web.work-item-form-navigation-service";
        /**
         * Host service for interacting with the currently active work item form (work item currently displayed in the UI).
         * Form service depends on the current active work item context. Will throw an error when there is no open work item.
         */
        WorkItemTrackingServiceIds["WorkItemFormService"] = "ms.vss-work-web.work-item-form";
    })(WorkItemTrackingServiceIds = exports.WorkItemTrackingServiceIds || (exports.WorkItemTrackingServiceIds = {}));
});
