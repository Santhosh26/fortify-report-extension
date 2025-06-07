import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

interface FortifyConfig {
    sscUrl: string;
    ciToken: string;
    appName: string;
    appVersion: string;
    timestamp: string;
    buildId?: string;
    projectId?: string;
}

interface FortifyValidationResult {
    success: boolean;
    applicationId?: string;
    versionId?: string;
    error?: string;
}

class FortifySSCValidator {
    private sscUrl: string;
    private ciToken: string;

    constructor(sscUrl: string, ciToken: string) {
        this.sscUrl = sscUrl.replace(/\/$/, ''); // Remove trailing slash
        this.ciToken = ciToken;
    }

    public async validateConnection(): Promise<FortifyValidationResult> {
        try {
            console.log('Validating Fortify SSC connection...');
            
            // Test basic connectivity to SSC
            const testUrl = `${this.sscUrl}/api/v1/info`;
            const response = await this.makeRequest(testUrl);
            
            if (!response) {
                return { success: false, error: 'Unable to connect to Fortify SSC' };
            }

            console.log('✓ Successfully connected to Fortify SSC');
            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(`✗ Fortify SSC connection failed: ${errorMessage}`);
            return { success: false, error: errorMessage };
        }
    }

    public async validateApplicationAndVersion(appName: string, appVersion: string): Promise<FortifyValidationResult> {
        try {
            console.log(`Validating application "${appName}" and version "${appVersion}"...`);

            // Get application ID
            const appUrl = `${this.sscUrl}/api/v1/projects?q=name:"${encodeURIComponent(appName)}"&fields=id,name`;
            const appResponse = await this.makeRequest(appUrl);
            
            if (!appResponse?.data || appResponse.data.length === 0) {
                return { 
                    success: false, 
                    error: `Application "${appName}" not found in Fortify SSC. Please check the application name.` 
                };
            }

            const applicationId = appResponse.data[0].id;
            console.log(`✓ Found application "${appName}" with ID: ${applicationId}`);

            // Get version ID
            const versionUrl = `${this.sscUrl}/api/v1/projectVersions?q=project.id:${applicationId}+name:"${encodeURIComponent(appVersion)}"&fields=id,name`;
            const versionResponse = await this.makeRequest(versionUrl);
            
            if (!versionResponse?.data || versionResponse.data.length === 0) {
                return { 
                    success: false, 
                    error: `Version "${appVersion}" not found for application "${appName}". Please check the version name.` 
                };
            }

            const versionId = versionResponse.data[0].id;
            console.log(`✓ Found version "${appVersion}" with ID: ${versionId}`);

            return { 
                success: true, 
                applicationId: applicationId.toString(),
                versionId: versionId.toString()
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(`✗ Application/version validation failed: ${errorMessage}`);
            return { success: false, error: errorMessage };
        }
    }

    private async makeRequest(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: {
                    'Authorization': `FortifyToken ${this.ciToken}`,
                    'Accept': 'application/json',
                    'User-Agent': 'Azure-DevOps-Fortify-Extension/9.0.0'
                },
                timeout: 30000, // 30 second timeout
                rejectUnauthorized: false // For self-signed certificates - consider making this configurable
            };

            const client = parsedUrl.protocol === 'https:' ? https : http;
            
            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const jsonData = JSON.parse(data);
                            resolve(jsonData);
                        } catch (parseError) {
                            resolve({ data: data }); // Return raw data if not JSON
                        }
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage} - ${data}`));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout - Fortify SSC did not respond within 30 seconds'));
            });

            req.on('error', (error) => {
                reject(new Error(`Network error: ${error.message}`));
            });

            req.end();
        });
    }
}

async function run() {
    try {
        console.log('Starting Fortify SSC Report task...');
        
        // Get task inputs
        const sscUrl = tl.getInput('sscUrl', true);
        const ciToken = tl.getInput('ciToken', true);
        const appName = tl.getInput('appName', true);
        const appVersion = tl.getInput('appVersion', true);

        // Validate inputs
        if (!sscUrl || !ciToken || !appName || !appVersion) {
            tl.setResult(tl.TaskResult.Failed, 'Missing required inputs');
            return;
        }

        // Basic URL validation
        try {
            new URL(sscUrl);
        } catch {
            tl.setResult(tl.TaskResult.Failed, 'Invalid Fortify SSC URL format');
            return;
        }

        console.log(`Configuring Fortify SSC Report for: ${appName} v${appVersion}`);
        console.log(`Fortify SSC URL: ${sscUrl}`);

        // Create the configuration object
        const fortifyConfig: FortifyConfig = {
            sscUrl: sscUrl,
            ciToken: ciToken,
            appName: appName,
            appVersion: appVersion,
            timestamp: new Date().toISOString(),
            buildId: tl.getVariable('Build.BuildId'),
            projectId: tl.getVariable('System.TeamProjectId')
        };

        // Validate connection to Fortify SSC (optional - controlled by variable)
        const skipValidation = tl.getBoolInput('skipValidation', false) || 
                              tl.getVariable('FORTIFY_SKIP_VALIDATION') === 'true';
        
        if (!skipValidation) {
            console.log('Validating Fortify SSC connection...');
            const validator = new FortifySSCValidator(sscUrl, ciToken);
            
            // Test basic connection to SSC
            const connectionResult = await validator.validateConnection();
            if (!connectionResult.success) {
                console.warn(`Warning: Could not validate connection to Fortify SSC: ${connectionResult.error}`);
                console.warn('The report will still be created but may fail to load data.');
                console.warn('Set variable FORTIFY_SKIP_VALIDATION=true to skip this validation.');
            } else {
                console.log('✓ Successfully connected to Fortify SSC');
            }

            // Test application and version (if connection succeeded)
            if (connectionResult.success) {
                const appVersionResult = await validator.validateApplicationAndVersion(appName, appVersion);
                if (!appVersionResult.success) {
                    console.warn(`Warning: Could not validate application/version: ${appVersionResult.error}`);
                    console.warn('The report will still be created but may fail to load data.');
                } else {
                    console.log('✓ Application and version validation successful');
                }
            }
        } else {
            console.log('Skipping Fortify SSC validation (skipValidation=true or FORTIFY_SKIP_VALIDATION=true)');
        }

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save configuration
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));
        console.log(`✓ Saved Fortify configuration to: ${configPath}`);

        // Create the attachment that will trigger the tab to appear
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        // Create attachment name following Azure DevOps patterns
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        // Add the attachment - this is what makes the tab appear
        tl.addAttachment(attachmentType, attachmentName, configPath);
        
        console.log(`✓ Added build attachment: ${attachmentType}/${attachmentName}`);
        console.log(`✓ Fortify SSC Report tab will be available in the build results`);
        console.log(`✓ The report will fetch live data from: ${sscUrl}`);
        
        tl.setResult(tl.TaskResult.Succeeded, `Fortify report configured for ${appName} v${appVersion}`);

    } catch (error: any) {
        console.error(`Fortify SSC Report Task Error: ${error.message}`);
        if (error.stack) {
            console.error(`Stack trace: ${error.stack}`);
        }
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    tl.setResult(tl.TaskResult.Failed, 'Unhandled promise rejection');
});

run();