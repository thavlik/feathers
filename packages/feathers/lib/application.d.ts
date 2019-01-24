/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type Id = number | string;
export declare type NullableId = Id | null;
export interface Query {
    [key: string]: any;
}
export interface PaginationOptions {
    default: number;
    max: number;
}
export declare type ClientSideParams = Pick<Params, 'query' | 'paginate'>;
export declare type ServerSideParams = Params;
export interface Params {
    query?: Query;
    paginate?: false | Pick<PaginationOptions, 'max'>;
    [key: string]: any;
}
export interface Paginated<T> {
    total: number;
    limit: number;
    skip: number;
    data: T[];
}
export declare type Hook = (hook: HookContext) => (Promise<HookContext | SkipSymbol | void> | HookContext | SkipSymbol | void);
export declare type SkipSymbol = symbol | '__feathersSkipHooks';
export interface HookContext<T = any> {
    /**
     * A read only property that contains the Feathers application object. This can be used to
     * retrieve other services (via context.app.service('name')) or configuration values.
     */
    readonly app: Application;
    /**
     * A writeable property containing the data of a create, update and patch service
     * method call.
     */
    data?: T;
    /**
     * A writeable property with the error object that was thrown in a failed method call.
     * It is only available in error hooks.
     */
    error?: any;
    /**
     * A writeable property and the id for a get, remove, update and patch service
     * method call. For remove, update and patch context.id can also be null when
     * modifying multiple entries. In all other cases it will be undefined.
     */
    id?: string | number;
    /**
     * A read only property with the name of the service method (one of find, get,
     * create, update, patch, remove).
     */
    readonly method: string;
    /**
     * A writeable property that contains the service method parameters (including
     * params.query).
     */
    params: Params;
    /**
     * A read only property and contains the service name (or path) without leading or
     * trailing slashes.
     */
    readonly path: string;
    /**
     * A writeable property containing the result of the successful service method call.
     * It is only available in after hooks.
     *
     * `context.result` can also be set in
     *
     *  - A before hook to skip the actual service method (database) call
     *  - An error hook to swallow the error and return a result instead
     */
    result?: T;
    /**
     * A read only property and contains the service this hook currently runs on.
     */
    readonly service: Service<T>;
    /**
     * A writeable, optional property and contains a "safe" version of the data that
     * should be sent to any client. If context.dispatch has not been set context.result
     * will be sent to the client instead.
     */
    dispatch?: T;
    /**
     * A writeable, optional property that allows to override the standard HTTP status
     * code that should be returned.
     */
    statusCode?: number;
    /**
     * A read only property with the hook type (one of before, after or error).
     */
    readonly type: "before" | "after" | "error";
}
export interface HookMap {
    all: Hook | Hook[];
    find: Hook | Hook[];
    get: Hook | Hook[];
    create: Hook | Hook[];
    update: Hook | Hook[];
    patch: Hook | Hook[];
    remove: Hook | Hook[];
}
export interface HooksObject {
    before: Partial<HookMap>;
    after: Partial<HookMap>;
    error: Partial<HookMap>;
}
export interface ServiceMethods<T> {
    find(params?: Params): Promise<T | T[] | Paginated<T>>;
    get(id: Id, params?: Params): Promise<T>;
    create(data: Partial<T> | Array<Partial<T>>, params?: Params): Promise<T | T[]>;
    update(id: NullableId, data: T, params?: Params): Promise<T>;
    patch(id: NullableId, data: Partial<T>, params?: Params): Promise<T>;
    remove(id: NullableId, params?: Params): Promise<T>;
}
export interface SetupMethod {
    setup(app: Application, path: string): void;
}
export interface ServiceOverloads<T> {
    create(data: Array<Partial<T>>, params?: Params): Promise<T[]>;
    create(data: Partial<T>, params?: Params): Promise<T>;
    patch(id: NullableId, data: Pick<T, keyof T>, params?: Params): Promise<T>;
}
export interface ServiceAddons<T> extends EventEmitter {
    hooks(hooks: Partial<HooksObject>): this;
    setup(app: Application, location: string): void;
}
export declare type Service<T> = ServiceOverloads<T> & ServiceAddons<T> & ServiceMethods<T>;
export interface Application<ServiceTypes = any> extends EventEmitter {
    get(this: Application, name: string): any;
    set(this: Application, name: string, value: any): this;
    /** Disables the service with the given name */
    disable(this: Application, name: string): this;
    /** Returns true if the service is disabled */
    disabled(this: Application, name: string): boolean;
    /** Enables a disabled service with the given name */
    enable(this: Application, name: string): this;
    /** Returns true if the service is enabled */
    enabled(this: Application, name: string): boolean;
    /** Invokes the callback, passing the app as the this parameter
     * and as the first argument. */
    configure(this: Application, callback: (this: this, app: this) => void): this;
    /** Registers app-wide hooks */
    hooks(this: Application, hooks: Partial<HooksObject>): this;
    /** Sets up the app and each service */
    setup(this: Application, server?: any): this;
    /** Retrieves a service */
    service<L extends keyof ServiceTypes>(this: Application, location: L): Service<ServiceTypes[L]>;
    /** Retrieves a service */
    service(this: Application, location: string): Service<any>;
    /** Mounts a service at the specified path */
    use(this: Application, path: string, service: Partial<ServiceMethods<any> & SetupMethod> | Application, options?: any): this;
    version: string;
    /**
     * Internal members
     */
    init(this: Application<ServiceTypes>): void;
    mixins: Function[];
    services: {
        [name: string]: Service<any>;
    };
    providers: any[];
    settings: {
        [name: string]: boolean;
    };
    methods: string[];
    _isSetup: boolean;
    hookTypes: string[];
}
declare const application: Application;
export default application;
