import { Command, HelpBase } from '@oclif/core';
interface MaybeCompatibleHelp extends HelpBase {
    command?: (command: Command.Cached) => string;
    formatCommand?: (command: Command.Cached) => string;
}
export declare class HelpCompatibilityWrapper {
    inner: MaybeCompatibleHelp;
    constructor(inner: MaybeCompatibleHelp);
    formatCommand(command: Command.Cached): string;
}
export {};
