import "whatwg-fetch";
import { IAuthorizationTokenProvider } from "./Context";
/**
* VSS-specific options for VSS requests
*/
export interface IVssRequestOptions {
    authTokenProvider?: IAuthorizationTokenProvider;
    /**
     * Current session id.
     */
    sessionId?: string;
    /**
     * Current command for activity logging.
     */
    command?: string;
}
/**
 * An IPreRequestEvent is sent before a fetch request is made.
 */
export interface IPreRequestEvent {
    /**
     * A unique id that can be used to track this particular request (id is unique among all clients)
     */
    requestId: number;
    /**
     * Url of the request that is about to be issued
     */
    requestUrl: string;
    /**
     * Request settings being used
     */
    options?: RequestInit;
    /**
     * Additional VSS-specific options supplied in the request
     */
    vssRequestOptions?: IVssRequestOptions;
}
/**
 * An IPostRequestEvent is sent after a fetch request has completed.
 */
export interface IPostRequestEvent {
    /**
     * A unique id that can be used to track this particular request (id is unique among all clients)
     */
    requestId: number;
    /**
     * Url of the request that is about to be issued
     */
    requestUrl: string;
    /**
     * The Response returned for this request, if the request fails it will be undefined
     */
    response?: Response;
    /**
     * Additional VSS-specific options supplied in the request
     */
    vssRequestOptions?: IVssRequestOptions;
}
/**
 * When a fetch request fails, it will throw a VssServerError. Failure is defined
 * as a request that made it to the server, and the server successfully responded
 * with a failure. This will be any status return that is not a status code in
 * the success range (200-299).
 */
export interface VssServerError extends Error {
    /**
     * The status code returned from the server.
     */
    status: number;
    /**
     * The raw text that was returned from the server. If any is available.
     */
    responseText: string;
    /**
     * If the response text was sent and it was in the form of a JSON response
     * the object will be parsed and deserialized object is available here.
     *
     * This commonly has the exception details about the failure from the server.
     * Things like the message, exception type, and stack trace will be available.
     */
    serverError?: any;
}
/**
 * Issue a fetch request. This is a wrapper around the browser fetch method that handles VSS authentication
 * and triggers events that can be listened to by other modules.
 *
 * @param requestUrl Url to send the request to
 * @param options fetch settings/options for the request
 * @param vssRequestOptions VSS specific request options
 *
 * Triggered Events:
 *  afterRequest -> IPostRequestEvent is sent after the request has completed.
 *  beforeRequest -> IPreRequestEvent is sent before the request is made.
 */
export declare function issueRequest(requestUrl: string, options?: RequestInit, vssRequestOptions?: IVssRequestOptions): Promise<Response>;
