# Lesson 31 — What Is Node.js?

**Chapter 6 · Node.js Basics · Lesson 31 of 39**

## What you'll learn

- What Node.js actually is: the V8 engine plus APIs the browser doesn't give you
- Why almost every blockchain tool you've used (Hardhat, scripts, bots, backend services) runs on Node
- The difference between CommonJS (`require`) and ES modules (`import`) in Node
- How to check your Node version and open the REPL

## Node.js is a JavaScript runtime, not a browser feature

JavaScript used to only run inside a browser tab. Node.js takes the same V8 engine Chrome uses to
execute JavaScript and drops it into a standalone program that runs directly on your computer or
a server — no browser, no DOM, no `window`. In exchange, Node gives you things a browser
deliberately withholds for security reasons: direct file system access, raw TCP/network sockets,
and the ability to read environment variables and process arguments.

This is exactly why blockchain tooling lives on Node: a script that watches new blocks, signs and
broadcasts a transaction, or runs a backend API needs to make outbound network calls and read a
private key from an environment variable — things a browser page can't (and shouldn't) do on its
own.

## Checking your installation and the REPL

```
$ node -v
v20.11.0

$ node
> const x = 2 + 2;
> x
4
> .exit
```

The interactive `node` command with no file starts the **REPL** (Read-Eval-Print Loop) — a
scratchpad for trying a line of JavaScript without creating a file. It's genuinely useful for
checking "does this one line of ethers/viem syntax actually work" before committing it to a
script.

## CommonJS vs. ES modules

Node supports two different module systems, and web3 tutorials mix both, which is a common
source of confusion:

```js
// CommonJS (the older default — package.json has no "type" field, or "type": "commonjs")
const { ethers } = require("ethers");
module.exports = { getBalance };

// ES modules (package.json has "type": "module")
import { ethers } from "ethers";
export { getBalance };
```

Which one a file uses is decided by the project's `package.json` (`"type": "module"` for ESM) or
the file extension (`.mjs` forces ESM, `.cjs` forces CommonJS regardless of the project setting).
Mixing them in the same file doesn't work — `require` doesn't exist in an ESM file, and bare
`import` statements don't work in CommonJS without extra configuration. Lesson 29 already covered
why `moduleResolution: "NodeNext"` matters here: it's TypeScript following this exact Node rule.

## What Node actually gives you beyond the language

- **File system APIs** (`fs`) — Lesson 35 covers these for reading/writing local data.
- **Network APIs** (`http`, and the `fetch` global, built in since Node 18) — calling an RPC
  endpoint from a script, with no browser involved.
- **`process`** — command-line arguments (`process.argv`), environment variables
  (`process.env`), and exit codes (`process.exit(1)` for "something went wrong").
- **`npm`** — Node ships with npm, the package manager that's the entire subject of Lesson 32.

## Key terms

| Term | Meaning |
|---|---|
| Node.js | A standalone JavaScript runtime (V8 + extra APIs) that runs outside a browser |
| REPL | Interactive prompt for running JavaScript one line at a time (`node` with no file) |
| CommonJS | The older Node module system (`require`/`module.exports`) |
| ES modules (ESM) | The modern, browser-aligned module system (`import`/`export`) |

## Lab

1. Run `node -v` and confirm you're on Node 18 or newer (required for the built-in `fetch`).
2. Open the REPL and evaluate `2n ** 10n` to confirm bigint arithmetic works outside a browser.
3. Write one file using CommonJS (`require`) and one using ESM (`import`), and note which
   `package.json` setting (or file extension) controls which one runs.

## Check yourself

You're ready for Lesson 32 when you can explain, in one sentence, what Node.js adds to plain
JavaScript, and which `package.json` field decides CommonJS vs. ESM.
