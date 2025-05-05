/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AgentArtifactType;
    (function (AgentArtifactType) {
        /**
         * Indicates XamlBuild artifact
         */
        AgentArtifactType[AgentArtifactType["XamlBuild"] = 0] = "XamlBuild";
        /**
         * Indicates Build artifact
         */
        AgentArtifactType[AgentArtifactType["Build"] = 1] = "Build";
        /**
         * Indicates Jenkins artifact
         */
        AgentArtifactType[AgentArtifactType["Jenkins"] = 2] = "Jenkins";
        /**
         * Indicates FileShare artifact
         */
        AgentArtifactType[AgentArtifactType["FileShare"] = 3] = "FileShare";
        /**
         * Indicates Nuget artifact
         */
        AgentArtifactType[AgentArtifactType["Nuget"] = 4] = "Nuget";
        /**
         * Indicates TfsOnPrem artifact
         */
        AgentArtifactType[AgentArtifactType["TfsOnPrem"] = 5] = "TfsOnPrem";
        /**
         * Indicates GitHub artifact
         */
        AgentArtifactType[AgentArtifactType["GitHub"] = 6] = "GitHub";
        /**
         * Indicates TFGit artifact
         */
        AgentArtifactType[AgentArtifactType["TFGit"] = 7] = "TFGit";
        /**
         * Indicates ExternalTfsBuild artifact
         */
        AgentArtifactType[AgentArtifactType["ExternalTfsBuild"] = 8] = "ExternalTfsBuild";
        /**
         * Indicates Custom artifact
         */
        AgentArtifactType[AgentArtifactType["Custom"] = 9] = "Custom";
        /**
         * Indicates Tfvc artifact
         */
        AgentArtifactType[AgentArtifactType["Tfvc"] = 10] = "Tfvc";
    })(AgentArtifactType = exports.AgentArtifactType || (exports.AgentArtifactType = {}));
    var ApprovalExecutionOrder;
    (function (ApprovalExecutionOrder) {
        /**
         * Approvals shown before gates.
         */
        ApprovalExecutionOrder[ApprovalExecutionOrder["BeforeGates"] = 1] = "BeforeGates";
        /**
         * Approvals shown after successful execution of gates.
         */
        ApprovalExecutionOrder[ApprovalExecutionOrder["AfterSuccessfulGates"] = 2] = "AfterSuccessfulGates";
        /**
         * Approvals shown always after execution of gates.
         */
        ApprovalExecutionOrder[ApprovalExecutionOrder["AfterGatesAlways"] = 4] = "AfterGatesAlways";
    })(ApprovalExecutionOrder = exports.ApprovalExecutionOrder || (exports.ApprovalExecutionOrder = {}));
    var ApprovalFilters;
    (function (ApprovalFilters) {
        /**
         * No approvals or approval snapshots.
         */
        ApprovalFilters[ApprovalFilters["None"] = 0] = "None";
        /**
         * Manual approval steps but no approval snapshots (Use with ApprovalSnapshots for snapshots).
         */
        ApprovalFilters[ApprovalFilters["ManualApprovals"] = 1] = "ManualApprovals";
        /**
         * Automated approval steps but no approval snapshots (Use with ApprovalSnapshots for snapshots).
         */
        ApprovalFilters[ApprovalFilters["AutomatedApprovals"] = 2] = "AutomatedApprovals";
        /**
         * No approval steps, but approval snapshots (Use with either ManualApprovals or AutomatedApprovals for approval steps).
         */
        ApprovalFilters[ApprovalFilters["ApprovalSnapshots"] = 4] = "ApprovalSnapshots";
        /**
         * All approval steps and approval snapshots.
         */
        ApprovalFilters[ApprovalFilters["All"] = 7] = "All";
    })(ApprovalFilters = exports.ApprovalFilters || (exports.ApprovalFilters = {}));
    var ApprovalStatus;
    (function (ApprovalStatus) {
        /**
         * Indicates the approval does not have the status set.
         */
        ApprovalStatus[ApprovalStatus["Undefined"] = 0] = "Undefined";
        /**
         * Indicates the approval is pending.
         */
        ApprovalStatus[ApprovalStatus["Pending"] = 1] = "Pending";
        /**
         * Indicates the approval is approved.
         */
        ApprovalStatus[ApprovalStatus["Approved"] = 2] = "Approved";
        /**
         * Indicates the approval is rejected.
         */
        ApprovalStatus[ApprovalStatus["Rejected"] = 4] = "Rejected";
        /**
         * Indicates the approval is reassigned.
         */
        ApprovalStatus[ApprovalStatus["Reassigned"] = 6] = "Reassigned";
        /**
         * Indicates the approval is canceled.
         */
        ApprovalStatus[ApprovalStatus["Canceled"] = 7] = "Canceled";
        /**
         * Indicates the approval is skipped.
         */
        ApprovalStatus[ApprovalStatus["Skipped"] = 8] = "Skipped";
    })(ApprovalStatus = exports.ApprovalStatus || (exports.ApprovalStatus = {}));
    var ApprovalType;
    (function (ApprovalType) {
        /**
         * Indicates the approval type does not set.
         */
        ApprovalType[ApprovalType["Undefined"] = 0] = "Undefined";
        /**
         * Indicates the approvals which executed before deployment.
         */
        ApprovalType[ApprovalType["PreDeploy"] = 1] = "PreDeploy";
        /**
         * Indicates the approvals which executed after deployment.
         */
        ApprovalType[ApprovalType["PostDeploy"] = 2] = "PostDeploy";
        /**
         * Indicates all approvals.
         */
        ApprovalType[ApprovalType["All"] = 3] = "All";
    })(ApprovalType = exports.ApprovalType || (exports.ApprovalType = {}));
    var AuditAction;
    (function (AuditAction) {
        /**
         * Indicates the audit add.
         */
        AuditAction[AuditAction["Add"] = 1] = "Add";
        /**
         * Indicates the audit update.
         */
        AuditAction[AuditAction["Update"] = 2] = "Update";
        /**
         * Indicates the audit delete.
         */
        AuditAction[AuditAction["Delete"] = 3] = "Delete";
        /**
         * Indicates the audit undelete.
         */
        AuditAction[AuditAction["Undelete"] = 4] = "Undelete";
    })(AuditAction = exports.AuditAction || (exports.AuditAction = {}));
    var AuthorizationHeaderFor;
    (function (AuthorizationHeaderFor) {
        AuthorizationHeaderFor[AuthorizationHeaderFor["RevalidateApproverIdentity"] = 0] = "RevalidateApproverIdentity";
        AuthorizationHeaderFor[AuthorizationHeaderFor["OnBehalfOf"] = 1] = "OnBehalfOf";
    })(AuthorizationHeaderFor = exports.AuthorizationHeaderFor || (exports.AuthorizationHeaderFor = {}));
    var ConditionType;
    (function (ConditionType) {
        /**
         * The condition type is undefined.
         */
        ConditionType[ConditionType["Undefined"] = 0] = "Undefined";
        /**
         * The condition type is event.
         */
        ConditionType[ConditionType["Event"] = 1] = "Event";
        /**
         * The condition type is environment state.
         */
        ConditionType[ConditionType["EnvironmentState"] = 2] = "EnvironmentState";
        /**
         * The condition type is artifact.
         */
        ConditionType[ConditionType["Artifact"] = 4] = "Artifact";
    })(ConditionType = exports.ConditionType || (exports.ConditionType = {}));
    var DeploymentAuthorizationOwner;
    (function (DeploymentAuthorizationOwner) {
        DeploymentAuthorizationOwner[DeploymentAuthorizationOwner["Automatic"] = 0] = "Automatic";
        DeploymentAuthorizationOwner[DeploymentAuthorizationOwner["DeploymentSubmitter"] = 1] = "DeploymentSubmitter";
        DeploymentAuthorizationOwner[DeploymentAuthorizationOwner["FirstPreDeploymentApprover"] = 2] = "FirstPreDeploymentApprover";
    })(DeploymentAuthorizationOwner = exports.DeploymentAuthorizationOwner || (exports.DeploymentAuthorizationOwner = {}));
    var DeploymentExpands;
    (function (DeploymentExpands) {
        DeploymentExpands[DeploymentExpands["All"] = 0] = "All";
        DeploymentExpands[DeploymentExpands["DeploymentOnly"] = 1] = "DeploymentOnly";
        DeploymentExpands[DeploymentExpands["Approvals"] = 2] = "Approvals";
        DeploymentExpands[DeploymentExpands["Artifacts"] = 4] = "Artifacts";
    })(DeploymentExpands = exports.DeploymentExpands || (exports.DeploymentExpands = {}));
    var DeploymentOperationStatus;
    (function (DeploymentOperationStatus) {
        /**
         * The deployment operation status is undefined.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Undefined"] = 0] = "Undefined";
        /**
         * The deployment operation status is queued.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Queued"] = 1] = "Queued";
        /**
         * The deployment operation status is scheduled.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Scheduled"] = 2] = "Scheduled";
        /**
         * The deployment operation status is pending.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Pending"] = 4] = "Pending";
        /**
         * The deployment operation status is approved.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Approved"] = 8] = "Approved";
        /**
         * The deployment operation status is rejected.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Rejected"] = 16] = "Rejected";
        /**
         * The deployment operation status is deferred.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Deferred"] = 32] = "Deferred";
        /**
         * The deployment operation status is queued for agent.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["QueuedForAgent"] = 64] = "QueuedForAgent";
        /**
         * The deployment operation status is phase in progress.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["PhaseInProgress"] = 128] = "PhaseInProgress";
        /**
         * The deployment operation status is phase succeeded.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["PhaseSucceeded"] = 256] = "PhaseSucceeded";
        /**
         * The deployment operation status is phase partially succeeded.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["PhasePartiallySucceeded"] = 512] = "PhasePartiallySucceeded";
        /**
         * The deployment operation status is phase failed.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["PhaseFailed"] = 1024] = "PhaseFailed";
        /**
         * The deployment operation status is canceled.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Canceled"] = 2048] = "Canceled";
        /**
         * The deployment operation status is phase canceled.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["PhaseCanceled"] = 4096] = "PhaseCanceled";
        /**
         * The deployment operation status is manualintervention pending.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["ManualInterventionPending"] = 8192] = "ManualInterventionPending";
        /**
         * The deployment operation status is queued for pipeline.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["QueuedForPipeline"] = 16384] = "QueuedForPipeline";
        /**
         * The deployment operation status is cancelling.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["Cancelling"] = 32768] = "Cancelling";
        /**
         * The deployment operation status is EvaluatingGates.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["EvaluatingGates"] = 65536] = "EvaluatingGates";
        /**
         * The deployment operation status is GateFailed.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["GateFailed"] = 131072] = "GateFailed";
        /**
         * The deployment operation status is all.
         */
        DeploymentOperationStatus[DeploymentOperationStatus["All"] = 258047] = "All";
    })(DeploymentOperationStatus = exports.DeploymentOperationStatus || (exports.DeploymentOperationStatus = {}));
    var DeploymentReason;
    (function (DeploymentReason) {
        /**
         * The deployment reason is none.
         */
        DeploymentReason[DeploymentReason["None"] = 0] = "None";
        /**
         * The deployment reason is manual.
         */
        DeploymentReason[DeploymentReason["Manual"] = 1] = "Manual";
        /**
         * The deployment reason is automated.
         */
        DeploymentReason[DeploymentReason["Automated"] = 2] = "Automated";
        /**
         * The deployment reason is scheduled.
         */
        DeploymentReason[DeploymentReason["Scheduled"] = 4] = "Scheduled";
        /**
         * The deployment reason is RedeployTrigger.
         */
        DeploymentReason[DeploymentReason["RedeployTrigger"] = 8] = "RedeployTrigger";
    })(DeploymentReason = exports.DeploymentReason || (exports.DeploymentReason = {}));
    var DeploymentsQueryType;
    (function (DeploymentsQueryType) {
        DeploymentsQueryType[DeploymentsQueryType["Regular"] = 1] = "Regular";
        DeploymentsQueryType[DeploymentsQueryType["FailingSince"] = 2] = "FailingSince";
    })(DeploymentsQueryType = exports.DeploymentsQueryType || (exports.DeploymentsQueryType = {}));
    var DeploymentStatus;
    (function (DeploymentStatus) {
        /**
         * The deployment status is undefined.
         */
        DeploymentStatus[DeploymentStatus["Undefined"] = 0] = "Undefined";
        /**
         * The deployment status is not deployed.
         */
        DeploymentStatus[DeploymentStatus["NotDeployed"] = 1] = "NotDeployed";
        /**
         * The deployment status is in progress.
         */
        DeploymentStatus[DeploymentStatus["InProgress"] = 2] = "InProgress";
        /**
         * The deployment status is succeeded.
         */
        DeploymentStatus[DeploymentStatus["Succeeded"] = 4] = "Succeeded";
        /**
         * The deployment status is partiallysucceeded.
         */
        DeploymentStatus[DeploymentStatus["PartiallySucceeded"] = 8] = "PartiallySucceeded";
        /**
         * The deployment status is failed.
         */
        DeploymentStatus[DeploymentStatus["Failed"] = 16] = "Failed";
        /**
         * The deployment status is all.
         */
        DeploymentStatus[DeploymentStatus["All"] = 31] = "All";
    })(DeploymentStatus = exports.DeploymentStatus || (exports.DeploymentStatus = {}));
    var DeployPhaseStatus;
    (function (DeployPhaseStatus) {
        /**
         * Phase status not set.
         */
        DeployPhaseStatus[DeployPhaseStatus["Undefined"] = 0] = "Undefined";
        /**
         * Phase execution not started.
         */
        DeployPhaseStatus[DeployPhaseStatus["NotStarted"] = 1] = "NotStarted";
        /**
         * Phase execution in progress.
         */
        DeployPhaseStatus[DeployPhaseStatus["InProgress"] = 2] = "InProgress";
        /**
         * Phase execution partially succeeded.
         */
        DeployPhaseStatus[DeployPhaseStatus["PartiallySucceeded"] = 4] = "PartiallySucceeded";
        /**
         * Phase execution succeeded.
         */
        DeployPhaseStatus[DeployPhaseStatus["Succeeded"] = 8] = "Succeeded";
        /**
         * Phase execution failed.
         */
        DeployPhaseStatus[DeployPhaseStatus["Failed"] = 16] = "Failed";
        /**
         * Phase execution canceled.
         */
        DeployPhaseStatus[DeployPhaseStatus["Canceled"] = 32] = "Canceled";
        /**
         * Phase execution skipped.
         */
        DeployPhaseStatus[DeployPhaseStatus["Skipped"] = 64] = "Skipped";
        /**
         * Phase is in cancelling state.
         */
        DeployPhaseStatus[DeployPhaseStatus["Cancelling"] = 128] = "Cancelling";
    })(DeployPhaseStatus = exports.DeployPhaseStatus || (exports.DeployPhaseStatus = {}));
    var DeployPhaseTypes;
    (function (DeployPhaseTypes) {
        /**
         * Phase type not defined. Don't use this.
         */
        DeployPhaseTypes[DeployPhaseTypes["Undefined"] = 0] = "Undefined";
        /**
         * Phase type which contains tasks executed on agent.
         */
        DeployPhaseTypes[DeployPhaseTypes["AgentBasedDeployment"] = 1] = "AgentBasedDeployment";
        /**
         * Phase type which contains tasks executed by server.
         */
        DeployPhaseTypes[DeployPhaseTypes["RunOnServer"] = 2] = "RunOnServer";
        /**
         * Phase type which contains tasks executed on deployment group machines.
         */
        DeployPhaseTypes[DeployPhaseTypes["MachineGroupBasedDeployment"] = 4] = "MachineGroupBasedDeployment";
        /**
         * Phase type which contains tasks which acts as Gates for the deployment to go forward.
         */
        DeployPhaseTypes[DeployPhaseTypes["DeploymentGates"] = 8] = "DeploymentGates";
    })(DeployPhaseTypes = exports.DeployPhaseTypes || (exports.DeployPhaseTypes = {}));
    var EnvironmentStatus;
    (function (EnvironmentStatus) {
        /**
         * Environment status not set.
         */
        EnvironmentStatus[EnvironmentStatus["Undefined"] = 0] = "Undefined";
        /**
         * Environment is in not started state.
         */
        EnvironmentStatus[EnvironmentStatus["NotStarted"] = 1] = "NotStarted";
        /**
         * Environment is in progress state.
         */
        EnvironmentStatus[EnvironmentStatus["InProgress"] = 2] = "InProgress";
        /**
         * Environment is in succeeded state.
         */
        EnvironmentStatus[EnvironmentStatus["Succeeded"] = 4] = "Succeeded";
        /**
         * Environment is in canceled state.
         */
        EnvironmentStatus[EnvironmentStatus["Canceled"] = 8] = "Canceled";
        /**
         * Environment is in rejected state.
         */
        EnvironmentStatus[EnvironmentStatus["Rejected"] = 16] = "Rejected";
        /**
         * Environment is in queued state.
         */
        EnvironmentStatus[EnvironmentStatus["Queued"] = 32] = "Queued";
        /**
         * Environment is in scheduled state.
         */
        EnvironmentStatus[EnvironmentStatus["Scheduled"] = 64] = "Scheduled";
        /**
         * Environment is in partially succeeded state.
         */
        EnvironmentStatus[EnvironmentStatus["PartiallySucceeded"] = 128] = "PartiallySucceeded";
    })(EnvironmentStatus = exports.EnvironmentStatus || (exports.EnvironmentStatus = {}));
    var EnvironmentTriggerType;
    (function (EnvironmentTriggerType) {
        /**
         * Environment trigger type undefined.
         */
        EnvironmentTriggerType[EnvironmentTriggerType["Undefined"] = 0] = "Undefined";
        /**
         * Environment trigger type is deployment group redeploy.
         */
        EnvironmentTriggerType[EnvironmentTriggerType["DeploymentGroupRedeploy"] = 1] = "DeploymentGroupRedeploy";
        /**
         * Environment trigger type is Rollback.
         */
        EnvironmentTriggerType[EnvironmentTriggerType["RollbackRedeploy"] = 2] = "RollbackRedeploy";
    })(EnvironmentTriggerType = exports.EnvironmentTriggerType || (exports.EnvironmentTriggerType = {}));
    /**
     * Specifies the desired ordering of folders.
     */
    var FolderPathQueryOrder;
    (function (FolderPathQueryOrder) {
        /**
         * No order.
         */
        FolderPathQueryOrder[FolderPathQueryOrder["None"] = 0] = "None";
        /**
         * Order by folder name and path ascending.
         */
        FolderPathQueryOrder[FolderPathQueryOrder["Ascending"] = 1] = "Ascending";
        /**
         * Order by folder name and path descending.
         */
        FolderPathQueryOrder[FolderPathQueryOrder["Descending"] = 2] = "Descending";
    })(FolderPathQueryOrder = exports.FolderPathQueryOrder || (exports.FolderPathQueryOrder = {}));
    var GateStatus;
    (function (GateStatus) {
        /**
         * The gate does not have the status set.
         */
        GateStatus[GateStatus["None"] = 0] = "None";
        /**
         * The gate is in pending state.
         */
        GateStatus[GateStatus["Pending"] = 1] = "Pending";
        /**
         * The gate is currently in progress.
         */
        GateStatus[GateStatus["InProgress"] = 2] = "InProgress";
        /**
         * The gate completed successfully.
         */
        GateStatus[GateStatus["Succeeded"] = 4] = "Succeeded";
        /**
         * The gate execution failed.
         */
        GateStatus[GateStatus["Failed"] = 8] = "Failed";
        /**
         * The gate execution cancelled.
         */
        GateStatus[GateStatus["Canceled"] = 16] = "Canceled";
    })(GateStatus = exports.GateStatus || (exports.GateStatus = {}));
    var IssueSource;
    (function (IssueSource) {
        IssueSource[IssueSource["None"] = 0] = "None";
        IssueSource[IssueSource["User"] = 1] = "User";
        IssueSource[IssueSource["System"] = 2] = "System";
    })(IssueSource = exports.IssueSource || (exports.IssueSource = {}));
    var MailSectionType;
    (function (MailSectionType) {
        MailSectionType[MailSectionType["Details"] = 0] = "Details";
        MailSectionType[MailSectionType["Environments"] = 1] = "Environments";
        MailSectionType[MailSectionType["Issues"] = 2] = "Issues";
        MailSectionType[MailSectionType["TestResults"] = 3] = "TestResults";
        MailSectionType[MailSectionType["WorkItems"] = 4] = "WorkItems";
        MailSectionType[MailSectionType["ReleaseInfo"] = 5] = "ReleaseInfo";
    })(MailSectionType = exports.MailSectionType || (exports.MailSectionType = {}));
    /**
     * Describes manual intervention status
     */
    var ManualInterventionStatus;
    (function (ManualInterventionStatus) {
        /**
         * The manual intervention does not have the status set.
         */
        ManualInterventionStatus[ManualInterventionStatus["Unknown"] = 0] = "Unknown";
        /**
         * The manual intervention is pending.
         */
        ManualInterventionStatus[ManualInterventionStatus["Pending"] = 1] = "Pending";
        /**
         * The manual intervention is rejected.
         */
        ManualInterventionStatus[ManualInterventionStatus["Rejected"] = 2] = "Rejected";
        /**
         * The manual intervention is approved.
         */
        ManualInterventionStatus[ManualInterventionStatus["Approved"] = 4] = "Approved";
        /**
         * The manual intervention is canceled.
         */
        ManualInterventionStatus[ManualInterventionStatus["Canceled"] = 8] = "Canceled";
        /**
         * The manual intervention is bypassed.
         */
        ManualInterventionStatus[ManualInterventionStatus["Bypassed"] = 16] = "Bypassed";
    })(ManualInterventionStatus = exports.ManualInterventionStatus || (exports.ManualInterventionStatus = {}));
    /**
     * Describes manual intervention status
     */
    var ManualInterventionType;
    (function (ManualInterventionType) {
        /**
         * The manual intervention server task.
         */
        ManualInterventionType[ManualInterventionType["Task"] = 1] = "Task";
        /**
         * The manual intervention proof of presence server task.
         */
        ManualInterventionType[ManualInterventionType["ProofOfPresence"] = 2] = "ProofOfPresence";
    })(ManualInterventionType = exports.ManualInterventionType || (exports.ManualInterventionType = {}));
    var ParallelExecutionTypes;
    (function (ParallelExecutionTypes) {
        ParallelExecutionTypes[ParallelExecutionTypes["None"] = 0] = "None";
        ParallelExecutionTypes[ParallelExecutionTypes["MultiConfiguration"] = 1] = "MultiConfiguration";
        ParallelExecutionTypes[ParallelExecutionTypes["MultiMachine"] = 2] = "MultiMachine";
    })(ParallelExecutionTypes = exports.ParallelExecutionTypes || (exports.ParallelExecutionTypes = {}));
    var PipelineProcessTypes;
    (function (PipelineProcessTypes) {
        PipelineProcessTypes[PipelineProcessTypes["Designer"] = 1] = "Designer";
        PipelineProcessTypes[PipelineProcessTypes["Yaml"] = 2] = "Yaml";
    })(PipelineProcessTypes = exports.PipelineProcessTypes || (exports.PipelineProcessTypes = {}));
    var PropertySelectorType;
    (function (PropertySelectorType) {
        /**
         * Include in property selector.
         */
        PropertySelectorType[PropertySelectorType["Inclusion"] = 0] = "Inclusion";
        /**
         * Exclude in property selector.
         */
        PropertySelectorType[PropertySelectorType["Exclusion"] = 1] = "Exclusion";
    })(PropertySelectorType = exports.PropertySelectorType || (exports.PropertySelectorType = {}));
    var PullRequestSystemType;
    (function (PullRequestSystemType) {
        PullRequestSystemType[PullRequestSystemType["None"] = 0] = "None";
        PullRequestSystemType[PullRequestSystemType["TfsGit"] = 1] = "TfsGit";
        PullRequestSystemType[PullRequestSystemType["GitHub"] = 2] = "GitHub";
    })(PullRequestSystemType = exports.PullRequestSystemType || (exports.PullRequestSystemType = {}));
    var ReleaseDefinitionExpands;
    (function (ReleaseDefinitionExpands) {
        /**
         * Returns top level properties of object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["None"] = 0] = "None";
        /**
         * Include environments in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["Environments"] = 2] = "Environments";
        /**
         * Include artifacts in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["Artifacts"] = 4] = "Artifacts";
        /**
         * Include triggers in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["Triggers"] = 8] = "Triggers";
        /**
         * Include variables in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["Variables"] = 16] = "Variables";
        /**
         * Include tags in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["Tags"] = 32] = "Tags";
        /**
         * Include last release in return object.
         */
        ReleaseDefinitionExpands[ReleaseDefinitionExpands["LastRelease"] = 64] = "LastRelease";
    })(ReleaseDefinitionExpands = exports.ReleaseDefinitionExpands || (exports.ReleaseDefinitionExpands = {}));
    var ReleaseDefinitionQueryOrder;
    (function (ReleaseDefinitionQueryOrder) {
        /**
         * Return results based on release definition Id ascending order.
         */
        ReleaseDefinitionQueryOrder[ReleaseDefinitionQueryOrder["IdAscending"] = 0] = "IdAscending";
        /**
         * Return results based on release definition Id descending order.
         */
        ReleaseDefinitionQueryOrder[ReleaseDefinitionQueryOrder["IdDescending"] = 1] = "IdDescending";
        /**
         * Return results based on release definition name ascending order.
         */
        ReleaseDefinitionQueryOrder[ReleaseDefinitionQueryOrder["NameAscending"] = 2] = "NameAscending";
        /**
         * Return results based on release definition name descending order.
         */
        ReleaseDefinitionQueryOrder[ReleaseDefinitionQueryOrder["NameDescending"] = 3] = "NameDescending";
    })(ReleaseDefinitionQueryOrder = exports.ReleaseDefinitionQueryOrder || (exports.ReleaseDefinitionQueryOrder = {}));
    var ReleaseDefinitionSource;
    (function (ReleaseDefinitionSource) {
        /**
         * Indicates ReleaseDefinition source not defined.
         */
        ReleaseDefinitionSource[ReleaseDefinitionSource["Undefined"] = 0] = "Undefined";
        /**
         * Indicates ReleaseDefinition created using REST API.
         */
        ReleaseDefinitionSource[ReleaseDefinitionSource["RestApi"] = 1] = "RestApi";
        /**
         * Indicates ReleaseDefinition created using UI.
         */
        ReleaseDefinitionSource[ReleaseDefinitionSource["UserInterface"] = 2] = "UserInterface";
        /**
         * Indicates ReleaseDefinition created from Ibiza.
         */
        ReleaseDefinitionSource[ReleaseDefinitionSource["Ibiza"] = 4] = "Ibiza";
        /**
         * Indicates ReleaseDefinition created from PortalExtension API.
         */
        ReleaseDefinitionSource[ReleaseDefinitionSource["PortalExtensionApi"] = 8] = "PortalExtensionApi";
    })(ReleaseDefinitionSource = exports.ReleaseDefinitionSource || (exports.ReleaseDefinitionSource = {}));
    var ReleaseEnvironmentExpands;
    (function (ReleaseEnvironmentExpands) {
        /**
         * Return top level properties of object.
         */
        ReleaseEnvironmentExpands[ReleaseEnvironmentExpands["None"] = 0] = "None";
        /**
         * Expand environment with tasks.
         */
        ReleaseEnvironmentExpands[ReleaseEnvironmentExpands["Tasks"] = 1] = "Tasks";
    })(ReleaseEnvironmentExpands = exports.ReleaseEnvironmentExpands || (exports.ReleaseEnvironmentExpands = {}));
    var ReleaseExpands;
    (function (ReleaseExpands) {
        ReleaseExpands[ReleaseExpands["None"] = 0] = "None";
        ReleaseExpands[ReleaseExpands["Environments"] = 2] = "Environments";
        ReleaseExpands[ReleaseExpands["Artifacts"] = 4] = "Artifacts";
        ReleaseExpands[ReleaseExpands["Approvals"] = 8] = "Approvals";
        ReleaseExpands[ReleaseExpands["ManualInterventions"] = 16] = "ManualInterventions";
        ReleaseExpands[ReleaseExpands["Variables"] = 32] = "Variables";
        ReleaseExpands[ReleaseExpands["Tags"] = 64] = "Tags";
    })(ReleaseExpands = exports.ReleaseExpands || (exports.ReleaseExpands = {}));
    var ReleaseQueryOrder;
    (function (ReleaseQueryOrder) {
        /**
         * Return results in descending order.
         */
        ReleaseQueryOrder[ReleaseQueryOrder["Descending"] = 0] = "Descending";
        /**
         * Return results in ascending order.
         */
        ReleaseQueryOrder[ReleaseQueryOrder["Ascending"] = 1] = "Ascending";
    })(ReleaseQueryOrder = exports.ReleaseQueryOrder || (exports.ReleaseQueryOrder = {}));
    var ReleaseReason;
    (function (ReleaseReason) {
        /**
         * Indicates the release triggered reason not set.
         */
        ReleaseReason[ReleaseReason["None"] = 0] = "None";
        /**
         * Indicates the release triggered manually.
         */
        ReleaseReason[ReleaseReason["Manual"] = 1] = "Manual";
        /**
         * Indicates the release triggered by continuous integration.
         */
        ReleaseReason[ReleaseReason["ContinuousIntegration"] = 2] = "ContinuousIntegration";
        /**
         * Indicates the release triggered by schedule.
         */
        ReleaseReason[ReleaseReason["Schedule"] = 3] = "Schedule";
        /**
         * Indicates the release triggered by PullRequest.
         */
        ReleaseReason[ReleaseReason["PullRequest"] = 4] = "PullRequest";
    })(ReleaseReason = exports.ReleaseReason || (exports.ReleaseReason = {}));
    var ReleaseStatus;
    (function (ReleaseStatus) {
        /**
         * Release status not set.
         */
        ReleaseStatus[ReleaseStatus["Undefined"] = 0] = "Undefined";
        /**
         * Release is in draft state.
         */
        ReleaseStatus[ReleaseStatus["Draft"] = 1] = "Draft";
        /**
         * Release status is in active.
         */
        ReleaseStatus[ReleaseStatus["Active"] = 2] = "Active";
        /**
         * Release status is in abandoned.
         */
        ReleaseStatus[ReleaseStatus["Abandoned"] = 4] = "Abandoned";
    })(ReleaseStatus = exports.ReleaseStatus || (exports.ReleaseStatus = {}));
    var ReleaseTriggerType;
    (function (ReleaseTriggerType) {
        /**
         * Release trigger type not set.
         */
        ReleaseTriggerType[ReleaseTriggerType["Undefined"] = 0] = "Undefined";
        /**
         * Artifact based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["ArtifactSource"] = 1] = "ArtifactSource";
        /**
         * Schedule based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["Schedule"] = 2] = "Schedule";
        /**
         * Source repository based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["SourceRepo"] = 3] = "SourceRepo";
        /**
         * Container image based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["ContainerImage"] = 4] = "ContainerImage";
        /**
         * Package based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["Package"] = 5] = "Package";
        /**
         * Pull request based release trigger.
         */
        ReleaseTriggerType[ReleaseTriggerType["PullRequest"] = 6] = "PullRequest";
    })(ReleaseTriggerType = exports.ReleaseTriggerType || (exports.ReleaseTriggerType = {}));
    var ScheduleDays;
    (function (ScheduleDays) {
        /**
         * Scheduled day not set.
         */
        ScheduleDays[ScheduleDays["None"] = 0] = "None";
        /**
         * Scheduled on Monday.
         */
        ScheduleDays[ScheduleDays["Monday"] = 1] = "Monday";
        /**
         * Scheduled on Tuesday.
         */
        ScheduleDays[ScheduleDays["Tuesday"] = 2] = "Tuesday";
        /**
         * Scheduled on Wednesday.
         */
        ScheduleDays[ScheduleDays["Wednesday"] = 4] = "Wednesday";
        /**
         * Scheduled on Thursday.
         */
        ScheduleDays[ScheduleDays["Thursday"] = 8] = "Thursday";
        /**
         * Scheduled on Friday.
         */
        ScheduleDays[ScheduleDays["Friday"] = 16] = "Friday";
        /**
         * Scheduled on Saturday.
         */
        ScheduleDays[ScheduleDays["Saturday"] = 32] = "Saturday";
        /**
         * Scheduled on Sunday.
         */
        ScheduleDays[ScheduleDays["Sunday"] = 64] = "Sunday";
        /**
         * Scheduled on all the days in week.
         */
        ScheduleDays[ScheduleDays["All"] = 127] = "All";
    })(ScheduleDays = exports.ScheduleDays || (exports.ScheduleDays = {}));
    var SenderType;
    (function (SenderType) {
        SenderType[SenderType["ServiceAccount"] = 1] = "ServiceAccount";
        SenderType[SenderType["RequestingUser"] = 2] = "RequestingUser";
    })(SenderType = exports.SenderType || (exports.SenderType = {}));
    var SingleReleaseExpands;
    (function (SingleReleaseExpands) {
        /**
         * Return top level properties of object.
         */
        SingleReleaseExpands[SingleReleaseExpands["None"] = 0] = "None";
        /**
         * Expand release with tasks.
         */
        SingleReleaseExpands[SingleReleaseExpands["Tasks"] = 1] = "Tasks";
    })(SingleReleaseExpands = exports.SingleReleaseExpands || (exports.SingleReleaseExpands = {}));
    var TaskStatus;
    (function (TaskStatus) {
        /**
         * The task does not have the status set.
         */
        TaskStatus[TaskStatus["Unknown"] = 0] = "Unknown";
        /**
         * The task is in pending status.
         */
        TaskStatus[TaskStatus["Pending"] = 1] = "Pending";
        /**
         * The task is currently in progress.
         */
        TaskStatus[TaskStatus["InProgress"] = 2] = "InProgress";
        /**
         * The task completed successfully.
         */
        TaskStatus[TaskStatus["Success"] = 3] = "Success";
        /**
         * The task execution failed.
         */
        TaskStatus[TaskStatus["Failure"] = 4] = "Failure";
        /**
         * The task execution canceled.
         */
        TaskStatus[TaskStatus["Canceled"] = 5] = "Canceled";
        /**
         * The task execution skipped.
         */
        TaskStatus[TaskStatus["Skipped"] = 6] = "Skipped";
        /**
         * The task completed successfully.
         */
        TaskStatus[TaskStatus["Succeeded"] = 7] = "Succeeded";
        /**
         * The task execution failed.
         */
        TaskStatus[TaskStatus["Failed"] = 8] = "Failed";
        /**
         * The task execution partially succeeded.
         */
        TaskStatus[TaskStatus["PartiallySucceeded"] = 9] = "PartiallySucceeded";
    })(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
    var VariableGroupActionFilter;
    (function (VariableGroupActionFilter) {
        VariableGroupActionFilter[VariableGroupActionFilter["None"] = 0] = "None";
        VariableGroupActionFilter[VariableGroupActionFilter["Manage"] = 2] = "Manage";
        VariableGroupActionFilter[VariableGroupActionFilter["Use"] = 16] = "Use";
    })(VariableGroupActionFilter = exports.VariableGroupActionFilter || (exports.VariableGroupActionFilter = {}));
    var YamlFileSourceTypes;
    (function (YamlFileSourceTypes) {
        YamlFileSourceTypes[YamlFileSourceTypes["None"] = 0] = "None";
        YamlFileSourceTypes[YamlFileSourceTypes["TFSGit"] = 1] = "TFSGit";
    })(YamlFileSourceTypes = exports.YamlFileSourceTypes || (exports.YamlFileSourceTypes = {}));
});
