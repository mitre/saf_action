import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListKeyValueStoresCommand, } from "../commands/ListKeyValueStoresCommand";
export const paginateListKeyValueStores = createPaginator(CloudFrontClient, ListKeyValueStoresCommand, "Marker", "KeyValueStoreList.NextMarker", "MaxItems");
