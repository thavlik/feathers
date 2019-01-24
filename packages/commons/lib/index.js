"use strict";
// const utils = require('./utils');
// const hooks = require('./hooks');
// module.exports = Object.assign({}, utils, { hooks });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("./hooks");
exports.hooks = hooks_1.default;
var utils_1 = require("./utils");
exports.utils = utils_1.default;
const hooks_2 = __importDefault(require("./hooks"));
const utils_2 = __importDefault(require("./utils"));
exports.default = {
    hooks: hooks_2.default,
    utils: utils_2.default
};
var hooks_3 = require("./hooks");
exports.ACTIVATE_HOOKS = hooks_3.ACTIVATE_HOOKS;
exports.SKIP = hooks_3.SKIP;
exports.convertHookData = hooks_3.convertHookData;
exports.createHookObject = hooks_3.createHookObject;
exports.defaultMakeArguments = hooks_3.defaultMakeArguments;
exports.enableHooks = hooks_3.enableHooks;
exports.getHooks = hooks_3.getHooks;
exports.isHookObject = hooks_3.isHookObject;
exports.makeArguments = hooks_3.makeArguments;
exports.processHooks = hooks_3.processHooks;
var utils_3 = require("./utils");
exports._ = utils_3._;
exports.createSymbol = utils_3.createSymbol;
exports.isPromise = utils_3.isPromise;
exports.makeUrl = utils_3.makeUrl;
exports.stripSlashes = utils_3.stripSlashes;
//# sourceMappingURL=index.js.map