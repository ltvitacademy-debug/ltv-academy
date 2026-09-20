# Script — Performance Tuning in Neo4j

## Segment 1 (title)

Every SQL Server DBA in this path has tuned a buffer pool and hunted down a missing index causing a table scan. Neo4j performance tuning is the same discipline wearing different clothes — page cache instead of buffer pool, PROFILE instead of an execution plan.

## Segment 2 (code: page cache sizing)

The page cache caches on-disk store pages in memory, the direct equivalent of SQL Server's buffer pool. Undersizing it relative to the graph's actual size on disk is one of the single most common causes of a Neo4j instance that should be fast but isn't.

## Segment 3 (code: PROFILE)

PROFILE runs a Cypher query and returns the actual execution plan with real row counts and database hits — the equivalent of SQL Server's actual execution plan. A NodeIndexSeek means the index is doing its job.

## Segment 4 (code: the real anti-pattern)

Seeing NodeByLabelScan instead, on a graph with any real number of nodes, is the Neo4j equivalent of a table scan where you expected an index seek. A missing label means Neo4j can't narrow the search at all; adding a label and an index turns a scan into a seek.

## Segment 5 (outro)

PROFILE confirms a query is using the right indexes; page cache sizing determines whether that data actually comes from memory or disk under load. Next up: Neo4j Aura, managed Neo4j in the cloud.
