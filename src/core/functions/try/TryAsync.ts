import { Result } from "../../types/Result";

/**
 * Wraps a promise in a Result object, capturing success or error.
 * @template T - The type of the value the promise resolves to.
 * @param {Promise<T>} fn - The promise to wrap.
 * @returns {Promise<Result<T, Error>>} A promise that resolves to a Result object containing the value or an error.
 */
export async function tryAsync<T>(fn: Promise<T>): Promise<Result<T, Error>> {
  try {
    const data = await fn;
    return new Result<T, Error>(data, null);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Result<T, Error>(null, error);
    }

    return new Result<T, Error>(null, new Error("Unknown error"));
  }
}
