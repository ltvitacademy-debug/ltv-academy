# Script — Business Process Case Study: Quote Approval

## Segment 1 (title)

Harborline Industrial Supply is a fictional company we're using to walk through a full approval-process design from start to finish -- using only the tools already covered in Chapters 1 and 2, no new features.

## Segment 2 (steps: three complaints, one root cause)

Three complaints landed on the same desk. Deals were stalling for days because approval meant forwarding an email and waiting. Two reps were discounting thirty percent or more with nobody signing off. And finance had no record of who approved what, or when. None of that is a Salesforce problem yet -- it's a business problem, and turning it into requirements is the actual job.

## Segment 3 (steps: the approval design)

Those three complaints map onto a two-tier design. Entry criteria catches any submitted quote with a discount over ten percent -- anything smaller skips the process entirely. Ten to twenty-five percent routes to the owner's manager. Anything deeper than that goes to the Sales Director specifically, not just "someone more senior." And the record locks the instant it enters the process.

## Segment 4 (code: the process as configured)

Written out, it's four pieces: the entry criteria, two approval steps tiered by severity, and two final actions -- one for approval, one for rejection, each unlocking the record and updating status.

## Segment 5 (code: why it holds together)

Locking isn't decoration. It stops a rep from quietly changing the discount while a manager is reviewing the original number, and unlocking only happens in those two final actions -- never while a decision is still pending.

## Segment 6 (outro)

The payoff: every approval or rejection now lives automatically in the quote's own approval history, no manual logging required. Next lesson applies this same translation method to a problem that's measured in minutes instead of dollars -- service level escalation.
