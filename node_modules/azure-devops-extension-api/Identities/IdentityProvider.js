define(["require", "exports", "azure-devops-extension-sdk"], function (require, exports, azure_devops_extension_sdk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PeoplePickerProvider = /** @class */ (function () {
        function PeoplePickerProvider() {
            var _this = this;
            this.addIdentitiesToMRU = function (identities) {
                return _this.identityService.then(function (identityService) { return identityService.addMruIdentitiesAsync(identities); });
            };
            this.getEntityFromUniqueAttribute = function (entityId) {
                return _this.identityService.then(function (identityService) {
                    return identityService
                        .searchIdentitiesAsync(entityId, ["user"], ["ims", "source"], "uid")
                        .then(function (x) { return x[0]; });
                });
            };
            this.onEmptyInputFocus = function () {
                return _this.identityService.then(function (identityService) {
                    return identityService.getIdentityMruAsync().then(function (identities) {
                        return identities;
                    });
                    ;
                });
            };
            this.onFilterIdentities = function (filter, selectedItems) {
                return _this._onSearchPersona(filter, selectedItems ? selectedItems : []);
            };
            this.onRequestConnectionInformation = function (entity, getDirectReports) {
                return _this.identityService.then(function (identityService) { return identityService.getConnections(entity, getDirectReports); });
            };
            this.removeIdentitiesFromMRU = function (identities) {
                return _this.identityService.then(function (identityService) { return identityService.removeMruIdentitiesAsync(identities); });
            };
            this._onSearchPersona = function (searchText, items) {
                var searchRequest = { query: searchText };
                return _this.identityService.then(function (identityService) {
                    return identityService
                        .searchIdentitiesAsync(searchRequest.query, searchRequest.identityTypes, searchRequest.operationScopes, searchRequest.queryTypeHint, searchRequest.options)
                        .then(function (identities) {
                        return identities.filter(function (identity) { return !items.some(function (selectedIdentity) { return selectedIdentity.entityId === identity.entityId; }); });
                    });
                });
            };
            this.identityService = azure_devops_extension_sdk_1.getService("ms.vss-features.identity-service" /* IdentityService */);
        }
        return PeoplePickerProvider;
    }());
    exports.PeoplePickerProvider = PeoplePickerProvider;
});
