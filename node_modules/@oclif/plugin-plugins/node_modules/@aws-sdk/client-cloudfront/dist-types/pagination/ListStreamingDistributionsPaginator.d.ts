import { Paginator } from "@smithy/types";
import { ListStreamingDistributionsCommandInput, ListStreamingDistributionsCommandOutput } from "../commands/ListStreamingDistributionsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListStreamingDistributions: (config: CloudFrontPaginationConfiguration, input: ListStreamingDistributionsCommandInput, ...rest: any[]) => Paginator<ListStreamingDistributionsCommandOutput>;
