import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as ProjectAnalysis from "../ProjectAnalysis/ProjectAnalysis";
export declare class ProjectAnalysisRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param project - Project ID or project name
     */
    getProjectLanguageAnalytics(project: string): Promise<ProjectAnalysis.ProjectLanguageAnalytics>;
    /**
     * @param project - Project ID or project name
     * @param fromDate -
     * @param aggregationType -
     */
    getProjectActivityMetrics(project: string, fromDate: Date, aggregationType: ProjectAnalysis.AggregationType): Promise<ProjectAnalysis.ProjectActivityMetrics>;
    /**
     * Retrieves git activity metrics for repositories matching a specified criteria.
     *
     * @param project - Project ID or project name
     * @param fromDate - Date from which, the trends are to be fetched.
     * @param aggregationType - Bucket size on which, trends are to be aggregated.
     * @param skip - The number of repositories to ignore.
     * @param top - The number of repositories for which activity metrics are to be retrieved.
     */
    getGitRepositoriesActivityMetrics(project: string, fromDate: Date, aggregationType: ProjectAnalysis.AggregationType, skip: number, top: number): Promise<ProjectAnalysis.RepositoryActivityMetrics[]>;
    /**
     * @param project - Project ID or project name
     * @param repositoryId -
     * @param fromDate -
     * @param aggregationType -
     */
    getRepositoryActivityMetrics(project: string, repositoryId: string, fromDate: Date, aggregationType: ProjectAnalysis.AggregationType): Promise<ProjectAnalysis.RepositoryActivityMetrics>;
}
