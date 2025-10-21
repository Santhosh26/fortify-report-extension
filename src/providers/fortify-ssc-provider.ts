import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import { 
    IFortifyProvider, 
    FortifyProviderType, 
    ValidationResult, 
    ReportData, 
    SecurityIssue 
} from '../types/fortify-types';
import { SSCTokenAuthStrategy } from '../auth/authentication-strategies';

interface SSCIssue {
    id: string;
    issueInstanceId: string;
    issueName: string;
    severity?: string;
    priority?: string;
    likelihood?: string;
    confidence?: string;
    primaryLocation: string;
    lineNumber: number;
    kingdom: string;
    category: string;
    friority: number;
    folderGuid: string;
    fileName?: string;
}

// Hardcoded Security Auditor View folder mapping (standard across Fortify SSC instances)
const SECURITY_AUDITOR_FOLDERS = new Map([
    ['b968f72f-cc12-03b5-976e-ad4c13920c21', { name: 'Critical', color: 'ed1c24', id: 1 }],
    ['5b50bb77-071d-08ed-fdba-1213fa90ac5a', { name: 'High', color: 'ff7800', id: 2 }],
    ['d5f55910-5f0d-a775-e91f-191d1f5608a4', { name: 'Medium', color: 'f6aa58', id: 3 }],
    ['bb824e8d-b401-40be-13bd-5d156696a685', { name: 'Low', color: 'eec845', id: 4 }]
]);

export class FortifySSCProvider implements IFortifyProvider {
    readonly providerType = FortifyProviderType.SSC;
    private authStrategy: SSCTokenAuthStrategy;
    private baseUrl: string;

    constructor(baseUrl: string, ciToken: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.authStrategy = new SSCTokenAuthStrategy(ciToken);
    }

    async validateConnection(): Promise<ValidationResult> {
        try {
            await this.authStrategy.authenticate();
            const testUrl = `${this.baseUrl}/api/v1/projects?limit=1`;
            const response = await this.makeRequest(testUrl);
            
            if (!response) {
                return { 
                    success: false, 
                    error: 'Unable to connect to Fortify SSC - no response received',
                    provider: this.providerType
                };
            }

            return { success: true, provider: this.providerType };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            if (errorMessage.includes('401') || errorMessage.includes('Authentication failed')) {
                return { 
                    success: false, 
                    error: 'Authentication failed - please verify the CI token has proper permissions',
                    provider: this.providerType
                };
            }
            
            return { 
                success: false, 
                error: `Connection failed: ${errorMessage}`,
                provider: this.providerType
            };
        }
    }

