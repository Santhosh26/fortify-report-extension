import "./tabContent.scss"

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as SDK from "azure-devops-extension-sdk"

import { getClient } from "azure-devops-extension-api"
import { Build, BuildRestClient, Attachment } from "azure-devops-extension-api/Build"

import { ObservableValue, ObservableObject } from "azure-devops-ui/Core/Observable"
import { Observer } from "azure-devops-ui/Observer"
import { Card } from "azure-devops-ui/Card"

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
    friority?: number;
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

SDK.init()
SDK.ready().then(() => {
    try {
        const config = SDK.getConfiguration()
        config.onBuildChanged((build: Build) => {
            let buildAttachmentClient = new BuildAttachmentClient(build)
            buildAttachmentClient.init().then(() => {
                displayReports(buildAttachmentClient)
            }).catch(error => {
                console.error("Failed to initialize attachment client:", error);
                displayReports(null);
            })
        })
    } catch(error) {
        console.error("SDK initialization error:", error);
        displayReports(null);
    }
}).catch(error => {
    console.error("SDK ready failed:", error);
    displayReports(null);
})

function displayReports(attachmentClient: AttachmentClient | null) {
    try {
        const container = document.getElementById("fortify-report-container");
        if (!container) {
            console.error("Container element not found");
            return;
        }
        
        ReactDOM.render(
            <FortifyReportPanel attachmentClient={attachmentClient} />, 
            container
        );
        
    } catch (error) {
        console.error("Error in displayReports:", error);
        
        // Fallback error display
        const container = document.getElementById("fortify-report-container");
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; text-align: center; color: red;">
                    <h3>Fortify Report Error</h3>
                    <p>Failed to load the Fortify report: ${error instanceof Error ? error.message : String(error)}</p>
                    <p>Check the browser console for more details.</p>
                </div>
            `;
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

class FortifyReportPanel extends React.Component<FortifyReportPanelProps, FortifyReportPanelState> {

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

    componentDidMount() {
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
            
            this.setState({ config, statusMessage: `Loading data for ${config.appName} v${config.appVersion}...` });

            // Try to find pre-fetched report data attachment
            const reportAttachment = attachments.find(a => a.name.includes('.report'));
            
            if (reportAttachment) {
                const reportContent = await this.props.attachmentClient.getAttachmentContent(reportAttachment.name);
                const reportData: ReportData = JSON.parse(reportContent);
                
                this.setState({
                    reportData,
                    loading: false,
                    error: null,
                    filteredIssues: reportData.issues,
                    statusMessage: `Loaded ${reportData.totalCount} issues`
                });
            } else {
                console.warn("No report attachment found - data not available from build task");
                const mockData = this.getMockData("No live data available from Fortify SSC");
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
            console.error("Error loading report data:", error);
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

    private getMockData(reason: string): ReportData {
        return {
            issues: [
                { 
                    id: 'M1', 
                    issueName: 'SQL Injection', 
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
                    folderColor: 'ed1c24'
                },
                { 
                    id: 'M2', 
                    issueName: 'Cross-Site Scripting', 
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
                    folderColor: 'ff7800'
                },
                { 
                    id: 'M3', 
                    issueName: 'Weak Cryptographic Hash', 
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
                    folderColor: 'f6aa58'
                }
            ],
            appName: 'Sample Application',
            appVersion: '1.0.0',
            scanDate: new Date().toISOString(),
            totalCount: 3
        };
    }

    private handleSeverityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const severityFilter = event.target.value;
        this.setState({ severityFilter }, this.applyFilters);
    }


    private applyFilters = () => {
        if (!this.state.reportData) return;

        let filteredIssues = this.state.reportData.issues;

        // Filter by severity (folder name)
        if (this.state.severityFilter) {
            filteredIssues = filteredIssues.filter(issue => issue.folderName === this.state.severityFilter);
        }
        

        this.setState({ filteredIssues });
    }

    private handleRefresh = async () => {
        await this.loadReportData();
    }

    render() {
        const { reportData, loading, error, filteredIssues, statusMessage } = this.state;

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
            critical: filteredIssues.filter(i => i.folderName === 'Critical').length,
            high: filteredIssues.filter(i => i.folderName === 'High').length,
            medium: filteredIssues.filter(i => i.folderName === 'Medium').length,
            low: filteredIssues.filter(i => i.folderName === 'Low').length
        };

        // Check if we're showing sample/mock data
        const isShowingSampleData = reportData.appName === 'Sample Application' || 
                                   reportData.issues.some(i => i.id.startsWith('M'));

        return (
            <Card className="fortify-report-card">
                <div className="fortify-report">
                    <div className="header">
                        <h2>Fortify SSC Vulnerability Report</h2>
                        <div className="app-info">
                            Application: {reportData.appName} - Version: {reportData.appVersion} - 
                            Last Updated: {new Date(reportData.scanDate).toLocaleString()} - 
                            Total Issues: {reportData.totalCount}
                            {isShowingSampleData && <span style={{color: '#ff6b35', fontWeight: 'bold'}}> (SAMPLE DATA)</span>}
                        </div>
                        {error && <div className="error-banner">⚠️ {error}</div>}
                        {isShowingSampleData && (
                            <div className="error-banner">
                                📊 This report shows sample data. Live Fortify SSC data was not available during the build. 
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
                        <strong>Classification:</strong> Security Auditor View (Fortify Default)
                        <br />
                        <em>Issues are classified into Critical, High, Medium, and Low folders based on Fortify's security impact analysis.</em>
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
                                        <td>{issue.category || issue.issueName}</td>
                                        <td>{issue.primaryLocation}:{issue.lineNumber}</td>
                                        <td>{issue.kingdom || 'N/A'}</td>
                                        <td className={`severity-cell ${issue.folderName}`} style={{color: `#${issue.folderColor}`}}>
                                            {issue.folderName}
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