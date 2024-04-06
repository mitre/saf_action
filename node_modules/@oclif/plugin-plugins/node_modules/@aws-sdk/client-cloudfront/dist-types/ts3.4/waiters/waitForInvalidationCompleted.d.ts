import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetInvalidationCommandInput } from "../commands/GetInvalidationCommand";
export declare const waitForInvalidationCompleted: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetInvalidationCommandInput
) => Promise<WaiterResult>;
export declare const waitUntilInvalidationCompleted: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetInvalidationCommandInput
) => Promise<WaiterResult>;
