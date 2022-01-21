/**
 * Expose utils and hooks here
 */

import * as hooks from './hooks';
import * as utils from './utils';
import { arrayHelper } from './utils/arrayHelper';
import { colorHelper } from './utils/color';
import { stringHelper } from './utils/stringHelper';
import { disposable } from './utils/usingDisposable';
export * from './types';

/** @type {*} */
const EchoUtils = {
    Hooks: hooks,
    Utils: utils,
    Array: arrayHelper,
    String: stringHelper,
    Color: colorHelper,
    Disposable: disposable
};

export default EchoUtils;
