import { Config } from '@oclif/core';
declare const LOG_LEVELS: readonly ["silent", "error", "warn", "notice", "http", "info", "verbose", "silly"];
export type LogLevel = (typeof LOG_LEVELS)[number];
export declare function determineLogLevel(config: Config, flags: {
    silent?: boolean;
    verbose?: boolean;
}, defaultLevel: LogLevel): LogLevel;
export {};
