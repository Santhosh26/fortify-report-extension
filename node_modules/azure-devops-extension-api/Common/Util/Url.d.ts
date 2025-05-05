/**
* A single query parameter entry in a Uri
*/
export interface IQueryParameter {
    /**
    * Unencoded name of the query parameter
    */
    name: string;
    /**
    * Unencoded value of the query parameter
    */
    value: string | null;
}
/**
* Options for parsing a Uri string
*/
export interface IUriParseOptions {
    /**
    * If true, throw if the Uri is not absolute
    */
    absoluteUriRequired?: boolean;
}
/**
 * Type of individual entry values that can be used in Uri.addQueryParams call
 */
export declare type QueryParameterEntryValueType = string | boolean | number | Date | undefined;
/**
 * Type of values supported by Uri.addQueryParams call
 */
export declare type QueryParameterValueType = QueryParameterEntryValueType | Array<QueryParameterEntryValueType> | {
    [key: string]: QueryParameterEntryValueType;
};
/**
* Class that represents a Uri and allows parsing/getting and setting of individual parts
*/
export declare class Uri {
    /**
    * The uri scheme such as http or https
    */
    scheme: string;
    /**
     * If true, do not emit the "//" separator after the scheme:
     * Set to true for schemes like mailto (e.g. mailto:foo@bar)
     */
    noSchemeSeparator: boolean;
    /**
    * The uri hostname (does not include port or scheme)
    */
    host: string;
    /**
    * The port number of the uri as supplied in the url. 0 if left out in the url (e.g. the default port for the scheme).
    */
    port: number;
    /**
    * The relative path of the uri
    */
    path: string;
    /**
    * The array of query parameters in the uri
    */
    queryParameters: IQueryParameter[];
    /**
    * The hash string of the uri
    */
    hashString: string;
    /**
    * Create a new Uri.
    *
    * @param uri Optional uri string to populate values with
    * @param options Options for parsing the uri string
    */
    constructor(uri?: string, options?: IUriParseOptions);
    private _setFromUriString;
    private _singleSplit;
    private _decodeUriComponent;
    /**
    * Get the absolute uri string for this Uri
    */
    /**
    * Set the absolute uri string for this Uri. Replaces all existing values
    */
    absoluteUri: string;
    /**
     * Gets the effective port number, returning the default port number if omitted for the given scheme.
     */
    getEffectivePort(): number;
    /**
     * Builds an encoded key/value pair string
     * like query string or hash strings
     */
    private _getParamsAsString;
    /**
    * Get the query string for this Uri.
    */
    /**
    * Set the query string for this Uri. Replaces existing value
    */
    queryString: string;
    /**
     * Coverts a key/value pair string into parameters array
     * @param paramString String such as a=b&c=d
     */
    private _splitStringIntoParams;
    /**
    * Get the value of the query parameter with the given key
    *
    * @param name Query parameter name
    */
    getQueryParam(name: string): string | null | undefined;
    /**
     * Adds a query string parameter to the current uri
     *
     * @param name The Query parameter name
     * @param value The Query parameter value
     * @param replaceExisting If true, replace all existing parameters with the same name
     */
    addQueryParam(name: string, value: string | null, replaceExisting?: boolean): void;
    /**
     * Adds query string parameters to the current uri
     *
     * @param parameters Query parameters to add
     * @param replaceExisting If true, replace all existing parameters with the same name
     * @param keyPrefix If specified, a value to prepend to all query parameter keys
     */
    addQueryParams(parameters: {
        [key: string]: QueryParameterValueType;
    }, replaceExisting?: boolean, keyPrefix?: string): void;
    /**
     * Removes a query string parameter
     *
     * @param name The Query parameter name
     */
    removeQueryParam(name: string): void;
}
/**
 * Take url segments and join them with a single slash character. Takes care of path segements that start and/or end
 * with a slash to ensure that the resulting URL does not have double-slashes
 *
 * @param paths Path segments to concatenate
 */
export declare function combineUrlPaths(...paths: string[]): string;
/**
 * Represents a route parsed by parseRoute
 */
export interface IParsedRoute {
    /**
     * Array of the segements in the route
     */
    segments: IParsedRouteSegment[];
}
/**
 * And individual segment of the route (fixed text or a parameter)
 */
export interface IParsedRouteSegment {
    /**
     * If present, the fixed text for this segement. Either text or paramName will be defined for a segment, never both.
     */
    text?: string;
    /**
     * If present, the name of the route value parameter to substitute for this segment. Either text or paramName will be defined for a segment, never both.
     */
    paramName?: string;
    /**
     * For parameters, whether or not this parameter is a wildcard (*) parameter, which means it allows multiple path segments (i.e. don't escape "/")
     */
    isWildCardParam?: boolean;
    /**
     * Whether the parameter is required in order for the URL to be valid.
     */
    isRequiredParam?: boolean;
}
/**
 * Parse a route template into a structure that can be used to quickly do route replacements
 *
 * @param routeTemplate MVC route template string (like "/foo/{id}/{*params}")
 */
export declare function parseRouteTemplate(routeTemplate: string): IParsedRoute;
/**
 * Take a set of routes and route values and form a url using the best match. The best match
 * is the route with the highest number of replacements (of the given routeValues dictionary).
 * In the event of a tie (same number of replacements) the route that came first wins.
 *
 * @param routeCollection Array of parsed routes
 * @param routeValues Replacement values
 */
export declare function routeUrl(routeCollection: IParsedRoute[], routeValues: {
    [name: string]: string;
}): string;
/**
 * Take a set of routes and find the best match. The best match is the route with the highest number of replacements
 * (of the given routeValues dictionary). In the event of a tie (same number of replacements) the route that came first wins.
 *
 * @param routeCollection Array of parsed routes
 * @param routeValues Replacement values
 */
export declare function getBestRouteMatch(routeCollection: IParsedRoute[], routeValues: {
    [name: string]: string;
}): IRouteMatchResult | undefined;
/**
 * Result of a call to replace route values for a parsed route
 */
export interface IRouteMatchResult {
    /**
     * Resulting URL from the template replacement. Does NOT include any query parameters that would be added from extra route values.
     */
    url: string;
    /**
     * Dictionary of the route value keys that were used as replacements
     */
    matchedParameters: {
        [key: string]: boolean;
    };
    /**
     * The number of parameter replacements made
     */
    matchedParametersCount: number;
}
/**
 * Replace route values for a specific parsed route
 *
 * @param parsedRoute The route to evaluate
 * @param routeValues Dictionary of route replacement parameters
 * @param continueOnUnmatchedSegements If true, continue with replacements even after a miss. By default (false), stop replacements once a parameter is not present.
 */
export declare function replaceParsedRouteValues(parsedRoute: IParsedRoute, routeValues: {
    [name: string]: string | number | undefined;
}, continueOnUnmatchedSegements?: boolean): IRouteMatchResult | undefined;
/**
 * Take an MVC route template (like "/foo/{id}/{*params}") and replace the templated parts with values from the given dictionary
 *
 * @param routeTemplate MVC route template (like "/foo/{id}/{*params}")
 * @param routeValues Route value replacements
 */
export declare function replaceRouteValues(routeTemplate: string, routeValues: {
    [name: string]: string | number | undefined;
}): string;
