import { getKeyByValue } from '../../utils/getKeyByValue';

describe('getKeyByValue', () => {
    it('should return myKey and not myKey2', () => {
        const test = getKeyByValue({ myKey: 'test', myKey2: 'test2' }, 'test');
        expect(test).toEqual('myKey');
        expect(test).not.toEqual('myKey2');
    });
    it('should return myKey and not test', () => {
        const test = getKeyByValue({ myKey: true, test: true }, true);
        expect(test).toEqual('myKey');
        expect(test).not.toEqual('test');
    });
});
