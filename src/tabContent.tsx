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
    debugInfo: string[]
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
            config: null,
            debugInfo: []
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

    private addDebugInfo(message: string) {
        console.log(`DEBUG: ${message}`);
        this.setState(prevState => ({
            debugInfo: [...prevState.debugInfo, message]
        }));
    }

    private async loadReportData() {
        this.addDebugInfo("Starting loadReportData (Security Auditor View)");
        
        if (!this.props.attachmentClient) {
            this.addDebugInfo("No attachment client available");
            this.setState({
                reportData: this.getMockData("No attachment client available"),
                loading: false,
                error: "Could not load build attachments - using mock data",
                filteredIssues: [],
                config: null
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
            this.addDebugInfo(`Found ${attachments.length} attachments`);
            
            // Log all attachment names for debugging
            attachments.forEach((att, index) => {
                this.addDebugInfo(`Attachment ${index}: ${att.name}`);
            });
            
            // Find the configuration attachment
            const configAttachment = attachments.find(a => a.name.includes('.config'));
            
            if (!configAttachment) {
                throw new Error("Fortify configuration attachment not found");
            }

            this.addDebugInfo(`Found config attachment: ${configAttachment.name}`);
            const configContent = await this.props.attachmentClient.getAttachmentContent(configAttachment.name);
            const config: FortifyConfig = JSON.parse(configContent);
            
            this.addDebugInfo(`Loaded configuration for ${config.appName} v${config.appVersion}`);
            this.setState({ config });

            // Try to find pre-fetched report data attachment
            const reportAttachment = attachments.find(a => a.name.includes('.report'));
            
            if (reportAttachment) {
                this.addDebugInfo(`Found report attachment: ${reportAttachment.name}`);
                const reportContent = await this.props.attachmentClient.getAttachmentContent(reportAttachment.name);
                
                this.addDebugInfo(`Report content length: ${reportContent.length} characters`);
                this.addDebugInfo(`Report content preview: ${reportContent.substring(0, 200)}...`);
                
                const reportData: ReportData = JSON.parse(reportContent);
                
                this.addDebugInfo(`Successfully parsed report data: ${reportData.totalCount} issues`);

                // Check issue folderGuid data
                const sampleIssues = reportData.issues.slice(0, 5);
                this.addDebugInfo(`Sample issue classification:`);
                sampleIssues.forEach(issue => {
                    this.addDebugInfo(`   - ${issue.category}: ${issue.folderName} (${issue.folderGuid})`);
                });
                
                this.setState({
                    reportData,
                    loading: false,
                    error: null,
                    filteredIssues: reportData.issues
                });
            } else {
                this.addDebugInfo("No report attachment found - this means the task couldn't fetch data");
                const mockData = this.getMockData("No pre-fetched Fortify data available - there may have been connection issues during the build");
                this.setState({
                    reportData: mockData,
                    loading: false,
                    error: "No live data available - check the build logs for connection issues. Contact your administrator to verify Fortify SSC connectivity from the build agent.",
                    filteredIssues: mockData.issues
                });
            }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.addDebugInfo(`Error loading report data: ${errorMessage}`);
            console.error("Fortify Report: Error loading report data", error);
            const mockData = this.getMockData(`Error loading report data: ${errorMessage}`);
            this.setState({
                reportData: mockData,
                loading: false,
                error: errorMessage,
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
                    category: 'A1-Injection',
                    folderGuid: 'b968f72f-cc12-03b5-976e-ad4c13920c21',
                    folderId: 1,
                    folderName: 'Critical',
                    folderColor: 'ed1c24'
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
                    category: 'A7-XSS',
                    folderGuid: '5b50bb77-071d-08ed-fdba-1213fa90ac5a',
                    folderId: 2,
                    folderName: 'High',
                    folderColor: 'ff7800'
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
                    category: 'Password Management',
                    folderGuid: 'd5f55910-5f0d-a775-e91f-191d1f5608a4',
                    folderId: 3,
                    folderName: 'Medium',
                    folderColor: 'f6aa58'
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

        // Filter by severity (folder name)
        if (this.state.severityFilter) {
            filteredIssues = filteredIssues.filter(issue => issue.folderName === this.state.severityFilter);
        }
        
        // Filter by priority (folder name)  
        if (this.state.priorityFilter) {
            filteredIssues = filteredIssues.filter(issue => issue.folderName === this.state.priorityFilter);
        }

        this.setState({ filteredIssues });
    }

    private handleRefresh = async () => {
        await this.loadReportData();
    }

    render() {
        const { reportData, loading, error, filteredIssues, debugInfo } = this.state;

        if (loading) {
            return (
                <Page>
                    <Card className="fortify-report-card">
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading Fortify Security Auditor report...</p>
                            {debugInfo.length > 0 && (
                                <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
                                    <strong>Debug Info:</strong>
                                    <ul style={{textAlign: 'left', maxHeight: '200px', overflow: 'auto'}}>
                                        {debugInfo.map((info, index) => (
                                            <li key={index}>{info}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
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
                            {debugInfo.length > 0 && (
                                <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
                                    <strong>Debug Info:</strong>
                                    <ul style={{textAlign: 'left'}}>
                                        {debugInfo.map((info, index) => (
                                            <li key={index}>{info}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Card>
                </Page>
            );
        }

        const stats = {
            total: filteredIssues.length,
            critical: filteredIssues.filter(i => i.folderName === 'Critical').length,
            high: filteredIssues.filter(i => i.folderName === 'High').length,
            medium: filteredIssues.filter(i => i.folderName === 'Medium').length,
            low: filteredIssues.filter(i => i.folderName === 'Low').length
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
                                Total Issues: {reportData.totalCount} - 
                                Classification: Security Auditor View
                                {isShowingMockData && <span style={{color: '#ff6b35', fontWeight: 'bold'}}> (MOCK DATA)</span>}
                            </div>
                            {error && <div className="error-banner">⚠️ {error}</div>}
                            {isShowingMockData && (
                                <div className="error-banner">
                                    📊 This report is showing sample data. Real Fortify SSC data was not available during the build. 
                                    Check the build logs for connection details.
                                </div>
                            )}

                            {debugInfo.length > 0 && (
                                <details style={{marginTop: '10px'}}>
                                    <summary style={{cursor: 'pointer', fontSize: '12px', color: '#666'}}>
                                        Show Debug Information ({debugInfo.length} items)
                                    </summary>
                                    <div style={{marginTop: '10px', fontSize: '11px', color: '#666', maxHeight: '150px', overflow: 'auto', background: '#f8f9fa', padding: '10px', borderRadius: '4px'}}>
                                        {debugInfo.map((info, index) => (
                                            <div key={index}>{info}</div>
                                        ))}
                                    </div>
                                </details>
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

                        {/* Show Security Auditor View info */}
                        <div style={{marginBottom: '20px', padding: '12px', background: '#f8f9fa', borderRadius: '6px', fontSize: '14px'}}>
                            <strong>Classification:</strong> Security Auditor View (Fortify Default)
                            <br />
                            <em>Issues are classified into Critical, High, Medium, and Low folders based on Fortify's impact, accuracy, probability, and confidence values.</em>
                        </div>

                        {/* Show sample folderGuid mapping for debugging */}
                        {!isShowingMockData && filteredIssues.length > 0 && (
                            <details style={{marginBottom: '20px'}}>
                                <summary style={{cursor: 'pointer', fontSize: '12px', color: '#666'}}>
                                    Show Sample Issue Classification (for debugging)
                                </summary>
                                <div style={{fontSize: '11px', color: '#666', background: '#f8f9fa', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
                                    {filteredIssues.slice(0, 5).map(issue => (
                                        <div key={issue.id}>
                                            {issue.category}: folderGuid="{issue.folderGuid}" → {issue.folderName} (#{issue.folderColor})
                                        </div>
                                    ))}
                                    {filteredIssues.filter(i => !i.folderGuid || i.folderName === 'Unknown').length > 0 && (
                                        <div style={{color: '#cc0000', fontWeight: 'bold'}}>
                                            ⚠️ {filteredIssues.filter(i => !i.folderGuid || i.folderName === 'Unknown').length} issues have missing or unknown classification!
                                        </div>
                                    )}
                                </div>
                            </details>
                        )}
                        
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
                                            <td className={`priority-cell ${issue.folderName}`} style={{color: `#${issue.folderColor}`}}>
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
            </Page>
        );
    }
}

export default FortifyReportPanel;