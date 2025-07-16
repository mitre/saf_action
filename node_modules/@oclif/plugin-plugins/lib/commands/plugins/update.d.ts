import { Command } from '@oclif/core';
export default class PluginsUpdate extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/core/interfaces").BooleanFlag<void>;
        verbose: import("@oclif/core/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
