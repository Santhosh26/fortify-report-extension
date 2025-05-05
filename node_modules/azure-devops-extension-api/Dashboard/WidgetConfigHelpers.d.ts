/**
 * From /Tfs/WebPlatform/Client/TFS/Dashboards/WidgetConfigHelpers.ts
 */
import { EventArgs } from "./WidgetContracts";
export declare class ConfigurationEvent {
    /**
    * Configuration has changed. When this event is notified, the preview is updated and Save button is enabled.
    *
    * The payload expected when notifying this event: { data: customSettings }
    *
    * {customSettings} is the serialized custom config settings pertaining to the widget.
    */
    static ConfigurationChange: string;
    /**
     * Configuration tries to execute API calls and fails. When this event is notified, the config does not render a view and we pass an error message to the configuration host.
     *
     * The payload expected when notifying this event: { data: string }
     *
     * {string} is the error message that is displayed at the top of the configuration.
     */
    static ConfigurationError: string;
    /**
     * Widget configuration general settings changed. When this event is notified, the widget name or widget size is updated.
     *
     * The payload expected when notifying this event: { data: { IGeneralSettings } }
     *
     * {generalSettings} is the serialized object containing WidgetName and WidgetSize
     */
    static GeneralSettingsChanged: string;
    /**
     * @param payload the event arguments we pass when we want to notify the configuration.
     */
    static Args<T>(payload: T): EventArgs<T>;
}
