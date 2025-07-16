import { Command } from '@oclif/core';
export default class PluginsUninstall extends Command {
    static aliases: string[];
    static args: {
        plugin: import("@oclif/core/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/interfaces").BooleanFlag<void>;
        verbose: import("@oclif/core/interfaces").BooleanFlag<boolean>;
    };
    static strict: boolean;
    run(): Promise<void>;
}
