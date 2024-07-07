export class Result<T, E extends Error> {
  private ok?: T | null; // value
  private err?: E | null; // error

  constructor(ok: T | null, err: E | null) {
    // special case to handle the unwrap method
    /*
    if (ok === undefined && err === null) {
      this.ok = undefined;
      this.err = new Error("Value is undefined") as E;
      return;
    }
      */

    if (ok === null && err === null) {
      throw new Error("Result must have a value or an error");
    }
    if (ok !== null && err !== null) {
      throw new Error("Result cannot have both a value and an error");
    }

    this.ok = ok;
    this.err = err;
  }

  /**
   * Unwraps the result, returning the value if present, or throws the error if not.
   * @returns {T} The value of the result.
   * @throws {E} The error if the result is an error.
   */
  unwrap(): T {
    if (this.isErr()) {
      throw this.err as E;
    }

    if (this.isOk()) {
      return this.ok as T;
    }

    throw new Error("Unknown error");
  }

  /**
   * Unwraps the result, returning the value if present, or returns the provided default value.
   * @param {T} defaultValue - The default value to return if the result is an error.
   * @returns {T} The value of the result or the default value.
   */
  unwrapOr(defaultValue: T): T {
    if (this.isOk()) {
      return this.ok as T;
    } else {
      return defaultValue;
    }
  }

  /**
   * Unwraps the result, returning the value without checking if an error is present.
   * @returns {T} The value of the result.
   * @throws {E} The error if the result is an error.
   */
  unwrapUnchecked(): T {
    return this.ok as T;
  }

  /**
   * Unwraps the result, returning the value if present, or throws an error with a custom message.
   * @param {string} msg - The custom message to include in the error.
   * @returns {T} The value of the result.
   * @throws {Error} An error with the custom message if the result is an error.
   */
  _expect(msg: string): T {
    if (this.isOk()) {
      return this.ok as T;
    }

    if (this.isErr()) {
      const err = this.err as E;
      throw new Error(msg + ":\n" + err.message);
    }

    throw new Error(msg);
  }

  /**
   * Checks if the result is a value.
   * @returns {this is Result<T, never>} True if the result is a value, false otherwise.
   */
  isOk(): this is Result<T, never> {
    return this.ok !== null;
  }

  /**
   * Checks if the result is an error.
   * @returns {this is Result<never, E>} True if the result is an error, false otherwise.
   */
  isErr(): this is Result<never, E> {
    return this.err !== undefined && this.err !== null;
  }

  /**
   * Returns the error if the result is an error.
   * @returns {E | null} The error if present, or null otherwise.
   */
  getErr(): this extends Result<never, E> ? E : E | null {
    return this.err as E;
  }
}
