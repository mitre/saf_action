import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListInvalidationsCommand, } from "../commands/ListInvalidationsCommand";
export const paginateListInvalidations = createPaginator(CloudFrontClient, ListInvalidationsCommand, "Marker", "InvalidationList.NextMarker", "MaxItems");
