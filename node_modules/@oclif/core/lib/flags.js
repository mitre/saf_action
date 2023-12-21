"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = exports.help = exports.version = exports.string = exports.url = exports.file = exports.directory = exports.integer = exports.boolean = exports.custom = void 0;
const node_url_1 = require("node:url");
const errors_1 = require("./errors");
const help_1 = require("./help");
const fs_1 = require("./util/fs");
/**
 * Create a custom flag.
 *
 * @example
 * type Id = string
 * type IdOpts = { startsWith: string; length: number };
 *
 * export const myFlag = custom<Id, IdOpts>({
 *   parse: async (input, opts) => {
 *     if (input.startsWith(opts.startsWith) && input.length === opts.length) {
 *       return input
 *     }
 *
 *     throw new Error('Invalid id')
 *   },
 * })
 */
function custom(defaults) {
    return (options = {}) => ({
        parse: async (input, _ctx, _opts) => input,
        ...defaults,
        ...options,
        input: [],
        multiple: Boolean(options.multiple === undefined ? defaults?.multiple ?? false : options.multiple),
        type: 'option',
    });
}
exports.custom = custom;
function boolean(options = {}) {
    return {
        parse: async (b, _) => b,
        ...options,
        allowNo: Boolean(options.allowNo),
        type: 'boolean',
    };
}
exports.boolean = boolean;
exports.integer = custom({
    async parse(input, _, opts) {
        if (!/^-?\d+$/.test(input))
            throw new errors_1.CLIError(`Expected an integer but received: ${input}`);
        const num = Number.parseInt(input, 10);
        if (opts.min !== undefined && num < opts.min)
            throw new errors_1.CLIError(`Expected an integer greater than or equal to ${opts.min} but received: ${input}`);
        if (opts.max !== undefined && num > opts.max)
            throw new errors_1.CLIError(`Expected an integer less than or equal to ${opts.max} but received: ${input}`);
        return num;
    },
});
exports.directory = custom({
    async parse(input, _, opts) {
        if (opts.exists)
            return (0, fs_1.dirExists)(input);
        return input;
    },
});
exports.file = custom({
    async parse(input, _, opts) {
        if (opts.exists)
            return (0, fs_1.fileExists)(input);
        return input;
    },
});
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
exports.url = custom({
    async parse(input) {
        try {
            return new node_url_1.URL(input);
        }
        catch {
            throw new errors_1.CLIError(`Expected a valid url but received: ${input}`);
        }
    },
});
exports.string = custom();
const version = (opts = {}) => boolean({
    description: 'Show CLI version.',
    ...opts,
    async parse(_, ctx) {
        ctx.log(ctx.config.userAgent);
        ctx.exit(0);
    },
});
exports.version = version;
const help = (opts = {}) => boolean({
    description: 'Show CLI help.',
    ...opts,
    async parse(_, cmd) {
        const Help = await (0, help_1.loadHelpClass)(cmd.config);
        await new Help(cmd.config, cmd.config.pjson.oclif.helpOptions ?? cmd.config.pjson.helpOptions).showHelp(cmd.id ? [cmd.id, ...cmd.argv] : cmd.argv);
        cmd.exit(0);
    },
});
exports.help = help;
/**
 * Create a custom flag that infers the flag type from the provided options.
 *
 * @example
 * export default class MyCommand extends Command {
 *   static flags = {
 *     name: Flags.option({
 *       options: ['foo', 'bar'] as const,
 *     })(),
 *   }
 * }
 */
function option(defaults) {
    return (options = {}) => ({
        parse: async (input, _ctx, _opts) => input,
        ...defaults,
        ...options,
        input: [],
        multiple: Boolean(options.multiple === undefined ? defaults.multiple : options.multiple),
        type: 'option',
    });
}
exports.option = option;
