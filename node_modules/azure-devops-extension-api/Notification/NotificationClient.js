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
    var NotificationRestClient = /** @class */ (function (_super) {
        __extends(NotificationRestClient, _super);
        function NotificationRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * @param operation -
         */
        NotificationRestClient.prototype.performBatchNotificationOperations = function (operation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/BatchNotificationOperations",
                            body: operation
                        })];
                });
            });
        };
        /**
         * Get a list of diagnostic logs for this service.
         *
         * @param source - ID specifying which type of logs to check diagnostics for.
         * @param entryId - The ID of the specific log to query for.
         * @param startTime - Start time for the time range to query in.
         * @param endTime - End time for the time range to query in.
         */
        NotificationRestClient.prototype.listLogs = function (source, entryId, startTime, endTime) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        startTime: startTime,
                        endTime: endTime
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/DiagnosticLogs/{source}/entries/{entryId}",
                            routeValues: {
                                source: source,
                                entryId: entryId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get the diagnostics settings for a subscription.
         *
         * @param subscriptionId - The id of the notifications subscription.
         */
        NotificationRestClient.prototype.getSubscriptionDiagnostics = function (subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/subscriptions/{subscriptionId}/diagnostics",
                            routeValues: {
                                subscriptionId: subscriptionId
                            }
                        })];
                });
            });
        };
        /**
         * Update the diagnostics settings for a subscription.
         *
         * @param updateParameters -
         * @param subscriptionId - The id of the notifications subscription.
         */
        NotificationRestClient.prototype.updateSubscriptionDiagnostics = function (updateParameters, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/notification/subscriptions/{subscriptionId}/diagnostics",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Publish an event. This request must be directed to the service "extmgmt".
         *
         * @param notificationEvent -
         */
        NotificationRestClient.prototype.publishEvent = function (notificationEvent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/Events",
                            body: notificationEvent
                        })];
                });
            });
        };
        /**
         * Tranform a notification event.
         *
         * @param transformRequest - Object to be transformed.
         */
        NotificationRestClient.prototype.transformEvent = function (transformRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/EventTransforms",
                            body: transformRequest
                        })];
                });
            });
        };
        /**
         * @param inputValuesQuery -
         * @param eventType -
         */
        NotificationRestClient.prototype.queryEventTypes = function (inputValuesQuery, eventType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/eventTypes/{eventType}/fieldValuesQuery",
                            routeValues: {
                                eventType: eventType
                            },
                            body: inputValuesQuery
                        })];
                });
            });
        };
        /**
         * Get a specific event type.
         *
         * @param eventType - The ID of the event type.
         */
        NotificationRestClient.prototype.getEventType = function (eventType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/EventTypes/{eventType}",
                            routeValues: {
                                eventType: eventType
                            }
                        })];
                });
            });
        };
        /**
         * List available event types for this service. Optionally filter by only event types for the specified publisher.
         *
         * @param publisherId - Limit to event types for this publisher
         */
        NotificationRestClient.prototype.listEventTypes = function (publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/EventTypes/{eventType}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param notificationId -
         */
        NotificationRestClient.prototype.getNotificationReasons = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/NotificationReasons/{notificationId}",
                            routeValues: {
                                notificationId: notificationId
                            }
                        })];
                });
            });
        };
        /**
         * @param notificationIds -
         */
        NotificationRestClient.prototype.listNotificationReasons = function (notificationIds) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        notificationIds: notificationIds
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/NotificationReasons/{notificationId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         */
        NotificationRestClient.prototype.getSettings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/Settings"
                        })];
                });
            });
        };
        /**
         * @param updateParameters -
         */
        NotificationRestClient.prototype.updateSettings = function (updateParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/notification/Settings",
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Get delivery preferences of a notifications subscriber.
         *
         * @param subscriberId - ID of the user or group.
         */
        NotificationRestClient.prototype.getSubscriber = function (subscriberId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/Subscribers/{subscriberId}",
                            routeValues: {
                                subscriberId: subscriberId
                            }
                        })];
                });
            });
        };
        /**
         * Update delivery preferences of a notifications subscriber.
         *
         * @param updateParameters -
         * @param subscriberId - ID of the user or group.
         */
        NotificationRestClient.prototype.updateSubscriber = function (updateParameters, subscriberId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/notification/Subscribers/{subscriberId}",
                            routeValues: {
                                subscriberId: subscriberId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Query for subscriptions. A subscription is returned if it matches one or more of the specified conditions.
         *
         * @param subscriptionQuery -
         */
        NotificationRestClient.prototype.querySubscriptions = function (subscriptionQuery) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/SubscriptionQuery",
                            body: subscriptionQuery
                        })];
                });
            });
        };
        /**
         * Create a new subscription.
         *
         * @param createParameters -
         */
        NotificationRestClient.prototype.createSubscription = function (createParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
                            body: createParameters
                        })];
                });
            });
        };
        /**
         * Delete a subscription.
         *
         * @param subscriptionId -
         */
        NotificationRestClient.prototype.deleteSubscription = function (subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            }
                        })];
                });
            });
        };
        /**
         * Get a notification subscription by its ID.
         *
         * @param subscriptionId -
         * @param queryFlags -
         */
        NotificationRestClient.prototype.getSubscription = function (subscriptionId, queryFlags) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        queryFlags: queryFlags
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of notification subscriptions, either by subscription IDs or by all subscriptions for a given user or group.
         *
         * @param targetId - User or Group ID
         * @param ids - List of subscription IDs
         * @param queryFlags -
         */
        NotificationRestClient.prototype.listSubscriptions = function (targetId, ids, queryFlags) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        targetId: targetId,
                        ids: ids && ids.join(","),
                        queryFlags: queryFlags
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update an existing subscription. Depending on the type of subscription and permissions, the caller can update the description, filter settings, channel (delivery) settings and more.
         *
         * @param updateParameters -
         * @param subscriptionId -
         */
        NotificationRestClient.prototype.updateSubscription = function (updateParameters, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PATCH",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Get available subscription templates.
         *
         */
        NotificationRestClient.prototype.getSubscriptionTemplates = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/notification/SubscriptionTemplates"
                        })];
                });
            });
        };
        /**
         * Publish an event. This request is only for the Token service since it's a deploy only service.
         *
         * @param notificationEvent -
         */
        NotificationRestClient.prototype.publishTokenEvent = function (notificationEvent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/notification/TokenNotificationEvent",
                            body: notificationEvent
                        })];
                });
            });
        };
        /**
         * Update the specified user's settings for the specified subscription. This API is typically used to opt in or out of a shared subscription. User settings can only be applied to shared subscriptions, like team subscriptions or default subscriptions.
         *
         * @param userSettings -
         * @param subscriptionId -
         * @param userId - ID of the user
         */
        NotificationRestClient.prototype.updateSubscriptionUserSettings = function (userSettings, subscriptionId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}/UserSettings/{userId}",
                            routeValues: {
                                subscriptionId: subscriptionId,
                                userId: userId
                            },
                            body: userSettings
                        })];
                });
            });
        };
        return NotificationRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.NotificationRestClient = NotificationRestClient;
});
