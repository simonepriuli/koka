<br>

![Kōka](https://raw.githubusercontent.com/simonepriuli/koka/main/img/logo.png)

<br>

Kōka helps you craft elegant and secure TypeScript code. It enables easy error handling, streamlines development processes, and enhances code maintainability.

_効果 (こうか): This means "effect" or "effectiveness." It can be used to talk about the impact or result of something._

```bash
npm i koka-ts
```

## Usage/Examples

### trySync and tryAsync

```typescript
async function getData(): Promise<string> {
  const res = await tryAsync(fetch("https://api.sampleapis.com/coffee/hot"));
  if (res.isErr()) {
    const err = res.getErr();
    return err.message;
  }
  const data = await tryAsync(res.unwrap().json());
  if (data.isErr()) {
    const err = data.getErr();
    return err.message;
  }
  return data.unwrap()[0].title;
}
```

### guardSync and guardAsync

```typescript
async function getUser(userId: number): Promise<User> {
  const user = await guardAsync(db.users.findOne(userId)).throw();
  return user;
}
```

```typescript
async function getUserName(userId: number): Promise<string> {
  const userName = (await db.users.findOne(1)).name;
  return guardSync(userName).or("John Doe");
}
```
