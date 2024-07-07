import { Guard } from "../../types/guard/Guard";

/**
 * Guards against undefined values and provides methods to handle them.
 * @param value - The value to be guarded.
 * @returns An object with methods to handle undefined values.
 * @template T - The type of the value being guarded.
 */

export async function guardAsync<T>(
  valuePromise: Promise<T>
): Promise<Guard<T>> {
  const value = await valuePromise;
  return new Guard(value);
}
