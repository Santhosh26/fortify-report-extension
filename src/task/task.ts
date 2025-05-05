import * as tl from 'azure-pipelines-task-lib/task';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

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

// Mapping functions to handle API response differences
function mapSeverityToString(severity: number): string {
    if (severity >= 5.0) return "Critical";
    if (severity >= 4.0) return "High";
    if (severity >= 2.5) return "Medium";
    return "Low";
}

function mapPriorityFromSeverity(severity: number): string {
    // Since priority is missing in the API, derive it from severity
    return mapSeverityToString(severity);
}

function mapConfidenceToString(confidence: number): string {
    if (confidence >= 4.0) return "High";
    if (confidence >= 2.5) return "Medium";
    return "Low";
}

function mapLikelihoodToString(likelihood: number): string {
    if (likelihood >= 0.7) return "Likely";
    if (likelihood >= 0.3) return "Possible";
    return "Unlikely";
}

async function run() {
    try {
        // Get task inputs
        const sscUrl = tl.getInput('sscUrl', true);
        const ciToken = tl.getInput('ciToken', true);
        const appName = tl.getInput('appName', true);
        const appVersion = tl.getInput('appVersion', true);

        if (!sscUrl || !ciToken || !appName || !appVersion) {
            tl.setResult(tl.TaskResult.Failed, 'Missing required inputs');
            return;
        }

        console.log(`DEBUG: Making request to: ${sscUrl}/api/v1/projects`);
        console.log(`DEBUG: Authorization header: FortifyToken ${ciToken}`);
        console.log(`DEBUG: Query params: q=name:${appName}, fields=id`);

        // Step 1: Get Application ID
        const appResponse = await axios.get(`${sscUrl}/api/v1/projects`, {
            headers: {
                'Authorization': `FortifyToken ${ciToken}`,
                'Accept': 'application/json'
            },
            params: {
                q: `name:${appName}`,
                fields: 'id'
            }
        });

        if (!appResponse.data.data || appResponse.data.data.length === 0) {
            tl.setResult(tl.TaskResult.Failed, `Application ${appName} not found`);
            return;
        }

        const appId = appResponse.data.data[0].id;
        console.log(`DEBUG: Found application ID: ${appId}`);

        // Step 2: Get Application Version ID
        const versionResponse = await axios.get(`${sscUrl}/api/v1/projectVersions`, {
            headers: {
                'Authorization': `FortifyToken ${ciToken}`,
                'Accept': 'application/json'
            },
            params: {
                q: `project.id:${appId},name:${appVersion}`,
                fields: 'id'
            }
        });

        if (!versionResponse.data.data || versionResponse.data.data.length === 0) {
            tl.setResult(tl.TaskResult.Failed, `Version ${appVersion} not found for application ${appName}`);
            return;
        }

        const versionId = versionResponse.data.data[0].id;
        console.log(`DEBUG: Found version ID: ${versionId}`);

        // Step 3: Get Issues
        const issuesResponse = await axios.get(`${sscUrl}/api/v1/projectVersions/${versionId}/issues`, {
            headers: {
                'Authorization': `FortifyToken ${ciToken}`,
                'Accept': 'application/json'
            },
            params: {
                limit: 500,
                fields: 'id,issueName,severity,priority,likelihood,confidence,category,kingdom,primaryLocation,lineNumber'
            }
        });

        console.log(`DEBUG: Raw issues response: ${JSON.stringify(issuesResponse.data, null, 2)}`);

        // Transform issues to our format with proper type conversion
        const issues: FortifyIssue[] = issuesResponse.data.data.map((issue: any) => ({
            id: issue.id.toString(),
            issueName: issue.issueName,
            severity: mapSeverityToString(issue.severity || 0),
            priority: issue.priority || mapPriorityFromSeverity(issue.severity || 0),
            likelihood: mapLikelihoodToString(issue.likelihood || 0),
            confidence: mapConfidenceToString(issue.confidence || 0),
            primaryLocation: issue.primaryLocation,
            lineNumber: issue.lineNumber || 0,
            kingdom: issue.kingdom || '',
            category: issue.category || issue.issueName  // Use issueName as fallback for category
        }));

        console.log(`DEBUG: Transformed issues: ${JSON.stringify(issues.slice(0, 3), null, 2)}`);

        // Save data for the report tab
        const reportData = {
            issues: issues,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString()
        };

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save report data
        const outputPath = path.join(outputDir, 'reportData.json');
        fs.writeFileSync(outputPath, JSON.stringify(reportData, null, 2));
        console.log(`DEBUG: Saved report data to: ${outputPath}`);

        // Save configuration for the tab
        const reportConfig = {
            dataPath: outputPath,
            appName: appName,
            appVersion: appVersion,
            scanDate: new Date().toISOString()
        };

        const configPath = path.join(outputDir, 'config.json');
        fs.writeFileSync(configPath, JSON.stringify(reportConfig, null, 2));
        console.log(`DEBUG: Saved config to: ${configPath}`);

        // Upload report data as build attachment
        const attachmentType = 'fortify-report';
        const attachmentName = 'reportData.json';
        
        // Upload data as attachment
        tl.addAttachment(attachmentType, attachmentName, outputPath);
        tl.addAttachment(attachmentType, 'config.json', configPath);

        // IMPORTANT: Pass data to the report tab via task variable
        tl.setVariable('FORTIFY_REPORT_DATA', JSON.stringify(reportData));
        console.log('DEBUG: Set FORTIFY_REPORT_DATA variable for report tab');

        console.log(`Successfully fetched ${issues.length} issues from Fortify SSC`);
        console.log(`DEBUG: Attachments added with type: ${attachmentType}`);
        tl.setResult(tl.TaskResult.Succeeded, `Found ${issues.length} issues`);

    } catch (error: any) {
        console.error(`ERROR: ${error.message}`);
        if (error.response) {
            console.log(`ERROR status: ${error.response.status}`);
            console.log(`ERROR data: ${JSON.stringify(error.response.data, null, 2)}`);
            console.log(`ERROR headers: ${JSON.stringify(error.response.headers, null, 2)}`);
        } else if (error.request) {
            console.log(`ERROR: No response received: ${error.request}`);
        } else {
            console.log(`ERROR: ${error.message}`);
            console.log(`ERROR stack: ${error.stack}`);
        }
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

run();