# Lesson 35 — File System Basics

**Chapter 6 · Node.js Basics · Lesson 35 of 39**

## What you'll learn

- Reading and writing files with the Promise-based `fs/promises` API
- Why the Promise API is almost always the right choice over the older callback or sync APIs
- Using `path.join` so file paths work on Windows and macOS/Linux alike
- A real use case: caching the last-checked block number to disk instead of re-querying it

## fs/promises: the modern way to read and write files

Node's `fs` module has three API styles — synchronous, callback-based, and Promise-based.
`fs/promises` is the one that pairs naturally with `async`/`await`, the same pattern every
`provider.getBalance()` call in this course already uses:

```ts
import { readFile, writeFile } from "fs/promises";

// Writing JSON to disk
const cache = { lastBlock: 18500000, checkedAt: new Date().toISOString() };
await writeFile("cache.json", JSON.stringify(cache, null, 2));

// Reading it back
const raw = await readFile("cache.json", "utf-8");
const data = JSON.parse(raw);
console.log(data.lastBlock);
```

`readFile` without an encoding argument returns a `Buffer` (raw bytes); passing `"utf-8"` returns
a plain `string`, which is almost always what you want for JSON or text.

## Why not the sync or callback APIs?

```ts
// Sync — blocks the entire event loop until the file finishes reading
import { readFileSync } from "fs";
const raw = readFileSync("cache.json", "utf-8");

// Callback — the pre-Promise style, now mostly legacy
import { readFile } from "fs";
readFile("cache.json", "utf-8", (err, raw) => { /* ... */ });
```

The sync API genuinely blocks Node's single-threaded event loop — fine for a one-off CLI script
that does nothing else while reading, actively harmful in a server (Lesson 36's Express app) where
it would stall every other request while one file read finishes. The callback API still works but
predates `async`/`await` and nests awkwardly once you chain more than one file operation — `fs/promises`
is the current, recommended default for anything new.

## path.join: paths that work on every OS

```ts
import { join } from "path";

const cachePath = join(process.cwd(), "data", "cache.json");
// Windows: C:\project\data\cache.json
// macOS/Linux: /project/data/cache.json
```

Building a path with string concatenation (`dir + "/" + "cache.json"`) breaks on Windows, where
the separator is `\`, not `/`. `path.join` picks the right separator for whatever OS the script
actually runs on — essential the moment your script might run in CI (usually Linux) and on a
teammate's Windows machine.

## A real use case: caching the last-checked block

Re-querying the same RPC endpoint for data that rarely changes wastes rate-limited calls. A tiny
cache file solves it:

```ts
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

async function getLastCheckedBlock(): Promise<number | null> {
  if (!existsSync("cache.json")) return null;
  const data = JSON.parse(await readFile("cache.json", "utf-8"));
  return data.lastBlock;
}

async function saveLastCheckedBlock(blockNumber: number) {
  await writeFile("cache.json", JSON.stringify({ lastBlock: blockNumber }));
}
```

`existsSync` (a sync check, fine here since it's instantaneous and not reading file contents) avoids
a `readFile` throwing on a file that simply doesn't exist yet — the first run of the script.

## Key terms

| Term | Meaning |
|---|---|
| `fs/promises` | The Promise-based, `async`/`await`-friendly file API — the current default |
| `readFile(path, "utf-8")` | Returns file contents as a string instead of a raw Buffer |
| `path.join(...)` | Builds a file path using the correct separator for the current OS |
| `existsSync(path)` | Synchronously checks whether a path exists, before trying to read it |

## Lab

1. Write a script that saves `{ lastBlock: 123 }` to `cache.json` using `fs/promises`.
2. Read it back, parse it, and print `lastBlock`.
3. Rewrite the file path using `path.join(process.cwd(), "data", "cache.json")` instead of a
   plain string, and create the `data` folder first.

## Check yourself

You're ready for Lesson 36 when you can explain why the sync `fs` API is dangerous inside a
server, and why `path.join` matters more than it looks like it should.
