import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetDistributionCommandInput } from "../commands/GetDistributionCommand";
export declare const waitForDistributionDeployed: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetDistributionCommandInput
) => Promise<WaiterResult>;
export declare const waitUntilDistributionDeployed: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetDistributionCommandInput
) => Promise<WaiterResult>;
