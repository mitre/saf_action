import { Paginator } from "@smithy/types";
import { ListKeyValueStoresCommandInput, ListKeyValueStoresCommandOutput } from "../commands/ListKeyValueStoresCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListKeyValueStores: (config: CloudFrontPaginationConfiguration, input: ListKeyValueStoresCommandInput, ...rest: any[]) => Paginator<ListKeyValueStoresCommandOutput>;
