define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contribution ids of Azure Pipelines services which can be obtained from DevOps.getService
     */
    var BuildServiceIds;
    (function (BuildServiceIds) {
        /**
         * Service for getting contextual information when on a builds page
         */
        BuildServiceIds["BuildPageDataService"] = "ms.vss-build-web.build-page-data-service";
    })(BuildServiceIds = exports.BuildServiceIds || (exports.BuildServiceIds = {}));
});
