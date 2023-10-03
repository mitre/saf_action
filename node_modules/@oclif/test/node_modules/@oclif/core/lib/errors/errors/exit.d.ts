import { CLIError } from './cli';
import { OclifError } from '../../interfaces';
export declare class ExitError extends CLIError implements OclifError {
    code: string;
    constructor(exitCode?: number);
    render(): string;
}
