/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AggregationType;
    (function (AggregationType) {
        AggregationType[AggregationType["Hourly"] = 0] = "Hourly";
        AggregationType[AggregationType["Daily"] = 1] = "Daily";
    })(AggregationType = exports.AggregationType || (exports.AggregationType = {}));
    var ResultPhase;
    (function (ResultPhase) {
        ResultPhase[ResultPhase["Preliminary"] = 0] = "Preliminary";
        ResultPhase[ResultPhase["Full"] = 1] = "Full";
    })(ResultPhase = exports.ResultPhase || (exports.ResultPhase = {}));
});
