import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetStreamingDistributionCommandInput } from "../commands/GetStreamingDistributionCommand";
export declare const waitForStreamingDistributionDeployed: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetStreamingDistributionCommandInput
) => Promise<WaiterResult>;
export declare const waitUntilStreamingDistributionDeployed: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetStreamingDistributionCommandInput
) => Promise<WaiterResult>;
