# Script — Capstone Kickoff

## Segment 1 (title)

The capstone starts now: a small, real, typed command-line tool that reads live blockchain data, built entirely from what the last eleven lessons already taught.

## Segment 2 (steps: what chain-reader does)

Chain-reader does four things. It loads and validates its config from a dot-env file. It connects to a real RPC endpoint and reads the current block number and an address's balance. It prints the result cleanly and exits with a non-zero code on failure. And it handles a bad address or a failed network call as a typed result, instead of crashing with an unhandled exception.

## Segment 3 (steps: why this scope)

A capstone that tried to be a full decentralized app would need Solidity, a frontend, and deployment tooling this course never taught — that's deliberately out of scope, and exactly what later courses in this path cover instead. This capstone stays inside exactly what chapters five and six taught, proven end to end — a small, real, working tool is worth more in a portfolio right now than an ambitious half-built one.

## Segment 4 (code: the file structure)

package.json, tsconfig.json, a dot-env-example, and three files under src: config-dot-ts for validated environment config, chain-dot-ts for the typed provider and result wrapper, and index-dot-ts as the actual entry point with argument handling.

## Segment 5 (outro)

Next lesson: actually writing chain-reader, file by file, start to finish.
