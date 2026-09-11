# Lesson 14 — Degenerate Dimensions

**Chapter 3 · Dimension Tables · Lesson 14 of 39**

## What you'll learn

- What a **degenerate dimension** is, and the classic example every
  warehouse has
- Why it deliberately does **not** get its own dimension table
- How to still query it as if it were a dimension, using a view
- How to recognize a degenerate dimension candidate in a fact table
  you're designing

## An identifier with nowhere else to live

A **degenerate dimension** happens when an identifier sits at exactly the
same grain as the fact row it describes, but has no descriptive
attributes of its own to justify a separate table. The textbook example
is a sales order number: every line of a sales order shares the same
`SalesOrderNumber`, and that number doesn't come with a category, a
color, or any other attribute you'd store alongside it. It's just an
identifier — so instead of building a `DimSalesOrder` table with nothing
in it but that one column, you leave `SalesOrderNumber` sitting directly
on the fact table.

![Diagram showing a Sales Order degenerate dimension implemented as a view that selects the distinct SalesOrderNumber column from a sales fact table, rather than as a separate physical dimension table.](/courses/data-warehousing/ch03/14-degenerate-dimensions/degenerate-dimension.svg)
*The Sales Order "dimension" is really just the SalesOrderNumber column, already on the fact table — no separate table needed.*
Source: [Microsoft Fabric — Modeling Dimension Tables](https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling-dimension-tables#degenerate-dimensions)

## Why not build a real dimension table anyway?

Building a `DimSalesOrder` table with just a surrogate key and a
`SalesOrderNumber` column wouldn't be *wrong*, exactly — it would just be
pure overhead. A dimension table earns its place by giving you
descriptive attributes to filter and group by. An order number, on its
own, gives you nothing to group by that the fact table doesn't already
have. Skipping the table avoids an extra join that would buy you
nothing in return.

## Querying it anyway, with a view

You can still present a degenerate dimension to report authors as if it
were a real dimension table, without actually building one, by wrapping
it in a **view**:

```sql
CREATE VIEW dbo.DimSalesOrder AS
SELECT DISTINCT SalesOrderNumber
FROM dbo.FactInternetSales;
```

This gives Power BI (or any downstream tool) something that *looks* like
a dimension table — without the warehouse actually storing a second,
redundant copy of the data.

## Recognizing a degenerate dimension when you're designing one

Ask two questions about a candidate identifier column: does it live at
the exact same grain as the fact row, and does it carry zero descriptive
attributes of its own? If both answers are yes, it's a degenerate
dimension — leave it on the fact table. Order numbers, invoice numbers,
ticket numbers, and ATM transaction numbers are all common real-world
examples.

## Key terms

| Term | Meaning |
|---|---|
| Degenerate dimension | An identifier kept on the fact table itself instead of a separate dimension table |
| Grain | The level of detail one fact row represents (Lesson 4) — a degenerate dimension always matches it exactly |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- SalesOrderNumber lives directly on the fact table — a degenerate dimension
SELECT TOP 10 SalesOrderNumber, SalesOrderLineNumber, ProductKey, SalesAmount
FROM dbo.FactInternetSales
ORDER BY SalesOrderNumber;

-- Present it as a "dimension" without a real table, using a view
CREATE VIEW dbo.DimSalesOrder AS
SELECT DISTINCT SalesOrderNumber
FROM dbo.FactInternetSales;

SELECT TOP 10 * FROM dbo.DimSalesOrder;
```

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
makes an identifier a degenerate dimension candidate, why it's not worth
building a real dimension table for one, and how you'd still expose it
to report authors as if it were a dimension.
