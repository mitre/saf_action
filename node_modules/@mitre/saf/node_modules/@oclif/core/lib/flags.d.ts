/// <reference types="node" />
import { URL } from 'node:url';
import { BooleanFlag, CustomOptions, FlagDefinition, OptionFlag } from './interfaces';
type NotArray<T> = T extends Array<any> ? never : T;
export declare function custom<T = string, P extends CustomOptions = CustomOptions>(defaults: Partial<OptionFlag<T[], P>> & {
    multiple: true;
} & ({
    default: OptionFlag<T[], P>['default'];
} | {
    required: true;
})): FlagDefinition<T, P, {
    multiple: true;
    requiredOrDefaulted: true;
}>;
export declare function custom<T = string, P extends CustomOptions = CustomOptions>(defaults: Partial<OptionFlag<NotArray<T>, P>> & {
    multiple?: false | undefined;
} & ({
    default: OptionFlag<NotArray<T>, P>['default'];
} | {
    required: true;
})): FlagDefinition<T, P, {
    multiple: false;
    requiredOrDefaulted: true;
}>;
export declare function custom<T = string, P extends CustomOptions = CustomOptions>(defaults: Partial<OptionFlag<NotArray<T>, P>> & {
    default?: OptionFlag<NotArray<T>, P>['default'] | undefined;
    multiple?: false | undefined;
    required?: false | undefined;
}): FlagDefinition<T, P, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare function custom<T = string, P extends CustomOptions = CustomOptions>(defaults: Partial<OptionFlag<T[], P>> & {
    default?: OptionFlag<T[], P>['default'] | undefined;
    multiple: true;
    required?: false | undefined;
}): FlagDefinition<T, P, {
    multiple: true;
    requiredOrDefaulted: false;
}>;
export declare function custom<T = string, P extends CustomOptions = CustomOptions>(): FlagDefinition<T, P, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare function boolean<T = boolean>(options?: Partial<BooleanFlag<T>>): BooleanFlag<T>;
export declare const integer: FlagDefinition<number, {
    max?: number | undefined;
    min?: number | undefined;
}, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare const directory: FlagDefinition<string, {
    exists?: boolean | undefined;
}, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare const file: FlagDefinition<string, {
    exists?: boolean | undefined;
}, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
export declare const url: FlagDefinition<URL, CustomOptions, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare const string: FlagDefinition<string, CustomOptions, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare const version: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
export declare const help: (opts?: Partial<BooleanFlag<boolean>>) => BooleanFlag<void>;
type ReadonlyElementOf<T extends ReadonlyArray<unknown>> = T[number];
export declare function option<T extends readonly string[], P extends CustomOptions>(defaults: Partial<OptionFlag<ReadonlyElementOf<T>[], P>> & {
    multiple: true;
    options: T;
} & ({
    default: OptionFlag<ReadonlyElementOf<T>[], P>['default'] | undefined;
} | {
    required: true;
})): FlagDefinition<(typeof defaults.options)[number], P, {
    multiple: true;
    requiredOrDefaulted: true;
}>;
export declare function option<T extends readonly string[], P extends CustomOptions>(defaults: Partial<OptionFlag<ReadonlyElementOf<T>, P>> & {
    multiple?: false | undefined;
    options: T;
} & ({
    default: OptionFlag<ReadonlyElementOf<T>, P>['default'];
} | {
    required: true;
})): FlagDefinition<(typeof defaults.options)[number], P, {
    multiple: false;
    requiredOrDefaulted: true;
}>;
export declare function option<T extends readonly string[], P extends CustomOptions>(defaults: Partial<OptionFlag<ReadonlyElementOf<T>, P>> & {
    default?: OptionFlag<ReadonlyElementOf<T>, P>['default'] | undefined;
    multiple?: false | undefined;
    options: T;
    required?: false | undefined;
}): FlagDefinition<(typeof defaults.options)[number], P, {
    multiple: false;
    requiredOrDefaulted: false;
}>;
export declare function option<T extends readonly string[], P extends CustomOptions>(defaults: Partial<OptionFlag<ReadonlyElementOf<T>[], P>> & {
    default?: OptionFlag<ReadonlyElementOf<T>[], P>['default'] | undefined;
    multiple: true;
    options: T;
    required?: false | undefined;
}): FlagDefinition<(typeof defaults.options)[number], P, {
    multiple: true;
    requiredOrDefaulted: false;
}>;
export {};
