import * as SDK from "azure-devops-extension-sdk";

interface ReportConfiguration {
    dataPath: string;
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
    await SDK.init();
    
    try {
        // Get the configuration
        const config = SDK.getConfiguration();
        
        // Check if we have build context
        if (config.context) {
            await loadReportData();
        } else {
            console.log("No context found, using mock data");
            reportData = getMockData();
        }
        
        await displayReport();
        setupEventListeners();
    } catch (error) {
        console.error('Initialization error:', error);
        reportData = getMockData();
        displayReport();
        setupEventListeners();
    }
}

async function loadReportData(): Promise<void> {
    try {
        const config = SDK.getConfiguration();
        let data = config.data as ReportData | undefined;
        
        // Try to get data from configuration first
        if (data) {
            reportData = data;
            console.log("Loaded data from configuration");
            return;
        }
        
        // If no data in config, we need to fetch from attachments
        // This would require additional setup with VSS service references
        reportData = getMockData();
        console.log("No data found, using mock data");
        
    } catch (error) {
        console.error('Failed to load report data:', error);
        reportData = getMockData();
    }
}

async function displayReport() {
    try {
        showLoading(true);
        
        if (reportData) {
            renderReport(reportData);
        } else {
            reportData = getMockData();
            renderReport(reportData);
        }
        
        showLoading(false);
    } catch (error) {
        showError('Failed to load report data');
        showLoading(false);
    }
}

function renderReport(data: ReportData) {
    // Update app info
    const appInfo = document.getElementById('app-info');
    if (appInfo) {
        appInfo.textContent = `Application: ${data.appName} - Version: ${data.appVersion} - Scan Date: ${new Date(data.scanDate).toLocaleDateString()}`;
    }
    
    // Update stats
    updateStats(data.issues);
    
    // Render issues table
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
    
    const totalElem = document.getElementById('total-issues');
    const criticalElem = document.getElementById('critical-issues');
    const highElem = document.getElementById('high-issues');
    const mediumElem = document.getElementById('medium-issues');
    const lowElem = document.getElementById('low-issues');
    
    if (totalElem) totalElem.textContent = stats.total.toString();
    if (criticalElem) criticalElem.textContent = stats.critical.toString();
    if (highElem) highElem.textContent = stats.high.toString();
    if (mediumElem) mediumElem.textContent = stats.medium.toString();
    if (lowElem) lowElem.textContent = stats.low.toString();
}

function renderIssuesTable(issues: FortifyIssue[]) {
    const tbody = document.getElementById('issues-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    issues.forEach(issue => {
        const row = document.createElement('tr');
        
        // Category
        const categoryCell = document.createElement('td');
        categoryCell.textContent = issue.category || issue.issueName;
        row.appendChild(categoryCell);
        
        // Primary Location
        const locationCell = document.createElement('td');
        locationCell.textContent = `${issue.primaryLocation}:${issue.lineNumber}`;
        row.appendChild(locationCell);
        
        // Analysis Type
        const analysisCell = document.createElement('td');
        analysisCell.textContent = 'SCA'; // Static Code Analysis
        row.appendChild(analysisCell);
        
        // Priority
        const priorityCell = document.createElement('td');
        priorityCell.textContent = issue.priority;
        priorityCell.className = `priority-cell ${issue.priority}`;
        row.appendChild(priorityCell);
        
        // Tagged
        const tagCell = document.createElement('td');
        tagCell.className = 'tag-cell';
        
        // Add tags based on issue characteristics
        if (issue.likelihood === 'Likely' || issue.confidence === 'High') {
            const exploitableTag = createTag('Exploitable', 'exploitable');
            tagCell.appendChild(exploitableTag);
        }
        
        if (issue.confidence === 'Low') {
            const suspiciousTag = createTag('Suspicious', 'suspicious');
            tagCell.appendChild(suspiciousTag);
        }
        
        row.appendChild(tagCell);
        tbody.appendChild(row);
    });
}

function createTag(text: string, className: string): HTMLSpanElement {
    const tag = document.createElement('span');
    tag.className = `tag ${className}`;
    tag.textContent = text;
    return tag;
}

function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn')?.addEventListener('click', displayReport);
    
    // Filters
    const severityFilter = document.getElementById('severity-filter') as HTMLSelectElement;
    const priorityFilter = document.getElementById('priority-filter') as HTMLSelectElement;
    
    [severityFilter, priorityFilter].forEach(filter => {
        filter?.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    if (!reportData) return;
    
    const severityFilter = (document.getElementById('severity-filter') as HTMLSelectElement).value;
    const priorityFilter = (document.getElementById('priority-filter') as HTMLSelectElement).value;
    
    let filteredIssues = reportData.issues;
    
    if (severityFilter) {
        filteredIssues = filteredIssues.filter(issue => issue.severity === severityFilter);
    }
    
    if (priorityFilter) {
        filteredIssues = filteredIssues.filter(issue => issue.priority === priorityFilter);
    }
    
    renderIssuesTable(filteredIssues);
    updateStats(filteredIssues);
}

function showLoading(show: boolean) {
    const loading = document.getElementById('loading');
    const issuesTable = document.getElementById('issues-table');
    
    if (loading && issuesTable) {
        loading.style.display = show ? 'block' : 'none';
        issuesTable.style.display = show ? 'none' : 'table';
    }
}

function showError(message: string) {
    const error = document.getElementById('error');
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}

// Mock data for testing
function getMockData(): ReportData {
    return {
        issues: [
            {
                id: '1',
                issueName: 'HTML5: Missing Framing Protection',
                severity: 'High',
                priority: 'Critical',
                likelihood: 'Likely',
                confidence: 'High',
                primaryLocation: 'src/main/java/com/mic...onfiguration.java',
                lineNumber: 148,
                kingdom: 'Security',
                category: 'HTML5'
            },
            {
                id: '2',
                issueName: 'Cross-Site Scripting: Persistent',
                severity: 'High',
                priority: 'Critical',
                likelihood: 'Likely',
                confidence: 'Medium',
                primaryLocation: 'src/main/java/com/mic...erController.java',
                lineNumber: 131,
                kingdom: 'Input Validation',
                category: 'XSS'
            }
        ],
        appName: 'TestApp',
        appVersion: '1.0.0',
        scanDate: new Date().toISOString()
    };
}

// Initialize the extension
initialize();