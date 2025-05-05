import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as TfsCore from "../Core/Core";
import * as Test from "../Test/Test";
import * as WebApi from "../WebApi/WebApi";
export declare class TestRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Attach a file to test step result
     *
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iteration
     * @param iterationId - ID of the test result iteration.
     * @param actionPath - Hex value of test result action path.
     */
    createTestIterationResultAttachment(attachmentRequestModel: Test.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number, iterationId: number, actionPath?: string): Promise<Test.TestAttachmentReference>;
    /**
     * Attach a file to a test result.
     *
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result against which attachment has to be uploaded.
     */
    createTestResultAttachment(attachmentRequestModel: Test.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number): Promise<Test.TestAttachmentReference>;
    /**
     * Attach a file to a test result
     *
     * @param attachmentRequestModel - Attachment Request Model.
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param testSubResultId - ID of the test sub results against which attachment has to be uploaded.
     */
    createTestSubResultAttachment(attachmentRequestModel: Test.TestAttachmentRequestModel, project: string, runId: number, testCaseResultId: number, testSubResultId: number): Promise<Test.TestAttachmentReference>;
    /**
     * Download a test result attachment by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the testCaseResultId.
     * @param testCaseResultId - ID of the test result whose attachment has to be downloaded.
     * @param attachmentId - ID of the test result attachment to be downloaded.
     */
    getTestResultAttachmentContent(project: string, runId: number, testCaseResultId: number, attachmentId: number): Promise<ArrayBuffer>;
    /**
     * Get list of test result attachments reference.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result.
     */
    getTestResultAttachments(project: string, runId: number, testCaseResultId: number): Promise<Test.TestAttachment[]>;
    /**
     * Download a test result attachment by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the testCaseResultId.
     * @param testCaseResultId - ID of the test result whose attachment has to be downloaded.
     * @param attachmentId - ID of the test result attachment to be downloaded.
     */
    getTestResultAttachmentZip(project: string, runId: number, testCaseResultId: number, attachmentId: number): Promise<ArrayBuffer>;
    /**
     * Download a test sub result attachment
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param attachmentId - ID of the test result attachment to be downloaded
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
     */
    getTestSubResultAttachmentContent(project: string, runId: number, testCaseResultId: number, attachmentId: number, testSubResultId: number): Promise<ArrayBuffer>;
    /**
     * Get list of test sub result attachments
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
     */
    getTestSubResultAttachments(project: string, runId: number, testCaseResultId: number, testSubResultId: number): Promise<Test.TestAttachment[]>;
    /**
     * Download a test sub result attachment
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param attachmentId - ID of the test result attachment to be downloaded
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
     */
    getTestSubResultAttachmentZip(project: string, runId: number, testCaseResultId: number, attachmentId: number, testSubResultId: number): Promise<ArrayBuffer>;
    /**
     * Attach a file to a test run.
     *
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run against which attachment has to be uploaded.
     */
    createTestRunAttachment(attachmentRequestModel: Test.TestAttachmentRequestModel, project: string, runId: number): Promise<Test.TestAttachmentReference>;
    /**
     * Download a test run attachment by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run whose attachment has to be downloaded.
     * @param attachmentId - ID of the test run attachment to be downloaded.
     */
    getTestRunAttachmentContent(project: string, runId: number, attachmentId: number): Promise<ArrayBuffer>;
    /**
     * Get list of test run attachments reference.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run.
     */
    getTestRunAttachments(project: string, runId: number): Promise<Test.TestAttachment[]>;
    /**
     * Download a test run attachment by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run whose attachment has to be downloaded.
     * @param attachmentId - ID of the test run attachment to be downloaded.
     */
    getTestRunAttachmentZip(project: string, runId: number, attachmentId: number): Promise<ArrayBuffer>;
    /**
     * @param project - Project ID or project name
     * @param runId -
     * @param testCaseResultId -
     */
    getBugsLinkedToTestResult(project: string, runId: number, testCaseResultId: number): Promise<Test.WorkItemReference[]>;
    /**
     * Get code coverage data for a build.
     *
     * @param project - Project ID or project name
     * @param buildId - ID of the build for which code coverage data needs to be fetched.
     * @param flags - Value of flags determine the level of code coverage details to be fetched. Flags are additive. Expected Values are 1 for Modules, 2 for Functions, 4 for BlockData.
     */
    getBuildCodeCoverage(project: string, buildId: number, flags: number): Promise<Test.BuildCoverage[]>;
    /**
     * Get Code Coverage Summary for Build.
     *
     * @param project - Project ID or project name
     * @param buildId - ID of the build for which code coverage data needs to be fetched.
     * @param deltaBuildId - Delta Build id (optional)
     */
    getCodeCoverageSummary(project: string, buildId: number, deltaBuildId?: number): Promise<Test.CodeCoverageSummary>;
    /**
     * http://(tfsserver):8080/tfs/DefaultCollection/_apis/test/CodeCoverage?buildId=10 Request: Json of code coverage summary
     *
     * @param coverageData -
     * @param project - Project ID or project name
     * @param buildId -
     */
    updateCodeCoverageSummary(coverageData: Test.CodeCoverageData, project: string, buildId: number): Promise<void>;
    /**
     * Get code coverage data for a test run
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run for which code coverage data needs to be fetched.
     * @param flags - Value of flags determine the level of code coverage details to be fetched. Flags are additive. Expected Values are 1 for Modules, 2 for Functions, 4 for BlockData.
     */
    getTestRunCodeCoverage(project: string, runId: number, flags: number): Promise<Test.TestRunCoverage[]>;
    /**
     * @param newFields -
     * @param project - Project ID or project name
     */
    addCustomFields(newFields: Test.CustomTestFieldDefinition[], project: string): Promise<Test.CustomTestFieldDefinition[]>;
    /**
     * @param project - Project ID or project name
     * @param scopeFilter -
     */
    queryCustomFields(project: string, scopeFilter: Test.CustomTestFieldScope): Promise<Test.CustomTestFieldDefinition[]>;
    /**
     * @param filter -
     * @param project - Project ID or project name
     */
    queryTestResultHistory(filter: Test.ResultsFilter, project: string): Promise<Test.TestResultHistory>;
    /**
     * Get iteration for a result
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iterations.
     * @param iterationId - Id of the test results Iteration.
     * @param includeActionResults - Include result details for each action performed in the test iteration. ActionResults refer to outcome (pass/fail) of test steps that are executed as part of a running a manual test. Including the ActionResults flag gets the outcome of test steps in the actionResults section and test parameters in the parameters section for each test iteration.
     */
    getTestIteration(project: string, runId: number, testCaseResultId: number, iterationId: number, includeActionResults?: boolean): Promise<Test.TestIterationDetailsModel>;
    /**
     * Get iterations for a result
     *
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iterations.
     * @param includeActionResults - Include result details for each action performed in the test iteration. ActionResults refer to outcome (pass/fail) of test steps that are executed as part of a running a manual test. Including the ActionResults flag gets the outcome of test steps in the actionResults section and test parameters in the parameters section for each test iteration.
     */
    getTestIterations(project: string, runId: number, testCaseResultId: number, includeActionResults?: boolean): Promise<Test.TestIterationDetailsModel[]>;
    /**
     * @param workItemQuery -
     * @param project - Project ID or project name
     */
    getLinkedWorkItemsByQuery(workItemQuery: Test.LinkedWorkItemsQuery, project: string): Promise<Test.LinkedWorkItemsQueryResult[]>;
    /**
     * Get test run message logs
     *
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    getTestRunLogs(project: string, runId: number): Promise<Test.TestMessageLogDetails[]>;
    /**
     * Get a test point.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the point.
     * @param pointIds - ID of the test point to get.
     * @param witFields - Comma-separated list of work item field names.
     */
    getPoint(project: string, planId: number, suiteId: number, pointIds: number, witFields?: string): Promise<Test.TestPoint>;
    /**
     * Get a list of test points.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the points.
     * @param witFields - Comma-separated list of work item field names.
     * @param configurationId - Get test points for specific configuration.
     * @param testCaseId - Get test points for a specific test case, valid when configurationId is not set.
     * @param testPointIds - Get test points for comma-separated list of test point IDs, valid only when configurationId and testCaseId are not set.
     * @param includePointDetails - Include all properties for the test point.
     * @param skip - Number of test points to skip..
     * @param top - Number of test points to return.
     */
    getPoints(project: string, planId: number, suiteId: number, witFields?: string, configurationId?: string, testCaseId?: string, testPointIds?: string, includePointDetails?: boolean, skip?: number, top?: number): Promise<Test.TestPoint[]>;
    /**
     * Update test points.
     *
     * @param pointUpdateModel - Data to update.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the points.
     * @param pointIds - ID of the test point to get. Use a comma-separated list of IDs to update multiple test points.
     */
    updateTestPoints(pointUpdateModel: Test.PointUpdateModel, project: string, planId: number, suiteId: number, pointIds: string): Promise<Test.TestPoint[]>;
    /**
     * Get test points using query.
     *
     * @param query - TestPointsQuery to get test points.
     * @param project - Project ID or project name
     * @param skip - Number of test points to skip..
     * @param top - Number of test points to return.
     */
    getPointsByQuery(query: Test.TestPointsQuery, project: string, skip?: number, top?: number): Promise<Test.TestPointsQuery>;
    /**
     * @param project - Project ID or project name
     * @param buildId -
     * @param publishContext -
     * @param groupBy -
     * @param filter -
     * @param orderby -
     * @param shouldIncludeResults -
     * @param queryRunSummaryForInProgress -
     */
    getTestResultDetailsForBuild(project: string, buildId: number, publishContext?: string, groupBy?: string, filter?: string, orderby?: string, shouldIncludeResults?: boolean, queryRunSummaryForInProgress?: boolean): Promise<Test.TestResultsDetails>;
    /**
     * @param project - Project ID or project name
     * @param releaseId -
     * @param releaseEnvId -
     * @param publishContext -
     * @param groupBy -
     * @param filter -
     * @param orderby -
     * @param shouldIncludeResults -
     * @param queryRunSummaryForInProgress -
     */
    getTestResultDetailsForRelease(project: string, releaseId: number, releaseEnvId: number, publishContext?: string, groupBy?: string, filter?: string, orderby?: string, shouldIncludeResults?: boolean, queryRunSummaryForInProgress?: boolean): Promise<Test.TestResultsDetails>;
    /**
     * @param document -
     * @param project - Project ID or project name
     * @param runId -
     */
    publishTestResultDocument(document: Test.TestResultDocument, project: string, runId: number): Promise<Test.TestResultDocument>;
    /**
     * @param project - Project ID or project name
     * @param buildId -
     * @param publishContext -
     * @param fields -
     * @param continuationToken -
     */
    getResultGroupsByBuild(project: string, buildId: number, publishContext: string, fields?: string[], continuationToken?: string): Promise<WebApi.PagedList<Test.FieldDetailsForTestResults>>;
    /**
     * @param project - Project ID or project name
     * @param releaseId -
     * @param publishContext -
     * @param releaseEnvId -
     * @param fields -
     * @param continuationToken -
     */
    getResultGroupsByRelease(project: string, releaseId: number, publishContext: string, releaseEnvId?: number, fields?: string[], continuationToken?: string): Promise<WebApi.PagedList<Test.FieldDetailsForTestResults>>;
    /**
     * Get list of test Result meta data details for corresponding testcasereferenceId
     *
     * @param testReferenceIds - TestCaseReference Ids of the test Result to be queried, comma separated list of valid ids (limit no. of ids 200).
     * @param project - Project ID or project name
     */
    queryTestResultsMetaData(testReferenceIds: string[], project: string): Promise<Test.TestResultMetaData[]>;
    /**
     * Get test result retention settings
     *
     * @param project - Project ID or project name
     */
    getResultRetentionSettings(project: string): Promise<Test.ResultRetentionSettings>;
    /**
     * Update test result retention settings
     *
     * @param retentionSettings - Test result retention settings details to be updated
     * @param project - Project ID or project name
     */
    updateResultRetentionSettings(retentionSettings: Test.ResultRetentionSettings, project: string): Promise<Test.ResultRetentionSettings>;
    /**
     * Add test results to a test run.
     *
     * @param results - List of test results to add.
     * @param project - Project ID or project name
     * @param runId - Test run ID into which test results to add.
     */
    addTestResultsToTestRun(results: Test.TestCaseResult[], project: string, runId: number): Promise<Test.TestCaseResult[]>;
    /**
     * Get a test result for a test run.
     *
     * @param project - Project ID or project name
     * @param runId - Test run ID of a test result to fetch.
     * @param testCaseResultId - Test result ID.
     * @param detailsToInclude - Details to include with test results. Default is None. Other values are Iterations, WorkItems and SubResults.
     */
    getTestResultById(project: string, runId: number, testCaseResultId: number, detailsToInclude?: Test.ResultDetails): Promise<Test.TestCaseResult>;
    /**
     * Get test results for a test run.
     *
     * @param project - Project ID or project name
     * @param runId - Test run ID of test results to fetch.
     * @param detailsToInclude - Details to include with test results. Default is None. Other values are Iterations and WorkItems.
     * @param skip - Number of test results to skip from beginning.
     * @param top - Number of test results to return. Maximum is 1000 when detailsToInclude is None and 200 otherwise.
     * @param outcomes - Comma separated list of test outcomes to filter test results.
     */
    getTestResults(project: string, runId: number, detailsToInclude?: Test.ResultDetails, skip?: number, top?: number, outcomes?: Test.TestOutcome[]): Promise<Test.TestCaseResult[]>;
    /**
     * Update test results in a test run.
     *
     * @param results - List of test results to update.
     * @param project - Project ID or project name
     * @param runId - Test run ID whose test results to update.
     */
    updateTestResults(results: Test.TestCaseResult[], project: string, runId: number): Promise<Test.TestCaseResult[]>;
    /**
     * This API will return results by Ids with fields specified/trend for particular automated test method. We are still improving this API and have not finalized proper signature and contract.
     *
     * @param query -
     * @param project - Project ID or project name
     */
    getTestResultsByQuery(query: Test.TestResultsQuery, project: string): Promise<Test.TestResultsQuery>;
    /**
     * @param project - Project ID or project name
     * @param buildId -
     * @param publishContext -
     * @param outcomes -
     * @param top -
     * @param continuationToken -
     */
    getTestResultsByBuild(project: string, buildId: number, publishContext?: string, outcomes?: Test.TestOutcome[], top?: number, continuationToken?: string): Promise<WebApi.PagedList<Test.ShallowTestCaseResult>>;
    /**
     * @param project - Project ID or project name
     * @param releaseId -
     * @param releaseEnvid -
     * @param publishContext -
     * @param outcomes -
     * @param top -
     * @param continuationToken -
     */
    getTestResultsByRelease(project: string, releaseId: number, releaseEnvid?: number, publishContext?: string, outcomes?: Test.TestOutcome[], top?: number, continuationToken?: string): Promise<WebApi.PagedList<Test.ShallowTestCaseResult>>;
    /**
     * @param project - Project ID or project name
     * @param buildId -
     * @param publishContext -
     * @param includeFailureDetails -
     * @param buildToCompare -
     */
    queryTestResultsReportForBuild(project: string, buildId: number, publishContext?: string, includeFailureDetails?: boolean, buildToCompare?: Test.BuildReference): Promise<Test.TestResultSummary>;
    /**
     * @param project - Project ID or project name
     * @param releaseId -
     * @param releaseEnvId -
     * @param publishContext -
     * @param includeFailureDetails -
     * @param releaseToCompare -
     */
    queryTestResultsReportForRelease(project: string, releaseId: number, releaseEnvId: number, publishContext?: string, includeFailureDetails?: boolean, releaseToCompare?: Test.ReleaseReference): Promise<Test.TestResultSummary>;
    /**
     * @param releases -
     * @param project - Project ID or project name
     */
    queryTestResultsSummaryForReleases(releases: Test.ReleaseReference[], project: string): Promise<Test.TestResultSummary[]>;
    /**
     * @param resultsContext -
     * @param project - Project ID or project name
     * @param workItemIds -
     */
    queryTestSummaryByRequirement(resultsContext: Test.TestResultsContext, project: string, workItemIds?: number[]): Promise<Test.TestSummaryForWorkItem[]>;
    /**
     * @param filter -
     * @param project - Project ID or project name
     */
    queryResultTrendForBuild(filter: Test.TestResultTrendFilter, project: string): Promise<Test.AggregatedDataForResultTrend[]>;
    /**
     * @param filter -
     * @param project - Project ID or project name
     */
    queryResultTrendForRelease(filter: Test.TestResultTrendFilter, project: string): Promise<Test.AggregatedDataForResultTrend[]>;
    /**
     * Get test run statistics , used when we want to get summary of a run by outcome.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    getTestRunStatistics(project: string, runId: number): Promise<Test.TestRunStatistic>;
    /**
     * Create new test run.
     *
     * @param testRun - Run details RunCreateModel
     * @param project - Project ID or project name
     */
    createTestRun(testRun: Test.RunCreateModel, project: string): Promise<Test.TestRun>;
    /**
     * Delete a test run by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the run to delete.
     */
    deleteTestRun(project: string, runId: number): Promise<void>;
    /**
     * Get a test run by its ID.
     *
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     * @param includeDetails - Default value is true. It includes details like run statistics, release, build, test environment, post process state, and more.
     */
    getTestRunById(project: string, runId: number, includeDetails?: boolean): Promise<Test.TestRun>;
    /**
     * Get a list of test runs.
     *
     * @param project - Project ID or project name
     * @param buildUri - URI of the build that the runs used.
     * @param owner - Team foundation ID of the owner of the runs.
     * @param tmiRunId -
     * @param planId - ID of the test plan that the runs are a part of.
     * @param includeRunDetails - If true, include all the properties of the runs.
     * @param automated - If true, only returns automated runs.
     * @param skip - Number of test runs to skip.
     * @param top - Number of test runs to return.
     */
    getTestRuns(project: string, buildUri?: string, owner?: string, tmiRunId?: string, planId?: number, includeRunDetails?: boolean, automated?: boolean, skip?: number, top?: number): Promise<Test.TestRun[]>;
    /**
     * Query Test Runs based on filters. Mandatory fields are minLastUpdatedDate and maxLastUpdatedDate.
     *
     * @param project - Project ID or project name
     * @param minLastUpdatedDate - Minimum Last Modified Date of run to be queried (Mandatory).
     * @param maxLastUpdatedDate - Maximum Last Modified Date of run to be queried (Mandatory, difference between min and max date can be atmost 7 days).
     * @param state - Current state of the Runs to be queried.
     * @param planIds - Plan Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param isAutomated - Automation type of the Runs to be queried.
     * @param publishContext - PublishContext of the Runs to be queried.
     * @param buildIds - Build Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param buildDefIds - Build Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param branchName - Source Branch name of the Runs to be queried.
     * @param releaseIds - Release Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseDefIds - Release Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseEnvIds - Release Environment Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseEnvDefIds - Release Environment Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param runTitle - Run Title of the Runs to be queried.
     * @param top - Number of runs to be queried. Limit is 100
     * @param continuationToken - continuationToken received from previous batch or null for first batch. It is not supposed to be created (or altered, if received from last batch) by user.
     */
    queryTestRuns(project: string, minLastUpdatedDate: Date, maxLastUpdatedDate: Date, state?: Test.TestRunState, planIds?: number[], isAutomated?: boolean, publishContext?: Test.TestRunPublishContext, buildIds?: number[], buildDefIds?: number[], branchName?: string, releaseIds?: number[], releaseDefIds?: number[], releaseEnvIds?: number[], releaseEnvDefIds?: number[], runTitle?: string, top?: number, continuationToken?: string): Promise<WebApi.PagedList<Test.TestRun>>;
    /**
     * Update test run by its ID.
     *
     * @param runUpdateModel - Run details RunUpdateModel
     * @param project - Project ID or project name
     * @param runId - ID of the run to update.
     */
    updateTestRun(runUpdateModel: Test.RunUpdateModel, project: string, runId: number): Promise<Test.TestRun>;
    /**
     * Create a test session
     *
     * @param testSession - Test session details for creation
     * @param teamContext - The team context for the operation
     */
    createTestSession(testSession: Test.TestSession, teamContext: TfsCore.TeamContext): Promise<Test.TestSession>;
    /**
     * Get a list of test sessions
     *
     * @param teamContext - The team context for the operation
     * @param period - Period in days from now, for which test sessions are fetched.
     * @param allSessions - If false, returns test sessions for current user. Otherwise, it returns test sessions for all users
     * @param includeAllProperties - If true, it returns all properties of the test sessions. Otherwise, it returns the skinny version.
     * @param source - Source of the test session.
     * @param includeOnlyCompletedSessions - If true, it returns test sessions in completed state. Otherwise, it returns test sessions for all states
     */
    getTestSessions(teamContext: TfsCore.TeamContext, period?: number, allSessions?: boolean, includeAllProperties?: boolean, source?: Test.TestSessionSource, includeOnlyCompletedSessions?: boolean): Promise<Test.TestSession[]>;
    /**
     * Update a test session
     *
     * @param testSession - Test session details for update
     * @param teamContext - The team context for the operation
     */
    updateTestSession(testSession: Test.TestSession, teamContext: TfsCore.TeamContext): Promise<Test.TestSession>;
    /**
     * @param project - Project ID or project name
     * @param sharedParameterId -
     */
    deleteSharedParameter(project: string, sharedParameterId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param sharedStepId -
     */
    deleteSharedStep(project: string, sharedStepId: number): Promise<void>;
    /**
     * Add test cases to suite.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the test suite to which the test cases must be added.
     * @param testCaseIds - IDs of the test cases to add to the suite. Ids are specified in comma separated format.
     */
    addTestCasesToSuite(project: string, planId: number, suiteId: number, testCaseIds: string): Promise<Test.SuiteTestCase[]>;
    /**
     * Get a specific test case in a test suite with test case id.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the suite that contains the test case.
     * @param testCaseIds - ID of the test case to get.
     */
    getTestCaseById(project: string, planId: number, suiteId: number, testCaseIds: number): Promise<Test.SuiteTestCase>;
    /**
     * Get all test cases in a suite.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the suite to get.
     */
    getTestCases(project: string, planId: number, suiteId: number): Promise<Test.SuiteTestCase[]>;
    /**
     * The test points associated with the test cases are removed from the test suite. The test case work item is not deleted from the system. See test cases resource to delete a test case permanently.
     *
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the suite to get.
     * @param testCaseIds - IDs of the test cases to remove from the suite.
     */
    removeTestCasesFromSuiteUrl(project: string, planId: number, suiteId: number, testCaseIds: string): Promise<void>;
    /**
     * Updates the properties of the test case association in a suite.
     *
     * @param suiteTestCaseUpdateModel - Model for updation of the properties of test case suite association.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the test suite to which the test cases must be added.
     * @param testCaseIds - IDs of the test cases to add to the suite. Ids are specified in comma separated format.
     */
    updateSuiteTestCases(suiteTestCaseUpdateModel: Test.SuiteTestCaseUpdateModel, project: string, planId: number, suiteId: number, testCaseIds: string): Promise<Test.SuiteTestCase[]>;
    /**
     * Delete a test case.
     *
     * @param project - Project ID or project name
     * @param testCaseId - Id of test case to delete.
     */
    deleteTestCase(project: string, testCaseId: number): Promise<void>;
    /**
     * Get history of a test method using TestHistoryQuery
     *
     * @param filter - TestHistoryQuery to get history
     * @param project - Project ID or project name
     */
    queryTestHistory(filter: Test.TestHistoryQuery, project: string): Promise<Test.TestHistoryQuery>;
    /**
     * @param testSettings -
     * @param project - Project ID or project name
     */
    createTestSettings(testSettings: Test.TestSettings, project: string): Promise<number>;
    /**
     * @param project - Project ID or project name
     * @param testSettingsId -
     */
    deleteTestSettings(project: string, testSettingsId: number): Promise<void>;
    /**
     * @param project - Project ID or project name
     * @param testSettingsId -
     */
    getTestSettingsById(project: string, testSettingsId: number): Promise<Test.TestSettings>;
    /**
     * @param workItemToTestLinks -
     * @param project - Project ID or project name
     */
    addWorkItemToTestLinks(workItemToTestLinks: Test.WorkItemToTestLinks, project: string): Promise<Test.WorkItemToTestLinks>;
    /**
     * @param project - Project ID or project name
     * @param testName -
     * @param workItemId -
     */
    deleteTestMethodToWorkItemLink(project: string, testName: string, workItemId: number): Promise<boolean>;
    /**
     * @param project - Project ID or project name
     * @param testName -
     */
    queryTestMethodLinkedWorkItems(project: string, testName: string): Promise<Test.TestToWorkItemLinks>;
    /**
     * @param project - Project ID or project name
     * @param workItemCategory -
     * @param automatedTestName -
     * @param testCaseId -
     * @param maxCompleteDate -
     * @param days -
     * @param workItemCount -
     */
    queryTestResultWorkItems(project: string, workItemCategory: string, automatedTestName?: string, testCaseId?: number, maxCompleteDate?: Date, days?: number, workItemCount?: number): Promise<Test.WorkItemReference[]>;
}
