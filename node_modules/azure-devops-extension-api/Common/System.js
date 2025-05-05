/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DayOfWeek;
    (function (DayOfWeek) {
        /**
         * Indicates Sunday.
         */
        DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
        /**
         * Indicates Monday.
         */
        DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
        /**
         * Indicates Tuesday.
         */
        DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
        /**
         * Indicates Wednesday.
         */
        DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
        /**
         * Indicates Thursday.
         */
        DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
        /**
         * Indicates Friday.
         */
        DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
        /**
         * Indicates Saturday.
         */
        DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
    })(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
});
