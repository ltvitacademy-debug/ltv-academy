# Lesson 113 — Fact Tables and Dimension Tables

**Chapter 12 · Data Warehouse Concepts · Lesson 7 of 12**

## What you'll learn

- What a **fact table** holds, and what a **dimension table** holds
- Why fact tables are narrow-but-tall, and dimension tables are wide-but-short
- The real fact/dimension pair already all over `AdventureWorksDW2014`
- Why this vocabulary is the foundation for everything left in this
  chapter

## Two roles, one warehouse

Every warehouse table you've queried this chapter falls into one of two
roles:

- A **fact table** holds the **measurable events** — things that
  happened, with numbers attached: a sale, a shipment, a page view. Its
  columns are mostly foreign keys pointing at dimensions, plus a handful
  of numeric **measures** you can sum, average, or count.
- A **dimension table** holds the **descriptive context** around those
  events: who, what, when, where. Its columns are mostly text and
  attributes you'd filter or group by, not add up.

## The real pair in AdventureWorksDW2014

`dbo.FactInternetSales` is a textbook fact table — narrow but very tall
(millions of potential rows), almost entirely foreign keys and numbers:

```sql
SELECT TOP 5 ProductKey, OrderDateKey, CustomerKey, SalesAmount, OrderQuantity
FROM dbo.FactInternetSales;
```

`dbo.DimProduct` is a textbook dimension table — much wider, but far
fewer rows, packed with descriptive attributes you'd group or filter by:

```sql
SELECT TOP 5 ProductKey, EnglishProductName, Color, Size, ListPrice, ProductAlternateKey
FROM dbo.DimProduct;
```

Put together, they answer real questions: fact table gives you *what
happened and how much*; dimension table gives you *what it means*.

```sql
SELECT p.EnglishProductName, p.Color, SUM(f.SalesAmount) AS TotalSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimProduct AS p ON p.ProductKey = f.ProductKey
GROUP BY p.EnglishProductName, p.Color
ORDER BY TotalSales DESC;
```

## Why the shapes are so different on purpose

A fact table stays narrow because every extra column multiplies across
potentially millions of rows — you want just the keys and the measures.
A dimension table can afford to be wide because it has relatively few
rows (a few thousand products, a few hundred customers' worth of
attributes) — the descriptive richness lives there instead, where it's
cheap to store.

## Key terms

| Term | Meaning |
|---|---|
| Fact table | Holds measurable events — mostly foreign keys plus numeric measures |
| Dimension table | Holds descriptive context — mostly text attributes, fewer rows |
| Measure | A numeric fact-table column meant to be summed, averaged, or counted |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Compare row counts: the fact table is tall, the dimension is short
SELECT
    (SELECT COUNT(*) FROM dbo.FactInternetSales) AS FactRowCount,
    (SELECT COUNT(*) FROM dbo.DimProduct) AS DimensionRowCount;
```

## Check yourself

You're ready for Lesson 114 when you can explain, without looking: what
kind of columns dominate a fact table versus a dimension table, and why
their row-count shapes are so different?
