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
import { FoDApiKeyAuthStrategy } from '../auth/authentication-strategies';

interface FoDApplication {
    applicationId: number;
    applicationName: string;
    applicationDescription?: string;
    businessCriticalityType: string;
    emailList: string;
    releasesUri: string;
    applicationTypeId: number;
}

interface FoDRelease {
    releaseId: number;
    releaseName: string;
    releaseDescription?: string;
    copyState: string;
    copyStateDescription: string;
    currentAnalysisStatusId: number;
    currentAnalysisStatusTypeId: number;
    rating: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    ratingDescription: string;
    passFailReasonTypeId?: number;
    passFailReasonType?: string;
    issuesUri: string;
}

interface FoDVulnerability {
    id: number; // Numeric ID used for URLs (e.g., 31318521)
    vulnId: string; // UUID identifier (e.g., abb6c1ff-7b24-4b6d-a469-c3d6d7bea656)
    vulnInstanceId?: string; // Instance ID when available
    releaseId: number; // Release/version ID
    kingdom: string;
    category: string;
    subCategory: string;
    fileName: string;
    primaryLocationFull: string;
    vulnerabilityAbstract: string;
    lineNumber: number;
    confidence: number;
    impact: number;
    likelihood: number;
    accuracy: number;
    rtaCovered: boolean;
    probability: number;
    severityString: string;
    priorityOrder: number;
    hasComments: boolean;
    assignedUser?: string;
    developerStatus: string;
    auditorStatus: string;
    summary: string;
    checkId: string;
    issueStatus: string;
    scantype: string;
    engineType: string;
    deepLink: string;
    summaryDetails: string;
    details: string;
    request: string;
    headers: string;
    parameters: string;
    attackPayload: string;
    attackType: string;
    response: string;
    traces: any[];
    requestIdentifier: string;
    vulnerabilityReferences: any[];
    reproductionSteps: string;
    keywordSearch: string;
    primaryTag: string;
    tags: string;
    vulnHash: string;
    bugTrackerIds: any[];
    externalBugId?: string;
    shortFileName: string;
    sink: string;
    source: string;
    originalIssueState: string;
    lastScanDate: string;
    foundDate: string;
    removedDate?: string;
    auditorComment: string;
    submissionCount: number;
    requestResponsePairs: any[];
    requestHeaders: any[];
    responseHeaders: any[];
    requestCookies: any[];
    responseCookies: any[];
    requestParameters: any[];
    customStatus?: string;
}

interface FoDFilter {
    filterId: number;
    filterName: string;
    filterType: string;
    availableValues: string[];
}

export class FortifyFoDProvider implements IFortifyProvider {
    readonly providerType = FortifyProviderType.FoD;
    private authStrategy: FoDApiKeyAuthStrategy;
    private baseUrl: string;

    constructor(baseUrl: string, apiKey: string, apiSecret: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.authStrategy = new FoDApiKeyAuthStrategy(apiKey, apiSecret, baseUrl);
    }

