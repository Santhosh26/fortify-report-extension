/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../Common/RestClientBase"], function (require, exports, RestClientBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProfileRestClient = /** @class */ (function (_super) {
        __extends(ProfileRestClient, _super);
        function ProfileRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * @param id -
         * @param descriptor -
         */
        ProfileRestClient.prototype.deleteProfileAttribute = function (id, descriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        descriptor: descriptor
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "DELETE",
                            routeTemplate: "_apis/Profile/Attributes/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param id -
         * @param descriptor -
         */
        ProfileRestClient.prototype.getProfileAttribute = function (id, descriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        descriptor: descriptor
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/Profile/Attributes/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param id -
         * @param partition -
         * @param modifiedSince -
         * @param modifiedAfterRevision -
         * @param withCoreAttributes -
         * @param coreAttributes -
         */
        ProfileRestClient.prototype.getProfileAttributes = function (id, partition, modifiedSince, modifiedAfterRevision, withCoreAttributes, coreAttributes) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        partition: partition,
                        modifiedSince: modifiedSince,
                        modifiedAfterRevision: modifiedAfterRevision,
                        withCoreAttributes: withCoreAttributes,
                        coreAttributes: coreAttributes
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            routeTemplate: "_apis/Profile/Attributes/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param container -
         * @param id -
         * @param descriptor -
         */
        ProfileRestClient.prototype.setProfileAttribute = function (container, id, descriptor) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        descriptor: descriptor
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PUT",
                            routeTemplate: "_apis/Profile/Attributes/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues,
                            body: container
                        })];
                });
            });
        };
        /**
         * @param attributesCollection -
         * @param id -
         */
        ProfileRestClient.prototype.setProfileAttributes = function (attributesCollection, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.2",
                            method: "PATCH",
                            routeTemplate: "_apis/Profile/Attributes/{id}",
                            routeValues: {
                                id: id
                            },
                            body: attributesCollection
                        })];
                });
            });
        };
        /**
         * @param id -
         * @param size -
         * @param format -
         */
        ProfileRestClient.prototype.getAvatar = function (id, size, format) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        size: size,
                        format: format
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/Profile/Avatar/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param container -
         * @param id -
         * @param size -
         * @param format -
         * @param displayName -
         */
        ProfileRestClient.prototype.getAvatarPreview = function (container, id, size, format, displayName) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        size: size,
                        format: format,
                        displayName: displayName
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/Profile/Avatar/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues,
                            body: container
                        })];
                });
            });
        };
        /**
         * @param id -
         */
        ProfileRestClient.prototype.resetAvatar = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/Profile/Avatar/{id}",
                            routeValues: {
                                id: id
                            }
                        })];
                });
            });
        };
        /**
         * @param container -
         * @param id -
         */
        ProfileRestClient.prototype.setAvatar = function (container, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/Profile/Avatar/{id}",
                            routeValues: {
                                id: id
                            },
                            body: container
                        })];
                });
            });
        };
        /**
         * Create profile
         *
         * @param createProfileContext - Context for profile creation
         * @param autoCreate - Create profile automatically
         */
        ProfileRestClient.prototype.createProfile = function (createProfileContext, autoCreate) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        autoCreate: autoCreate
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "POST",
                            routeTemplate: "_apis/Profile/Profiles/{id}",
                            queryParams: queryValues,
                            body: createProfileContext
                        })];
                });
            });
        };
        /**
         * Gets a user profile.
         *
         * @param id - The ID of the target user profile within the same organization, or 'me' to get the profile of the current authenticated user.
         * @param details - Return public profile information such as display name, email address, country, etc. If false, the withAttributes parameter is ignored.
         * @param withAttributes - If true, gets the attributes (named key-value pairs of arbitrary data) associated with the profile. The partition parameter must also have a value.
         * @param partition - The partition (named group) of attributes to return.
         * @param coreAttributes - A comma-delimited list of core profile attributes to return. Valid values are Email, Avatar, DisplayName, and ContactWithOffers.
         * @param forceRefresh - Not used in this version of the API.
         */
        ProfileRestClient.prototype.getProfile = function (id, details, withAttributes, partition, coreAttributes, forceRefresh) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        details: details,
                        withAttributes: withAttributes,
                        partition: partition,
                        coreAttributes: coreAttributes,
                        forceRefresh: forceRefresh
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            routeTemplate: "_apis/Profile/Profiles/{id}",
                            routeValues: {
                                id: id
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update profile
         *
         * @param profile - Update profile
         * @param id - Profile ID
         */
        ProfileRestClient.prototype.updateProfile = function (profile, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.3",
                            method: "PATCH",
                            routeTemplate: "_apis/Profile/Profiles/{id}",
                            routeValues: {
                                id: id
                            },
                            body: profile
                        })];
                });
            });
        };
        ProfileRestClient.RESOURCE_AREA_ID = "8ccfef3d-2b87-4e99-8ccb-66e343d2daa8";
        return ProfileRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.ProfileRestClient = ProfileRestClient;
});
