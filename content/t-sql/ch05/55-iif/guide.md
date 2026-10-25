# Lesson 57 — IIF

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 15 of 22**

## What you'll learn

- `IIF(condition, true_value, false_value)` syntax
- How it maps directly onto a simple `CASE` expression
- When `IIF` is good shorthand, and when `CASE` is still the better tool
- Where `IIF` came from

## The CASE expression you already know

```sql
USE AdventureWorks2012;
GO

SELECT
    Name,
    ListPrice,
    CASE WHEN ListPrice > 1000 THEN 'Premium' ELSE 'Standard' END AS PriceTier
FROM Production.Product;
```

## IIF: the same two-branch logic, shorter

```sql
SELECT
    Name,
    ListPrice,
    IIF(ListPrice > 1000, 'Premium', 'Standard') AS PriceTier
FROM Production.Product;
```

`IIF(condition, true_value, false_value)` evaluates `condition`. If it's
`TRUE`, you get `true_value`; otherwise — including when `condition` is
`NULL` or `UNKNOWN`, exactly like a `CASE` expression's `WHEN` — you get
`false_value`. It's a direct, drop-in shorthand for the two-branch `CASE`
above, nothing more.

## IIF can nest, but that's a sign to use CASE instead

```sql
-- Nesting IIF for three branches works, but readability drops fast:
SELECT
    Name,
    ListPrice,
    IIF(ListPrice > 1000, 'Premium',
        IIF(ListPrice > 500, 'Mid-Range', 'Standard')) AS PriceTier
FROM Production.Product;

-- The equivalent CASE stays readable once you're past two branches:
SELECT
    Name,
    ListPrice,
    CASE
        WHEN ListPrice > 1000 THEN 'Premium'
        WHEN ListPrice > 500 THEN 'Mid-Range'
        ELSE 'Standard'
    END AS PriceTier
FROM Production.Product;
```

## Where IIF comes from

`IIF` was added to SQL Server in SQL Server 2012, as a shorthand for
exactly this two-branch `CASE` pattern — the kind of inline conditional
that's long been familiar from Excel and Access. It's pure syntax sugar:
SQL Server compiles it down to the equivalent `CASE` expression internally,
so there's no performance difference between the two — only a readability
one, in each direction, depending on how many branches you need.

## Key terms

| Term | Meaning |
|---|---|
| `IIF(condition, true_value, false_value)` | Shorthand for a two-branch CASE expression; compiles to CASE internally |

## Lab

Run the single-`IIF` `PriceTier` query above, then rewrite it as a `CASE`
expression and confirm the two produce identical results against
AdventureWorks2012.

## Check yourself

You're ready for Lesson 58 when you can answer, without looking: what
two-branch `CASE` expression is `IIF(condition, a, b)` exactly equivalent
to, and why does nesting `IIF` for three or more branches usually hurt
readability compared to `CASE`?