    async validateConnection(): Promise<ValidationResult> {
        console.log(`[FoD] Validating connection to: ${this.baseUrl}`);

        try {
            await this.authStrategy.authenticate();
            const testUrl = `${this.baseUrl}/api/v3/applications?limit=1`;
            console.log(`[FoD] Making test request to list applications`);
            const response = await this.makeRequest(testUrl);

            if (!response) {
                console.warn(`[FoD] Connection validation failed: empty response`);
                return {
                    success: false,
                    error: 'Unable to connect to Fortify on Demand - no response received',
                    provider: this.providerType
                };
            }

            console.log(`[FoD] Connection validation successful`);
            return { success: true, provider: this.providerType };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[FoD] Connection validation failed: ${errorMessage}`);

            if (errorMessage.includes('401') || errorMessage.includes('Authentication failed') || errorMessage.includes('Unauthorized')) {
                return {
                    success: false,
                    error: 'Authentication failed - please verify the API key and secret have proper permissions',
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
        console.log(`[FoD] Validating application "${appName}" and version "${appVersion}"`);

        try {
            // Find application by name - using filter then exact match
            const appUrl = `${this.baseUrl}/api/v3/applications?filters=applicationName:${encodeURIComponent(appName)}`;
            console.log(`[FoD] Searching for application with filter: applicationName:${appName}`);
            const appResponse = await this.makeRequest(appUrl);

            if (!appResponse?.items || appResponse.items.length === 0) {
                console.warn(`[FoD] Application "${appName}" not found. Response: ${JSON.stringify(appResponse).substring(0, 200)}`);
                return {
                    success: false,
                    error: `Application "${appName}" not found in Fortify on Demand`,
                    provider: this.providerType
                };
            }

            // Find exact match (filter does partial/contains match, we need exact)
            const exactMatch = appResponse.items.find((app: FoDApplication) => app.applicationName === appName);
            if (!exactMatch) {
                const availableApps = appResponse.items.map((a: FoDApplication) => a.applicationName).join(', ');
                console.warn(`[FoD] No exact match for application "${appName}". Found: ${availableApps}`);
                return {
                    success: false,
                    error: `Exact application name "${appName}" not found. Did you mean: ${availableApps}?`,
                    provider: this.providerType
                };
            }

            const application: FoDApplication = exactMatch;
            const applicationId = application.applicationId;
            console.log(`[FoD] Found exact match for application "${appName}" with ID: ${applicationId}`);

            // Find release (version) by name - using filter then exact match
            const releaseUrl = `${this.baseUrl}/api/v3/applications/${applicationId}/releases?filters=releaseName:${encodeURIComponent(appVersion)}`;
            console.log(`[FoD] Searching for release with filter: releaseName:${appVersion}`);
            const releaseResponse = await this.makeRequest(releaseUrl);

            if (!releaseResponse?.items || releaseResponse.items.length === 0) {
                console.warn(`[FoD] Release "${appVersion}" not found. Fetching available releases...`);
                try {
                    // Get all releases to show available options
                    const allReleasesUrl = `${this.baseUrl}/api/v3/applications/${applicationId}/releases`;
                    const allReleasesResponse = await this.makeRequest(allReleasesUrl);
                    const availableReleases = allReleasesResponse?.items?.map((r: FoDRelease) => r.releaseName).join(', ') || 'none';
                    console.log(`[FoD] Available releases: ${availableReleases}`);
                    return {
                        success: false,
                        error: `Release "${appVersion}" not found. Available releases: ${availableReleases}`,
                        provider: this.providerType
                    };
                } catch (listError) {
                    console.warn(`[FoD] Could not list available releases: ${listError}`);
                    return {
                        success: false,
                        error: `Release "${appVersion}" not found for application "${appName}"`,
                        provider: this.providerType
                    };
                }
            }

            // Find exact match (filter does partial/contains match, we need exact)
            const exactReleaseMatch = releaseResponse.items.find((rel: FoDRelease) => rel.releaseName === appVersion);
            if (!exactReleaseMatch) {
                const availableReleases = releaseResponse.items.map((r: FoDRelease) => r.releaseName).join(', ');
                console.warn(`[FoD] No exact match for release "${appVersion}". Found: ${availableReleases}`);
                return {
                    success: false,
                    error: `Exact release name "${appVersion}" not found. Did you mean: ${availableReleases}?`,
                    provider: this.providerType
                };
            }

            const release: FoDRelease = exactReleaseMatch;
            const releaseId = release.releaseId;
            console.log(`[FoD] Found exact match for release "${appVersion}" with ID: ${releaseId}`);

            return {
                success: true,
                applicationId: applicationId.toString(),
                versionId: releaseId.toString(),
                provider: this.providerType
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[FoD] Validation failed: ${errorMessage}`);
            return {
                success: false,
                error: `Validation failed: ${errorMessage}`,
                provider: this.providerType
            };
        }
    }

    async fetchReportData(appName: string, appVersion: string, maxIssues: number = 10000): Promise<ReportData> {
        console.log(`[FoD] Fetching report data for app "${appName}" v"${appVersion}", max issues: ${maxIssues}`);

        // Find application by name
        const appUrl = `${this.baseUrl}/api/v3/applications?filters=applicationName:${encodeURIComponent(appName)}`;
        console.log(`[FoD] Step 1: Looking up application`);
        const appResponse = await this.makeRequest(appUrl);

        if (!appResponse?.items || appResponse.items.length === 0) {
            console.error(`[FoD] Application "${appName}" not found`);
            throw new Error(`Application "${appName}" not found`);
        }

        // Find exact match (filter does partial/contains match, we need exact)
        const exactAppMatch = appResponse.items.find((app: FoDApplication) => app.applicationName === appName);
        if (!exactAppMatch) {
            const availableApps = appResponse.items.map((a: FoDApplication) => a.applicationName).join(', ');
            console.error(`[FoD] No exact match for application "${appName}". Found: ${availableApps}`);
            throw new Error(`Exact application name "${appName}" not found. Did you mean: ${availableApps}?`);
        }

        const application: FoDApplication = exactAppMatch;
        const applicationId = application.applicationId;
        console.log(`[FoD] Found exact match for application ID: ${applicationId}`);

        // Find release by name
        const releaseUrl = `${this.baseUrl}/api/v3/applications/${applicationId}/releases?filters=releaseName:${encodeURIComponent(appVersion)}`;
        console.log(`[FoD] Step 2: Looking up release`);
        const releaseResponse = await this.makeRequest(releaseUrl);

        if (!releaseResponse?.items || releaseResponse.items.length === 0) {
            console.error(`[FoD] Release "${appVersion}" not found`);
            throw new Error(`Release "${appVersion}" not found`);
        }

        // Find exact match (filter does partial/contains match, we need exact)
        const exactReleaseMatch = releaseResponse.items.find((rel: FoDRelease) => rel.releaseName === appVersion);
        if (!exactReleaseMatch) {
            const availableReleases = releaseResponse.items.map((r: FoDRelease) => r.releaseName).join(', ');
            console.error(`[FoD] No exact match for release "${appVersion}". Found: ${availableReleases}`);
            throw new Error(`Exact release name "${appVersion}" not found. Did you mean: ${availableReleases}?`);
        }

        const release: FoDRelease = exactReleaseMatch;
        const releaseId = release.releaseId;
        console.log(`[FoD] Found exact match for release ID: ${releaseId}`);

        console.log(`[FoD] Step 3: Fetching vulnerabilities`);
        const allVulns = await this.fetchAllVulnerabilities(releaseId, maxIssues);

        console.log(`[FoD] Report data fetch complete. Total issues: ${allVulns.length}`);

        return {
            issues: allVulns,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString(),
            totalCount: allVulns.length,
            projectVersionId: releaseId.toString(),
            provider: this.providerType,
            providerUrl: this.baseUrl
        };
    }

    generateProjectUrl(applicationId: string, releaseId: string): string {
        // Transform api.region.fortify.com to region.fortify.com
        const webUrl = this.baseUrl.replace('api.', '').replace('/api', '').replace('/v3', '').replace(/\/$/, '');
        return `${webUrl}/Releases/${releaseId}`;
    }

    generateIssueUrl(applicationId: string, releaseId: string, vulnId: string): string {
        // Transform api.region.fortify.com to region.fortify.com
        const webUrl = this.baseUrl.replace('api.', '').replace('/api', '').replace('/v3', '').replace(/\/$/, '');
        return `${webUrl}/Releases/${releaseId}/Issues/${vulnId}`;
    }

    private async fetchAllVulnerabilities(releaseId: number, maxIssues: number): Promise<SecurityIssue[]> {
        const allVulns: SecurityIssue[] = [];
        let offset = 0;
        const limit = 50; // FoD typically uses smaller page sizes
        let totalCount = 0;
        let pageCount = 0;

        console.log(`[FoD] Starting vulnerability fetch for release ${releaseId}, max issues: ${maxIssues}`);

        while (allVulns.length < maxIssues) {
            pageCount++;
            const params = new URLSearchParams({
                offset: offset.toString(),
                limit: limit.toString(),
                // Note: orderBy field should match actual FoD vulnerability fields
                // Using 'severity' instead of 'severityString' to match API field names
                orderBy: 'severity',
                orderByDirection: 'ASC',
                includeFixed: 'false',
                includeSuppressed: 'false'
            });

            const url = `${this.baseUrl}/api/v3/releases/${releaseId}/vulnerabilities?${params.toString()}`;
            console.log(`[FoD] Fetching vulnerabilities page ${pageCount}: offset=${offset}, limit=${limit}`);

            try {
                const response = await this.makeRequest(url);

                // Enhanced response validation and logging
                console.log(`[FoD] Response received. totalCount: ${response?.totalCount}, items length: ${response?.items?.length}`);

                if (!response) {
                    console.warn(`[FoD] Empty response from API for release ${releaseId}`);
                    break;
                }

                if (!response.items) {
                    console.warn(`[FoD] Response has no 'items' array. Response keys: ${Object.keys(response).join(', ')}`);
                    break;
                }

                if (response.items.length === 0) {
                    console.log(`[FoD] No vulnerabilities found in this page. Total fetched so far: ${allVulns.length}`);
                    break;
                }

                // Track total count from API
                if (response.totalCount !== undefined) {
                    totalCount = response.totalCount;
                    console.log(`[FoD] API total vulnerability count: ${totalCount}`);
                }

                const batchVulns = response.items.map((vuln: FoDVulnerability) => {
                    try {
                        return this.mapFoDVulnToSecurityIssue(vuln);
                    } catch (mapError) {
                        console.warn(`[FoD] Error mapping vulnerability ${vuln.id}:`, mapError);
                        throw mapError;
                    }
                });

                allVulns.push(...batchVulns);
                console.log(`[FoD] Added ${batchVulns.length} vulnerabilities. Total collected: ${allVulns.length}`);

                offset += limit;

                if (allVulns.length >= maxIssues) {
                    console.log(`[FoD] Reached max issues limit of ${maxIssues}`);
                    break;
                }

                if (response.items.length < limit) {
                    console.log(`[FoD] Received fewer items than requested (${response.items.length} < ${limit}), ending pagination`);
                    break;
                }

                // Add a small delay to be respectful to the FoD API
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : String(error);
                console.error(`[FoD] Error fetching vulnerability page ${pageCount} at offset ${offset}:`, errorMsg);
                // Re-throw to allow caller to handle
                throw new Error(`Failed to fetch vulnerabilities at offset ${offset}: ${errorMsg}`);
            }
        }

        console.log(`[FoD] Vulnerability fetch complete. Total collected: ${allVulns.length}, API reported total: ${totalCount}`);
        return allVulns.slice(0, maxIssues);
    }

    private mapFoDVulnToSecurityIssue(vuln: FoDVulnerability): SecurityIssue {
        // Map FoD severity to consistent format
        const severity = vuln.severityString || 'Unknown';
        const severityColor = this.getSeverityColor(severity);

        // Build primary location: File path with line number
        // FoD returns primaryLocationFull with the full file path
        let primaryLocation = '';
        const fileLocation = vuln.primaryLocationFull || vuln.fileName || vuln.shortFileName || '';

        if (fileLocation) {
            primaryLocation = fileLocation;
            if (vuln.lineNumber && vuln.lineNumber > 0) {
                primaryLocation += `:${vuln.lineNumber}`;
            }
        } else if (vuln.lineNumber && vuln.lineNumber > 0) {
            // If we have line number but no file path, show the line number
            primaryLocation = `:${vuln.lineNumber}`;
        }

        return {
            id: vuln.id.toString(), // Use numeric ID for URL generation (e.g., "31318521")
            instanceId: vuln.vulnInstanceId || vuln.vulnId, // Use UUID as instance identifier
            name: vuln.category || vuln.subCategory || 'Unknown Issue',
            severity: severity,
            priority: severity, // FoD uses severityString for priority as well
            likelihood: this.mapLikelihoodToString(vuln.likelihood || 0),
            confidence: this.mapConfidenceToString(vuln.confidence || 0),
            primaryLocation: primaryLocation,
            lineNumber: vuln.lineNumber || 0,
            kingdom: vuln.kingdom || '',
            category: vuln.category || 'Uncategorized',
            priority_score: vuln.priorityOrder || 0,
            folderGuid: '', // FoD doesn't use folder GUIDs
            folderId: this.getSeverityId(severity),
            folderName: severity,
            folderColor: severityColor,
            provider: this.providerType,
            rawData: vuln
        };
    }

    private getSeverityColor(severity: string): string {
        switch (severity.toLowerCase()) {
            case 'critical': return 'ed1c24';
            case 'high': return 'ff7800';
            case 'medium': return 'f6aa58';
            case 'low': return 'eec845';
            default: return '666666';
        }
    }

    private getSeverityId(severity: string): number {
        switch (severity.toLowerCase()) {
            case 'critical': return 1;
            case 'high': return 2;
            case 'medium': return 3;
            case 'low': return 4;
            default: return 0;
        }
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

    private async makeRequest(url: string): Promise<any> {
        console.log(`[FoD] Making request to: ${url}`);

        // Check if we need to refresh the token
        if (!await this.authStrategy.isValid()) {
            console.log(`[FoD] Token invalid or expired. Refreshing...`);
            if (this.authStrategy.refresh) {
                await this.authStrategy.refresh();
            } else {
                await this.authStrategy.authenticate();
            }
            console.log(`[FoD] Token refresh complete`);
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

            console.log(`[FoD] Request options - hostname: ${options.hostname}, path: ${options.path}`);

            const client = parsedUrl.protocol === 'https:' ? https : http;

            const req = client.request(options, (res) => {
                let data = '';

                console.log(`[FoD] HTTP ${res.statusCode}: ${res.statusMessage}`);

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        console.log(`[FoD] Success response. Content length: ${data.length}`);
                        try {
                            const jsonData = JSON.parse(data);
                            console.log(`[FoD] Parsed JSON successfully. Keys: ${Object.keys(jsonData).join(', ')}`);
                            resolve(jsonData);
                        } catch (parseError) {
                            console.error(`[FoD] Failed to parse response as JSON. Raw data: ${data.substring(0, 200)}`);
                            reject(new Error(`Invalid JSON response from Fortify on Demand`));
                        }
                    } else {
                        console.warn(`[FoD] Error response. Status: ${res.statusCode}`);
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;

                        try {
                            const errorData = JSON.parse(data);
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error_description) {
                                errorMessage = errorData.error_description;
                            }
                            console.warn(`[FoD] Error details: ${errorMessage}`);
                        } catch {
                            // Keep original error message
                            console.warn(`[FoD] Error response body: ${data.substring(0, 200)}`);
                        }

                        reject(new Error(errorMessage));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                console.error(`[FoD] Request timeout after 30 seconds`);
                reject(new Error('Request timeout - Fortify on Demand did not respond within 30 seconds'));
            });

            req.on('error', (error) => {
                console.error(`[FoD] Network error: ${error.message}`);
                reject(new Error(`Network error: ${error.message}`));
            });

            req.end();
        });
    }
}