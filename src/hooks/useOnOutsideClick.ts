import useOnclickOutside, { Callback } from 'react-cool-onclickoutside';
import { Options, Return } from '../types/useOnOutsideClick';

/**
 * Hook which takes a callback and will trigger it
 * whenever someone clicks outside the ref that is returned.
 * @export
 * @param {Callback} callback
 * @return {*} A ref for the element the user will click outside of.
 */
export function useOnOutsideClick(callback: Callback, options?: Options): Return {
    const ref = useOnclickOutside(callback, options);
    return ref;
}
