// test-fortify-simple.js
// Simple JavaScript version that can be run with just Node.js
// Usage: node test-fortify-simple.js

const https = require('https');
const http = require('http');
const { URL } = require('url');

class FortifySSCSimpleTester {
    constructor(sscUrl, ciToken) {
        this.sscUrl = sscUrl.replace(/\/$/, '');
        this.ciToken = ciToken;
    }

    async testFullConnectivity(appName, appVersion) {
        console.log('🚀 Starting Fortify SSC Connectivity Test');
        console.log('=====================================');
        console.log(`SSC URL: ${this.sscUrl}`);
        console.log(`App: ${appName} v${appVersion}`);
        console.log(`Token: ${this.ciToken.substring(0, 8)}...`);
        console.log('');

        try {
            // Step 1: Test basic connectivity
            console.log('📡 Step 1: Testing basic connectivity...');
            const connectResult = await this.testBasicConnection();
            if (!connectResult.success) {
                console.error(`❌ Basic connectivity failed: ${connectResult.error}`);
                return;
            }
            console.log('✅ Basic connectivity successful\n');

            // Step 2: Test app/version lookup
            console.log('🔍 Step 2: Testing application/version lookup...');
            const appResult = await this.testApplicationAndVersion(appName, appVersion);
            if (!appResult.success) {
                console.error(`❌ App/version lookup failed: ${appResult.error}`);
                return;
            }
            console.log(`✅ Found app ID: ${appResult.applicationId}, version ID: ${appResult.versionId}\n`);

            // Step 3: Test filterSets
            console.log('📁 Step 3: Testing filterSets...');
            const filterSets = await this.testFilterSets(appResult.versionId);
            console.log(`✅ Found ${filterSets.length} filterSets\n`);

            // Step 4: Test issues fetching
            console.log('📄 Step 4: Testing issues fetching...');
            const defaultFilterSet = filterSets.find(fs => fs.defaultFilterSet) || filterSets[0];
            if (!defaultFilterSet) {
                console.error('❌ No default filterSet found');
                return;
            }
            
            const issueCount = await this.testIssuesFetching(appResult.versionId, defaultFilterSet);
            console.log(`✅ Successfully fetched ${issueCount} issues\n`);

            console.log('🎉 ALL TESTS PASSED! Your connectivity is working perfectly.');
            console.log('You can now use this configuration in your Azure DevOps extension.');

        } catch (error) {
            console.error('💥 Unexpected error during testing:', error);
        }
    }

