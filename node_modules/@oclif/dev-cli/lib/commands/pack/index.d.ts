import { Command, flags } from '@oclif/command';
export default class Pack extends Command {
    static description: string;
    static flags: flags.Input<any>;
    run(): Promise<void>;
}
