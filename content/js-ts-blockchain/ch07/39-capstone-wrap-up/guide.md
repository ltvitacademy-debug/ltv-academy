# Lesson 39 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 7 · Capstone · Lesson 39 of 39**

## What you'll learn

- How to write a README that makes `chain-reader` legible to someone who's never seen it
- How to talk about this project in an interview — the questions it's actually built to answer
- A short recap of the whole course, chapter by chapter
- Where this path goes next

## Writing the README

A working script with no README is invisible to anyone looking at your GitHub profile. A real
README for `chain-reader` needs four things, in this order:

```markdown
# chain-reader

A typed Node.js/TypeScript CLI that reads live Ethereum chain data: the current block
number and an address's balance, with validated config and typed error handling throughout.

## Usage
    cp .env.example .env   # fill in your own RPC_URL
    npm install
    npx tsx src/index.ts <address>

## Design decisions
- Config is validated with zod at startup — a missing or malformed RPC_URL fails
  immediately with a clear message, not three function calls deep.
- Every chain read returns a typed Result<T> instead of throwing, so index.ts never
  needs its own try/catch around a network call.
- Addresses are validated before any network call, so bad input never costs an RPC
  round-trip.

## Stack
Node.js, TypeScript (strict mode, ES2022 target), ethers.js v6
```

The "Design decisions" section is the part most student READMEs skip — and the part that actually
matters to anyone evaluating the code. It's the difference between "I followed a tutorial" and
"I can explain why I built it this way."

## Talking about it in an interview

Three questions almost always come up about a small portfolio project, and `chain-reader` has a
real answer to each one, because you actually built the thing it's answering about:

- **"Walk me through how this works."** — config loads and validates first; `chain.ts` reads the
  chain and never throws; `index.ts` is the thin entry point that decides what to print and what
  exit code to use.
- **"What would you change for production?"** — add retry-with-backoff (Lesson 30's pattern) for
  RPC calls, add structured logging instead of `console.log`, and probably move from a single
  RPC endpoint to a fallback provider for reliability.
- **"What was the hardest part?"** — a real, honest answer here (even something small, like
  getting `tsconfig`'s `target` right for `bigint` literals) reads as more credible than claiming
  nothing was hard.

## Course recap: the path from Lesson 1 to here

- **Chapters 1-3**: JavaScript fundamentals, modern syntax, and async JavaScript — the language
  itself.
- **Chapter 4**: TypeScript fundamentals — types, interfaces, generics, narrowing.
- **Chapter 5**: TypeScript applied to blockchain data — typed primitives, ethers/viem, type-safe
  contract calls, project configuration, recurring patterns.
- **Chapter 6**: Node.js itself — npm, scripts, environment config, the file system, and a real
  Express server.
- **Chapter 7**: this capstone — proving every piece works together in one real tool.

## What's next in the Blockchain Engineer path

This course is the entry point of the **Blockchain Engineer** career path. The next course is
**Blockchain Development** — where Ethereum, smart contracts, and Solidity itself begin. Every
typed pattern from this course (branded `Address` types, `Result<T>`, validated config) keeps
showing up once you're writing the TypeScript tooling and tests around those contracts.

## Key terms

| Term | Meaning |
|---|---|
| README "Design decisions" section | Explains *why*, not just *what* — what interviewers actually read |
| Production follow-ups | Retry logic, structured logging, provider fallback — honest next steps |

## Lab

1. Write `chain-reader`'s full README using the template above, in your own words.
2. Write two or three sentences answering "what would you change for production?" — specific to
   decisions you actually made, not generic buzzwords.
3. Push `chain-reader` to a public GitHub repo (if you're comfortable doing so) with `.env` safely
   excluded via `.gitignore`.

## Check yourself

You've completed this course when `chain-reader` runs successfully, its README explains your
design decisions in your own words, and you can answer "walk me through how this works" out loud,
without notes.
