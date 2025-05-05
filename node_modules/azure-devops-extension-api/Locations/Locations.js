/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InheritLevel;
    (function (InheritLevel) {
        InheritLevel[InheritLevel["None"] = 0] = "None";
        InheritLevel[InheritLevel["Deployment"] = 1] = "Deployment";
        InheritLevel[InheritLevel["Account"] = 2] = "Account";
        InheritLevel[InheritLevel["Collection"] = 4] = "Collection";
        InheritLevel[InheritLevel["All"] = 7] = "All";
    })(InheritLevel = exports.InheritLevel || (exports.InheritLevel = {}));
    var RelativeToSetting;
    (function (RelativeToSetting) {
        RelativeToSetting[RelativeToSetting["Context"] = 0] = "Context";
        RelativeToSetting[RelativeToSetting["WebApplication"] = 2] = "WebApplication";
        RelativeToSetting[RelativeToSetting["FullyQualified"] = 3] = "FullyQualified";
    })(RelativeToSetting = exports.RelativeToSetting || (exports.RelativeToSetting = {}));
    var ServiceStatus;
    (function (ServiceStatus) {
        ServiceStatus[ServiceStatus["Assigned"] = 0] = "Assigned";
        ServiceStatus[ServiceStatus["Active"] = 1] = "Active";
        ServiceStatus[ServiceStatus["Moving"] = 2] = "Moving";
    })(ServiceStatus = exports.ServiceStatus || (exports.ServiceStatus = {}));
});
