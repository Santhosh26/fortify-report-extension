import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

interface FortifyConfig {
    sscUrl: string;
    ciToken: string;
    appName: string;
    appVersion: string;
    timestamp: string;
    buildId?: string;
    projectId?: string;
}

interface FortifyValidationResult {
    success: boolean;
    applicationId?: string;
    versionId?: string;
    error?: string;
}

interface FortifyIssue {
    id: string;
    issueName: string;
    severity: string;
    priority: string;
    likelihood: string;
    confidence: string;
    primaryLocation: string;
    lineNumber: number;
    kingdom: string;
    category: string;
}

interface ReportData {
    issues: FortifyIssue[];
    appName: string;
    appVersion: string;
    scanDate: string;
    totalCount: number;
}

class FortifySSCValidator {
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, ''); // Remove trailing slash
        this.ciToken = ciToken;
    }

    public async validateConnection(): Promise<FortifyValidationResult> {
        try {
            console.log('Validating Fortify SSC connection...');
            
            const testUrl = `${this.sscUrl}/api/v1/applicationState`;
            const response = await this.makeRequest(testUrl);
            
            if (!response || !response.data) {
                return { success: false, error: 'Unable to connect to Fortify SSC - no response received' };
            }

            console.log('✓ Successfully connected to Fortify SSC');
            console.log(`✓ SSC Status: Maintenance Mode: ${response.data.maintenanceMode}, Config Required: ${response.data.configVisitRequired}`);
            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(`✗ Fortify SSC connection failed: ${errorMessage}`);
            return { success: false, error: errorMessage };
        }
    }

    public async validateApplicationAndVersion(appName: string, appVersion: string): Promise<FortifyValidationResult> {
        try {
            console.log(`Validating application "${appName}" and version "${appVersion}"...`);

            const appUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
            console.log(`Project search URL: ${appUrl}`);
            
            const appResponse = await this.makeRequest(appUrl);
            
            if (!appResponse?.data || appResponse.data.length === 0) {
                return { 
                    success: false, 
                    error: `Application "${appName}" not found in Fortify SSC. Please check the application name.` 
                };
            }

            const applicationId = appResponse.data[0].id;
            console.log(`✓ Found application "${appName}" with ID: ${applicationId}`);

            const versionUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
            console.log(`Version search URL: ${versionUrl}`);
            
            const versionResponse = await this.makeRequest(versionUrl);
            
            if (!versionResponse?.data || versionResponse.data.length === 0) {
                const allVersionsUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions`;
                console.log(`Getting all versions: ${allVersionsUrl}`);
                
                try {
                    const allVersionsResponse = await this.makeRequest(allVersionsUrl);
                    const availableVersions = allVersionsResponse?.data?.map((v: any) => v.name).join(', ') || 'none';
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found for application "${appName}". Available versions: ${availableVersions}` 
                    };
                } catch {
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found for application "${appName}".` 
                    };
                }
            }

            const versionId = versionResponse.data[0].id;
            console.log(`✓ Found version "${appVersion}" with ID: ${versionId}`);

            return { 
                success: true, 
                applicationId: applicationId.toString(),
                versionId: versionId.toString()
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(`✗ Application/version validation failed: ${errorMessage}`);
            return { success: false, error: errorMessage };
        }
    }

    public async makeRequest(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: {
                    'Authorization': `FortifyToken ${this.ciToken}`,
                    'Accept': 'application/json',
                    'User-Agent': 'Azure-DevOps-Fortify-Extension/9.0.0'
                },
                timeout: 30000,
                rejectUnauthorized: false
            };

            console.log(`Making request to: ${url}`);

            const client = parsedUrl.protocol === 'https:' ? https : http;
            
            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const jsonData = JSON.parse(data);
                            resolve(jsonData);
                        } catch (parseError) {
                            reject(new Error(`Invalid JSON response: ${data.substring(0, 200)}`));
                        }
                    } else {
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;
                        
                        try {
                            const errorData = JSON.parse(data);
                            errorMessage += ` - ${JSON.stringify(errorData)}`;
                        } catch {
                            errorMessage += ` - ${data.substring(0, 200)}`;
                        }
                        
                        reject(new Error(errorMessage));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout - Fortify SSC did not respond within 30 seconds'));
            });

            req.on('error', (error) => {
                reject(new Error(`Network error: ${error.message}`));
            });

            req.end();
        });
    }
}

// Enhanced Fortify SSC Client for server-side data fetching
class FortifySSCDataFetcher {
    private validator: FortifySSCValidator;
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, '');
        this.ciToken = ciToken;
        this.validator = new FortifySSCValidator(sscUrl, ciToken);
    }

    public async fetchReportData(appName: string, appVersion: string): Promise<ReportData> {
        console.log(`Fetching Fortify data for ${appName} v${appVersion}...`);

        // Get project ID
        const projectUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
        const projectResponse = await this.validator.makeRequest(projectUrl);
        
        if (!projectResponse?.data || projectResponse.data.length === 0) {
            throw new Error(`Application "${appName}" not found`);
        }
        
        const projectId = projectResponse.data[0].id;
        console.log(`✓ Found project ID: ${projectId}`);

        // Get version ID
        const versionUrl = `${this.sscUrl}/api/v1/projects/${projectId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
        const versionResponse = await this.validator.makeRequest(versionUrl);
        
        if (!versionResponse?.data || versionResponse.data.length === 0) {
            throw new Error(`Version "${appVersion}" not found`);
        }
        
        const versionId = versionResponse.data[0].id;
        console.log(`✓ Found version ID: ${versionId}`);

        // Get filterset ID
        const filterSetId = await this.getSecurityAuditorFilterSetId(versionId);
        console.log(`✓ Using filterset ID: ${filterSetId}`);

        // Fetch all issues with pagination
        const allIssues = await this.getAllIssues(versionId, filterSetId);
        
        console.log(`✓ Successfully fetched ${allIssues.length} issues from Fortify SSC`);

        return {
            issues: allIssues,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString(),
            totalCount: allIssues.length
        };
    }

    private async getSecurityAuditorFilterSetId(versionId: string): Promise<string> {
        const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/filterSets`;
        const response = await this.validator.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error('No filter sets found for this project version');
        }
        
        const securityAuditorFilter = response.data.find((filterSet: any) => 
            filterSet.title === 'Security Auditor View' || 
            filterSet.title.toLowerCase().includes('security auditor')
        );
        
        if (securityAuditorFilter) {
            return securityAuditorFilter.guid;
        }
        
        // Fallback to default filterset
        const defaultFilter = response.data.find((filterSet: any) => filterSet.defaultFilterSet === true);
        if (defaultFilter) {
            console.log(`Using default filterset: ${defaultFilter.title}`);
            return defaultFilter.guid;
        }
        
        return response.data[0].guid;
    }

    private async getAllIssues(versionId: string, filterSetId: string): Promise<FortifyIssue[]> {
        const allIssues: FortifyIssue[] = [];
        let start = 0;
        const limit = 50;
        
        while (allIssues.length < 500) { // Max 500 issues
            const params = new URLSearchParams({
                filterset: filterSetId,
                start: start.toString(),
                limit: limit.toString(),
                orderby: 'friority',
                showhidden: 'false',
                showremoved: 'false',
                showsuppressed: 'false'
            });
            
            const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/issues?${params.toString()}`;
            const response = await this.validator.makeRequest(url);
            
            if (!response.data || response.data.length === 0) {
                break;
            }

            const issues = response.data.map((issue: any) => ({
                id: issue.id?.toString() || '',
                issueName: issue.issueName || issue.category || 'Unknown Issue',
                severity: this.mapSeverityToString(issue.severity || 0),
                priority: this.mapPriorityToString(issue.friority || issue.severity || 0),
                likelihood: this.mapLikelihoodToString(issue.likelihood || 0),
                confidence: this.mapConfidenceToString(issue.confidence || 0),
                primaryLocation: issue.primaryLocation || issue.fileName || '',
                lineNumber: issue.lineNumber || 0,
                kingdom: issue.kingdom || '',
                category: issue.category || issue.issueName || 'Uncategorized'
            }));

            allIssues.push(...issues);
            start += limit;
            
            if (issues.length < limit) {
                break;
            }
        }
        
        return allIssues;
    }

    private mapSeverityToString(severity: number): string {
        if (severity >= 4.0) return "Critical";
        if (severity >= 3.0) return "High";
        if (severity >= 2.0) return "Medium";
        return "Low";
    }

    private mapPriorityToString(priority: number): string {
        if (priority >= 4.0) return "Critical";
        if (priority >= 3.0) return "High"; 
        if (priority >= 2.0) return "Medium";
        return "Low";
    }

    private mapConfidenceToString(confidence: number): string {
        if (confidence >= 4.0) return "High";
        if (confidence >= 2.5) return "Medium";
        return "Low";
    }

    private mapLikelihoodToString(likelihood: number): string {
        if (likelihood >= 0.7) return "Likely";
        if (likelihood >= 0.3) return "Possible";
        return "Unlikely";
    }
}

