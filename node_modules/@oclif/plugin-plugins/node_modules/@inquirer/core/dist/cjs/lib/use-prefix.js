"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrefix = void 0;
const node_async_hooks_1 = require("node:async_hooks");
const use_state_mjs_1 = require('./use-state.js');
const use_effect_mjs_1 = require('./use-effect.js');
const make_theme_mjs_1 = require('./make-theme.js');
function usePrefix({ isLoading = false, theme, }) {
    const [tick, setTick] = (0, use_state_mjs_1.useState)(0);
    const { prefix, spinner } = (0, make_theme_mjs_1.makeTheme)(theme);
    (0, use_effect_mjs_1.useEffect)(() => {
        if (isLoading) {
            const timeout = setTimeout(node_async_hooks_1.AsyncResource.bind(() => {
                setTick(tick + 1);
            }), spinner.interval);
            return () => clearTimeout(timeout);
        }
    }, [isLoading, tick]);
    if (isLoading) {
        const frame = tick % spinner.frames.length;
        return spinner.frames[frame];
    }
    return prefix;
}
exports.usePrefix = usePrefix;
