# Script — Conflict Resolution in Multi-Region Writes

## Segment 1 (title)

Multi-region writes buy low write latency worldwide, but what happens when two regions accept conflicting writes to the same item before either replicates? Cosmos DB doesn't leave that undefined — every multi-region-write container has an explicit conflict resolution policy.

## Segment 2 (code: last-writer-wins, the default)

The default policy is Last-Writer-Wins — Cosmos DB keeps the version with the higher value on a designated property, by default the system timestamp, but you can point it at your own version counter instead for a more reliable tiebreaker than wall-clock time.

## Segment 3 (code: custom conflict resolution)

LWW is fine when discarding the losing write is acceptable — a page view counter. It's the wrong choice for a shopping cart or a ledger entry. Custom conflict resolution registers a stored procedure that receives all conflicting versions and merges them instead of blindly picking one.

## Segment 4 (outro)

A third mode, manual, writes conflicts to a conflicts feed the application resolves on its own schedule instead of automatically. Next up: choosing between autoscale and manual provisioned throughput.
