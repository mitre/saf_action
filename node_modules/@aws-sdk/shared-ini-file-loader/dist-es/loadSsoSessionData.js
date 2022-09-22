import { __awaiter, __generator } from "tslib";
import { getConfigFilepath } from "./getConfigFilepath";
import { getSsoSessionData } from "./getSsoSessionData";
import { parseIni } from "./parseIni";
import { slurpFile } from "./slurpFile";
var swallowError = function () { return ({}); };
export var loadSsoSessionData = function (init) {
    if (init === void 0) { init = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            return [2, slurpFile((_a = init.configFilepath) !== null && _a !== void 0 ? _a : getConfigFilepath())
                    .then(parseIni)
                    .then(getSsoSessionData)
                    .catch(swallowError)];
        });
    });
};
