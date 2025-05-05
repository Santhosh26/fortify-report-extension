define(["require", "exports", "azure-devops-extension-sdk"], function (require, exports, azure_devops_extension_sdk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getClient(clientClass, clientOptions) {
        var options = clientOptions || {};
        if (!options.rootPath) {
            options.rootPath = azure_devops_extension_sdk_1.getService("ms.vss-features.location-service" /* LocationService */).then(function (locationService) {
                if (clientClass.RESOURCE_AREA_ID) {
                    return locationService.getResourceAreaLocation(clientClass.RESOURCE_AREA_ID);
                }
                else {
                    return locationService.getServiceLocation();
                }
            });
        }
        if (!options.authTokenProvider) {
            options.authTokenProvider = {
                getAuthorizationHeader: function () {
                    return azure_devops_extension_sdk_1.getAccessToken().then(function (token) { return token ? ("Bearer " + token) : ""; });
                }
            };
        }
        return new clientClass(options);
    }
    exports.getClient = getClient;
});
