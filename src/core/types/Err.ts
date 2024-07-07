import { Result } from "./Result";

export class Err<T, E extends Error> extends Result<T, E> {
  constructor(error: E) {
    super(null, error);
  }
}
