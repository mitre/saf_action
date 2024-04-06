type CompareTypes = boolean | number | string | undefined;
export declare function sortBy<T>(arr: T[], fn: (i: T) => CompareTypes | CompareTypes[]): T[];
export declare function uniq<T>(arr: T[]): T[];
export declare function uniqWith<T>(arr: T[], fn: (a: T, b: T) => boolean): T[];
export {};
