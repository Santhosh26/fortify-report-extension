import "./tabContent.scss"

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as SDK from "azure-devops-extension-sdk"

import { getClient } from "azure-devops-extension-api"
import { Build, BuildRestClient, Attachment } from "azure-devops-extension-api/Build"
import { CommonServiceIds, IHostNavigationService } from "azure-devops-extension-api"

import { ObservableValue, ObservableObject } from "azure-devops-ui/Core/Observable"
import { Observer } from "azure-devops-ui/Observer"
import { Card } from "azure-devops-ui/Card"

const ATTACHMENT_TYPE = "fortify-report";

interface FortifyConfig {
    providerType?: string;
    baseUrl: string;
    // Legacy SSC fields
    sscUrl?: string;
    ciToken?: string;
    // FoD fields
    apiKey?: string;
    apiSecret?: string;
    // Common fields
    appName: string;
    appVersion: string;
    timestamp: string;
    projectVersionId?: string;
}

interface FortifyIssue {
    id: string;
    instanceId: string;
    name: string;
    // Legacy field names for backward compatibility
    issueInstanceId?: string;
    issueName?: string;
    // Current fields
    severity: string;
    priority: string;
    likelihood: string;
    confidence: string;
    primaryLocation: string;
    lineNumber: number;
    kingdom: string;
    category: string;
    priority_score?: number;
    friority?: number; // Legacy
    folderGuid?: string;
    folderId?: number;
    folderName?: string;
    folderColor?: string;
    provider?: string;
    rawData?: any;
}

interface ReportData {
    issues: FortifyIssue[];
    appName: string;
    appVersion: string;
    scanDate: string;
    totalCount: number;
    projectVersionId?: string;
    provider?: string;
    providerUrl?: string;
}

SDK.init()
SDK.ready().then(() => {
    try {
        const config = SDK.getConfiguration()
        config.onBuildChanged((build: Build) => {
            let buildAttachmentClient = new BuildAttachmentClient(build)
            buildAttachmentClient.init().then(() => {
                displayReports(buildAttachmentClient)
            }).catch(error => {
                displayReports(null);
            })
        })
    } catch(error) {
        displayReports(null);
    }
}).catch(error => {
    displayReports(null);
})

function displayReports(attachmentClient: AttachmentClient | null) {
    try {
        const container = document.getElementById("fortify-report-container");
        if (!container) {
            return;
        }
        
        ReactDOM.render(
            <FortifyReportPanel attachmentClient={attachmentClient} />, 
            container
        );
        
    } catch (error) {
        
        // Fallback error display using safe DOM manipulation
        const container = document.getElementById("fortify-report-container");
        if (container) {
            // Clear existing content
            container.textContent = '';
            
            // Create error container
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'padding: 20px; text-align: center; color: red;';
            
            // Create and append title
            const title = document.createElement('h3');
            title.textContent = 'Fortify Report Error';
            errorDiv.appendChild(title);
            
            // Create and append error message
            const errorMsg = document.createElement('p');
            const safeErrorMessage = error instanceof Error ? error.message : String(error);
            errorMsg.textContent = `Failed to load the Fortify report: ${safeErrorMessage}`;
            errorDiv.appendChild(errorMsg);
            
            // Create and append help text
            const helpText = document.createElement('p');
            helpText.textContent = 'Check the browser console for more details.';
            errorDiv.appendChild(helpText);
            
            container.appendChild(errorDiv);
        }
    }
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
            const accessToken = await SDK.getAccessToken()
            const b64encodedAuth = btoa(':' + accessToken)
            this.authHeaders = { headers: {'Authorization': 'Basic ' + b64encodedAuth} }
        }
        
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
        const buildClient: BuildRestClient = getClient(BuildRestClient)
        this.attachments = await buildClient.getAttachments(
            this.build.project.id, 
            this.build.id, 
            ATTACHMENT_TYPE
        )
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
    config: FortifyConfig | null
    statusMessage: string
}

// Utility function to get friendly provider name
function getProviderName(providerType?: string): string {
    switch (providerType?.toLowerCase()) {
        case 'fod':
            return 'Fortify on Demand';
        case 'ssc':
            return 'Fortify SSC';
        default:
            return 'Fortify SSC';
    }
}

