/**
 * Expose utils and hooks here
 */

import * as hooks from './hooks';
import * as utils from './utils';
import { arrayHelper } from './utils/arrayHelper';
import { stringHelper } from './utils/stringHelper';
import { disposable } from './utils/usingDisposable';
export * from './types';

/** @type {*} */
const EchoUtils = {
    Hooks: hooks,
    Utils: utils,
    Array: arrayHelper,
    String: stringHelper,
    Disposable: disposable
};

export default EchoUtils;
