"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTheme = void 0;
const theme_mjs_1 = require('./theme.js');
function makeTheme(...themes) {
    return Object.assign({}, theme_mjs_1.defaultTheme, ...themes, {
        style: Object.assign({}, theme_mjs_1.defaultTheme.style, ...themes.map((theme) => theme === null || theme === void 0 ? void 0 : theme.style)),
    });
}
exports.makeTheme = makeTheme;
