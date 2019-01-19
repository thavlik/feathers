// @feathersjs/configuration pulls in default and <env> settings files using
// Node's `require()`.
// Node require() looks first for <filename>.js,
// and if not found, it will check for <filename>.json
//
// This configuration file has `.js` suffix, and must provide
// a `module.exports` containing the configuration properties.

const derivedSetting = 'Hello World';
const derivedEnvironment = 'NODE_ENV';

export default {
  from: 'testing',
  testEnvironment: 'NODE_ENV',
  derived: derivedSetting,
  derivedEnvironment: derivedEnvironment,
  deep: { merge: true }
};
