import { Paginator } from "@smithy/types";
import { ListInvalidationsCommandInput, ListInvalidationsCommandOutput } from "../commands/ListInvalidationsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListInvalidations: (config: CloudFrontPaginationConfiguration, input: ListInvalidationsCommandInput, ...rest: any[]) => Paginator<ListInvalidationsCommandOutput>;
