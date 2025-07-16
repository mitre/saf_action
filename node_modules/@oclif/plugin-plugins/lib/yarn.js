import { Errors, ux } from '@oclif/core';
import makeDebug from 'debug';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { spawn } from './spawn.js';
const require = createRequire(import.meta.url);
const debug = makeDebug('@oclif/plugin-plugins:yarn');
export class Yarn {
    bin;
    config;
    logLevel;
    constructor({ config, logLevel }) {
        this.config = config;
        this.logLevel = logLevel;
    }
    async exec(args = [], options) {
        const bin = await this.findYarn();
        debug('yarn binary path', bin);
        if (options.logLevel === 'verbose')
            args.push('--verbose');
        if (this.config.npmRegistry)
            args.push(`--registry=${this.config.npmRegistry}`);
        if (options.logLevel !== 'notice' && options.logLevel !== 'silent') {
            ux.stderr(`${options.cwd}: ${bin} ${args.join(' ')}`);
        }
        debug(`${options.cwd}: ${bin} ${args.join(' ')}`);
        try {
            const output = await spawn(bin, args, options);
            debug('yarn done');
            return output;
        }
        catch (error) {
            debug('yarn error', error);
            throw error;
        }
    }
    async install(args, opts) {
        return this.exec(['install', ...args], opts);
    }
    async findYarn() {
        if (this.bin)
            return this.bin;
        try {
            this.bin = require.resolve('yarn/bin/yarn.js', { paths: [this.config.root, fileURLToPath(import.meta.url)] });
        }
        catch {
            const { default: which } = await import('which');
            this.bin = await which('yarn');
        }
        if (!this.bin) {
            throw new Errors.CLIError('yarn not found');
        }
        return this.bin;
    }
}
