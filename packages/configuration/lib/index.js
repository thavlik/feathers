"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeDebug = require('debug');
const path_1 = __importDefault(require("path"));
const debug = makeDebug('@feathersjs/configuration');
const config_1 = __importDefault(require("config"));
const separator = path_1.default.sep;
function init() {
    return function () {
        let app = this;
        const convert = current => {
            const result = Array.isArray(current) ? [] : {};
            Object.keys(current).forEach(name => {
                let value = current[name];
                if (typeof value === 'object' && value !== null) {
                    value = convert(value);
                }
                if (typeof value === 'string') {
                    if (value.indexOf('\\') === 0) {
                        value = value.replace('\\', '');
                    }
                    else {
                        if (process.env[value]) {
                            value = process.env[value];
                        }
                        else if (value.indexOf('.') === 0 || value.indexOf('..') === 0) {
                            // Make relative paths absolute
                            value = path_1.default.resolve(path_1.default.join(config_1.default.util.getEnv('NODE_CONFIG_DIR')), value.replace(/\//g, separator));
                        }
                    }
                }
                result[name] = value;
            });
            return result;
        };
        const env = config_1.default.util.getEnv('NODE_ENV');
        const conf = convert(config_1.default);
        debug(`Initializing configuration for ${env} environment`);
        if (!app || app === global) {
            return conf;
        }
        Object.keys(conf).forEach(name => {
            let value = conf[name];
            debug(`Setting ${name} configuration value to`, value);
            app.set(name, value);
        });
    };
}
exports.init = init;
exports.default = init;
//# sourceMappingURL=index.js.map