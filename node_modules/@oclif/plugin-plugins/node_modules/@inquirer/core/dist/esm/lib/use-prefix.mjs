import { AsyncResource } from 'node:async_hooks';
import { useState } from './use-state.mjs';
import { useEffect } from './use-effect.mjs';
import { makeTheme } from './make-theme.mjs';
export function usePrefix({ isLoading = false, theme, }) {
    const [tick, setTick] = useState(0);
    const { prefix, spinner } = makeTheme(theme);
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(AsyncResource.bind(() => {
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
