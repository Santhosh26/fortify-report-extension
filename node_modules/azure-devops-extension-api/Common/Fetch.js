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
define(["require", "exports", "whatwg-fetch"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    function issueRequest(requestUrl, options, vssRequestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, headers, key, sessionId, command, refreshToken, authHeader, ex_1, error, error, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = undefined;
                        // Add a X-VSS-ReauthenticationAction header to all fetch requests
                        if (!options) {
                            options = {};
                        }
                        // If options.headers is set, check if it is a Headers object, and if not, convert it to one.
                        if (options.headers) {
                            if (options.headers instanceof Headers) {
                                headers = options.headers;
                            }
                            else {
                                headers = new Headers();
                                if (typeof options.headers.hasOwnProperty === "function") {
                                    for (key in options.headers) {
                                        if (options.headers.hasOwnProperty(key)) {
                                            headers.append(key, options.headers[key]);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            headers = new Headers();
                        }
                        options.headers = headers;
                        headers.append("X-VSS-ReauthenticationAction", "Suppress");
                        // Add a X-TFS-Session header with the current sessionId and command for correlation
                        if (vssRequestOptions) {
                            sessionId = vssRequestOptions.sessionId;
                            command = vssRequestOptions.command;
                            if (sessionId) {
                                if (command) {
                                    headers.append("X-TFS-Session", sessionId + "," + command);
                                }
                                else {
                                    headers.append("X-TFS-Session", sessionId);
                                }
                            }
                        }
                        // Send credentials to the same origin, we will use tokens for differing origins.
                        options.credentials = "same-origin";
                        refreshToken = false;
                        _b.label = 1;
                    case 1:
                        if (!(vssRequestOptions && vssRequestOptions.authTokenProvider)) return [3 /*break*/, 3];
                        return [4 /*yield*/, vssRequestOptions.authTokenProvider.getAuthorizationHeader(refreshToken)];
                    case 2:
                        authHeader = _b.sent();
                        if (authHeader) {
                            headers.append("Authorization", authHeader);
                            refreshToken = true;
                        }
                        headers.append("X-TFS-FedAuthRedirect", "Suppress");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fetch(requestUrl, options)];
                    case 4:
                        response = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _b.sent();
                        console.warn("Unhandled exception in fetch for " + requestUrl + ": " + (ex_1 && ex_1.toString()));
                        error = new Error("TF400893: Unable to contact the server. Please check your network connection and try again.");
                        error.name = "NetworkException";
                        throw error;
                    case 6:
                        // If we recieved a 401 and have a token manager, we will refresh our token and try again.
                        if (response.status === 401 && !refreshToken && vssRequestOptions && vssRequestOptions.authTokenProvider) {
                            refreshToken = true;
                            return [3 /*break*/, 7];
                        }
                        _b.label = 7;
                    case 7:
                        if (false) return [3 /*break*/, 1];
                        _b.label = 8;
                    case 8:
                        if (!!response.ok) return [3 /*break*/, 10];
                        error = new Error();
                        error.name = "TFS.WebApi.Exception";
                        error.status = response.status;
                        _a = error;
                        return [4 /*yield*/, response.text()];
                    case 9:
                        _a.responseText = _b.sent();
                        // Attempt to parse the response as a json object, for many of the failures
                        // the server will serialize details into the body.
                        if (error.responseText && error.responseText !== "") {
                            try {
                                error.serverError = JSON.parse(error.responseText);
                                if (error.serverError && error.serverError.message) {
                                    error.message = error.serverError.message;
                                }
                            }
                            catch (exception) {
                            }
                        }
                        if (!error.message) {
                            error.message = response.status + ": " + response.statusText;
                        }
                        throw error;
                    case 10: return [2 /*return*/, response];
                }
            });
        });
    }
    exports.issueRequest = issueRequest;
});
