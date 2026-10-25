# Lesson 41 — GROUP BY CUBE

**Chapter 4 · Grouping and Aggregating · Lesson 10 of 11**

## What you'll learn

- What `GROUP BY CUBE` adds beyond `ROLLUP`
- Why CUBE is the right tool for independent dimensions, not just hierarchies
- `GROUPING_ID()` as a shortcut for reading CUBE/ROLLUP output

## ROLLUP only rolls up one direction

Lesson 40 showed that `ROLLUP (Color, Size)` rolls up **right to left**: full
detail, then a subtotal per `Color`, then the grand total. It never gives
you a subtotal by `Size` alone, across every color — that combination falls
outside the hierarchy ROLLUP assumes.

```sql
USE AdventureWorks2012;
GO

-- ROLLUP: detail, then Color subtotals, then grand total
-- (no "Size alone" subtotal row exists in this result)
SELECT Color, Size, SUM(ListPrice) AS TotalListPrice
FROM Production.Product
GROUP BY ROLLUP (Color, Size);
```

## CUBE: every possible combination

`CUBE` makes no assumption about which column is "broader." It generates a
subtotal for **every possible combination** of the grouping columns —
mathematically, the full power set. For two columns, that's four levels
instead of ROLLUP's three:

```sql
SELECT
    Color,
    Size,
    SUM(ListPrice) AS TotalListPrice,
    COUNT(*) AS ProductCount
FROM Production.Product
GROUP BY CUBE (Color, Size);
```

This returns everything `ROLLUP (Color, Size)` did, **plus** one more kind
of row ROLLUP never produces: a subtotal **by `Size` alone**, with `Color`
shown as `NULL` — the total across every color, for each size. `CUBE`
doesn't care which column you listed first; every column gets its own
standalone subtotal level, and every combination between them does too.

## When to reach for which one

- **ROLLUP** — your columns form a real hierarchy (year → quarter → month,
  category → subcategory → product) and you only ever want subtotals that
  respect that nesting.
- **CUBE** — your columns are independent dimensions you want to
  cross-tabulate every way at once (color and size, region and product
  line) — not a hierarchy, just two angles on the same data.

CUBE's row count grows fast: `n` columns means `2^n` combination levels, so
reach for it deliberately on a handful of columns, not as a default habit
on every report.

## GROUPING_ID(): one number instead of several

Lesson 40's `GROUPING()` works one column at a time. `GROUPING_ID()` packs
several `GROUPING()` calls into a single number, which makes it easy to
filter or sort by "what kind of subtotal row is this":

```sql
SELECT
    Color,
    Size,
    SUM(ListPrice) AS TotalListPrice,
    GROUPING_ID(Color, Size) AS SubtotalLevel
FROM Production.Product
GROUP BY CUBE (Color, Size)
ORDER BY GROUPING_ID(Color, Size);
```

`GROUPING_ID(Color, Size)` returns `0` for a plain detail row, and a higher
number for each kind of subtotal — ordering by it groups the detail rows,
each subtotal type, and the grand total together instead of interleaved.

## One more related keyword, by name only

`GROUPING SETS` is a third option worth knowing exists: instead of ROLLUP's
fixed hierarchy or CUBE's full power set, it lets you spell out exactly
which combinations you want, nothing more and nothing less. It isn't
covered as its own lesson here, but recognize the name — it's the tool to
reach for when neither ROLLUP nor CUBE gives you precisely the subtotal
rows a report actually needs.

## Key terms

| Term | Meaning |
|---|---|
| `GROUP BY CUBE (...)` | Adds a subtotal row for every possible combination of the grouping columns |
| `GROUPING_ID(...)` | Returns one number encoding which columns are ROLLUP/CUBE subtotals in the current row |
| `GROUPING SETS` | A related keyword for specifying an exact custom list of subtotal combinations (not covered here) |

## Lab

Run the `GROUPING_ID()` query above against AdventureWorks2012. Count how
many distinct values `GROUPING_ID(Color, Size)` returns, and confirm it
matches the four levels CUBE produces for two columns.

## Check yourself

You're ready for Lesson 42 when you can answer, without looking: what row
does `CUBE (Color, Size)` produce that `ROLLUP (Color, Size)` never does,
and why?
