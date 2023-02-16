"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubPath = void 0;
const path_1 = __importDefault(require("path"));
const isSubPath = (parent, child) => {
    return !path_1.default.relative(parent, child).startsWith('.');
};
exports.isSubPath = isSubPath;
