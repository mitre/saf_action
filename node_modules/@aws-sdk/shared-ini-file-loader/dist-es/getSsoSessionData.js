import { __assign, __read } from "tslib";
var ssoSessionKeyRegex = /^sso-session\s(["'])?([^\1]+)\1$/;
export var getSsoSessionData = function (data) {
    return Object.entries(data)
        .filter(function (_a) {
        var _b = __read(_a, 1), key = _b[0];
        return ssoSessionKeyRegex.test(key);
    })
        .reduce(function (acc, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        return (__assign(__assign({}, acc), (_b = {}, _b[ssoSessionKeyRegex.exec(key)[2]] = value, _b)));
    }, {});
};
