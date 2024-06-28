export function guard<T>(arg: T | undefined): T {
  if (arg === undefined) {
    
    throw new Error(`f name is undefinded`);
  }
  return arg;
}
