"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stdout = (msg) => {
    process.stdout.write(msg);
};
const stderr = (msg) => {
    process.stderr.write(msg);
};
exports.default = {
    stderr,
    stdout,
};
