# Lesson 118 — Where T-SQL Fits in the BI/Warehousing Pipeline

**Chapter 12 · Data Warehouse Concepts · Lesson 12 of 12 — Course Finale**

## What you'll learn

- The full BI pipeline, stage by stage — and exactly where T-SQL shows up
  at each one
- Why almost everything you've built across 118 lessons was, in some
  form, preparation for this exact picture
- One last real query, touching several chapters at once
- Where to go from here

## The pipeline, stage by stage

| Stage | What happens | Where T-SQL shows up |
|---|---|---|
| **1. Source (OLTP)** | Real transactions get recorded — orders, customers, products | Chapters 1–9: every `SELECT`, `JOIN`, subquery, and stored procedure you wrote against `AdventureWorks2012` |
| **2. Transform (ETL/ELT)** | Raw source rows get reshaped into warehouse-ready facts and dimensions | Lesson 112: T-SQL's own `INSERT...SELECT` with dimension-key lookups **is** the transform engine in an ELT pipeline |
| **3. Warehouse (OLAP)** | Cleaned, structured, historical data lands in fact/dimension tables | Chapter 12: querying `AdventureWorksDW2014`'s star/snowflake schema, tracking Type 2 history |
| **4. BI tools** | Power BI, Excel, or a reporting layer visualizes the result | Every chart and table those tools render is ultimately backed by a T-SQL query — sometimes one they generate themselves, sometimes one you write by hand |

**Performance tuning (Chapter 10) applies at every single stage** — a
slow OLTP query, a slow ELT transform, a slow warehouse aggregate all get
diagnosed with the same execution-plan and `STATISTICS IO` tools you
learned there.

## One last query, touching several chapters at once

```sql
-- OLTP-style reporting query (Chapters 1-9), against the warehouse (Ch12),
-- using a window function (Ch9) for a running total, filtered SARGably (Ch10)
SELECT
    d.CalendarYear,
    d.EnglishMonthName,
    SUM(f.SalesAmount) AS MonthlySales,
    SUM(SUM(f.SalesAmount)) OVER (
        PARTITION BY d.CalendarYear ORDER BY d.MonthNumberOfYear
    ) AS YearToDateSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
WHERE d.CalendarYear >= 2011
GROUP BY d.CalendarYear, d.EnglishMonthName, d.MonthNumberOfYear
ORDER BY d.CalendarYear, d.MonthNumberOfYear;
```

That single query leans on a `JOIN` (Chapter 3), `GROUP BY` (Chapter 4), a
`WHERE` predicate that stays SARGable (Chapter 10), a window function for
the running total (Chapter 9), and it's running against a star-schema
fact table (this chapter) — almost the entire course, in one script.

## Where to go from here

You now have the same T-SQL foundation the flagship **SQL Server Database
Development & BI** track builds on. If you want to see this exact
warehouse feed a report, LTV Academy's standalone **Power BI** course
picks up right where this one leaves off — connecting to
`AdventureWorksDW2014` and building the dashboards on top of it.

## Key terms

| Term | Meaning |
|---|---|
| BI pipeline | Source → transform → warehouse → reporting, the full path data takes |
| SARGable | A predicate the optimizer can satisfy with a seek — matters at every pipeline stage |

## Final lab

Run this closing query against `AdventureWorksDW2014` and change
`2011` to a different year — confirm the running total resets cleanly at
each new calendar year:

```sql
SELECT
    d.CalendarYear,
    d.EnglishMonthName,
    SUM(f.SalesAmount) AS MonthlySales,
    SUM(SUM(f.SalesAmount)) OVER (
        PARTITION BY d.CalendarYear ORDER BY d.MonthNumberOfYear
    ) AS YearToDateSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
GROUP BY d.CalendarYear, d.EnglishMonthName, d.MonthNumberOfYear
ORDER BY d.CalendarYear, d.MonthNumberOfYear;
```

## Course complete

That's all 118 lessons — from your first `SELECT` in Lesson 1 to a
production-shaped warehouse query here in Lesson 118. Congratulations on
finishing T-SQL Development.
