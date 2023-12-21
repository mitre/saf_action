"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.Exit = void 0;
/* eslint-disable no-process-exit */
const clean_stack_1 = __importDefault(require("clean-stack"));
const config_1 = require("./config");
const cli_1 = require("./errors/cli");
const exit_1 = require("./errors/exit");
const pretty_print_1 = __importDefault(require("./errors/pretty-print"));
/**
 * This is an odd abstraction for process.exit, but it allows us to stub it in tests.
 *
 * https://github.com/sinonjs/sinon/issues/562
 */
exports.Exit = {
    exit(code = 0) {
        process.exit(code);
    },
};
async function handle(err) {
    try {
        if (!err)
            err = new cli_1.CLIError('no error?');
        if (err.message === 'SIGINT')
            exports.Exit.exit(1);
        const shouldPrint = !(err instanceof exit_1.ExitError) && !err.skipOclifErrorHandling;
        const pretty = (0, pretty_print_1.default)(err);
        const stack = (0, clean_stack_1.default)(err.stack || '', { pretty: true });
        if (shouldPrint) {
            console.error(pretty ?? stack);
        }
        const exitCode = err.oclif?.exit ?? 1;
        if (config_1.config.errorLogger && err.code !== 'EEXIT') {
            if (stack) {
                config_1.config.errorLogger.log(stack);
            }
            await config_1.config.errorLogger
                .flush()
                .then(() => exports.Exit.exit(exitCode))
                .catch(console.error);
        }
        else
            exports.Exit.exit(exitCode);
    }
    catch (error) {
        console.error(err.stack);
        console.error(error.stack);
        exports.Exit.exit(1);
    }
}
exports.handle = handle;
