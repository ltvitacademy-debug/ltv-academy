# Lesson 7 — Combining Lookups

**Chapter 2 · Lookup & Reference Functions · Lesson 7 of 25**

## What you'll learn

- What a two-way lookup actually is, and when a single lookup can't do
  the job
- Nesting MATCH inside INDEX twice — once for the row, once for the
  column
- The equivalent pattern using XLOOKUP with two MATCH-driven arguments

## The problem a single lookup can't solve

A regular lookup finds one value using one search key: find this ID,
return that name. A **two-way lookup** finds a value at the
intersection of two conditions at once — think of a small table with
region names down the side and month names across the top, where you
need "the value where Region = West and Month = March," and neither
Region nor Month alone gets you there.

## Nested INDEX/MATCH

```
=INDEX(DataGrid, MATCH(region,RegionCol,0), MATCH(month,MonthRow,0))
```

`INDEX` accepts both a row number and a column number
(`=INDEX(array, row_num, col_num)` from Lesson 6) — this lesson finally
uses both at once. The first `MATCH` finds which **row** `region`
lives in; the second `MATCH` finds which **column** `month` lives in.
`INDEX` then returns whatever sits at that exact row/column
intersection inside `DataGrid`.

Each `MATCH` is completely independent — one searches a column of
region names, the other searches a row of month names — which is
exactly why this works: you're not looking something up twice, you're
finding two coordinates and asking INDEX for the one cell where they
meet.

## The XLOOKUP-based version

XLOOKUP doesn't have a true built-in two-way mode, but nesting one
XLOOKUP inside another produces the same result:

```
=XLOOKUP(month, MonthRow, XLOOKUP(region, RegionCol, DataGrid))
```

The inner `XLOOKUP(region, RegionCol, DataGrid)` returns the entire
row for that region as an array. The outer `XLOOKUP` then searches
`MonthRow` within that single returned row for `month`. It reads less
symmetrically than the INDEX/MATCH version, which is part of why
INDEX/MATCH remains the more common choice specifically for two-way
lookups, even in workbooks that use XLOOKUP everywhere else.

## Key terms

| Term | Meaning |
|---|---|
| Two-way lookup | Finding a value at the intersection of a row condition and a column condition |
| `INDEX(array, row_num, col_num)` | INDEX's full form — a specific row *and* column, not just one axis |
| Nested XLOOKUP | An XLOOKUP whose return_array is itself the output of another XLOOKUP |

## Lab

1. Build a small grid: regions down the side, months across the top,
   numbers in the intersections.
2. Write the nested INDEX/MATCH formula above against it and confirm
   it returns the correct single cell.
3. Rewrite it as a nested XLOOKUP and confirm both formulas agree.

## Check yourself

You're ready for Lesson 8 when you can explain why a two-way lookup
needs two independent MATCH calls rather than one.
