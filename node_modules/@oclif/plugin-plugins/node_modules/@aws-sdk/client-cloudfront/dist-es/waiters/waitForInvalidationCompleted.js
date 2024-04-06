import { checkExceptions, createWaiter, WaiterState } from "@smithy/util-waiter";
import { GetInvalidationCommand } from "../commands/GetInvalidationCommand";
const checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new GetInvalidationCommand(input));
        reason = result;
        try {
            const returnComparator = () => {
                return result.Invalidation.Status;
            };
            if (returnComparator() === "Completed") {
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
export const waitForInvalidationCompleted = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
export const waitUntilInvalidationCompleted = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};
