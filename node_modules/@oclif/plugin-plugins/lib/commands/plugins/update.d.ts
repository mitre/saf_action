import { Command } from '@oclif/core';
import Plugins from '../../plugins.js';
export default class PluginsUpdate extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<void>;
        verbose: import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<boolean>;
    };
    plugins: Plugins;
    run(): Promise<void>;
}
