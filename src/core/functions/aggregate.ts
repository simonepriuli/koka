import { Err } from "../types/Err";
import { Ok } from "../types/Ok";
import { Result } from "../types/Result";
/**
 * Combines an array of `Result` objects into a single `Result` object.
 *
 * If all `Result` objects in the array are `Ok`, the function returns a new `Ok` object
 * containing an array of all the unwrapped values.
 * If any `Result` object in the array is an `Err`, the function returns the first encountered `Err`.
 *
 * @template T - The type of the values in the `Ok` results.
 * @template E - The type of the errors in the `Err` results, extending `Error`.
 * @param {Result<T, E>[]} results - An array of `Result` objects to be combined.
 * @returns {Result<T[], E>} A single `Result` object that is either:
 * - `Ok` with an array of unwrapped values if all input results are `Ok`.
 * - `Err` with the first encountered error if any input result is `Err`.
 */
export function aggregate<T, E extends Error>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  for (const result of results) {
    if (result.isErr()) {
      return new Err(result.getErr() as E);
    }
    values.push(result.unwrap());
  }
  return new Ok(values);
}
