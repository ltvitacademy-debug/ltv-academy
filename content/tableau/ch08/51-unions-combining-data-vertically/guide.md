# Lesson 51 — Unions & Combining Data Vertically

**Chapter 8 · Data Modeling · Lesson 51 of 95**

## What you'll learn

- How a union differs from a join — stacking rows instead of matching
  columns
- The exact SQL equivalent you already know: `UNION ALL`
- How to build a manual union and a wildcard (automatic) union in
  Tableau
- What has to match between tables for a union to make sense

## Union = SQL's UNION ALL, not a join

Every join or relationship so far in this chapter combines tables
**horizontally** — matching rows on a key and adding columns from one
table onto rows from another. A **union** does the opposite: it
stacks tables **vertically**, appending one table's rows underneath
another's, the same way you already know:

```sql
SELECT * FROM Sales_Jan
UNION ALL
SELECT * FROM Sales_Feb
UNION ALL
SELECT * FROM Sales_Mar
```

Tableau's union is `UNION ALL`, specifically — it keeps every row from
every table, duplicates included, rather than de-duplicating like
plain `UNION` would. If you have monthly extract files, regional
export files, or year-over-year sheets that all share the same
columns, a union is how you combine them into one continuous table.

## Building a manual union

In Tableau, drag one table onto the canvas, then drag a second table
directly beneath it (a horizontal line appears, distinct from the
join drop target) to start a union:

![The manual Union dialog in Tableau, showing three tables — May2016, June2016, and July2016 — stacked together into a single union, with an Apply button and OK button.](/courses/tableau/ch08/51-unions-combining-data-vertically/union-dialog-multiple-tables.png)
*Drag additional tables into this list to add them to the union, in any order.*
Source: [Tableau Help — Union Your Data](https://help.tableau.com/current/pro/desktop/en-us/union.htm)

## Wildcard (automatic) unions

Manually adding a table for every month gets tedious fast, and it
means updating your data source by hand every time a new month's file
appears. The **Wildcard (automatic)** union tab solves this: give
Tableau a naming pattern, and it automatically includes every table
that matches — new files included, next time you refresh:

![The Wildcard (automatic) tab of the Union dialog, showing a search folder and a matching pattern of *2016, set to Include tables matching that pattern.](/courses/tableau/ch08/51-unions-combining-data-vertically/union-wildcard-pattern.png)
*Every sheet or file matching `*2016` gets pulled into the union automatically — including ones added after you build this.*
Source: [Tableau Help — Union Your Data](https://help.tableau.com/current/pro/desktop/en-us/union.htm)

## What has to match for a union to work well

A union works best when the tables share the same column structure —
same field names, same data types, in roughly the same order. Tableau
will union tables with mismatched columns, but any column that only
exists in some of the tables shows up with NULLs for the rows from
tables that don't have it — which is the exact behavior you'd expect
from `UNION ALL` over tables with a different column list padded with
NULLs.

## Key terms

| Term | Meaning |
|---|---|
| Union | Stacking rows from multiple tables vertically — Tableau's equivalent of `UNION ALL` |
| Manual union | Explicitly listing each table to include |
| Wildcard (automatic) union | A naming pattern that automatically pulls in every matching table, including future ones |

## Lab

1. If you have (or can create) a small workbook with three sheets of
   the same shape — say, Jan/Feb/Mar sales, same columns — build a
   manual union combining all three.
2. Rename one sheet to include a common pattern (e.g., `Sales_Jan`,
   `Sales_Feb`, `Sales_Mar`) and rebuild the same result using a
   wildcard union with pattern `Sales_*`.
3. Add a fourth sheet, `Sales_Apr`, matching the same pattern, and
   refresh — confirm the wildcard union picks it up automatically
   while the manual union does not.

## Check yourself

You're ready for Lesson 52 when you can say, in one sentence, why a
union stacks rows instead of matching columns like a join does — and
when you'd reach for a wildcard union instead of a manual one.
