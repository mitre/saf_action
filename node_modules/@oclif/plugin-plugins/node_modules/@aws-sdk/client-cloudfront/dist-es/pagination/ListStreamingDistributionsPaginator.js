import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListStreamingDistributionsCommand, } from "../commands/ListStreamingDistributionsCommand";
export const paginateListStreamingDistributions = createPaginator(CloudFrontClient, ListStreamingDistributionsCommand, "Marker", "StreamingDistributionList.NextMarker", "MaxItems");
