# Script — Capstone: A Typed Node/TS Script That Reads Blockchain Data

## Segment 1 (title)

Three files, each one pulling together specific lessons from the last two chapters, into one real, working tool.

## Segment 2 (code: config.ts)

config-dot-ts loads dotenv and validates RPC_URL through a zod schema in one step. If it's missing or not a valid URL, the script fails immediately, right here, with a clear message — never three function calls deep inside a provider constructor.

## Segment 3 (code: chain.ts)

chain-dot-ts is where Lessons 26, 27, and 28 all show up in one real function: a branded Address type, a real JsonRpcProvider and getBalance call, and a Result type returned instead of a thrown exception. The address is validated before the network call, so a bad address never costs an RPC round-trip. Promise.all runs the block number and balance reads concurrently, since neither depends on the other.

## Segment 4 (code: index.ts)

index-dot-ts is Lesson 33's main function and process.argv pattern exactly. Notice what's missing: no try-catch around the chain call itself, because chain-dot-ts already turned every possible failure into a Result — index-dot-ts only has to check result-dot-ok. That's the direct payoff of building the Result pattern properly one file earlier.

## Segment 5 (code: running it)

Set RPC_URL in your dot-env file, run it with a real address, and you get a real block number and balance back. Run it with a malformed address, and you get a clean error message and a non-zero exit code instead of a raw stack trace.

## Segment 6 (outro)

Final lesson: wrapping up the capstone and turning it into something you can actually show in a portfolio or an interview.
