import { fireAndForget } from '../utils/asyncUtils';

describe('fireAndForget', () => {
    it('should call the given async function', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const asyncFunction = jest.fn(async () => {});
        fireAndForget(asyncFunction);
        expect(asyncFunction).toHaveBeenCalled();
    });
});
