# Script — Invariant Testing

## Segment 1 (title)

Real contracts get broken by sequences, not single calls — deposit, deposit, withdraw, in random order from random actors. An invariant is a property that has to stay true no matter what that sequence looks like.

## Segment 2 (code: invariant syntax)

targetContract tells Forge which contract to fuzz calls against. Forge generates a random sequence of calls and checks your invariant function after every single call in that sequence, not just once at the end.

## Segment 3 (code: handler pattern)

Fuzzing a contract's raw functions directly wastes most of the run on unconstrained calls. A handler wraps the real functions, constrains inputs the way bound did, and tracks ghost variables — state that doesn't exist on the real contract, kept purely to check the invariant against.

## Segment 4 (code: running it)

targetContract then points at the handler, not the vault directly, so Forge only calls the constrained entry points. When an invariant fails, Forge prints the exact call sequence that broke it.

## Segment 5 (outro)

Invariant testing fuzzes sequences of calls against your contract's current state. Lesson 4 adds a different dimension — testing against real mainnet state, not a fresh deployment.
