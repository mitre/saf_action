import { ServiceException as __ServiceException, } from "@smithy/smithy-client";
export { __ServiceException };
export class CloudFrontServiceException extends __ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, CloudFrontServiceException.prototype);
    }
}
