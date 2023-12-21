"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const fs_1 = require("../util/fs");
const simple_1 = __importDefault(require("./action/simple"));
const spinner_1 = __importDefault(require("./action/spinner"));
const g = global;
const globals = g.ux || (g.ux = {});
const actionType = (Boolean(process.stderr.isTTY) &&
    !process.env.CI &&
    !['dumb', 'emacs-color'].includes(process.env.TERM) &&
    'spinner') ||
    'simple';
const Action = actionType === 'spinner' ? spinner_1.default : simple_1.default;
class Config {
    action = new Action();
    errorsHandled = false;
    outputLevel = 'info';
    showStackTrace = true;
    get context() {
        return globals.context || {};
    }
    set context(v) {
        globals.context = v;
    }
    get debug() {
        return globals.debug || process.env.DEBUG === '*';
    }
    set debug(v) {
        globals.debug = v;
    }
}
exports.Config = Config;
function fetch() {
    const major = (0, fs_1.requireJson)(__dirname, '..', '..', 'package.json').version.split('.')[0];
    if (globals[major])
        return globals[major];
    globals[major] = new Config();
    return globals[major];
}
exports.config = fetch();
exports.default = exports.config;
