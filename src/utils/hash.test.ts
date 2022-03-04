import { createHash } from './hash';

describe('MD5 Hex-encoding', () => {
    it('should create an MD5 hash of an ASCII value', () => {
        expect(createHash('md5', 'echo')).toEqual('cbb11ed87dc8a95d81400c7f33c7c171');
    });

    it('should create an MD5 hash of an UTF-8 value', () => {
        expect(createHash('md5', '回波')).toEqual('35ed9c0e85e3ce800d46dd1925f4a2fe');
    });
});
