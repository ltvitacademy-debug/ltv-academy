# Script — Query Profile & Query History

## Segment 1 (title)

Every query in Snowsight has a Query Profile — a visual execution plan of the operator nodes Snowflake actually ran, wired together by arrows showing how many rows flowed from one to the next.

## Segment 2 (screenshot: query execution plan)

This is a real Query Profile: a TableScan node feeding 216 rows into a Result node. Every node shows the percentage of total query time it consumed — the single most useful number on the screen, because it tells you exactly which step is worth investigating.

## Segment 3 (steps: how to read a profile)

Reading a profile means finding the node with the highest time percentage, then asking why: check bytes scanned versus bytes returned for a pruning problem, look for an exploding join, and check whether a node spilled to disk from undersized memory.

## Segment 4 (code: Query History in SQL)

Query Profile shows one query. Query History — the Snowsight page, or QUERY_HISTORY in SQL — shows every query that ran, so you can find the slow ones in the first place, ordered by total elapsed time.

## Segment 5 (outro)

Next lesson: micro-partitions and partition pruning — the mechanism behind that bytes-scanned number, and why Snowflake never needs a manually defined partition key.
