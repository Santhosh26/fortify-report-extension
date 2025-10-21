import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
import { FortifyProviderFactory } from '../providers/fortify-provider-factory';
import { FortifyProviderType, FortifyConfig, ReportData, ValidationResult } from '../types/fortify-types';

// Legacy interfaces for backward compatibility
interface LegacyFortifyConfig {
    sscUrl?: string;
    ciToken?: string;
    appName: string;
    appVersion: string;
    timestamp: string;
    buildId?: string;
    projectId?: string;
    projectVersionId?: string;
}

// Utility function to create FortifyConfig from task inputs
function createFortifyConfigFromInputs(): FortifyConfig {
    // Get provider type (with backward compatibility)
    const providerTypeInput = tl.getInput('providerType', false) || 'ssc';
    const providerType = providerTypeInput === 'fod' ? FortifyProviderType.FoD : FortifyProviderType.SSC;
    
    const appName = tl.getInput('appName', true)!;
    const appVersion = tl.getInput('appVersion', true)!;
    
    let baseUrl: string;
    let config: FortifyConfig;
    
    if (providerType === FortifyProviderType.FoD) {
        baseUrl = tl.getInput('fodUrl', true) || 'https://api.ams.fortify.com';
        const apiKey = tl.getInput('fodApiKey', true);
        const apiSecret = tl.getInput('fodApiSecret', true);
        
        config = {
            providerType: FortifyProviderType.FoD,
            baseUrl,
            appName,
            appVersion,
            timestamp: new Date().toISOString(),
            buildId: tl.getVariable('Build.BuildId'),
            projectId: tl.getVariable('System.TeamProjectId'),
            apiKey,
            apiSecret
        };
    } else {
        // SSC or backward compatibility
        baseUrl = tl.getInput('sscUrl', false) || tl.getInput('sscUrl', true)!;
        const ciToken = tl.getInput('ciToken', false) || tl.getInput('ciToken', true)!;
        
        config = {
            providerType: FortifyProviderType.SSC,
            baseUrl,
            appName,
            appVersion,
            timestamp: new Date().toISOString(),
            buildId: tl.getVariable('Build.BuildId'),
            projectId: tl.getVariable('System.TeamProjectId'),
            ciToken
        };
    }
    
    return config;
}


