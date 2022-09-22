import { decorateServiceException } from "./exceptions";
export var throwDefaultError = function (_a) {
    var output = _a.output, parsedBody = _a.parsedBody, exceptionCtor = _a.exceptionCtor, errorCode = _a.errorCode;
    var $metadata = deserializeMetadata(output);
    var statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    var response = new exceptionCtor({
        name: parsedBody.code || parsedBody.Code || errorCode || statusCode || "UnknowError",
        $fault: "client",
        $metadata: $metadata,
    });
    throw decorateServiceException(response, parsedBody);
};
var deserializeMetadata = function (output) {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
