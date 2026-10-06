# Lesson 37 — Capstone Kickoff

**Chapter 7 · Capstone · Lesson 37 of 39**

## What you'll learn

- The exact scope of this course's capstone project: a typed Node/TypeScript script that reads
  real blockchain data
- Every skill from Chapters 5 and 6 it's designed to pull together in one place
- The file structure you'll build in Lesson 38
- What "done" looks like, and the optional stretch goal

## The project: chain-reader

Over the next two lessons, you'll build **chain-reader** — a small, real, typed command-line
tool that:

1. Loads and validates its configuration (an RPC URL, optionally a target address) from a `.env`
   file, the way Lesson 34 covered.
2. Connects to a real Ethereum RPC endpoint and reads the current block number and an address's
   balance.
3. Formats and prints the result cleanly to the console, with a non-zero exit code on failure —
   Lesson 33's `main()`/exit-code discipline.
4. Handles a bad address, a bad RPC URL, or a network failure as a typed `Result<T>`
   (Lesson 28/30) instead of an unhandled crash.

This isn't a toy exercise disconnected from the rest of the course — it's deliberately built from
pieces you already have working code for: Lesson 26's typed primitives, Lesson 27's ethers v6
syntax, Lesson 28's typed wrapper + `Result<T>` pattern, Lesson 29's tsconfig, Lesson 30's `zod`
config validation, and Lesson 33/34/35's script structure, env handling, and optional disk
caching.

## Why this scope, and not something bigger

A capstone that tries to be a full DApp or a multi-chain indexer would pull in Solidity, a
frontend framework, and deployment tooling this course never taught — that's deliberately out of
scope here (and exactly what later courses in the Blockchain Engineer path cover). This capstone
stays inside exactly what Chapters 5 and 6 taught, proven end to end, which is what actually
belongs in a portfolio at this stage: a small, real, *working* tool, not an ambitious half-built
one.

## What you'll build, file by file

```
chain-reader/
├── package.json         # Lesson 32
├── tsconfig.json         # Lesson 29
├── .env.example          # Lesson 34
├── .gitignore             # Lesson 34
├── src/
│   ├── config.ts        # zod-validated env config (Lessons 29, 30, 34)
│   ├── chain.ts          # typed provider + Result<T> wrapper (Lessons 26-28)
│   └── index.ts          # main() entry point, argv handling (Lesson 33)
└── README.md             # written in Lesson 39
```

## Definition of done

- `npx tsx src/index.ts <address>` prints the current block number and that address's balance in
  ETH, against a real RPC endpoint.
- Running it with a malformed address or an invalid `RPC_URL` prints a clear error and exits with
  a non-zero code — it never throws a raw, unhandled stack trace.
- Every piece of config (`RPC_URL`) is validated, never trusted directly from `process.env`.

**Stretch goal** (optional, not required for a complete capstone): wrap `chain.ts`'s logic in the
Express server from Lesson 36, exposing `GET /balance/:address` as a real HTTP endpoint instead
of only a CLI tool.

## Key terms

| Term | Meaning |
|---|---|
| `chain-reader` | This capstone's project name — a typed CLI that reads real chain data |
| Definition of done | The specific, checkable conditions that mark the capstone complete |
| Stretch goal | An optional extension (the Express wrapper) beyond the required scope |

## Lab

1. Create the `chain-reader/` folder and the file tree above (empty files are fine for now).
2. Write one paragraph, in your own words, describing what each of the three `src/` files will
   be responsible for, before writing any code — you'll build them in Lesson 38.

## Check yourself

You're ready for Lesson 38 when you can state, from memory, the four things `chain-reader` has
to do and which earlier lesson each one is built from.
