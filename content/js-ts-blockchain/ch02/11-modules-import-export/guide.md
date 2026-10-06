# Lesson 11 — Modules: import & export

**Chapter 2 · Modern JavaScript · Lesson 11 of 39**

## What you'll learn

- Why splitting code across multiple files matters once a project grows past a single script
- Named exports and named imports — the style you'll use for most of your own code
- Default exports — the style most blockchain libraries use for their main entry point
- The practical difference between CommonJS (`require`) and ES modules (`import`), since you'll meet both

## Why modules at all

A real project is never one file. Splitting code into focused files — one
for wallet logic, one for formatting helpers, one for configuration — keeps
each file short enough to actually understand, and lets multiple files
reuse the same function instead of copy-pasting it everywhere. A **module**
is just a file whose exports other files can import.

## Named exports and imports

```js
// math-helpers.js
export function add(a, b) {
  return a + b;
}
export const PI = 3.14159;
```

```js
// main.js
import { add, PI } from "./math-helpers.js";

console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159
```

A **named export** can export as many things as a file needs, each with
its own name. The importing file picks exactly which ones it wants inside
`{ }`, using the same names they were exported with (or renamed with `as`).

## Default exports

```js
// wallet.js
export default class Wallet {
  constructor(address) {
    this.address = address;
  }
}
```

```js
// main.js
import Wallet from "./wallet.js"; // no { }, and any name works here

const w = new Wallet("0xAb12...");
```

A file can have exactly **one** default export — typically its main thing,
like a class or a single primary function. Importing a default doesn't use
`{ }`, and the importing file can name it anything it wants, since there's
no exported name to match. Many blockchain libraries structure their main
export this way.

## CommonJS vs. ES modules

```js
// CommonJS (older Node.js style)
const fs = require("fs");
module.exports = { readConfig };

// ES modules (modern standard)
import fs from "fs";
export { readConfig };
```

Node.js originally used **CommonJS** (`require`/`module.exports`), which
loads synchronously at runtime. **ES modules** (`import`/`export`) are the
modern JavaScript standard — used in the browser and in modern Node.js —
and are parsed statically before the code even runs, which is what enables
tooling to catch certain errors earlier. You'll see both in real projects;
Node.js needs either `"type": "module"` in `package.json` or a `.mjs`
extension to treat files as ES modules instead of CommonJS.

## Key terms

| Term | Meaning |
|---|---|
| Module | A file whose exports other files can import |
| Named export | One of possibly several exports from a file, imported by matching name |
| Default export | The one export per file that doesn't require a matching name to import |

## Check yourself

You're ready for Lesson 12 when you can write one file with a named export
and another file with a default export, and import both correctly into a
third file.
