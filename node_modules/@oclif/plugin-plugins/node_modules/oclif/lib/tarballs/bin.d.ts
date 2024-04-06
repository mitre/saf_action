import { Interfaces } from '@oclif/core';
export declare function writeBinScripts({ baseWorkspace, config, nodeOptions, nodeVersion, }: {
    baseWorkspace: string;
    config: Interfaces.Config;
    nodeOptions: string[];
    nodeVersion: string;
}): Promise<void>;
