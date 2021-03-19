import { fireAndForget } from '../utils/asyncUtils';

describe('fireAndForget', () => {
    it('should call the given async function', () => {
        const asyncFunction = jest.fn(async () => console.log('I am called'));
        fireAndForget(asyncFunction);
        expect(asyncFunction).toHaveBeenCalled();
    });
});