// Utility functions for generating provider URLs
function generateProjectVersionUrl(config: FortifyConfig): string {
    const baseUrl = config.baseUrl || config.sscUrl || '';
    const versionId = config.projectVersionId || '';

    if (config.providerType === 'fod') {
        // Transform api.region.fortify.com to region.fortify.com
        const webUrl = baseUrl.replace('api.', '').replace('/api', '').replace('/v3', '').replace(/\/$/, '');
        return `${webUrl}/Releases/${versionId}`;
    } else {
        // SSC or legacy
        return `${baseUrl.replace(/\/$/, '')}/html/ssc/index.jsp#!/version/${versionId}/fix`;
    }
}

function generateIssueUrl(config: FortifyConfig, issue: FortifyIssue): string {
    const baseUrl = config.baseUrl || config.sscUrl || '';
    const versionId = config.projectVersionId || '';
    const instanceId = issue.instanceId || issue.issueInstanceId || issue.id;

    if (config.providerType === 'fod') {
        // Transform api.region.fortify.com to region.fortify.com
        const webUrl = baseUrl.replace('api.', '').replace('/api', '').replace('/v3', '').replace(/\/$/, '');
        return `${webUrl}/Releases/${versionId}/Issues/${issue.id}`;
    } else {
        // SSC or legacy
        const encodedInstanceId = encodeURIComponent(`[instance id]:${instanceId}`);
        return `${baseUrl.replace(/\/$/, '')}/html/ssc/version/${versionId}/audit?q=${encodedInstanceId}`;
    }
}

class FortifyReportPanel extends React.Component<FortifyReportPanelProps, FortifyReportPanelState> {
    private hostNavigationService: IHostNavigationService | null = null;

    constructor(props: FortifyReportPanelProps) {
        super(props);
        this.state = {
            reportData: null,
            loading: true,
            error: null,
            filteredIssues: [],
            severityFilter: '',
            config: null,
            statusMessage: 'Loading Fortify report...'
        }
    }

    async componentDidMount() {
        try {
            // Replace CommonServiceIds.HostNavigationService with the actual string
            this.hostNavigationService = await SDK.getService<IHostNavigationService>("ms.vss-features.host-navigation-service");
        } catch (error) {
        }
        this.loadReportData();
    }

    componentDidUpdate(prevProps: FortifyReportPanelProps) {
        if (prevProps.attachmentClient !== this.props.attachmentClient) {
            this.loadReportData();
        }
    }

    private async loadReportData() {
        this.setState({ statusMessage: 'Loading report data...' });
        
        if (!this.props.attachmentClient) {
            this.setState({
                reportData: this.getMockData("No attachment client available"),
                loading: false,
                error: "Could not load build attachments",
                filteredIssues: [],
                config: null,
                statusMessage: 'Using sample data'
            }, () => {
                this.setState({ 
                    filteredIssues: this.state.reportData?.issues || []
                });
            });
            return;
        }

        try {
            this.setState({ loading: true, error: null });
            
            const attachments = this.props.attachmentClient.getAttachments();
            
            // Find the configuration attachment
            const configAttachment = attachments.find(a => a.name.includes('.config'));
            
            if (!configAttachment) {
                throw new Error("Fortify configuration attachment not found");
            }

            const configContent = await this.props.attachmentClient.getAttachmentContent(configAttachment.name);
            const config: FortifyConfig = JSON.parse(configContent);
            
            // Debug logging
            
            this.setState({ config, statusMessage: `Loading data for ${config.appName} v${config.appVersion}...` });

            // Try to find pre-fetched report data attachment
            const reportAttachment = attachments.find(a => a.name.includes('.report'));
            
            if (reportAttachment) {
                const reportContent = await this.props.attachmentClient.getAttachmentContent(reportAttachment.name);
                const reportData: ReportData = JSON.parse(reportContent);
                
                
                // If config doesn't have projectVersionId but report does, update config
                if (!config.projectVersionId && reportData.projectVersionId) {
                    this.setState(prevState => ({
                        config: {
                            ...prevState.config!,
                            projectVersionId: reportData.projectVersionId
                        }
                    }));
                }
                
                this.setState({
                    reportData,
                    loading: false,
                    error: null,
                    filteredIssues: reportData.issues,
                    statusMessage: `Loaded ${reportData.totalCount} issues`
                });
            } else {
                // Make mock data message provider-aware
                const providerName = (config?.providerType === 'fod') ? 'Fortify on Demand' : 'Fortify SSC';
                const mockData = this.getMockData(`No live data available from ${providerName}`);
                this.setState({
                    reportData: mockData,
                    loading: false,
                    error: "No live data available - check build logs for connection issues",
                    filteredIssues: mockData.issues,
                    statusMessage: 'Using sample data'
                });
            }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const mockData = this.getMockData(`Error: ${errorMessage}`);
            this.setState({
                reportData: mockData,
                loading: false,
                error: errorMessage,
                filteredIssues: mockData.issues,
                statusMessage: 'Error loading data'
            });
        }
    }

