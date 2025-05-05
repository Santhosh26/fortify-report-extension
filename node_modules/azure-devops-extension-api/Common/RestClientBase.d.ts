import { IVssRestClientOptions } from "./Context";
/**
* Parameters for sending a WebApi request
*/
export interface RestClientRequestParams {
    /**
    * Route template that is used to form the request path. If routeTemplate is NOT specified, then locationId
    * is used to lookup the template via an OPTIONS request.
    */
    routeTemplate: string;
    /**
    * The api version string to send in the request (e.g. "1.0" or "2.0-preview.2")
    */
    apiVersion: string;
    /**
    * Dictionary of route template replacement values
    */
    routeValues?: {
        [key: string]: any;
    };
    /**
    * Data to post. In this case of a GET, this indicates query parameters.
    * For other requests, this is the request body object (which will be serialized
    * into a JSON string unless isRawData is set to true).
    */
    body?: any;
    /**
    * Query parameters to add to the url. In the case of a GET, query parameters can
    * be supplied via 'data' or 'queryParams'. For other verbs such as POST, the
    * data object specifies the POST body, so queryParams is needed to indicate
    * parameters to add to the query string of the url (not included in the post body).
    */
    queryParams?: {
        [key: string]: any;
    };
    /**
    * HTTP verb (GET by default if not specified)
    */
    method?: string;
    /**
    * The http response (Accept) type. This is "json" (corresponds to application/json Accept header)
    * unless otherwise specified. Other possible values are "html", "text", "zip", or "binary" or their accept
    * header equivalents (e.g. application/zip).
    */
    httpResponseType?: string;
    /**
    * Allows the caller to specify custom request headers.
    */
    customHeaders?: {
        [headerName: string]: any;
    };
    /**
     * If true, indicates that the raw Response should be returned in the request's resulting promise
     * rather than deserializing the response (the default).
     */
    returnRawResponse?: boolean;
    /**
    * If true, this indicates that no processing should be done on the 'data' object
    * before it is sent in the request. *This is rarely needed*. One case is when posting
    * an HTML5 File object.
    */
    isRawData?: boolean;
    /**
     * Current command for activity logging. This will override the RestClient's base option.
     */
    command?: string;
}
/**
* Base class that should be used (derived from) to make requests to VSS REST apis
*/
export declare class RestClientBase {
    private _options;
    private _rootPath;
    constructor(options: IVssRestClientOptions);
    /**
    * Gets the root path of the Service
    *
    * @returns Promise for the resolving the root path of the service.
    */
    protected getRootPath(): Promise<string>;
    /**
    * Issue a request to a VSS REST endpoint.
    *
    * @param requestParams request options
    * @returns Promise for the response
    */
    protected beginRequest<T>(requestParams: RestClientRequestParams): Promise<T>;
    /**
     * Issue a request to a VSS REST endpoint at the specified location
     *
     * @param requestUrl Resolved URL of the request
     * @param apiVersion API version
     * @param requestParams Optional request parameters
     */
    protected _issueRequest<T>(requestUrl: string, apiVersion: string, requestParams: RestClientRequestParams): Promise<T>;
}
