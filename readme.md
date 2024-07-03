<br>

![Kōka](./img/logo.png)

<br>

Kōka helps you craft elegant and secure TypeScript code. It enables easy error handling, streamlines development processes, and enhances code maintainability.

_効果 (こうか): This means "effect" or "effectiveness." It can be used to talk about the impact or result of something._

```bash
npm i koka-ts
```

## Usage/Examples

```typescript
async function getData(): Promise<string> {
  const res = await tryAsync(fetch("https://api.sampleapis.com/coffee/hot"));
  if (res.isErr()) {
    return res.getErr().message;
  }
  const data = await tryAsync(res.unwrap().json());
  if (data.isErr()) {
    return data.getErr().message;
  }

  return data.unwrap()[0].title;
}
```
