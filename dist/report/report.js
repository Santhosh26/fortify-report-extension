"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDK = __importStar(require("azure-devops-extension-sdk"));
let reportData = null;
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        yield SDK.init();
        try {
            // Try to get data from task variable first
            const reportDataValue = (_c = (_b = (_a = SDK.getConfiguration().context.inputs) === null || _a === void 0 ? void 0 : _a.env) === null || _b === void 0 ? void 0 : _b.variables) === null || _c === void 0 ? void 0 : _c.FORTIFY_REPORT_DATA;
            if (reportDataValue) {
                reportData = JSON.parse(reportDataValue);
                console.log("Loaded data from task variable");
            }
            else {
                console.log("No data found, using mock data");
                reportData = getMockData();
            }
            yield displayReport();
            setupEventListeners();
        }
        catch (error) {
            console.error('Initialization error:', error);
            reportData = getMockData();
            displayReport();
            setupEventListeners();
        }
    });
}
function loadReportData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = SDK.getConfiguration();
            let data = config.data;
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
        }
        catch (error) {
            console.error('Failed to load report data:', error);
            reportData = getMockData();
        }
    });
}
function displayReport() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            showLoading(true);
            if (reportData) {
                renderReport(reportData);
            }
            else {
                reportData = getMockData();
                renderReport(reportData);
            }
            showLoading(false);
        }
        catch (error) {
            showError('Failed to load report data');
            showLoading(false);
        }
    });
}
function renderReport(data) {
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
function updateStats(issues) {
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
    if (totalElem)
        totalElem.textContent = stats.total.toString();
    if (criticalElem)
        criticalElem.textContent = stats.critical.toString();
    if (highElem)
        highElem.textContent = stats.high.toString();
    if (mediumElem)
        mediumElem.textContent = stats.medium.toString();
    if (lowElem)
        lowElem.textContent = stats.low.toString();
}
function renderIssuesTable(issues) {
    const tbody = document.getElementById('issues-tbody');
    if (!tbody)
        return;
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
function createTag(text, className) {
    const tag = document.createElement('span');
    tag.className = `tag ${className}`;
    tag.textContent = text;
    return tag;
}
function setupEventListeners() {
    var _a;
    // Refresh button
    (_a = document.getElementById('refresh-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', displayReport);
    // Filters
    const severityFilter = document.getElementById('severity-filter');
    const priorityFilter = document.getElementById('priority-filter');
    [severityFilter, priorityFilter].forEach(filter => {
        filter === null || filter === void 0 ? void 0 : filter.addEventListener('change', applyFilters);
    });
}
function applyFilters() {
    if (!reportData)
        return;
    const severityFilter = document.getElementById('severity-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
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
function showLoading(show) {
    const loading = document.getElementById('loading');
    const issuesTable = document.getElementById('issues-table');
    if (loading && issuesTable) {
        loading.style.display = show ? 'block' : 'none';
        issuesTable.style.display = show ? 'none' : 'table';
    }
}
function showError(message) {
    const error = document.getElementById('error');
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}
// Mock data for testing
function getMockData() {
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
