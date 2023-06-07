import { AlphabetLowercase, AlphabetUppercase } from './alphabet';
import { Config } from './config';
export declare type ParseFn<T> = (input: string) => Promise<T>;
export interface Arg<T = string> {
    name: string;
    description?: string;
    required?: boolean;
    hidden?: boolean;
    parse?: ParseFn<T>;
    default?: T | (() => T);
    options?: string[];
    ignoreStdin?: boolean;
}
export interface ArgBase<T> {
    name?: string;
    description?: string;
    hidden?: boolean;
    parse: ParseFn<T>;
    default?: T | (() => Promise<T>);
    input?: string;
    options?: string[];
    ignoreStdin?: boolean;
}
export declare type RequiredArg<T> = ArgBase<T> & {
    required: true;
    value: T;
};
export declare type OptionalArg<T> = ArgBase<T> & {
    required: false;
    value?: T;
};
export declare type ParserArg<T> = RequiredArg<T> | OptionalArg<T>;
export interface FlagOutput {
    [name: string]: any;
}
export declare type ArgInput = Arg<any>[];
export interface CLIParseErrorOptions {
    parse: {
        input?: ParserInput;
        output?: ParserOutput;
    };
}
export declare type OutputArgs = {
    [name: string]: any;
};
export declare type OutputFlags<T extends ParserInput['flags']> = {
    [P in keyof T]: any;
};
export declare type ParserOutput<TFlags extends OutputFlags<any> = any, GFlags extends OutputFlags<any> = any, TArgs extends OutputArgs = any> = {
    flags: TFlags & GFlags & {
        json: boolean | undefined;
    };
    args: TArgs;
    argv: string[];
    raw: ParsingToken[];
    metadata: Metadata;
};
export declare type ArgToken = {
    type: 'arg';
    input: string;
};
export declare type FlagToken = {
    type: 'flag';
    flag: string;
    input: string;
};
export declare type ParsingToken = ArgToken | FlagToken;
export interface FlagUsageOptions {
    displayRequired?: boolean;
}
export declare type Metadata = {
    flags: {
        [key: string]: MetadataFlag;
    };
};
declare type MetadataFlag = {
    setFromDefault?: boolean;
};
export declare type ListItem = [string, string | undefined];
export declare type List = ListItem[];
export declare type DefaultContext<T, P> = {
    options: P & OptionFlag<T>;
    flags: Record<string, string>;
};
export declare type Default<T, P = Record<string, unknown>> = T | ((context: DefaultContext<T, P>) => Promise<T>);
export declare type DefaultHelp<T, P = Record<string, unknown>> = T | ((context: DefaultContext<T, P>) => Promise<string | undefined>);
export declare type FlagRelationship = string | {
    name: string;
    when: (flags: Record<string, unknown>) => Promise<boolean>;
};
export declare type Relationship = {
    type: 'all' | 'some' | 'none';
    flags: FlagRelationship[];
};
export declare type Deprecation = {
    to?: string;
    message?: string;
    version?: string;
};
export declare type FlagProps = {
    name: string;
    char?: AlphabetLowercase | AlphabetUppercase;
    /**
     * A short summary of flag usage to show in the flag list.
     * If not provided, description will be used.
     */
    summary?: string;
    /**
     * A description of flag usage. If summary is provided, the description
     * is assumed to be a longer description and will be shown in a separate
     * section within help.
     */
    description?: string;
    /**
     * The flag label to show in help. Defaults to "[-<char>] --<name>" where -<char> is
     * only displayed if the char is defined.
     */
    helpLabel?: string;
    /**
     * Shows this flag in a separate list in the help.
     */
    helpGroup?: string;
    /**
     * Accept an environment variable as input
     */
    env?: string;
    /**
     * If true, the flag will not be shown in the help.
     */
    hidden?: boolean;
    /**
     * If true, the flag will be required.
     */
    required?: boolean;
    /**
     * List of flags that this flag depends on.
     */
    dependsOn?: string[];
    /**
     * List of flags that cannot be used with this flag.
     */
    exclusive?: string[];
    /**
     * Exactly one of these flags must be provided.
     */
    exactlyOne?: string[];
    /**
     * Define complex relationships between flags.
     */
    relationships?: Relationship[];
    /**
     * Make the flag as deprecated.
     */
    deprecated?: true | Deprecation;
    /**
     * Alternate names that can be used for this flag.
     */
    aliases?: string[];
    /**
     * Emit deprecation warning when a flag alias is provided
     */
    deprecateAliases?: boolean;
};
export declare type BooleanFlagProps = FlagProps & {
    type: 'boolean';
    allowNo: boolean;
};
export declare type OptionFlagProps = FlagProps & {
    type: 'option';
    helpValue?: string;
    options?: string[];
    multiple?: boolean;
};
export declare type FlagParser<T, I, P = any> = (input: I, context: any, opts: P & OptionFlag<T>) => Promise<T>;
export declare type FlagBase<T, I, P = any> = FlagProps & {
    parse: FlagParser<T, I, P>;
};
export declare type BooleanFlag<T> = FlagBase<T, boolean> & BooleanFlagProps & {
    /**
     * specifying a default of false is the same as not specifying a default
     */
    default?: Default<boolean>;
};
export declare type CustomOptionFlag<T, P = any, M = false> = FlagBase<T, string, P> & OptionFlagProps & {
    defaultHelp?: DefaultHelp<T>;
    input: string[];
    default?: M extends true ? Default<T[] | undefined, P> : Default<T | undefined, P>;
};
export declare type OptionFlag<T> = FlagBase<T, string> & OptionFlagProps & {
    defaultHelp?: DefaultHelp<T>;
    input: string[];
} & ({
    default?: Default<T | undefined>;
    multiple: false;
} | {
    default?: Default<T[] | undefined>;
    multiple: true;
});
export declare type Definition<T, P = Record<string, unknown>> = {
    (options: P & {
        multiple: true;
    } & ({
        required: true;
    } | {
        default: Default<T[]>;
    }) & Partial<OptionFlag<T>>): OptionFlag<T[]>;
    (options: P & {
        multiple: true;
    } & Partial<OptionFlag<T>>): OptionFlag<T[] | undefined>;
    (options: P & ({
        required: true;
    } | {
        default: Default<T>;
    }) & Partial<OptionFlag<T>>): OptionFlag<T>;
    (options?: P & Partial<OptionFlag<T>>): OptionFlag<T | undefined>;
};
export declare type EnumFlagOptions<T, M = false> = Partial<CustomOptionFlag<T, any, M>> & {
    options: T[];
} & ({
    default?: Default<T | undefined>;
    multiple?: false;
} | {
    default?: Default<T[] | undefined>;
    multiple: true;
});
export declare type Flag<T> = BooleanFlag<T> | OptionFlag<T>;
export declare type Input<TFlags extends FlagOutput, GFlags extends FlagOutput> = {
    flags?: FlagInput<TFlags>;
    globalFlags?: FlagInput<GFlags>;
    args?: ArgInput;
    strict?: boolean;
    context?: any;
    '--'?: boolean;
};
export interface ParserInput {
    argv: string[];
    flags: FlagInput<any>;
    args: ParserArg<any>[];
    strict: boolean;
    context: any;
    '--'?: boolean;
}
export declare type CompletionContext = {
    args?: {
        [name: string]: string;
    };
    flags?: {
        [name: string]: string;
    };
    argv?: string[];
    config: Config;
};
export declare type Completion = {
    skipCache?: boolean;
    cacheDuration?: number;
    cacheKey?(ctx: CompletionContext): Promise<string>;
    options(ctx: CompletionContext): Promise<string[]>;
};
export declare type CompletableOptionFlag<T> = OptionFlag<T> & {
    completion?: Completion;
};
export declare type CompletableFlag<T> = BooleanFlag<T> | CompletableOptionFlag<T>;
export declare type FlagInput<T extends FlagOutput = {
    [flag: string]: any;
}> = {
    [P in keyof T]: CompletableFlag<T[P]>;
};
export {};
