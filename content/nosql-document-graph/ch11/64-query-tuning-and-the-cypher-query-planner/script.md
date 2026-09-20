# Script — Query Tuning & the Cypher Query Planner

## Segment 1 (title)

A SQL Server DBA reaches for an execution plan the moment a query runs slow. Cypher has direct analogs — EXPLAIN and PROFILE — plus the one performance lever that matters most: indexes.

## Segment 2 (code: EXPLAIN vs PROFILE)

EXPLAIN returns the planner's intended plan without running the query — the equivalent of a SQL Server estimated plan. PROFILE actually executes the query and annotates the plan with real row counts, db hits, and time — the equivalent of an actual plan with STATISTICS IO turned on.

## Segment 3 (steps: scan vs index seek)

The operator that matters most is whether Neo4j found your starting node through a full label scan or an index lookup. NodeByLabelScan walks every node with that label — a table scan. NodeIndexSeek is a direct, sub-linear lookup once an index exists.

## Segment 4 (code: CREATE INDEX)

Creating an index on a property turns a NodeByLabelScan into a NodeIndexSeek for queries filtering on it. Same tradeoff as SQL Server: faster reads, but every write touching that property now has to maintain the index too.

## Segment 5 (outro)

That closes out Cypher. Next up: the Neo4j Graph Data Science library — a separate plugin providing 65-plus real graph algorithms, starting Chapter Twelve.
