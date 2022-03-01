"use strict";
// tslint:disable restrict-plus-operands
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
function styledHeader(header) {
    process.stdout.write(chalk.dim('=== ') + chalk.bold(header) + '\n');
}
exports.default = styledHeader;
