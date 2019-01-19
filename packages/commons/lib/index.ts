// const utils = require('./utils');
// const hooks = require('./hooks');
// module.exports = Object.assign({}, utils, { hooks });

export { default as hooks } from "./hooks";
export { default as utils } from "./utils";

import { default as hooks } from "./hooks";
import { default as utils } from "./utils";

export default {
    hooks,
    utils
};

export {
    ACTIVATE_HOOKS,
    SKIP,
    convertHookData,
    createHookObject,
    defaultMakeArguments,
    enableHooks,
    getHooks,
    isHookObject,
    makeArguments,
    processHooks
} from "./hooks";

export {
    _,
    createSymbol,
    isPromise,
    makeUrl,
    stripSlashes
} from "./utils";