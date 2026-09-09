# Lesson 50 — Converting and Formatting Data (CAST/CONVERT)

**Chapter 5 · Data Types, Strings, and Dates · Lesson 10 of 11**

## What you'll learn

- `CAST()` — converting a value from one type to another
- `CONVERT()` — the same job, plus optional formatting
- When to reach for one over the other
- A real conversion gotcha

## CAST — the ANSI-standard converter

```sql
SELECT CAST(ListPrice AS VARCHAR(20)) AS PriceAsText
FROM Production.Product;
```

`CAST(value AS newType)` converts `value` to `newType`. This is the
ANSI-standard syntax, meaning it works the same way across most database
systems — useful if you ever work outside pure SQL Server.

## CONVERT — SQL-Server-specific, with formatting

```sql
SELECT CONVERT(VARCHAR(20), ListPrice) AS PriceAsText
FROM Production.Product;
```

`CONVERT(newType, value)` does the same basic conversion as `CAST`, but
notice the **argument order is reversed** — type first, then value. The
real reason to reach for `CONVERT` over `CAST` is its **optional third
argument**, a style code that controls formatting — especially useful for
dates:

```sql
SELECT OrderDate,
       CONVERT(VARCHAR(20), OrderDate, 101) AS USFormat,   -- mm/dd/yyyy
       CONVERT(VARCHAR(20), OrderDate, 103) AS UKFormat    -- dd/mm/yyyy
FROM Sales.SalesOrderHeader;
```

`CAST` has no equivalent — it always uses the type's default format.

## When to use which

| Use `CAST` when... | Use `CONVERT` when... |
|---|---|
| You want portable, ANSI-standard syntax | You need SQL-Server-specific date/number formatting |
| No special formatting is needed | You need a specific style code |

## A real gotcha: converting text to numbers

Converting text that **isn't** actually numeric fails at runtime, not
before:

```sql
-- This FAILS if any ListPrice value looks non-numeric as text
SELECT CAST('not a number' AS INT); -- runtime conversion error
```

Always be confident the source data is genuinely convertible before
casting — or validate it first (a topic we return to with `TRY_CAST` and
`TRY_CONVERT` later in this course).

## Key terms

| Term | Meaning |
|---|---|
| `CAST(value AS type)` | ANSI-standard type conversion |
| `CONVERT(type, value, [style])` | SQL-Server-specific conversion, with optional formatting |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT OrderDate,
       CAST(OrderDate AS VARCHAR(20)) AS DefaultFormat,
       CONVERT(VARCHAR(20), OrderDate, 101) AS USFormat
FROM Sales.SalesOrderHeader;
```

## Check yourself

You're ready for Lesson 51 when you can answer, without looking: what's
the one thing `CONVERT` can do that `CAST` can't, and why does
`CONVERT`'s argument order matter?
