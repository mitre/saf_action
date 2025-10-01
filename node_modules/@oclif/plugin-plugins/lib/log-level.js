const LOG_LEVELS = ['silent', 'error', 'warn', 'notice', 'http', 'info', 'verbose', 'silly'];
export function determineLogLevel(config, flags, defaultLevel) {
    if (flags.verbose)
        return 'verbose';
    if (flags.silent)
        return 'silent';
    const envVar = config.scopedEnvVar('NPM_LOG_LEVEL');
    if (LOG_LEVELS.includes(envVar))
        return envVar;
    return defaultLevel;
}
