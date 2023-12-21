"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.versionAddition = exports.helpAddition = void 0;
const node_url_1 = require("node:url");
const cli_ux_1 = require("./cli-ux");
const config_1 = require("./config");
const help_1 = require("./help");
const performance_1 = require("./performance");
const debug = require('debug')('oclif:main');
const helpAddition = (argv, config) => {
    if (argv.length === 0 && !config.pjson.oclif.default)
        return true;
    const mergedHelpFlags = (0, help_1.getHelpFlagAdditions)(config);
    for (const arg of argv) {
        if (mergedHelpFlags.includes(arg))
            return true;
        if (arg === '--')
            return false;
    }
    return false;
};
exports.helpAddition = helpAddition;
const versionAddition = (argv, config) => {
    const additionalVersionFlags = config?.pjson.oclif.additionalVersionFlags ?? [];
    const mergedVersionFlags = [...new Set(['--version', ...additionalVersionFlags]).values()];
    if (mergedVersionFlags.includes(argv[0]))
        return true;
    return false;
};
exports.versionAddition = versionAddition;
async function run(argv, options) {
    const marker = performance_1.Performance.mark(performance_1.OCLIF_MARKER_OWNER, 'main.run');
    const initMarker = performance_1.Performance.mark(performance_1.OCLIF_MARKER_OWNER, 'main.run#init');
    const collectPerf = async () => {
        marker?.stop();
        if (!initMarker?.stopped)
            initMarker?.stop();
        await performance_1.Performance.collect();
        performance_1.Performance.debug();
    };
    debug(`process.execPath: ${process.execPath}`);
    debug(`process.execArgv: ${process.execArgv}`);
    debug('process.argv: %O', process.argv);
    argv = argv ?? process.argv.slice(2);
    // Handle the case when a file URL string or URL is passed in such as 'import.meta.url'; covert to file path.
    if (options && ((typeof options === 'string' && options.startsWith('file://')) || options instanceof node_url_1.URL)) {
        options = (0, node_url_1.fileURLToPath)(options);
    }
    const config = await config_1.Config.load(options ?? require.main?.filename ?? __dirname);
    let [id, ...argvSlice] = (0, help_1.normalizeArgv)(config, argv);
    // run init hook
    await config.runHook('init', { argv: argvSlice, id });
    // display version if applicable
    if ((0, exports.versionAddition)(argv, config)) {
        cli_ux_1.ux.log(config.userAgent);
        await collectPerf();
        return;
    }
    // display help version if applicable
    if ((0, exports.helpAddition)(argv, config)) {
        const Help = await (0, help_1.loadHelpClass)(config);
        const help = new Help(config, config.pjson.oclif.helpOptions ?? config.pjson.helpOptions);
        await help.showHelp(argv);
        await collectPerf();
        return;
    }
    // find & run command
    const cmd = config.findCommand(id);
    if (!cmd) {
        const topic = config.flexibleTaxonomy ? null : config.findTopic(id);
        if (topic)
            return config.runCommand('help', [id]);
        if (config.pjson.oclif.default) {
            id = config.pjson.oclif.default;
            argvSlice = argv;
        }
    }
    initMarker?.stop();
    // If the the default command is '.' (signifying that the CLI is a single command CLI) and '.' is provided
    // as an argument, we need to add back the '.' to argv since it was stripped out earlier as part of the
    // command id.
    if (config.pjson.oclif.default === '.' && id === '.' && argv[0] === '.')
        argvSlice = ['.', ...argvSlice];
    try {
        return await config.runCommand(id, argvSlice, cmd);
    }
    finally {
        await collectPerf();
    }
}
exports.run = run;
