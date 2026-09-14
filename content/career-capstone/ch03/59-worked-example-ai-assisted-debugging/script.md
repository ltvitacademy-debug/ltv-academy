# Script — A Worked Example: AI-Assisted Pipeline Debugging

## Segment 1 (title)

A nightly pipeline fails at 2 a.m. with a KeyError, fifteen minutes before the morning dashboards are due. This walks through the whole chapter's throughline on one real-shaped failure.

## Segment 2 (code: draft with guardrails)

Before pasting anything in, the engineer strips the log of anything identifying — just the stack trace, surrounding lines, and the spec. The assistant drafts a plausible hypothesis: a new nullable column added without a default, and old code assuming it always existed.

## Segment 3 (code: verify against real data)

The engineer doesn't ship the hypothesis. They query the actual source table, confirm every row before yesterday's deploy has a null discount_pct, and that confirmation against real data is what turns the draft into an actual finding.

## Segment 4 (steps: fix and re-verify)

Copilot drafts the one-line fix instantly. The engineer runs it against the previously-failing rows and confirms the output matches the actual business rule, not just that the code runs without an error.

## Segment 5 (outro)

The AI sped up every draft; a human made every call about what was actually true. Next up: where AI assistance fits into the production practices from Course 3.
