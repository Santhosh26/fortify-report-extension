import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Reporting from "../AdvancedSecurity.Reporting/Reporting";
export declare class ReportingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    /**
     * Get Alert summary by severity for the org
     *
     */
    getAlertSummaryForOrg(): Promise<Reporting.OrgAlertSummary>;
    /**
     */
    getEnablementSummaryForOrg(): Promise<Reporting.OrgEnablementSummary>;
}
