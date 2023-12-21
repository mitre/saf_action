import { Interfaces } from '@oclif/core';
import Yarn from './yarn.js';
type UserPJSON = {
    dependencies: Record<string, string>;
    oclif: {
        plugins: Array<Interfaces.PJSON.PluginTypes.Link | Interfaces.PJSON.PluginTypes.User>;
        schema: number;
    };
    private: boolean;
};
export default class Plugins {
    config: Interfaces.Config;
    silent: boolean;
    verbose: boolean;
    readonly yarn: Yarn;
    private readonly debug;
    constructor(config: Interfaces.Config);
    add(...plugins: Interfaces.PJSON.PluginTypes[]): Promise<void>;
    friendlyName(name: string): string;
    hasPlugin(name: string): Promise<Interfaces.PJSON.PluginTypes.Link | Interfaces.PJSON.PluginTypes.User | false>;
    install(name: string, { force, tag }?: {
        force?: boolean | undefined;
        tag?: string | undefined;
    }): Promise<Interfaces.Config>;
    link(p: string, { install }: {
        install: boolean;
    }): Promise<void>;
    list(): Promise<(Interfaces.PJSON.PluginTypes.Link | Interfaces.PJSON.PluginTypes.User)[]>;
    maybeUnfriendlyName(name: string): Promise<string>;
    pjson(): Promise<UserPJSON>;
    /**
     * If a yarn.lock or oclif.lock exists at the root, refresh dependencies by
     * rerunning yarn. If options.prod is true, only install production dependencies.
     *
     * As of v9 npm will always ignore the yarn.lock during `npm pack`]
     * (see https://github.com/npm/cli/issues/6738). To get around this plugins can
     * rename yarn.lock to oclif.lock before running `npm pack` using `oclif lock`.
     *
     * We still check for the existence of yarn.lock since it could be included if a plugin was
     * packed using yarn or v8 of npm. Plugins installed directly from a git url will also
     * have a yarn.lock.
     *
     * @param options {prod: boolean, all: boolean}
     * @param roots string[]
     * @returns Promise<void>
     */
    refresh(options: {
        all: boolean;
        prod: boolean;
    }, ...roots: string[]): Promise<void>;
    remove(name: string): Promise<void>;
    unfriendlyName(name: string): string | undefined;
    uninstall(name: string): Promise<void>;
    update(): Promise<void>;
    private createPJSON;
    private isValidPlugin;
    private normalizePlugins;
    private npmHasPackage;
    private get pjsonPath();
    private readPJSON;
    private savePJSON;
}
export {};
