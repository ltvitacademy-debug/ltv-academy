# Script — Adding Security & Logging

## Segment 1 (title)

A tool's input_schema guarantees amount_cents is an integer. It says nothing about whether that integer is correct -- whether it actually matches what the order was paid. The tool's description tells Claude not to exceed the paid total, but a description is guidance for the model, not a guarantee your code can rely on.

## Segment 2 (code: re-derive, don't trust)

The fix: before a pending approval is even created, re-fetch the authoritative value from your own system and check the model's claim against it. A real validation function pulls the order from your own database, not from Claude's claim, and rejects a non-positive or over-the-limit amount before a reviewer ever sees it.

## Segment 3 (code: log every decision)

An audit log exists so a later question -- why did this happen, who approved it, did the model ever try something it shouldn't have -- has a real answer. Log the full lifecycle: timestamp, tool name, input, risk tier, validation result, decision, reviewer, and outcome. Log the rejected and failed-validation cases too; they're often more useful than the successful ones.

## Segment 4 (steps: three layers)

Three layers complete the checkpoint. Schema validation checks shape. Independent re-verification checks truth, against your own data, not the model's claim. And an audit log records every outcome, not just the successful runs, so the system's behavior can actually be reviewed after the fact.

## Segment 5 (outro)

With validation and logging wrapped around the approval checkpoint, Lesson 17 ships the whole agent as a real, deployed service.
