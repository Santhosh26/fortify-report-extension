/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConnectedServiceKind;
    (function (ConnectedServiceKind) {
        /**
         * Custom or unknown service
         */
        ConnectedServiceKind[ConnectedServiceKind["Custom"] = 0] = "Custom";
        /**
         * Azure Subscription
         */
        ConnectedServiceKind[ConnectedServiceKind["AzureSubscription"] = 1] = "AzureSubscription";
        /**
         * Chef Connection
         */
        ConnectedServiceKind[ConnectedServiceKind["Chef"] = 2] = "Chef";
        /**
         * Generic Connection
         */
        ConnectedServiceKind[ConnectedServiceKind["Generic"] = 3] = "Generic";
    })(ConnectedServiceKind = exports.ConnectedServiceKind || (exports.ConnectedServiceKind = {}));
    /**
     * Type of process customization on a collection.
     */
    var ProcessCustomizationType;
    (function (ProcessCustomizationType) {
        /**
         * Process customization can't be computed.
         */
        ProcessCustomizationType[ProcessCustomizationType["Unknown"] = -1] = "Unknown";
        /**
         * Customization based on project-scoped xml customization
         */
        ProcessCustomizationType[ProcessCustomizationType["Xml"] = 0] = "Xml";
        /**
         * Customization based on process inheritance
         */
        ProcessCustomizationType[ProcessCustomizationType["Inherited"] = 1] = "Inherited";
    })(ProcessCustomizationType = exports.ProcessCustomizationType || (exports.ProcessCustomizationType = {}));
    var ProcessType;
    (function (ProcessType) {
        ProcessType[ProcessType["System"] = 0] = "System";
        ProcessType[ProcessType["Custom"] = 1] = "Custom";
        ProcessType[ProcessType["Inherited"] = 2] = "Inherited";
    })(ProcessType = exports.ProcessType || (exports.ProcessType = {}));
    var ProjectChangeType;
    (function (ProjectChangeType) {
        ProjectChangeType[ProjectChangeType["Modified"] = 0] = "Modified";
        ProjectChangeType[ProjectChangeType["Deleted"] = 1] = "Deleted";
        ProjectChangeType[ProjectChangeType["Added"] = 2] = "Added";
    })(ProjectChangeType = exports.ProjectChangeType || (exports.ProjectChangeType = {}));
    var ProjectVisibility;
    (function (ProjectVisibility) {
        ProjectVisibility[ProjectVisibility["Unchanged"] = -1] = "Unchanged";
        /**
         * The project is only visible to users with explicit access.
         */
        ProjectVisibility[ProjectVisibility["Private"] = 0] = "Private";
        /**
         * Enterprise level project visibility
         */
        ProjectVisibility[ProjectVisibility["Organization"] = 1] = "Organization";
        /**
         * The project is visible to all.
         */
        ProjectVisibility[ProjectVisibility["Public"] = 2] = "Public";
        ProjectVisibility[ProjectVisibility["SystemPrivate"] = 3] = "SystemPrivate";
    })(ProjectVisibility = exports.ProjectVisibility || (exports.ProjectVisibility = {}));
    var SourceControlTypes;
    (function (SourceControlTypes) {
        SourceControlTypes[SourceControlTypes["Tfvc"] = 1] = "Tfvc";
        SourceControlTypes[SourceControlTypes["Git"] = 2] = "Git";
    })(SourceControlTypes = exports.SourceControlTypes || (exports.SourceControlTypes = {}));
});
