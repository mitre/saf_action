import { Command, Interfaces } from '@oclif/core';
import Plugins from '../../plugins.js';
export default class PluginsInstall extends Command {
    static aliases: string[];
    static args: {
        plugin: Interfaces.Arg<string, Record<string, unknown>>;
    };
    static description: string;
    static enableJsonFlag: boolean;
    static examples: {
        command: string;
        description: string;
    }[];
    static flags: {
        force: Interfaces.BooleanFlag<boolean>;
        help: Interfaces.BooleanFlag<void>;
        jit: Interfaces.BooleanFlag<boolean>;
        silent: Interfaces.BooleanFlag<boolean>;
        verbose: Interfaces.BooleanFlag<boolean>;
    };
    static strict: boolean;
    static summary: string;
    flags: Interfaces.InferredFlags<typeof PluginsInstall.flags>;
    parsePlugin(plugins: Plugins, input: string): Promise<{
        name: string;
        tag: string;
        type: 'npm';
    } | {
        type: 'repo';
        url: string;
    }>;
    run(): Promise<void>;
}
