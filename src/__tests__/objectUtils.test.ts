import { objectIsEmpty, objectsIsEqual } from '../utils/objectUtils';

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

describe('objectsIsEqual', () => {
    it('should return true if all values in the objects are equal', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: true}
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: true}
        };
        const result = objectsIsEqual(testObject1, testObject2);
        expect(result).toBe(true);
    });
    it('should return false if any values are not equal', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: true}
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: false}
        };
        const result = objectsIsEqual(testObject1, testObject2);
        expect(result).toBe(false);
    });
    it('should return false if key names do not match', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: true}
        };
        const testObject2 = {
            val1: 'val',
            val2: [1, 2, 3],
            val4: {prop1: true}
        };
        const result = objectsIsEqual(testObject1, testObject2);
        expect(result).toBe(false);
    });
    it('should ignore the order of the properties', () => {
        const testObject1 = {
            val1: 'val',
            val2: [1, 2, 3],
            val3: {prop1: true}
        };
        const testObject2 = {
            val2: [1, 2, 3],
            val1: 'val',
            val3: {prop1: true}
        };
        const result = objectsIsEqual(testObject1, testObject2);
        expect(result).toBe(true);
    });
});

