import "./tabContent.scss"

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as SDK from "azure-devops-extension-sdk"

import { getClient } from "azure-devops-extension-api"
import { Build, BuildRestClient, Attachment } from "azure-devops-extension-api/Build"

import { ObservableValue, ObservableObject } from "azure-devops-ui/Core/Observable"
import { Observer } from "azure-devops-ui/Observer"
import { Card } from "azure-devops-ui/Card"
import { Page } from "azure-devops-ui/Page"

const ATTACHMENT_TYPE = "fortify-report";

interface FortifyConfig {
    sscUrl: string;
    ciToken: string;
    appName: string;
    appVersion: string;
    timestamp: string;
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

SDK.init()
SDK.ready().then(() => {
    try {
        const config = SDK.getConfiguration()
        config.onBuildChanged((build: Build) => {
            console.log("Fortify Report: Build changed event received", build);
            let buildAttachmentClient = new BuildAttachmentClient(build)
            buildAttachmentClient.init().then(() => {
                displayReports(buildAttachmentClient)
            }).catch(error => {
                console.error("Fortify Report: Error initializing attachment client", error);
                displayReports(null);
            })
        })
    } catch(error) {
        console.error("Fortify Report: SDK initialization error", error);
        displayReports(null);
    }
})

function displayReports(attachmentClient: AttachmentClient | null) {
    ReactDOM.render(
        <FortifyReportPanel attachmentClient={attachmentClient} />, 
        document.getElementById("fortify-report-container")
    )
}

abstract class AttachmentClient {
    protected attachments: Attachment[] = []
    protected authHeaders: Object = undefined
    
    constructor() {}

    public getAttachments(): Attachment[] {
        return this.attachments
    }

    public getDownloadableAttachment(attachmentName: string): Attachment {
        const attachment = this.attachments.find((attachment) => { 
            return attachment.name === attachmentName
        })
        if (!(attachment && attachment._links && attachment._links.self && attachment._links.self.href)) {
            throw new Error("Attachment " + attachmentName + " is not downloadable")
        }
        return attachment
    }

    public async getAttachmentContent(attachmentName: string): Promise<string> {
        if (this.authHeaders === undefined) {
            console.log('Fortify Report: Getting access token');
            const accessToken = await SDK.getAccessToken()
            const b64encodedAuth = Buffer.from(':' + accessToken).toString('base64')
            this.authHeaders = { headers: {'Authorization': 'Basic ' + b64encodedAuth} }
        }
        console.log("Fortify Report: Getting attachment content for " + attachmentName);
        const attachment = this.getDownloadableAttachment(attachmentName)
        const response = await fetch(attachment._links.self.href, this.authHeaders)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const responseText = await response.text()
        return responseText
    }
}

class BuildAttachmentClient extends AttachmentClient {
    private build: Build

    constructor(build: Build) {
        super()
        this.build = build
    }

