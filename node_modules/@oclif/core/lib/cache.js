"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple cache for storing values that need to be accessed globally.
 */
class Cache extends Map {
    static instance;
    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }
    get(key) {
        return super.get(key);
    }
}
exports.default = Cache;
