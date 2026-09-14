# Script — Project 2: Cutover Strategy

## Segment 1 (title)

The warehouse is built — now comes the part that actually decides whether the migration succeeds: how the organization stops depending on the old sources and starts depending on this one. There are two ways to do that, and a multi-source migration almost always favors the slower, safer one.

## Segment 2 (steps: big-bang vs. phased)

Big-bang cutover repoints everything at once, on one date. It's fast, but it has no partial-failure mode — if there's a bug nobody caught, everything is wrong at once. Phased, parallel-run cutover runs old and new side by side, and moves consumers over one report at a time, as each is validated. Lower blast radius, and every report that moves proves the migration is working before the next one moves.

## Segment 3 (code: reconciliation query)

A parallel run only earns its cost if the two systems are actually being compared while they run — not just left running and assumed correct. A reconciliation query asks the same business question of both warehouses, daily, and flags any variance. Zero rows for a report, across the full parallel-run window, is the actual bar for calling that report validated.

## Segment 4 (steps: rollback plan and the go/no-go gate)

A rollback plan has to answer three questions before cutover starts: what's the trigger, what's the mechanism, and how long does the old source stay alive. And cutover for any one report is "go" only when reconciliation has shown zero unexplained variance for the full agreed window — not when it feels ready.

## Segment 5 (outro)

A phased cutover, validated by a query that runs the whole way through, with a rollback plan agreed before anyone needs it. Next up: closing out Project 2 with an honest retrospective.
