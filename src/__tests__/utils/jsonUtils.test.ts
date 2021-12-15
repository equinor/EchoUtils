import { parseJsonWithDate } from '../../utils/jsonUtils';

describe('parseJsonWithDate', () => {
    it('should parse JSON strings and keep Date types', () => {
        const testObject = {
            aString: 'test',
            aDate: new Date(),
            aNumber: 12,
            aNestedDate: {
                anotherDate: new Date(),
                anotherString: 'test'
            }
        };

        const jsonString = JSON.stringify(testObject);
        const result = parseJsonWithDate(jsonString);

        expect(result).toEqual(testObject);
    });
});
