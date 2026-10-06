# Script — Defect Management and Issue Logs

## Segment 1 (title)

SIT and UAT have surfaced real problems — the partial-payment matching failure, the foreign-currency wire scenario. This lesson covers how those get tracked, triaged, and closed systematically, instead of living as scattered messages nobody can find three weeks later.

## Segment 2 (steps)

A defect log entry captures a unique ID, a clear description, steps to reproduce so anyone can recreate it, the environment and module, which test script found it, a severity and priority rating, who it's assigned to, and its current status.

## Segment 3 (steps)

Severity describes technical impact, independent of timing: how badly does this break the system. Priority describes urgency relative to the project schedule: a low-severity issue can still be high priority if it's blocking other testing. The same proportional thinking shows up later in Oracle's own Service Request severities.

## Segment 4 (steps)

A defect moves through a consistent life cycle: New, Assigned, In Progress, Fixed, Retest, Closed. A triage meeting, usually daily during active testing, reviews new and unresolved defects as a group to assign severity, priority, and an owner, rather than handling each one ad hoc.

## Segment 5 (outro)

Brightfield's partial-payment defect enters the log as DEF-CM-04, rated High severity and Critical priority since it affects a routine transaction type right before UAT. Triage assigns it to the technical consultant, and it moves through Fixed, Retest, and Closed. Up next, lesson twenty: regression testing, because this discipline doesn't stop at go-live.
