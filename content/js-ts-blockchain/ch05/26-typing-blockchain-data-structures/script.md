# Script — Typing Blockchain Data Structures

## Segment 1 (title)

Addresses, hashes, and wei amounts all look like plain strings and numbers — until a mix-up costs you a debugging session. Here's how to type them properly.

## Segment 2 (code: primitive aliases)

Give each kind of hex string its own name with a template literal type: Address, Hash, HexData, all defined as backtick-zero-x-dollar-string-backtick. TypeScript now knows the value has to start with "0x" — catching typos at compile time instead of three hours into a debugging session.

## Segment 3 (code: wei needs bigint)

A JavaScript number loses precision above two to the fifty-third power — and one ETH is already past that line, at one followed by eighteen zeros wei. Every wei amount, every gas value, every token amount in base units needs to be typed as bigint, not number. Write the literal with a trailing lowercase n, like two-point-five-ETH-in-wei-n, to get a real bigint instead of a number that silently rounds.

## Segment 4 (code: Transaction and Block interfaces)

Turn a loose JSON blob from an RPC call into something your editor can check, with real interfaces. A Transaction has a hash, a from and to address — where "to" can be null, because a contract-creation transaction has no destination — a value in wei, and a blockNumber that's null while the transaction is still pending. Modeling those nulls forces every piece of code that reads these fields to handle the pending or contract-creation case instead of crashing on it later.

## Segment 5 (steps: branded types)

A template literal alias still lets any "0x" string pass as an Address — including a transaction hash. A branded type fixes that: tag the string type with a fake, compile-time-only brand, write one toAddress helper that's the only place allowed to cast, and now passing a transaction hash where an Address belongs is a compile error, not a production incident. The brand is erased when TypeScript compiles to JavaScript — it costs nothing at runtime.

## Segment 6 (outro)

Next lesson: how ethers.js and viem actually type these same concepts in a real library.
