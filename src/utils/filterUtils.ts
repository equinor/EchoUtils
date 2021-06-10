interface Filter {
    [key: string]: string | number | boolean;
}

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
export function filterOnProps<T>(data: T[], propsToFilterOn: Filter): T[] {
    const filters = Object.keys(propsToFilterOn);
    let filteredData: T[] = [];
    for (const filter of filters) {
        filteredData = data.filter((d) => {
            if (typeof d === 'object' && d !== null && !Array.isArray(d)) {
                if ((d as Record<string, unknown>).hasOwnProperty(filter)) {
                    return (d as Record<string, unknown>)[filter] === propsToFilterOn[filter];
                } else return true;
            }
        });
    }
    return filteredData;
}