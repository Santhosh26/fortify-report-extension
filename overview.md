# Fortify SSC Report Extension

This Azure DevOps extension integrates with Fortify Software Security Center (SSC) to display security scan results directly within your build pipeline summary.

## Features

- **Direct SSC Integration**: Connects to your Fortify SSC instance using CI tokens
- **Security Auditor View**: Displays vulnerabilities using Fortify's default Security Auditor classification
- **Interactive Reports**: Filter and sort security findings by severity levels
- **Build Integration**: Seamlessly displays results in Azure DevOps build summary pages
- **Responsive Design**: Clean, professional interface that matches Azure DevOps styling

## Getting Started

1. Add the Fortify SSC Report task to your build pipeline
2. Configure your SSC URL and CI token
3. Specify your application name and version
4. View detailed security reports in your build summary

## Configuration

The extension requires the following parameters:

- **SSC URL**: Your Fortify Software Security Center server URL
- **CI Token**: Authentication token for accessing SSC API
- **Application Name**: Target application in SSC
- **Application Version**: Specific version to analyze

## Report Details

The generated reports include:

- **Severity Classification**: Critical, High, Medium, and Low security findings
- **Vulnerability Details**: Issue names, locations, line numbers, and categories
- **Analysis Context**: Kingdom classification and confidence levels
- **Interactive Filtering**: Filter by severity to focus on critical issues
- **Summary Statistics**: Overview of total findings by severity level

## Requirements

- Azure DevOps Services or Azure DevOps Server 2019+
- Access to Fortify Software Security Center instance
- Valid CI token with appropriate permissions

## License

This is an open source project released under the MIT License. You are free to use, modify, and distribute this extension according to the terms of the license.

## Support

For issues, feature requests, or questions about this extension, please contact the publisher at santgutz2000@live.com. 

This is an open source project - contributions and feedback are welcome!