import { Command, Interfaces } from '@oclif/core';
import Plugins from '../../plugins.js';
type JitPlugin = {
    name: string;
    type: string;
    version: string;
};
type PluginsJson = Array<Interfaces.Plugin | JitPlugin>;
export default class PluginsIndex extends Command {
    static description: string;
    static enableJsonFlag: boolean;
    static examples: string[];
    static flags: {
        core: Interfaces.BooleanFlag<boolean>;
    };
    plugins: Plugins;
    run(): Promise<PluginsJson>;
    private createTree;
    private display;
    private displayJitPlugins;
    private formatPlugin;
}
export {};
