import { __assign, __extends } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
import { SSOServiceException as __BaseException } from "./SSOServiceException";
var InvalidRequestException = (function (_super) {
    __extends(InvalidRequestException, _super);
    function InvalidRequestException(opts) {
        var _this = _super.call(this, __assign({ name: "InvalidRequestException", $fault: "client" }, opts)) || this;
        _this.name = "InvalidRequestException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, InvalidRequestException.prototype);
        return _this;
    }
    return InvalidRequestException;
}(__BaseException));
export { InvalidRequestException };
var ResourceNotFoundException = (function (_super) {
    __extends(ResourceNotFoundException, _super);
    function ResourceNotFoundException(opts) {
        var _this = _super.call(this, __assign({ name: "ResourceNotFoundException", $fault: "client" }, opts)) || this;
        _this.name = "ResourceNotFoundException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ResourceNotFoundException.prototype);
        return _this;
    }
    return ResourceNotFoundException;
}(__BaseException));
export { ResourceNotFoundException };
var TooManyRequestsException = (function (_super) {
    __extends(TooManyRequestsException, _super);
    function TooManyRequestsException(opts) {
        var _this = _super.call(this, __assign({ name: "TooManyRequestsException", $fault: "client" }, opts)) || this;
        _this.name = "TooManyRequestsException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, TooManyRequestsException.prototype);
        return _this;
    }
    return TooManyRequestsException;
}(__BaseException));
export { TooManyRequestsException };
var UnauthorizedException = (function (_super) {
    __extends(UnauthorizedException, _super);
    function UnauthorizedException(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedException", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, UnauthorizedException.prototype);
        return _this;
    }
    return UnauthorizedException;
}(__BaseException));
export { UnauthorizedException };
export var AccountInfoFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetRoleCredentialsRequestFilterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
export var RoleCredentialsFilterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.secretAccessKey && { secretAccessKey: SENSITIVE_STRING })), (obj.sessionToken && { sessionToken: SENSITIVE_STRING }))); };
export var GetRoleCredentialsResponseFilterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.roleCredentials && { roleCredentials: RoleCredentialsFilterSensitiveLog(obj.roleCredentials) }))); };
export var ListAccountRolesRequestFilterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
export var RoleInfoFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var ListAccountRolesResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var ListAccountsRequestFilterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
export var ListAccountsResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var LogoutRequestFilterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
