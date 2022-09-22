import { __extends } from "tslib";
import { ProviderError } from "./ProviderError";
var TokenProviderError = (function (_super) {
    __extends(TokenProviderError, _super);
    function TokenProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message, tryNextLink) || this;
        _this.tryNextLink = tryNextLink;
        _this.name = "TokenProviderError";
        Object.setPrototypeOf(_this, TokenProviderError.prototype);
        return _this;
    }
    return TokenProviderError;
}(ProviderError));
export { TokenProviderError };
