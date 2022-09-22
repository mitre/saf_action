import { __read, __values } from "tslib";
export function map(arg0, arg1, arg2) {
    var e_1, _a;
    var target;
    var filter;
    var instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
    }
    else {
        target = arg0;
        if (typeof arg1 === "function") {
            filter = arg1;
            instructions = arg2;
            return mapWithFilter(target, filter, instructions);
        }
        else {
            instructions = arg1;
        }
    }
    try {
        for (var _b = __values(Object.keys(instructions)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!Array.isArray(instructions[key])) {
                target[key] = instructions[key];
                continue;
            }
            var _d = __read(instructions[key], 2), filter_1 = _d[0], value = _d[1];
            if (typeof value === "function") {
                var _value = void 0;
                var defaultFilterPassed = filter_1 === undefined && (_value = value()) != null;
                var customFilterPassed = (typeof filter_1 === "function" && !!filter_1(void 0)) || (typeof filter_1 !== "function" && !!filter_1);
                if (defaultFilterPassed) {
                    target[key] = _value;
                }
                else if (customFilterPassed) {
                    target[key] = value();
                }
            }
            else {
                var defaultFilterPassed = filter_1 === undefined && value != null;
                var customFilterPassed = (typeof filter_1 === "function" && !!filter_1(value)) || (typeof filter_1 !== "function" && !!filter_1);
                if (defaultFilterPassed || customFilterPassed) {
                    target[key] = value;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return target;
}
export var convertMap = function (target) {
    var e_2, _a;
    var output = {};
    try {
        for (var _b = __values(Object.entries(target || {})), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
            output[k] = [, v];
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return output;
};
var mapWithFilter = function (target, filter, instructions) {
    return map(target, Object.entries(instructions).reduce(function (_instructions, _a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        if (Array.isArray(value)) {
            _instructions[key] = value;
        }
        else {
            if (typeof value === "function") {
                _instructions[key] = [filter, value()];
            }
            else {
                _instructions[key] = [filter, value];
            }
        }
        return _instructions;
    }, {}));
};
