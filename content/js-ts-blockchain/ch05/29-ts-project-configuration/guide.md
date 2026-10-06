# Lesson 29 — TS Project Configuration

**Chapter 5 · TypeScript for Blockchain Development · Lesson 29 of 39**

## What you'll learn

- The handful of `tsconfig.json` settings that actually matter for a web3 repo
- Why `target` has to be `ES2020` or newer the moment your code uses `bigint` literals
- Which `strict` flags catch the most real bugs in contract-calling code
- Why `module`/`moduleResolution` trip up so many web3 projects mixing ESM-only libraries

## A minimal, real tsconfig.json for a web3 project

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

Every one of these earns its place for a reason specific to this kind of code, not just "best
practice" boilerplate.

## target: this is not optional once you use bigint

Every lesson so far has used `bigint` literals (`2_500_000_000_000_000_000n`) for wei amounts.
`bigint` *literals* specifically require `target` to be `ES2020` or newer — set `target` to
`ES2017` or lower and the compiler rejects every one of those literals with an error, even though
`bigint` the *type* has existed since TS 3.2. `ES2022` is a safe, current choice that also gives
you top-level `await` without extra config.

## module / moduleResolution: where web3 repos actually break

Many web3 libraries (and increasingly, the Node.js ecosystem generally) ship as ESM-only. Setting
`module`/`moduleResolution` to `NodeNext` tells TypeScript to resolve imports the same way modern
Node.js actually does — respecting each package's `"type"` field and `exports` map — instead of
the older CommonJS-style resolution that silently works for some packages and breaks for others
with a confusing "cannot find module" error that has nothing to do with a typo.

## strict mode: the flags that catch real contract bugs

`strict: true` turns on a bundle of checks at once. Three matter most for this kind of code:

- **`strictNullChecks`** — forces you to handle the `Address | null` and `number | null` fields
  from Lesson 26's `Transaction`/`Block` interfaces instead of assuming they're always present.
- **`noImplicitAny`** — stops an RPC response from silently becoming untyped `any`, which would
  erase every type-safety benefit from Lesson 28's wrapper functions.
- **`noUncheckedIndexedAccess`** (opt-in, not bundled into `strict`, but worth adding) — makes
  `transactions[0]` come back as `Hash | undefined` instead of assuming the array always has an
  element, which matters a lot for a `block.transactions` array that could be empty.

## skipLibCheck and resolveJsonModule

`skipLibCheck: true` skips type-checking inside `.d.ts` files from `node_modules` — without it, a
single outdated type definition deep in a dependency tree can block your entire build.
`resolveJsonModule: true` lets you `import abi from "./MyContract.json"` directly, which is how
most projects actually load a compiled contract's ABI.

## Key terms

| Setting | What it fixes |
|---|---|
| `target: "ES2022"` | Enables bigint literals and top-level await |
| `module/moduleResolution: "NodeNext"` | Correctly resolves ESM-only web3 packages |
| `strictNullChecks` | Forces handling of nullable chain fields |
| `skipLibCheck` | Prevents a bad dependency `.d.ts` from blocking the build |

## Lab

1. Write a `tsconfig.json` from scratch with the six settings above.
2. Set `target` to `"ES5"` on purpose, try compiling a file with a `bigint` literal, and copy
   the exact compiler error into your notes.
3. Turn `strictNullChecks` off, then back on, and note which line in your Lesson 26
   `Transaction` interface usage starts/stops erroring.

## Check yourself

You're ready for Lesson 30 when you can explain why `target: "ES2017"` breaks a web3 project that
uses `bigint` literals, and name one real bug `strictNullChecks` would have caught.
