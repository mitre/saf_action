import { ActionBase } from './action/base';
export type Levels = 'debug' | 'error' | 'fatal' | 'info' | 'trace' | 'warn';
export interface ConfigMessage {
    prop: string;
    type: 'config';
    value: any;
}
export declare class Config {
    action: ActionBase;
    errorsHandled: boolean;
    outputLevel: Levels;
    showStackTrace: boolean;
    get context(): any;
    set context(v: unknown);
    get debug(): boolean;
    set debug(v: boolean);
}
export declare const config: Config;
export default config;
