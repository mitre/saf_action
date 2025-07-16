import { Errors, ux } from '@oclif/core';
import makeDebug from 'debug';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, sep } from 'node:path';
import { spawn } from './spawn.js';
const debug = makeDebug('@oclif/plugin-plugins:npm');
export class NPM {
    bin;
    config;
    logLevel;
    constructor({ config, logLevel }) {
        this.config = config;
        this.logLevel = logLevel;
    }
    async exec(args = [], options) {
        const bin = await this.findNpm();
        debug('npm binary path', bin);
        args.push(`--loglevel=${this.logLevel}`, '--no-fund');
        if (this.config.npmRegistry)
            args.push(`--registry=${this.config.npmRegistry}`);
        if (options.logLevel !== 'notice' && options.logLevel !== 'silent') {
            ux.stderr(`${options.cwd}: ${bin} ${args.join(' ')}`);
        }
        debug(`${options.cwd}: ${bin} ${args.join(' ')}`);
        try {
            const output = await spawn(bin, args, options);
            debug('npm done');
            return output;
        }
        catch (error) {
            debug('npm error', error);
            throw error;
        }
    }
    async install(args, opts) {
        const prod = opts.prod ? ['--omit', 'dev'] : [];
        return this.exec(['install', ...args, ...prod, '--no-audit'], opts);
    }
    async uninstall(args, opts) {
        return this.exec(['uninstall', ...args], opts);
    }
    async update(args, opts) {
        return this.exec(['update', ...args], opts);
    }
    async view(args, opts) {
        return this.exec(['view', ...args], { ...opts, logLevel: 'silent' });
    }
    /**
     * Get the path to the npm CLI file.
     * This will resolve npm to the pinned version in `@oclif/plugin-plugins/package.json` if it exists.
     * Otherwise, it will use the globally installed npm.
     *
     * @returns The path to the `npm/bin/npm-cli.js` file.
     */
    async findNpm() {
        if (this.bin)
            return this.bin;
        try {
            const npmPjsonPath = createRequire(import.meta.url).resolve('npm/package.json');
            const npmPjson = JSON.parse(await readFile(npmPjsonPath, { encoding: 'utf8' }));
            const npmPath = npmPjsonPath.slice(0, Math.max(0, npmPjsonPath.lastIndexOf(sep)));
            this.bin = join(npmPath, npmPjson.bin.npm);
        }
        catch {
            const { default: which } = await import('which');
            this.bin = await which('npm');
        }
        if (!this.bin) {
            throw new Errors.CLIError('npm not found');
        }
        return this.bin;
    }
}
