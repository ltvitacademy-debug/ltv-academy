# Lesson 117 — Surrogate Keys vs. Natural Keys

**Chapter 12 · Data Warehouse Concepts · Lesson 11 of 12**

## What you'll learn

- What a **natural key** is, versus a **surrogate key**
- The real pair of columns already sitting in `AdventureWorksDW2014`'s
  `DimProduct` that shows both at once
- Why Lesson 116's Type 2 slowly changing dimension **requires** a
  surrogate key to work at all

## Two different kinds of "identifier"

A **natural key** (also called a business key) is an identifier that
already means something in the real world — a source system's
`ProductID`, a Social Security Number, an email address. A **surrogate
key** is the opposite: a meaningless, system-generated identifier (almost
always a simple incrementing integer) that exists purely to identify a
row, with no business meaning attached at all.

## The real pair already in DimProduct

`AdventureWorksDW2014`'s `DimProduct` table keeps **both**, side by side,
on purpose:

```sql
SELECT ProductKey, ProductAlternateKey, EnglishProductName
FROM dbo.DimProduct;
```

- `ProductKey` is the **surrogate key** — the warehouse's own
  auto-generated integer, meaningless outside this table
- `ProductAlternateKey` is the **natural key** — the original `ProductID`
  string from `AdventureWorks2012`'s `Production.Product`, carried over so
  you can always trace a warehouse row back to its real-world source

## Why Type 2 SCDs need a surrogate key to work at all

Recall Lesson 116: a Type 2 change inserts a *new row with a new key* while
keeping the old row around with an `EndDate`. If `DimProduct` used the
natural key (`ProductAlternateKey`) as its primary key, that would be
**impossible** — a primary key can't repeat, so you could never have two
rows for the same product. The surrogate key (`ProductKey`) solves this
exactly: the *same* `ProductAlternateKey` can appear on **multiple**
`ProductKey` rows, one per historical version, because the surrogate key
— not the natural one — is what actually has to stay unique.

```sql
-- The mechanism, made visible: same natural key, different surrogate keys
SELECT ProductKey, ProductAlternateKey, EnglishProductName, StartDate, EndDate
FROM dbo.DimProduct
WHERE ProductAlternateKey IN (
    SELECT ProductAlternateKey FROM dbo.DimProduct
    GROUP BY ProductAlternateKey HAVING COUNT(*) > 1
)
ORDER BY ProductAlternateKey, StartDate;
```

## Other reasons warehouses default to surrogate keys

Beyond enabling Type 2 history, surrogate keys are also smaller and
faster to join on than a long natural key (a string `ProductID` vs. a
narrow `INT`), and they insulate the warehouse from a source system
someday *reusing* or *changing the format of* its own natural keys — the
warehouse's own numbering never has to change just because a source
system's did.

## Key terms

| Term | Meaning |
|---|---|
| Natural key | A real-world, business-meaningful identifier from the source system |
| Surrogate key | A meaningless, system-generated identifier used as the warehouse's own primary key |
| ProductAlternateKey | AdventureWorksDW2014's real natural-key column on DimProduct |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Confirm ProductKey (surrogate) is unique, but ProductAlternateKey
-- (natural) is NOT always unique — exactly what Type 2 history requires
SELECT COUNT(*) AS TotalRows,
       COUNT(DISTINCT ProductKey) AS DistinctSurrogateKeys,
       COUNT(DISTINCT ProductAlternateKey) AS DistinctNaturalKeys
FROM dbo.DimProduct;
```

## Check yourself

You're ready for Lesson 118 (the final lesson!) when you can explain,
without looking: why does `DimProduct` keep both a surrogate key and a
natural key, and why does Type 2 history specifically require the
surrogate one?