    public async init() {
        console.log("Fortify Report: Initializing attachment client for build", this.build.id);
        const buildClient: BuildRestClient = getClient(BuildRestClient)
        this.attachments = await buildClient.getAttachments(
            this.build.project.id, 
            this.build.id, 
            ATTACHMENT_TYPE
        )
        console.log("Fortify Report: Found attachments", this.attachments);
    }
}

// Fortify SSC API Client
// Enhanced Fortify SSC API Client (for tabContent.tsx)
class FortifySSCClient {
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, ''); // Remove trailing slash
        this.ciToken = ciToken;
    }

    private async makeRequest(url: string): Promise<any> {
        console.log(`Fortify API Request: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `FortifyToken ${this.ciToken}`,
                'Accept': 'application/json',
                'User-Agent': 'Azure-DevOps-Fortify-Extension/9.0.0'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log(`Fortify API Response count:`, data.count || 'N/A');
        return data;
    }

    public async getProjectId(appName: string): Promise<string> {
        // Use the correct projects endpoint without quotes
        const url = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
        const response = await this.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error(`Application "${appName}" not found in Fortify SSC`);
        }
        
        console.log(`Found application "${appName}" with project ID: ${response.data[0].id}`);
        return response.data[0].id.toString();
    }

    public async getVersionId(projectId: string, appVersion: string): Promise<string> {
        // Use the correct project versions endpoint with quotes around version name
        const url = `${this.sscUrl}/api/v1/projects/${projectId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
        const response = await this.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error(`Version "${appVersion}" not found for the specified application`);
        }
        
        console.log(`Found version "${appVersion}" with version ID: ${response.data[0].id}`);
        return response.data[0].id.toString();
    }

    public async getSecurityAuditorFilterSetId(versionId: string): Promise<string> {
        const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/filterSets`;
        const response = await this.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error('No filter sets found for this project version');
        }
        
        // Find "Security Auditor View" filterset (note the exact capitalization)
        const securityAuditorFilter = response.data.find((filterSet: any) => 
            filterSet.title === 'Security Auditor View' || 
            filterSet.title.toLowerCase().includes('security auditor')
        );
        
        if (!securityAuditorFilter) {
            console.warn('Security Auditor View filterset not found, using default filterset');
            // Fallback to first available filterset or the default one
            const defaultFilter = response.data.find((filterSet: any) => filterSet.defaultFilterSet === true);
            if (defaultFilter) {
                console.log(`Using default filterset: ${defaultFilter.title}`);
                return defaultFilter.guid;
            }
            return response.data[0].guid;
        }
        
        console.log(`Found Security Auditor filterset: ${securityAuditorFilter.title} with ID: ${securityAuditorFilter.guid}`);
        return securityAuditorFilter.guid;
    }

    public async getIssues(versionId: string, start: number = 0, limit: number = 20): Promise<{issues: FortifyIssue[], total: number}> {
        try {
            // Get Security Auditor filterset ID
            const filterSetId = await this.getSecurityAuditorFilterSetId(versionId);
            
            // Build issues URL with the exact parameters from your working example
            const params = new URLSearchParams({
                filterset: filterSetId,
                start: start.toString(),
                limit: limit.toString(),
                orderby: 'friority', // Sort by priority as specified
                showhidden: 'false',
                showremoved: 'false',
                showsuppressed: 'false'
            });
            
            const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/issues?${params.toString()}`;
            const response = await this.makeRequest(url);
            
            if (!response.data) {
                return { issues: [], total: 0 };
            }

            const issues = response.data.map((issue: any) => ({
                id: issue.id?.toString() || '',
                issueName: issue.issueName || issue.category || 'Unknown Issue',
                severity: this.mapSeverityToString(issue.severity || 0),
                priority: this.mapPriorityToString(issue.friority || issue.severity || 0), // Note: friority is the correct field name
                likelihood: this.mapLikelihoodToString(issue.likelihood || 0),
                confidence: this.mapConfidenceToString(issue.confidence || 0),
                primaryLocation: issue.primaryLocation || issue.fileName || '',
                lineNumber: issue.lineNumber || 0,
                kingdom: issue.kingdom || '',
                category: issue.category || issue.issueName || 'Uncategorized'
            }));

            return {
                issues,
                total: response.count || response.data.length
            };
            
        } catch (error) {
            console.error('Error fetching issues with filterset, falling back to direct fetch:', error);
            
            // Fallback: direct issues fetch without filterset
            const params = new URLSearchParams({
                start: start.toString(),
                limit: limit.toString(),
                orderby: 'friority'
            });
            
            const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/issues?${params.toString()}`;
            const response = await this.makeRequest(url);
            
            if (!response.data) {
                return { issues: [], total: 0 };
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

            return {
                issues,
                total: response.count || response.data.length
            };
        }
    }

    // Get all issues with pagination
    public async getAllIssues(versionId: string, maxResults: number = 500): Promise<FortifyIssue[]> {
        const allIssues: FortifyIssue[] = [];
        let start = 0;
        const limit = 50; // Fetch in chunks
        
        while (allIssues.length < maxResults) {
            const result = await this.getIssues(versionId, start, limit);
            
            if (result.issues.length === 0) {
                break; // No more issues
            }
            
            allIssues.push(...result.issues);
            start += limit;
            
            // If we got fewer results than requested, we've reached the end
            if (result.issues.length < limit) {
                break;
            }
        }
        
        return allIssues.slice(0, maxResults); // Ensure we don't exceed maxResults
    }

    // Simplified method that combines project and version lookup
    public async getVersionIdByNames(appName: string, appVersion: string): Promise<string> {
        const projectId = await this.getProjectId(appName);
        const versionId = await this.getVersionId(projectId, appVersion);
        return versionId;
    }

    private mapSeverityToString(severity: number): string {
        if (severity >= 4.0) return "Critical";
        if (severity >= 3.0) return "High";
        if (severity >= 2.0) return "Medium";
        return "Low";
    }

    private mapPriorityToString(priority: number): string {
        // Note: friority in Fortify API uses different scale
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

interface FortifyReportPanelProps {
    attachmentClient: AttachmentClient | null
}

interface FortifyReportPanelState {
    reportData: ReportData | null
    loading: boolean
    error: string | null
    filteredIssues: FortifyIssue[]
    severityFilter: string
    priorityFilter: string
    config: FortifyConfig | null
}

class FortifyReportPanel extends React.Component<FortifyReportPanelProps, FortifyReportPanelState> {
    private refreshInterval: NodeJS.Timeout | null = null;

    constructor(props: FortifyReportPanelProps) {
        super(props);
        this.state = {
            reportData: null,
            loading: true,
            error: null,
            filteredIssues: [],
            severityFilter: '',
            priorityFilter: '',
            config: null
        }
    }

    componentDidMount() {
        this.loadReportData();
        // Set up auto-refresh every 5 minutes
        this.refreshInterval = setInterval(() => {
            if (this.state.config) {
                this.fetchFortifyData(this.state.config);
            }
        }, 300000); // 5 minutes
    }

    componentWillUnmount() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    componentDidUpdate(prevProps: FortifyReportPanelProps) {
        if (prevProps.attachmentClient !== this.props.attachmentClient) {
            this.loadReportData();
        }
    }

    private async loadReportData() {
        if (!this.props.attachmentClient) {
            this.setState({
                reportData: this.getMockData("No attachment client available"),
                loading: false,
                error: "Could not load build attachments - using mock data",
                filteredIssues: [],
                config: null
            }, () => {
                this.setState({ filteredIssues: this.state.reportData?.issues || [] });
            });
            return;
        }

        try {
            this.setState({ loading: true, error: null });
            
            const attachments = this.props.attachmentClient.getAttachments();
            console.log("Fortify Report: Available attachments", attachments);
            
            // Find the configuration attachment
            const configAttachment = attachments.find(a => a.name.includes('.config'));
            
            if (!configAttachment) {
                throw new Error("Fortify configuration attachment not found");
            }

            const configContent = await this.props.attachmentClient.getAttachmentContent(configAttachment.name);
            const config: FortifyConfig = JSON.parse(configContent);
            
            console.log("Fortify Report: Loaded configuration", config);
            this.setState({ config });

            // Now fetch live data from Fortify SSC
            await this.fetchFortifyData(config);
            
        } catch (error) {
            console.error("Fortify Report: Error loading configuration", error);
            const mockData = this.getMockData(`Error loading configuration: ${error instanceof Error ? error.message : String(error)}`);
            this.setState({
                reportData: mockData,
                loading: false,
                error: error instanceof Error ? error.message : String(error),
                filteredIssues: mockData.issues
            });
        }
    }

    private async fetchFortifyData(config: FortifyConfig) {
        try {
            this.setState({ loading: true, error: null });
            
            console.log("Fortify Report: Fetching live data from SSC...");
            const fortifyClient = new FortifySSCClient(config.sscUrl, config.ciToken);
            
            // Get version ID using the corrected API calls
            const versionId = await fortifyClient.getVersionIdByNames(config.appName, config.appVersion);
            console.log(`Successfully got version ID: ${versionId}`);
            
            // Get issues using the corrected filterset approach
            const issues = await fortifyClient.getAllIssues(versionId, 500);
            
            const reportData: ReportData = {
                issues: issues,
                appName: config.appName,
                appVersion: config.appVersion,
                scanDate: new Date().toISOString(),
                totalCount: issues.length
            };
            
            console.log(`Fortify Report: Successfully fetched ${issues.length} issues`);
            
            this.setState({
                reportData,
                loading: false,
                error: null,
                filteredIssues: issues
            });
            
        } catch (error) {
            console.error("Fortify Report: Error fetching Fortify data", error);
            const mockData = this.getMockData(`Error fetching Fortify data: ${error instanceof Error ? error.message : String(error)}`);
            this.setState({
                reportData: mockData,
                loading: false,
                error: `API Error: ${error instanceof Error ? error.message : String(error)}`,
                filteredIssues: mockData.issues
            });
        }
    }

    private getMockData(reason: string): ReportData {
        console.warn(`Fortify Report: Using mock data. Reason: ${reason}`);
        return {
            issues: [
                { 
                    id: 'M1', 
                    issueName: 'Mock Issue: SQL Injection', 
                    severity: 'Critical', 
                    priority: 'Critical', 
                    likelihood: 'Likely', 
                    confidence: 'High', 
                    primaryLocation: 'mock/Login.java', 
                    lineNumber: 101, 
                    kingdom: 'Input Validation', 
                    category: 'A1-Injection' 
                },
                { 
                    id: 'M2', 
                    issueName: 'Mock Issue: XSS Basic', 
                    severity: 'High', 
                    priority: 'High', 
                    likelihood: 'Possible', 
                    confidence: 'Medium', 
                    primaryLocation: 'mock/Profile.jsp', 
                    lineNumber: 55, 
                    kingdom: 'Environment', 
                    category: 'A7-XSS' 
                },
                { 
                    id: 'M3', 
                    issueName: 'Mock Issue: Weak Hashing', 
                    severity: 'Medium', 
                    priority: 'Medium', 
                    likelihood: 'Unlikely', 
                    confidence: 'Low', 
                    primaryLocation: 'mock/utils/Crypto.cs', 
                    lineNumber: 23, 
                    kingdom: 'Security Features', 
                    category: 'Password Management' 
                }
            ],
            appName: 'MockApp',
            appVersion: '0.0.0',
            scanDate: new Date().toISOString(),
            totalCount: 3
        };
    }

    private handleSeverityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const severityFilter = event.target.value;
        this.setState({ severityFilter }, this.applyFilters);
    }

    private handlePriorityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const priorityFilter = event.target.value;
        this.setState({ priorityFilter }, this.applyFilters);
    }

    private applyFilters = () => {
        if (!this.state.reportData) return;

        let filteredIssues = this.state.reportData.issues;

        if (this.state.severityFilter) {
            filteredIssues = filteredIssues.filter(issue => issue.severity === this.state.severityFilter);
        }
        if (this.state.priorityFilter) {
            filteredIssues = filteredIssues.filter(issue => issue.priority === this.state.priorityFilter);
        }

        this.setState({ filteredIssues });
    }

    private handleRefresh = async () => {
        if (this.state.config) {
            await this.fetchFortifyData(this.state.config);
        } else {
            await this.loadReportData();
        }
    }

    render() {
        const { reportData, loading, error, filteredIssues } = this.state;

        if (loading) {
            return (
                <Page>
                    <Card className="fortify-report-card">
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading Fortify report from SSC...</p>
                        </div>
                    </Card>
                </Page>
            );
        }

        if (!reportData) {
            return (
                <Page>
                    <Card className="fortify-report-card">
                        <div className="error-container">
                            <p>No report data available</p>
                        </div>
                    </Card>
                </Page>
            );
        }

        const stats = {
            total: filteredIssues.length,
            critical: filteredIssues.filter(i => i.priority === 'Critical').length,
            high: filteredIssues.filter(i => i.priority === 'High').length,
            medium: filteredIssues.filter(i => i.priority === 'Medium').length,
            low: filteredIssues.filter(i => i.priority === 'Low').length
        };

        return (
            <Page>
                <Card className="fortify-report-card">
                    <div className="fortify-report">
                        <div className="header">
                            <h2>Fortify SSC Vulnerability Report</h2>
                            <div className="app-info">
                                Application: {reportData.appName} - Version: {reportData.appVersion} - 
                                Last Updated: {new Date(reportData.scanDate).toLocaleString()} - 
                                Total Issues: {reportData.totalCount}
                            </div>
                            {error && <div className="error-banner">⚠️ {error}</div>}
                        </div>
                        
                        <div className="controls">
                            <div className="filter-group">
                                <select 
                                    value={this.state.severityFilter} 
                                    onChange={this.handleSeverityFilterChange}
                                    className="filter-select"
                                >
                                    <option value="">All Severities</option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                <select 
                                    value={this.state.priorityFilter} 
                                    onChange={this.handlePriorityFilterChange}
                                    className="filter-select"
                                >
                                    <option value="">All Priorities</option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <button onClick={this.handleRefresh} className="refresh-btn" disabled={loading}>
                                {loading ? 'Refreshing...' : 'Refresh'}
                            </button>
                        </div>
                        
                        <div className="stats-summary">
                            <div className="stat-card">
                                <div className="stat-value">{stats.total}</div>
                                <div className="stat-label">Total Issues</div>
                            </div>
                            <div className="stat-card critical">
                                <div className="stat-value">{stats.critical}</div>
                                <div className="stat-label">Critical</div>
                            </div>
                            <div className="stat-card high">
                                <div className="stat-value">{stats.high}</div>
                                <div className="stat-label">High</div>
                            </div>
                            <div className="stat-card medium">
                                <div className="stat-value">{stats.medium}</div>
                                <div className="stat-label">Medium</div>
                            </div>
                            <div className="stat-card low">
                                <div className="stat-value">{stats.low}</div>
                                <div className="stat-label">Low</div>
                            </div>
                        </div>
                        
                        <table className="issues-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Primary Location</th>
                                    <th>Analysis Type</th>
                                    <th>Priority</th>
                                    <th>Tagged</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredIssues.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{textAlign: 'center', padding: '20px'}}>
                                            No issues found matching the current criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredIssues.map(issue => (
                                        <tr key={issue.id}>
                                            <td>{issue.category || issue.issueName}</td>
                                            <td>{issue.primaryLocation}:{issue.lineNumber}</td>
                                            <td>{issue.kingdom || 'N/A'}</td>
                                            <td className={`priority-cell ${issue.priority}`}>
                                                {issue.priority}
                                            </td>
                                            <td className="tag-cell">
                                                {(issue.likelihood === 'Likely' || issue.confidence === 'High') && (
                                                    <span className="tag exploitable">Exploitable</span>
                                                )}
                                                {issue.confidence === 'Low' && (
                                                    <span className="tag suspicious">Suspicious</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </Page>
        );
    }
}