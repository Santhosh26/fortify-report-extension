# Fortify Multi-Platform Report Extension

An Azure DevOps extension that integrates with both **Fortify Software Security Center (SSC)** and **Fortify on Demand (FoD)** to display security scan results directly in your build pipelines.

## Features

- ✅ **Multi-Provider Support**: Works with both Fortify SSC (on-premise) and Fortify on Demand (SaaS)
- ✅ **Unified Reports**: Consistent vulnerability reporting across both platforms
- ✅ **External Links**: Direct links to issues in your Fortify provider
- ✅ **Filtering & Sorting**: Interactive report filtering by severity levels
- ✅ **Backward Compatible**: Existing SSC configurations work without changes

## Supported Providers

### Fortify Software Security Center (SSC)
- On-premise installations
- CI Token authentication
- Security Auditor View integration

### Fortify on Demand (FoD)
- Cloud-based SaaS solution
- API Key/Secret authentication
- Native severity classifications

## Quick Start

### For Fortify SSC Users
```yaml
- task: FortifyReport@13
  inputs:
    sscUrl: 'https://your-ssc-instance.com'
    ciToken: '$(FORTIFY_CI_TOKEN)'
    appName: 'MyApplication'
    appVersion: 'v1.0.0'
```

### For Fortify on Demand Users
```yaml
- task: FortifyReport@13
  inputs:
    providerType: 'fod'
    fodUrl: 'https://api.ams.fortify.com'
    fodApiKey: '$(FORTIFY_API_KEY)'
    fodApiSecret: '$(FORTIFY_API_SECRET)'
    appName: 'MyApplication'
    appVersion: 'Release 1.0'
```

## What's New in Version 13.0

- 🚀 **Multi-Provider Architecture**: Complete rewrite supporting both SSC and FoD
- 🔐 **Enhanced Authentication**: Secure OAuth2 support for FoD with automatic token refresh
- 🎨 **Unified UI**: Consistent experience regardless of provider
- 🏗️ **Extensible Design**: Easy to add support for future Fortify platforms
- ✅ **Zero Breaking Changes**: Full backward compatibility for existing SSC users

## Security & Best Practices

- Store sensitive tokens in Azure DevOps secure variables
- Use Azure Key Vault integration for enhanced security
- Regular token rotation recommended
- SSL/TLS encryption for all API communications

## Support

For issues, questions, or feature requests, please refer to the project documentation or contact your Fortify administrator.