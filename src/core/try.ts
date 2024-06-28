class Result<T, E extends Error> {
  private value?: T;
  private error?: E;

  private constructor(value?: T, error?: E) {
    if (value !== undefined && error !== undefined) {
      throw new Error("Result cannot have both value and error");
    }
    this.value = value;
    this.error = error;
  }

  public static success<T, E extends Error>(value: T): Result<T, E> {
    return new Result<T, E>(value);
  }

  public static failure<T, E extends Error>(error: E): Result<T, E> {
    return new Result<T, E>(undefined, error);
  }

  public getValue(): T | undefined {
    return this.value;
  }

  public getError(): E | undefined {
    return this.error;
  }

  public orThrow(message?: string): T {
    if (this.error) {
      if (message) {
        throw new Error(message);
      }
      throw this.error;
    }
    return this.value as T;
  }
}

/**
 * Executes a function or a promise and handles errors, returning a Result object.
 * @template T
 * @param {Promise<T> | (() => T)} promiseOrFunc - The promise or function to execute.
 * @returns {Promise<Result<T, Error>> | Result<T, Error>} - The result of the execution.
 */
export function Try<T>(
  promiseOrFunc: Promise<T> | (() => T)
): Promise<Result<T, Error>> | Result<T, Error> {
  if (promiseOrFunc instanceof Promise) {
    return TryAsync(promiseOrFunc);
  }
  return TrySync(promiseOrFunc);
}

/**
 * Synchronously executes a function and handles errors, returning a Result object.
 * @template T
 * @param {() => T} fn - The function to execute.
 * @returns {Result<T, Error>} - The result of the execution.
 */
function TrySync<T>(fn: () => T): Result<T, Error> {
  try {
    const value = fn();
    return Result.success<T, Error>(value);
  } catch (err: any) {
    return handleError<T>(err);
  }
}

/**
 * Asynchronously executes a promise and handles errors, returning a Result object.
 * @template T
 * @param {Promise<T>} promise - The promise to execute.
 * @returns {Promise<Result<T, Error>>} - The result of the execution.
 */
async function TryAsync<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  try {
    const value = await promise;
    return Result.success<T, Error>(value);
  } catch (err: any) {
    return handleError<T>(err);
  }
}

/**
 * Handles errors and returns a failure Result object.
 * @template T
 * @param {any} err - The error that occurred.
 * @returns {Result<T, Error>} - The failure result.
 */
function handleError<T>(err: any): Result<T, Error> {
  const error = new Error(err.toString());
  return Result.failure<T, Error>(error);
}
