# Lesson 109 — What Is a Data Mart?

**Chapter 12 · Data Warehouse Concepts · Lesson 3 of 12**

## What you'll learn

- What a **data mart** is, and how it relates to a full data warehouse
- **Dependent** marts (carved from a warehouse) vs. **independent** marts
  (built standalone)
- A real example already living inside `AdventureWorksDW2014`
- Why a team would want a mart at all, instead of just querying the
  warehouse directly

## A smaller, focused slice

A **data mart** is a scaled-down version of a data warehouse, built around
**one specific business function or department** — sales, finance,
marketing — instead of the entire organization. Where a warehouse is
subject-oriented across the whole business, a mart takes that same idea
and narrows it down to one team's actual, everyday needs: fewer tables,
a simpler schema, faster queries, because there's simply less data and
fewer subjects to wade through.

## Dependent vs. independent marts

- A **dependent** mart is carved out of an existing data warehouse — a
  filtered, narrower view built *from* the same integrated, cleaned data
  the warehouse already has.
- An **independent** mart is built standalone, loaded directly from source
  systems without going through a central warehouse first — faster to
  stand up, but at the cost of not sharing the warehouse's integration and
  consistency work.

## A real example already in AdventureWorksDW2014

`AdventureWorksDW2014` actually contains data for **two different sales
channels** in one warehouse: direct-to-consumer sales
(`FactInternetSales`) and business-to-business reseller sales
(`FactResellerSales`). A reseller-operations team doesn't need to see
internet sales data at all — querying just their fact table is exactly
what a **dependent mart** focused on reseller sales would look like:

```sql
-- What a "Reseller Sales" mart's core query would look like —
-- a narrow slice of the full warehouse, focused on one business function
SELECT r.ResellerName, SUM(f.SalesAmount) AS TotalResellerSales
FROM dbo.FactResellerSales AS f
JOIN dbo.DimReseller AS r ON r.ResellerKey = f.ResellerKey
GROUP BY r.ResellerName
ORDER BY TotalResellerSales DESC;
```

A genuinely separate reseller-sales mart might physically copy just this
slice — `FactResellerSales`, `DimReseller`, and the shared dimensions like
`DimDate` and `DimProduct` — into its own smaller database, so the
reseller team's reports run fast without touching internet sales data at
all.

## Why bother with a mart at all

A full warehouse can be enormous, spanning every subject in the business.
A sales team querying it directly still has to know which of dozens of
tables actually matter to them, and their queries compete for resources
with every other team's. A mart trims that down to exactly what one team
needs — a faster, simpler, more focused surface built on top of (or
alongside) the same underlying data.

## Key terms

| Term | Meaning |
|---|---|
| Data mart | A scaled-down warehouse focused on one business function |
| Dependent mart | Carved from an existing data warehouse |
| Independent mart | Built standalone, loaded directly from source systems |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Compare total sales volume between the two "channels" that
-- could each become their own mart
SELECT 'Internet' AS Channel, SUM(SalesAmount) AS Total FROM dbo.FactInternetSales
UNION ALL
SELECT 'Reseller' AS Channel, SUM(SalesAmount) AS Total FROM dbo.FactResellerSales;
```

## Check yourself

You're ready for Lesson 110 when you can explain, without looking: what's
the difference between a dependent and an independent data mart, and why
would a team want one instead of querying the full warehouse?
