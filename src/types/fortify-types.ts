// Core types and interfaces for Fortify multi-provider architecture

export enum FortifyProviderType {
    SSC = 'ssc',
    FoD = 'fod'
}

export interface FortifyConfig {
    providerType: FortifyProviderType;
    baseUrl: string;
    appName: string;
    appVersion: string;
    timestamp: string;
    buildId?: string;
    projectId?: string;
    projectVersionId?: string;
    
    // SSC specific
    ciToken?: string;
    
    // FoD specific
    apiKey?: string;
    apiSecret?: string;
    tenantId?: string;
}

export interface SecurityIssue {
    id: string;
    instanceId: string;
    name: string;
    severity: string;
    priority: string;
    likelihood: string;
    confidence: string;
    primaryLocation: string;
    lineNumber: number;
    kingdom: string;
    category: string;
    priority_score?: number;
    folderGuid?: string;
    folderId?: number;
    folderName?: string;
    folderColor?: string;
    
    // Provider-specific metadata
    provider: FortifyProviderType;
    rawData?: any; // Store original provider data for reference
}

export interface ReportData {
    issues: SecurityIssue[];
    appName: string;
    appVersion: string;
    scanDate: string;
    totalCount: number;
    projectVersionId?: string;
    provider: FortifyProviderType;
    providerUrl?: string;
}

export interface ValidationResult {
    success: boolean;
    applicationId?: string;
    versionId?: string;
    error?: string;
    provider: FortifyProviderType;
}

export interface FortifyProviderOptions {
    baseUrl: string;
    appName: string;
    appVersion: string;
    maxIssues?: number;
    timeout?: number;
}

export interface AuthenticationStrategy {
    authenticate(): Promise<void>;
    getAuthHeaders(): Record<string, string>;
    isValid(): Promise<boolean>;
    refresh?(): Promise<void>;
}

export interface IFortifyProvider {
    readonly providerType: FortifyProviderType;
    
    validateConnection(): Promise<ValidationResult>;
    validateApplicationAndVersion(appName: string, appVersion: string): Promise<ValidationResult>;
    fetchReportData(appName: string, appVersion: string, maxIssues?: number): Promise<ReportData>;
    
    // Provider-specific URL generators for external links
    generateProjectUrl(applicationId: string, versionId: string): string;
    generateIssueUrl(applicationId: string, versionId: string, issueId: string): string;
}