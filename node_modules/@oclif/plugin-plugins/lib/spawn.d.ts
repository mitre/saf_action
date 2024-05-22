import { LogLevel } from './log-level.js';
export type ExecOptions = {
    cwd: string;
    logLevel: LogLevel;
};
export type Output = {
    stderr: string[];
    stdout: string[];
};
export declare function spawn(modulePath: string, args: string[] | undefined, { cwd, logLevel }: ExecOptions): Promise<Output>;
