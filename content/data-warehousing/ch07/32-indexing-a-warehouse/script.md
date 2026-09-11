# Script — Indexing a Warehouse

## Segment 1 (title)

If you're used to indexing OLTP tables, your instinct on a fact table is wrong. This lesson is about the one index that actually fits a fact table's real workload.

## Segment 2 (code: clustered columnstore)

A fact table gets scanned and aggregated across millions of rows — sum by product, group by date — not looked up one row at a time. A traditional B-tree index doesn't help that; it can hurt it. A columnstore index stores data column by column, heavily compressed, and reads only the columns your aggregate actually touches. A clustered columnstore index is the default choice for a fact table — and it doesn't sit alongside the table, it becomes the table's storage.

## Segment 3 (code: nonclustered columnstore)

Sometimes a fact table still needs fast single-row lookups too. In that case, keep it rowstore and add a nonclustered columnstore index covering just the analytical columns — you get columnar, batch-mode performance on those columns without giving up row-by-row access.

## Segment 4 (outro)

Dimension tables stay simple — a normal clustered index on the surrogate key is still correct there. Next lesson: what happens when even a columnstore fact table gets too big for one physical structure — partitioning.
