const makeDebug = require('debug');
import path from 'path';
import { Application } from '@feathersjs/feathers';

const debug = makeDebug('@feathersjs/configuration');
import config from 'config';
const separator = path.sep;

export function init () {
  return function<ServiceTypes>()  {
    let app: Application<ServiceTypes> = this;

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
          } else {
            if (process.env[value]) {
              value = process.env[value];
            } else if (value.indexOf('.') === 0 || value.indexOf('..') === 0) {
              // Make relative paths absolute
              value = path.resolve(
                path.join(config.util.getEnv('NODE_CONFIG_DIR')),
                value.replace(/\//g, separator)
              );
            }
          }
        }

        result[name] = value;
      });

      return result;
    };

    const env = config.util.getEnv('NODE_ENV');
    const conf = convert(config);

    debug(`Initializing configuration for ${env} environment`);

    if (!app || app as any === global) {
      return conf;
    }

    Object.keys(conf).forEach(name => {
      let value = conf[name];
      debug(`Setting ${name} configuration value to`, value);
      app.set(name, value);
    });
  };
}
export default init;
