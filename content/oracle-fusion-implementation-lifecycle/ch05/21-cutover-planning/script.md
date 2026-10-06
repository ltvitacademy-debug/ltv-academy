# Script — Cutover Planning

## Segment 1 (title)

UAT is signed off, data migration is validated. Chapter five is where everything the project has built finally becomes the business's real, live system. This lesson covers the plan that makes that transition survivable: the cutover plan.

## Segment 2 (steps)

A cutover plan is a minute-by-minute runbook covering every activity needed to move to live use. It includes a freeze of the legacy system, the final data extract and load, validation checkpoints confirming data ties to legacy totals, named go or no-go decision points, a rollback plan, and a communication plan.

## Segment 3 (steps)

The freeze is the moment the legacy system stops accepting new transactions related to what's cutting over. Without a clean freeze, final balances migrated into Oracle Fusion would already be stale the moment they load, since the legacy system kept moving after the extract was taken.

## Segment 4 (steps)

A cutover runbook is broken into checkpoints, each with a go or no-go decision: proceed, or pause and fix a problem first. These map directly onto the validation discipline from chapter three, now run under real time pressure instead of a relaxed mock cycle.

## Segment 5 (outro)

Brightfield's cutover plan freezes legacy entry Friday at five, loads final balances Saturday morning, and runs validation before a go or no-go decision ahead of Monday go-live. A rehearsal two weekends earlier revealed the final extract took nearly twice as long as estimated, time added back into the real runbook. Up next, lesson twenty-two: deployment and go-live itself.
