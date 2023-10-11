import { OclifError, PrettyPrintableError } from '../interfaces';
/**
 * This is an odd abstraction for process.exit, but it allows us to stub it in tests.
 *
 * https://github.com/sinonjs/sinon/issues/562
 */
export declare const Exit: {
    exit(code?: number): never;
};
type ErrorToHandle = Error & Partial<PrettyPrintableError> & Partial<OclifError> & {
    skipOclifErrorHandling?: boolean;
};
export declare function handle(err: ErrorToHandle): Promise<void>;
export {};
