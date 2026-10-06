# Script — File System Basics

## Segment 1 (title)

Reading and writing real files from Node — and why that's actually useful for a script that talks to the blockchain.

## Segment 2 (code: fs/promises)

fs/promises pairs naturally with async and await, the same pattern every provider.getBalance call in this course already uses. writeFile takes a path and a string; readFile with a "utf-8" argument returns a plain string back, instead of a raw buffer of bytes.

## Segment 3 (steps: why not sync or callbacks)

Node's fs module has three styles. The synchronous API genuinely blocks the entire event loop until the read finishes — fine in a one-off CLI script, actively harmful inside a server, where it would stall every other request. The callback style still works but predates async and await and nests awkwardly. fs/promises is the current, recommended default for anything new.

## Segment 4 (code: path.join)

Building a file path by just concatenating strings breaks on Windows, where the separator is a backslash, not a forward slash. path.join picks the correct separator for whatever operating system the script actually runs on — essential the moment a script runs in CI on Linux and on a teammate's Windows machine too.

## Segment 5 (code: caching the last-checked block)

Re-querying the same RPC endpoint for data that barely changes wastes rate-limited calls. A tiny cache file fixes it: check if the cache file exists, read and parse it if so, and write the current block number back after each check.

## Segment 6 (outro)

Next lesson: putting almost everything from this chapter together into a real, small Express server.
