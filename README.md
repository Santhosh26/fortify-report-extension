# Fortify SSC Report Extension

Azure DevOps extension that integrates with Fortify Software Security Center (SSC) to display security scan results directly in build pipelines.

## Features

- **Direct SSC Integration**: Connects to Fortify SSC using CI tokens
- **Security Auditor View**: Displays vulnerabilities using Fortify's Security Auditor filterset
- **Interactive Reports**: Filter and sort findings by severity
- **Build Integration**: Results display in Azure DevOps build summary
- **Real-time Data**: Fetches live data from SSC during pipeline execution

## Quick Start

1. **Install Extension**: Add to your Azure DevOps organization
2. **Add Task**: Include "Fortify SSC Report" in your pipeline
3. **Configure**: Set SSC URL, CI token, app name and version
4. **View Results**: Security reports appear in build summary tab

## Configuration

### Required Parameters
- **SSC URL**: Your Fortify SSC server URL (e.g., `https://ssc.company.com`)
- **CI Token**: SSC authentication token
- **Application Name**: Target application in SSC
- **Application Version**: Specific version to analyze

### Optional Parameters
- **Maximum Issues**: Limit number of issues fetched (default: 10,000)
- **Skip Validation**: Skip connection validation for faster execution

## Development

### Prerequisites
- Node.js 18+
- Azure DevOps account
- Fortify SSC instance

### Build
```bash
npm install
npm run build
npm run package
```

### Local Development
```bash
npm run build-dev
npm run dev    # Watch mode for tab content
```

## API Integration

The extension uses Fortify SSC REST API:
- **FilterSets**: `/api/v1/projectVersions/{id}/filterSets` (Security Auditor view)
- **Issues**: `/api/v1/projectVersions/{id}/issues` (with filterset and pagination)

## Report Content

- **Severity Levels**: Critical, High, Medium, Low
- **Issue Details**: Name, location, line numbers, categories
- **Analysis Data**: Kingdom classification, confidence levels
- **Interactive Features**: Filtering, sorting, search

## Technical Stack

- **Language**: TypeScript
- **Framework**: React 18 + Azure DevOps UI
- **Build**: Webpack + Azure DevOps Extension SDK
- **Package**: TFX CLI

## License

MIT License - see package.json for details.

## Author

Santhosh Kumar