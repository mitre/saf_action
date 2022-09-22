import { __assign, __extends } from "tslib";
import { STSServiceException as __BaseException } from "./STSServiceException";
var ExpiredTokenException = (function (_super) {
    __extends(ExpiredTokenException, _super);
    function ExpiredTokenException(opts) {
        var _this = _super.call(this, __assign({ name: "ExpiredTokenException", $fault: "client" }, opts)) || this;
        _this.name = "ExpiredTokenException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ExpiredTokenException.prototype);
        return _this;
    }
    return ExpiredTokenException;
}(__BaseException));
export { ExpiredTokenException };
var MalformedPolicyDocumentException = (function (_super) {
    __extends(MalformedPolicyDocumentException, _super);
    function MalformedPolicyDocumentException(opts) {
        var _this = _super.call(this, __assign({ name: "MalformedPolicyDocumentException", $fault: "client" }, opts)) || this;
        _this.name = "MalformedPolicyDocumentException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, MalformedPolicyDocumentException.prototype);
        return _this;
    }
    return MalformedPolicyDocumentException;
}(__BaseException));
export { MalformedPolicyDocumentException };
var PackedPolicyTooLargeException = (function (_super) {
    __extends(PackedPolicyTooLargeException, _super);
    function PackedPolicyTooLargeException(opts) {
        var _this = _super.call(this, __assign({ name: "PackedPolicyTooLargeException", $fault: "client" }, opts)) || this;
        _this.name = "PackedPolicyTooLargeException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, PackedPolicyTooLargeException.prototype);
        return _this;
    }
    return PackedPolicyTooLargeException;
}(__BaseException));
export { PackedPolicyTooLargeException };
var RegionDisabledException = (function (_super) {
    __extends(RegionDisabledException, _super);
    function RegionDisabledException(opts) {
        var _this = _super.call(this, __assign({ name: "RegionDisabledException", $fault: "client" }, opts)) || this;
        _this.name = "RegionDisabledException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RegionDisabledException.prototype);
        return _this;
    }
    return RegionDisabledException;
}(__BaseException));
export { RegionDisabledException };
var IDPRejectedClaimException = (function (_super) {
    __extends(IDPRejectedClaimException, _super);
    function IDPRejectedClaimException(opts) {
        var _this = _super.call(this, __assign({ name: "IDPRejectedClaimException", $fault: "client" }, opts)) || this;
        _this.name = "IDPRejectedClaimException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, IDPRejectedClaimException.prototype);
        return _this;
    }
    return IDPRejectedClaimException;
}(__BaseException));
export { IDPRejectedClaimException };
var InvalidIdentityTokenException = (function (_super) {
    __extends(InvalidIdentityTokenException, _super);
    function InvalidIdentityTokenException(opts) {
        var _this = _super.call(this, __assign({ name: "InvalidIdentityTokenException", $fault: "client" }, opts)) || this;
        _this.name = "InvalidIdentityTokenException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, InvalidIdentityTokenException.prototype);
        return _this;
    }
    return InvalidIdentityTokenException;
}(__BaseException));
export { InvalidIdentityTokenException };
var IDPCommunicationErrorException = (function (_super) {
    __extends(IDPCommunicationErrorException, _super);
    function IDPCommunicationErrorException(opts) {
        var _this = _super.call(this, __assign({ name: "IDPCommunicationErrorException", $fault: "client" }, opts)) || this;
        _this.name = "IDPCommunicationErrorException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, IDPCommunicationErrorException.prototype);
        return _this;
    }
    return IDPCommunicationErrorException;
}(__BaseException));
export { IDPCommunicationErrorException };
var InvalidAuthorizationMessageException = (function (_super) {
    __extends(InvalidAuthorizationMessageException, _super);
    function InvalidAuthorizationMessageException(opts) {
        var _this = _super.call(this, __assign({ name: "InvalidAuthorizationMessageException", $fault: "client" }, opts)) || this;
        _this.name = "InvalidAuthorizationMessageException";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, InvalidAuthorizationMessageException.prototype);
        return _this;
    }
    return InvalidAuthorizationMessageException;
}(__BaseException));
export { InvalidAuthorizationMessageException };
export var AssumedRoleUserFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var PolicyDescriptorTypeFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var TagFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var CredentialsFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleWithSAMLRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleWithSAMLResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleWithWebIdentityRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var AssumeRoleWithWebIdentityResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var DecodeAuthorizationMessageRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var DecodeAuthorizationMessageResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetAccessKeyInfoRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetAccessKeyInfoResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetCallerIdentityRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetCallerIdentityResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetFederationTokenRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var FederatedUserFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetFederationTokenResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetSessionTokenRequestFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
export var GetSessionTokenResponseFilterSensitiveLog = function (obj) { return (__assign({}, obj)); };
