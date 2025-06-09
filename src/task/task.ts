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
            
            // Use the projects endpoint since we know this works with CI tokens
            const testUrl = `${this.sscUrl}/api/v1/projects?limit=1`;
            const response = await this.makeRequest(testUrl);
            
            if (!response) {
                return { success: false, error: 'Unable to connect to Fortify SSC - no response received' };
            }

            console.log('✓ Successfully connected to Fortify SSC');
            console.log(`✓ API access verified - found ${response.count || 0} projects`);
            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(`✗ Fortify SSC connection failed: ${errorMessage}`);
            
            if (errorMessage.includes('401') || errorMessage.includes('Authentication failed')) {
                console.log('💡 Tip: The CI token might have limited permissions for some endpoints');
                console.log('💡 You can set skipValidation=true in the task to bypass this check');
            }
            
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
        console.log(`🔍 Fetching Fortify data for ${appName} v${appVersion} (Security Auditor View)...`);

        // Step 1: Get project ID
        const projectUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
        const projectResponse = await this.validator.makeRequest(projectUrl);
        
        if (!projectResponse?.data || projectResponse.data.length === 0) {
            throw new Error(`Application "${appName}" not found`);
        }
        
        const projectId = projectResponse.data[0].id;
        console.log(`✓ Found project ID: ${projectId}`);

        // Step 2: Get version ID
        const versionUrl = `${this.sscUrl}/api/v1/projects/${projectId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
        const versionResponse = await this.validator.makeRequest(versionUrl);
        
        if (!versionResponse?.data || versionResponse.data.length === 0) {
            throw new Error(`Version "${appVersion}" not found`);
        }
        
        const versionId = versionResponse.data[0].id;
        console.log(`✓ Found version ID: ${versionId}`);

        // Step 3: Find Security Auditor View FilterSet
        const securityAuditorGuid = await this.findSecurityAuditorFilterSet(versionId);
        console.log(`✓ Using Security Auditor View: ${securityAuditorGuid}`);

        // Step 4: Fetch all issues with Security Auditor folder mapping
        console.log(`🔍 Fetching issues from Security Auditor View...`);
        const allIssues = await this.fetchAllIssuesWithSecurityAuditorMapping(versionId, securityAuditorGuid);
        
        console.log(`✓ Successfully fetched ${allIssues.length} issues from Fortify SSC`);
        const distribution = this.getIssueDistribution(allIssues);
        console.log(`✓ Issue distribution:`, distribution);

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
            console.warn('Security Auditor View not found, using first available filterset');
            return response.data[0].guid;
        }
        
        return securityAuditorFilterSet.guid;
    }

    private async fetchAllIssuesWithSecurityAuditorMapping(versionId: string, filterSetGuid: string): Promise<FortifyIssue[]> {
        const allIssues: FortifyIssue[] = [];
        let start = 0;
        const limit = 50;
        
        console.log(`📄 Fetching issues with Security Auditor View mapping...`);
        
        while (allIssues.length < 500) { // Max 500 issues
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
                console.log(`No more issues found at start=${start}`);
                break;
            }

            console.log(`📄 Processing ${response.data.length} issues from start=${start}`);

            const batchIssues = response.data.map((issue: any) => {
                // Map folderGuid to Security Auditor View folders
                const folderGuid = issue.folderGuid || '';
                const folder = SECURITY_AUDITOR_FOLDERS.get(folderGuid);
                
                const folderName = folder?.name || 'Unknown';
                const folderColor = folder?.color || '666666';
                const folderId = folder?.id || 0;
                
                // Log a few examples for debugging
                if (allIssues.length < 5) {
                    console.log(`🐛 Issue ${issue.id}: folderGuid="${folderGuid}" -> ${folderName} (#${folderColor})`);
                }
                
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
            
            if (response.data.length < limit) {
                console.log(`Reached end of issues (got ${response.data.length} < ${limit})`);
                break;
            }
        }
        
        console.log(`✅ Fetched total of ${allIssues.length} issues`);
        return allIssues;
    }

    private getIssueDistribution(issues: FortifyIssue[]): Record<string, number> {
        const distribution: Record<string, number> = {};
        issues.forEach(issue => {
            const folderName = issue.folderName || 'Unknown';
            distribution[folderName] = (distribution[folderName] || 0) + 1;
        });
        return distribution;
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
        console.log('🚀 Starting Fortify SSC Report task (Security Auditor View)...');
        
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

        console.log(`📋 Configuring Fortify SSC Report for: ${appName} v${appVersion}`);
        console.log(`🌐 Fortify SSC URL: ${sscUrl}`);
        console.log(`📁 Using Security Auditor View (default Fortify classification)`);

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
            console.log('🔍 Starting Fortify SSC validation...');
            const validator = new FortifySSCValidator(sscUrl, ciToken);
            
            const connectionResult = await validator.validateConnection();
            if (!connectionResult.success) {
                console.warn(`⚠️ Warning: Could not validate connection to Fortify SSC: ${connectionResult.error}`);
                console.warn('The report will still be created but may fail to load data.');
            } else {
                console.log('✅ Successfully connected to Fortify SSC');
                
                const appVersionResult = await validator.validateApplicationAndVersion(appName, appVersion);
                if (!appVersionResult.success) {
                    console.warn(`⚠️ Warning: Could not validate application/version: ${appVersionResult.error}`);
                } else {
                    console.log('✅ Application and version validation successful');
                    
                    // Fetch data from Fortify SSC (Security Auditor View only)
                    try {
                        console.log('📊 Fetching Fortify vulnerability data...');
                        const dataFetcher = new FortifySSCDataFetcher(sscUrl, ciToken);
                        reportData = await dataFetcher.fetchReportData(appName, appVersion);
                        
                        console.log(`✅ Successfully fetched Security Auditor data:`);
                        console.log(`   📄 ${reportData.totalCount} vulnerabilities`);
                        console.log(`   📁 Classified using Security Auditor View folders`);
                        
                        // Validate that issues have proper folder mapping
                        const issuesWithoutFolders = reportData.issues.filter(i => !i.folderGuid || i.folderName === 'Unknown');
                        if (issuesWithoutFolders.length > 0) {
                            console.warn(`⚠️ Warning: ${issuesWithoutFolders.length} issues missing proper folder classification`);
                        }
                        
                    } catch (fetchError) {
                        console.error(`❌ Error fetching Fortify data: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
                        console.warn('The report will show an error message but still be created.');
                    }
                }
            }
        } else {
            console.log('⏭️ Skipping Fortify SSC validation (skipValidation=true or FORTIFY_SKIP_VALIDATION=true)');
        }

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save configuration
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));
        console.log(`💾 Saved Fortify configuration to: ${configPath}`);

        // Save report data if we fetched it successfully
        if (reportData) {
            const reportPath = path.join(outputDir, 'fortify-report.json');
            fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
            console.log(`💾 Saved Fortify report data to: ${reportPath}`);
            console.log(`📊 Report data summary: ${reportData.issues.length} issues`);
            
            // Log first few issues for verification
            if (reportData.issues.length > 0) {
                console.log(`📄 Sample issue classification:`);
                reportData.issues.slice(0, 3).forEach(issue => {
                    console.log(`   - ${issue.category}: ${issue.folderName} (${issue.folderGuid})`);
                });
            }
        }

        // Create the attachment that will trigger the tab to appear
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        tl.addAttachment(attachmentType, attachmentName, configPath);
        console.log(`📎 Added build attachment: ${attachmentType}/${attachmentName}`);

        // Add report data attachment if available
        if (reportData) {
            const reportAttachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.report`;
            const reportPath = path.join(outputDir, 'fortify-report.json');
            tl.addAttachment(attachmentType, reportAttachmentName, reportPath);
            console.log(`📎 Added report data attachment: ${attachmentType}/${reportAttachmentName}`);
        }
        
        console.log(`✅ Fortify SSC Report tab will be available in the build results`);
        console.log(`📊 The report will ${reportData ? 'display live data' : 'show an error message'} from: ${sscUrl}`);
        
        const successMessage = `Fortify report configured for ${appName} v${appVersion}${reportData ? ` with ${reportData.totalCount} issues` : ''} (Security Auditor View)`;
        tl.setResult(tl.TaskResult.Succeeded, successMessage);

    } catch (error: any) {
        console.error(`❌ Fortify SSC Report Task Error: ${error.message}`);
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