import { arrayHelper } from './arrayHelper';

describe('arrayHelper distinct', () => {
    const inputArray: ReadonlyArray<MockPerson> = [
        { name: 'a', age: 32 },
        { name: 'a', age: 32 },
        { name: 'b', age: 32 },
        { name: 'a', age: 64 }
    ];

    it('should remove duplicates based on all properties if compare function is not specified ', () => {
        const actual = arrayHelper.distinct(inputArray);
        expect(actual).toStrictEqual([
            { name: 'a', age: 32 },
            { name: 'b', age: 32 },
            { name: 'a', age: 64 }
        ]);
    });

    it('should remove all duplicates based on specified compare function by name', () => {
        const actual = arrayHelper.distinct(inputArray, (a, b) => a.name === b.name);
        expect(actual).toStrictEqual([
            { name: 'a', age: 32 },
            { name: 'b', age: 32 }
        ]);
    });

    it('should remove duplicates based on specified compared function by several properties', () => {
        const actual = arrayHelper.distinct(inputArray, (a, b) => a.age === b.age && a.name === b.name);
        expect(actual).toStrictEqual([
            { name: 'a', age: 32 },
            { name: 'b', age: 32 },
            { name: 'a', age: 64 }
        ]);
    });
});

interface MockPerson {
    name: string;
    age: number;
}
