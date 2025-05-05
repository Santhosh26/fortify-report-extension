/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * How the acquisition is assigned
     */
    var AcquisitionAssignmentType;
    (function (AcquisitionAssignmentType) {
        AcquisitionAssignmentType[AcquisitionAssignmentType["None"] = 0] = "None";
        /**
         * Just assign for me
         */
        AcquisitionAssignmentType[AcquisitionAssignmentType["Me"] = 1] = "Me";
        /**
         * Assign for all users in the account
         */
        AcquisitionAssignmentType[AcquisitionAssignmentType["All"] = 2] = "All";
    })(AcquisitionAssignmentType = exports.AcquisitionAssignmentType || (exports.AcquisitionAssignmentType = {}));
    var AcquisitionOperationState;
    (function (AcquisitionOperationState) {
        /**
         * Not allowed to use this AcquisitionOperation
         */
        AcquisitionOperationState[AcquisitionOperationState["Disallow"] = 0] = "Disallow";
        /**
         * Allowed to use this AcquisitionOperation
         */
        AcquisitionOperationState[AcquisitionOperationState["Allow"] = 1] = "Allow";
        /**
         * Operation has already been completed and is no longer available
         */
        AcquisitionOperationState[AcquisitionOperationState["Completed"] = 3] = "Completed";
    })(AcquisitionOperationState = exports.AcquisitionOperationState || (exports.AcquisitionOperationState = {}));
    /**
     * Set of different types of operations that can be requested.
     */
    var AcquisitionOperationType;
    (function (AcquisitionOperationType) {
        /**
         * Not yet used
         */
        AcquisitionOperationType[AcquisitionOperationType["Get"] = 0] = "Get";
        /**
         * Install this extension into the host provided
         */
        AcquisitionOperationType[AcquisitionOperationType["Install"] = 1] = "Install";
        /**
         * Buy licenses for this extension and install into the host provided
         */
        AcquisitionOperationType[AcquisitionOperationType["Buy"] = 2] = "Buy";
        /**
         * Try this extension
         */
        AcquisitionOperationType[AcquisitionOperationType["Try"] = 3] = "Try";
        /**
         * Request this extension for installation
         */
        AcquisitionOperationType[AcquisitionOperationType["Request"] = 4] = "Request";
        /**
         * No action found
         */
        AcquisitionOperationType[AcquisitionOperationType["None"] = 5] = "None";
        /**
         * Request admins for purchasing extension
         */
        AcquisitionOperationType[AcquisitionOperationType["PurchaseRequest"] = 6] = "PurchaseRequest";
    })(AcquisitionOperationType = exports.AcquisitionOperationType || (exports.AcquisitionOperationType = {}));
    /**
     * Represents different ways of including contributions based on licensing
     */
    var ContributionLicensingBehaviorType;
    (function (ContributionLicensingBehaviorType) {
        /**
         * Default value - only include the contribution if the user is licensed for the extension
         */
        ContributionLicensingBehaviorType[ContributionLicensingBehaviorType["OnlyIfLicensed"] = 0] = "OnlyIfLicensed";
        /**
         * Only include the contribution if the user is NOT licensed for the extension
         */
        ContributionLicensingBehaviorType[ContributionLicensingBehaviorType["OnlyIfUnlicensed"] = 1] = "OnlyIfUnlicensed";
        /**
         * Always include the contribution regardless of whether or not the user is licensed for the extension
         */
        ContributionLicensingBehaviorType[ContributionLicensingBehaviorType["AlwaysInclude"] = 2] = "AlwaysInclude";
    })(ContributionLicensingBehaviorType = exports.ContributionLicensingBehaviorType || (exports.ContributionLicensingBehaviorType = {}));
    /**
     * The type of value used for a property
     */
    var ContributionPropertyType;
    (function (ContributionPropertyType) {
        /**
         * Contribution type is unknown (value may be anything)
         */
        ContributionPropertyType[ContributionPropertyType["Unknown"] = 0] = "Unknown";
        /**
         * Value is a string
         */
        ContributionPropertyType[ContributionPropertyType["String"] = 1] = "String";
        /**
         * Value is a Uri
         */
        ContributionPropertyType[ContributionPropertyType["Uri"] = 2] = "Uri";
        /**
         * Value is a GUID
         */
        ContributionPropertyType[ContributionPropertyType["Guid"] = 4] = "Guid";
        /**
         * Value is True or False
         */
        ContributionPropertyType[ContributionPropertyType["Boolean"] = 8] = "Boolean";
        /**
         * Value is an integer
         */
        ContributionPropertyType[ContributionPropertyType["Integer"] = 16] = "Integer";
        /**
         * Value is a double
         */
        ContributionPropertyType[ContributionPropertyType["Double"] = 32] = "Double";
        /**
         * Value is a DateTime object
         */
        ContributionPropertyType[ContributionPropertyType["DateTime"] = 64] = "DateTime";
        /**
         * Value is a generic Dictionary/JObject/property bag
         */
        ContributionPropertyType[ContributionPropertyType["Dictionary"] = 128] = "Dictionary";
        /**
         * Value is an array
         */
        ContributionPropertyType[ContributionPropertyType["Array"] = 256] = "Array";
        /**
         * Value is an arbitrary/custom object
         */
        ContributionPropertyType[ContributionPropertyType["Object"] = 512] = "Object";
    })(ContributionPropertyType = exports.ContributionPropertyType || (exports.ContributionPropertyType = {}));
    /**
     * Options that control the contributions to include in a query
     */
    var ContributionQueryOptions;
    (function (ContributionQueryOptions) {
        ContributionQueryOptions[ContributionQueryOptions["None"] = 0] = "None";
        /**
         * Include the direct contributions that have the ids queried.
         */
        ContributionQueryOptions[ContributionQueryOptions["IncludeSelf"] = 16] = "IncludeSelf";
        /**
         * Include the contributions that directly target the contributions queried.
         */
        ContributionQueryOptions[ContributionQueryOptions["IncludeChildren"] = 32] = "IncludeChildren";
        /**
         * Include the contributions from the entire sub-tree targeting the contributions queried.
         */
        ContributionQueryOptions[ContributionQueryOptions["IncludeSubTree"] = 96] = "IncludeSubTree";
        /**
         * Include the contribution being queried as well as all contributions that target them recursively.
         */
        ContributionQueryOptions[ContributionQueryOptions["IncludeAll"] = 112] = "IncludeAll";
        /**
         * Some callers may want the entire tree back without constraint evaluation being performed.
         */
        ContributionQueryOptions[ContributionQueryOptions["IgnoreConstraints"] = 256] = "IgnoreConstraints";
    })(ContributionQueryOptions = exports.ContributionQueryOptions || (exports.ContributionQueryOptions = {}));
    /**
     * Set of flags applied to extensions that are relevant to contribution consumers
     */
    var ExtensionFlags;
    (function (ExtensionFlags) {
        /**
         * A built-in extension is installed for all VSTS accounts by default
         */
        ExtensionFlags[ExtensionFlags["BuiltIn"] = 1] = "BuiltIn";
        /**
         * The extension comes from a fully-trusted publisher
         */
        ExtensionFlags[ExtensionFlags["Trusted"] = 2] = "Trusted";
    })(ExtensionFlags = exports.ExtensionFlags || (exports.ExtensionFlags = {}));
    /**
     * Represents the state of an extension request
     */
    var ExtensionRequestState;
    (function (ExtensionRequestState) {
        /**
         * The request has been opened, but not yet responded to
         */
        ExtensionRequestState[ExtensionRequestState["Open"] = 0] = "Open";
        /**
         * The request was accepted (extension installed or license assigned)
         */
        ExtensionRequestState[ExtensionRequestState["Accepted"] = 1] = "Accepted";
        /**
         * The request was rejected (extension not installed or license not assigned)
         */
        ExtensionRequestState[ExtensionRequestState["Rejected"] = 2] = "Rejected";
    })(ExtensionRequestState = exports.ExtensionRequestState || (exports.ExtensionRequestState = {}));
    var ExtensionRequestUpdateType;
    (function (ExtensionRequestUpdateType) {
        ExtensionRequestUpdateType[ExtensionRequestUpdateType["Created"] = 1] = "Created";
        ExtensionRequestUpdateType[ExtensionRequestUpdateType["Approved"] = 2] = "Approved";
        ExtensionRequestUpdateType[ExtensionRequestUpdateType["Rejected"] = 3] = "Rejected";
        ExtensionRequestUpdateType[ExtensionRequestUpdateType["Deleted"] = 4] = "Deleted";
    })(ExtensionRequestUpdateType = exports.ExtensionRequestUpdateType || (exports.ExtensionRequestUpdateType = {}));
    /**
     * States of an extension Note:  If you add value to this enum, you need to do 2 other things.  First add the back compat enum in value src\\Vssf\\Sdk\\Server\\Contributions\\InstalledExtensionMessage.cs.  Second, you can not send the new value on the message bus.  You need to remove it from the message bus event prior to being sent.
     */
    var ExtensionStateFlags;
    (function (ExtensionStateFlags) {
        /**
         * No flags set
         */
        ExtensionStateFlags[ExtensionStateFlags["None"] = 0] = "None";
        /**
         * Extension is disabled
         */
        ExtensionStateFlags[ExtensionStateFlags["Disabled"] = 1] = "Disabled";
        /**
         * Extension is a built in
         */
        ExtensionStateFlags[ExtensionStateFlags["BuiltIn"] = 2] = "BuiltIn";
        /**
         * Extension has multiple versions
         */
        ExtensionStateFlags[ExtensionStateFlags["MultiVersion"] = 4] = "MultiVersion";
        /**
         * Extension is not installed.  This is for builtin extensions only and can not otherwise be set.
         */
        ExtensionStateFlags[ExtensionStateFlags["UnInstalled"] = 8] = "UnInstalled";
        /**
         * Error performing version check
         */
        ExtensionStateFlags[ExtensionStateFlags["VersionCheckError"] = 16] = "VersionCheckError";
        /**
         * Trusted extensions are ones that are given special capabilities. These tend to come from Microsoft and can't be published by the general public.  Note: BuiltIn extensions are always trusted.
         */
        ExtensionStateFlags[ExtensionStateFlags["Trusted"] = 32] = "Trusted";
        /**
         * Extension is currently in an error state
         */
        ExtensionStateFlags[ExtensionStateFlags["Error"] = 64] = "Error";
        /**
         * Extension scopes have changed and the extension requires re-authorization
         */
        ExtensionStateFlags[ExtensionStateFlags["NeedsReauthorization"] = 128] = "NeedsReauthorization";
        /**
         * Error performing auto-upgrade. For example, if the new version has demands not supported the extension cannot be auto-upgraded.
         */
        ExtensionStateFlags[ExtensionStateFlags["AutoUpgradeError"] = 256] = "AutoUpgradeError";
        /**
         * Extension is currently in a warning state, that can cause a degraded experience. The degraded experience can be caused for example by some installation issues detected such as implicit demands not supported.
         */
        ExtensionStateFlags[ExtensionStateFlags["Warning"] = 512] = "Warning";
        /**
         * Extension is currently unpublished in the marketplace. Extension usage should be reviewed and removed if it is no longer needed
         */
        ExtensionStateFlags[ExtensionStateFlags["Unpublished"] = 1024] = "Unpublished";
    })(ExtensionStateFlags = exports.ExtensionStateFlags || (exports.ExtensionStateFlags = {}));
    var ExtensionUpdateType;
    (function (ExtensionUpdateType) {
        ExtensionUpdateType[ExtensionUpdateType["Installed"] = 1] = "Installed";
        ExtensionUpdateType[ExtensionUpdateType["Uninstalled"] = 2] = "Uninstalled";
        ExtensionUpdateType[ExtensionUpdateType["Enabled"] = 3] = "Enabled";
        ExtensionUpdateType[ExtensionUpdateType["Disabled"] = 4] = "Disabled";
        ExtensionUpdateType[ExtensionUpdateType["VersionUpdated"] = 5] = "VersionUpdated";
        ExtensionUpdateType[ExtensionUpdateType["ActionRequired"] = 6] = "ActionRequired";
        ExtensionUpdateType[ExtensionUpdateType["ActionResolved"] = 7] = "ActionResolved";
    })(ExtensionUpdateType = exports.ExtensionUpdateType || (exports.ExtensionUpdateType = {}));
    /**
     * Installation issue type (Warning, Error)
     */
    var InstalledExtensionStateIssueType;
    (function (InstalledExtensionStateIssueType) {
        /**
         * Represents an installation warning, for example an implicit demand not supported
         */
        InstalledExtensionStateIssueType[InstalledExtensionStateIssueType["Warning"] = 0] = "Warning";
        /**
         * Represents an installation error, for example an explicit demand not supported
         */
        InstalledExtensionStateIssueType[InstalledExtensionStateIssueType["Error"] = 1] = "Error";
    })(InstalledExtensionStateIssueType = exports.InstalledExtensionStateIssueType || (exports.InstalledExtensionStateIssueType = {}));
});
