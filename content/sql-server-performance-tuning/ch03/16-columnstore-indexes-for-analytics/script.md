# Script — Columnstore Indexes for Analytics

## Segment 1 (title)

Every index so far has been rowstore. This lesson introduces a completely different storage shape — the columnstore index — built for aggregating huge fact tables, not looking up individual rows.

## Segment 2 (code: row-major vs. column-major)

Rowstore stores each row's columns together — great for finding a handful of specific rows. Columnstore stores each column together instead, compressed independently across all rows — great for a query that scans millions of rows but only touches a few columns, exactly the shape of a typical analytical aggregate.

## Segment 3 (code: why it's fast)

Columnstore gets its speed from two things: compression, because same-typed values stored together compress far better than mixed rows, and batch mode execution, processing around 900 rows per batch instead of one at a time. Both of those advantages disappear for a single-row lookup by primary key — reconstructing one row means stitching together multiple compressed column segments.

## Segment 4 (code: the real syntax)

A clustered columnstore index becomes the table's primary storage — the whole table, column-major and compressed. A nonclustered columnstore index sits alongside an existing rowstore table, so OLTP writes keep hitting the rowstore while analytical queries get routed to the columnstore copy.

## Segment 5 (outro)

Columnstore is a completely different shape for a completely different job. Next up: the index tuning workflow — Lesson 1's measure-identify-change-verify loop, applied specifically to indexes.
