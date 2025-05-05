define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contribution ids of core DevOps services which can be obtained from DevOps.getService
     */
    var CommonServiceIds;
    (function (CommonServiceIds) {
        /**
         * Service for interacting with the extension data service
         */
        CommonServiceIds["ExtensionDataService"] = "ms.vss-features.extension-data-service";
        /**
         * Service for showing global message banners at the top of the page
         */
        CommonServiceIds["GlobalMessagesService"] = "ms.vss-tfs-web.tfs-global-messages-service";
        /**
         * Service for interacting with the host window's navigation (URLs, new windows, etc.)
         */
        CommonServiceIds["HostNavigationService"] = "ms.vss-features.host-navigation-service";
        /**
         * Service for interacting with the layout of the page: managing full-screen mode,
         * opening dialogs and panels
         */
        CommonServiceIds["HostPageLayoutService"] = "ms.vss-features.host-page-layout-service";
        /**
         * Service for getting URLs/locations from the host context
         */
        CommonServiceIds["LocationService"] = "ms.vss-features.location-service";
        /**
         * Exposes project-related information from the current page
         */
        CommonServiceIds["ProjectPageService"] = "ms.vss-tfs-web.tfs-page-data-service";
    })(CommonServiceIds = exports.CommonServiceIds || (exports.CommonServiceIds = {}));
    /**
     * Host level for a VSS service
     */
    var TeamFoundationHostType;
    (function (TeamFoundationHostType) {
        /**
         * The Deployment host
         */
        TeamFoundationHostType[TeamFoundationHostType["Deployment"] = 1] = "Deployment";
        /**
         * The Enterprise host
         */
        TeamFoundationHostType[TeamFoundationHostType["Enterprise"] = 2] = "Enterprise";
        /**
         * The organization/project collection host
         */
        TeamFoundationHostType[TeamFoundationHostType["Organization"] = 4] = "Organization";
    })(TeamFoundationHostType = exports.TeamFoundationHostType || (exports.TeamFoundationHostType = {}));
    /**
     * Size (width) options for panel
     */
    var PanelSize;
    (function (PanelSize) {
        PanelSize[PanelSize["Small"] = 0] = "Small";
        PanelSize[PanelSize["Medium"] = 1] = "Medium";
        PanelSize[PanelSize["Large"] = 2] = "Large";
    })(PanelSize = exports.PanelSize || (exports.PanelSize = {}));
    /**
     * The severity of the message.
     */
    var MessageBannerLevel;
    (function (MessageBannerLevel) {
        MessageBannerLevel[MessageBannerLevel["info"] = 0] = "info";
        MessageBannerLevel[MessageBannerLevel["warning"] = 1] = "warning";
        MessageBannerLevel[MessageBannerLevel["error"] = 2] = "error";
        MessageBannerLevel[MessageBannerLevel["success"] = 3] = "success";
    })(MessageBannerLevel = exports.MessageBannerLevel || (exports.MessageBannerLevel = {}));
});
