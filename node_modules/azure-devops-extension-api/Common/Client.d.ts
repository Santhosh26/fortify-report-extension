import { IVssRestClientOptions } from "./Context";
/**
 * A REST client factory is the method used to create and initialize an IVssRestClient.
 */
export declare type RestClientFactory<T> = {
    new (options: IVssRestClientOptions): T;
    RESOURCE_AREA_ID?: string;
};
export declare function getClient<T>(clientClass: RestClientFactory<T>, clientOptions?: IVssRestClientOptions): T;
