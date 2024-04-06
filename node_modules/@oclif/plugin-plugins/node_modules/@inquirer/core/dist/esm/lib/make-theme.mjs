import { defaultTheme } from './theme.mjs';
export function makeTheme(...themes) {
    return Object.assign({}, defaultTheme, ...themes, {
        style: Object.assign({}, defaultTheme.style, ...themes.map((theme) => theme?.style)),
    });
}
