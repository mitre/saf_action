import { __assign, __extends, __values } from "tslib";
import { getDefaultRoleAssumer as StsGetDefaultRoleAssumer, getDefaultRoleAssumerWithWebIdentity as StsGetDefaultRoleAssumerWithWebIdentity, } from "./defaultStsRoleAssumers";
import { STSClient } from "./STSClient";
var getCustomizableStsClientCtor = function (baseCtor, customizations) {
    if (!customizations)
        return baseCtor;
    else
        return (function (_super) {
            __extends(CustomizableSTSClient, _super);
            function CustomizableSTSClient(config) {
                var e_1, _a;
                var _this = _super.call(this, config) || this;
                try {
                    for (var _b = __values(customizations), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var customization = _c.value;
                        _this.middlewareStack.use(customization);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return _this;
            }
            return CustomizableSTSClient;
        }(baseCtor));
};
export var getDefaultRoleAssumer = function (stsOptions, stsPlugins) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return StsGetDefaultRoleAssumer(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
};
export var getDefaultRoleAssumerWithWebIdentity = function (stsOptions, stsPlugins) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return StsGetDefaultRoleAssumerWithWebIdentity(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
};
export var decorateDefaultCredentialProvider = function (provider) {
    return function (input) {
        return provider(__assign({ roleAssumer: getDefaultRoleAssumer(input), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input) }, input));
    };
};
