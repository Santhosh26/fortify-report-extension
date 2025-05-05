/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Compression type for file stored in Blobstore
     */
    var BlobCompressionType;
    (function (BlobCompressionType) {
        BlobCompressionType[BlobCompressionType["None"] = 0] = "None";
        BlobCompressionType[BlobCompressionType["GZip"] = 1] = "GZip";
    })(BlobCompressionType = exports.BlobCompressionType || (exports.BlobCompressionType = {}));
    /**
     * Status of a container item.
     */
    var ContainerItemStatus;
    (function (ContainerItemStatus) {
        /**
         * Item is created.
         */
        ContainerItemStatus[ContainerItemStatus["Created"] = 1] = "Created";
        /**
         * Item is a file pending for upload.
         */
        ContainerItemStatus[ContainerItemStatus["PendingUpload"] = 2] = "PendingUpload";
    })(ContainerItemStatus = exports.ContainerItemStatus || (exports.ContainerItemStatus = {}));
    /**
     * Type of a container item.
     */
    var ContainerItemType;
    (function (ContainerItemType) {
        /**
         * Any item type.
         */
        ContainerItemType[ContainerItemType["Any"] = 0] = "Any";
        /**
         * Item is a folder which can have child items.
         */
        ContainerItemType[ContainerItemType["Folder"] = 1] = "Folder";
        /**
         * Item is a file which is stored in the file service.
         */
        ContainerItemType[ContainerItemType["File"] = 2] = "File";
    })(ContainerItemType = exports.ContainerItemType || (exports.ContainerItemType = {}));
    /**
     * Options a container can have.
     */
    var ContainerOptions;
    (function (ContainerOptions) {
        /**
         * No option.
         */
        ContainerOptions[ContainerOptions["None"] = 0] = "None";
    })(ContainerOptions = exports.ContainerOptions || (exports.ContainerOptions = {}));
});
