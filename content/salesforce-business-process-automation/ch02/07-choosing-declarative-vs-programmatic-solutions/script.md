# Script — Choosing Declarative vs. Programmatic Solutions

## Segment 1 (title)

"Clicks before code" is a default, not a law. Treat it as absolute and you'll either force genuinely complex logic into an unreadable tangle of Flow elements, or reach for Apex out of habit when a validation rule would've taken ten minutes. Here's the actual checklist.

## Segment 2 (steps: the first three questions)

Start simple. Can this be expressed as a formula? If it's just evaluating fields and returning true or false, a validation rule or formula field wins, almost always. Does a human need to make a judgment call? That's an approval process, not code, code can't ask someone to decide something. And can Flow express the logic without becoming unreadable? Flow handles a huge amount today, but forty decision elements with unclear branching is a maintenance liability even though it's technically declarative.

## Segment 3 (steps: when Apex actually earns its place)

Three questions tip the scale toward code. Does it need complex, multi-object logic that has to be provably correct, the kind Apex's required test coverage actually verifies? Does it need real bulk-processing performance across deeply related records? And does it need to call an external system in a way Flow's built-in actions genuinely can't handle?

## Segment 4 (code: the running example, decided)

Here's our discount approval, run through the checklist. The threshold check: a formula, a validation rule. The sign-off: a human judgment call, an approval process. The notification: an email alert. Nothing here needed Apex, and that's not an accident, it's what most real business processes actually look like.

## Segment 5 (steps: one more question, easy to forget)

There's a question past the technical ones: who maintains this after you leave? A declarative solution can be read and changed by the next admin with no deploy pipeline. Apex requires a developer. For a small team with no dedicated developer, that's a real operational cost, not just a technical one.

## Segment 6 (outro)

This decision isn't permanent, either. Flow absorbs more of what used to require code every few releases, so revisit it when a requirement changes, not just once at the start. Next: what order all of these tools actually run in when a record saves.
