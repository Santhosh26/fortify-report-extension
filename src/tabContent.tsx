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

            // Try to find pre-fetched report data attachment
            const reportAttachment = attachments.find(a => a.name.includes('.report'));
            
            if (reportAttachment) {
                console.log("Fortify Report: Found pre-fetched report data attachment");
                const reportContent = await this.props.attachmentClient.getAttachmentContent(reportAttachment.name);
                const reportData: ReportData = JSON.parse(reportContent);
                
                console.log(`Fortify Report: Successfully loaded ${reportData.totalCount} issues from pre-fetched data`);
                
                this.setState({
                    reportData,
                    loading: false,
                    error: null,
                    filteredIssues: reportData.issues
                });
            } else {
                // No pre-fetched data found - this means the task couldn't fetch data
                console.warn("Fortify Report: No pre-fetched report data found, likely due to connection issues during build");
                const mockData = this.getMockData("No pre-fetched Fortify data available - there may have been connection issues during the build");
                this.setState({
                    reportData: mockData,
                    loading: false,
                    error: "No live data available - check the build logs for connection issues. Contact your administrator to verify Fortify SSC connectivity from the build agent.",
                    filteredIssues: mockData.issues
                });
            }
            
        } catch (error) {
            console.error("Fortify Report: Error loading report data", error);
            const mockData = this.getMockData(`Error loading report data: ${error instanceof Error ? error.message : String(error)}`);
            this.setState({
                reportData: mockData,
                loading: false,
                error: error instanceof Error ? error.message : String(error),
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
        // Since we're using pre-fetched data, just reload from attachments
        await this.loadReportData();
    }

    render() {
        const { reportData, loading, error, filteredIssues } = this.state;

        if (loading) {
            return (
                <Page>
                    <Card className="fortify-report-card">
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading Fortify report data...</p>
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

        // Check if we're showing mock data
        const isShowingMockData = reportData.appName === 'MockApp';

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
                                {isShowingMockData && <span style={{color: '#ff6b35', fontWeight: 'bold'}}> (MOCK DATA)</span>}
                            </div>
                            {error && <div className="error-banner">⚠️ {error}</div>}
                            {isShowingMockData && (
                                <div className="error-banner">
                                    📊 This report is showing sample data. Real Fortify SSC data was not available during the build. 
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