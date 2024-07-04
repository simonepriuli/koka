import { Guard } from "../../types/guard/guardSync";

/**
 * Guards against undefined values and provides methods to handle them.
 * @param value - The value to be guarded.
 * @returns An object with methods to handle undefined values.
 * @template T - The type of the value being guarded.
 */
export function guardSync<T>(value: T | undefined): Guard<T> {
  return new Guard(value);
}