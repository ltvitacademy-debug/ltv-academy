# Script — Capstone: Build It

## Segment 1 (title)

Lesson twenty-nine set the requirements: six controls, one pipeline, order-service. This lesson walks through building it, stage by stage, in the order it actually runs.

## Segment 2 (steps)

Each control should run as early as it can. Secrets scanning, SAST, and dependency scanning run first, against source, because they're cheap and don't need a built artifact. Only then does order-service actually compile and its container get built. Image scanning checks what just got built. And the gate evaluates everything together before a deploy, using a scoped identity, is allowed to happen.

## Segment 3 (code)

Here's that order as a simplified pipeline stage list. It's intentionally generic pseudocode — the stage order and gate logic are what transfer to whatever real CI/CD tool you use for your own capstone.

## Segment 4 (steps)

A vague gate — fail if anything looks bad — isn't implementable. A precise one blocks on any secrets match, on a SAST or dependency finding at CVSS nine or higher, or on a critical image finding, unless it's explicitly excluded as a known, unfixable, low-risk case.

## Segment 5 (code)

And here's the deploy identity, defined explicitly. order-service needs exactly three things: read its own two secrets, write its own logs, deploy to its own environment. Nothing else is listed, so nothing else is granted — that's the actual fix for the broad, never-revisited identity from the kickoff scenario.

## Segment 6 (outro)

Six controls, in the right order, gated by one precise rule, deployed by one scoped identity. Next up: wrapping this up as a retrospective and a portfolio piece.
