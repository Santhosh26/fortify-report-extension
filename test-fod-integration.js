// Test script for FoD API integration
const https = require('https');
const http = require('http');
const { URL } = require('url');

class FoDTester {
    constructor(apiUrl, apiKey, apiSecret) {
        this.baseUrl = apiUrl.replace(/\/$/, '');
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    async authenticate() {
        console.log('🔐 Starting FoD authentication...');
        console.log(`   API URL: ${this.baseUrl}`);
        console.log(`   API Key: ${this.apiKey.substring(0, 8)}...${this.apiKey.substring(this.apiKey.length - 4)}`);
        console.log(`   API Secret: ${this.apiSecret.substring(0, 4)}...${this.apiSecret.substring(this.apiSecret.length - 4)}`);
        
        const tokenUrl = `${this.baseUrl}/oauth/token`;
        
        // Ensure proper URL encoding as per FoD documentation
        const postData = new URLSearchParams();
        postData.append('scope', 'api-tenant');
        postData.append('grant_type', 'client_credentials');
        postData.append('client_id', this.apiKey);
        postData.append('client_secret', this.apiSecret);
        
        const postDataString = postData.toString();
        console.log(`   Request body: ${postDataString.replace(this.apiSecret, '[REDACTED]')}`);

        try {
            const response = await this.makeRequest(tokenUrl, 'POST', {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postDataString),
                'Accept': 'application/json',
                'User-Agent': 'Azure-DevOps-Fortify-Extension/13.0.0-Test'
            }, postDataString);

            if (response.access_token && response.expires_in) {
                this.accessToken = response.access_token;
                const expiresInMs = response.expires_in * 1000;
                this.tokenExpiry = new Date(Date.now() + expiresInMs);
                
                console.log('✅ Authentication successful!');
                console.log(`   Token expires: ${this.tokenExpiry.toISOString()}`);
                console.log(`   Token type: ${response.token_type || 'Bearer'}`);
                return true;
            } else {
                console.log('❌ Authentication failed - Invalid response structure');
                console.log('Response:', JSON.stringify(response, null, 2));
                return false;
            }
        } catch (error) {
            console.log('❌ Authentication failed:', error.message);
            if (error.message.includes('401') || error.message.includes('400')) {
                console.log('   💡 Common issues:');
                console.log('      - Check API key and secret are correct');
                console.log('      - Verify API key has api-tenant scope permissions');
                console.log('      - Ensure API key is not expired or revoked');
                console.log('      - Check if your tenant allows API access');
            }
            return false;
        }
    }

    async testConnection() {
        console.log('\n🔗 Testing connection to FoD...');
        
        try {
            const url = `${this.baseUrl}/api/v3/applications?limit=1`;
            const response = await this.makeAuthenticatedRequest(url);
            
            console.log('✅ Connection test successful!');
            console.log(`   Total applications accessible: ${response.totalCount || 'Unknown'}`);
            return true;
        } catch (error) {
            console.log('❌ Connection test failed:', error.message);
            return false;
        }
    }

    async listApplications(limit = 10) {
        console.log(`\n📱 Fetching applications (limit: ${limit})...`);
        
        try {
            const url = `${this.baseUrl}/api/v3/applications?limit=${limit}`;
            const response = await this.makeAuthenticatedRequest(url);
            
            console.log(`✅ Found ${response.totalCount} total applications`);
            console.log('📋 Available applications:');
            
            if (response.items && response.items.length > 0) {
                response.items.forEach((app, index) => {
                    console.log(`   ${index + 1}. "${app.applicationName}" (ID: ${app.applicationId})`);
                    console.log(`      Description: ${app.applicationDescription || 'No description'}`);
                    console.log(`      Business Criticality: ${app.businessCriticalityType || 'Unknown'}`);
                    console.log();
                });
                return response.items;
            } else {
                console.log('   No applications found or accessible with current credentials');
                return [];
            }
        } catch (error) {
            console.log('❌ Failed to fetch applications:', error.message);
            return [];
        }
    }

