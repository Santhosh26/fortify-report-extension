/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The current state of a feature within a given scope
     */
    var ContributedFeatureEnabledValue;
    (function (ContributedFeatureEnabledValue) {
        /**
         * The state of the feature is not set for the specified scope
         */
        ContributedFeatureEnabledValue[ContributedFeatureEnabledValue["Undefined"] = -1] = "Undefined";
        /**
         * The feature is disabled at the specified scope
         */
        ContributedFeatureEnabledValue[ContributedFeatureEnabledValue["Disabled"] = 0] = "Disabled";
        /**
         * The feature is enabled at the specified scope
         */
        ContributedFeatureEnabledValue[ContributedFeatureEnabledValue["Enabled"] = 1] = "Enabled";
    })(ContributedFeatureEnabledValue = exports.ContributedFeatureEnabledValue || (exports.ContributedFeatureEnabledValue = {}));
});
