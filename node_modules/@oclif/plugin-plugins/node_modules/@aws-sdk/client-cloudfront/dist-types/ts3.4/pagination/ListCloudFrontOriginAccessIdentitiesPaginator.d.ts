import { Paginator } from "@smithy/types";
import {
  ListCloudFrontOriginAccessIdentitiesCommandInput,
  ListCloudFrontOriginAccessIdentitiesCommandOutput,
} from "../commands/ListCloudFrontOriginAccessIdentitiesCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
export declare const paginateListCloudFrontOriginAccessIdentities: (
  config: CloudFrontPaginationConfiguration,
  input: ListCloudFrontOriginAccessIdentitiesCommandInput,
  ...rest: any[]
) => Paginator<ListCloudFrontOriginAccessIdentitiesCommandOutput>;
