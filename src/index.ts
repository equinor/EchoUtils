/**
 * Expose utils and hooks here
 */

import * as hooks from './hooks';
import * as utils from './utils';
export * from './types';

/** @type {*} */
const EchoUtils = {
    Hooks: hooks,
    Utils: utils
};

export default EchoUtils;
