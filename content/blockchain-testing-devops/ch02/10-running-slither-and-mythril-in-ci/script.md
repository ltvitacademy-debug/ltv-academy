# Script — Running Slither & Mythril in CI

## Segment 1 (title)

Slither analyzes Solidity source without executing it, pattern-matching against known vulnerability classes. It's fast enough to run on every single PR.

## Segment 2 (code: slither output)

Here's a textbook reentrancy finding — a state write happening after an external call instead of before it. That exact ordering bug was behind the original DAO hack, and Slither catches it automatically, every time, on every PR.

## Segment 3 (code: mythril output)

Mythril goes deeper — symbolic execution, exploring actual paths through the bytecode with unconstrained inputs. Slower, but it catches issues pure pattern matching misses. Every finding cites a standardized SWC ID.

## Segment 4 (code: wiring into CI)

crytic slither-action is the official GitHub Actions integration. fail-on sets the minimum severity that blocks a merge — high lets lower-severity findings through without gating the build on every informational note.

## Segment 5 (outro)

Both tools catch known patterns — neither understands your actual business logic. That's why a human-reviewed audit still matters before mainnet. Lesson 11 ties all of this together into one gate that actually blocks a merge.
