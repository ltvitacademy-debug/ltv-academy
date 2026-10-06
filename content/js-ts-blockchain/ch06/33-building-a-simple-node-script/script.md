# Script — Building a Simple Node Script

## Segment 1 (title)

A real script needs more structure than a REPL experiment: a clear entry point, argument handling, and a correct exit code.

## Segment 2 (code: the shape of a real script)

Wrap the real logic in an async function called main. Read the address from process.argv, exit early with a usage message if it's missing, create a provider, get the balance, print it. Then call main, with exactly one dot-catch attached, to log any failure and exit with a nonzero code.

## Segment 3 (code: process.argv)

process.argv is an array: index zero is the node executable path, index one is the script path, and index two onward is whatever you actually typed after the script name. Always check that process.argv at index two actually exists before using it — a missing argument becomes undefined, and that produces a confusing error far from the real cause.

## Segment 4 (steps: why wrap everything in main, and exit codes)

Top-level await works in modern Node, but an uncaught rejection from a bare top-level await prints a messy stack trace, and depending on the Node version the process might still exit zero — meaning "success" to anything watching it. Wrapping the logic in main and attaching one catch gives you one controlled place to log the error and call process.exit with a nonzero code. That matters the moment anything other than a human is watching: a shell script chaining commands, a CI pipeline, a cron job alerting on failure — all of them decide what happened next from the exit code, not the console output.

## Segment 5 (outro)

Next lesson: loading environment variables and config properly, instead of hardcoding an RPC URL in the script.
