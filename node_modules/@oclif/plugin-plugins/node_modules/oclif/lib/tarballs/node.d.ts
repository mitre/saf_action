import { Interfaces } from '@oclif/core';
type Options = {
    arch: 'armv7l' | Interfaces.ArchTypes;
    nodeVersion: string;
    output: string;
    platform: Interfaces.PlatformTypes;
    tmp: string;
};
export declare function fetchNodeBinary({ arch, nodeVersion, output, platform, tmp }: Options): Promise<string>;
export {};
