import { RefObject, useEffect } from 'react';
const useInitialFocus = (ref: RefObject<HTMLInputElement>): void => {
    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);
};
export default useInitialFocus;
