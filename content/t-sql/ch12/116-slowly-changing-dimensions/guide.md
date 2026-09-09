# Lesson 116 — Slowly Changing Dimensions (SCD)

**Chapter 12 · Data Warehouse Concepts · Lesson 10 of 12**

## What you'll learn

- What a **slowly changing dimension** is, and why dimension attributes
  genuinely change over time
- The three classic ways to handle that change: Types 1, 2, and 3
- The real Type 2 tracking columns already sitting in
  `AdventureWorksDW2014`'s `DimProduct`
- Why SCD Type 2 is literally how a warehouse achieves Lesson 108's
  "time-variant" property for dimensions, not just facts

## Dimensions change too

Lesson 108 called a warehouse **time-variant** — but that lesson focused
on facts (sales history). Dimensions change too, just more slowly: a
customer moves cities, a product gets reclassified into a new category, a
salesperson gets promoted to a new territory. A **slowly changing
dimension** (SCD) is the general problem of deciding what happens to the
*old* value when that update arrives.

## Type 1 — overwrite, no history

```sql
-- Type 1: just update it. The old value is gone.
UPDATE dbo.DimCustomer
SET City = 'Seattle'
WHERE CustomerKey = 501;
```

Simplest option. Every historical fact row still joins to the same
`CustomerKey`, but now shows the customer's *current* city, even for sales
that happened while they lived somewhere else. Fine when you genuinely
don't care about the history of that attribute.

## Type 2 — add a new row, keep full history

Type 2 preserves history by inserting a **new row with a new surrogate
key** instead of overwriting, and marking which version was active when.
`AdventureWorksDW2014`'s real `DimProduct` table has exactly the columns
built for this: `StartDate`, `EndDate`, and `Status`.

```sql
-- The real Type 2 tracking columns already in DimProduct
SELECT ProductKey, EnglishProductName, StartDate, EndDate, Status
FROM dbo.DimProduct
WHERE EndDate IS NOT NULL
ORDER BY EndDate DESC;
```

A row with a non-NULL `EndDate` is a **retired version** — superseded by
a newer `DimProduct` row with a new `ProductKey`, a fresh `StartDate`, and
`Status = 'Current'`. Every fact row from *before* that change still
points at the old `ProductKey`, so historical reports keep showing
exactly what was true *at the time* — this is the mechanism that actually
delivers Lesson 108's time-variance for dimension attributes, not just
fact rows.

## Type 3 — add a column for the previous value

```sql
-- Type 3: keep just ONE prior value in an extra column
ALTER TABLE dbo.DimCustomer ADD PreviousCity NVARCHAR(50);

UPDATE dbo.DimCustomer
SET PreviousCity = City, City = 'Seattle'
WHERE CustomerKey = 501;
```

A middle ground: limited history (usually just the immediately-prior
value), no new rows, but you lose anything before that one prior value.
Rarely used compared to Types 1 and 2.

## Key terms

| Term | Meaning |
|---|---|
| SCD | Slowly Changing Dimension — how to handle a dimension attribute changing over time |
| Type 1 | Overwrite in place, no history preserved |
| Type 2 | New row with a new key, old row marked with an end date — full history |
| Type 3 | An extra column holding just the immediately-prior value |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Find products that have been through a Type 2 change
SELECT ProductAlternateKey, COUNT(*) AS VersionCount
FROM dbo.DimProduct
GROUP BY ProductAlternateKey
HAVING COUNT(*) > 1;
```

## Check yourself

You're ready for Lesson 117 when you can explain, without looking: what's
the difference between a Type 1 and a Type 2 slowly changing dimension,
and how does `DimProduct`'s `StartDate`/`EndDate` pair implement Type 2
for real?
