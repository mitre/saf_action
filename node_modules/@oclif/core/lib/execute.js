"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const flush_1 = require("./cli-ux/flush");
const handle_1 = require("./errors/handle");
const main_1 = require("./main");
const settings_1 = require("./settings");
/**
 * Load and run oclif CLI
 *
 * @param options - options to load the CLI
 * @returns Promise<void>
 *
 * @example For ESM dev.js
 * ```
 * #!/usr/bin/env -S node --loader ts-node/esm --no-warnings=ExperimentalWarning
 * async function main() {
 *   const oclif = await import('@oclif/core')
 *   await oclif.execute({development: true, dir: import.meta.url})
 * }
 *
 * await main()
 * ```
 *
 * @example For ESM run.js
 * ```
 * #!/usr/bin/env node
 * async function main() {
 *   const oclif = await import('@oclif/core')
 *   await oclif.execute({dir: import.meta.url})
 * }
 *
 * await main()
 * ```
 *
 * @example For CJS dev.js
 * ```
 * #!/usr/bin/env ts-node
 * void (async () => {
 *   const oclif = await import('@oclif/core')
 *   await oclif.execute({development: true, dir: __dirname})
 * })()
 * ```
 *
 * @example For CJS run.js
 * ```
 * #!/usr/bin/env node
 * void (async () => {
 *   const oclif = await import('@oclif/core')
 *   await oclif.execute({dir: __dirname})
 * })()
 * ```
 */
async function execute(options) {
    if (options.development) {
        // In dev mode -> use ts-node and dev plugins
        process.env.NODE_ENV = 'development';
        settings_1.settings.debug = true;
    }
    return (0, main_1.run)(options.args ?? process.argv.slice(2), options.loadOptions ?? options.dir)
        .then(async (result) => {
        (0, flush_1.flush)();
        return result;
    })
        .catch(async (error) => (0, handle_1.handle)(error));
}
exports.execute = execute;
