# Script — Choosing the Right HA Solution

## Segment 1 (title)

The last lesson compared four technologies honestly. This lesson turns that comparison into an actual decision framework, because "it depends" is true but not useful until it's broken into the specific things it depends on.

## Segment 2 (steps: the four real inputs)

RPO is how much data loss is tolerable, in time. RTO is how long the system can stay down. Budget covers duplicate hardware, storage, and ongoing operational testing. And SQL Server edition changes which technologies are even on the table — Standard Edition's Basic Availability Groups look very different from Enterprise's full AGs.

## Segment 3 (code: what edition actually changes)

Standard Edition: Basic AG, one primary, one secondary, one database, no readable secondary. Enterprise Edition: full AG, up to 8 replicas, readable secondaries, multiple databases per AG. FCI: two nodes on Standard, more nodes on Enterprise.

## Segment 4 (outro)

Get real RPO and RTO numbers, check the licensed edition, then match against the honest comparison from last lesson — in that order. Next up: going deep on Availability Group architecture itself.
