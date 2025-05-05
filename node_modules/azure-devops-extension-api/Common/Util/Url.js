/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Key constants used by route parsing.
     */
    var KeyCodes;
    (function (KeyCodes) {
        KeyCodes[KeyCodes["asterisk"] = 42] = "asterisk";
        KeyCodes[KeyCodes["endCurlyBrace"] = 125] = "endCurlyBrace";
        KeyCodes[KeyCodes["startCurlyBrace"] = 123] = "startCurlyBrace";
    })(KeyCodes || (KeyCodes = {}));
    function prepareForComparison(value, upperCase) {
        return value ? (upperCase ? value.toLocaleUpperCase() : value) : "";
    }
    function stringEquals(str1, str2, ignoreCase) {
        if (str1 === str2) {
            return true;
        }
        return prepareForComparison(str1, ignoreCase).localeCompare(prepareForComparison(str2, ignoreCase)) === 0;
    }
    /**
    * Class that represents a Uri and allows parsing/getting and setting of individual parts
    */
    var Uri = /** @class */ (function () {
        /**
        * Create a new Uri.
        *
        * @param uri Optional uri string to populate values with
        * @param options Options for parsing the uri string
        */
        function Uri(uri, options) {
            /**
            * The uri scheme such as http or https
            */
            this.scheme = "";
            /**
             * If true, do not emit the "//" separator after the scheme:
             * Set to true for schemes like mailto (e.g. mailto:foo@bar)
             */
            this.noSchemeSeparator = false;
            /**
            * The uri hostname (does not include port or scheme)
            */
            this.host = "";
            /**
            * The port number of the uri as supplied in the url. 0 if left out in the url (e.g. the default port for the scheme).
            */
            this.port = 0;
            /**
            * The relative path of the uri
            */
            this.path = "";
            /**
            * The array of query parameters in the uri
            */
            this.queryParameters = [];
            /**
            * The hash string of the uri
            */
            this.hashString = "";
            if (uri) {
                this._setFromUriString(uri, options);
            }
        }
        Uri.prototype._setFromUriString = function (uriString, options) {
            var uri = uriString;
            // Parse out the hash string
            var hashSplit = this._singleSplit(uri, "#");
            if (hashSplit) {
                uri = hashSplit.part1;
                this.hashString = this._decodeUriComponent(hashSplit.part2);
            }
            else {
                this.hashString = "";
            }
            // Parse the query parameters
            var querySplit = this._singleSplit(uri, "?");
            if (querySplit) {
                uri = querySplit.part1;
                this.queryString = querySplit.part2;
            }
            else {
                this.queryParameters = [];
            }
            this.scheme = "";
            this.host = "";
            this.port = 0;
            this.path = "";
            // Parse out the scheme components of the uri
            this.noSchemeSeparator = false;
            var schemeSplit = this._singleSplit(uri, ":");
            if (schemeSplit) {
                this.scheme = schemeSplit.part1;
                uri = schemeSplit.part2;
                if (uri.substr(0, 2) === "//") {
                    uri = uri.substr(2);
                    // Parse out the path part of the uri
                    var pathSplit = this._singleSplit(uri, "/");
                    if (pathSplit) {
                        uri = pathSplit.part1;
                        this.path = pathSplit.part2;
                    }
                    else {
                        this.path = "";
                    }
                    // Parse out the port number
                    var portSplit = this._singleSplit(uri, ":");
                    if (portSplit) {
                        this.host = portSplit.part1;
                        this.port = parseInt(portSplit.part2);
                        if (isNaN(this.port)) {
                            // Segment after : was not a port, consider it part of the path
                            this.host += ":";
                            this.path = portSplit.part2 + "/" + this.path;
                        }
                    }
                    else {
                        this.host = uri;
                    }
                }
                else {
                    // No host for schemes like mailto: just use path
                    this.noSchemeSeparator = true;
                    this.path = uri;
                }
            }
            else {
                // Relative Url was given
                this.path = uri;
            }
            if (options && options.absoluteUriRequired && !this.scheme) {
                throw new Error("The uri string \"" + uriString + "\" does not represent a valid absolute uri.");
            }
        };
        Uri.prototype._singleSplit = function (value, separator) {
            var matchIndex = value.indexOf(separator);
            if (matchIndex >= 0) {
                return {
                    part1: value.substr(0, matchIndex),
                    part2: value.substr(matchIndex + 1)
                };
            }
            else {
                return undefined;
            }
        };
        Uri.prototype._decodeUriComponent = function (value) {
            if (value) {
                // Replace "+" character with %20.
                value = value.replace(/\+/g, "%20");
                value = decodeURIComponent(value);
            }
            return value;
        };
        Object.defineProperty(Uri.prototype, "absoluteUri", {
            /**
            * Get the absolute uri string for this Uri
            */
            get: function () {
                var uri = "";
                if (this.scheme) {
                    uri = encodeURI(decodeURI(this.scheme)) + ":";
                    if (!this.noSchemeSeparator) {
                        uri += "//";
                    }
                }
                if (this.host) {
                    uri += encodeURI(decodeURI(this.host));
                    if (this.port) {
                        uri += ":" + this.port;
                    }
                    if (!this.noSchemeSeparator || this.path) {
                        uri += "/";
                    }
                }
                if (this.path) {
                    var encodedPath = void 0;
                    if (this.noSchemeSeparator) {
                        // Only do simple encoding for schemes like mailto: or blob: where
                        // we can't determine host versus path
                        encodedPath = encodeURI(decodeURI(this.path));
                    }
                    else {
                        var parts = this.path.split('/');
                        encodedPath = parts.map(function (p) { return encodeURIComponent(decodeURIComponent(p)); }).join("/");
                    }
                    if (this.host) {
                        uri = combineUrlPaths(uri, encodedPath);
                    }
                    else {
                        uri = uri + encodedPath;
                    }
                }
                var queryString = this.queryString;
                if (queryString) {
                    uri += "?" + queryString;
                }
                if (this.hashString) {
                    var params = this._splitStringIntoParams(this.hashString);
                    var encodedString = this._getParamsAsString(params);
                    uri += "#" + encodedString;
                }
                return uri;
            },
            /**
            * Set the absolute uri string for this Uri. Replaces all existing values
            */
            set: function (uri) {
                this._setFromUriString(uri || "");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets the effective port number, returning the default port number if omitted for the given scheme.
         */
        Uri.prototype.getEffectivePort = function () {
            if (this.port) {
                return this.port;
            }
            else {
                if (stringEquals(this.scheme, "http", true)) {
                    return 80;
                }
                else if (stringEquals(this.scheme, "https", true)) {
                    return 443;
                }
                else {
                    return 0;
                }
            }
        };
        /**
         * Builds an encoded key/value pair string
         * like query string or hash strings
         */
        Uri.prototype._getParamsAsString = function (params) {
            if (params && params.length) {
                return params.map(function (param) {
                    if (param.value !== null) {
                        return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
                    }
                    else {
                        return encodeURIComponent(param.name);
                    }
                }).join("&");
            }
            else {
                return "";
            }
        };
        Object.defineProperty(Uri.prototype, "queryString", {
            /**
            * Get the query string for this Uri.
            */
            get: function () {
                return this._getParamsAsString(this.queryParameters);
            },
            /**
            * Set the query string for this Uri. Replaces existing value
            */
            set: function (queryString) {
                this.queryParameters = this._splitStringIntoParams(queryString);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Coverts a key/value pair string into parameters array
         * @param paramString String such as a=b&c=d
         */
        Uri.prototype._splitStringIntoParams = function (paramString) {
            var _this = this;
            var params = [];
            paramString.split('&').forEach(function (pair) {
                if (pair) {
                    var valueSplit = _this._singleSplit(pair, "=");
                    if (valueSplit) {
                        params.push({
                            name: _this._decodeUriComponent(valueSplit.part1),
                            value: _this._decodeUriComponent(valueSplit.part2)
                        });
                    }
                    else {
                        params.push({
                            name: _this._decodeUriComponent(pair),
                            value: null
                        });
                    }
                }
            });
            return params;
        };
        /**
        * Get the value of the query parameter with the given key
        *
        * @param name Query parameter name
        */
        Uri.prototype.getQueryParam = function (name) {
            var value;
            if (this.queryParameters) {
                var matchingPairs = this.queryParameters.filter(function (p) { return stringEquals(p.name, name, true); });
                if (matchingPairs.length > 0) {
                    value = matchingPairs[0].value;
                }
            }
            return value;
        };
        /**
         * Adds a query string parameter to the current uri
         *
         * @param name The Query parameter name
         * @param value The Query parameter value
         * @param replaceExisting If true, replace all existing parameters with the same name
         */
        Uri.prototype.addQueryParam = function (name, value, replaceExisting) {
            if (replaceExisting) {
                this.removeQueryParam(name);
            }
            if (!this.queryParameters) {
                this.queryParameters = [];
            }
            this.queryParameters.push({ name: name, value: value });
        };
        /**
         * Adds query string parameters to the current uri
         *
         * @param parameters Query parameters to add
         * @param replaceExisting If true, replace all existing parameters with the same name
         * @param keyPrefix If specified, a value to prepend to all query parameter keys
         */
        Uri.prototype.addQueryParams = function (parameters, replaceExisting, keyPrefix) {
            var _this = this;
            var _loop_1 = function (key) {
                var value = parameters[key];
                if (value !== null && value !== undefined) {
                    var keyWithPrefix_1 = (keyPrefix || "") + key;
                    if (value instanceof Date) {
                        this_1.addQueryParam(keyWithPrefix_1, value.toJSON(), replaceExisting);
                    }
                    else if (Array.isArray(value)) {
                        value.forEach(function (v) { return _this.addQueryParam(keyWithPrefix_1, "" + v, replaceExisting); });
                    }
                    else if (typeof value === "object") {
                        this_1.addQueryParams(value, replaceExisting, keyWithPrefix_1 + ".");
                    }
                    else {
                        this_1.addQueryParam(keyWithPrefix_1, "" + value, replaceExisting);
                    }
                }
            };
            var this_1 = this;
            for (var key in parameters) {
                _loop_1(key);
            }
        };
        /**
         * Removes a query string parameter
         *
         * @param name The Query parameter name
         */
        Uri.prototype.removeQueryParam = function (name) {
            if (this.queryParameters) {
                this.queryParameters = this.queryParameters.filter(function (p) { return !stringEquals(p.name, name, true); });
            }
        };
        return Uri;
    }());
    exports.Uri = Uri;
    /**
     * Take url segments and join them with a single slash character. Takes care of path segements that start and/or end
     * with a slash to ensure that the resulting URL does not have double-slashes
     *
     * @param paths Path segments to concatenate
     */
    function combineUrlPaths() {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var segmentsToJoin = [];
        // Trim leading and trailing slash in each segment
        for (var i = 0, last = paths.length - 1; i <= last; i++) {
            var path = paths[i];
            if (path) {
                if (path === "/" && (i === 0 || i === last)) {
                    // For a "/" segment at the beginning or end of the list, insert an empty entry to force
                    // a leading or trailing slash in the resulting URL
                    segmentsToJoin.push("");
                }
                else {
                    if (i > 0 && path[0] === "/") {
                        // Trim leading slash in any segment except the first one
                        path = path.substr(1);
                    }
                    if (i < last && path[path.length - 1] === "/") {
                        // Trim trailing slash in any segment except the last one
                        path = path.substr(0, path.length - 1);
                    }
                    if (path) {
                        segmentsToJoin.push(path);
                    }
                }
            }
        }
        if (segmentsToJoin.length === 1 && segmentsToJoin[0] === "") {
            return "/";
        }
        // Join segments by slash
        return segmentsToJoin.join("/");
    }
    exports.combineUrlPaths = combineUrlPaths;
    /**
     * Parse a route template into a structure that can be used to quickly do route replacements
     *
     * @param routeTemplate MVC route template string (like "/foo/{id}/{*params}")
     */
    function parseRouteTemplate(routeTemplate) {
        var parsedRoute = {
            segments: []
        };
        var paramStartIndex = -1;
        var segmentStartIndex = -1;
        var segmentPrefix = "";
        for (var charIndex = 0, routeTemplateLen = routeTemplate.length; charIndex < routeTemplateLen; charIndex++) {
            var c = routeTemplate.charCodeAt(charIndex);
            if (paramStartIndex >= 0) {
                if (c === 125 /* endCurlyBrace */) {
                    var paramName = routeTemplate.substring(paramStartIndex, charIndex);
                    var isWildCardParam = false;
                    if (paramName.charCodeAt(0) === 42 /* asterisk */) {
                        paramName = paramName.substr(1);
                        isWildCardParam = true;
                    }
                    parsedRoute.segments.push({
                        paramName: paramName,
                        isWildCardParam: isWildCardParam
                    });
                    paramStartIndex = -1;
                }
            }
            else {
                if (c === 123 /* startCurlyBrace */ && routeTemplate.charCodeAt(charIndex + 1) !== 123 /* startCurlyBrace */) {
                    // Start of a parameter
                    if (segmentPrefix || segmentStartIndex >= 0) {
                        // Store the previous segment
                        var segmentText = segmentPrefix;
                        if (segmentStartIndex >= 0) {
                            segmentText += routeTemplate.substring(segmentStartIndex, charIndex);
                        }
                        if (segmentText) {
                            parsedRoute.segments.push({
                                text: segmentText
                            });
                        }
                        // Reset the segment tracking info
                        segmentStartIndex = -1;
                        segmentPrefix = "";
                    }
                    paramStartIndex = charIndex + 1;
                }
                else {
                    // Handle double {{ or double }} as an escape sequence. This is rare. For simplicity we will 
                    if ((c === 123 /* startCurlyBrace */ && routeTemplate.charCodeAt(charIndex + 1) === 123 /* startCurlyBrace */) ||
                        (c === 125 /* endCurlyBrace */ && routeTemplate.charCodeAt(charIndex + 1) === 125 /* endCurlyBrace */)) {
                        segmentPrefix = segmentPrefix + routeTemplate.substring(segmentStartIndex >= 0 ? segmentStartIndex : charIndex, charIndex + 1);
                        segmentStartIndex = -1;
                        charIndex++;
                    }
                    if (segmentStartIndex < 0) {
                        segmentStartIndex = charIndex;
                    }
                }
            }
        }
        // Store any pending segment
        if (segmentStartIndex >= 0 || paramStartIndex >= 0) {
            var segmentText = segmentPrefix + routeTemplate.substring(segmentStartIndex >= 0 ? segmentStartIndex : paramStartIndex);
            if (segmentText) {
                parsedRoute.segments.push({
                    text: segmentText
                });
            }
        }
        // Mark any param as required if it has a text segment (other than just "/") after it
        var required = false;
        for (var i = parsedRoute.segments.length - 1; i >= 0; i--) {
            var segment = parsedRoute.segments[i];
            if (segment.text && segment.text !== "/") {
                required = true;
            }
            else if (required && segment.paramName) {
                segment.isRequiredParam = true;
            }
        }
        return parsedRoute;
    }
    exports.parseRouteTemplate = parseRouteTemplate;
    /**
     * Take a set of routes and route values and form a url using the best match. The best match
     * is the route with the highest number of replacements (of the given routeValues dictionary).
     * In the event of a tie (same number of replacements) the route that came first wins.
     *
     * @param routeCollection Array of parsed routes
     * @param routeValues Replacement values
     */
    function routeUrl(routeCollection, routeValues) {
        var bestMatch = getBestRouteMatch(routeCollection, routeValues);
        if (!bestMatch) {
            return "";
        }
        var uri = new Uri(bestMatch.url);
        for (var routeValueKey in routeValues) {
            if (!bestMatch.matchedParameters[routeValueKey]) {
                uri.addQueryParam(routeValueKey, routeValues[routeValueKey]);
            }
        }
        return uri.absoluteUri;
    }
    exports.routeUrl = routeUrl;
    /**
     * Take a set of routes and find the best match. The best match is the route with the highest number of replacements
     * (of the given routeValues dictionary). In the event of a tie (same number of replacements) the route that came first wins.
     *
     * @param routeCollection Array of parsed routes
     * @param routeValues Replacement values
     */
    function getBestRouteMatch(routeCollection, routeValues) {
        var bestMatch;
        var totalRouteValues = Object.keys(routeValues).length;
        for (var _i = 0, routeCollection_1 = routeCollection; _i < routeCollection_1.length; _i++) {
            var route = routeCollection_1[_i];
            var match = replaceParsedRouteValues(route, routeValues, false);
            if (match && (!bestMatch || match.matchedParametersCount > bestMatch.matchedParametersCount)) {
                bestMatch = match;
                if (match.matchedParametersCount === totalRouteValues) {
                    // This route matched all route values. Return its url directly (no need to even add query params)
                    return bestMatch;
                }
            }
        }
        return bestMatch;
    }
    exports.getBestRouteMatch = getBestRouteMatch;
    /**
     * Replace route values for a specific parsed route
     *
     * @param parsedRoute The route to evaluate
     * @param routeValues Dictionary of route replacement parameters
     * @param continueOnUnmatchedSegements If true, continue with replacements even after a miss. By default (false), stop replacements once a parameter is not present.
     */
    function replaceParsedRouteValues(parsedRoute, routeValues, continueOnUnmatchedSegements) {
        var urlParts = [];
        var matchedParameters = {};
        var matchedParametersCount = 0;
        for (var segmentIndex = 0, l = parsedRoute.segments.length; segmentIndex < l; segmentIndex++) {
            var segment = parsedRoute.segments[segmentIndex];
            if (segment.text) {
                var segmentText = segment.text;
                if (continueOnUnmatchedSegements) {
                    // Make sure we don't have consecutive slash (/) characters in the case of missing segments
                    if (segmentIndex > 0 && segmentText.charAt(0) === "/") {
                        if (urlParts.length === 0) {
                            // First text segment after one or more missing parameter segments. Remove the leading slash.
                            segmentText = segmentText.substr(1);
                        }
                    }
                }
                if (segmentText) {
                    urlParts.push(segmentText);
                }
            }
            else {
                var value = routeValues[segment.paramName];
                if (!value && value !== 0) {
                    // The route value was not supplied
                    if (!continueOnUnmatchedSegements) {
                        if (segment.isRequiredParam) {
                            // This is a required parameter. Return undefined since this route was not a match.
                            return undefined;
                        }
                        else {
                            // This is an omitted optional parameter. Return what we've computed so far.
                            break;
                        }
                    }
                    else if (urlParts.length) {
                        // Unmatched segment being omitted. Remove any previously trailing slash
                        var lastSegment = urlParts[urlParts.length - 1];
                        if (lastSegment[lastSegment.length - 1] === "/") {
                            urlParts[urlParts.length - 1] = lastSegment.substr(0, lastSegment.length - 1);
                        }
                    }
                }
                else {
                    urlParts.push(segment.isWildCardParam ? encodeURI("" + value) : encodeURIComponent("" + value));
                    matchedParameters[segment.paramName] = true;
                    matchedParametersCount++;
                }
            }
        }
        return {
            url: urlParts.join(""),
            matchedParameters: matchedParameters,
            matchedParametersCount: matchedParametersCount
        };
    }
    exports.replaceParsedRouteValues = replaceParsedRouteValues;
    /**
     * Take an MVC route template (like "/foo/{id}/{*params}") and replace the templated parts with values from the given dictionary
     *
     * @param routeTemplate MVC route template (like "/foo/{id}/{*params}")
     * @param routeValues Route value replacements
     */
    function replaceRouteValues(routeTemplate, routeValues) {
        var parsedRoute = parseRouteTemplate(routeTemplate);
        return replaceParsedRouteValues(parsedRoute, routeValues, true).url;
    }
    exports.replaceRouteValues = replaceRouteValues;
});
