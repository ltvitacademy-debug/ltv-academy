# Script — Filtered Indexes

## Segment 1 (title)

Every index so far has indexed the whole table. But most tables have a small slice of rows that get queried constantly and a much bigger slice that almost never does. A filtered index lets you index just the slice that matters.

## Segment 2 (code: WHERE on the index)

The syntax adds a WHERE clause to CREATE INDEX itself. If 95% of an orders table is archived and every dashboard query only cares about open orders, this index stores only the open rows — smaller, cheaper to maintain, and more likely to fit entirely in the buffer pool.

## Segment 3 (code: the classic case)

The classic use case is a column where most rows hold one uninteresting value — like NULL — and a small minority hold the value you actually query for. Indexing only the non-NULL cancellation reasons skips millions of rows that would never help any query anyway.

## Segment 4 (steps: provable subset)

The optimizer can only use a filtered index when it can prove, from the query text, that the query's WHERE clause is a subset of the index's filter. A literal match works; no filter at all doesn't. And watch out for parameterized queries — a stored procedure passing @Status as a parameter can sometimes defeat that proof at compile time.

## Segment 5 (outro)

Filtered indexes trim a normal B-tree index down to the rows that matter. Next up: columnstore indexes for analytics — a completely different index shape built for aggregating huge tables.
