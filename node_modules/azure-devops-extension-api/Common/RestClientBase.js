/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./Fetch", "./Util/Serialization", "./Util/Url"], function (require, exports, Fetch_1, Serialization_1, Url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
    * Base class that should be used (derived from) to make requests to VSS REST apis
    */
    var RestClientBase = /** @class */ (function () {
        function RestClientBase(options) {
            this._options = options || {};
            if (typeof this._options.rootPath === "string") {
                this._rootPath = Promise.resolve(this._options.rootPath);
            }
            else {
                this._rootPath = this._options.rootPath || Promise.resolve("/");
            }
        }
        /**
        * Gets the root path of the Service
        *
        * @returns Promise for the resolving the root path of the service.
        */
        RestClientBase.prototype.getRootPath = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._rootPath];
                });
            });
        };
        /**
        * Issue a request to a VSS REST endpoint.
        *
        * @param requestParams request options
        * @returns Promise for the response
        */
        RestClientBase.prototype.beginRequest = function (requestParams) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._rootPath.then(function (rootPath) {
                            var requestUrl = rootPath + Url_1.replaceRouteValues(requestParams.routeTemplate, requestParams.routeValues || {});
                            if (requestParams.queryParams) {
                                var uri = new Url_1.Uri(requestUrl);
                                uri.addQueryParams(requestParams.queryParams);
                                requestUrl = uri.absoluteUri;
                            }
                            return _this._issueRequest(requestUrl, requestParams.apiVersion, requestParams);
                        })];
                });
            });
        };
        /**
         * Issue a request to a VSS REST endpoint at the specified location
         *
         * @param requestUrl Resolved URL of the request
         * @param apiVersion API version
         * @param requestParams Optional request parameters
         */
        RestClientBase.prototype._issueRequest = function (requestUrl, apiVersion, requestParams) {
            var fetchOptions = {};
            fetchOptions.method = requestParams.method || "GET";
            fetchOptions.mode = "cors";
            if (!requestParams.isRawData && requestParams.body && fetchOptions.method.toUpperCase() !== 'GET') {
                fetchOptions.body = JSON.stringify(requestParams.body);
            }
            else {
                fetchOptions.body = requestParams.body;
            }
            var acceptType = requestParams.httpResponseType || "application/json";
            var acceptHeaderValue = acceptType + ";api-version=" + apiVersion + ";excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true";
            fetchOptions.headers = Object.assign({
                "Accept": acceptHeaderValue,
                "Content-Type": requestParams.body && "application/json"
            }, requestParams.customHeaders) /* lib.dom.d.ts does not have the correct type for Headers */;
            var vssRequestOptions = {
                authTokenProvider: this._options.authTokenProvider,
                sessionId: this._options.sessionId,
                command: requestParams.command || this._options.command
            };
            var result = Fetch_1.issueRequest(requestUrl, fetchOptions, vssRequestOptions);
            return result.then(function (response) {
                if (requestParams.returnRawResponse) {
                    return response;
                }
                else if (acceptType.toLowerCase().indexOf("json") >= 0) {
                    // MSJSON date formats must be replaced in the raw text before JSON parsing
                    return response.text().then(Serialization_1.deserializeVssJsonObject);
                }
                else if (acceptType.toLowerCase() === "text/plain") {
                    return response.text();
                }
                else {
                    return response.arrayBuffer();
                }
            });
        };
        return RestClientBase;
    }());
    exports.RestClientBase = RestClientBase;
});
