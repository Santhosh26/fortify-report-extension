import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as Accounts from "../Accounts/Accounts";
export declare class AccountsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * @param info -
     * @param usePrecreated -
     */
    createAccount(info: Accounts.AccountCreateInfoInternal, usePrecreated?: boolean): Promise<Accounts.Account>;
    /**
     * @param accountId -
     */
    getAccount(accountId: string): Promise<Accounts.Account>;
    /**
     * Get a list of accounts for a specific owner or a specific member. One of the following parameters is required: ownerId, memberId.
     *
     * @param ownerId - ID for the owner of the accounts.
     * @param memberId - ID for a member of the accounts.
     * @param properties -
     */
    getAccounts(ownerId?: string, memberId?: string, properties?: string): Promise<Accounts.Account[]>;
}
