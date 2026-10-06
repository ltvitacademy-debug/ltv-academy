# Lesson 33 — Building a Simple Node Script

**Chapter 6 · Node.js Basics · Lesson 33 of 39**

## What you'll learn

- How to structure a small, runnable Node/TypeScript script with a clear entry point
- Reading command-line arguments with `process.argv`
- The `async function main()` pattern and why top-level `await` alone isn't enough structure
- Setting a correct exit code with `process.exit()` so the script is scriptable by other tools

## The shape of a real script, not a snippet

A script that just runs top to bottom works for a REPL experiment, but a real script — one
someone else will run, or you'll run in a cron job — needs a clear entry point and error
handling around it:

```ts
// src/check-balance.ts
import { JsonRpcProvider, formatEther } from "ethers";

async function main() {
  const address = process.argv[2];
  if (!address) {
    console.error("Usage: check-balance <address>");
    process.exit(1);
  }

  const provider = new JsonRpcProvider(process.env.RPC_URL);
  const balance = await provider.getBalance(address);
  console.log(`${address}: ${formatEther(balance)} ETH`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
```

Run it with `tsx src/check-balance.ts 0xYourAddressHere` (Lesson 32's `npx`/dev-script pattern).

## process.argv: reading command-line arguments

`process.argv` is an array where index 0 is the Node executable path, index 1 is the script path,
and index 2 onward are whatever arguments were actually typed after the script name:

```
$ node check-balance.js 0xABC...
process.argv[0] -> "/usr/local/bin/node"
process.argv[1] -> "/path/to/check-balance.js"
process.argv[2] -> "0xABC..."
```

Always validate `process.argv[2]` exists before using it — a missing argument becomes `undefined`,
and passing `undefined` where an `Address` is expected produces a confusing error far from the
real cause (the same lesson from Lesson 30's schema-validation pattern, applied to CLI input
instead of environment variables).

## Why wrap everything in `main()`

Top-level `await` works in modern Node/ESM, but an uncaught rejection from a bare top-level
`await provider.getBalance(...)` prints a messy, hard-to-read stack trace and Node may still exit
with code 0 (success) depending on the Node version and error type. Wrapping the real logic in an
`async function main()` and attaching exactly one `.catch()` to it gives you one, controlled place
to log the error and set the exit code correctly.

## Exit codes: making the script tool-friendly

```ts
process.exit(0); // success (also the default if main() resolves and nothing else exits)
process.exit(1); // failure — any nonzero code signals "something went wrong"
```

This matters the moment the script is used by anything other than a human watching the terminal —
a shell script chaining commands with `&&`, a CI pipeline, a cron job alerting on failure. All of
them decide what happened next based on the exit code, not on what got printed to the console.

## Key terms

| Term | Meaning |
|---|---|
| `process.argv` | Array of command-line arguments; real arguments start at index 2 |
| `async function main()` | The conventional single entry point for a script's real logic |
| `process.exit(code)` | Sets the script's exit status — 0 for success, nonzero for failure |

## Lab

1. Write `check-balance.ts` exactly as shown, reading the address from `process.argv[2]`.
2. Run it with no argument and confirm it prints the usage message and exits with code 1
   (check with `echo $?` on macOS/Linux or `echo $LASTEXITCODE` in PowerShell right after).
3. Run it with a real address and confirm it prints a balance.

## Check yourself

You're ready for Lesson 34 when you can explain why wrapping script logic in `main().catch(...)`
is safer than bare top-level `await`, and what `process.argv[2]` contains.
