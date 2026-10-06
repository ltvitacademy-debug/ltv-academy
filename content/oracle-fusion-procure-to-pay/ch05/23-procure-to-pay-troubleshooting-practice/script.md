# Script — Procure-to-Pay Troubleshooting Practice

## Segment 1 (title)

LTV's bearing transaction was clean from end to end. Real support tickets rarely are. Let's practice the troubleshooting instinct this whole course has been building: starting from a symptom and tracing it back to a cause.

## Segment 2 (steps)

Every problem starts as a symptom from someone who only sees their own stage. The method is always the same: identify the document being asked about, find its current status, and walk the chain of document numbers until you find the checkpoint that hasn't resolved cleanly.

## Segment 3 (steps)

Scenario one: a requisition sitting for three days. If it's still pending approval, it's almost certainly in someone's worklist, not lost - find the approver, don't touch the requisition. If it's approved with no purchase order yet, check the buyer's processing queue instead.

## Segment 4 (steps)

Scenario two: an invoice that won't pay. Check for a matching hold first - does the invoiced quantity or price actually differ from what was ordered or received? No matching hold? Check for other validation holds, like a tax issue or incomplete distribution.

## Segment 5 (outro)

Scenario three: a lingering accrual at close. Find the specific receipt, check whether an invoice exists anywhere, and if it does but hasn't been accounted, it's probably stuck on a hold - which loops right back to scenario two. Up next, chapter six: replaying the full cycle, then working through exception scenarios where things genuinely go wrong.
