import { checkExceptions, createWaiter, WaiterState } from "@smithy/util-waiter";
import { GetDistributionCommand } from "../commands/GetDistributionCommand";
const checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new GetDistributionCommand(input));
        reason = result;
        try {
            const returnComparator = () => {
                return result.Distribution.Status;
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
export const waitForDistributionDeployed = async (params, input) => {
    const serviceDefaults = { minDelay: 60, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
export const waitUntilDistributionDeployed = async (params, input) => {
    const serviceDefaults = { minDelay: 60, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};
