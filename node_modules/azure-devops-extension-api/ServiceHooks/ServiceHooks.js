/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Enumerates consumer authentication types.
     */
    var AuthenticationType;
    (function (AuthenticationType) {
        /**
         * No authentication is required.
         */
        AuthenticationType[AuthenticationType["None"] = 0] = "None";
        /**
         * OAuth authentication.
         */
        AuthenticationType[AuthenticationType["OAuth"] = 10] = "OAuth";
        /**
         * Externally-configured authentication.
         */
        AuthenticationType[AuthenticationType["External"] = 30] = "External";
    })(AuthenticationType = exports.AuthenticationType || (exports.AuthenticationType = {}));
    /**
     * Enumerates possible result types of a notification.
     */
    var NotificationResult;
    (function (NotificationResult) {
        /**
         * The notification has not yet completed
         */
        NotificationResult[NotificationResult["Pending"] = 0] = "Pending";
        /**
         * The notification was sent successfully
         */
        NotificationResult[NotificationResult["Succeeded"] = 10] = "Succeeded";
        /**
         * The notification failed to be sent successfully to the consumer
         */
        NotificationResult[NotificationResult["Failed"] = 20] = "Failed";
        /**
         * The notification was filtered by the Delivery Job
         */
        NotificationResult[NotificationResult["Filtered"] = 30] = "Filtered";
    })(NotificationResult = exports.NotificationResult || (exports.NotificationResult = {}));
    /**
     * Enumerates possible status' of a notification.
     */
    var NotificationStatus;
    (function (NotificationStatus) {
        /**
         * The notification has been queued
         */
        NotificationStatus[NotificationStatus["Queued"] = 10] = "Queued";
        /**
         * The notification has been dequeued and has begun processing.
         */
        NotificationStatus[NotificationStatus["Processing"] = 20] = "Processing";
        /**
         * The consumer action has processed the notification. The request is in progress.
         */
        NotificationStatus[NotificationStatus["RequestInProgress"] = 30] = "RequestInProgress";
        /**
         * The request completed
         */
        NotificationStatus[NotificationStatus["Completed"] = 100] = "Completed";
    })(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
    /**
     * The scope to which a subscription input applies
     */
    var SubscriptionInputScope;
    (function (SubscriptionInputScope) {
        /**
         * An input defined and consumed by a Publisher or Publisher Event Type
         */
        SubscriptionInputScope[SubscriptionInputScope["Publisher"] = 10] = "Publisher";
        /**
         * An input defined and consumed by a Consumer or Consumer Action
         */
        SubscriptionInputScope[SubscriptionInputScope["Consumer"] = 20] = "Consumer";
    })(SubscriptionInputScope = exports.SubscriptionInputScope || (exports.SubscriptionInputScope = {}));
    /**
     * Enumerates possible states of a subscription.
     */
    var SubscriptionStatus;
    (function (SubscriptionStatus) {
        /**
         * The subscription is enabled.
         */
        SubscriptionStatus[SubscriptionStatus["Enabled"] = 0] = "Enabled";
        /**
         * The subscription is temporarily on probation by the system.
         */
        SubscriptionStatus[SubscriptionStatus["OnProbation"] = 10] = "OnProbation";
        /**
         * The subscription is disabled by a user.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledByUser"] = 20] = "DisabledByUser";
        /**
         * The subscription is disabled by the system.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledBySystem"] = 30] = "DisabledBySystem";
        /**
         * The subscription is disabled because the owner is inactive or is missing permissions.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledByInactiveIdentity"] = 40] = "DisabledByInactiveIdentity";
    })(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
});
