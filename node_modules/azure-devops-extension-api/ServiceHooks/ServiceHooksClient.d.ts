import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as FormInput from "../FormInput/FormInput";
import * as Notification from "../Notification/Notification";
import * as ServiceHooks from "../ServiceHooks/ServiceHooks";
export declare class ServiceHooksRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Get details about a specific consumer action.
     *
     * @param consumerId - ID for a consumer.
     * @param consumerActionId - ID for a consumerActionId.
     * @param publisherId -
     */
    getConsumerAction(consumerId: string, consumerActionId: string, publisherId?: string): Promise<ServiceHooks.ConsumerAction>;
    /**
     * Get a list of consumer actions for a specific consumer.
     *
     * @param consumerId - ID for a consumer.
     * @param publisherId -
     */
    listConsumerActions(consumerId: string, publisherId?: string): Promise<ServiceHooks.ConsumerAction[]>;
    /**
     * Get a specific consumer service. Optionally filter out consumer actions that do not support any event types for the specified publisher.
     *
     * @param consumerId - ID for a consumer.
     * @param publisherId -
     */
    getConsumer(consumerId: string, publisherId?: string): Promise<ServiceHooks.Consumer>;
    /**
     * Get a list of available service hook consumer services. Optionally filter by consumers that support at least one event type from the specific publisher.
     *
     * @param publisherId -
     */
    listConsumers(publisherId?: string): Promise<ServiceHooks.Consumer[]>;
    /**
     * @param subscriptionId -
     */
    getSubscriptionDiagnostics(subscriptionId: string): Promise<Notification.SubscriptionDiagnostics>;
    /**
     * @param updateParameters -
     * @param subscriptionId -
     */
    updateSubscriptionDiagnostics(updateParameters: Notification.UpdateSubscripitonDiagnosticsParameters, subscriptionId: string): Promise<Notification.SubscriptionDiagnostics>;
    /**
     * Get a specific event type.
     *
     * @param publisherId - ID for a publisher.
     * @param eventTypeId -
     */
    getEventType(publisherId: string, eventTypeId: string): Promise<ServiceHooks.EventTypeDescriptor>;
    /**
     * Get the event types for a specific publisher.
     *
     * @param publisherId - ID for a publisher.
     */
    listEventTypes(publisherId: string): Promise<ServiceHooks.EventTypeDescriptor[]>;
    /**
     * Publish an external event.
     *
     * @param publisherId -
     * @param channelId -
     */
    publishExternalEvent(publisherId: string, channelId?: string): Promise<ServiceHooks.PublisherEvent[]>;
    /**
     * Get a specific notification for a subscription.
     *
     * @param subscriptionId - ID for a subscription.
     * @param notificationId -
     */
    getNotification(subscriptionId: string, notificationId: number): Promise<ServiceHooks.Notification>;
    /**
     * Get a list of notifications for a specific subscription. A notification includes details about the event, the request to and the response from the consumer service.
     *
     * @param subscriptionId - ID for a subscription.
     * @param maxResults - Maximum number of notifications to return. Default is **100**.
     * @param status - Get only notifications with this status.
     * @param result - Get only notifications with this result type.
     */
    getNotifications(subscriptionId: string, maxResults?: number, status?: ServiceHooks.NotificationStatus, result?: ServiceHooks.NotificationResult): Promise<ServiceHooks.Notification[]>;
    /**
     * Query for notifications. A notification includes details about the event, the request to and the response from the consumer service.
     *
     * @param query -
     */
    queryNotifications(query: ServiceHooks.NotificationsQuery): Promise<ServiceHooks.NotificationsQuery>;
    /**
     * @param inputValuesQuery -
     * @param publisherId -
     */
    queryInputValues(inputValuesQuery: FormInput.InputValuesQuery, publisherId: string): Promise<FormInput.InputValuesQuery>;
    /**
     * Get a specific service hooks publisher.
     *
     * @param publisherId - ID for a publisher.
     */
    getPublisher(publisherId: string): Promise<ServiceHooks.Publisher>;
    /**
     * Get a list of publishers.
     *
     */
    listPublishers(): Promise<ServiceHooks.Publisher[]>;
    /**
     * Query for service hook publishers.
     *
     * @param query -
     */
    queryPublishers(query: ServiceHooks.PublishersQuery): Promise<ServiceHooks.PublishersQuery>;
    /**
     * Create a subscription.
     *
     * @param subscription - Subscription to be created.
     */
    createSubscription(subscription: ServiceHooks.Subscription): Promise<ServiceHooks.Subscription>;
    /**
     * Delete a specific service hooks subscription.
     *
     * @param subscriptionId - ID for a subscription.
     */
    deleteSubscription(subscriptionId: string): Promise<void>;
    /**
     * Get a specific service hooks subscription.
     *
     * @param subscriptionId - ID for a subscription.
     */
    getSubscription(subscriptionId: string): Promise<ServiceHooks.Subscription>;
    /**
     * Get a list of subscriptions.
     *
     * @param publisherId - ID for a subscription.
     * @param eventType - The event type to filter on (if any).
     * @param consumerId - ID for a consumer.
     * @param consumerActionId - ID for a consumerActionId.
     */
    listSubscriptions(publisherId?: string, eventType?: string, consumerId?: string, consumerActionId?: string): Promise<ServiceHooks.Subscription[]>;
    /**
     * Update a subscription. \<param name="subscriptionId"\>ID for a subscription that you wish to update.\</param\>
     *
     * @param subscription -
     * @param subscriptionId -
     */
    replaceSubscription(subscription: ServiceHooks.Subscription, subscriptionId?: string): Promise<ServiceHooks.Subscription>;
    /**
     * Query for service hook subscriptions.
     *
     * @param query -
     */
    createSubscriptionsQuery(query: ServiceHooks.SubscriptionsQuery): Promise<ServiceHooks.SubscriptionsQuery>;
    /**
     * Sends a test notification. This is useful for verifying the configuration of an updated or new service hooks subscription.
     *
     * @param testNotification -
     * @param useRealData - Only allow testing with real data in existing subscriptions.
     */
    createTestNotification(testNotification: ServiceHooks.Notification, useRealData?: boolean): Promise<ServiceHooks.Notification>;
}
