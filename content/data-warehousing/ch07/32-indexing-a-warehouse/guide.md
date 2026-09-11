# Lesson 32 — Indexing a Warehouse

**Chapter 7 · Building the Warehouse · Lesson 32 of 39**

## What you'll learn

- Why rowstore indexing habits from OLTP tuning actively work against
  you on a fact table
- What a clustered columnstore index is, and why it's the default
  choice for fact tables in SQL Server data warehouses
- When a nonclustered columnstore index (on a still-rowstore table)
  makes more sense than converting the whole table
- How dimension tables are indexed differently from fact tables, and
  why

## Fact tables don't want a normal clustered index

If you learned indexing against an OLTP schema, your instinct is to
put a clustered rowstore index on a table's primary key and add
nonclustered indexes for common lookup predicates. That instinct is
wrong for a fact table. A fact table is scanned and aggregated across
millions or billions of rows — `SUM(SalesAmount) GROUP BY ProductKey,
DateKey` — not looked up by a single key value. A traditional
row-by-row B-tree index doesn't help that workload; it can actively
hurt it, because SQL Server still has to visit and decompress a full
row's worth of data for every column touched by the aggregate.

## Columnstore indexes: built for exactly this

A **columnstore index** stores data column-by-column instead of
row-by-row, and compresses each column heavily. For an aggregate query
that only touches a handful of the table's columns, the engine reads
just those columns' compressed segments — dramatically less I/O than a
rowstore scan, plus batch-mode execution that processes hundreds of
rows at a time instead of one. This is precisely the shape of fact
table queries, which is why **a clustered columnstore index is the
default, recommended choice for fact tables in a SQL Server
warehouse.**

```sql
-- Converts the entire Fact_Sales table's storage to columnstore —
-- this IS the table now, not an index alongside it.
CREATE CLUSTERED COLUMNSTORE INDEX CCI_Fact_Sales
    ON dbo.Fact_Sales;
```

A clustered columnstore index isn't "an index you add" the way a
rowstore index is — creating one converts the entire table's physical
storage to the columnstore format. There is no separate heap or B-tree
underneath it.

## Nonclustered columnstore: when you can't convert the whole table

Sometimes a fact table still needs some traditional rowstore access
patterns alongside analytics — for example, an operational-reporting
table that also needs fast single-row lookups by a specific key.
SQL Server lets you keep the table as rowstore and add a
**nonclustered columnstore index** covering just the analytical
columns instead:

```sql
CREATE NONCLUSTERED COLUMNSTORE INDEX NCCI_Fact_Sales_Analytics
    ON dbo.Fact_Sales (DateKey, ProductKey, CustomerKey, SalesAmount, Quantity);
```

The table keeps its normal rowstore clustered index for fast lookups,
while the nonclustered columnstore index gives analytical queries the
same columnar, batch-mode performance benefit on the columns it covers.

## Dimension tables: index the old-fashioned way

Dimension tables don't get this treatment — they're typically small
relative to fact tables (thousands to low millions of rows, not
billions) and are queried by lookups and joins, not aggregate scans.
A normal clustered rowstore index on the surrogate key, plus
nonclustered indexes on frequently-filtered attributes (like a natural
key used during ETL), is the right call:

```sql
CREATE NONCLUSTERED INDEX IX_Dim_Product_AlternateKey
    ON dbo.Dim_Product (ProductAlternateKey);
```

## Key terms

| Term | Meaning |
|---|---|
| Rowstore index | A traditional B-tree index storing data row-by-row — good for lookups, poor for large aggregate scans |
| Columnstore index | An index/storage format storing data column-by-column with heavy compression and batch-mode execution |
| Clustered columnstore index | Converts a table's entire physical storage to columnstore format — the default for fact tables |
| Nonclustered columnstore index | A columnstore index added alongside a table that remains rowstore, covering just the analytical columns |

## Lab

1. Create `Fact_Sales` as in Lesson 31, load a few thousand sample
   rows, then run `CREATE CLUSTERED COLUMNSTORE INDEX` on it.
2. Query `sys.indexes` for the table and confirm the `type_desc`
   column now reads `CLUSTERED COLUMNSTORE`.
3. Run an aggregate query (`SUM(SalesAmount) GROUP BY ProductKey`)
   with `SET STATISTICS IO ON` before and after adding the columnstore
   index, and compare the logical reads reported.

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: why
a clustered columnstore index is the default choice for a fact table
specifically, and one concrete situation where you'd choose a
nonclustered columnstore index instead of converting the whole table.
