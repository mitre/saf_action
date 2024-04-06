import { Paginator } from "@smithy/types";
import { ListDistributionsCommandInput, ListDistributionsCommandOutput } from "../commands/ListDistributionsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListDistributions: (config: CloudFrontPaginationConfiguration, input: ListDistributionsCommandInput, ...rest: any[]) => Paginator<ListDistributionsCommandOutput>;
