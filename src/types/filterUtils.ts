export type Filter<T> = {
    [K in keyof T]: T[K];
};
