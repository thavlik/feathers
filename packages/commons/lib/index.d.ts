export { default as hooks } from "./hooks";
export { default as utils } from "./utils";
declare const _default: {
    hooks: {
        SKIP: any;
        ACTIVATE_HOOKS: any;
        createHookObject: (method: any, data?: any) => any;
        defaultMakeArguments: typeof import("./hooks").defaultMakeArguments;
        makeArguments: typeof import("./hooks").makeArguments;
        convertHookData: typeof import("./hooks").convertHookData;
        isHookObject: typeof import("./hooks").isHookObject;
        getHooks: typeof import("./hooks").getHooks;
        processHooks: typeof import("./hooks").processHooks;
        enableHooks: typeof import("./hooks").enableHooks;
    };
    utils: {
        stripSlashes: (name: string) => string;
        _: {
            each(obj: any, callback: any): void;
            some(value: any, callback: any): boolean;
            every(value: any, callback: any): boolean;
            keys(obj: any): string[];
            values(obj: any): any[];
            isMatch(obj: any, item: any): boolean;
            isEmpty(obj: any): boolean;
            isObject(item: any): boolean;
            isObjectOrArray(value: any): boolean;
            extend(...args: any[]): any;
            omit(obj: any, ...keys: any[]): any;
            pick(source: any, ...keys: any[]): any;
            merge(target: any, source: any): any;
        };
        isPromise: typeof import("./utils").isPromise;
        makeUrl: typeof import("./utils").makeUrl;
        createSymbol: typeof import("./utils").createSymbol;
    };
};
export default _default;
export { ACTIVATE_HOOKS, SKIP, convertHookData, createHookObject, defaultMakeArguments, enableHooks, getHooks, isHookObject, makeArguments, processHooks } from "./hooks";
export { _, createSymbol, isPromise, makeUrl, stripSlashes } from "./utils";
