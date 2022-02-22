/* eslint-disable @typescript-eslint/no-explicit-any */
import { filterOnProps } from './filterUtils';

const object1 = {
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 3,
    prop4: new Date(2018, 11, 24, 10, 33, 30, 0)
};

const object2 = {
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 'prop3',
    prop4: new Date(2019, 11, 24, 10, 33, 30, 0)
};

const object3 = {
    prop1: 'prop1',
    prop2: 'prop3',
    prop3: true,
    prop4: new Date(2020, 11, 24, 10, 33, 30, 0)
};

describe('filterOnProps', () => {
    it('should return unfiltered data if filter prop does not exist', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop5: 2 } as any);
        expect(filteredData).toEqual(data);
    });
    it('should return filtered data if filter prop exists, and the value matches', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop2: 'prop2' } as any);
        expect(filteredData).toEqual([object1, object2]);
    });
    it('should be able to filter on strings, numbers, boolean values and dates', () => {
        const data = [object1, object2, object3];

        const stringFilteredData = filterOnProps(data, { prop2: 'prop2' } as any);
        expect(stringFilteredData).toEqual([object1, object2]);

        const numberFilteredData = filterOnProps(data, { prop3: 3 } as any);
        expect(numberFilteredData).toEqual([object1]);

        const booleanFilteredData = filterOnProps(data, { prop3: true } as any);
        expect(booleanFilteredData).toEqual([object3]);

        const filterDate = new Date(2018, 11, 24, 10, 33, 30, 0);
        const dateFilteredData = filterOnProps(data, { prop4: filterDate } as any);
        expect(dateFilteredData).toEqual([object1]);
    });
    it('should be able to filter on several values at once', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop1: 'prop1', prop2: 'prop2' } as any);
        expect(filteredData).toEqual([object1, object2]);
    });
    it('if the provided filter only has one matching key, it should only consider that key when filtering', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop6: 'prop3', prop5: 'prop99', prop3: true } as any);
        expect(filteredData).toEqual([object3]);
    });
});
