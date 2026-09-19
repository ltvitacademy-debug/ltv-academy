# Script — Finding Missing, Duplicate & Unused Indexes

## Segment 1 (title)

You learned to create indexes correctly in T-SQL Development. The more common real job is the opposite direction: auditing indexes that already exist on a database you didn't design -- what's missing, what's duplicated, what's dead weight.

## Segment 2 (code: missing index details)

sys.dm_db_missing_index_details tracks every time the optimizer would have benefited from an index that doesn't exist. Equality columns tell you what should lead the new index; included columns tell you what to add to make it covering. Treat the impact estimate as a hint, and verify with a real plan.

## Segment 3 (code: duplicate indexes)

Two indexes sharing the same leading column are almost always redundant, even with different included columns. Group your nonclustered indexes by table and leading column -- more than one group per column is a duplicate candidate worth merging or dropping.

## Segment 4 (code: unused indexes)

sys.dm_db_index_usage_stats tracks seeks, scans, lookups, and updates per index. Zero seeks, zero scans, zero lookups, but real write activity, means that index is pure overhead. One catch -- this resets on every restart, so check over a real time window, not right after a failover.

## Segment 5 (outro)

Add what's missing, remove what's duplicated, drop what's genuinely unused -- always cross-checked against a real plan before you touch production. Next up: Query Store, SQL Server's own flight data recorder for every plan a query has ever used.
