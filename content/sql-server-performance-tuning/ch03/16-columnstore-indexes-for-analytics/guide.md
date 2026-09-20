# Columnstore Indexes for Analytics

Every index in this chapter so far has been a **rowstore** B-tree: rows stored together,
whether clustered, nonclustered, covering, included, or filtered. This lesson introduces a
fundamentally different storage shape — the **columnstore index** — built for a completely
different workload: aggregating and scanning huge fact tables, not looking up individual
rows.

## What you'll learn

- How columnstore storage differs structurally from every rowstore index in this chapter
- Why columnstore suits analytical aggregate queries, not OLTP point lookups
- The real syntax for clustered and nonclustered columnstore indexes

## Column-major storage, not row-major storage

A rowstore index — clustered or nonclustered — stores each row's columns together,
contiguously. That's ideal when a query needs a handful of specific rows and most or all
of their columns. A **columnstore index** stores each *column* together instead,
compressed independently across all rows. That's ideal for the opposite access pattern: a
query that touches every row (or millions of them) but only a few columns — exactly the
shape of a typical analytical aggregate.

```sql
SELECT ProductCategory, SUM(SalesAmount), AVG(Quantity)
FROM dbo.FactSales
GROUP BY ProductCategory;
```

Against a huge fact table, a rowstore scan has to read every column of every row off disk
even though this query only touches three. A columnstore index reads only the
`ProductCategory`, `SalesAmount`, and `Quantity` columns — and because each column is
stored together, values of the same type compress far better than a mixed row ever could.

## Why analytics, not OLTP point lookups

Columnstore indexes get their speed from two related mechanisms:

- **Compression** — storing a column's worth of same-typed values together allows far
  higher compression ratios than row-major storage, so far less data moves off disk per
  query.
- **Batch mode execution** — SQL Server processes columnstore data in batches of roughly
  900 rows at a time rather than one row at a time, which drastically cuts CPU overhead for
  aggregates, joins, and grouping over huge row counts.

Both of those advantages evaporate for a query that wants one specific row by its primary
key. Reconstructing a single row means pulling from multiple separately-compressed column
segments and stitching them back together — much more expensive than a rowstore seek that
finds the whole row in one place. Columnstore is the right tool for a data warehouse fact
table scanned by reporting queries; it is the wrong tool for an OLTP table hit by thousands
of single-row lookups per second.

## The real syntax: clustered and nonclustered

```sql
-- Clustered columnstore: replaces the table's storage entirely,
-- typically used for large fact tables in a warehouse
CREATE CLUSTERED COLUMNSTORE INDEX CCI_FactSales
    ON dbo.FactSales;

-- Nonclustered columnstore: an additional analytical copy
-- alongside a normal rowstore table, for mixed workloads
CREATE NONCLUSTERED COLUMNSTORE INDEX NCCI_FactSales_Analytics
    ON dbo.FactSales (ProductCategory, SalesAmount, Quantity, OrderDateKey);
```

A **clustered columnstore index** becomes the table's primary storage — every column,
compressed, column-major. A **nonclustered columnstore index** sits alongside an existing
rowstore table, letting OLTP writes continue hitting the rowstore normally while
analytical queries get routed to the columnstore copy — the pattern behind SQL Server's
"operational analytics" story for tables that need both fast point lookups and fast
aggregate reporting.

## Key terms

| Term | Meaning |
|---|---|
| Rowstore | Traditional storage where each row's columns are stored together (every index earlier in this chapter) |
| Columnstore | Storage where each column is stored together, compressed independently, across all rows |
| Batch mode execution | Processing rows in batches of roughly 900 at a time rather than one at a time, cutting CPU overhead |
| Clustered columnstore | A columnstore index that is the table's primary storage |
| Nonclustered columnstore | An additional analytical columnstore copy alongside a rowstore table |

## Check yourself

A ten-billion-row fact table is scanned nightly by reporting queries that aggregate sales
by category and region, and is never queried by individual row. Would you choose a
clustered columnstore index or a traditional rowstore clustered index, and why?
