import useOnclickOutside, { Callback } from 'react-cool-onclickoutside';

/**
 * Hook which takes a callback and will trigger it
 * whenever someone clicks outside the ref that is returned.
 * @export
 * @param {Callback} callback
 * @return {*} A ref for the element the user will click outside of.
 */
export function useOnOutsideClick(callback: Callback): any {
    const ref = useOnclickOutside(callback)
    return ref;
}
