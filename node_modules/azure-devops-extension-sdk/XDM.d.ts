import "es6-promise/auto";
import "es6-object-assign/auto";
/**
* Interface for a single XDM channel
*/
export interface IXDMChannel {
    /**
    * Invoke a method via RPC. Lookup the registered object on the remote end of the channel and invoke the specified method.
    *
    * @param method - Name of the method to invoke
    * @param instanceId - unique id of the registered object
    * @param params - Arguments to the method to invoke
    * @param instanceContextData - Optional context data to pass to a registered object's factory method
    */
    invokeRemoteMethod<T>(methodName: string, instanceId: string, params?: any[], instanceContextData?: Object): Promise<T>;
    /**
    * Get a proxied object that represents the object registered with the given instance id on the remote side of this channel.
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to a registered object's factory method
    */
    getRemoteObjectProxy<T>(instanceId: string, contextData?: Object): Promise<T>;
    /**
    * Get the object registry to handle messages from this specific channel.
    * Upon receiving a message, this channel registry will be used first, then
    * the global registry will be used if no handler is found here.
    */
    getObjectRegistry(): IXDMObjectRegistry;
}
/**
* Registry of XDM channels kept per target frame/window
*/
export interface IXDMChannelManager {
    /**
    * Add an XDM channel for the given target window/iframe
    *
    * @param window - Target iframe window to communicate with
    * @param targetOrigin - Url of the target iframe (if known)
    */
    addChannel(window: Window, targetOrigin?: string): IXDMChannel;
    /**
    * Removes an XDM channel, allowing it to be disposed
    *
    * @param channel - The channel to remove from the channel manager
    */
    removeChannel(channel: IXDMChannel): void;
}
/**
* Registry of XDM objects that can be invoked by an XDM channel
*/
export interface IXDMObjectRegistry {
    /**
    * Register an object (instance or factory method) exposed by this frame to callers in a remote frame
    *
    * @param instanceId - unique id of the registered object
    * @param instance - Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    register(instanceId: string, instance: Object | {
        (contextData?: any): Object;
    }): void;
    /**
    * Unregister an object (instance or factory method) that was previously registered by this frame
    *
    * @param instanceId - unique id of the registered object
    */
    unregister(instanceId: string): void;
    /**
    * Get an instance of an object registered with the given id
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to the contructor of an object factory method
    */
    getInstance<T>(instanceId: string, contextData?: Object): T | undefined;
}
/**
* Settings related to the serialization of data across iframe boundaries.
*/
export interface ISerializationSettings {
    /**
    * By default, properties that begin with an underscore are not serialized across
    * the iframe boundary. Set this option to true to serialize such properties.
    */
    includeUnderscoreProperties: boolean;
}
/**
 * Represents a remote procedure call (rpc) between frames.
 */
export interface IJsonRpcMessage {
    id: number;
    instanceId?: string;
    instanceContext?: Object;
    methodName?: string;
    params?: any[];
    result?: any;
    error?: any;
    handshakeToken?: string;
    serializationSettings?: ISerializationSettings;
}
/**
 * Catalog of objects exposed for XDM
 */
export declare class XDMObjectRegistry implements IXDMObjectRegistry {
    private objects;
    /**
    * Register an object (instance or factory method) exposed by this frame to callers in a remote frame
    *
    * @param instanceId - unique id of the registered object
    * @param instance - Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
    */
    register(instanceId: string, instance: Object | {
        (contextData?: any): Object;
    }): void;
    /**
    * Unregister an object (instance or factory method) that was previously registered by this frame
    *
    * @param instanceId - unique id of the registered object
    */
    unregister(instanceId: string): void;
    /**
    * Get an instance of an object registered with the given id
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to a registered object's factory method
    */
    getInstance<T>(instanceId: string, contextData?: Object): T | undefined;
}
/**
 * Represents a channel of communication between frames\document
 * Stays "alive" across multiple funtion\method calls
 */
export declare class XDMChannel implements IXDMChannel {
    private promises;
    private postToWindow;
    private targetOrigin;
    private handshakeToken;
    private registry;
    private channelId;
    private nextMessageId;
    private nextProxyId;
    private proxyFunctions;
    constructor(postToWindow: Window, targetOrigin?: string);
    /**
    * Get the object registry to handle messages from this specific channel.
    * Upon receiving a message, this channel registry will be used first, then
    * the global registry will be used if no handler is found here.
    */
    getObjectRegistry(): IXDMObjectRegistry;
    /**
    * Invoke a method via RPC. Lookup the registered object on the remote end of the channel and invoke the specified method.
    *
    * @param method - Name of the method to invoke
    * @param instanceId - unique id of the registered object
    * @param params - Arguments to the method to invoke
    * @param instanceContextData - Optional context data to pass to a registered object's factory method
    * @param serializationSettings - Optional serialization settings
    */
    invokeRemoteMethod<T>(methodName: string, instanceId: string, params?: any[], instanceContextData?: Object, serializationSettings?: ISerializationSettings): Promise<T>;
    /**
    * Get a proxied object that represents the object registered with the given instance id on the remote side of this channel.
    *
    * @param instanceId - unique id of the registered object
    * @param contextData - Optional context data to pass to a registered object's factory method
    */
    getRemoteObjectProxy<T>(instanceId: string, contextData?: Object): Promise<T>;
    private invokeMethod;
    private getRegisteredObject;
    /**
    * Handle a received message on this channel. Dispatch to the appropriate object found via object registry
    *
    * @param rpcMessage - Message data
    * @return True if the message was handled by this channel. Otherwise false.
    */
    onMessage(rpcMessage: IJsonRpcMessage): boolean;
    owns(source: Window, origin: string, rpcMessage: IJsonRpcMessage): boolean;
    error(messageObj: IJsonRpcMessage, errorObj: Error): void;
    private _success;
    private _sendRpcMessage;
    private _customSerializeObject;
    private _registerProxyFunction;
    private _customDeserializeObject;
}
/**
* The registry of global XDM handlers
*/
export declare const globalObjectRegistry: IXDMObjectRegistry;
/**
* Manages XDM channels per target window/frame
*/
export declare const channelManager: IXDMChannelManager;
