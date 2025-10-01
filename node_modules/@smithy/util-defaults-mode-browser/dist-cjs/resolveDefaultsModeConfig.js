"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDefaultsModeConfig = void 0;
const tslib_1 = require("tslib");
const property_provider_1 = require("@smithy/property-provider");
const bowser_1 = tslib_1.__importDefault(require("bowser"));
const constants_1 = require("./constants");
const resolveDefaultsModeConfig = ({ defaultsMode, } = {}) => (0, property_provider_1.memoize)(async () => {
    const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
    switch (mode?.toLowerCase()) {
        case "auto":
            return Promise.resolve(isMobileBrowser() ? "mobile" : "standard");
        case "mobile":
        case "in-region":
        case "cross-region":
        case "standard":
        case "legacy":
            return Promise.resolve(mode?.toLocaleLowerCase());
        case undefined:
            return Promise.resolve("legacy");
        default:
            throw new Error(`Invalid parameter for "defaultsMode", expect ${constants_1.DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
    }
});
exports.resolveDefaultsModeConfig = resolveDefaultsModeConfig;
const isMobileBrowser = () => {
    const parsedUA = typeof window !== "undefined" && window?.navigator?.userAgent
        ? bowser_1.default.parse(window.navigator.userAgent)
        : undefined;
    const platform = parsedUA?.platform?.type;
    return platform === "tablet" || platform === "mobile";
};
