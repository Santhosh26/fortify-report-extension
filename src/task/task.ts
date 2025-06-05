import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';

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

        console.log(`Fortify SSC Report: Configuring report for ${appName} v${appVersion}`);

        // Create the configuration that the tab will use
        const fortifyConfig = {
            sscUrl: sscUrl,
            ciToken: ciToken,
            appName: appName,
            appVersion: appVersion,
            timestamp: new Date().toISOString()
        };

        // Create output directory
        const outputDir = path.join(process.cwd(), '__fortify_report_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save configuration
        const configPath = path.join(outputDir, 'fortify-config.json');
        fs.writeFileSync(configPath, JSON.stringify(fortifyConfig, null, 2));
        console.log(`Saved Fortify configuration to: ${configPath}`);

        // Create the attachment that will trigger the tab to appear
        // This follows the same pattern as the working HTML report extension
        const attachmentType = 'fortify-report';
        const tabName = 'Fortify-Report';
        
        // Create attachment name following the working pattern
        const jobName = tl.getVariable('Agent.JobName') || 'default';
        const stageName = tl.getVariable('System.StageDisplayName') || 'default';
        const stageAttempt = tl.getVariable('System.StageAttempt') || '1';
        
        const attachmentName = `${tabName}.${jobName}.${stageName}.${stageAttempt}.config`;
        
        // Add the attachment - this is what makes the tab appear
        tl.addAttachment(attachmentType, attachmentName, configPath);
        
        console.log(`Added attachment: ${attachmentType}/${attachmentName}`);
        console.log(`Fortify SSC Report task completed successfully. The report tab will fetch data dynamically.`);
        
        tl.setResult(tl.TaskResult.Succeeded, `Fortify report configured for ${appName} v${appVersion}`);

    } catch (error: any) {
        console.error(`Fortify SSC Report Error: ${error.message}`);
        if (error.stack) {
            console.error(`Stack trace: ${error.stack}`);
        }
        tl.setResult(tl.TaskResult.Failed, error.message);
    }
}

run();