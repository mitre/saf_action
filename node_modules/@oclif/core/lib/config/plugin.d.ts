import { Command } from '../command';
import { Manifest } from '../interfaces/manifest';
import { PJSON } from '../interfaces/pjson';
import { Plugin as IPlugin, PluginOptions } from '../interfaces/plugin';
import { Topic } from '../interfaces/topic';
export declare class Plugin implements IPlugin {
    options: PluginOptions;
    alias: string;
    alreadyLoaded: boolean;
    children: Plugin[];
    commandIDs: string[];
    commands: Command.Loadable[];
    commandsDir: string | undefined;
    hasManifest: boolean;
    hooks: {
        [k: string]: string[];
    };
    isRoot: boolean;
    manifest: Manifest;
    moduleType: 'commonjs' | 'module';
    name: string;
    parent: Plugin | undefined;
    pjson: PJSON.Plugin;
    root: string;
    tag?: string;
    type: string;
    valid: boolean;
    version: string;
    protected warned: boolean;
    _base: string;
    protected _debug: (..._: any) => void;
    private flexibleTaxonomy;
    constructor(options: PluginOptions);
    get topics(): Topic[];
    findCommand(id: string, opts: {
        must: true;
    }): Promise<Command.Class>;
    findCommand(id: string, opts?: {
        must: boolean;
    }): Promise<Command.Class | undefined>;
    load(): Promise<void>;
    private _manifest;
    private addErrorScope;
    private getCommandIDs;
    private getCommandsDir;
    private warn;
}
