"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.memoizedWarn = exports.warn = exports.error = exports.exit = exports.handle = exports.ModuleLoadError = exports.ExitError = exports.CLIError = exports.config = void 0;
const write_1 = __importDefault(require("../cli-ux/write"));
const config_1 = require("./config");
const cli_1 = require("./errors/cli");
const exit_1 = require("./errors/exit");
const pretty_print_1 = __importStar(require("./errors/pretty-print"));
var config_2 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_2.config; } });
var cli_2 = require("./errors/cli");
Object.defineProperty(exports, "CLIError", { enumerable: true, get: function () { return cli_2.CLIError; } });
var exit_2 = require("./errors/exit");
Object.defineProperty(exports, "ExitError", { enumerable: true, get: function () { return exit_2.ExitError; } });
var module_load_1 = require("./errors/module-load");
Object.defineProperty(exports, "ModuleLoadError", { enumerable: true, get: function () { return module_load_1.ModuleLoadError; } });
var handle_1 = require("./handle");
Object.defineProperty(exports, "handle", { enumerable: true, get: function () { return handle_1.handle; } });
function exit(code = 0) {
    throw new exit_1.ExitError(code);
}
exports.exit = exit;
function error(input, options = {}) {
    let err;
    if (typeof input === 'string') {
        err = new cli_1.CLIError(input, options);
    }
    else if (input instanceof Error) {
        err = (0, cli_1.addOclifExitCode)(input, options);
    }
    else {
        throw new TypeError('first argument must be a string or instance of Error');
    }
    err = (0, pretty_print_1.applyPrettyPrintOptions)(err, options);
    if (options.exit === false) {
        const message = (0, pretty_print_1.default)(err);
        if (message)
            write_1.default.stderr(message + '\n');
        if (config_1.config.errorLogger)
            config_1.config.errorLogger.log(err?.stack ?? '');
    }
    else
        throw err;
}
exports.error = error;
function warn(input) {
    let err;
    if (typeof input === 'string') {
        err = new cli_1.CLIError.Warn(input);
    }
    else if (input instanceof Error) {
        err = (0, cli_1.addOclifExitCode)(input);
    }
    else {
        throw new TypeError('first argument must be a string or instance of Error');
    }
    const message = (0, pretty_print_1.default)(err);
    if (message)
        write_1.default.stderr(message + '\n');
    if (config_1.config.errorLogger)
        config_1.config.errorLogger.log(err?.stack ?? '');
}
exports.warn = warn;
const WARNINGS = new Set();
function memoizedWarn(input) {
    if (!WARNINGS.has(input))
        warn(input);
    WARNINGS.add(input);
}
exports.memoizedWarn = memoizedWarn;
var logger_1 = require("./logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
