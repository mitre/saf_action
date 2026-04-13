import type { EvaluateOptions, ReferenceObject } from "../types";
export declare const getReferenceValue: ({ ref }: ReferenceObject, options: EvaluateOptions) => string | number | boolean | import("@smithy/types").EndpointPartition | import("@smithy/types").EndpointARN | {
    [key: string]: import("../types").FunctionReturn;
};
