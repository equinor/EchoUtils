import { formatString } from './formatString';

describe('formatString', () => {
    it('should return test-test', () => {
        const test = formatString('test', 'test');
        expect(test).toEqual('test-test');
    });
    it('should return test-test1-test2', () => {
        const test = formatString('test', 'test1', 'test2');
        expect(test).toEqual('test-test1-test2');
    });
    it('should return test-test2', () => {
        const test = formatString('test', undefined, 'test2');
        expect(test).toEqual('test-test2');
    });
    it('should return test', () => {
        const test = formatString('test');
        expect(test).toEqual('test');
    });
    it('should return with no -', () => {
        const test = formatString('test', undefined);
        expect(test).toEqual('test');
    });

    it('should return -', () => {
        const test = formatString(undefined);
        expect(test).toEqual('-');
    });
    it('should also return-', () => {
        const test = formatString(undefined, undefined);
        expect(test).toEqual('-');
    });
    it('should return - if string is empty', () => {
        const test = formatString('', undefined);
        expect(test).toEqual('-');
    });
});
