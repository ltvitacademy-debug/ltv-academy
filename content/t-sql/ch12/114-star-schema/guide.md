# Lesson 114 — Star Schema

**Chapter 12 · Data Warehouse Concepts · Lesson 8 of 12**

## What you'll learn

- What a **star schema** is, and why it's named that
- Why every dimension sits exactly **one join away** from the fact table
- Why dimensions are **denormalized on purpose** — deliberately breaking
  Chapter 11's 3NF rule
- The real star sitting inside `AdventureWorksDW2014`

## One fact table, surrounded by dimensions

A **star schema** arranges Lesson 113's fact and dimension tables into a
specific shape: **one central fact table**, directly connected to
**several dimension tables**, each just **one join away**. Drawn out
visually, the fact table sits in the middle with dimension tables
radiating outward — a star.

```sql
-- The real star in AdventureWorksDW2014:
-- FactInternetSales in the center, four dimensions one join away
SELECT
    d.CalendarYear,
    p.EnglishProductName,
    c.FirstName + ' ' + c.LastName AS CustomerName,
    st.SalesTerritoryRegion,
    f.SalesAmount
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
JOIN dbo.DimProduct AS p ON p.ProductKey = f.ProductKey
JOIN dbo.DimCustomer AS c ON c.CustomerKey = f.CustomerKey
JOIN dbo.DimSalesTerritory AS st ON st.SalesTerritoryKey = f.SalesTerritoryKey;
```

Every one of those four joins goes directly from `FactInternetSales` to
one dimension — nothing joins dimension-to-dimension. That's the defining
feature of a star: **exactly one hop**, every time.

## Denormalized on purpose

Here's the part that would look wrong in Chapter 11: `DimProduct` doesn't
split product category and subcategory into their own separate tables the
way a fully-normalized OLTP schema would (recall Lesson 103's 2NF/3NF
rules). Instead, `DimProduct` — or a related product dimension — often
flattens category and subcategory names directly onto the product row.
That's a deliberate 3NF violation, made on purpose: fewer joins means
faster aggregate queries, and dimension tables are small enough that the
storage cost of that duplication barely matters.

```sql
-- A star-schema dimension intentionally keeps flattened,
-- denormalized attributes together, unlike a normalized OLTP table
SELECT ProductKey, EnglishProductName, ProductSubcategoryKey
FROM dbo.DimProduct;
```

## Why this shape wins for analysis

A star schema's whole point is fast, predictable aggregate queries: pick
your dimensions, filter and group by their attributes, sum a fact table
measure. Because every dimension is exactly one join away, the query
optimizer has an easy, well-understood shape to work with — this is
precisely why BI tools and reporting engines are built to expect star
schemas by default.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | One fact table, several dimensions, each exactly one join away |
| Denormalization | Deliberately combining what would be separate normalized tables, for query speed |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Count how many dimension tables sit one join away from the fact table
SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'FactInternetSales' AND COLUMN_NAME LIKE '%Key';
```

## Check yourself

You're ready for Lesson 115 when you can explain, without looking: what
makes a schema a "star," and why do its dimension tables deliberately
break Chapter 11's normalization rules?
