# Lesson 58 — CHOOSE

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 16 of 22**

## What you'll learn

- `CHOOSE(index, val1, val2, ...)` syntax
- 1-based indexing, not 0-based
- What happens when the index is out of range
- Why `CHOOSE` is a narrow-use tool, not a general `CASE` replacement

## Picking a value by position

```sql
SELECT CHOOSE(2, 'Red', 'Green', 'Blue') AS PickedColor;
-- Returns 'Green' -- the SECOND item, because CHOOSE counts from 1, not 0
```

`CHOOSE` takes a numeric index first, then a list of candidate values, and
returns whichever one sits at that position.

## A realistic use: mapping a small numeric code to a label

`Sales.SalesOrderHeader.Status` stores a small numeric code (1 through 6)
for each order's status. `CHOOSE` can turn that code straight into a
readable label:

```sql
USE AdventureWorks2012;
GO

SELECT
    SalesOrderID,
    Status,
    CHOOSE(Status, 'In Process', 'Approved', 'Backordered',
                   'Rejected', 'Shipped', 'Cancelled') AS StatusLabel
FROM Sales.SalesOrderHeader;
```

`Status` is used directly as the index — order status `1` picks
`'In Process'`, status `5` picks `'Shipped'`, and so on, matching the
order the values are listed in.

## Out-of-range index returns NULL

```sql
SELECT CHOOSE(10, 'Red', 'Green', 'Blue') AS OutOfRange;
-- Returns NULL -- there's no 10th item, and CHOOSE doesn't raise an error
```

Unlike an array access that might throw an error in other languages,
`CHOOSE` simply returns `NULL` when the index falls outside the list — no
exception, no batch-stopping failure.

## CHOOSE vs. CASE

`CHOOSE` only ever does one thing: pick an item by its numeric position.
It can't test arbitrary conditions the way `CASE` can — there's no way to
ask "is `ListPrice` greater than 1000?" with `CHOOSE`. For anything beyond
a direct index-to-value mapping, `CASE` (or a proper lookup table) is
still the right tool.

## Key terms

| Term | Meaning |
|---|---|
| `CHOOSE(index, val1, ..., valN)` | Returns the value at the given 1-based position; NULL if the index is out of range |

## Lab

Run the `StatusLabel` query above against `Sales.SalesOrderHeader`. Then
test `CHOOSE` with an index of `0` and confirm it also returns `NULL` —
`CHOOSE` is strictly 1-based, not 0-based.

## Check yourself

You're ready for Lesson 59 when you can answer, without looking: what does
`CHOOSE(1, 'A', 'B', 'C')` return? What does `CHOOSE(0, 'A', 'B', 'C')`
return? And why is `CHOOSE` not a general substitute for `CASE`?