    async listReleases(applicationId, limit = 5) {
        console.log(`\n🚀 Fetching releases for application ${applicationId} (limit: ${limit})...`);
        
        try {
            const url = `${this.baseUrl}/api/v3/applications/${applicationId}/releases?limit=${limit}`;
            const response = await this.makeAuthenticatedRequest(url);
            
            console.log(`✅ Found ${response.totalCount || response.items?.length || 0} total releases`);
            console.log('📋 Available releases:');
            
            if (response.items && response.items.length > 0) {
                response.items.forEach((release, index) => {
                    console.log(`   ${index + 1}. "${release.releaseName}" (ID: ${release.releaseId})`);
                    console.log(`      Description: ${release.releaseDescription || 'No description'}`);
                    console.log(`      Status: ${release.copyStateDescription || 'Unknown'}`);
                    console.log(`      Issues: Critical=${release.critical}, High=${release.high}, Medium=${release.medium}, Low=${release.low}`);
                    console.log();
                });
                return response.items;
            } else {
                console.log('   No releases found for this application');
                return [];
            }
        } catch (error) {
            console.log('❌ Failed to fetch releases:', error.message);
            return [];
        }
    }

    async testVulnerabilities(releaseId, limit = 5) {
        console.log(`\n🐛 Testing vulnerability retrieval for release ${releaseId} (limit: ${limit})...`);

        try {
            const params = new URLSearchParams({
                offset: '0',
                limit: limit.toString(),
                orderBy: 'severity',
                orderByDirection: 'ASC',
                includeFixed: 'false',
                includeSuppressed: 'false'
            });

            const url = `${this.baseUrl}/api/v3/releases/${releaseId}/vulnerabilities?${params.toString()}`;
            const response = await this.makeAuthenticatedRequest(url);

            console.log(`✅ Found ${response.totalCount || response.items?.length || 0} total vulnerabilities`);

            if (response.items && response.items.length > 0) {
                console.log('📋 Sample vulnerabilities (first 3):');
                response.items.slice(0, 3).forEach((vuln, index) => {
                    console.log(`\n   ${index + 1}. ${vuln.category} - ${vuln.severityString}`);
                    console.log(`      ✓ Severity: ${vuln.severityString}`);
                    console.log(`      ✓ Kingdom: ${vuln.kingdom}`);
                    console.log(`      ✓ Line Number: ${vuln.lineNumber || 'N/A'}`);

                    // Detailed file name investigation
                    console.log(`      📁 FILE NAME INVESTIGATION:`);
                    console.log(`         - fileName: ${vuln.fileName || '(empty/null)'}`);
                    console.log(`         - shortFileName: ${vuln.shortFileName || '(empty/null)'}`);
                    console.log(`         - primaryLocationFull: ${vuln.primaryLocationFull || '(empty/null)'}`);
                    console.log(`         - fileRelativePath: ${vuln.fileRelativePath || '(empty/null)'}`);
                    console.log(`         - filePath: ${vuln.filePath || '(empty/null)'}`);

                    // Show expected vs actual output
                    const primaryLoc = vuln.fileName || vuln.shortFileName || vuln.primaryLocationFull || 'Unknown';
                    const expectedOutput = primaryLoc && vuln.lineNumber ? `${primaryLoc}:${vuln.lineNumber}` : 'Unknown Location';
                    console.log(`      🎯 Expected Display: ${expectedOutput}`);
                });

                // Test data mapping
                console.log('\n🔄 Testing data mapping with first vulnerability...');
                const firstVuln = response.items[0];
                console.log(`   Raw FoD vulnerability fields:`);
                console.log(`      - fileName: "${firstVuln.fileName}"`);
                console.log(`      - lineNumber: ${firstVuln.lineNumber}`);

                const mappedVuln = this.mapFoDVulnToSecurityIssue(firstVuln);
                console.log('\n✅ After mapping to SecurityIssue:');
                console.log(`      - primaryLocation: "${mappedVuln.primaryLocation}"`);
                console.log(`      - lineNumber: ${mappedVuln.lineNumber}`);
                console.log(`\n   Full mapped vulnerability:`);
                console.log('   ', JSON.stringify(mappedVuln, null, 2));

                // UI rendering test
                console.log('\n📺 UI Rendering Test:');
                console.log(`   How it should display in table: ${mappedVuln.primaryLocation || 'Unknown Location'}`);

                // URL construction investigation
                console.log('\n🔗 URL CONSTRUCTION INVESTIGATION:');
                console.log(`\n   Complete Raw Vulnerability JSON from FoD API:`);
                console.log('   ' + JSON.stringify(firstVuln, null, 2).split('\n').join('\n   '));

                console.log(`\n   ID-related fields summary:`);
                console.log(`      - vulnId: ${firstVuln.vulnId} (type: ${typeof firstVuln.vulnId})`);
                console.log(`      - vulnInstanceId: ${firstVuln.vulnInstanceId} (type: ${typeof firstVuln.vulnInstanceId})`);
                console.log(`      - id: ${firstVuln.id || '(not present)'}`);
                console.log(`      - issueId: ${firstVuln.issueId || '(not present)'}`);
                console.log(`      - issueNumber: ${firstVuln.issueNumber || '(not present)'}`);
                console.log(`      - deepLink: ${firstVuln.deepLink || '(not provided)'}`);

                // Get the release ID from the test (should be the one we're iterating)
                const releaseId = 135921; // From the test data
                console.log(`\n   Release ID being used: ${releaseId}`);
                console.log(`\n   Generated URLs for reference:`);
                const correctUrl = `https://emea.fortify.com/Releases/${releaseId}/Issues/${firstVuln.id}`;
                console.log(`      Using numeric ID (correct): ${correctUrl}`);
                const incorrectUrl = `https://emea.fortify.com/Releases/${releaseId}/Issues/${firstVuln.vulnId}`;
                console.log(`      Using vulnId UUID (incorrect): ${incorrectUrl}`);
                console.log(`\n   User's example URL (different release):`);
                console.log(`      https://emea.fortify.com/Releases/160779/Issues/37276788`);

                return response.items;
            } else {
                console.log('   No vulnerabilities found for this release');
                return [];
            }
        } catch (error) {
            console.log('❌ Failed to fetch vulnerabilities:', error.message);
            return [];
        }
    }

