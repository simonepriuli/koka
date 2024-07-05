/**
 * Guard class to encapsulate a value and provide methods for handling undefined values.
 */
export class GuardAsync<T> {
  private valuePromise: Promise<T>;

  /**
   * Creates an instance of Guard.
   * @param valuePromise - A promise that resolves to the value to be guarded.
   */
  constructor(valuePromise: Promise<T>) {
    this.valuePromise = valuePromise;
  }

  /**
   * Returns the guarded value or the default value if the guarded value is undefined.
   * @param defaultValue - The value to return if the guarded value is undefined.
   * @returns A promise that resolves to the guarded value or the default value.
   */
  async or(defaultValue: T): Promise<T> {
    try {
      const value = await this.valuePromise;
      return value !== undefined ? value : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * Returns the guarded value if it is not undefined, otherwise throws an error.
   * @throws {Error} If the guarded value is undefined.
   * @returns A promise that resolves to the guarded value.
   */
  async _throws(): Promise<T> {
    try {
      const value = await this.valuePromise;
      if (value === undefined) {
        throw new Error("Value is undefined");
      }
      return value;
    } catch (error) {
      throw new Error("Value is undefined");
    }
  }
}
