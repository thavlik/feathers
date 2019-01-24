import { hooks } from '@feathersjs/commons';
import Proto from 'uberproto';
import applicationMixin, { Application } from './application';
import version from './version';
import { ACTIVATE_HOOKS, activateHooks } from './hooks';
// A base object Prototype that does not inherit from a
// potentially polluted Object prototype
const baseObject = Object.create(null);

export function createApplication<ServiceTypes>(): Application<ServiceTypes> {
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
  const app = Object.create(baseObject) as Application<ServiceTypes>;

  // Mix in the base application
  Proto.mixin(applicationMixin, app);

  app.init();

  return app;
}
