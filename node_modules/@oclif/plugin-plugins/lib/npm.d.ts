import { Interfaces } from '@oclif/core';
import { LogLevel } from './log-level.js';
import { ExecOptions, Output } from './spawn.js';
type InstallOptions = {
    prod?: boolean;
} & ExecOptions;
export declare class NPM {
    private bin;
    private config;
    private logLevel;
    constructor({ config, logLevel }: {
        config: Interfaces.Config;
        logLevel: LogLevel;
    });
    exec(args: string[] | undefined, options: ExecOptions): Promise<Output>;
    install(args: string[], opts: InstallOptions): Promise<Output>;
    uninstall(args: string[], opts: ExecOptions): Promise<Output>;
    update(args: string[], opts: ExecOptions): Promise<Output>;
    view(args: string[], opts: ExecOptions): Promise<Output>;
    /**
     * Get the path to the npm CLI file.
     * This will resolve npm to the pinned version in `@oclif/plugin-plugins/package.json` if it exists.
     * Otherwise, it will use the globally installed npm.
     *
     * @returns The path to the `npm/bin/npm-cli.js` file.
     */
    private findNpm;
}
export {};
