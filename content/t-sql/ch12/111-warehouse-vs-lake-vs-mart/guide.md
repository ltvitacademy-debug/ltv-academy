# Lesson 111 — Data Warehouse vs. Data Lake vs. Data Mart

**Chapter 12 · Data Warehouse Concepts · Lesson 5 of 12**

## What you'll learn

- A single, side-by-side comparison of Lessons 108–110's three concepts
- How they typically fit together, rather than compete
- The emerging "lakehouse" idea that blurs the line between two of them

## Side by side

| | **Data Warehouse** | **Data Mart** | **Data Lake** |
|---|---|---|---|
| **Scope** | Whole organization | One business function | Anything, from anywhere |
| **Data shape** | Structured, integrated | Structured, integrated (narrower) | Raw — structured, semi-, or unstructured |
| **Schema timing** | On write | On write | On read |
| **Typical size** | Large | Small to medium | Massive |
| **Real example** | `AdventureWorksDW2014` as a whole | Just `FactResellerSales` + its dimensions | Raw CSV/JSON files queried via `OPENROWSET` |

## How they usually fit together, not compete

These aren't three competing choices for the same job — in a mature BI
setup, they typically form a pipeline:

1. Raw data lands in a **lake** first — cheap, flexible, no schema
   required yet
2. A curated, structured, integrated subset gets loaded into the
   **warehouse** — Lesson 108's subject-oriented, time-variant, non-volatile
   store
3. Individual teams get their own **mart** — Lesson 109's narrower,
   department-focused slice of that warehouse

```sql
-- The warehouse layer: curated, structured, ready for broad analysis
SELECT d.CalendarYear, SUM(f.SalesAmount) AS TotalSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
GROUP BY d.CalendarYear;

-- The mart layer: the same warehouse, narrowed to one team's function
SELECT r.ResellerName, SUM(f.SalesAmount) AS TotalResellerSales
FROM dbo.FactResellerSales AS f
JOIN dbo.DimReseller AS r ON r.ResellerKey = f.ResellerKey
GROUP BY r.ResellerName;
```

## The emerging "lakehouse"

Modern platforms increasingly blur lake and warehouse together into a
**lakehouse**: raw files stored lake-style (cheap, flexible, schema-on-read),
but with a structured, warehouse-like query layer built directly on top —
getting the lake's low storage cost and flexibility *and* the warehouse's
reliable, structured querying, without physically copying data twice.
Azure Synapse and Delta Lake are real examples of this pattern in
production today.

## Key terms

| Term | Meaning |
|---|---|
| Warehouse | Whole-organization, structured, integrated store |
| Mart | A narrower, department-focused slice of a warehouse |
| Lake | Raw, any-format storage, schema applied only at read time |
| Lakehouse | A hybrid combining a lake's storage with a warehouse's query structure |

## Lab

Run against `AdventureWorksDW2014` to see the warehouse-to-mart
relationship in one script:

```sql
-- Warehouse-level total
SELECT SUM(SalesAmount) AS WarehouseTotal FROM dbo.FactInternetSales;

-- Mart-level slice: just the top 5 reseller-facing product categories
SELECT TOP 5 p.EnglishProductName, SUM(f.SalesAmount) AS MartTotal
FROM dbo.FactResellerSales AS f
JOIN dbo.DimProduct AS p ON p.ProductKey = f.ProductKey
GROUP BY p.EnglishProductName
ORDER BY MartTotal DESC;
```

## Check yourself

You're ready for Lesson 112 when you can explain, without looking: how do
a warehouse, a mart, and a lake typically fit together in one pipeline,
rather than being three separate choices?
