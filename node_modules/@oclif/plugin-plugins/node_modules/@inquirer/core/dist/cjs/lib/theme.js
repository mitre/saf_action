"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTheme = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cli_spinners_1 = __importDefault(require("cli-spinners"));
exports.defaultTheme = {
    prefix: chalk_1.default.green('?'),
    spinner: {
        interval: cli_spinners_1.default.dots.interval,
        frames: cli_spinners_1.default.dots.frames.map((frame) => chalk_1.default.yellow(frame)),
    },
    style: {
        answer: chalk_1.default.cyan,
        message: chalk_1.default.bold,
        error: (text) => chalk_1.default.red(`> ${text}`),
        defaultAnswer: (text) => chalk_1.default.dim(`(${text})`),
        help: chalk_1.default.dim,
        highlight: chalk_1.default.cyan,
        key: (text) => chalk_1.default.cyan.bold(`<${text}>`),
    },
};
