import { GuardAsync } from "../../types/guard/guardAsync";


/**
 * Guards against undefined values and provides methods to handle them.
 * @param value - The value to be guarded.
 * @returns An object with methods to handle undefined values.
 * @template T - The type of the value being guarded.
 */
export function guardAsync<T>(valuePromise: Promise<T>): GuardAsync<T> {
    return new GuardAsync(valuePromise);
}