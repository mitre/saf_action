import { checkExceptions, createWaiter, WaiterState } from "@smithy/util-waiter";
import { GetStreamingDistributionCommand, } from "../commands/GetStreamingDistributionCommand";
const checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new GetStreamingDistributionCommand(input));
        reason = result;
        try {
            const returnComparator = () => {
                return result.StreamingDistribution.Status;
            };
            if (returnComparator() === "Deployed") {
                return { state: WaiterState.SUCCESS, reason };
            }
        }
        catch (e) { }
    }
    catch (exception) {
        reason = exception;
    }
    return { state: WaiterState.RETRY, reason };
};
export const waitForStreamingDistributionDeployed = async (params, input) => {
    const serviceDefaults = { minDelay: 60, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
export const waitUntilStreamingDistributionDeployed = async (params, input) => {
    const serviceDefaults = { minDelay: 60, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};
