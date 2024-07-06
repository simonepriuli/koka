export class GuardSync<T> {
  private value: T | undefined;

  constructor(value: T | undefined) {
    this.value = value;
  }
  /**
   * Returns the guarded value or the default value if the guarded value is undefined.
   * @param defaultValue - The value to return if the guarded value is undefined.
   * @returns A promise that resolves to the guarded value or the default value.
   */
  or(defaultValue: T): T {
    if (this.value !== undefined) {
      return this.value;
    }
    return defaultValue;
  }
  /**
   * Returns the guarded value if it is not undefined, otherwise throws an error.
   * @throws {Error} If the guarded value is undefined.
   * @returns A promise that resolves to the guarded value.
   */
  _throws(): T {
    if (this.value === undefined) {
      throw new Error("Value is undefined");
    }
    return this.value;
  }
}
