# Lesson 6 — Loading and Validating Row Counts

**Chapter 2 · Building the T-SQL Warehouse Layer · Lesson 6 of 26**

## What you'll learn

- The real `INSERT INTO ... SELECT` statement that loads
  `dw.FactProductSales` by resolving every surrogate key through its
  dimension's `AlternateKey` column
- How to add the foreign-key constraints that Lesson 4 deliberately
  deferred, now that every dimension exists and is populated
- The real `SELECT COUNT(*)` parity check that proves the load didn't
  silently drop or duplicate rows
- Why an `INNER JOIN`-based load is itself a validation risk worth
  checking for

## Loading the fact table

Every dimension now exists and is populated, so the fact table's load
can resolve each source ID into its matching surrogate key by joining
on each dimension's `AlternateKey` column:

```sql
INSERT INTO dw.FactProductSales
    (ProductKey, OrderDateKey, TerritoryKey, CustomerKey,
     SalesOrderID, SalesOrderDetailID, OrderQty, LineTotal)
SELECT
    dp.ProductKey,
    dd.DateKey,
    dt.TerritoryKey,
    dc.CustomerKey,
    sod.SalesOrderID,
    sod.SalesOrderDetailID,
    sod.OrderQty,
    sod.LineTotal
FROM Sales.SalesOrderDetail sod
JOIN Sales.SalesOrderHeader soh
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN dw.DimProduct dp
    ON sod.ProductID = dp.ProductAlternateKey
JOIN dw.DimDate dd
    ON CAST(FORMAT(soh.OrderDate, 'yyyyMMdd') AS INT) = dd.DateKey
JOIN dw.DimTerritory dt
    ON soh.TerritoryID = dt.TerritoryAlternateKey
JOIN dw.DimCustomer dc
    ON soh.CustomerID = dc.CustomerAlternateKey;
```

Every join here is on an `AlternateKey` column, not a surrogate key —
that's the whole reason the alternate key exists. The load is
translating "real-world IDs from the OLTP system" into "warehouse
surrogate keys," one join at a time.

## Adding the deferred foreign keys

Now that the fact table has rows, and every dimension it points at is
built and populated, the constraints Lesson 4 deferred finally get
added:

```sql
ALTER TABLE dw.FactProductSales
    ADD CONSTRAINT FK_FactProductSales_Product
        FOREIGN KEY (ProductKey) REFERENCES dw.DimProduct(ProductKey),
    CONSTRAINT FK_FactProductSales_Date
        FOREIGN KEY (OrderDateKey) REFERENCES dw.DimDate(DateKey),
    CONSTRAINT FK_FactProductSales_Territory
        FOREIGN KEY (TerritoryKey) REFERENCES dw.DimTerritory(TerritoryKey),
    CONSTRAINT FK_FactProductSales_Customer
        FOREIGN KEY (CustomerKey) REFERENCES dw.DimCustomer(CustomerKey);
```

If any row failed to resolve correctly during the load, this statement
is where that would surface — SQL Server refuses to add a constraint
that existing data would violate.

## The row-count parity check

The load above is an `INNER JOIN` chain, which means it's only as
complete as every join it depends on. The real validation question is
simple: did every order line make it into the warehouse, or did a join
silently drop some?

```sql
SELECT COUNT(*) AS SourceRows FROM Sales.SalesOrderDetail;

SELECT COUNT(*) AS WarehouseRows FROM dw.FactProductSales;
```

These two numbers have to match exactly. If they don't, the gap is
real information: it means some row in `Sales.SalesOrderDetail` failed
to find a match in one of the four joins — most likely a
`TerritoryID` or `CustomerID` that didn't resolve to a dimension row,
since `ProductID` and `OrderDate` were already proven complete back in
Lesson 5's lab.

## Why an INNER JOIN load is a real validation risk

Unlike `dw.DimProduct`'s load in Lesson 5, which deliberately used
`LEFT JOIN` to keep every product even without a category, this fact
load uses plain `INNER JOIN` on purpose — every order line is expected
to have a real product, date, territory, and customer. But that
expectation is exactly what this row-count check exists to verify,
rather than simply assume. A silent `INNER JOIN` drop is one of the
most common real-world ways a warehouse quietly under-reports, and
it's the row-count check — not a feeling that the load "probably
worked" — that catches it.

## Key terms

| Term | Meaning |
|---|---|
| Row-count parity check | Comparing `COUNT(*)` between a source table and its warehouse equivalent to confirm no rows were silently dropped or duplicated |
| Deferred constraint | A foreign key added after the data is loaded, once its target dimension is known to exist and be complete |
| Silent join drop | Rows missing from a result because an `INNER JOIN` found no match, with no error raised to indicate it happened |

## Lab

1. Run the `INSERT INTO dw.FactProductSales` statement above against
   your scratch database, then the `ALTER TABLE ... ADD CONSTRAINT`
   statement.
2. Run both `COUNT(*)` statements above and confirm they match. If
   they don't, add `LEFT JOIN dw.DimTerritory dt ... ` temporarily and
   check `WHERE dt.TerritoryKey IS NULL` to find the exact rows that
   failed to resolve.
3. Write, in one sentence, why this fact table's load uses `INNER
   JOIN` while `dw.DimProduct`'s load in Lesson 5 used `LEFT JOIN`.

## Check yourself

You're ready for Lesson 7 when you can run the row-count parity check
from memory, explain what a mismatch between the two counts would
actually mean, and explain why the foreign-key constraints couldn't be
added until this lesson.
