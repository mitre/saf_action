import { Command } from '@oclif/core';
export default class Reset extends Command {
    static flags: {
        hard: import("@oclif/core/interfaces").BooleanFlag<boolean>;
        reinstall: import("@oclif/core/interfaces").BooleanFlag<boolean>;
    };
    static summary: string;
    run(): Promise<void>;
}
