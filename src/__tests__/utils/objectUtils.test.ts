import { deepIsEqual, findValueInObjectValues, objectIsEmpty } from '../../utils/objectUtils';

describe('objectIsEmpty', () => {
    it('should return true if all values are empty in an object', () => {
        const testObject = {
            val1: '',
            val2: [],
            val3: {}
        };
        const result = objectIsEmpty(testObject);
        expect(result).toBe(true);
    });
    it('should return false if there are one or more non-empty values', () => {
        const testObject1 = {
            val1: 'Value',
            val2: [],
            val3: {}
        };
        const testObject2 = {
            val1: '',
            val2: ['Value'],
            val3: {}
        };
        const testObject3 = {
            val1: '',
            val2: [],
            val3: { value: 'value' }
        };
        const result1 = objectIsEmpty(testObject1);
        const result2 = objectIsEmpty(testObject2);
        const result3 = objectIsEmpty(testObject3);
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
    });
    it('should return false if there is a nested object value present', () => {
        const testObject = {
            val1: '',
            val2: [],
            val3: { nestedVal1: { nestedVal2: 1 } }
        };
        const result = objectIsEmpty(testObject);
        expect(result).toBe(false);
    });
    it('should return false for different types of values', () => {
        const testObject1 = {
            val1: 1,
            val2: [],
            val3: {}
        };
        const testObject2 = {
            val1: '',
            val2: true,
            val3: {}
        };
        const testObject3 = {
            val1: '',
            val2: [],
            val3: { value: 'value' }
        };
        const testObject4 = {
            val1: '',
            val2: [true, 12],
            val3: {}
        };
        const result1 = objectIsEmpty(testObject1);
        const result2 = objectIsEmpty(testObject2);
        const result3 = objectIsEmpty(testObject3);
        const result4 = objectIsEmpty(testObject4);
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);
    });
});

describe('deepIsEqual with objects', () => {
    it('should return true if all values in the objects are equal', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: true }
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: true }
        };
        const result = deepIsEqual(testObject1, testObject2);
        expect(result).toBe(true);
    });
    it('should return false if any values are not equal', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: true }
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: false }
        };
        const result = deepIsEqual(testObject1, testObject2);
        expect(result).toBe(false);
    });
    it('should return false if key names do not match', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: true }
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val4: { prop1: true }
        };
        const result = deepIsEqual(testObject1, testObject2);
        expect(result).toBe(false);
    });
    it('should ignore the order of the properties', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: { prop1: true }
        };
        const testObject2 = {
            val2: [1, 2, 3],
            val1: 'val',
            val3: { prop1: true }
        };
        const result = deepIsEqual(testObject1, testObject2);
        expect(result).toBe(true);
    });
});

describe('deepIsEqual with arrays', () => {
    it('should return true if all values are equal in the arrays', () => {
        const a1 = [1, 'val', 3, 4];
        const a2 = [1, 'val', 3, 4];
        const result = deepIsEqual(a1, a2);
        expect(result).toBe(true);
    });
    it('should return false if not all values are equal in the arrays', () => {
        const a1 = [1, 'val', 3, 4];
        const a2 = [1, 2, 3, 4];
        const result = deepIsEqual(a1, a2);
        expect(result).toBe(false);
    });
    it('should return false if the values do not have the same order and ignoreOrder flag is not passed', () => {
        const a1 = [1, 2, 3, 4];
        const a2 = [1, 3, 2, 4];
        const result = deepIsEqual(a1, a2);
        expect(result).toBe(false);
    });
    it('should return true if the values do not have the same order and ignoreOrder flag is passed', () => {
        const a1 = [1, 2, 3, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3] } }, 4];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3] } }];
        const result = deepIsEqual(a1, a2, true);
        expect(result).toBe(true);
    });
    it('should return true for equal arrays with object and array values', () => {
        const a1 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3] } }];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3] } }];
        const result = deepIsEqual(a1, a2);
        expect(result).toBe(true);
    });
    it('should return false for non-equal arrays with object and array values', () => {
        const a1 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 3] } }];
        const a2 = [1, 2, 3, 4, { prop1: 1, prop2: { nestedProp1: 'val', nestedProp2: [1, 2, 'val'] } }];
        const result = deepIsEqual(a1, a2);
        expect(result).toBe(false);
    });
});

describe('findValueInObjectValues', () => {
    it('should return selected value', () => {
        const a = {
            '1': 1,
            '2': 2,
            '3': 3
        };
        const result = findValueInObjectValues(a, '1');
        expect(result).toStrictEqual([1]);
    });
});
