import { arraysIsEqual } from '../utils/arrayUtils';

describe('arraysIsEqual', () => {
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
    it('should return false if the values do not have the same order and ignoreOrder flag is not passed', () => {
        const a1 = [1, 2, 3, 4];
        const a2 = [1, 3, 2, 4];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(false);
    });
    it('should return true if the values do not have the same order and ignoreOrder flag is passed', () => {
        const a1 = [1, 2, 3, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3]}}, 4];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3]}}];
        const result = arraysIsEqual(a1, a2, true);
        expect(result).toBe(true);
    });
    it('should return true for equal arrays with object and array values', () => {
        const a1 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3]}}];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3]}}];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(true);
    });
    it('should return false for non-equal arrays with object and array values', () => {
        const a1 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3]}}];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 'val']}}];
        const result = arraysIsEqual(a1, a2);
        expect(result).toBe(false);
    });
});
