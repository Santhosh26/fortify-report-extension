// src/report/report.ts
import * as SDK from "azure-devops-extension-sdk";
import { getClient } from "azure-devops-extension-api";
import { BuildRestClient } from "azure-devops-extension-api/Build"; 

// Define our own interface for attachments to match the actual API
interface AttachmentResponse {
    name: string;
    recordId: string;
    timelineId: string;
    _links: any;
    [key: string]: any; // Allow any other properties that might exist
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
}

let reportData: ReportData | null = null;

async function initialize() {
    await SDK.init({ loaded: false }); // Manual notification for load status
    await SDK.ready();
    console.log("Fortify Report Tab: SDK initialized and ready.");

    try {
        await loadReportData(); // This will set global reportData or use mock data
        
        if (reportData) { // Ensure reportData is populated (either real or mock)
            await displayReport();
            setupEventListeners();
            SDK.notifyLoadSucceeded();
            console.log("Fortify Report Tab: Load succeeded.");
        } else {
            // This case should ideally be handled within loadReportData by setting mock data
            // and calling notifyLoadFailed if truly unrecoverable.
            // However, as a fallback:
            showError("Critical error: Report data could not be initialized.");
            SDK.notifyLoadFailed("Critical error: Report data initialization failed.");
            console.error("Fortify Report Tab: Load failed - reportData is null after loadReportData.");
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Fortify Report Tab: Initialization error:', errorMessage, error);
        showError(`Initialization error: ${errorMessage}`);
        // Attempt to display mock data even on initialization error if possible
        try {
            reportData = getMockData(`Initialization error: ${errorMessage}`);
            await displayReport(); // displayReport now handles null reportData gracefully
            setupEventListeners(); // Setup event listeners for mock data interaction
        } catch (displayError) {
            const displayErrorMessage = displayError instanceof Error ? displayError.message : String(displayError);
            console.error('Fortify Report Tab: Error displaying mock data after init failure:', displayErrorMessage);
            showError(`Initialization failed: ${errorMessage}. Mock data display also failed: ${displayErrorMessage}`);
        }
        SDK.notifyLoadFailed(`Initialization error: ${errorMessage}`);
    }
}

async function loadReportData(): Promise<void> {
    try {
        const webContext = SDK.getWebContext();
        const projectId = webContext.project.id;
        
        // Get build information from SDK.getConfiguration() as webContext.build might be for the overall page context
        const config = SDK.getConfiguration();
        const build = config.build;

        if (!build || !build.id) {
            console.warn("Fortify Report Tab: Build context or Build ID not available. Using mock data.");
            reportData = getMockData("Build context/ID not available.");
            // No need to call notifyLoadFailed here, initialize will handle it based on reportData
            return;
        }
        const buildId = build.id;
        console.log(`Fortify Report Tab: ProjectId: ${projectId}, BuildId: ${buildId}`);

        const buildClient = getClient(BuildRestClient);
        const attachmentType = 'fortify-report'; // Must match the type used in tl.addAttachment in the task

        console.log(`Fortify Report Tab: Fetching attachments for Type: ${attachmentType}`);
        // Use any type and then cast to our interface to avoid TypeScript errors
        const attachments = await buildClient.getAttachments(projectId, buildId, attachmentType) as AttachmentResponse[];

        if (attachments && attachments.length > 0) {
            console.log(`Fortify Report Tab: Found ${attachments.length} attachments of type '${attachmentType}'.`);
            attachments.forEach((att, index) => {
                console.log(`Fortify Report Tab: Attachment ${index}: Name: ${att.name}, RecordId: ${att.recordId}, TimelineId: ${att.timelineId}, Links: ${JSON.stringify(att._links)}`);
            });

            const reportDataAttachment = attachments.find(a => a.name === 'reportData.json');

            if (reportDataAttachment) {
                console.log(`Fortify Report Tab: Found 'reportData.json' attachment. RecordId: ${reportDataAttachment.recordId}, TimelineId: ${reportDataAttachment.timelineId}`);
                
                if (!reportDataAttachment.recordId || !reportDataAttachment.timelineId) {
                    console.error("Fortify Report Tab: 'reportData.json' attachment is missing recordId or timelineId.", reportDataAttachment);
                    reportData = getMockData("Attachment 'reportData.json' is invalid (missing record/timeline ID).");
                    return;
                }

                const attachmentContent: ArrayBuffer = await buildClient.getAttachment(
                    projectId,
                    buildId,
                    reportDataAttachment.timelineId,
                    reportDataAttachment.recordId,
                    attachmentType,
                    reportDataAttachment.name
                );

                const content = new TextDecoder().decode(attachmentContent);
                reportData = JSON.parse(content);
                console.log("Fortify Report Tab: Successfully loaded and parsed data from attachment:", reportDataAttachment.name);
                return; // Successfully loaded
            } else {
                console.warn("Fortify Report Tab: 'reportData.json' not found among attachments. Using mock data.");
                reportData = getMockData("Attachment 'reportData.json' not found.");
            }
        } else {
            console.warn(`Fortify Report Tab: No attachments found for type '${attachmentType}'. Using mock data.`);
            reportData = getMockData(`No attachments of type '${attachmentType}' found.`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Fortify Report Tab: Failed to load report data from attachment:', errorMessage, error);
        reportData = getMockData(`Failed to load report from attachment: ${errorMessage}`);
    }
}

async function displayReport() {
    showLoading(true);

    if (!reportData) {
        console.warn("Fortify Report Tab: displayReport called but reportData is null. Attempting to use fresh mock data.");
        // This is a fallback, ideally loadReportData should always set reportData (even if mock)
        reportData = getMockData("Report data was unexpectedly null during display.");
        showError("Report data was not available. Displaying placeholder data.");
    }
    
    // At this point, reportData should be non-null (either real or mock)
    renderReport(reportData);
    showLoading(false);
    console.log("Fortify Report Tab: Report displayed.");
}

function renderReport(data: ReportData) {
    const appInfoEl = document.getElementById('app-info');
    if (appInfoEl) {
        appInfoEl.textContent = `Application: ${data.appName} - Version: ${data.appVersion} - Scan Date: ${new Date(data.scanDate).toLocaleDateString()}`;
    }

    updateStats(data.issues);
    renderIssuesTable(data.issues);
}

function updateStats(issues: FortifyIssue[]) {
    const stats = {
        total: issues.length,
        critical: issues.filter(i => i.priority === 'Critical').length,
        high: issues.filter(i => i.priority === 'High').length,
        medium: issues.filter(i => i.priority === 'Medium').length,
        low: issues.filter(i => i.priority === 'Low').length
    };

    document.getElementById('total-issues')!.textContent = stats.total.toString();
    document.getElementById('critical-issues')!.textContent = stats.critical.toString();
    document.getElementById('high-issues')!.textContent = stats.high.toString();
    document.getElementById('medium-issues')!.textContent = stats.medium.toString();
    document.getElementById('low-issues')!.textContent = stats.low.toString();
}

function renderIssuesTable(issues: FortifyIssue[]) {
    const tbody = document.getElementById('issues-tbody') as HTMLTableSectionElement;
    if (!tbody) {
        console.error("Fortify Report Tab: Issues table body 'issues-tbody' not found.");
        return;
    }

    tbody.innerHTML = ''; // Clear existing rows

    if (issues.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5; // Span across all columns
        cell.textContent = "No issues found matching the current criteria.";
        cell.style.textAlign = "center";
        return;
    }

    issues.forEach(issue => {
        const row = tbody.insertRow();

        row.insertCell().textContent = issue.category || issue.issueName;
        row.insertCell().textContent = `${issue.primaryLocation}:${issue.lineNumber}`;
        row.insertCell().textContent = issue.kingdom || 'N/A'; // Using kingdom for Analysis Type, adjust if needed
        
        const priorityCell = row.insertCell();
        priorityCell.textContent = issue.priority;
        priorityCell.className = `priority-cell ${issue.priority}`;
        
        const tagCell = row.insertCell();
        tagCell.className = 'tag-cell';
        if (issue.likelihood === 'Likely' || issue.confidence === 'High') {
            tagCell.appendChild(createTag('Exploitable', 'exploitable'));
        }
        if (issue.confidence === 'Low') { // Or other criteria for "Suspicious"
            tagCell.appendChild(createTag('Suspicious', 'suspicious'));
        }
    });
}

function createTag(text: string, className: string): HTMLSpanElement {
    const tag = document.createElement('span');
    tag.className = `tag ${className}`;
    tag.textContent = text;
    return tag;
}

function setupEventListeners() {
    document.getElementById('refresh-btn')?.addEventListener('click', async () => {
        console.log("Fortify Report Tab: Refresh button clicked.");
        // Re-fetch and display. loadReportData will update global 'reportData'.
        await loadReportData(); 
        await displayReport(); 
    });

    const severityFilter = document.getElementById('severity-filter') as HTMLSelectElement;
    const priorityFilter = document.getElementById('priority-filter') as HTMLSelectElement;

    [severityFilter, priorityFilter].forEach(filter => {
        filter?.addEventListener('change', applyFilters);
    });
    console.log("Fortify Report Tab: Event listeners set up.");
}

function applyFilters() {
    if (!reportData) {
        console.warn("Fortify Report Tab: applyFilters called but reportData is null.");
        showError("Cannot apply filters: report data is not loaded.");
        return;
    }
    console.log("Fortify Report Tab: Applying filters...");

    const severityFilterValue = (document.getElementById('severity-filter') as HTMLSelectElement).value;
    const priorityFilterValue = (document.getElementById('priority-filter') as HTMLSelectElement).value;

    let filteredIssues = reportData.issues;

    if (severityFilterValue) {
        filteredIssues = filteredIssues.filter(issue => issue.severity === severityFilterValue);
    }
    if (priorityFilterValue) {
        filteredIssues = filteredIssues.filter(issue => issue.priority === priorityFilterValue);
    }

    renderIssuesTable(filteredIssues);
    updateStats(filteredIssues); // Update stats based on filtered issues
}

function showLoading(show: boolean) {
    const loadingEl = document.getElementById('loading');
    const issuesTableEl = document.getElementById('issues-table');
    const controlsEl = document.querySelector('.controls') as HTMLElement; // More specific selector
    const statsSummaryEl = document.getElementById('stats-summary');


    if (loadingEl) loadingEl.style.display = show ? 'block' : 'none';
    if (issuesTableEl) issuesTableEl.style.display = show ? 'none' : 'table';
    if (controlsEl) controlsEl.style.display = show ? 'none' : 'flex'; // Assuming controls are flex
    if (statsSummaryEl) statsSummaryEl.style.display = show ? 'none' : 'flex'; // Assuming stats are flex
}

function showError(message: string) {
    const errorEl = document.getElementById('error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
    console.error("Fortify Report Tab: UI Error Displayed - ", message);
}

// Mock data for testing and fallback
function getMockData(reason: string = "Using mock data as fallback."): ReportData {
    console.warn(`Fortify Report Tab: Providing mock data. Reason: ${reason}`);
    return {
        issues: [
            { id: 'M1', issueName: 'Mock Issue: SQL Injection', severity: 'Critical', priority: 'Critical', likelihood: 'Likely', confidence: 'High', primaryLocation: 'mock/Login.java', lineNumber: 101, kingdom: 'Input Validation', category: 'A1-Injection' },
            { id: 'M2', issueName: 'Mock Issue: XSS Basic', severity: 'High', priority: 'High', likelihood: 'Possible', confidence: 'Medium', primaryLocation: 'mock/Profile.jsp', lineNumber: 55, kingdom: 'Environment', category: 'A7-XSS' },
            { id: 'M3', issueName: 'Mock Issue: Weak Hashing', severity: 'Medium', priority: 'Medium', likelihood: 'Unlikely', confidence: 'Low', primaryLocation: 'mock/utils/Crypto.cs', lineNumber: 23, kingdom: 'Security Features', category: 'Password Management' }
        ],
        appName: 'MockApp',
        appVersion: '0.0.0',
        scanDate: new Date().toISOString()
    };
}

// Initialize the extension
initialize();