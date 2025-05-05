import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Notification from "../Notification/Notification";
import * as WebApi from "../WebApi/WebApi";
export declare class NotificationRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * @param operation -
     */
    performBatchNotificationOperations(operation: Notification.BatchNotificationOperation): Promise<void>;
    /**
     * Get a list of diagnostic logs for this service.
     *
     * @param source - ID specifying which type of logs to check diagnostics for.
     * @param entryId - The ID of the specific log to query for.
     * @param startTime - Start time for the time range to query in.
     * @param endTime - End time for the time range to query in.
     */
    listLogs(source: string, entryId?: string, startTime?: Date, endTime?: Date): Promise<Notification.INotificationDiagnosticLog[]>;
    /**
     * Get the diagnostics settings for a subscription.
     *
     * @param subscriptionId - The id of the notifications subscription.
     */
    getSubscriptionDiagnostics(subscriptionId: string): Promise<Notification.SubscriptionDiagnostics>;
    /**
     * Update the diagnostics settings for a subscription.
     *
     * @param updateParameters -
     * @param subscriptionId - The id of the notifications subscription.
     */
    updateSubscriptionDiagnostics(updateParameters: Notification.UpdateSubscripitonDiagnosticsParameters, subscriptionId: string): Promise<Notification.SubscriptionDiagnostics>;
    /**
     * Publish an event. This request must be directed to the service "extmgmt".
     *
     * @param notificationEvent -
     */
    publishEvent(notificationEvent: WebApi.VssNotificationEvent): Promise<WebApi.VssNotificationEvent>;
    /**
     * Tranform a notification event.
     *
     * @param transformRequest - Object to be transformed.
     */
    transformEvent(transformRequest: Notification.EventTransformRequest): Promise<Notification.EventTransformResult>;
    /**
     * @param inputValuesQuery -
     * @param eventType -
     */
    queryEventTypes(inputValuesQuery: Notification.FieldValuesQuery, eventType: string): Promise<Notification.NotificationEventField[]>;
    /**
     * Get a specific event type.
     *
     * @param eventType - The ID of the event type.
     */
    getEventType(eventType: string): Promise<Notification.NotificationEventType>;
    /**
     * List available event types for this service. Optionally filter by only event types for the specified publisher.
     *
     * @param publisherId - Limit to event types for this publisher
     */
    listEventTypes(publisherId?: string): Promise<Notification.NotificationEventType[]>;
    /**
     * @param notificationId -
     */
    getNotificationReasons(notificationId: number): Promise<Notification.NotificationReason>;
    /**
     * @param notificationIds -
     */
    listNotificationReasons(notificationIds?: number): Promise<Notification.NotificationReason[]>;
    /**
     */
    getSettings(): Promise<Notification.NotificationAdminSettings>;
    /**
     * @param updateParameters -
     */
    updateSettings(updateParameters: Notification.NotificationAdminSettingsUpdateParameters): Promise<Notification.NotificationAdminSettings>;
    /**
     * Get delivery preferences of a notifications subscriber.
     *
     * @param subscriberId - ID of the user or group.
     */
    getSubscriber(subscriberId: string): Promise<Notification.NotificationSubscriber>;
    /**
     * Update delivery preferences of a notifications subscriber.
     *
     * @param updateParameters -
     * @param subscriberId - ID of the user or group.
     */
    updateSubscriber(updateParameters: Notification.NotificationSubscriberUpdateParameters, subscriberId: string): Promise<Notification.NotificationSubscriber>;
    /**
     * Query for subscriptions. A subscription is returned if it matches one or more of the specified conditions.
     *
     * @param subscriptionQuery -
     */
    querySubscriptions(subscriptionQuery: Notification.SubscriptionQuery): Promise<Notification.NotificationSubscription[]>;
    /**
     * Create a new subscription.
     *
     * @param createParameters -
     */
    createSubscription(createParameters: Notification.NotificationSubscriptionCreateParameters): Promise<Notification.NotificationSubscription>;
    /**
     * Delete a subscription.
     *
     * @param subscriptionId -
     */
    deleteSubscription(subscriptionId: string): Promise<void>;
    /**
     * Get a notification subscription by its ID.
     *
     * @param subscriptionId -
     * @param queryFlags -
     */
    getSubscription(subscriptionId: string, queryFlags?: Notification.SubscriptionQueryFlags): Promise<Notification.NotificationSubscription>;
    /**
     * Get a list of notification subscriptions, either by subscription IDs or by all subscriptions for a given user or group.
     *
     * @param targetId - User or Group ID
     * @param ids - List of subscription IDs
     * @param queryFlags -
     */
    listSubscriptions(targetId?: string, ids?: string[], queryFlags?: Notification.SubscriptionQueryFlags): Promise<Notification.NotificationSubscription[]>;
    /**
     * Update an existing subscription. Depending on the type of subscription and permissions, the caller can update the description, filter settings, channel (delivery) settings and more.
     *
     * @param updateParameters -
     * @param subscriptionId -
     */
    updateSubscription(updateParameters: Notification.NotificationSubscriptionUpdateParameters, subscriptionId: string): Promise<Notification.NotificationSubscription>;
    /**
     * Get available subscription templates.
     *
     */
    getSubscriptionTemplates(): Promise<Notification.NotificationSubscriptionTemplate[]>;
    /**
     * Publish an event. This request is only for the Token service since it's a deploy only service.
     *
     * @param notificationEvent -
     */
    publishTokenEvent(notificationEvent: WebApi.VssNotificationEvent): Promise<WebApi.VssNotificationEvent>;
    /**
     * Update the specified user's settings for the specified subscription. This API is typically used to opt in or out of a shared subscription. User settings can only be applied to shared subscriptions, like team subscriptions or default subscriptions.
     *
     * @param userSettings -
     * @param subscriptionId -
     * @param userId - ID of the user
     */
    updateSubscriptionUserSettings(userSettings: Notification.SubscriptionUserSettings, subscriptionId: string, userId: string): Promise<Notification.SubscriptionUserSettings>;
}
