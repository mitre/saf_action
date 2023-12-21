import { Interfaces } from '@oclif/core';
type YarnExecOptions = {
    cwd: string;
    noSpinner?: boolean;
    silent: boolean;
    verbose: boolean;
};
export default class Yarn {
    private config;
    constructor({ config }: {
        config: Interfaces.Config;
    });
    exec(args: string[] | undefined, opts: YarnExecOptions): Promise<void>;
    fork(modulePath: string, args: string[] | undefined, options: YarnExecOptions): Promise<void>;
}
export {};
