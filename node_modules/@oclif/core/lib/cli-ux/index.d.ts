import * as Errors from '../errors';
import { ActionBase } from './action/base';
import * as uxPrompt from './prompt';
import * as styled from './styled';
import uxWait from './wait';
export declare class ux {
    static config: import("./config").Config;
    static get action(): ActionBase;
    static annotation(text: string, annotation: string): void;
    /**
     * "press anykey to continue"
     */
    static get anykey(): typeof uxPrompt.anykey;
    static get confirm(): typeof uxPrompt.confirm;
    static debug(format: string, ...args: string[]): void;
    static done(): Promise<void>;
    static flush(ms?: number): Promise<void>;
    static info(format: string, ...args: string[]): void;
    static log(format?: string, ...args: string[]): void;
    static logToStderr(format?: string, ...args: string[]): void;
    static get progress(): typeof styled.progress;
    static get prompt(): typeof uxPrompt.prompt;
    static styledHeader(header: string): void;
    static styledJSON(obj: unknown): void;
    static styledObject(obj: any, keys?: string[]): void;
    static get table(): typeof styled.Table.table;
    static trace(format: string, ...args: string[]): void;
    static get tree(): typeof styled.tree;
    static url(text: string, uri: string, params?: {}): void;
    static get wait(): typeof uxWait;
}
declare const action: ActionBase, annotation: typeof ux.annotation, anykey: typeof uxPrompt.anykey, confirm: typeof uxPrompt.confirm, debug: typeof ux.debug, done: typeof ux.done, flush: typeof ux.flush, info: typeof ux.info, log: typeof ux.log, logToStderr: typeof ux.logToStderr, progress: typeof styled.progress, prompt: typeof uxPrompt.prompt, styledHeader: typeof ux.styledHeader, styledJSON: typeof ux.styledJSON, styledObject: typeof ux.styledObject, table: typeof styled.Table.table, trace: typeof ux.trace, tree: typeof styled.tree, url: typeof ux.url, wait: (ms?: number) => Promise<void>;
declare const error: typeof Errors.error, exit: typeof Errors.exit, warn: typeof Errors.warn;
export { action, annotation, anykey, confirm, debug, done, error, exit, flush, info, log, logToStderr, progress, prompt, styledHeader, styledJSON, styledObject, table, trace, tree, url, wait, warn, };
export { ActionBase } from './action/base';
export { Config, config } from './config';
export { ExitError } from './exit';
export { IPromptOptions } from './prompt';
export { Table } from './styled';
export { colorize } from './theme';
export { default as write } from './write';
