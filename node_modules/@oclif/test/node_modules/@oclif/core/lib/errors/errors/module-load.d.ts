import { CLIError } from './cli';
import { OclifError } from '../../interfaces';
export declare class ModuleLoadError extends CLIError implements OclifError {
    code: string;
    constructor(message: string);
}
