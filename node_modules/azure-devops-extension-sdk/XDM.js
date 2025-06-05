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
define(["require", "exports", "es6-promise/auto", "es6-object-assign/auto"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var smallestRandom = parseInt("10000000000", 36);
    var maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;
    /**
     * Create a new random 22-character fingerprint.
     * @return string fingerprint
     */
    function newFingerprint() {
        // smallestRandom ensures we will get a 11-character result from the base-36 conversion.
        return Math.floor((Math.random() * (maxSafeInteger - smallestRandom)) + smallestRandom).toString(36) +
            Math.floor((Math.random() * (maxSafeInteger - smallestRandom)) + smallestRandom).toString(36);
    }
    /**
     * Gets all own and inherited property names of the given object, excluding
     * those that are inherited from Object's prototype and "constructor".
     * @param obj
     */
    function getAllPropertyNames(obj) {
        var properties = {};
        while (obj && obj !== Object.prototype) {
            var ownPropertyNames = Object.getOwnPropertyNames(obj);
            for (var _i = 0, ownPropertyNames_1 = ownPropertyNames; _i < ownPropertyNames_1.length; _i++) {
                var name_1 = ownPropertyNames_1[_i];
                if (name_1 !== "constructor") {
                    properties[name_1] = true;
                }
            }
            obj = Object.getPrototypeOf(obj);
        }
        return properties;
    }
    /**
     * Catalog of objects exposed for XDM
     */
    var XDMObjectRegistry = /** @class */ (function () {
        function XDMObjectRegistry() {
            this.objects = {};
        }
        /**
        * Register an object (instance or factory method) exposed by this frame to callers in a remote frame
        *
        * @param instanceId - unique id of the registered object
        * @param instance - Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
        */
        XDMObjectRegistry.prototype.register = function (instanceId, instance) {
            this.objects[instanceId] = instance;
        };
        /**
        * Unregister an object (instance or factory method) that was previously registered by this frame
        *
        * @param instanceId - unique id of the registered object
        */
        XDMObjectRegistry.prototype.unregister = function (instanceId) {
            delete this.objects[instanceId];
        };
        /**
        * Get an instance of an object registered with the given id
        *
        * @param instanceId - unique id of the registered object
        * @param contextData - Optional context data to pass to a registered object's factory method
        */
        XDMObjectRegistry.prototype.getInstance = function (instanceId, contextData) {
            var instance = this.objects[instanceId];
            if (!instance) {
                return undefined;
            }
            if (typeof instance === "function") {
                return instance(contextData);
            }
            else {
                return instance;
            }
        };
        return XDMObjectRegistry;
    }());
    exports.XDMObjectRegistry = XDMObjectRegistry;
    var MAX_XDM_DEPTH = 100;
    var nextChannelId = 1;
    /**
     * Represents a channel of communication between frames\document
     * Stays "alive" across multiple funtion\method calls
     */
    var XDMChannel = /** @class */ (function () {
        function XDMChannel(postToWindow, targetOrigin) {
            this.promises = {};
            this.nextMessageId = 1;
            this.nextProxyId = 1;
            this.proxyFunctions = {};
            this.postToWindow = postToWindow;
            this.targetOrigin = targetOrigin;
            this.registry = new XDMObjectRegistry();
            this.channelId = nextChannelId++;
            if (!this.targetOrigin) {
                this.handshakeToken = newFingerprint();
            }
        }
        /**
        * Get the object registry to handle messages from this specific channel.
        * Upon receiving a message, this channel registry will be used first, then
        * the global registry will be used if no handler is found here.
        */
        XDMChannel.prototype.getObjectRegistry = function () {
            return this.registry;
        };
        /**
        * Invoke a method via RPC. Lookup the registered object on the remote end of the channel and invoke the specified method.
        *
        * @param method - Name of the method to invoke
        * @param instanceId - unique id of the registered object
        * @param params - Arguments to the method to invoke
        * @param instanceContextData - Optional context data to pass to a registered object's factory method
        * @param serializationSettings - Optional serialization settings
        */
        XDMChannel.prototype.invokeRemoteMethod = function (methodName, instanceId, params, instanceContextData, serializationSettings) {
            return __awaiter(this, void 0, void 0, function () {
                var message, promise;
                var _this = this;
                return __generator(this, function (_a) {
                    message = {
                        id: this.nextMessageId++,
                        methodName: methodName,
                        instanceId: instanceId,
                        instanceContext: instanceContextData,
                        params: this._customSerializeObject(params, serializationSettings),
                        serializationSettings: serializationSettings
                    };
                    if (!this.targetOrigin) {
                        message.handshakeToken = this.handshakeToken;
                    }
                    promise = new Promise(function (resolve, reject) {
                        _this.promises[message.id] = { resolve: resolve, reject: reject };
                    });
                    this._sendRpcMessage(message);
                    return [2 /*return*/, promise];
                });
            });
        };
        /**
        * Get a proxied object that represents the object registered with the given instance id on the remote side of this channel.
        *
        * @param instanceId - unique id of the registered object
        * @param contextData - Optional context data to pass to a registered object's factory method
        */
        XDMChannel.prototype.getRemoteObjectProxy = function (instanceId, contextData) {
            return this.invokeRemoteMethod("", instanceId, undefined, contextData);
        };
        XDMChannel.prototype.invokeMethod = function (registeredInstance, rpcMessage) {
            var _this = this;
            if (!rpcMessage.methodName) {
                // Null/empty method name indicates to return the registered object itself.
                this._success(rpcMessage, registeredInstance, rpcMessage.handshakeToken);
                return;
            }
            var method = registeredInstance[rpcMessage.methodName];
            if (typeof method !== "function") {
                this.error(rpcMessage, new Error("RPC method not found: " + rpcMessage.methodName));
                return;
            }
            try {
                // Call specified method.  Add nested success and error call backs with closure
                // so we can post back a response as a result or error as appropriate
                var methodArgs = [];
                if (rpcMessage.params) {
                    methodArgs = this._customDeserializeObject(rpcMessage.params, {});
                }
                var result = method.apply(registeredInstance, methodArgs);
                if (result && result.then && typeof result.then === "function") {
                    result.then(function (asyncResult) {
                        _this._success(rpcMessage, asyncResult, rpcMessage.handshakeToken);
                    }, function (e) {
                        _this.error(rpcMessage, e);
                    });
                }
                else {
                    this._success(rpcMessage, result, rpcMessage.handshakeToken);
                }
            }
            catch (exception) {
                // send back as error if an exception is thrown
                this.error(rpcMessage, exception);
            }
        };
        XDMChannel.prototype.getRegisteredObject = function (instanceId, instanceContext) {
            if (instanceId === "__proxyFunctions") {
                // Special case for proxied functions of remote instances
                return this.proxyFunctions;
            }
            // Look in the channel registry first
            var registeredObject = this.registry.getInstance(instanceId, instanceContext);
            if (!registeredObject) {
                // Look in the global registry as a fallback
                registeredObject = exports.globalObjectRegistry.getInstance(instanceId, instanceContext);
            }
            return registeredObject;
        };
        /**
        * Handle a received message on this channel. Dispatch to the appropriate object found via object registry
        *
        * @param rpcMessage - Message data
        * @return True if the message was handled by this channel. Otherwise false.
        */
        XDMChannel.prototype.onMessage = function (rpcMessage) {
            var _this = this;
            if (rpcMessage.instanceId) {
                // Find the object that handles this requestNeed to find implementation
                // Look in the channel registry first
                var registeredObject = this.getRegisteredObject(rpcMessage.instanceId, rpcMessage.instanceContext);
                if (!registeredObject) {
                    // If not found return false to indicate that the message was not handled
                    return false;
                }
                if (typeof registeredObject["then"] === "function") {
                    registeredObject.then(function (resolvedInstance) {
                        _this.invokeMethod(resolvedInstance, rpcMessage);
                    }, function (e) {
                        _this.error(rpcMessage, e);
                    });
                }
                else {
                    this.invokeMethod(registeredObject, rpcMessage);
                }
            }
            else {
                var promise = this.promises[rpcMessage.id];
                if (!promise) {
                    // Message not handled by this channel.
                    return false;
                }
                if (rpcMessage.error) {
                    promise.reject(this._customDeserializeObject([rpcMessage.error], {})[0]);
                }
                else {
                    promise.resolve(this._customDeserializeObject([rpcMessage.result], {})[0]);
                }
                delete this.promises[rpcMessage.id];
            }
            // Message handled by this channel
            return true;
        };
        XDMChannel.prototype.owns = function (source, origin, rpcMessage) {
            /// Determines whether the current message belongs to this channel or not
            if (this.postToWindow === source) {
                // For messages coming from sandboxed iframes the origin will be set to the string "null".  This is 
                // how onprem works.  If it is not a sandboxed iFrame we will get the origin as expected.
                if (this.targetOrigin) {
                    if (origin) {
                        return origin.toLowerCase() === "null" || this.targetOrigin.toLowerCase().indexOf(origin.toLowerCase()) === 0;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (rpcMessage.handshakeToken && rpcMessage.handshakeToken === this.handshakeToken) {
                        this.targetOrigin = origin;
                        return true;
                    }
                }
            }
            return false;
        };
        XDMChannel.prototype.error = function (messageObj, errorObj) {
            this._sendRpcMessage({
                id: messageObj.id,
                error: this._customSerializeObject([errorObj], messageObj.serializationSettings)[0],
                handshakeToken: messageObj.handshakeToken
            });
        };
        XDMChannel.prototype._success = function (messageObj, result, handshakeToken) {
            this._sendRpcMessage({
                id: messageObj.id,
                result: this._customSerializeObject([result], messageObj.serializationSettings)[0],
                handshakeToken: handshakeToken
            });
        };
        XDMChannel.prototype._sendRpcMessage = function (message) {
            this.postToWindow.postMessage(JSON.stringify(message), "*");
        };
        XDMChannel.prototype._customSerializeObject = function (obj, settings, prevParentObjects, nextCircularRefId, depth) {
            var _this = this;
            if (nextCircularRefId === void 0) { nextCircularRefId = 1; }
            if (depth === void 0) { depth = 1; }
            if (!obj || depth > MAX_XDM_DEPTH) {
                return undefined;
            }
            if (obj instanceof Node || obj instanceof Window || obj instanceof Event) {
                return undefined;
            }
            var returnValue;
            var parentObjects;
            if (!prevParentObjects) {
                parentObjects = {
                    newObjects: [],
                    originalObjects: []
                };
            }
            else {
                parentObjects = prevParentObjects;
            }
            parentObjects.originalObjects.push(obj);
            var serializeMember = function (parentObject, newObject, key) {
                var item;
                try {
                    item = parentObject[key];
                }
                catch (ex) {
                    // Cannot access this property. Skip its serialization.
                }
                var itemType = typeof item;
                if (itemType === "undefined") {
                    return;
                }
                // Check for a circular reference by looking at parent objects
                var parentItemIndex = -1;
                if (itemType === "object") {
                    parentItemIndex = parentObjects.originalObjects.indexOf(item);
                }
                if (parentItemIndex >= 0) {
                    // Circular reference found. Add reference to parent
                    var parentItem = parentObjects.newObjects[parentItemIndex];
                    if (!parentItem.__circularReferenceId) {
                        parentItem.__circularReferenceId = nextCircularRefId++;
                    }
                    newObject[key] = {
                        __circularReference: parentItem.__circularReferenceId
                    };
                }
                else {
                    if (itemType === "function") {
                        var proxyFunctionId = _this.nextProxyId++;
                        newObject[key] = {
                            __proxyFunctionId: _this._registerProxyFunction(item, obj),
                            _channelId: _this.channelId
                        };
                    }
                    else if (itemType === "object") {
                        if (item && item instanceof Date) {
                            newObject[key] = {
                                __proxyDate: item.getTime()
                            };
                        }
                        else {
                            newObject[key] = _this._customSerializeObject(item, settings, parentObjects, nextCircularRefId, depth + 1);
                        }
                    }
                    else if (key !== "__proxyFunctionId") {
                        // Just add non object/function properties as-is. Don't include "__proxyFunctionId" to protect
                        // our proxy methods from being invoked from other messages.
                        newObject[key] = item;
                    }
                }
            };
            if (obj instanceof Array) {
                returnValue = [];
                parentObjects.newObjects.push(returnValue);
                for (var i = 0, l = obj.length; i < l; i++) {
                    serializeMember(obj, returnValue, i);
                }
            }
            else {
                returnValue = {};
                parentObjects.newObjects.push(returnValue);
                var keys = {};
                try {
                    keys = getAllPropertyNames(obj);
                }
                catch (ex) {
                    // We may not be able to access the iterator of this object. Skip its serialization.
                }
                for (var key in keys) {
                    // Don't serialize properties that start with an underscore.
                    if ((key && key[0] !== "_") || (settings && settings.includeUnderscoreProperties)) {
                        serializeMember(obj, returnValue, key);
                    }
                }
            }
            parentObjects.originalObjects.pop();
            parentObjects.newObjects.pop();
            return returnValue;
        };
        XDMChannel.prototype._registerProxyFunction = function (func, context) {
            var proxyFunctionId = this.nextProxyId++;
            this.proxyFunctions["proxy" + proxyFunctionId] = function () {
                return func.apply(context, Array.prototype.slice.call(arguments, 0));
            };
            return proxyFunctionId;
        };
        XDMChannel.prototype._customDeserializeObject = function (obj, circularRefs) {
            var _this = this;
            var that = this;
            if (!obj) {
                return null;
            }
            var deserializeMember = function (parentObject, key) {
                var item = parentObject[key];
                var itemType = typeof item;
                if (key === "__circularReferenceId" && itemType === 'number') {
                    circularRefs[item] = parentObject;
                    delete parentObject[key];
                }
                else if (itemType === "object" && item) {
                    if (item.__proxyFunctionId) {
                        parentObject[key] = function () {
                            return that.invokeRemoteMethod("proxy" + item.__proxyFunctionId, "__proxyFunctions", Array.prototype.slice.call(arguments, 0), {}, { includeUnderscoreProperties: true });
                        };
                    }
                    else if (item.__proxyDate) {
                        parentObject[key] = new Date(item.__proxyDate);
                    }
                    else if (item.__circularReference) {
                        parentObject[key] = circularRefs[item.__circularReference];
                    }
                    else {
                        _this._customDeserializeObject(item, circularRefs);
                    }
                }
            };
            if (obj instanceof Array) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    deserializeMember(obj, i);
                }
            }
            else if (typeof obj === "object") {
                for (var key in obj) {
                    deserializeMember(obj, key);
                }
            }
            return obj;
        };
        return XDMChannel;
    }());
    exports.XDMChannel = XDMChannel;
    /**
    * Registry of XDM channels kept per target frame/window
    */
    var XDMChannelManager = /** @class */ (function () {
        function XDMChannelManager() {
            var _this = this;
            this._channels = [];
            this._handleMessageReceived = function (event) {
                // get channel and dispatch to it
                var rpcMessage;
                if (typeof event.data === "string") {
                    try {
                        rpcMessage = JSON.parse(event.data);
                    }
                    catch (error) {
                        // The message is not a valid JSON string. Not one of our events.
                    }
                }
                if (rpcMessage) {
                    var handled = false;
                    var channelOwner = void 0;
                    for (var _i = 0, _a = _this._channels; _i < _a.length; _i++) {
                        var channel = _a[_i];
                        if (channel.owns(event.source, event.origin, rpcMessage)) {
                            // keep a reference to the channel owner found. 
                            channelOwner = channel;
                            handled = channel.onMessage(rpcMessage) || handled;
                        }
                    }
                    if (channelOwner && !handled) {
                        if (window.console) {
                            console.error("No handler found on any channel for message: " + JSON.stringify(rpcMessage));
                        }
                        // for instance based proxies, send an error on the channel owning the message to resolve any control creation promises
                        // on the host frame. 
                        if (rpcMessage.instanceId) {
                            channelOwner.error(rpcMessage, new Error("The registered object " + rpcMessage.instanceId + " could not be found."));
                        }
                    }
                }
            };
            window.addEventListener("message", this._handleMessageReceived);
        }
        /**
        * Add an XDM channel for the given target window/iframe
        *
        * @param window - Target iframe window to communicate with
        * @param targetOrigin - Url of the target iframe (if known)
        */
        XDMChannelManager.prototype.addChannel = function (window, targetOrigin) {
            var channel = new XDMChannel(window, targetOrigin);
            this._channels.push(channel);
            return channel;
        };
        XDMChannelManager.prototype.removeChannel = function (channel) {
            this._channels = this._channels.filter(function (c) { return c !== channel; });
        };
        return XDMChannelManager;
    }());
    /**
    * The registry of global XDM handlers
    */
    exports.globalObjectRegistry = new XDMObjectRegistry();
    /**
    * Manages XDM channels per target window/frame
    */
    exports.channelManager = new XDMChannelManager();
});
