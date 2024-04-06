import { PaginationConfiguration } from "@smithy/types";
import { CloudFrontClient } from "../CloudFrontClient";
export interface CloudFrontPaginationConfiguration
  extends PaginationConfiguration {
  client: CloudFrontClient;
}
