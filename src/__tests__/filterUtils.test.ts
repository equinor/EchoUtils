import { filterOnProps } from '../utils/filterUtils';

const object1 = {
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 3
};

const object2 = {
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 'prop3'
};

const object3 = {
    prop1: 'prop1',
    prop2: 'prop3',
    prop3: true
};

describe('filterOnProps', () => {
    it('should return unfiltered data if filter prop does not exist', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop5: 2 });
        expect(filteredData).toEqual(data);
    });
    it('should return filtered data if filter prop exists, and the value matches', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop2: 'prop2' });
        expect(filteredData).toEqual([object1, object2]);
    });
    it('should be able to filter on strings, numbers and boolean values', () => {
        const data = [object1, object2, object3];

        const stringFilteredData = filterOnProps(data, { prop2: 'prop2' });
        expect(stringFilteredData).toEqual([object1, object2]);

        const numberFilteredData = filterOnProps(data, { prop3: 3 });
        expect(numberFilteredData).toEqual([object1]);

        const booleanFilteredData = filterOnProps(data, { prop3: true });
        expect(booleanFilteredData).toEqual([object3]);
    });
    it('should be able to filter on several values at once', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop1: 'prop1', prop2: 'prop2' });
        expect(filteredData).toEqual([object1, object2]);
    });
    it('if the provided filter only has one matching key, it should only consider that key when filtering', () => {
        const data = [object1, object2, object3];

        const filteredData = filterOnProps(data, { prop4: 'prop3', prop5: 'prop99', prop3: true });
        expect(filteredData).toEqual([object3]);
    });
});
