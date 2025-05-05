const smallestRandom = parseInt("10000000000", 36);
const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;
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
    const properties = {};
    while (obj && obj !== Object.prototype) {
        const ownPropertyNames = Object.getOwnPropertyNames(obj);
        for (const name of ownPropertyNames) {
            if (name !== "constructor") {
                properties[name] = true;
            }
        }
        obj = Object.getPrototypeOf(obj);
    }
    return properties;
}
/**
 * Catalog of objects exposed for XDM
 */
class XDMObjectRegistry {
    objects = {};
    /**
    * Register an object (instance or factory method) exposed by this frame to callers in a remote frame
    *
    * @param instanceId - unique id of the registered object
    * @param instance - Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    register(instanceId, instance) {
        this.objects[instanceId] = instance;
    }
    /**
    * Unregister an object (instance or factory method) that was previously registered by this frame
    *
    * @param instanceId - unique id of the registered object
    */
    unregister(instanceId) {
        delete this.objects[instanceId];
    }
    /**
    * Get an instance of an object registered with the given id
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to a registered object's factory method
    */
    getInstance(instanceId, contextData) {
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
    }
}
const MAX_XDM_DEPTH = 100;
let nextChannelId = 1;
/**
 * Represents a channel of communication between frames\document
 * Stays "alive" across multiple funtion\method calls
 */