    async validateApplicationAndVersion(appName: string, appVersion: string): Promise<ValidationResult> {
        try {
            const appUrl = `${this.baseUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
            const appResponse = await this.makeRequest(appUrl);
            
            if (!appResponse?.data || appResponse.data.length === 0) {
                return { 
                    success: false, 
                    error: `Application "${appName}" not found in Fortify SSC`,
                    provider: this.providerType
                };
            }

            const applicationId = appResponse.data[0].id;

            const versionUrl = `${this.baseUrl}/api/v1/projects/${applicationId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
            const versionResponse = await this.makeRequest(versionUrl);
            
            if (!versionResponse?.data || versionResponse.data.length === 0) {
                try {
                    const allVersionsUrl = `${this.baseUrl}/api/v1/projects/${applicationId}/versions`;
                    const allVersionsResponse = await this.makeRequest(allVersionsUrl);
                    const availableVersions = allVersionsResponse?.data?.map((v: any) => v.name).join(', ') || 'none';
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found. Available versions: ${availableVersions}`,
                        provider: this.providerType
                    };
                } catch {
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found for application "${appName}"`,
                        provider: this.providerType
                    };
                }
            }

            const versionId = versionResponse.data[0].id;

            return { 
                success: true, 
                applicationId: applicationId.toString(),
                versionId: versionId.toString(),
                provider: this.providerType
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return { 
                success: false, 
                error: `Validation failed: ${errorMessage}`,
                provider: this.providerType
            };
        }
    }

    async fetchReportData(appName: string, appVersion: string, maxIssues: number = 10000): Promise<ReportData> {
        const projectUrl = `${this.baseUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
        const projectResponse = await this.makeRequest(projectUrl);
        
        if (!projectResponse?.data || projectResponse.data.length === 0) {
            throw new Error(`Application "${appName}" not found`);
        }
        
        const projectId = projectResponse.data[0].id;

        const versionUrl = `${this.baseUrl}/api/v1/projects/${projectId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
        const versionResponse = await this.makeRequest(versionUrl);
        
        if (!versionResponse?.data || versionResponse.data.length === 0) {
            throw new Error(`Version "${appVersion}" not found`);
        }
        
        const versionId = versionResponse.data[0].id;

        const securityAuditorGuid = await this.findSecurityAuditorFilterSet(versionId);
        const allIssues = await this.fetchAllIssuesWithSecurityAuditorMapping(versionId, securityAuditorGuid, maxIssues);

        return {
            issues: allIssues,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString(),
            totalCount: allIssues.length,
            projectVersionId: versionId,
            provider: this.providerType,
            providerUrl: this.baseUrl
        };
    }

    generateProjectUrl(applicationId: string, versionId: string): string {
        return `${this.baseUrl}/html/ssc/index.jsp#!/version/${versionId}/fix`;
    }

    generateIssueUrl(applicationId: string, versionId: string, issueInstanceId: string): string {
        const encodedInstanceId = encodeURIComponent(`[instance id]:${issueInstanceId}`);
        return `${this.baseUrl}/html/ssc/version/${versionId}/audit?q=${encodedInstanceId}`;
    }

    private async findSecurityAuditorFilterSet(versionId: string): Promise<string> {
        const url = `${this.baseUrl}/api/v1/projectVersions/${versionId}/filterSets`;
        const response = await this.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error('No filter sets found for this project version');
        }
        
        const securityAuditorFilterSet = response.data.find((fs: any) => 
            fs.defaultFilterSet === true || fs.title.includes('Security Auditor')
        );
        
        if (!securityAuditorFilterSet) {
            return response.data[0].guid;
        }
        
        return securityAuditorFilterSet.guid;
    }

    private async fetchAllIssuesWithSecurityAuditorMapping(versionId: string, filterSetGuid: string, maxIssues: number): Promise<SecurityIssue[]> {
        const allIssues: SecurityIssue[] = [];
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
            
            const url = `${this.baseUrl}/api/v1/projectVersions/${versionId}/issues?${params.toString()}`;
            const response = await this.makeRequest(url);
            
            if (!response.data || response.data.length === 0) {
                break;
            }

            const batchIssues = response.data.map((issue: SSCIssue) => this.mapSSCIssueToSecurityIssue(issue));
            allIssues.push(...batchIssues);
            start += limit;
            
            if (allIssues.length >= maxIssues) {
                break;
            }
            
            if (response.data.length < limit) {
                break;
            }

            // Add a small delay to be respectful to the SSC API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return allIssues.slice(0, maxIssues);
    }

    private mapSSCIssueToSecurityIssue(issue: SSCIssue): SecurityIssue {
        // Map folderGuid to Security Auditor View folders
        const folderGuid = issue.folderGuid || '';
        const folder = SECURITY_AUDITOR_FOLDERS.get(folderGuid);
        
        const folderName = folder?.name || 'Unknown';
        const folderColor = folder?.color || '666666';
        const folderId = folder?.id || 0;
        
        return {
            id: issue.id?.toString() || '',
            instanceId: issue.issueInstanceId || '',
            name: issue.issueName || issue.category || 'Unknown Issue',
            severity: folderName, // Critical, High, Medium, Low
            priority: folderName, // Critical, High, Medium, Low
            likelihood: this.mapLikelihoodToString(issue.likelihood || '0'),
            confidence: this.mapConfidenceToString(issue.confidence || '0'),
            primaryLocation: issue.primaryLocation || issue.fileName || '',
            lineNumber: issue.lineNumber || 0,
            kingdom: issue.kingdom || '',
            category: issue.category || issue.issueName || 'Uncategorized',
            priority_score: issue.friority || 0,
            folderGuid: folderGuid,
            folderId: folderId,
            folderName: folderName,
            folderColor: folderColor,
            provider: this.providerType,
            rawData: issue
        };
    }

    private mapConfidenceToString(confidence: string | number): string {
        const conf = typeof confidence === 'string' ? parseFloat(confidence) : confidence;
        if (conf >= 4.0) return "High";
        if (conf >= 2.5) return "Medium";
        return "Low";
    }

    private mapLikelihoodToString(likelihood: string | number): string {
        const like = typeof likelihood === 'string' ? parseFloat(likelihood) : likelihood;
        if (like >= 0.7) return "Likely";
        if (like >= 0.3) return "Possible";
        return "Unlikely";
    }

    private async makeRequest(url: string): Promise<any> {
        if (!await this.authStrategy.isValid()) {
            await this.authStrategy.authenticate();
        }

        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: this.authStrategy.getAuthHeaders(),
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