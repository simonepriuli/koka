import { Result } from "../../types/Result";

/**
 * Wraps a synchronous function in a Result object, capturing success or error.
 * @template T - The type of the value the function returns.
 * @param {() => T} fn - The synchronous function to wrap.
 * @returns {Result<T, Error>} A Result object containing the value or an error.
 */
export function trySync<T>(fn: () => T): Result<T, Error> {
  try {
    const data = fn();
    return new Result<T, Error>(data, null);
  } catch (error) {
    if (error instanceof Error) {
      return new Result<T, Error>(null, error);
    }

    return new Result<T, Error>(null, new Error("Unknown error"));
  }
}
