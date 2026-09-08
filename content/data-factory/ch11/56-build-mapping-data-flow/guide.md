# Lesson 56 — Build the Mapping Data Flow

**Chapter 11 · Capstone Project · Lesson 4 of 6**

## What you'll learn

- Turning the stakeholder's exact words into real transformation steps
- Filtering, joining, and aggregating the raw sales rows
- Why the join happens before the aggregate, not after
- Writing the result to the curated Azure SQL Database table

## Starting from the actual ask, again

Lesson 53's stakeholder asked for sales "cleaned up and totaled by
region and product category." That sentence, read carefully, is
almost a literal transformation spec:

| Words | Data flow transformation |
|---|---|
| "cleaned up" | Filter — drop cancelled or test orders |
| "by region" | Join — bring in the store's region from a dimension table |
| "and product category" | Join — bring in category from the product dimension |
| "totaled" | Aggregate — sum sales, grouped by region and category |

Four words, four real transformations, in a specific order that
matters.

## Step one: filter out what shouldn't be counted

The raw zone genuinely contains everything, including cancelled
orders and internal test transactions Northwind's own systems
generate. A Filter transformation removes both before anything else
happens:

```
OrderStatus != 'Cancelled' && CustomerID != 'TEST001'
```

Filtering first, before any join or aggregate, matters for a real
reason: it means every downstream transformation processes less data,
and a cancelled order can never accidentally inflate a regional
total.

## Step two: join in region and category

The raw sales rows only carry a `StoreID` and a `ProductID` — genuine
business context like region and category lives in separate
dimension tables. Two Join transformations bring that context in:

```
SalesFiltered
  join StoreDimension  on StoreID  -> adds Region
  join ProductDimension on ProductID -> adds Category
```

This is precisely why the join happens *before* the aggregate, not
after: you can't group by "Region" if the row doesn't have a Region
column yet.

## Step three: aggregate into the actual answer

With every row now carrying both Region and Category, the Aggregate
transformation produces exactly what the stakeholder described:

```
Group by: Region, Category
Aggregate: TotalSales = sum(OrderAmount)
           OrderCount = count(OrderID)
```

`OrderCount` wasn't explicitly requested, but it's nearly free to add
alongside `TotalSales`, and it gives the 8 AM meeting useful context
a raw dollar total alone wouldn't — a $50,000 category total from 5
orders tells a very different story than the same total from 500.

## Writing the result to the curated table

The data flow's sink is the Azure SQL Database table from Lesson 53's
architecture diagram, with the sink's **Update method** set to
**Overwrite** — every morning's run replaces yesterday's totals
cleanly, rather than accumulating duplicate rows if the pipeline ever
runs twice in one day.

## Verifying the transformation, not just the run

A green "Succeeded" status genuinely isn't proof the *numbers* are
right. Before calling this stage done:

1. Compare one region's total against a manual `SUM()` query run
   directly against the raw zone data for the same day.
2. Confirm the row count in the curated table equals the number of
   distinct Region/Category combinations actually present that day —
   not more, not fewer.

## Key terms

| Term | Meaning |
|---|---|
| Dimension table | A reference table (like Store or Product) providing business context for fact data |
| Update method | The sink setting controlling whether new rows insert, overwrite, or upsert |

## Lab

1. Write the filter condition you'd add if Northwind also wanted to
   exclude orders under $1 (likely data-entry errors).
2. Explain why the join must happen before the aggregate, in your own
   words.
3. Design the manual verification query you'd run to check one
   region's total independently.

## Check yourself

You're ready for Lesson 57 when you can explain, in one sentence, why
"the pipeline succeeded" and "the numbers are correct" are two
genuinely different claims.
