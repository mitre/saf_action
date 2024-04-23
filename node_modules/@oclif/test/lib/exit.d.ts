/// <reference types="mocha" />
declare const _default: (code?: number) => {
    run(): never;
    catch(ctx: {
        error: any;
    }): void;
};
/**
 * ensures that a oclif command or hook exits
 */
export default _default;