    async testBasicConnection() {
        try {
            // Test multiple endpoints to find one that works
            const testEndpoints = [
                '/api/v1/projects?limit=1',
                '/api/v1/applicationState', 
                '/api/v1/authEntities/current'
            ];

            for (const endpoint of testEndpoints) {
                try {
                    console.log(`  Testing endpoint: ${endpoint}`);
                    const response = await this.makeRequest(`${this.sscUrl}${endpoint}`);
                    console.log(`  ✅ Success: ${endpoint}`);
                    return { success: true };
                } catch (error) {
                    console.log(`  ❌ Failed: ${endpoint} - ${error.message}`);
                }
            }

            return { success: false, error: 'All test endpoints failed' };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async testApplicationAndVersion(appName, appVersion) {
        try {
            // Get project ID
            const projectUrl = `${this.sscUrl}/api/v1/projects?q=name:${encodeURIComponent(appName)}&fields=id`;
            console.log(`  Project URL: ${projectUrl}`);
            
            const projectResponse = await this.makeRequest(projectUrl);
            
            if (!projectResponse?.data || projectResponse.data.length === 0) {
                // List available projects for debugging
                const allProjectsUrl = `${this.sscUrl}/api/v1/projects?fields=name,id`;
                try {
                    const allProjects = await this.makeRequest(allProjectsUrl);
                    const projectNames = allProjects?.data?.map(p => p.name).join(', ') || 'none';
                    return { 
                        success: false, 
                        error: `Application "${appName}" not found. Available projects: ${projectNames}` 
                    };
                } catch {
                    return { 
                        success: false, 
                        error: `Application "${appName}" not found` 
                    };
                }
            }

            const applicationId = projectResponse.data[0].id;
            console.log(`  ✅ Found project ID: ${applicationId}`);

            // Get version ID
            const versionUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions?q=name:"${encodeURIComponent(appVersion)}"`;
            console.log(`  Version URL: ${versionUrl}`);
            
            const versionResponse = await this.makeRequest(versionUrl);
            
            if (!versionResponse?.data || versionResponse.data.length === 0) {
                // List available versions for debugging
                const allVersionsUrl = `${this.sscUrl}/api/v1/projects/${applicationId}/versions`;
                try {
                    const allVersions = await this.makeRequest(allVersionsUrl);
                    const versionNames = allVersions?.data?.map(v => v.name).join(', ') || 'none';
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found. Available versions: ${versionNames}` 
                    };
                } catch {
                    return { 
                        success: false, 
                        error: `Version "${appVersion}" not found` 
                    };
                }
            }

            const versionId = versionResponse.data[0].id;
            console.log(`  ✅ Found version ID: ${versionId}`);

            return { 
                success: true, 
                applicationId: applicationId.toString(),
                versionId: versionId.toString()
            };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async testFilterSets(versionId) {
        const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/filterSets`;
        console.log(`  FilterSets URL: ${url}`);
        
        const response = await this.makeRequest(url);
        
        if (!response.data || response.data.length === 0) {
            throw new Error('No filter sets found for this project version');
        }
        
        const filterSets = response.data.map(filterSet => ({
            guid: filterSet.guid,
            title: filterSet.title,
            description: filterSet.description || '',
            defaultFilterSet: filterSet.defaultFilterSet || false,
            folders: (filterSet.folders || []).map(folder => ({
                id: folder.id,
                guid: folder.guid,
                name: folder.name,
                color: folder.color
            }))
        }));

        filterSets.forEach(fs => {
            console.log(`  📁 ${fs.title} (${fs.guid}) - Default: ${fs.defaultFilterSet}`);
            fs.folders.forEach(folder => 
                console.log(`     - ${folder.name} (${folder.guid}) #${folder.color}`)
            );
        });

        return filterSets;
    }

    async testIssuesFetching(versionId, filterSet) {
        const params = new URLSearchParams({
            filterset: filterSet.guid,
            start: '0',
            limit: '10', // Just test with 10 issues
            orderby: 'friority',
            showhidden: 'false',
            showremoved: 'false',
            showsuppressed: 'false'
        });

        const url = `${this.sscUrl}/api/v1/projectVersions/${versionId}/issues?${params.toString()}`;
        console.log(`  Issues URL: ${url}`);
        
        const response = await this.makeRequest(url);
        
        if (!response.data) {
            throw new Error('No issues data received');
        }

        console.log(`  📄 Received ${response.data.length} issues (showing first 3):`);
        
        // Create folder mapping for testing
        const folderMapping = new Map();
        filterSet.folders.forEach(folder => {
            folderMapping.set(folder.guid, folder);
        });

        response.data.slice(0, 3).forEach(issue => {
            const folder = folderMapping.get(issue.folderGuid || '');
            console.log(`     - ${issue.category || issue.issueName}: folderGuid="${issue.folderGuid}" → ${folder?.name || 'Unknown'} (#${folder?.color || '??'})`);
        });

        return response.data.length;
    }

    makeRequest(url) {
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
                    'User-Agent': 'Fortify-Connectivity-Tester/1.0.0'
                },
                timeout: 30000,
                rejectUnauthorized: false
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
                            reject(new Error(`Invalid JSON response: ${data.substring(0, 200)}`));
                        }
                    } else {
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;
                        
                        try {
                            const errorData = JSON.parse(data);
                            errorMessage += ` - ${JSON.stringify(errorData)}`;
                        } catch {
                            errorMessage += ` - ${data.substring(0, 200)}`;
                        }
                        
                        reject(new Error(errorMessage));
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

// Main execution
async function main() {
    // Get parameters from command line or environment variables
    const sscUrl = process.argv[2] || process.env.FORTIFY_SSC_URL || 'http://52.67.113.58:8080/ssc';
    const ciToken = process.argv[3] || process.env.FORTIFY_CI_TOKEN;
    const appName = process.argv[4] || process.env.FORTIFY_APP_NAME || 'IWA';
    const appVersion = process.argv[5] || process.env.FORTIFY_APP_VERSION || '1';

    if (!ciToken) {
        console.error('❌ Missing CI Token!');
        console.log('Usage: node test-fortify-simple.js [sscUrl] [ciToken] [appName] [appVersion]');
        console.log('Or set environment variables: FORTIFY_SSC_URL, FORTIFY_CI_TOKEN, FORTIFY_APP_NAME, FORTIFY_APP_VERSION');
        process.exit(1);
    }

    const tester = new FortifySSCSimpleTester(sscUrl, ciToken);
    await tester.testFullConnectivity(appName, appVersion);
}

// Run if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { FortifySSCSimpleTester };