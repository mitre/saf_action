import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListDistributionsCommand, } from "../commands/ListDistributionsCommand";
export const paginateListDistributions = createPaginator(CloudFrontClient, ListDistributionsCommand, "Marker", "DistributionList.NextMarker", "MaxItems");
