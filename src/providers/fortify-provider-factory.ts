import { FortifyProviderType, IFortifyProvider, FortifyConfig } from '../types/fortify-types';

export class FortifyProviderFactory {
    static async createProvider(config: FortifyConfig): Promise<IFortifyProvider> {
        switch (config.providerType) {
            case FortifyProviderType.SSC:
                if (!config.ciToken) {
                    throw new Error('CI Token is required for Fortify SSC provider');
                }
                const { FortifySSCProvider } = await import('./fortify-ssc-provider');
                return new FortifySSCProvider(config.baseUrl, config.ciToken);
                
            case FortifyProviderType.FoD:
                if (!config.apiKey || !config.apiSecret) {
                    throw new Error('API Key and Secret are required for Fortify on Demand provider');
                }
                const { FortifyFoDProvider } = await import('./fortify-fod-provider');
                return new FortifyFoDProvider(config.baseUrl, config.apiKey, config.apiSecret);
                
            default:
                throw new Error(`Unsupported provider type: ${config.providerType}`);
        }
    }

    static detectProviderType(config: Partial<FortifyConfig>): FortifyProviderType {
        // If explicitly specified, use that
        if (config.providerType) {
            return config.providerType;
        }

        // Auto-detect based on available credentials
        if (config.ciToken) {
            return FortifyProviderType.SSC;
        }
        
        if (config.apiKey && config.apiSecret) {
            return FortifyProviderType.FoD;
        }

        // Default fallback for backward compatibility
        return FortifyProviderType.SSC;
    }

    static validateProviderConfig(config: FortifyConfig): string[] {
        const errors: string[] = [];

        if (!config.baseUrl) {
            errors.push('Base URL is required');
        }

        if (!config.appName) {
            errors.push('Application name is required');
        }

        if (!config.appVersion) {
            errors.push('Application version is required');
        }

        switch (config.providerType) {
            case FortifyProviderType.SSC:
                if (!config.ciToken) {
                    errors.push('CI Token is required for SSC provider');
                }
                break;
                
            case FortifyProviderType.FoD:
                if (!config.apiKey) {
                    errors.push('API Key is required for FoD provider');
                }
                if (!config.apiSecret) {
                    errors.push('API Secret is required for FoD provider');
                }
                break;
                
            default:
                errors.push(`Unsupported provider type: ${config.providerType}`);
        }

        return errors;
    }
}