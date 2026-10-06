# Script — Automated Linting & Static Analysis

## Segment 1 (title)

A linter checks style and convention — how your code is written. A static analyzer reasons about what your code actually does, flagging patterns associated with real vulnerabilities. This lesson covers the first; the next covers the second.

## Segment 2 (code: forge fmt and solhint)

forge fmt check was already in Lesson 8's workflow. Solhint goes further — the standard Solidity linter, with security rules like flagging timestamp reliance, and style rules like explicit visibility and naming conventions.

## Segment 3 (code: pipeline ordering)

A multi-job pipeline should order cheapest and fastest first. Linting takes seconds. needs colon lint means the expensive test job doesn't even start until the cheap lint job passes — fail fast, save CI minutes.

## Segment 4 (why this sets up lesson 10)

Solhint's security-category rules are a cheap preview of what heavier tools check in depth — they just don't go nearly as deep. They catch the obvious; they don't trace actual control and data flow.

## Segment 5 (outro)

Linting is the fast, cheap first gate. Lesson 10 adds the gate that actually reasons about vulnerability patterns — Slither and Mythril, running in the same pipeline.