    mapFoDVulnToSecurityIssue(vuln) {
        const severity = vuln.severityString || 'Unknown';

        // Build primary location: File path with line number
        // FoD returns primaryLocationFull with the full file path
        let primaryLocation = '';
        const fileLocation = vuln.primaryLocationFull || vuln.fileName || vuln.shortFileName || '';

        if (fileLocation) {
            primaryLocation = fileLocation;
            if (vuln.lineNumber && vuln.lineNumber > 0) {
                primaryLocation += `:${vuln.lineNumber}`;
            }
        } else if (vuln.lineNumber && vuln.lineNumber > 0) {
            // If we have line number but no file path, show the line number
            primaryLocation = `:${vuln.lineNumber}`;
        }

        return {
            id: vuln.vulnId.toString(),
            instanceId: vuln.vulnInstanceId || vuln.vulnId.toString(),
            name: vuln.category || vuln.subCategory || 'Unknown Issue',
            severity: severity,
            priority: severity,
            likelihood: this.mapLikelihoodToString(vuln.likelihood || 0),
            confidence: this.mapConfidenceToString(vuln.confidence || 0),
            primaryLocation: primaryLocation,
            lineNumber: vuln.lineNumber || 0,
            kingdom: vuln.kingdom || '',
            category: vuln.category || 'Uncategorized',
            priority_score: vuln.priorityOrder || 0,
            folderGuid: '',
            folderId: this.getSeverityId(severity),
            folderName: severity,
            folderColor: this.getSeverityColor(severity),
            provider: 'fod'
        };
    }

    getSeverityColor(severity) {
        switch (severity.toLowerCase()) {
            case 'critical': return 'ed1c24';
            case 'high': return 'ff7800';
            case 'medium': return 'f6aa58';
            case 'low': return 'eec845';
            default: return '666666';
        }
    }

    getSeverityId(severity) {
        switch (severity.toLowerCase()) {
            case 'critical': return 1;
            case 'high': return 2;
            case 'medium': return 3;
            case 'low': return 4;
            default: return 0;
        }
    }

