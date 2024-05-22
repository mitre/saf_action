import { Interfaces } from '@oclif/core';
import { LogLevel } from './log-level.js';
import { ExecOptions, Output } from './spawn.js';
export declare class Yarn {
    private bin;
    private config;
    private logLevel;
    constructor({ config, logLevel }: {
        config: Interfaces.Config;
        logLevel: LogLevel;
    });
    exec(args: string[] | undefined, options: ExecOptions): Promise<Output>;
    install(args: string[], opts: ExecOptions): Promise<Output>;
    private findYarn;
}
