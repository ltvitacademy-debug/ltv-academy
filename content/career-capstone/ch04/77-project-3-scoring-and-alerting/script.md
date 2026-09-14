# Script — Project 3: Real-Time Scoring and Alerting

## Segment 1 (title)

Each feature record feeds a scoring rule. A capstone doesn't need a trained model to prove the point — a threshold rule is enough. What matters is that scoring consumes exactly one feature record and produces exactly one decision, and that decision has to become a real alert without getting duplicated.

## Segment 2 (code: the threshold rule)

A risk score combines the rolling transaction count, total amount, and distance since the last transaction into one number, and flags for review above a threshold. Swapping this rule for a trained model later changes nothing about the pipeline around it.

## Segment 3 (steps: wiring the alert with Activator)

Activator turns a streaming condition into a real action — an alert, a webhook — without hand-rolling the plumbing. Here the condition is "flagged for review," and the action is notifying a fraud-review queue, firing once per qualifying event.

## Segment 4 (code: the idempotent alert write)

At-least-once delivery means the same event can arrive twice after a transient failure, and without a safeguard, the same transaction triggers two alerts. The fix is a MERGE keyed on transaction ID — if the same transaction arrives again, the second merge matches the existing row and does nothing. One alert, no matter how many times the event is redelivered.

## Segment 5 (outro)

Scoring and alerting are wired, and idempotent by design — exactly why Chapter 1 flagged that requirement before any scoring logic existed. Next up: closing out Project 3, and the whole project arc, with a retrospective.