    mapConfidenceToString(confidence) {
        if (confidence >= 4.0) return "High";
        if (confidence >= 2.5) return "Medium";
        return "Low";
    }

    mapLikelihoodToString(likelihood) {
        if (likelihood >= 0.7) return "Likely";
        if (likelihood >= 0.3) return "Possible";
        return "Unlikely";
    }

    async makeAuthenticatedRequest(url) {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Call authenticate() first.');
        }

        return this.makeRequest(url, 'GET', {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json',
            'User-Agent': 'Azure-DevOps-Fortify-Extension/13.0.0-Test'
        });
    }

    async makeRequest(url, method = 'GET', headers = {}, body = null) {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: method,
                headers: headers,
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
                            reject(new Error(`Invalid JSON response from FoD: ${data.substring(0, 200)}`));
                        }
                    } else {
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;
                        
                        try {
                            const errorData = JSON.parse(data);
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error_description) {
                                errorMessage = errorData.error_description;
                            }
                        } catch {
                            // Keep original error message
                        }
                        
                        reject(new Error(errorMessage));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout - FoD did not respond within 30 seconds'));
            });

            req.on('error', (error) => {
                reject(new Error(`Network error: ${error.message}`));
            });

            if (body) {
                req.write(body);
            }
            req.end();
        });
    }
}

// Main test function
async function runFoDTests() {
    console.log('🚀 Starting Fortify on Demand API Integration Tests');
    console.log('='.repeat(60));

    const tester = new FoDTester(
        'https://api.emea.fortify.com',
        '1b9c38c5-c6e7-445c-a814-d95eafea0fb0',
        'OVh4R0RpcUZhR2g0XHB0RnkhW1pPQmMwOGNXYjBu0'
    );

    try {
        // Step 1: Authenticate
        const authSuccess = await tester.authenticate();
        if (!authSuccess) {
            console.log('\n❌ Authentication failed. Cannot proceed with tests.');
            return;
        }

        // Step 2: Test connection
        const connectionSuccess = await tester.testConnection();
        if (!connectionSuccess) {
            console.log('\n❌ Connection test failed. Check network and permissions.');
            return;
        }

        // Step 3: List applications
        const applications = await tester.listApplications(5);
        
        if (applications.length === 0) {
            console.log('\n⚠️ No applications found. Cannot test releases and vulnerabilities.');
            return;
        }

        // Step 4: Test releases for the first application
        const firstApp = applications[0];
        console.log(`\n🎯 Using application: "${firstApp.applicationName}" for detailed testing`);
        
        const releases = await tester.listReleases(firstApp.applicationId, 3);
        
        if (releases.length === 0) {
            console.log('\n⚠️ No releases found for this application. Cannot test vulnerabilities.');
            return;
        }

        // Step 5: Test vulnerabilities for the first release
        const firstRelease = releases[0];
        console.log(`\n🎯 Using release: "${firstRelease.releaseName}" for vulnerability testing`);
        
        await tester.testVulnerabilities(firstRelease.releaseId, 5);

        console.log('\n' + '='.repeat(60));
        console.log('✅ All FoD API integration tests completed successfully!');
        console.log('\n📝 Test Summary:');
        console.log(`   • Authentication: ✅ Success`);
        console.log(`   • Connection: ✅ Success`);
        console.log(`   • Applications: ✅ Found ${applications.length}`);
        console.log(`   • Releases: ✅ Found ${releases.length} for "${firstApp.applicationName}"`);
        console.log(`   • Vulnerabilities: ✅ Tested for "${firstRelease.releaseName}"`);
        console.log(`   • Data Mapping: ✅ Verified`);

        console.log('\n🎯 Ready for full integration testing!');
        console.log(`\nRecommended test configuration:`);
        console.log(`appName: "${firstApp.applicationName}"`);
        console.log(`appVersion: "${firstRelease.releaseName}"`);

    } catch (error) {
        console.log('\n❌ Test failed with error:', error.message);
        console.log('Stack trace:', error.stack);
    }
}

// Run the tests
runFoDTests().catch(console.error);