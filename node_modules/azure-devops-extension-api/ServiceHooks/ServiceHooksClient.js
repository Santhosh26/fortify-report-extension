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
    var ServiceHooksRestClient = /** @class */ (function (_super) {
        __extends(ServiceHooksRestClient, _super);
        function ServiceHooksRestClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Get details about a specific consumer action.
         *
         * @param consumerId - ID for a consumer.
         * @param consumerActionId - ID for a consumerActionId.
         * @param publisherId -
         */
        ServiceHooksRestClient.prototype.getConsumerAction = function (consumerId, consumerActionId, publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/consumers/{consumerId}/Actions/{consumerActionId}",
                            routeValues: {
                                consumerId: consumerId,
                                consumerActionId: consumerActionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of consumer actions for a specific consumer.
         *
         * @param consumerId - ID for a consumer.
         * @param publisherId -
         */
        ServiceHooksRestClient.prototype.listConsumerActions = function (consumerId, publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/consumers/{consumerId}/Actions/{consumerActionId}",
                            routeValues: {
                                consumerId: consumerId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a specific consumer service. Optionally filter out consumer actions that do not support any event types for the specified publisher.
         *
         * @param consumerId - ID for a consumer.
         * @param publisherId -
         */
        ServiceHooksRestClient.prototype.getConsumer = function (consumerId, publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Consumers/{consumerId}",
                            routeValues: {
                                consumerId: consumerId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a list of available service hook consumer services. Optionally filter by consumers that support at least one event type from the specific publisher.
         *
         * @param publisherId -
         */
        ServiceHooksRestClient.prototype.listConsumers = function (publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Consumers/{consumerId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * @param subscriptionId -
         */
        ServiceHooksRestClient.prototype.getSubscriptionDiagnostics = function (subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/diagnostics",
                            routeValues: {
                                subscriptionId: subscriptionId
                            }
                        })];
                });
            });
        };
        /**
         * @param updateParameters -
         * @param subscriptionId -
         */
        ServiceHooksRestClient.prototype.updateSubscriptionDiagnostics = function (updateParameters, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/diagnostics",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            body: updateParameters
                        })];
                });
            });
        };
        /**
         * Get a specific event type.
         *
         * @param publisherId - ID for a publisher.
         * @param eventTypeId -
         */
        ServiceHooksRestClient.prototype.getEventType = function (publisherId, eventTypeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/publishers/{publisherId}/EventTypes/{eventTypeId}",
                            routeValues: {
                                publisherId: publisherId,
                                eventTypeId: eventTypeId
                            }
                        })];
                });
            });
        };
        /**
         * Get the event types for a specific publisher.
         *
         * @param publisherId - ID for a publisher.
         */
        ServiceHooksRestClient.prototype.listEventTypes = function (publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/publishers/{publisherId}/EventTypes/{eventTypeId}",
                            routeValues: {
                                publisherId: publisherId
                            }
                        })];
                });
            });
        };
        /**
         * Publish an external event.
         *
         * @param publisherId -
         * @param channelId -
         */
        ServiceHooksRestClient.prototype.publishExternalEvent = function (publisherId, channelId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId,
                        channelId: channelId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/public/hooks/ExternalEvents",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Get a specific notification for a subscription.
         *
         * @param subscriptionId - ID for a subscription.
         * @param notificationId -
         */
        ServiceHooksRestClient.prototype.getNotification = function (subscriptionId, notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/Notifications/{notificationId}",
                            routeValues: {
                                subscriptionId: subscriptionId,
                                notificationId: notificationId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of notifications for a specific subscription. A notification includes details about the event, the request to and the response from the consumer service.
         *
         * @param subscriptionId - ID for a subscription.
         * @param maxResults - Maximum number of notifications to return. Default is **100**.
         * @param status - Get only notifications with this status.
         * @param result - Get only notifications with this result type.
         */
        ServiceHooksRestClient.prototype.getNotifications = function (subscriptionId, maxResults, status, result) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        maxResults: maxResults,
                        status: status,
                        result: result
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/Notifications/{notificationId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Query for notifications. A notification includes details about the event, the request to and the response from the consumer service.
         *
         * @param query -
         */
        ServiceHooksRestClient.prototype.queryNotifications = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/NotificationsQuery",
                            body: query
                        })];
                });
            });
        };
        /**
         * @param inputValuesQuery -
         * @param publisherId -
         */
        ServiceHooksRestClient.prototype.queryInputValues = function (inputValuesQuery, publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/publishers/{publisherId}/inputValuesQuery",
                            routeValues: {
                                publisherId: publisherId
                            },
                            body: inputValuesQuery
                        })];
                });
            });
        };
        /**
         * Get a specific service hooks publisher.
         *
         * @param publisherId - ID for a publisher.
         */
        ServiceHooksRestClient.prototype.getPublisher = function (publisherId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Publishers/{publisherId}",
                            routeValues: {
                                publisherId: publisherId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of publishers.
         *
         */
        ServiceHooksRestClient.prototype.listPublishers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Publishers/{publisherId}"
                        })];
                });
            });
        };
        /**
         * Query for service hook publishers.
         *
         * @param query -
         */
        ServiceHooksRestClient.prototype.queryPublishers = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/PublishersQuery",
                            body: query
                        })];
                });
            });
        };
        /**
         * Create a subscription.
         *
         * @param subscription - Subscription to be created.
         */
        ServiceHooksRestClient.prototype.createSubscription = function (subscription) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
                            body: subscription
                        })];
                });
            });
        };
        /**
         * Delete a specific service hooks subscription.
         *
         * @param subscriptionId - ID for a subscription.
         */
        ServiceHooksRestClient.prototype.deleteSubscription = function (subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "DELETE",
                            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            }
                        })];
                });
            });
        };
        /**
         * Get a specific service hooks subscription.
         *
         * @param subscriptionId - ID for a subscription.
         */
        ServiceHooksRestClient.prototype.getSubscription = function (subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            }
                        })];
                });
            });
        };
        /**
         * Get a list of subscriptions.
         *
         * @param publisherId - ID for a subscription.
         * @param eventType - The event type to filter on (if any).
         * @param consumerId - ID for a consumer.
         * @param consumerActionId - ID for a consumerActionId.
         */
        ServiceHooksRestClient.prototype.listSubscriptions = function (publisherId, eventType, consumerId, consumerActionId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        publisherId: publisherId,
                        eventType: eventType,
                        consumerId: consumerId,
                        consumerActionId: consumerActionId
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
                            queryParams: queryValues
                        })];
                });
            });
        };
        /**
         * Update a subscription. \<param name="subscriptionId"\>ID for a subscription that you wish to update.\</param\>
         *
         * @param subscription -
         * @param subscriptionId -
         */
        ServiceHooksRestClient.prototype.replaceSubscription = function (subscription, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "PUT",
                            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
                            routeValues: {
                                subscriptionId: subscriptionId
                            },
                            body: subscription
                        })];
                });
            });
        };
        /**
         * Query for service hook subscriptions.
         *
         * @param query -
         */
        ServiceHooksRestClient.prototype.createSubscriptionsQuery = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/SubscriptionsQuery",
                            body: query
                        })];
                });
            });
        };
        /**
         * Sends a test notification. This is useful for verifying the configuration of an updated or new service hooks subscription.
         *
         * @param testNotification -
         * @param useRealData - Only allow testing with real data in existing subscriptions.
         */
        ServiceHooksRestClient.prototype.createTestNotification = function (testNotification, useRealData) {
            return __awaiter(this, void 0, void 0, function () {
                var queryValues;
                return __generator(this, function (_a) {
                    queryValues = {
                        useRealData: useRealData
                    };
                    return [2 /*return*/, this.beginRequest({
                            apiVersion: "7.2-preview.1",
                            method: "POST",
                            routeTemplate: "_apis/hooks/TestNotifications/{notificationId}",
                            queryParams: queryValues,
                            body: testNotification
                        })];
                });
            });
        };
        return ServiceHooksRestClient;
    }(RestClientBase_1.RestClientBase));
    exports.ServiceHooksRestClient = ServiceHooksRestClient;
});
