# Lesson 107 — OLTP vs. OLAP: Two Different Worlds

**Chapter 12 · Data Warehouse Concepts · Lesson 1 of 12**

## What you'll learn

- What **OLTP** and **OLAP** stand for, and the fundamentally different
  job each one does
- Why the normalization rules from Chapter 11 apply to one, but not the
  other
- The real, concrete example already sitting on your server:
  `AdventureWorks2012` vs. `AdventureWorksDW2014`
- Why this chapter switches lab databases

## Two different jobs

**OLTP** (Online Transaction Processing) is the world you've lived in for
eleven chapters: fast, individual reads and writes — placing one order,
updating one customer's address, checking one product's stock. It's
optimized for **many small transactions happening at once**, which is
exactly why Chapter 11's normalization rules matter so much there: an
OLTP system updates data constantly, and normalization prevents the same
fact from going stale in two different places at once.

**OLAP** (Online Analytical Processing) has a completely different job:
answering big, aggregate questions across **millions of historical rows**
— total sales by year, average order size by region, year-over-year growth
by product category. It's read-heavy, rarely updated, and — critically —
usually **denormalized on purpose**, because fewer joins means faster
aggregate queries across huge volumes of data.

## The concrete example already on your server

`AdventureWorks2012` is a real OLTP database: normalized tables, foreign
keys everywhere, built for placing and managing individual orders.
`AdventureWorksDW2014` ("DW" for Data Warehouse) is the **same company's**
data, restructured for OLAP: fewer, wider, denormalized tables built for
fast historical analysis.

```sql
-- OLTP-style: total sales, computed from normalized order/detail tables
-- (requires a join across two tables, computed live)
SELECT YEAR(h.OrderDate) AS SalesYear, SUM(d.LineTotal) AS TotalSales
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS d ON d.SalesOrderID = h.SalesOrderID
GROUP BY YEAR(h.OrderDate)
ORDER BY SalesYear;
```

```sql
-- OLAP-style: the same kind of question, against the warehouse's
-- pre-shaped fact table — fewer joins, built for exactly this
SELECT d.CalendarYear, SUM(f.SalesAmount) AS TotalSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
GROUP BY d.CalendarYear
ORDER BY d.CalendarYear;
```

Both queries answer "total sales by year" — but the OLAP version, against
`AdventureWorksDW2014`, is built from tables shaped specifically to make
that kind of question fast and simple, which is exactly what the rest of
this chapter explores.

## Why this chapter switches databases

Every lab in Chapters 1–11 ran against `AdventureWorks2012` (OLTP) —
appropriate, since you were learning to query and design transactional
systems. From here on, every lab runs against `AdventureWorksDW2014`
(OLAP) instead, because you're now studying how data gets *reshaped* for
analysis, not how it gets recorded in the first place.

## Key terms

| Term | Meaning |
|---|---|
| OLTP | Online Transaction Processing — fast, individual reads/writes, normalized |
| OLAP | Online Analytical Processing — big aggregate reads, denormalized on purpose |
| AdventureWorks2012 | The real OLTP database used for Chapters 1–11 |
| AdventureWorksDW2014 | The real OLAP/warehouse database used for Chapter 12 |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Explore the warehouse's shape for the first time
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME LIKE 'Fact%' OR TABLE_NAME LIKE 'Dim%'
ORDER BY TABLE_NAME;
```

## Check yourself

You're ready for Lesson 108 when you can explain, without looking: why
does an OLTP system benefit from normalization while an OLAP system
usually breaks those rules on purpose?
