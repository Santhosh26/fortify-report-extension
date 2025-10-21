import { AuthenticationStrategy } from '../types/fortify-types';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

export class SSCTokenAuthStrategy implements AuthenticationStrategy {
    private ciToken: string;

    constructor(ciToken: string) {
        this.ciToken = ciToken;
    }

    async authenticate(): Promise<void> {
        // For SSC, the token is used directly - no pre-authentication needed
        if (!this.ciToken) {
            throw new Error('CI Token is required for SSC authentication');
        }
    }

    getAuthHeaders(): Record<string, string> {
        return {
            'Authorization': `FortifyToken ${this.ciToken}`,
            'Accept': 'application/json',
            'User-Agent': 'Azure-DevOps-Fortify-Extension/13.0.0'
        };
    }

    async isValid(): Promise<boolean> {
        return !!this.ciToken;
    }
}

export class FoDApiKeyAuthStrategy implements AuthenticationStrategy {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl: string;
    private accessToken?: string;
    private tokenExpiry?: Date;
    private readonly tokenBuffer = 5 * 60 * 1000; // 5 minutes buffer before expiry

    constructor(apiKey: string, apiSecret: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    async authenticate(): Promise<void> {
        if (!this.apiKey || !this.apiSecret) {
            throw new Error('API Key and Secret are required for FoD authentication');
        }

        console.log(`[FoD Auth] Starting authentication with API key: ${this.apiKey.substring(0, 8)}...`);

        try {
            const tokenData = await this.requestAccessToken();
            this.accessToken = tokenData.access_token;

            // Calculate expiry time (expires_in is in seconds)
            const expiresInMs = tokenData.expires_in * 1000;
            this.tokenExpiry = new Date(Date.now() + expiresInMs);

            console.log(`[FoD Auth] Authentication successful. Token expires in ${tokenData.expires_in} seconds`);

        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            console.error(`[FoD Auth] Authentication failed: ${errorMsg}`);
            throw new Error(`FoD authentication failed: ${errorMsg}`);
        }
    }

    getAuthHeaders(): Record<string, string> {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Call authenticate() first.');
        }
        
        return {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json',
            'User-Agent': 'Azure-DevOps-Fortify-Extension/13.0.0'
        };
    }

    async isValid(): Promise<boolean> {
        if (!this.accessToken || !this.tokenExpiry) {
            return false;
        }
        
        // Check if token is still valid (with buffer)
        const now = new Date();
        const expiryWithBuffer = new Date(this.tokenExpiry.getTime() - this.tokenBuffer);
        
        return now < expiryWithBuffer;
    }

    async refresh(): Promise<void> {
        // For FoD, refresh is the same as initial authentication
        await this.authenticate();
    }

    private async requestAccessToken(): Promise<{access_token: string, expires_in: number}> {
        const tokenUrl = `${this.baseUrl}/oauth/token`;

        console.log(`[FoD Auth] Requesting access token from: ${tokenUrl}`);

        const postData = new URLSearchParams({
            scope: 'api-tenant',
            grant_type: 'client_credentials',
            client_id: this.apiKey,
            client_secret: this.apiSecret
        }).toString();

        console.log(`[FoD Auth] Token request scope: api-tenant, grant_type: client_credentials`);

        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(tokenUrl);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData),
                    'Accept': 'application/json',
                    'User-Agent': 'Azure-DevOps-Fortify-Extension/13.0.0'
                },
                timeout: 30000,
                rejectUnauthorized: false // TODO: Make this configurable
            };

            console.log(`[FoD Auth] Connecting to ${options.hostname}:${options.port}${options.path}`);

            const client = parsedUrl.protocol === 'https:' ? https : http;

            const req = client.request(options, (res) => {
                let data = '';

                console.log(`[FoD Auth] Token endpoint response: HTTP ${res.statusCode} ${res.statusMessage}`);

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const tokenData = JSON.parse(data);
                            if (tokenData.access_token && tokenData.expires_in) {
                                console.log(`[FoD Auth] Token received successfully`);
                                resolve(tokenData);
                            } else {
                                console.error(`[FoD Auth] Token response missing fields. Response keys: ${Object.keys(tokenData).join(', ')}`);
                                reject(new Error('Invalid token response: missing access_token or expires_in'));
                            }
                        } catch (parseError) {
                            console.error(`[FoD Auth] Failed to parse token response. Raw: ${data.substring(0, 200)}`);
                            reject(new Error(`Invalid JSON response from FoD token endpoint`));
                        }
                    } else {
                        console.error(`[FoD Auth] Token request failed with status ${res.statusCode}`);
                        let errorMessage = `HTTP ${res.statusCode}: ${res.statusMessage}`;

                        try {
                            const errorData = JSON.parse(data);
                            if (errorData.error_description) {
                                errorMessage = errorData.error_description;
                            } else if (errorData.error) {
                                errorMessage = errorData.error;
                            }
                            console.error(`[FoD Auth] Error details: ${errorMessage}`);
                        } catch {
                            // Keep original error message
                            console.error(`[FoD Auth] Error response body: ${data.substring(0, 200)}`);
                        }

                        reject(new Error(errorMessage));
                    }
                });
            });

            req.on('timeout', () => {
                req.destroy();
                console.error(`[FoD Auth] Token request timeout after 30 seconds`);
                reject(new Error('Token request timeout - FoD did not respond within 30 seconds'));
            });

            req.on('error', (error) => {
                console.error(`[FoD Auth] Network error: ${error.message}`);
                reject(new Error(`Network error: ${error.message}`));
            });

            req.write(postData);
            req.end();
        });
    }
}