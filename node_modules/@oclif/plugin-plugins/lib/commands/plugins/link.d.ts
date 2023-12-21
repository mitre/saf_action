import { Command } from '@oclif/core';
import Plugins from '../../plugins.js';
export default class PluginsLink extends Command {
    static args: {
        path: import("@oclif/core/lib/interfaces/parser.js").Arg<string, Record<string, unknown>>;
    };
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<void>;
        install: import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<boolean>;
        verbose: import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<boolean>;
    };
    static usage: string;
    plugins: Plugins;
    run(): Promise<void>;
}
