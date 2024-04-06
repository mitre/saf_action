import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListCloudFrontOriginAccessIdentitiesCommand, } from "../commands/ListCloudFrontOriginAccessIdentitiesCommand";
export const paginateListCloudFrontOriginAccessIdentities = createPaginator(CloudFrontClient, ListCloudFrontOriginAccessIdentitiesCommand, "Marker", "CloudFrontOriginAccessIdentityList.NextMarker", "MaxItems");
