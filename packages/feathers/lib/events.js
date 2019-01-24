"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const uberproto_1 = __importDefault(require("uberproto"));
// Returns a hook that emits service events. Should always be
// used as the very last hook in the chain
function eventHook() {
    return function (hook) {
        const { app, service } = hook;
        const eventName = app.eventMappings[hook.method];
        const isHookEvent = service._hookEvents && service._hookEvents.indexOf(eventName) !== -1;
        // If this event is not being sent yet and we are not in an error hook
        if (eventName && isHookEvent && hook.type !== 'error') {
            const results = Array.isArray(hook.result) ? hook.result : [hook.result];
            results.forEach(element => service.emit(eventName, element, hook));
        }
    };
}
exports.eventHook = eventHook;
;
// Mixin that turns a service into a Node event emitter
function eventMixin(service) {
    if (service._serviceEvents) {
        return;
    }
    const app = this;
    // Indicates if the service is already an event emitter
    const isEmitter = typeof service.on === 'function' &&
        typeof service.emit === 'function';
    // If not, mix it in (the service is always an Uberproto object that has a .mixin)
    if (typeof service.mixin === 'function' && !isEmitter) {
        service.mixin(events_1.EventEmitter.prototype);
    }
    // Define non-enumerable properties of
    Object.defineProperties(service, {
        // A list of all events that this service sends
        _serviceEvents: {
            value: Array.isArray(service.events) ? service.events.slice() : []
        },
        // A list of events that should be handled through the event hooks
        _hookEvents: {
            value: []
        }
    });
    // `app.eventMappings` has the mapping from method name to event name
    Object.keys(app.eventMappings).forEach(method => {
        const event = app.eventMappings[method];
        const alreadyEmits = service._serviceEvents.indexOf(event) !== -1;
        // Add events for known methods to _serviceEvents and _hookEvents
        // if the service indicated it does not send it itself yet
        if (typeof service[method] === 'function' && !alreadyEmits) {
            service._serviceEvents.push(event);
            service._hookEvents.push(event);
        }
    });
}
exports.eventMixin = eventMixin;
;
function default_1() {
    return function (app) {
        // Mappings from service method to event name
        Object.assign(app, {
            eventMappings: {
                create: 'created',
                update: 'updated',
                remove: 'removed',
                patch: 'patched'
            }
        });
        // Register the event hook
        // `finally` hooks always run last after `error` and `after` hooks
        app.hooks({ finally: eventHook() });
        // Make the app an event emitter
        uberproto_1.default.mixin(events_1.EventEmitter.prototype, app);
        app.mixins.push(eventMixin);
    };
}
exports.default = default_1;
;
//# sourceMappingURL=events.js.map