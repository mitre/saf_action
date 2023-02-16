"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gotoUpperDir = exports.getUpperDirNode = void 0;
const path_1 = __importDefault(require("path"));
const getParentDir = (dir) => {
    return path_1.default.dirname(dir);
};
const getUpperDirNode = (dir) => {
    const parentDir = getParentDir(dir);
    const parentNode = {
        name: '..',
        path: parentDir,
        type: 'directory',
        isValid: true
    };
    return parentNode;
};
exports.getUpperDirNode = getUpperDirNode;
const gotoUpperDir = (upperDir, currentRootNode) => {
    currentRootNode._rootNode = false;
    upperDir._rootNode = true;
};
exports.gotoUpperDir = gotoUpperDir;
