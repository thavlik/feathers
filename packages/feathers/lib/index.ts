import { hooks } from '@feathersjs/commons';
import Proto from 'uberproto';
import Application from './application';
import version from './version';
const { ACTIVATE_HOOKS, activateHooks } = require('./hooks');
// A base object Prototype that does not inherit from a
// potentially polluted Object prototype
const baseObject = Object.create(null);

export function createApplication () {
  const app = Object.create(baseObject);

  // Mix in the base application
  Proto.mixin(Application, app);

  app.init();

  return app;
}

createApplication.version = version;
createApplication.SKIP = hooks.SKIP;
createApplication.ACTIVATE_HOOKS = ACTIVATE_HOOKS;
createApplication.activateHooks = activateHooks;

export default createApplication;

export {
  Application,
  ClientSideParams,
  Hook,
  HookContext,
  HookMap,
  HooksObject,
  Id,
  NullableId,
  Paginated,
  PaginationOptions,
  Params,
  Query,
  ServerSideParams,
  Service,
  ServiceAddons,
  ServiceMethods,
  ServiceOverloads,
  SetupMethod,
  SkipSymbol
} from "./application";

export {
  eventHook,
  eventMixin
} from "./events";

export { default as version } from "./version";

export {
  ACTIVATE_HOOKS,
  activateHooks,
  hookMixin,
  withHooks
} from "./hooks/index";