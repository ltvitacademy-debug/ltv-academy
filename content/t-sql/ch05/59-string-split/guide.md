# Lesson 61 — STRING_SPLIT

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 19 of 22**

## What you'll learn

- `STRING_SPLIT(string, separator)`: splitting one string into rows
- It's a table-valued function — used with `FROM`, not in the `SELECT`
  list like a scalar function
- Why its output row order isn't guaranteed by default
- The `enable_ordinal` parameter (SQL Server 2022+) for a reliable
  position column

## The reverse of STRING_AGG

```sql
SELECT value
FROM STRING_SPLIT('Red, Green, Blue', ',');
```

`STRING_SPLIT` returns one row per piece of the original string, in a
single column always named `value`. Notice the values after the first
one here still carry a leading space (`' Green'`, `' Blue'`) — the split
happens exactly on the separator character, with no automatic trimming,
so real usage often wraps `value` in `TRIM(...)`.

## Using it against real data: turning a parameter list into a join

A common, practical pattern: accepting a comma-separated list of IDs as
one string parameter, then joining against it directly instead of
building dynamic SQL:

```sql
USE AdventureWorks2012;
GO

DECLARE @ProductIdList VARCHAR(100) = '1,2,3,316';

SELECT p.ProductID, p.Name, p.ListPrice
FROM Production.Product AS p
JOIN STRING_SPLIT(@ProductIdList, ',') AS s
    ON p.ProductID = TRY_CAST(s.value AS INT);
```

This combines Lesson 59's `TRY_CAST` with `STRING_SPLIT`: each piece of
the comma-separated list gets converted to `INT` and matched against
`Production.Product.ProductID`.

## Order isn't guaranteed by default

```sql
-- Nothing here promises 'Red' comes back before 'Green' and 'Blue' --
-- STRING_SPLIT's row order is not guaranteed unless you ask for it:
SELECT value
FROM STRING_SPLIT('Red,Green,Blue', ',');
```

## enable_ordinal (SQL Server 2022+): a reliable position column

```sql
-- The third parameter is new in SQL Server 2022. A value of 1 adds
-- an "ordinal" column holding each piece's 1-based position in the
-- original string:
SELECT value, ordinal
FROM STRING_SPLIT('Red,Green,Blue', ',', 1)
ORDER BY ordinal;
```

With `enable_ordinal` set to `1`, `STRING_SPLIT` returns an extra
`ordinal` column, and sorting by it reproduces the original string's
order deterministically — something earlier versions of `STRING_SPLIT`
simply couldn't guarantee.

## Key terms

| Term | Meaning |
|---|---|
| `STRING_SPLIT(string, separator [, enable_ordinal])` | Table-valued function that splits a string into one-row-per-piece results |
| `ordinal` | Optional column (SQL Server 2022+) giving each piece's 1-based position in the original string |

## Lab

Run the plain `STRING_SPLIT` examples above, then the `enable_ordinal`
version, and confirm that ordering by `ordinal` is now deterministic.

## Check yourself

You're ready for Lesson 62 when you can answer, without looking: why
can't you rely on `STRING_SPLIT`'s row order without the `ordinal`
column, and what SQL Server version introduced `enable_ordinal`?