class XDMChannel {
    promises = {};
    postToWindow;
    targetOrigin;
    handshakeToken;
    registry;
    channelId;
    nextMessageId = 1;
    nextProxyId = 1;
    proxyFunctions = {};
    constructor(postToWindow, targetOrigin) {
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
    getObjectRegistry() {
        return this.registry;
    }
    /**
    * Invoke a method via RPC. Lookup the registered object on the remote end of the channel and invoke the specified method.
    *
    * @param method - Name of the method to invoke
    * @param instanceId - unique id of the registered object
    * @param params - Arguments to the method to invoke
    * @param instanceContextData - Optional context data to pass to a registered object's factory method
    * @param serializationSettings - Optional serialization settings
    */
    async invokeRemoteMethod(methodName, instanceId, params, instanceContextData, serializationSettings) {
        const message = {
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
        const promise = new Promise((resolve, reject) => {
            this.promises[message.id] = { resolve, reject };
        });
        this._sendRpcMessage(message);
        return promise;
    }
    /**
    * Get a proxied object that represents the object registered with the given instance id on the remote side of this channel.
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to a registered object's factory method
    */
    getRemoteObjectProxy(instanceId, contextData) {
        return this.invokeRemoteMethod("", instanceId, undefined, contextData);
    }
    invokeMethod(registeredInstance, rpcMessage) {
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
                result.then((asyncResult) => {
                    this._success(rpcMessage, asyncResult, rpcMessage.handshakeToken);
                }, (e) => {
                    this.error(rpcMessage, e);
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
    }
    getRegisteredObject(instanceId, instanceContext) {
        if (instanceId === "__proxyFunctions") {
            // Special case for proxied functions of remote instances
            return this.proxyFunctions;
        }
        // Look in the channel registry first
        var registeredObject = this.registry.getInstance(instanceId, instanceContext);
        if (!registeredObject) {
            // Look in the global registry as a fallback
            registeredObject = globalObjectRegistry.getInstance(instanceId, instanceContext);
        }
        return registeredObject;
    }
    /**
    * Handle a received message on this channel. Dispatch to the appropriate object found via object registry
    *
    * @param rpcMessage - Message data
    * @return True if the message was handled by this channel. Otherwise false.
    */
    onMessage(rpcMessage) {
        if (rpcMessage.instanceId) {
            // Find the object that handles this requestNeed to find implementation
            // Look in the channel registry first
            const registeredObject = this.getRegisteredObject(rpcMessage.instanceId, rpcMessage.instanceContext);
            if (!registeredObject) {
                // If not found return false to indicate that the message was not handled
                return false;
            }
            if (typeof registeredObject["then"] === "function") {
                registeredObject.then((resolvedInstance) => {
                    this.invokeMethod(resolvedInstance, rpcMessage);
                }, (e) => {
                    this.error(rpcMessage, e);
                });
            }
            else {
                this.invokeMethod(registeredObject, rpcMessage);
            }
        }
        else {
            const promise = this.promises[rpcMessage.id];
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
    }
    owns(source, origin, rpcMessage) {
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
    }
    error(messageObj, errorObj) {
        this._sendRpcMessage({
            id: messageObj.id,
            error: this._customSerializeObject([errorObj], messageObj.serializationSettings)[0],
            handshakeToken: messageObj.handshakeToken
        });
    }
    _success(messageObj, result, handshakeToken) {
        this._sendRpcMessage({
            id: messageObj.id,
            result: this._customSerializeObject([result], messageObj.serializationSettings)[0],
            handshakeToken
        });
    }
    _sendRpcMessage(message) {
        this.postToWindow.postMessage(JSON.stringify(message), "*");
    }
    _customSerializeObject(obj, settings, prevParentObjects, nextCircularRefId = 1, depth = 1) {
        if (!obj || depth > MAX_XDM_DEPTH) {
            return undefined;
        }
        if (obj instanceof Node || obj instanceof Window || obj instanceof Event) {
            return undefined;
        }
        var returnValue;
        let parentObjects;
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
        var serializeMember = (parentObject, newObject, key) => {
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
                    this.nextProxyId++;
                    newObject[key] = {
                        __proxyFunctionId: this._registerProxyFunction(item, obj),
                        _channelId: this.channelId
                    };
                }
                else if (itemType === "object") {
                    if (item && item instanceof Date) {
                        newObject[key] = {
                            __proxyDate: item.getTime()
                        };
                    }
                    else {
                        newObject[key] = this._customSerializeObject(item, settings, parentObjects, nextCircularRefId, depth + 1);
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
            let keys = {};
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
    }
    _registerProxyFunction(func, context) {
        var proxyFunctionId = this.nextProxyId++;
        this.proxyFunctions["proxy" + proxyFunctionId] = function () {
            return func.apply(context, Array.prototype.slice.call(arguments, 0));
        };
        return proxyFunctionId;
    }
    _customDeserializeObject(obj, circularRefs) {
        var that = this;
        if (!obj) {
            return null;
        }
        var deserializeMember = (parentObject, key) => {
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
                    this._customDeserializeObject(item, circularRefs);
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
    }
}
/**
* Registry of XDM channels kept per target frame/window
*/
class XDMChannelManager {
    _channels = [];
    constructor() {
        window.addEventListener("message", this._handleMessageReceived);
    }
    /**
    * Add an XDM channel for the given target window/iframe
    *
    * @param window - Target iframe window to communicate with
    * @param targetOrigin - Url of the target iframe (if known)
    */
    addChannel(window, targetOrigin) {
        const channel = new XDMChannel(window, targetOrigin);
        this._channels.push(channel);
        return channel;
    }
    removeChannel(channel) {
        this._channels = this._channels.filter(c => c !== channel);
    }
    _handleMessageReceived = (event) => {
        // get channel and dispatch to it
        let rpcMessage;
        if (typeof event.data === "string") {
            try {
                rpcMessage = JSON.parse(event.data);
            }
            catch (error) {
                // The message is not a valid JSON string. Not one of our events.
            }
        }
        if (rpcMessage) {
            let handled = false;
            let channelOwner;
            for (const channel of this._channels) {
                if (channel.owns(event.source, event.origin, rpcMessage)) {
                    // keep a reference to the channel owner found. 
                    channelOwner = channel;
                    handled = channel.onMessage(rpcMessage) || handled;
                }
            }
            if (channelOwner && !handled) {
                if (window.console) {
                    console.error(`No handler found on any channel for message: ${JSON.stringify(rpcMessage)}`);
                }
                // for instance based proxies, send an error on the channel owning the message to resolve any control creation promises
                // on the host frame. 
                if (rpcMessage.instanceId) {
                    channelOwner.error(rpcMessage, new Error(`The registered object ${rpcMessage.instanceId} could not be found.`));
                }
            }
        }
    };
}
/**
* The registry of global XDM handlers
*/
const globalObjectRegistry = new XDMObjectRegistry();
/**
* Manages XDM channels per target window/frame
*/
const channelManager = new XDMChannelManager();

export { XDMChannel, XDMObjectRegistry, channelManager, globalObjectRegistry };
//# sourceMappingURL=XDM.js.map
