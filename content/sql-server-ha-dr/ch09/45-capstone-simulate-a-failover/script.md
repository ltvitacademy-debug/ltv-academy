# Script — Capstone: Simulate a Failover

## Segment 1 (title)

AG_Bellhaven exists, but it hasn't proven anything yet. A DBA who's never watched a failover
happen knows it was configured to work — not that it actually works. Time for a real, planned
failover test.

## Segment 2 (code: the failover command)

Because SQLPRD01 and SQLPRD02 are both healthy and synchronized, this is a planned manual failover
with zero data loss — one command, run on the target replica SQLPRD02, no FORCE clause needed.
That clause is for a very different scenario, coming next lesson.

## Segment 3 (steps: what to verify)

A command returning without an error isn't a verified success. Check the replica states DMV to
confirm SQLPRD02 is now primary and everyone's synchronized, confirm the listener still routes
correctly with zero connection string changes, and confirm a real transaction actually completes.

## Segment 4 (outro)

Failback to SQLPRD01 is the identical command run the other direction — routine, not a second
disaster. Up next: a much harder test — simulating the total loss of the Columbus site itself.
