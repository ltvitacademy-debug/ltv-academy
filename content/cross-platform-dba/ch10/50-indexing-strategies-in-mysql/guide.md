# Indexing Strategies in MySQL

Indexing trades write cost for read speed — that principle doesn't change on MySQL. What
genuinely changes, and matters more here than most DBAs expect coming from SQL Server, is
that InnoDB organizes every table's actual data storage around its primary key. That's not
a minor implementation detail; it shapes how you should think about primary keys and
composite indexes on MySQL specifically.

## What you'll learn

- What InnoDB's clustered primary key actually means for how data is stored
- Why this makes primary key choice a bigger deal on InnoDB than on many other engines
- How composite index column order affects which queries an index can actually help

## InnoDB's clustered primary key

In InnoDB, the table's data rows themselves are physically stored in primary key order,
inside the primary key's own B-tree structure — this is what "clustered" means here.
There's no separate heap of data rows sitting apart from the primary key index; the primary
key *is* the data, organized as a B-tree. Every secondary (non-primary) index in InnoDB
then stores the primary key value alongside its own indexed columns, and a lookup through a
secondary index does an extra step — using the found primary key value to look up the full
row in the clustered index. This is sometimes called an index lookup requiring a "double
lookup," and it's a direct architectural consequence of the clustering design.

This has real, practical implications:

- A primary key that increases sequentially (like an auto-increment integer) lets new rows
  append to the end of the clustered index efficiently. A primary key that's effectively
  random (like a UUID inserted in random order) forces new rows to be inserted in the
  *middle* of the existing B-tree structure repeatedly, causing page splits and
  fragmentation that a sequential key avoids.
- Every table needs a primary key for this reason — InnoDB will silently create an internal
  hidden clustered key if you don't define one, which is worse for you because you lose
  control over it and can't reference it.
- Secondary indexes are relatively more expensive to traverse than in a heap-organized
  engine, because of that extra clustered-index lookup step, which is one more reason to be
  deliberate about which secondary indexes actually earn their keep.

## Composite index column order

A composite (multi-column) index is only useful for query conditions that use its columns
as a **left-to-right prefix**. An index on `(last_name, first_name)` can efficiently serve a
query filtering on `last_name` alone, or on `last_name AND first_name` together, but it
cannot efficiently serve a query filtering on `first_name` alone — that query would need
`first_name` to be the leading column of some index to benefit.

```
-- Serves: WHERE last_name = 'Smith'
-- Serves: WHERE last_name = 'Smith' AND first_name = 'Jane'
-- Does NOT serve: WHERE first_name = 'Jane' (alone)
CREATE INDEX idx_name ON employees (last_name, first_name);
```

The practical rule: put the column with the most selective, most commonly-filtered-alone
condition first, then add columns in the order your actual query filters use them. Getting
this order wrong is one of the most common real-world causes of a `key: NULL` surprise in
`EXPLAIN` output on a table that "should" be indexed.

## Key terms

| Term | Meaning |
|---|---|
| Clustered index | InnoDB's storage of a table's actual data rows in primary key order, inside the primary key's B-tree |
| Secondary index | A non-primary index that stores the primary key value alongside its own columns, requiring an extra lookup |
| Composite index | A multi-column index, usable only for conditions matching its columns as a left-to-right prefix |
| Page split | Fragmentation caused when a new row must be inserted in the middle of a B-tree, common with random-order primary keys |

## Check yourself

A table uses a randomly-generated UUID as its primary key and is showing heavy
fragmentation and slow inserts under load. Using InnoDB's clustered primary key concept,
explain why the UUID choice is causing this specific symptom.
