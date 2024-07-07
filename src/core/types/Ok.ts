import { Result } from "./Result";

export class Ok<T, E extends Error> extends Result<T, E> {
  constructor(value: T) {
    super(value, null);
  }
}
