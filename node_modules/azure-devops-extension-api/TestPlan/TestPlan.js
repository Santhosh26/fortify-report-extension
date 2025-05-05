/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Exclude Flags for suite test case object. Exclude Flags exclude various objects from payload depending on the value passed
     */
    var ExcludeFlags;
    (function (ExcludeFlags) {
        /**
         * To exclude nothing
         */
        ExcludeFlags[ExcludeFlags["None"] = 0] = "None";
        /**
         * To exclude point assignments, pass exclude = 1
         */
        ExcludeFlags[ExcludeFlags["PointAssignments"] = 1] = "PointAssignments";
        /**
         * To exclude extra information (links, test plan, test suite), pass exclude = 2
         */
        ExcludeFlags[ExcludeFlags["ExtraInformation"] = 2] = "ExtraInformation";
    })(ExcludeFlags = exports.ExcludeFlags || (exports.ExcludeFlags = {}));
    var FailureType;
    (function (FailureType) {
        FailureType[FailureType["None"] = 0] = "None";
        FailureType[FailureType["Regression"] = 1] = "Regression";
        FailureType[FailureType["New_Issue"] = 2] = "New_Issue";
        FailureType[FailureType["Known_Issue"] = 3] = "Known_Issue";
        FailureType[FailureType["Unknown"] = 4] = "Unknown";
        FailureType[FailureType["Null_Value"] = 5] = "Null_Value";
        FailureType[FailureType["MaxValue"] = 5] = "MaxValue";
    })(FailureType = exports.FailureType || (exports.FailureType = {}));
    var LastResolutionState;
    (function (LastResolutionState) {
        LastResolutionState[LastResolutionState["None"] = 0] = "None";
        LastResolutionState[LastResolutionState["NeedsInvestigation"] = 1] = "NeedsInvestigation";
        LastResolutionState[LastResolutionState["TestIssue"] = 2] = "TestIssue";
        LastResolutionState[LastResolutionState["ProductIssue"] = 3] = "ProductIssue";
        LastResolutionState[LastResolutionState["ConfigurationIssue"] = 4] = "ConfigurationIssue";
        LastResolutionState[LastResolutionState["NullValue"] = 5] = "NullValue";
        LastResolutionState[LastResolutionState["MaxValue"] = 5] = "MaxValue";
    })(LastResolutionState = exports.LastResolutionState || (exports.LastResolutionState = {}));
    /**
     * Enum representing the return code of data provider.
     */
    var LibraryTestCasesDataReturnCode;
    (function (LibraryTestCasesDataReturnCode) {
        LibraryTestCasesDataReturnCode[LibraryTestCasesDataReturnCode["Success"] = 0] = "Success";
        LibraryTestCasesDataReturnCode[LibraryTestCasesDataReturnCode["Error"] = 1] = "Error";
    })(LibraryTestCasesDataReturnCode = exports.LibraryTestCasesDataReturnCode || (exports.LibraryTestCasesDataReturnCode = {}));
    var Outcome;
    (function (Outcome) {
        /**
         * Only used during an update to preserve the existing value.
         */
        Outcome[Outcome["Unspecified"] = 0] = "Unspecified";
        /**
         * Test has not been completed, or the test type does not report pass/failure.
         */
        Outcome[Outcome["None"] = 1] = "None";
        /**
         * Test was executed w/o any issues.
         */
        Outcome[Outcome["Passed"] = 2] = "Passed";
        /**
         * Test was executed, but there were issues. Issues may involve exceptions or failed assertions.
         */
        Outcome[Outcome["Failed"] = 3] = "Failed";
        /**
         * Test has completed, but we can't say if it passed or failed. May be used for aborted tests...
         */
        Outcome[Outcome["Inconclusive"] = 4] = "Inconclusive";
        /**
         * The test timed out
         */
        Outcome[Outcome["Timeout"] = 5] = "Timeout";
        /**
         * Test was aborted. This was not caused by a user gesture, but rather by a framework decision.
         */
        Outcome[Outcome["Aborted"] = 6] = "Aborted";
        /**
         * Test had it chance for been executed but was not, as ITestElement.IsRunnable == false.
         */
        Outcome[Outcome["Blocked"] = 7] = "Blocked";
        /**
         * Test was not executed. This was caused by a user gesture - e.g. user hit stop button.
         */
        Outcome[Outcome["NotExecuted"] = 8] = "NotExecuted";
        /**
         * To be used by Run level results. This is not a failure.
         */
        Outcome[Outcome["Warning"] = 9] = "Warning";
        /**
         * There was a system error while we were trying to execute a test.
         */
        Outcome[Outcome["Error"] = 10] = "Error";
        /**
         * Test is Not Applicable for execution.
         */
        Outcome[Outcome["NotApplicable"] = 11] = "NotApplicable";
        /**
         * Test is paused.
         */
        Outcome[Outcome["Paused"] = 12] = "Paused";
        /**
         * Test is currently executing. Added this for TCM charts
         */
        Outcome[Outcome["InProgress"] = 13] = "InProgress";
        /**
         * Test is not impacted. Added fot TIA.
         */
        Outcome[Outcome["NotImpacted"] = 14] = "NotImpacted";
        Outcome[Outcome["MaxValue"] = 14] = "MaxValue";
    })(Outcome = exports.Outcome || (exports.Outcome = {}));
    var PointState;
    (function (PointState) {
        /**
         * Default
         */
        PointState[PointState["None"] = 0] = "None";
        /**
         * The test point needs to be executed in order for the test pass to be considered complete.  Either the test has not been run before or the previous run failed.
         */
        PointState[PointState["Ready"] = 1] = "Ready";
        /**
         * The test has passed successfully and does not need to be re-run for the test pass to be considered complete.
         */
        PointState[PointState["Completed"] = 2] = "Completed";
        /**
         * The test point needs to be executed but is not able to.
         */
        PointState[PointState["NotReady"] = 3] = "NotReady";
        /**
         * The test is being executed.
         */
        PointState[PointState["InProgress"] = 4] = "InProgress";
        PointState[PointState["MaxValue"] = 4] = "MaxValue";
    })(PointState = exports.PointState || (exports.PointState = {}));
    var ResultState;
    (function (ResultState) {
        /**
         * Only used during an update to preserve the existing value.
         */
        ResultState[ResultState["Unspecified"] = 0] = "Unspecified";
        /**
         * Test is in the execution queue, was not started yet.
         */
        ResultState[ResultState["Pending"] = 1] = "Pending";
        /**
         * Test has been queued. This is applicable when a test case is queued for execution
         */
        ResultState[ResultState["Queued"] = 2] = "Queued";
        /**
         * Test is currently executing.
         */
        ResultState[ResultState["InProgress"] = 3] = "InProgress";
        /**
         * Test has been paused. This is applicable when a test case is paused by the user (For e.g. Manual Tester can pause the execution of the manual test case)
         */
        ResultState[ResultState["Paused"] = 4] = "Paused";
        /**
         * Test has completed, but there is no quantitative measure of completeness. This may apply to load tests.
         */
        ResultState[ResultState["Completed"] = 5] = "Completed";
        ResultState[ResultState["MaxValue"] = 5] = "MaxValue";
    })(ResultState = exports.ResultState || (exports.ResultState = {}));
    var SuiteEntryTypes;
    (function (SuiteEntryTypes) {
        /**
         * Test Case
         */
        SuiteEntryTypes[SuiteEntryTypes["TestCase"] = 0] = "TestCase";
        /**
         * Child Suite
         */
        SuiteEntryTypes[SuiteEntryTypes["Suite"] = 1] = "Suite";
    })(SuiteEntryTypes = exports.SuiteEntryTypes || (exports.SuiteEntryTypes = {}));
    /**
     * Option to get details in response
     */
    var SuiteExpand;
    (function (SuiteExpand) {
        /**
         * Dont include any of the expansions in output.
         */
        SuiteExpand[SuiteExpand["None"] = 0] = "None";
        /**
         * Include children in response.
         */
        SuiteExpand[SuiteExpand["Children"] = 1] = "Children";
        /**
         * Include default testers in response.
         */
        SuiteExpand[SuiteExpand["DefaultTesters"] = 2] = "DefaultTesters";
    })(SuiteExpand = exports.SuiteExpand || (exports.SuiteExpand = {}));
    var TestEntityTypes;
    (function (TestEntityTypes) {
        TestEntityTypes[TestEntityTypes["TestCase"] = 0] = "TestCase";
        TestEntityTypes[TestEntityTypes["TestPoint"] = 1] = "TestPoint";
    })(TestEntityTypes = exports.TestEntityTypes || (exports.TestEntityTypes = {}));
    /**
     * Enum used to define the queries used in Test Plans Library.
     */
    var TestPlansLibraryQuery;
    (function (TestPlansLibraryQuery) {
        TestPlansLibraryQuery[TestPlansLibraryQuery["None"] = 0] = "None";
        TestPlansLibraryQuery[TestPlansLibraryQuery["AllTestCases"] = 1] = "AllTestCases";
        TestPlansLibraryQuery[TestPlansLibraryQuery["TestCasesWithActiveBugs"] = 2] = "TestCasesWithActiveBugs";
        TestPlansLibraryQuery[TestPlansLibraryQuery["TestCasesNotLinkedToRequirements"] = 3] = "TestCasesNotLinkedToRequirements";
        TestPlansLibraryQuery[TestPlansLibraryQuery["TestCasesLinkedToRequirements"] = 4] = "TestCasesLinkedToRequirements";
        TestPlansLibraryQuery[TestPlansLibraryQuery["AllSharedSteps"] = 11] = "AllSharedSteps";
        TestPlansLibraryQuery[TestPlansLibraryQuery["SharedStepsNotLinkedToRequirement"] = 12] = "SharedStepsNotLinkedToRequirement";
    })(TestPlansLibraryQuery = exports.TestPlansLibraryQuery || (exports.TestPlansLibraryQuery = {}));
    var TestPlansLibraryWorkItemFilterMode;
    (function (TestPlansLibraryWorkItemFilterMode) {
        /**
         * Default. Have the field values separated by an OR clause.
         */
        TestPlansLibraryWorkItemFilterMode[TestPlansLibraryWorkItemFilterMode["Or"] = 0] = "Or";
        /**
         * Have the field values separated by an AND clause.
         */
        TestPlansLibraryWorkItemFilterMode[TestPlansLibraryWorkItemFilterMode["And"] = 1] = "And";
    })(TestPlansLibraryWorkItemFilterMode = exports.TestPlansLibraryWorkItemFilterMode || (exports.TestPlansLibraryWorkItemFilterMode = {}));
    /**
     * Type of TestSuite
     */
    var TestSuiteType;
    (function (TestSuiteType) {
        /**
         * Default suite type
         */
        TestSuiteType[TestSuiteType["None"] = 0] = "None";
        /**
         * Query Based test Suite
         */
        TestSuiteType[TestSuiteType["DynamicTestSuite"] = 1] = "DynamicTestSuite";
        /**
         * Static Test Suite
         */
        TestSuiteType[TestSuiteType["StaticTestSuite"] = 2] = "StaticTestSuite";
        /**
         * Requirement based Test Suite
         */
        TestSuiteType[TestSuiteType["RequirementTestSuite"] = 3] = "RequirementTestSuite";
    })(TestSuiteType = exports.TestSuiteType || (exports.TestSuiteType = {}));
    var UserFriendlyTestOutcome;
    (function (UserFriendlyTestOutcome) {
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["InProgress"] = 0] = "InProgress";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Blocked"] = 1] = "Blocked";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Failed"] = 2] = "Failed";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Passed"] = 3] = "Passed";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Ready"] = 4] = "Ready";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["NotApplicable"] = 5] = "NotApplicable";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Paused"] = 6] = "Paused";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Timeout"] = 7] = "Timeout";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Warning"] = 8] = "Warning";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Error"] = 9] = "Error";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["NotExecuted"] = 10] = "NotExecuted";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Inconclusive"] = 11] = "Inconclusive";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Aborted"] = 12] = "Aborted";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["None"] = 13] = "None";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["NotImpacted"] = 14] = "NotImpacted";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["Unspecified"] = 15] = "Unspecified";
        UserFriendlyTestOutcome[UserFriendlyTestOutcome["MaxValue"] = 15] = "MaxValue";
    })(UserFriendlyTestOutcome = exports.UserFriendlyTestOutcome || (exports.UserFriendlyTestOutcome = {}));
});
