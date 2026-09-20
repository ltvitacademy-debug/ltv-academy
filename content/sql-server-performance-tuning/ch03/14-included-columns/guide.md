# Included Columns

Lesson 13 showed that a covering index avoids the Key Lookup — but it glossed over *how*
you widen an index to cover more columns. There are two ways: add a column to the key, or
add it as an **included column** with `INCLUDE`. They look similar in the `CREATE INDEX`
statement but behave very differently, and picking the wrong one costs you real
performance.

## What you'll learn

- The real syntax and behavior of `INCLUDE (...)`
- Why included columns are cheaper to add than key columns
- The concrete rule for choosing INCLUDE vs. adding to the key

## The syntax: a second list, a different purpose

```sql
CREATE INDEX IX_Orders_CustomerId_Covering
    ON dbo.Orders (CustomerId, OrderDate)
    INCLUDE (TotalDue, ShipCity);
```

`CustomerId` and `OrderDate` are **key columns** — they determine the index's sort order,
and the leftmost-prefix rule from Lesson 12 applies to them. `TotalDue` and `ShipCity` are
**included columns** — they're stored at the leaf level of the index for fast retrieval,
but they play no role in sorting and can't be used to seek. A query filtering on
`ShipCity` alone gets no seek benefit from this index at all; it's along for the ride
purely so a query that already seeks on `CustomerId`/`OrderDate` can also read `ShipCity`
without a Key Lookup.

## Why INCLUDE is usually the cheaper way to widen an index

Key columns are stored at every level of the index's B-tree (root, intermediate, and leaf
pages), because the tree structure itself depends on sorting by them. Included columns are
stored **only at the leaf level** — the bottom layer where the actual data lookups happen.
That difference means:

- Included columns add less overhead to the index's non-leaf pages, keeping the tree
  shallower and searches faster.
- Included columns can be data types that aren't allowed as index key columns at all —
  types like `nvarchar(max)`, `varchar(max)`, or `xml` can be included but not keyed.
- Adding a column to the key when it doesn't need to be sorted on is pure waste: it makes
  every level of the tree wider for no seek benefit.

## The rule: does this column need to be sorted or filtered on?

Ask one question about each candidate column: **does a query need to seek, range-scan, or
sort using this column?** If yes, it has to be a key column, in the correct leftmost-prefix
position. If no — the query only ever needs to *read* its value once a row is already
found — it belongs in `INCLUDE`.

```sql
-- Query: seek on CustomerId, filter range on OrderDate, just READ TotalDue
SELECT OrderId, TotalDue
FROM dbo.Orders
WHERE CustomerId = 4210 AND OrderDate >= '2026-01-01';

CREATE INDEX IX_Orders_CustomerId_OrderDate_Covering
    ON dbo.Orders (CustomerId, OrderDate)  -- seeked / range-scanned
    INCLUDE (TotalDue);                     -- just read back
```

Putting `TotalDue` in the key here would add nothing — no query seeks or sorts on it — while
making the tree wider at every level. `INCLUDE` gets the same covering benefit at a lower
structural cost.

## Key terms

| Term | Meaning |
|---|---|
| Key column | An index column that determines sort order; usable for seeks, range scans, and leftmost-prefix matching |
| Included column | An index column stored only at the leaf level, for fast retrieval — not usable for seeking or sorting |
| INCLUDE | The CREATE INDEX clause that adds included columns to a nonclustered index |
| B-tree leaf level | The bottom layer of an index's tree structure, where included columns physically live |

## Check yourself

A colleague adds a column to an index's key "just to be safe" even though no query filters
or sorts on it. What's the concrete downside of that choice, and what should they have done
instead?
