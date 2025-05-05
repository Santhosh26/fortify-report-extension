/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Default delivery preference for group subscribers. Indicates how the subscriber should be notified.
     */
    var DefaultGroupDeliveryPreference;
    (function (DefaultGroupDeliveryPreference) {
        /**
         * Do not send notifications by default. Note: notifications can still be delivered to subscribers, for example via a custom subscription.
         */
        DefaultGroupDeliveryPreference[DefaultGroupDeliveryPreference["NoDelivery"] = -1] = "NoDelivery";
        /**
         * Deliver notifications to each member of the group representing the subscriber. Only applicable when the subscriber is a group.
         */
        DefaultGroupDeliveryPreference[DefaultGroupDeliveryPreference["EachMember"] = 2] = "EachMember";
    })(DefaultGroupDeliveryPreference = exports.DefaultGroupDeliveryPreference || (exports.DefaultGroupDeliveryPreference = {}));
    /**
     * Describes the subscription evaluation operation status.
     */
    var EvaluationOperationStatus;
    (function (EvaluationOperationStatus) {
        /**
         * The operation object does not have the status set.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["NotSet"] = 0] = "NotSet";
        /**
         * The operation has been queued.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["Queued"] = 1] = "Queued";
        /**
         * The operation is in progress.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["InProgress"] = 2] = "InProgress";
        /**
         * The operation was cancelled by the user.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["Cancelled"] = 3] = "Cancelled";
        /**
         * The operation completed successfully.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["Succeeded"] = 4] = "Succeeded";
        /**
         * The operation completed with a failure.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["Failed"] = 5] = "Failed";
        /**
         * The operation timed out.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["TimedOut"] = 6] = "TimedOut";
        /**
         * The operation could not be found.
         */
        EvaluationOperationStatus[EvaluationOperationStatus["NotFound"] = 7] = "NotFound";
    })(EvaluationOperationStatus = exports.EvaluationOperationStatus || (exports.EvaluationOperationStatus = {}));
    /**
     * Set of flags used to determine which set of information is retrieved when querying for event publishers
     */
    var EventPublisherQueryFlags;
    (function (EventPublisherQueryFlags) {
        EventPublisherQueryFlags[EventPublisherQueryFlags["None"] = 0] = "None";
        /**
         * Include event types from the remote services too
         */
        EventPublisherQueryFlags[EventPublisherQueryFlags["IncludeRemoteServices"] = 2] = "IncludeRemoteServices";
    })(EventPublisherQueryFlags = exports.EventPublisherQueryFlags || (exports.EventPublisherQueryFlags = {}));
    /**
     * Set of flags used to determine which set of information is retrieved when querying for eventtypes
     */
    var EventTypeQueryFlags;
    (function (EventTypeQueryFlags) {
        EventTypeQueryFlags[EventTypeQueryFlags["None"] = 0] = "None";
        /**
         * IncludeFields will include all fields and their types
         */
        EventTypeQueryFlags[EventTypeQueryFlags["IncludeFields"] = 1] = "IncludeFields";
    })(EventTypeQueryFlags = exports.EventTypeQueryFlags || (exports.EventTypeQueryFlags = {}));
    var NotificationOperation;
    (function (NotificationOperation) {
        NotificationOperation[NotificationOperation["None"] = 0] = "None";
        NotificationOperation[NotificationOperation["SuspendUnprocessed"] = 1] = "SuspendUnprocessed";
    })(NotificationOperation = exports.NotificationOperation || (exports.NotificationOperation = {}));
    var NotificationReasonType;
    (function (NotificationReasonType) {
        NotificationReasonType[NotificationReasonType["Unknown"] = 0] = "Unknown";
        NotificationReasonType[NotificationReasonType["Follows"] = 1] = "Follows";
        NotificationReasonType[NotificationReasonType["Personal"] = 2] = "Personal";
        NotificationReasonType[NotificationReasonType["PersonalAlias"] = 3] = "PersonalAlias";
        NotificationReasonType[NotificationReasonType["DirectMember"] = 4] = "DirectMember";
        NotificationReasonType[NotificationReasonType["IndirectMember"] = 5] = "IndirectMember";
        NotificationReasonType[NotificationReasonType["GroupAlias"] = 6] = "GroupAlias";
        NotificationReasonType[NotificationReasonType["SubscriptionAlias"] = 7] = "SubscriptionAlias";
        NotificationReasonType[NotificationReasonType["SingleRole"] = 8] = "SingleRole";
        NotificationReasonType[NotificationReasonType["DirectMemberGroupRole"] = 9] = "DirectMemberGroupRole";
        NotificationReasonType[NotificationReasonType["InDirectMemberGroupRole"] = 10] = "InDirectMemberGroupRole";
        NotificationReasonType[NotificationReasonType["AliasMemberGroupRole"] = 11] = "AliasMemberGroupRole";
    })(NotificationReasonType = exports.NotificationReasonType || (exports.NotificationReasonType = {}));
    var NotificationStatisticType;
    (function (NotificationStatisticType) {
        NotificationStatisticType[NotificationStatisticType["NotificationBySubscription"] = 0] = "NotificationBySubscription";
        NotificationStatisticType[NotificationStatisticType["EventsByEventType"] = 1] = "EventsByEventType";
        NotificationStatisticType[NotificationStatisticType["NotificationByEventType"] = 2] = "NotificationByEventType";
        NotificationStatisticType[NotificationStatisticType["EventsByEventTypePerUser"] = 3] = "EventsByEventTypePerUser";
        NotificationStatisticType[NotificationStatisticType["NotificationByEventTypePerUser"] = 4] = "NotificationByEventTypePerUser";
        NotificationStatisticType[NotificationStatisticType["Events"] = 5] = "Events";
        NotificationStatisticType[NotificationStatisticType["Notifications"] = 6] = "Notifications";
        NotificationStatisticType[NotificationStatisticType["NotificationFailureBySubscription"] = 7] = "NotificationFailureBySubscription";
        NotificationStatisticType[NotificationStatisticType["UnprocessedRangeStart"] = 100] = "UnprocessedRangeStart";
        NotificationStatisticType[NotificationStatisticType["UnprocessedEventsByPublisher"] = 101] = "UnprocessedEventsByPublisher";
        NotificationStatisticType[NotificationStatisticType["UnprocessedEventDelayByPublisher"] = 102] = "UnprocessedEventDelayByPublisher";
        NotificationStatisticType[NotificationStatisticType["UnprocessedNotificationsByChannelByPublisher"] = 103] = "UnprocessedNotificationsByChannelByPublisher";
        NotificationStatisticType[NotificationStatisticType["UnprocessedNotificationDelayByChannelByPublisher"] = 104] = "UnprocessedNotificationDelayByChannelByPublisher";
        NotificationStatisticType[NotificationStatisticType["DelayRangeStart"] = 200] = "DelayRangeStart";
        NotificationStatisticType[NotificationStatisticType["TotalPipelineTime"] = 201] = "TotalPipelineTime";
        NotificationStatisticType[NotificationStatisticType["NotificationPipelineTime"] = 202] = "NotificationPipelineTime";
        NotificationStatisticType[NotificationStatisticType["EventPipelineTime"] = 203] = "EventPipelineTime";
        NotificationStatisticType[NotificationStatisticType["HourlyRangeStart"] = 1000] = "HourlyRangeStart";
        NotificationStatisticType[NotificationStatisticType["HourlyNotificationBySubscription"] = 1001] = "HourlyNotificationBySubscription";
        NotificationStatisticType[NotificationStatisticType["HourlyEventsByEventTypePerUser"] = 1002] = "HourlyEventsByEventTypePerUser";
        NotificationStatisticType[NotificationStatisticType["HourlyEvents"] = 1003] = "HourlyEvents";
        NotificationStatisticType[NotificationStatisticType["HourlyNotifications"] = 1004] = "HourlyNotifications";
        NotificationStatisticType[NotificationStatisticType["HourlyUnprocessedEventsByPublisher"] = 1101] = "HourlyUnprocessedEventsByPublisher";
        NotificationStatisticType[NotificationStatisticType["HourlyUnprocessedEventDelayByPublisher"] = 1102] = "HourlyUnprocessedEventDelayByPublisher";
        NotificationStatisticType[NotificationStatisticType["HourlyUnprocessedNotificationsByChannelByPublisher"] = 1103] = "HourlyUnprocessedNotificationsByChannelByPublisher";
        NotificationStatisticType[NotificationStatisticType["HourlyUnprocessedNotificationDelayByChannelByPublisher"] = 1104] = "HourlyUnprocessedNotificationDelayByChannelByPublisher";
        NotificationStatisticType[NotificationStatisticType["HourlyTotalPipelineTime"] = 1201] = "HourlyTotalPipelineTime";
        NotificationStatisticType[NotificationStatisticType["HourlyNotificationPipelineTime"] = 1202] = "HourlyNotificationPipelineTime";
        NotificationStatisticType[NotificationStatisticType["HourlyEventPipelineTime"] = 1203] = "HourlyEventPipelineTime";
    })(NotificationStatisticType = exports.NotificationStatisticType || (exports.NotificationStatisticType = {}));
    /**
     * Delivery preference for a subscriber. Indicates how the subscriber should be notified.
     */
    var NotificationSubscriberDeliveryPreference;
    (function (NotificationSubscriberDeliveryPreference) {
        /**
         * Do not send notifications by default. Note: notifications can still be delivered to this subscriber, for example via a custom subscription.
         */
        NotificationSubscriberDeliveryPreference[NotificationSubscriberDeliveryPreference["NoDelivery"] = -1] = "NoDelivery";
        /**
         * Deliver notifications to the subscriber's preferred email address.
         */
        NotificationSubscriberDeliveryPreference[NotificationSubscriberDeliveryPreference["PreferredEmailAddress"] = 1] = "PreferredEmailAddress";
        /**
         * Deliver notifications to each member of the group representing the subscriber. Only applicable when the subscriber is a group.
         */
        NotificationSubscriberDeliveryPreference[NotificationSubscriberDeliveryPreference["EachMember"] = 2] = "EachMember";
        /**
         * Use default
         */
        NotificationSubscriberDeliveryPreference[NotificationSubscriberDeliveryPreference["UseDefault"] = 3] = "UseDefault";
    })(NotificationSubscriberDeliveryPreference = exports.NotificationSubscriberDeliveryPreference || (exports.NotificationSubscriberDeliveryPreference = {}));
    var SubscriberFlags;
    (function (SubscriberFlags) {
        SubscriberFlags[SubscriberFlags["None"] = 0] = "None";
        /**
         * Subscriber's delivery preferences could be updated
         */
        SubscriberFlags[SubscriberFlags["DeliveryPreferencesEditable"] = 2] = "DeliveryPreferencesEditable";
        /**
         * Subscriber's delivery preferences supports email delivery
         */
        SubscriberFlags[SubscriberFlags["SupportsPreferredEmailAddressDelivery"] = 4] = "SupportsPreferredEmailAddressDelivery";
        /**
         * Subscriber's delivery preferences supports individual members delivery(group expansion)
         */
        SubscriberFlags[SubscriberFlags["SupportsEachMemberDelivery"] = 8] = "SupportsEachMemberDelivery";
        /**
         * Subscriber's delivery preferences supports no delivery
         */
        SubscriberFlags[SubscriberFlags["SupportsNoDelivery"] = 16] = "SupportsNoDelivery";
        /**
         * Subscriber is a user
         */
        SubscriberFlags[SubscriberFlags["IsUser"] = 32] = "IsUser";
        /**
         * Subscriber is a group
         */
        SubscriberFlags[SubscriberFlags["IsGroup"] = 64] = "IsGroup";
        /**
         * Subscriber is a team
         */
        SubscriberFlags[SubscriberFlags["IsTeam"] = 128] = "IsTeam";
    })(SubscriberFlags = exports.SubscriberFlags || (exports.SubscriberFlags = {}));
    var SubscriptionFieldType;
    (function (SubscriptionFieldType) {
        SubscriptionFieldType[SubscriptionFieldType["String"] = 1] = "String";
        SubscriptionFieldType[SubscriptionFieldType["Integer"] = 2] = "Integer";
        SubscriptionFieldType[SubscriptionFieldType["DateTime"] = 3] = "DateTime";
        SubscriptionFieldType[SubscriptionFieldType["PlainText"] = 5] = "PlainText";
        SubscriptionFieldType[SubscriptionFieldType["Html"] = 7] = "Html";
        SubscriptionFieldType[SubscriptionFieldType["TreePath"] = 8] = "TreePath";
        SubscriptionFieldType[SubscriptionFieldType["History"] = 9] = "History";
        SubscriptionFieldType[SubscriptionFieldType["Double"] = 10] = "Double";
        SubscriptionFieldType[SubscriptionFieldType["Guid"] = 11] = "Guid";
        SubscriptionFieldType[SubscriptionFieldType["Boolean"] = 12] = "Boolean";
        SubscriptionFieldType[SubscriptionFieldType["Identity"] = 13] = "Identity";
        SubscriptionFieldType[SubscriptionFieldType["PicklistInteger"] = 14] = "PicklistInteger";
        SubscriptionFieldType[SubscriptionFieldType["PicklistString"] = 15] = "PicklistString";
        SubscriptionFieldType[SubscriptionFieldType["PicklistDouble"] = 16] = "PicklistDouble";
        SubscriptionFieldType[SubscriptionFieldType["TeamProject"] = 17] = "TeamProject";
    })(SubscriptionFieldType = exports.SubscriptionFieldType || (exports.SubscriptionFieldType = {}));
    /**
     * Read-only indicators that further describe the subscription.
     */
    var SubscriptionFlags;
    (function (SubscriptionFlags) {
        /**
         * None
         */
        SubscriptionFlags[SubscriptionFlags["None"] = 0] = "None";
        /**
         * Subscription's subscriber is a group, not a user
         */
        SubscriptionFlags[SubscriptionFlags["GroupSubscription"] = 1] = "GroupSubscription";
        /**
         * Subscription is contributed and not persisted. This means certain fields of the subscription, like Filter, are read-only.
         */
        SubscriptionFlags[SubscriptionFlags["ContributedSubscription"] = 2] = "ContributedSubscription";
        /**
         * A user that is member of the subscription's subscriber group can opt in/out of the subscription.
         */
        SubscriptionFlags[SubscriptionFlags["CanOptOut"] = 4] = "CanOptOut";
        /**
         * If the subscriber is a group, is it a team.
         */
        SubscriptionFlags[SubscriptionFlags["TeamSubscription"] = 8] = "TeamSubscription";
        /**
         * For role based subscriptions, there is an expectation that there will always be at least one actor that matches
         */
        SubscriptionFlags[SubscriptionFlags["OneActorMatches"] = 16] = "OneActorMatches";
    })(SubscriptionFlags = exports.SubscriptionFlags || (exports.SubscriptionFlags = {}));
    /**
     * The permissions that a user has to a certain subscription
     */
    var SubscriptionPermissions;
    (function (SubscriptionPermissions) {
        /**
         * None
         */
        SubscriptionPermissions[SubscriptionPermissions["None"] = 0] = "None";
        /**
         * full view of description, filters, etc. Not limited.
         */
        SubscriptionPermissions[SubscriptionPermissions["View"] = 1] = "View";
        /**
         * update subscription
         */
        SubscriptionPermissions[SubscriptionPermissions["Edit"] = 2] = "Edit";
        /**
         * delete subscription
         */
        SubscriptionPermissions[SubscriptionPermissions["Delete"] = 4] = "Delete";
    })(SubscriptionPermissions = exports.SubscriptionPermissions || (exports.SubscriptionPermissions = {}));
    /**
     * Flags that influence the result set of a subscription query.
     */
    var SubscriptionQueryFlags;
    (function (SubscriptionQueryFlags) {
        SubscriptionQueryFlags[SubscriptionQueryFlags["None"] = 0] = "None";
        /**
         * Include subscriptions with invalid subscribers.
         */
        SubscriptionQueryFlags[SubscriptionQueryFlags["IncludeInvalidSubscriptions"] = 2] = "IncludeInvalidSubscriptions";
        /**
         * Include subscriptions marked for deletion.
         */
        SubscriptionQueryFlags[SubscriptionQueryFlags["IncludeDeletedSubscriptions"] = 4] = "IncludeDeletedSubscriptions";
        /**
         * Include the full filter details with each subscription.
         */
        SubscriptionQueryFlags[SubscriptionQueryFlags["IncludeFilterDetails"] = 8] = "IncludeFilterDetails";
        /**
         * For a subscription the caller does not have permission to view, return basic (non-confidential) information.
         */
        SubscriptionQueryFlags[SubscriptionQueryFlags["AlwaysReturnBasicInformation"] = 16] = "AlwaysReturnBasicInformation";
        /**
         * Include system subscriptions.
         */
        SubscriptionQueryFlags[SubscriptionQueryFlags["IncludeSystemSubscriptions"] = 32] = "IncludeSystemSubscriptions";
    })(SubscriptionQueryFlags = exports.SubscriptionQueryFlags || (exports.SubscriptionQueryFlags = {}));
    /**
     * Subscription status values. A value greater than or equal to zero indicates the subscription is enabled. A negative value indicates the subscription is disabled.
     */
    var SubscriptionStatus;
    (function (SubscriptionStatus) {
        /**
         * Subscription is disabled because it generated a high volume of notifications.
         */
        SubscriptionStatus[SubscriptionStatus["JailedByNotificationsVolume"] = -200] = "JailedByNotificationsVolume";
        /**
         * Subscription is disabled and will be deleted.
         */
        SubscriptionStatus[SubscriptionStatus["PendingDeletion"] = -100] = "PendingDeletion";
        /**
         * Subscription is disabled because of an Argument Exception while processing the subscription
         */
        SubscriptionStatus[SubscriptionStatus["DisabledArgumentException"] = -12] = "DisabledArgumentException";
        /**
         * Subscription is disabled because the project is invalid
         */
        SubscriptionStatus[SubscriptionStatus["DisabledProjectInvalid"] = -11] = "DisabledProjectInvalid";
        /**
         * Subscription is disabled because the identity does not have the appropriate permissions
         */
        SubscriptionStatus[SubscriptionStatus["DisabledMissingPermissions"] = -10] = "DisabledMissingPermissions";
        /**
         * Subscription is disabled service due to failures.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledFromProbation"] = -9] = "DisabledFromProbation";
        /**
         * Subscription is disabled because the identity is no longer active
         */
        SubscriptionStatus[SubscriptionStatus["DisabledInactiveIdentity"] = -8] = "DisabledInactiveIdentity";
        /**
         * Subscription is disabled because message queue is not supported.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledMessageQueueNotSupported"] = -7] = "DisabledMessageQueueNotSupported";
        /**
         * Subscription is disabled because its subscriber is unknown.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledMissingIdentity"] = -6] = "DisabledMissingIdentity";
        /**
         * Subscription is disabled because it has an invalid role expression.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledInvalidRoleExpression"] = -5] = "DisabledInvalidRoleExpression";
        /**
         * Subscription is disabled because it has an invalid filter expression.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledInvalidPathClause"] = -4] = "DisabledInvalidPathClause";
        /**
         * Subscription is disabled because it is a duplicate of a default subscription.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledAsDuplicateOfDefault"] = -3] = "DisabledAsDuplicateOfDefault";
        /**
         * Subscription is disabled by an administrator, not the subscription's subscriber.
         */
        SubscriptionStatus[SubscriptionStatus["DisabledByAdmin"] = -2] = "DisabledByAdmin";
        /**
         * Subscription is disabled, typically by the owner of the subscription, and will not produce any notifications.
         */
        SubscriptionStatus[SubscriptionStatus["Disabled"] = -1] = "Disabled";
        /**
         * Subscription is active.
         */
        SubscriptionStatus[SubscriptionStatus["Enabled"] = 0] = "Enabled";
        /**
         * Subscription is active, but is on probation due to failed deliveries or other issues with the subscription.
         */
        SubscriptionStatus[SubscriptionStatus["EnabledOnProbation"] = 1] = "EnabledOnProbation";
    })(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
    /**
     * Set of flags used to determine which set of templates is retrieved when querying for subscription templates
     */
    var SubscriptionTemplateQueryFlags;
    (function (SubscriptionTemplateQueryFlags) {
        SubscriptionTemplateQueryFlags[SubscriptionTemplateQueryFlags["None"] = 0] = "None";
        /**
         * Include user templates
         */
        SubscriptionTemplateQueryFlags[SubscriptionTemplateQueryFlags["IncludeUser"] = 1] = "IncludeUser";
        /**
         * Include group templates
         */
        SubscriptionTemplateQueryFlags[SubscriptionTemplateQueryFlags["IncludeGroup"] = 2] = "IncludeGroup";
        /**
         * Include user and group templates
         */
        SubscriptionTemplateQueryFlags[SubscriptionTemplateQueryFlags["IncludeUserAndGroup"] = 4] = "IncludeUserAndGroup";
        /**
         * Include the event type details like the fields and operators
         */
        SubscriptionTemplateQueryFlags[SubscriptionTemplateQueryFlags["IncludeEventTypeInformation"] = 22] = "IncludeEventTypeInformation";
    })(SubscriptionTemplateQueryFlags = exports.SubscriptionTemplateQueryFlags || (exports.SubscriptionTemplateQueryFlags = {}));
    var SubscriptionTemplateType;
    (function (SubscriptionTemplateType) {
        SubscriptionTemplateType[SubscriptionTemplateType["User"] = 0] = "User";
        SubscriptionTemplateType[SubscriptionTemplateType["Team"] = 1] = "Team";
        SubscriptionTemplateType[SubscriptionTemplateType["Both"] = 2] = "Both";
        SubscriptionTemplateType[SubscriptionTemplateType["None"] = 3] = "None";
    })(SubscriptionTemplateType = exports.SubscriptionTemplateType || (exports.SubscriptionTemplateType = {}));
});
