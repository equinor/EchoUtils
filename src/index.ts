/**
 * Expose utils and hooks here
 */

import * as hooks from './hooks';
import * as utils from './utils';
import { arrayHelper } from './utils/arrayHelper';
import { colorHelper } from './utils/color';
import { stringHelper } from './utils/stringHelper';
import { disposable } from './utils/usingDisposable';

/**
 * Use named exports here.
 */
export * from './hooks';
export * from './types';
export * from './utils';
export { arrayHelper } from './utils/arrayHelper';
export { colorHelper } from './utils/color';
export * from './utils/deviceInfo/deepDeviceInfo';
export * from './utils/deviceInfo/deviceInfo';
export { stringHelper } from './utils/stringHelper';
export { disposable } from './utils/usingDisposable';

/**
 * @type {*} */
const EchoUtils = {
    Hooks: hooks,
    Utils: utils,
    Array: arrayHelper,
    String: stringHelper,
    Color: colorHelper,
    Disposable: disposable
};

export default EchoUtils;
