import { PrettyPrintableError } from '../interfaces';
export { PrettyPrintableError } from '../interfaces';
export { config } from './config';
export { CLIError } from './errors/cli';
export { ExitError } from './errors/exit';
export { ModuleLoadError } from './errors/module-load';
export { handle } from './handle';
export declare function exit(code?: number): never;
export declare function error(input: Error | string, options: {
    exit: false;
} & PrettyPrintableError): void;
export declare function error(input: Error | string, options?: {
    exit?: number;
} & PrettyPrintableError): never;
export declare function warn(input: Error | string): void;
export declare function memoizedWarn(input: Error | string): void;
export { Logger } from './logger';
