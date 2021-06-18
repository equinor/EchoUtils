export type Filter<T> = {
    [K in keyof T]: T[K];
};

/**
 * A function for filtering lists of objects.
 * It takes in a list of objects, and an object to filter on.
 * The filter value may be a string, number or boolean.
 * @export
 * @template T
 * @param {T[]} data
 * @param {Filter} propsToFilterOn
 * @return {*}  {T[]}
 */
export function filterOnProps<T>(data: T[], propsToFilterOn: Filter<T>): T[] {
    const filters = Object.keys(propsToFilterOn);
    let filterData: T[] = data;
    for (const filter of filters) {
        filterData = filterData.filter((d) => {
            if (typeof d === 'object' && d !== null && !Array.isArray(d)) {
                if ((d as Record<string, unknown>).hasOwnProperty(filter)) {
                    const filterValueFromData = (d as Record<string, unknown>)[filter];
                    const filterValueFromFilter = propsToFilterOn[filter];
                    return filterValueFromData instanceof Date && filterValueFromFilter instanceof Date
                        ? filterValueFromData.getTime() === filterValueFromFilter.getTime()
                        : filterValueFromData === filterValueFromFilter;
                } else return true;
            }
        });
    }
    return filterData;
}
