/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ItemContentType;
    (function (ItemContentType) {
        ItemContentType[ItemContentType["RawText"] = 0] = "RawText";
        ItemContentType[ItemContentType["Base64Encoded"] = 1] = "Base64Encoded";
    })(ItemContentType = exports.ItemContentType || (exports.ItemContentType = {}));
    /**
     * Options for Version handling.
     */
    var TfvcVersionOption;
    (function (TfvcVersionOption) {
        /**
         * None.
         */
        TfvcVersionOption[TfvcVersionOption["None"] = 0] = "None";
        /**
         * Return the previous version.
         */
        TfvcVersionOption[TfvcVersionOption["Previous"] = 1] = "Previous";
        /**
         * Only usuable with versiontype MergeSource and integer versions, uses RenameSource identifier instead of Merge identifier.
         */
        TfvcVersionOption[TfvcVersionOption["UseRename"] = 2] = "UseRename";
    })(TfvcVersionOption = exports.TfvcVersionOption || (exports.TfvcVersionOption = {}));
    /**
     * Type of Version object
     */
    var TfvcVersionType;
    (function (TfvcVersionType) {
        /**
         * Version is treated as a ChangesetId.
         */
        TfvcVersionType[TfvcVersionType["None"] = 0] = "None";
        /**
         * Version is treated as a ChangesetId.
         */
        TfvcVersionType[TfvcVersionType["Changeset"] = 1] = "Changeset";
        /**
         * Version is treated as a Shelveset name and owner.
         */
        TfvcVersionType[TfvcVersionType["Shelveset"] = 2] = "Shelveset";
        /**
         * Version is treated as a Change.
         */
        TfvcVersionType[TfvcVersionType["Change"] = 3] = "Change";
        /**
         * Version is treated as a Date.
         */
        TfvcVersionType[TfvcVersionType["Date"] = 4] = "Date";
        /**
         * If Version is defined the Latest of that Version will be used, if no version is defined the latest ChangesetId will be used.
         */
        TfvcVersionType[TfvcVersionType["Latest"] = 5] = "Latest";
        /**
         * Version will be treated as a Tip, if no version is defined latest will be used.
         */
        TfvcVersionType[TfvcVersionType["Tip"] = 6] = "Tip";
        /**
         * Version will be treated as a MergeSource.
         */
        TfvcVersionType[TfvcVersionType["MergeSource"] = 7] = "MergeSource";
    })(TfvcVersionType = exports.TfvcVersionType || (exports.TfvcVersionType = {}));
    var VersionControlChangeType;
    (function (VersionControlChangeType) {
        VersionControlChangeType[VersionControlChangeType["None"] = 0] = "None";
        VersionControlChangeType[VersionControlChangeType["Add"] = 1] = "Add";
        VersionControlChangeType[VersionControlChangeType["Edit"] = 2] = "Edit";
        VersionControlChangeType[VersionControlChangeType["Encoding"] = 4] = "Encoding";
        VersionControlChangeType[VersionControlChangeType["Rename"] = 8] = "Rename";
        VersionControlChangeType[VersionControlChangeType["Delete"] = 16] = "Delete";
        VersionControlChangeType[VersionControlChangeType["Undelete"] = 32] = "Undelete";
        VersionControlChangeType[VersionControlChangeType["Branch"] = 64] = "Branch";
        VersionControlChangeType[VersionControlChangeType["Merge"] = 128] = "Merge";
        VersionControlChangeType[VersionControlChangeType["Lock"] = 256] = "Lock";
        VersionControlChangeType[VersionControlChangeType["Rollback"] = 512] = "Rollback";
        VersionControlChangeType[VersionControlChangeType["SourceRename"] = 1024] = "SourceRename";
        VersionControlChangeType[VersionControlChangeType["TargetRename"] = 2048] = "TargetRename";
        VersionControlChangeType[VersionControlChangeType["Property"] = 4096] = "Property";
        VersionControlChangeType[VersionControlChangeType["All"] = 8191] = "All";
    })(VersionControlChangeType = exports.VersionControlChangeType || (exports.VersionControlChangeType = {}));
    var VersionControlRecursionType;
    (function (VersionControlRecursionType) {
        /**
         * Only return the specified item.
         */
        VersionControlRecursionType[VersionControlRecursionType["None"] = 0] = "None";
        /**
         * Return the specified item and its direct children.
         */
        VersionControlRecursionType[VersionControlRecursionType["OneLevel"] = 1] = "OneLevel";
        /**
         * Return the specified item and its direct children, as well as recursive chains of nested child folders that only contain a single folder.
         */
        VersionControlRecursionType[VersionControlRecursionType["OneLevelPlusNestedEmptyFolders"] = 4] = "OneLevelPlusNestedEmptyFolders";
        /**
         * Return specified item and all descendants
         */
        VersionControlRecursionType[VersionControlRecursionType["Full"] = 120] = "Full";
    })(VersionControlRecursionType = exports.VersionControlRecursionType || (exports.VersionControlRecursionType = {}));
});
