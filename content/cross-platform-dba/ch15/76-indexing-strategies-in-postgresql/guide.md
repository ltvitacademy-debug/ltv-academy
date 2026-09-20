# Indexing Strategies in PostgreSQL

SQL Server's indexing world is mostly two shapes: clustered and nonclustered B-trees, plus
a handful of specialty types like columnstore. PostgreSQL's default index is also a
B-tree — but its index *ecosystem* is genuinely richer, with purpose-built types for data
that a B-tree structurally can't search efficiently.

## What you'll learn

- Why B-tree is still the default and right choice most of the time
- What GIN indexes are for, and why full-text search and JSONB need them
- What GiST indexes are for, and why geometric and range types need them

## B-tree: the default, and usually the right call

```sql
CREATE INDEX idx_orders_customer ON orders (customer_id);
```

PostgreSQL creates a B-tree index by default when no type is specified. Exactly like a
SQL Server nonclustered index, it's built for equality and range comparisons (`=`, `<`,
`>`, `BETWEEN`, sorting, `ORDER BY`). One structural difference worth knowing: PostgreSQL
tables have no concept of a clustered index that physically orders the table's rows the way
SQL Server does — every PostgreSQL index, B-tree included, is a separate structure pointing
back at heap rows. (`CLUSTER` can physically reorder a table's rows to match an index once,
as a one-time operation, but it isn't maintained automatically the way a SQL Server
clustered index is.)

## GIN: indexing values that contain multiple values

A B-tree can't efficiently answer "does this JSONB column contain this key?" or "does this
text column contain this word?" — those questions are about *what's inside* a single
column value, not the value as a whole. A Generalized Inverted Index (GIN) is built exactly
for that: it indexes the individual elements inside a composite value, the same way a book's
index doesn't index page numbers, it indexes the words on those pages.

```sql
-- Full-text search
CREATE INDEX idx_articles_fts ON articles USING GIN (to_tsvector('english', body));

-- JSONB containment
CREATE INDEX idx_events_data ON events USING GIN (data jsonb_path_ops);
```

The first makes `body @@ to_tsquery('postgresql')`-style full-text search fast; the second
makes JSONB containment queries like `data @> '{"status": "failed"}'` fast. Neither query
shape is something a plain B-tree can serve well.

## GiST: indexing "does this overlap that"

A Generalized Search Tree (GiST) index supports a different kind of question: overlap,
containment, and "nearest" comparisons on geometric shapes, ranges, and similar types —
questions a strict ordering (what a B-tree relies on) doesn't naturally answer.

```sql
-- Range overlap: find bookings that overlap a given time range
CREATE INDEX idx_bookings_range ON bookings USING GiST (during);

SELECT * FROM bookings WHERE during && '[2026-09-20 10:00, 2026-09-20 12:00)'::tsrange;
```

This is genuinely something SQL Server's index model doesn't offer out of the box —
PostgreSQL's `tsrange`/`daterange`/`int4range` types plus GiST indexing give you native,
indexed "does this interval overlap that interval" queries, the kind of logic a SQL Server
DBA would otherwise hand-roll with extra columns and `WHERE` clause gymnastics.

## Key terms

| Term | Meaning |
|---|---|
| B-tree | PostgreSQL's default index type, for equality/range comparisons and sorting |
| GIN (Generalized Inverted Index) | Indexes the individual elements inside a value — used for full-text search and JSONB |
| GiST (Generalized Search Tree) | Indexes overlap/containment/nearest relationships — used for ranges and geometric types |
| CLUSTER | One-time physical reordering of a table to match an index; not automatically maintained |

## Check yourself

A table has a JSONB column storing event payloads, and queries frequently check whether
that JSONB contains a specific key/value pair. Which index type fits, and why would a
plain B-tree on that column not help?