async function run() {
    try {
        console.log('Starting Fortify SSC Report task...');
        
        const sscUrl = tl.getInput('sscUrl', true);
        const ciToken = tl.getInput('ciToken', true);
        const appName = tl.getInput('appName', true);
        const appVersion = tl.getInput('appVersion', true);

        if (!sscUrl || !ciToken || !appName || !appVersion) {
            tl.setResult(tl.TaskResult.Failed, 'Missing required inputs');
            return;
        }

        try {
            new URL(sscUrl);
        } catch {
            tl.setResult(tl.TaskResult.Failed, 'Invalid Fortify SSC URL format');
            return;
        }

        console.log(`Configuring Fortify SSC Report for: ${appName} v${appVersion}`);
        console.log(`Fortify SSC URL: ${sscUrl}`);

        const fortifyConfig: FortifyConfig = {
            sscUrl: sscUrl,
            ciToken: ciToken,
            appName: appName,
            appVersion: appVersion,
            timestamp: new Date().toISOString(),
            buildId: tl.getVariable('Build.BuildId'),
            projectId: tl.getVariable('System.TeamProjectId')
        };

        const skipValidation = tl.getBoolInput('skipValidation', false) || 
                              tl.getVariable('FORTIFY_SKIP_VALIDATION') === 'true';
        
        let reportData: ReportData | null = null;
        
        if (!skipValidation) {
            console.log('Validating Fortify SSC connection...');
            const validator = new FortifySSCValidator(sscUrl, ciToken);
            
            const connectionResult = await validator.validateConnection();
            if (!connectionResult.success) {
                console.warn(`Warning: Could not validate connection to Fortify SSC: ${connectionResult.error}`);
                console.warn('The report will still be created but may fail to load data.');
            } else {
                console.log('✓ Successfully connected to Fortify SSC');
                
                const appVersionResult = await validator.validateApplicationAndVersion(appName, appVersion);
                if (!appVersionResult.success) {
                    console.warn(`Warning: Could not validate application/version: ${appVersionResult.error}`);
                } else {
                    console.log('✓ Application and version validation successful');
                    
                    // Fetch real data from Fortify SSC
                    try {
                        console.log('Fetching Fortify vulnerability data...');
                        const dataFetcher = new FortifySSCDataFetcher(sscUrl, ciToken);
                        reportData = await dataFetcher.fetchReportData(appName, appVersion);
                        console.log(`✓ Successfully fetched ${reportData.totalCount} vulnerabilities`);
                    } catch (fetchError) {
                        console.warn(`Warning: Could not fetch Fortify data: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
                        console.warn('The report will show an error message but still be created.');
                    }
                }
            }
        } else {
            console.log('Skipping Fortify SSC validation (skipValidation=true or FORTIFY_SKIP_VALIDATION=true)');
        }

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save configuration
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));
        console.log(`✓ Saved Fortify configuration to: ${configPath}`);

        // Save report data if we fetched it successfully
        if (reportData) {
            const reportPath = path.join(outputDir, 'fortify-report.json');
            fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
            console.log(`✓ Saved Fortify report data to: ${reportPath}`);
        }

        // Create the attachment that will trigger the tab to appear
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        tl.addAttachment(attachmentType, attachmentName, configPath);
        console.log(`✓ Added build attachment: ${attachmentType}/${attachmentName}`);

        // Add report data attachment if available
        if (reportData) {
            const reportAttachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.report`;
            const reportPath = path.join(outputDir, 'fortify-report.json');
            tl.addAttachment(attachmentType, reportAttachmentName, reportPath);
            console.log(`✓ Added report data attachment: ${attachmentType}/${reportAttachmentName}`);
        }
        
        console.log(`✓ Fortify SSC Report tab will be available in the build results`);
        console.log(`✓ The report will ${reportData ? 'display live data' : 'show an error message'} from: ${sscUrl}`);
        
        tl.setResult(tl.TaskResult.Succeeded, `Fortify report configured for ${appName} v${appVersion}${reportData ? ` with ${reportData.totalCount} issues` : ''}`);

    } catch (error: any) {
        console.error(`Fortify SSC Report Task Error: ${error.message}`);
        if (error.stack) {
            console.error(`Stack trace: ${error.stack}`);
        }
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    tl.setResult(tl.TaskResult.Failed, 'Unhandled promise rejection');
});

run();