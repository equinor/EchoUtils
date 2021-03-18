import { arraysIsEqual } from '../utils/arrayUtils';

describe('objectIsEmpty', () => {
    it('should return true if all values are equal in the arrays', () => {
        const a1 = [1, 'val', 3, 4];
        const a2 = [1, 'val', 3, 4];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(true);
    });
    it('should return false if not all values are equal in the arrays', () => {
        const a1 = [1, 'val', 3, 4];
        const a2 = [1, 2, 3, 4];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(false);
    });
    it('should return false if the values do not have the same order', () => {
        const a1 = [1, 2, 3, 4];
        const a2 = [1, 3, 2, 4];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(false);
    });
});
