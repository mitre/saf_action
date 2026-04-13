import { coalesce, ite, split } from "../lib";
export declare const endpointFunctions: {
    booleanEquals: (value1: boolean, value2: boolean) => boolean;
    coalesce: typeof coalesce;
    getAttr: (value: import("../lib").GetAttrValue, path: string) => import("../lib").GetAttrValue;
    isSet: (value: unknown) => value is {};
    isValidHostLabel: (value: string, allowSubDomains?: boolean) => boolean;
    ite: typeof ite;
    not: (value: boolean) => boolean;
    parseURL: (value: string | URL | import("@smithy/types").Endpoint) => import("@smithy/types").EndpointURL | null;
    split: typeof split;
    stringEquals: (value1: string, value2: string) => boolean;
    substring: (input: string, start: number, stop: number, reverse: boolean) => string | null;
    uriEncode: (value: string) => string;
};
