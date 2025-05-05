import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Pipelines from "../Pipelines/Pipelines";
export declare class PipelinesRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Get a specific artifact from a pipeline run
     *
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param artifactName - Name of the artifact.
     * @param expand - Expand options. Default is None.
     */
    getArtifact(project: string, pipelineId: number, runId: number, artifactName: string, expand?: Pipelines.GetArtifactExpandOptions): Promise<Pipelines.Artifact>;
    /**
     * Get a specific log from a pipeline run
     *
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param logId - ID of the log.
     * @param expand - Expand options. Default is None.
     */
    getLog(project: string, pipelineId: number, runId: number, logId: number, expand?: Pipelines.GetLogExpandOptions): Promise<Pipelines.Log>;
    /**
     * Get a list of logs from a pipeline run.
     *
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param expand - Expand options. Default is None.
     */
    listLogs(project: string, pipelineId: number, runId: number, expand?: Pipelines.GetLogExpandOptions): Promise<Pipelines.LogCollection>;
    /**
     * Create a pipeline.
     *
     * @param inputParameters - Input parameters.
     * @param project - Project ID or project name
     */
    createPipeline(inputParameters: Pipelines.CreatePipelineParameters, project: string): Promise<Pipelines.Pipeline>;
    /**
     * Gets a pipeline, optionally at the specified version
     *
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID
     * @param pipelineVersion - The pipeline version
     */
    getPipeline(project: string, pipelineId: number, pipelineVersion?: number): Promise<Pipelines.Pipeline>;
    /**
     * Get a list of pipelines.
     *
     * @param project - Project ID or project name
     * @param orderBy - A sort expression. Defaults to "name asc"
     * @param top - The maximum number of pipelines to return
     * @param continuationToken - A continuation token from a previous request, to retrieve the next page of results
     */
    listPipelines(project: string, orderBy?: string, top?: number, continuationToken?: string): Promise<Pipelines.Pipeline[]>;
    /**
     * Queues a dry run of the pipeline and returns an object containing the final yaml.
     *
     * @param runParameters - Optional additional parameters for this run.
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID.
     * @param pipelineVersion - The pipeline version.
     */
    preview(runParameters: Pipelines.RunPipelineParameters, project: string, pipelineId: number, pipelineVersion?: number): Promise<Pipelines.PreviewRun>;
    /**
     * Gets a run for a particular pipeline.
     *
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline id
     * @param runId - The run id
     */
    getRun(project: string, pipelineId: number, runId: number): Promise<Pipelines.Run>;
    /**
     * Gets top 10000 runs for a particular pipeline.
     *
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline id
     */
    listRuns(project: string, pipelineId: number): Promise<Pipelines.Run[]>;
    /**
     * Runs a pipeline.
     *
     * @param runParameters - Optional additional parameters for this run.
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID.
     * @param pipelineVersion - The pipeline version.
     */
    runPipeline(runParameters: Pipelines.RunPipelineParameters, project: string, pipelineId: number, pipelineVersion?: number): Promise<Pipelines.Run>;
}