async function run() {
    try {
        // Create configuration from task inputs
        const fortifyConfig = createFortifyConfigFromInputs();
        
        // Validate configuration
        const configErrors = FortifyProviderFactory.validateProviderConfig(fortifyConfig);
        if (configErrors.length > 0) {
            tl.setResult(tl.TaskResult.Failed, `Configuration validation failed: ${configErrors.join(', ')}`);
            return;
        }
        
        const maxIssuesInput = tl.getInput('maxIssues', false) || '10000';
        const maxIssues = parseInt(maxIssuesInput, 10);
        
        if (isNaN(maxIssues) || maxIssues < 1) {
            tl.setResult(tl.TaskResult.Failed, 'maxIssues must be a positive number');
            return;
        }
        
        // Validate URL format
        try {
            new URL(fortifyConfig.baseUrl);
        } catch {
            tl.setResult(tl.TaskResult.Failed, `Invalid ${fortifyConfig.providerType.toUpperCase()} URL format`);
            return;
        }
        
        const skipValidationInput = tl.getBoolInput('skipValidation', false);
        const skipValidationEnv = tl.getVariable('FORTIFY_SKIP_VALIDATION') === 'true';
        const skipValidation = skipValidationInput || skipValidationEnv;
        
        let reportData: ReportData | null = null;
        let hasValidationErrors = false;
        
        if (!skipValidation) {
            try {
                // Create provider using factory
                const provider = await FortifyProviderFactory.createProvider(fortifyConfig);
                
                const connectionResult = await provider.validateConnection();
                if (!connectionResult.success) {
                    tl.warning(`Could not connect to Fortify ${fortifyConfig.providerType.toUpperCase()}: ${connectionResult.error}`);
                    hasValidationErrors = true;
                } else {
                    const appVersionResult = await provider.validateApplicationAndVersion(fortifyConfig.appName, fortifyConfig.appVersion);
                    if (!appVersionResult.success) {
                        tl.warning(`Application/version validation failed: ${appVersionResult.error}`);
                        hasValidationErrors = true;
                    } else {
                        if (appVersionResult.versionId) {
                            fortifyConfig.projectVersionId = appVersionResult.versionId;
                            tl.setVariable('FORTIFY_PROJECT_VERSION_ID', appVersionResult.versionId);
                        } else {
                            tl.warning('Project version ID not found in validation result');
                            hasValidationErrors = true;
                        }

                        try {
                            console.log(`[Task] Fetching report data for ${fortifyConfig.appName} v${fortifyConfig.appVersion}`);
                            reportData = await provider.fetchReportData(fortifyConfig.appName, fortifyConfig.appVersion, maxIssues);

                            if (reportData && reportData.issues && reportData.issues.length > 0) {
                                console.log(`[Task] Successfully fetched ${reportData.issues.length} issues`);
                                tl.debug(`Fetched ${reportData.issues.length} security issues from ${fortifyConfig.providerType.toUpperCase()}`);
                            } else if (reportData) {
                                console.log(`[Task] Report fetched but contains no issues`);
                                tl.warning(`Report fetched for ${fortifyConfig.appName} v${fortifyConfig.appVersion} but no vulnerabilities were found`);
                            }
                        } catch (fetchError) {
                            const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
                            console.error(`[Task] Error fetching report data: ${errorMessage}`);
                            tl.error(`Failed to fetch Fortify ${fortifyConfig.providerType.toUpperCase()} data: ${errorMessage}`);

                            // Distinguish between different error types
                            if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('Authentication')) {
                                tl.warning('Authentication error - verify API credentials are correct');
                            } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
                                tl.warning('Resource not found - verify application and version names are correct');
                            } else if (errorMessage.includes('timeout') || errorMessage.includes('ECONNREFUSED')) {
                                tl.warning('Connection error - verify the Fortify server URL is accessible');
                            }

                            hasValidationErrors = true;
                        }
                    }
                }
            } catch (validationError) {
                tl.warning(`Validation threw an exception: ${validationError}`);
                hasValidationErrors = true;
            }
        }
        
        if (!fortifyConfig.projectVersionId && !skipValidation) {
            tl.warning('Unable to determine project/release ID - external links will not work');
        }
        
        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));
        
        if (reportData) {
            const reportPath = path.join(outputDir, 'fortify-report.json');
            fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
        }
        
        // Create the attachment that will trigger the tab to appear
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        tl.addAttachment(attachmentType, attachmentName, configPath);
        
        if (reportData) {
            const reportAttachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.report`;
            const reportPath = path.join(outputDir, 'fortify-report.json');
            tl.addAttachment(attachmentType, reportAttachmentName, reportPath);
        }
        
        // Determine final task result
        const providerName = fortifyConfig.providerType.toUpperCase();
        if (hasValidationErrors) {
            const warningMessage = `Fortify ${providerName} report created with validation errors for ${fortifyConfig.appName} (version: ${fortifyConfig.appVersion}). Check warnings above.`;
            tl.setResult(tl.TaskResult.SucceededWithIssues, warningMessage);
        } else {
            const successMessage = `Fortify ${providerName} report configured for ${fortifyConfig.appName} (version: ${fortifyConfig.appVersion})${reportData ? ` with ${reportData.totalCount} issues` : ''}`;
            tl.setResult(tl.TaskResult.Succeeded, successMessage);
        }
        
    } catch (error: any) {
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

process.on('unhandledRejection', (reason, promise) => {
    tl.setResult(tl.TaskResult.Failed, 'Unhandled promise rejection');
});

run();