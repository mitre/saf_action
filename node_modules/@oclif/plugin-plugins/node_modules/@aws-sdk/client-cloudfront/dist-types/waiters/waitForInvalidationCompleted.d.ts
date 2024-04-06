import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetInvalidationCommandInput } from "../commands/GetInvalidationCommand";
/**
 * Wait until an invalidation has completed.
 *  @deprecated Use waitUntilInvalidationCompleted instead. waitForInvalidationCompleted does not throw error in non-success cases.
 */
export declare const waitForInvalidationCompleted: (params: WaiterConfiguration<CloudFrontClient>, input: GetInvalidationCommandInput) => Promise<WaiterResult>;
/**
 * Wait until an invalidation has completed.
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetInvalidationCommand for polling.
 */
export declare const waitUntilInvalidationCompleted: (params: WaiterConfiguration<CloudFrontClient>, input: GetInvalidationCommandInput) => Promise<WaiterResult>;
