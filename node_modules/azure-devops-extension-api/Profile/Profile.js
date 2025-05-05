/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Small = 34 x 34 pixels; Medium = 44 x 44 pixels; Large = 220 x 220 pixels
     */
    var AvatarSize;
    (function (AvatarSize) {
        AvatarSize[AvatarSize["Small"] = 0] = "Small";
        AvatarSize[AvatarSize["Medium"] = 1] = "Medium";
        AvatarSize[AvatarSize["Large"] = 2] = "Large";
    })(AvatarSize = exports.AvatarSize || (exports.AvatarSize = {}));
    /**
     * The state of a profile.
     */
    var ProfileState;
    (function (ProfileState) {
        /**
         * The profile is in use.
         */
        ProfileState[ProfileState["Custom"] = 0] = "Custom";
        /**
         * The profile is in use, but can only be read.
         */
        ProfileState[ProfileState["CustomReadOnly"] = 1] = "CustomReadOnly";
        /**
         * The profile may only be read.
         */
        ProfileState[ProfileState["ReadOnly"] = 2] = "ReadOnly";
    })(ProfileState = exports.ProfileState || (exports.ProfileState = {}));
});
