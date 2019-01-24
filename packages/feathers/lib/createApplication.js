"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uberproto_1 = __importDefault(require("uberproto"));
const application_1 = __importDefault(require("./application"));
// A base object Prototype that does not inherit from a
// potentially polluted Object prototype
const baseObject = Object.create(null);
function createApplication() {
    /*
    if (!(createApplication as any)._init) {
      Object.assign(createApplication, {
        _init: true,
        version,
        SKIP: hooks.SKIP,
        ACTIVATE_HOOKS,
        activateHooks
      });
    }
    */
    const app = Object.create(baseObject);
    // Mix in the base application
    uberproto_1.default.mixin(application_1.default, app);
    app.init();
    return app;
}
exports.createApplication = createApplication;
//# sourceMappingURL=createApplication.js.map