/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AgentStatus;
    (function (AgentStatus) {
        /**
         * Indicates that the build agent cannot be contacted.
         */
        AgentStatus[AgentStatus["Unavailable"] = 0] = "Unavailable";
        /**
         * Indicates that the build agent is currently available.
         */
        AgentStatus[AgentStatus["Available"] = 1] = "Available";
        /**
         * Indicates that the build agent has taken itself offline.
         */
        AgentStatus[AgentStatus["Offline"] = 2] = "Offline";
    })(AgentStatus = exports.AgentStatus || (exports.AgentStatus = {}));
    var AuditAction;
    (function (AuditAction) {
        AuditAction[AuditAction["Add"] = 1] = "Add";
        AuditAction[AuditAction["Update"] = 2] = "Update";
        AuditAction[AuditAction["Delete"] = 3] = "Delete";
    })(AuditAction = exports.AuditAction || (exports.AuditAction = {}));
    /**
     * Represents the desired scope of authorization for a build.
     */
    var BuildAuthorizationScope;
    (function (BuildAuthorizationScope) {
        /**
         * The identity used should have build service account permissions scoped to the project collection. This is useful when resources for a single build are spread across multiple projects.
         */
        BuildAuthorizationScope[BuildAuthorizationScope["ProjectCollection"] = 1] = "ProjectCollection";
        /**
         * The identity used should have build service account permissions scoped to the project in which the build definition resides. This is useful for isolation of build jobs to a particular team project to avoid any unintentional escalation of privilege attacks during a build.
         */
        BuildAuthorizationScope[BuildAuthorizationScope["Project"] = 2] = "Project";
    })(BuildAuthorizationScope = exports.BuildAuthorizationScope || (exports.BuildAuthorizationScope = {}));
    var BuildOptionInputType;
    (function (BuildOptionInputType) {
        BuildOptionInputType[BuildOptionInputType["String"] = 0] = "String";
        BuildOptionInputType[BuildOptionInputType["Boolean"] = 1] = "Boolean";
        BuildOptionInputType[BuildOptionInputType["StringList"] = 2] = "StringList";
        BuildOptionInputType[BuildOptionInputType["Radio"] = 3] = "Radio";
        BuildOptionInputType[BuildOptionInputType["PickList"] = 4] = "PickList";
        BuildOptionInputType[BuildOptionInputType["MultiLine"] = 5] = "MultiLine";
        BuildOptionInputType[BuildOptionInputType["BranchFilter"] = 6] = "BranchFilter";
    })(BuildOptionInputType = exports.BuildOptionInputType || (exports.BuildOptionInputType = {}));
    var BuildPhaseStatus;
    (function (BuildPhaseStatus) {
        /**
         * The state is not known.
         */
        BuildPhaseStatus[BuildPhaseStatus["Unknown"] = 0] = "Unknown";
        /**
         * The build phase completed unsuccessfully.
         */
        BuildPhaseStatus[BuildPhaseStatus["Failed"] = 1] = "Failed";
        /**
         * The build phase completed successfully.
         */
        BuildPhaseStatus[BuildPhaseStatus["Succeeded"] = 2] = "Succeeded";
    })(BuildPhaseStatus = exports.BuildPhaseStatus || (exports.BuildPhaseStatus = {}));
    /**
     * Specifies the desired ordering of builds.
     */
    var BuildQueryOrder;
    (function (BuildQueryOrder) {
        /**
         * Order by finish time ascending.
         */
        BuildQueryOrder[BuildQueryOrder["FinishTimeAscending"] = 2] = "FinishTimeAscending";
        /**
         * Order by finish time descending.
         */
        BuildQueryOrder[BuildQueryOrder["FinishTimeDescending"] = 3] = "FinishTimeDescending";
        /**
         * Order by queue time descending.
         */
        BuildQueryOrder[BuildQueryOrder["QueueTimeDescending"] = 4] = "QueueTimeDescending";
        /**
         * Order by queue time ascending.
         */
        BuildQueryOrder[BuildQueryOrder["QueueTimeAscending"] = 5] = "QueueTimeAscending";
        /**
         * Order by start time descending.
         */
        BuildQueryOrder[BuildQueryOrder["StartTimeDescending"] = 6] = "StartTimeDescending";
        /**
         * Order by start time ascending.
         */
        BuildQueryOrder[BuildQueryOrder["StartTimeAscending"] = 7] = "StartTimeAscending";
    })(BuildQueryOrder = exports.BuildQueryOrder || (exports.BuildQueryOrder = {}));
    var BuildReason;
    (function (BuildReason) {
        /**
         * No reason. This value should not be used.
         */
        BuildReason[BuildReason["None"] = 0] = "None";
        /**
         * The build was started manually.
         */
        BuildReason[BuildReason["Manual"] = 1] = "Manual";
        /**
         * The build was started for the trigger TriggerType.ContinuousIntegration.
         */
        BuildReason[BuildReason["IndividualCI"] = 2] = "IndividualCI";
        /**
         * The build was started for the trigger TriggerType.BatchedContinuousIntegration.
         */
        BuildReason[BuildReason["BatchedCI"] = 4] = "BatchedCI";
        /**
         * The build was started for the trigger TriggerType.Schedule.
         */
        BuildReason[BuildReason["Schedule"] = 8] = "Schedule";
        /**
         * The build was started for the trigger TriggerType.ScheduleForced.
         */
        BuildReason[BuildReason["ScheduleForced"] = 16] = "ScheduleForced";
        /**
         * The build was created by a user.
         */
        BuildReason[BuildReason["UserCreated"] = 32] = "UserCreated";
        /**
         * The build was started manually for private validation.
         */
        BuildReason[BuildReason["ValidateShelveset"] = 64] = "ValidateShelveset";
        /**
         * The build was started for the trigger ContinuousIntegrationType.Gated.
         */
        BuildReason[BuildReason["CheckInShelveset"] = 128] = "CheckInShelveset";
        /**
         * The build was started by a pull request. Added in resource version 3.
         */
        BuildReason[BuildReason["PullRequest"] = 256] = "PullRequest";
        /**
         * The build was started when another build completed.
         */
        BuildReason[BuildReason["BuildCompletion"] = 512] = "BuildCompletion";
        /**
         * The build was started when resources in pipeline triggered it
         */
        BuildReason[BuildReason["ResourceTrigger"] = 1024] = "ResourceTrigger";
        /**
         * The build was triggered for retention policy purposes.
         */
        BuildReason[BuildReason["Triggered"] = 1967] = "Triggered";
        /**
         * All reasons.
         */
        BuildReason[BuildReason["All"] = 2031] = "All";
    })(BuildReason = exports.BuildReason || (exports.BuildReason = {}));
    /**
     * This is not a Flags enum because we don't want to set multiple statuses on a build. However, when adding values, please stick to powers of 2 as if it were a Flags enum This will ensure that things that key off multiple result types (like labelling sources) continue to work
     */
    var BuildResult;
    (function (BuildResult) {
        /**
         * No result
         */
        BuildResult[BuildResult["None"] = 0] = "None";
        /**
         * The build completed successfully.
         */
        BuildResult[BuildResult["Succeeded"] = 2] = "Succeeded";
        /**
         * The build completed compilation successfully but had other errors.
         */
        BuildResult[BuildResult["PartiallySucceeded"] = 4] = "PartiallySucceeded";
        /**
         * The build completed unsuccessfully.
         */
        BuildResult[BuildResult["Failed"] = 8] = "Failed";
        /**
         * The build was canceled before starting.
         */
        BuildResult[BuildResult["Canceled"] = 32] = "Canceled";
    })(BuildResult = exports.BuildResult || (exports.BuildResult = {}));
    var BuildStatus;
    (function (BuildStatus) {
        /**
         * No status.
         */
        BuildStatus[BuildStatus["None"] = 0] = "None";
        /**
         * The build is currently in progress.
         */
        BuildStatus[BuildStatus["InProgress"] = 1] = "InProgress";
        /**
         * The build has completed.
         */
        BuildStatus[BuildStatus["Completed"] = 2] = "Completed";
        /**
         * The build is cancelling
         */
        BuildStatus[BuildStatus["Cancelling"] = 4] = "Cancelling";
        /**
         * The build is inactive in the queue.
         */
        BuildStatus[BuildStatus["Postponed"] = 8] = "Postponed";
        /**
         * The build has not yet started.
         */
        BuildStatus[BuildStatus["NotStarted"] = 32] = "NotStarted";
        /**
         * All status.
         */
        BuildStatus[BuildStatus["All"] = 47] = "All";
    })(BuildStatus = exports.BuildStatus || (exports.BuildStatus = {}));
    var ControllerStatus;
    (function (ControllerStatus) {
        /**
         * Indicates that the build controller cannot be contacted.
         */
        ControllerStatus[ControllerStatus["Unavailable"] = 0] = "Unavailable";
        /**
         * Indicates that the build controller is currently available.
         */
        ControllerStatus[ControllerStatus["Available"] = 1] = "Available";
        /**
         * Indicates that the build controller has taken itself offline.
         */
        ControllerStatus[ControllerStatus["Offline"] = 2] = "Offline";
    })(ControllerStatus = exports.ControllerStatus || (exports.ControllerStatus = {}));
    var DefinitionQuality;
    (function (DefinitionQuality) {
        DefinitionQuality[DefinitionQuality["Definition"] = 1] = "Definition";
        DefinitionQuality[DefinitionQuality["Draft"] = 2] = "Draft";
    })(DefinitionQuality = exports.DefinitionQuality || (exports.DefinitionQuality = {}));
    /**
     * Specifies the desired ordering of definitions.
     */
    var DefinitionQueryOrder;
    (function (DefinitionQueryOrder) {
        /**
         * No order
         */
        DefinitionQueryOrder[DefinitionQueryOrder["None"] = 0] = "None";
        /**
         * Order by created on/last modified time ascending.
         */
        DefinitionQueryOrder[DefinitionQueryOrder["LastModifiedAscending"] = 1] = "LastModifiedAscending";
        /**
         * Order by created on/last modified time descending.
         */
        DefinitionQueryOrder[DefinitionQueryOrder["LastModifiedDescending"] = 2] = "LastModifiedDescending";
        /**
         * Order by definition name ascending.
         */
        DefinitionQueryOrder[DefinitionQueryOrder["DefinitionNameAscending"] = 3] = "DefinitionNameAscending";
        /**
         * Order by definition name descending.
         */
        DefinitionQueryOrder[DefinitionQueryOrder["DefinitionNameDescending"] = 4] = "DefinitionNameDescending";
    })(DefinitionQueryOrder = exports.DefinitionQueryOrder || (exports.DefinitionQueryOrder = {}));
    var DefinitionQueueStatus;
    (function (DefinitionQueueStatus) {
        /**
         * When enabled the definition queue allows builds to be queued by users, the system will queue scheduled, gated and continuous integration builds, and the queued builds will be started by the system.
         */
        DefinitionQueueStatus[DefinitionQueueStatus["Enabled"] = 0] = "Enabled";
        /**
         * When paused the definition queue allows builds to be queued by users and the system will queue scheduled, gated and continuous integration builds. Builds in the queue will not be started by the system.
         */
        DefinitionQueueStatus[DefinitionQueueStatus["Paused"] = 1] = "Paused";
        /**
         * When disabled the definition queue will not allow builds to be queued by users and the system will not queue scheduled, gated or continuous integration builds. Builds already in the queue will not be started by the system.
         */
        DefinitionQueueStatus[DefinitionQueueStatus["Disabled"] = 2] = "Disabled";
    })(DefinitionQueueStatus = exports.DefinitionQueueStatus || (exports.DefinitionQueueStatus = {}));
    var DefinitionTriggerType;
    (function (DefinitionTriggerType) {
        /**
         * Manual builds only.
         */
        DefinitionTriggerType[DefinitionTriggerType["None"] = 1] = "None";
        /**
         * A build should be started for each changeset.
         */
        DefinitionTriggerType[DefinitionTriggerType["ContinuousIntegration"] = 2] = "ContinuousIntegration";
        /**
         * A build should be started for multiple changesets at a time at a specified interval.
         */
        DefinitionTriggerType[DefinitionTriggerType["BatchedContinuousIntegration"] = 4] = "BatchedContinuousIntegration";
        /**
         * A build should be started on a specified schedule whether or not changesets exist.
         */
        DefinitionTriggerType[DefinitionTriggerType["Schedule"] = 8] = "Schedule";
        /**
         * A validation build should be started for each check-in.
         */
        DefinitionTriggerType[DefinitionTriggerType["GatedCheckIn"] = 16] = "GatedCheckIn";
        /**
         * A validation build should be started for each batch of check-ins.
         */
        DefinitionTriggerType[DefinitionTriggerType["BatchedGatedCheckIn"] = 32] = "BatchedGatedCheckIn";
        /**
         * A build should be triggered when a GitHub pull request is created or updated. Added in resource version 3
         */
        DefinitionTriggerType[DefinitionTriggerType["PullRequest"] = 64] = "PullRequest";
        /**
         * A build should be triggered when another build completes.
         */
        DefinitionTriggerType[DefinitionTriggerType["BuildCompletion"] = 128] = "BuildCompletion";
        /**
         * All types.
         */
        DefinitionTriggerType[DefinitionTriggerType["All"] = 255] = "All";
    })(DefinitionTriggerType = exports.DefinitionTriggerType || (exports.DefinitionTriggerType = {}));
    var DefinitionType;
    (function (DefinitionType) {
        DefinitionType[DefinitionType["Xaml"] = 1] = "Xaml";
        DefinitionType[DefinitionType["Build"] = 2] = "Build";
    })(DefinitionType = exports.DefinitionType || (exports.DefinitionType = {}));
    var DeleteOptions;
    (function (DeleteOptions) {
        /**
         * No data should be deleted. This value should not be used.
         */
        DeleteOptions[DeleteOptions["None"] = 0] = "None";
        /**
         * The drop location should be deleted.
         */
        DeleteOptions[DeleteOptions["DropLocation"] = 1] = "DropLocation";
        /**
         * The test results should be deleted.
         */
        DeleteOptions[DeleteOptions["TestResults"] = 2] = "TestResults";
        /**
         * The version control label should be deleted.
         */
        DeleteOptions[DeleteOptions["Label"] = 4] = "Label";
        /**
         * The build should be deleted.
         */
        DeleteOptions[DeleteOptions["Details"] = 8] = "Details";
        /**
         * Published symbols should be deleted.
         */
        DeleteOptions[DeleteOptions["Symbols"] = 16] = "Symbols";
        /**
         * All data should be deleted.
         */
        DeleteOptions[DeleteOptions["All"] = 31] = "All";
    })(DeleteOptions = exports.DeleteOptions || (exports.DeleteOptions = {}));
    /**
     * Specifies the desired ordering of folders.
     */
    var FolderQueryOrder;
    (function (FolderQueryOrder) {
        /**
         * No order
         */
        FolderQueryOrder[FolderQueryOrder["None"] = 0] = "None";
        /**
         * Order by folder name and path ascending.
         */
        FolderQueryOrder[FolderQueryOrder["FolderAscending"] = 1] = "FolderAscending";
        /**
         * Order by folder name and path descending.
         */
        FolderQueryOrder[FolderQueryOrder["FolderDescending"] = 2] = "FolderDescending";
    })(FolderQueryOrder = exports.FolderQueryOrder || (exports.FolderQueryOrder = {}));
    var GetOption;
    (function (GetOption) {
        /**
         * Use the latest changeset at the time the build is queued.
         */
        GetOption[GetOption["LatestOnQueue"] = 0] = "LatestOnQueue";
        /**
         * Use the latest changeset at the time the build is started.
         */
        GetOption[GetOption["LatestOnBuild"] = 1] = "LatestOnBuild";
        /**
         * A user-specified version has been supplied.
         */
        GetOption[GetOption["Custom"] = 2] = "Custom";
    })(GetOption = exports.GetOption || (exports.GetOption = {}));
    var IssueType;
    (function (IssueType) {
        IssueType[IssueType["Error"] = 1] = "Error";
        IssueType[IssueType["Warning"] = 2] = "Warning";
    })(IssueType = exports.IssueType || (exports.IssueType = {}));
    var ProcessTemplateType;
    (function (ProcessTemplateType) {
        /**
         * Indicates a custom template.
         */
        ProcessTemplateType[ProcessTemplateType["Custom"] = 0] = "Custom";
        /**
         * Indicates a default template.
         */
        ProcessTemplateType[ProcessTemplateType["Default"] = 1] = "Default";
        /**
         * Indicates an upgrade template.
         */
        ProcessTemplateType[ProcessTemplateType["Upgrade"] = 2] = "Upgrade";
    })(ProcessTemplateType = exports.ProcessTemplateType || (exports.ProcessTemplateType = {}));
    var QueryDeletedOption;
    (function (QueryDeletedOption) {
        /**
         * Include only non-deleted builds.
         */
        QueryDeletedOption[QueryDeletedOption["ExcludeDeleted"] = 0] = "ExcludeDeleted";
        /**
         * Include deleted and non-deleted builds.
         */
        QueryDeletedOption[QueryDeletedOption["IncludeDeleted"] = 1] = "IncludeDeleted";
        /**
         * Include only deleted builds.
         */
        QueryDeletedOption[QueryDeletedOption["OnlyDeleted"] = 2] = "OnlyDeleted";
    })(QueryDeletedOption = exports.QueryDeletedOption || (exports.QueryDeletedOption = {}));
    var QueueOptions;
    (function (QueueOptions) {
        /**
         * No queue options
         */
        QueueOptions[QueueOptions["None"] = 0] = "None";
        /**
         * Create a plan Id for the build, do not run it
         */
        QueueOptions[QueueOptions["DoNotRun"] = 1] = "DoNotRun";
    })(QueueOptions = exports.QueueOptions || (exports.QueueOptions = {}));
    var QueuePriority;
    (function (QueuePriority) {
        /**
         * Low priority.
         */
        QueuePriority[QueuePriority["Low"] = 5] = "Low";
        /**
         * Below normal priority.
         */
        QueuePriority[QueuePriority["BelowNormal"] = 4] = "BelowNormal";
        /**
         * Normal priority.
         */
        QueuePriority[QueuePriority["Normal"] = 3] = "Normal";
        /**
         * Above normal priority.
         */
        QueuePriority[QueuePriority["AboveNormal"] = 2] = "AboveNormal";
        /**
         * High priority.
         */
        QueuePriority[QueuePriority["High"] = 1] = "High";
    })(QueuePriority = exports.QueuePriority || (exports.QueuePriority = {}));
    var RepositoryCleanOptions;
    (function (RepositoryCleanOptions) {
        /**
         * Run git clean -fdx && git reset --hard or Tf /scorch on $(build.sourcesDirectory)
         */
        RepositoryCleanOptions[RepositoryCleanOptions["Source"] = 0] = "Source";
        /**
         * Run git clean -fdx && git reset --hard or Tf /scorch on $(build.sourcesDirectory), also re-create $(build.binariesDirectory)
         */
        RepositoryCleanOptions[RepositoryCleanOptions["SourceAndOutputDir"] = 1] = "SourceAndOutputDir";
        /**
         * Re-create $(build.sourcesDirectory)
         */
        RepositoryCleanOptions[RepositoryCleanOptions["SourceDir"] = 2] = "SourceDir";
        /**
         * Re-create $(agnet.buildDirectory) which contains $(build.sourcesDirectory), $(build.binariesDirectory) and any folders that left from previous build.
         */
        RepositoryCleanOptions[RepositoryCleanOptions["AllBuildDir"] = 3] = "AllBuildDir";
    })(RepositoryCleanOptions = exports.RepositoryCleanOptions || (exports.RepositoryCleanOptions = {}));
    var ResultSet;
    (function (ResultSet) {
        /**
         * Include all repositories
         */
        ResultSet[ResultSet["All"] = 0] = "All";
        /**
         * Include most relevant repositories for user
         */
        ResultSet[ResultSet["Top"] = 1] = "Top";
    })(ResultSet = exports.ResultSet || (exports.ResultSet = {}));
    var ScheduleDays;
    (function (ScheduleDays) {
        /**
         * Do not run.
         */
        ScheduleDays[ScheduleDays["None"] = 0] = "None";
        /**
         * Run on Monday.
         */
        ScheduleDays[ScheduleDays["Monday"] = 1] = "Monday";
        /**
         * Run on Tuesday.
         */
        ScheduleDays[ScheduleDays["Tuesday"] = 2] = "Tuesday";
        /**
         * Run on Wednesday.
         */
        ScheduleDays[ScheduleDays["Wednesday"] = 4] = "Wednesday";
        /**
         * Run on Thursday.
         */
        ScheduleDays[ScheduleDays["Thursday"] = 8] = "Thursday";
        /**
         * Run on Friday.
         */
        ScheduleDays[ScheduleDays["Friday"] = 16] = "Friday";
        /**
         * Run on Saturday.
         */
        ScheduleDays[ScheduleDays["Saturday"] = 32] = "Saturday";
        /**
         * Run on Sunday.
         */
        ScheduleDays[ScheduleDays["Sunday"] = 64] = "Sunday";
        /**
         * Run on all days of the week.
         */
        ScheduleDays[ScheduleDays["All"] = 127] = "All";
    })(ScheduleDays = exports.ScheduleDays || (exports.ScheduleDays = {}));
    var ServiceHostStatus;
    (function (ServiceHostStatus) {
        /**
         * The service host is currently connected and accepting commands.
         */
        ServiceHostStatus[ServiceHostStatus["Online"] = 1] = "Online";
        /**
         * The service host is currently disconnected and not accepting commands.
         */
        ServiceHostStatus[ServiceHostStatus["Offline"] = 2] = "Offline";
    })(ServiceHostStatus = exports.ServiceHostStatus || (exports.ServiceHostStatus = {}));
    var SourceProviderAvailability;
    (function (SourceProviderAvailability) {
        /**
         * The source provider is available in the hosted environment.
         */
        SourceProviderAvailability[SourceProviderAvailability["Hosted"] = 1] = "Hosted";
        /**
         * The source provider is available in the on-premises environment.
         */
        SourceProviderAvailability[SourceProviderAvailability["OnPremises"] = 2] = "OnPremises";
        /**
         * The source provider is available in all environments.
         */
        SourceProviderAvailability[SourceProviderAvailability["All"] = 3] = "All";
    })(SourceProviderAvailability = exports.SourceProviderAvailability || (exports.SourceProviderAvailability = {}));
    var StageUpdateType;
    (function (StageUpdateType) {
        StageUpdateType[StageUpdateType["Cancel"] = 0] = "Cancel";
        StageUpdateType[StageUpdateType["Retry"] = 1] = "Retry";
        StageUpdateType[StageUpdateType["Run"] = 2] = "Run";
    })(StageUpdateType = exports.StageUpdateType || (exports.StageUpdateType = {}));
    var SupportLevel;
    (function (SupportLevel) {
        /**
         * The functionality is not supported.
         */
        SupportLevel[SupportLevel["Unsupported"] = 0] = "Unsupported";
        /**
         * The functionality is supported.
         */
        SupportLevel[SupportLevel["Supported"] = 1] = "Supported";
        /**
         * The functionality is required.
         */
        SupportLevel[SupportLevel["Required"] = 2] = "Required";
    })(SupportLevel = exports.SupportLevel || (exports.SupportLevel = {}));
    var TaskResult;
    (function (TaskResult) {
        TaskResult[TaskResult["Succeeded"] = 0] = "Succeeded";
        TaskResult[TaskResult["SucceededWithIssues"] = 1] = "SucceededWithIssues";
        TaskResult[TaskResult["Failed"] = 2] = "Failed";
        TaskResult[TaskResult["Canceled"] = 3] = "Canceled";
        TaskResult[TaskResult["Skipped"] = 4] = "Skipped";
        TaskResult[TaskResult["Abandoned"] = 5] = "Abandoned";
        TaskResult[TaskResult["ManuallyQueued"] = 6] = "ManuallyQueued";
        TaskResult[TaskResult["DependentOnManualQueue"] = 7] = "DependentOnManualQueue";
    })(TaskResult = exports.TaskResult || (exports.TaskResult = {}));
    var TimelineRecordState;
    (function (TimelineRecordState) {
        TimelineRecordState[TimelineRecordState["Pending"] = 0] = "Pending";
        TimelineRecordState[TimelineRecordState["InProgress"] = 1] = "InProgress";
        TimelineRecordState[TimelineRecordState["Completed"] = 2] = "Completed";
    })(TimelineRecordState = exports.TimelineRecordState || (exports.TimelineRecordState = {}));
    var ValidationResult;
    (function (ValidationResult) {
        ValidationResult[ValidationResult["OK"] = 0] = "OK";
        ValidationResult[ValidationResult["Warning"] = 1] = "Warning";
        ValidationResult[ValidationResult["Error"] = 2] = "Error";
    })(ValidationResult = exports.ValidationResult || (exports.ValidationResult = {}));
    var WorkspaceMappingType;
    (function (WorkspaceMappingType) {
        /**
         * The path is mapped in the workspace.
         */
        WorkspaceMappingType[WorkspaceMappingType["Map"] = 0] = "Map";
        /**
         * The path is cloaked in the workspace.
         */
        WorkspaceMappingType[WorkspaceMappingType["Cloak"] = 1] = "Cloak";
    })(WorkspaceMappingType = exports.WorkspaceMappingType || (exports.WorkspaceMappingType = {}));
});
