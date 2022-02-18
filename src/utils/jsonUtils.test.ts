import { parseJsonWithDate } from '../../utils/jsonUtils';

describe('parseJsonWithDate', () => {
    it('should parse JSON strings and keep Date types', () => {
        // given
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

        // when
        const result = parseJsonWithDate(jsonString);

        // then
        expect(result).toEqual(testObject);
    });
});
