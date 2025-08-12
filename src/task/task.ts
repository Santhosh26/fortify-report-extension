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
    friority: number;
    folderGuid: string;
    folderId: number;
    folderName: string;
    folderColor: string;
}

interface ReportData {
    issues: FortifyIssue[];
    appName: string;
    appVersion: string;
    scanDate: string;
    totalCount: number;
}

// Hardcoded Security Auditor View folder mapping (standard across Fortify instances)
const SECURITY_AUDITOR_FOLDERS = new Map([
    ['b968f72f-cc12-03b5-976e-ad4c13920c21', { name: 'Critical', color: 'ed1c24', id: 1 }],
    ['5b50bb77-071d-08ed-fdba-1213fa90ac5a', { name: 'High', color: 'ff7800', id: 2 }],
    ['d5f55910-5f0d-a775-e91f-191d1f5608a4', { name: 'Medium', color: 'f6aa58', id: 3 }],
    ['bb824e8d-b401-40be-13bd-5d156696a685', { name: 'Low', color: 'eec845', id: 4 }]
]);

class FortifySSCValidator {
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, '');
        this.ciToken = ciToken;
    }

    public async validateConnection(): Promise<FortifyValidationResult> {
        try {
            console.log('Validating Fortify SSC connection...');
            
            const testUrl = `${this.sscUrl}/api/v1/projects?limit=1`;
            const response = await this.makeRequest(testUrl);
            
            if (!response) {
                return { success: false, error: 'Unable to connect to Fortify SSC - no response received' };
            }

            console.log('Successfully connected to Fortify SSC');
            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            if (errorMessage.includes('401') || errorMessage.includes('Authentication failed')) {
                return { 
                    success: false, 
                    error: 'Authentication failed - please verify the CI token has proper permissions' 
                };
            }
            
            return { success: false, error: `Connection failed: ${errorMessage}` };
        }
    }

    public async validateApplicationAndVersion(appName: string, appVersion: string): Promise<FortifyValidationResult> {
        try {
            console.log(`Validating application "${appName}" and version "${appVersion}"...`);

            const appUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
            const appResponse = await this.makeRequest(appUrl);
            
            if (!appResponse?.data || appResponse.data.length === 0) {
                return { 
                    success: false, 
                    error: `Application "${appName}" not found in Fortify SSC` 
                };
            }

            const applicationId = appResponse.data[0].id;
            console.log(`Found application "${appName}"`);

            const versionUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
            const versionResponse = await this.makeRequest(versionUrl);
            
            if (!versionResponse?.data || versionResponse.data.length === 0) {
                try {
                    const allVersionsUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions`;
                    const allVersionsResponse = await this.makeRequest(allVersionsUrl);
                    const availableVersions = allVersionsResponse?.data?.map((v: any) => v.name).join(', ') || 'none';
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found. Available versions: ${availableVersions}` 
                    };
                } catch {
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found for application "${appName}"` 
                    };
                }
            }

            const versionId = versionResponse.data[0].id;
            console.log(`Found version "${appVersion}"`);

            return { 
                success: true, 
                applicationId: applicationId.toString(),
                versionId: versionId.toString()
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return { success: false, error: `Validation failed: ${errorMessage}` };
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
                    'User-Agent': 'Azure-DevOps-Fortify-Extension/10.0.0'
                },
                timeout: 30000,
                rejectUnauthorized: false
            };

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
                            reject(new Error(`Invalid JSON response from Fortify SSC`));
                        }
                    } else {
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;
                        
                        try {
                            const errorData = JSON.parse(data);
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            }
                        } catch {
                            // Keep original error message
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

class FortifySSCDataFetcher {
    private validator: FortifySSCValidator;
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, '');
        this.ciToken = ciToken;
        this.validator = new FortifySSCValidator(sscUrl, ciToken);
    }

    public async fetchReportData(appName: string, appVersion: string, maxIssues: number = 10000): Promise<ReportData> {
        console.log(`Fetching Fortify data for ${appName} v${appVersion}...`);

        // Step 1: Get project ID
        const projectUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
        const projectResponse = await this.validator.makeRequest(projectUrl);
        
        if (!projectResponse?.data || projectResponse.data.length === 0) {
            throw new Error(`Application "${appName}" not found`);
        }
        
        const projectId = projectResponse.data[0].id;

        // Step 2: Get version ID
        const versionUrl = `${this.sscUrl}/api/v1/projects/${projectId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
        const versionResponse = await this.validator.makeRequest(versionUrl);
        
        if (!versionResponse?.data || versionResponse.data.length === 0) {
            throw new Error(`Version "${appVersion}" not found`);
        }
        
        const versionId = versionResponse.data[0].id;

        // Step 3: Find Security Auditor View FilterSet
        const securityAuditorGuid = await this.findSecurityAuditorFilterSet(versionId);

        // Step 4: Fetch all issues with Security Auditor folder mapping
        console.log(`Fetching issues from Security Auditor View...`);
        const allIssues = await this.fetchAllIssuesWithSecurityAuditorMapping(versionId, securityAuditorGuid, maxIssues);
        
        console.log(`Successfully fetched ${allIssues.length} issues`);

        return {
            issues: allIssues,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString(),
            totalCount: allIssues.length
        };
    }

    private async findSecurityAuditorFilterSet(versionId: string): Promise<string> {
        const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/filterSets`;
        const response = await this.validator.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error('No filter sets found for this project version');
        }
        
        // Find Security Auditor View (should be default)
        const securityAuditorFilterSet = response.data.find((fs: any) => 
            fs.defaultFilterSet === true || fs.title.includes('Security Auditor')
        );
        
        if (!securityAuditorFilterSet) {
            // Fallback to first filterset
            return response.data[0].guid;
        }
        
        return securityAuditorFilterSet.guid;
    }

    private async fetchAllIssuesWithSecurityAuditorMapping(versionId: string, filterSetGuid: string, maxIssues: number): Promise<FortifyIssue[]> {
        const allIssues: FortifyIssue[] = [];
        let start = 0;
        const limit = 100;
        
        while (allIssues.length < maxIssues) {
            const params = new URLSearchParams({
                filterset: filterSetGuid,
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

            const batchIssues = response.data.map((issue: any) => {
                // Map folderGuid to Security Auditor View folders
                const folderGuid = issue.folderGuid || '';
                const folder = SECURITY_AUDITOR_FOLDERS.get(folderGuid);
                
                const folderName = folder?.name || 'Unknown';
                const folderColor = folder?.color || '666666';
                const folderId = folder?.id || 0;
                
                return {
                    id: issue.id?.toString() || '',
                    issueName: issue.issueName || issue.category || 'Unknown Issue',
                    severity: folderName, // Critical, High, Medium, Low
                    priority: folderName, // Critical, High, Medium, Low
                    likelihood: this.mapLikelihoodToString(issue.likelihood || 0),
                    confidence: this.mapConfidenceToString(issue.confidence || 0),
                    primaryLocation: issue.primaryLocation || issue.fileName || '',
                    lineNumber: issue.lineNumber || 0,
                    kingdom: issue.kingdom || '',
                    category: issue.category || issue.issueName || 'Uncategorized',
                    friority: issue.friority || 0,
                    folderGuid: folderGuid,
                    folderId: folderId,
                    folderName: folderName,
                    folderColor: folderColor
                };
            });

            allIssues.push(...batchIssues);
            start += limit;
            
            // Stop if we've reached our limit
            if (allIssues.length >= maxIssues) {
                break;
            }
            
            if (response.data.length < limit) {
                break;
            }

            // Add a small delay to be respectful to the Fortify API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return allIssues.slice(0, maxIssues);
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
        
        const maxIssuesInput = tl.getInput('maxIssues', false) || '10000';
        const maxIssues = parseInt(maxIssuesInput, 10);

        if (!sscUrl || !ciToken || !appName || !appVersion) {
            tl.setResult(tl.TaskResult.Failed, 'Missing required inputs');
            return;
        }

        if (isNaN(maxIssues) || maxIssues < 1) {
            tl.setResult(tl.TaskResult.Failed, 'maxIssues must be a positive number');
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
        let hasValidationErrors = false;
        
        if (!skipValidation) {
            console.log('Starting Fortify SSC validation...');
            const validator = new FortifySSCValidator(sscUrl, ciToken);
            
            // Connection validation
            const connectionResult = await validator.validateConnection();
            if (!connectionResult.success) {
                tl.warning(`Could not connect to Fortify SSC: ${connectionResult.error}`);
                hasValidationErrors = true;
            } else {
                console.log('Successfully connected to Fortify SSC');
                
                // Application and version validation
                const appVersionResult = await validator.validateApplicationAndVersion(appName, appVersion);
                if (!appVersionResult.success) {
                    tl.warning(`Application/version validation failed: ${appVersionResult.error}`);
                    hasValidationErrors = true;
                } else {
                    console.log('Application and version validation successful');
                    
                    // Fetch data from Fortify SSC
                    try {
                        console.log('Fetching Fortify vulnerability data...');
                        const dataFetcher = new FortifySSCDataFetcher(sscUrl, ciToken);
                        reportData = await dataFetcher.fetchReportData(appName, appVersion, maxIssues);
                        
                        console.log(`Successfully fetched ${reportData.totalCount} vulnerabilities`);
                        
                    } catch (fetchError) {
                        const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
                        tl.warning(`Failed to fetch Fortify data: ${errorMessage}`);
                        hasValidationErrors = true;
                    }
                }
            }
        } else {
            console.log('Skipping Fortify SSC validation');
        }

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save configuration
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));

        // Save report data if we fetched it successfully
        if (reportData) {
            const reportPath = path.join(outputDir, 'fortify-report.json');
            fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
            console.log(`Saved Fortify report data with ${reportData.issues.length} issues`);
        }

        // Create the attachment that will trigger the tab to appear
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        tl.addAttachment(attachmentType, attachmentName, configPath);

        // Add report data attachment if available
        if (reportData) {
            const reportAttachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.report`;
            const reportPath = path.join(outputDir, 'fortify-report.json');
            tl.addAttachment(attachmentType, reportAttachmentName, reportPath);
        }
        
        console.log('Fortify SSC Report tab will be available in the build results');
        
        // Determine final task result
        if (hasValidationErrors) {
            const warningMessage = `Fortify report created with validation errors for ${appName} v${appVersion}. Check warnings above.`;
            tl.setResult(tl.TaskResult.SucceededWithIssues, warningMessage);
        } else {
            const successMessage = `Fortify report configured for ${appName} v${appVersion}${reportData ? ` with ${reportData.totalCount} issues` : ''}`;
            tl.setResult(tl.TaskResult.Succeeded, successMessage);
        }

    } catch (error: any) {
        console.error(`Fortify SSC Report Task Error: ${error.message}`);
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    tl.setResult(tl.TaskResult.Failed, 'Unhandled promise rejection');
});

run();