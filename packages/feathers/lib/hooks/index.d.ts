import { Application, Service } from '../application';
export declare const ACTIVATE_HOOKS: any;
export declare function withHooks(args: {
    app: Application;
    service: Service<any>;
    method: string;
    original?: Function;
}): (_hooks?: {}) => (...args: any[]) => any;
export declare function hookMixin(service: any): void;
export default function (): (app: any) => void;
export declare function activateHooks(args: any): (fn: any) => any;
