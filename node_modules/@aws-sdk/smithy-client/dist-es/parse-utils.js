import { __read } from "tslib";
export var parseBoolean = function (value) {
    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error("Unable to parse boolean value \"".concat(value, "\""));
    }
};
export var expectBoolean = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            logger.warn(stackTraceWarning("Expected boolean, got ".concat(typeof value, ": ").concat(value)));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        var lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            logger.warn(stackTraceWarning("Expected boolean, got ".concat(typeof value, ": ").concat(value)));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError("Expected boolean, got ".concat(typeof value, ": ").concat(value));
};
export var expectNumber = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        var parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                logger.warn(stackTraceWarning("Expected number but observed string: ".concat(value)));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError("Expected number, got ".concat(typeof value, ": ").concat(value));
};
var MAX_FLOAT = Math.ceil(Math.pow(2, 127) * (2 - Math.pow(2, -23)));
export var expectFloat32 = function (value) {
    var expected = expectNumber(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError("Expected 32-bit float, got ".concat(value));
        }
    }
    return expected;
};
export var expectLong = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError("Expected integer, got ".concat(typeof value, ": ").concat(value));
};
export var expectInt = expectLong;
export var expectInt32 = function (value) { return expectSizedInt(value, 32); };
export var expectShort = function (value) { return expectSizedInt(value, 16); };
export var expectByte = function (value) { return expectSizedInt(value, 8); };
var expectSizedInt = function (value, size) {
    var expected = expectLong(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
        throw new TypeError("Expected ".concat(size, "-bit integer, got ").concat(value));
    }
    return expected;
};
var castInt = function (value, size) {
    switch (size) {
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
};
export var expectNonNull = function (value, location) {
    if (value === null || value === undefined) {
        if (location) {
            throw new TypeError("Expected a non-null value for ".concat(location));
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
};
export var expectObject = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    var receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError("Expected object, got ".concat(receivedType, ": ").concat(value));
};
export var expectString = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
        logger.warn(stackTraceWarning("Expected string, got ".concat(typeof value, ": ").concat(value)));
        return String(value);
    }
    throw new TypeError("Expected string, got ".concat(typeof value, ": ").concat(value));
};
export var expectUnion = function (value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    var asObject = expectObject(value);
    var setKeys = Object.entries(asObject)
        .filter(function (_a) {
        var _b = __read(_a, 2), v = _b[1];
        return v != null;
    })
        .map(function (_a) {
        var _b = __read(_a, 1), k = _b[0];
        return k;
    });
    if (setKeys.length === 0) {
        throw new TypeError("Unions must have exactly one non-null member. None were found.");
    }
    if (setKeys.length > 1) {
        throw new TypeError("Unions must have exactly one non-null member. Keys ".concat(setKeys, " were not null."));
    }
    return asObject;
};
export var strictParseDouble = function (value) {
    if (typeof value == "string") {
        return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
};
export var strictParseFloat = strictParseDouble;
export var strictParseFloat32 = function (value) {
    if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
};
var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
var parseNumber = function (value) {
    var matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError("Expected real number, got implicit NaN");
    }
    return parseFloat(value);
};
export var limitedParseDouble = function (value) {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectNumber(value);
};
export var handleFloat = limitedParseDouble;
export var limitedParseFloat = limitedParseDouble;
export var limitedParseFloat32 = function (value) {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectFloat32(value);
};
var parseFloatString = function (value) {
    switch (value) {
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error("Unable to parse float value: ".concat(value));
    }
};
export var strictParseLong = function (value) {
    if (typeof value === "string") {
        return expectLong(parseNumber(value));
    }
    return expectLong(value);
};
export var strictParseInt = strictParseLong;
export var strictParseInt32 = function (value) {
    if (typeof value === "string") {
        return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
};
export var strictParseShort = function (value) {
    if (typeof value === "string") {
        return expectShort(parseNumber(value));
    }
    return expectShort(value);
};
export var strictParseByte = function (value) {
    if (typeof value === "string") {
        return expectByte(parseNumber(value));
    }
    return expectByte(value);
};
var stackTraceWarning = function (message) {
    return String(new TypeError(message).stack || message)
        .split("\n")
        .slice(0, 5)
        .filter(function (s) { return !s.includes("stackTraceWarning"); })
        .join("\n");
};
export var logger = {
    warn: console.warn,
};