    private getSeverityColor(severity: string): string {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'ed1c24';
            case 'high': return 'ff7800';
            case 'medium': return 'f6aa58';
            case 'low': return 'eec845';
            default: return '666666';
        }
    }

    private getMockData(reason: string): ReportData {
        return {
            issues: [
                { 
                    id: 'M1', 
                    instanceId: 'MOCK_INSTANCE_ID_1',
                    name: 'SQL Injection', 
                    severity: 'Critical', 
                    priority: 'Critical', 
                    likelihood: 'Likely', 
                    confidence: 'High', 
                    primaryLocation: 'src/Login.java', 
                    lineNumber: 101, 
                    kingdom: 'Input Validation', 
                    category: 'A1-Injection',
                    folderGuid: 'b968f72f-cc12-03b5-976e-ad4c13920c21',
                    folderId: 1,
                    folderName: 'Critical',
                    folderColor: 'ed1c24',
                    provider: 'sample'
                },
                { 
                    id: 'M2', 
                    instanceId: 'MOCK_INSTANCE_ID_2',
                    name: 'Cross-Site Scripting', 
                    severity: 'High', 
                    priority: 'High', 
                    likelihood: 'Possible', 
                    confidence: 'Medium', 
                    primaryLocation: 'src/Profile.jsp', 
                    lineNumber: 55, 
                    kingdom: 'Environment', 
                    category: 'A7-XSS',
                    folderGuid: '5b50bb77-071d-08ed-fdba-1213fa90ac5a',
                    folderId: 2,
                    folderName: 'High',
                    folderColor: 'ff7800',
                    provider: 'sample'
                },
                { 
                    id: 'M3', 
                    instanceId: 'MOCK_INSTANCE_ID_3',
                    name: 'Weak Cryptographic Hash', 
                    severity: 'Medium', 
                    priority: 'Medium', 
                    likelihood: 'Unlikely', 
                    confidence: 'Low', 
                    primaryLocation: 'src/utils/Crypto.cs', 
                    lineNumber: 23, 
                    kingdom: 'Security Features', 
                    category: 'Password Management',
                    folderGuid: 'd5f55910-5f0d-a775-e91f-191d1f5608a4',
                    folderId: 3,
                    folderName: 'Medium',
                    folderColor: 'f6aa58',
                    provider: 'sample'
                }
            ],
            appName: 'Sample Application',
            appVersion: '1.0.0',
            scanDate: new Date().toISOString(),
            totalCount: 3,
            provider: 'sample'
        };
    }

    private handleSeverityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const severityFilter = event.target.value;
        this.setState({ severityFilter }, this.applyFilters);
    }


    private applyFilters = () => {
        if (!this.state.reportData) return;

        let filteredIssues = this.state.reportData.issues;

        // Filter by severity (folder name or severity)
        if (this.state.severityFilter) {
            filteredIssues = filteredIssues.filter(issue => 
                (issue.folderName || issue.severity) === this.state.severityFilter
            );
        }
        

        this.setState({ filteredIssues });
    }

    private handleRefresh = async () => {
        await this.loadReportData();
    }

    private handleExternalLinkClick = (url: string) => {
        
        if (this.hostNavigationService) {
            try {
                this.hostNavigationService.openNewWindow(url, "noopener,noreferrer");
            } catch (error) {
                // Fallback to window.open
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        } else {
            // Fallback: try to open in new window
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    render() {
        const { reportData, loading, error, filteredIssues, statusMessage } = this.state;
        
        const isShowingSampleData = reportData?.appName === 'Sample Application' || 
                                   reportData?.issues.some(i => i.id.startsWith('M'));

        if (loading) {
            return (
                <Card className="fortify-report-card">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>{statusMessage}</p>
                    </div>
                </Card>
            );
        }

        if (!reportData) {
            return (
                <Card className="fortify-report-card">
                    <div className="error-container">
                        <p>No report data available</p>
                        {error && <p style={{color: '#cc0000'}}>{error}</p>}
                    </div>
                </Card>
            );
        }

        const stats = {
            total: filteredIssues.length,
            critical: filteredIssues.filter(i => (i.folderName || i.severity) === 'Critical').length,
            high: filteredIssues.filter(i => (i.folderName || i.severity) === 'High').length,
            medium: filteredIssues.filter(i => (i.folderName || i.severity) === 'Medium').length,
            low: filteredIssues.filter(i => (i.folderName || i.severity) === 'Low').length
        };


        // Generate provider-specific title
        const getReportTitle = (): string => {
            if (!reportData || !reportData.provider) {
                return 'Opentext Application Security Report';
            }
            switch (reportData.provider.toLowerCase()) {
                case 'fod':
                    return 'Fortify on Demand Vulnerability Report';
                case 'ssc':
                    return 'Fortify SSC Vulnerability Report';
                default:
                    return 'Opentext Application Security Report';
            }
        };

        return (
            <Card className="fortify-report-card">
                <div className="fortify-report">
                    <div className="header">
                        <h2>{getReportTitle()}</h2>
                        <div className="app-info">
                            Application: {reportData.appName} - Version: {reportData.appVersion}
                            {this.state.config && this.state.config.projectVersionId && !isShowingSampleData && (
                                <span> (<a 
                                    href={generateProjectVersionUrl(this.state.config)} 
                                    target="_top" 
                                    rel="noopener noreferrer"
                                    style={{color: '#0078d4', textDecoration: 'none'}}
                                    title={`View project version in ${getProviderName(this.state.config.providerType)}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const url = generateProjectVersionUrl(this.state.config!);
                                        this.handleExternalLinkClick(url);
                                    }}
                                >View in {getProviderName(this.state.config.providerType)} ↗</a>)</span>
                            )} - 
                            Last Updated: {new Date(reportData.scanDate).toLocaleString()} - 
                            Total Issues: {reportData.totalCount}
                            {isShowingSampleData && <span style={{color: '#ff6b35', fontWeight: 'bold'}}> (SAMPLE DATA)</span>}
                        </div>
                        {error && <div className="error-banner">⚠️ {error}</div>}
                        {isShowingSampleData && (
                            <div className="error-banner">
                                📊 This report shows sample data. Live {reportData?.provider ? `Fortify ${reportData.provider === 'fod' ? 'on Demand' : 'SSC'}` : 'Fortify'} data was not available during the build.
                                Check the build logs for connection details.
                            </div>
                        )}
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
                            
                        </div>
                        <button onClick={this.handleRefresh} className="refresh-btn" disabled={loading}>
                            {loading ? 'Refreshing...' : 'Reload Data'}
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

                    <div style={{marginBottom: '20px', padding: '12px', background: '#f8f9fa', borderRadius: '6px', fontSize: '14px'}}>
                        <strong>Provider:</strong> {getProviderName(this.state.config?.providerType)}
                        {(this.state.config?.providerType || 'ssc') === 'ssc' && (
                            <><br /><strong>Classification:</strong> Security Auditor View (Fortify Default)</>
                        )}
                        <br />
                        <em>Issues are classified into Critical, High, Medium, and Low severity levels based on Fortify's security impact analysis.</em>
                    </div>
                    
                    <table className="issues-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Primary Location</th>
                                <th>Analysis Type</th>
                                <th>Severity</th>
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
                                        <td>{issue.category || issue.name || issue.issueName}</td>
                                        <td>
                                            {this.state.config && this.state.config.projectVersionId && !isShowingSampleData ? (
                                                <a
                                                    href={generateIssueUrl(this.state.config, issue)}
                                                    target="_top"
                                                    rel="noopener noreferrer"
                                                    style={{color: '#0078d4', textDecoration: 'none'}}
                                                    title={`View issue details in ${getProviderName(this.state.config?.providerType)}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const url = generateIssueUrl(this.state.config!, issue);
                                                        this.handleExternalLinkClick(url);
                                                    }}
                                                >
                                                    {issue.primaryLocation || 'Unknown Location'}
                                                </a>
                                            ) : (
                                                issue.primaryLocation || 'Unknown Location'
                                            )}
                                        </td>
                                        <td>{issue.kingdom || 'N/A'}</td>
                                        <td className={`severity-cell ${issue.folderName || issue.severity}`} style={{color: `#${issue.folderColor || this.getSeverityColor(issue.severity)}`}}>
                                            {issue.folderName || issue.severity}
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
        );
    }
}

export default FortifyReportPanel;